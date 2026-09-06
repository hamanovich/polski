import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import vm from "node:vm";
import { parseHTML } from "linkedom";
import { pages, extraPages } from "./pages.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baseURL = "https://polski.hamanovich.com/";
const pageById = new Map(pages.map(page => [page.id, page]));
const [template, notFoundTemplate, dataSource, appSource, clientSource, styleSource] = await Promise.all([
  readFile(resolve(root, "index.template.html"), "utf8"),
  readFile(resolve(root, "404.template.html"), "utf8"),
  readFile(resolve(root, "data.js"), "utf8"),
  readFile(resolve(root, "app.js"), "utf8"),
  readFile(resolve(root, "client.js"), "utf8"),
  readFile(resolve(root, "style.css"), "utf8")
]);
const fingerprint = source => createHash("sha256").update(source).digest("hex").slice(0, 10);
const today = new Date().toLocaleDateString("sv-SE");
const dateSlot = "__CONTENT_DATE__";
const manifestPath = resolve(root, "content-manifest.json");
const storedManifest = await readFile(manifestPath, "utf8").then(JSON.parse).catch(() => ({}));
const previousSitemap = await readFile(resolve(root, "sitemap.xml"), "utf8").catch(() => "");
const previousDates = new Map([...previousSitemap.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(match => [match[1], match[2]]));
const contentSignature = html => createHash("sha256").update(html.replace(/\?v=[0-9a-f]{10}/g, "?v=")).digest("hex");
const nextManifest = {};
const stampDate = (key, canonical, hash) => {
  const stored = storedManifest[key];
  const date = stored && stored.hash === hash ? stored.date : (!stored && previousDates.get(canonical)) || today;
  nextManifest[key] = {hash, date};
  return date;
};

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

  const verbRenderers = {conj:vConj, czasy:vCzasy, tryby:vTryby, formy:vFormy, rekcja:vRekcja};
  const verbHost = document.querySelector("#vPanel");
  verbHost.className = "variant-host";
  verbHost.innerHTML = Object.entries(verbRenderers).map(([key, render]) =>
    \`<div class="content-variant verb-variant\${key === "conj" ? " on" : ""}" data-v="\${key}">\${render()}</div>\`
  ).join("");

  const practiceHost = document.querySelector("#casePractice");
  practiceHost.className = "variant-host";
  practiceHost.innerHTML = CASE_PRACTICE.map((practice, index) => casePracticeHTML(practice, index === 0)).join("");
  document.querySelector("#caseTest").innerHTML = caseTestHTML();

  const verbPracticeHost = document.querySelector("#verbPractice");
  verbPracticeHost.className = "variant-host";
  verbPracticeHost.innerHTML = VERB_PRACTICE
    .filter(practice => VTABS.some(tab => tab[0] === practice.id))
    .map((practice, index) => verbPracticeHTML(practice, index === 0)).join("");
  document.querySelector("#verbTest").innerHTML = verbTestHTML();

  document.querySelectorAll(".case-variant,.verb-variant").forEach(linkHeadings);
`, sandbox, {filename:"scripts/build-content.js"});

document.documentElement.dataset.prerendered = "true";
document.documentElement.style.removeProperty("--brand-h");
document.documentElement.style.removeProperty("--head-h");
document.querySelectorAll('script[src="data.js"],script[src="app.js"]').forEach(script => script.remove());
const fulltextBody = document.body.cloneNode(true);
fulltextBody.querySelectorAll(".practice,.totop").forEach(node => node.remove());
const fulltext = fulltextBody.textContent.replace(/[ \t]+/g, " ").replace(/\n\s+/g, "\n").trim() + "\n";
await writeFile(resolve(root, "fulltext.txt"), fulltext, "utf8");

const clean = value => value.replace(/\s+/g, " ").trim();
const nodeText = node => {
  if(node.tagName === "TR")
    return clean([...node.children].map(cell => clean(cell.textContent)).filter(Boolean).join(" · "));
  if(node.parentElement?.classList.contains("ngrid"))
    return clean([...node.children].map(child => clean(child.textContent)).filter(Boolean).join(" "));
  return clean(node.textContent);
};

const searchEntries = [];
const seenSearchEntries = new Set();
for(const section of document.querySelectorAll(".sec")){
  if(section.id === "s-index") continue;
  const navEntry = document.querySelector(`#tab-${section.id}`);
  const label = clean(navEntry?.querySelector("b")?.textContent || navEntry?.textContent || section.id);
  let heading = "";
  for(const node of section.querySelectorAll("h2,h3,tr,li,p,.tip,.ngrid > div")){
    if(node.closest(".practice")) continue;
    if(node.matches("h2,h3")){ heading = clean(node.textContent); continue; }
    if(node.tagName === "TR" && node.querySelector("th")) continue;
    if(node.matches("p") && node.closest(".tip")) continue;
    const text = nodeText(node);
    if(text.length < 2) continue;
    const caseVariant = node.closest(".case-variant");
    const verbVariant = node.closest(".verb-variant");
    const key = `${section.id}|${caseVariant?.dataset.case || ""}|${caseVariant?.dataset.num || ""}|${verbVariant?.dataset.v || ""}|${text}`;
    if(seenSearchEntries.has(key)) continue;
    seenSearchEntries.add(key);
    const id = `r-${searchEntries.length + 1}`;
    node.id = id;
    searchEntries.push({
      id, tab:section.id, label, head:heading, text,
      cs:caseVariant?.dataset.case, num:caseVariant?.dataset.num, vs:verbVariant?.dataset.v
    });
  }
}

const searchSource = `globalThis.SEARCH_INDEX=${JSON.stringify(searchEntries)};\n`;
await writeFile(resolve(root, "search-index.js"), searchSource, "utf8");
const assetHashes = {
  style:fingerprint(styleSource),
  client:fingerprint(clientSource),
  search:fingerprint(searchSource)
};
const notFoundHTML = `${notFoundTemplate.replace("{{STYLE}}", `/style.css?v=${assetHashes.style}`)}\n`.replace(/[ \t]+$/gm, "");
await writeFile(resolve(root, "404.html"), notFoundHTML, "utf8");

const TOC_MIN = 5;
const pageHref = (from, targetId) => {
  const target = pageById.get(targetId) || pages[0];
  if(!from.path) return target.path ? `${target.path}/` : "./";
  if(!target.path) return "../";
  return target.id === from.id ? "./" : `../${target.path}/`;
};
const modernHash = legacyHash => {
  const parts = decodeURIComponent(legacyHash.replace(/^#/, "")).split("/");
  const target = parts.shift();
  if(target === "s-cases" || target === "s-verbs") return parts.length ? `#${parts.join("/")}` : "";
  const anchor = parts.find(part => part.startsWith("~"));
  return anchor ? `#${anchor}` : "";
};

const groups = JSON.parse(vm.runInContext("JSON.stringify(GROUPS)", sandbox));
const groupOf = new Map();
groups.forEach(([, items], index) => items.forEach(([id]) => groupOf.set(id, index)));
const readingOrder = ["s-index", ...groups.flatMap(([, items]) => items.map(([id]) => id))];
const labelOf = new Map(JSON.parse(vm.runInContext("JSON.stringify(TABS)", sandbox)));

const jsonLD = (page, canonical) => {
  const webpage = {
    "@type":page.id === "s-index" ? ["WebPage", "CollectionPage"] : ["WebPage", "LearningResource"],
    "@id":`${canonical}#webpage`,
    url:canonical,
    name:page.title,
    headline:page.h1,
    description:page.description,
    inLanguage:"ru",
    isPartOf:{"@id":`${baseURL}#website`},
    isAccessibleForFree:true,
    dateModified:dateSlot,
    about:{"@type":"Thing", name:"Польский язык"}
  };
  const graph = [{
    "@type":"WebSite",
    "@id":`${baseURL}#website`,
    url:baseURL,
    name:"Polski: końcówki",
    alternateName:"Польская грамматика",
    description:pages[0].description,
    inLanguage:"ru"
  }, webpage];
  if(page.id !== "s-index"){
    webpage.learningResourceType = "reference";
    webpage.teaches = page.h1;
    webpage.breadcrumb = {"@id":`${canonical}#breadcrumb`};
    graph.push({
      "@type":"BreadcrumbList",
      "@id":`${canonical}#breadcrumb`,
      itemListElement:[
        {"@type":"ListItem", position:1, name:"Справочник", item:baseURL},
        {"@type":"ListItem", position:2, name:page.h1}
      ]
    });
  }
  return JSON.stringify({"@context":"https://schema.org", "@graph":graph}).replace(/</g, "\\u003c");
};

const masterHTML = document.documentElement.outerHTML;
const generated = [];
const pageDates = new Map();
for(const page of pages){
  const { document:pageDocument } = parseHTML(`<!DOCTYPE html>\n${masterHTML}`);
  pageDocument.documentElement.dataset.page = page.id;
  pageDocument.title = page.title;
  pageDocument.querySelector('meta[name="description"]').setAttribute("content", page.description);
  pageDocument.querySelector('meta[property="og:title"]').setAttribute("content", page.title);
  pageDocument.querySelector('meta[property="og:description"]').setAttribute("content", page.description);
  const canonical = new URL(page.path ? `${page.path}/` : "", baseURL).href;
  pageDocument.querySelector('link[rel="canonical"]').setAttribute("href", canonical);
  pageDocument.querySelector('meta[property="og:url"]').setAttribute("content", canonical);
  const socialCard = new URL(`og/${page.path || "index"}.png`, baseURL).href;
  pageDocument.querySelector('meta[property="og:image"]').setAttribute("content", socialCard);
  pageDocument.querySelector('meta[property="og:image:alt"]').setAttribute("content", page.h1);

  for(const section of pageDocument.querySelectorAll(".sec")){
    if(section.id !== page.id) section.remove();
    else {
      section.classList.add("on");
      section.removeAttribute("aria-hidden");
      section.removeAttribute("role");
      section.removeAttribute("tabindex");
      section.removeAttribute("aria-labelledby");
    }
  }

  for(const group of pageDocument.querySelectorAll("#nav .navgroup"))
    group.classList.toggle("is-current", Number(group.dataset.g) === groupOf.get(page.id));
  const navAllText = pageDocument.querySelector("#navall .navall-txt");
  if(navAllText) navAllText.textContent = page.id === "s-index" ? "Все разделы" : labelOf.get(page.id);

  const position = readingOrder.indexOf(page.id);
  const neighbours = [
    ["prev", readingOrder[position - 1], "Предыдущий раздел"],
    ["next", readingOrder[position + 1], "Следующий раздел"]
  ].filter(([, id]) => id);
  if(page.id !== "s-index" && neighbours.length){
    const makePager = extraClass => {
      const pager = pageDocument.createElement("nav");
      pager.className = extraClass ? `pager ${extraClass}` : "pager";
      pager.setAttribute("aria-label", "Соседние разделы");
      pager.innerHTML = neighbours.map(([side, id, caption]) =>
        `<a class="pager-${side}" href="${pageHref(page, id)}"><small>${caption}</small><b>${labelOf.get(id)}</b></a>`).join("");
      return pager;
    };

    const topic = pageDocument.querySelector(".sec");
    const practiceHost = [...topic.children].find(child =>
      child.classList.contains("practice") || child.querySelector(".practice"));
    if(practiceHost) practiceHost.before(makePager("pager-mid"));
    pageDocument.querySelector(".wrap footer").before(makePager());
  }

  const brandHeading = pageDocument.querySelector(".brand h1");
  if(brandHeading){
    const brandLink = pageDocument.createElement("a");
    brandLink.className = "site-title";
    brandLink.href = pageHref(page, "s-index");
    brandLink.innerHTML = brandHeading.innerHTML;
    brandHeading.replaceWith(brandLink);
  }
  const topicSection = pageDocument.querySelector(".sec");
  const pageHeading = pageDocument.createElement("h1");
  pageHeading.className = "page-title";
  pageHeading.textContent = page.h1;
  const topicHeading = topicSection.querySelector("h2");
  if(topicHeading && !topicHeading.closest(".content-variant")) topicHeading.replaceWith(pageHeading);
  else topicSection.prepend(pageHeading);

  const tocHeadings = [...topicSection.querySelectorAll("h3[id]")].filter(heading => !heading.closest(".practice"));
  if(page.id !== "s-index" && tocHeadings.length >= TOC_MIN){
    const toc = pageDocument.createElement("nav");
    toc.className = "toc";
    toc.setAttribute("aria-label", "Содержание раздела");
    toc.innerHTML = `<p class="toc-title">На этой странице</p><ol>${tocHeadings.map(heading =>
      `<li><a href="#${heading.id}">${clean(heading.textContent)}</a></li>`).join("")}</ol>`;
    const lead = pageHeading.nextElementSibling;
    (lead?.classList.contains("lead") ? lead : pageHeading).after(toc);
  }

  for(const link of pageDocument.querySelectorAll("#nav [data-s],#navmenu [data-s],.idx-a[data-s]")){
    const targetId = link.dataset.s;
    link.setAttribute("href", pageHref(page, targetId));
    if(targetId === page.id) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
    link.removeAttribute("aria-selected");
    link.removeAttribute("tabindex");
  }
  for(const link of pageDocument.querySelectorAll('a[href^="#s-"]')){
    const legacy = link.getAttribute("href");
    const targetId = decodeURIComponent(legacy.slice(1)).split("/")[0];
    link.setAttribute("href", pageHref(page, targetId) + modernHash(legacy));
  }

  const prefix = page.path ? "../" : "";
  pageDocument.querySelector('link[rel="stylesheet"]').setAttribute("href", `${prefix}style.css?v=${assetHashes.style}`);
  for(const icon of pageDocument.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]')){
    const href = icon.getAttribute("href");
    if(href && !/^(?:[a-z]+:|\/)/i.test(href)) icon.setAttribute("href", prefix + href);
  }
  const linkedData = pageDocument.createElement("script");
  linkedData.type = "application/ld+json";
  linkedData.textContent = jsonLD(page, canonical);
  pageDocument.head.append(linkedData);

  const clientScript = pageDocument.createElement("script");
  clientScript.src = `${prefix}client.js?v=${assetHashes.client}`;
  clientScript.dataset.searchSrc = `${prefix}search-index.js?v=${assetHashes.search}`;
  pageDocument.body.append(clientScript);

  const draft = `<!DOCTYPE html>\n${pageDocument.documentElement.outerHTML}\n`.replace(/[ \t]+$/gm, "");
  const date = stampDate(page.path || "index", canonical, contentSignature(draft));
  pageDates.set(page.path, date);
  const html = draft.replace(dateSlot, date);
  const outputDir = page.path ? resolve(root, page.path) : root;
  await mkdir(outputDir, {recursive:true});
  await writeFile(resolve(outputDir, "index.html"), html, "utf8");
  generated.push({page, bytes:Buffer.byteLength(html)});
}

const extraEntries = [];
for(const extra of extraPages){
  const source = await readFile(resolve(root, extra.source), "utf8").catch(() => "");
  const canonical = new URL(`${extra.path}/`, baseURL).href;
  extraEntries.push([extra.path, stampDate(extra.path, canonical, contentSignature(source))]);
}
const orderedManifest = Object.fromEntries(Object.keys(nextManifest).sort().map(key => [key, nextManifest[key]]));
await writeFile(manifestPath, `${JSON.stringify(orderedManifest, null, 2)}\n`, "utf8");

const sitemapEntries = [
  ...pages.map(page => [page.path, pageDates.get(page.path)]),
  ...extraEntries
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.map(([path, lastmod]) => `  <url>\n    <loc>${new URL(path ? `${path}/` : "", baseURL).href}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")}\n</urlset>\n`;
await writeFile(resolve(root, "sitemap.xml"), sitemap, "utf8");

const totalBytes = generated.reduce((sum, item) => sum + item.bytes, 0);
console.log(`Generated ${generated.length} HTML pages (${totalBytes.toLocaleString("en-US")} bytes total) and ${searchEntries.length} search entries`);
