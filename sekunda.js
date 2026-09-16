(() => {
  const DATA_SRC = document.currentScript?.dataset.gameSrc || "sekunda-data.js";
  const STORAGE_KEY = "polski-sekunda-v1";
  const MISSED_LIMIT = 40;
  const MISSED_WINDOW = 20;
  const FLASH_MS = 160;

  function readStore(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; }catch{ return {}; }
  }
  function writeStore(value){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); }catch{}
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
  const fillOf = (item, pick) => item.f ? item.f[pick] : item.o[pick];
  const filled = (item, pick) => Array.isArray(item.p) ? `${item.p[0]}${fillOf(item, pick)}${item.p[1]}`.trim() : item.o[pick];
  const sentence = text => /[.!?]$/.test(text) ? text : `${text}.`;
  const reason = item => item.w.slice(item.w.indexOf(": ") + 2);
  const answerText = item => Array.isArray(item.p) ? filled(item, item.a) : `${item.p} - ${item.o[item.a]}`;

  function initSpeed(host){
    const data = globalThis.SEKUNDA_DATA;
    if(!data) return;
    const upToRoot = DATA_SRC.replace(/sekunda-data\.js.*$/, "");
    const byId = new Map(data.items.map(item => [item.id, item]));
    const startMs = Number(host.dataset.speedStart) * 1000;
    const bonusMs = Number(host.dataset.speedBonus) * 1000;
    const penaltyMs = Number(host.dataset.speedPenalty) * 1000;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = selector => host.querySelector(selector);

    const intro = $("[data-speed-intro]");
    const round = $("[data-speed-round]");
    const over = $("[data-speed-over]");
    const record = $("[data-speed-record]");
    const topicButtons = [...host.querySelectorAll("[data-speed-topics] [data-topic]")];
    const fill = $("[data-speed-fill]");
    const clock = $("[data-speed-clock]");
    const delta = $("[data-speed-delta]");
    const scoreOut = $("[data-speed-score]");
    const streakOut = $("[data-speed-streak]");
    const askLine = $("[data-speed-ask]");
    const topicLine = $("[data-speed-topic]");
    const promptLine = $("[data-speed-prompt]");
    const noteLine = $("[data-speed-note]");
    const optionBox = $("[data-speed-options]");
    const fix = $("[data-speed-fix]");
    const feedback = $("[data-speed-feedback]");
    const why = $("[data-speed-why]");
    const nextButton = $("[data-speed-next]");
    const pauseBox = $("[data-speed-pause]");
    const holdButton = $("[data-speed-hold]");
    const live = $("[data-speed-live]");

    const store = readStore();
    if(!store.best || typeof store.best !== "object") store.best = {};
    if(typeof store.games !== "number") store.games = 0;
    if(!store.weak || typeof store.weak !== "object") store.weak = {};
    store.missed = Array.isArray(store.missed) ? store.missed.filter(id => byId.has(id)) : [];
    let topic = data.topics[store.topic] ? store.topic : "all";

    let run = null;
    let frame = 0;

    function show(which){
      intro.hidden = which !== "intro";
      round.hidden = which !== "round";
      over.hidden = which !== "over";
      host.dataset.view = which;
      host.closest(".game-page").classList.toggle("is-playing", which !== "intro");
    }

    function focusView(node){
      node.focus({preventScroll:true});
      const header = document.querySelector("header");
      const inset = Math.max(0, header?.getBoundingClientRect().height || 0) + 16;
      const box = node.getBoundingClientRect();
      if(box.top < inset || box.bottom > window.innerHeight - 16)
        window.scrollBy({top:box.top - inset, behavior:"instant"});
    }

    function paintTopics(){
      for(const button of topicButtons) button.setAttribute("aria-pressed", String(button.dataset.topic === topic));
      const parts = [];
      const best = store.best[topic];
      if(best) parts.push(`Рекорд в этой теме: ${best}`);
      if(store.games) parts.push(`партий сыграно: ${store.games}`);
      const weak = Object.entries(store.weak).sort((a, b) => b[1] - a[1]).slice(0, 2)
        .map(([key]) => data.topics[key]?.label).filter(Boolean);
      if(weak.length) parts.push(`чаще всего ошибки: ${weak.join(", ").toLowerCase()}`);
      record.textContent = parts.join(" · ");
      record.hidden = !parts.length;
    }

    function buildDeck(){
      const pool = data.items.filter(item => topic === "all" || item.k === topic);
      const missed = new Set(store.missed);
      const early = shuffle(pool.filter(item => missed.has(item.id)));
      const piles = {};
      for(const item of shuffle(pool.filter(item => !missed.has(item.id)))) (piles[item.k] ||= []).push(item);
      const rest = [];
      for(let kinds = Object.keys(piles); kinds.length; kinds = kinds.filter(kind => piles[kind].length)){
        const kind = kinds[Math.floor(Math.random() * kinds.length)];
        rest.push(piles[kind].shift());
      }
      const head = shuffle([...early, ...rest.splice(0, Math.max(0, MISSED_WINDOW - early.length))]);
      return [...head, ...rest].map(item => item.id);
    }

    function paintClock(){
      const left = Math.max(0, run.left);
      clock.textContent = String(Math.ceil(left / 1000));
      fill.style.width = `${(left / startMs) * 100}%`;
      round.classList.toggle("is-low", left <= 10000);
    }

    function paintStats(){
      scoreOut.textContent = String(run.score);
      streakOut.textContent = String(run.streak);
    }

    function flashDelta(text, kind){
      delta.textContent = text;
      delta.className = `speed-delta is-${kind}`;
      if(motion) delta.animate([{opacity:1, transform:"translateY(0)"}, {opacity:0, transform:"translateY(-8px)"}], {duration:700, fill:"forwards"});
    }

    function tick(now){
      if(!run || !run.running) return;
      run.left -= now - run.last;
      run.last = now;
      paintClock();
      if(run.left <= 0) return finish("time");
      frame = requestAnimationFrame(tick);
    }

    function startClock(){
      if(!run || run.running || run.ended) return;
      run.running = true;
      run.last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function stopClock(){
      if(!run || !run.running) return;
      run.left -= performance.now() - run.last;
      run.running = false;
      cancelAnimationFrame(frame);
      paintClock();
    }

    function paintPrompt(item){
      promptLine.innerHTML = Array.isArray(item.p)
        ? `${escapeHTML(item.p[0])}<span class="speed-gap${run.answered && !fillOf(item, item.a).trim() ? " is-filled" : ""}">${run.answered ? escapeHTML(fillOf(item, item.a)) : "_"}</span>${escapeHTML(item.p[1])}`
        : escapeHTML(item.p);
    }

    function paintQuestion(){
      const item = byId.get(run.deck[run.index]);
      const info = data.topics[item.k];
      askLine.textContent = info.ask;
      topicLine.textContent = topic === "all" ? info.label : "";
      paintPrompt(item);
      noteLine.textContent = item.n || "";
      noteLine.hidden = !item.n;
      run.order = info.shuffle ? shuffle(item.o.map((_, index) => index)) : item.o.map((_, index) => index);
      optionBox.innerHTML = run.order.map((pick, position) => `
        <button type="button" class="game-option speed-option" data-pick="${pick}">
          <span class="game-letter">${position + 1}</span><span lang="${info.lang || "pl"}">${escapeHTML(item.o[pick])}</span></button>`).join("");
      optionBox.dataset.count = String(item.o.length);
      fix.hidden = true;
      optionBox.hidden = false;
    }

    function answer(pick){
      if(!run || run.answered || run.paused || run.ended) return;
      const item = byId.get(run.deck[run.index]);
      const right = pick === item.a;
      run.answered = {pick};
      const buttons = [...optionBox.querySelectorAll(".speed-option")];
      const buttonOf = index => buttons.find(button => Number(button.dataset.pick) === index);
      buttons.forEach(button => { button.disabled = true; });
      buttonOf(item.a).classList.add("is-right");
      paintPrompt(item);
      if(right){
        run.score += 1;
        run.streak += 1;
        run.bestStreak = Math.max(run.bestStreak, run.streak);
        const before = run.left;
        run.left = Math.min(startMs, run.left + bonusMs);
        const gained = Math.round((run.left - before) / 1000);
        if(gained > 0) flashDelta(`+${gained}`, "plus");
        store.missed = store.missed.filter(id => id !== item.id);
        paintStats();
        paintClock();
        setTimeout(advance, FLASH_MS);
        return;
      }
      stopClock();
      buttonOf(pick).classList.add("is-wrong");
      run.streak = 0;
      run.left -= penaltyMs;
      run.mistakes.push({id:item.id, pick});
      store.weak[item.k] = (store.weak[item.k] || 0) + 1;
      store.missed = [item.id, ...store.missed.filter(id => id !== item.id)].slice(0, MISSED_LIMIT);
      writeStore(store);
      flashDelta(`−${penaltyMs / 1000}`, "minus");
      paintStats();
      paintClock();
      const url = item.u || data.topics[item.k].url;
      feedback.textContent = `Неверно. Правильно: ${sentence(answerText(item))}`;
      why.innerHTML = `${escapeHTML(item.w)}${url ? ` <a href="${upToRoot}${url.replace(/^\//, "")}">Открыть правило</a>` : ""}`;
      nextButton.textContent = run.left <= 0 ? "Посмотреть итог" : "Дальше";
      fix.hidden = false;
      live.textContent = `${feedback.textContent} Минус ${penaltyMs / 1000} секунд.`;
      nextButton.focus({preventScroll:true});
    }

    function advance(){
      if(!run || run.ended) return;
      if(run.paused){ run.pending = true; return; }
      if(run.left <= 0) return finish("time");
      run.index += 1;
      run.answered = null;
      if(run.index >= run.deck.length) return finish("deck");
      paintQuestion();
      if(!run.running && !run.paused) startClock();
      if(document.activeElement === nextButton || !host.contains(document.activeElement)) round.focus({preventScroll:true});
    }

    function pause(){
      if(!run || run.paused || run.ended) return;
      stopClock();
      run.paused = true;
      pauseBox.hidden = false;
      promptLine.hidden = true;
      noteLine.hidden = true;
      optionBox.hidden = true;
      fix.dataset.wasOpen = String(!fix.hidden);
      fix.hidden = true;
      holdButton.hidden = true;
      $("[data-speed-resume]").focus({preventScroll:true});
    }

    function resume(){
      if(!run || !run.paused) return;
      run.paused = false;
      pauseBox.hidden = true;
      promptLine.hidden = false;
      const item = byId.get(run.deck[run.index]);
      noteLine.hidden = !item.n;
      optionBox.hidden = false;
      holdButton.hidden = false;
      if(run.pending){
        run.pending = false;
        advance();
      }else if(fix.dataset.wasOpen === "true"){
        fix.hidden = false;
        nextButton.focus({preventScroll:true});
      }else{
        startClock();
        round.focus({preventScroll:true});
      }
    }

    function start(){
      run = {
        deck:buildDeck(), index:0, left:startMs, score:0, streak:0, bestStreak:0,
        mistakes:[], answered:null, running:false, paused:false, ended:null
      };
      store.topic = topic;
      writeStore(store);
      show("round");
      pauseBox.hidden = true;
      promptLine.hidden = false;
      holdButton.hidden = false;
      delta.textContent = "";
      live.textContent = "";
      paintStats();
      paintClock();
      paintQuestion();
      focusView(round);
      startClock();
    }

    function finish(reason){
      if(!run || run.ended) return;
      stopClock();
      run.ended = reason;
      store.games += 1;
      const previous = store.best[topic] || 0;
      if(run.score > previous) store.best[topic] = run.score;
      writeStore(store);
      paintOver(previous);
    }

    function paintOver(previous){
      const headline = run.ended === "deck" ? "Колода пройдена!" : run.ended === "stop" ? "Партия закончена." : "Время вышло.";
      const fresh = run.score > previous && run.score > 0;
      const seen = new Set();
      const mistakes = run.mistakes.filter(({id}) => !seen.has(id) && seen.add(id)).map(({id, pick}) => {
        const item = byId.get(id);
        const url = item.u || data.topics[item.k].url;
        return `<li><span lang="pl"><b>${escapeHTML(answerText(item))}</b></span> (не <span lang="${data.topics[item.k].lang || "pl"}">${escapeHTML(filled(item, pick))}</span>): ${escapeHTML(reason(item))}${url ? ` <a href="${upToRoot}${url.replace(/^\//, "")}">Правило</a>` : ""}</li>`;
      });
      over.innerHTML = `
        <p class="game-result-label">${headline}</p>
        <p class="game-result">${run.score}</p>
        <p class="game-result-score">${fresh ? previous ? `Новый рекорд! Прежний: ${previous}` : "Первый результат в этой теме" : previous ? `Рекорд в этой теме: ${previous}` : "Верных ответов пока нет"}${run.bestStreak > 1 ? ` · лучшая серия ${run.bestStreak}` : ""}</p>
        ${mistakes.length ? `<div class="game-repeat"><h4>Ошибки</h4><ul class="speed-mistakes">${mistakes.join("")}</ul></div>` : ""}
        <div class="game-buttons">
          <button type="button" class="exercise-button" data-speed-again>Ещё раз</button>
          <button type="button" class="exercise-link" data-speed-topic-choice>Сменить тему</button>
        </div>`;
      show("over");
      over.querySelector("[data-speed-again]").addEventListener("click", start);
      over.querySelector("[data-speed-topic-choice]").addEventListener("click", () => {
        run = null;
        paintTopics();
        show("intro");
        focusView(intro.querySelector("[data-speed-go]"));
      });
      focusView(over);
    }

    for(const button of topicButtons)
      button.addEventListener("click", () => {
        topic = button.dataset.topic;
        store.topic = topic;
        writeStore(store);
        paintTopics();
      });
    $("[data-speed-go]").addEventListener("click", start);
    optionBox.addEventListener("click", event => {
      const button = event.target.closest("[data-pick]");
      if(button && !button.disabled) answer(Number(button.dataset.pick));
    });
    nextButton.addEventListener("click", advance);
    holdButton.addEventListener("click", pause);
    $("[data-speed-resume]").addEventListener("click", resume);
    $("[data-speed-stop]").addEventListener("click", () => finish("stop"));
    document.addEventListener("visibilitychange", () => { if(document.hidden && run?.running) pause(); });
    window.addEventListener("pagehide", () => { if(run?.running) pause(); });

    const typing = node => !!node?.closest?.("input, textarea, select, [contenteditable=''], [contenteditable='true']");
    document.addEventListener("keydown", event => {
      if(!run || run.ended || round.hidden || event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      const active = document.activeElement;
      if(typing(active)) return;
      if(active && active !== document.body && !host.contains(active)) return;
      if(event.key === "Enter" && run.paused){ event.preventDefault(); resume(); return; }
      if(event.key === "Enter" && !fix.hidden){ event.preventDefault(); advance(); return; }
      const index = "123".indexOf(event.key);
      if(index < 0 || run.paused || run.answered) return;
      const item = byId.get(run.deck[run.index]);
      if(index >= item.o.length) return;
      event.preventDefault();
      answer(run.order[index]);
    });

    host.querySelector("[data-speed-stage]").hidden = false;
    paintTopics();
    show("intro");
  }

  const speedHost = document.querySelector("[data-game='sekunda']");
  if(speedHost){
    const script = document.createElement("script");
    script.src = DATA_SRC;
    script.onload = () => initSpeed(speedHost);
    script.onerror = () => {};
    document.head.append(script);
  }
})();
