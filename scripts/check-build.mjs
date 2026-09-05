import { readFile, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
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
const TOC_MIN = 6;
const sitemapPaths = [...routes.map(([, path]) => path), "plan-40"];
const routePaths = new Set([
  ...routes.map(([, path]) => `/${path ? `${path}/` : ""}`),
  "/plan-40/"
]);

const [css, robots, sitemap, searchSource, dataSource, appSource] = await Promise.all([
  readFile(resolve(root, "style.css"), "utf8"),
  readFile(resolve(root, "robots.txt"), "utf8"),
  readFile(resolve(root, "sitemap.xml"), "utf8"),
  readFile(resolve(root, "search-index.js"), "utf8"),
  readFile(resolve(root, "data.js"), "utf8"),
  readFile(resolve(root, "app.js"), "utf8")
]);

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
  assert.equal(document.querySelector('footer a[href="mailto:mail@hamanovich.com"]')?.textContent.trim(), "mail@hamanovich.com");

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
assert(documents.get("s-q").html.includes("Którędy iść?"));
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
assert.equal(notFound.querySelector('a[href="mailto:mail@hamanovich.com"]')?.textContent.trim(), "mail@hamanovich.com");
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

const searchJSON = searchSource.replace(/^globalThis\.SEARCH_INDEX=/, "").replace(/;\s*$/, "");
const searchIndex = JSON.parse(searchJSON);
assert(searchIndex.length > 1500);
assert.equal(new Set(searchIndex.map(entry => entry.tab)).size, 21);
assert(searchIndex.every(entry => /^r-\d+$/.test(entry.id) && entry.text));
assert(searchIndex.every(entry => documents.get(entry.tab)?.document.getElementById(entry.id)), "Every search entry must resolve on its topic page");

console.log(`Static page checks passed: ${routes.length} pages, ${searchIndex.length} search entries`);
