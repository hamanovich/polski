(() => {
  const DATA_SRC = document.currentScript?.dataset.gameSrc || "game-data.js";
  const STORAGE_KEY = "polski-detektyw-v1";
  const TRAINER_STORAGE_KEY = "polski-trainer-v2";
  const TRAINER_MISSED_LIMIT = 60;
  const CASES = 10;
  const TIER_PLAN = [[1, 4], [2, 3], [3, 3]];
  const CLEAN_SHARE = 0.3;
  const CLEAN_MIN = 1;
  const CLEAN_MAX = 5;
  const TOPIC_LIMIT = 2;
  const DECK_PAGES = {
    verbs:"verbs", nouns:"cases", adjectives:"adjectives", pronouns:"pronouns",
    prepositions:"prepositions", negation:"negation", phrases:"particles",
    government:"verbs", falsefriends:"language-bridges"
  };
  const SLOT = /\{([^{}|]+)\|([^{}|]+)\}/;

  function readStore(key){
    try{ return JSON.parse(localStorage.getItem(key) || "{}") || {}; }catch{ return {}; }
  }
  function writeStore(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }catch{}
  }
  function shuffle(list){
    const out = [...list];
    for(let i = out.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }
  const escapeHTML = text => String(text).replace(/[&<>"]/g, char => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;"})[char]);

  function trainerDeck(store, deck){
    return store[deck] && typeof store[deck] === "object" ? store[deck] : {};
  }
  function queueMistake(item){
    if(!item.drill || !item.drillKey) return;
    const store = readStore(TRAINER_STORAGE_KEY);
    const deck = trainerDeck(store, item.drill.deck);
    const missed = Array.isArray(deck.missed) ? deck.missed : [];
    deck.missed = [item.drillKey, ...missed.filter(key => key !== item.drillKey)].slice(0, TRAINER_MISSED_LIMIT);
    store[item.drill.deck] = deck;
    writeStore(TRAINER_STORAGE_KEY, store);
  }
  function applyDrillFilter(item){
    const filter = item.drill?.filter;
    if(!filter || !Object.keys(filter).length) return;
    const store = readStore(TRAINER_STORAGE_KEY);
    const deck = trainerDeck(store, item.drill.deck);
    Object.assign(deck, filter);
    store[item.drill.deck] = deck;
    writeStore(TRAINER_STORAGE_KEY, store);
  }

  function version(item, clean){
    const match = item.text.match(SLOT);
    const before = item.text.slice(0, match.index);
    const after = item.text.slice(match.index + match[0].length);
    const slot = clean ? match[1] : match[2];
    return {text:`${before}${slot}${after}`, start:before.length, end:before.length + slot.length, right:match[1], wrong:match[2], before, after};
  }

  function tokens(item, clean){
    const shaped = version(item, clean);
    return [...shaped.text.matchAll(/\S+/g)].map(found => {
      const [, lead, word, tail] = found[0].match(/^([„«"(]*)(.*?)([.,!?;:»")]*)$/);
      const from = found.index + lead.length;
      const to = from + word.length;
      return {lead, word, tail, inSlot:from < shaped.end && to > shaped.start};
    });
  }

  function initDetective(host){
    const data = globalThis.GAME_DATA;
    if(!data?.detektyw?.length) return;
    const bank = data.detektyw;
    const rules = data.rules || {};
    const byId = new Map(bank.map(item => [item.id, item]));
    const upToRoot = DATA_SRC.replace(/game-data\.js.*$/, "");
    const $ = selector => host.querySelector(selector);

    const intro = $("[data-det-intro]");
    const round = $("[data-det-round]");
    const over = $("[data-det-over]");
    const record = $("[data-det-record]");
    const stepOut = $("[data-det-step]");
    const scoreOut = $("[data-det-score]");
    const topicOut = $("[data-det-topic]");
    const contextLine = $("[data-det-context]");
    const askLine = $("[data-det-ask]");
    const sentence = $("[data-det-sentence]");
    const verdict = $("[data-det-verdict]");
    const commitButton = $("[data-det-commit]");
    const clearButton = $("[data-det-clear]");
    const fixBox = $("[data-det-fix]");
    const optionBox = $("[data-det-options]");
    const reveal = $("[data-det-reveal]");
    const feedback = $("[data-det-feedback]");
    const versions = $("[data-det-versions]");
    const why = $("[data-det-why]");
    const nextButton = $("[data-det-next]");

    const store = readStore(STORAGE_KEY);
    if(typeof store.best !== "number") store.best = 0;
    if(typeof store.games !== "number") store.games = 0;
    if(!Array.isArray(store.seen)) store.seen = [];
    if(!store.weak || typeof store.weak !== "object") store.weak = {};
    let run = store.run && typeof store.run === "object" ? store.run : null;
    if(run && !(Array.isArray(run.ids) && run.ids.every(id => byId.has(id)))) run = null;
    const save = () => { store.run = run; writeStore(STORAGE_KEY, store); };

    function focusView(node){
      node.focus({preventScroll:true});
      const header = document.querySelector("header");
      const inset = Math.max(0, header?.getBoundingClientRect().height || 0) + 16;
      const box = node.getBoundingClientRect();
      if(box.top < inset || box.bottom > window.innerHeight - 16)
        window.scrollBy({top:box.top - inset, behavior:"instant"});
    }

    function show(which){
      intro.hidden = which !== "intro";
      round.hidden = which !== "round";
      over.hidden = which !== "over";
      host.dataset.view = which;
      host.closest(".game-page").classList.toggle("is-playing", which !== "intro");
    }

    function fits(item, taken, relaxed){
      if(taken.some(other => other.id === item.id)) return false;
      if(relaxed) return true;
      if(taken.filter(other => other.topic === item.topic).length >= TOPIC_LIMIT) return false;
      if(taken.some(other => other.ruleId === item.ruleId)) return false;
      return !taken.some(other => other.lemmas.some(lemma => item.lemmas.includes(lemma)));
    }

    function assemble(){
      const seen = new Set(store.seen);
      const ordered = list => [...shuffle(list.filter(item => !seen.has(item.id))), ...shuffle(list.filter(item => seen.has(item.id)))];
      const taken = [];
      for(const [tier, count] of TIER_PLAN){
        const before = taken.length;
        for(const item of ordered(bank.filter(entry => entry.tier === tier))){
          if(taken.length - before >= count) break;
          if(fits(item, taken, false)) taken.push(item);
        }
      }
      for(const relaxed of [false, true])
        for(const item of ordered(bank)){
          if(taken.length >= CASES) break;
          if(fits(item, taken, relaxed)) taken.push(item);
        }
      if(taken.length < CASES) return null;
      taken.sort((first, second) => first.tier - second.tier);
      let clean;
      do clean = taken.map(() => Math.random() < CLEAN_SHARE);
      while(clean.filter(Boolean).length < CLEAN_MIN || clean.filter(Boolean).length > CLEAN_MAX);
      return {
        ids:taken.map(item => item.id), clean, index:0,
        picked:null, stage:"pick", fixOrder:null, results:[]
      };
    }

    const current = () => byId.get(run.ids[run.index]);
    const isClean = () => run.clean[run.index];
    const scoreOf = () => run.results.reduce((sum, result) => sum + result.points, 0);
    const ruleLink = item => {
      const rule = rules[item.ruleId];
      return rule ? ` <a href="${upToRoot}${rule.url.replace(/^\//, "")}">Открыть правило</a>` : "";
    };

    function sentenceHTML(item, clean, mark){
      return tokens(item, clean).map((token, index) => {
        const classes = ["det-word"];
        if(mark && token.inSlot) classes.push(mark);
        if(run.stage === "pick" && run.picked === index) classes.push("is-picked");
        if(run.stage !== "pick" && run.picked === index) classes.push(token.inSlot && !clean ? "is-hit" : "is-miss");
        const word = run.stage === "pick"
          ? `<button type="button" class="${classes.join(" ")}" data-token="${index}" aria-pressed="${run.picked === index}">${escapeHTML(token.word)}</button>`
          : `<span class="${classes.join(" ")}">${escapeHTML(token.word)}</span>`;
        return `<span class="det-token">${escapeHTML(token.lead)}${word}${escapeHTML(token.tail)}</span>`;
      }).join(" ");
    }

    function versionHTML(item, clean){
      const shaped = version(item, clean);
      return `${escapeHTML(shaped.before)}<b class="${clean ? "det-right" : "det-wrong"}">${escapeHTML(clean ? shaped.right : shaped.wrong)}</b>${escapeHTML(shaped.after)}`;
    }

    function paintRound(){
      const item = current();
      const clean = isClean();
      const result = run.results[run.index];
      show("round");
      if(!store.seen.includes(item.id)){
        store.seen.push(item.id);
        save();
      }
      stepOut.textContent = `${run.index + 1} из ${run.ids.length}`;
      scoreOut.textContent = String(scoreOf());
      topicOut.textContent = run.stage === "done" ? item.topic : "?";
      contextLine.textContent = item.context ? `Условие: ${item.context}.` : "";
      contextLine.hidden = !item.context;
      askLine.textContent = run.stage === "pick" ? "Есть ли в предложении ошибка? Нажмите на неверное слово или ответьте, что ошибки нет."
        : run.stage === "fix" ? "Ошибка найдена." : "";
      askLine.hidden = run.stage === "done";

      const mark = run.stage === "done" ? (clean ? "is-clean" : "is-culprit") : "";
      sentence.innerHTML = sentenceHTML(item, clean, mark);
      sentence.classList.toggle("is-open", run.stage === "pick");

      verdict.hidden = run.stage !== "pick";
      commitButton.textContent = run.picked === null ? "Ошибки нет" : "Здесь ошибка";
      clearButton.hidden = run.picked === null;

      fixBox.hidden = run.stage !== "fix";
      if(run.stage === "fix")
        optionBox.innerHTML = run.fixOrder.map((option, index) => `
          <button type="button" class="game-option" data-fix="${escapeHTML(option)}"><span class="game-letter">${index + 1}</span><span lang="pl">${escapeHTML(option)}</span></button>`).join("");

      reveal.hidden = run.stage !== "done";
      if(run.stage === "done"){
        feedback.className = `game-feedback ${result.points === 2 ? "is-correct" : "is-wrong"}`;
        feedback.textContent = result.message;
        versions.innerHTML = clean
          ? `Верная версия: ${versionHTML(item, true)}`
          : `Было: ${versionHTML(item, false)}<br>Верно: ${versionHTML(item, true)}`;
        why.innerHTML = `${escapeHTML(item.explanation)}${ruleLink(item)}`;
        nextButton.textContent = run.index + 1 === run.ids.length ? "Итоги расследования" : "Следующее дело";
      }
    }

    function settle(points, message, extra = {}){
      const item = current();
      run.results[run.index] = {id:item.id, clean:isClean(), points, message, ...extra};
      if(!isClean() && points < 2){
        queueMistake(item);
        store.weak[item.topic] = (store.weak[item.topic] || 0) + 1;
      }
      run.stage = "done";
      save();
      paintRound();
      focusView(feedback);
    }

    function commit(){
      if(!run || run.stage !== "pick") return;
      const item = current();
      const clean = isClean();
      const list = tokens(item, clean);
      const picked = run.picked;
      if(clean){
        if(picked === null) return settle(2, "Верно, ошибки нет: предложение правильное.");
        return settle(0, `Ложное обвинение: «${list[picked].word}» здесь правильно.`, {accused:list[picked].word});
      }
      if(picked === null) return settle(0, "Ошибка осталась незамеченной.", {missed:true});
      if(!list[picked].inSlot) return settle(0, `Мимо: «${list[picked].word}» здесь правильно, ошибка в другом месте.`, {missed:true, accused:list[picked].word});
      const shaped = version(item, false);
      run.stage = "fix";
      run.fixOrder = shuffle(item.options.filter(option => option !== shaped.wrong));
      save();
      paintRound();
      focusView(fixBox);
      optionBox.querySelector(".game-option")?.focus({preventScroll:true});
    }

    function fix(option){
      if(!run || run.stage !== "fix") return;
      const item = current();
      const right = version(item, true).right;
      if(option === right) return settle(2, "Дело раскрыто: ошибка найдена и исправлена.", {found:true, fixed:true});
      settle(1, `Ошибка найдена, но исправление неверное: не «${option}», а «${right}».`, {found:true, fixed:false});
    }

    function pick(index){
      if(!run || run.stage !== "pick") return;
      run.picked = run.picked === index ? null : index;
      save();
      paintRound();
      sentence.querySelector(`[data-token="${index}"]`)?.focus({preventScroll:true});
    }

    function next(){
      if(!run || run.stage !== "done") return;
      if(run.index + 1 >= run.ids.length) return finish();
      run.index += 1;
      run.picked = null;
      run.stage = "pick";
      run.fixOrder = null;
      save();
      paintRound();
      focusView(round);
    }

    function finish(){
      run.ended = true;
      store.games += 1;
      run.previousBest = store.best;
      store.best = Math.max(store.best, scoreOf());
      save();
      paintOver();
      focusView(over);
    }

    function paintOver(){
      const results = run.results;
      const score = scoreOf();
      const max = run.ids.length * 2;
      const solved = results.filter(result => !result.clean && result.fixed).length;
      const errors = results.filter(result => !result.clean).length;
      const cleared = results.filter(result => result.clean && result.points === 2).length;
      const cleanCount = results.filter(result => result.clean).length;
      const repeat = [...new Set(results.filter(result => !result.clean && result.points < 2).map(result => byId.get(result.id).topic))];
      const accusations = results.filter(result => result.accused);
      const firstMissed = results.map(result => !result.clean && result.points < 2 ? byId.get(result.id) : null).find(item => item?.drill);
      const drillHref = firstMissed && DECK_PAGES[firstMissed.drill.deck] ? `${upToRoot}${DECK_PAGES[firstMissed.drill.deck]}/#trainer` : "";
      const previous = run.previousBest || 0;
      const review = results.map((result, index) => {
        const item = byId.get(result.id);
        return `<li><p class="det-review-head"><b>${index + 1}.</b> ${result.clean ? "Чистое" : "С ошибкой"} · ${escapeHTML(item.topic)} · ${result.points} из 2</p>
          <p lang="pl">${result.clean ? versionHTML(item, true) : `${versionHTML(item, false)} → ${versionHTML(item, true)}`}</p>
          <p class="note">${escapeHTML(result.message)} ${escapeHTML(item.explanation)}${ruleLink(item)}</p></li>`;
      }).join("");
      over.innerHTML = `
        <p class="game-result-label">Расследование закрыто</p>
        <p class="game-result">${score} <span class="det-max">из ${max}</span></p>
        <p class="game-result-score">Раскрыто дел с ошибкой: ${solved} из ${errors} · чистых предложений признано верными: ${cleared} из ${cleanCount}${score > previous ? previous ? ` · новый рекорд, прежний ${previous}` : "" : ` · рекорд ${store.best}`}</p>
        ${repeat.length ? `<div class="game-repeat"><h4>Стоит повторить</h4><ul>${repeat.map(topic => `<li>${escapeHTML(topic)}</li>`).join("")}</ul></div>` : ""}
        ${accusations.length ? `<div class="game-repeat"><h4>Зря заподозрены</h4><ul>${accusations.map(result => `<li><span lang="pl">${escapeHTML(result.accused)}</span> в деле «${escapeHTML(byId.get(result.id).topic)}»: это слово было правильным</li>`).join("")}</ul></div>` : ""}
        <details class="det-review"><summary>Разбор партии</summary><ol>${review}</ol></details>
        <div class="game-buttons">
          <button type="button" class="exercise-button" data-det-again>Ещё партия</button>
          ${drillHref ? `<a class="exercise-link" href="${drillHref}" data-det-drill>Отработать в тренажёре</a>` : ""}
        </div>`;
      show("over");
      over.querySelector("[data-det-again]").addEventListener("click", start);
      over.querySelector("[data-det-drill]")?.addEventListener("click", () => applyDrillFilter(firstMissed));
    }

    function paintIntro(){
      show("intro");
      const parts = [];
      if(store.games) parts.push(`Партий сыграно: ${store.games}`);
      if(store.best) parts.push(`рекорд ${store.best} из ${CASES * 2}`);
      const weak = Object.entries(store.weak).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([topic]) => topic.toLowerCase());
      if(weak.length) parts.push(`чаще всего ускользает: ${weak.join(", ")}`);
      record.textContent = parts.join(" · ");
      record.hidden = !parts.length;
    }

    function start(){
      const fresh = assemble();
      if(!fresh){
        show("intro");
        record.hidden = false;
        record.textContent = "В банке пока не хватает дел на полную партию.";
        return;
      }
      run = fresh;
      save();
      paintRound();
      focusView(round);
    }

    sentence.addEventListener("click", event => {
      const button = event.target.closest("[data-token]");
      if(button) pick(Number(button.dataset.token));
    });
    optionBox.addEventListener("click", event => {
      const button = event.target.closest("[data-fix]");
      if(button) fix(button.dataset.fix);
    });
    commitButton.addEventListener("click", commit);
    clearButton.addEventListener("click", () => {
      if(!run || run.stage !== "pick") return;
      run.picked = null;
      save();
      paintRound();
      commitButton.focus({preventScroll:true});
    });
    nextButton.addEventListener("click", next);
    $("[data-det-start]").addEventListener("click", start);
    $("[data-det-reset]").addEventListener("click", () => {
      run = null;
      save();
      paintIntro();
      focusView($("[data-det-start]"));
    });

    const typing = node => !!node?.closest?.("input, textarea, select, [contenteditable=''], [contenteditable='true']");
    document.addEventListener("keydown", event => {
      if(!run || run.ended || round.hidden || event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      const active = document.activeElement;
      if(typing(active)) return;
      if(active && active !== document.body && !host.contains(active)) return;
      const onWord = active?.matches?.("[data-token]");
      if(run.stage === "pick" && onWord && (event.key === "ArrowRight" || event.key === "ArrowLeft")){
        const words = [...sentence.querySelectorAll("[data-token]")];
        const target = words[words.indexOf(active) + (event.key === "ArrowRight" ? 1 : -1)];
        if(target){ event.preventDefault(); target.focus(); }
        return;
      }
      if(run.stage === "pick" && event.key === "0"){
        event.preventDefault();
        run.picked = null;
        commit();
        return;
      }
      if(run.stage === "pick" && event.key === "Enter" && !active?.closest?.("button, a, summary")){
        event.preventDefault();
        commit();
        return;
      }
      if(run.stage === "fix" && "123".includes(event.key)){
        const button = optionBox.querySelectorAll("[data-fix]")[Number(event.key) - 1];
        if(button){ event.preventDefault(); fix(button.dataset.fix); }
        return;
      }
      if(run.stage === "done" && event.key === "Enter" && !active?.closest?.("a, summary")){
        event.preventDefault();
        next();
      }
    });

    $("[data-det-stage]").hidden = false;
    if(run?.ended) paintOver();
    else if(run) paintRound();
    else paintIntro();
  }

  const detectiveHost = document.querySelector("[data-game='detektyw']");
  if(detectiveHost){
    const script = document.createElement("script");
    script.src = DATA_SRC;
    script.onload = () => initDetective(detectiveHost);
    script.onerror = () => {};
    document.head.append(script);
  }
})();
