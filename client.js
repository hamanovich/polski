/* Progressive enhancement for prerendered topic pages.
   Content and navigation already work without JavaScript; this file adds filters,
   global search, heading links, theme controls and compact URL state. */
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const clean = value => value.replace(/\s+/g, " ").trim();
const norm = value => value.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/\p{M}/gu, "");
const SEARCH_INDEX_SRC = document.currentScript?.dataset.searchSrc || "search-index.js";

const currentPage = document.documentElement.dataset.page || "s-index";
const navLinks = $$("#nav [data-s]");
const tabIds = navLinks.map(link => link.dataset.s);
let curCase = "mian", curNum = "sg", curV = "conj";

const navLink = tab => navLinks.find(link => link.dataset.s === tab);
navLinks.forEach(link => {
  if(link.dataset.s === currentPage) link.setAttribute("aria-current", "page");
  else link.removeAttribute("aria-current");
});
$$("#navmenu [data-s]").forEach(link => {
  if(link.dataset.s === currentPage) link.setAttribute("aria-current", "page");
  else link.removeAttribute("aria-current");
});

/* Arrow keys remain a shortcut over the horizontal list, while links preserve
   ordinary browser behaviour for clicks, open-in-new-tab and no-JS navigation. */
$("#nav").addEventListener("keydown", event => {
  const step = {ArrowRight:1, ArrowLeft:-1, Home:"first", End:"last"}[event.key];
  if(step === undefined) return;
  event.preventDefault();
  const current = Math.max(0, tabIds.indexOf(currentPage));
  const next = step === "first" ? 0 : step === "last" ? tabIds.length - 1
    : (current + step + tabIds.length) % tabIds.length;
  location.href = navLinks[next].href;
});

/* ---------- cases and verb subsections ---------- */
function showCase(id, number){
  const variants = $$(".case-variant");
  if(!variants.length) return;
  let target = variants.find(item => item.dataset.case === id && item.dataset.num === number);
  if(!target){ id = "mian"; number = "sg"; target = variants.find(item => item.dataset.case === id && item.dataset.num === number); }
  curCase = id; curNum = number;
  variants.forEach(item => {
    const on = item === target;
    item.classList.toggle("on", on);
    item.setAttribute("aria-hidden", String(!on));
  });
  $$("#chips [data-c]").forEach(item => item.setAttribute("aria-pressed", item.dataset.c === id));
  $$("#numtog [data-n]").forEach(item => item.setAttribute("aria-pressed", item.dataset.n === number));
  $$(".case-practice-variant").forEach(item => {
    const on = item.dataset.case === id;
    item.classList.toggle("on", on);
    item.setAttribute("aria-hidden", String(!on));
  });
}

$("#chips")?.addEventListener("click", event => {
  const button = event.target.closest("[data-c]");
  if(!button) return;
  showCase(button.dataset.c, curNum);
  writeHash();
});
$("#numtog")?.addEventListener("click", event => {
  const button = event.target.closest("[data-n]");
  if(!button) return;
  showCase(curCase, button.dataset.n);
  writeHash();
});

function showVerb(key){
  const variants = $$(".verb-variant");
  if(!variants.length) return;
  let target = variants.find(item => item.dataset.v === key);
  if(!target){ key = "conj"; target = variants.find(item => item.dataset.v === key); }
  curV = key;
  variants.forEach(item => {
    const on = item === target;
    item.classList.toggle("on", on);
    item.setAttribute("aria-hidden", String(!on));
  });
  $$("#vchips [data-v]").forEach(item => item.setAttribute("aria-pressed", item.dataset.v === key));
  $$(".verb-practice-variant").forEach(item => {
    const on = item.dataset.v === key;
    item.classList.toggle("on", on);
    item.setAttribute("aria-hidden", String(!on));
  });
}

$("#vchips")?.addEventListener("click", event => {
  const button = event.target.closest("[data-v]");
  if(!button) return;
  showVerb(button.dataset.v);
  writeHash();
});

