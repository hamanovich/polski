import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import vm from "node:vm";
import { parseHTML } from "linkedom";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [template, dataSource, appSource, clientSource, styleSource] = await Promise.all([
  readFile(resolve(root, "index.template.html"), "utf8"),
  readFile(resolve(root, "data.js"), "utf8"),
  readFile(resolve(root, "app.js"), "utf8"),
  readFile(resolve(root, "client.js"), "utf8"),
  readFile(resolve(root, "style.css"), "utf8")
]);
const fingerprint = source => createHash("sha256").update(source).digest("hex").slice(0, 10);

const { window, document } = parseHTML(template);
const noop = () => {};
const media = query => ({
  matches: false,
  media: query,
  addEventListener: noop,
  removeEventListener: noop
});

window.matchMedia = media;
window.scrollTo = noop;
window.scrollBy = noop;
if(window.Element && !window.Element.prototype.scrollIntoView)
  window.Element.prototype.scrollIntoView = noop;
if(window.Element && !window.Element.prototype.getBoundingClientRect)
  window.Element.prototype.getBoundingClientRect = () => ({top:0,left:0,right:0,bottom:0,width:0,height:0});
if(window.HTMLElement && !window.HTMLElement.prototype.focus)
  window.HTMLElement.prototype.focus = noop;
if(window.HTMLElement && !window.HTMLElement.prototype.blur)
  window.HTMLElement.prototype.blur = noop;

const location = {hash:"", href:"https://polski.hamanovich.com/"};
const history = {replaceState(_state, _title, url){ location.hash = String(url).startsWith("#") ? String(url) : ""; }};
const localStorage = {getItem(){ return null; }, setItem:noop, removeItem:noop};
const getComputedStyle = () => ({
  getPropertyValue(){ return "0px"; },
  position:"static", left:"auto", whiteSpace:"normal"
});

const sandbox = {
  window,
  document,
  console,
  location,
  history,
  localStorage,
  navigator:{clipboard:{writeText:async () => {}}},
  CSS:{escape:s => String(s).replace(/[^a-zA-Z0-9_-]/g, ch => `\\${ch}`)},
  matchMedia:media,
  getComputedStyle,
  setTimeout,
  clearTimeout,
  URL,
  Event:window.Event,
  CustomEvent:window.CustomEvent,
  Node:window.Node,
  Element:window.Element,
  HTMLElement:window.HTMLElement
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

vm.runInContext(dataSource, sandbox, {filename:"data.js"});
vm.runInContext(appSource, sandbox, {filename:"app.js"});

vm.runInContext(`
  const caseHost = document.querySelector("#casePanel");
  caseHost.className = "variant-host";
  caseHost.innerHTML = CASES.flatMap(c => ["sg", "pl"].map(num =>
    \`<article class="panel content-variant case-variant\${c.id === "mian" && num === "sg" ? " on" : ""}"
              data-case="\${c.id}" data-num="\${num}">\${casePanelHTML(c, num)}</article>\`
  )).join("");

  const verbRenderers = {conj:vConj, czasy:vCzasy, tryby:vTryby, formy:vFormy, rekcja:vRekcja, lista:vLista};
  const verbHost = document.querySelector("#vPanel");
  verbHost.className = "variant-host";
  verbHost.innerHTML = Object.entries(verbRenderers).map(([key, render]) =>
    \`<div class="content-variant verb-variant\${key === "conj" ? " on" : ""}" data-v="\${key}">\${render()}</div>\`
  ).join("");
  document.querySelector('[data-v="lista"] #vlist').innerHTML = listHTML("");

  document.querySelectorAll(".case-variant,.verb-variant").forEach(linkHeadings);
`, sandbox, {filename:"scripts/build-content.js"});

document.documentElement.dataset.prerendered = "true";
document.documentElement.style.removeProperty("--brand-h");
document.documentElement.style.removeProperty("--head-h");
document.querySelector('link[rel="stylesheet"]').href = `style.css?v=${fingerprint(styleSource)}`;
document.querySelectorAll('script[src="data.js"],script[src="app.js"]').forEach(script => script.remove());
const client = document.createElement("script");
client.src = `client.js?v=${fingerprint(clientSource)}`;
document.body.append(client);

const html = `<!DOCTYPE html>\n${document.documentElement.outerHTML}\n`.replace(/[ \t]+$/gm, "");
await writeFile(resolve(root, "index.html"), html, "utf8");

const fulltext = document.body.textContent.replace(/[ \t]+/g, " ").replace(/\n\s+/g, "\n").trim() + "\n";
await writeFile(resolve(root, "fulltext.txt"), fulltext, "utf8");

console.log(`Generated index.html (${Buffer.byteLength(html).toLocaleString("en-US")} bytes)`);
