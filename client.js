/* Progressive enhancement for the fully prerendered page.
   Content is already in index.html; this file only controls interaction. */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const clean = s => s.replace(/\s+/g, " ").trim();
const norm = s => s.toLowerCase().replace(/ł/g,"l").normalize("NFD").replace(/\p{M}/gu,"");

const tabButtons = $$("#nav [data-s]");
const tabIds = tabButtons.map(x => x.dataset.s);
let curTab = "s-index", curCase = "mian", curNum = "sg", curV = "conj";

/* ---------- main navigation ---------- */
function showTab(id, scroll = true){
  if(!tabIds.includes(id)) id = tabIds[0];
  curTab = id;
  tabButtons.forEach(x => {
    const on = x.dataset.s === id;
    x.setAttribute("aria-selected", on);
    x.tabIndex = on ? 0 : -1;
  });
  $$("#navmenu [data-s]").forEach(x => x.setAttribute("aria-current", x.dataset.s === id));
  $$(".sec").forEach(s => {
    const on = s.id === id;
    s.classList.toggle("on", on);
    s.setAttribute("aria-hidden", String(!on));
  });
  const on = $("#nav [aria-selected='true']");
  if(on?.scrollIntoView) on.scrollIntoView({block:"nearest", inline:"nearest"});
  if(scroll) window.scrollTo({top:0});
  updateNavArrows();
}

$("#nav").addEventListener("click", e => {
  const tab = e.target.closest("[data-s]");
  if(!tab) return;
  showTab(tab.dataset.s);
  writeHash();
});

$("#nav").addEventListener("keydown", e => {
  const step = {ArrowRight:1, ArrowLeft:-1, Home:"first", End:"last"}[e.key];
  if(step === undefined) return;
  e.preventDefault();
  const i = tabIds.indexOf(curTab);
  const next = step === "first" ? 0 : step === "last" ? tabIds.length - 1
    : (i + step + tabIds.length) % tabIds.length;
  showTab(tabIds[next], false);
  writeHash();
  $("#tab-" + tabIds[next]).focus();
});

$("#s-index").addEventListener("click", e => {
  const link = e.target.closest(".idx-a[data-s]");
  if(!link) return;
  e.preventDefault();
  showTab(link.dataset.s);
  writeHash();
});

/* ---------- cases and verb subsections ---------- */
function showCase(id, num){
  let target = $(`.case-variant[data-case="${CSS.escape(id)}"][data-num="${CSS.escape(num)}"]`);
  if(!target){ id = "mian"; num = "sg"; target = $(`.case-variant[data-case="mian"][data-num="sg"]`); }
  curCase = id; curNum = num;
  $$(".case-variant").forEach(x => {
    const on = x === target;
    x.classList.toggle("on", on);
    x.setAttribute("aria-hidden", String(!on));
  });
  $$("#chips [data-c]").forEach(x => x.setAttribute("aria-pressed", x.dataset.c === id));
  $$("#numtog [data-n]").forEach(x => x.setAttribute("aria-pressed", x.dataset.n === num));
}

$("#chips").addEventListener("click", e => {
  const b = e.target.closest("[data-c]");
  if(!b) return;
  showCase(b.dataset.c, curNum);
  writeHash();
});
$("#numtog").addEventListener("click", e => {
  const b = e.target.closest("[data-n]");
  if(!b) return;
  showCase(curCase, b.dataset.n);
  writeHash();
});

function showVerb(key){
  let target = $(`.verb-variant[data-v="${CSS.escape(key)}"]`);
  if(!target){ key = "conj"; target = $('.verb-variant[data-v="conj"]'); }
  curV = key;
  $$(".verb-variant").forEach(x => {
    const on = x === target;
    x.classList.toggle("on", on);
    x.setAttribute("aria-hidden", String(!on));
  });
  $$("#vchips [data-v]").forEach(x => x.setAttribute("aria-pressed", x.dataset.v === key));
}

$("#vchips").addEventListener("click", e => {
  const b = e.target.closest("[data-v]");
  if(!b) return;
  showVerb(b.dataset.v);
  writeHash();
});

