import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import vm from "node:vm";
import { parseHTML } from "linkedom";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baseURL = "https://polski.hamanovich.com/";
const pages = [
  {id:"s-index", path:"", title:"Польская грамматика - таблицы, правила и примеры", description:"Практический справочник польской грамматики на русском с опорой на белорусский: падежи, глаголы, местоимения, числительные и примеры."},
  {id:"s-alpha", path:"alphabet", title:"Польский алфавит и произношение - правила и примеры", description:"Польский алфавит, диграфы, носовые гласные, ударение, оглушение и ассимиляция с объяснениями для русско- и белорусскоязычных."},
  {id:"s-rodz", path:"gender", title:"Род существительных в польском языке", description:"Мужской, женский и средний род в польском, три типа мужского рода, исключения и несклоняемые существительные на -um."},
  {id:"s-cases", path:"cases", title:"Падежи польского языка - окончания и примеры", description:"Семь падежей польского языка: вопросы, предлоги, окончания единственного и множественного числа, чередования и исключения."},
  {id:"s-alt", path:"alternations", title:"Чередования в польском языке - сводная карта", description:"Типовые польские чередования ó/o, ą/ę и изменения согласных при склонении существительных и спряжении глаголов."},
  {id:"s-adj", path:"adjectives", title:"Польские прилагательные - склонение и сравнение", description:"Склонение польских прилагательных, степени сравнения, согласование и практические таблицы с примерами."},
  {id:"s-adv", path:"adverbs", title:"Наречия польского языка - образование и степени сравнения", description:"Образование польских наречий, сравнительная и превосходная степени, формы места, времени и образа действия."},
  {id:"s-pron", path:"pronouns", title:"Местоимения польского языка - полные таблицы", description:"Личные, притяжательные, возвратные и указательные местоимения польского языка: склонение, краткие формы и примеры."},
  {id:"s-q", path:"questions", title:"Вопросы в польском языке - czy, gdzie, dokąd и który", description:"Общие и частные вопросы по-польски, склонение kto и co, различие jaki и który, а также где, куда, откуда и каким путём."},
  {id:"s-num", path:"numerals", title:"Числительные польского языка - склонение и согласование", description:"Польские количественные, порядковые и собирательные числительные, склонение, согласование с существительным и глаголом."},
  {id:"s-verbs", path:"verbs", title:"Польские глаголы - спряжение, времена, вид и управление", description:"Спряжения польских глаголов, прошедшее и будущее время, вид, наклонения, причастия, пассив и управление падежами."},
  {id:"s-vocab", path:"vocabulary", title:"Словарь польского языка - 400 полезных слов", description:"Практический польский словарь: 100 полезных глаголов, существительных, прилагательных и наречий с ключевыми формами и живыми примерами."},
  {id:"s-talk", path:"speaking", title:"Разговорный польский - фразы, шаблоны и мини-диалоги", description:"Разговорный польский для начинающих: готовые фразы для жизни, конструкторы предложений, короткие диалоги и фразы, которые помогают не потерять разговор."},
  {id:"s-neg", path:"negation", title:"Отрицание в польском языке - правила и примеры", description:"Польское отрицание nie, двойное отрицание, родительный падеж после отрицания и конструкции ani, nikt, nic."},
  {id:"s-order", path:"word-order", title:"Порядок слов в польском языке", description:"Нейтральный и выразительный порядок слов в польском предложении, место клитик się, mi, ci и логическое ударение."},
  {id:"s-impers", path:"impersonal", title:"Безличные конструкции в польском языке", description:"Польские безличные конструкции объявлений, вывесок и официальной речи: można, trzeba, wolno, формы на -no и -to."},
  {id:"s-conj", path:"conjunctions", title:"Союзы и сложные предложения в польском языке", description:"Польские сочинительные и подчинительные союзы, запятые, косвенная речь и преобразование придаточного в короткую конструкцию."},
  {id:"s-part", path:"particles", title:"Частицы польского языка - значения и примеры", description:"Частые польские частицы no, czy, chyba, może, niech, oby, właśnie и другие с оттенками значения и примерами."},
  {id:"s-ludzie", path:"people", title:"Обращение, имена и национальности по-польски", description:"Вежливое обращение pan, pani, państwo, склонение польских имён и фамилий, названия стран, жителей и языков."},
  {id:"s-dim", path:"diminutives", title:"Уменьшительные формы в польском языке", description:"Польские уменьшительные существительные, прилагательные и имена: типовые суффиксы, оттенки вежливости и живые примеры."},
  {id:"s-preps", path:"prepositions", title:"Предлоги польского языка и управление падежами", description:"Польские предлоги по падежам, различие места и направления, предлоги с двумя падежами и практические примеры."},
  {id:"s-bridge", path:"language-bridges", title:"Польский через русский и белорусский - языковые мосты", description:"Фонетические соответствия польского, русского и белорусского языков, полезные ассоциации и ложные друзья переводчика."}
];
const pageById = new Map(pages.map(page => [page.id, page]));
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

/* A compact, shared full-text index keeps search global after the content is split across pages. */
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

/* Порядок чтения и группа раздела берутся из GROUPS: по ним строится «предыдущий / следующий». */
const groups = JSON.parse(vm.runInContext("JSON.stringify(GROUPS)", sandbox));
const groupOf = new Map();
groups.forEach(([, items], index) => items.forEach(([id]) => groupOf.set(id, index)));
const readingOrder = ["s-index", ...groups.flatMap(([, items]) => items.map(([id]) => id))];
const labelOf = new Map(JSON.parse(vm.runInContext("JSON.stringify(TABS)", sandbox)));

const masterHTML = document.documentElement.outerHTML;
const generated = [];
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
    /* Второй пейджер - на стыке теории и практики: дочитал раздел и можешь идти дальше,
       не пролистывая два десятка упражнений и тест. Ставим перед первым блоком с практикой. */
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
  const topicHeading = pageDocument.querySelector(".sec h2");
  if(topicHeading){
    const pageHeading = pageDocument.createElement("h1");
    pageHeading.className = "page-title";
    pageHeading.innerHTML = topicHeading.innerHTML;
    topicHeading.replaceWith(pageHeading);
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
  const clientScript = pageDocument.createElement("script");
  clientScript.src = `${prefix}client.js?v=${assetHashes.client}`;
  clientScript.dataset.searchSrc = `${prefix}search-index.js?v=${assetHashes.search}`;
  pageDocument.body.append(clientScript);

  const html = `<!DOCTYPE html>\n${pageDocument.documentElement.outerHTML}\n`.replace(/[ \t]+$/gm, "");
  const outputDir = page.path ? resolve(root, page.path) : root;
  await mkdir(outputDir, {recursive:true});
  await writeFile(resolve(outputDir, "index.html"), html, "utf8");
  generated.push({page, bytes:Buffer.byteLength(html)});
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url>\n    <loc>${new URL(page.path ? `${page.path}/` : "", baseURL).href}</loc>\n  </url>`).join("\n")}\n</urlset>\n`;
await writeFile(resolve(root, "sitemap.xml"), sitemap, "utf8");

const totalBytes = generated.reduce((sum, item) => sum + item.bytes, 0);
console.log(`Generated ${generated.length} HTML pages (${totalBytes.toLocaleString("en-US")} bytes total) and ${searchEntries.length} search entries`);
