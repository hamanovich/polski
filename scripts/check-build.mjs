import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { parseHTML } from "linkedom";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baseURL = "https://polski.hamanovich.com/";
const routes = [
  ["s-index", ""], ["s-alpha", "alphabet"], ["s-rodz", "gender"], ["s-cases", "cases"],
  ["s-alt", "alternations"], ["s-adj", "adjectives"], ["s-adv", "adverbs"],
  ["s-pron", "pronouns"], ["s-q", "questions"], ["s-num", "numerals"], ["s-verbs", "verbs"],
  ["s-neg", "negation"], ["s-order", "word-order"], ["s-impers", "impersonal"],
  ["s-conj", "conjunctions"], ["s-part", "particles"], ["s-ludzie", "people"],
  ["s-dim", "diminutives"], ["s-preps", "prepositions"], ["s-bridge", "language-bridges"]
];
const routePaths = new Set(routes.map(([, path]) => `/${path ? `${path}/` : ""}`));

const [css, robots, sitemap, searchSource] = await Promise.all([
  readFile(resolve(root, "style.css"), "utf8"),
  readFile(resolve(root, "robots.txt"), "utf8"),
  readFile(resolve(root, "sitemap.xml"), "utf8"),
  readFile(resolve(root, "search-index.js"), "utf8")
]);

const documents = new Map();
const titles = new Set();
for(const [id, path] of routes){
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
  assert(document.querySelector(".site-title[href]"));

  const canonical = new URL(path ? `${path}/` : "", baseURL).href;
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute("href"), canonical);
  assert.equal(document.querySelector('meta[property="og:url"]')?.getAttribute("content"), canonical);
  assert.equal(document.querySelector('meta[name="robots"]'), null);
  assert(document.querySelector('meta[name="description"]')?.getAttribute("content")?.length > 80);
  assert(document.title.length > 20);
  assert(!titles.has(document.title), `Duplicate title: ${document.title}`);
  titles.add(document.title);

  assert.equal(document.querySelectorAll("#nav a[data-s]").length, routes.length);
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
  assert(!html.includes('src="data.js"'));
  assert(!html.includes('src="app.js"'));
}

const rootPage = documents.get("s-index");
assert.equal(rootPage.document.title, "Польская грамматика — таблицы, правила и примеры");
assert.equal(rootPage.document.querySelectorAll("#s-index .idx-a[href]").length, 19);
assert(!rootPage.html.includes("przez godzinę"), "Homepage should not duplicate every topic");

const cases = documents.get("s-cases");
assert.equal(cases.document.querySelectorAll(".case-variant").length, 14);
assert(cases.html.includes("Miejscownik"));

const verbs = documents.get("s-verbs");
assert.equal(verbs.document.querySelectorAll(".verb-variant").length, 6);
const verbRows = [...verbs.document.querySelectorAll('[data-v="lista"] #vlist table tr')].slice(1);
assert.equal(verbRows.length, 100);
assert.equal(new Set(verbRows.map(row => row.querySelector("td")?.textContent.trim())).size, 100);
assert(verbs.html.includes("będę zrobił"));
assert(!verbs.html.includes("czyby"));

assert(documents.get("s-alt").html.includes("Чередования: сводная карта"));
assert(!documents.get("s-ludzie").html.includes("Wołacz - вкладка"));
assert(documents.get("s-num").html.includes("Z iloma osobami rozmawiałeś?"));
assert(documents.get("s-num").html.includes("pół procenta, półtora procenta"));
assert(documents.get("s-conj").html.includes("Po moim powrocie Anna zadzwoniła"));
assert(documents.get("s-q").html.includes("Którędy iść?"));
assert(documents.get("s-cases").document.querySelector("#s-cases")?.textContent.includes("duchu"));
assert(!documents.get("s-verbs").html.includes("Pociąg już odszedł"));

const order = documents.get("s-order");
assert.equal(order.document.querySelectorAll("#s-order .vt")[0]?.querySelectorAll("tr").length, 4);
assert(order.html.includes("Na stole są klucze"));

const particles = documents.get("s-part");
assert(particles.html.includes("Норма с 1 января 2026 года"));
assert(particles.html.includes("nielepszy, nienajlepszy"));

const bridge = documents.get("s-bridge");
const falseFriendCells = [...bridge.document.querySelectorAll(".false-friends tr td:first-child")];
assert.equal(falseFriendCells.length, 100);
assert.equal(new Set(falseFriendCells.map(cell => cell.textContent.trim())).size, 100);
assert.equal(bridge.document.querySelectorAll(".false-friends h4").length, 5);
assert(bridge.html.includes("pytać"));
assert(bridge.html.includes("jutro"));
assert(bridge.html.includes("puszka"));
assert(bridge.html.includes("lustro"));

assert.match(css, /\.sec\{display:block\}/);
assert.match(css, /\.js \.sec\{display:none\}/);
assert.match(css, /\.content-variant\{display:block\}/);
assert.match(robots, /User-agent: OAI-SearchBot\s+Allow: \//);
assert.match(robots, /User-agent: \*\s+Allow: \//);
assert.match(robots, /Sitemap: https:\/\/polski\.hamanovich\.com\/sitemap\.xml/);

const sitemapURLs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(sitemapURLs.length, routes.length);
assert.deepEqual(sitemapURLs, routes.map(([, path]) => new URL(path ? `${path}/` : "", baseURL).href));
assert(!sitemap.includes("#"), "Sitemap must contain canonical HTTP URLs, not fragments");

const searchJSON = searchSource.replace(/^globalThis\.SEARCH_INDEX=/, "").replace(/;\s*$/, "");
const searchIndex = JSON.parse(searchJSON);
assert(searchIndex.length > 1500);
assert.equal(new Set(searchIndex.map(entry => entry.tab)).size, 19);
assert(searchIndex.every(entry => /^r-\d+$/.test(entry.id) && entry.text));
assert(searchIndex.every(entry => documents.get(entry.tab)?.document.getElementById(entry.id)), "Every search entry must resolve on its topic page");

console.log(`Static page checks passed: ${routes.length} pages, ${searchIndex.length} search entries`);