/* ---------- filters over prerendered rows ---------- */
function filterPreps(value){
  $$("#pfilter [data-f]").forEach(x => x.setAttribute("aria-pressed", x.dataset.f === value));
  $$("#ptable tr").forEach((row, i) => {
    if(i === 0) return;
    row.hidden = value !== "все" && clean(row.cells[1]?.textContent || "") !== value;
  });
}
$("#pfilter").addEventListener("click", e => {
  const b = e.target.closest("[data-f]");
  if(b) filterPreps(b.dataset.f);
});

const vsearch = $("#vsearch");
function filterVerbs(query){
  const q = norm(query.trim());
  $$("#vlist table tr").forEach((row, i) => {
    if(i === 0) return;
    row.hidden = !!q && !norm(row.textContent).includes(q);
  });
}
vsearch.addEventListener("input", e => filterVerbs(e.target.value));

/* ---------- hashes and heading links ---------- */
function hashFor(){
  if(curTab === "s-cases") return `#s-cases/${curCase}/${curNum}`;
  if(curTab === "s-verbs") return `#s-verbs/${curV}`;
  return `#${curTab}`;
}
function writeHash(){
  const hash = hashFor();
  if(location.hash === hash) return;
  history.replaceState(null, "", hash);
}

const SMOOTH = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
function scrollToHeading(tab, slug){
  const heading = document.querySelector(`#${tab} [data-h="${CSS.escape(slug)}"]`);
  if(!heading) return;
  const off = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--head-h")) || 0;
  const y = window.scrollY + heading.getBoundingClientRect().top - off - 12;
  window.scrollTo({top:Math.max(0, y), behavior:SMOOTH});
}

