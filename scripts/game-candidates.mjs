import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = vm.createContext({globalThis: {}});
vm.runInContext(await readFile(resolve(root, "trainer-data.js"), "utf8"), sandbox);
const DATA = sandbox.globalThis.TRAINER_DATA;

const CASE_WORDS = {
  mianownik:"mian", dopełniacz:"dop", celownik:"cel", biernik:"bier",
  narzędnik:"narz", miejscownik:"miej", wołacz:"woł"
};

const CASE_FOLDED = new Set(Object.keys(CASE_WORDS).map(word =>
  word.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/\p{M}/gu, "")));

const args = process.argv.slice(2);
const deckName = args.find(arg => !arg.startsWith("--"));
const flag = name => args.includes(`--${name}`);
const value = name => {
  const found = args.find(arg => arg.startsWith(`--${name}=`));
  return found ? found.slice(name.length + 3) : "";
};
const limit = Number(value("limit")) || 12;

if(!deckName){
  console.log("node scripts/game-candidates.mjs <колода> [--trap] [--topic=...] [--case=...] [--number=...] [--limit=N]");
  console.log("колоды:", Object.keys(DATA.sentences).join(", "), "nouns, verbs, adjectives");
  process.exit(0);
}

const SIMPLE_CELLS = ["ja", "ty", "on/ona/ono", "my", "wy", "oni/one"];
const PAST_CELLS = ["ja м.", "ja ж.", "ty м.", "ty ж.", "on", "ona", "ono",
  "my м.-л.", "my не м.-л.", "wy м.-л.", "wy не м.-л.", "oni", "one"];

const nounForms = new Map();
for(const item of DATA.nouns){
  if(!nounForms.has(item.l)) nounForms.set(item.l, new Map());
  nounForms.get(item.l).set(`${item.c}|${item.n}`, item.f);
}

const latinRuns = text => (text.match(/[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/g) || []);
const fold = text => text.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/\p{M}/gu, "");

function calqueCase(explanation){
  const hits = [];
  for(const [word, id] of Object.entries(CASE_WORDS)){
    const at = explanation.toLowerCase().indexOf(word);
    if(at < 0) continue;
    const before = explanation.slice(Math.max(0, at - 40), at).toLowerCase();
    if(/не |а не|русск|вместо/.test(before)) hits.push(`${word} (${id})`);
  }
  return hits;
}

function sentenceCandidates(deck){
  const rows = DATA.sentences[deck] || [];
  return rows
    .filter(row => !flag("trap") || row.trap === "trap")
    .filter(row => !value("topic") || row.topic === value("topic"))
    .map(row => {
      const lemma = (row.prompt.match(/\(([^)]+)\)$/) || [])[1] || "";
      const prompt = row.prompt.replace(/\s*\([^)]+\)\s*$/, "");
      const answer = row.answers[0];
      const banned = new Set([...latinRuns(prompt), ...row.answers.flatMap(latinRuns)].map(fold));
      const fromExplanation = [...new Set(latinRuns(row.explanation))]
        .filter(word => !banned.has(fold(word)))
        .filter(word => !CASE_FOLDED.has(fold(word)));
      const fromTable = [...(nounForms.get(lemma) || new Map()).entries()]
        .map(([slot, form]) => `${form} [${slot}]`)
        .filter(entry => !banned.has(fold(entry.split(" ")[0])));
      const filter = {};
      if(row.topic) filter.topic = row.topic;
      if(row.trap) filter.trap = row.trap;
      return {row, lemma, prompt, answer, fromExplanation, fromTable, filter};
    });
}

