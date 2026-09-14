(() => {
  const GAME_DATA_SRC = document.currentScript?.dataset.gameSrc || "game-data.js";
  const GAME_STORAGE_KEY = "polski-millioner-v1";
  const TRAINER_STORAGE_KEY = "polski-trainer-v2";
  const TRAINER_MISSED_LIMIT = 60;
  const TIER_SIZE = 5;
  const TIER_POOL = 6;
  const LETTERS = ["A", "B", "C", "D"];
  const DECK_PAGES = {
    verbs:"verbs", nouns:"cases", adjectives:"adjectives", pronouns:"pronouns",
    prepositions:"prepositions", negation:"negation", phrases:"particles",
    government:"verbs", falsefriends:"language-bridges"
  };

  function readStore(key){
    try{ return JSON.parse(localStorage.getItem(key) || "{}") || {}; }catch{ return {}; }
  }
  function writeStore(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }catch{}
  }

  function queueMistake(question){
    if(!question.drill || !question.drillKey) return;
    const store = readStore(TRAINER_STORAGE_KEY);
    const deck = store[question.drill.deck] && typeof store[question.drill.deck] === "object"
      ? store[question.drill.deck] : {};
    const missed = Array.isArray(deck.missed) ? deck.missed : [];
    deck.missed = [question.drillKey, ...missed.filter(key => key !== question.drillKey)].slice(0, TRAINER_MISSED_LIMIT);
    store[question.drill.deck] = deck;
    writeStore(TRAINER_STORAGE_KEY, store);
  }

  function drillHref(question, prefix){
    const page = DECK_PAGES[question.drill?.deck];
    return page ? `${prefix}${page}/#trainer` : "";
  }

  function applyDrillFilter(question){
    const filter = question.drill?.filter;
    if(!filter || !Object.keys(filter).length) return;
    const store = readStore(TRAINER_STORAGE_KEY);
    const deck = store[question.drill.deck] && typeof store[question.drill.deck] === "object"
      ? store[question.drill.deck] : {};
    Object.assign(deck, filter);
    store[question.drill.deck] = deck;
    writeStore(TRAINER_STORAGE_KEY, store);
  }

  function money(amount){
    return `${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} zł`;
  }

  function shuffle(list){
    const out = [...list];
    for(let i = out.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function initGame(host){
    const data = globalThis.GAME_DATA;
    if(!data) return;
    const bank = data.milionerzy || [];
    const rules = data.rules || {};
    const upToRoot = GAME_DATA_SRC.replace(/game-data\.js.*$/, "");

    const stage = host.querySelector("[data-game-stage]");
    const intro = host.querySelector("[data-game-intro]");
    const round = host.querySelector("[data-game-round]");
    const over = host.querySelector("[data-game-over]");
    const record = host.querySelector("[data-game-record]");
    const prize = host.querySelector("[data-game-prize]");
    const stepLabel = host.querySelector("[data-game-step]");
    const topicLabel = host.querySelector("[data-game-topic]");
    const contextLine = host.querySelector("[data-game-context]");
    const promptLine = host.querySelector("[data-game-prompt]");
    const optionBox = host.querySelector("[data-game-options]");
    const ruleLine = host.querySelector("[data-game-rule]");
    const feedback = host.querySelector("[data-game-feedback]");
    const lockButton = host.querySelector("[data-game-lock]");
    const nextButton = host.querySelector("[data-game-next]");
    const quitButton = host.querySelector("[data-game-quit]");
    const resetButton = host.querySelector("[data-game-reset]");
    const hintButtons = [...host.querySelectorAll("[data-game-hint]")];
    const steps = [...host.querySelectorAll("[data-game-ladder] [data-step]")]
      .sort((a, b) => Number(a.dataset.step) - Number(b.dataset.step));
    const safeSteps = steps.filter(item => item.classList.contains("is-safe")).map(item => Number(item.dataset.step));
    const sumOf = step => steps[step - 1]?.querySelector(".game-step-sum")?.textContent || "";

    const ladderWrap = host.querySelector("[data-game-ladder-wrap]");
    const explanation = host.querySelector("[data-game-explanation]");
    const narrow = window.matchMedia("(max-width:899px)");
    const syncLadder = () => { ladderWrap.open = !narrow.matches; };
    syncLadder();
    narrow.addEventListener("change", syncLadder);
    function focusView(node, alignStart = false){
      node.focus({preventScroll:true});
      const header = document.querySelector("header");
      const inset = Math.max(0, header?.getBoundingClientRect().height || 0) + 16;
      const box = node.getBoundingClientRect();
      if(alignStart || box.top < inset)
        window.scrollBy({top:box.top - inset, behavior:"instant"});
      else if(box.bottom > window.innerHeight - 16)
        window.scrollBy({top:box.bottom - window.innerHeight + 16, behavior:"instant"});
    }

    const byId = new Map(bank.map(question => [question.id, question]));
    let store = readStore(GAME_STORAGE_KEY);
    if(typeof store.best !== "number") store.best = 0;
    if(typeof store.games !== "number") store.games = 0;
    if(!Array.isArray(store.seen)) store.seen = [];
    if(!store.weak || typeof store.weak !== "object") store.weak = {};
    let run = store.run && typeof store.run === "object" ? store.run : null;
    if(run && !run.ids?.every(id => byId.has(id))) run = null;

    const save = () => { store.run = run; writeStore(GAME_STORAGE_KEY, store); };

    function pickTier(tier, seen, usedRules, usedLemmas){
      const pool = bank.filter(question => question.tier === tier);
      const order = shuffle(pool.filter(question => !seen.has(question.id)))
        .concat(shuffle(pool.filter(question => seen.has(question.id))));
      const out = [];
      const topics = {};
      for(const question of order){
        if(out.length === TIER_POOL) break;
        if((topics[question.topic] || 0) >= 2) continue;
        if(usedRules.has(question.ruleId)) continue;
        if(question.lemmas.some(lemma => usedLemmas.has(lemma))) continue;
        out.push(question);
        topics[question.topic] = (topics[question.topic] || 0) + 1;
        usedRules.add(question.ruleId);
        question.lemmas.forEach(lemma => usedLemmas.add(lemma));
      }
      return out;
    }

    function assemble(){
      const seen = new Set(store.seen);
      const usedRules = new Set();
      const usedLemmas = new Set();
      const ids = [];
      const reserve = {};
      for(const tier of [1, 2, 3]){
        const picked = pickTier(tier, seen, usedRules, usedLemmas);
        if(picked.length < TIER_SIZE) return null;
        const playing = picked.slice(0, TIER_SIZE)
          .sort((first, second) => (first.level || 2) - (second.level || 2));
        ids.push(...playing.map(question => question.id));
        if(picked[TIER_SIZE]) reserve[tier] = picked[TIER_SIZE].id;
      }
      const order = {};
      for(const id of [...ids, ...Object.values(reserve)]) order[id] = shuffle(byId.get(id).options);
      return {
        ids, reserve, order, index:0, picked:null, locked:false, removed:[],
        hints:{fifty:false, rule:false, swap:false}, ruleOpen:false,
        hintTopics:[], ended:null
      };
    }

    const current = () => byId.get(run.ids[run.index]);
    const safePrize = answered => {
      const reached = safeSteps.filter(step => step <= answered);
      return reached.length ? reached[reached.length - 1] : 0;
    };

    function paintLadder(){
      const active = run && !run.ended ? run.index + 1 : 0;
      const done = run ? run.index + (run.locked && run.picked === current().answer ? 1 : 0) : 0;
      steps.forEach(item => {
        const step = Number(item.dataset.step);
        item.classList.toggle("is-now", step === active);
        item.classList.toggle("is-done", step <= done);
      });
    }

    function show(which){
      intro.hidden = which !== "intro";
      round.hidden = which !== "round";
      over.hidden = which !== "over";
      host.dataset.view = which;
      host.closest(".game-page").classList.toggle("is-playing", which !== "intro");
      resetButton.hidden = which !== "round";
      ladderWrap.hidden = which === "over";
    }

    function paintPrize(){
      if(!run) return;
      const banked = run.index + (run.locked && run.picked === current().answer ? 1 : 0);
      host.querySelector("[data-game-stakes]").hidden = false;
      host.querySelector("[data-game-value]").textContent = sumOf(run.index + 1);
      prize.textContent = banked ? sumOf(banked) : "0 zł";
      host.querySelector("[data-game-risk-label]").textContent = run.ended ? "Выигрыш" : run.locked ? "Несгораемая сумма" : "При ошибке";
      const safe = run.ended ? run.ended.step : safePrize(banked);
      host.querySelector("[data-game-risk]").textContent = safe ? sumOf(safe) : "0 zł";
      quitButton.textContent = `Забрать ${run.index ? sumOf(run.index) : "0 zł"}`;
    }

    function paintOptions(){
      const question = current();
      const options = run.order[question.id];
      const signature = JSON.stringify([question.id, options]);
      if(optionBox.dataset.question !== signature) optionBox.innerHTML = options.map((option, index) => `
        <button type="button" class="game-option" data-option="${option.replace(/"/g, "&quot;")}"
          aria-pressed="false"><span class="game-letter">${LETTERS[index]}</span><span lang="pl">${option}</span></button>`).join("");
      optionBox.dataset.question = signature;
      for(const button of optionBox.querySelectorAll(".game-option")){
        const option = button.dataset.option;
        button.disabled = run.locked || run.removed.includes(option);
        button.classList.toggle("is-gone", run.removed.includes(option));
        button.classList.toggle("is-right", run.locked && option === question.answer);
        button.classList.toggle("is-wrong", run.locked && option === run.picked && option !== question.answer);
        button.setAttribute("aria-pressed", String(option === run.picked));
        button.classList.toggle("is-picked", option === run.picked);
      }
    }

    function paintRound(){
      const question = current();
      show("round");
      if(!store.seen.includes(question.id)){
        store.seen.push(question.id);
        save();
      }
      stepLabel.textContent = `Вопрос ${run.index + 1} из ${run.ids.length}`;
      topicLabel.textContent = question.topic;
      contextLine.textContent = question.context || "";
      contextLine.hidden = !question.context;
      promptLine.textContent = question.prompt;
      paintOptions();
      const rule = rules[question.ruleId];
      const missed = run.locked && run.picked !== question.answer;
      if((run.ruleOpen || missed) && rule){
        ruleLine.innerHTML = `${rule.text} <a href="${upToRoot}${rule.url.replace(/^\//, "")}">Открыть раздел</a>`;
        ruleLine.hidden = false;
      }else{
        ruleLine.hidden = true;
        ruleLine.textContent = "";
      }
      lockButton.hidden = run.locked;
      lockButton.disabled = !run.picked;
      nextButton.hidden = !run.locked;
      nextButton.textContent = run.ended ? "Посмотреть итог" : "Следующий вопрос";
      quitButton.hidden = run.locked || run.index === 0;
      const spare = run.reserve[question.tier];
      const canSwap = !!spare && !run.ids.includes(spare);
      for(const button of hintButtons){
        const kind = button.dataset.gameHint;
        const used = !!run.hints[kind];
        button.disabled = used || run.locked || (kind === "swap" && !canSwap);
        button.setAttribute("aria-pressed", String(used));
        button.querySelector("[data-hint-status]").textContent =
          used ? "Использована" : (kind === "swap" && !canSwap ? "Нет запасного вопроса" : "");
      }
      explanation.hidden = !run.locked;
      explanation.open = missed;
      host.querySelector("[data-game-explanation-text]").textContent = run.locked ? question.explanation : "";
      if(run.locked){
        const right = run.picked === question.answer;
        feedback.className = `game-feedback ${right ? "is-correct" : "is-wrong"}`;
        feedback.textContent = right
          ? safeSteps.includes(run.index + 1) ? `Верно! ${sumOf(run.index + 1)} теперь несгораемые.` : "Верно!"
          : `Неверно. Правильный ответ: ${question.answer}.`;
      }else{
        feedback.className = "game-feedback";
        feedback.textContent = "";
      }
      paintLadder();
      paintPrize();
    }

    function finish(type){
      const question = current();
      const prizeStep = type === "wrong" ? safePrize(run.index) : type === "quit" ? run.index : run.ids.length;
      run.ended = {type, step:prizeStep, topic:type === "wrong" ? question.topic : ""};
      if(type === "wrong"){
        queueMistake(question);
        store.weak[question.topic] = (store.weak[question.topic] || 0) + 1;
      }
      store.games += 1;
      const amount = prizeStep ? Number(steps[prizeStep - 1].dataset.prize) : 0;
      if(amount > store.best) store.best = amount;
      save();
    }

    function paintOver(){
      const {type, step, topic} = run.ended;
      const headline = type === "win" ? "Миллион!" : type === "quit" ? "Вы забрали деньги." : "Партия окончена.";
      const amount = step ? sumOf(step) : "0 zł";
      const repeat = [];
      if(topic) repeat.push(`<li><b>${topic}</b> - на этом вопросе партия закончилась</li>`);
      for(const hintTopic of [...new Set(run.hintTopics)])
        if(hintTopic !== topic) repeat.push(`<li>${hintTopic} - понадобилась подсказка</li>`);
      const failed = type === "wrong" ? current() : null;
      const drill = failed ? drillHref(failed, upToRoot) : "";
      over.innerHTML = `
        <p class="game-result-label">${headline}</p>
        <p class="game-result">${amount}</p>
        <p class="game-result-score">Верных ответов: ${type === "win" ? run.ids.length : run.index} из ${run.ids.length}</p>
        ${repeat.length ? `<div class="game-repeat"><h4>Стоит повторить</h4><ul>${repeat.join("")}</ul></div>` : ""}
        <div class="game-buttons">
          <button type="button" class="exercise-button" data-game-again>Ещё партия</button>
          ${drill ? `<a class="exercise-link" href="${drill}" data-game-drill>Отработать в тренажёре</a>` : ""}
        </div>`;
      show("over");
      paintLadder();
      prize.textContent = "";
      over.querySelector("[data-game-again]").addEventListener("click", start);
      const drillLink = over.querySelector("[data-game-drill]");
      if(drillLink) drillLink.addEventListener("click", () => applyDrillFilter(failed));
    }

    function paintIntro(){
      show("intro");
      const parts = [];
      if(store.games) parts.push(`Партий сыграно: ${store.games}`);
      if(store.best) parts.push(`лучший результат ${money(store.best)}`);
      const weak = Object.entries(store.weak).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name]) => name);
      if(weak.length) parts.push(`чаще всего подводит: ${weak.join(", ")}`);
      record.textContent = parts.join(" · ");
      record.hidden = !parts.length;
      paintLadder();
      prize.textContent = "";
    }

    function start(){
      const fresh = assemble();
      if(!fresh){
        show("intro");
        record.hidden = false;
        record.textContent = "В банке пока не хватает вопросов на полную партию.";
        return;
      }
      run = fresh;
      save();
      paintRound();
      focusView(round, true);
    }

    function lock(){
      if(run.locked || !run.picked) return;
      run.locked = true;
      const question = current();
      if(run.picked === question.answer){
        save();
        if(run.index + 1 === run.ids.length) finish("win");
      }else{
        finish("wrong");
      }
      paintRound();
      focusView(nextButton);
      if(run.picked === question.answer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
        prize.animate([{transform:"translateY(3px)",opacity:0.5},{transform:"translateY(0)",opacity:1}], {duration:260});
        if(safeSteps.includes(run.index + 1)) feedback.animate([{opacity:0.4},{opacity:1}], {duration:450});
      }
    }

    function showResult(){
      run.ended.ack = true;
      save();
      paintOver();
      focusView(over, true);
    }

    function next(){
      if(run.ended) return showResult();
      run.index += 1;
      run.picked = null;
      run.locked = false;
      run.removed = [];
      run.ruleOpen = false;
      save();
      paintRound();
      focusView(round, true);
    }

    function useHint(kind){
      if(run.locked || run.hints[kind]) return;
      const question = current();
      if(kind === "fifty"){
        const wrong = shuffle(run.order[question.id].filter(option => option !== question.answer));
        run.removed = wrong.slice(0, 2);
        if(run.removed.includes(run.picked)) run.picked = null;
      }
      if(kind === "rule") run.ruleOpen = true;
      if(kind === "swap"){
        const spare = run.reserve[question.tier];
        if(!spare || run.ids.includes(spare)) return;
        run.ids[run.index] = spare;
        run.picked = null;
        run.removed = [];
        run.ruleOpen = false;
      }
      run.hints[kind] = true;
      run.hintTopics.push(question.topic);
      save();
      paintRound();
      if(kind === "swap") focusView(round, true);
      if(kind === "rule"){ ruleLine.tabIndex = -1; focusView(ruleLine); }
    }

    optionBox.addEventListener("click", event => {
      const button = event.target.closest(".game-option");
      if(!button || button.disabled) return;
      run.picked = button.dataset.option;
      save();
      paintOptions();
      lockButton.disabled = false;
    });
    lockButton.addEventListener("click", lock);
    nextButton.addEventListener("click", next);
    quitButton.addEventListener("click", () => { finish("quit"); showResult(); });
  resetButton.addEventListener("click", () => {
    run = null;
    save();
    paintIntro();
    focusView(host.querySelector("[data-game-start]"));
  });
    for(const button of hintButtons)
      button.addEventListener("click", () => useHint(button.dataset.gameHint));

    const typing = node => !!node?.closest?.("input, textarea, select, [contenteditable=''], [contenteditable='true']");
    document.addEventListener("keydown", event => {
      if(!run || round.hidden || event.metaKey || event.ctrlKey || event.altKey) return;
      const active = document.activeElement;
      if(event.repeat || typing(active)) return;
      if(event.key === "Enter" && active?.closest("button, a, summary") && !active.classList.contains("game-option")) return;
      if(active && active !== document.body && !host.contains(active)) return;
      if(event.key === "Enter" && !run.locked && run.picked){ event.preventDefault(); lock(); return; }
      if(event.key === "Enter" && run.locked && !nextButton.hidden){ event.preventDefault(); next(); return; }
      const index = "1234".indexOf(event.key) >= 0
        ? "1234".indexOf(event.key)
        : LETTERS.indexOf(event.key.toUpperCase());
      if(index < 0) return;
      const button = optionBox.querySelectorAll(".game-option")[index];
      if(!button || button.disabled) return;
      event.preventDefault();
      run.picked = button.dataset.option;
      save();
      paintOptions();
      lockButton.disabled = false;
    });

    host.querySelector("[data-game-start]").addEventListener("click", start);
    stage.hidden = false;
    if(run && run.ended) run.ended.ack ? paintOver() : paintRound();
    else if(run) paintRound();
    else paintIntro();
  }

  const gameHost = document.querySelector("[data-game]");
  if(gameHost){
    const script = document.createElement("script");
    script.src = GAME_DATA_SRC;
    script.onload = () => initGame(gameHost);
    script.onerror = () => {};
    document.head.append(script);
  }
})();