function applyHash(){
  const parts = decodeURIComponent(location.hash.replace(/^#/, "")).split("/");
  const tab = tabIds.includes(parts[0]) ? parts[0] : "s-index";
  if(tab === "s-cases") showCase(parts[1] || "mian", parts[2] === "pl" ? "pl" : "sg");
  if(tab === "s-verbs") showVerb(parts[1] || "conj");
  showTab(tab);
  const anchor = parts.find(x => x.startsWith("~"));
  if(anchor) requestAnimationFrame(() => scrollToHeading(tab, anchor.slice(1)));
}
window.addEventListener("hashchange", applyHash);

document.addEventListener("click", e => {
  const b = e.target.closest(".alink");
  if(!b) return;
  const h = b.closest("h3");
  const hash = `${hashFor()}/~${h.dataset.h}`;
  history.replaceState(null, "", hash);
  const ok = () => { b.classList.add("ok"); setTimeout(() => b.classList.remove("ok"), 1400); };
  try{ navigator.clipboard.writeText(location.href).then(ok, ok); }catch{ ok(); }
});

/* ---------- full-text search built from prerendered DOM ---------- */
function nodeText(node){
  if(node.tagName === "TR")
    return clean([...node.children].map(td => clean(td.textContent)).filter(Boolean).join(" · "));
  if(node.parentElement?.classList.contains("ngrid"))
    return clean([...node.children].map(x => clean(x.textContent)).filter(Boolean).join(" "));
  return clean(node.textContent);
}

let INDEX = [];
function buildIndex(){
  const seen = new Set();
  INDEX = [];
  $$(".sec").forEach(sec => {
    if(sec.id === "s-index") return;
    const label = clean($(`#tab-${sec.id}`)?.textContent || sec.id);
    let head = "";
    sec.querySelectorAll("h2,h3,tr,li,p,.tip,.ngrid > div").forEach(node => {
      if(node.matches("h2,h3")){ head = clean(node.textContent); return; }
      if(node.tagName === "TR" && node.querySelector("th")) return;
      if(node.matches("p") && node.closest(".tip")) return;
      const text = nodeText(node);
      if(text.length < 2) return;
      const cv = node.closest(".case-variant"), vv = node.closest(".verb-variant");
      const key = `${sec.id}|${cv?.dataset.case || ""}|${cv?.dataset.num || ""}|${vv?.dataset.v || ""}|${text}`;
      if(seen.has(key)) return;
      seen.add(key);
      INDEX.push({
        tab:sec.id, label, head, text, key:norm(text), node,
        cs:cv?.dataset.case, num:cv?.dataset.num, vs:vv?.dataset.v
      });
    });
  });
}

const tokens = q => norm(q).split(/\s+/).filter(Boolean);
function search(q){
  const ts = tokens(q);
  if(!ts.length || (ts.length === 1 && ts[0].length < 2)) return {list:[], total:0};
  const hits = [];
  for(const e of INDEX){
    let score = 0, ok = true;
    for(const t of ts){
      const at = e.key.indexOf(t);
      if(at < 0){ ok = false; break; }
      score += at;
    }
    if(ok) hits.push({e, score:score / ts.length + e.text.length / 40});
  }
  hits.sort((a,b) => a.score - b.score);
  return {list:hits.slice(0,30).map(x => x.e), total:hits.length};
}

const escapeHTML = s => s.replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function mark(text, q){
  const key = norm(text), ranges = [];
  for(const t of tokens(q)){
    let at = key.indexOf(t);
    while(at >= 0){ ranges.push([at, at + t.length]); at = key.indexOf(t, at + t.length); }
  }
  if(!ranges.length) return escapeHTML(text);
  ranges.sort((a,b) => a[0] - b[0]);
  const merged = [ranges[0]];
  for(const r of ranges.slice(1)){
    const last = merged.at(-1);
    if(r[0] <= last[1]) last[1] = Math.max(last[1], r[1]); else merged.push(r);
  }
  let out = "", pos = 0;
  for(const [a,b] of merged){
    out += escapeHTML(text.slice(pos,a)) + "<mark>" + escapeHTML(text.slice(a,b)) + "</mark>";
    pos = b;
  }
  return out + escapeHTML(text.slice(pos));
}

let hitList = [], hitSel = -1;
function openSearch(on){
  $("#sres").classList.toggle("on", on);
  $("#gsearch").setAttribute("aria-expanded", on);
  if(!on){ $("#gsearch").removeAttribute("aria-activedescendant"); hitSel = -1; }
}
function selectHit(i){
  const items = $$("#sres .sr");
  if(!items.length) return;
  hitSel = (i + items.length) % items.length;
  items.forEach((b,n) => b.setAttribute("aria-selected", n === hitSel));
  items[hitSel].scrollIntoView({block:"nearest"});
  $("#gsearch").setAttribute("aria-activedescendant", items[hitSel].id);
}
function renderResults(q){
  const box = $("#sres");
  if(!q.trim()){ openSearch(false); box.innerHTML = ""; hitList = []; return; }
  const {list,total} = search(q);
  hitList = list; hitSel = -1; openSearch(true);
  if(!list.length){
    box.innerHTML = tokens(q).every(t => t.length < 2)
      ? `<div class="snone">Введите хотя бы два символа</div>`
      : `<div class="snone">Ничего не нашлось</div>`;
    return;
  }
  box.innerHTML = list.map((e,i) => `<button class="sr" role="option" id="sr-${i}" data-i="${i}" aria-selected="false">
    <span class="sr-w">${escapeHTML(e.label)}${e.head?` · ${escapeHTML(e.head)}`:""}</span>
    <span class="sr-t">${mark(e.text.length > 140 ? e.text.slice(0,140) + "…" : e.text, q)}</span>
  </button>`).join("") + (total > list.length ? `<div class="scount">показаны ${list.length} из ${total} - уточните запрос</div>` : "");
}
function closeSearch(){ openSearch(false); $("#gsearch").blur(); }
function goTo(e){
  if(e.cs) showCase(e.cs, e.num || "sg");
  if(e.vs) showVerb(e.vs);
  if(e.tab === "s-preps") filterPreps("все");
  if(e.vs === "lista"){ vsearch.value = ""; filterVerbs(""); }
  showTab(e.tab, false); writeHash(); closeSearch();
  e.node.classList.add("hit");
  e.node.scrollIntoView({block:"center", behavior:SMOOTH});
  setTimeout(() => e.node.classList.remove("hit"), 2600);
}

$("#gsearch").addEventListener("input", e => renderResults(e.target.value));
$("#gsearch").addEventListener("focus", e => { if(e.target.value) renderResults(e.target.value); });
$("#gsearch").addEventListener("keydown", e => {
  if(e.key === "Escape"){ e.target.value = ""; renderResults(""); closeSearch(); return; }
  if(e.key === "ArrowDown" || e.key === "ArrowUp"){
    e.preventDefault();
    if(!$("#sres").classList.contains("on")) renderResults(e.target.value);
    selectHit(hitSel + (e.key === "ArrowDown" ? 1 : -1)); return;
  }
  if(e.key === "Home" || e.key === "End"){
    if(!$("#sres .sr")) return;
    e.preventDefault(); selectHit(e.key === "Home" ? 0 : -1); return;
  }
  if(e.key === "Enter") ($("#sres .sr[aria-selected='true']") || $("#sres .sr"))?.click();
});
$("#sres").addEventListener("click", e => {
  const b = e.target.closest(".sr[data-i]");
  if(b) goTo(hitList[+b.dataset.i]);
});
document.addEventListener("click", e => { if(!e.target.closest("#sbox")) openSearch(false); });
document.addEventListener("keydown", e => {
  if((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && document.activeElement !== $("#gsearch")){
    e.preventDefault(); $("#gsearch").focus(); $("#gsearch").select();
  }
});

/* ---------- theme, menu and sticky header ---------- */
const THEMES = [["light","светлая"],["dark","тёмная"]];
const SYSDARK = matchMedia("(prefers-color-scheme: dark)");
function readTheme(){
  try{ const t = localStorage.getItem("theme"); return t === "light" || t === "dark" ? t : null; }catch{ return null; }
}
function applyTheme(value){
  if(value) document.documentElement.dataset.theme = value;
  else delete document.documentElement.dataset.theme;
  const cur = value || (SYSDARK.matches ? "dark" : "light");
  $("#theme").innerHTML = THEMES.map(([id,label]) =>
    `<button type="button" data-t="${id}" aria-pressed="${id === cur}">${label}</button>`).join("");
}
$("#theme").addEventListener("click", e => {
  const b = e.target.closest("[data-t]");
  if(!b) return;
  try{ localStorage.setItem("theme", b.dataset.t); }catch{}
  applyTheme(b.dataset.t); setHeadH();
});
SYSDARK.addEventListener("change", () => { if(!readTheme()) applyTheme(null); });

function closeNavMenu(){ $("#navmenu").classList.remove("on"); $("#navall").setAttribute("aria-expanded","false"); }
$("#navall").addEventListener("click", () => {
  const open = !$("#navmenu").classList.contains("on");
  $("#navmenu").classList.toggle("on", open);
  $("#navall").setAttribute("aria-expanded", open);
  if(open) $("#navmenu [data-s]")?.focus();
});
$("#navmenu").addEventListener("click", e => {
  const b = e.target.closest("[data-s]");
  if(!b) return;
  showTab(b.dataset.s); writeHash(); closeNavMenu(); $("#navall").focus();
});
document.addEventListener("keydown", e => { if(e.key === "Escape" && $("#navmenu").classList.contains("on")) closeNavMenu(); });
document.addEventListener("click", e => { if(!e.target.closest("#navwrap")) closeNavMenu(); });

function setHeadH(){
  const hdr = $("header"), nav = $("#navwrap");
  const off = nav.getBoundingClientRect().top - hdr.getBoundingClientRect().top;
  const narrow = matchMedia("(max-width:700px)").matches;
  document.documentElement.style.setProperty("--brand-h", (narrow ? off : 0) + "px");
  document.documentElement.style.setProperty("--head-h", (narrow ? hdr.offsetHeight - off : hdr.offsetHeight) + "px");
}
function updateNavArrows(){
  const nav = $("#nav"), wrap = $("#navwrap");
  wrap.classList.toggle("can-l", nav.scrollLeft > 2);
  wrap.classList.toggle("can-r", nav.scrollLeft < nav.scrollWidth - nav.clientWidth - 2);
}
$("#nav").addEventListener("scroll", updateNavArrows, {passive:true});
$("#navl").addEventListener("click", () => $("#nav").scrollBy({left:-$("#nav").clientWidth * .6,behavior:"smooth"}));
$("#navr").addEventListener("click", () => $("#nav").scrollBy({left: $("#nav").clientWidth * .6,behavior:"smooth"}));
window.addEventListener("resize", () => {updateNavArrows(); setHeadH();});

/* ---------- start ---------- */
showCase("mian", "sg");
showVerb("conj");
filterPreps("все");
applyTheme(readTheme());
buildIndex();
setHeadH();
updateNavArrows();
applyHash();
