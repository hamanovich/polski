function renderConj(){
  $("#s-conj").innerHTML = `<div class="panel">
    <h2>Союзы</h2>
    <p class="lead">Не склоняются, но помогают увидеть границы частей предложения. Запятая в польском часто похожа на русскую, но её ставят по синтаксической границе, а не автоматически перед отдельным словом.</p>
    <div class="tip"><b>Главное правило запятой.</b> Придаточное обычно отделяется запятой: <span class="pl">Wiem, że on przyjdzie</span>; <span class="pl">Zostanę, jeśli będzie czas</span>. Но перед вторым <span class="pl">że</span> запятой нет, если союзы соединяют однородные придаточные: <span class="pl">Powiedział, że zadzwoni i że przyjdzie.</span> Перед простым соединительным <span class="pl">i</span> запятая обычно не нужна: <span class="pl">Poszedłem do sklepu i kupiłem chleb.</span></div>

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

    <h3>Из придаточного - в короткую конструкцию</h3>
    <p class="lead">Ту же мысль часто можно выразить без придаточного - через существительное или отглагольное существительное. Это особенно обычно в письменной и официальной речи.</p>
    <div class="scroll"><table class="vt">
      <tr><th>придаточное</th><th>короткая конструкция</th></tr>
      <tr><td class="w" style="white-space:normal">Kiedy wróciłem do domu, zadzwoniłem do Anny.</td><td class="g" style="white-space:normal">Po powrocie do domu zadzwoniłem do Anny.</td></tr>
      <tr><td class="w" style="white-space:normal">Po tym, jak podpisałem umowę, dostałem klucze.</td><td class="g" style="white-space:normal">Po podpisaniu umowy dostałem klucze.</td></tr>
      <tr><td class="w" style="white-space:normal">Zanim wyjdę, zamknę okna.</td><td class="g" style="white-space:normal">Przed wyjściem zamknę okna.</td></tr>
      <tr><td class="w" style="white-space:normal">Ponieważ padał deszcz, zostaliśmy w domu.</td><td class="g" style="white-space:normal">Z powodu deszczu zostaliśmy w domu.</td></tr>
      <tr><td class="w" style="white-space:normal">Mimo że był zmęczony, pracował dalej.</td><td class="g" style="white-space:normal">Mimo zmęczenia pracował dalej.</td></tr>
      <tr><td class="w" style="white-space:normal">Uczę się, żeby zdać egzamin.</td><td class="g" style="white-space:normal">Uczę się w celu zdania egzaminu. <span class="note">официально</span></td></tr>
    </table></div>
    <div class="tip"><b>Падеж задаёт новая конструкция.</b> <span class="pl">po + Miejscownik</span>: <span class="pl">po powrocie, po podpisaniu</span>; <span class="pl">przed + Narzędnik</span>: <span class="pl">przed wyjściem</span>; <span class="pl">z powodu, mimo, w celu + Dopełniacz</span>: <span class="pl">z powodu deszczu, mimo zmęczenia, w celu zdania</span>.</div>
    <div class="tip"><b>Проверь, кто выполняет действие.</b> При одном субъекте сокращение прямое: <span class="pl">Kiedy wróciłem, zadzwoniłem → Po powrocie zadzwoniłem</span>. Если субъекты разные, их нужно назвать: <span class="pl">Kiedy wróciłem, Anna zadzwoniła → Po moim powrocie Anna zadzwoniła</span>. Без <span class="pl">moim</span> смысл станет двусмысленным.</div>

    <h3>Косвенная речь</h3>
    <p class="lead">Главное здесь - то, чего <b>не</b> происходит: время не сдвигается. Польский сохраняет ту же форму, что была в прямой речи, ровно как русский.</p>
    <div class="scroll"><table class="vt">
      <tr><th>прямая речь</th><th>косвенная</th><th>что произошло</th></tr>
      ${MOWA_ZAL.map(m => `<tr><td class="w">${m[0]}</td><td class="g" style="white-space:normal">${m[1]}</td><td style="color:var(--muted);font-size:var(--fs-note);white-space:normal">${m[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Меняются только лицо и обстоятельства.</b> Местоимения и окончания глагола переходят на новое лицо, а слова «здесь и сейчас» сдвигаются: <span class="pl">jutro → następnego dnia</span>, <span class="pl">wczoraj → dzień wcześniej</span>, <span class="pl">tutaj → tam</span>, <span class="pl">teraz → wtedy</span>. Само время глагола остаётся тем же.</div>
    <div class="tip"><b>В косвенном вопросе - обычный порядок слов.</b> Сохраняется вопросительное слово или <span class="pl">czy</span>, а дальше фраза строится как утверждение: <span class="pl">Zapytał, gdzie mieszkam</span>. Никакой перестановки, как в английском, в польском нет и в прямом вопросе. Для вопросов «да/нет» вводится <span class="pl">czy</span>: <span class="pl">Nie wiem, czy przyjdzie</span>. Запятая перед <span class="pl">że, czy, gdzie, kiedy</span> - всегда.</div>
  </div>${topicPracticeHTML(CONJ_PRACTICE, "conjunction")}`;
}

function renderLudzie(){
  $("#s-ludzie").innerHTML = `<div class="panel">
    <h2>Люди: обращение, имена, национальности</h2>
    <p class="lead">Вежливое «вы» в польском - это третье лицо, а не второе множественное. Один этот сдвиг делает половину бытовых фраз непохожими на русские, и с него же начинается любой разговор с незнакомым.</p>

    <h3>pan · pani · państwo</h3>
    <div class="scroll"><table class="vt">
      <tr><th>падеж</th><th>pan</th><th>pani</th><th>państwo</th><th>panowie</th><th>panie</th></tr>
      ${PAN_DEKL.map(r => `<tr><td>${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td><td class="w">${r[3]}</td><td class="g">${r[4]}</td><td class="g">${r[5]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b><span class="pl">pani</span> почти не склоняется.</b> Одна форма на родительный, дательный и предложный: <span class="pl">dla pani, dziękuję pani, mówię o pani</span>. Отдельная форма есть только у винительного и творительного - <span class="pl">panią</span>. Парадигма редкая, и ошибку в ней слышно сразу.</div>

    <h3>Как это работает в речи</h3>
    <div class="scroll"><table class="vt">
      <tr><th>фраза</th><th>к кому</th><th>форма глагола</th></tr>
      ${PAN_USE.map(r => `<tr><td class="w">${r[0]}</td><td style="color:var(--muted)">${r[1]}</td><td style="font-size:var(--fs-note);white-space:normal">${r[2]}</td></tr>`).join("")}
    </table></div>
    <ol class="pit" style="margin-top:14px">
      <li><b>Глагол в третьем лице, а не во втором множественном.</b> <span class="pl">Czy pan ma czas?</span> - буквально «имеет ли пан время». Русское «вы» - это польское <span class="pl">wy</span>, и <span class="pl">wy</span> к незнакомому звучит как обращение к толпе или как хамство.</li>
      <li><b><span class="pl">państwo</span> - три разных слова.</b> Вежливое «вы» к смешанной компании (<span class="pl">Czy państwo są gotowi?</span>), «супруги» (<span class="pl">państwo Kowalscy</span>) и «государство» (средний род: <span class="pl">państwo polskie, w tym państwie</span>). Различает только контекст.</li>
      <li><b>Дистанция задаётся тем, что стоит после pan.</b> <span class="pl">Proszę pana</span> - незнакомый. <span class="pl">Panie Adamie</span> - знакомы, но на «вы». <span class="pl">Pan Kowalski</span> - официально и обычно о третьем лице, а не в лицо.</li>
      <li><b>На «ты» переходят по предложению, а не молча.</b> <span class="pl">Może przejdziemy na ty?</span> Предлагает старший по возрасту или по положению; самому перейти первым - невежливо.</li>
    </ol>

    <h3>Регистр и уважительное обращение</h3>
    <div class="tip"><b>Сначала выбирай безопасный вариант.</b> К незнакомому человеку - <span class="pl">pan / pani</span> и глагол в третьем лице: <span class="pl">Czy pani ma chwilę?</span> В публичном тексте предпочтительны <span class="pl">w Ukrainie / do Ukrainy</span>, хотя традиционные варианты с <span class="pl">na</span> тоже нормативны. В названиях профессий и уменьшительных нет одного обязательного выбора: учитывай регистр и известное предпочтение человека; в сомнении выбирай нейтральную, неуменьшительную форму.</div>

    <h3>Имена и фамилии: склонение</h3>
    <p class="lead">Мужские имена и фамилии склоняются обязательно - в том числе иностранные. Не склонить в письме или на конверте считается ошибкой.</p>
    <div class="scroll"><table class="vt">
      <tr><th>падеж</th><th>Adam Kowalski</th><th>Anna Kowalska</th><th>Kowalscy</th></tr>
      ${NAZW_DEKL.map(r => `<tr><td>${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td><td class="g">${r[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Типы фамилий</h3>
    <div class="scroll"><table class="vt">
      <tr><th>окончание</th><th>пример</th><th>мужчина</th><th>женщина</th><th>семья, супруги</th></tr>
      ${NAZW_TYP.map(r => `<tr><td class="c">${r[0]}</td><td class="w">${r[1]}</td><td class="g" style="white-space:normal">${r[2]}</td><td style="color:var(--muted);font-size:var(--fs-note);white-space:normal">${r[3]}</td><td class="w">${r[4]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Женская фамилия на согласную не склоняется никогда.</b> <span class="pl">pani Nowak · nie ma pani Nowak · dla pani Nowak · z panią Nowak</span> - форма одна на все падежи, падеж показывает только слово <span class="pl">pani</span>. У мужчины та же фамилия склоняется полностью: <span class="pl">pana Nowaka, panu Nowakowi</span>.</div>
    <div class="tip"><b>Фамилии на -ski ведут себя как прилагательные.</b> Значит, и род у них настоящий: <span class="pl">Kowalski / Kowalska</span>, а во множественном - мужско-личное <span class="pl">Kowalscy</span> (вся семья или супруги) против <span class="pl">Kowalskie</span> (только женщины). Отсюда и <span class="pl">państwo Kowalscy byli</span>, а не «były».</div>

    <h3>Страны, национальности, языки</h3>
    <div class="scroll"><table class="vt">
      <tr><th>страна</th><th>где</th><th>куда</th><th>он</th><th>она</th><th>язык</th></tr>
      ${KRAJE.map(k => `<tr><td class="w">${k[0]}</td><td class="g">${k[1]}</td><td class="g">${k[2]}</td><td class="w">${k[3]}</td><td class="w">${k[4]}</td><td class="w">${k[5]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b><span class="pl">w</span> или <span class="pl">na</span> - не всегда предсказуемо.</b> Традиционно говорят <span class="pl">na Litwie, na Białorusi, na Ukrainie, na Węgrzech, na Słowacji, na Łotwie</span> и <span class="pl">na Cyprze, na Malcie, na Islandii, na Kubie</span>. Для части названий существуют и варианты с <span class="pl">w / do</span>; их лучше учить вместе с названием страны. В остальных привычных случаях: <span class="pl">w Niemczech, w Czechach, we Włoszech</span>.</div>
    <div class="tip"><b>Украина и Беларусь - живая норма.</b> Обе пары правильны: <span class="pl">w Ukrainie / do Ukrainy</span> и <span class="pl">na Ukrainie / na Ukrainę</span>. Rada Języka Polskiego рекомендует особенно в публичной речи первую пару; вторая остаётся традиционной и нормативной. Аналогичная эволюция возможна с <span class="pl">Białoruś, Litwa, Łotwa, Słowacja</span> и <span class="pl">Węgry</span>.</div>

    <h3>Язык: четыре разные конструкции</h3>
    <div class="scroll"><table class="vt">
      <tr><th>фраза</th><th>форма</th><th>что значит</th></tr>
      ${JEZYK.map(j => `<tr><td class="w">${j[0]}</td><td class="c">${j[1]}</td><td style="color:var(--muted);white-space:normal">${j[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Название языка меняет форму вместе с конструкцией.</b> <span class="pl">po polsku</span> - наречие и не склоняется вообще, <span class="pl">polskiego</span> - родительный после <span class="pl">uczyć się</span>, <span class="pl">polski</span> - винительный после <span class="pl">znać</span>. Для «я учу польский» - <span class="pl">Uczę się polskiego.</span> <span class="pl">Uczę się po polsku</span> грамматично, но значит «я учусь на польском языке».</div>

    <h3>Женские формы профессий</h3>
    <p class="lead">Образуются от мужской формы суффиксом. Список открытый: новые формы появляются на глазах и не всегда успевают закрепиться.</p>
    <div class="scroll"><table class="vt">
      <tr><th>суффикс</th><th>когда</th><th>примеры</th></tr>
      ${FEMIN.map(f => `<tr><td class="c">${f[0]}</td><td style="color:var(--muted);white-space:normal">${f[1]}</td><td class="g" style="white-space:normal">${f[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Выбор зависит от контекста и предпочтения человека.</b> <span class="pl">Pani doktor, pani prezes, pani minister</span> широко употребляются, особенно в официальном обращении. Формы <span class="pl">doktorka, profesorka, ministra, gościni</span> тоже грамматичны и живы. Поэтому <span class="pl">u pani doktorki</span> не ошибка; если предпочтение человека известно, лучше следовать ему, а без такой информации в официальном контакте безопасна модель <span class="pl">pani + название должности</span>.</div>
    <div class="tip"><b>После <span class="pl">być</span> - творительный.</b> <span class="pl">Jestem lekarką. · Ona jest nauczycielką. · Chcę zostać tłumaczką.</span> Женская форма попадает в ту же ловушку, что и мужская, - вкладка «Существительные», Narzędnik.</div>
  </div>${topicPracticeHTML(PEOPLE_PRACTICE, "people")}`;
}

function renderDim(){
  $("#s-dim").innerHTML = `<div class="panel">
    <h2>Уменьшительные формы</h2>
    <p class="lead">В польском их используют гораздо шире, чем в русском - не только для «маленького», но и для тепла, сервисной вежливости, иронии или подчёркнутой близости.</p>
    <div class="tip"><b>Это не всегда про размер.</b> <span class="pl">Poproszę kawusię</span> в кафе не значит «маленькую чашечку» - это дружелюбный, смягчённый тон. Продавщица может предложить <span class="pl">bułeczkę</span> взрослому покупателю. Но в неподходящем контексте уменьшительное способно прозвучать иронично или слишком фамильярно.</div>

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
    <div class="tip"><b>Практический совет.</b> Услышал уменьшительное от продавца, официанта или коллеги - чаще всего это дружелюбный сервисный стиль, а не панибратство. Но не копируй его автоматически: с незнакомым человеком и в официальном тексте безопаснее нейтральная форма.</div>
  </div>${topicPracticeHTML(DIM_PRACTICE, "diminutive")}`;
}

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

function renderRod(){
  $("#s-rodz").innerHTML = `<div class="panel">
    <h2>Род существительного</h2>
    <p class="lead">Всё остальное в справочнике начинается отсюда: пока не знаешь, к какому роду отнести слово, таблицы падежей некуда приложить. Сам род почти всегда переносится из русского - работа в другом: мужской в польском делится на три.</p>
    <div class="tip"><b>Быстрая проверка согласования.</b> Сначала определи род по таблице ниже, затем поставь слово рядом с указательным: <span class="pl">ten stół</span> (мужской), <span class="pl">ta książka</span> (женский), <span class="pl">to okno</span> (средний). Во множественном числе проверь, группа ли это мужчин: <span class="pl">ci studenci</span>, но <span class="pl">te książki, te kobiety, te psy</span>. Форма <span class="pl">ci</span> означает только мужско-личное множественное; <span class="pl">te</span> - всё остальное.</div>

    <h3>Как определить род</h3>
    <div class="scroll"><table class="vt">
      <tr><th>род</th><th>признак</th><th>примеры</th><th>исключения</th></tr>
      ${ROD_ZNAK.map(r => `<tr><td class="w">${r[0]}</td><td class="c">${r[1]}</td><td class="w" style="white-space:normal">${r[2]}</td><td style="color:var(--muted);font-size:var(--fs-note);white-space:normal">${r[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Три мужских рода</h3>
    <p class="lead">В русском мужской род один, поэтому опоры нет никакой. В польском их три, и от выбора зависит винительный падеж, множественное число, указательное местоимение и форма прошедшего времени.</p>
    <div class="scroll"><table class="vt">
      <tr><th>подрод</th><th>кто это</th><th>Biernik ед.</th><th>Biernik мн.</th><th>Mianownik мн.</th><th>указат.</th><th>прош.</th></tr>
      ${ROD_M.map(r => `<tr><td class="c">${r[0]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${r[1]}</td><td class="g">${r[2]}</td><td class="g">${r[3]}</td><td class="g" style="white-space:normal">${r[4]}</td><td class="w">${r[5]}</td><td class="w">${r[6]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>m2 - класс грамматический, а не биологический.</b> Живое существо туда попадает почти всегда, но и часть неживого ведёт себя так же: <span class="pl">palę papierosa · jem hamburgera · tańczę poloneza · kupiłem opla · zjadłem banana</span>. Никакой логики в списке нет, и биология не помогает - надёжен только тест: если Biernik единственного совпадает с Dopełniacz, это m2. У части слов норма колеблется: <span class="pl">mam laptop</span> и разговорное <span class="pl">mam laptopa</span> оба встречаются.</div>

    <h3>Одна тройка слов на всю систему</h3>
    <p class="lead">Достаточно запомнить <span class="pl">student · pies · telefon</span> - и любую форму можно достроить по аналогии.</p>
    <div class="scroll"><table class="vt">
      <tr><th>m1 · student</th><th>m2 · pies</th><th>m3 · telefon</th><th>что показывает</th></tr>
      ${ROD_TEST.map(r => `<tr><td class="w">${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td><td style="color:var(--muted);font-size:var(--fs-note);white-space:normal">${r[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Род расходится с русским</h3>
    <p class="lead">Короткий список, но бьёт больно: род тянет за собой прилагательное, указательное и всю парадигму.</p>
    <div class="scroll"><table>
      <tr><th>слово</th><th>род</th><th>по-русски</th></tr>
      ${ROD_DIFF.map(r => `<tr><td class="w">${r[0]}</td><td class="c">${r[1]}</td><td style="color:var(--muted)">${r[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Проверка.</b> <span class="pl">ten problem</span>, не «ta problema». <span class="pl">ta metoda</span>, не «ten metod». Ошибка в роде здесь не одиночная - за ней сразу идут <span class="pl">tego problemu, tą metodą</span> и так далее по всей парадигме.</div>

    <h3>Подводные камни</h3>
    <ol class="pit">
      <li><b>Мужские на -a - единственная группа, где окончание врёт.</b> <span class="pl">mężczyzna, kolega, kierowca, turysta, poeta</span> склоняются по женскому образцу, а согласуются по мужскому: <span class="pl">ten dobry kolega</span>. Во множественном идут в m1: <span class="pl">ci dobrzy koledzy</span>.</li>
      <li><b>Одушевлённость и m1 - разные вещи.</b> <span class="pl">pies</span> живой, но не мужско-личный: в единственном ведёт себя как m1 (<span class="pl">widzę psa</span>), во множественном - как m3 (<span class="pl">widzę psy</span>). Граница переезжает между числами, и это самая частая ошибка на B1.</li>
      <li><b>Достаточно одного мужчины.</b> <span class="pl">Anna, Ewa i Piotr przyszli</span> - вся группа становится мужско-личной, даже если мужчина один из десяти. Без него - <span class="pl">przyszły</span>.</li>
      <li><b>dzieci - не m1, хотя это люди.</b> <span class="pl">te dzieci, dzieci były, widzę dzieci</span>. То же с <span class="pl">niemowlęta</span> и вообще со всем средним родом.</li>
      <li><b>Слова только во множественном рода не имеют.</b> <span class="pl">drzwi, spodnie, okulary, nożyczki, urodziny, wakacje, pieniądze</span> - все не-мужско-личные: <span class="pl">drzwi były otwarte</span>. Но <span class="pl">rodzice, ludzie, państwo</span> - мужско-личные: <span class="pl">rodzice byli</span>.</li>
      <li><b>Слова на -um среднего рода и в единственном не склоняются.</b> <span class="pl">muzeum, w muzeum, do muzeum</span> - одна форма на все падежи. Во множественном склоняются нормально: <span class="pl">muzea, muzeów, w muzeach</span>.</li>
    </ol>
  </div>${topicPracticeHTML(ROD_PRACTICE, "gender")}`;
}

function renderAlt(){
  $("#s-alt").innerHTML = `<div class="panel">
    <h2>Чередования: сводная карта</h2>
    <p class="lead">Окончание часто меняет последний звук основы. Эта таблица нужна как карта: найди знакомую пару, а затем переходи к разделу, где показано точное условие.</p>
    <div class="tip"><b>Не применяй чередование автоматически.</b> Одна и та же буква ведёт себя по-разному в разных словах и формах: <span class="pl">róg → rogu</span>, но <span class="pl">król → królu</span>; <span class="pl">Polak → Polacy</span>, но <span class="pl">Polaka</span>. Сначала выбери падеж или форму глагола, потом меняй основу.</div>

    <h3>Гласные</h3>
    <div class="scroll"><table class="vt">
      <tr><th>чередование</th><th>где встречается</th><th>примеры</th></tr>
      <tr><td class="c">ó ↔ o</td><td style="white-space:normal">при склонении и в родственных формах</td><td class="w" style="white-space:normal">róg → rogu · samochód → samochodu · stół → stole</td></tr>
      <tr><td class="c">ą ↔ ę</td><td style="white-space:normal">при склонении существительных и в отдельных глагольных формах</td><td class="w" style="white-space:normal">mąż → męża · ząb → zęby · zacząć → zaczęła</td></tr>
      <tr><td class="c">e ↔ a</td><td style="white-space:normal">в прошедшем времени у части глаголов на -eć</td><td class="w" style="white-space:normal">musieć → musiał · musiała, но musieli</td></tr>
      <tr><td class="c">o ↔ ó</td><td style="white-space:normal">в мужской форме прошедшего времени у отдельных глаголов</td><td class="w" style="white-space:normal">móc → mógł · nieść → niósł, но mogła · niosła</td></tr>
    </table></div>

    <h3>Согласные перед окончанием</h3>
    <div class="scroll"><table class="vt">
      <tr><th>чередование</th><th>типичное место</th><th>примеры</th></tr>
      <tr><td class="c">r → rz</td><td style="white-space:normal">Miejscownik на -e</td><td class="w" style="white-space:normal">komputer → komputerze · teatr → teatrze</td></tr>
      <tr><td class="c">k → c</td><td style="white-space:normal">Miejscownik на -e</td><td class="w" style="white-space:normal">apteka → aptece · ręka → ręce</td></tr>
      <tr><td class="c">k → c + y</td><td style="white-space:normal">мужско-личное множественное</td><td class="w" style="white-space:normal">Polak → Polacy · kierownik → kierownicy</td></tr>
      <tr><td class="c">g → dz · ch → sz</td><td style="white-space:normal">Miejscownik на -e</td><td class="w" style="white-space:normal">droga → drodze · mucha → musze</td></tr>
      <tr><td class="c">t → ci · d → dzi</td><td style="white-space:normal">перед мягким окончанием</td><td class="w" style="white-space:normal">brat → bracie · woda → wodzie · student → studenci</td></tr>
      <tr><td class="c">ł → l</td><td style="white-space:normal">Miejscownik на -e</td><td class="w" style="white-space:normal">szkoła → szkole · stół → stole</td></tr>
    </table></div>

    <h3>Где смотреть подробности</h3>
    <ul class="related-links">
      <li><a href="#s-cases/miej/sg/~чередования-перед-e">Miejscownik: согласные перед -e</a> - полная таблица и развилка <span class="pl">-e / -u</span>.</li>
      <li><a href="#s-cases/mian/pl">Mianownik множественного</a> - мужско-личные формы <span class="pl">Polak → Polacy, student → studenci</span>.</li>
      <li><a href="#s-verbs/conj/~чередования-в-основе">Спряжения: изменения основы</a> - <span class="pl">pisać → piszę, móc → możesz</span> и другие модели.</li>
      <li><a href="#s-verbs/czasy/~чередования-в-прошедшем">Прошедшее время</a> - <span class="pl">musiał, zaczęła, mógł</span>.</li>
    </ul>
  </div>${topicPracticeHTML(ALT_PRACTICE, "alternation")}`;
}

function renderAlpha(){
  $("#s-alpha").innerHTML = `<div class="panel">
    <h2>Алфавит и произношение</h2>
    <p class="lead">32 буквы, читаются почти всегда так, как пишутся. Сложность не в буквах, а в девяти особых и десятке диграфов.</p>
    <div class="tip"><b>Нет букв Q, V, X.</b> В освоенных заимствованиях на их месте пишут <span class="pl">kw, w, ks</span>: <span class="pl">kwadrat · akwarium · likwidacja</span> · <span class="pl">wideo · willa · wiza</span> · <span class="pl">tekst · maksimum · ekspres</span>. Иностранные имена и бренды сохраняют оригинал: <span class="pl">weekend, Volvo</span>. Замена не всегда побеждает: <span class="pl">quiz</span> и <span class="pl">kwiz</span> сосуществуют, и первое сегодня встречается чаще.</div>

    <h3>Обычные буквы - на что обратить внимание</h3>
    ${ngrid(ABASE.map(a => [a[0], a[1]]))}

    <h3>Девять особых букв</h3>
    <div class="scroll"><table class="vt">
      <tr><th>буква</th><th>звук</th><th>как произносится</th><th>примеры</th></tr>
      ${ADIAC.map(a => `<tr><td class="g" style="font-size:var(--fs-h2)">${a[0]}</td><td style="color:var(--muted)">${a[1]}</td><td>${a[2]}</td><td class="w">${a[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Диграфы: два знака - один звук</h3>
    <div class="scroll"><table class="vt">
      <tr><th>диграф</th><th>звук</th><th>примеры</th></tr>
      ${DIGR.map(d => `<tr><td class="g" style="font-size:var(--fs-lead)">${d[0]}</td><td style="color:var(--muted)">${d[1]}</td><td class="w">${d[2]}</td></tr>`).join("")}
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

    <h3>Звонкие и глухие</h3>
    <p class="lead">Пары те же, что в русском, и правило то же - но написание их не показывает никогда. Слово пишется как есть, а читается по позиции.</p>
    <div class="scroll"><table class="vt">
      <tr><th>звонкий</th><th>глухой</th><th>пример</th></tr>
      ${DZW_PARY.map(d => `<tr><td class="c">${d[0]}</td><td class="c">${d[1]}</td><td class="w">${d[2]}</td></tr>`).join("")}
    </table></div>
    <div class="scroll"><table class="vt" style="margin-top:14px">
      <tr><th>где</th><th>что происходит</th><th>примеры</th></tr>
      ${DZW_RULES.map(d => `<tr><td class="w">${d[0]}</td><td style="color:var(--muted)">${d[1]}</td><td class="g" style="white-space:normal">${d[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>prz-, trz-, krz- звучат как [пш-], [тш-], [кш-].</b> После глухой согласной <span class="pl">rz</span> оглушается в <span class="pl">sz</span>: <span class="pl">przepraszam</span> [пшепрашам] · <span class="pl">przez</span> [пшес] · <span class="pl">trzy</span> [тшы] · <span class="pl">krzesło</span> [кшэсўо] · <span class="pl">chrzan</span> [хшан]. Это самое частое расхождение написания и звука во всём языке - и начинаются с этих сочетаний десятки бытовых слов.</div>
    <div class="tip"><b>Русский здесь помогает целиком.</b> «Хлеб» → [хлеп], «лодка» → [лотка], «сделать» → [зделать] - механизм тот же, переносится без переучивания. Единственная новая работа - не дать оглушению попасть на письмо: пишем <span class="pl">chleb, nóż, weź</span>, даже когда слышим глухой.</div>

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

    <h3>Прописная буква</h3>
    <p class="lead">С 1 января 2026 года часть правил изменилась - ниже действующая норма. Расхождение с русским остаётся в одном месте, и оно частотное.</p>
    <div class="scroll"><table class="vt">
      <tr><th>с большой</th><th>примеры</th></tr>
      ${WIELKA_D.map(w => `<tr><td class="w" style="white-space:normal">${w[0]}</td><td class="g" style="white-space:normal">${w[1]}</td></tr>`).join("")}
    </table></div>
    <div class="scroll"><table class="vt" style="margin-top:14px">
      <tr><th>с маленькой</th><th>примеры</th></tr>
      ${WIELKA_M.map(w => `<tr><td class="w" style="white-space:normal">${w[0]}</td><td class="g" style="white-space:normal">${w[1]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Главная ловушка: <span class="pl">Polak</span> с большой, <span class="pl">polski</span> и <span class="pl">po polsku</span> с маленькой.</b> В русском «поляк» с маленькой, «польский» тоже - то есть расходится только существительное. <span class="pl">Jestem Polakiem, mówię po polsku</span>: в одной фразе обе буквы разные.</div>
    <div class="tip"><b>Что изменилось с 1 января 2026.</b> Жители городов, районов и деревень теперь пишутся <b>с большой</b>: <span class="pl">Warszawianin, Mokotowianin, Zakopianin</span> - раньше было с маленькой. Родовое слово в названиях городских объектов тоже поднялось: <span class="pl">Plac Zbawiciela, Aleja Róż, Park Kościuszki</span>. Единственное исключение - <span class="pl">ulica</span>, она осталась строчной: <span class="pl">ulica Długa</span>. В книгах и вывесках, изданных раньше, встретится старое написание.</div>
    <div class="tip"><b><span class="pl">Pan / Pani / Państwo</span> с большой только в переписке.</b> <span class="pl">Szanowna Pani, dziękuję Pani za wiadomość</span> - это вежливость, а не правило орфографии. В обычном тексте с маленькой: <span class="pl">ten pan czeka od godziny</span>. То же с <span class="pl">Ty, Ciebie, Tobie, Wasz</span> в письме.</div>
  </div>${topicPracticeHTML(ALPHA_PRACTICE, "alphabet")}`;
}

let curCase = "mian", curNum = "sg";
const NUMS = [["sg","единственное"],["pl","множественное"]];

function renderNumTog(){
  $("#numtog").innerHTML = NUMS.map(([n, label]) =>
    `<button type="button" data-n="${n}" aria-pressed="${n===curNum}">${label}</button>`).join("");
  $("#numtog").querySelectorAll("button").forEach(b =>
    b.onclick = () => { curNum = b.dataset.n; renderNumTog(); renderCase(); writeHash(); });
}
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
    ${board(rows)}
    ${curNum === "pl" && PLX[c.id] ? PLX[c.id] : ""}
    ${c.agree?`<h3>Вся группа целиком</h3>
      <p class="lead">Прилагательное и указательное меняются вместе с существительным.</p>
      <table><tr><th>именительный</th><th>${c.ru.toLowerCase()}</th></tr>
      ${c.agree.map(a => `<tr><td class="w">${a[0]}</td><td class="g">${a[1]}</td></tr>`).join("")}</table>`:""}
    ${c.alt?`<h3>Чередования перед -e</h3><div class="scroll"><table><tr><th>было</th><th>стало</th><th>пример</th></tr>
      ${c.alt.map(a => `<tr><td class="c">${a[0]}</td><td class="c">${a[1]}</td><td class="w">${a[2]}</td></tr>`).join("")}</table></div>`:""}
    ${c.exc?`<h3>Исключения и особые формы</h3><table>
      ${c.exc.map(e => `<tr><td class="w" style="width:34%">${e[0]}</td><td class="g" style="width:33%">${e[1]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${e[2]||""}</td></tr>`).join("")}</table>`:""}
    ${c.pit?`<h3>Подводные камни</h3><ol class="pit">${c.pit.map(x => `<li>${x}</li>`).join("")}</ol>`:""}
    ${c.sent?`<h3>Примеры в предложениях</h3><ul class="sent">${c.sent.map(x => `<li><span class="p">${x[0]}</span><span class="r">${x[1]}</span></li>`).join("")}</ul>`:""}
    <h3>Итог по падежу</h3>
    <div class="tip">${c.trap}</div>`;
}

function exerciseAnswersAttr(answers){
  return encodeURIComponent(JSON.stringify(answers));
}
function exerciseControlHTML(control, key){
  const answers = exerciseAnswersAttr(control.answers);
  const label = control.label || "Ответ";
  if(control.options){
    return `<span class="exercise-field"><select class="exercise-control" data-key="${key}" data-answers="${answers}" aria-label="${label}">
      <option value="">выбрать</option>${control.options.map(option => `<option value="${option}">${option}</option>`).join("")}
    </select></span>`;
  }
  const width = Math.max(5, Math.min(16, Math.max(...control.answers.map(answer => answer.length)) + 2));
  return `<span class="exercise-field"><input class="exercise-control" data-key="${key}" data-answers="${answers}"
    aria-label="${label}" autocomplete="off" autocapitalize="none" spellcheck="false" size="${width}">
    ${control.hint ? `<span class="exercise-lemma" aria-hidden="true">(${control.hint})</span>` : ""}</span>`;
}
function exerciseTaskHTML(task, number, testMode = false){
  let body;
  if(task.passage){
    body = `<p class="exercise-sentence exercise-passage">${task.passage.map(part => typeof part === "string"
      ? part : exerciseControlHTML(part, `${task.id}-${part.key}`)).join("")}</p>`;
  }else{
    const control = exerciseControlHTML(task, task.id);
    const question = task.prompt.includes("___")
      ? task.prompt.replace("___", control)
      : `${task.prompt} ${control}`;
    body = `<p class="exercise-sentence">${question}</p>`;
  }
  return `<fieldset class="exercise-item" data-exercise-id="${task.id}">
    <legend><span>${number}</span>${task.passage ? task.prompt : "Выберите или впишите форму"}</legend>
    ${body}
    <div class="exercise-feedback" role="status" aria-live="polite" hidden></div>
    ${testMode ? "" : `<div class="exercise-item-actions">
      <button type="button" class="exercise-button" data-action="check-item">Проверить</button>
      <button type="button" class="exercise-link" data-action="reveal-item">Показать ответ</button>
    </div>`}
    <p class="exercise-explanation" hidden>${task.explanation}</p>
  </fieldset>`;
}
function practiceAnswerCount(practice){
  return practice.tasks.reduce((total, task) => total + (task.passage
    ? task.passage.filter(part => typeof part !== "string").length : 1), 0);
}
function casePracticeHTML(practice, on = false){
  return `<section class="practice panel content-variant case-practice-variant${on ? " on" : ""}" data-case="${practice.id}">
    <div class="practice-heading">
      <div><p class="practice-kicker">Практика · ${practice.tasks.length} заданий · ${practiceAnswerCount(practice)} пропусков</p><h2>${practice.title}</h2></div>
      <div class="exercise-progress" aria-live="polite">0 из ${practice.tasks.length} заданий</div>
    </div>
    <p class="lead">${practice.lead}</p>
    <div class="exercise-list">${practice.tasks.map((task, index) => exerciseTaskHTML(task, index + 1)).join("")}</div>
    <div class="practice-actions"><button type="button" class="exercise-link" data-action="reset-practice">Начать заново</button></div>
  </section>`;
}
function topicPracticeHTML(practice, topic){
  return `<section class="practice panel ${topic}-practice" data-practice="${practice.id}">
    <div class="practice-heading">
      <div><p class="practice-kicker">Практика · ${practice.tasks.length} заданий · ${practiceAnswerCount(practice)} пропусков</p><h2>${practice.title}</h2></div>
      <div class="exercise-progress" aria-live="polite">0 из ${practice.tasks.length} заданий</div>
    </div>
    <p class="lead">${practice.lead}</p>
    <div class="exercise-list">${practice.tasks.map((task, index) => exerciseTaskHTML(task, index + 1)).join("")}</div>
    <div class="practice-actions"><button type="button" class="exercise-link" data-action="reset-practice">Начать заново</button></div>
  </section>`;
}
function exerciseTestHTML(test, id, extraClass = ""){
  return `<section class="practice panel exercise-test ${extraClass}" data-test="${id}">
    <div class="practice-heading">
      <div><p class="practice-kicker">Проверка без подсказок</p><h2>${test.title}</h2></div>
      <output class="test-score" aria-live="polite"></output>
    </div>
    <p class="lead">${test.lead}</p>
    <div class="exercise-list exercise-test-list">${test.tasks.map((task, index) => exerciseTaskHTML(task, index + 1, true)).join("")}</div>
    <div class="practice-actions">
      <button type="button" class="exercise-button" data-action="check-test">Проверить тест</button>
      <button type="button" class="exercise-link" data-action="reset-test">Начать заново</button>
    </div>
  </section>`;
}
function caseTestHTML(){ return exerciseTestHTML(CASE_TEST, "cases", "case-test"); }
function renderCasePractice(){
  const practice = CASE_PRACTICE.find(item => item.id === curCase) || CASE_PRACTICE[0];
  $("#casePractice").innerHTML = casePracticeHTML(practice, true);
  $("#caseTest").innerHTML = caseTestHTML();
}
function renderCase(){
  $("#casePanel").innerHTML = casePanelHTML(CASES.find(x => x.id === curCase), curNum);
  linkHeadings($("#casePanel"));
  renderCasePractice();
}

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
    <p class="lead">Тип определяется парой форм «я» и «ты»: <span class="pl">-ę/-esz</span>, <span class="pl">-ę/-isz</span>, <span class="pl">-am/-asz</span>, <span class="pl">-em/-esz</span>. Знаешь пару - знаешь всю парадигму.</p>
    <div class="tip"><b>Одной формы «ты» не хватает.</b> I и IV спряжения дают одинаковое <span class="pl">-esz</span>: <span class="pl">piszesz</span> и <span class="pl">jesz</span>. Различает их «я»: <span class="pl">piszę</span> против <span class="pl">jem</span>. Поэтому смотреть надо на пару. «Я» кончается на <span class="pl">-ę</span> у I и II, на <span class="pl">-am</span> у III (это большая продуктивная группа, а не исключения) и на <span class="pl">-em</span> у IV - там закрытый список из пяти глаголов.</div>

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

    <h3>-ować и часть глаголов на -ywać / -iwać → -uj-</h3>
    <p>У большинства глаголов на <b>-ować</b> и у части глаголов на <b>-ywać / -iwać</b> отбрасываем окончание, ставим <b>-uj-</b>, дальше окончания I спряжения.</p>
    <div class="scroll"><table class="vt">
      <tr><th>pracować<span class="tr">работать</span></th>${PERS.map(p => `<th>${p}</th>`).join("")}</tr>
      <tr><td class="note"></td>${["pracuję","pracujesz","pracuje","pracujemy","pracujecie","pracują"].map((f,i) => `<td class="f">${vform(f,"I",i)}</td>`).join("")}</tr>
    </table></div>
    <p class="pl" style="margin-top:10px">kupować → kupuję · studiować → studiuję · gotować → gotuję · dziękować → dziękuję · fotografować → fotografuję · wychowywać → wychowuję · pokazywać → pokazuję · zapisywać → zapisuję</p>
    <div class="tip">Не все глаголы с похожим окончанием идут по этой модели: <span class="pl">bywać → bywam, zdobywać → zdobywam, przeżywać → przeżywam</span>. <span class="pl">chować → chowam, chowasz</span> тоже относится к III спряжению.</div>

    <h3>Глаголы на -nąć</h3>
    <p>Настоящее (или простое будущее, если вид совершенный) - по I спряжению: <span class="pl">zamknę, zamkniesz, zamknie, zamkniemy, zamkniecie, zamkną</span>.</p>
    <div class="scroll"><table>
      <tr><th>тип</th><th>прошедшее</th><th>пример</th></tr>
      <tr><td>-ną- остаётся (ą → ę)</td><td class="c">zamknął / zamknęła</td><td class="w">zamknąć, ciągnąć, krzyknąć, zniknąć</td></tr>
      <tr><td>-ną- выпадает</td><td class="c">rósł / rosła / rośli</td><td class="w">rosnąć, marznąć</td></tr>
      <tr><td>две формы</td><td class="c">niknął = nikł</td><td class="w">niknąć, więdnąć</td></tr>
    </table></div>
    <p class="lead">Вид не предсказывает форму: <span class="pl">ciągnąć</span> несовершенный, но <span class="pl">ciągnął</span>; <span class="pl">zniknąć</span> совершенный, но <span class="pl">zniknął</span>. Форму прошедшего времени у таких глаголов нужно запоминать вместе с инфинитивом.</p>

    <h3>Чередования в основе</h3>
    <div class="scroll"><table>
      <tr><th>было</th><th>стало</th><th>где</th></tr>
      ${KALT.map(a => `<tr><td class="c">${a[0]}</td><td class="w">${a[1]}</td><td class="g">${a[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Важно.</b> Таблица показывает частые модели, а не одно правило для всех спряжений. У многих глаголов II спряжения чередование видно в <b>ja</b> и <b>oni</b>: <span class="pl">proszę / proszą</span>, но <span class="pl">prosisz, prosi, prosimy, prosicie</span>. У глаголов I спряжения распределение другое: <span class="pl">piszę, piszesz, piszą</span>; <span class="pl">jadę, jedziesz, jadą</span>. Учи форму <b>ja</b>, форму <b>ty</b> и форму <b>oni</b> как модель конкретного глагола.</div>

    <h3>być - отдельная песня</h3>
    <div class="scroll"><table class="vt">
      <tr><th>być<span class="tr">быть</span></th>${PERS.map(p => `<th>${p}</th>`).join("")}</tr>
      <tr><td class="note">настоящее</td>${["jestem","jesteś","jest","jesteśmy","jesteście","są"].map(f => `<td class="f"><span class="stem">${f}</span></td>`).join("")}</tr>
      <tr><td class="note">будущее</td>${["będę","będziesz","będzie","będziemy","będziecie","będą"].map(f => `<td class="f"><span class="stem">${f}</span></td>`).join("")}</tr>
    </table></div>

    <h3>Модальные</h3>
    <p class="pl">muszę (должен) · mogę (могу) · chcę (хочу) · umiem (умею) · potrafię (в состоянии)</p>
    <p class="lead"><span class="pl">trzeba, można, wolno, warto, należy</span> - безличные, лица не имеют: <span class="pl">trzeba iść, można wejść, nie wolno palić</span>. Прошедшее - с <span class="pl">było</span>: <span class="pl">trzeba było iść</span>.</p>
    <p class="lead" style="margin-top:6px"><span class="pl">powinienem / powinnam</span> - «следует, надо бы». Не спрягается ни по одному из четырёх типов: форма зависит от рода, как в прошедшем времени. Полная парадигма и разбор <span class="pl">musieć / powinien / trzeba</span> - во вкладке «Наклонения».</p>
    <div class="tip"><b>znać или wiedzieć.</b> Критерий не «объект или факт», а конструкция. <span class="pl">znać</span> + существительное, называющее конкретный объект, в Bierniku - даже если это информация: <span class="pl">Znam pana Kowalskiego · Znam polski · Znam adres · Znam odpowiedź.</span> Под отрицанием этот Biernik, как обычно, уходит в Dopełniacz: <span class="pl">Nie znam drogi, nie znam adresu.</span> <span class="pl">wiedzieć</span> - с придаточным (<span class="pl">że, gdzie, kiedy, czy</span>) или с <span class="pl">o + Miejscownik</span>: <span class="pl">Wiem, że przyjdzie · Nie wiem, gdzie on jest · Wiem o tym.</span> Сказать <span class="bad">wiem adres</span> нельзя - объект назван, значит <span class="pl">znać</span>.</div>
    <div class="tip"><b>Стык: to, coś, nic, wszystko.</b> Эти местоимения формально стоят на месте прямого дополнения, но идут с <span class="pl">wiedzieć</span>: <span class="pl">Wiem to · Nic nie wiem · Wiem wszystko · Skąd to wiesz?</span> Они не называют объект, а заменяют придаточное - «знаю то, что…». Проверка на границе: <span class="pl">Znam tę odpowiedź</span> (ответ назван) - <span class="pl">znać</span>; <span class="pl">Wiem to</span> (отсылка вместо называния) - <span class="pl">wiedzieć</span>.</div>
  </div>`;
}

function vCzasy(){
  return `<div class="panel">
    <h2>Времена и вид</h2>
    <p class="lead">Времён три, но выбор формы начинается с вида глагола. Сначала вид - потом время.</p>
    <div class="tip"><b>Главное правило.</b> У совершенного вида <b>нет настоящего времени</b>. <span class="pl">zrobię</span> - это «сделаю», а не «делаю». Настоящее возможно только у несовершенного: <span class="pl">robię</span>.</div>

    <h3>Как образуется вид</h3>
    <p class="lead">Список пар ниже проще запоминать, если видеть механизм. Но приставка или суффикс не гарантируют нужную пару: значение и вид всегда проверяй по словарю.</p>
    <div class="scroll"><table class="vt">
      <tr><th>способ</th><th>что делает</th><th>примеры</th></tr>
      ${ASPEKT_JAK.map(a => `<tr><td class="c">${a[0]}</td><td style="color:var(--muted);white-space:normal">${a[1]}</td><td class="g" style="white-space:normal">${a[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Приставка меняет не только вид.</b> <span class="pl">pisać → napisać</span> - тот же смысл, только законченный. Но <span class="pl">pisać → podpisać</span> (подписать), <span class="pl">przepisać</span> (переписать), <span class="pl">zapisać</span> (записать), <span class="pl">wypisać</span> (выписать) - это уже другие глаголы. «Чистая» приставка, которая меняет только вид, у каждого глагола своя, и её учат вместе со словом.</div>
    <div class="tip"><b>Цепочка работает в обе стороны.</b> <span class="pl">pisać</span> (несов.) → <span class="pl">podpisać</span> (сов., новое значение) → <span class="pl">podpisywać</span> (несов. от нового значения). Приставка даёт совершенный вид, суффикс возвращает несовершенный. Так устроена почти вся глагольная лексика: <span class="pl">czytać → przeczytać</span>, но <span class="pl">czytać → odczytać → odczytywać</span>.</div>

    <h3>Вид не генерируется механически</h3>
    <div class="tip"><b>Запоминай не приставку, а цепочку.</b> Сначала проверь словарную пару: <span class="pl">czytać → przeczytać</span>. Если приставка создаёт новое значение, это уже новое слово: <span class="pl">pisać → podpisać</span>. Для такого совершенного глагола при необходимости учи и вторичный несовершенный: <span class="pl">podpisać → podpisywać</span>. В записи слова полезно держать сразу три пометы: значение, вид и управление.</div>

    <h3>Вид: пары глаголов</h3>
    <div class="scroll"><table>
      <tr><th>несовершенный</th><th>совершенный</th><th>перевод</th></tr>
      ${ASPECT.map(a => `<tr><td class="w">${a[0]}</td><td class="g">${a[1]}</td><td style="color:var(--muted)">${a[2]}</td></tr>`).join("")}
    </table></div>

    <h3>Как выбрать вид</h3>
    <p class="lead">Образовать пару - полдела. Дальше каждый раз надо решать, какую половину брать. Русская интуиция здесь часто помогает, но пары и управление лучше сверять, особенно у приставочных глаголов.</p>
    <div class="scroll"><table class="vt">
      <tr><th>что говорим</th><th>вид</th><th>пример</th></tr>
      ${WYBOR.map(w => `<tr><td class="w" style="white-space:normal">${w[0]}</td><td class="c">${w[1]}</td><td class="g" style="white-space:normal">${w[2]}</td></tr>`).join("")}
    </table></div>
    <div class="scroll"><table class="vt" style="margin-top:14px">
      <tr><th>слова-маркеры</th><th>какие</th></tr>
      ${WYBOR_SLOWA.map(w => `<tr><td class="w">${w[0]}</td><td class="g" style="white-space:normal">${w[1]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Единственная настоящая ловушка - настоящее время.</b> Русское «я делаю» нельзя перевести совершенным: <span class="bad">zrobię</span> значит «сделаю». Если действие происходит сейчас, вид только несовершенный, без вариантов: <span class="pl">robię, czytam, piszę</span>.</div>
    <div class="tip"><b><span class="pl">przez godzinę</span> и <span class="pl">w godzinę</span> - не одно и то же.</b> <span class="pl">Czytałem przez godzinę</span> - час читал, дочитал или нет, неизвестно. <span class="pl">Przeczytałem to w godzinę</span> - уложился за час и закончил. В русском это тоже две разные конструкции: «читал час» и «прочитал за час». Различие несёт предлог: <span class="pl">przez</span> + Biernik - сколько длилось, <span class="pl">w</span> + Biernik - за какой срок уложился, а вид просто согласуется. Подробнее - «Отрезки времени» во вкладке «Числительные».</div>

    <h3>Сетка: какой вид в каком времени</h3>
    <div class="scroll"><table>
      <tr><th></th><th>несовершенный</th><th>совершенный</th></tr>
      <tr><td>прошедшее</td><td class="w">robiłem</td><td class="g">zrobiłem</td></tr>
      <tr><td>настоящее</td><td class="w">robię</td><td style="color:var(--muted)">нет</td></tr>
      <tr><td>будущее</td><td class="w">będę robić / robił</td><td class="g">zrobię</td></tr>
    </table></div>

    <h3>Прошедшее время</h3>
    <p>Основа: инфинитив минус <b>-ć</b>, дальше <b>-ł-</b> и окончание рода и лица. В единственном числе род есть и в русском («я делал / делала»), польская особенность - родовые формы ещё и в 1-м и 2-м лице множественного: <span class="pl">robiliśmy / robiłyśmy</span>, <span class="pl">robiliście / robiłyście</span>.</p>
    <div class="scroll"><table>
      <tr><th>лицо</th><th>м. род</th><th>ж. род</th><th>ср. род</th></tr>
      ${PAST.map(p => `<tr><td style="color:var(--muted)">${p[0]}</td><td class="w">${p[1]}</td><td class="w">${p[2]}</td><td class="${p[3]==="-"?"":"w"}" style="${p[3]==="-"?"color:var(--line)":""}">${p[3]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Множественное различает только два рода: <b>мужско-личный</b> (есть хоть один мужчина) - <span class="pl">robili</span>, и <b>всё остальное</b> - <span class="pl">robiły</span>.</p>

    <h3>Чередования в прошедшем</h3>
    <div class="scroll"><table>
      <tr><td style="width:34%">часть глаголов на <b>-eć</b></td><td class="c">e → a</td><td class="w">musieć → musiał, musiała, <b>но</b> musieli</td></tr>
      <tr><td>инфинитив на <b>-ąć</b></td><td class="c">ą → ę</td><td class="w">zacząć → zaczął, <b>но</b> zaczęła, zaczęli</td></tr>
      <tr><td>основа на <b>-o-</b></td><td class="c">o → ó</td><td class="w">móc → mógł, nieść → niósł (но mogła, niosła)</td></tr>
    </table></div>

    <h3>Нерегулярные в прошедшем</h3>
    <div class="scroll"><table>
      <tr><th>глагол</th><th>ja</th><th>on · ona</th><th>oni · one</th><th></th></tr>
      ${PASTIRR.map(p => `<tr><td class="w">${p[0]}</td><td class="g">${p[1]}</td><td class="w">${p[2]}</td><td class="w">${p[3]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${p[4]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Подвижные окончания.</b> <span class="pl">-m, -ś, -śmy, -ście</span> могут присоединяться к другому слову: <span class="pl">my to zrobiliśmy</span> = <span class="pl">myśmy to zrobili</span>. В нейтральном вопросе: <span class="pl">Gdzie byłeś?</span> И ударение: во всех формах 1-го и 2-го лица множественного оно уходит на третий слог от конца - <span class="pl">by-LI-śmy</span>, <span class="pl">ro-BI-li-śmy</span>, <span class="pl">czy-TA-li-ście</span>. В разговоре его часто выравнивают по предпоследнему слогу, но норма такая.</div>

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
    <div class="tip"><b>Три ловушки.</b> 1) Никогда <span class="bad">będę być</span> - просто <span class="pl">będę</span>. 2) Никогда <span class="bad">będę zrobić</span> и <span class="bad">będę zrobił</span>: совершенный <span class="pl">zrobić</span> образует простое будущее <span class="pl">zrobię</span>. 3) Модальные почти всегда идут в форме на -ł: <span class="pl">będę mógł, będę musiała, będzie chciał</span>.</div>

    <h3>Слова-подсказки</h3>
    <p class="pl">wczoraj · przedwczoraj · w zeszłym tygodniu · rok temu - прошедшее<br>teraz · zawsze · codziennie · zwykle - настоящее<br>jutro · pojutrze · za godzinę · w przyszłym roku - будущее</p>
  </div>`;
}

function vTryby(){
  return `<div class="panel">
    <h2>Наклонения</h2>
    <p class="lead">Повелительное - приказ и просьба. Условное - вежливость и «бы». Отдельно - <span class="pl">powinien</span>: «следует», ни то и ни другое.</p>

    <h3>Повелительное: как образуется</h3>
    <p>I и II спряжение - берём форму <b>ty</b> и отбрасываем окончание. III и IV - берём форму <b>oni</b> и отбрасываем <b>-ą</b>. Дальше <b>+ -my</b> для «мы» и <b>+ -cie</b> для «вы».</p>
    <div class="scroll"><table>
      <tr><th>глагол</th><th>от чего</th><th>ty</th><th>my</th><th>wy</th><th>on / ona</th><th></th></tr>
      ${IMPER.map(v => `<tr><td class="w">${v[0]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${v[1]}</td>
        <td class="g">${v[2]}</td><td class="w">${v[3]}</td><td class="w">${v[4]}</td><td class="w">${v[5]}</td>
        <td style="color:var(--muted);font-size:var(--fs-note)">${v[6]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Смягчение на конце.</b> si → ś, zi → ź, ci → ć, dzi → dź, ni → ń: <span class="pl">prosić → proś, wozić → woź, chodzić → chodź, zaprosić → zaproś</span>. Если основа не выговаривается - добавляем <b>-ij / -yj</b>: <span class="pl">spać → śpij, zapomnieć → zapomnij, zamknąć → zamknij, trzeć → trzyj</span>. Отдельно: <span class="pl">otworzyć → otwórz, pomóc → pomóż</span> - здесь o → ó.</div>

    <h3>Вежливость вместо приказа</h3>
    <table>
      <tr><td style="width:42%" class="w">Proszę usiąść.</td><td>proszę + инфинитив - самое нейтральное</td></tr>
      <tr><td class="w">Niech pan/pani usiądzie.</td><td>niech + 3-е лицо - вежливо к незнакомому</td></tr>
      <tr><td class="w">Czy mógłbyś mi pomóc?</td><td>условное - самая мягкая просьба</td></tr>
      <tr><td class="w">Usiądź!</td><td>прямой императив - только на «ты»</td></tr>
    </table>
    <div class="tip"><b>Отрицание обычно меняет вид.</b> Приказ - совершенный, запрет - несовершенный: <span class="pl">Zrób to!</span> → <span class="pl">Nie rób tego!</span> · <span class="pl">Kup to!</span> → <span class="pl">Nie kupuj tego!</span> · <span class="pl">Powiedz!</span> → <span class="pl">Nie mów!</span> Это правило по умолчанию, а не жёсткое.</div>
    <div class="tip"><b>Когда правило не работает.</b> Совершенный вид в запрете живой - он предупреждает о конкретном нежелательном исходе: <span class="pl">Nie zapomnij! · Nie spóźnij się! · Nie zgub kluczy!</span> Сравни: <span class="pl">Nie jedz ciasta</span> («не ешь торт» - вообще не трогай) и <span class="pl">Nie zjedz całego ciasta</span> («не съешь весь торт» - предупреждение о результате). И наоборот, несовершенный в обычном приказе совершенно нормален: <span class="pl">Czytaj! · Czekaj! · Mów głośniej!</span></div>

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
      <tr><td class="w">Gdybym miał czas…</td><td>слитно в самостоятельных словах: gdyby, żeby, aby, choćby, czyżby</td></tr>
      <tr><td class="w">Ja bym tego nie zrobił.</td><td>раздельно после местоимения</td></tr>
      <tr><td class="w">Chętnie bym pojechał.</td><td>раздельно после наречия</td></tr>
      <tr><td class="w">Należałoby zadzwonić.</td><td>безличная форма</td></tr>
    </table>
    <div class="tip"><b>Условие целиком.</b> <span class="pl">Gdyby + условное, to + условное</span>: <span class="pl">Gdybym miał czas, poszedłbym z tobą.</span> Оба глагола в условном. Русское «бы» тоже стоит в обеих частях («если бы у меня было время, я бы пошёл»), но оно неизменяемо, а польская <span class="pl">-by</span> спрягается по лицам: <span class="pl">gdybym, gdybyś, gdybyśmy</span>.</div>
    <div class="tip"><b>Ударение в условном.</b> Оно тоже сдвигается: <span class="pl">ZRO-bił-bym</span>, <span class="pl">ro-BI-li-by</span> - третий слог от конца, <span class="pl">ro-BI-li-by-śmy</span>, <span class="pl">ro-BI-li-by-ście</span> - четвёртый.</div>
    <p class="lead">Рабочие вежливые заготовки: <span class="pl">Chciałbym / Chciałabym…</span> · <span class="pl">Czy mógłbym prosić o…?</span> · <span class="pl">Czy mogłaby pani powtórzyć?</span> · <span class="pl">Wolałbym nie.</span></p>

    <h3>powinien - «следует»</h3>
    <p class="lead">По форме это прилагательное с приросшими личными окончаниями, по функции - модальный глагол. Инфинитива нет, будущего времени нет, спряжения нет - есть только эта таблица.</p>
    <div class="scroll"><table>
      <tr><th>лицо</th><th>м. род</th><th>ж. род</th></tr>
      ${POWINIEN.map(p => `<tr><td style="color:var(--muted)">${p[0]}</td><td class="w">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Род обязателен, как в прошедшем времени.</b> Мужчина говорит <span class="pl">powinienem</span>, женщина - <span class="pl">powinnam</span>. И ударение то же, что в прошедшем времени: <span class="pl">po-WIN-ni-śmy</span>, <span class="pl">po-WIN-ni-ście</span> - третий слог от конца.</div>

    <h3>powinien в прошедшем</h3>
    <p class="lead">Добавляется <span class="pl">był / była / byli</span> - «следовало сделать». Обычно из контекста понятно, что сделано не было, хотя буквально форма говорит только о том, что было бы правильно. В разговоре часто обходятся одной формой настоящего, но письменная норма требует связки.</p>
    <table>
      ${POWINIEN_PAST.map(p => `<tr><td style="width:44%" class="w">${p[0]}</td><td>${p[1]}</td></tr>`).join("")}
    </table>

    <h3>musieć · powinien · trzeba: что выбрать</h3>
    <div class="scroll"><table class="vt">
      <tr><th>форма</th><th>значение</th><th>чем отличается</th></tr>
      ${MODAL_MUST.map(m => `<tr><td class="w">${m[0]}</td><td class="g">${m[1]}</td><td style="color:var(--muted);font-size:var(--fs-note);white-space:normal">${m[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Отрицание разводит смыслы.</b> <span class="pl">Nie muszę</span> - «не обязан, но могу», <span class="pl">nie mogę</span> - «не могу», <span class="pl">nie wolno</span> - «нельзя, запрещено». Русское «не должен» покрывает все три сразу, поэтому выбирать приходится заново каждый раз.</div>
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
    <p class="lead"><span class="pl">Kobieta czytająca gazetę siedzi przy oknie.</span> = <span class="pl">Kobieta, która czyta gazetę, siedzi przy oknie.</span> - «женщина, читающая газету, сидит у окна». Придаточное с <span class="pl">która</span> отделяется запятыми с двух сторон, причастный оборот - нет. В разговоре чаще звучит второй вариант, но в объявлениях и документах причастие обычно: <span class="pl">osoby mieszkające w Polsce</span>.</p>

    <h3>Страдательное причастие: -ny / -ony / -ty</h3>
    <p>Только от переходных глаголов, то есть таких, от которых возможна пассивная конструкция: <span class="pl">szukać książki → książka jest szukana</span>, <span class="pl">używać telefonu → telefon jest używany</span>. От <span class="pl">korzystać z</span>, <span class="pl">opiekować się</span>, <span class="pl">iść</span> его нет: форм <span class="bad">korzystany</span>, <span class="bad">zaopiekowany</span> не существует.</p>
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
      ${IMIES_PRZYS.map(i => `<tr><td class="c">${i[0]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${i[1]}</td><td class="w">${i[2]}</td><td class="g">${i[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Два ограничения.</b> 1) Субъект деепричастия и главного глагола - один и тот же человек: <span class="pl">Idąc do pracy, zgubiłem telefon</span> - шёл и потерял один и тот же «я». 2) Форма на <span class="pl">-wszy / -łszy</span> - книжная; в разговоре вместо <span class="pl">Zrobiwszy zakupy…</span> скажут <span class="pl">Kiedy zrobiłem zakupy…</span></div>

    <h3>Страдательный залог: zostać / być + причастие</h3>
    <p>Причастие согласуется с подлежащим в роде и числе. Исполнитель - через <span class="pl">przez + Biernik</span>: <span class="pl">zbudowany przez znaną firmę</span>.</p>
    <div class="scroll"><table class="vt">
      <tr><th>конструкция</th><th>смысл</th><th>примеры</th></tr>
      ${PASSIVE_Z.map(p => `<tr><td class="c">${p[0]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
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
    <h2>Управление</h2>
    <p class="lead">Самая частая ошибка русскоязычных - не окончание, а падеж после слова. У глаголов это заметно сразу, у прилагательных и существительных - нет, но механизм тот же. Красным помечено то, где польский расходится с русским.</p>
    <div class="scroll"><table class="vt">
      <tr><th>глагол</th><th>вопрос</th><th>требует</th><th>по-русски</th><th>пример</th></tr>
      ${REKCJA.map(r => `<tr><td class="w">${r[0]}</td><td style="color:var(--muted);white-space:nowrap">${r[1]}</td>
        <td class="${r[5]?"c":"cq"}">${r[2]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${r[3]}</td>
        <td class="w">${r[4]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Отрицание съедает Biernik.</b> При <span class="pl">nie</span> прямое дополнение уходит в Dopełniacz: <span class="pl">Mam czas → Nie mam czasu</span> · <span class="pl">Znam ją → Nie znam jej</span> · <span class="pl">Lubię kawę → Nie lubię kawy</span>.</div>
    <h3>Глаголы движения: пара «однонаправленный / разнонаправленный»</h3>
    <p class="lead">Первый глагол - движение в одну сторону в конкретный момент, второй - движение туда и обратно, вообще или по привычке. Ровно как русское «иду / хожу».</p>
    <div class="scroll"><table class="vt">
      <tr><th>в одну сторону, сейчас</th><th>в разные стороны, вообще</th><th>перевод</th><th>пример</th></tr>
      ${RUCH.map(r => `<tr><td class="g">${r[0]}</td><td class="w">${r[1]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${r[2]}</td><td class="w">${r[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Приставки: общая система</h3>
    <p class="lead">Приставка обычно сохраняет одно и то же общее направление значения. Выучив четырнадцать, читаешь незнакомый глагол по частям - но проверять по словарю всё равно приходится: приставочные глаголы быстро обрастают собственным смыслом. <span class="pl">przypisać, odpisać, zapisać</span> - три разных слова, а не три оттенка одного.</p>
    <div class="scroll"><table class="vt">
      <tr><th>приставка</th><th>значение</th><th>движение</th><th>остальные глаголы</th></tr>
      ${PREF_ALL.map(p => `<tr><td class="c">${p[0]}</td><td style="color:var(--muted);white-space:normal">${p[1]}</td><td class="g" style="white-space:normal">${p[2]}</td><td class="w" style="white-space:normal">${p[3]}</td></tr>`).join("")}
    </table></div>

    <h3>Приставка задаёт вид - несовершенный берётся от многократного</h3>
    <p class="lead">Ключ ко всей системе движения. Приставка плюс однократный глагол (<span class="pl">iść, jechać</span>) даёт совершенный вид. Несовершенный к нему делается не от него самого, а от многократного (<span class="pl">chodzić, jeździć</span>) - с той же приставкой.</p>
    <div class="scroll"><table class="vt">
      <tr><th>сов. от iść</th><th>несов. от chodzić</th><th>сов. от jechać</th><th>несов. от jeździć</th></tr>
      ${PREF_ASPEKT.map(p => `<tr><td class="w">${p[0]}</td><td class="g">${p[1]}</td><td class="w">${p[2]}</td><td class="g">${p[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Основа меняется предсказуемо.</b> <span class="pl">-jść → -chodzić</span>, <span class="pl">-jechać → -jeżdżać</span>, <span class="pl">-nieść → -nosić</span>, <span class="pl">-wieźć → -wozić</span>, <span class="pl">-lecieć → -latywać</span>. Отсюда <span class="pl">przyniosę / przynoszę</span>, <span class="pl">przywiozę / przywożę</span>. Формы <span class="bad">przyiść</span> или <span class="bad">przyjeżdżeć</span> не существуют.</div>
    <div class="tip"><b>Зачем это нужно на практике.</b> «Поезд отходит в пять» - настоящее время, а у совершенного вида его нет, значит несовершенный: <span class="pl">Pociąg odjeżdża o piątej</span>. Так же говорят о расписании и о запланированном будущем. «Поезд ушёл» - однократно и законченно: <span class="pl">Pociąg odjechał</span>. Оба слова от <span class="pl">jechać</span>, но берутся из разных половин пары.</div>
    <h3>iść с приставками: рабочие фразы</h3>
    <div class="scroll"><table>
      <tr><th>глагол</th><th>перевод</th><th>пример</th></tr>
      ${PREF.map(p => `<tr><td class="w">${p[0]}</td><td style="color:var(--muted)">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Куда именно.</b> <span class="pl">do</span> + Dopełniacz - в здание, город, страну: <span class="pl">do sklepu, do Polski</span>. <span class="pl">na</span> + Biernik - на мероприятие, открытое место, «в» для некоторых стран: <span class="pl">na pocztę, na uniwersytet, na Węgry</span>. <span class="pl">w</span> + Biernik - <span class="pl">w góry</span>. <span class="pl">do</span> - идти к человеку: <span class="pl">idę do lekarza</span>.</div>

    <h3>Управление прилагательных</h3>
    <p class="lead">Та же проблема, что у глаголов, только менее заметная: <span class="pl">być</span> оставляет прилагательное в именительном, но собственное управление прилагательного никуда не девается.</p>
    <div class="scroll"><table class="vt">
      <tr><th>прилагательное</th><th>требует</th><th>по-русски</th><th>пример</th></tr>
      ${REKCJA_ADJ.map(r => `<tr><td class="w">${r[0]}</td><td class="c">${r[1]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${r[2]}</td><td class="g" style="white-space:normal">${r[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Две вещи в одной фразе.</b> <span class="pl">Jestem dumny z syna</span>: <span class="pl">dumny</span> - именительный, потому что после <span class="pl">być</span>; <span class="pl">z syna</span> - родительный, потому что этого требует само прилагательное. Правила не конфликтуют, они про разные слова.</div>

    <h3>Управление существительных</h3>
    <div class="scroll"><table class="vt">
      <tr><th>существительное</th><th>требует</th><th>пример</th></tr>
      ${REKCJA_N.map(r => `<tr><td class="w">${r[0]}</td><td class="c">${r[1]}</td><td class="g" style="white-space:normal">${r[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Управление часто наследуется от однокоренного глагола.</b> <span class="pl">tęsknić za czymś → tęsknota za czymś</span> · <span class="pl">wpływać na coś → wpływ na coś</span> · <span class="pl">zgadzać się na coś → zgoda na coś</span> · <span class="pl">interesować się czymś → zainteresowany czymś</span>. Знаешь глагол - в большинстве случаев угадаешь и производное. Совпадает не всегда, но это лучшая догадка при отсутствии словаря.</div>

  </div>`;
}

const norm = s => s.toLowerCase().replace(/ł/g,"l").normalize("NFD").replace(/\p{M}/gu,"");
function verbPracticeHTML(practice, on = false){
  return `<section class="practice panel content-variant verb-practice-variant${on ? " on" : ""}" data-v="${practice.id}">
    <div class="practice-heading">
      <div><p class="practice-kicker">Практика · ${practice.tasks.length} заданий · ${practiceAnswerCount(practice)} пропусков</p><h2>${practice.title}</h2></div>
      <div class="exercise-progress" aria-live="polite">0 из ${practice.tasks.length} заданий</div>
    </div>
    <p class="lead">${practice.lead}</p>
    <div class="exercise-list">${practice.tasks.map((task, index) => exerciseTaskHTML(task, index + 1)).join("")}</div>
    <div class="practice-actions"><button type="button" class="exercise-link" data-action="reset-practice">Начать заново</button></div>
  </section>`;
}
function verbTestHTML(){ return exerciseTestHTML(VERB_TEST, "verbs", "verb-test"); }
function renderVerbPractice(){
  const practice = VERB_PRACTICE.find(item => item.id === curV) || VERB_PRACTICE[0];
  $("#verbPractice").innerHTML = verbPracticeHTML(practice, true);
  $("#verbTest").innerHTML = verbTestHTML();
}
function listHTML(q){
  const f = norm(q || "");
  const rows = VERBS.filter(v => !f || v.slice(0,2).concat(v.slice(3)).some(x => norm(x).includes(f)));
  return `<table class="vt">
    <tr><th>глагол</th><th>перевод</th><th>спр.</th><th>ja</th><th>ty</th><th>oni</th><th>он</th><th>она</th><th>сов. / результат</th></tr>
    ${rows.map(v => `<tr>
      <td class="f"><span class="stem">${v[0]}</span></td>
      <td style="color:var(--muted);font-size:var(--fs-note)">${v[1]}</td>
      <td class="c">${v[2]}</td>
      <td class="f">${vform(v[3], v[2], 0)}</td>
      <td class="f">${vform(v[4], v[2], 1)}</td>
      <td class="f">${vform(v[5], v[2], 5)}</td>
      <td class="w">${v[6]}</td><td class="w">${v[7]}</td>
      <td class="${v[8]==="сов."||v[8]==="-"?"":"g"}" style="${v[8]==="сов."||v[8]==="-"?"color:var(--muted);font-size:var(--fs-note)":"white-space:normal"}">${v[8]}${ASPEKT_UWAGI[v[0]]?`<span style="display:block;font-family:var(--sans);font-size:var(--fs-micro);color:var(--alt)">${ASPEKT_UWAGI[v[0]]}</span>`:""}</td>
    </tr>`).join("")}
  </table>${rows.length ? "" : `<p class="lead" style="padding:12px 0">Ничего не нашлось.</p>`}`;
}
function renderVerbs(){
  $("#s-verbs").innerHTML =
    `<div class="casebar"><div class="chips" id="vchips" role="group" aria-label="Раздел о глаголах">${
      VTABS.map(t => `<button class="chip" data-v="${t[0]}" aria-pressed="${t[0]===curV}"><span class="cp">${t[1]}</span></button>`).join("")
    }</div></div><div id="vPanel"></div><div id="verbPractice"></div><div id="verbTest"></div>`;
  $("#vchips").querySelectorAll(".chip").forEach(b => b.onclick = () => {
    curV = b.dataset.v; renderVerbs(); writeHash();
  });
  $("#vPanel").innerHTML = {conj:vConj, czasy:vCzasy, tryby:vTryby, formy:vFormy, rekcja:vRekcja}[curV]();
  linkHeadings($("#vPanel"));
  renderVerbPractice();
}

const ngrid = list => `<div class="ngrid">${list.map(n =>
  `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join("")}</div>`;

function renderNum(){
  $("#s-num").innerHTML = `<div class="panel">
    <h2>Числительные</h2>
    <p class="lead">Главная сложность не в самих числах, а в том, какой падеж они требуют от существительного и что делают с глаголом.</p>
    <div class="tip"><b>Три основных режима.</b> Числительное на <span class="pl">1</span>, кроме 11, требует Mianownik единственного: <span class="pl">dwadzieścia jeden dom był</span>. На <span class="pl">2, 3, 4</span>, кроме 12-14, - Mianownik множественного и глагол во множественном: <span class="pl">dwadzieścia dwa domy były</span>. На <span class="pl">5-9, 0</span> и на <span class="pl">11-14</span> - Dopełniacz множественного и глагол в среднем роде единственного: <span class="pl">pięć osób było</span>.</div>

    <h3>Количественные: 0–20</h3>
    ${ngrid(NUM)}
    <h3>Десятки, сотни, тысячи</h3>
    ${ngrid(NUM10)}
    <p class="lead" style="margin-top:10px">Составные пишутся раздельно и без «и»: <span class="pl">dwadzieścia jeden</span> (21) · <span class="pl">sto trzydzieści siedem</span> (137) · <span class="pl">dwa tysiące dwadzieścia sześć</span> (2026).</p>
    <div class="tip"><b>У базовых количественных форм род различается у 1 и 2.</b> <span class="pl">jeden dom · jedna książka · jedno okno</span>; <span class="pl">dwa domy · dwie książki · dwa okna</span>. У мужско-личных групп есть отдельные формы <span class="pl">dwaj, trzej, czterej</span>.</div>

    <h3>Согласование с существительным</h3>
    <div class="scroll"><table class="vt">
      <tr><th>число</th><th>существительное</th><th>пример</th><th>глагол</th></tr>
      ${NAGR.map(n => `<tr><td class="c">${n[0]}</td><td class="g">${n[1]}</td><td class="w">${n[2]}</td><td class="w">${n[3]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">В составных числительных смотрим на последнюю цифру: <span class="pl">22 domy</span>, <span class="pl">25 domów</span>. Исключение - <span class="pl">11-14</span>: они всегда требуют Dopełniacz множественного, <span class="pl">dwanaście domów</span>, не «dwanaście domy».</p>

    <h3>Число на что оканчивается?</h3>
    <div class="tip"><b>Быстрая схема.</b> <span class="pl">21, 31, 41...</span> обычно требуют единственного числа: <span class="pl">dwadzieścia jeden dom</span>. Окончания <span class="pl">2-4</span>, кроме 12-14, дают множественное: <span class="pl">22 domy</span>. Окончания <span class="pl">5-9, 0</span> и числа 11-14 - Dopełniacz множественного: <span class="pl">25 domów, 30 domów, 114 domów</span>. Возраст запоминай отдельно: <span class="pl">mam 21 lat, 22 lata, 25 lat</span>. Для мужчин есть свои формы: <span class="pl">dwaj / dwóch studentów</span>.</div>

    <h3>Мужско-личные формы</h3>
    <p>Если считаем мужчин, у числительного появляется отдельная форма - и она меняет весь остальной падеж и глагол.</p>
    <div class="scroll"><table class="vt">
      <tr><th>форма</th><th>существительное</th><th>глагол</th><th>пример</th></tr>
      ${MOSNUM.map(m => `<tr><td class="g">${m[0]}</td><td>${m[1]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${m[2]}</td><td class="w">${m[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Что выбрать.</b> <span class="pl">Dwaj studenci czytają</span> и <span class="pl">Dwóch studentów czyta</span> значат одно и то же. Вариант с <span class="pl">dwóch / trzech / czterech</span> в живой речи встречается чаще, а начиная с пяти он единственный: <span class="pl">pięciu studentów</span>.</div>

    <h3>Число + прилагательное + существительное + глагол</h3>
    <p class="lead">Числительное задаёт падеж существительному, прилагательное просто следует за существительным, а глагол смотрит на числительное. Три согласования в одной фразе - здесь и ломается всё, что выучено по отдельности.</p>
    <div class="scroll"><table class="vt">
      <tr><th>число</th><th>группа</th><th>падеж группы</th><th>глагол</th><th>пример</th></tr>
      ${LICZ_GRUPA.map(l => `<tr><td class="c">${l[0]}</td><td class="w" style="white-space:normal">${l[1]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${l[2]}</td><td class="g">${l[3]}</td><td class="w" style="white-space:normal">${l[4]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Прилагательное согласуется с существительным, а не с числительным.</b> При числительных на <span class="pl">5-9, 0</span> и при <span class="pl">11-14</span> вся группа целиком уходит в Dopełniacz множественного: <span class="pl">pięć <b>dużych domów</b></span>, <span class="pl">dziesięć <b>nowych samochodów</b></span>, <span class="pl">pięć <b>dużych książek</b></span>. Отдельного правила для прилагательного нет - оно просто повторяет падеж соседа.</div>
    <div class="tip"><b>Самое трудное место - пассив и прошедшее при числительных на 5-9, 0 и 11-14.</b> Глагол уходит в средний род единственного числа, а причастие остаётся при существительном, в Dopełniacz множественного: <span class="pl">Pięć dużych domów <b>zostało sprzedanych</b></span>. Сравни с 2-4, где всё обычное: <span class="pl">Dwa duże domy <b>zostały sprzedane</b></span>. Две части сказуемого смотрят в разные стороны, и это выглядит как ошибка, пока не привыкнешь.</div>
    <div class="tip"><b>Женский род ничем не отличается.</b> <span class="pl">dwie duże książki są</span> · <span class="pl">pięć dużych książek jest</span>. Род виден только у <span class="pl">dwa / dwie</span>, дальше механика та же.</div>

    <h3>Склонение</h3>
    <div class="scroll"><table class="vt">
      <tr><th>падеж</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
      ${NDEKL.map(d => `<tr><td style="color:var(--muted)">${d[0]}</td><td class="w">${d[1]}</td><td class="w">${d[2]}</td><td class="w">${d[3]}</td><td class="w">${d[4]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Числительные от 5 до 90 склоняются по образцу <span class="pl">pięć</span>: <span class="pl">pięciu, pięciu, pięć, pięcioma, pięciu</span>. <span class="pl">Sto</span> и сотни имеют свои модели. В <span class="pl">Narzędnik</span> женское <span class="pl">dwiema</span> сохраняет род.</p>

    <h3>Порядковые</h3>
    ${ngrid(ORD)}
    <p class="lead" style="margin-top:10px">Склоняются как обычные прилагательные: <span class="pl">pierwszy, pierwszego, pierwszemu…</span> В составных порядковыми становятся только десятки и единицы - последние два слова; сотни и тысячи остаются количественными: <span class="pl">dwudziesty pierwszy</span> · <span class="pl">tysiąc dziewięćset dziewięćdziesiąty dziewiąty</span>.</p>

    <h3>Собирательные</h3>
    <p>Типичны при детях, смешанных группах людей и словах без единственного числа, но не обязательны во всех контекстах. Требуют Dopełniacz и глагол в среднем роде. Исключение - <span class="pl">oboje rodzice</span>: Mianownik и обычное согласование.</p>
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

    <h3>Отрезки времени</h3>
    <p class="lead">Один русский предлог «за» покрывает три польских конструкции, а «через» совпадает с польским <span class="pl">za</span>. Проще держать все четырнадцать в одной таблице.</p>
    <div class="scroll"><table class="vt">
      <tr><th>конструкция</th><th>значение</th><th>примеры</th></tr>
      ${CZAS_WYR.map(c => `<tr><td class="c">${c[0]}</td><td style="color:var(--muted);white-space:normal">${c[1]}</td><td class="g" style="white-space:normal">${c[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b><span class="pl">za tydzień</span> - это «через неделю», а не «за неделю».</b> «За неделю» в смысле «в течение» - <span class="pl">przez tydzień</span> (столько длилось) или <span class="pl">w ciągu tygodnia</span> (успею к сроку). Три разные конструкции на один русский предлог: <span class="pl">Wrócę za tydzień</span> · <span class="pl">Byłem tam przez tydzień</span> · <span class="pl">Zrobię to w ciągu tygodnia</span>.</div>
    <div class="tip"><b>Срок поездки - через <span class="pl">na</span>.</b> <span class="pl">Jadę do Polski na tydzień</span> - на сколько еду. <span class="pl">Byłem w Polsce przez tydzień</span> - сколько там пробыл. Русское «на неделю» тянет <span class="pl">na</span> в обе фразы, но во второй нужен <span class="pl">przez</span>.</div>
    <div class="tip"><b>Один предлог <span class="pl">w</span>, два падежа - и вывести правилом не получится.</b> Дни недели и названия периодов-событий берут Biernik: <span class="pl">w poniedziałek, w sobotę, w weekend, w święta, w wakacje, w ferie</span>. Неделя, месяц, год - Miejscownik: <span class="pl">w tym tygodniu, w maju, w 2026 roku</span>. Через длину отрезка это не объясняется: <span class="pl">w weekend</span> длиннее суток, но Biernik, а <span class="pl">w dzień</span> и <span class="pl">w nocy</span> одинаковы по длине и стоят в разных падежах. Учить двумя списками.</div>
    <div class="tip"><b>Часть времени вообще обходится без предлога.</b> <span class="pl">rano, wieczorem, nocą, latem, zimą</span> - Narzędnik без <span class="pl">w</span>. Но <span class="pl">w nocy</span> и <span class="pl">nocą</span> сосуществуют, а <span class="pl">rankiem</span> звучит книжно рядом с обычным <span class="pl">rano</span>.</div>

    <h3>Возраст, деньги, счёт</h3>
    <div class="scroll"><table>
      <tr><td style="width:38%">Сколько тебе лет?</td><td class="w">Ile masz lat?</td></tr>
      <tr><td>1 / 2-4 / остальные</td><td class="w">rok · lata · lat - <span class="g">mam 21 lat, 22 lata, 25 lat</span></td></tr>
      <tr><td>деньги</td><td class="w">złoty · złote · złotych - <span class="g">2 złote, 5 złotych, 22 złote</span></td></tr>
      <tr><td>неточный счёт</td><td class="w">kilka · kilkanaście (11–19) · kilkadziesiąt · parę</td></tr>
    </table></div>
    <div class="tip"><b><span class="pl">ile / ilu</span>: сначала определи падеж всей группы.</b> В Mianownik и Biernik после <span class="pl">ile</span> существительное стоит в Dopełniacz множественного числа: <span class="pl">ile osób, ile lat, ile pieniędzy</span>; у несчётных - в единственном: <span class="pl">ile czasu, ile cukru</span>. О мужчинах - форма <span class="pl">ilu</span>: <span class="pl">ilu studentów, ilu ludzi</span>, а глагол обычно в среднем роде единственного числа: <span class="pl">Ilu ludzi przyszło?</span> В косвенных падежах склоняется вся группа: <span class="pl">Ilu studentom pomogłeś? · O ilu osobach mówisz? · Z iloma osobami rozmawiałeś?</span></div>

    <h3>Дроби</h3>
    <div class="scroll"><table class="vt">
      <tr><th>число</th><th>как называется</th><th>примеры</th></tr>
      ${ULAM.map(u => `<tr><td class="c">${u[0]}</td><td class="w">${u[1]}</td><td class="g" style="white-space:normal">${u[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b><span class="pl">półtora</span> или <span class="pl">półtorej</span>.</b> Единственная дробь с родом: <span class="pl">półtora roku, półtora kilo</span> - мужской и средний, <span class="pl">półtorej godziny, półtorej minuty</span> - женский. После <span class="pl">pół</span> и <span class="pl">półtora</span> существительное идёт в Dopełniacz.</div>

    <h3>Десятичные</h3>
    <table>
      ${DZIES.map(d => `<tr><td style="width:22%" class="c">${d[0]}</td><td class="w">${d[1]}</td></tr>`).join("")}
    </table>
    <p class="lead">Разделитель дробной части - запятая, читается <span class="pl">przecinek</span>. Точка в этой роли не используется вообще.</p>

    <h3>Проценты</h3>
    <table>
      ${PROCENT.map(p => `<tr><td style="width:22%" class="c">${p[0]}</td><td class="w">${p[1]}</td></tr>`).join("")}
    </table>
    <div class="tip"><b><span class="pl">procent</span> после количественного числительного.</b> В Mianownik, Dopełniacz и Biernik форма обычно остаётся <span class="pl">procent</span>: <span class="pl">dwa procent, pięć procent, sto procent</span>. В Dativ, Narzędnik и Miejscownik она склоняется: <span class="pl">stu procentom, z pięcioma procentami, o czterdziestu procentach</span>. После дробных числительных форма застывает во всех падежах: <span class="pl">pół procent, półtora procent, dwa i pół procent, o pięciu i pół procent</span>.</div>

  </div>${topicPracticeHTML(NUM_PRACTICE, "numeral")}`;
}

function renderPart(){
  $("#s-part").innerHTML = `<div class="panel">
    <h2>Частицы</h2>
    <p class="lead">Не переводятся по словарю и не склоняются, но именно они делают речь живой. Без них польский звучит как учебник.</p>

    <h3>Рабочий минимум</h3>
    <div class="scroll"><table class="vt">
      <tr><th>частица</th><th>значение</th><th>примеры</th><th></th></tr>
      ${PART.map(p => `<tr><td class="w">${p[0]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${p[1]}</td>
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
      ${PARTPIS.map(p => `<tr><td class="${p[0].startsWith("слитно")?"c":"cq"}">${p[0]}</td><td>${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Норма с 1 января 2026 года.</b> Теперь <span class="pl">nie</span> пишется слитно с прилагательными и образованными от них наречиями во всех степенях: <span class="pl">nielepszy, nienajlepszy, niegorzej, nienajlepiej</span>. В старых словарях и текстах ещё встречается прежнее раздельное написание.</div>
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
  </div>${topicPracticeHTML(PART_PRACTICE, "particle")}`;
}

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

    <h3>Место и направление: одна система</h3>
    <div class="scroll"><table class="vt">
      <tr><th>вопрос</th><th>что спрашиваем</th><th>ответ</th></tr>
      <tr><td class="w" style="white-space:normal">Gdzie jesteś?</td><td style="white-space:normal">где - положение</td><td class="g" style="white-space:normal">W domu. · Tutaj.</td></tr>
      <tr><td class="w" style="white-space:normal">Dokąd idziesz?</td><td style="white-space:normal">куда - цель движения</td><td class="g" style="white-space:normal">Do domu. · Tam.</td></tr>
      <tr><td class="w" style="white-space:normal">Skąd wracasz?</td><td style="white-space:normal">откуда - исходная точка</td><td class="g" style="white-space:normal">Z pracy. · Stamtąd.</td></tr>
      <tr><td class="w" style="white-space:normal">Którędy iść?</td><td style="white-space:normal">каким путём</td><td class="g" style="white-space:normal">Tędy. · Tamtędy.</td></tr>
    </table></div>
    <div class="tip"><b>В разговоре <span class="pl">gdzie</span> часто заменяет <span class="pl">dokąd</span>.</b> <span class="pl">Gdzie idziesz?</span> звучит естественно, но точная система различает положение <span class="pl">gdzie?</span> и направление <span class="pl">dokąd?</span>. Пары ответов: <span class="pl">tu / tutaj</span> - здесь, <span class="pl">tam</span> - там/туда, <span class="pl">stąd</span> - отсюда, <span class="pl">stamtąd</span> - оттуда, <span class="pl">tędy / tamtędy</span> - этим/тем путём.</div>
    <h3>В придаточном места</h3>
    <div class="scroll"><table class="vt">
      <tr><th>связка</th><th>пример</th></tr>
      <tr><td class="w" style="white-space:normal">tam, gdzie…</td><td class="g" style="white-space:normal">Zostań tam, gdzie jesteś.</td></tr>
      <tr><td class="w" style="white-space:normal">tam, dokąd…</td><td class="g" style="white-space:normal">Idź tam, dokąd prowadzi znak.</td></tr>
      <tr><td class="w" style="white-space:normal">stamtąd, skąd…</td><td class="g" style="white-space:normal">Wrócił stamtąd, skąd wyjechał.</td></tr>
      <tr><td class="w" style="white-space:normal">tędy, którędy…</td><td class="g" style="white-space:normal">Idź tędy, którędy szliśmy wczoraj.</td></tr>
    </table></div>

    <h3>kto и co: склонение</h3>
    <p class="lead">Вопросительное слово стоит в том падеже, которого требует глагол или предлог внутри самого вопроса. Отсюда <span class="pl">Czego szukasz?</span>, а не «Co szukasz?».</p>
    <table>
      <tr><th>падеж</th><th>kto</th><th>co</th></tr>
      ${KTO_CO.map(r => `<tr><td>${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td></tr>`).join("")}
    </table>
    <div class="tip"><b>Падеж диктует глагол.</b> <span class="pl">szukać czego? → Czego szukasz?</span> · <span class="pl">pomagać komu? → Komu pomagasz?</span> · <span class="pl">interesować się czym? → Czym się interesujesz?</span> · <span class="pl">bać się czego? → Czego się boisz?</span> Полный список - во вкладке Глаголы → Управление.</div>

    <h3>Вся семья: ktoś, nikt, ktokolwiek</h3>
    <p class="lead">Приставка и суффикс едут на готовой форме: склоняется середина, а не край. Выучив <span class="pl">kto / co</span>, получаешь ещё три ряда бесплатно.</p>
    <div class="scroll"><table class="vt">
      <tr><th>слово</th><th>значение</th><th>косвенные формы</th></tr>
      ${KTO_RODZ.map(r => `<tr><td class="w">${r[0]}</td><td style="color:var(--muted)">${r[1]}</td><td class="g" style="white-space:normal">${r[2].replace("||","<br>")}</td></tr>`).join("")}
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
      <tr><th>падеж</th><th>муж.</th><th>жен.</th><th>ср.</th><th>мн. мужско-личное</th><th>мн. остальное</th></tr>
      ${KTORY.map(r => `<tr><td>${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td><td class="w">${r[3]}</td><td class="g">${r[4]}</td><td class="g">${r[5]}</td></tr>`).join("")}
    </table></div>

    <h3>który как относительное местоимение</h3>
    <p>Присоединяет придаточное к существительному. Род и число - от существительного, к которому относится; падеж - от того, какую роль który играет внутри своего придаточного.</p>
    <div class="scroll"><table>
      ${KTORY_SENT.map(k => `<tr><td style="width:36%" class="w">${k[0]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${k[1]}</td><td class="g" style="font-size:var(--fs-note)">${k[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Без который не построить сложное предложение.</b> Именно он позволяет сказать не «Это магазин. Я там работаю», а «Это магазин, в котором я работаю» - то есть перейти от двух коротких фраз к одной развёрнутой.</div>
  </div>${topicPracticeHTML(QUESTION_PRACTICE, "question")}`;
}

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
      ${NIEMA_JEST.map(n => `<tr><td class="g">${n[0]}</td><td class="c">${n[1]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${n[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Главная проверка.</b> Если можно поставить вопрос «есть ли у кого-то / где-то?» - это <span class="pl">nie ma</span> + Dopełniacz. Если вопрос «является ли чем-то / каким-то?» - это <span class="pl">nie jest</span> и падеж обычного сказуемого.</div>

    <h3>ani… ani и żaden</h3>
    <p class="pl">Nie mam ani czasu, ani pieniędzy.</p>
    <p class="lead">Отдельное отрицательное местоимение <span class="pl">żaden / żadna / żadne</span> - «никакой»: <span class="pl">Żaden z nich nie przyszedł.</span> Склоняется как прилагательное с окончаниями местоименного типа: <span class="pl">żadnego, żadnej, żadnym</span>.</p>
  </div>${topicPracticeHTML(NEG_PRACTICE, "negation")}`;
}

function renderOrder(){
  $("#s-order").innerHTML = `<div class="panel">
    <h2>Порядок слов</h2>
    <p class="lead">Польский, как и русский, допускает несколько порядков слов. Выбор не случайный: нейтральная фраза обычно ведёт от уже известной темы к новому сообщению, а у безударных словечек - клитик - есть ещё и жёсткие правила места.</p>

    <h3>Тема и новое сообщение</h3>
    <p>То, о чём уже идёт речь, обычно ставят раньше, а ответ на главный вопрос - ближе к концу. Поэтому одинаковые слова в разном порядке отвечают на разные вопросы.</p>
    <div class="scroll"><table class="vt">
      <tr><th>вопрос</th><th>нейтральный ответ</th><th>новое</th></tr>
      ${TEMA_REMA.map(r => `<tr><td class="g">${r[0]}</td><td class="w">${r[1]}</td><td class="note">${r[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Это тенденция, не железная схема.</b> Контрастное ударение может выделить почти любое слово, но без особого контекста новое сообщение естественнее звучит в конце: <span class="pl">Klucze są na stole</span> и <span class="pl">Na stole są klucze</span> описывают ту же сцену, но не сообщают одно и то же.</div>

    <h3>Нейтрально и с акцентом</h3>
    <div class="tip"><b>Сначала строй нейтрально, затем переставляй только ради смысла.</b> <span class="pl">Widziałem go wczoraj</span> сообщает факт; <span class="pl">Go widziałem wczoraj</span> выделяет именно его. <span class="pl">Czy podoba ci się ten film?</span> - нейтральный порядок клитик; другой порядок возможен, если нужно выделить адресата. В вопросе <span class="pl">Ile kosztuje bilet?</span> нейтрально, а <span class="pl">Ile bilet kosztuje?</span> подчёркивает <span class="pl">bilet</span>.</div>

    <h3>Клитики: mi, ci, go, mu, się…</h3>
    <p>В нейтральной фразе короткие безударные слова обычно не открывают предложение и не идут сразу после предлога. Обычно они льнут ко второму месту в предложении - сразу после первого ударного слова или перед глаголом. При контрасте порядок может меняться.</p>
    <div class="scroll"><table class="vt">
      <tr><th>клитика</th><th>значение</th><th>пример</th></tr>
      ${CLITICS.map(c => `<tr><td class="w">${c[0]}</td><td style="color:var(--muted)">${c[1]}</td><td class="g">${c[2]}</td></tr>`).join("")}
    </table></div>

    <h3>Позиция się</h3>
    <p class="lead">Русское «-ся» приклеено к глаголу намертво. Польское <span class="pl">się</span> - отдельное слово и гуляет по предложению.</p>
    <div class="scroll"><table>
      ${SIE_POS.map(s => `<tr><td style="width:34%" class="w">${s[0]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${s[1]}</td><td style="font-size:var(--fs-note)">${s[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Две жёсткие границы.</b> <span class="pl">się</span> никогда не ставится первым словом предложения и никогда не идёт сразу после предлога. После предлога вместо него используется полная форма: не <span class="pl">bez się</span>, а <span class="pl">bez siebie</span> - «без самого себя»; не <span class="pl">ze się</span>, а <span class="pl">rozmawiam sam ze sobą</span> - «разговариваю сам с собой».</div>

    <h3>Вопросительное слово + глагол</h3>
    <p class="lead">В нейтральной речи глагол идёт сразу за вопросительным словом, не после подлежащего.</p>
    <div class="scroll"><table>
      ${QVERB_ORDER.map(q => `<tr><td style="width:46%" class="w">${q[0]}</td><td>${q[1]}</td></tr>`).join("")}
    </table></div>

    <h3>Прилагательное: качество или тип</h3>
    <p class="lead">Тоже вопрос порядка слов, хоть и внутри одной именной группы: качество - перед словом, вид или тип - после. Подробнее и с примерами - во вкладке «Прилагательные».</p>
    <p class="pl">czarna kawa (какой кофе) · kawa rozpuszczalna (какой вид кофе) · język polski · dzień dobry</p>
  </div>${topicPracticeHTML(ORDER_PRACTICE, "word-order")}`;
}

function renderImpers(){
  $("#s-impers").innerHTML = `<div class="panel">
    <h2>Безличные конструкции</h2>
    <p class="lead">Действие есть, а того, кто его совершает, - нет и не важно. Это язык объявлений, вывесок и учреждений.</p>

    <h3>Модальные безличные + инфинитив</h3>
    <div class="scroll"><table class="vt">
      <tr><th>слово</th><th>значение</th><th>пример</th></tr>
      ${IMPERS_MODAL.map(i => `<tr><td class="w">${i[0]}</td><td style="color:var(--muted)">${i[1]}</td><td class="g">${i[2]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Прошедшее время у большинства - через <span class="pl">było</span>: <span class="pl">trzeba było iść, nie można było wejść, warto było spróbować</span>. Исключение - <span class="pl">należy</span>: у него своя форма прошедшего, <span class="pl">należało wypełnić formularz</span>, без <span class="pl">było</span>.</p>

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
    <h3>Сокращения в объявлениях и документах</h3>
    <p class="lead">То же самое поле, что и безличные формы: доска объявлений, договор, письмо из urzędu. Без этого списка текст читается с пропусками.</p>
    <div class="scroll"><table class="vt">
      <tr><th>сокращение</th><th>расшифровка</th><th>значение</th></tr>
      ${SKROTY.map(s => `<tr><td class="c">${s[0]}</td><td class="w" style="white-space:normal">${s[1]}</td><td style="color:var(--muted);white-space:normal">${s[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Точка ставится не всегда, и правило простое.</b> Если сокращение кончается на ту же букву, что и полное слово, точки нет: <span class="pl">dr</span> (dokto<b>r</b>), <span class="pl">mgr</span> (magiste<b>r</b>), <span class="pl">nr</span> (nume<b>r</b>), <span class="pl">wg</span> (wedłu<b>g</b>). Если на другую - точка обязательна: <span class="pl">ok.</span> (okoł<b>o</b>), <span class="pl">godz.</span> (godzin<b>a</b>), <span class="pl">ul.</span> (ulic<b>a</b>), <span class="pl">prof.</span> (profeso<b>r</b>).</div>
    <div class="tip"><b>В косвенном падеже точка возвращается.</b> <span class="pl">dr Kowalski</span> - без точки, но <span class="pl">u dr. Kowalskiego</span> или <span class="pl">u dra Kowalskiego</span>: подразумевается уже <span class="pl">doktora</span>, а сокращение на эту букву не кончается. С женщиной проще - <span class="pl">u dr Kowalskiej</span>, без точки, потому что <span class="pl">doktor</span> в женском употреблении не склоняется.</div>
    <div class="tip"><b><span class="pl">nie wolno</span> и <span class="pl">nie można</span> - не одно и то же.</b> <span class="pl">Nie wolno palić</span> - прямой запрет: курить запрещено. <span class="pl">Nie można wejść, bo drzwi są zamknięte</span> - войти невозможно из-за обстоятельств; в правилах <span class="pl">nie można</span> тоже встречается, но звучит мягче. Человека при необходимости ставим в дательный: <span class="pl">nie wolno mi palić, nie można nam wejść</span>.</div>
    <div class="tip"><b>Номера, которые спросят в любом окне.</b> <span class="pl">PESEL</span> - личный идентификатор жителя, <span class="pl">NIP</span> - налоговый номер, <span class="pl">REGON</span> - номер организации в статистике, <span class="pl">KRS</span> - судебный реестр компаний. Это не сокращения в обычном смысле: они не расшифровываются в речи и склоняются как обычные мужские слова - <span class="pl">podaj PESEL, numer NIP-u</span>.</div>
  </div>${topicPracticeHTML(IMPERS_PRACTICE, "impersonal")}`;
}

function renderPreps(){
  const cs = ["все","Mianownik","Biernik","Dopełniacz","Celownik","Narzędnik","Miejscownik"];
  $("#s-preps").innerHTML = `<div class="panel">
    <h2>Предлог → падеж</h2>
    <p class="lead">Один предлог часто управляет двумя падежами. Разница обычно «где / куда».</p>
    <div class="chips" id="pfilter">${cs.map((c,i) =>
      `<button class="chip" data-f="${c}" aria-pressed="${i===0}"><span class="cp">${c}</span></button>`).join("")}</div>
    <div class="scroll"><table id="ptable" class="vt"></table></div>
    <div class="tip"><b>Где / куда у парных предлогов.</b> У <span class="pl">w, na, pod, nad, za, przed, między</span> положение обычно требует Miejscownik или Narzędnik, направление - Biernik: <span class="pl">Jestem na poczcie</span> / <span class="pl">idę na pocztę</span>. Само движение не всегда означает Biernik: <span class="pl">idę do sklepu</span> требует Dopełniacz, а <span class="pl">idę ulicą</span> - Narzędnik. Учи предлог вместе с падежом.</div>

    <h3>Беглое e: w → we, z → ze</h3>
    <p class="lead">Перед скоплением согласных или похожим звуком предлог обрастает гласной - иначе не выговорить.</p>
    <div class="scroll"><table class="vt">
      <tr><th>предлог</th><th>с беглым e</th><th>примеры</th></tr>
      ${PREP_E.map(p => `<tr><td class="w">${p[0]}</td><td class="g">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}
    </table></div>
    <p class="lead">Чаще всего это происходит перед местоимениями <span class="pl">mną, mnie</span> и словом <span class="pl">wszystkim</span>, а также когда следующее слово начинается на ту же букву или на скопление согласных.</p>
  </div><div id="prepPractice"></div><div id="prepTest"></div>`;
  const draw = f => $("#ptable").innerHTML =
    `<tr><th>предлог</th><th>падеж</th><th>значение</th><th>пример</th></tr>` +
    PREPS.filter(p => f === "все" || p[1] === f).map(p =>
      `<tr><td class="w">${p[0]}</td><td class="c">${p[1]}</td><td>${p[2]}</td><td class="w">${p[3]}</td></tr>`).join("");
  draw("все");
  $("#pfilter").querySelectorAll(".chip").forEach(b => b.onclick = () => {
    $("#pfilter").querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b));
    draw(b.dataset.f);
  });
  renderPrepPractice();
}
function prepositionPracticeHTML(practice){
  return `<section class="practice panel preposition-practice" data-practice="${practice.id}">
    <div class="practice-heading">
      <div><p class="practice-kicker">Практика · ${practice.tasks.length} заданий · ${practiceAnswerCount(practice)} пропусков</p><h2>${practice.title}</h2></div>
      <div class="exercise-progress" aria-live="polite">0 из ${practice.tasks.length} заданий</div>
    </div>
    <p class="lead">${practice.lead}</p>
    <div class="exercise-list">${practice.tasks.map((task, index) => exerciseTaskHTML(task, index + 1)).join("")}</div>
    <div class="practice-actions"><button type="button" class="exercise-link" data-action="reset-practice">Начать заново</button></div>
  </section>`;
}
function prepositionTestHTML(){ return exerciseTestHTML(PREP_TEST, "prepositions", "preposition-test"); }
function renderPrepPractice(){
  $("#prepPractice").innerHTML = PREP_PRACTICE.map(prepositionPracticeHTML).join("");
  $("#prepTest").innerHTML = prepositionTestHTML();
}
function renderAdj(){
  $("#s-adj").innerHTML = `<div class="panel">
    <h2>Прилагательные</h2>
    <p class="lead">Одна парадигма для обычных прилагательных, указательных и склоняемых притяжательных (<span class="pl">mój, twój, nasz</span>). У <span class="pl">ten</span> из неё выпадают три формы: <span class="pl">ten</span>, <span class="pl">ci</span>, <span class="pl">tę</span>. <span class="pl">Jego, jej, ich</span> - исключение: они не склоняются.</p>
    <h3>dobry - полная парадигма</h3>
    <div class="scroll"><table>
      <tr><th>падеж</th><th>муж.</th><th>жен.</th><th>ср.</th><th>мн. мужско-личное</th><th>мн. остальное</th></tr>
      ${ADJ.map(r => `<tr><td>${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td><td class="w">${r[3]}</td><td class="g">${r[4]}</td><td class="g">${r[5]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>После k и g пишется i вместо y.</b> <span class="pl">wysoki → wysokiego, wysokim</span> · <span class="pl">drogi → drogiego, drogim</span>. Это орфография, а не отдельное склонение. А вот <span class="pl">polski → polscy</span> и <span class="pl">drogi → drodzy</span> одной орфографией не объясняются: там чередование основы (<span class="pl">k → c</span>, <span class="pl">g → dz</span>), о нём ниже.</div>
    <h3>Мужско-личное множественное: чередование</h3>
    <p class="lead">Эта форма нужна не только для группы мужчин, но и для любой смешанной группы людей, где мужчина есть хотя бы один: <span class="pl">Piotr i Anna są wysocy</span>.</p>
    <table><tr><th>ед. ч.</th><th>мн. мужско-личное</th></tr>
      <tr><td class="w">dobry</td><td class="g">dobrzy</td></tr>
      <tr><td class="w">młody</td><td class="g">młodzi</td></tr>
      <tr><td class="w">wysoki</td><td class="g">wysocy</td></tr>
      <tr><td class="w">drogi</td><td class="g">drodzy</td></tr>
      <tr><td class="w">miły</td><td class="g">mili</td></tr>
      <tr><td class="w">duży</td><td class="g">duzi</td></tr>
      <tr><td class="w">zmęczony</td><td class="g">zmęczeni</td></tr>
    </table>
    <p class="lead" style="margin-top:10px">Логика та же, что в существительных: r → rz, k → c, g → dz, ł → l, d → dzi, ony → eni.</p>
    <h3>Степени сравнения: как образуется</h3>
    <p class="lead">Суффикс выбирается по тому, чем кончается основа. Превосходная - всегда просто <span class="pl">naj-</span> перед сравнительной.</p>
    <div class="scroll"><table class="vt">
      <tr><th>суффикс</th><th>когда</th><th>примеры</th></tr>
      ${STOPN.map(s => `<tr><td class="c">${s[0]}</td><td style="color:var(--muted);white-space:normal">${s[1]}</td><td class="g" style="white-space:normal">${s[2]}</td></tr>`).join("")}
    </table></div>
    <p class="note">Подсказка по основе покрывает большинство слов, но не все: у <span class="pl">twardy</span> основа кончается стечением <span class="pl">rd</span>, а форма всё равно <span class="pl">twardszy</span>. Сравнительную степень частотных слов надёжнее запоминать вместе с самим прилагательным.</p>

    <h3>Чередования в основе</h3>
    <table>
      <tr><th>было → стало</th><th>примеры</th></tr>
      ${STOPN_ALT.map(s => `<tr><td class="c">${s[0]}</td><td class="g" style="white-space:normal">${s[1]}</td></tr>`).join("")}
    </table>

    <h3>Нерегулярные</h3>
    <table>
      <tr><th>обычная</th><th>сравнительная</th><th>превосходная</th></tr>
      ${STOPN_IRR.map(s => `<tr><td class="w">${s[0]}</td><td class="g">${s[1]}</td><td class="g">${s[2]}</td></tr>`).join("")}
    </table>
    <div class="tip"><b>Часть прилагательных сравнивается аналитически.</b> <span class="pl">bardziej / najbardziej</span> + прилагательное: <span class="pl">bardziej interesujący, najbardziej znany</span>. Так ведут себя прежде всего причастные формы на <span class="pl">-ący</span> и <span class="pl">-ony</span>. Длина и заимствованное происхождение сами по себе правилом не являются: <span class="pl">popularny → popularniejszy</span>, <span class="pl">nowoczesny → nowocześniejszy</span>, <span class="pl">bezpieczny → bezpieczniejszy</span>. Обратное направление - <span class="pl">mniej / najmniej</span>. Смешивать два способа нельзя: <span class="bad">bardziej lepszy</span> - грубая ошибка.</div>
    <div class="tip"><b>Не всё сравнивается.</b> Относительные прилагательные - материал, происхождение, принадлежность к классу - степеней обычно не имеют: <span class="pl">drewniany, polski, ślubny</span>. Отдельно стоят качественные прилагательные с предельным значением: <span class="pl">martwy</span> в прямом смысле степеней тоже не образует.</div>

    <h3>Конструкции сравнения</h3>
    <p class="lead">«Чем» - <span class="pl">niż</span> или <span class="pl">od</span>, но дальше начинается то, чего в русском нет по форме.</p>
    <div class="scroll"><table class="vt">
      <tr><th>конструкция</th><th>значение</th><th>пример</th></tr>
      ${POROWN.map(p => `<tr><td class="w" style="white-space:normal">${p[0]}</td><td style="color:var(--muted)">${p[1]}</td><td class="g" style="white-space:normal">${p[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b><span class="pl">za</span> - это и «слишком», и предлог «за».</b> В значении «слишком» <span class="pl">za</span> непосредственно модифицирует признак или количество: <span class="pl">za drogi, za droga, za drogo, za dużo</span>. Как предлог <span class="pl">za</span> вводит именную группу в падеже: <span class="pl">za domem, za wysokim mężczyzną</span>. Значение и форму показывает вся конструкция, а не само слово <span class="pl">za</span>.</div>
    <div class="tip"><b><span class="pl">coraz</span> и <span class="pl">im…, tym…</span> берут только сравнительную степень.</b> <span class="pl">Coraz lepiej</span>, не <span class="bad">coraz dobrze</span>. В <span class="pl">Im więcej, tym lepiej</span> обе части в сравнительной, запятая обязательна.</div>
    <h3>Подводные камни</h3>
    <ol class="pit">
      <li><b>Прилагательное после <span class="pl">być</span> остаётся в именительном.</b> <span class="pl">Jestem zmęczony</span>, но <span class="pl">jestem lekarzem</span>. Появилось существительное - обе части уходят в творительный: <span class="pl">jestem dobrym lekarzem</span>. Но после <span class="pl">to jest</span> вся группа остаётся в именительном: <span class="pl">To jest dobry lekarz</span>.</li>
      <li><b>Порядок слов.</b> Качество - перед словом (<span class="pl">czarna kawa</span>), вид или тип - после (<span class="pl">kawa rozpuszczalna</span>, <span class="pl">język polski</span>, <span class="pl">dzień dobry</span>). Русский тут почти всегда ставит перед. Само приветствие пишется с маленькой - <span class="pl">Powiedziałem dzień dobry</span>; большая появляется только в начале реплики: <span class="pl">Dzień dobry!</span></li>
      <li><b>Женское <span class="pl">-ą</span> в винительном и творительном совпадает.</b> <span class="pl">Widzę dobrą kawę</span> / <span class="pl">z dobrą kawą</span> - форма одна, падежи разные.</li>
    </ol>
  </div><div id="adjPractice"></div><div id="adjTest"></div>`;
  renderAdjPractice();
}
function adjectivePracticeHTML(practice){
  return `<section class="practice panel adjective-practice" data-practice="${practice.id}">
    <div class="practice-heading">
      <div><p class="practice-kicker">Практика · ${practice.tasks.length} заданий · ${practiceAnswerCount(practice)} пропусков</p><h2>${practice.title}</h2></div>
      <div class="exercise-progress" aria-live="polite">0 из ${practice.tasks.length} заданий</div>
    </div>
    <p class="lead">${practice.lead}</p>
    <div class="exercise-list">${practice.tasks.map((task, index) => exerciseTaskHTML(task, index + 1)).join("")}</div>
    <div class="practice-actions"><button type="button" class="exercise-link" data-action="reset-practice">Начать заново</button></div>
  </section>`;
}
function adjectiveTestHTML(){ return exerciseTestHTML(ADJ_TEST, "adjectives", "adjective-test"); }
function renderAdjPractice(){
  $("#adjPractice").innerHTML = ADJ_PRACTICE.map(adjectivePracticeHTML).join("");
  $("#adjTest").innerHTML = adjectiveTestHTML();
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
    <div class="tip"><b>Конструкции сравнения общие с прилагательными.</b> <span class="pl">coraz szybciej</span> · <span class="pl">im wcześniej, tym lepiej</span> · <span class="pl">jak najszybciej</span> · <span class="pl">o wiele taniej</span> · <span class="pl">za wolno</span> - полная таблица во вкладке «Прилагательные».</div>

    <h3>Частые наречия по смыслу</h3>
    <div class="scroll"><table class="vt">
      <tr><th>группа</th><th>вопрос</th><th>примеры</th></tr>
      ${ADV_LIST.map(a => `<tr><td class="w">${a[0]}</td><td style="color:var(--muted)">${a[1]}</td><td class="g">${a[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Не путать с прилагательным.</b> Наречие относится к глаголу и не склоняется: <span class="pl">On mówi dobrze</span> (наречие) vs <span class="pl">To jest dobry pomysł</span> (прилагательное, согласуется с существительным).</div>
  </div>${topicPracticeHTML(ADV_PRACTICE, "adverb")}`;
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
      <li><b>Формы <span class="pl">niego, niej, nich</span> ставятся после предлога.</b> <span class="pl">Widzę go</span>, но <span class="pl">idę do niego</span>. <span class="pl">Mówię jej</span>, но <span class="pl">mówię o niej</span>. В творительном формы <span class="pl">nim, nią, nimi</span> имеют <span class="pl">n</span> и без предлога: <span class="pl">Interesuję się nim.</span></li>
      <li><b>Короткие формы <span class="pl">go, mu, cię, ci, mi</span> безударные.</b> Не ставятся в начало предложения и никогда после предлога. В начале - только длинные: <span class="pl">Mnie to nie interesuje</span>.</li>
      <li><b>Личное местоимение обычно опускается.</b> Окончание глагола уже содержит лицо: <span class="pl">idę</span>, а не <span class="pl">ja idę</span>. Постоянное <span class="pl">ja</span> звучит либо как нажим, либо как речь иностранца.</li>
      <li><b>Вежливое обращение - третье лицо.</b> <span class="pl">Czy pan ma paragon?</span> Форма на <span class="pl">ty</span> с незнакомым воспринимается как хамство, в отличие от русского, где «вы» - просто множественное.</li>
    </ol>

    <h3>Возвратное: siebie</h3>
    <p class="lead">Одна форма на все лица и оба числа - как русское «себя». Именительного падежа нет.</p>
    <div class="scroll"><table>
      <tr><th>падеж</th><th>форма</th><th>пример</th></tr>
      ${SIEBIE.map(r => `<tr><td>${r[0]}</td><td class="w">${r[1]}</td><td class="${r[1]==="-"?"":"g"}" style="white-space:normal${r[1]==="-"?";color:var(--muted)":""}">${r[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b><span class="pl">się</span> - безударная форма возвратного местоимения.</b> Она встречается в Dopełniacz и Biernik: <span class="pl">boję się, myję się</span>; кроме того, <span class="pl">się</span> выполняет нефлексионные функции при глаголах. Полное <span class="pl">siebie</span> нужно под ударением и после предлога: <span class="pl">bez siebie, do siebie, ze sobą</span>. Сказать <span class="bad">bez się</span> нельзя.</div>

    <h3>Четыре разных się</h3>
    <p class="lead">Форма одна, работы четыре. Понимать, какая именно, нужно затем, что от этого зависит, можно ли заменить <span class="pl">się</span> на <span class="pl">siebie</span> и переводится ли оно вообще.</p>
    <div class="scroll"><table class="vt">
      <tr><th>функция</th><th>примеры</th><th>признак</th></tr>
      ${SIE_FUNC.map(r => `<tr><td class="w">${r[0]}</td><td class="w" style="white-space:normal">${r[1]}</td><td style="color:var(--muted);font-size:var(--fs-note);white-space:normal">${r[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Проверка работает в одну сторону.</b> Поставь вместо <span class="pl">się</span> полное <span class="pl">siebie</span>. Встало - это точно возвратность: <span class="pl">Myję się → Myję siebie, nie dziecko</span>. Не встало - значит один из трёх остальных случаев, и какой именно, тест не скажет: <span class="pl">znamy się</span> (взаимность), <span class="pl">boję się</span> (приросло к глаголу), <span class="pl">mówi się</span> (безличность). Их различают по смыслу, а не по подстановке.</div>

    <h3>Устойчивое с siebie и sobie</h3>
    <div class="scroll"><table class="vt">
      <tr><th>оборот</th><th>значение</th><th>пример</th></tr>
      ${SIEBIE_PHR.map(r => `<tr><td class="w">${r[0]}</td><td style="color:var(--muted)">${r[1]}</td><td class="g" style="white-space:normal">${r[2]}</td></tr>`).join("")}
    </table></div>

    <h3>Частые конструкции с sobie</h3>
    <p class="lead">Две разные вещи под одной формой. <span class="pl">radzić sobie, zdawać sobie sprawę, wyobrazić sobie</span> - готовые конструкции, где <span class="pl">sobie</span> неотделимо и не переводится. <span class="pl">robić sobie kawę, kupić sobie, iść sobie</span> - обычный дательный «себе» плюс оттенок непринуждённости; эти глаголы прекрасно живут и без него.</p>
    <div class="scroll"><table class="vt">
      <tr><th>глагол</th><th>значение</th><th>пример</th></tr>
      ${SOBIE_V.map(r => `<tr><td class="w">${r[0]}</td><td style="color:var(--muted)">${r[1]}</td><td class="g" style="white-space:normal">${r[2]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b><span class="pl">Czego pan sobie życzy?</span></b> - стандартный вопрос продавца и официанта. Здесь без <span class="pl">sobie</span> фраза не складывается. А в <span class="pl">Idź sobie!</span> оно как раз отделимо - и добавляет пренебрежения к простому <span class="pl">Idź!</span></div>
    <h3>ten / ta / to</h3>
    <div class="scroll"><table>
      <tr><th>падеж</th><th>муж.</th><th>жен.</th><th>ср.</th><th>мн. мужско-личное</th><th>мн. остальное</th></tr>
      <tr><td>Mianownik</td><td class="w">ten</td><td class="w">ta</td><td class="w">to</td><td class="g">ci</td><td class="g">te</td></tr>
      <tr><td>Dopełniacz</td><td class="w">tego</td><td class="w">tej</td><td class="w">tego</td><td class="g">tych</td><td class="g">tych</td></tr>
      <tr><td>Celownik</td><td class="w">temu</td><td class="w">tej</td><td class="w">temu</td><td class="g">tym</td><td class="g">tym</td></tr>
      <tr><td>Biernik</td><td class="w">ten / tego</td><td class="w">tę</td><td class="w">to</td><td class="g">tych</td><td class="g">te</td></tr>
      <tr><td>Narzędnik</td><td class="w">tym</td><td class="w">tą</td><td class="w">tym</td><td class="g">tymi</td><td class="g">tymi</td></tr>
      <tr><td>Miejscownik</td><td class="w">tym</td><td class="w">tej</td><td class="w">tym</td><td class="g">tych</td><td class="g">tych</td></tr>
    </table></div>
    <div class="tip"><b>tę или tą.</b> Литературная норма винительного - <span class="pl">tę kawę</span>. В живой речи повсеместно звучит <span class="pl">tą</span>, потому что совпадает с творительным. На письме держись <span class="pl">tę</span>.</div>
    <h3>ten · tamten · taki</h3>
    <p class="lead"><span class="pl">tamten</span> склоняется точно как <span class="pl">ten</span> (<span class="pl">tamtego, tamtemu, tamtym, tamtą</span>), <span class="pl">taki</span> - как прилагательное <span class="pl">dobry</span> (<span class="pl">takiego, takiemu, takim, taką</span>). Отдельных парадигм учить не надо.</p>
    <div class="scroll"><table>
      <tr><th></th><th>этот</th><th>тот</th><th>такой</th></tr>
      ${TAMTEN.map(r => `<tr><td style="color:var(--muted)">${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td><td class="w">${r[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b><span class="pl">ten</span> покрывает и «этот», и «тот».</b> Русское «тот фильм, о котором я говорил» по-польски - <span class="pl">ten film, o którym mówiłem</span>. <span class="pl">tamten</span> нужен только при явном противопоставлении здесь и там: <span class="pl">Nie ten, tamten.</span> · <span class="pl">Ten jest tańszy niż tamten.</span> Ставить <span class="pl">tamten</span> везде, где по-русски «тот», - типичная калька.</div>

    <h3>Притяжательные</h3>
    <div class="scroll pron-possesive-table"><table>
      <tr><th>лицо</th><th>форма</th><th>склоняется</th></tr>
      <tr><td>ja</td><td class="w">mój / moja / moje</td><td>да, как прилагательное</td></tr>
      <tr><td>ty</td><td class="w">twój / twoja / twoje</td><td>да</td></tr>
      <tr><td>on / ono</td><td class="w">jego</td><td class="c">нет - форма одна</td></tr>
      <tr><td>ona</td><td class="w">jej</td><td class="c">нет</td></tr>
      <tr><td>my</td><td class="w">nasz / nasza / nasze</td><td>да</td></tr>
      <tr><td>wy</td><td class="w">wasz / wasza / wasze</td><td>да</td></tr>
      <tr><td>oni / one</td><td class="w">ich</td><td class="c">нет</td></tr>
    </table></div>
    <div class="tip"><b>Свой собственный: <span class="pl">swój</span>.</b> Если обладатель - подлежащее, поляк ставит <span class="pl">swój</span>: <span class="pl">Biorę swój bilet</span>. Правило то же, что с русским «свой», но в польском оно соблюдается строже, чем в русской разговорной речи.</div>

    <h3>sam: сам, один, тот же</h3>
    <div class="scroll"><table>
      <tr><th>падеж</th><th>муж.</th><th>жен.</th><th>ср.</th><th>мн. мужско-личное</th><th>мн. остальное</th></tr>
      ${SAM.map(r => `<tr><td>${r[0]}</td><td class="w">${r[1]}</td><td class="w">${r[2]}</td><td class="w">${r[3]}</td><td class="g">${r[4]}</td><td class="g">${r[5]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>Три значения.</b> <span class="pl">Zrobiłem to sam</span> - сам, без чужой помощи. <span class="pl">Mieszkam sam</span> - один. <span class="pl">ten sam dom</span> - тот же самый. И не путать: <span class="pl">ten sam</span> - «тот же самый», <span class="pl">taki sam</span> - «такой же».</div>

    <h3>wszyscy / wszystko</h3>
    <p class="lead">Мужско-личное <span class="pl">wszyscy</span> и не-мужско-личное <span class="pl">wszystkie</span> расходятся только в именительном и винительном - в остальных падежах форма общая.</p>
    <div class="scroll"><table>
      <tr><th>падеж</th><th>все - мужчины</th><th>все - остальное</th><th>всё - ср. ед.</th></tr>
      ${WSZ.map(r => `<tr><td>${r[0]}</td><td class="g">${r[1]}</td><td class="g">${r[2]}</td><td class="w">${r[3]}</td></tr>`).join("")}
    </table></div>
    <div class="tip"><b>wszyscy или wszystkie.</b> О людях, где есть хоть один мужчина, - <span class="pl">wszyscy</span>: <span class="pl">Wszyscy przyszli</span>. О вещах, животных, женщинах и детях - <span class="pl">wszystkie</span>: <span class="pl">Wszystkie bilety są sprzedane</span>. Тот же тест <span class="pl">ci / te</span>, что и у существительных.</div>

    <h3>Готовые обороты со wszystko</h3>
    <div class="scroll"><table class="vt">
      <tr><th>оборот</th><th>перевод</th><th>что за форма</th></tr>
      ${WSZ_PHR.map(r => `<tr><td class="w">${r[0]}</td><td>${r[1]}</td><td class="note">${r[2]}</td></tr>`).join("")}
    </table></div>

    <h3>każdy, inny, żaden, oba</h3>
    <div class="scroll"><table class="vt">
      <tr><th>слово</th><th>значение</th><th>как ведёт себя</th></tr>
      ${OKRESL.map(r => `<tr><td class="w">${r[0]}</td><td class="g">${r[1]}</td><td style="white-space:normal;font-size:var(--fs-note)">${r[2]}</td></tr>`).join("")}
    </table></div>
  </div>${topicPracticeHTML(PRON_PRACTICE, "pronoun")}`;
}

function renderBridge(){
  const falseGroups = [...new Set(FALSE.map(f => f[3]))];
  $("#s-bridge").innerHTML = `<div class="panel">
    <h2>Фонетические соответствия</h2>
    <p class="lead">Работает на любом незнакомом слове.</p>
    <div class="scroll"><table><tr><th>русский</th><th>польский</th><th>примеры</th></tr>
      ${PHON.map(p => `<tr><td class="c">${p[0]}</td><td class="c">${p[1]}</td><td class="w">${p[2]}</td></tr>`).join("")}</table></div>
    <h3>Белорусский мост</h3>
    <p class="pl">kawa (кава) · herbata (гарбата) · dziękuję (дзякуй) · ciekawy (цікавы) · skarpetki (шкарпэткі) · szukać (шукаць) · rozmawiać (размаўляць) · ołówek (аловак) · rower (ровар)</p>
    <div class="tip"><b>ł - это ў.</b> <span class="pl">był</span> = «быў», <span class="pl">bułka</span> = «буўка». Звук уже в артикуляции с детства; русскоязычные ставят его месяцами. Проблема остаётся только на письме.</div>
    <h3>Ложные друзья</h3>
    <p class="lead">100 частых ловушек для русско- и белорусскоязычных. В таблицах есть и полностью разные слова, и частичные ложные друзья: у последних совпадает одно значение, но привычный перенос другого значения приводит к ошибке.</p>
    <div class="false-friends">
      ${falseGroups.map(group => `<h4>${group}</h4>
        <div class="scroll"><table class="vt"><tr><th>слово</th><th>значит</th><th>не значит</th></tr>
          ${FALSE.filter(f => f[3] === group).map(f => `<tr><td class="w">${f[0]}</td><td>${f[1]}</td><td class="note">${f[2]}</td></tr>`).join("")}
        </table></div>`).join("")}
    </div>
  </div>${topicPracticeHTML(BRIDGE_PRACTICE, "bridge")}`;
}

function vocabularyTable(words, labels){
  return `<div class="scroll vocabulary-list"><table class="vt">
    <thead><tr>${labels.map(label => `<th>${label}</th>`).join("")}</tr></thead>
    <tbody>${words.map(word => `<tr>
      <td class="w">${word[0]}</td>
      <td style="color:var(--muted);font-size:var(--fs-note)">${word[1]}</td>
      <td class="cq">${word[2]}</td>
      <td class="w" style="white-space:normal">${word[3]}</td>
    </tr>`).join("")}</tbody>
  </table></div>`;
}

function renderVocabulary(){
  $("#s-vocab").innerHTML = `<div class="panel">
    <h2>Словарь</h2>
    <p class="lead">400 полезных слов для повседневного общения. Это не механический частотный топ: здесь слова, которыми можно говорить о себе, планах, людях и обычных ситуациях. К каждому слову - форма, которая чаще всего нужна в речи, и короткий живой пример.</p>
    <div class="tip"><b>Как пользоваться.</b> Не пытайся выучить таблицу целиком. Выбери 5–10 слов на сегодня, прочитай примеры вслух и сразу составь с ними по одной фразе про себя.</div>

    <h3>100 глаголов</h3>
    <p class="lead">Три формы дают всю парадигму: <span class="pl">ja</span> и <span class="pl">oni</span> - малое крыло, <span class="pl">ty</span> - большое. Формы <span class="pl">on / ona</span> в прошедшем показывают чередование основы.</p>
    <div class="scroll vocabulary-list">${listHTML("")}</div>
    <div class="tip"><b>Последняя колонка - не всегда видовая пара.</b> Чаще всего это она: <span class="pl">robić ↔ zrobić</span>, <span class="pl">kupować ↔ kupić</span>. Но <span class="pl">szukać → znaleźć</span> - результат поиска, а не совершенный вид слова «искать». Колонка отвечает на практический вопрос: каким словом сказать результат.</div>

    <h3>100 полезных существительных</h3>
    <p class="lead">Формы всегда идут в одном порядке: род · родительный единственного · именительный множественного. Если обычной множественной формы нет или она не нужна в начальной речи, стоит <span class="pl">-</span>. Родительный помогает сразу говорить: <span class="pl">nie mam czasu, idę do sklepu, bez telefonu</span>.</p>
    ${vocabularyTable(VOCAB_NOUNS, ["слово", "перевод", "род · род. · мн.", "пример"])}

    <h3>100 полезных прилагательных</h3>
    <p class="lead">Мужская форма уже стоит в первой колонке; дальше даны женская, средняя и сравнительная. Там, где сравнительная степень для начальной речи не нужна, стоит <span class="pl">-</span>. Для рассказа о себе особенно полезны формы: <span class="pl">jestem zmęczony / zmęczona, jestem gotowy / gotowa</span>.</p>
    ${vocabularyTable(VOCAB_ADJECTIVES, ["слово", "перевод", "жен. · сред. · сравн.", "пример"])}

    <h3>100 полезных наречий и выражений</h3>
    <p class="lead">Здесь есть наречия, частицы и готовые выражения - всё, что помогает связать знакомые слова в нормальную речь: назвать время, степень, место, мнение и темп действия.</p>
    ${vocabularyTable(VOCAB_ADVERBS, ["слово", "перевод", "сравнение", "пример"])}
  </div>`;
}

function talkRows(rows){
  return `<div class="scroll"><table class="vt"><tr><th>по-польски</th><th>по-русски</th><th>вариант для себя</th></tr>
    ${rows.map(row => `<tr><td class="w">${row[0]}</td><td style="color:var(--muted);font-size:var(--fs-note)">${row[1]}</td><td class="g" style="white-space:normal">${row[2]}</td></tr>`).join("")}
  </table></div>`;
}

function renderTalk(){
  const about = [
    ["Mam na imię … i mieszkam w … .", "Меня зовут …, и я живу в … .", "Podstaw swoje imię i miasto."],
    ["Uczę się polskiego od … .", "Я учу польский уже … .", "od miesiąca / od roku"],
    ["Mój polski jest jeszcze słaby, ale staram się mówić.", "Мой польский пока слабый, но я стараюсь говорить.", "bardzo słaby / coraz lepszy"],
    ["Pracuję jako … / studiuję … .", "Я работаю … / учусь на … .", "Powiedz tylko tyle, ile chcesz."],
    ["W wolnym czasie lubię … .", "В свободное время я люблю … .", "czytać / podróżować / spotykać się ze znajomymi"],
    ["Ostatnio dużo …, dlatego … .", "В последнее время я много …, поэтому … .", "pracuję / uczę się / odpoczywam"],
  ];
  const day = [
    ["Dzisiaj miałem / miałam dość intensywny dzień.", "Сегодня у меня был довольно насыщенный день.", "spokojny / dobry / trudny"],
    ["Rano …, a potem … .", "Утром я …, а потом … .", "pracowałem / poszedłem na spacer"],
    ["Po pracy chcę trochę odpocząć.", "После работы хочу немного отдохнуть.", "ugotować kolację / spotkać się z …"],
    ["W weekend spotkałem / spotkałam się ze znajomymi.", "На выходных я встретился/-ась с друзьями.", "byłem / byłam w domu"],
    ["Jutro planuję … .", "Завтра я планирую … .", "uczyć się / pójść do … / nic szczególnego"],
  ];
  const cafe = [
    ["Poproszę kawę i wodę, proszę.", "Мне, пожалуйста, кофе и воду.", "Zmień napój albo dodaj ciasto."],
    ["Czy mogę prosić o menu?", "Можно меню, пожалуйста?", "Короткая вежливая просьба."],
    ["Dla mnie będzie … .", "Для меня будет … .", "kawa z mlekiem / zupa / kanapka"],
    ["Czy mogę zapłacić kartą?", "Можно оплатить картой?", "Картой - kartą, наличными - gotówką."],
    ["Poproszę rachunek.", "Счёт, пожалуйста.", "В Польше это естественная формула."],
  ];
  const shop = [
    ["Szukam … .", "Я ищу … .", "prezentu / ładowarki / sklepu spożywczego"],
    ["Czy mają państwo …?", "У вас есть …?", "Размер, товар или нужная вещь."],
    ["Czy mogę to przymierzyć?", "Можно это примерить?", "Для одежды и обуви."],
    ["Ile to kosztuje?", "Сколько это стоит?", "Простой вопрос о цене."],
    ["Wezmę to.", "Я это возьму.", "Когда решил купить."],
  ];
  const transport = [
    ["Przepraszam, gdzie jest przystanek?", "Извините, где остановка?", "Можно уточнить: autobusowy / tramwajowy."],
    ["Czy ten autobus jedzie do centrum?", "Этот автобус едет в центр?", "Замени centrum на нужное место."],
    ["O której odjeżdża pociąg?", "Во сколько отправляется поезд?", "Odjeżdża - отправляется по расписанию."],
    ["Muszę wysiąść na następnym przystanku.", "Мне нужно выйти на следующей остановке.", "Wysiąść - выйти из транспорта."],
    ["Czy to jest daleko stąd?", "Это далеко отсюда?", "Ответ часто: blisko / daleko / około dziesięć minut."],
  ];
  const rescue = [
    ["Chwileczkę, muszę się zastanowić.", "Секундочку, мне нужно подумать.", "Даёт время сформулировать ответ."],
    ["Nie wiem, jak to powiedzieć po polsku, ale…", "Не знаю, как сказать это по-польски, но…", "После этого скажи проще или покажи слово."],
    ["Czy możesz powiedzieć to trochę wolniej?", "Можешь сказать немного медленнее?", "Нормальная вежливая просьба."],
    ["Czy możesz powtórzyć?", "Можешь повторить?", "Коротко и естественно."],
    ["Rozumiem mniej więcej.", "Я примерно понимаю.", "Если общий смысл понятен, но не всё."],
    ["Nie rozumiem jeszcze wszystkiego.", "Я пока не всё понимаю.", "Честно и без извинений."],
    ["Co to znaczy po rosyjsku?", "Что это значит по-русски?", "Можно заменить rosyjsku на angielsku."],
    ["Czy dobrze rozumiem, że…?", "Я правильно понимаю, что…?", "Повтори смысл своими словами."],
    ["Możesz podać przykład?", "Можешь привести пример?", "Когда новое слово неясно."],
    ["Uczę się, więc czasem robię błędy.", "Я учусь, поэтому иногда ошибаюсь.", "Снимает напряжение в начале разговора."],
  ];
  const fillersCore = [
    ["no", "ну; да, ага", "No tak. · No nie wiem.", "Самое безопасное слово для начала ответа и короткого согласия."],
    ["właśnie", "именно; вот-вот; как раз", "No właśnie!", "Подтверждает мысль собеседника; одно из самых естественных польских слов."],
    ["znaczy", "то есть; в смысле", "No, znaczy, jutro nie mogę.", "Быстро вводит уточнение или переформулировку."],
    ["w sumie", "в общем; вообще-то", "W sumie to dobry pomysł.", "Смягчает или слегка корректирует сказанное."],
    ["po prostu", "просто", "Po prostu nie wiem.", "Объясняет без лишнего нажима."],
    ["jakoś tak", "как-то так", "Było jakoś tak spokojnie.", "Закрывает неточную мысль, когда точное слово не нашлось."],
  ];
  const fillersRepair = [
    ["no wiesz…", "ну, знаешь…", "No wiesz, trochę się stresuję.", "Только с ровесником или близким человеком - обращение на ty."],
    ["wie pan / wie pani…", "понимаете…", "Wie pani, nie jestem pewien.", "Вежливый вариант для незнакомого человека."],
    ["jak to powiedzieć…", "как это сказать…", "Jak to powiedzieć… nie do końca rozumiem.", "Честная пауза, после которой можно сказать проще."],
    ["no więc…", "ну так вот…", "No więc, spotkaliśmy się wczoraj.", "Помогает начать мысль заново после паузы."],
    ["słuchaj…", "слушай…", "Słuchaj, mam pytanie.", "Начало реплики на ty; с незнакомыми лучше не использовать."],
    ["coś takiego / takie coś", "что-то такое; такая штука", "To było coś takiego jak małe spotkanie.", "Временно заменяет забытое слово."],
    ["nieważne", "неважно; ладно", "Nieważne, zacznę jeszcze raz.", "Можно оборвать фразу и спокойно начать заново."],
    ["w każdym razie", "во всяком случае; в общем", "W każdym razie, muszę już iść.", "Возвращает разговор к главной мысли."],
    ["powiedzmy / że tak powiem", "скажем; так сказать", "Powiedzmy, że było ciekawie.", "Помечает приблизительность; że tak powiem звучит чуть книжнее."],
  ];
  const fillersSoft = [
    ["chyba", "наверное; кажется", "Chyba jutro pada.", "Лучший способ не рисковать категоричным утверждением."],
    ["raczej", "скорее", "Raczej nie dam rady.", "Мягкое несогласие или отказ."],
    ["generalnie", "в целом", "Generalnie wszystko jest w porządku.", "Удобно для общего вывода."],
    ["tak naprawdę", "на самом деле", "Tak naprawdę wolę zostać w domu.", "Уточняет настоящую причину или мнение."],
    ["jasne", "ясно; конечно", "- Możesz pomóc? - Jasne.", "Короткое естественное согласие."],
    ["no nie? / prawda?", "да?; правда?", "To dobry plan, no nie?", "Мягко передаёт ход собеседнику и ждёт подтверждения."],
  ];
  $("#s-talk").innerHTML = `<div class="panel talk-panel">
    <h2>Разговорная практика</h2>
    <p class="lead">Цель этого раздела - не вспомнить отдельное слово, а иметь готовую опору для реального разговора. Начни с одной темы, вслух замени детали на свои и только потом переходи к диалогу.</p>

    <h3>Готовые фразы: рассказываю о себе</h3>
    ${talkRows(about)}

    <h3>Готовые фразы: день, выходные и планы</h3>
    ${talkRows(day)}

    <h3>Кафе и магазин</h3>
    ${talkRows(cafe)}
    ${talkRows(shop)}

    <h3>Транспорт и дорога</h3>
    ${talkRows(transport)}

    <h3>Слова-смазки: чтобы речь не останавливалась</h3>
    <p class="lead">Это не «мусорные» слова, а маленькие опоры для живой речи. Возьми сначала шесть из первой таблицы: они помогут выиграть секунду, переформулировать мысль и звучать естественнее, не маскируя ошибку.</p>
    ${talkRows(fillersCore)}
    <h4>Пауза, поиск слова и перезапуск фразы</h4>
    ${talkRows(fillersRepair)}
    <h4>Смягчить мнение или передать ход собеседнику</h4>
    ${talkRows(fillersSoft)}
    <div class="tip"><b>Как это произносить.</b> Связка должна быть короткой и в обычном темпе: <span class="pl">no, znaczy…</span>, потом сразу мысль. Не растягивай <span class="pl">znaczyyy</span>: лучше короткая пауза после него. Не злоупотребляй <span class="pl">jakby</span> - это польское «как бы», которое у многих уже стало словом-паразитом.</div>

    <h3>Конструктор фраз</h3>
    <p class="lead">Выбери варианты в строке - ниже сразу появится твоя фраза. Собери 3–4 варианта по одному шаблону: так конструкция начинает работать в живой речи.</p>
    <div class="talk-builders">
      <article class="talk-builder" data-talk-builder><b>1. Что происходит сегодня</b><div class="talk-fields"><label><span>когда</span><select><option>Dzisiaj</option><option>W weekend</option><option>Ostatnio</option></select></label><label><span>что делаю</span><select><option>uczę się polskiego</option><option>pracuję w domu</option><option>spotykam się ze znajomymi</option></select></label></div><output class="talk-example" aria-live="polite">Dzisiaj uczę się polskiego.</output></article>
      <article class="talk-builder" data-talk-builder><b>2. Что планируешь</b><div class="talk-fields"><label><span>когда</span><select><option>Jutro</option><option>W tym tygodniu</option><option>W weekend</option></select></label><label><span>план</span><select><option>chcę odpocząć</option><option>planuję pójść na spacer</option><option>chcę spotkać się z przyjaciółmi</option></select></label></div><output class="talk-example" aria-live="polite">Jutro chcę odpocząć.</output></article>
      <article class="talk-builder" data-talk-builder><b>3. Что думаешь</b><div class="talk-fields"><label><span>начало</span><select><option>Moim zdaniem</option><option>Myślę, że</option><option>Wydaje mi się, że</option></select></label><label><span>мнение</span><select><option>to dobry pomysł</option><option>ten film jest ciekawy</option><option>to miejsce jest bardzo miłe</option></select></label></div><output class="talk-example" aria-live="polite">Moim zdaniem to dobry pomysł.</output></article>
      <article class="talk-builder" data-talk-builder><b>4. Как себя чувствуешь</b><div class="talk-fields"><label><span>состояние</span><select><option>Nie mam dziś dużo energii</option><option>Czuję się bardzo dobrze</option><option>Mam dziś dobry humor</option></select></label><label><span>что дальше</span><select><option>i dlatego chcę odpocząć</option><option>i dlatego zostaję w domu</option><option>ale chcę jeszcze trochę się uczyć</option></select></label></div><output class="talk-example" aria-live="polite">Nie mam dziś dużo energii i dlatego chcę odpocząć.</output></article>
    </div>
    <div class="tip"><b>Мини-задание.</b> Возьми любой шаблон и произнеси три варианта о себе. Не ищи идеальную грамматику во время речи: сначала закончи мысль, потом проверь один непонятный момент в справочнике.</div>

    <h3>Мини-диалоги</h3>
    <div class="talk-dialogues">
      <article><p class="talk-situation">Знакомый спрашивает о выходных</p><p><b>- Co robiłeś w weekend?</b><br>- W weekend odpoczywałem w domu. W niedzielę spotkałem się ze znajomymi.</p><p class="talk-prompt">Твоя очередь: ответь, что делал именно ты. Достаточно двух фраз.</p></article>
      <article><p class="talk-situation">Разговор о польском</p><p><b>- Jak długo uczysz się polskiego?</b><br>- Uczę się od … . Jeszcze nie mówię dobrze, ale staram się rozmawiać z ludźmi.</p><p class="talk-prompt">Замени срок и добавь, что тебе даётся легко или трудно.</p></article>
      <article><p class="talk-situation">Приглашение</p><p><b>- Może pójdziemy jutro na kawę?</b><br>- Chętnie. O której? / Niestety, jutro nie mogę. Może w piątek?</p><p class="talk-prompt">Сначала согласись, затем в другом варианте вежливо откажись и предложи время.</p></article>
      <article><p class="talk-situation">Не понял собеседника</p><p><b>- …</b><br>- Przepraszam, czy możesz powtórzyć trochę wolniej? Rozumiem mniej więcej, ale nie wszystko.</p><p class="talk-prompt">Это не ошибка, а нормальный ход разговора.</p></article>
    </div>

    <h3>Фразы спасения</h3>
    ${talkRows(rescue)}
  </div>`;
}

const LABEL = Object.fromEntries(TABS);
const VLABEL = Object.fromEntries(VTABS);
let curTab = TABS[0][0];

const GROUP_OF = {};
GROUPS.forEach((g, i) => g[1].forEach(([id]) => GROUP_OF[id] = i));

const navItemHTML = (id, note) =>
  `<a id="tab-${id}" data-s="${id}" href="#${id}"><b>${LABEL[id]}</b><span>${note}</span></a>`;

$("#nav").innerHTML =
  `<a id="tab-${TABS[0][0]}" class="nav-home" data-s="${TABS[0][0]}" href="#${TABS[0][0]}"><b>${LABEL[TABS[0][0]]}</b></a>` +
  GROUPS.map((g, i) => `<div class="navgroup" data-g="${i}">
    <button type="button" class="navgroup-btn" id="ng-${i}" aria-expanded="false" aria-controls="ngp-${i}">${g[0]}</button>
    <div class="navpop" id="ngp-${i}" aria-labelledby="ng-${i}">${g[1].map(([id, note]) => navItemHTML(id, note)).join("")}</div>
  </div>`).join("");

$("#navmenu").innerHTML = `<section><h4>Начало</h4>
    <a data-s="${TABS[0][0]}" href="#${TABS[0][0]}">${LABEL[TABS[0][0]]}</a></section>` +
  GROUPS.map(g => `<section><h4>${g[0]}</h4>
    ${g[1].map(([id]) => `<a data-s="${id}" href="#${id}">${LABEL[id]}</a>`).join("")}
  </section>`).join("");

function closeNavPops(except){
  $("#nav").querySelectorAll(".navgroup-btn[aria-expanded='true']").forEach(b => {
    if(b !== except) b.setAttribute("aria-expanded", "false");
  });
}
function closeNavMenu(){
  $("#navmenu").classList.remove("on");
  $("#navall").setAttribute("aria-expanded", "false");
}
function closeNav(){ closeNavPops(); closeNavMenu(); }

function markNav(id){
  const group = GROUP_OF[id];
  document.querySelectorAll("#nav [data-s],#navmenu [data-s]").forEach(a => {
    if(a.dataset.s === id) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  $("#nav").querySelectorAll(".navgroup").forEach(g =>
    g.classList.toggle("is-current", +g.dataset.g === group));
  const cur = $("#navall .navall-txt");
  if(cur) cur.textContent = id === TABS[0][0] ? "Все разделы" : LABEL[id];
}

function showTab(id, scroll){
  if(!TABS.some(t => t[0] === id)) id = TABS[0][0];
  curTab = id;
  markNav(id);
  document.querySelectorAll(".sec").forEach(s => s.classList.toggle("on", s.id === id));
  if(scroll !== false) window.scrollTo({top:0});
}

$("#nav").addEventListener("click", e => {
  const btn = e.target.closest(".navgroup-btn");
  if(btn){
    const scrollTop = window.scrollY;
    const open = btn.getAttribute("aria-expanded") !== "true";
    closeNavPops(btn);
    closeNavMenu();
    btn.setAttribute("aria-expanded", open);

    requestAnimationFrame(() => {
      if(window.scrollY !== scrollTop) window.scrollTo(0, scrollTop);
    });
    return;
  }
  const link = e.target.closest("[data-s]");
  if(!link) return;
  showTab(link.dataset.s);
  writeHash();
  closeNav();
});

$("#navall").onclick = e => {
  const scrollTop = window.scrollY;
  const open = !$("#navmenu").classList.contains("on");
  closeNavPops();
  $("#navmenu").classList.toggle("on", open);
  $("#navall").setAttribute("aria-expanded", open);
  requestAnimationFrame(() => {
    if(window.scrollY !== scrollTop) window.scrollTo(0, scrollTop);
  });
};
$("#navmenu").addEventListener("click", e => {
  const link = e.target.closest("[data-s]");
  if(!link) return;
  showTab(link.dataset.s);
  writeHash();
  closeNavMenu();
  $("#navall").focus();
});
document.addEventListener("keydown", e => {
  if(e.key !== "Escape") return;
  const openBtn = $("#nav .navgroup-btn[aria-expanded='true']");
  if(openBtn){ closeNavPops(); openBtn.focus(); return; }
  if($("#navmenu").classList.contains("on")){ closeNavMenu(); $("#navall").focus(); }
});
document.addEventListener("click", e => {
  if(!e.target.closest("#navwrap")) closeNav();
});
document.addEventListener("focusin", e => {
  if(!e.target.closest("#navwrap")) closeNav();
});

function setHeadH(){
  const hdr = document.querySelector("header"), nav = $("#navwrap");
  const off = nav.getBoundingClientRect().top - hdr.getBoundingClientRect().top;
  const narrow = matchMedia("(max-width:700px)").matches;
  const st = document.documentElement.style;
  st.setProperty("--brand-h", (narrow ? off : 0) + "px");
  st.setProperty("--head-h", (narrow ? hdr.offsetHeight - off : hdr.offsetHeight) + "px");
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
if(document.fonts) document.fonts.ready.then(() => { navRowWidth = 0; fitNav(); });
markNav(curTab);
fitNav();
setHeadH();

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
    renderChips(); renderNumTog(); renderCase();
  } else if(tab === "s-verbs"){
    if(parts[1] && VTABS.some(v => v[0] === parts[1])) curV = parts[1];
    renderVerbs();
  }
  showTab(tab);

  const anchor = parts.find(p => p.startsWith("~"));
  if(anchor) scrollToHeading(tab, anchor.slice(1));
}

const SMOOTH = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
function scrollToHeading(tab, h){
  const el = document.querySelector(`#${tab} [data-h="${CSS.escape(h)}"]`);
  if(!el) return;

  const off = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--head-h")) || 0;
  const y = window.scrollY + el.getBoundingClientRect().top - off - 12;
  window.scrollTo({top:Math.max(0, y), behavior:SMOOTH});
}

$("#nav").querySelectorAll("[data-s]").forEach(b => b.onclick = () => {
  showTab(b.dataset.s);
  writeHash();
});
window.addEventListener("hashchange", () => {
  if(location.hash === selfWrite){ selfWrite = ""; return; }
  applyHash();
});

const slug = s => norm(s).replace(/[^a-zа-яё0-9]+/g, "-").replace(/^-+|-+$/g, "");
function linkHeadings(root){
  const used = new Set();
  root.querySelectorAll("h3").forEach(h => {
    if(h.querySelector(".alink")) return;
    const base = slug(h.textContent) || "razdel";
    let id = base, i = 2;
    while(used.has(id)) id = base + "-" + (i++);
    used.add(id);
    h.dataset.h = id;
    if(!h.closest(".content-variant")) h.id = "~" + id;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "alink";
    b.title = `Скопировать ссылку на «${h.textContent.trim()}»`;
    b.setAttribute("aria-label", b.title);
    h.appendChild(b);
  });
}
document.addEventListener("click", e => {
  const b = e.target.closest(".alink");
  if(!b) return;
  const h = b.closest("h3");
  const hash = `${hashFor()}/~${h.dataset.h}`;
  selfWrite = hash;
  history.replaceState(null, "", hash);
  const ok = () => { b.classList.add("ok"); setTimeout(() => b.classList.remove("ok"), 1400); };
  try{ navigator.clipboard.writeText(location.href).then(ok, ok); }catch(err){ ok(); }
});

let INDEX = [];

const clean = s => s.replace(/\s+/g, " ").trim();
function nodeText(node){
  if(node.tagName === "TR")
    return clean([...node.children].map(td => clean(td.textContent)).filter(Boolean).join(" · "));
  if(node.parentElement && node.parentElement.classList.contains("ngrid"))
    return clean([...node.children].map(x => clean(x.textContent)).filter(Boolean).join(" "));
  return clean(node.textContent);
}

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

  for(const [id, label] of TABS){
    if(id === "s-index" || id === "s-cases" || id === "s-verbs") continue;
    harvest($("#" + id).innerHTML, {tab:id, label});
  }

  for(const c of CASES)
    for(const num of ["sg","pl"])
      harvest(casePanelHTML(c, num),
        {tab:"s-cases", label:"Существительные", sub:`${c.name} · ${num==="sg"?"ед. ч.":"мн. ч."}`, cs:c.id, num});

  const VMAP = {conj:vConj, czasy:vCzasy, tryby:vTryby, formy:vFormy, rekcja:vRekcja};
  for(const key of Object.keys(VMAP))
    harvest(VMAP[key](), {tab:"s-verbs", label:"Глаголы", sub:VLABEL[key], vs:key});

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
  if(!ts.length || (ts.length === 1 && ts[0].length < 2)) return {list:[], total:0};
  const hits = [];
  for(const e of INDEX){
    let score = 0, ok = true;
    for(const t of ts){
      const at = e.key.indexOf(t);
      if(at < 0){ ok = false; break; }
      score += at;
    }
    if(!ok) continue;

    hits.push({e, score: score / ts.length + e.text.length / 40});
  }
  hits.sort((a,b) => a.score - b.score);
  return {list: hits.slice(0, 30).map(h => h.e), total: hits.length};
}

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

let hitList = [], hitSel = -1;

function openSearch(on){
  $("#sres").classList.toggle("on", on);
  $("#gsearch").setAttribute("aria-expanded", on);
  if(!on){ $("#gsearch").removeAttribute("aria-activedescendant"); hitSel = -1; }
}

function selectHit(i){
  const items = $("#sres").querySelectorAll(".sr");
  if(!items.length) return;
  hitSel = (i + items.length) % items.length;
  items.forEach((b, n) => b.setAttribute("aria-selected", n === hitSel));
  const on = items[hitSel];
  on.scrollIntoView({block:"nearest"});
  $("#gsearch").setAttribute("aria-activedescendant", on.id);
}

function renderResults(q){
  const box = $("#sres");
  if(!q.trim()){ openSearch(false); box.innerHTML = ""; hitList = []; return; }
  const {list, total} = search(q);
  hitList = list; hitSel = -1;
  openSearch(true);
  if(!list.length){
    box.innerHTML = tokens(q).every(t => t.length < 2)
      ? `<div class="snone">Введите хотя бы два символа</div>`
      : `<div class="snone">Ничего не нашлось</div>`;
    return;
  }
  box.innerHTML = list.map((e,i) => `<button class="sr" role="option" id="sr-${i}" data-i="${i}" aria-selected="false">
      <span class="sr-w">${e.label}${e.sub?` · ${e.sub}`:""}${e.head?` · ${e.head}`:""}</span>
      <span class="sr-t">${mark(e.text.length > 140 ? e.text.slice(0,140) + "…" : e.text, q)}</span>
    </button>`).join("") +
    (total > list.length ? `<div class="scount">показаны ${list.length} из ${total} - уточните запрос</div>` : "");
  box.querySelectorAll(".sr").forEach(b => b.onclick = () => goTo(hitList[+b.dataset.i]));
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

  const sec = $("#" + e.tab);
  sec.querySelectorAll(".hit").forEach(x => x.classList.remove("hit"));
  const target = [...sec.querySelectorAll("tr, li, p, .tip, .ngrid div")]
    .find(n => nodeText(n) === e.text);

  sec.focus({preventScroll:true});
  if(target){
    target.classList.add("hit");
    target.scrollIntoView({block:"center", behavior:SMOOTH});
    setTimeout(() => target.classList.remove("hit"), 2600);
  } else {
    window.scrollTo({top:0});
  }
}

function closeSearch(){
  openSearch(false);
  $("#gsearch").blur();
}

$("#gsearch").oninput = e => renderResults(e.target.value);
$("#gsearch").onfocus = e => { if(e.target.value) renderResults(e.target.value); };
$("#gsearch").onkeydown = e => {
  if(e.key === "Escape"){ e.target.value = ""; renderResults(""); closeSearch(); return; }
  if(e.key === "ArrowDown" || e.key === "ArrowUp"){
    e.preventDefault();
    if(!$("#sres").classList.contains("on")) renderResults(e.target.value);
    selectHit(hitSel + (e.key === "ArrowDown" ? 1 : -1));
    return;
  }
  if(e.key === "Home" || e.key === "End"){
    if(!$("#sres .sr")) return;
    e.preventDefault();
    selectHit(e.key === "Home" ? 0 : -1);
    return;
  }
  if(e.key === "Enter"){
    const pick = $("#sres .sr[aria-selected='true']") || $("#sres .sr");
    if(pick) pick.click();
  }
};
document.addEventListener("click", e => {
  if(!e.target.closest("#sbox")) openSearch(false);
});
document.addEventListener("keydown", e => {
  if((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) &&
      document.activeElement !== $("#gsearch")){
    e.preventDefault();
    $("#gsearch").focus();
    $("#gsearch").select();
  }
});

const IDX_SUB = {
  "s-cases":CASES.map(c => [`#s-cases/${c.id}/sg`, c.name]),
  "s-verbs":VTABS.map(([id, label]) => [`#s-verbs/${id}`, label])
};
const idxSubHTML = id => IDX_SUB[id]
  ? `<div class="idx-sub">${IDX_SUB[id].map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</div>`
  : "";

function renderIndex(){
  $("#s-index").innerHTML = `<div class="panel">
    <h2>Справочник</h2>
    <p class="index-intro">Без лишней теории: выберите тему или найдите нужную форму поиском.</p>
    <div class="idx">${GROUPS.map(g => `<section>
      <h3>${g[0]}</h3>
      ${g[1].map(([id, note]) => `<a class="idx-a" href="#${id}" data-s="${id}">
        <b>${LABEL[id]}</b><span>${note}</span></a>${idxSubHTML(id)}`).join("")}
    </section>`).join("")}</div>
    <section class="index-plan" aria-labelledby="index-plan-title">
      <h3 id="index-plan-title">Личный маршрут</h3>
      <a class="index-plan-card" href="plan-40/">
        <span class="index-plan-number">40</span>
        <span class="index-plan-copy"><b>План на 40 дней</b><span>Ежедневный путь от опоры в грамматике к разговорному B1.</span></span>
        <span class="index-plan-action">Открыть <span aria-hidden="true">→</span></span>
      </a>
    </section>
  </div>`;
}
$("#s-index").addEventListener("click", e => {
  const b = e.target.closest(".idx-a");
  if(!b) return;
  showTab(b.dataset.s);
  writeHash();
});

const THEMES = [["light","светлая"],["dark","тёмная"]];
const SYSDARK = matchMedia("(prefers-color-scheme: dark)");
function readTheme(){
  try{
    const t = localStorage.getItem("theme");
    if(t === "light" || t === "dark") return t;
  }catch(e){}
  return null;
}
function applyTheme(v){
  if(v) document.documentElement.dataset.theme = v;
  else delete document.documentElement.dataset.theme;
  const cur = v || (SYSDARK.matches ? "dark" : "light");
  $("#theme").innerHTML = THEMES.map(([id, label]) =>
    `<button type="button" data-t="${id}" aria-pressed="${id===cur}">${label}</button>`).join("");
  $("#theme").querySelectorAll("button").forEach(b => b.onclick = () => {
    try{ localStorage.setItem("theme", b.dataset.t); }catch(e){}
    applyTheme(b.dataset.t);
    setHeadH();
  });
}
SYSDARK.addEventListener("change", () => { if(!readTheme()) applyTheme(null); });
applyTheme(readTheme());

renderAlpha(); renderRod(); renderAlt(); renderChips(); renderCase(); renderAdj(); renderAdv(); renderPron(); renderQ(); renderVerbs();
renderNum(); renderVocabulary(); renderTalk(); renderNeg(); renderOrder(); renderImpers(); renderConj(); renderPart(); renderLudzie(); renderDim(); renderPreps(); renderBridge();
renderNumTog();
buildIndex();
renderIndex();

document.querySelectorAll(".sec").forEach(linkHeadings);
setHeadH();
if(location.hash) applyHash();
