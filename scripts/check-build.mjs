import { readFile, readdir, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import vm from "node:vm";
import { parseHTML } from "linkedom";
import { cardManifest, cardName } from "./og-card.mjs";

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
  ["s-bridge", "language-bridges", "Польский через русский и белорусский"],
  ["s-games", "gry", "Игры по польской грамматике"],
  ["s-mil", "gry/milionerzy", "Milionerzy: игра по польской грамматике"],
  ["s-sek", "gry/sekunda", "До последней секунды: польская грамматика на скорость"],
  ["s-det", "gry/detektyw", "Языковой детектив: найдите ошибку в польском предложении"],
  ["s-zd", "gry/zdanie", "Собери фразу: польские предложения из слов"],
  ["s-sources", "sources", "О справочнике и источниках"]
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
  for(const styled of document.querySelectorAll("[style]"))
    assert(!/color:|white-space:|font-family:/.test(styled.getAttribute("style")),
      `${path || "/"}: typography belongs to classes in style.css, not to a style attribute: ${styled.getAttribute("style")}`);
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

  const socialCard = `${baseURL}og/${cardName(path)}.png`;
  assert.equal(document.querySelector('meta[property="og:image"]')?.getAttribute("content"), socialCard);
  assert.equal(document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content"), heading);
  assert.equal(document.querySelector('meta[name="twitter:card"]')?.getAttribute("content"), "summary_large_image");
  await access(resolve(root, "og", `${cardName(path)}.png`));

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
  if(id === "s-sources"){
    assert(String(webpage["@type"]).includes("AboutPage"), "Sources must be identified as an AboutPage");
    assert.equal(webpage.learningResourceType, undefined, "Sources are methodology, not a learning topic");
    assert.equal(webpage.teaches, undefined, "Sources do not teach a grammar topic");
  }else if(id !== "s-index") assert(String(webpage["@type"]).includes("LearningResource"), `${path} must be a learning resource`);
  const breadcrumb = graph.find(node => node["@type"] === "BreadcrumbList");
  if(id === "s-index") assert.equal(breadcrumb, undefined, "Homepage is the breadcrumb root, not a step in it");
  else{
    assert.equal(breadcrumb.itemListElement.length, 2, `${path}: breadcrumb must run root then topic`);
    assert.equal(breadcrumb.itemListElement[0].item, baseURL);
    assert.equal(breadcrumb.itemListElement[1].name, heading);
    assert.equal(breadcrumb.itemListElement[1].item, undefined, "Last breadcrumb step carries no URL");
  }

  assert.equal(document.querySelectorAll("#nav a[data-s]").length, routes.length);
  assert.equal(document.querySelectorAll("#nav .navgroup").length, 9, "Navigation must keep nine two-level groups");
  assert.equal(document.querySelectorAll("#nav .navgroup .navpop a[data-s]").length, routes.length - 1);
  assert.equal(document.querySelectorAll("#navmenu a[data-s]").length, routes.length);
  const currentGroups = document.querySelectorAll("#nav .navgroup.is-current");
  const pagers = [...document.querySelectorAll(".pager")];
  if(id === "s-index"){
    assert.equal(currentGroups.length, 0);
    assert.equal(pagers.length, 0, "Table of contents needs no pager");
  }else if(id === "s-sources"){
    assert.equal(currentGroups.length, 1, "Sources must highlight their group");
    assert(currentGroups[0].contains(document.querySelector('#nav a[aria-current="page"]')));
    assert.equal(pagers.length, 0, "Methodology is outside the learning sequence");
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
  const gameHost = document.querySelector("[data-game]");
  assert.equal(scripts.length, gameHost ? 2 : 1,
    "Only the game page loads a second script; the search index stays lazy everywhere");
  if(gameHost){
    const [engine, bank] = {milionerzy:["game", "game-data"], sekunda:["sekunda", "sekunda-data"], detektyw:["detektyw", "game-data"], zdanie:["zdanie", "game-data"]}[gameHost.dataset.game];
    assert.match(scripts[1].getAttribute("src"), new RegExp(`(?:^|/)${engine}\\.js\\?v=[a-f0-9]{10}$`));
    assert.match(scripts[1].dataset.gameSrc, new RegExp(`(?:^|/)${bank}\\.js\\?v=[a-f0-9]{10}$`));
  }
  assert.match(scripts[0].getAttribute("src"), /client\.js\?v=[a-f0-9]{10}$/);
  assert.match(scripts[0].dataset.searchSrc, /search-index\.js\?v=[a-f0-9]{10}$/);
  assert(document.querySelector("button.totop"), `${path || "/"} must offer the scroll-to-top control`);
  assert(!html.includes('src="data.js"'));
  assert(!html.includes('src="app.js"'));
}

const rootPage = documents.get("s-index");
assert.equal(rootPage.document.title, "Польская грамматика - таблицы, правила и примеры");
assert.equal(rootPage.document.querySelectorAll("#s-index .idx-a[href]").length, 27);
const indexGroups = [...rootPage.document.querySelectorAll("#s-index .idx > section")];
assert.equal(indexGroups.at(-1)?.querySelector("h3")?.textContent.trim(), "О проекте");
assert.equal(indexGroups.at(-1)?.querySelector(".idx-a")?.dataset.s, "s-sources");
assert(rootPage.document.querySelector('#s-index .index-plan-card[href="plan-40/"]'));
assert(!rootPage.html.includes("przez godzinę"), "Homepage should not duplicate every topic");

const cases = documents.get("s-cases");
assert.equal(cases.document.querySelectorAll(".case-variant").length, 14);
assert(cases.html.includes("Miejscownik"));
assert(cases.html.includes("dwadzieścia jeden biletów"));
assert(cases.html.includes("dwadzieścia dwa bilety"));

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

const alphabet = documents.get("s-alpha");
assert(alphabet.html.includes("семь диграфов и триграф"));
assert(alphabet.html.includes("szcz</span> распадается на два диграфа и два звука"));
assert(alphabet.html.includes("mąka [moŋka], ręka [reŋka]"));
assert(alphabet.html.includes("idą [idõũ̯]"));
assert(alphabet.html.includes("BY-li-śmy; zro-BI-li-by-śmy"));
assert(alphabet.html.includes("słuch → słyszeć"));
assert(alphabet.html.includes("wzorzec → wzorcowy"));
assert(alphabet.html.includes("Plac Zbawiciela; ulica Długa"));
assert(!alphabet.html.includes("десятке диграфов"));
assert(!alphabet.html.includes("szcz - это не «щ»"));
assert(!alphabet.html.includes("rycerz → rycerstwo"));
assert(!alphabet.html.includes("Не находишь чередования - скорее всего"));
const alphabetItems = [...alphabet.document.querySelectorAll(".alphabet-practice .exercise-item")];
assert.equal(alphabetItems.length, 20);
assert.equal(alphabet.document.querySelectorAll(".alphabet-practice select.exercise-control").length, 20);
assert.deepEqual([...alphabetItems[7].querySelectorAll("option")].slice(1).map(option => option.value), ["[om] / [em]", "[on] / [en]", "[oŋ] / [eŋ]"]);
assert.deepEqual([...alphabetItems[17].querySelectorAll("option")].slice(1).map(option => option.value), ["BY-li-śmy; zro-BI-li-by-śmy", "by-LI-śmy; zro-bi-LI-by-śmy", "by-li-ŚMY; zro-bi-li-by-ŚMY"]);
assert(alphabet.html.includes("Не дописывай"));
assert(alphabet.html.includes("dziękuję, ręka, zęby"));
assert(alphabet.html.includes("informacja, dyskusja, wizja, telewizja"));
assert(alphabet.html.includes("dobry, nowy, stary"));
assert(alphabet.html.includes("lekarz, lampa, lato"));

const vocabulary = documents.get("s-vocab");
assert.equal(vocabulary.document.querySelectorAll("#s-vocab .vocabulary-list").length, 4);
assert.equal(vocabulary.document.querySelectorAll("#s-vocab .vocabulary-list tr").length, 404);
assert(vocabulary.html.includes("У несовершенных глаголов это настоящее время, у совершенных - простое будущее"));
assert(vocabulary.html.includes("pl · pieniędzy · pieniądze"));
assert(vocabulary.html.includes("pl · drzwi · drzwi"));
assert(vocabulary.html.includes("pl · wakacji · wakacje"));
assert(vocabulary.html.includes("lubię coś - мне что-то нравится"));
assert(vocabulary.html.includes("udało się komuś - у кого-то получилось"));
assert(vocabulary.html.includes("приятный, располагающий"));
assert(!vocabulary.html.includes("Три формы дают всю парадигму"));
assert(!vocabulary.html.includes("нуждаться; быть нужным"));
const speaking = documents.get("s-talk");
assert(speaking.html.includes("Фразы спасения"));
assert(speaking.html.includes("Co robiłeś w weekend?"));
assert(speaking.html.includes("Мнение, сомнение и дискуссия"));
assert(speaking.html.includes("Nie jestem pewien / pewna, czy"));
assert(speaking.html.includes("Zgadzać się z + творительный"));
assert(speaking.html.includes("Warto dodać, że"));
assert.equal(speaking.document.querySelectorAll(".talk-dialogues article").length, 9);

const alternations = documents.get("s-alt");
assert(alternations.html.includes("Чередование - это смена звука или появление и исчезновение звука"));
assert(alternations.html.includes("e ↔ ∅"));
assert(alternations.html.includes("Глагольную форму не строй по одной букве"));
assert(!alternations.html.includes("В rogu чередования нет"));
assert.equal(alternations.document.querySelectorAll(".alternation-practice .exercise-item").length, 20);
assert.equal(alternations.document.querySelectorAll(".alternation-practice select.exercise-control").length, 20);
const impersonal = documents.get("s-impers");
assert(impersonal.html.includes("без грамматического подлежащего"));
assert(impersonal.html.includes("Wczoraj dobrze się pracowało"));
assert(impersonal.html.includes("Jak nazywają się te ulice?"));
assert(impersonal.html.includes("Napisano nową książkę"));
assert(impersonal.html.includes("может означать и запрет"));
assert(!impersonal.html.includes("настоящий пассив"));
assert(!impersonal.html.includes("Действие совершено, но кем"));
assert(!impersonal.html.includes("не «dom został zbudowany»"));
assert.equal(impersonal.document.querySelectorAll(".impersonal-practice .exercise-item").length, 20);
assert.equal(impersonal.document.querySelectorAll(".impersonal-practice select.exercise-control").length, 20);
const wordOrder = documents.get("s-order");
assert(wordOrder.html.includes("Одного обязательного «второго места» в современном польском нет"));
assert(wordOrder.html.includes("Jego widziałem wczoraj, nie Piotra"));
assert(wordOrder.html.includes("Czy tobie podoba się ten film?"));
assert(wordOrder.html.includes("Z kim Piotr wyjechał?"));
assert(wordOrder.html.includes("On myśli tylko o sobie"));
assert(!wordOrder.html.includes("Go widziałem wczoraj</span>"));
assert(!wordOrder.html.includes("dzień dobry"));
assert.equal(wordOrder.document.querySelectorAll(".word-order-practice .exercise-item").length, 20);
assert.equal(wordOrder.document.querySelectorAll(".word-order-practice select.exercise-control").length, 20);
const people = documents.get("s-ludzie");
assert(people.html.includes("Kościuszko - не склоняется"));
assert(people.html.includes("большинство иностранных фамилий склоняются"));
assert(people.html.includes("na / we Węgrzech"));
assert(people.html.includes("na Węgry / do Węgier"));
assert(people.html.includes("нормативны и употребляются, но различаются по регистру"));
assert(people.html.includes("После pani название профессии в этой модели не склоняется: z panią doktor"));
assert(people.html.includes("Женская форма psycholożka после być стоит в творительном"));
assert(!people.html.includes("Na Węgrzech - закрытая норма"));
assert.equal(people.document.querySelectorAll(".people-practice .exercise-item").length, 20);
const diminutives = documents.get("s-dim");
assert(diminutives.html.includes("Вторая степень усиливает малость и/или экспрессию"));
assert(diminutives.html.includes("Форма может стать обычным названием"));
assert(diminutives.html.includes("Anusia - ласково; Anka - фамильярно"));
assert(diminutives.html.includes("разговорно-экспрессивная форма, уместность зависит от тона"));
assert(!diminutives.html.includes("гораздо шире, чем в русском"));
assert.equal(diminutives.document.querySelectorAll(".diminutive-practice .exercise-item").length, 20);
assert.equal(diminutives.document.querySelectorAll(".diminutive-practice select.exercise-control").length, 20);
const bridges = documents.get("s-bridge");
assert(appSource.includes("<h2>Частые соответствия в родственных словах</h2>"));
assert(bridges.html.includes("это не алгоритм перевода"));
assert(bridges.html.includes("обычно студенческое общежитие; также член академии"));
assert(bridges.html.includes("нейтральное «курить» обычно palić"));
assert(bridges.html.includes("Во множественном braki может означать бракованные изделия"));
assert(!bridges.html.includes("Работает на любом незнакомом слове"));
assert(!bridges.html.includes("ё, е"));
assert.equal(bridges.document.querySelectorAll(".bridge-practice .exercise-item").length, 20);
assert.equal(bridges.document.querySelectorAll(".bridge-practice select.exercise-control").length, 20);
const sources = documents.get("s-sources");
assert(sources.html.includes("действующим с 1 января 2026 года"));
assert(sources.html.includes("корпусом норму"));
assert(sources.html.includes("не устанавливают норму"));
assert.equal(sources.document.querySelector(".sources-updated")?.textContent.trim(), "Эта методика и список источников актуализированы: Сентябрь 2026");
assert.equal(sources.document.querySelector("time"), null, "The public update label must use a stable month, not a technical date");
assert.equal(sources.document.querySelectorAll('a[href^="https://"]').length >= 7, true);
for(const {document} of documents.values()){
  assert.equal(document.querySelector("footer .footer-brand")?.textContent.trim(), "Polski: końcówki");
  const sourceLink = [...document.querySelectorAll("footer a[href]")].find(link => link.textContent.trim() === "О справочнике и источниках");
  assert(sourceLink, "Every page footer must link to the methodology");
  assert.equal(new URL(sourceLink.getAttribute("href"), document.querySelector('link[rel="canonical"]').getAttribute("href")).pathname, "/sources/");
}
assert(!documents.get("s-ludzie").html.includes("Wołacz - вкладка"));
assert(documents.get("s-num").html.includes("Z iloma osobami rozmawiałeś?"));
assert(documents.get("s-num").html.includes("o czterdziestu procentach"));
assert(documents.get("s-num").html.includes("Число на что оканчивается?"));
assert(documents.get("s-num").html.includes("dwadzieścia jeden domów"));
assert(!documents.get("s-num").html.includes("dwadzieścia jeden dom był"));
assert(documents.get("s-conj").html.includes("Po moim powrocie Anna zadzwoniła"));
assert(documents.get("s-conj").html.includes("Powiedział, że zadzwoni i że przyjdzie"));
assert(documents.get("s-conj").html.includes("Zostałem w domu, mimo że padało"));
assert(documents.get("s-conj").html.includes("Miał nadzieję, że jeśli wróci, porozmawiają"));
assert(documents.get("s-conj").html.includes("Zrobiłem to dlatego, że mnie prosiłeś"));
assert(documents.get("s-conj").html.includes("книжное; имеет фиксированную позицию"));
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
assert(questions.html.includes("Wolisz kawę czy herbatę?"));
assert(questions.html.includes("Ilu studentów przyszło?"));
assert(questions.html.includes("Chciałam zapytać, czy jutro jest zebranie."));
assert(questions.html.includes("Czemu się przyglądasz? - Obrazowi."));
assert(questions.html.includes("Idź tam, dokąd prowadzi ta droga."));
assert(questions.html.includes("Na czym polega problem?"));
assert(questions.html.includes("który (m3) / którego (m1, m2)"));
assert(questions.html.includes("Ten, kto to zrobił, powinien przeprosić."));
assert(!questions.html.includes("на письме и в вежливой речи ожидается"));
assert(!questions.html.includes("Без который не построить сложное предложение"));
assert(!questions.html.includes("оба переводятся как «какой»"));
assert(questions.html.includes("Czyjej torby szukasz?"));
const questionItems = [...questions.document.querySelectorAll(".question-practice .exercise-item")];
assert.equal(questionItems.length, 20);
assert.equal(questions.document.querySelectorAll(".question-practice select.exercise-control").length, 20);
assert.deepEqual([...questionItems[1].querySelectorAll("option")].slice(1).map(option => option.value), ["Dokąd", "Skąd", "Którędy"]);
assert.deepEqual([...questionItems[10].querySelectorAll("option")].slice(1).map(option => option.value), ["czy", "że", "żeby"]);
assert.deepEqual([...questionItems[13].querySelectorAll("option")].slice(1).map(option => option.value), ["Czyjej", "Czyją", "Czyja"]);
assert.deepEqual([...questionItems[17].querySelectorAll("option")].slice(1).map(option => option.value), ["Ilu", "Ile", "Które"]);
assert.deepEqual([...questionItems[18].querySelectorAll("option")].slice(1).map(option => option.value), ["czy", "że", "żeby"]);
assert(dataSource.includes('["___ jesteś smutny? - Bo tęsknię. (нейтрально)","Dlaczego"'));
assert.deepEqual([...questionItems[19].querySelectorAll("option")].slice(1).map(option => option.value), ["którym", "którego", "który"]);
const negation = documents.get("s-neg");
assert(negation.html.includes("Родительный при отрицании"));
assert(negation.html.includes("Widziałem nie Annę, lecz Marię."));
assert(negation.html.includes("nie rozmawiam z nikim"));
assert(negation.html.includes("Jej nie ma w domu / Ona nie jest w domu"));
assert(negation.html.includes("Nie muszę iść"));
assert(!negation.html.includes("Nie при глаголе не убирается никогда"));
assert(!negation.html.includes("nie ma</span> - безличное"));
const negationItems = [...negation.document.querySelectorAll(".negation-practice .exercise-item")];
assert.equal(negationItems.length, 20);
assert(dataSource.includes('"Czy ktoś dzwoni? - Nie, ___ nie dzwoni.","nikt"'));
assert(dataSource.includes('"Nie rozmawiam z ___. (nikt)","nikim"'));
assert(dataSource.includes('"Wczoraj żaden z nich nie ___. (przyjść)","przyszedł"'));
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

assert(documents.get("s-ludzie").html.includes("Письмо и сообщение"));
assert(documents.get("s-ludzie").html.includes("Z poważaniem"));
assert(documents.get("s-ludzie").html.includes("После формулы прощания запятая"),
  "The letter block must keep the punctuation rule that differs from Russian");
assert(documents.get("s-num").html.includes("o dwudziestej pierwszej piętnaście"),
  "The official clock must show that a compound hour inflects both words");
assert(documents.get("s-num").html.includes("Минуты после часа не склоняются"),
  "The official clock must warn that only the hour inflects");
const vocabularyPractice = vocabulary.document.querySelector(".vocabulary-practice");
assert(vocabularyPractice, "The vocabulary page must host the practice that drills the word list");
assert.equal(vocabularyPractice.querySelectorAll(".exercise-item").length, 20);
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
assert(documents.get("s-talk").html.includes("Nie mam dziś dużo energii i wolę zostać w domu."));
assert(!documents.get("s-talk").html.includes("i dlatego zostaję w domu"));
assert(documents.get("s-talk").html.includes(", ale chcę jeszcze trochę się uczyć"));

assert(dataSource.includes('"martwić się","o kogo?","o + Biernik"'));
assert(dataSource.includes('"znać": "новое состояние: poznać'));
assert(dataSource.includes("dwadzieścia jeden domów"));
assert(!appSource.includes("Двигаешься - Biernik."));
assert(!appSource.includes("подчинительными союзами запятая ставится <b>всегда</b>"));

const dataSandbox = vm.createContext({});
vm.runInContext(dataSource, dataSandbox, {filename:"data.js"});
const fromData = name => vm.runInContext(name, dataSandbox);
assert.equal(fromData("ABASE").length + fromData("ADIAC").length, 32, "The alphabet tables must cover all 32 Polish letters");
assert.equal(fromData("ADIAC").length, 9, "The Polish alphabet has nine letters with diacritics");
assert.equal(fromData("DIGR").length, 7, "The multiletter table must keep exactly seven digraphs");
assert.deepEqual(JSON.parse(JSON.stringify(fromData("LETTER_GROUPS").map(row => row.slice(0, 2)))), [["dzi", "триграф"], ["szcz", "два диграфа"]]);
const orthoU = fromData("ORTHO_U");
assert(orthoU.some(row => row[1].includes("-ówna") && row[1].includes("-ówka")), "ORTHO_U must cover -ówna and -ówka");
assert(orthoU.some(row => row[2].includes("skuwka") && row[2].includes("wsuwka") && row[2].includes("wypluwka")), "ORTHO_U must keep the u exceptions to -ówka");
assert(orthoU.some(row => row[1].includes("-unek") && row[1].includes("-uszek")), "ORTHO_U must cover common suffixes written with u");
assert(orthoU.some(row => row[2].includes("pracuję") && row[2].includes("snuję")), "ORTHO_U must cover verb forms from -ować and -uć");
assert.deepEqual(Array.from(fromData("ADJ"), row => row[0]),
  ["Mianownik", "Dopełniacz", "Celownik", "Biernik", "Narzędnik", "Miejscownik", "Wołacz"],
  "The full adjective paradigm must include all seven Polish cases");
assert(fromData("PARTPIS").some(row => row[1].includes("деепричастиями") && row[2].includes("nie będąc")),
  "The spelling table must distinguish adverbial participles from adjectival participles");
assert.equal(fromData("LIST_FORM").length, 4, "The letter block must cover four registers from official to first-name basis");
assert.equal(fromData("GODZ_URZ").length, 6, "The official clock must show the 24 hour scale across the afternoon and evening");
assert(fromData("GODZ_URZ").every(row => row[2].startsWith("o ")), "Every official hour needs its o + Miejscownik form");


const exerciseSets = [
  "CASE_PRACTICE", "CASE_TEST", "VERB_PRACTICE", "VERB_TEST", "PREP_PRACTICE", "PREP_TEST",
  "ADJ_PRACTICE", "ADJ_TEST", "ROD_PRACTICE", "ADV_PRACTICE", "PRON_PRACTICE",
  "CONJ_PRACTICE", "PART_PRACTICE", "ALT_PRACTICE", "PEOPLE_PRACTICE", "ALPHA_PRACTICE",
  "DIM_PRACTICE", "BRIDGE_PRACTICE", "NUM_PRACTICE", "QUESTION_PRACTICE", "NEG_PRACTICE",
  "ORDER_PRACTICE", "IMPERS_PRACTICE"
];
for(const name of exerciseSets){
  if(!dataSource.includes(`${name}.tasks = `)) continue;
  assert(new RegExp(`const ${name}\\s*=\\s*\\{[^\\n]*tasks:\\[\\]\\};`).test(dataSource),
    `${name}: a practice filled by a later assignment must declare tasks:[], otherwise data.js keeps two versions of the same set and edits land in the dead one`);
}

const answerSets = [];
const promptsBySet = new Map();
const exerciseIds = [];
for(const name of exerciseSets){
  const prompts = [];
  for(const practice of [fromData(name)].flat())
    for(const task of practice.tasks){
      exerciseIds.push(task.id);
      assert(task.answers?.length || task.passage?.some(part => part?.answers?.length), `${name} · ${task.id}: an exercise needs an answer`);
      prompts.push(task.prompt.replace(/\s+/g, " ").trim());
      if(task.answers) answerSets.push({where:`${name} · ${task.id}`, answers:task.answers, options:task.options || null});
      for(const part of task.passage || [])
        if(part?.answers) answerSets.push({where:`${name} · ${task.id}/${part.key}`, answers:part.answers, options:part.options || null});
    }
  assert.equal(new Set(prompts).size, prompts.length, `${name}: exact prompt duplicates weaken practice coverage`);
  promptsBySet.set(name, prompts);
}
assert.equal(exerciseIds.length, 751, "The handbook practice must expose all 751 exercises");
const renderedExercises = [...documents.values()].map(page => page.html).join("\n");
for(const id of exerciseIds)
  assert(renderedExercises.includes(`data-exercise-id="${id}"`),
    `${id}: an exercise that exists in data but is rendered on no page is invisible to the learner and still inflates the practice count`);
assert.equal(new Set(exerciseIds).size, exerciseIds.length, "Exercise ids must be unique across the handbook");
assert(answerSets.length > 400, "Every practice block must be reachable from exerciseSets");

for(const [practiceName, testName] of [["CASE_PRACTICE", "CASE_TEST"], ["VERB_PRACTICE", "VERB_TEST"], ["PREP_PRACTICE", "PREP_TEST"], ["ADJ_PRACTICE", "ADJ_TEST"]]){
  const practicePrompts = new Set(promptsBySet.get(practiceName));
  assert(!promptsBySet.get(testName).some(prompt => practicePrompts.has(prompt)),
    `${testName}: a final test must not repeat an exact prompt from ${practiceName}`);
}

const beMarker = "(?:będę|będziesz|będzie|będziemy|będziecie|będą)";
const futureWithInfinitive = new RegExp(`^${beMarker} \\S+ć( się)?$`);
const futureWithPastForm = new RegExp(`^${beMarker} \\S+(ł|ła|ło|li|ły)( się)?$`);
for(const {where, answers, options} of answerSets){
  assert(answers.every(answer => typeof answer === "string" && answer.trim() === answer && answer),
    `${where}: every answer must be a non-empty trimmed string`);
  assert.equal(new Set(answers).size, answers.length, `${where}: answers must not repeat`);
  if(options){
    assert(options.every(option => typeof option === "string" && option.trim() === option && option),
      `${where}: every option must be a non-empty trimmed string`);
    assert.equal(new Set(options).size, options.length, `${where}: options must not repeat`);
    assert(answers.every(answer => options.includes(answer)), `${where}: every correct answer must be available among the options`);
    continue;
  }
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
assert(fromData("IMPER").some(row => row[0] === "dawać" && row[2] === "dawaj!" && row[5].includes("dają")), "IMPER must distinguish dawać → dawaj from dać → daj");
assert(fromData("IMPER").every(row => row[5].includes(" / ")), "Every IMPER row must show both singular and plural forms with niech");
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
  ["s-adj", "adjectives", "Тренажёр форм прилагательных", ["kind", "gender"]],
  ["s-pron", "pronouns", "Тренажёр местоимений", ["topic"]],
  ["s-preps", "prepositions", "Тренажёр предлогов", ["topic"]],
  ["s-neg", "negation", "Тренажёр отрицания", ["topic"]],
  ["s-part", "phrases", "Тренажёр разговорных реплик", ["topic"]],
  ["s-verbs", "government", "Тренажёр управления", ["topic", "trap"]],
  ["s-bridge", "falsefriends", "Тренажёр ложных друзей", ["topic"]]
];
assert.match(css, /\.trainer \.trainer-filter\{[^}]*min-width:0/, "Trainer filters must be allowed to shrink on narrow screens");
assert.match(css, /\.trainer \.trainer-tog\{[^}]*overflow-x:auto/, "Wide trainer toggles must scroll locally instead of widening the page");
for(const [id, path, heading, filters] of trainerPages){
  const page = documents.get(id).document;
  const block = [...page.querySelectorAll(".sec .trainer")]
    .find(node => node.querySelector(".practice-heading h2")?.textContent.trim() === heading);
  assert(block, `${path} must host its trainer`);
  assert(block.dataset.trainer, `${path}: the trainer names its deck`);
  assert.equal(page.querySelectorAll(".sec .trainer").length,
    trainerPages.filter(entry => entry[0] === id).length, `${id}: every trainer on the page is registered here`);
  assert.equal(block.querySelector(".practice-heading h2")?.textContent.trim(), heading);
  assert(block.classList.contains("practice"), "The trainer is a practice block, so it stays out of search and fulltext");
  assert.deepEqual([...block.querySelectorAll("[data-trainer-filter]")].map(bar => bar.dataset.trainerFilter), filters);
  assert.equal(block.querySelectorAll("[data-trainer-chip]").length, 3);
  assert(block.querySelector("[data-trainer-stage]")?.hasAttribute("hidden"));
  assert(block.querySelector("noscript"), `${path}: the trainer must say what to read when scripts do not run`);
  assert.deepEqual([...block.querySelectorAll("[data-trainer-keys] button")].map(button => button.dataset.key),
    ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"], `${path}: the trainer must offer the Polish letters that a Russian keyboard lacks`);
  assert(block.querySelector("[data-trainer-stats]")?.hasAttribute("hidden"), `${path}: per topic accuracy starts hidden`);
  assert.match(page.querySelector("script[src]").dataset.trainerSrc, /trainer-data\.js\?v=[a-f0-9]{10}$/);
}
assert.equal(documents.get("s-verbs").document.querySelector('.trainer [data-trainer-filter="tense"]')?.querySelectorAll("button").length, 4);
assert.equal(documents.get("s-verbs").document.querySelector('.trainer [data-trainer-filter="gender"]')?.querySelectorAll("button").length, 4);
assert.equal(documents.get("s-cases").document.querySelector('.trainer [data-trainer-filter="case"]')?.querySelectorAll("button").length, 8);
assert.equal(documents.get("s-cases").document.querySelector('.trainer [data-trainer-filter="number"]')?.querySelectorAll("button").length, 3);
assert.equal(documents.get("s-adj").document.querySelector('.trainer [data-trainer-filter="kind"]')?.querySelectorAll("button").length, 4);
assert.equal(documents.get("s-adj").document.querySelector('.trainer [data-trainer-filter="gender"]')?.querySelectorAll("button").length, 6);

const trainerData = await readFile(resolve(root, "trainer-data.js"), "utf8");
const trainerDecks = JSON.parse(trainerData.replace(/^globalThis\.TRAINER_DATA=/, "").replace(/;\s*$/, ""));
for(const [name, count] of [["pronouns",31],["prepositions",55],["negation",19]]){
  const rows = trainerDecks.sentences[name];
  assert.equal(rows.length, count, `${name}: sentence deck coverage`);
  assert.equal(new Set(rows.map(row => row.id)).size, rows.length, `${name}: stable unique question IDs`);
  assert.equal(new Set(rows.map(row => row.topic)).size, 3, `${name}: all three filters have questions`);
  for(const row of rows){
    assert(!/[А-Яа-яЁё]/.test(row.prompt), `${name}/${row.id}: Polish prompt must not contain Russian instructions`);
    assert.equal((row.prompt.match(/___/g) || []).length, 1, `${name}/${row.id}: one input per question`);
    assert(typeof row.cue === "string" && row.explanation && row.answers.length && row.answers.every(answer => typeof answer === "string" && answer.trim()), `${name}/${row.id}: complete question`);
  }
}
const government = trainerDecks.sentences.government;
assert.equal(government.length, 65, "government: the whole rekcja table is drilled");
assert.equal(new Set(government.map(row => row.id)).size, government.length, "government: stable unique question IDs");
assert.equal(new Set(government.map(row => row.topic)).size, 3, "government: verbs, adjectives and nouns all have questions");
assert.equal(government.filter(row => row.trap === "trap").length, 41, "government: the Russian-mismatch filter keeps its selection");
for(const row of government){
  assert.equal((row.prompt.match(/___/g) || []).length, 1, `government/${row.id}: one input per question`);
  assert(!/[А-Яа-яЁё]/.test(row.prompt), `government/${row.id}: Polish prompt must not contain Russian instructions`);
  assert(row.cue && row.explanation && row.answers.length, `government/${row.id}: complete question`);
}
const falseFriends = trainerDecks.sentences.falsefriends;
assert.equal(falseFriends.length, 89, "falsefriends: every unambiguous pair is drilled");
assert.equal(new Set(falseFriends.map(row => row.id)).size, falseFriends.length, "falsefriends: stable unique question IDs");
assert.equal(new Set(falseFriends.map(row => row.topic)).size, 5, "falsefriends: all five groups have questions");
for(const row of falseFriends){
  assert(/[А-Яа-яЁё]/.test(row.prompt), `falsefriends/${row.id}: the prompt is the Russian word`);
  assert(row.answers.length && row.answers.every(answer => /^[^А-Яа-яЁё;]+$/.test(answer) && answer.trim()),
    `falsefriends/${row.id}: Polish answers only`);
  assert(row.cue && row.explanation, `falsefriends/${row.id}: complete question`);
}
const phrases = trainerDecks.sentences.phrases;
assert.equal(phrases.length, 27, "phrases: reply deck coverage");
assert.equal(new Set(phrases.map(row => row.id)).size, phrases.length, "phrases: stable unique question IDs");
assert.equal(new Set(phrases.map(row => row.topic)).size, 3, "phrases: all three filters have questions");
for(const row of phrases){
  assert(/[А-Яа-яЁё]/.test(row.prompt), `phrases/${row.id}: the prompt is the Russian phrase`);
  assert(!row.prompt.includes("___"), `phrases/${row.id}: this deck translates instead of filling a gap`);
  assert(row.cue && row.explanation, `phrases/${row.id}: complete question`);
  assert(row.answers.length && row.answers.every(answer => /^[^А-Яа-яЁё]+$/.test(answer) && !/[!?.]$/.test(answer.trim())),
    `phrases/${row.id}: Polish answers without trailing punctuation`);
}
assert(trainerDecks.sentences.pronouns.every(row => !["pron-20","pron-24","pron-27"].includes(row.id)), "Do not convert ambiguous or metalinguistic choice tasks to free input");
assert.deepEqual(trainerDecks.sentences.negation.find(row => row.id === "neg-4").answers, ["nie ma"]);
assert.deepEqual(trainerDecks.sentences.negation.find(row => row.id === "neg-5").answers, ["nie jest"]);
const sentenceQuestion = (deck, id) => trainerDecks.sentences[deck].find(row => row.id === id);
for(const id of ["pron-16","pron-19","pron-29"]){
  const row = sentenceQuestion("pronouns", id);
  assert(!row.cue.toLowerCase().includes(row.answers[0].toLowerCase()), `${id}: cue must not disclose the answer`);
}
assert(trainerDecks.sentences.pronouns.filter(row => row.topic === "reflexive").length >= 8);
assert(trainerDecks.sentences.negation.filter(row => row.topic === "negative").length >= 8);
assert(!sentenceQuestion("negation", "neg-7"), "Do not repeat czas with an unrelated punctuation explanation");
assert(!sentenceQuestion("prepositions", "prep-space-extra-6"));
assert(!sentenceQuestion("prepositions", "prep-space-extra-8"));
assert.equal(sentenceQuestion("prepositions", "prep-government-extra-8").topic, "meaning");
assert.equal(sentenceQuestion("prepositions", "prepme-4").cue, "сходить за хлебом");
assert.deepEqual(sentenceQuestion("pronouns", "pron-own-book").answers, ["swoją","swą"]);
assert(trainerDecks.sentences.prepositions.some(row => row.cue === ""), "Obvious gap instructions stay hidden");
const appSlice = (from, to) => appSource.slice(appSource.indexOf(from), appSource.indexOf(to));
vm.runInContext(appSlice("const norm = s =>", "function verbPracticeHTML"), dataSandbox);
vm.runInContext(appSlice("const slug = s =>", "function linkHeadings"), dataSandbox);
vm.runInContext(appSlice("const FALSE_EXTRA = {", "function sentenceTrainerHTML(name)"), dataSandbox);
const reorderedCues = vm.runInContext(`(() => {
  const group = PREP_PRACTICE.find(item => item.id === "meaning");
  group.tasks.reverse();
  try { return JSON.stringify(trainerSentences("prepositions").map(({id,cue}) => [id,cue]).sort()); }
  finally { group.tasks.reverse(); }
})()`, dataSandbox);
assert.deepEqual(JSON.parse(reorderedCues), trainerDecks.sentences.prepositions.map(({id,cue}) => [id,cue]).sort(), "Reordering source tasks must preserve each meaning cue");
const reorderedIds = (array, deck) => JSON.parse(vm.runInContext(`(() => {
  ${array}.reverse();
  try { return JSON.stringify(trainerSentences("${deck}").map(({id, prompt}) => [id, prompt]).sort()); }
  finally { ${array}.reverse(); }
})()`, dataSandbox));
for(const [array, deck] of [["REKCJA_TRAIN", "government"], ["REPLIKI", "phrases"], ["FALSE", "falsefriends"]])
  assert.deepEqual(reorderedIds(array, deck), trainerDecks.sentences[deck].map(({id, prompt}) => [id, prompt]).sort(),
    `${deck}: question IDs must stay with their content when source rows move`);
for(const deck of ["government", "phrases", "falsefriends"])
  assert(trainerDecks.sentences[deck].every(row => !/^[a-z]+-\d+$/.test(row.id)),
    `${deck}: question IDs must come from content, not from the row number`);
assert.equal(sentenceQuestion("falsefriends", "false-sklep").prompt, "склеп");
assert.equal(sentenceQuestion("phrases", "phrase-вот-именно").answers[0], "No właśnie");
assert.equal(sentenceQuestion("falsefriends", "false-uroda").prompt, sentenceQuestion("falsefriends", "false-urzad").prompt,
  "Two false friends share the Russian prompt, so the Polish word identifies the question");
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
assert.equal(trainerNouns.length, 217, "The noun trainer drills every declension example that carries a dictionary form");
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
assert.equal(nounAnswer("Niemcy", "miej", "pl"), "Niemczech");
assert.equal(nounAnswer("Włochy", "miej", "pl"), "Włoszech");
assert.equal(nounAnswer("Węgry", "miej", "pl"), "Węgrzech");
assert.equal(nounAnswer("Piotr", "woł", "sg"), "Piotrze");
const nounReferences = trainerNouns.filter(item => item.ref);
assert.equal(nounReferences.length, 49, "Every noun card whose hint recommends a rule, orientation or list must link to it");
assert.equal(new Set(nounReferences.map(item => item.ref)).size, 7);
for(const item of nounReferences){
  const match = item.ref.match(/^#([^/]+)\/(sg|pl)\/~(.+)$/);
  assert(match, `${item.l}: the trainer reference must use the case deep-link format`);
  assert.equal(match[1], item.c);
  assert.equal(match[2], item.n);
  const variant = documents.get("s-cases").document.querySelector(`.case-variant[data-case="${item.c}"][data-num="${item.n}"]`);
  assert([...variant.querySelectorAll("[data-h]")].some(node => node.dataset.h === match[3]),
    `${item.l}: the trainer reference target must exist in its case and number variant`);
}
const moneyReference = trainerNouns.find(item => item.l === "pieniądze" && item.c === "narz" && item.n === "pl");
assert.equal(moneyReference.ref, "#narz/pl/~narzednik-mi");
assert.equal(moneyReference.refLabel, "Открыть список");
const breadReference = trainerNouns.find(item => item.l === "chleb" && item.c === "dop" && item.n === "sg");
assert.equal(breadReference.ref, "#dop/sg/~dopelnienie-a");
assert.equal(breadReference.refLabel, "Открыть ориентир");
const sugarReference = trainerNouns.find(item => item.l === "cukier" && item.c === "dop" && item.n === "sg");
assert.equal(sugarReference.ref, "#dop/sg/~dopelnienie-u");
assert.equal(sugarReference.refLabel, "Открыть ориентир");
const instrumentalMi = documents.get("s-cases").document.querySelector('[data-case="narz"][data-num="pl"] [data-h="narzednik-mi"]');
assert.equal(instrumentalMi.querySelector(".blabel").textContent.trim(), "частые формы на -mi");
assert.match(instrumentalMi.querySelector(".bnote").textContent, /список не исчерпывающий/);
assert(!documents.get("s-cases").html.includes("короткий список, стоит выучить целиком"));
assert(!trainerNouns.some(item => item.c === "mian" && item.n === "sg"),
  "Nominative singular is the dictionary form, so there is nothing to drill");
for(const [caseId] of trainerDecks.cases) for(const number of ["sg", "pl"]){
  if(caseId === "mian" && number === "sg") continue;
  assert(trainerNouns.filter(item => item.c === caseId && item.n === number).length >= 13,
    `${caseId} ${number}: the noun trainer needs 13 words to preserve a 12-word no-repeat window`);
}

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
assert(!trainerAdjectives.some(item => item.k === "case" && item.t.startsWith("Wołacz")),
  "The vocative adjective forms match the nominative and must not duplicate trainer prompts");

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
assert.equal(new Set(searchIndex.map(entry => entry.tab)).size, 27);
assert(searchIndex.some(entry => entry.tab === "s-sources" && entry.text.includes("блог, форум")), "Methodology must be searchable");
assert(searchIndex.every(entry => /^r-\d+$/.test(entry.id) && entry.text));
assert(searchIndex.every(entry => documents.get(entry.tab)?.document.getElementById(entry.id)), "Every search entry must resolve on its topic page");

const excluded = new Set([...jekyllConfig.matchAll(/^\s*-\s*(.+?)\s*$/gm)].map(match => match[1]));
for(const engine of ["game.js", "sekunda.js", "detektyw.js", "zdanie.js"]){
  const engineSource = await readFile(resolve(root, engine), "utf8");
  assert.equal(engineSource.match(/^(?:const|let|var|function|class)\s/gm), null,
    `${engine} shares the global scope with client.js, so it must declare nothing at the top level`);
}

const deckInfo = new Map();
for(const [id, , heading] of trainerPages){
  const page = documents.get(id).document;
  const block = [...page.querySelectorAll(".sec .trainer")]
    .find(node => node.querySelector(".practice-heading h2")?.textContent.trim() === heading);
  deckInfo.set(block.dataset.trainer, {
    page: routes.find(route => route[0] === id)[1],
    filters: new Map([...block.querySelectorAll("[data-trainer-filter]")].map(bar =>
      [bar.dataset.trainerFilter, new Set([...bar.querySelectorAll("[data-value]")].map(button => button.dataset.value))]))
  });
}

const deckKeys = deck => {
  if(trainerDecks.sentences[deck]) return new Set(trainerDecks.sentences[deck].map(row => row.id));
  if(deck === "nouns") return new Set(trainerDecks.nouns.map(row => `${row.l}|${row.c}|${row.n}`));
  if(deck === "adjectives") return new Set(trainerDecks.adjectives.map(row => `${row.l}|${row.k}|${row.t}|${row.d}`));
  if(deck === "verbs"){
    const keys = new Set();
    for(const verb of trainerDecks.verbs){
      (verb.pr || []).forEach((_, cell) => keys.add(`${verb.l}|present|${cell}`));
      verb.pa.forEach((_, cell) => keys.add(`${verb.l}|past|${cell}`));
      verb.fu.forEach((_, cell) => keys.add(`${verb.l}|future|${cell}`));
    }
    return keys;
  }
  return null;
};

const gameSandbox = vm.createContext({globalThis: {}});
vm.runInContext(await readFile(resolve(root, "game-data.js"), "utf8"), gameSandbox, {filename:"game-data.js"});
const gameData = gameSandbox.globalThis.GAME_DATA;
const gameFold = text => text.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/\p{M}/gu, "");
const gameTokens = text => (text.match(/[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/g) || []).map(gameFold);
const usedRules = new Set();
const gameIds = new Set();
const gameWarnings = [];

for(const question of gameData.milionerzy){
  const where = `milionerzy/${question.id}`;
  assert(question.id && !/^[a-z]+-\d+$/.test(question.id), `${where}: content based id`);
  assert(!gameIds.has(question.id), `${where}: duplicate id`);
  gameIds.add(question.id);
  assert([1, 2, 3].includes(question.tier), `${where}: tier is 1, 2 or 3`);
  assert(question.level === undefined || [1, 2, 3].includes(question.level),
    `${where}: level is 1, 2 or 3 when present`);
  assert(question.topic && question.explanation, `${where}: topic and explanation are filled`);
  assert.equal(question.options.length, 4, `${where}: exactly four options`);
  assert.equal(new Set(question.options).size, 4, `${where}: options must differ`);
  assert(question.options.includes(question.answer), `${where}: the answer is one of the options`);
  assert((question.prompt.match(/___/g) || []).length <= 1, `${where}: at most one gap`);
  assert(Array.isArray(question.lemmas) && question.lemmas.length, `${where}: lemmas are listed`);

  const rule = gameData.rules[question.ruleId];
  assert(rule, `${where}: ruleId ${question.ruleId} is missing from rules`);
  usedRules.add(question.ruleId);
  const ruleTokens = new Set(gameTokens(rule.text));
  assert(!gameTokens(question.answer).every(token => ruleTokens.has(token)),
    `${where}: the hint must not name the answer`);
  for(const option of question.options)
    if(option !== question.answer && gameTokens(option).every(token => ruleTokens.has(token)))
      gameWarnings.push(`${where}: the hint mentions the wrong option ${option}`);

  const [rulePath, ruleHash] = rule.url.replace(/^\//, "").split("#");
  const ruleRoute = routes.find(route => route[1] === rulePath.replace(/\/$/, ""));
  assert(ruleRoute, `${where}: rule url points at a page that does not exist: ${rule.url}`);
  const ruleAnchor = (ruleHash || "").split("/").find(part => part.startsWith("~"));
  if(ruleAnchor){
    const rulePage = documents.get(ruleRoute[0]).document;
    assert([...rulePage.querySelectorAll("[data-h]")].some(node => node.dataset.h === ruleAnchor.slice(1)),
      `${where}: rule url anchor ${ruleAnchor} is not a heading of /${rulePath}`);
  }

  if(question.drill){
    const info = deckInfo.get(question.drill.deck);
    assert(info, `${where}: unknown deck ${question.drill.deck}`);
    for(const [name, chosen] of Object.entries(question.drill.filter || {})){
      assert(info.filters.has(name), `${where}: deck ${question.drill.deck} has no filter ${name}`);
      assert(info.filters.get(name).has(chosen), `${where}: filter ${name} has no value ${chosen}`);
    }
    if(question.drillKey)
      assert(deckKeys(question.drill.deck).has(question.drillKey),
        `${where}: drillKey ${question.drillKey} is not a real key of deck ${question.drill.deck}`);
  }else{
    assert(!question.drillKey, `${where}: drillKey without drill`);
  }
}
const detektywIds = new Set();
for(const item of gameData.detektyw){
  const where = `detektyw/${item.id}`;
  assert(/^det-[a-z0-9-]+$/.test(item.id), `${where}: id is a content slug with the det- prefix`);
  assert(!detektywIds.has(item.id), `${where}: duplicate id`);
  detektywIds.add(item.id);
  assert([1, 2, 3].includes(item.tier), `${where}: tier is 1, 2 or 3`);
  assert(item.topic && item.explanation, `${where}: topic and explanation are filled`);
  const slots = [...item.text.matchAll(/\{([^{}|]+)\|([^{}|]+)\}/g)];
  assert.equal(slots.length, 1, `${where}: exactly one {right|wrong} slot`);
  assert.equal((item.text.match(/[{}|]/g) || []).length, 3, `${where}: no stray slot markers`);
  const [, right, wrong] = slots[0];
  assert.notEqual(right, wrong, `${where}: the error differs from the right form`);
  assert.equal(item.options.length, 3, `${where}: three corrections`);
  assert.equal(new Set(item.options).size, 3, `${where}: corrections must differ`);
  assert(item.options.includes(right), `${where}: the right form is among the corrections`);
  assert(!item.options.includes(wrong), `${where}: the shown error must not return as a correction`);
  assert(Array.isArray(item.lemmas) && item.lemmas.length, `${where}: lemmas are listed`);
  const rule = gameData.rules[item.ruleId];
  assert(rule, `${where}: ruleId ${item.ruleId} is missing from rules`);
  usedRules.add(item.ruleId);
  const [rulePath, ruleHash] = rule.url.replace(/^\//, "").split("#");
  const ruleRoute = routes.find(route => route[1] === rulePath.replace(/\/$/, ""));
  assert(ruleRoute, `${where}: rule url points at a page that does not exist: ${rule.url}`);
  const ruleAnchor = (ruleHash || "").split("/").find(part => part.startsWith("~"));
  if(ruleAnchor)
    assert([...documents.get(ruleRoute[0]).document.querySelectorAll("[data-h]")].some(node => node.dataset.h === ruleAnchor.slice(1)),
      `${where}: rule url anchor ${ruleAnchor} is not a heading of /${rulePath}`);
  if(item.drill){
    const info = deckInfo.get(item.drill.deck);
    assert(info, `${where}: unknown deck ${item.drill.deck}`);
    for(const [name, chosen] of Object.entries(item.drill.filter || {})){
      assert(info.filters.has(name), `${where}: deck ${item.drill.deck} has no filter ${name}`);
      assert(info.filters.get(name).has(chosen), `${where}: filter ${name} has no value ${chosen}`);
    }
    if(item.drillKey)
      assert(deckKeys(item.drill.deck).has(item.drillKey),
        `${where}: drillKey ${item.drillKey} is not a real key of deck ${item.drill.deck}`);
    const task = trainerDecks.sentences[item.drill.deck]?.find(row => row.id === item.drillKey);
    if(task && item.drill.filter?.topic)
      assert.equal(item.drill.filter.topic, task.topic, `${where}: the drill filter must show the topic of ${item.drillKey}`);
  }else{
    assert(!item.drillKey, `${where}: drillKey without drill`);
  }
}
assert.equal(gameData.detektyw.filter(item => item.tier === 1).length, 24, "Detektyw starts with 24 audited first-tier cases");
assert.equal(gameData.detektyw.filter(item => item.tier === 2).length, 24, "Detektyw has 24 audited second-tier cases");
assert.equal(gameData.detektyw.filter(item => item.tier === 3).length, 24, "Detektyw has 24 audited third-tier cases");
const phraseWords = text => text.split(/\s+/).map(word => word.replace(/^[.,?!;:«»"]+|[.,?!;:«»"]+$/g, "")).filter(Boolean);
const phraseBag = text => phraseWords(text).map(word => word.toLocaleLowerCase("pl")).sort().join(" ");
const zdanieIds = new Set();
for(const item of gameData.zdanie){
  const where = `zdanie/${item.id}`;
  assert(/^zd-[a-z0-9-]+$/.test(item.id), `${where}: id is a content slug with the zd- prefix`);
  assert(!zdanieIds.has(item.id), `${where}: duplicate id`);
  zdanieIds.add(item.id);
  assert([1, 2, 3].includes(item.tier), `${where}: tier is 1, 2 or 3`);
  assert(item.topic && item.prompt && item.explanation, `${where}: topic, prompt and explanation are filled`);
  assert(Array.isArray(item.answers) && item.answers.length, `${where}: at least one answer`);
  assert.equal(new Set(item.answers.map(phraseBag)).size, 1, `${where}: every answer is built from the same tiles`);
  assert.equal(new Set(item.answers.map(answer => phraseWords(answer).map(word => word.toLocaleLowerCase("pl")).join(" "))).size,
    item.answers.length, `${where}: answers must differ in word order, not only in punctuation`);
  const words = phraseWords(item.answers[0]);
  const lowered = new Set(words.map(word => word.toLocaleLowerCase("pl")));
  assert(Array.isArray(item.extra) && item.extra.length >= 1 && item.extra.length <= 3, `${where}: one to three extra tiles`);
  assert.equal(new Set(item.extra).size, item.extra.length, `${where}: extra tiles differ`);
  for(const tile of item.extra){
    assert.equal(phraseWords(tile).length, 1, `${where}: extra tile ${tile} is one word`);
    assert(!lowered.has(tile.toLocaleLowerCase("pl")), `${where}: extra tile ${tile} is a word of the phrase`);
  }
  assert(words.length + item.extra.length <= 12, `${where}: at most 12 tiles`);
  for(const name of item.names || [])
    assert(words.includes(name) || item.extra.includes(name), `${where}: name ${name} is one of the tiles`);
  assert(Array.isArray(item.lemmas) && item.lemmas.length, `${where}: lemmas are listed`);
  const rule = gameData.rules[item.ruleId];
  assert(rule, `${where}: ruleId ${item.ruleId} is missing from rules`);
  usedRules.add(item.ruleId);
  const [rulePath, ruleHash] = rule.url.replace(/^\//, "").split("#");
  const ruleRoute = routes.find(route => route[1] === rulePath.replace(/\/$/, ""));
  assert(ruleRoute, `${where}: rule url points at a page that does not exist: ${rule.url}`);
  const ruleAnchor = (ruleHash || "").split("/").find(part => part.startsWith("~"));
  if(ruleAnchor)
    assert([...documents.get(ruleRoute[0]).document.querySelectorAll("[data-h]")].some(node => node.dataset.h === ruleAnchor.slice(1)),
      `${where}: rule url anchor ${ruleAnchor} is not a heading of /${rulePath}`);
  if(item.drill){
    const info = deckInfo.get(item.drill.deck);
    assert(info, `${where}: unknown deck ${item.drill.deck}`);
    for(const [name, chosen] of Object.entries(item.drill.filter || {})){
      assert(info.filters.has(name), `${where}: deck ${item.drill.deck} has no filter ${name}`);
      assert(info.filters.get(name).has(chosen), `${where}: filter ${name} has no value ${chosen}`);
    }
    if(item.drillKey)
      assert(deckKeys(item.drill.deck).has(item.drillKey),
        `${where}: drillKey ${item.drillKey} is not a real key of deck ${item.drill.deck}`);
    const task = trainerDecks.sentences[item.drill.deck]?.find(row => row.id === item.drillKey);
    if(task && item.drill.filter?.topic)
      assert.equal(item.drill.filter.topic, task.topic, `${where}: the drill filter must show the topic of ${item.drillKey}`);
  }else{
    assert(!item.drillKey, `${where}: drillKey without drill`);
  }
}
assert.equal(gameData.zdanie.filter(item => item.tier === 1).length, 24, "Zdanie starts with 24 audited first-tier phrases");
assert.equal(gameData.zdanie.filter(item => item.tier === 2).length, 24, "Zdanie has 24 audited second-tier phrases");
assert.equal(gameData.zdanie.filter(item => item.tier === 3).length, 24, "Zdanie has 24 audited third-tier phrases");
for(const ruleId of Object.keys(gameData.rules))
  assert(usedRules.has(ruleId), `rules/${ruleId} is not used by any question`);
for(const warning of gameWarnings) console.log(`  предупреждение: ${warning}`);

const speedSandbox = vm.createContext({globalThis: {}});
vm.runInContext(await readFile(resolve(root, "sekunda-data.js"), "utf8"), speedSandbox, {filename:"sekunda-data.js"});
const speedData = speedSandbox.globalThis.SEKUNDA_DATA;
assert.equal(JSON.stringify(speedData.clock), JSON.stringify({start:60, bonus:2, penalty:5}));
const speedCount = kind => speedData.items.filter(item => item.k === kind).length;
assert.equal(speedCount("gender"), 110, "Gender cards come from VOCAB_NOUNS plus the ROD_DIFF words missing from it");
assert.equal(speedCount("aspect"), 152, "Aspect cards come from VERBS and ASPECT");
assert.equal(speedCount("ortho"), 101, "Spelling cards are the hand-written SPEED_ORTHO list");
assert.equal(speedCount("falsefriends"), 89, "False friend cards are the FALSE rows with a Russian lure of the form «word - polish»");
assert.equal(speedCount("spacing"), 37, "Spacing cards come from PARTPIS minus SPEED_SKIP");
assert.equal(speedCount("capitals"), 45, "Capital letter cards come from WIELKA_D and WIELKA_M minus SPEED_SKIP");
const speedSkip = JSON.parse(vm.runInContext(`${dataSource};JSON.stringify(SPEED_SKIP)`, vm.createContext({}), {filename:"data.js"}));
const speedExamples = new Set(speedData.items.map(item => item.id.slice(item.id.indexOf("-") + 1)));
for(const example of speedSkip)
  assert(!speedExamples.has(example), `sekunda: ${example} is listed in SPEED_SKIP but still became a card`);
assert.equal(new Set(speedData.items.map(item => item.id)).size, speedData.items.length, "Speed card ids must be unique");
for(const item of speedData.items){
  const where = `sekunda/${item.id}`;
  assert(speedData.topics[item.k], `${where}: unknown topic`);
  assert(item.o.length === 2 || item.o.length === 3, `${where}: two or three options`);
  assert(Number.isInteger(item.a) && item.o[item.a] !== undefined, `${where}: the answer is one of the options`);
  assert(item.w, `${where}: explanation is filled`);
  assert(!item.f || item.f.length === item.o.length, `${where}: one fill per option`);
  if(["ortho", "spacing", "capitals", "gender"].includes(item.k)){
    assert(Array.isArray(item.p) && item.p.join("").length > 0, `${where}: card has a gap`);
    assert(![...item.p.join("")].some(char => char === "_" || char === "(" || char === ")"), `${where}: stray gap marker`);
  }
}
const speedPage = documents.get("s-sek").document;
const speedHost = speedPage.querySelector("[data-game='sekunda']");
assert.equal(speedHost?.dataset.speedStart, "60");
assert.deepEqual([...speedHost.querySelectorAll("[data-topic]")].map(button => button.dataset.topic), ["all", ...Object.keys(speedData.topics)]);
const speedUrls = new Set([...Object.values(speedData.topics).map(topic => topic.url), ...speedData.items.map(item => item.u)].filter(Boolean));
for(const url of speedUrls){
  const [urlPath, urlHash] = url.replace(/^\//, "").split("#");
  const urlRoute = routes.find(route => route[1] === urlPath.replace(/\/$/, ""));
  assert(urlRoute, `sekunda: rule url points at a page that does not exist: ${url}`);
  const urlAnchor = (urlHash || "").split("/").find(part => part.startsWith("~"));
  if(urlAnchor)
    assert([...documents.get(urlRoute[0]).document.querySelectorAll("[data-h]")].some(node => node.dataset.h === urlAnchor.slice(1)),
      `sekunda: anchor ${urlAnchor} is not a heading of /${urlPath}`);
}
assert(speedData.items.filter(item => item.k === "gender").every(item => ["ten", "ta", "to"].join() === item.o.join()));
assert.equal(speedData.items.find(item => item.id === "gender-problem")?.u, "/gender/#~род-расходится-с-русским");
assert.equal(speedData.items.find(item => item.id === "aspect-zrobić")?.a, 1);
assert.equal(speedData.items.find(item => item.id === "ortho-stół")?.o[speedData.items.find(item => item.id === "ortho-stół").a], "ó");

const publicRoot = new Set([
  "404.html", "CNAME", "apple-touch-icon.png", "client.js", "favicon.ico", "favicon.svg",
  "game-data.js", "game.js", "index.html", "sekunda-data.js", "sekunda.js", "detektyw.js", "zdanie.js", "og", "plan-40", "robots.txt", "search-index.js", "trainer-data.js",
  "sitemap.xml", "style.css",
  ...routes.map(([, path]) => path).filter(Boolean)
]);
for(const entry of await readdir(root)){
  if(entry.startsWith(".") || entry.startsWith("_") || entry === "node_modules") continue;
  assert(publicRoot.has(entry) || excluded.has(entry), `${entry} is served by GitHub Pages: publish it on purpose or add it to _config.yml`);
}
for(const path of publicRoot) assert(!excluded.has(path), `_config.yml must not hide ${path}`);

console.log(`Static page checks passed: ${routes.length} pages, ${searchIndex.length} search entries, ${excluded.size} paths hidden from Pages`);