/* ---------- local filters ---------- */
function filterPreps(value){
  $$("#pfilter [data-f]").forEach(item => item.setAttribute("aria-pressed", item.dataset.f === value));
  $$("#ptable tr").forEach((row, index) => {
    if(index) row.hidden = value !== "все" && clean(row.cells[1]?.textContent || "") !== value;
  });
}
$("#pfilter")?.addEventListener("click", event => {
  const button = event.target.closest("[data-f]");
  if(button) filterPreps(button.dataset.f);
});

const verbSearch = $("#vsearch");
function filterVerbs(query){
  const key = norm(query.trim());
  $$("#vlist table tr").forEach((row, index) => {
    if(index) row.hidden = !!key && !norm(row.textContent).includes(key);
  });
}
verbSearch?.addEventListener("input", event => filterVerbs(event.target.value));

/* ---------- exercises ---------- */
const EXERCISE_STORAGE_KEY = "polski-exercises-v1";
let exerciseState = {values:{}, results:{}, scores:{}};
try{
  const saved = JSON.parse(sessionStorage.getItem(EXERCISE_STORAGE_KEY)
    || sessionStorage.getItem("polski-case-exercises-v1") || "null");
  if(saved && typeof saved === "object") exerciseState = {
    values:saved.values || {}, results:saved.results || {}, scores:saved.scores || {}
  };
}catch{}

function saveExerciseState(){
  try{ sessionStorage.setItem(EXERCISE_STORAGE_KEY, JSON.stringify(exerciseState)); }catch{}
}
function exerciseAnswers(control){
  try{ return JSON.parse(decodeURIComponent(control.dataset.answers)); }catch{ return []; }
}
function exerciseNorm(value){
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("pl");
}
function exerciseIsCorrect(control){
  const value = exerciseNorm(control.value);
  return !!value && exerciseAnswers(control).some(answer => exerciseNorm(answer) === value);
}
function clearExerciseItem(item){
  item.dataset.result = "";
  item.querySelectorAll(".exercise-field").forEach(field => field.classList.remove("is-correct", "is-wrong", "is-revealed"));
  item.querySelectorAll(".exercise-control").forEach(control => control.removeAttribute("aria-invalid"));
  const feedback = item.querySelector(".exercise-feedback");
  if(feedback){ feedback.hidden = true; feedback.textContent = ""; }
  const explanation = item.querySelector(".exercise-explanation");
  if(explanation) explanation.hidden = true;
}
function gradeExerciseItem(item, persist = true){
  const controls = [...item.querySelectorAll(".exercise-control")];
  const correct = controls.every(exerciseIsCorrect);
  controls.forEach(control => {
    const field = control.closest(".exercise-field");
    const ok = exerciseIsCorrect(control);
    field.classList.toggle("is-correct", ok);
    field.classList.toggle("is-wrong", !ok);
    field.classList.remove("is-revealed");
    control.setAttribute("aria-invalid", String(!ok));
  });
  item.dataset.result = correct ? "correct" : "wrong";
  const feedback = item.querySelector(".exercise-feedback");
  feedback.hidden = false;
  feedback.textContent = correct ? "Верно." : "Есть ошибка — проверьте выделенные поля.";
  item.querySelector(".exercise-explanation").hidden = false;
  if(persist){ exerciseState.results[item.dataset.exerciseId] = item.dataset.result; saveExerciseState(); }
  return correct;
}
function revealExerciseItem(item){
  item.querySelectorAll(".exercise-control").forEach(control => {
    control.value = exerciseAnswers(control)[0] || "";
    exerciseState.values[control.dataset.key] = control.value;
    const field = control.closest(".exercise-field");
    field.classList.remove("is-wrong");
    field.classList.add("is-correct", "is-revealed");
    control.removeAttribute("aria-invalid");
  });
  item.dataset.result = "revealed";
  exerciseState.results[item.dataset.exerciseId] = "revealed";
  const feedback = item.querySelector(".exercise-feedback");
  feedback.hidden = false; feedback.textContent = "Ответ показан.";
  item.querySelector(".exercise-explanation").hidden = false;
  saveExerciseState(); updateExerciseProgress(item.closest(".practice"));
}
function updateExerciseProgress(practice){
  if(!practice || practice.classList.contains("exercise-test")) return;
  const items = [...practice.querySelectorAll(".exercise-item")];
  const correct = items.filter(item => item.dataset.result === "correct").length;
  const progress = practice.querySelector(".exercise-progress");
  if(progress) progress.textContent = `верно ${correct} из ${items.length}`;
}
function resetExerciseGroup(group, isTest = false){
  group.querySelectorAll(".exercise-control").forEach(control => {
    control.value = ""; delete exerciseState.values[control.dataset.key];
  });
  group.querySelectorAll(".exercise-item").forEach(item => {
    delete exerciseState.results[item.dataset.exerciseId]; clearExerciseItem(item);
  });
  if(isTest){
    delete exerciseState.scores[group.dataset.test];
    const score = group.querySelector(".test-score");
    if(score){ score.textContent = ""; score.className = "test-score"; }
  }
  saveExerciseState(); updateExerciseProgress(group);
}
function checkExerciseTest(test){
  const items = [...test.querySelectorAll(".exercise-item")];
  const score = items.filter(item => gradeExerciseItem(item)).length;
  exerciseState.scores[test.dataset.test] = score;
  saveExerciseState();
  const output = test.querySelector(".test-score");
  output.textContent = `${score} из ${items.length}`;
  output.className = `test-score ${score === items.length ? "is-perfect" : "is-scored"}`;
  output.scrollIntoView({block:"nearest", behavior:SMOOTH});
}

