import { readFile, readdir, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import vm from "node:vm";
import { parseHTML } from "linkedom";
import { cardManifest } from "./og-card.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baseURL = "https://polski.hamanovich.com/";
const routes = [
  ["s-index", "", "Польская грамматика"],
  ["s-alpha", "alphabet", "Польский алфавит и произношение"],
  ["s-rodz", "gender", "Род существительных в польском языке"],
  ["s-cases", "cases", "Падежи польского языка"],
  ["s-alt", "alternations", "Чередования в польском языке"],
  ["s-adj", "adjectives", "Польские прилагательные"],
  ["s-adv", "adverbs", "Наречия в польском языке"],
  ["s-pron", "pronouns", "Местоимения польского языка"],
  ["s-q", "questions", "Вопросы в польском языке"],
  ["s-num", "numerals", "Числительные польского языка"],
  ["s-verbs", "verbs", "Польские глаголы"],
  ["s-vocab", "vocabulary", "Словарь польского языка"],
  ["s-talk", "speaking", "Разговорный польский"],
  ["s-neg", "negation", "Отрицание в польском языке"],
  ["s-order", "word-order", "Порядок слов в польском языке"],
  ["s-impers", "impersonal", "Безличные конструкции в польском языке"],
  ["s-conj", "conjunctions", "Союзы польского языка"],
  ["s-part", "particles", "Частицы польского языка"],
  ["s-ludzie", "people", "Обращение, имена и национальности"],
  ["s-dim", "diminutives", "Уменьшительные формы в польском языке"],
  ["s-preps", "prepositions", "Предлоги польского языка"],
  ["s-bridge", "language-bridges", "Польский через русский и белорусский"]
];
const TOC_MIN = 5;
const sitemapPaths = [...routes.map(([, path]) => path), "plan-40"];
const routePaths = new Set([
  ...routes.map(([, path]) => `/${path ? `${path}/` : ""}`),
  "/plan-40/"
]);

const [css, robots, sitemap, searchSource, dataSource, appSource, manifestSource, jekyllConfig] = await Promise.all([
  readFile(resolve(root, "style.css"), "utf8"),
  readFile(resolve(root, "robots.txt"), "utf8"),
  readFile(resolve(root, "sitemap.xml"), "utf8"),
  readFile(resolve(root, "search-index.js"), "utf8"),
  readFile(resolve(root, "data.js"), "utf8"),
  readFile(resolve(root, "app.js"), "utf8"),
  readFile(resolve(root, "content-manifest.json"), "utf8"),
  readFile(resolve(root, "_config.yml"), "utf8")
]);
const contentManifest = JSON.parse(manifestSource);

const documents = new Map();
const titles = new Set();
const headings = new Set();
for(const [id, path, heading] of routes){
  const file = resolve(root, path, "index.html");
  const html = await readFile(file, "utf8");
  const { document } = parseHTML(html);
  documents.set(id, {html, document});

  assert.equal(document.documentElement.dataset.prerendered, "true", `${path || "/"} must be prerendered`);
  assert.equal(document.documentElement.dataset.page, id);
  assert.equal(document.documentElement.classList.contains("js"), false, "HTML must remain readable when scripts do not run");
  assert.equal(document.documentElement.getAttribute("lang"), "ru");
  assert.equal(document.querySelectorAll(".sec").length, 1, `${path || "/"} must contain one topic`);
  assert.equal(document.querySelector(".sec")?.id, id);
  assert.notEqual(document.querySelector(".sec")?.textContent.trim(), "");
  assert.equal(document.querySelector(".sec")?.getAttribute("role"), null);
  assert.equal(document.querySelectorAll("h1").length, 1);
  assert(document.querySelector("h1.page-title"));
  assert.equal(document.querySelector("h1.page-title")?.textContent.trim(), heading, `${path || "/"} must lead with its own topic as h1`);
  assert(!headings.has(heading), `Duplicate h1: ${heading}`);
  headings.add(heading);
  assert(document.querySelector(".site-title[href]"));
  assert.equal(document.querySelector('footer a[href="mailto:polski@hamanovich.com"]')?.textContent.trim(), "polski@hamanovich.com");
  assert.equal(document.querySelector('footer a[href="https://polski.hamanovich.com/"]')?.textContent.trim(), "polski.hamanovich.com");
  assert(document.querySelector("footer")?.textContent.includes("© 2026"));
  assert(!document.querySelector("footer")?.textContent.includes("Ударение - всегда предпоследний слог"));

  const canonical = new URL(path ? `${path}/` : "", baseURL).href;
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute("href"), canonical);
  assert.equal(document.querySelector('meta[property="og:url"]')?.getAttribute("content"), canonical);
  assert.equal(document.querySelector('meta[name="robots"]'), null);
  assert(document.querySelector('meta[name="description"]')?.getAttribute("content")?.length > 80);
  assert(document.title.length > 20);
  assert(!titles.has(document.title), `Duplicate title: ${document.title}`);
  titles.add(document.title);

  const socialCard = `${baseURL}og/${path || "index"}.png`;
  assert.equal(document.querySelector('meta[property="og:image"]')?.getAttribute("content"), socialCard);
  assert.equal(document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content"), heading);
  assert.equal(document.querySelector('meta[name="twitter:card"]')?.getAttribute("content"), "summary_large_image");
  await access(resolve(root, "og", `${path || "index"}.png`));

  const linkedData = [...document.querySelectorAll('script[type="application/ld+json"]')];
  assert.equal(linkedData.length, 1, `${path || "/"} must carry exactly one JSON-LD block`);
  const graph = JSON.parse(linkedData[0].textContent)["@graph"];
  assert(graph.some(node => node["@type"] === "WebSite"));
  const webpage = graph.find(node => String(node["@type"]).includes("WebPage"));
  assert.equal(webpage.url, canonical);
  assert.equal(webpage.name, document.title);
  assert.equal(webpage.headline, heading);
  assert.equal(webpage.inLanguage, "ru");
  assert.match(webpage.dateModified, /^\d{4}-\d{2}-\d{2}$/, `${path || "/"} needs a dateModified`);
  assert.equal(webpage.dateModified, contentManifest[path || "index"]?.date, `${path || "/"} dateModified must match content-manifest.json`);
  const breadcrumb = graph.find(node => node["@type"] === "BreadcrumbList");
  if(id === "s-index") assert.equal(breadcrumb, undefined, "Homepage is the breadcrumb root, not a step in it");
  else{
    assert.equal(breadcrumb.itemListElement.length, 2, `${path}: breadcrumb must run root then topic`);
    assert.equal(breadcrumb.itemListElement[0].item, baseURL);
    assert.equal(breadcrumb.itemListElement[1].name, heading);
    assert.equal(breadcrumb.itemListElement[1].item, undefined, "Last breadcrumb step carries no URL");
  }

  assert.equal(document.querySelectorAll("#nav a[data-s]").length, routes.length);
  assert.equal(document.querySelectorAll("#nav .navgroup").length, 7, "Navigation must stay two-level: seven groups in one row");
  assert.equal(document.querySelectorAll("#nav .navgroup .navpop a[data-s]").length, routes.length - 1);
  assert.equal(document.querySelectorAll("#navmenu a[data-s]").length, routes.length);
  const currentGroups = document.querySelectorAll("#nav .navgroup.is-current");
  const pagers = [...document.querySelectorAll(".pager")];
  if(id === "s-index"){
    assert.equal(currentGroups.length, 0);
    assert.equal(pagers.length, 0, "Table of contents needs no pager");
  }else{
    assert.equal(currentGroups.length, 1, `${path} must highlight its group`);
    assert(currentGroups[0].contains(document.querySelector('#nav a[aria-current="page"]')));

    const practice = document.querySelector(".sec .practice");
    assert.equal(pagers.length, practice ? 2 : 1, `${path} must offer previous/next topics next to its practice`);
    if(practice) assert(pagers[0].compareDocumentPosition(practice) & 4, `${path}: mid pager must precede the practice`);
    for(const pager of pagers){
      const links = pager.querySelectorAll("a[href]");
      assert(links.length === 1 || links.length === 2, `${path}: pager must hold one or two links`);
    }
  }
  const ids = [...document.querySelectorAll("[id]")].map(node => node.id);
  assert.equal(new Set(ids).size, ids.length, `${path || "/"} must not repeat an id`);
  const anchored = [...document.querySelectorAll(".sec h3[id]")].filter(heading => !heading.closest(".practice"));
  const toc = document.querySelector(".sec .toc");
  if(id !== "s-index" && anchored.length >= TOC_MIN){
    assert(toc, `${path} has ${anchored.length} subsections and needs its table of contents`);
    const tocLinks = [...toc.querySelectorAll('a[href^="#"]')];
    assert.equal(tocLinks.length, anchored.length, `${path}: table of contents must list every subsection`);
    for(const link of tocLinks){
      const target = decodeURIComponent(link.getAttribute("href").slice(1));
      assert(document.getElementById(target), `${path}: dead anchor #${target}`);
    }
  }else assert.equal(toc, null, `${path || "/"} is too short for a table of contents`);

  assert.equal(document.querySelectorAll('#nav a[aria-current="page"]').length, 1);
  assert.equal(document.querySelector('#nav a[aria-current="page"]')?.dataset.s, id);
  assert.equal(document.querySelectorAll('a[href^="#s-"]').length, 0, "Legacy fragment links must be rewritten");
  for(const link of document.querySelectorAll("a[href]")){
    const target = new URL(link.getAttribute("href"), canonical);
    if(target.origin === new URL(baseURL).origin)
      assert(routePaths.has(target.pathname), `Broken internal route ${target.pathname} on ${path || "/"}`);
  }

  const scripts = [...document.querySelectorAll("script[src]")];
  assert.equal(scripts.length, 1, "Search index should load lazily, not on every page view");
  assert.match(scripts[0].getAttribute("src"), /client\.js\?v=[a-f0-9]{10}$/);
  assert.match(scripts[0].dataset.searchSrc, /search-index\.js\?v=[a-f0-9]{10}$/);
  assert(document.querySelector("button.totop"), `${path || "/"} must offer the scroll-to-top control`);
  assert(!html.includes('src="data.js"'));
  assert(!html.includes('src="app.js"'));
}

const rootPage = documents.get("s-index");
assert.equal(rootPage.document.title, "Польская грамматика - таблицы, правила и примеры");
assert.equal(rootPage.document.querySelectorAll("#s-index .idx-a[href]").length, 21);
assert(rootPage.document.querySelector('#s-index .index-plan-card[href="plan-40/"]'));
assert(!rootPage.html.includes("przez godzinę"), "Homepage should not duplicate every topic");

const cases = documents.get("s-cases");
assert.equal(cases.document.querySelectorAll(".case-variant").length, 14);
assert(cases.html.includes("Miejscownik"));

const gender = documents.get("s-rodz");
assert(gender.html.includes("męskozwierzęcy (męskożywotny)"));
assert(gender.html.includes("бачу студэнта · сабаку / ката · тэлефон"));
assert(gender.html.includes("ten album, kostium, rum"));
assert(gender.html.includes("państwo Kowalscy przyszli"));
assert(gender.html.includes("Совпадение форм меняется, сам род не меняется"));
assert(!gender.html.includes("В русском мужской род один, поэтому опоры нет никакой"));
assert(!gender.html.includes("Граница переезжает между числами"));
assert(!gender.html.includes("животные уходят к вещам"));
assert(!gender.html.includes("Слова на -um среднего рода"));
assert.equal(gender.document.querySelectorAll(".gender-practice .exercise-item").length, 20);
assert(dataSource.includes('{id:"gender-2",prompt:"___ album leży na stole."'));
assert(dataSource.includes('{id:"gender-15",prompt:"Palę ___. (papieros)"'));
assert(gender.html.includes("ten książę, księcia"));
assert(!documents.get("s-cases").html.includes("поэтому опоры нет никакой"));

const verbs = documents.get("s-verbs");
assert.equal(verbs.document.querySelectorAll(".verb-variant").length, 5);
assert(verbs.html.includes("będę zrobił"));
assert(!verbs.html.includes("czyby"));

const vocabulary = documents.get("s-vocab");
assert.equal(vocabulary.document.querySelectorAll("#s-vocab .vocabulary-list").length, 4);
assert.equal(vocabulary.document.querySelectorAll("#s-vocab .vocabulary-list tr").length, 404);
const speaking = documents.get("s-talk");
assert(speaking.html.includes("Фразы спасения"));
assert(speaking.html.includes("Co robiłeś w weekend?"));

assert(documents.get("s-alt").html.includes("Окончание часто меняет последний звук основы"));
assert(!documents.get("s-ludzie").html.includes("Wołacz - вкладка"));
assert(documents.get("s-num").html.includes("Z iloma osobami rozmawiałeś?"));
assert(documents.get("s-num").html.includes("o czterdziestu procentach"));
assert(documents.get("s-num").html.includes("Число на что оканчивается?"));
assert(documents.get("s-num").html.includes("dwadzieścia jeden dom"));
assert(!documents.get("s-num").html.includes("dwadzieścia jeden domów"));
assert(documents.get("s-conj").html.includes("Po moim powrocie Anna zadzwoniła"));
assert(documents.get("s-conj").html.includes("Powiedział, że zadzwoni i że przyjdzie"));
assert(documents.get("s-conj").html.includes("Zostałem w domu, mimo że padało"));
assert(documents.get("s-conj").html.includes("Miał nadzieję, że jeśli wróci, porozmawiają"));
assert(documents.get("s-conj").html.includes("Zrobiłem to dlatego, że mnie prosiłeś"));
assert(documents.get("s-conj").html.includes("книжное; обычно идёт после главной части"));
assert(documents.get("s-conj").html.includes("придаточное цели"));
assert(documents.get("s-conj").html.includes("нужен <span class=\"pl\">żeby / aby</span>"));
assert(documents.get("s-conj").html.includes("Обязательного сдвига времени нет"));
assert(!documents.get("s-conj").html.includes("Значение одинаковое, разница в регистре"));
assert(!documents.get("s-conj").html.includes("gdzie, kiedy</span> - всегда"));
assert(!documents.get("s-conj").html.includes("Само время глагола не меняется никогда"));
assert(!documents.get("s-conj").html.includes("официальный синоним i"));
const conjunctionItems = [...documents.get("s-conj").document.querySelectorAll(".conjunction-practice .exercise-item")];
assert.equal(conjunctionItems.length, 20);
assert.equal(documents.get("s-conj").document.querySelectorAll(".conjunction-practice .exercise-item select.exercise-control").length, 20);
assert.deepEqual([...conjunctionItems[0].querySelectorAll("option")].slice(1).map(option => option.value), ["i", "ale", "więc"]);
assert.deepEqual([...conjunctionItems[9].querySelectorAll("option")].slice(1).map(option => option.value), ["oraz", "ale", "ani"]);
const questions = documents.get("s-q");
assert(questions.html.includes("Którędy iść?"));
assert(questions.html.includes("Czy masz czas? = Masz czas?"));
assert(questions.html.includes("Chciałam zapytać, czy jutro jest zebranie."));
assert(questions.html.includes("Czemu się przyglądasz? - Obrazowi."));
assert(questions.html.includes("Idź tam, dokąd prowadzi ta droga."));
assert(questions.html.includes("Na czym polega problem?"));
assert(questions.html.includes("który (m3) / którego (m1, m2)"));
assert(questions.html.includes("Ten, kto to zrobił, powinien przeprosić."));
assert(!questions.html.includes("на письме и в вежливой речи ожидается"));
assert(!questions.html.includes("Без который не построить сложное предложение"));
const questionItems = [...questions.document.querySelectorAll(".question-practice .exercise-item")];
assert.equal(questionItems.length, 20);
assert.equal(questions.document.querySelectorAll(".question-practice select.exercise-control").length, 20);
assert.deepEqual([...questionItems[1].querySelectorAll("option")].slice(1).map(option => option.value), ["Dokąd", "Skąd", "Którędy"]);
assert.deepEqual([...questionItems[18].querySelectorAll("option")].slice(1).map(option => option.value), ["czy", "że", "żeby"]);
assert(dataSource.includes('["___ jesteś smutny? - Bo tęsknię. (нейтрально)","Dlaczego"'));
assert.deepEqual([...questionItems[19].querySelectorAll("option")].slice(1).map(option => option.value), ["którym", "którego", "który"]);
const adverbs = documents.get("s-adv");
assert(adverbs.html.includes("Miło mi. · Tu jest miło."));
assert(adverbs.html.includes("Rano wstaję wcześnie."));
assert(adverbs.html.includes("bardziej szczegółowo → najbardziej szczegółowo"));
assert(adverbs.html.includes("bardzo dobry pomysł · wyjątkowo szybko"));
assert(adverbs.html.includes("-ko → -ciej"));
assert(adverbs.html.includes("-ło → -lej"));
assert(adverbs.html.includes("blisko</td><td class=\"g\">bliżej"));
assert(!adverbs.html.includes("Прилагательные с мягкой основой чаще уходят сюда"));
assert(!adverbs.html.includes("Длинные и заимствованные наречия"));
assert(!adverbs.html.includes("k → c, как в прилагательном"));
const adverbItems = [...adverbs.document.querySelectorAll(".adverb-practice .exercise-item")];
assert.equal(adverbItems.length, 20);
assert.deepEqual([...adverbItems[2].querySelectorAll("option")].slice(1).map(option => option.value), ["dobrze", "lepiej", "najlepiej"]);
assert.deepEqual([...adverbItems[3].querySelectorAll("option")].slice(1).map(option => option.value), ["szczegółowo", "bardziej szczegółowo", "najbardziej szczegółowo"]);
assert.deepEqual([...adverbItems[8].querySelectorAll("option")].slice(1).map(option => option.value), ["wcześnie", "rano", "wczoraj"]);
assert(documents.get("s-cases").document.querySelector("#s-cases")?.textContent.includes("duchu"));
assert(!documents.get("s-cases").html.includes("opiekować się, martwić się</span> + творительный"));
assert(!documents.get("s-verbs").html.includes("Pociąg już odszedł"));
assert(documents.get("s-verbs").html.includes("Вид не генерируется механически"));
assert(vocabulary.html.includes("poznać"));
assert(documents.get("s-verbs").html.includes("zniknął"));
assert(documents.get("s-ludzie").html.includes("Регистр и уважительное обращение"));
assert(documents.get("s-ludzie").html.includes("w Ukrainie / do Ukrainy"));
assert(documents.get("s-ludzie").html.includes("u pani doktorki</span> не ошибка"));

const order = documents.get("s-order");
assert.equal(order.document.querySelectorAll("#s-order .vt")[0]?.querySelectorAll("tr").length, 4);
assert(order.html.includes("Na stole są klucze"));
assert(order.html.includes("Нейтрально и с акцентом"));
assert(order.html.includes("Go widziałem wczoraj"));

const pronouns = documents.get("s-pron");
assert(pronouns.html.includes("Interesuję się nim"));

assert(documents.get("s-talk").html.includes("Jak to będzie po rosyjsku?"));
assert(!documents.get("s-talk").html.includes("Jak to znaczy po rosyjsku?"));
assert(documents.get("s-talk").html.includes("około dziesięciu minut"));
assert(!documents.get("s-talk").html.includes("Poproszę kawę i wodę, proszę"));
assert(documents.get("s-talk").html.includes(", ale chcę jeszcze trochę się uczyć"));

assert(dataSource.includes('"martwić się","o kogo?","o + Biernik"'));
assert(dataSource.includes('"znać": "новое состояние: poznać'));
assert(!dataSource.includes("dwadzieścia jeden domów"));
assert(!appSource.includes("Двигаешься - Biernik."));
assert(!appSource.includes("подчинительными союзами запятая ставится <b>всегда</b>"));

const dataSandbox = vm.createContext({});
vm.runInContext(dataSource, dataSandbox, {filename:"data.js"});
const fromData = name => vm.runInContext(name, dataSandbox);

const exerciseSets = [
  "CASE_PRACTICE", "CASE_TEST", "VERB_PRACTICE", "VERB_TEST", "PREP_PRACTICE", "PREP_TEST",
  "ADJ_PRACTICE", "ADJ_TEST", "ROD_PRACTICE", "ADV_PRACTICE", "PRON_PRACTICE",
  "CONJ_PRACTICE", "PART_PRACTICE", "ALT_PRACTICE", "PEOPLE_PRACTICE", "ALPHA_PRACTICE",
  "DIM_PRACTICE", "BRIDGE_PRACTICE", "NUM_PRACTICE", "QUESTION_PRACTICE", "NEG_PRACTICE",
  "ORDER_PRACTICE", "IMPERS_PRACTICE"
];
const answerSets = [];
for(const name of exerciseSets)
  for(const practice of [fromData(name)].flat())
    for(const task of practice.tasks){
      if(task.answers) answerSets.push({where:`${name} · ${task.id}`, answers:task.answers, fixed:!!task.options});
      for(const part of task.passage || [])
        if(part?.answers) answerSets.push({where:`${name} · ${task.id}/${part.key}`, answers:part.answers, fixed:!!part.options});
    }
assert(answerSets.length > 400, "Every practice block must be reachable from exerciseSets");

const beMarker = "(?:będę|będziesz|będzie|będziemy|będziecie|będą)";
const futureWithInfinitive = new RegExp(`^${beMarker} \\S+ć( się)?$`);
const futureWithPastForm = new RegExp(`^${beMarker} \\S+(ł|ła|ło|li|ły)( się)?$`);
for(const {where, answers, fixed} of answerSets){
  if(fixed) continue;
  const withInfinitive = answers.some(answer => futureWithInfinitive.test(answer));
  const withPastForm = answers.some(answer => futureWithPastForm.test(answer));
  if(withInfinitive || withPastForm)
    assert(withInfinitive && withPastForm,
      `${where}: составное будущее нормативно и как "będę czytać", и как "będę czytał" - свободный ввод обязан принимать обе модели`);
}

const caseOf = {Mianownik:"M", Dopełniacz:"D", Celownik:"C", Biernik:"B", Narzędnik:"N", Miejscownik:"Ms"};
const prepositionOf = {z:["с","из"], o:["о"], na:["на"], w:["в"], za:["за"], do:["к","до"], po:["по"], od:["от"], u:["у"], przed:["перед"]};
const questionCase = {кого:"B", что:"B", кому:"C", чему:"C", чего:"D", кем:"N", чем:"N", ком:"Ms", чём:"Ms"};
const russianPrepositions = new Set(["о","на","в","во","с","со","за","по","из","над","к","от","у","перед","до"]);
const rekcjaManual = new Map([
  ["dziękować", "два дополнения: komu + za co"],
  ["gratulować", "два дополнения: komu + czego"],
  ["życzyć", "два дополнения: komu + czego"],
  ["grać", "пометка стоит за выбор w против na, а не за расхождение с русским"]
]);
let rekcjaDerived = 0;
for(const row of fromData("REKCJA")){
  const [verb, , requires, gloss] = row;
  if(rekcjaManual.has(verb)) continue;
  const [polishPreposition, polishCase] = requires.split(" / ")[0].split(" + ").length === 2
    ? requires.split(" / ")[0].split(" + ")
    : [null, requires.split(" / ")[0]];
  assert(caseOf[polishCase], `REKCJA · ${verb}: не разобран падеж "${requires}"`);
  const words = gloss.trim().split(/\s+/);
  const russianCase = questionCase[words.at(-1)];
  assert(russianCase, `REKCJA · ${verb}: не разобран русский вопрос в "${gloss}"`);
  const russianPreposition = russianPrepositions.has(words.at(-2)) ? words.at(-2).replace(/^(во|со)$/, match => match[0]) : null;
  const sameCase = caseOf[polishCase] === russianCase;
  const samePreposition = polishPreposition === null
    ? russianPreposition === null
    : russianPreposition !== null && (prepositionOf[polishPreposition] || []).includes(russianPreposition);
  assert.equal(!!row[5], !(sameCase && samePreposition),
    `REKCJA · ${verb}: "${requires}" против "${gloss}" ${sameCase && samePreposition ? "с русским совпадает, красной пометки быть не должно" : "с русским расходится, нужна красная пометка"}`);
  rekcjaDerived += 1;
}
assert.equal(rekcjaDerived + rekcjaManual.size, fromData("REKCJA").length);

for(const row of fromData("IMIES_CZ"))
  assert.equal(row[2].split(" / ")[0], `${row[1].replace(/^oni /, "")}cy`,
    `IMIES_CZ · ${row[0]}: причастие обязано быть формой oni плюс -cy`);
for(const row of fromData("IMIES_PRZYS")){
  if(!row[0].includes("-ąc")) continue;
  for(const pair of row[2].split(" · ")){
    const [base, derived] = pair.split(" → ");
    assert.equal(derived, `${base.replace(/^oni /, "")}c`,
      `IMIES_PRZYS · ${pair}: деепричастие обязано быть показанной формой плюс -c`);
  }
}

const imperativeSoftening = [["dzi", "dź"], ["si", "ś"], ["zi", "ź"], ["ci", "ć"], ["ni", "ń"], ["dz", "dź"], ["s", "ś"], ["z", "ź"], ["n", "ń"]];
for(const row of fromData("IMPER")){
  const [verb, base, imperative, , , , note] = row;
  if(base === "-"){
    assert(note, `IMPER · ${verb}: форма без исходной опоры обязана нести помету`);
    continue;
  }
  const stem = base.replace(/^(ty|oni) /, "").replace(/(esz|isz|ysz|asz|ą)$/, "");
  const softened = imperativeSoftening.reduce((list, [from, to]) =>
    stem.endsWith(from) ? [...list, `${stem.slice(0, -from.length)}${to}`] : list, [stem]);
  const candidates = softened.flatMap(form => [form, form.replace(/o([^o]*)$/, "ó$1"), `${form}ij`, `${form}yj`]);
  if(!candidates.includes(imperative.replace(/!$/, "")))
    assert(note, `IMPER · ${verb}: "${base}" не даёт "${imperative}" ни одним правилом раздела - нужна помета в последней колонке`);
}

const particles = documents.get("s-part");
assert(particles.html.includes("Норма с 1 января 2026 года"));
assert(particles.html.includes("nielepszy, nienajlepszy"));
assert(particles.html.includes("Wcale nie śmieszny ten żart"));
assert(particles.html.includes("Film był nie najlepszy, ale też nie najgorszy"));
assert(particles.html.includes("On by to zrobił · My byśmy dokończyli · Czerwony by się zrobił"));
assert(particles.html.includes("nie można · nie trzeba · nie warto · nie wolno · nie brak · nie wiadomo"));
assert(particles.html.includes("jakby · jakoby · niby"));
assert(!particles.html.includes(">nie-<"));
assert(particles.html.includes("<th>слова и элементы</th>"));
assert(!particles.html.includes("<th>частицы</th>"));
assert.equal(particles.document.querySelectorAll(".particle-practice .exercise-item").length, 20);
assert.equal(particles.document.querySelectorAll(".particle-practice .exercise-item select.exercise-control").length, 20);

const bridge = documents.get("s-bridge");
const falseFriendCells = [...bridge.document.querySelectorAll(".false-friends tr td:first-child")];
assert.equal(falseFriendCells.length, 100);
assert.equal(new Set(falseFriendCells.map(cell => cell.textContent.trim())).size, 100);
assert.equal(bridge.document.querySelectorAll(".false-friends h4").length, 5);
assert(bridge.html.includes("pytać"));
assert(bridge.html.includes("jutro"));
assert(bridge.html.includes("puszka"));
assert(bridge.html.includes("lustro"));

assert.match(css, /\.navgroup-btn\[aria-expanded="true"\] \+ \.navpop\{display:block\}/);
assert.match(css, /html:not\(\.js\) \.navpop\{display:block/, "Sections must stay reachable without JavaScript");
assert.match(css, /\.sec\{display:block\}/);
assert.match(css, /\.js \.sec\{display:none\}/);
assert.match(css, /\.content-variant\{display:block\}/);
assert.match(robots, /User-agent: OAI-SearchBot\s+Allow: \//);
assert.match(robots, /User-agent: \*\s+Allow: \//);
assert.match(robots, /Sitemap: https:\/\/polski\.hamanovich\.com\/sitemap\.xml/);

const ogManifest = JSON.parse(await readFile(resolve(root, "og", "manifest.json"), "utf8")
  .catch(() => { throw new Error("og/manifest.json is missing: run npm run og"); }));
const expectedCards = cardManifest();
assert.deepEqual(
  Object.keys(ogManifest).sort(),
  Object.keys(expectedCards).sort(),
  "og/manifest.json must list exactly the pages that need a social card"
);
for(const [name, fingerprint] of Object.entries(expectedCards)){
  assert.equal(ogManifest[name], fingerprint, `og/${name}.png is stale: rerun npm run og`);
}

const trainerPages = [
  ["s-verbs", "verbs", "Тренажёр глагольных форм", ["tense", "gender"]],
  ["s-cases", "cases", "Тренажёр падежных форм", ["case", "number"]],
  ["s-adj", "adjectives", "Тренажёр форм прилагательных", ["kind", "gender"]]
];
for(const [id, path, heading, filters] of trainerPages){
  const page = documents.get(id).document;
  const block = page.querySelector(".sec .trainer");
  assert(block, `${path} must host its trainer`);
  assert.equal(page.querySelectorAll(".sec .trainer").length, 1);
  assert.equal(block.querySelector(".practice-heading h2")?.textContent.trim(), heading);
  assert(block.classList.contains("practice"), "The trainer is a practice block, so it stays out of search and fulltext");
  assert.deepEqual([...block.querySelectorAll("[data-trainer-filter]")].map(bar => bar.dataset.trainerFilter), filters);
  assert.equal(block.querySelectorAll("[data-trainer-chip]").length, 3);
  assert(block.querySelector("[data-trainer-stage]")?.hasAttribute("hidden"));
  assert(block.querySelector("noscript"), `${path}: the trainer must say what to read when scripts do not run`);
  assert.match(page.querySelector("script[src]").dataset.trainerSrc, /trainer-data\.js\?v=[a-f0-9]{10}$/);
}
assert.equal(documents.get("s-verbs").document.querySelector('.trainer [data-trainer-filter="tense"]')?.querySelectorAll("button").length, 4);
assert.equal(documents.get("s-verbs").document.querySelector('.trainer [data-trainer-filter="gender"]')?.querySelectorAll("button").length, 3);
assert.equal(documents.get("s-cases").document.querySelector('.trainer [data-trainer-filter="case"]')?.querySelectorAll("button").length, 8);
assert.equal(documents.get("s-cases").document.querySelector('.trainer [data-trainer-filter="number"]')?.querySelectorAll("button").length, 3);
assert.equal(documents.get("s-adj").document.querySelector('.trainer [data-trainer-filter="kind"]')?.querySelectorAll("button").length, 4);
assert.equal(documents.get("s-adj").document.querySelector('.trainer [data-trainer-filter="gender"]')?.querySelectorAll("button").length, 6);

const trainerData = await readFile(resolve(root, "trainer-data.js"), "utf8");
const trainerDecks = JSON.parse(trainerData.replace(/^globalThis\.TRAINER_DATA=/, "").replace(/;\s*$/, ""));
const trainerVerbs = trainerDecks.verbs;
assert.equal(trainerVerbs.length, 100, "The trainer drills the whole verb table");
const trainerByLemma = new Map(trainerVerbs.map(verb => [verb.l, verb]));
assert.deepEqual(trainerByLemma.get("być").pr, ["jestem", "jesteś", "jest", "jesteśmy", "jesteście", "są"]);
assert.deepEqual(trainerByLemma.get("być").fu, ["będę", "będziesz", "będzie", "będziemy", "będziecie", "będą"]);
assert.deepEqual(trainerByLemma.get("iść").pa,
  ["szedłem", "szłam", "szedłeś", "szłaś", "szedł", "szła", "szło", "szliśmy", "szłyśmy", "szliście", "szłyście", "szli", "szły"]);
assert.deepEqual(trainerByLemma.get("wziąć").pa.slice(0, 2), ["wziąłem", "wzięłam"]);
assert.equal(trainerByLemma.get("jeść").pa[11], "jedli");
assert.equal(trainerByLemma.get("nieść").pa[11], "nieśli");
assert.equal(trainerByLemma.get("mieć").pa[11], "mieli");
assert.equal(trainerByLemma.get("móc").pa[0], "mogłem");
assert.equal(trainerByLemma.get("kupić").pr, null, "A perfective verb has no present tense to drill");
assert.equal(trainerByLemma.get("kupić").fk, "s");
assert.deepEqual(trainerByLemma.get("kupić").fu, ["kupię", "kupisz", "kupi", "kupimy", "kupicie", "kupią"]);
assert.deepEqual(trainerByLemma.get("robić").fu[0], ["będę robił", "będę robić"]);
assert.deepEqual(trainerByLemma.get("uczyć się").fu[1], ["będę się uczyła", "będę uczyła się", "będę się uczyć", "będę uczyć się"]);
assert.equal(trainerByLemma.get("uczyć się").pa[7], "uczyliśmy się");
for(const verb of trainerVerbs){
  assert.equal(verb.pa.length, 13, `${verb.l}: the past tense needs every person and gender`);
  assert.equal(verb.fu.length, verb.fk === "s" ? 6 : 13, `${verb.l}: future shape must match its aspect`);
  if(verb.pr) assert.equal(verb.pr.length, 6);
  const forms = [...(verb.pr || []), ...verb.pa, ...verb.fu.flat()];
  assert(forms.every(form => typeof form === "string" && form.trim() === form && form),
    `${verb.l}: every drilled form must be a trimmed string`);
}
assert.deepEqual(trainerByLemma.get("dać").fu, ["dam", "dasz", "da", "damy", "dacie", "dadzą"]);
assert.deepEqual(trainerByLemma.get("wiedzieć").pr, ["wiem", "wiesz", "wie", "wiemy", "wiecie", "wiedzą"]);

const trainerNouns = trainerDecks.nouns;
assert.equal(trainerNouns.length, 171, "The noun trainer drills every declension example that carries a dictionary form");
assert.deepEqual(trainerDecks.cases.map(([id]) => id), ["mian", "bier", "dop", "cel", "narz", "miej", "woł"]);
assert(trainerNouns.every(item => item.l && item.f && item.c && (item.n === "sg" || item.n === "pl")),
  "Every noun question needs a lemma, a form, a case and a number");
const nounKeys = trainerNouns.map(item => `${item.l}|${item.c}|${item.n}`);
assert.equal(new Set(nounKeys).size, nounKeys.length, "One lemma in one case and number must have one answer");
const nounAnswer = (lemma, caseId, number) =>
  trainerNouns.find(item => item.l === lemma && item.c === caseId && item.n === number)?.f;
assert.equal(nounAnswer("kawa", "bier", "sg"), "kawę");
assert.equal(nounAnswer("pies", "bier", "sg"), "psa");
assert.equal(nounAnswer("student", "mian", "pl"), "studenci");
assert.equal(nounAnswer("sklep", "miej", "sg"), "sklepie");
assert.equal(nounAnswer("Piotr", "woł", "sg"), "Piotrze");
assert(!trainerNouns.some(item => item.c === "mian" && item.n === "sg"),
  "Nominative singular is the dictionary form, so there is nothing to drill");

const trainerAdjectives = trainerDecks.adjectives;
assert.equal(trainerAdjectives.length, 317, "Two forms per adjective, two degrees where they exist, plus the dobry paradigm");
assert(trainerAdjectives.every(item => item.l && item.t && item.d && item.a.length && ["gender", "degree", "case"].includes(item.k)),
  "Every adjective question needs a lemma, a caption, a target and answers");
assert(trainerAdjectives.every(item => ["m", "f", "n", "mos", "nmos"].includes(item.g)));
assert(trainerAdjectives.every(item => item.g !== "mos" && item.g !== "nmos" || item.k === "case"),
  "Only the declension table distinguishes the two plural genders");
const adjectiveKeys = trainerAdjectives.map(item => `${item.l}|${item.k}|${item.t}|${item.d}`);
assert.equal(new Set(adjectiveKeys).size, adjectiveKeys.length, "One adjective question must have one answer");
const adjectiveAnswer = (lemma, kind, detail) =>
  trainerAdjectives.find(item => item.l === lemma && item.k === kind && item.d === detail)?.a;
assert.deepEqual(adjectiveAnswer("dobry", "gender", "женский"), ["dobra"]);
assert.deepEqual(adjectiveAnswer("dobry", "degree", "сравнительная"), ["lepszy"]);
assert.deepEqual(adjectiveAnswer("dobry", "degree", "превосходная"), ["najlepszy"]);
assert.deepEqual(adjectiveAnswer("zły", "degree", "превосходная"), ["najgorszy"]);
assert.deepEqual(adjectiveAnswer("chory", "degree", "превосходная"), ["najbardziej chory"]);
assert.equal(adjectiveAnswer("potrzebny", "degree", "сравнительная"), undefined,
  "An adjective without a comparative is not asked for one");
assert.deepEqual(trainerAdjectives.find(item => item.k === "case" && item.t.startsWith("Biernik") && item.d === "мужской род")?.a,
  ["dobry", "dobrego"], "Both accusative masculine forms count");
assert(!trainerAdjectives.some(item => item.k === "case" && item.t.startsWith("Mianownik")),
  "The nominative row is the dictionary form and duplicates the gender drill");

const planHTML = await readFile(resolve(root, "plan-40", "index.html"), "utf8");
const plan = parseHTML(planHTML).document;
assert.equal(plan.querySelectorAll("h1").length, 1, "plan-40 is hand written but still needs one h1");
assert.equal(plan.querySelector('link[rel="canonical"]')?.getAttribute("href"), `${baseURL}plan-40/`);
assert.equal(plan.querySelector('meta[property="og:url"]')?.getAttribute("content"), `${baseURL}plan-40/`);
assert.equal(plan.querySelector('meta[property="og:image"]')?.getAttribute("content"), `${baseURL}og/plan-40.png`);
assert.equal(plan.querySelector('meta[name="twitter:card"]')?.getAttribute("content"), "summary_large_image");
await access(resolve(root, "og", "plan-40.png"));
const planGraph = JSON.parse(plan.querySelector('script[type="application/ld+json"]').textContent)["@graph"];
assert.equal(planGraph.find(node => String(node["@type"]).includes("WebPage")).url, `${baseURL}plan-40/`);
assert.equal(planGraph.find(node => node["@type"] === "BreadcrumbList").itemListElement.length, 2);

const notFoundHTML = await readFile(resolve(root, "404.html"), "utf8");
const notFound = parseHTML(notFoundHTML).document;
assert.equal(notFound.title, "Страница не найдена - Polski: końcówki");
assert.equal(notFound.querySelectorAll("h1").length, 1);
assert.equal(notFound.querySelector("h1")?.textContent.trim(), "Этой страницы нет");
assert.equal(notFound.querySelector('meta[name="robots"]')?.getAttribute("content"), "noindex");
assert.equal(notFound.querySelector('a[href="/"]')?.textContent.trim(), "Polski: końcówki");
assert.equal(notFound.querySelector(".error-actions a[href='/']")?.textContent.trim(), "На главную");
assert.equal(notFound.querySelector('a[href="mailto:polski@hamanovich.com"]')?.textContent.trim(), "polski@hamanovich.com");
assert.match(notFound.querySelector('link[rel="stylesheet"]')?.getAttribute("href") || "", /^\/style\.css\?v=[a-f0-9]{10}$/);
for(const node of notFound.querySelectorAll("link[href],script[src],a[href]")){
  const url = node.getAttribute("href") || node.getAttribute("src");
  assert(/^(?:[a-z]+:|\/|#)/i.test(url), `404 is served at the missing path, so ${url} must be root absolute`);
}
assert.deepEqual([...notFound.querySelectorAll("#theme button")].map(button => button.textContent.trim()), ["светлая", "тёмная"]);
assert.match(notFoundHTML, /document\.documentElement\.classList\.add\("js"\)/);

const sitemapURLs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(sitemapURLs.length, sitemapPaths.length);
assert.deepEqual(sitemapURLs, sitemapPaths.map(path => new URL(path ? `${path}/` : "", baseURL).href));
assert.equal([...sitemap.matchAll(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g)].length, sitemapPaths.length, "Every sitemap URL needs a lastmod");
assert(!sitemap.includes("#"), "Sitemap must contain canonical HTTP URLs, not fragments");

const manifestKeys = sitemapPaths.map(path => path || "index");
assert.deepEqual(Object.keys(contentManifest), [...manifestKeys].sort(), "content-manifest.json must cover every page, sorted by key");
for(const [key, entry] of Object.entries(contentManifest)){
  assert.match(entry.hash, /^[0-9a-f]{64}$/, `${key} needs a content hash`);
  assert.match(entry.date, /^\d{4}-\d{2}-\d{2}$/, `${key} needs a date`);
}
const sitemapDates = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(match => match[1]);
assert.deepEqual(sitemapDates, manifestKeys.map(key => contentManifest[key].date), "Every lastmod must come from content-manifest.json");

const searchJSON = searchSource.replace(/^globalThis\.SEARCH_INDEX=/, "").replace(/;\s*$/, "");
const searchIndex = JSON.parse(searchJSON);
assert(searchIndex.length > 1500);
assert.equal(new Set(searchIndex.map(entry => entry.tab)).size, 21);
assert(searchIndex.every(entry => /^r-\d+$/.test(entry.id) && entry.text));
assert(searchIndex.every(entry => documents.get(entry.tab)?.document.getElementById(entry.id)), "Every search entry must resolve on its topic page");

const excluded = new Set([...jekyllConfig.matchAll(/^\s*-\s*(.+?)\s*$/gm)].map(match => match[1]));
const publicRoot = new Set([
  "404.html", "CNAME", "apple-touch-icon.png", "client.js", "favicon.ico", "favicon.svg",
  "index.html", "og", "plan-40", "robots.txt", "search-index.js", "trainer-data.js",
  "sitemap.xml", "style.css",
  ...routes.map(([, path]) => path).filter(Boolean)
]);
for(const entry of await readdir(root)){
  if(entry.startsWith(".") || entry.startsWith("_") || entry === "node_modules") continue;
  assert(publicRoot.has(entry) || excluded.has(entry), `${entry} is served by GitHub Pages: publish it on purpose or add it to _config.yml`);
}
for(const path of publicRoot) assert(!excluded.has(path), `_config.yml must not hide ${path}`);

console.log(`Static page checks passed: ${routes.length} pages, ${searchIndex.length} search entries, ${excluded.size} paths hidden from Pages`);
