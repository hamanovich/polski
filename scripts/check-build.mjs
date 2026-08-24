import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { parseHTML } from "linkedom";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [html, css] = await Promise.all([
  readFile(resolve(root, "index.html"), "utf8"),
  readFile(resolve(root, "style.css"), "utf8")
]);
const { document } = parseHTML(html);

assert.equal(document.documentElement.dataset.prerendered, "true");
assert.equal(document.documentElement.classList.contains("js"), false, "HTML must remain readable when scripts do not run");
assert.equal(document.querySelectorAll(".sec").length, 19);
assert.equal(document.querySelectorAll(".sec:empty").length, 0);
assert.equal(document.querySelectorAll(".case-variant").length, 14);
assert.equal(document.querySelectorAll(".verb-variant").length, 6);
assert.equal(document.querySelectorAll("#s-index .idx-a[href^='#s-']").length, 18);

const externalScripts = [...document.querySelectorAll("script[src]")].map(x => x.getAttribute("src"));
assert.equal(externalScripts.length, 1);
assert.match(externalScripts[0], /^client\.js\?v=[a-f0-9]{10}$/);
assert(!html.includes('src="data.js"'));
assert(!html.includes('src="app.js"'));
assert(html.includes("przez godzinę"));
assert(html.includes("Miejscownik"));
assert.match(css, /\.sec\{display:block\}/);
assert.match(css, /\.js \.sec\{display:none\}/);
assert.match(css, /\.content-variant\{display:block\}/);

console.log("Prerendered HTML checks passed");