function initExerciseSection(section){
  if(!section) return;
  section.querySelectorAll(".exercise-control").forEach(control => {
    if(Object.hasOwn(exerciseState.values, control.dataset.key)) control.value = exerciseState.values[control.dataset.key];
  });
  section.querySelectorAll(".exercise-item").forEach(item => {
    const result = exerciseState.results[item.dataset.exerciseId];
    if(result === "correct" || result === "wrong") gradeExerciseItem(item, false);
    else if(result === "revealed") revealExerciseItem(item);
  });
  section.querySelectorAll(".practice:not(.exercise-test)").forEach(updateExerciseProgress);
  section.querySelectorAll(".exercise-test").forEach(test => {
    const restoredScore = exerciseState.scores[test.dataset.test];
    if(!Number.isInteger(restoredScore)) return;
    const output = test.querySelector(".test-score");
    const total = test.querySelectorAll(".exercise-item").length;
    output.textContent = `${restoredScore} из ${total}`;
    output.className = `test-score ${restoredScore === total ? "is-perfect" : "is-scored"}`;
  });
  section.addEventListener("input", event => {
    const control = event.target.closest(".exercise-control");
    if(!control) return;
    exerciseState.values[control.dataset.key] = control.value;
    const item = control.closest(".exercise-item");
    delete exerciseState.results[item.dataset.exerciseId];
    clearExerciseItem(item); saveExerciseState(); updateExerciseProgress(item.closest(".practice"));
  });
  section.addEventListener("click", event => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if(!action) return;
    const item = event.target.closest(".exercise-item");
    const practice = event.target.closest(".practice");
    if(action === "check-item"){ gradeExerciseItem(item); updateExerciseProgress(practice); }
    if(action === "reveal-item") revealExerciseItem(item);
    if(action === "reset-practice") resetExerciseGroup(practice);
    if(action === "check-test") checkExerciseTest(practice);
    if(action === "reset-test") resetExerciseGroup(practice, true);
  });
}
initExerciseSection($("#s-cases"));
initExerciseSection($("#s-rodz"));
initExerciseSection($("#s-verbs"));
initExerciseSection($("#s-adj"));
initExerciseSection($("#s-preps"));
initExerciseSection($("#s-adv"));
initExerciseSection($("#s-pron"));
initExerciseSection($("#s-num"));
initExerciseSection($("#s-q"));
initExerciseSection($("#s-neg"));
initExerciseSection($("#s-order"));
initExerciseSection($("#s-impers"));
initExerciseSection($("#s-conj"));
initExerciseSection($("#s-part"));
initExerciseSection($("#s-alt"));
initExerciseSection($("#s-ludzie"));
initExerciseSection($("#s-alpha"));
initExerciseSection($("#s-dim"));
initExerciseSection($("#s-bridge"));

