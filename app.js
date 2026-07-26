/* Логика: рендер разделов, навигация, адрес страницы, поиск.
   Требует уже загруженный data.js. */
function renderConj(){
  $("#s-conj").innerHTML = `<div class="panel">
    <h2>Союзы</h2>
    <p class="lead">Не склоняются, но от них зависит запятая - а это единственное место в польской пунктуации, которое действительно отличается от русского на практике.</p>
    <div class="tip"><b>Главное правило запятой.</b> Перед <span class="pl">że, żeby, ponieważ, bo, jeśli, gdy, chociaż</span> и другими подчинительными союзами запятая ставится <b>всегда</b>. Перед простым соединительным <span class="pl">i</span> - обычно нет: <span class="pl">Poszedłem do sklepu i kupiłem chleb.</span></div>

    <h3>Сочинительные - соединяют равноправное</h3>
    <div class="scroll"><table class="vt">
      <tr><th>союз</th><th>значение</th><th>пример</th><th></th></tr>
      ${CONJ_COORD.map(c => `<tr><td class="w">${c[0]}</td><td style="color:var(--muted)">${c[1]}</td><td class="g">${c[2]}</td><td class="note">${c[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Подчинительные - вводят придаточное</h3>
    <div class="scroll"><table class="vt">
      <tr><th>союз</th><th>значение</th><th>пример</th><th></th></tr>
      ${CONJ_SUB.map(c => `<tr><td class="w">${c[0]}</td><td style="color:var(--muted)">${c[1]}</td><td class="g">${c[2]}</td><td class="note">${c[3]}</td></tr>`).join("")}
    </table></div>

    <h3>że или żeby</h3>
    <table>
      <tr><td style="width:46%" class="w">Wiem, że on przyjdzie.</td><td>факт: «знаю, что придёт» - просто изъяснение</td></tr>
      <tr><td class="w">Chcę, żeby on przyszedł.</td><td>желание/цель, субъект другой - обязательно żeby</td></tr>
      <tr><td class="w">Chcę przyjść.</td><td>субъект тот же - просто инфинитив, без że/żeby</td></tr>
    </table>
    <div class="tip"><b>bo vs ponieważ vs dlatego że.</b> Значение одинаковое, разница в регистре: <span class="pl">bo</span> - разговорное и самое частое, <span class="pl">ponieważ</span> - нейтральное и письменное, <span class="pl">dlatego że</span> - подчёркивает причину сильнее обоих.</div>
  </div>`;
}

function renderDim(){
  $("#s-dim").innerHTML = `<div class="panel">
    <h2>Уменьшительные формы</h2>
    <p class="lead">В польском их используют гораздо шире, чем в русском - не только для «маленького», но и как знак вежливости и тепла в обычном разговоре.</p>
    <div class="tip"><b>Это не про размер.</b> <span class="pl">Poproszę kawusię</span> в кафе не значит «маленькую чашечку» - это просто дружелюбный, смягчённый тон. Продавщица может предложить <span class="pl">bułeczkę</span> взрослому покупателю, а не ребёнку.</div>

    <h3>Существительные: мужской род</h3>
    <div class="scroll"><table class="vt">
      <tr><th>слово</th><th>уменьшительное</th><th>ещё уменьшительнее</th><th>перевод</th></tr>
      ${DIM_M.map(d => `<tr><td class="w">${d[0]}</td><td class="g">${d[1]}</td><td class="g">${d[2]}</td><td style="color:var(--muted)">${d[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Существительные: женский род</h3>
    <div class="scroll"><table class="vt">
      <tr><th>слово</th><th>уменьшительное</th><th></th><th>перевод</th></tr>
      ${DIM_F.map(d => `<tr><td class="w">${d[0]}</td><td class="g">${d[1]}</td><td class="note">${d[2]}</td><td style="color:var(--muted)">${d[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Существительные: средний род</h3>
    <div class="scroll"><table class="vt">
      <tr><th>слово</th><th>уменьшительное</th><th></th><th>перевод</th></tr>
      ${DIM_N.map(d => `<tr><td class="w">${d[0]}</td><td class="g">${d[1]}</td><td class="note">${d[2]}</td><td style="color:var(--muted)">${d[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Двойное уменьшительное усиливает нежность.</b> <span class="pl">kot → kotek → koteczek</span> - «кот → котик → котеночек». Дальше по цепочке обычно не ходят.</div>

    <h3>Прилагательные</h3>
    <div class="scroll"><table class="vt">
      <tr><th>слово</th><th>уменьшительное</th><th>совсем ласково</th><th>перевод</th></tr>
      ${DIM_ADJ.map(d => `<tr><td class="w">${d[0]}</td><td class="g">${d[1]}</td><td class="g">${d[2]}</td><td style="color:var(--muted)">${d[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Имена и обращения</h3>
    <div class="scroll"><table class="vt">
      <tr><th>полное имя</th><th>обычное уменьшительное</th><th>ласковое</th><th>по-русски похоже на</th></tr>
      ${DIM_NAME.map(d => `<tr><td class="w">${d[0]}</td><td class="g">${d[1]}</td><td class="g">${d[2]}</td><td style="color:var(--muted)">${d[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Практический совет.</b> Услышал незнакомое ласковое слово от продавца, официанта или коллеги - это не панибратство, а норма вежливого общения. В официальных документах и с незнакомыми по имени-фамилии уменьшительные, разумеется, не используют.</div>
  </div>`;
}

/* ============ РЕНДЕР ============ */
const $ = s => document.querySelector(s);

function form(str){
  const p = str.split("|");
  if(p.length === 2) return `<span class="stem">${p[0]}</span><span class="fin">${p[1]}</span>`;
  return `<span class="stem">${p[0]}</span><span class="swap">${p[1]}</span><span class="fin">${p[2]}</span>`;
}
function board(rows){
  return `<div class="board">` + rows.map(r =>
    `<div class="brow"><div class="blabel">${r.l}</div><div>
      <div class="forms">${r.f.map(x =>
        `<div class="form"><span class="from">${x.a||""}</span><span class="arr">${x.a?"→":""}</span><span class="to">${form(x.b)}</span></div>`
      ).join("")}</div>
      ${r.n?`<div class="bnote">${r.n}</div>`:""}
    </div></div>`).join("") + `</div>
    <div class="legend"><span><i class="l1">окончание</i></span><span><i class="l2">чередование в основе</i></span><span>основа - чёрным</span></div>`;
}

/* --- алфавит и произношение --- */
function renderAlpha(){
  $("#s-alpha").innerHTML = `<div class="panel">
    <h2>Алфавит и произношение</h2>
    <p class="lead">32 буквы, читаются почти всегда так, как пишутся. Сложность не в буквах, а в девяти особых и десятке диграфов.</p>
    <div class="tip"><b>Нет букв Q, V, X.</b> В освоенных заимствованиях их заменяют <span class="pl">kw, w, ks</span>: <span class="pl">quiz → kwiz · video → wideo · taxi → taksówka</span> - но иностранные имена и бренды сохраняют оригинал: <span class="pl">weekend, Volvo</span>.</div>

    <h3>Обычные буквы - на что обратить внимание</h3>
    ${ngrid(ABASE.map(a => [a[0], a[1]]))}

    <h3>Девять особых букв</h3>
    <div class="scroll"><table class="vt">
      <tr><th>буква</th><th>звук</th><th>как произносится</th><th>примеры</th></tr>
      ${ADIAC.map(a => `<tr><td class="g" style="font-size:18px">${a[0]}</td><td style="color:var(--muted)">${a[1]}</td><td>${a[2]}</td><td class="w">${a[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Диграфы: два знака - один звук</h3>
    <div class="scroll"><table class="vt">
      <tr><th>диграф</th><th>звук</th><th>примеры</th></tr>
      ${DIGR.map(d => `<tr><td class="g" style="font-size:16px">${d[0]}</td><td style="color:var(--muted)">${d[1]}</td><td class="w">${d[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>ż и rz - один и тот же звук.</b> На слух не различить, только по написанию слова. Какую букву когда писать - см. таблицу орфографии ниже.</div>
    <div class="tip"><b>szcz - это не «щ».</b> Русское «щ» - один долгий мягкий звук, а <span class="pl">szcz</span> - два раздельных твёрдых: ш + ч. Ближе всего к русскому «щ» польское <span class="pl">ść</span>. Оба звука есть в одном слове: <span class="pl">szczęście</span> - начинается на «шч», заканчивается на мягкое «щче». Подставишь «щ» в начало - получится не то слово.</div>

    <h3>Твёрдая / мягкая пара</h3>
    <p class="lead">Одна и та же мягкая согласная пишется по-разному: перед согласной или на конце слова - значком (<span class="pl">ś, ć, ź, ń, dź</span>), перед гласной - через <span class="pl">i</span>.</p>
    <div class="scroll"><table class="vt">
      <tr><th>пара</th><th>перед согласной / в конце</th><th>перед гласной</th></tr>
      ${PALAT.map(p => `<tr><td class="c">${p[0]}</td><td class="w">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>

    <h3>Носовые ą / ę: как реально звучат</h3>
    <p class="lead">Это не «он/эн», а именно носовой звук - но в разных позициях он меняется почти до неузнаваемости.</p>
    <div class="scroll"><table class="vt">
      <tr><th>позиция</th><th>звучит как</th><th>примеры</th></tr>
      ${NASAL.map(n => `<tr><td>${n[0]}</td><td class="c">${n[1]}</td><td class="w">${n[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Мост для русскоязычных.</b> Там, где в польском ą/ę, в русском часто «у» или «я»: после твёрдой согласной - «у» (<span class="pl">ręka</span> - рука, <span class="pl">mąka</span> - мука, <span class="pl">ząb</span> - зуб), после мягкой - «я» (<span class="pl">pięć</span> - пять, <span class="pl">mięso</span> - мясо).</div>

    <h3>Ударение</h3>
    <p><b>Основное правило.</b> Всегда предпоследний слог: <span class="pl">Pol-SKA, War-SZA-wa, ko-BIE-ta, do-BRZE</span>. Практически без исключений в базовых словах.</p>
    <div class="scroll"><table class="vt">
      <tr><th>случай</th><th>ударение</th><th>примеры</th></tr>
      ${STRESS_EXC.map(s => `<tr><td>${s[0]}</td><td class="c">${s[1]}</td><td class="w">${s[2]}</td></tr>`).join("")}
    </table></div>

    <h3>Правописание: ch или h</h3>
    <div class="scroll"><table class="vt">
      <tr><th>буква</th><th>когда</th><th>примеры</th></tr>
      ${ORTHO_CH.map(o => `<tr><td class="c">${o[0]}</td><td>${o[1]}</td><td class="w">${o[2]}</td></tr>`).join("")}
    </table></div>

    <h3>Правописание: rz или ż</h3>
    <div class="scroll"><table class="vt">
      <tr><th>буква</th><th>когда</th><th>примеры</th></tr>
      ${ORTHO_RZ.map(o => `<tr><td class="c">${o[0]}</td><td>${o[1]}</td><td class="w">${o[2]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Подсказка от русского: <span class="pl">ż</span> обычно совпадает с русским «ж» (<span class="pl">róża</span> - роза), <span class="pl">rz</span> - там, где в русском мягкое «рь» (<span class="pl">rzeka</span> - река).</p>

    <h3>Правописание: u или ó</h3>
    <div class="scroll"><table class="vt">
      <tr><th>буква</th><th>когда</th><th>примеры</th></tr>
      ${ORTHO_U.map(o => `<tr><td class="c">${o[0]}</td><td>${o[1]}</td><td class="w">${o[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Проверка родственным словом.</b> Как с русским «о/ё»: если в однокоренном слове на этом месте появляется o, e или a - пиши <span class="pl">ó</span>: <span class="pl">mróz</span> (мороз) → <span class="pl">mrozu</span>. Не находишь чередования - скорее всего <span class="pl">u</span>.</div>
  </div>`;
}

let curCase = "mian", curNum = "sg";
function renderChips(){
  $("#chips").innerHTML = CASES.map(c =>
    `<button class="chip" data-c="${c.id}" aria-pressed="${c.id===curCase}">
      <span class="cp">${c.name}</span><span class="cr">${c.ru}</span></button>`).join("");
  $("#chips").querySelectorAll(".chip").forEach(b =>
    b.onclick = () => { curCase = b.dataset.c; renderChips(); renderCase(); writeHash(); });
}
function casePanelHTML(c, num){
  const rows = num === "sg" ? c.sg : c.pl;
  const curNum = num;
  return `
    <h2 class="pl">${c.name}</h2>
    <p class="lead">${c.ru} · вопросы: <span class="pl">${c.q}</span></p>
    <h3>Когда нужен</h3><ul>${c.use.map(u => `<li>${u}</li>`).join("")}</ul>
    <h3>Предлоги</h3><p class="pl">${c.preps}</p>
    <h3>Окончания существительных</h3>
    <div class="tog" role="group">
      <button data-n="sg" aria-pressed="${curNum==="sg"}">единственное</button>
      <button data-n="pl" aria-pressed="${curNum==="pl"}">множественное</button>
    </div>
    ${board(rows)}
    ${curNum === "pl" && PLX[c.id] ? PLX[c.id] : ""}
    ${c.agree?`<h3>Вся группа целиком</h3>
      <p class="lead">Прилагательное и указательное меняются вместе с существительным.</p>
      <table><tr><th>именительный</th><th>${c.ru.toLowerCase()}</th></tr>
      ${c.agree.map(a => `<tr><td class="w">${a[0]}</td><td class="g">${a[1]}</td></tr>`).join("")}</table>`:""}
    ${c.alt?`<h3>Чередования перед -e</h3><div class="scroll"><table><tr><th>было</th><th>стало</th><th>пример</th></tr>
      ${c.alt.map(a => `<tr><td class="c">${a[0]}</td><td class="c">${a[1]}</td><td class="w">${a[2]}</td></tr>`).join("")}</table></div>`:""}
    ${c.exc?`<h3>Исключения и особые формы</h3><table>
      ${c.exc.map(e => `<tr><td class="w" style="width:34%">${e[0]}</td><td class="g" style="width:33%">${e[1]}</td><td style="color:var(--muted);font-size:13px">${e[2]||""}</td></tr>`).join("")}</table>`:""}
    ${c.pit?`<h3>Подводные камни</h3><ol class="pit">${c.pit.map(x => `<li>${x}</li>`).join("")}</ol>`:""}
    ${c.sent?`<h3>Примеры в предложениях</h3><ul class="sent">${c.sent.map(x => `<li><span class="p">${x[0]}</span><span class="r">${x[1]}</span></li>`).join("")}</ul>`:""}
    <h3>Итог по падежу</h3>
    <div class="tip">${c.trap}</div>`;
}
function renderCase(){
  $("#casePanel").innerHTML = casePanelHTML(CASES.find(x => x.id === curCase), curNum);
  $("#casePanel").querySelectorAll(".tog button").forEach(b =>
    b.onclick = () => { curNum = b.dataset.n; renderCase(); writeHash(); });
}

/* --- глаголы --- */
/* подсвечивает личное окончание: split("uczę się", "II", 0) → uczę + się */
function vform(f, kon, i){
  const refl = / się$/.test(f);
  const w = refl ? f.slice(0, -4) : f;
  const list = (KEND[kon] || [])[i] || [];
  const end = list.find(e => w.length > e.length && w.endsWith(e));
  const body = end
    ? `<span class="stem">${w.slice(0, w.length - end.length)}</span><span class="fin">${end}</span>`
    : `<span class="stem">${w}</span>`;
  return body + (refl ? `<span class="from"> się</span>` : "");
}
function konTable(c){
  return `<div class="scroll"><table class="vt">
    <tr><th>глагол</th>${PERS.map(p => `<th>${p}</th>`).join("")}<th>основа</th></tr>
    ${c.verbs.map(v => `<tr>
      <td class="w">${v[0]}<span class="tr">${v[1]}</span></td>
      ${v[2].map((f,i) => `<td class="f">${vform(f, c.n, i)}</td>`).join("")}
      <td class="note">${v[3] || ""}</td>
    </tr>`).join("")}
  </table></div>`;
}
let curV = "conj";

function vConj(){
  return `<div class="panel">
    <h2>Четыре спряжения</h2>
    <p class="lead">Тип определяется формой «ты». Услышал -esz / -isz / -asz / -em - знаешь всю парадигму.</p>
    <div class="tip"><b>Ключ.</b> «Я» почти всегда <span class="pl">-ę</span>. Исключения на <span class="pl">-m</span> - закрытый список: <span class="pl">mam · dam · wiem · jem · rozumiem · umiem · śmiem</span>.</div>

    <h3>Сводка окончаний</h3>
    <div class="scroll"><table>
      <tr><th></th><th>I<span class="tr">-ę / -esz</span></th><th>II<span class="tr">-ę / -isz</span></th><th>III<span class="tr">-am / -asz</span></th><th>IV<span class="tr">-em / -esz</span></th></tr>
      ${PERS.map((p,i) => `<tr><td style="width:96px;color:var(--muted)">${p}</td>${
        ["I","II","III","IV"].map(k => `<td class="c">-${KEND[k][i].join(" / -")}</td>`).join("")}</tr>`).join("")}
    </table></div>

    <h3>Как определить спряжение по инфинитиву</h3>
    ${KON.map(c => `<p><span class="kbadge">${c.n}</span> ${c.find}</p>`).join("")}
    <div class="tip"><b>Приём для -ać и -eć.</b> Переведи глагол на русский и поставь в форму «ты». Слышишь <b>-ае-</b> (чит<b>ае</b>шь) → III: <span class="pl">czytasz</span>. Слышишь <b>-и-</b> (сто<b>и</b>шь) → II: <span class="pl">stoisz</span>. Слышишь <b>-е-</b> (п<b>и</b>ш<b>е</b>шь) → I: <span class="pl">piszesz</span>. Работает только на похожих словах.</div>

    <h3>Правило бабочки</h3>
    <p class="lead">У глагола максимум две основы. Маленькое крыло - <b>ja</b> и <b>oni</b>, большое - <b>ty, on, my, wy</b>. Знаешь по одному слову из каждого крыла - достроишь всю таблицу.</p>
    <div class="scroll"><table>
      <tr><th>глагол</th><th>малое крыло · ja, oni</th><th>большое крыло · ty, on, my, wy</th></tr>
      ${MOTYL.map(m => `<tr><td class="w">${m[0]}</td><td class="g">${m[1]}</td><td class="w">${m[2]}</td></tr>`).join("")}
    </table></div>

    ${KON.map(c => `
      <h3>Спряжение ${c.n} · ${c.mark}</h3>
      <p class="lead">${c.who}</p>
      ${konTable(c)}`).join("")}

    <h3>-ować · -ywać · -iwać → -uj-</h3>
    <p>Отбрасываем окончание, ставим <b>-uj-</b>, дальше окончания I спряжения. Огромная группа, всегда предсказуема.</p>
    <div class="scroll"><table class="vt">
      <tr><th>pracować<span class="tr">работать</span></th>${PERS.map(p => `<th>${p}</th>`).join("")}</tr>
      <tr><td class="note"></td>${["pracuję","pracujesz","pracuje","pracujemy","pracujecie","pracują"].map((f,i) => `<td class="f">${vform(f,"I",i)}</td>`).join("")}</tr>
    </table></div>
    <p class="pl" style="margin-top:10px">kupować → kupuję · studiować → studiuję · gotować → gotuję · dziękować → dziękuję · fotografować → fotografuję · wychowywać → wychowuję · pokazywać → pokazuję · zapisywać → zapisuję</p>
    <div class="tip">Условие: после отбрасывания должен остаться хотя бы слог. Поэтому <span class="pl">chować</span> не сюда: <span class="pl">chowam, chowasz</span> - III спряжение.</div>

    <h3>Глаголы на -nąć</h3>
    <p>Настоящее (или простое будущее, если вид совершенный) - по I спряжению: <span class="pl">zamknę, zamkniesz, zamknie, zamkniemy, zamkniecie, zamkną</span>.</p>
    <div class="scroll"><table>
      <tr><th>тип</th><th>прошедшее</th><th>пример</th></tr>
      <tr><td>-ną- остаётся (ą → ę)</td><td class="c">zamknął / zamknęła</td><td class="w">zamknąć, ciągnąć, krzyknąć</td></tr>
      <tr><td>-ną- выпадает</td><td class="c">rósł / rosła / rośli</td><td class="w">rosnąć, marznąć, zniknąć</td></tr>
      <tr><td>две формы</td><td class="c">niknął = nikł</td><td class="w">niknąć, więdnąć</td></tr>
    </table></div>
    <p class="lead">Правило большого пальца: совершенные обычно сохраняют -ną-, несовершенные чаще теряют.</p>

    <h3>Чередования в основе</h3>
    <div class="scroll"><table>
      <tr><th>было</th><th>стало</th><th>где</th></tr>
      ${KALT.map(a => `<tr><td class="c">${a[0]}</td><td class="w">${a[1]}</td><td class="g">${a[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Важно.</b> В II спряжении чередование живёт только в формах <b>ja</b> и <b>oni</b>: <span class="pl">proszę / proszą</span>, но <span class="pl">prosisz, prosi, prosimy, prosicie</span>. В I спряжении - наоборот, чаще во всех формах, кроме ja/oni.</div>

    <h3>być - отдельная песня</h3>
    <div class="scroll"><table class="vt">
      <tr><th>być<span class="tr">быть</span></th>${PERS.map(p => `<th>${p}</th>`).join("")}</tr>
      <tr><td class="note">настоящее</td>${["jestem","jesteś","jest","jesteśmy","jesteście","są"].map(f => `<td class="f"><span class="stem">${f}</span></td>`).join("")}</tr>
      <tr><td class="note">будущее</td>${["będę","będziesz","będzie","będziemy","będziecie","będą"].map(f => `<td class="f"><span class="stem">${f}</span></td>`).join("")}</tr>
    </table></div>

    <h3>Модальные</h3>
    <p class="pl">muszę (должен) · mogę (могу) · chcę (хочу) · umiem (умею) · potrafię (в состоянии)</p>
    <p class="lead"><span class="pl">trzeba, można, wolno, warto, należy</span> - безличные, лица не имеют: <span class="pl">trzeba iść, można wejść, nie wolno palić</span>. Прошедшее - с <span class="pl">było</span>: <span class="pl">trzeba było iść</span>.</p>
    <div class="tip"><b>znać или wiedzieć.</b> Критерий не «объект или факт», а конструкция. <span class="pl">znać</span> + существительное, называющее конкретный объект, в Bierniku - всегда, даже если это информация: <span class="pl">Znam pana Kowalskiego · Znam polski · Znam adres · Znam odpowiedź · Nie znam drogi.</span> <span class="pl">wiedzieć</span> - с придаточным (<span class="pl">że, gdzie, kiedy, czy</span>) или с <span class="pl">o + Miejscownik</span>: <span class="pl">Wiem, że przyjdzie · Nie wiem, gdzie on jest · Wiem o tym.</span> Сказать <span style="color:var(--end)">wiem adres</span> нельзя - объект назван, значит <span class="pl">znać</span>.</div>
    <div class="tip"><b>Стык: to, coś, nic, wszystko.</b> Эти местоимения формально стоят на месте прямого дополнения, но идут с <span class="pl">wiedzieć</span>: <span class="pl">Wiem to · Nic nie wiem · Wiem wszystko · Skąd to wiesz?</span> Они не называют объект, а заменяют придаточное - «знаю то, что…». Проверка на границе: <span class="pl">Znam tę odpowiedź</span> (ответ назван) - <span class="pl">znać</span>; <span class="pl">Wiem to</span> (отсылка вместо называния) - <span class="pl">wiedzieć</span>.</div>
  </div>`;
}

function vCzasy(){
  return `<div class="panel">
    <h2>Времена и вид</h2>
    <p class="lead">Времён три, но выбор формы начинается с вида глагола. Сначала вид - потом время.</p>
    <div class="tip"><b>Главное правило.</b> У совершенного вида <b>нет настоящего времени</b>. <span class="pl">zrobię</span> - это «сделаю», а не «делаю». Настоящее возможно только у несовершенного: <span class="pl">robię</span>.</div>

    <h3>Вид: пары глаголов</h3>
    <div class="scroll"><table>
      <tr><th>несовершенный</th><th>совершенный</th><th>перевод</th></tr>
      ${ASPECT.map(a => `<tr><td class="w">${a[0]}</td><td class="g">${a[1]}</td><td style="color:var(--muted)">${a[2]}</td></tr>`).join("")}
    </table></div>

    <h3>Сетка: какой вид в каком времени</h3>
    <table>
      <tr><th></th><th>несовершенный</th><th>совершенный</th></tr>
      <tr><td>прошедшее</td><td class="w">robiłem</td><td class="g">zrobiłem</td></tr>
      <tr><td>настоящее</td><td class="w">robię</td><td style="color:var(--muted)">нет</td></tr>
      <tr><td>будущее</td><td class="w">będę robić / robił</td><td class="g">zrobię</td></tr>
    </table>

    <h3>Прошедшее время</h3>
    <p>Основа: инфинитив минус <b>-ć</b>, дальше <b>-ł-</b> и окончание рода и лица. Род есть у всех лиц - в русском такого нет.</p>
    <div class="scroll"><table>
      <tr><th>лицо</th><th>м. род</th><th>ж. род</th><th>ср. род</th></tr>
      ${PAST.map(p => `<tr><td style="color:var(--muted)">${p[0]}</td><td class="w">${p[1]}</td><td class="w">${p[2]}</td><td class="${p[3]==="-"?"":"w"}" style="${p[3]==="-"?"color:var(--line)":""}">${p[3]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Множественное различает только два рода: <b>мужско-личный</b> (есть хоть один мужчина) - <span class="pl">robili</span>, и <b>всё остальное</b> - <span class="pl">robiły</span>.</p>

    <h3>Чередования в прошедшем</h3>
    <table>
      <tr><td style="width:34%">инфинитив на <b>-eć</b></td><td class="c">e → a</td><td class="w">musieć → musiał, musiała, <b>но</b> musieli</td></tr>
      <tr><td>инфинитив на <b>-ąć</b></td><td class="c">ą → ę</td><td class="w">zacząć → zaczął, <b>но</b> zaczęła, zaczęli</td></tr>
      <tr><td>основа на <b>-o-</b></td><td class="c">o → ó</td><td class="w">móc → mógł, nieść → niósł (но mogła, niosła)</td></tr>
    </table>

    <h3>Нерегулярные в прошедшем</h3>
    <div class="scroll"><table>
      <tr><th>глагол</th><th>ja</th><th>on · ona</th><th>oni · one</th><th></th></tr>
      ${PASTIRR.map(p => `<tr><td class="w">${p[0]}</td><td class="g">${p[1]}</td><td class="w">${p[2]}</td><td class="w">${p[3]}</td><td style="color:var(--muted);font-size:13px">${p[4]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Подвижные окончания.</b> <span class="pl">-m, -ś, -śmy, -ście</span> умеют отрываться и уезжать к первому слову: <span class="pl">gdzie byłeś?</span> = <span class="pl">gdzieś był?</span>; <span class="pl">my to zrobiliśmy</span> = <span class="pl">myśmy to zrobili</span>. И ударение: в <span class="pl">byliśmy, byliście</span> оно на третьем слоге от конца - единственное системное исключение из правила предпоследнего слога.</div>

    <h3>Будущее: совершенный вид → простое</h3>
    <p>Совершенный глагол спрягается как настоящее время, а значит будущее.</p>
    <p class="pl">zrobię, zrobisz, zrobi, zrobimy, zrobicie, zrobią · napiszę · kupię · powiem · pójdę · zjem · wrócę</p>

    <h3>Будущее: несовершенный вид → составное</h3>
    <p><span class="pl">będę</span> + инфинитив <b>или</b> + форма на -ł. Смысл одинаковый.</p>
    <div class="scroll"><table>
      <tr><th>лицо</th><th>+ инфинитив</th><th>+ форма на -ł (м. / ж.)</th></tr>
      <tr><td style="color:var(--muted)">ja</td><td class="w">będę czytać</td><td class="g">będę czytał / czytała</td></tr>
      <tr><td style="color:var(--muted)">ty</td><td class="w">będziesz czytać</td><td class="g">będziesz czytał / czytała</td></tr>
      <tr><td style="color:var(--muted)">on / ona</td><td class="w">będzie czytać</td><td class="g">będzie czytał / czytała</td></tr>
      <tr><td style="color:var(--muted)">my</td><td class="w">będziemy czytać</td><td class="g">będziemy czytali / czytały</td></tr>
      <tr><td style="color:var(--muted)">wy</td><td class="w">będziecie czytać</td><td class="g">będziecie czytali / czytały</td></tr>
      <tr><td style="color:var(--muted)">oni / one</td><td class="w">będą czytać</td><td class="g">będą czytali / czytały</td></tr>
    </table></div>
    <div class="tip"><b>Три ловушки.</b> 1) Никогда <span style="color:var(--end)">będę być</span> - просто <span class="pl">będę</span>. 2) Никогда <span style="color:var(--end)">będę zrobić</span> - с совершенным видом <span class="pl">będę</span> не сочетается. 3) Модальные почти всегда идут в форме на -ł: <span class="pl">będę mógł, będę musiała, będzie chciał</span>.</div>

    <h3>Слова-подсказки</h3>
    <p class="pl">wczoraj · przedwczoraj · w zeszłym tygodniu · rok temu - прошедшее<br>teraz · zawsze · codziennie · zwykle - настоящее<br>jutro · pojutrze · za godzinę · w przyszłym roku - будущее</p>
  </div>`;
}

function vTryby(){
  return `<div class="panel">
    <h2>Наклонения</h2>
    <p class="lead">Повелительное - приказ и просьба. Условное - вежливость и «бы».</p>

    <h3>Повелительное: как образуется</h3>
    <p>I и II спряжение - берём форму <b>ty</b> и отбрасываем окончание. III и IV - берём форму <b>oni</b> и отбрасываем <b>-ą</b>. Дальше <b>+ -my</b> для «мы» и <b>+ -cie</b> для «вы».</p>
    <div class="scroll"><table>
      <tr><th>глагол</th><th>от чего</th><th>ty</th><th>my</th><th>wy</th><th>on / ona</th><th></th></tr>
      ${IMPER.map(v => `<tr><td class="w">${v[0]}</td><td style="color:var(--muted);font-size:13px">${v[1]}</td>
        <td class="g">${v[2]}</td><td class="w">${v[3]}</td><td class="w">${v[4]}</td><td class="w">${v[5]}</td>
        <td style="color:var(--muted);font-size:13px">${v[6]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Смягчение на конце.</b> si → ś, zi → ź, ci → ć, dzi → dź, ni → ń: <span class="pl">prosić → proś, wozić → woź, chodzić → chodź, zaprosić → zaproś</span>. Если основа не выговаривается - добавляем <b>-ij / -yj</b>: <span class="pl">spać → śpij, zapomnieć → zapomnij, zamknąć → zamknij, trzeć → trzyj</span>. Отдельно: <span class="pl">otworzyć → otwórz, pomóc → pomóż</span> - здесь o → ó.</div>

    <h3>Вежливость вместо приказа</h3>
    <table>
      <tr><td style="width:42%" class="w">Proszę usiąść.</td><td>proszę + инфинитив - самое нейтральное</td></tr>
      <tr><td class="w">Niech pan/pani usiądzie.</td><td>niech + 3-е лицо - вежливо к незнакомому</td></tr>
      <tr><td class="w">Czy mógłbyś mi pomóc?</td><td>условное - самая мягкая просьба</td></tr>
      <tr><td class="w">Usiądź!</td><td>прямой императив - только на «ты»</td></tr>
    </table>
    <div class="tip"><b>Отрицание меняет вид.</b> Приказ - совершенный, запрет - несовершенный: <span class="pl">Zrób to!</span> → <span class="pl">Nie rób tego!</span> · <span class="pl">Kup to!</span> → <span class="pl">Nie kupuj tego!</span> · <span class="pl">Powiedz!</span> → <span class="pl">Nie mów!</span></div>

    <h3>Условное наклонение</h3>
    <p>Форма прошедшего времени + <b>-by</b> + окончание лица. Род сохраняется.</p>
    <div class="scroll"><table>
      <tr><th>лицо</th><th>окончание</th><th>chcieć - м. род</th><th>chcieć - ж. род</th></tr>
      <tr><td style="color:var(--muted)">ja</td><td class="c">-bym</td><td class="w">chciałbym</td><td class="w">chciałabym</td></tr>
      <tr><td style="color:var(--muted)">ty</td><td class="c">-byś</td><td class="w">chciałbyś</td><td class="w">chciałabyś</td></tr>
      <tr><td style="color:var(--muted)">on / ona</td><td class="c">-by</td><td class="w">chciałby</td><td class="w">chciałaby</td></tr>
      <tr><td style="color:var(--muted)">my</td><td class="c">-byśmy</td><td class="w">chcielibyśmy</td><td class="w">chciałybyśmy</td></tr>
      <tr><td style="color:var(--muted)">wy</td><td class="c">-byście</td><td class="w">chcielibyście</td><td class="w">chciałybyście</td></tr>
      <tr><td style="color:var(--muted)">oni / one</td><td class="c">-by</td><td class="w">chcieliby</td><td class="w">chciałyby</td></tr>
    </table></div>

    <h3>Куда прилипает -by</h3>
    <table>
      <tr><td style="width:38%" class="w">Chciałbym kawę.</td><td>слитно с глаголом - база</td></tr>
      <tr><td class="w">Gdybym miał czas…</td><td>слитно с gdyby, żeby, aby, czyby</td></tr>
      <tr><td class="w">Ja bym tego nie zrobił.</td><td>раздельно после местоимения</td></tr>
      <tr><td class="w">Chętnie bym pojechał.</td><td>раздельно после наречия</td></tr>
      <tr><td class="w">Należałoby zadzwonić.</td><td>безличная форма</td></tr>
    </table>
    <div class="tip"><b>Условие целиком.</b> <span class="pl">Gdyby + условное, to + условное</span>: <span class="pl">Gdybym miał czas, poszedłbym z tobą.</span> Оба глагола в условном - в отличие от русского «если бы у меня было время, я бы пошёл», где первая часть без «бы».</div>
    <p class="lead">Рабочие вежливые заготовки: <span class="pl">Chciałbym / Chciałabym…</span> · <span class="pl">Czy mógłbym prosić o…?</span> · <span class="pl">Czy mogłaby pani powtórzyć?</span> · <span class="pl">Wolałbym nie.</span></p>
  </div>`;
}

function vFormy(){
  return `<div class="panel">
    <h2>Причастия, пассив, отглагольные существительные</h2>
    <p class="lead">Пласт письменного польского: объявления, инструкции, документы, urząd. В живой речи всё это заменяется придаточными с który и kiedy - но читать без этого не получится.</p>

    <h3>Действительное причастие: -ący</h3>
    <p>Только от несовершенного вида. Берём форму <b>oni</b> и добавляем <b>-cy</b>. Склоняется как прилагательное.</p>
    <div class="scroll"><table class="vt">
      <tr><th>глагол</th><th>от чего</th><th>причастие</th><th>перевод</th></tr>
      ${IMIES_CZ.map(i => `<tr><td class="w">${i[0]}</td><td style="color:var(--muted)">${i[1]}</td><td class="g">${i[2]}</td><td style="color:var(--muted)">${i[3]}</td></tr>`).join("")}
    </table></div>
    <p class="lead"><span class="pl">kobieta czytająca gazetę</span> - «женщина, читающая газету» = <span class="pl">kobieta, która czyta gazetę</span>. В речи почти всегда звучит второй вариант.</p>

    <h3>Страдательное причастие: -ny / -ony / -ty</h3>
    <div class="scroll"><table class="vt">
      <tr><th>тип</th><th>примеры</th></tr>
      ${IMIES_B.map(i => `<tr><td>${i[0]}</td><td class="w">${i[1]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Это самые частые слова на дверях и табличках:</p>
    <div class="scroll"><table>
      ${IMIES_SIGNS.map(s => `<tr><td style="width:40%" class="g">${s[0]}</td><td style="color:var(--muted)">${s[1]}</td></tr>`).join("")}
    </table></div>

    <h3>Деепричастия: -ąc и -wszy / -łszy</h3>
    <div class="scroll"><table class="vt">
      <tr><th>тип</th><th>когда</th><th>образование</th><th>пример</th></tr>
      ${IMIES_PRZYS.map(i => `<tr><td class="c">${i[0]}</td><td style="color:var(--muted);font-size:13px">${i[1]}</td><td class="w">${i[2]}</td><td class="g">${i[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Два ограничения.</b> 1) Субъект деепричастия и главного глагола - один и тот же человек: <span class="pl">Idąc do pracy, zgubiłem telefon</span> - шёл и потерял один и тот же «я». 2) Форма на <span class="pl">-wszy / -łszy</span> - книжная; в разговоре вместо <span class="pl">Zrobiwszy zakupy…</span> скажут <span class="pl">Kiedy zrobiłem zakupy…</span></div>

    <h3>Настоящий пассив: zostać / być + причастие</h3>
    <p>Причастие согласуется с подлежащим в роде и числе. Исполнитель - через <span class="pl">przez + Biernik</span>: <span class="pl">zbudowany przez znaną firmę</span>.</p>
    <div class="scroll"><table class="vt">
      <tr><th>конструкция</th><th>смысл</th><th>примеры</th></tr>
      ${PASSIVE_Z.map(p => `<tr><td class="c">${p[0]}</td><td style="color:var(--muted);font-size:13px">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Три способа сказать «построили дом».</b> <span class="pl">Zbudowano dom</span> - безличное, кто - неизвестно и неважно (вкладка «Безличные»). <span class="pl">Dom został zbudowany</span> - пассив, дом в центре внимания. <span class="pl">Firma zbudowała dom</span> - обычный актив. Урядовый и газетный текст живёт первыми двумя.</div>

    <h3>Отглагольные существительные: -anie / -enie / -cie</h3>
    <p>Средний род, склоняются как <span class="pl">mieszkanie</span>. Дополнение уходит в Dopełniacz: <span class="pl">palenie papierosów, mycie rąk</span>. Отрицание пишется слитно: <span class="pl">niepalenie</span>.</p>
    <div class="scroll"><table class="vt">
      <tr><th>тип</th><th>примеры</th></tr>
      ${VNOUN.map(v => `<tr><td>${v[0]}</td><td class="w">${v[1]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Язык вывесок и запретов:</p>
    <div class="scroll"><table>
      ${VNOUN_SIGNS.map(s => `<tr><td style="width:40%" class="g">${s[0]}</td><td style="color:var(--muted)">${s[1]}</td></tr>`).join("")}
    </table></div>
  </div>`;
}

function vRekcja(){
  return `<div class="panel">
    <h2>Управление глаголов</h2>
    <p class="lead">Самая частая ошибка русскоязычных - не окончание, а падеж после глагола. Красным помечено то, где польский расходится с русским.</p>
    <div class="scroll"><table class="vt">
      <tr><th>глагол</th><th>вопрос</th><th>требует</th><th>по-русски</th><th>пример</th></tr>
      ${REKCJA.map(r => `<tr><td class="w">${r[0]}</td><td style="color:var(--muted);white-space:nowrap">${r[1]}</td>
        <td class="${r[5]?"c":"cq"}">${r[2]}</td><td style="color:var(--muted);font-size:13px">${r[3]}</td>
        <td class="w">${r[4]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Отрицание съедает Biernik.</b> При <span class="pl">nie</span> прямое дополнение уходит в Dopełniacz: <span class="pl">Mam czas → Nie mam czasu</span> · <span class="pl">Znam ją → Nie znam jej</span> · <span class="pl">Lubię kawę → Nie lubię kawy</span>.</div>

    <h3>Глаголы движения: пара «конкретный / многократный»</h3>
    <div class="scroll"><table class="vt">
      <tr><th>сейчас, один раз</th><th>вообще, регулярно</th><th>перевод</th><th>пример</th></tr>
      ${RUCH.map(r => `<tr><td class="g">${r[0]}</td><td class="w">${r[1]}</td><td style="color:var(--muted);font-size:13px">${r[2]}</td><td class="w">${r[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Приставки к iść</h3>
    <div class="scroll"><table>
      <tr><th>глагол</th><th>перевод</th><th>пример</th></tr>
      ${PREF.map(p => `<tr><td class="w">${p[0]}</td><td style="color:var(--muted)">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Куда именно.</b> <span class="pl">do</span> + Dopełniacz - в здание, город, страну: <span class="pl">do sklepu, do Polski</span>. <span class="pl">na</span> + Biernik - на мероприятие, открытое место, «в» для некоторых стран: <span class="pl">na pocztę, na uniwersytet, na Węgry</span>. <span class="pl">w</span> + Biernik - <span class="pl">w góry</span>. <span class="pl">do</span> - идти к человеку: <span class="pl">idę do lekarza</span>.</div>
  </div>`;
}

const norm = s => s.toLowerCase().replace(/ł/g,"l").normalize("NFD").replace(/\p{M}/gu,"");
function vLista(){
  return `<div class="panel">
    <h2>Словарь глаголов</h2>
    <p class="lead">${VERBS.length} самых частых глаголов с ключевыми формами. Поиск понимает и польский, и русский, и без диакритики.</p>
    <input class="src" id="vsearch" type="search" placeholder="mowic, идти, jeść…" autocomplete="off">
    <div class="scroll" id="vlist"></div>
    <div class="tip">Три формы дают всю парадигму: <b>ja</b> и <b>oni</b> - малое крыло бабочки, <b>ty</b> - большое. Формы <span class="pl">on / ona</span> в прошедшем показывают чередование основы.</div>
  </div>`;
}
function listHTML(q){
  const f = norm(q || "");
  const rows = VERBS.filter(v => !f || v.slice(0,2).concat(v.slice(3)).some(x => norm(x).includes(f)));
  return `<table class="vt">
    <tr><th>глагол</th><th>перевод</th><th>спр.</th><th>ja</th><th>ty</th><th>oni</th><th>он</th><th>она</th><th>сов. вид</th></tr>
    ${rows.map(v => `<tr>
      <td class="f"><span class="stem">${v[0]}</span></td>
      <td style="color:var(--muted);font-size:13px">${v[1]}</td>
      <td class="c">${v[2]}</td>
      <td class="f">${vform(v[3], v[2], 0)}</td>
      <td class="f">${vform(v[4], v[2], 1)}</td>
      <td class="f">${vform(v[5], v[2], 5)}</td>
      <td class="w">${v[6]}</td><td class="w">${v[7]}</td>
      <td class="${v[8]==="сов."||v[8]==="-"?"":"g"}" style="${v[8]==="сов."||v[8]==="-"?"color:var(--muted);font-size:13px":""}">${v[8]}</td>
    </tr>`).join("")}
  </table>${rows.length ? "" : `<p class="lead" style="padding:12px 0">Ничего не нашлось.</p>`}`;
}
function drawList(q){ $("#vlist").innerHTML = listHTML(q); }

function renderVerbs(){
  $("#s-verbs").innerHTML =
    `<div class="chips" id="vchips" role="group" aria-label="Раздел о глаголах">${
      VTABS.map(t => `<button class="chip" data-v="${t[0]}" aria-pressed="${t[0]===curV}"><span class="cp">${t[1]}</span></button>`).join("")
    }</div><div id="vPanel"></div>`;
  $("#vchips").querySelectorAll(".chip").forEach(b => b.onclick = () => {
    curV = b.dataset.v; renderVerbs(); writeHash();
  });
  $("#vPanel").innerHTML = {conj:vConj, czasy:vCzasy, tryby:vTryby, formy:vFormy, rekcja:vRekcja, lista:vLista}[curV]();
  if(curV === "lista"){
    drawList("");
    $("#vsearch").oninput = e => drawList(e.target.value);
  }
}

/* --- числительные --- */
const ngrid = list => `<div class="ngrid">${list.map(n =>
  `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join("")}</div>`;

function renderNum(){
  $("#s-num").innerHTML = `<div class="panel">
    <h2>Числительные</h2>
    <p class="lead">Главная сложность не в самих числах, а в том, какой падеж они требуют от существительного и что делают с глаголом.</p>
    <div class="tip"><b>Три режима.</b> <span class="pl">1</span> → всё в единственном числе. <span class="pl">2, 3, 4</span> → Mianownik множественного, глагол во множественном. <span class="pl">5 и больше</span> → Dopełniacz множественного, глагол в среднем роде единственного: <span class="pl">pięć osób było</span>.</div>

    <h3>Количественные: 0–20</h3>
    ${ngrid(NUM)}
    <h3>Десятки, сотни, тысячи</h3>
    ${ngrid(NUM10)}
    <p class="lead" style="margin-top:10px">Составные пишутся раздельно и без «и»: <span class="pl">dwadzieścia jeden</span> (21) · <span class="pl">sto trzydzieści siedem</span> (137) · <span class="pl">dwa tysiące dwadzieścia sześć</span> (2026).</p>
    <div class="tip"><b>Род есть только у 1 и 2.</b> <span class="pl">jeden dom · jedna książka · jedno okno</span>; <span class="pl">dwa domy · dwie książki · dwa okna</span>. Начиная с trzy род не различается.</div>

    <h3>Согласование с существительным</h3>
    <div class="scroll"><table class="vt">
      <tr><th>число</th><th>существительное</th><th>пример</th><th>глагол</th></tr>
      ${NAGR.map(n => `<tr><td class="c">${n[0]}</td><td class="g">${n[1]}</td><td class="w">${n[2]}</td><td class="w">${n[3]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Смотрим только на последнее слово числительного. Но <span class="pl">11–14</span> всегда ведут себя как «5 и больше»: <span class="pl">dwanaście domów</span>, не «dwanaście domy».</p>

    <h3>Мужско-личные формы</h3>
    <p>Если считаем мужчин, у числительного появляется отдельная форма - и она меняет весь остальной падеж и глагол.</p>
    <div class="scroll"><table class="vt">
      <tr><th>форма</th><th>существительное</th><th>глагол</th><th>пример</th></tr>
      ${MOSNUM.map(m => `<tr><td class="g">${m[0]}</td><td>${m[1]}</td><td style="color:var(--muted);font-size:13px">${m[2]}</td><td class="w">${m[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Что выбрать.</b> <span class="pl">Dwaj studenci czytają</span> и <span class="pl">Dwóch studentów czyta</span> значат одно и то же. Вариант с <span class="pl">dwóch / trzech / czterech</span> в живой речи встречается чаще, а начиная с пяти он единственный: <span class="pl">pięciu studentów</span>.</div>

    <h3>Склонение</h3>
    <div class="scroll"><table class="vt">
      <tr><th>падеж</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
      ${NDEKL.map(d => `<tr><td style="color:var(--muted)">${d[0]}</td><td class="w">${d[1]}</td><td class="w">${d[2]}</td><td class="w">${d[3]}</td><td class="w">${d[4]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Все числительные от 5 до 100 склоняются по образцу <span class="pl">pięć</span>: <span class="pl">pięciu, pięciu, pięć, pięcioma, pięciu</span>. В <span class="pl">Narzędnik</span> женское <span class="pl">dwiema</span> - единственная форма, где род ещё виден.</p>

    <h3>Порядковые</h3>
    ${ngrid(ORD)}
    <p class="lead" style="margin-top:10px">Склоняются как обычные прилагательные: <span class="pl">pierwszy, pierwszego, pierwszemu…</span> В составных порядковыми становятся только десятки и единицы - последние два слова; сотни и тысячи остаются количественными: <span class="pl">dwudziesty pierwszy</span> · <span class="pl">tysiąc dziewięćset dziewięćdziesiąty dziewiąty</span>.</p>

    <h3>Собирательные</h3>
    <p>Обязательны для детей, смешанных групп людей и слов, у которых нет единственного числа. Требуют Dopełniacz и глагол в среднем роде. Исключение - <span class="pl">oboje rodzice</span>: Mianownik и обычное согласование.</p>
    <div class="scroll"><table>
      <tr><th>форма</th><th>перевод</th><th>пример</th></tr>
      ${ZBIOR.map(z => `<tr><td class="g">${z[0]}</td><td style="color:var(--muted)">${z[1]}</td><td class="w">${z[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><span class="pl">Troje dzieci bawiło się w ogrodzie.</span> - глагол в среднем роде единственного числа. Три женщины - это <span class="pl">trzy kobiety</span>, а мужчина с женщиной - <span class="pl">dwoje ludzi</span>.</div>

    <h3>Который час</h3>
    <p><span class="pl">Która jest godzina?</span> - час называют порядковым числительным женского рода: <span class="pl">jest pierwsza, druga, trzecia</span>. На вопрос <span class="pl">o której?</span> - Miejscownik: <span class="pl">o pierwszej, o drugiej</span>.</p>
    <div class="scroll"><table>
      <tr><th>время</th><th>как говорят</th><th>«во сколько»</th></tr>
      ${GODZ.map(g => `<tr><td class="c">${g[0]}</td><td class="w">${g[1]}</td><td class="g">${g[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Ловушка.</b> <span class="pl">wpół do trzeciej</span> - это 2:30, «половина третьего», а не половина четвёртого. Официально время читают просто цифрами: <span class="pl">czternasta trzydzieści</span>.</div>

    <h3>Дни недели</h3>
    <div class="scroll"><table>
      <tr><th>день</th><th>«в какой день»</th><th>перевод</th></tr>
      ${DNI.map(d => `<tr><td class="w">${d[0]}</td><td class="g">${d[1]}</td><td style="color:var(--muted)">${d[2]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">«В какой день» - предлог <span class="pl">w</span> + Biernik. Перед <span class="pl">wtorek</span> предлог удлиняется: <span class="pl">we wtorek</span>.</p>

    <h3>Месяцы и даты</h3>
    <div class="scroll"><table>
      <tr><th>месяц</th><th>Dopełniacz</th><th>перевод</th></tr>
      ${MIES.map(m => `<tr><td class="w">${m[0]}</td><td class="g">${m[1]}</td><td style="color:var(--muted)">${m[2]}</td></tr>`).join("")}
    </table></div>
    <div class="scroll"><table style="margin-top:14px">
      <tr><td style="width:38%">Какое сегодня число?</td><td class="w">Którego dzisiaj mamy?</td></tr>
      <tr><td>Сегодня 5 мая.</td><td class="w">Dzisiaj jest piąty maja. · Mamy piątego maja.</td></tr>
      <tr><td>5 мая (когда?)</td><td class="w">piątego maja</td></tr>
      <tr><td>в 2026 году</td><td class="w">w dwa tysiące dwudziestym szóstym roku</td></tr>
      <tr><td>в 1999 году</td><td class="w">w tysiąc dziewięćset dziewięćdziesiątym dziewiątym roku</td></tr>
    </table></div>
    <div class="tip"><b>Дата = порядковое + месяц в Dopełniacz.</b> Число само становится Dopełniacz, когда отвечает на «когда»: <span class="pl">Urodziłem się dwudziestego trzeciego lipca.</span> В годах склоняется только хвост, «tysiąc dziewięćset» остаётся как есть.</div>

    <h3>Возраст, деньги, счёт</h3>
    <div class="scroll"><table>
      <tr><td style="width:38%">Сколько тебе лет?</td><td class="w">Ile masz lat?</td></tr>
      <tr><td>1 / 2–4 / 5+</td><td class="w">rok · lata · lat - <span class="g">mam 21 lat, 22 lata, 25 lat</span></td></tr>
      <tr><td>деньги</td><td class="w">złoty · złote · złotych - <span class="g">2 złote, 5 złotych, 22 złote</span></td></tr>
      <tr><td>неточный счёт</td><td class="w">kilka · kilkanaście (11–19) · kilkadziesiąt · parę</td></tr>
      <tr><td>доли</td><td class="w">pół · półtora / półtorej · ćwierć</td></tr>
    </table></div>
    <div class="tip"><b>ile</b> всегда требует Dopełniacz: <span class="pl">ile osób, ile lat, ile pieniędzy</span> - как «5 и больше», потому что это то же самое правило. У несчётных - единственное число: <span class="pl">ile czasu, ile cukru</span>.</div>
  </div>`;
}

/* --- частицы --- */
function renderPart(){
  $("#s-part").innerHTML = `<div class="panel">
    <h2>Частицы</h2>
    <p class="lead">Не переводятся по словарю и не склоняются, но именно они делают речь живой. Без них польский звучит как учебник.</p>

    <h3>Рабочий минимум</h3>
    <div class="scroll"><table class="vt">
      <tr><th>частица</th><th>значение</th><th>примеры</th><th></th></tr>
      ${PART.map(p => `<tr><td class="w">${p[0]}</td><td style="color:var(--muted);font-size:13px">${p[1]}</td>
        <td class="g">${p[2]}</td><td class="note">${p[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Разряды</h3>
    <div class="scroll"><table>
      <tr><th>разряд</th><th>частицы</th><th>пример</th></tr>
      ${PARTKL.map(k => `<tr><td style="color:var(--muted)">${k[0]}</td><td class="w">${k[1]}</td><td class="g">${k[2]}</td></tr>`).join("")}
    </table></div>

    <h3>Неопределённость: -ś, -kolwiek, byle</h3>
    <div class="scroll"><table>
      <tr><th>элемент</th><th>значение</th><th>примеры</th></tr>
      ${NIEOKR.map(n => `<tr><td class="c">${n[0]}</td><td style="color:var(--muted)">${n[1]}</td><td class="w">${n[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Двойное отрицание обязательно.</b> <span class="pl">Nikt nic nie wie.</span> · <span class="pl">Nigdy tam nie byłem.</span> - <span class="pl">nie</span> при глаголе остаётся, даже когда уже есть <span class="pl">nikt</span> или <span class="pl">nigdy</span>. Здесь польский совпадает с русским и расходится с английским.</div>

    <h3>Слитно или раздельно</h3>
    <div class="scroll"><table class="vt">
      <tr><th>как</th><th>правило</th><th>примеры</th></tr>
      ${PARTPIS.map(p => `<tr><td class="${p[0]==="слитно"?"c":"cq"}">${p[0]}</td><td>${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>-że усиливает и подгоняет приказ.</b> <span class="pl">Idź!</span> - команда, <span class="pl">Idźże!</span> - нетерпеливое «ну иди же!». Пишется слитно и без дефиса: <span class="pl">chodźże, weźże, dajże</span>.</div>

    <h3>Готовые реплики</h3>
    <table>
      <tr><td style="width:34%" class="w">No dobra. · No jasne. · No pewnie.</td><td>ну ладно · ну ясно · ну конечно</td></tr>
      <tr><td class="w">No właśnie! · Dokładnie!</td><td>вот именно</td></tr>
      <tr><td class="w">Raczej nie. · Chyba nie.</td><td>скорее нет - мягкий отказ</td></tr>
      <tr><td class="w">Ależ oczywiście!</td><td>ну разумеется</td></tr>
      <tr><td class="w">Akurat!</td><td>ага, как же - с иронией</td></tr>
      <tr><td class="w">Przecież mówiłem.</td><td>я же говорил</td></tr>
      <tr><td class="w">Może być.</td><td>сойдёт, пойдёт</td></tr>
      <tr><td class="w">Oby!</td><td>дай бог</td></tr>
    </table>
    <div class="tip"><b>Три ложных друга.</b> <span class="pl">no</span> - это «ну», а «но» будет <span class="pl">ale</span>. <span class="pl">owszem</span> - «да, конечно», ничего общего с «совсем». <span class="pl">niby</span> - «якобы», а не «небо».</div>
  </div>`;
}

/* --- вопросы и который --- */
function renderQ(){
  $("#s-q").innerHTML = `<div class="panel">
    <h2>Вопросы</h2>
    <p class="lead">Общий вопрос строится через <span class="pl">czy</span>, частный - вопросительным словом. Русский почти всегда обходится одним словом там, где польский различает два.</p>

    <h3>Общий вопрос: czy</h3>
    <p><span class="pl">czy</span> открывает вопрос, на который отвечают «да / нет»: <span class="pl">Czy jesteś głodny? Czy lubisz kawę?</span> В устной речи часто опускается и заменяется вопросительной интонацией, но на письме и в вежливой речи ожидается.</p>

    <h3>Вопросительные слова</h3>
    <div class="scroll"><table class="vt">
      <tr><th>слово</th><th>значение</th><th>пример</th></tr>
      ${QWORDS.map(q => `<tr><td class="w">${q[0]}</td><td style="color:var(--muted)">${q[1]}</td><td class="g">${q[2]}</td></tr>`).join("")}
    </table></div>

    <h3>jaki или który</h3>
    <p><span class="pl">jaki</span> - какой по качеству, признак из неограниченного набора: <span class="pl">Jaki jest ten film? - Nudny.</span> <span class="pl">który</span> - выбор из известного, ограниченного набора: <span class="pl">Który film chcesz obejrzeć? - Ten pierwszy.</span> Русский язык это различие обычно не делает - оба переводятся как «какой».</p>
    <div class="scroll"><table>
      <tr><td style="width:46%" class="w">Jaki masz samochód?</td><td>какой у тебя автомобиль (марка, качество - открытый вопрос)</td></tr>
      <tr><td class="w">Który z tych samochodów jest twój?</td><td>который из этих (выбор из конкретного набора)</td></tr>
    </table></div>

    <h3>Вопросы с предлогом</h3>
    <p class="lead">Предлог всегда идёт перед вопросительным словом, никогда не остаётся в конце, как в английском.</p>
    <div class="scroll"><table class="vt">
      <tr><th>вопрос</th><th>значение</th><th>пример</th></tr>
      ${QPREP.map(q => `<tr><td class="w">${q[0]}</td><td style="color:var(--muted)">${q[1]}</td><td class="g">${q[2]}</td></tr>`).join("")}
    </table></div>

    <h3>który: полное склонение</h3>
    <p class="lead">Склоняется как прилагательное <span class="pl">dobry</span> - та же парадигма, что уже знакома по прилагательным.</p>
    <div class="scroll"><table>
      <tr><th>падеж</th><th>муж.</th><th>жен.</th><th>ср.</th><th>мн. мужчины</th><th>мн. остальное</th></tr>
      ${KTORY.map(r => `<tr><td>${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td><td class="w">${r[3]}</td><td class="g">${r[4]}</td><td class="g">${r[5]}</td></tr>`).join("")}
    </table></div>

    <h3>który как относительное местоимение</h3>
    <p>Присоединяет придаточное к существительному. Род и число - от существительного, к которому относится; падеж - от того, какую роль który играет внутри своего придаточного.</p>
    <div class="scroll"><table>
      ${KTORY_SENT.map(k => `<tr><td style="width:36%" class="w">${k[0]}</td><td style="color:var(--muted);font-size:13px">${k[1]}</td><td class="g" style="font-size:13px">${k[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Без который не построить сложное предложение.</b> Именно он позволяет сказать не «Это магазин. Я там работаю», а «Это магазин, в котором я работаю» - то есть перейти от двух коротких фраз к одной развёрнутой.</div>
  </div>`;
}

/* --- отрицание --- */
function renderNeg(){
  $("#s-neg").innerHTML = `<div class="panel">
    <h2>Отрицание</h2>
    <p class="lead">Как и в русском, отрицательные слова в предложении накапливаются, а не взаимоисключают друг друга.</p>

    <h3>Множественное отрицание обязательно</h3>
    <div class="scroll"><table class="vt">
      <tr><th>пример</th><th>перевод</th><th></th></tr>
      ${NEG_MULTI.map(n => `<tr><td class="w">${n[0]}</td><td style="color:var(--muted)">${n[1]}</td><td class="note">${n[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Nie при глаголе не убирается никогда.</b> Сколько бы ни было в предложении <span class="pl">nikt, nic, nigdy, nigdzie</span> - частица <span class="pl">nie</span> перед глаголом остаётся всегда. Здесь польский совпадает с русским и расходится с английским, где двойное отрицание, наоборот, недопустимо.</div>

    <h3>Склонение nikt / nic</h3>
    <div class="scroll"><table>
      <tr><th>падеж</th><th>nikt</th><th>nic</th></tr>
      ${NIKT_DEKL.map(n => `<tr><td style="color:var(--muted)">${n[0]}</td><td class="w">${n[1]}</td><td class="w">${n[2]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Склоняются полностью, как обычные существительные - в отличие от русских «никто/ничто», где падежная форма не всегда прозрачна.</p>

    <h3>nie ma или nie jest</h3>
    <p><span class="pl">nie ma</span> - безличное, «не имеется», требует Dopełniacz. <span class="pl">nie jest</span> - личное, «не является», при подлежащем и обычном для <span class="pl">być</span> падеже.</p>
    <div class="scroll"><table class="vt">
      <tr><th>пример</th><th>падеж</th><th>смысл</th></tr>
      ${NIEMA_JEST.map(n => `<tr><td class="g">${n[0]}</td><td class="c">${n[1]}</td><td style="color:var(--muted);font-size:13px">${n[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Главная проверка.</b> Если можно поставить вопрос «есть ли у кого-то / где-то?» - это <span class="pl">nie ma</span> + Dopełniacz. Если вопрос «является ли чем-то / каким-то?» - это <span class="pl">nie jest</span> и падеж обычного сказуемого.</div>

    <h3>ani… ani и żaden</h3>
    <p class="pl">Nie mam ani czasu, ani pieniędzy.</p>
    <p class="lead">Отдельное отрицательное местоимение <span class="pl">żaden / żadna / żadne</span> - «никакой»: <span class="pl">Żaden z nich nie przyszedł.</span> Склоняется как прилагательное с окончаниями местоименного типа: <span class="pl">żadnego, żadnej, żadnym</span>.</p>
  </div>`;
}

/* --- порядок слов --- */
function renderOrder(){
  $("#s-order").innerHTML = `<div class="panel">
    <h2>Порядок слов</h2>
    <p class="lead">Польский свободнее русского в порядке подлежащего и сказуемого, но у безударных словечек - клитик - есть жёсткие правила места.</p>

    <h3>Клитики: mi, ci, go, mu, się…</h3>
    <p>Короткие безударные слова никогда не открывают предложение и никогда не идут сразу после предлога. Обычно они льнут ко второму месту в предложении - сразу после первого ударного слова или перед глаголом.</p>
    <div class="scroll"><table class="vt">
      <tr><th>клитика</th><th>значение</th><th>пример</th></tr>
      ${CLITICS.map(c => `<tr><td class="w">${c[0]}</td><td style="color:var(--muted)">${c[1]}</td><td class="g">${c[2]}</td></tr>`).join("")}
    </table></div>

    <h3>Позиция się</h3>
    <p class="lead">Русское «-ся» приклеено к глаголу намертво. Польское <span class="pl">się</span> - отдельное слово и гуляет по предложению.</p>
    <div class="scroll"><table>
      ${SIE_POS.map(s => `<tr><td style="width:34%" class="w">${s[0]}</td><td style="color:var(--muted);font-size:13px">${s[1]}</td><td style="font-size:13px">${s[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Две жёсткие границы.</b> <span class="pl">się</span> никогда не ставится первым словом предложения и никогда не идёт сразу после предлога. После предлога вместо него используется полная форма: не <span class="pl">bez się</span>, а <span class="pl">bez siebie</span> - «без самого себя»; не <span class="pl">ze się</span>, а <span class="pl">rozmawiam sam ze sobą</span> - «разговариваю сам с собой».</div>

    <h3>Вопросительное слово + глагол</h3>
    <p class="lead">В нейтральной речи глагол идёт сразу за вопросительным словом, не после подлежащего.</p>
    <div class="scroll"><table>
      ${QVERB_ORDER.map(q => `<tr><td style="width:46%" class="w">${q[0]}</td><td>${q[1]}</td></tr>`).join("")}
    </table></div>

    <h3>Прилагательное: качество или тип</h3>
    <p class="lead">Тоже вопрос порядка слов, хоть и внутри одной именной группы: качество - перед словом, вид или тип - после. Подробнее и с примерами - во вкладке «Прилагательные».</p>
    <p class="pl">czarna kawa (какой кофе) · kawa rozpuszczalna (какой вид кофе) · język polski · Dzień Dobry</p>
  </div>`;
}

/* --- безличные конструкции --- */
function renderImpers(){
  $("#s-impers").innerHTML = `<div class="panel">
    <h2>Безличные конструкции</h2>
    <p class="lead">Действие есть, а того, кто его совершает, - нет и не важно. Это язык объявлений, вывесок и учреждений.</p>

    <h3>Модальные безличные + инфинитив</h3>
    <div class="scroll"><table class="vt">
      <tr><th>слово</th><th>значение</th><th>пример</th></tr>
      ${IMPERS_MODAL.map(i => `<tr><td class="w">${i[0]}</td><td style="color:var(--muted)">${i[1]}</td><td class="g">${i[2]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Прошедшее время - всегда через <span class="pl">było</span>: <span class="pl">trzeba było iść, nie można było wejść</span>.</p>

    <h3>mówi się - обобщённое «говорят»</h3>
    <p class="lead"><span class="pl">się</span> при глаголе без подлежащего создаёт обобщённо-личную конструкцию - действие относится к любому, к «всем вообще».</p>
    <div class="scroll"><table>
      ${MOWI_SIE.map(m => `<tr><td style="width:50%" class="w">${m[0]}</td><td style="color:var(--muted)">${m[1]}</td></tr>`).join("")}
    </table></div>

    <h3>Конструкция на -no / -to</h3>
    <p class="lead">Действие совершено, но кем - не сказано и не важно. Строится от страдательного причастия: убираем окончание рода, добавляем <span class="pl">-o</span>.</p>
    <div class="scroll"><table class="vt">
      <tr><th>причастие</th><th>форма на -no/-to</th><th>пример</th></tr>
      ${PASSIVE_NO.map(p => `<tr><td class="w">${p[0]}</td><td class="g">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Это не настоящий пассив.</b> Прямое дополнение остаётся в винительном падеже, как при обычном действии: <span class="pl">zbudowano dom</span> (не «dom został zbudowany»), <span class="pl">napisano ogłoszenie</span>. Форма всегда одна, без рода и числа - <span class="pl">-o</span> и точка. Именно так написаны объявления на дверях учреждений: <span class="pl">Zamknięto. Otwarto o 10:00. Wykonano remont.</span> Настоящий пассив (<span class="pl">dom został zbudowany</span>) - во вкладке Глаголы → Причастия и пассив.</div>
  </div>`;
}

function renderPreps(){
  const cs = ["все","Mianownik","Biernik","Dopełniacz","Celownik","Narzędnik","Miejscownik"];
  $("#s-preps").innerHTML = `<div class="panel">
    <h2>Предлог → падеж</h2>
    <p class="lead">Один предлог часто управляет двумя падежами. Разница обычно «где / куда».</p>
    <div class="chips" id="pfilter">${cs.map((c,i) =>
      `<button class="chip" data-f="${c}" aria-pressed="${i===0}"><span class="cp">${c}</span></button>`).join("")}</div>
    <div class="scroll"><table id="ptable"></table></div>
    <div class="tip"><b>Правило движения.</b> Стоишь - Miejscownik или Narzędnik. Двигаешься - Biernik. <span class="pl">Jestem na poczcie</span> / <span class="pl">idę na pocztę</span>.</div>

    <h3>Беглое e: w → we, z → ze</h3>
    <p class="lead">Перед скоплением согласных или похожим звуком предлог обрастает гласной - иначе не выговорить.</p>
    <div class="scroll"><table class="vt">
      <tr><th>предлог</th><th>с беглым e</th><th>примеры</th></tr>
      ${PREP_E.map(p => `<tr><td class="w">${p[0]}</td><td class="g">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Чаще всего это происходит перед местоимениями <span class="pl">mną, mnie</span> и словом <span class="pl">wszystkim</span>, а также когда следующее слово начинается на ту же букву или на скопление согласных.</p>
  </div>`;
  const draw = f => $("#ptable").innerHTML =
    `<tr><th>предлог</th><th>падеж</th><th>значение</th><th>пример</th></tr>` +
    PREPS.filter(p => f === "все" || p[1] === f).map(p =>
      `<tr><td class="w">${p[0]}</td><td class="c">${p[1]}</td><td>${p[2]}</td><td class="w">${p[3]}</td></tr>`).join("");
  draw("все");
  $("#pfilter").querySelectorAll(".chip").forEach(b => b.onclick = () => {
    $("#pfilter").querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b));
    draw(b.dataset.f);
  });
}
function renderAdj(){
  $("#s-adj").innerHTML = `<div class="panel">
    <h2>Прилагательные</h2>
    <p class="lead">Одна парадигма на все прилагательные, притяжательные (<span class="pl">mój, twój, nasz</span>) и указательные. Выучив её, закрываешь сразу три класса слов.</p>
    <h3>dobry - полная парадигма</h3>
    <div class="scroll"><table>
      <tr><th>падеж</th><th>муж.</th><th>жен.</th><th>ср.</th><th>мн. мужчины</th><th>мн. остальное</th></tr>
      ${ADJ.map(r => `<tr><td>${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td><td class="w">${r[3]}</td><td class="g">${r[4]}</td><td class="g">${r[5]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>После k и g пишется i вместо y.</b> <span class="pl">polski → polskiego, polskim, polscy</span> · <span class="pl">drogi → drogiego, drogim, drodzy</span>. Это орфография, а не отдельное склонение.</div>
    <h3>Мужско-личное множественное: чередование</h3>
    <table><tr><th>ед. ч.</th><th>мн. ч. (мужчины)</th></tr>
      <tr><td class="w">dobry</td><td class="g">dobrzy</td></tr>
      <tr><td class="w">młody</td><td class="g">młodzi</td></tr>
      <tr><td class="w">wysoki</td><td class="g">wysocy</td></tr>
      <tr><td class="w">drogi</td><td class="g">drodzy</td></tr>
      <tr><td class="w">miły</td><td class="g">mili</td></tr>
      <tr><td class="w">duży</td><td class="g">duzi</td></tr>
      <tr><td class="w">zmęczony</td><td class="g">zmęczeni</td></tr>
    </table>
    <p class="lead" style="margin-top:10px">Логика та же, что в существительных: r → rz, k → c, g → dz, ł → l, d → dzi, ony → eni.</p>
    <h3>Степени сравнения</h3>
    <table>
      <tr><th>обычная</th><th>сравнительная</th><th>превосходная</th></tr>
      <tr><td class="w">tani</td><td class="w">tańszy</td><td class="w">najtańszy</td></tr>
      <tr><td class="w">ładny</td><td class="w">ładniejszy</td><td class="w">najładniejszy</td></tr>
      <tr><td class="w">dobry</td><td class="g">lepszy</td><td class="g">najlepszy</td></tr>
      <tr><td class="w">zły</td><td class="g">gorszy</td><td class="g">najgorszy</td></tr>
      <tr><td class="w">duży</td><td class="g">większy</td><td class="g">największy</td></tr>
      <tr><td class="w">mały</td><td class="g">mniejszy</td><td class="g">najmniejszy</td></tr>
    </table>
    <p class="lead" style="margin-top:10px">Длинные и заимствованные - через <span class="pl">bardziej / najbardziej</span>: <span class="pl">bardziej interesujący</span>. «Чем» - <span class="pl">niż</span> или <span class="pl">od</span> + родительный: <span class="pl">tańszy niż tamten / tańszy od tamtego</span>.</p>
    <h3>Подводные камни</h3>
    <ol class="pit">
      <li><b>Прилагательное после <span class="pl">być</span> остаётся в именительном.</b> <span class="pl">Jestem zmęczony</span>, но <span class="pl">jestem lekarzem</span>. Появилось существительное - обе части уходят в творительный: <span class="pl">jestem dobrym lekarzem</span>.</li>
      <li><b>Порядок слов.</b> Качество - перед словом (<span class="pl">czarna kawa</span>), вид или тип - после (<span class="pl">kawa rozpuszczalna</span>, <span class="pl">język polski</span>, <span class="pl">Dzień Dobry</span>). Русский тут почти всегда ставит перед.</li>
      <li><b>Женское <span class="pl">-ą</span> в винительном и творительном совпадает.</b> <span class="pl">Widzę dobrą kawę</span> / <span class="pl">z dobrą kawą</span> - форма одна, падежи разные.</li>
    </ol>
  </div>`;
}
function renderAdv(){
  $("#s-adv").innerHTML = `<div class="panel">
    <h2>Наречия</h2>
    <p class="lead">Не склоняются и не спрягаются - единственная сложность в том, что они образуются от прилагательных не по одному жёсткому правилу, а списком типовых окончаний.</p>

    <h3>Образование: -o</h3>
    <p class="lead">Самая большая и продуктивная группа.</p>
    <p class="pl">${ADV_O.join(" · ")}</p>

    <h3>Образование: -e / -ie</h3>
    <p class="lead">Прилагательные с мягкой основой чаще уходят сюда.</p>
    <p class="pl">${ADV_E.join(" · ")}</p>
    <div class="tip">Жёсткого правила «это слово точно -o, а то точно -e» нет - прилагательные на <span class="pl">-ny, -wy</span> распределяются по обеим группам, форму лучше запоминать вместе со словом. Но если сомневаешься - <span class="pl">-o</span> угадывается чаще.</div>

    <h3>Степени сравнения: нерегулярные</h3>
    <div class="scroll"><table class="vt">
      <tr><th>обычная</th><th>сравнительная</th><th>превосходная</th></tr>
      ${ADV_IRR.map(a => `<tr><td class="w">${a[0]}</td><td class="g">${a[1]}</td><td class="g">${a[2]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Те же четыре слова-исключения, что и у прилагательных <span class="pl">(dobry/lepszy, zły/gorszy, duży/większy, mały/mniejszy)</span> - только в форме наречия.</p>

    <h3>Степени сравнения: регулярные</h3>
    <div class="scroll"><table class="vt">
      <tr><th>обычная</th><th>сравнительная</th><th>превосходная</th><th></th></tr>
      ${ADV_REG.map(a => `<tr><td class="w">${a[0]}</td><td class="g">${a[1]}</td><td class="g">${a[2]}</td><td class="note">${a[3]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Превосходная - всегда просто <span class="pl">naj-</span> перед сравнительной. Длинные и заимствованные наречия сравниваются аналитически: <span class="pl">bardziej szczegółowo → najbardziej szczegółowo</span>.</p>
    <div class="tip"><b>«Чем».</b> Как и у прилагательных - <span class="pl">niż</span> или <span class="pl">od</span> + Dopełniacz: <span class="pl">Biegam szybciej niż on. · Biegam szybciej od niego.</span></div>

    <h3>Частые наречия по смыслу</h3>
    <div class="scroll"><table class="vt">
      <tr><th>группа</th><th>вопрос</th><th>примеры</th></tr>
      ${ADV_LIST.map(a => `<tr><td class="w">${a[0]}</td><td style="color:var(--muted)">${a[1]}</td><td class="g">${a[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Не путать с прилагательным.</b> Наречие относится к глаголу и не склоняется: <span class="pl">On mówi dobrze</span> (наречие) vs <span class="pl">To jest dobry pomysł</span> (прилагательное, согласуется с существительным).</div>
  </div>`;
}
function renderPron(){
  $("#s-pron").innerHTML = `<div class="panel">
    <h2>Местоимения</h2>
    <h3>Личные</h3>
    <div class="scroll"><table>
      <tr><th>кто</th><th>кого / чего</th><th>кому</th><th>кого / что</th><th>кем</th><th>(о) ком</th></tr>
      ${PRON.map(r => `<tr><td class="w">${r[0]}</td><td class="g">${r[1]}</td><td class="g">${r[2]}</td><td class="g">${r[3]}</td><td class="g">${r[4]}</td><td class="g">${r[5]}</td></tr>`).join("")}
    </table></div>
    <ol class="pit" style="margin-top:14px">
      <li><b>Формы на n- ставятся только после предлога.</b> <span class="pl">Widzę go</span>, но <span class="pl">idę do niego</span>. <span class="pl">Mówię jej</span>, но <span class="pl">mówię o niej</span>. Это механическое правило, ошибок не даёт, если помнить о нём.</li>
      <li><b>Короткие формы <span class="pl">go, mu, cię, ci, mi</span> безударные.</b> Не ставятся в начало предложения и никогда после предлога. В начале - только длинные: <span class="pl">Mnie to nie interesuje</span>.</li>
      <li><b>Личное местоимение обычно опускается.</b> Окончание глагола уже содержит лицо: <span class="pl">idę</span>, а не <span class="pl">ja idę</span>. Постоянное <span class="pl">ja</span> звучит либо как нажим, либо как речь иностранца.</li>
      <li><b>Вежливое обращение - третье лицо.</b> <span class="pl">Czy pan ma paragon?</span> Форма на <span class="pl">ty</span> с незнакомым воспринимается как хамство, в отличие от русского, где «вы» - просто множественное.</li>
    </ol>
    <h3>ten / ta / to</h3>
    <div class="scroll"><table>
      <tr><th>падеж</th><th>муж.</th><th>жен.</th><th>ср.</th><th>мн. мужчины</th><th>мн. остальное</th></tr>
      <tr><td>Mianownik</td><td class="w">ten</td><td class="w">ta</td><td class="w">to</td><td class="g">ci</td><td class="g">te</td></tr>
      <tr><td>Dopełniacz</td><td class="w">tego</td><td class="w">tej</td><td class="w">tego</td><td class="g">tych</td><td class="g">tych</td></tr>
      <tr><td>Celownik</td><td class="w">temu</td><td class="w">tej</td><td class="w">temu</td><td class="g">tym</td><td class="g">tym</td></tr>
      <tr><td>Biernik</td><td class="w">ten / tego</td><td class="w">tę</td><td class="w">to</td><td class="g">tych</td><td class="g">te</td></tr>
      <tr><td>Narzędnik</td><td class="w">tym</td><td class="w">tą</td><td class="w">tym</td><td class="g">tymi</td><td class="g">tymi</td></tr>
      <tr><td>Miejscownik</td><td class="w">tym</td><td class="w">tej</td><td class="w">tym</td><td class="g">tych</td><td class="g">tych</td></tr>
    </table></div>
    <div class="tip"><b>tę или tą.</b> Литературная норма винительного - <span class="pl">tę kawę</span>. В живой речи повсеместно звучит <span class="pl">tą</span>, потому что совпадает с творительным. На письме держись <span class="pl">tę</span>.</div>
    <h3>Притяжательные</h3>
    <table>
      <tr><th>лицо</th><th>форма</th><th>склоняется</th></tr>
      <tr><td>ja</td><td class="w">mój / moja / moje</td><td>да, как прилагательное</td></tr>
      <tr><td>ty</td><td class="w">twój / twoja / twoje</td><td>да</td></tr>
      <tr><td>on / ono</td><td class="w">jego</td><td class="c">нет - форма одна</td></tr>
      <tr><td>ona</td><td class="w">jej</td><td class="c">нет</td></tr>
      <tr><td>my</td><td class="w">nasz / nasza / nasze</td><td>да</td></tr>
      <tr><td>wy</td><td class="w">wasz / wasza / wasze</td><td>да</td></tr>
      <tr><td>oni / one</td><td class="w">ich</td><td class="c">нет</td></tr>
    </table>
    <div class="tip"><b>Свой собственный: <span class="pl">swój</span>.</b> Если обладатель - подлежащее, поляк ставит <span class="pl">swój</span>: <span class="pl">Biorę swój bilet</span>. Правило то же, что с русским «свой», но в польском оно соблюдается строже, чем в русской разговорной речи.</div>
  </div>`;
}

function renderBridge(){
  $("#s-bridge").innerHTML = `<div class="panel">
    <h2>Фонетические соответствия</h2>
    <p class="lead">Работает на любом незнакомом слове.</p>
    <div class="scroll"><table><tr><th>русский</th><th>польский</th><th>примеры</th></tr>
      ${PHON.map(p => `<tr><td class="c">${p[0]}</td><td class="c">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}</table></div>
    <h3>Белорусский мост</h3>
    <p class="pl">kawa (кава) · herbata (гарбата) · dziękuję (дзякуй) · ciekawy (цікавы) · skarpetki (шкарпэткі) · szukać (шукаць) · rozmawiać (размаўляць) · ołówek (аловак) · rower (ровар)</p>
    <div class="tip"><b>ł - это ў.</b> <span class="pl">był</span> = «быў», <span class="pl">bułka</span> = «буўка». Звук уже в артикуляции с детства; русскоязычные ставят его месяцами. Проблема остаётся только на письме.</div>
    <h3>Ложные друзья</h3>
    <div class="scroll"><table><tr><th>слово</th><th>значит</th><th>не значит</th></tr>
      ${FALSE.map(f => `<tr><td class="w">${f[0]}</td><td>${f[1]}</td><td style="color:var(--muted)">${f[2]}</td></tr>`).join("")}</table></div>
  </div>`;
}

/* ============ НАВИГАЦИЯ И АДРЕС СТРАНИЦЫ ============ */
let curTab = TABS[0][0];

$("#nav").innerHTML = TABS.map((t,i) =>
  `<button role="tab" data-s="${t[0]}" aria-selected="${i===0}">${t[1]}</button>`).join("");

function showTab(id, scroll){
  if(!TABS.some(t => t[0] === id)) id = TABS[0][0];
  curTab = id;
  $("#nav").querySelectorAll("button").forEach(x => x.setAttribute("aria-selected", x.dataset.s === id));
  document.querySelectorAll(".sec").forEach(s => s.classList.toggle("on", s.id === id));
  const on = $("#nav button[aria-selected='true']");
  if(on && on.scrollIntoView) on.scrollIntoView({block:"nearest", inline:"nearest"});
  if(scroll !== false) window.scrollTo({top:0});
  updateNavArrows();
}

/* стрелки прокрутки меню: показываем только ту, за которой есть скрытые вкладки */
function updateNavArrows(){
  const n = $("#nav"), w = $("#navwrap");
  w.classList.toggle("can-l", n.scrollLeft > 2);
  w.classList.toggle("can-r", n.scrollLeft < n.scrollWidth - n.clientWidth - 2);
}
$("#nav").addEventListener("scroll", updateNavArrows, {passive:true});
window.addEventListener("resize", updateNavArrows);
$("#navl").onclick = () => $("#nav").scrollBy({left: -$("#nav").clientWidth * 0.6, behavior:"smooth"});
$("#navr").onclick = () => $("#nav").scrollBy({left:  $("#nav").clientWidth * 0.6, behavior:"smooth"});
updateNavArrows();

/* адрес вида #s-cases/dop/pl или #s-verbs/rekcja */
function hashFor(){
  if(curTab === "s-cases") return `#s-cases/${curCase}/${curNum}`;
  if(curTab === "s-verbs") return `#s-verbs/${curV}`;
  return `#${curTab}`;
}
let selfWrite = "";
function writeHash(){
  const h = hashFor();
  if(location.hash === h) return;
  selfWrite = h;
  history.replaceState(null, "", h);
}
function applyHash(){
  const parts = decodeURIComponent(location.hash.replace(/^#/, "")).split("/");
  const tab = parts[0];
  if(!tab) return;
  if(tab === "s-cases"){
    if(parts[1] && CASES.some(c => c.id === parts[1])) curCase = parts[1];
    if(parts[2] === "sg" || parts[2] === "pl") curNum = parts[2];
    renderChips(); renderCase();
  } else if(tab === "s-verbs"){
    if(parts[1] && VTABS.some(v => v[0] === parts[1])) curV = parts[1];
    renderVerbs();
  }
  showTab(tab);
}

$("#nav").querySelectorAll("button").forEach(b => b.onclick = () => {
  showTab(b.dataset.s);
  writeHash();
});
window.addEventListener("hashchange", () => {
  if(location.hash === selfWrite){ selfWrite = ""; return; }
  applyHash();
});

/* ============ ПОИСК ПО ВСЕМУ СПРАВОЧНИКУ ============ */
const LABEL = Object.fromEntries(TABS);
const VLABEL = Object.fromEntries(VTABS);
let INDEX = [];

/* текст узла: ячейки таблицы и части сетки склеиваем через разделитель, иначе слова слипаются */
const clean = s => s.replace(/\s+/g, " ").trim();
function nodeText(node){
  if(node.tagName === "TR")
    return clean([...node.children].map(td => clean(td.textContent)).filter(Boolean).join(" · "));
  if(node.parentElement && node.parentElement.classList.contains("ngrid"))
    return clean([...node.children].map(x => clean(x.textContent)).filter(Boolean).join(" "));
  return clean(node.textContent);
}

/* достаёт из готовой разметки поисковые строки: заголовок раздела + текст строки */
function harvest(html, entry){
  const box = document.createElement("div");
  box.innerHTML = html;
  let head = "";
  const walk = el => {
    for(const node of el.children){
      const tag = node.tagName;
      if(tag === "H2" || tag === "H3"){ head = node.textContent.trim(); continue; }
      if(tag === "TR" && node.querySelector("th")) continue;
      if(tag === "TR" || tag === "LI" || (tag === "DIV" && node.parentElement.classList.contains("ngrid"))){
        const text = nodeText(node);
        if(text.length > 1) INDEX.push({...entry, head, text, key: norm(text)});
        continue;
      }
      if((tag === "P" || tag === "DIV") && !node.children.length ||
         (tag === "DIV" && node.classList.contains("tip")) || tag === "P"){
        const text = nodeText(node);
        if(text.length > 2) INDEX.push({...entry, head, text, key: norm(text)});
        if(!node.querySelector("table, ul, ol")) continue;
      }
      if(node.children.length) walk(node);
    }
  };
  walk(box);
}

function buildIndex(){
  INDEX = [];
  /* обычные вкладки - берём то, что уже отрисовано в DOM */
  for(const [id, label] of TABS){
    if(id === "s-cases" || id === "s-verbs") continue;
    harvest($("#" + id).innerHTML, {tab:id, label});
  }
  /* падежи: все семь × два числа */
  for(const c of CASES)
    for(const num of ["sg","pl"])
      harvest(casePanelHTML(c, num),
        {tab:"s-cases", label:"Существительные", sub:`${c.name} · ${num==="sg"?"ед. ч.":"мн. ч."}`, cs:c.id, num});
  /* глаголы: все пять подвкладок */
  const VMAP = {conj:vConj, czasy:vCzasy, tryby:vTryby, formy:vFormy, rekcja:vRekcja};
  for(const key of Object.keys(VMAP))
    harvest(VMAP[key](), {tab:"s-verbs", label:"Глаголы", sub:VLABEL[key], vs:key});
  harvest(listHTML(""), {tab:"s-verbs", label:"Глаголы", sub:VLABEL.lista, vs:"lista"});
  /* дубли не нужны: у падежа общая часть одинакова в обоих числах - оставляем первое вхождение */
  const seen = new Set();
  INDEX = INDEX.filter(e => {
    const k = `${e.tab}|${e.cs || e.vs || ""}|${e.key}`;
    if(seen.has(k)) return false;
    seen.add(k); return true;
  });
}

const tokens = q => norm(q).split(/\s+/).filter(t => t.length > 0);

function search(q){
  const ts = tokens(q);
  if(!ts.length || (ts.length === 1 && ts[0].length < 2)) return [];
  const hits = [];
  for(const e of INDEX){
    let score = 0, ok = true;
    for(const t of ts){
      const at = e.key.indexOf(t);
      if(at < 0){ ok = false; break; }
      score += at;
    }
    if(!ok) continue;
    /* раньше в строке и короче строка - выше в выдаче */
    hits.push({e, score: score / ts.length + e.text.length / 40});
  }
  return hits.sort((a,b) => a.score - b.score).slice(0, 30).map(h => h.e);
}

/* подсветка: norm() не меняет длину строки, поэтому позиции совпадают с исходным текстом */
function mark(text, q){
  const key = norm(text), ranges = [];
  for(const t of tokens(q)){
    let at = key.indexOf(t);
    while(at >= 0){ ranges.push([at, at + t.length]); at = key.indexOf(t, at + t.length); }
  }
  if(!ranges.length) return text;
  ranges.sort((a,b) => a[0] - b[0]);
  const merged = [ranges[0]];
  for(const r of ranges.slice(1)){
    const last = merged[merged.length - 1];
    if(r[0] <= last[1]) last[1] = Math.max(last[1], r[1]); else merged.push(r);
  }
  let out = "", pos = 0;
  for(const [a,b] of merged){
    out += text.slice(pos, a) + "<mark>" + text.slice(a, b) + "</mark>";
    pos = b;
  }
  return out + text.slice(pos);
}

function renderResults(q){
  const box = $("#sres");
  const hits = search(q);
  if(!q.trim()){ box.classList.remove("on"); box.innerHTML = ""; return; }
  box.classList.add("on");
  if(!hits.length){ box.innerHTML = `<div class="snone">Ничего не нашлось</div>`; return; }
  box.innerHTML = hits.map((e,i) => `<button class="sr" data-i="${i}">
      <span class="sr-w">${e.label}${e.sub?` · ${e.sub}`:""}${e.head?` · ${e.head}`:""}</span>
      <span class="sr-t">${mark(e.text.length > 140 ? e.text.slice(0,140) + "…" : e.text, q)}</span>
    </button>`).join("");
  box.querySelectorAll(".sr").forEach(b => b.onclick = () => goTo(hits[+b.dataset.i]));
}

function goTo(e){
  if(e.tab === "s-cases"){
    curCase = e.cs; curNum = e.num;
    renderChips(); renderCase();
  } else if(e.tab === "s-verbs"){
    curV = e.vs; renderVerbs();
  }
  showTab(e.tab, false);
  writeHash();
  closeSearch();
  /* подсветить и промотать к найденной строке */
  const sec = $("#" + e.tab);
  sec.querySelectorAll(".hit").forEach(x => x.classList.remove("hit"));
  const target = [...sec.querySelectorAll("tr, li, p, .tip, .ngrid div")]
    .find(n => nodeText(n) === e.text);
  if(target){
    target.classList.add("hit");
    target.scrollIntoView({block:"center", behavior:"smooth"});
    setTimeout(() => target.classList.remove("hit"), 2600);
  } else {
    window.scrollTo({top:0});
  }
}

function closeSearch(){
  $("#sres").classList.remove("on");
  $("#gsearch").blur();
}

$("#gsearch").oninput = e => renderResults(e.target.value);
$("#gsearch").onfocus = e => { if(e.target.value) renderResults(e.target.value); };
$("#gsearch").onkeydown = e => {
  if(e.key === "Escape"){ e.target.value = ""; closeSearch(); }
  if(e.key === "Enter"){
    const first = $("#sres .sr");
    if(first) first.click();
  }
};
document.addEventListener("click", e => {
  if(!e.target.closest("#sbox")) $("#sres").classList.remove("on");
});
document.addEventListener("keydown", e => {
  if((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) &&
      document.activeElement !== $("#gsearch")){
    e.preventDefault();
    $("#gsearch").focus();
    $("#gsearch").select();
  }
});

/* ============ СТАРТ ============ */
renderAlpha(); renderChips(); renderCase(); renderAdj(); renderAdv(); renderPron(); renderQ(); renderVerbs();
renderNum(); renderNeg(); renderOrder(); renderImpers(); renderConj(); renderPart(); renderDim(); renderPreps(); renderBridge();
buildIndex();
if(location.hash) applyHash(); else writeHash();
