(() => {
  const DATA_SRC = document.currentScript?.dataset.gameSrc || "game-data.js";
  const STORAGE_KEY = "polski-zdanie-v1";
  const TRAINER_STORAGE_KEY = "polski-trainer-v2";
  const TRAINER_MISSED_LIMIT = 60;
  const PHRASES = 10;
  const TIER_PLAN = [[1, 4], [2, 3], [3, 3]];
  const TOPIC_LIMIT = 2;
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

  const words = text => text.split(/\s+/).map(word => word.replace(/^[.,?!;:«»"]+|[.,?!;:«»"]+$/g, "")).filter(Boolean);
  const fold = word => word.toLocaleLowerCase("pl");
  const line = list => list.map(fold).join(" ");
  const bag = list => list.map(fold).sort().join(" ");

  function phraseTiles(item){
    const names = new Set(item.names || []);
    return words(item.answers[0]).map((word, index) =>
      index === 0 && !names.has(word) ? word.charAt(0).toLocaleLowerCase("pl") + word.slice(1) : word);
  }

  function initBuilder(host){
    const data = globalThis.GAME_DATA;
    if(!data?.zdanie?.length) return;
    const bank = data.zdanie;
    const rules = data.rules || {};
    const byId = new Map(bank.map(item => [item.id, item]));
    const upToRoot = DATA_SRC.replace(/game-data\.js.*$/, "");
    const $ = selector => host.querySelector(selector);

    const intro = $("[data-zd-intro]");
    const round = $("[data-zd-round]");
    const over = $("[data-zd-over]");
    const record = $("[data-zd-record]");
    const stepOut = $("[data-zd-step]");
    const scoreOut = $("[data-zd-score]");
    const topicOut = $("[data-zd-topic]");
    const promptLine = $("[data-zd-prompt]");
    const contextLine = $("[data-zd-context]");
    const row = $("[data-zd-row]");
    const pool = $("[data-zd-pool]");
    const live = $("[data-zd-live]");
    const note = $("[data-zd-note]");
    const controls = $("[data-zd-controls]");
    const checkButton = $("[data-zd-check]");
    const hintButton = $("[data-zd-hint]");
    const clearButton = $("[data-zd-clear]");
    const reveal = $("[data-zd-reveal]");
    const feedback = $("[data-zd-feedback]");
    const versions = $("[data-zd-versions]");
    const why = $("[data-zd-why]");
    const nextButton = $("[data-zd-next]");

    const store = readStore(STORAGE_KEY);
    if(typeof store.best !== "number") store.best = 0;
    if(typeof store.games !== "number") store.games = 0;
    if(!Array.isArray(store.seen)) store.seen = [];
    if(!store.weak || typeof store.weak !== "object") store.weak = {};
    let run = store.run && typeof store.run === "object" ? store.run : null;
    const validRun = candidate => Array.isArray(candidate.ids) && candidate.ids.every(id => byId.has(id))
      && Array.isArray(candidate.orders) && candidate.orders.length === candidate.ids.length
      && candidate.ids.every((id, index) => bag(candidate.orders[index]) === bag([...phraseTiles(byId.get(id)), ...byId.get(id).extra]));
    if(run && !validRun(run)) run = null;
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

    function deal(item){
      const tiles = [...phraseTiles(item), ...item.extra];
      const answers = new Set(item.answers.map(answer => line(words(answer))));
      let order = shuffle(tiles);
      for(let tries = 0; tries < 20 && answers.has(line(order.slice(0, phraseTiles(item).length))); tries++) order = shuffle(tiles);
      return order;
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
          if(taken.length >= PHRASES) break;
          if(fits(item, taken, relaxed)) taken.push(item);
        }
      if(taken.length < PHRASES) return null;
      taken.sort((first, second) => first.tier - second.tier);
      return {
        ids:taken.map(item => item.id), orders:taken.map(deal), index:0,
        placed:[], locked:0, attempt:0, hint:false, note:"", stage:"build", results:[]
      };
    }

    const current = () => byId.get(run.ids[run.index]);
    const order = () => run.orders[run.index];
    const cells = () => phraseTiles(current()).length;
    const slotsOf = () => Array.from({length:cells()}, (_, i) => run.placed[i] ?? null);
    const isFull = () => slotsOf().every(index => index !== null);
    const built = () => slotsOf().filter(index => index !== null).map(index => order()[index]);
    const scoreOf = () => run.results.reduce((sum, result) => sum + result.points, 0);
    const ruleLink = item => {
      const rule = rules[item.ruleId];
      return rule ? ` <a href="${upToRoot}${rule.url.replace(/^\//, "")}">Открыть правило</a>` : "";
    };
    const phraseText = list => {
      const text = list.join(" ");
      return text.charAt(0).toLocaleUpperCase("pl") + text.slice(1);
    };

    function paintTiles(){
      const done = run.stage === "done";
      const result = run.results[run.index];
      const size = cells();
      const slots = [];
      for(let i = 0; i < size; i++){
        const index = slotsOf()[i];
        if(index === null){
          slots.push(`<span class="zd-cell" aria-hidden="true"></span>`);
          continue;
        }
        const word = escapeHTML(order()[index]);
        if(done){
          slots.push(`<span class="zd-tile ${result.solved ? "is-right" : "is-wrong"}">${word}</span>`);
          continue;
        }
        const locked = i < run.locked;
        slots.push(`<button type="button" class="zd-tile${locked ? " is-locked" : ""}" data-row="${i}"${locked ? ` aria-disabled="true" title="Подсказка: первое слово закреплено"` : ""}>${word}</button>`);
      }
      row.innerHTML = slots.join("");
      row.classList.toggle("is-full", isFull());
      pool.hidden = done;
      if(!done)
        pool.innerHTML = order().map((word, index) => slotsOf().includes(index)
          ? `<span class="zd-tile is-used" aria-hidden="true">${escapeHTML(word)}</span>`
          : `<button type="button" class="zd-tile" data-pool="${index}">${escapeHTML(word)}</button>`).join("");
      checkButton.disabled = !isFull();
      hintButton.disabled = run.hint;
      hintButton.setAttribute("aria-pressed", String(run.hint));
      clearButton.disabled = slotsOf().slice(run.locked).every(index => index === null);
    }

    function answersHTML(item, matched){
      const main = matched || item.answers[0];
      const rest = item.answers.filter(answer => answer !== main);
      return `<p lang="pl"><span class="zd-label">Верно:</span> <b class="zd-right">${escapeHTML(main)}</b></p>`
        + (rest.length ? `<p class="zd-also"><span class="zd-label">Так тоже верно:</span> <span lang="pl">${rest.map(escapeHTML).join(" · ")}</span></p>` : "");
    }

    function paintRound(){
      const item = current();
      const result = run.results[run.index];
      const done = run.stage === "done";
      show("round");
      if(!store.seen.includes(item.id)){
        store.seen.push(item.id);
        save();
      }
      stepOut.textContent = `${run.index + 1} из ${run.ids.length}`;
      scoreOut.textContent = String(scoreOf());
      topicOut.textContent = done ? item.topic : "?";
      promptLine.textContent = item.prompt;
      contextLine.textContent = item.context ? `Условие: ${item.context}.` : "";
      contextLine.hidden = !item.context;
      paintTiles();
      live.textContent = built().length ? `Собрано: ${built().join(" ")}` : "";
      note.textContent = run.note;
      note.hidden = done || !run.note;
      controls.hidden = done;
      reveal.hidden = !done;
      if(done){
        feedback.className = `game-feedback ${result.solved ? "is-correct" : "is-wrong"}`;
        feedback.textContent = result.message;
        versions.innerHTML = (result.solved ? "" : `<p lang="pl"><span class="zd-label">Ваша фраза:</span> <span class="zd-wrong">${escapeHTML(phraseText(result.built))}</span></p>`)
          + answersHTML(item, result.matched);
        why.innerHTML = `${escapeHTML(item.explanation)}${ruleLink(item)}`;
        nextButton.textContent = run.index + 1 === run.ids.length ? "Итоги партии" : "Следующая фраза";
      }
    }

    function settle(solved, matched){
      const item = current();
      const base = solved ? (run.attempt === 0 ? 2 : 1) : 0;
      const points = Math.max(0, base - (run.hint ? 1 : 0));
      const message = !solved ? "Фраза не собрана."
        : `${run.attempt === 0 ? "Верно с первой попытки" : "Верно со второй попытки"}${run.hint ? ", подсказка стоила очко" : ""}.`;
      run.results[run.index] = {id:item.id, solved, points, attempts:run.attempt + 1, hint:run.hint, built:built(), matched:matched || null, message};
      if(!solved){
        queueMistake(item);
        store.weak[item.topic] = (store.weak[item.topic] || 0) + 1;
      }
      run.stage = "done";
      run.note = "";
      save();
      paintRound();
      focusView(feedback);
    }

    function check(){
      if(!run || run.stage !== "build" || !isFull()) return;
      const item = current();
      const assembled = built();
      const matched = item.answers.find(answer => line(words(answer)) === line(assembled));
      if(matched) return settle(true, matched);
      if(run.attempt > 0) return settle(false);
      run.attempt = 1;
      run.note = bag(assembled) === bag(phraseTiles(item))
        ? "Слова верные, порядок нет. Переставьте их и проверьте ещё раз."
        : "В строке есть неверная форма. Замените её словом из оставшихся и проверьте ещё раз.";
      save();
      paintRound();
      focusView(note);
    }

    function place(index){
      if(!run || run.stage !== "build") return;
      const slots = slotsOf();
      const free = slots.indexOf(null);
      if(free < 0 || slots.includes(index)) return;
      slots[free] = index;
      run.placed = slots;
      save();
      paintRound();
      const rest = [...pool.querySelectorAll("[data-pool]")];
      const target = rest.find(button => Number(button.dataset.pool) > index) || rest.at(-1);
      (target || checkButton).focus({preventScroll:true});
    }

    function unplace(slot){
      const slots = run ? slotsOf() : [];
      if(!run || run.stage !== "build" || slot < run.locked || slots[slot] == null) return;
      slots[slot] = null;
      run.placed = slots;
      save();
      paintRound();
      const buttons = [...row.querySelectorAll("[data-row]:not([aria-disabled])")];
      const target = buttons.find(button => Number(button.dataset.row) > slot) || buttons.at(-1)
        || pool.querySelector("[data-pool]");
      target?.focus({preventScroll:true});
    }

    function hint(){
      if(!run || run.stage !== "build" || run.hint) return;
      const first = phraseTiles(current())[0];
      const tiles = order();
      const slots = slotsOf();
      const loose = tiles.findIndex((word, spot) => word === first && !slots.includes(spot));
      const index = tiles[slots[0]] === first ? slots[0] : loose >= 0 ? loose : tiles.indexOf(first);
      run.placed = slots.map(spot => spot === index ? null : spot);
      run.placed[0] = index;
      run.locked = 1;
      run.hint = true;
      save();
      paintRound();
      (pool.querySelector("[data-pool]") || checkButton).focus({preventScroll:true});
    }

    function clear(){
      if(!run || run.stage !== "build" || slotsOf().slice(run.locked).every(index => index === null)) return;
      run.placed = slotsOf().map((index, slot) => slot < run.locked ? index : null);
      save();
      paintRound();
      pool.querySelector("[data-pool]")?.focus({preventScroll:true});
    }

    function next(){
      if(!run || run.stage !== "done") return;
      if(run.index + 1 >= run.ids.length) return finish();
      run.index += 1;
      run.placed = [];
      run.locked = 0;
      run.attempt = 0;
      run.hint = false;
      run.note = "";
      run.stage = "build";
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
      const first = results.filter(result => result.solved && result.attempts === 1).length;
      const second = results.filter(result => result.solved && result.attempts === 2).length;
      const failed = results.filter(result => !result.solved).length;
      const repeat = [...new Set(results.filter(result => !result.solved || result.attempts > 1).map(result => byId.get(result.id).topic))];
      const firstMissed = results.map(result => !result.solved ? byId.get(result.id) : null).find(item => item?.drill);
      const drillHref = firstMissed && DECK_PAGES[firstMissed.drill.deck] ? `${upToRoot}${DECK_PAGES[firstMissed.drill.deck]}/#trainer` : "";
      const previous = run.previousBest || 0;
      const review = results.map((result, index) => {
        const item = byId.get(result.id);
        const right = result.matched || item.answers[0];
        return `<li><p class="zd-review-head"><b>${index + 1}.</b> ${escapeHTML(item.prompt)} · ${escapeHTML(item.topic)} · ${result.points} из 2</p>
          <p lang="pl">${result.solved ? `<span class="zd-right">${escapeHTML(right)}</span>` : `<span class="zd-wrong">${escapeHTML(phraseText(result.built))}</span> → <span class="zd-right">${escapeHTML(right)}</span>`}</p>
          <p class="note">${escapeHTML(result.message)} ${escapeHTML(item.explanation)}${ruleLink(item)}</p></li>`;
      }).join("");
      over.innerHTML = `
        <p class="game-result-label">Партия окончена</p>
        <p class="game-result">${score} <span class="zd-max">из ${max}</span></p>
        <p class="game-result-score">С первой попытки: ${first} · со второй: ${second} · не собрано: ${failed}${score > previous ? previous ? ` · новый рекорд, прежний ${previous}` : "" : ` · рекорд ${store.best}`}</p>
        ${repeat.length ? `<div class="game-repeat"><h4>Стоит повторить</h4><ul>${repeat.map(topic => `<li>${escapeHTML(topic)}</li>`).join("")}</ul></div>` : ""}
        <details class="zd-review"><summary>Разбор партии</summary><ol>${review}</ol></details>
        <div class="game-buttons">
          <button type="button" class="exercise-button" data-zd-again>Ещё партия</button>
          ${drillHref ? `<a class="exercise-link" href="${drillHref}" data-zd-drill>Отработать в тренажёре</a>` : ""}
        </div>`;
      show("over");
      over.querySelector("[data-zd-again]").addEventListener("click", start);
      over.querySelector("[data-zd-drill]")?.addEventListener("click", () => applyDrillFilter(firstMissed));
    }

    function paintIntro(){
      show("intro");
      const parts = [];
      if(store.games) parts.push(`Партий сыграно: ${store.games}`);
      if(store.best) parts.push(`рекорд ${store.best} из ${PHRASES * 2}`);
      const weak = Object.entries(store.weak).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([topic]) => topic.toLowerCase());
      if(weak.length) parts.push(`труднее всего: ${weak.join(", ")}`);
      record.textContent = parts.join(" · ");
      record.hidden = !parts.length;
    }

    function start(){
      const fresh = assemble();
      if(!fresh){
        show("intro");
        record.hidden = false;
        record.textContent = "В банке пока не хватает фраз на полную партию.";
        return;
      }
      run = fresh;
      save();
      paintRound();
      focusView(round);
    }

    pool.addEventListener("click", event => {
      const button = event.target.closest("[data-pool]");
      if(button) place(Number(button.dataset.pool));
    });
    row.addEventListener("click", event => {
      const button = event.target.closest("[data-row]");
      if(button) unplace(Number(button.dataset.row));
    });
    checkButton.addEventListener("click", check);
    hintButton.addEventListener("click", hint);
    clearButton.addEventListener("click", clear);
    nextButton.addEventListener("click", next);
    $("[data-zd-start]").addEventListener("click", start);
    $("[data-zd-reset]").addEventListener("click", () => {
      run = null;
      save();
      paintIntro();
      focusView($("[data-zd-start]"));
    });

    const typing = node => !!node?.closest?.("input, textarea, select, [contenteditable=''], [contenteditable='true']");
    document.addEventListener("keydown", event => {
      if(!run || run.ended || round.hidden || event.metaKey || event.ctrlKey || event.altKey) return;
      const active = document.activeElement;
      if(typing(active)) return;
      if(active && active !== document.body && !host.contains(active)) return;
      const group = active?.matches?.("[data-pool]") ? pool : active?.matches?.("[data-row]") ? row : null;
      if(run.stage === "build" && group && (event.key === "ArrowRight" || event.key === "ArrowLeft")){
        const buttons = [...group.querySelectorAll("button")];
        const target = buttons[buttons.indexOf(active) + (event.key === "ArrowRight" ? 1 : -1)];
        if(target){ event.preventDefault(); target.focus(); }
        return;
      }
      if(event.repeat) return;
      if(run.stage === "build" && event.key === "Backspace"){
        event.preventDefault();
        const slots = slotsOf();
        let last = slots.length - 1;
        while(last >= run.locked && slots[last] === null) last--;
        unplace(last);
        return;
      }
      if(run.stage === "build" && event.key === "Enter" && !active?.closest?.("button, a, summary")){
        event.preventDefault();
        check();
        return;
      }
      if(run.stage === "done" && event.key === "Enter" && !active?.closest?.("a, summary")){
        event.preventDefault();
        next();
      }
    });

    $("[data-zd-stage]").hidden = false;
    if(run?.ended) paintOver();
    else if(run) paintRound();
    else paintIntro();
  }

  const builderHost = document.querySelector("[data-game='zdanie']");
  if(builderHost){
    const script = document.createElement("script");
    script.src = DATA_SRC;
    script.onload = () => initBuilder(builderHost);
    script.onerror = () => {};
    document.head.append(script);
  }
})();