/* ---------- URL state, legacy hashes and heading links ---------- */
function hashFor(suffix = ""){
  const tail = suffix ? `/${suffix}` : "";
  if(currentPage === "s-cases") return `#${curCase}/${curNum}${tail}`;
  if(currentPage === "s-verbs") return `#${curV}${tail}`;
  return suffix ? `#${suffix}` : "";
}
function writeHash(suffix = ""){
  const hash = hashFor(suffix);
  if(location.hash !== hash) history.replaceState(null, "", hash || location.pathname + location.search);
}

const SMOOTH = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
function scrollToHeading(slug){
  const heading = document.querySelector(`[data-h="${CSS.escape(slug)}"]`);
  if(!heading) return;
  const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--head-h")) || 0;
  const y = window.scrollY + heading.getBoundingClientRect().top - offset - 12;
  window.scrollTo({top:Math.max(0, y), behavior:SMOOTH});
}
function revealSearchHit(id){
  const target = document.getElementById(id);
  if(!target) return;
  target.classList.add("hit");
  target.scrollIntoView({block:"center", behavior:SMOOTH});
  setTimeout(() => target.classList.remove("hit"), 2600);
}
function redirectLegacyHash(parts){
  const targetPage = parts.shift();
  const link = navLink(targetPage);
  if(!link) return false;
  let tail = "";
  if(targetPage === "s-cases" || targetPage === "s-verbs") tail = parts.join("/");
  else tail = parts.find(part => part.startsWith("~")) || "";
  location.replace(link.href.replace(/#.*$/, "") + (tail ? `#${tail}` : ""));
  return true;
}
function applyHash(){
  const parts = decodeURIComponent(location.hash.replace(/^#/, "")).split("/").filter(Boolean);
  if(parts[0]?.startsWith("s-") && redirectLegacyHash([...parts])) return;

  let rest = parts;
  if(currentPage === "s-cases"){
    showCase(parts[0] || "mian", parts[1] === "pl" ? "pl" : "sg");
    rest = parts.slice(2);
  }else if(currentPage === "s-verbs"){
    showVerb(parts[0] || "conj");
    rest = parts.slice(1);
  }
  const heading = rest.find(part => part.startsWith("~"));
  const hit = rest.find(part => /^r-\d+$/.test(part));
  if(heading) requestAnimationFrame(() => scrollToHeading(heading.slice(1)));
  if(hit) requestAnimationFrame(() => revealSearchHit(hit));
}
window.addEventListener("hashchange", applyHash);

document.addEventListener("click", event => {
  const button = event.target.closest(".alink");
  if(!button) return;
  const heading = button.closest("h3");
  writeHash(`~${heading.dataset.h}`);
  const ok = () => { button.classList.add("ok"); setTimeout(() => button.classList.remove("ok"), 1400); };
  try{ navigator.clipboard.writeText(location.href).then(ok, ok); }catch{ ok(); }
});

/* ---------- global full-text search ---------- */
let INDEX = [];
let searchLoad;
function loadSearchIndex(){
  if(INDEX.length) return Promise.resolve();
  if(searchLoad) return searchLoad;
  searchLoad = new Promise(resolve => {
    const script = document.createElement("script");
    script.src = SEARCH_INDEX_SRC;
    script.onload = () => {
      INDEX = (globalThis.SEARCH_INDEX || []).map(entry => ({...entry, key:norm(entry.text)}));
      resolve();
    };
    script.onerror = () => resolve();
    document.head.append(script);
  });
  return searchLoad;
}
const tokens = query => norm(query).split(/\s+/).filter(Boolean);
function search(query){
  const terms = tokens(query);
  if(!terms.length || (terms.length === 1 && terms[0].length < 2)) return {list:[], total:0};
  const hits = [];
  for(const entry of INDEX){
    let score = 0, matches = true;
    for(const term of terms){
      const at = entry.key.indexOf(term);
      if(at < 0){ matches = false; break; }
      score += at;
    }
    if(matches) hits.push({entry, score:score / terms.length + entry.text.length / 40});
  }
  hits.sort((a, b) => a.score - b.score);
  return {list:hits.slice(0, 30).map(hit => hit.entry), total:hits.length};
}

const escapeHTML = value => value.replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
function mark(text, query){
  const key = norm(text), ranges = [];
  for(const term of tokens(query)){
    let at = key.indexOf(term);
    while(at >= 0){ ranges.push([at, at + term.length]); at = key.indexOf(term, at + term.length); }
  }
  if(!ranges.length) return escapeHTML(text);
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [ranges[0]];
  for(const range of ranges.slice(1)){
    const last = merged.at(-1);
    if(range[0] <= last[1]) last[1] = Math.max(last[1], range[1]); else merged.push(range);
  }
  let output = "", position = 0;
  for(const [start, end] of merged){
    output += escapeHTML(text.slice(position, start)) + "<mark>" + escapeHTML(text.slice(start, end)) + "</mark>";
    position = end;
  }
  return output + escapeHTML(text.slice(position));
}

let hitList = [], selectedHit = -1;
function openSearch(open){
  $("#sres").classList.toggle("on", open);
  $("#gsearch").setAttribute("aria-expanded", open);
  if(!open){ $("#gsearch").removeAttribute("aria-activedescendant"); selectedHit = -1; }
}
function selectHit(index){
  const items = $$("#sres .sr");
  if(!items.length) return;
  selectedHit = (index + items.length) % items.length;
  items.forEach((item, number) => item.setAttribute("aria-selected", number === selectedHit));
  items[selectedHit].scrollIntoView({block:"nearest"});
  $("#gsearch").setAttribute("aria-activedescendant", items[selectedHit].id);
}
function renderResults(query){
  const box = $("#sres");
  if(!query.trim()){ openSearch(false); box.innerHTML = ""; hitList = []; return; }
  const {list, total} = search(query);
  hitList = list; selectedHit = -1; openSearch(true);
  if(!list.length){
    box.innerHTML = tokens(query).every(term => term.length < 2)
      ? '<div class="snone">Введите хотя бы два символа</div>'
      : '<div class="snone">Ничего не нашлось</div>';
    return;
  }
  box.innerHTML = list.map((entry, index) => `<button class="sr" role="option" id="sr-${index}" data-i="${index}" aria-selected="false">
    <span class="sr-w">${escapeHTML(entry.label)}${entry.head ? ` · ${escapeHTML(entry.head)}` : ""}</span>
    <span class="sr-t">${mark(entry.text.length > 140 ? entry.text.slice(0, 140) + "…" : entry.text, query)}</span>
  </button>`).join("") + (total > list.length ? `<div class="scount">показаны ${list.length} из ${total} - уточните запрос</div>` : "");
}
function closeSearch(){ openSearch(false); $("#gsearch").blur(); }
function resultHash(entry){
  if(entry.tab === "s-cases") return `#${entry.cs || "mian"}/${entry.num || "sg"}/${entry.id}`;
  if(entry.tab === "s-verbs") return `#${entry.vs || "conj"}/${entry.id}`;
  return `#${entry.id}`;
}
function goTo(entry){
  const hash = resultHash(entry);
  if(entry.tab !== currentPage){
    const link = navLink(entry.tab);
    if(link) location.href = link.href.replace(/#.*$/, "") + hash;
    return;
  }
  if(entry.cs) showCase(entry.cs, entry.num || "sg");
  if(entry.vs) showVerb(entry.vs);
  if(entry.tab === "s-preps") filterPreps("все");
  if(entry.vs === "lista" && verbSearch){ verbSearch.value = ""; filterVerbs(""); }
  history.replaceState(null, "", hash);
  closeSearch();
  revealSearchHit(entry.id);
}

$("#gsearch").addEventListener("input", async event => { await loadSearchIndex(); renderResults(event.target.value); });
$("#gsearch").addEventListener("focus", async event => { await loadSearchIndex(); if(event.target.value) renderResults(event.target.value); });
$("#gsearch").addEventListener("keydown", event => {
  if(event.key === "Escape"){ event.target.value = ""; renderResults(""); closeSearch(); return; }
  if(event.key === "ArrowDown" || event.key === "ArrowUp"){
    event.preventDefault();
    if(!$("#sres").classList.contains("on")) renderResults(event.target.value);
    selectHit(selectedHit + (event.key === "ArrowDown" ? 1 : -1)); return;
  }
  if(event.key === "Home" || event.key === "End"){
    if(!$("#sres .sr")) return;
    event.preventDefault(); selectHit(event.key === "Home" ? 0 : -1); return;
  }
  if(event.key === "Enter") ($("#sres .sr[aria-selected='true']") || $("#sres .sr"))?.click();
});
$("#sres").addEventListener("click", event => {
  const button = event.target.closest(".sr[data-i]");
  if(button) goTo(hitList[+button.dataset.i]);
});
document.addEventListener("click", event => { if(!event.target.closest("#sbox")) openSearch(false); });
document.addEventListener("keydown", event => {
  if((event.key === "/" || (event.key === "k" && (event.metaKey || event.ctrlKey))) && document.activeElement !== $("#gsearch")){
    event.preventDefault(); $("#gsearch").focus(); $("#gsearch").select();
  }
});

/* ---------- theme, menu and sticky header ---------- */
const THEMES = [["light", "светлая"], ["dark", "тёмная"]];
const SYSTEM_DARK = matchMedia("(prefers-color-scheme: dark)");
function readTheme(){
  try{ const theme = localStorage.getItem("theme"); return theme === "light" || theme === "dark" ? theme : null; }catch{ return null; }
}
function applyTheme(value){
  if(value) document.documentElement.dataset.theme = value;
  else delete document.documentElement.dataset.theme;
  const current = value || (SYSTEM_DARK.matches ? "dark" : "light");
  $("#theme").innerHTML = THEMES.map(([id, label]) =>
    `<button type="button" data-t="${id}" aria-pressed="${id === current}">${label}</button>`).join("");
}
$("#theme").addEventListener("click", event => {
  const button = event.target.closest("[data-t]");
  if(!button) return;
  try{ localStorage.setItem("theme", button.dataset.t); }catch{}
  applyTheme(button.dataset.t); setHeadH();
});
SYSTEM_DARK.addEventListener("change", () => { if(!readTheme()) applyTheme(null); });

function closeNavMenu(){ $("#navmenu").classList.remove("on"); $("#navall").setAttribute("aria-expanded", "false"); }
$("#navall").addEventListener("click", () => {
  const open = !$("#navmenu").classList.contains("on");
  $("#navmenu").classList.toggle("on", open);
  $("#navall").setAttribute("aria-expanded", open);
  if(open) $("#navmenu [data-s]")?.focus();
});
$("#navmenu").addEventListener("click", event => {
  if(event.target.closest("[data-s]")) closeNavMenu();
});
document.addEventListener("keydown", event => { if(event.key === "Escape" && $("#navmenu").classList.contains("on")) closeNavMenu(); });
document.addEventListener("click", event => { if(!event.target.closest("#navwrap")) closeNavMenu(); });

function setHeadH(){
  const header = $("header"), nav = $("#navwrap");
  const offset = nav.getBoundingClientRect().top - header.getBoundingClientRect().top;
  const narrow = matchMedia("(max-width:700px)").matches;
  document.documentElement.style.setProperty("--brand-h", (narrow ? offset : 0) + "px");
  document.documentElement.style.setProperty("--head-h", (narrow ? header.offsetHeight - offset : header.offsetHeight) + "px");
}
function updateNavArrows(){
  const nav = $("#nav"), wrap = $("#navwrap");
  wrap.classList.toggle("can-l", nav.scrollLeft > 2);
  wrap.classList.toggle("can-r", nav.scrollLeft < nav.scrollWidth - nav.clientWidth - 2);
}
$("#nav").addEventListener("scroll", updateNavArrows, {passive:true});
$("#navl").addEventListener("click", () => $("#nav").scrollBy({left:-$("#nav").clientWidth * .6, behavior:"smooth"}));
$("#navr").addEventListener("click", () => $("#nav").scrollBy({left: $("#nav").clientWidth * .6, behavior:"smooth"}));
window.addEventListener("resize", () => { updateNavArrows(); setHeadH(); });

/* ---------- start ---------- */
if(currentPage === "s-cases") showCase("mian", "sg");
if(currentPage === "s-verbs") showVerb("conj");
if(currentPage === "s-preps") filterPreps("все");
applyTheme(readTheme());
setHeadH();
updateNavArrows();
navLink(currentPage)?.scrollIntoView({block:"nearest", inline:"nearest"});
applyHash();
