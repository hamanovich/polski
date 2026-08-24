import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { parseHTML } from "linkedom";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [html, css, robots, sitemap] = await Promise.all([
  readFile(resolve(root, "index.html"), "utf8"),
  readFile(resolve(root, "style.css"), "utf8"),
  readFile(resolve(root, "robots.txt"), "utf8"),
  readFile(resolve(root, "sitemap.xml"), "utf8")
]);
const { document } = parseHTML(html);

assert.equal(document.documentElement.dataset.prerendered, "true");
assert.equal(document.documentElement.classList.contains("js"), false, "HTML must remain readable when scripts do not run");
assert.equal(document.title, "Польская грамматика — таблицы, правила и примеры");
assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute("href"), "https://polski.hamanovich.com/");
assert.equal(document.querySelector('meta[name="robots"]'), null);
assert.equal(document.querySelectorAll(".sec").length, 20);
assert.equal(document.querySelectorAll(".sec:empty").length, 0);
assert.equal(document.querySelectorAll(".case-variant").length, 14);
assert.equal(document.querySelectorAll(".verb-variant").length, 6);
assert.equal(document.querySelectorAll("#s-index .idx-a[href^='#s-']").length, 19);

const externalScripts = [...document.querySelectorAll("script[src]")].map(x => x.getAttribute("src"));
assert.equal(externalScripts.length, 1);
assert.match(externalScripts[0], /^client\.js\?v=[a-f0-9]{10}$/);
assert(!html.includes('src="data.js"'));
assert(!html.includes('src="app.js"'));
assert(html.includes("przez godzinę"));
assert(html.includes("Miejscownik"));
assert(html.includes("będę zrobił"));
assert(html.includes("Чередования: сводная карта"));
assert.match(css, /\.sec\{display:block\}/);
assert.match(css, /\.js \.sec\{display:none\}/);
assert.match(css, /\.content-variant\{display:block\}/);
assert.match(robots, /User-agent: OAI-SearchBot\s+Allow: \//);
assert.match(robots, /User-agent: \*\s+Allow: \//);
assert.match(robots, /Sitemap: https:\/\/polski\.hamanovich\.com\/sitemap\.xml/);
assert.match(sitemap, /<loc>https:\/\/polski\.hamanovich\.com\/<\/loc>/);
assert(!sitemap.includes("#"), "Sitemap must contain canonical HTTP URLs, not fragments");

console.log("Prerendered HTML checks passed");