function paradigmCandidates(deck){
  if(deck === "nouns"){
    const wanted = value("case"), num = value("number");
    return DATA.nouns
      .filter(item => (!wanted || item.c === wanted) && (!num || item.n === num))
      .map(item => {
        const siblings = [...nounForms.get(item.l).entries()]
          .filter(([slot]) => slot !== `${item.c}|${item.n}`)
          .map(([slot, form]) => `${form} [${slot}]`);
        return {
          row:{id:`${item.l}|${item.c}|${item.n}`, topic:item.c, explanation:item.r},
          lemma:item.l, prompt:"TODO", answer:item.f,
          fromExplanation:[], fromTable:siblings
        };
      });
  }
  if(deck === "verbs"){
    const tense = value("tense") || "present";
    const cells = tense === "past" ? PAST_CELLS : SIMPLE_CELLS;
    const out = [];
    for(const verb of DATA.verbs){
      const forms = tense === "present" ? verb.pr : tense === "past" ? verb.pa : verb.fu;
      if(!forms) continue;
      const flat = forms.map(form => Array.isArray(form) ? form[0] : form);
      flat.forEach((form, cell) => {
        const siblings = flat
          .map((other, index) => index === cell ? "" : `${other} [${cells[index] || index}]`)
          .filter(entry => entry && entry.split(" ")[0] !== form);
        out.push({
          row:{id:`${verb.l}|${tense}|${cell}`, topic:tense, explanation:""},
          lemma:verb.l, prompt:"TODO", answer:form,
          fromExplanation:[], fromTable:[...new Set(siblings)],
          filter:{tense}, label:cells[cell] || String(cell)
        });
      });
    }
    return out;
  }
  if(deck === "adjectives"){
    const kind = value("kind");
    const byLemma = new Map();
    for(const item of DATA.adjectives){
      if(!byLemma.has(item.l)) byLemma.set(item.l, []);
      byLemma.get(item.l).push(item);
    }
    return DATA.adjectives
      .filter(item => !kind || item.k === kind)
      .map(item => ({
        row:{id:`${item.l}|${item.k}|${item.t}|${item.d}`, topic:item.k, explanation:""},
        lemma:item.l, prompt:"TODO", answer:item.a[0],
        fromExplanation:[],
        fromTable:byLemma.get(item.l)
          .filter(other => other !== item)
          .map(other => `${other.a[0]} [${other.t}/${other.d}]`)
          .filter(entry => entry.split(" ")[0] !== item.a[0]),
        filter:{kind:item.k, gender:item.g}, label:`${item.t}: ${item.d}`
      }));
  }
  throw new Error(`Заготовки для колоды ${deck} пока не сделаны`);
}

const pool = DATA.sentences[deckName] ? sentenceCandidates(deckName) : paradigmCandidates(deckName);

console.log(`Колода ${deckName}: кандидатов ${pool.length}, показано ${Math.min(limit, pool.length)}`);
console.log("Это заготовки. Дистракторы предложены машиной и обязаны быть вычитаны.\n");

for(const item of pool.slice(0, limit)){
  const distinct = new Set([...item.fromExplanation, ...item.fromTable.map(entry => entry.split(" ")[0])].map(fold));
  const notes = [];
  if(item.row.answers && item.row.answers.length > 1)
    notes.push(`допустимых ответов ${item.row.answers.length}: ${item.row.answers.join(", ")}. Взять один, остальные вычеркнуть из вариантов`);
  const calque = item.row.explanation ? calqueCase(item.row.explanation) : [];
  if(calque.length) notes.push(`калька идёт в ${calque.join(", ")}: дистрактор писать в этом падеже`);
  if(distinct.size < 3) notes.push(`различных дистракторов найдено ${distinct.size}, нужно три: дописать руками`);
  if(/^[a-ząćęłńóśźż]+ /i.test(item.answer)) notes.push("ответ с предлогом: предлоги нужны и в неверных вариантах");

  console.log(`--- ${item.row.id}${item.label ? `   (${item.label})` : ""}`);
  if(item.fromExplanation.length) console.log(`    из разбора: ${item.fromExplanation.join(", ")}`);
  if(item.fromTable.length) console.log(`    из таблиц:  ${item.fromTable.join(", ")}`);
  for(const note of notes) console.log(`    ! ${note}`);
  console.log(`  {
    id: "mil-TODO", tier: 3, topic: "TODO",
    context: ${JSON.stringify(item.lemma)}, prompt: ${JSON.stringify(item.prompt)},
    options: [${JSON.stringify(item.answer)}, "TODO", "TODO", "TODO"],
    answer: ${JSON.stringify(item.answer)},
    explanation: ${JSON.stringify(item.row.explanation || "TODO")},
    ruleId: "TODO",
    lemmas: [${JSON.stringify(item.lemma)}],
    drill: {deck: ${JSON.stringify(deckName)}, filter: ${JSON.stringify(item.filter || {})}},
    drillKey: ${JSON.stringify(item.row.id)}, src: ${JSON.stringify(item.row.id)}
  },`);
  console.log("");
}
