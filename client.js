const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const clean = value => value.replace(/\s+/g, " ").trim();
const norm = value => value.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/\p{M}/gu, "");
const SEARCH_INDEX_SRC = document.currentScript?.dataset.searchSrc || "search-index.js";
const TRAINER_DATA_SRC = document.currentScript?.dataset.trainerSrc || "trainer-data.js";

const currentPage = document.documentElement.dataset.page || "s-index";
const navLinks = $$("#nav [data-s]");
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

function showCase(id, number){
  const variants = $$(".case-variant");
  if(!variants.length) return;
  let target = variants.find(item => item.dataset.case === id && item.dataset.num === number);
  if(!target){ id = "mian"; number = "sg"; target = variants.find(item => item.dataset.case === id && item.dataset.num === number); }
  curCase = id; curNum = number;
  updateStudyLinks();
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
  updateStudyLinks();
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
const exerciseFold = value => exerciseNorm(value)
  .replace(/\u0142/g, "l")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");
function exerciseVerdict(control){
  const value = exerciseNorm(control.value);
  if(!value) return "wrong";
  const answers = exerciseAnswers(control);
  if(answers.some(answer => exerciseNorm(answer) === value)) return "correct";
  if(answers.some(answer => exerciseFold(answer) === exerciseFold(control.value))) return "near";
  return "wrong";
}
function exerciseIsCorrect(control){
  return exerciseVerdict(control) !== "wrong";
}
function clearExerciseItem(item){
  item.dataset.result = "";
  item.querySelectorAll(".exercise-field").forEach(field => field.classList.remove("is-correct", "is-near", "is-wrong", "is-revealed"));
  item.querySelectorAll(".exercise-control").forEach(control => control.removeAttribute("aria-invalid"));
  const feedback = item.querySelector(".exercise-feedback");
  if(feedback){ feedback.hidden = true; feedback.textContent = ""; }
  const explanation = item.querySelector(".exercise-explanation");
  if(explanation) explanation.hidden = true;
}
function gradeExerciseItem(item, persist = true){
  const controls = [...item.querySelectorAll(".exercise-control")];
  const verdicts = controls.map(exerciseVerdict);
  const accepted = verdicts.every(verdict => verdict !== "wrong");
  const near = accepted && verdicts.includes("near");
  controls.forEach((control, index) => {
    const field = control.closest(".exercise-field");
    const verdict = verdicts[index];
    field.classList.toggle("is-correct", verdict === "correct");
    field.classList.toggle("is-near", verdict === "near");
    field.classList.toggle("is-wrong", verdict === "wrong");
    field.classList.remove("is-revealed");
    control.setAttribute("aria-invalid", String(verdict === "wrong"));
  });
  item.dataset.result = accepted ? (near ? "near" : "correct") : "wrong";
  const exact = controls
    .filter((control, index) => verdicts[index] === "near")
    .map(control => exerciseAnswers(control)[0])
    .join(" · ");
  const feedback = item.querySelector(".exercise-feedback");
  feedback.hidden = false;
  feedback.textContent = near
    ? `Верно, но без диакритики: ${exact}`
    : accepted ? "Верно." : "Есть ошибка - проверьте выделенные поля.";
  item.querySelector(".exercise-explanation").hidden = false;
  if(persist){ exerciseState.results[item.dataset.exerciseId] = item.dataset.result; saveExerciseState(); }
  return accepted;
}
function revealExerciseItem(item){
  item.querySelectorAll(".exercise-control").forEach(control => {
    control.value = exerciseAnswers(control)[0] || "";
    exerciseState.values[control.dataset.key] = control.value;
    const field = control.closest(".exercise-field");
    field.classList.remove("is-wrong", "is-near");
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
  const correct = items.filter(item => item.dataset.result === "correct" || item.dataset.result === "near").length;
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
    if(result === "correct" || result === "near" || result === "wrong") gradeExerciseItem(item, false);
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
const TRAINER_STORAGE_KEY = "polski-trainer-v2";
const TRAINER_LEGACY_KEYS = ["polski-trainer-v1"];
const TRAINER_STATS_MIN = 3;
const TRAINER_TENSES = {present:"настоящее", past:"прошедшее", future:"будущее"};
const TRAINER_NUMBERS = {sg:"единственное число", pl:"множественное число"};
const TRAINER_SIMPLE = [
  ["ja", ""], ["ty", ""], ["on / ona / ono", ""],
  ["my", ""], ["wy", ""], ["oni / one", ""]
];
const TRAINER_FULL = [
  ["ja", "мужской род"], ["ja", "женский род"],
  ["ty", "мужской род"], ["ty", "женский род"],
  ["on", ""], ["ona", ""], ["ono", ""],
  ["my", "мужско-личная"], ["my", "немужско-личная"],
  ["wy", "мужско-личная"], ["wy", "немужско-личная"],
  ["oni", ""], ["one", ""]
];
const TRAINER_GENDER_OF = ["m", "f", "m", "f", "m", "f", "n", "m", "f", "m", "f", "m", "f"];
const TRAINER_MISSED_LIMIT = 60;
const TRAINER_RECENT = 12;

let trainerData = null;
let trainerLoad;
function loadTrainerData(){
  if(trainerData) return Promise.resolve();
  if(trainerLoad) return trainerLoad;
  const settle = () => { trainerData = globalThis.TRAINER_DATA || {verbs:[], nouns:[], adjectives:[], cases:[]}; };
  trainerLoad = new Promise(resolve => {
    const script = document.createElement("script");
    script.src = TRAINER_DATA_SRC;
    script.onload = () => { settle(); resolve(); };
    script.onerror = () => { settle(); resolve(); };
    document.head.append(script);
  });
  return trainerLoad;
}

function trainerVerbCells(verb, tense){
  if(tense === "present")
    return verb.pr ? verb.pr.map((form, cell) => ({cell, labels:TRAINER_SIMPLE[cell], gender:"", answers:[form]})) : [];
  if(tense === "past")
    return verb.pa.map((form, cell) => ({cell, labels:TRAINER_FULL[cell], gender:TRAINER_GENDER_OF[cell], answers:[form]}));
  if(verb.fk === "s")
    return verb.fu.map((form, cell) => ({cell, labels:TRAINER_SIMPLE[cell], gender:"", answers:[form]}));
  return verb.fu.map((answers, cell) => ({cell, labels:TRAINER_FULL[cell], gender:TRAINER_GENDER_OF[cell], answers}));
}

function sentenceDeck(name, labels){
  return {
    defaults:{topic:"all"},
    questions(state){
      return (trainerData?.sentences?.[name] || []).filter(item => state.topic === "all" || item.topic === state.topic).map(item => ({
        key:item.id, word:item.prompt, cat:labels[item.topic], chips:[labels[item.topic], "", ""],
        cue:item.cue, answers:item.answers, hint:item.explanation, explain:true
      }));
    }
  };
}

const TRAINER_DECKS = {
  pronouns:sentenceDeck("pronouns", {personal:"Личные", reflexive:"Возвратные", other:"Указательные и другие"}),
  prepositions:sentenceDeck("prepositions", {government:"Управление", space:"Где и куда", meaning:"Значение предлога"}),
  negation:sentenceDeck("negation", {case:"Падеж", construction:"Не является или отсутствует", negative:"Отрицательные слова"}),
  phrases:sentenceDeck("phrases", {reply:"Ответ собеседнику", link:"Скрепы в своей речи", soften:"Смягчение"}),
  verbs:{
    defaults:{tense:"all", gender:"all"},
    questions(state){
      const tenses = state.tense === "all" ? ["present", "past", "future"] : [state.tense];
      const list = [];
      for(const verb of trainerData.verbs) for(const tense of tenses) for(const item of trainerVerbCells(verb, tense)){
        if(state.gender !== "all" && item.gender !== state.gender) continue;
        const aspect = tense === "future" && verb.a === "pf" ? " · совершенный вид" : "";
        list.push({
          key:`${verb.l}|${tense}|${item.cell}`,
          word:verb.l,
          cat:TRAINER_TENSES[tense],
          chips:[TRAINER_TENSES[tense] + aspect, item.labels[0], item.labels[1]],
          answers:item.answers,
          hint:""
        });
      }
      return list;
    }
  },
  adjectives:{
    defaults:{kind:"all", gender:"all"},
    questions(state){
      const list = [];
      for(const item of trainerData.adjectives){
        if(state.kind !== "all" && item.k !== state.kind) continue;
        if(state.gender !== "all" && item.g !== state.gender) continue;
        list.push({
          key:`${item.l}|${item.k}|${item.t}|${item.d}`,
          word:item.l,
          cat:item.t,
          chips:[item.t, item.d, ""],
          answers:item.a,
          hint:""
        });
      }
      return list;
    }
  },
  nouns:{
    defaults:{case:"all", number:"all"},
    questions(state){
      const names = new Map(trainerData.cases.map(([id, name, ru]) => [id, `${name} · ${ru}`]));
      const list = [];
      for(const item of trainerData.nouns){
        if(state.case !== "all" && item.c !== state.case) continue;
        if(state.number !== "all" && item.n !== state.number) continue;
        list.push({
          key:`${item.l}|${item.c}|${item.n}`,
          word:item.l,
          cat:names.get(item.c) || item.c,
          chips:[names.get(item.c) || item.c, TRAINER_NUMBERS[item.n], ""],
          answers:[item.f],
          hint:`${item.g}: ${item.r}`,
          reference:item.ref || "",
          referenceLabel:item.refLabel || "Открыть правило"
        });
      }
      return list;
    }
  }
};

function initTrainer(host){
  const deck = TRAINER_DECKS[host.dataset.trainer];
  if(!deck) return;
  const stage = host.querySelector("[data-trainer-stage]");
  const empty = host.querySelector("[data-trainer-empty]");
  const form = host.querySelector("[data-trainer-form]");
  const input = host.querySelector("[data-trainer-input]");
  const submit = host.querySelector("[data-trainer-submit]");
  const skip = host.querySelector("[data-trainer-skip]");
  const feedback = host.querySelector("[data-trainer-feedback]");
  const word = host.querySelector("[data-trainer-word]");
  const score = host.querySelector(".trainer-score");
  const chips = [0, 1, 2].map(index => host.querySelector(`[data-trainer-chip="${index}"]`));
  const stats = host.querySelector("[data-trainer-stats]");
  const keys = host.querySelector("[data-trainer-keys]");
  const bars = [...host.querySelectorAll("[data-trainer-filter]")];

  const blank = {...deck.defaults, total:0, correct:0, streak:0, best:0, missed:[], recent:[], stats:{}};
  let store = {};
  try{
    store = JSON.parse(localStorage.getItem(TRAINER_STORAGE_KEY) || "{}") || {};
    for(const key of TRAINER_LEGACY_KEYS) localStorage.removeItem(key);
  }catch{}
  const saved = store[host.dataset.trainer];
  let state = saved && typeof saved === "object"
    ? {...blank, ...saved, missed:Array.isArray(saved.missed) ? saved.missed : [],
        recent:Array.isArray(saved.recent) ? saved.recent.slice(-TRAINER_RECENT) : [],
        stats:saved.stats && typeof saved.stats === "object" ? saved.stats : {}}
    : {...blank};

  let pool = [];
  let poolKeys = new Set();
  let current = null;
  let reviewing = false;
  let opening = true;

  const save = () => {
    try{
      store[host.dataset.trainer] = state;
      localStorage.setItem(TRAINER_STORAGE_KEY, JSON.stringify(store));
    }catch{}
  };
  const setBar = bar => bar.querySelectorAll("button").forEach(button =>
    button.setAttribute("aria-pressed", String(button.dataset.value === state[bar.dataset.trainerFilter])));

  function paintScore(){
    const parts = [];
    if(state.total) parts.push(`${state.correct} из ${state.total} · серия ${state.streak} · рекорд ${state.best}`);
    if(state.missed.length){
      const queued = state.missed.filter(key => poolKeys.has(key)).length;
      const outside = state.missed.length - queued;
      parts.push(`в очереди ошибок: ${queued}${outside ? ` (ещё ${outside} вне фильтра)` : ""}`);
    }
    score.textContent = parts.join(" · ");
  }

  function paintStats(){
    const rows = Object.entries(state.stats)
      .filter(([, row]) => Array.isArray(row) && row[1] >= TRAINER_STATS_MIN)
      .map(([label, row]) => ({label, share:Math.round(row[0] / row[1] * 100), total:row[1]}))
      .sort((a, b) => a.share - b.share || b.total - a.total)
      .map(row => `${row.label} ${row.share}% (${row.total})`);
    stats.hidden = !rows.length;
    stats.textContent = rows.length ? `Точность по разделам, слабое впереди: ${rows.join(" · ")}` : "";
  }

  const draw = list => list[Math.floor(Math.random() * list.length)];

  function pick(){
    if(!pool.length) return null;
    const words = new Set(pool.map(item => item.word)).size;
    const window = Math.min(TRAINER_RECENT, Math.max(0, words - 1));
    const skip = window ? state.recent.slice(-window) : [];
    const fresh = pool.filter(item => !skip.includes(item.word));
    const base = fresh.length ? fresh : pool;
    const missed = base.filter(item => state.missed.includes(item.key));
    return !opening && missed.length && Math.random() < 0.4 ? draw(missed) : draw(base);
  }

  function ask(){
    current = pick();
    reviewing = false;
    if(!current) return;
    opening = false;
    state.recent = [...state.recent, current.word].slice(-TRAINER_RECENT);
    save();
    chips.forEach((chip, index) => {
      chip.textContent = current.chips[index] || "";
      chip.hidden = !current.chips[index];
    });
    word.textContent = current.word;
    const cue = host.querySelector("[data-trainer-cue]");
    cue.textContent = current.cue || "";
    cue.hidden = !current.cue;
    input.value = "";
    input.disabled = false;
    input.removeAttribute("aria-invalid");
    input.classList.remove("is-correct", "is-near");
    feedback.textContent = "";
    feedback.className = "trainer-feedback";
    submit.textContent = "Проверить";
    skip.hidden = false;
  }

  function refill(){
    pool = deck.questions(state);
    poolKeys = new Set(pool.map(item => item.key));
    stage.hidden = !pool.length;
    empty.hidden = !!pool.length;
    paintScore();
    paintStats();
    if(pool.length) ask();
  }

  function settle(verdict, prefix){
    reviewing = true;
    const correct = verdict !== "wrong";
    state.total += 1;
    if(current.cat){
      const row = Array.isArray(state.stats[current.cat]) ? state.stats[current.cat] : [0, 0];
      state.stats[current.cat] = [row[0] + (correct ? 1 : 0), row[1] + 1];
    }
    if(correct){
      state.correct += 1;
      state.streak += 1;
      state.best = Math.max(state.best, state.streak);
      state.missed = state.missed.filter(item => item !== current.key);
    }else{
      state.streak = 0;
      state.missed = [current.key, ...state.missed.filter(item => item !== current.key)].slice(0, TRAINER_MISSED_LIMIT);
    }
    input.disabled = true;
    input.classList.toggle("is-correct", verdict === "correct");
    input.classList.toggle("is-near", verdict === "near");
    if(!correct) input.setAttribute("aria-invalid", "true");
    feedback.textContent = verdict === "correct"
      ? "Верно."
      : verdict === "near"
        ? `Верно, но без диакритики: ${current.answers.join(" · ")}`
        : `${prefix} Правильно: ${current.answers.join(" · ")}${current.hint ? `. ${current.hint}` : ""}`;
    if(correct && current.explain && current.hint) feedback.append(` ${current.hint}`);
    if(!correct && current.reference){
      const reference = document.createElement("a");
      reference.className = "trainer-reference";
      reference.href = current.reference;
      reference.textContent = current.referenceLabel;
      feedback.append(" ", reference);
    }
    feedback.className = `trainer-feedback ${verdict === "correct" ? "is-correct" : verdict === "near" ? "is-near" : "is-wrong"}`;
    submit.textContent = "Дальше";
    skip.hidden = true;
    paintScore();
    paintStats();
    save();
    submit.focus();
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if(reviewing){ ask(); input.focus(); return; }
    const value = exerciseNorm(input.value);
    if(!value){
      feedback.textContent = "Сначала напишите форму.";
      feedback.className = "trainer-feedback is-wrong";
      input.focus();
      return;
    }
    const exact = current.answers.some(answer => exerciseNorm(answer) === value);
    const near = !exact && current.answers.some(answer => exerciseFold(answer) === exerciseFold(input.value));
    settle(exact ? "correct" : near ? "near" : "wrong", "Пока нет.");
  });
  skip.addEventListener("click", () => settle("wrong", "Запомните."));
  keys.addEventListener("click", event => {
    const button = event.target.closest("[data-key]");
    if(!button || input.disabled) return;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    input.value = `${input.value.slice(0, start)}${button.dataset.key}${input.value.slice(end)}`;
    const caret = start + button.dataset.key.length;
    input.setSelectionRange(caret, caret);
    input.focus();
  });
  host.querySelector("[data-trainer-reset]").addEventListener("click", () => {
    state = {...state, total:0, correct:0, streak:0, best:0, missed:[], stats:{}};
    save();
    paintScore();
    paintStats();
    if(pool.length) ask();
    input.focus();
  });
  for(const bar of bars){
    bar.addEventListener("click", event => {
      const button = event.target.closest("[data-value]");
      const field = bar.dataset.trainerFilter;
      if(!button || button.dataset.value === state[field]) return;
      state[field] = button.dataset.value;
      setBar(bar);
      save();
      refill();
      if(pool.length) input.focus();
    });
    setBar(bar);
  }

  paintScore();
  paintStats();
  let started = false;
  const start = () => {
    if(started) return;
    started = true;
    loadTrainerData().then(() => { host.dataset.ready = "true"; refill(); });
  };
  host.addEventListener("pointerdown", start);
  host.addEventListener("focusin", start);
  if(typeof requestIdleCallback === "function") requestIdleCallback(start, {timeout:2000});
  else setTimeout(start, 200);
}
$$(".trainer").forEach(initTrainer);

initExerciseSection($("#s-cases"));
initExerciseSection($("#s-rodz"));
initExerciseSection($("#s-verbs"));
initExerciseSection($("#s-vocab"));
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

function hashFor(suffix = ""){
  const tail = suffix ? `/${suffix}` : "";
  if(currentPage === "s-cases") return `#${curCase}/${curNum}${tail}`;
  if(currentPage === "s-verbs") return `#${curV}${tail}`;
  return suffix ? `#${suffix}` : "";
}
function updateStudyLinks(){
  $$('[data-study-page]').filter(link => link.dataset.studyPage === currentPage).forEach(link => {
    link.hash = hashFor(link.dataset.study);
  });
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

  const study = parts.find(part => ["theory", "practice", "test", "trainer"].includes(part));
  const stateParts = parts.filter(part => part !== study);
  let rest = parts;
  if(currentPage === "s-cases"){
    showCase(stateParts[0] || "mian", stateParts[1] === "pl" ? "pl" : "sg");
    rest = parts.slice(2);
  }else if(currentPage === "s-verbs"){
    showVerb(stateParts[0] || "conj");
    rest = parts.slice(1);
  }
  const heading = rest.find(part => part.startsWith("~"));
  const hit = rest.find(part => /^r-\d+$/.test(part));
  if(study) requestAnimationFrame(() => {
    const target = document.getElementById(study);
    if(!target) return;
    const host = study === "theory" ? target : target.nextElementSibling;
    const heading = host.querySelector(".content-variant.on h2") || host.querySelector("h2") || host;
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--head-h")) || 0;
    const casebar = $(".casebar");
    const barHeight = casebar && getComputedStyle(casebar).position === "sticky" ? casebar.offsetHeight : 0;
    const top = window.scrollY + host.getBoundingClientRect().top - headerHeight - barHeight - 12;
    window.scrollTo({top:Math.max(0, top), behavior:SMOOTH});
    heading.setAttribute("tabindex", "-1");
    heading.focus({preventScroll:true});
  });
  if(heading) requestAnimationFrame(() => scrollToHeading(heading.slice(1)));
  if(hit) requestAnimationFrame(() => revealSearchHit(hit));
}
window.addEventListener("hashchange", applyHash);
document.addEventListener("click", event => {
  const link = event.target.closest("[data-study]");
  if(!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  closeNav();
  if(link.dataset.studyPage === currentPage && link.hash === location.hash){
    event.preventDefault();
    applyHash();
  }
});

document.addEventListener("click", event => {
  const button = event.target.closest(".alink");
  if(!button) return;
  const heading = button.closest("h3");
  writeHash(`~${heading.dataset.h}`);
  const ok = () => { button.classList.add("ok"); setTimeout(() => button.classList.remove("ok"), 1400); };
  try{ navigator.clipboard.writeText(location.href).then(ok, ok); }catch{ ok(); }
});

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

let hitList = [], selectedHit = -1, searchScrollY = 0;
function restoreSearchPosition(){
  const y = searchScrollY;
  requestAnimationFrame(() => {
    if(document.activeElement === $("#gsearch")) window.scrollTo({top:y, behavior:"auto"});
  });
}
function openSearch(open){
  $("#sres").classList.toggle("on", open);
  $("#gsearch").setAttribute("aria-expanded", open);
  if(open) setHeaderHidden(false);
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
  if(!query.trim()){
    openSearch(false);
    box.innerHTML = "";
    hitList = [];
    restoreSearchPosition();
    return;
  }
  const {list, total} = search(query);
  hitList = list; selectedHit = -1; openSearch(true);
  if(!list.length){
    box.innerHTML = tokens(query).every(term => term.length < 2)
      ? '<div class="snone">Введите хотя бы два символа</div>'
      : '<div class="snone">Ничего не нашлось</div>';
    restoreSearchPosition();
    return;
  }
  box.innerHTML = list.map((entry, index) => `<button class="sr" role="option" id="sr-${index}" data-i="${index}" aria-selected="false">
    <span class="sr-w">${escapeHTML(entry.label)}${entry.head ? ` · ${escapeHTML(entry.head)}` : ""}</span>
    <span class="sr-t">${mark(entry.text.length > 140 ? entry.text.slice(0, 140) + "…" : entry.text, query)}</span>
  </button>`).join("") + (total > list.length ? `<div class="scount">показаны ${list.length} из ${total} - уточните запрос</div>` : "");
  restoreSearchPosition();
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

$("#gsearch").addEventListener("pointerdown", () => { searchScrollY = Math.max(0, window.scrollY); });
$("#gsearch").addEventListener("input", async event => { await loadSearchIndex(); renderResults(event.target.value); });
$("#gsearch").addEventListener("focus", async event => {
  searchScrollY = Math.max(0, window.scrollY);
  await loadSearchIndex();
  if(event.target.value) renderResults(event.target.value);
});
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

const mobileHeader = matchMedia("(max-width:767px)");
const pageHeader = $("header");
let headerScrollY = Math.max(0, window.scrollY), headerScrollPending = false;
function headerInteractionActive(){
  return document.documentElement.classList.contains("nav-open") || $("#sres").classList.contains("on") || pageHeader.contains(document.activeElement);
}
function setHeaderHidden(hidden){
  pageHeader.classList.toggle("header-hidden", hidden && mobileHeader.matches && !headerInteractionActive());
}
function syncHeaderVisibility(){
  headerScrollPending = false;
  const y = Math.max(0, window.scrollY), delta = y - headerScrollY;
  if(!mobileHeader.matches || y <= 40 || headerInteractionActive()){
    setHeaderHidden(false);
    headerScrollY = y;
    return;
  }
  if(delta > 10 && y > 96){
    setHeaderHidden(true);
    headerScrollY = y;
  }else if(delta < -6){
    setHeaderHidden(false);
    headerScrollY = y;
  }
}
function queueHeaderVisibility(){
  if(headerScrollPending) return;
  headerScrollPending = true;
  requestAnimationFrame(syncHeaderVisibility);
}
addEventListener("scroll", queueHeaderVisibility, {passive:true});
addEventListener("resize", syncHeaderVisibility);
pageHeader.addEventListener("focusin", () => setHeaderHidden(false));

const toTop = $(".totop");
if(toTop){
  let toTopPending = false;
  const syncToTop = () => {
    toTopPending = false;
    toTop.classList.toggle("on", window.scrollY > window.innerHeight * 0.8);
  };
  addEventListener("scroll", () => {
    if(toTopPending) return;
    toTopPending = true;
    requestAnimationFrame(syncToTop);
  }, {passive:true});
  addEventListener("resize", syncToTop);
  toTop.addEventListener("click", () => {
    window.scrollTo({top:0, behavior:SMOOTH});
    closeNav();
  });
  syncToTop();
}

document.addEventListener("click", event => {
  if(!matchMedia("(max-width:620px)").matches) return;
  if(event.target.closest("a,button,input,select,label,summary")) return;
  const cell = event.target.closest("table.vt td,table.vt th");
  if(!cell) return;
  const table = cell.closest("table");
  if(!table.querySelector("tr > :nth-child(4)")) return;
  const row = cell.parentElement, on = !row.classList.contains("row-on");
  table.querySelectorAll("tr.row-on").forEach(item => item.classList.remove("row-on"));
  row.classList.toggle("row-on", on);
});

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

function closeNavPops(except){
  $$("#nav .navgroup-btn[aria-expanded='true']").forEach(button => {
    if(button !== except) button.setAttribute("aria-expanded", "false");
  });
}

function setNavMenuOpen(open){
  if(open) setHeaderHidden(false);
  $("#navmenu").classList.toggle("on", open);
  $("#navall").setAttribute("aria-expanded", String(open));
  document.documentElement.classList.toggle("nav-open", open);
}
function closeNavMenu(){ setNavMenuOpen(false); }
function closeNav(){ closeNavPops(); closeNavMenu(); }

$("#nav").addEventListener("click", event => {
  const button = event.target.closest(".navgroup-btn");
  if(!button) return;
  const open = button.getAttribute("aria-expanded") !== "true";
  closeNav();
  button.setAttribute("aria-expanded", open);
});
$("#navall").addEventListener("click", () => {
  const open = !$("#navmenu").classList.contains("on");
  closeNavPops();
  setNavMenuOpen(open);
});
document.addEventListener("keydown", event => {
  if(event.key !== "Escape") return;
  const openButton = $("#nav .navgroup-btn[aria-expanded='true']");
  if(openButton){ closeNavPops(); openButton.focus(); return; }
  if($("#navmenu").classList.contains("on")){ closeNavMenu(); $("#navall").focus(); }
});
document.addEventListener("click", event => { if(!event.target.closest("#navwrap")) closeNav(); });
document.addEventListener("focusin", event => { if(!event.target.closest("#navwrap")) closeNav(); });

function updateTalkBuilder(builder){
  const output = builder.querySelector("output");
  if(!output) return;
  const parts = [...builder.querySelectorAll("select")].map(select => select.value.trim()).filter(Boolean);
  const phrase = parts.reduce((acc, part) => !acc ? part : part.startsWith(",") ? acc + part : `${acc} ${part}`, "");
  output.textContent = phrase ? `${phrase}.` : "";
}
document.addEventListener("change", event => {
  const select = event.target.closest("[data-talk-builder] select");
  if(select) updateTalkBuilder(select.closest("[data-talk-builder]"));
});

function setHeadH(){
  const header = $("header"), nav = $("#navwrap");
  const offset = nav.getBoundingClientRect().top - header.getBoundingClientRect().top;
  const narrow = matchMedia("(max-width:767px)").matches;
  document.documentElement.style.setProperty("--brand-h", (narrow ? offset : 0) + "px");
  document.documentElement.style.setProperty("--head-h", (narrow ? header.offsetHeight - offset : header.offsetHeight) + "px");

  document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
}

let navRowWidth = 0;
function measureNavRow(){
  const wrap = $("#navwrap");
  wrap.classList.add("measuring");
  navRowWidth = $("#nav").scrollWidth || 0;
  wrap.classList.remove("measuring");
}
function fitNav(){
  const wrap = $("#navwrap");
  if(!navRowWidth) measureNavRow();
  const compact = navRowWidth > wrap.clientWidth - 4;
  if(compact !== wrap.classList.contains("compact")){
    wrap.classList.toggle("compact", compact);
    closeNav();
  }
}

window.addEventListener("resize", () => { fitNav(); setHeadH(); });
document.fonts?.ready.then(() => { navRowWidth = 0; fitNav(); });

if(currentPage === "s-cases") showCase("mian", "sg");
if(currentPage === "s-verbs") showVerb("conj");
if(currentPage === "s-preps") filterPreps("все");
applyTheme(readTheme());
fitNav();
setHeadH();
applyHash();
