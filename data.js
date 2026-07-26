/* Данные справочника. Только массивы и объекты - никакой логики.
   Подключается перед app.js: объявления отсюда видны в app.js. */
/* ============ ДАННЫЕ: алфавит и произношение ============ */
const ABASE = [
 ["a","как русское а"],["b","как русское б"],["c","ц, не к: cena - «цена»"],["d","как русское д"],
 ["e","как русское э"],["f","как русское ф"],["g","г, никогда не [дж]: gol, noga; перед i смягчается: drogi"],
 ["h","как русское х, см. пару ch/h ниже"],["i","как русское и; смягчает предыдущую согласную"],
 ["j","й: jajko - «яйко»"],["k","как русское к"],["l","мягкое л: как в «лямка», не как ł"],
 ["m","как русское м"],["n","как русское н"],["o","как русское о"],["p","как русское п"],
 ["r","раскатистое р, как в русском"],["s","как русское с"],["t","как русское т"],
 ["u","как русское у, см. пару u/ó ниже"],["w","в: woda - «вода»"],
 ["y","ы; после неё согласная всегда твёрдая"],["z","как русское з"]
];
const ADIAC = [
 ["ą","носовое о","приближённо «о» с носовым призвуком; перед b/p звучит как [om]","dąb, mąka"],
 ["ę","носовое э","приближённо «э» с носовым призвуком; на конце слова часто теряет носовость","ręka, proszę"],
 ["ć","мягкое ть","как «ть» в «плеть», перед гласной пишется ci","być, ćma"],
 ["ł","белорусское ў","губное w, не «л»: był звучит как «быў»","łyżka, mały"],
 ["ń","мягкое нь","как «нь» в «конь», перед гласной пишется ni","dzień, koń"],
 ["ó","у","произносится как u, чередуется с o/e/a в родственных словах","król, wróbel"],
 ["ś","мягкое сь","как «сь» в «сеть», перед гласной пишется si","śniadanie, gość"],
 ["ź","мягкое зь","как «зь» в «зять», перед гласной пишется zi","źle, wiozę"],
 ["ż","твёрдое ж","как русское ж; часто совпадает по звуку с rz","żaba, może"]
];
const DIGR = [
 ["sz","ш","szkoła, kasza"],["cz","ч","czas, klucz"],["rz","ж (= ż)","rzeka, morze"],
 ["dz","дз (слитно)","dzwon, władza"],["dź","дзь (мягко)","dźwięk, łódź"],
 ["dż","дж (слитно)","dżem, dżungla"],["ch","х (= h)","chleb, dach"],["szcz","шч - два раздельных звука, не «щ»","szczęście, deszcz, jeszcze"]
];
const PALAT = [
 ["ś / si","śniadanie - śpi","siostra - siedzi"],
 ["ć / ci","być - ćma","ciocia - cień"],
 ["ź / zi","źle - źrebię","zima - ziemia"],
 ["ń / ni","koń - dzień","niebo - konie"],
 ["dź / dzi","łódź - dźwig","dziecko - godzina"]
];
const NASAL = [
 ["перед b, p","om, em","dąb [domp], zęby [zemby]"],
 ["перед d, t, dz, c, cz","on, en","kąt [kont], kolęda [kolenda]"],
 ["перед ć/ci, dź/dzi","oń, eń","będzie [beńdzie]"],
 ["перед g, k","носовое, ближе к он/эн","mąka, ręka"],
 ["перед f, w, s, z, sz, rz, ż, ch","чистый носовой звук","wąski, węch"],
 ["перед ł, l","теряется, чистое o / e","minął [minoł], zaczęli [zaczeli]"],
 ["на конце слова","ą - носовое; ę - часто теряет носовость","idą [идон]; proszę ≈ [proше]"]
];
const STRESS_EXC = [
 ["форма на -śmy / -ście в прошедшем","3-й слог от конца","byliśmy, spacerowaliście"],
 ["условное наклонение на -by-","3-й слог от конца","zrobiłbym, pojechałaby"],
 ["условное мы/вы: -libyśmy / -łybyście","4-й слог от конца","zrobilibyśmy, poszłybyście"],
 ["заимствования на -yka / -ika","3-й слог от конца","fizyka, matematyka, gramatyka"],
 ["некоторые числительные","3-й слог от конца","czterysta, siedemset"],
 ["отдельные заимствования","3-й слог от конца","prezydent, uniwersytet"],
 ["односложные слова","на единственный слог","bić, żyć, dom"]
];
const ORTHO_CH = [
 ["ch","после s","schody, schab, schowek"],
 ["ch","перед согласной и на конце слова почти всегда","chleb, kuchnia, w miastach, grzech"],
 ["ch","в заимствованиях","chemia, charakter, mechanik"],
 ["h","чередуется с g, z, ż","waga → waha się · błazen → błahy · druh → drużyna"],
 ["h","в заимствованиях, часто в начале слова","higiena, hotel, harfa, historia"]
];
const ORTHO_RZ = [
 ["rz","чередуется с r","góra → górzysty, rycerz → rycerstwo"],
 ["rz","после b, p, d, t, g, k, ch, w, j","przyjaciel, trzy, krzak, wrzawa, grzyb"],
 ["rz","в суффиксах -arz, -erz, -mierz","malarz, tancerz, żołnierz"],
 ["ż","чередуется с g, z, ź/zi, dz, dź, s","waga → ważyć · wozić → wożę · mróz → mrozić / mrożony"],
 ["ż","после l, ł, n, r","małżeństwo, skarżyć, oranżada"]
];
const ORTHO_U = [
 ["ó","чередуется с o, e, a","głowa → główka · niesie → niósł · wracać → wrócić"],
 ["ó","в родительном мн. числа -ów","panów, stołów, samochodów"],
 ["ó","в начале слова - закрытый список из пяти","ósmy · ósemka · ów · ówczesny · ówdzie"],
 ["ó","без чередования - просто запомнить","góra, król, mózg, próba, żółty, wróbel, włókno, wspólny"],
 ["u","в конце слова - всегда, ó там не бывает никогда","ojcu, domu, temu, dziękuję"],
 ["u","в начале слова - кроме тех пяти с ó","uczeń, ulica, ucho, uwaga"],
 ["u","в уменьшительных на -uni, -uś, -utki","babuni, dziadziuś, malutki"]
];

/* ============ ДАННЫЕ: падежи ============ */
/* формат формы: "stem|ending" или "stem|чередование|ending" */
const CASES = [
{
  id:"mian", name:"Mianownik", ru:"Именительный", q:"kto? co?",
  use:["Подлежащее: <span class='pl'>Sklep jest zamknięty.</span>","После <span class='pl'>to jest / to są</span> - само <span class='pl'>to</span> не меняется никогда.","Словарная форма: так слово стоит в словаре и на ценнике."],
  preps:"- (единственный падеж без предлогов)",
  sg:[
    {l:"мужской", f:[{a:"",b:"sklep|"},{a:"",b:"kot|"},{a:"",b:"pan|"},{a:"",b:"nauczyciel|"},{a:"",b:"dzień|"}], n:"нулевое окончание"},
    {l:"женский", f:[{a:"",b:"kaw|a"},{a:"",b:"książk|a"},{a:"",b:"restauracj|a"},{a:"",b:"noc|"},{a:"",b:"pan|i"}], n:"-a; реже согласная или -i"},
    {l:"средний", f:[{a:"",b:"piw|o"},{a:"",b:"mieszkani|e"},{a:"",b:"imi|ę"},{a:"",b:"muzeum|"}], n:"-o / -e / -ę / -um"},
    {l:"муж. на -a", f:[{a:"",b:"koleg|a"},{a:"",b:"mężczyzn|a"},{a:"",b:"kierowc|a"}], n:"склоняются по-женски, согласуются по-мужски: ten kolega"}
  ],
  pl:[
    {l:"мужско-личный", f:[{a:"student",b:"studen|c|i"},{a:"sąsiad",b:"sąsie|dzi|"},{a:"Polak",b:"Pola|c|y"},{a:"lekarz",b:"lekarz|e"},{a:"pan",b:"pan|owie"}], n:"только про мужчин: -i / -y / -e / -owie, почти всегда с чередованием"},
    {l:"не-мужско-личный", f:[{a:"bilet",b:"bilet|y"},{a:"kot",b:"kot|y"},{a:"ogórek",b:"ogórk|i"},{a:"kawa",b:"kaw|y"},{a:"książka",b:"książk|i"},{a:"ulica",b:"ulic|e"}], n:"-y после твёрдых · -i после k, g · -e после мягких и c, l, j"},
    {l:"средний", f:[{a:"piwo",b:"piw|a"},{a:"okno",b:"okn|a"},{a:"mieszkanie",b:"mieszkani|a"}], n:"-a"}
  ],
  agree:[["ten dobry sklep","ten dobry sklep"],["ta dobra kawa","ta dobra kawa"],["to dobre piwo","to dobre piwo"],["мн. мужчины","ci dobrzy studenci"],["мн. остальное","te dobre książki"]],
  exc:[["człowiek","ludzie","во мн. ч. другое слово"],["rok","lata","то же"],["brat","bracia",""],["ksiądz","księża",""],["dziecko","dzieci",""],["oko / ucho","oczy / uszy","в анатомии; в приборах - oka, ucha"],["ręka","ręce",""],["przyjaciel","przyjaciele",""]],
  pit:["<b>Мужско-личный род (męskoosobowy).</b> В русском во множественном рода нет вообще, поэтому опоры нет никакой. Тест простой: подставь <span class='pl'>ci</span> или <span class='pl'>te</span>. <span class='pl'>Ci studenci</span>, но <span class='pl'>te psy</span> - животные идут в «остальное», даже если это самцы.",
  "<b>Мужские слова на -a.</b> <span class='pl'>kolega, mężczyzna, kierowca, turysta, poeta</span> - склоняются как женские, а согласуются как мужские: <span class='pl'>ten dobry kolega</span>. Мн. ч. - мужско-личное: <span class='pl'>ci koledzy</span>.",
  "<b><span class='pl'>To</span> не меняется.</b> <span class='pl'>To jest mój brat</span> / <span class='pl'>to są moje dzieci</span> - форма <span class='pl'>to</span> одна на всё, меняется только глагол.",
  "<b><span class='pl'>Państwo</span></b> - «супруги» или вежливое «вы» к смешанной компании. Согласование мужско-личное: <span class='pl'>państwo Kowalscy byli</span>."],
  sent:[["To jest mój sąsiad.","Это мой сосед."],["To są moi sąsiedzi.","Это мои соседи."],["Ci lekarze są bardzo dobrzy.","Эти врачи очень хорошие."],["Te książki są nowe.","Эти книги новые."],["Mój kolega mieszka w Krakowie.","Мой приятель живёт в Кракове."]],
  trap:"Единственная реальная работа здесь - множественное число. Единственное ты и так строишь правильно, потому что оно совпадает со словарной формой."
},
{
  id:"bier", name:"Biernik", ru:"Винительный", q:"kogo? co?",
  use:["Прямой объект: <span class='pl'>Poproszę kawę.</span>","Направление: <span class='pl'>idę na pocztę, jadę w góry</span>.","Дни недели: <span class='pl'>w środę, w piątek</span>.","Длительность: <span class='pl'>czekam godzinę</span>, <span class='pl'>przez tydzień</span>.","Цена: <span class='pl'>za pięć złotych</span>."],
  preps:"na (куда), w (день), przez, po (за чем-то), za (за сколько), o (proszę o, pytam o), przed / nad / pod / między + B (куда)",
  sg:[
    {l:"муж. неодушевл.", f:[{a:"chleb",b:"chleb|"},{a:"bilet",b:"bilet|"},{a:"sok",b:"sok|"}], n:"= именительный, работы нет"},
    {l:"муж. одушевл.", f:[{a:"pan",b:"pan|a"},{a:"pies",b:"ps|a"},{a:"kot",b:"kot|a"},{a:"lekarz",b:"lekarz|a"}], n:"= родительный, как в русском"},
    {l:"женский -a", f:[{a:"kawa",b:"kaw|ę"},{a:"bułka",b:"bułk|ę"},{a:"woda",b:"wod|ę"},{a:"pani",b:"pani|ą"}], n:"-a → -ę. Русское «-у» один в один"},
    {l:"жен. на согласную", f:[{a:"noc",b:"noc|"},{a:"sól",b:"sól|"},{a:"marchew",b:"marchew|"}], n:"не меняется"},
    {l:"средний", f:[{a:"mleko",b:"mleko|"},{a:"piwo",b:"piwo|"}], n:"не меняется"}
  ],
  pl:[
    {l:"мужско-личный", f:[{a:"panowie",b:"pan|ów"},{a:"lekarze",b:"lekarz|y"},{a:"nauczyciele",b:"nauczyciel|i"}], n:"= родительный"},
    {l:"всё остальное", f:[{a:"bilety",b:"bilet|y"},{a:"psy",b:"ps|y"},{a:"kawy",b:"kaw|y"},{a:"piwa",b:"piw|a"}], n:"= именительный, включая животных"}
  ],
  agree:[["ten dobry chleb","ten dobry chleb"],["ten dobry pies","tego dobrego psa"],["ta dobra kawa","tę dobrą kawę"],["to dobre piwo","to dobre piwo"],["мн. мужчины","tych dobrych lekarzy"],["мн. остальное","te dobre kawy"]],
  exc:[["pieniądze","pieniądze","не мужско-личное: mam pieniądze"],["ręka","rękę",""],["pani","panią","единственное женское на -ą"],["ta","tę","литературная норма; в речи слышно tą"]],
  pit:["<b>Числительные рядом.</b> <span class='pl'>dwa soki</span>, не <span class='pl'>dwa soka</span>. Ловушка срабатывает именно на словах, похожих на русские.",
  "<b>Отрицание сносит биерник в родительный.</b> <span class='pl'>Mam bilet → nie mam biletu.</span> Автоматически, без исключений. Это самая частая точка отказа у русскоязычных на B1.",
  "<b>Одушевлённость работает только в мужском единственном.</b> Во множественном граница проходит иначе: <span class='pl'>widzę psy</span> (животные - как неодушевлённые), но <span class='pl'>widzę panów</span>.",
  "<b>na / w + биерник = движение</b>, + предложный = положение. <span class='pl'>Idę na pocztę</span> ↔ <span class='pl'>jestem na poczcie</span>. Одна пара предлогов, два падежа, разный смысл.",
  "<b>Глаголы, которые в русском требуют другого падежа:</b> <span class='pl'>czekam na autobus</span> (жду автобус), <span class='pl'>proszę o rachunek</span> (прошу счёт), <span class='pl'>pytam o cenę</span> (спрашиваю о цене)."],
  sent:[["Poproszę kawę i dwie bułki.","Мне, пожалуйста, кофе и две булки."],["Czekam na autobus już dziesięć minut.","Жду автобус уже десять минут."],["Idę na pocztę, a potem do apteki.","Иду на почту, а потом в аптеку."],["Mam czas w środę wieczorem.","У меня есть время в среду вечером."],["Widzę tego pana codziennie.","Вижу этого пана каждый день."]],
  trap:"Само окончание <span class='pl'>-ę</span> у тебя стоит с первого блока. Ошибки идут не отсюда, а из соседних клеток: числительные, отрицание, глагольное управление."
},
{
  id:"dop", name:"Dopełniacz", ru:"Родительный", q:"kogo? czego?",
  use:["Отрицание: <span class='pl'>mam czas → nie mam czasu</span>. Всегда.","Отсутствие: <span class='pl'>nie ma mleka</span>.","После 5+ и после <span class='pl'>dużo, mało, kilka, trochę, ile</span>.","Принадлежность: <span class='pl'>dom mojego brata</span>.","Дата: <span class='pl'>trzeciego maja</span>.","Глаголы: <span class='pl'>szukać, słuchać, uczyć się, potrzebować, bać się, używać, życzyć</span>."],
  preps:"do, od, z (откуда), bez, dla, u, obok, koło, naprzeciwko, oprócz, według, podczas, wśród, zamiast",
  sg:[
    {l:"муж. одушевл.", f:[{a:"pan",b:"pan|a"},{a:"brat",b:"brat|a"},{a:"pies",b:"ps|a"}], n:"-a, без вариантов"},
    {l:"муж. неодуш. → -a", f:[{a:"chleb",b:"chleb|a"},{a:"ser",b:"ser|a"},{a:"Kraków",b:"Krak|ow|a"},{a:"styczeń",b:"styczni|a"}], n:"конкретные предметы, польские города, месяцы"},
    {l:"муж. неодуш. → -u", f:[{a:"sklep",b:"sklep|u"},{a:"dom",b:"dom|u"},{a:"czas",b:"czas|u"},{a:"bank",b:"bank|u"},{a:"sok",b:"sok|u"},{a:"cukier",b:"cukr|u"}], n:"абстрактное, вещества, заимствования"},
    {l:"женский", f:[{a:"kawa",b:"kaw|y"},{a:"woda",b:"wod|y"},{a:"książka",b:"książk|i"},{a:"noc",b:"noc|y"},{a:"sól",b:"sol|i"}], n:"-i после k, g и мягких · -y после остальных"},
    {l:"средний", f:[{a:"mleko",b:"mlek|a"},{a:"piwo",b:"piw|a"},{a:"okno",b:"okn|a"}], n:"-a"}
  ],
  pl:[
    {l:"мужской", f:[{a:"bilety",b:"bilet|ów"},{a:"domy",b:"dom|ów"},{a:"lekarze",b:"lekarz|y"},{a:"nauczyciele",b:"nauczyciel|i"},{a:"konie",b:"kon|i"}], n:"-ów после твёрдых · -y после ż, rz, sz, cz, c · -i после мягких"},
    {l:"женский", f:[{a:"kawy",b:"kaw|"},{a:"książki",b:"książek|"},{a:"restauracje",b:"restauracj|i"},{a:"noce",b:"noc|y"}], n:"нулевое окончание, часто со вставной гласной; -i у слов на -ja, -ia, -ść"},
    {l:"средний", f:[{a:"piwa",b:"piw|"},{a:"okna",b:"okien|"},{a:"mieszkania",b:"mieszkań|"},{a:"muzea",b:"muze|ów"}], n:"нулевое; у слов на -um → -ów"}
  ],
  agree:[["ten dobry chleb","tego dobrego chleba"],["ta dobra kawa","tej dobrej kawy"],["to dobre piwo","tego dobrego piwa"],["мн. любое","tych dobrych ludzi / tych dobrych kaw"]],
  exc:[["ręka","rąk","мн. ч."],["rok","lat","мн. ч."],["człowiek","ludzi","мн. ч."],["pieniądze","pieniędzy",""],["dziecko","dzieci",""],["tydzień","tygodnia",""],["muzeum","muzeum / muzeów","ед. ч. не склоняется, мн. - склоняется"]]  ,
  pit:["<b>-a или -u у неодушевлённых.</b> Надёжного правила нет. Ориентиры: пощупать можно → <span class='pl'>-a</span> (<span class='pl'>chleba, sera, noża</span>); абстракция, вещество, заимствование → <span class='pl'>-u</span> (<span class='pl'>czasu, cukru, banku</span>). Проверять по словарю и учить со словом.",
  "<b>Отрицание - всегда, даже там, где русский держит винительный.</b> «Не вижу Анну» → <span class='pl'>nie widzę Anny</span>. «Не люблю кофе» → <span class='pl'>nie lubię kawy</span>.",
  "<b>Беглая гласная во множественном.</b> <span class='pl'>książka → książek</span>, <span class='pl'>okno → okien</span>, <span class='pl'>matka → matek</span>. Окончания нет, зато в основу влезает <span class='pl'>e</span>.",
  "<b>После 5+ и количественных слов.</b> <span class='pl'>pięć biletów, dużo ludzi, mało czasu, kilka minut</span> - здесь русская модель работает, интуиция не мешает.",
  "<b><span class='pl'>Nie ma</span> - безличное.</b> Формы «его нет» не существует как <span class='pl'>on nie ma</span>: это значит «у него нет». «Его нет дома» → <span class='pl'>nie ma go w domu</span>."],
  sent:[["Nie mam dzisiaj czasu.","У меня сегодня нет времени."],["W sklepie nie ma świeżego chleba.","В магазине нет свежего хлеба."],["Szukam apteki, która jest otwarta.","Ищу аптеку, которая открыта."],["To jest samochód mojego brata.","Это машина моего брата."],["Wracam z pracy do domu około szóstej.","Возвращаюсь с работы домой около шести."]],
  trap:"Родительный стоит четвёртым блоком не случайно: без него нельзя построить ни одного отрицания. Это самый частотный падеж в бытовой речи после винительного."
},
{
  id:"cel", name:"Celownik", ru:"Дательный", q:"komu? czemu?",
  use:["Адресат: <span class='pl'>dawać, mówić, pomagać, dziękować, ufać, wierzyć, przeszkadzać, kupować</span>.","Безличные состояния: <span class='pl'>jest mi zimno, podoba mi się, brakuje mi, przykro mi, chce mi się, wydaje mi się, udało mi się</span>."],
  preps:"dzięki, przeciwko, wbrew, ku",
  sg:[
    {l:"мужской", f:[{a:"student",b:"student|owi"},{a:"lekarz",b:"lekarz|owi"},{a:"sąsiad",b:"sąsiad|owi"}], n:"-owi - основной вариант"},
    {l:"мужской: список на -u", f:[{a:"pan",b:"pan|u"},{a:"brat",b:"brat|u"},{a:"ojciec",b:"ojc|u"},{a:"chłopiec",b:"chłopc|u"},{a:"pies",b:"ps|u"},{a:"kot",b:"kot|u"},{a:"świat",b:"świat|u"},{a:"Bóg",b:"Bog|u"}], n:"закрытый список, учить целиком"},
    {l:"женский", f:[{a:"kobieta",b:"kobie|ci|e"},{a:"siostra",b:"sios|trz|e"},{a:"mama",b:"ma|mi|e"},{a:"ulica",b:"ulic|y"}], n:"совпадает с предложным"},
    {l:"средний", f:[{a:"dziecko",b:"dzieck|u"},{a:"okno",b:"okn|u"}], n:"-u"}
  ],
  pl:[{l:"все роды", f:[{a:"studenci",b:"student|om"},{a:"kobiety",b:"kobiet|om"},{a:"dzieci",b:"dzieci|om"}], n:"-om, без вариантов"}],
  agree:[["ten dobry student","temu dobremu studentowi"],["ta dobra kobieta","tej dobrej kobiecie"],["to dobre dziecko","temu dobremu dziecku"],["мн. любое","tym dobrym ludziom"]],
  exc:[["ja","mi / mnie","короткая mi - обычная, mnie - под ударением"],["ty","ci / tobie",""],["on","mu / jemu / niemu","niemu - только после предлога"]],
  pit:["<b><span class='pl'>Dziękuję ci</span> - дательный.</b> Русское «благодарю тебя» - винительный. Системный сдвиг, ловится только заучиванием: <span class='pl'>dziękuję panu, dziękuję pani</span>.",
  "<b><span class='pl'>Podoba mi się ta kawa</span>.</b> То, что нравится, здесь подлежащее в именительном. Разница с <span class='pl'>lubię</span>: <span class='pl'>lubię</span> - вообще и всегда, <span class='pl'>podoba mi się</span> - вот это, сейчас, впервые увидел.",
  "<b>Короткие формы <span class='pl'>mi, ci, mu</span> не ставятся в начало фразы и не идут после предлога.</b> В начале - <span class='pl'>Mnie się to nie podoba</span>. После предлога - <span class='pl'>dzięki tobie</span>, не <span class='pl'>dzięki ci</span>.",
  "<b>Безличные с <span class='pl'>mi</span> - целый пласт бытовой речи.</b> <span class='pl'>Jest mi zimno / gorąco / smutno / miło / głupio</span>. Русский строит это через «мне» тоже, так что конструкция знакомая - но список выражений надо набрать."],
  sent:[["Dziękuję panu bardzo.","Большое вам спасибо."],["Jest mi zimno, zamknę okno.","Мне холодно, закрою окно."],["Podoba mi się ta restauracja.","Мне нравится этот ресторан."],["Brakuje mi czasu na wszystko.","Мне не хватает времени на всё."],["Pomagam sąsiadce z zakupami.","Помогаю соседке с покупками."]],
  trap:"Самый лёгкий падеж для тебя: функция и конструкции почти полностью совпадают с русским «мне». Главное - не забыть, что после <span class='pl'>dziękować</span> идёт он, а не винительный."
},
{
  id:"narz", name:"Narzędnik", ru:"Творительный", q:"kim? czym?",
  use:["Профессия и роль после <span class='pl'>być, zostać, zostawać</span>: <span class='pl'>jestem programistą</span>.","Орудие: <span class='pl'>piszę długopisem</span>.","Транспорт: <span class='pl'>jadę autobusem</span> - без предлога.","Совместность: <span class='pl'>kawa z mlekiem, idę z bratem</span>.","Глаголы: <span class='pl'>interesować się, zajmować się, opiekować się, martwić się</span> + творительный."],
  preps:"z (с кем/чем), nad, pod, przed, za, między, poza - все в значении «где»",
  sg:[
    {l:"муж. и средний", f:[{a:"autobus",b:"autobus|em"},{a:"brat",b:"brat|em"},{a:"piwo",b:"piw|em"},{a:"pociąg",b:"pocią|gi|em"},{a:"mleko",b:"mle|ki|em"}], n:"-em; после k, g вставляется i: -kiem, -giem"},
    {l:"женский", f:[{a:"kawa",b:"kaw|ą"},{a:"woda",b:"wod|ą"},{a:"pani",b:"pani|ą"},{a:"noc",b:"noc|ą"}], n:"-ą, одна форма на всё"}
  ],
  pl:[
    {l:"все роды", f:[{a:"bilety",b:"bilet|ami"},{a:"kawy",b:"kaw|ami"},{a:"dzieci",b:"dzieć|mi"}], n:"-ami"},
    {l:"исключения -mi", f:[{a:"ludzie",b:"ludź|mi"},{a:"dzieci",b:"dzieć|mi"},{a:"pieniądze",b:"pieniędz|mi"},{a:"goście",b:"gość|mi"},{a:"bracia",b:"brać|mi"},{a:"konie",b:"koń|mi"}], n:"короткий список, стоит выучить целиком"}
  ],
  agree:[["ten dobry lekarz","tym dobrym lekarzem"],["ta dobra kawa","tą dobrą kawą"],["to dobre piwo","tym dobrym piwem"],["мн. любое","tymi dobrymi ludźmi"]],
  exc:[["ja / ty","mną / tobą",""],["on / ona","nim / nią","после предлога: z nim, z nią"],["my / wy","nami / wami",""]],
  pit:["<b><span class='pl'>Jestem programistą</span> - главная калька всей программы.</b> В русском «я программист» именительный, и рука ставит именительный автоматически. После <span class='pl'>być</span> существительное уходит в творительный.",
  "<b>Но прилагательное после <span class='pl'>być</span> остаётся в именительном.</b> <span class='pl'>Jestem zmęczony</span> ✅, <span class='pl'>jestem lekarzem</span> ✅, вместе - <span class='pl'>jestem dobrym lekarzem</span>. Проверка: есть существительное - творительный, нет - именительный.",
  "<b>Предлог <span class='pl'>z</span> управляет двумя падежами, и смысл разный.</b> <span class='pl'>z Warszawy</span> (родительный) = из Варшавы; <span class='pl'>z bratem</span> (творительный) = с братом.",
  "<b>Транспорт идёт без предлога.</b> <span class='pl'>Jadę autobusem, tramwajem, samochodem, pociągiem</span>. Русское «на автобусе» тянет вставить <span class='pl'>na</span> - это ошибка.",
  "<b><span class='pl'>przed / nad / pod / za / między</span> + творительный = где, + винительный = куда.</b> <span class='pl'>Stoję przed domem</span> ↔ <span class='pl'>idę przed dom</span>."],
  sent:[["Jestem programistą, pracuję zdalnie.","Я программист, работаю удалённо."],["Jadę tramwajem do pracy.","Еду на трамвае на работу."],["Poproszę kawę z mlekiem.","Мне, пожалуйста, кофе с молоком."],["Spotykamy się przed sklepem o piątej.","Встречаемся перед магазином в пять."],["Moja siostra jest lekarką.","Моя сестра - врач."]],
  trap:"Здесь ошибка не в окончании, а в самом решении поставить падеж. Окончания <span class='pl'>-em / -ą</span> простые, чередований почти нет. Вся сложность - вспомнить, что после <span class='pl'>być</span> нужен именно этот падеж."
},
{
  id:"miej", name:"Miejscownik", ru:"Предложный", q:"o kim? o czym? gdzie?",
  use:["Место: <span class='pl'>w sklepie, na poczcie, przy oknie</span>.","Тема: <span class='pl'>rozmawiamy o pracy</span>.","Время по часам: <span class='pl'>o piątej, o wpół do ósmej</span>.","После чего-то: <span class='pl'>po pracy, po obiedzie</span>."],
  preps:"только w, na, o, po, przy - без предлога не встречается никогда",
  sg:[
    {l:"муж./ср. → -e", f:[{a:"sklep",b:"skle|pi|e"},{a:"stół",b:"sto|l|e"},{a:"obiad",b:"obie|dzi|e"},{a:"miasto",b:"mie|ści|e"},{a:"Kraków",b:"Krako|wi|e"},{a:"teatr",b:"tea|trz|e"}], n:"после твёрдой согласной - обязательно с чередованием"},
    {l:"муж./ср. → -u", f:[{a:"dom",b:"dom|u"},{a:"pokój",b:"pokoj|u"},{a:"hotel",b:"hotel|u"},{a:"biurko",b:"biurk|u"},{a:"mleko",b:"mlek|u"},{a:"dach",b:"dach|u"}], n:"после мягких и после k, g, ch"},
    {l:"жен. → -e", f:[{a:"kawa",b:"ka|wi|e"},{a:"woda",b:"wo|dzi|e"},{a:"szkoła",b:"szko|l|e"},{a:"książka",b:"książ|c|e"},{a:"apteka",b:"apte|c|e"},{a:"droga",b:"dro|dz|e"}], n:"с чередованием - тем же, что в белорусском"},
    {l:"жен. → -y / -i", f:[{a:"ulica",b:"ulic|y"},{a:"praca",b:"prac|y"},{a:"noc",b:"noc|y"},{a:"kuchnia",b:"kuchn|i"},{a:"sól",b:"sol|i"}], n:"после мягких и шипящих"}
  ],
  pl:[{l:"все роды", f:[{a:"sklepy",b:"sklep|ach"},{a:"ulice",b:"ulic|ach"},{a:"miasta",b:"miast|ach"},{a:"dzieci",b:"dzieci|ach"}], n:"-ach, самое простое множественное во всей системе"}],
  agree:[["ten duży sklep","w tym dużym sklepie"],["ta nowa praca","w tej nowej pracy"],["to małe miasto","w tym małym mieście"],["мн. любое","w tych dużych sklepach"]],
  exc:[["dom","w domu","не domie"],["syn","o synu",""],["pan","o panu",""],["państwo","o państwu",""],["muzeum","w muzeum","в ед. ч. не склоняется"],["ręka","w ręce / w ręku","обе формы живые"],["stół / ogród","na stole / w ogrodzie","ó → o"]],
  alt:[["t","ci","brat → o bracie"],["d","dzi","woda → w wodzie"],["st","ści","miasto → w mieście"],["sł","śl","krzesło → na krześle"],["ł","l","szkoła → w szkole"],["r","rz","teatr → w teatrze"],["k","c","apteka → w aptece"],["g","dz","droga → na drodze"],["ch","sz","mucha → o musze"],["n","ni","okno → w oknie"],["b p w m f","bi pi wi mi fi","sklep → w sklepie"],["s z","si zi","nos → o nosie"]],
  pit:["<b>Чередование бери из белорусского, не из русского.</b> <span class='pl'>у вадзе → w wodzie</span>, <span class='pl'>у хаце → w chacie</span>, <span class='pl'>у школе → w szkole</span>. Русский даст «в воде» и выведет на <span class='pl'>w wode</span>.",
  "<b>Развилка -e / -u.</b> Основа на k, g, ch или мягкую → <span class='pl'>-u</span> без всяких чередований. Всё остальное → <span class='pl'>-e</span> и чередование обязательно. Шаг с проверкой на k/g/ch надо вставлять принудительно, иначе русская модель ставит <span class='pl'>-e</span> по умолчанию.",
  "<b>ó → o при любом окончании.</b> <span class='pl'>stół → na stole</span>, <span class='pl'>samochód → w samochodzie</span>, <span class='pl'>ogród → w ogrodzie</span>, <span class='pl'>pokój → w pokoju</span>. Правила нет ни в русском, ни в белорусском - чистая польская механика.",
  "<b>Предлог не всегда совпадает с русским.</b> <span class='pl'>w pracy</span> (не «на»), <span class='pl'>na poczcie, na dworcu, na lotnisku, na stacji, na przystanku, na uniwersytecie, na ulicy, na wsi, na basenie</span>. Учить парой предлог+слово.",
  "<b>Без предлога падежа нет.</b> Если предлог не нужен - значит, и падеж другой. Это единственный такой падеж, используй как проверку."],
  sent:[["Mieszkam w Warszawie, na Mokotowie.","Живу в Варшаве, на Мокотове."],["Klucze są na stoliku przy drzwiach.","Ключи на столике у двери."],["Rozmawialiśmy o pracy i o pieniądzach.","Мы говорили о работе и о деньгах."],["Po obiedzie idę do sklepu.","После обеда иду в магазин."],["Spotkajmy się o piątej na dworcu.","Давай встретимся в пять на вокзале."]],
  trap:"Функционально совпадает с русским предложным один в один. Вся работа - в выборе окончания и в чередовании, и именно здесь белорусский даёт тебе фору, которой нет у русскоязычных."
},
{
  id:"woł", name:"Wołacz", ru:"Звательный", q:"o!",
  use:["Обращение к незнакомым - обязательно: <span class='pl'>proszę pani! proszę pana!</span>","С титулом: <span class='pl'>panie doktorze, panie kierowniku</span>.","В письме: <span class='pl'>Szanowny Panie, Droga Aniu</span>."],
  preps:"-",
  sg:[
    {l:"мужской → -e", f:[{a:"pan",b:"pa|ni|e"},{a:"Piotr",b:"Piot|rz|e"},{a:"Adam",b:"Ada|mi|e"},{a:"doktor",b:"dokto|rz|e"}], n:"то же чередование, что в предложном"},
    {l:"мужской → -u", f:[{a:"Marek",b:"Mark|u"},{a:"syn",b:"syn|u"},{a:"lekarz",b:"lekarz|u"}], n:"после мягких и k, g"},
    {l:"женский", f:[{a:"mama",b:"mam|o"},{a:"Anna",b:"Ann|o"},{a:"siostra",b:"siostr|o"}], n:"-o"},
    {l:"уменьшительные", f:[{a:"Kasia",b:"Kasi|u"},{a:"Ania",b:"Ani|u"},{a:"babcia",b:"babci|u"}], n:"-u"},
    {l:"средний / pani", f:[{a:"dziecko",b:"dziecko|"},{a:"pani",b:"pani|"}], n:"= именительный"}
  ],
  pl:[{l:"все роды", f:[{a:"panowie",b:"panowie|"},{a:"dzieci",b:"dzieci|"},{a:"studenci",b:"studenci|"}], n:"= именительный, всегда"}],
  agree:[["drogi Marek","drogi Marku"],["droga Anna","droga Anno"],["szanowni panowie","szanowni panowie"]],
  exc:[["Bóg","Boże",""],["ojciec","ojcze",""],["chłopiec","chłopcze",""],["ksiądz","księże",""],["syn","synu",""]],
  pit:["<b>Формула, которая нужна ежедневно:</b> <span class='pl'>przepraszam, proszę pani</span> / <span class='pl'>proszę pana</span>. Без вокатива обращение звучит грубо.",
  "<b>Титул тоже идёт в вокатив.</b> <span class='pl'>Panie doktorze</span>, <span class='pl'>panie kierowniku</span>, <span class='pl'>pani doktor</span> (женский титул часто не склоняется).",
  "<b>Между своими падеж вымирает.</b> <span class='pl'>Kasia, chodź!</span> - нормально в разговоре. Но в обращении к незнакомому и в письме - обязателен.",
  "<b>В письмах с большой буквы:</b> <span class='pl'>Szanowna Pani, Drogi Marku, Dzień dobry Panie Adamie</span>."],
  sent:[["Przepraszam, proszę pani!","Извините, пожалуйста!"],["Panie doktorze, boli mnie gardło.","Доктор, у меня болит горло."],["Mamo, gdzie są klucze?","Мама, где ключи?"],["Kasiu, zadzwoń do mnie.","Кася, позвони мне."]],
  trap:"Падеж почти вымерший - но ровно в твоём приоритете (обращение к незнакомым) он живой и обязательный."
}
];

/* ============ ДАННЫЕ: глаголы ============ */
/* окончания настоящего времени по спряжениям - для подсветки */
const KEND = {
 I:  [["ę"],["esz"],["e"],["emy"],["ecie"],["ą"]],
 II: [["ę"],["isz","ysz"],["i","y"],["imy","ymy"],["icie","ycie"],["ą"]],
 III:[["am"],["asz"],["a"],["amy"],["acie"],["ają","adzą"]],
 IV: [["em"],["esz"],["e"],["emy"],["ecie"],["eją","edzą"]]
};
const PERS = ["ja","ty","on / ona","my","wy","oni / one"];

const KON = [
 {n:"I", mark:"-ę / -esz",
  who:"Самая большая и самая пёстрая группа. Основа часто меняется - её надо запомнить, окончания всегда одни.",
  find:"Односложные на -ić/-yć/-uć (pić, żyć, czuć) · всё на -ąć / -nąć · всё на -c (móc, piec, biec) · согласный + ć (nieść, wieźć, iść) · всё на -ować / -ywać / -iwać / -awać · часть глаголов на -ać (pisać, brać, jechać, płakać).",
  verbs:[
   ["pisać","писать",["piszę","piszesz","pisze","piszemy","piszecie","piszą"],"s → sz во всех формах"],
   ["iść","идти",["idę","idziesz","idzie","idziemy","idziecie","idą"],"d → dzi в большом крыле"],
   ["jechać","ехать",["jadę","jedziesz","jedzie","jedziemy","jedziecie","jadą"],"ja/oni - jad-, остальные - jedzi-"],
   ["móc","мочь",["mogę","możesz","może","możemy","możecie","mogą"],"g → ż в большом крыле"],
   ["brać","брать",["biorę","bierzesz","bierze","bierzemy","bierzecie","biorą"],"bior- / bierz-"],
   ["nieść","нести",["niosę","niesiesz","niesie","niesiemy","niesiecie","niosą"],"nios- / niesi-"],
   ["chcieć","хотеть",["chcę","chcesz","chce","chcemy","chcecie","chcą"],"основа не меняется"],
   ["pić","пить",["piję","pijesz","pije","pijemy","pijecie","piją"],"так же: żyć, myć, bić - вставка -j-"],
   ["czuć","чувствовать",["czuję","czujesz","czuje","czujemy","czujecie","czują"],"так же: psuć, kłuć"],
   ["pracować","работать",["pracuję","pracujesz","pracuje","pracujemy","pracujecie","pracują"],"-ować → -uj-"],
   ["dawać","давать",["daję","dajesz","daje","dajemy","dajecie","dają"],"-awać → -aj-: wstawać, sprzedawać"],
   ["zamknąć","закрыть",["zamknę","zamkniesz","zamknie","zamkniemy","zamkniecie","zamkną"],"совершенный вид → это будущее время"],
   ["wziąć","взять",["wezmę","weźmiesz","weźmie","weźmiemy","weźmiecie","wezmą"],"полностью нерегулярный"]
  ]},
 {n:"II", mark:"-ę / -isz · -ysz",
  who:"Второй по величине тип. Чередование в основе - только в формах ja и oni.",
  find:"Двусложные и длиннее на -ić / -yć (mówić, robić, tańczyć, uczyć) · многие на -eć (widzieć, siedzieć, myśleć, słyszeć).",
  verbs:[
   ["mówić","говорить",["mówię","mówisz","mówi","mówimy","mówicie","mówią"],"основа ровная"],
   ["robić","делать",["robię","robisz","robi","robimy","robicie","robią"],""],
   ["lubić","нравиться, любить",["lubię","lubisz","lubi","lubimy","lubicie","lubią"],""],
   ["prosić","просить",["proszę","prosisz","prosi","prosimy","prosicie","proszą"],"si → sz только в ja / oni"],
   ["wozić","возить",["wożę","wozisz","wozi","wozimy","wozicie","wożą"],"zi → ż только в ja / oni"],
   ["płacić","платить",["płacę","płacisz","płaci","płacimy","płacicie","płacą"],"ci → c только в ja / oni"],
   ["chodzić","ходить",["chodzę","chodzisz","chodzi","chodzimy","chodzicie","chodzą"],"dzi → dz только в ja / oni"],
   ["jeździć","ездить",["jeżdżę","jeździsz","jeździ","jeździmy","jeździcie","jeżdżą"],"ździ → żdż"],
   ["widzieć","видеть",["widzę","widzisz","widzi","widzimy","widzicie","widzą"],"-eć, но спряжение II"],
   ["słyszeć","слышать",["słyszę","słyszysz","słyszy","słyszymy","słyszycie","słyszą"],"после ш/ж/cz/rz пишется -ysz, не -isz"],
   ["tańczyć","танцевать",["tańczę","tańczysz","tańczy","tańczymy","tańczycie","tańczą"],""],
   ["musieć","быть должным",["muszę","musisz","musi","musimy","musicie","muszą"],"si → sz в ja / oni"],
   ["spać","спать",["śpię","śpisz","śpi","śpimy","śpicie","śpią"],"-ać, но спряжение II; s → ś"],
   ["stać","стоять",["stoję","stoisz","stoi","stoimy","stoicie","stoją"],"так же: bać się - boję się, boisz się"]
  ]},
 {n:"III", mark:"-am / -asz",
  who:"Самый лёгкий тип: основа никогда не меняется, окончания прозрачные.",
  find:"Большинство глаголов на -ać: czytać, mieszkać, czekać, kochać, pytać, słuchać, śpiewać, oglądać, pamiętać, sprzątać, zaczynać, wracać.",
  verbs:[
   ["mieć","иметь",["mam","masz","ma","mamy","macie","mają"],"нерегулярный инфинитив, регулярное спряжение"],
   ["czytać","читать",["czytam","czytasz","czyta","czytamy","czytacie","czytają"],""],
   ["mieszkać","жить, проживать",["mieszkam","mieszkasz","mieszka","mieszkamy","mieszkacie","mieszkają"],""],
   ["znać","знать (кого/что)",["znam","znasz","zna","znamy","znacie","znają"],"не путать с wiedzieć"],
   ["czekać","ждать",["czekam","czekasz","czeka","czekamy","czekacie","czekają"],"czekać na kogo? na co?"],
   ["grać","играть",["gram","grasz","gra","gramy","gracie","grają"],"grać w piłkę / grać na gitarze"],
   ["dać","дать",["dam","dasz","da","damy","dacie","dadzą"],"единственное исключение: oni dadzą, не «dają»"]
  ]},
 {n:"IV", mark:"-em / -esz",
  who:"Закрытый список из пяти глаголов и их приставочных производных. Учится списком.",
  find:"wiedzieć · jeść · umieć · rozumieć · śmieć - и всё, что от них: powiedzieć, opowiedzieć, zjeść, zrozumieć.",
  verbs:[
   ["wiedzieć","знать, że… (с придаточным)",["wiem","wiesz","wie","wiemy","wiecie","wiedzą"],"oni wiedzą - не «wieją»"],
   ["jeść","есть, кушать",["jem","jesz","je","jemy","jecie","jedzą"],"oni jedzą"],
   ["rozumieć","понимать",["rozumiem","rozumiesz","rozumie","rozumiemy","rozumiecie","rozumieją"],"oni rozumieją"],
   ["umieć","уметь",["umiem","umiesz","umie","umiemy","umiecie","umieją"],"oni umieją"],
   ["powiedzieć","сказать",["powiem","powiesz","powie","powiemy","powiecie","powiedzą"],"совершенный вид → будущее время"]
  ]}
];

/* правило бабочки: маленькое крыло (ja, oni) против большого (ty, on, my, wy) */
const MOTYL = [
 ["nieść","niosę · niosą","niesiesz · niesie · niesiemy · niesiecie"],
 ["móc","mogę · mogą","możesz · może · możemy · możecie"],
 ["brać","biorę · biorą","bierzesz · bierze · bierzemy · bierzecie"],
 ["jechać","jadę · jadą","jedziesz · jedzie · jedziemy · jedziecie"],
 ["prosić","proszę · proszą","prosisz · prosi · prosimy · prosicie"],
 ["chodzić","chodzę · chodzą","chodzisz · chodzi · chodzimy · chodzicie"]
];

/* чередования в основе настоящего времени */
const KALT = [
 ["s → sz","pisać → piszę, piszesz","I"],
 ["k → cz","płakać → płaczę · piec → pieczesz","I"],
 ["g → ż","móc → możesz · strzec → strzeżesz","I"],
 ["r → rz","brać → bierzesz · prać → pierzesz","I"],
 ["t → cz","szeptać → szepczę","I"],
 ["st → szcz","chlustać → chluszczę","I"],
 ["d → dzi","jechać → jedziesz · iść → idziesz","I"],
 ["si → sz","prosić → proszę · musieć → muszę","II"],
 ["zi → ż","wozić → wożę · grozić → grożę","II"],
 ["ci → c","płacić → płacę · wrócić → wrócę","II"],
 ["dzi → dz","chodzić → chodzę · widzieć → widzę","II"],
 ["ździ → żdż","jeździć → jeżdżę","II"],
 ["ści → szcz","czyścić → czyszczę","II"]
];

/* прошедшее время */
const PAST = [
 ["ja","robiłem","robiłam","-"],
 ["ty","robiłeś","robiłaś","-"],
 ["on / ona / ono","robił","robiła","robiło"],
 ["my","robiliśmy","robiłyśmy","-"],
 ["wy","robiliście","robiłyście","-"],
 ["oni / one","robili","robiły","-"]
];
const PASTIRR = [
 ["iść","szedłem / szłam","szedł · szła","szli · szły","полностью другая основа"],
 ["jeść","jadłem / jadłam","jadł · jadła","jedli · jadły","a → e только в мужско-личном"],
 ["móc","mogłem / mogłam","mógł · mogła","mogli · mogły","mógł - с ó"],
 ["mieć","miałem / miałam","miał · miała","mieli · miały","-eć → -ał, но -eli"],
 ["musieć","musiałem / musiałam","musiał · musiała","musieli · musiały","то же правило"],
 ["chcieć","chciałem / chciałam","chciał · chciała","chcieli · chciały","то же правило"],
 ["wziąć","wziąłem / wzięłam","wziął · wzięła","wzięli · wzięły","ą → ę везде, кроме «он»"],
 ["zacząć","zacząłem / zaczęłam","zaczął · zaczęła","zaczęli · zaczęły","то же правило"],
 ["znaleźć","znalazłem / znalazłam","znalazł · znalazła","znaleźli · znalazły",""],
 ["nieść","niosłem / niosłam","niósł · niosła","nieśli · niosły","niósł - с ó"],
 ["usiąść","usiadłem / usiadłam","usiadł · usiadła","usiedli · usiadły",""],
 ["być","byłem / byłam","był · była","byli · były","опора для всего остального"]
];

/* вид глагола */
const ASPECT = [
 ["robić","zrobić","делать"],["pisać","napisać","писать"],["czytać","przeczytać","читать"],
 ["jeść","zjeść","есть"],["pić","wypić","пить"],["kupować","kupić","покупать"],
 ["dawać","dać","давать"],["brać","wziąć","брать"],["mówić","powiedzieć","говорить"],
 ["widzieć","zobaczyć","видеть"],["oglądać","obejrzeć","смотреть"],["iść","pójść","идти"],
 ["wracać","wrócić","возвращаться"],["zaczynać","zacząć","начинать"],["kończyć","skończyć","заканчивать"],
 ["otwierać","otworzyć","открывать"],["zamykać","zamknąć","закрывать"],["spotykać się","spotkać się","встречаться"],
 ["sprzedawać","sprzedać","продавать"],["dzwonić","zadzwonić","звонить"],["pytać","zapytać","спрашивать"],
 ["uczyć się","nauczyć się","учить(ся)"],["pamiętać","zapamiętać","помнить / запомнить"]
];

/* повелительное наклонение */
const IMPER = [
 ["pisać","ty piszesz","pisz!","piszmy!","piszcie!","niech pisze!","I спр.: берём форму ty, убираем окончание"],
 ["mówić","ty mówisz","mów!","mówmy!","mówcie!","niech mówi!","II спр.: то же самое"],
 ["robić","ty robisz","rób!","róbmy!","róbcie!","niech robi!","o → ó в закрытом слоге"],
 ["czytać","oni czytają","czytaj!","czytajmy!","czytajcie!","niech czyta!","III спр.: берём форму oni, убираем -ą"],
 ["jeść","oni jedzą","jedz!","jedzmy!","jedzcie!","niech je!","IV спр.: от oni"],
 ["prosić","ty prosisz","proś!","prośmy!","proście!","niech prosi!","si → ś на конце"],
 ["wozić","ty wozisz","woź!","woźmy!","woźcie!","niech wozi!","zi → ź"],
 ["spać","ty śpisz","śpij!","śpijmy!","śpijcie!","niech śpi!","непроизносимая основа → -ij"],
 ["zapomnieć","ty zapomnisz","zapomnij!","zapomnijmy!","zapomnijcie!","niech zapomni!","то же -ij"],
 ["być","-","bądź!","bądźmy!","bądźcie!","niech będzie!","от будущего времени"],
 ["mieć","ty masz","miej!","miejmy!","miejcie!","niech ma!","нерегулярный"],
 ["wziąć","ty weźmiesz","weź!","weźmy!","weźcie!","niech weźmie!","нерегулярный"],
 ["iść","ty idziesz","idź!","idźmy!","idźcie!","niech idzie!",""],
 ["pomóc","ty pomożesz","pomóż!","pomóżmy!","pomóżcie!","niech pomoże!",""],
 ["dać","ty dasz","daj!","dajmy!","dajcie!","niech da!",""],
 ["powiedzieć","oni powiedzą","powiedz!","powiedzmy!","powiedzcie!","niech powie!",""]
];

/* управление глаголов */
const REKCJA = [
 ["dziękować","komu? za co?","Celownik + za","благодарить кого","Dziękuję ci za pomoc.",1],
 ["pomagać","komu?","Celownik","помогать кому","Pomagam mamie."],
 ["dzwonić","do kogo?","do + Dopełniacz","звонить кому","Dzwonię do brata.",1],
 ["szukać","czego?","Dopełniacz","искать что","Szukam pracy.",1],
 ["słuchać","czego?","Dopełniacz","слушать что","Słucham muzyki.",1],
 ["uczyć się","czego?","Dopełniacz","учить что","Uczę się polskiego.",1],
 ["używać","czego?","Dopełniacz","пользоваться чем","Używam telefonu.",1],
 ["potrzebować","czego?","Dopełniacz","нуждаться в чём","Potrzebuję pomocy.",1],
 ["zapomnieć","czego? o czym?","Dopełniacz","забыть что","Zapomniałem kluczy.",1],
 ["bać się","czego?","Dopełniacz","бояться чего","Boję się psów."],
 ["cieszyć się","z czego?","z + Dopełniacz","радоваться чему","Cieszę się z prezentu.",1],
 ["korzystać","z czego?","z + Dopełniacz","пользоваться чем","Korzystam z internetu.",1],
 ["śmiać się · żartować","z kogo?","z + Dopełniacz","смеяться над кем","Śmieję się z tego.",1],
 ["być dumnym","z kogo?","z + Dopełniacz","гордиться кем","Jestem z ciebie dumny.",1],
 ["składać się","z czego?","z + Dopełniacz","состоять из чего","Egzamin składa się z dwóch części."],
 ["chorować","na co?","na + Biernik","болеть чем","Choruję na grypę.",1],
 ["czekać","na kogo? na co?","na + Biernik","ждать кого","Czekam na autobus.",1],
 ["patrzeć","na co?","na + Biernik","смотреть на что","Patrzę na zdjęcie."],
 ["zapraszać","kogo? na co?","na + Biernik","приглашать на что","Zapraszam cię na kawę."],
 ["prosić","o co?","o + Biernik","просить о чём","Proszę o pomoc."],
 ["pytać","o co?","o + Biernik","спрашивать о чём","Pytam o cenę."],
 ["martwić się","o kogo?","o + Biernik","беспокоиться о ком","Martwię się o ciebie."],
 ["dbać","o co?","o + Biernik","заботиться о чём","Dbam o zdrowie."],
 ["interesować się","czym?","Narzędnik","интересоваться чем","Interesuję się muzyką."],
 ["zajmować się","czym?","Narzędnik","заниматься чем","Zajmuję się dziećmi."],
 ["opiekować się","kim?","Narzędnik","ухаживать за кем","Opiekuję się babcią.",1],
 ["rozmawiać","z kim? o czym?","z + Narzędnik","разговаривать с кем","Rozmawiam z szefem o pracy."],
 ["spotykać się","z kim?","z + Narzędnik","встречаться с кем","Spotykam się z przyjaciółmi."],
 ["tęsknić","za kim? za czym?","za + Narzędnik","скучать по кому","Tęsknię za domem.",1],
 ["zakochać się","w kim?","w + Miejscownik","влюбиться в кого","Zakochałem się w niej.",1],
 ["być podobnym","do kogo?","do + Dopełniacz","быть похожим на кого","Jestem podobny do ojca.",1],
 ["wierzyć","w co? komu?","w + Biernik / Celownik","верить во что","Wierzę w ciebie."],
 ["gratulować","komu? czego?","Celownik + Dopełniacz","поздравлять с чем","Gratuluję ci sukcesu.",1],
 ["życzyć","komu? czego?","Celownik + Dopełniacz","желать чего","Życzę ci zdrowia."],
 ["grać","w co? na czym?","w / na","играть во что · на чём","Gram w piłkę. Gram na gitarze.",1],
 ["iść","po co?","po + Biernik","идти за чем","Idę po chleb.",1]
];

/* глаголы движения */
const RUCH = [
 ["iść","chodzić","идти / ходить","Idę do sklepu. · Chodzę tam co dzień."],
 ["jechać","jeździć","ехать / ездить","Jadę do Krakowa. · Jeżdżę pociągiem."],
 ["biec","biegać","бежать / бегать","Biegnę na autobus. · Biegam rano."],
 ["lecieć","latać","лететь / летать","Lecę do Wilna. · Latam rzadko."],
 ["nieść","nosić","нести / носить","Niosę torbę. · Noszę okulary."],
 ["wieźć","wozić","везти / возить","Wiozę dzieci. · Wożę je do szkoły."],
 ["płynąć","pływać","плыть / плавать","Płynę do brzegu. · Pływam w basenie."]
];
const PREF = [
 ["pójść","пойти","Pójdę tam jutro."],
 ["przyjść","прийти","Przyszedł o piątej."],
 ["wyjść","выйти","Wyszła z domu."],
 ["wejść","войти","Wejdź, proszę!"],
 ["przejść","перейти","Przejdź przez ulicę."],
 ["dojść","дойти","Jak dojść do dworca?"],
 ["odejść","отойти, уйти","Pociąg już odszedł."],
 ["obejść","обойти","Obeszliśmy całe miasto."]
];

/* отглагольные формы: причастия, пассив, существительные на -anie/-enie/-cie */
const IMIES_CZ = [
 ["czytać","oni czytają","czytający / czytająca / czytające","читающий"],
 ["pracować","oni pracują","pracujący","работающий"],
 ["spać","oni śpią","śpiący","спящий"],
 ["iść","oni idą","idący","идущий"],
 ["palić","oni palą","palący","курящий"],
 ["mieszkać","oni mieszkają","mieszkający","проживающий"]
];
const IMIES_B = [
 ["-ać → -any","przeczytać → przeczytany · napisać → napisany · sprzedać → sprzedany"],
 ["-ić / -yć → -ony, с тем же чередованием, что в 1-м лице","zrobić → zrobiony · kupić → kupiony · zaprosić → zaproszony · zapłacić → zapłacony"],
 ["-eć → -any / -iany","widzieć → widziany · słyszeć → słyszany"],
 ["-ąć и корни на гласный → -ty","zamknąć → zamknięty · wziąć → wzięty · umyć → umyty · zająć → zajęty · otworzyć → otwarty"]
];
const IMIES_SIGNS = [
 ["Zamknięte","закрыто"],["Otwarte","открыто"],["Zajęte","занято"],
 ["Zarezerwowane","забронировано"],["Sprzedane","продано"],["dla palących","для курящих"]
];
const IMIES_PRZYS = [
 ["współczesny · -ąc","одновременно, только несов. вид","oni czytają → czytając · są → będąc","Idąc do pracy, słucham muzyki. · Czekając na autobus, czytam."],
 ["uprzedni · -wszy / -łszy","раньше главного действия, только сов. вид","zrobić → zrobiwszy · przyjść → przyszedłszy","Zrobiwszy zakupy, wróciłem do domu."]
];
const PASSIVE_Z = [
 ["zostać + причастие","событие, совершенный вид","Dom został zbudowany w 1900 roku. · Zostałem zaproszony na ślub. · Bilet został kupiony online."],
 ["być + причастие","состояние или регулярность","Sklep jest otwarty od dziewiątej. · Obiad jest już zrobiony. · Faktury są wystawiane co miesiąc."]
];
const VNOUN = [
 ["-ać → -anie","czytać → czytanie · pisać → pisanie · parkować → parkowanie · sprzątać → sprzątanie"],
 ["-ić / -yć / -eć → -enie","palić → palenie · mówić → mówienie · myśleć → myślenie · uczyć się → uczenie się"],
 ["-ąć и корни на гласный → -cie","zamknąć → zamknięcie · otworzyć → otwarcie · myć → mycie · żyć → życie · wziąć → wzięcie"]
];
const VNOUN_SIGNS = [
 ["Zakaz palenia","курить запрещено"],
 ["Zakaz parkowania","парковка запрещена"],
 ["Godziny otwarcia","часы работы"],
 ["Do wynajęcia","сдаётся"],
 ["Mycie rąk obowiązkowe","мытьё рук обязательно"],
 ["Uwaga, malowanie!","осторожно, идёт покраска"]
];

/* частотные глаголы: [инфинитив, перевод, спряжение, ja, ty, oni, он, она, сов. вид] */
const VERBS = [
 ["być","быть","-","jestem","jesteś","są","był","była","-"],
 ["mieć","иметь","III","mam","masz","mają","miał","miała","-"],
 ["robić","делать","II","robię","robisz","robią","robił","robiła","zrobić"],
 ["mówić","говорить","II","mówię","mówisz","mówią","mówił","mówiła","powiedzieć"],
 ["wiedzieć","знать, że… (с придаточным)","IV","wiem","wiesz","wiedzą","wiedział","wiedziała","-"],
 ["znać","знать (кого/что)","III","znam","znasz","znają","znał","znała","poznać"],
 ["myśleć","думать","II","myślę","myślisz","myślą","myślał","myślała","pomyśleć"],
 ["chcieć","хотеть","I","chcę","chcesz","chcą","chciał","chciała","-"],
 ["móc","мочь","I","mogę","możesz","mogą","mógł","mogła","-"],
 ["musieć","быть должным","II","muszę","musisz","muszą","musiał","musiała","-"],
 ["iść","идти","I","idę","idziesz","idą","szedł","szła","pójść"],
 ["chodzić","ходить","II","chodzę","chodzisz","chodzą","chodził","chodziła","-"],
 ["jechać","ехать","I","jadę","jedziesz","jadą","jechał","jechała","pojechać"],
 ["jeździć","ездить","II","jeżdżę","jeździsz","jeżdżą","jeździł","jeździła","-"],
 ["przyjść","прийти","I","przyjdę","przyjdziesz","przyjdą","przyszedł","przyszła","сов."],
 ["brać","брать","I","biorę","bierzesz","biorą","brał","brała","wziąć"],
 ["wziąć","взять","I","wezmę","weźmiesz","wezmą","wziął","wzięła","сов."],
 ["dawać","давать","I","daję","dajesz","dają","dawał","dawała","dać"],
 ["dać","дать","III","dam","dasz","dadzą","dał","dała","сов."],
 ["jeść","есть, кушать","IV","jem","jesz","jedzą","jadł","jadła","zjeść"],
 ["pić","пить","I","piję","pijesz","piją","pił","piła","wypić"],
 ["czytać","читать","III","czytam","czytasz","czytają","czytał","czytała","przeczytać"],
 ["pisać","писать","I","piszę","piszesz","piszą","pisał","pisała","napisać"],
 ["mieszkać","жить, проживать","III","mieszkam","mieszkasz","mieszkają","mieszkał","mieszkała","zamieszkać"],
 ["pracować","работать","I","pracuję","pracujesz","pracują","pracował","pracowała","-"],
 ["kupować","покупать","I","kupuję","kupujesz","kupują","kupował","kupowała","kupić"],
 ["kupić","купить","II","kupię","kupisz","kupią","kupił","kupiła","сов."],
 ["płacić","платить","II","płacę","płacisz","płacą","płacił","płaciła","zapłacić"],
 ["lubić","нравиться, любить","II","lubię","lubisz","lubią","lubił","lubiła","polubić"],
 ["kochać","любить","III","kocham","kochasz","kochają","kochał","kochała","pokochać"],
 ["widzieć","видеть","II","widzę","widzisz","widzą","widział","widziała","zobaczyć"],
 ["patrzeć","смотреть на","II","patrzę","patrzysz","patrzą","patrzył","patrzyła","popatrzeć"],
 ["oglądać","смотреть (фильм)","III","oglądam","oglądasz","oglądają","oglądał","oglądała","obejrzeć"],
 ["słuchać","слушать","III","słucham","słuchasz","słuchają","słuchał","słuchała","posłuchać"],
 ["słyszeć","слышать","II","słyszę","słyszysz","słyszą","słyszał","słyszała","usłyszeć"],
 ["rozumieć","понимать","IV","rozumiem","rozumiesz","rozumieją","rozumiał","rozumiała","zrozumieć"],
 ["umieć","уметь","IV","umiem","umiesz","umieją","umiał","umiała","-"],
 ["uczyć się","учиться","II","uczę się","uczysz się","uczą się","uczył się","uczyła się","nauczyć się"],
 ["pamiętać","помнить","III","pamiętam","pamiętasz","pamiętają","pamiętał","pamiętała","zapamiętać"],
 ["zapomnieć","забыть","II","zapomnę","zapomnisz","zapomną","zapomniał","zapomniała","сов."],
 ["spać","спать","II","śpię","śpisz","śpią","spał","spała","-"],
 ["wstawać","вставать","I","wstaję","wstajesz","wstają","wstawał","wstawała","wstać"],
 ["stać","стоять","II","stoję","stoisz","stoją","stał","stała","-"],
 ["siedzieć","сидеть","II","siedzę","siedzisz","siedzą","siedział","siedziała","usiąść"],
 ["leżeć","лежать","II","leżę","leżysz","leżą","leżał","leżała","-"],
 ["czekać","ждать","III","czekam","czekasz","czekają","czekał","czekała","poczekać"],
 ["szukać","искать","III","szukam","szukasz","szukają","szukał","szukała","znaleźć"],
 ["znaleźć","найти","I","znajdę","znajdziesz","znajdą","znalazł","znalazła","сов."],
 ["pytać","спрашивать","III","pytam","pytasz","pytają","pytał","pytała","zapytać"],
 ["prosić","просить","II","proszę","prosisz","proszą","prosił","prosiła","poprosić"],
 ["dziękować","благодарить","I","dziękuję","dziękujesz","dziękują","dziękował","dziękowała","podziękować"],
 ["przepraszać","извиняться","III","przepraszam","przepraszasz","przepraszają","przepraszał","przepraszała","przeprosić"],
 ["rozmawiać","разговаривать","III","rozmawiam","rozmawiasz","rozmawiają","rozmawiał","rozmawiała","porozmawiać"],
 ["dzwonić","звонить","II","dzwonię","dzwonisz","dzwonią","dzwonił","dzwoniła","zadzwonić"],
 ["otwierać","открывать","III","otwieram","otwierasz","otwierają","otwierał","otwierała","otworzyć"],
 ["otworzyć","открыть","II","otworzę","otworzysz","otworzą","otworzył","otworzyła","сов."],
 ["zamykać","закрывать","III","zamykam","zamykasz","zamykają","zamykał","zamykała","zamknąć"],
 ["zamknąć","закрыть","I","zamknę","zamkniesz","zamkną","zamknął","zamknęła","сов."],
 ["zaczynać","начинать","III","zaczynam","zaczynasz","zaczynają","zaczynał","zaczynała","zacząć"],
 ["zacząć","начать","I","zacznę","zaczniesz","zaczną","zaczął","zaczęła","сов."],
 ["kończyć","заканчивать","II","kończę","kończysz","kończą","kończył","kończyła","skończyć"],
 ["wracać","возвращаться","III","wracam","wracasz","wracają","wracał","wracała","wrócić"],
 ["wrócić","вернуться","II","wrócę","wrócisz","wrócą","wrócił","wróciła","сов."],
 ["spotykać się","встречаться","III","spotykam się","spotykasz się","spotykają się","spotykał się","spotykała się","spotkać się"],
 ["gotować","готовить","I","gotuję","gotujesz","gotują","gotował","gotowała","ugotować"],
 ["sprzątać","убирать","III","sprzątam","sprzątasz","sprzątają","sprzątał","sprzątała","posprzątać"],
 ["myć się","мыться","I","myję się","myjesz się","myją się","mył się","myła się","umyć się"],
 ["bać się","бояться","II","boję się","boisz się","boją się","bał się","bała się","-"],
 ["tańczyć","танцевать","II","tańczę","tańczysz","tańczą","tańczył","tańczyła","zatańczyć"],
 ["śpiewać","петь","III","śpiewam","śpiewasz","śpiewają","śpiewał","śpiewała","zaśpiewać"],
 ["grać","играть","III","gram","grasz","grają","grał","grała","zagrać"],
 ["nieść","нести","I","niosę","niesiesz","niosą","niósł","niosła","zanieść"],
 ["pomagać","помогать","III","pomagam","pomagasz","pomagają","pomagał","pomagała","pomóc"],
 ["pomóc","помочь","I","pomogę","pomożesz","pomogą","pomógł","pomogła","сов."],
 ["żyć","жить","I","żyję","żyjesz","żyją","żył","żyła","-"],
 ["lecieć","лететь","II","lecę","lecisz","lecą","leciał","leciała","polecieć"],
 ["biec","бежать","I","biegnę","biegniesz","biegną","biegł","biegła","pobiec"],
 ["sprzedawać","продавать","I","sprzedaję","sprzedajesz","sprzedają","sprzedawał","sprzedawała","sprzedać"],
 ["powiedzieć","сказать","IV","powiem","powiesz","powiedzą","powiedział","powiedziała","сов."]
];

/* ============ ДАННЫЕ: числительные ============ */
const NUM = [
 [0,"zero"],[1,"jeden"],[2,"dwa"],[3,"trzy"],[4,"cztery"],[5,"pięć"],[6,"sześć"],[7,"siedem"],
 [8,"osiem"],[9,"dziewięć"],[10,"dziesięć"],[11,"jedenaście"],[12,"dwanaście"],[13,"trzynaście"],
 [14,"czternaście"],[15,"piętnaście"],[16,"szesnaście"],[17,"siedemnaście"],[18,"osiemnaście"],
 [19,"dziewiętnaście"],[20,"dwadzieścia"]
];
const NUM10 = [
 [30,"trzydzieści"],[40,"czterdzieści"],[50,"pięćdziesiąt"],[60,"sześćdziesiąt"],
 [70,"siedemdziesiąt"],[80,"osiemdziesiąt"],[90,"dziewięćdziesiąt"],[100,"sto"],
 [200,"dwieście"],[300,"trzysta"],[400,"czterysta"],[500,"pięćset"],[600,"sześćset"],
 [700,"siedemset"],[800,"osiemset"],[900,"dziewięćset"],["1 000","tysiąc"],["10⁶","milion"]
];
const ORD = [
 [1,"pierwszy"],[2,"drugi"],[3,"trzeci"],[4,"czwarty"],[5,"piąty"],[6,"szósty"],[7,"siódmy"],
 [8,"ósmy"],[9,"dziewiąty"],[10,"dziesiąty"],[11,"jedenasty"],[12,"dwunasty"],[13,"trzynasty"],
 [14,"czternasty"],[15,"piętnasty"],[16,"szesnasty"],[17,"siedemnasty"],[18,"osiemnasty"],
 [19,"dziewiętnasty"],[20,"dwudziesty"],[30,"trzydziesty"],[40,"czterdziesty"],[50,"pięćdziesiąty"],
 [100,"setny"],[1000,"tysięczny"]
];
/* склонение числительных */
const NDEKL = [
 ["Mianownik","dwa · dwie · dwaj","trzy · trzej","cztery · czterej","pięć · pięciu"],
 ["Dopełniacz","dwóch","trzech","czterech","pięciu"],
 ["Celownik","dwóm","trzem","czterem","pięciu"],
 ["Biernik","dwa · dwie · dwóch","trzy · trzech","cztery · czterech","pięć · pięciu"],
 ["Narzędnik","dwoma · dwiema","trzema","czterema","pięcioma"],
 ["Miejscownik","dwóch","trzech","czterech","pięciu"]
];
/* согласование числительного с существительным */
const NAGR = [
 ["1","Mianownik ед. ч.","jeden dom · jedna książka · jedno okno","jest / był"],
 ["2, 3, 4","Mianownik мн. ч.","dwa domy · trzy książki · cztery okna","są / były"],
 ["5 и больше","Dopełniacz мн. ч.","pięć domów · dziesięć książek · sto okien","jest / było"],
 ["12, 13, 14","Dopełniacz мн. ч.","dwanaście domów · czternaście książek","jest / było"],
 ["22, 23, 24","Mianownik мн. ч.","dwadzieścia dwa domy · trzydzieści trzy książki","są / były"],
 ["21, 25, 31…","Dopełniacz мн. ч.","dwadzieścia jeden domów · trzydzieści pięć książek","jest / było"]
];
/* мужско-личные формы */
const MOSNUM = [
 ["dwaj · trzej · czterej","Mianownik мн. ч.","глагол во мн. ч.","Dwaj studenci czytają. · Trzej panowie śpiewali."],
 ["dwóch · trzech · czterech","Dopełniacz мн. ч.","глагол в ср. роде ед. ч.","Dwóch studentów czyta. · Trzech panów śpiewało."],
 ["pięciu · sześciu · dziesięciu","Dopełniacz мн. ч.","глагол в ср. роде ед. ч.","Pięciu studentów czekało. · Dwudziestu ludzi przyszło."]
];
/* собирательные */
const ZBIOR = [
 ["dwoje","двое","dwoje dzieci · dwoje ludzi"],
 ["troje","трое","troje rodzeństwa · troje drzwi"],
 ["czworo","четверо","czworo studentów"],
 ["pięcioro","пятеро","pięcioro kurcząt"],
 ["oboje","оба (он и она)","oboje rodzice (не «rodziców») · obojga rodziców"],
 ["kilkoro","несколько (о людях)","kilkoro znajomych"]
];
const MIES = [
 ["styczeń","stycznia","январь"],["luty","lutego","февраль"],["marzec","marca","март"],
 ["kwiecień","kwietnia","апрель"],["maj","maja","май"],["czerwiec","czerwca","июнь"],
 ["lipiec","lipca","июль"],["sierpień","sierpnia","август"],["wrzesień","września","сентябрь"],
 ["październik","października","октябрь"],["listopad","listopada","ноябрь"],["grudzień","grudnia","декабрь"]
];
const DNI = [
 ["poniedziałek","w poniedziałek","понедельник"],["wtorek","we wtorek","вторник"],
 ["środa","w środę","среда"],["czwartek","w czwartek","четверг"],["piątek","w piątek","пятница"],
 ["sobota","w sobotę","суббота"],["niedziela","w niedzielę","воскресенье"]
];
const GODZ = [
 ["13:00","pierwsza","o pierwszej"],
 ["14:15","kwadrans po drugiej · druga piętnaście","kwadrans po drugiej"],
 ["14:30","wpół do trzeciej","o wpół do trzeciej"],
 ["14:45","za kwadrans trzecia","za kwadrans trzecia"],
 ["15:10","dziesięć po trzeciej","dziesięć po trzeciej"],
 ["15:50","za dziesięć czwarta","za dziesięć czwarta"]
];

/* ============ ДАННЫЕ: союзы ============ */
const CONJ_COORD = [
 ["i","и","Kupiłem chleb i mleko.","без запятой, просто соединяет"],
 ["a","а","On czyta, a ja piszę.","лёгкое противопоставление, с запятой"],
 ["ale","но","Chciałem pójść, ale nie mogłem.","сильное противопоставление, с запятой"],
 ["lub / albo","или","Herbata lub kawa. · Albo ty, albo ja.","albo часто взаимоисключающее"],
 ["ani… ani","ни… ни","Nie mam ani czasu, ani pieniędzy.","двойное отрицание при глаголе сохраняется"],
 ["więc / zatem","поэтому, итак","Spóźniłem się, więc pobiegłem.","следствие"],
 ["dlatego","поэтому","Byłem chory, dlatego nie przyszedłem.","следствие, чуть более книжное чем więc"],
 ["natomiast / jednak","однако, зато","Ja lubię herbatę, natomiast on kawę.","мягче, чем ale"],
 ["czyli","то есть","Jest weekend, czyli sobota i niedziela.","пояснение"],
 ["oraz","а также","Zaprosiłem rodzinę oraz przyjaciół.","официальный синоним i"]
];
const CONJ_SUB = [
 ["że","что","Wiem, że przyjdzie.","вводит факт после глаголов знания/речи"],
 ["żeby / aby","чтобы","Chcę, żebyś przyszedł.","цель или желание; после żeby - сослагательные окончания"],
 ["ponieważ / gdyż","потому что","Nie przyszedłem, ponieważ byłem chory.","нейтрально-письменное"],
 ["bo","потому что","Nie przyszedłem, bo byłem chory.","разговорное, то же значение"],
 ["jeśli / jeżeli","если","Jeśli będziesz gotowy, zadzwoń.","условие"],
 ["gdyby","если бы","Gdybym miał czas, poszedłbym.","нереальное условие, требует условного наклонения"],
 ["gdy / kiedy","когда","Zadzwonię, gdy przyjadę.",""],
 ["chociaż / mimo że","хотя, несмотря на то что","Poszedłem, chociaż padał deszcz.",""],
 ["zanim","прежде чем","Zanim wyjdziesz, zamknij okno.",""],
 ["odkąd","с тех пор как","Odkąd tu mieszkam, jestem szczęśliwy.",""],
 ["dopóki (nie)","пока (не)","Czekam, dopóki nie zadzwonisz.","при dopóki nie глагол обычно совершенного вида; просто dopóki («пока») - несовершенного"],
 ["skoro","раз уж, поскольку","Skoro już tu jesteś, zostań na obiad.",""]
];

/* ============ ДАННЫЕ: частицы ============ */
const PART = [
 ["no","ну","No dobrze, mów. · No i co? · Chodź no tutaj!","Самая частая в разговоре. Не «но» - «но» это <span class='pl'>ale</span>."],
 ["czy","ли","Czy jesteś głodny? · Nie wiem, czy przyjdzie.","Открывает вопрос, на который отвечают «да/нет». В разговоре часто опускается."],
 ["chyba","наверное, кажется","Chyba tak. · Chyba będzie padać.","Неуверенность. <span class='pl'>chyba że</span> - «разве что»."],
 ["może","может быть","Może pójdziemy do kina? · Może masz rację.","Ещё и мягкое предложение."],
 ["pewnie","наверняка","Pewnie śpi. · No pewnie!","<span class='pl'>No pewnie!</span> - «ну конечно!»"],
 ["niech","пусть","Niech pan wejdzie. · Niech oni poczekają.","Повелительное для 3-го лица и вежливое обращение."],
 ["oby","хоть бы, дай бог","Oby się udało! · Oby nie padało.","Пожелание."],
 ["żeby","чтобы, вот бы","Żebyś wiedział! · Żeby tylko zdążyć.","Сливается с окончаниями: żebym, żebyś, żebyśmy."],
 ["przecież","ведь","Przecież mówiłem! · Przecież to oczywiste.","Возражение и напоминание."],
 ["właśnie","именно, как раз","Właśnie o tym mówię. · Właśnie!","Одиночное <span class='pl'>Właśnie!</span> = «вот именно!»"],
 ["akurat","как раз","Jest akurat pięć jabłek. · Akurat!","Одиночное <span class='pl'>Akurat!</span> - ирония: «ага, конечно»."],
 ["naprawdę","правда, действительно","Naprawdę nie wiem. · Naprawdę?","Проверка и усиление."],
 ["tylko","только","Mam tylko pięć złotych. · Tylko nie to!","Ограничение."],
 ["nawet","даже","Nawet nie wiedziałem. · Nawet ładne.","Усиление."],
 ["wcale","вовсе","Wcale nie! · Wcale mi się nie podoba.","Почти всегда с <span class='pl'>nie</span>."],
 ["dopiero","только (о времени)","Dopiero przyszedł. · Jest dopiero piąta.","Не путать с <span class='pl'>tylko</span>: <span class='pl'>dopiero</span> - про время."],
 ["owszem","да, конечно","Owszem, zgadzam się.","Вежливое согласие, часто в ответ на вопрос."],
 ["ależ","да что ты, ну конечно","Ależ oczywiście! · Ależ nie!","Эмоциональное усиление."],
 ["niby","якобы, вроде","Niby się uczy. · Niby wszystko dobrze.","Сомнение в чужих словах."],
 ["raczej","скорее","Raczej nie. · Raczej tak.","Мягкий ответ вместо резкого «нет»."],
 ["aż","аж","Aż tyle? · Czekałem aż trzy godziny.","Удивление количеству."],
 ["ani","ни","Ani słowa! · Ani jeden.","Усиленное отрицание."]
];
const PARTKL = [
 ["вопросительные","czy, czyż, czyżby","Czy Ania wróciła?"],
 ["утвердительные","tak, no, owszem, wszak","Tak, trochę."],
 ["отрицательные","nie, ani, wcale","To nie jest problem."],
 ["условные","by, bym, byś, byśmy, byście","On by to zrobił dobrze."],
 ["сомнения","chyba, może, pewnie, bodaj","Może mógłbyś wysłać mi maila."],
 ["побудительные","niech, oby, żeby","Niech ona to skończy!"],
 ["усилительные","przecież, ależ, -że, to","Ależ oczywiście!"],
 ["ограничительные","tylko, jedynie, nawet, chociaż","Mam tylko pięć złotych."],
 ["неопределённые","byle, lada, -kolwiek, -ś","Nie rzucaj byle gdzie."]
];
const PARTPIS = [
 ["слитно","-że, -ż с глаголами и вопросительными","idźże! · chodźże! · dlaczegoż · cóż · któż"],
 ["слитно","by, bym, byś с личными формами и союзами","zrobiłbym · gdybym · żebyś · aby"],
 ["слитно","nie с существительными, прилагательными, наречиями","nieprawda · niegrzeczny · niedaleko · niepalący"],
 ["раздельно","no, czy, niech, oby, bodaj - всегда","Podejdź no tutaj! · Czy wiesz?"],
 ["раздельно","nie с глаголами","nie wiem · nie mam · nie chcę"],
 ["раздельно","nie с числительными и местоимениями","nie pięć · nie ja · nie ten"],
 ["раздельно","nie со сравнительной и превосходной степенью","nie lepszy · nie najlepszy · nie gorzej"],
 ["раздельно","by с безличными формами","można by · trzeba by · warto by"]
];
const NIEOKR = [
 ["-ś","-то, -нибудь","ktoś · coś · gdzieś · kiedyś · jakiś"],
 ["-kolwiek","-нибудь (любой)","ktokolwiek · cokolwiek · gdziekolwiek · jakikolwiek"],
 ["byle","лишь бы, кое-как","byle kto · byle gdzie · byle jak"],
 ["lada","любой, первый попавшийся","lada dzień · lada chwila · lada kto"],
 ["nie-","ни- / не-","nikt · nic · nigdy · nigdzie · żaden"]
];

/* ============ ДАННЫЕ: уменьшительные формы ============ */
const DIM_M = [["kot","kotek","koteczek","кот"],["pies","piesek","pieseczek","пёс"],["dom","domek","domeczek","дом"],
 ["chłopiec","chłopczyk","","мальчик"],["brat","braciszek","","брат"],["ząb","ząbek","","зуб"],
 ["nos","nosek","","нос"],["stół","stolik","","стол"],["kwiat","kwiatek","kwiatuszek","цветок"]];
const DIM_F = [["książka","książeczka","","книга"],["kawa","kawka / kawusia","","кофе"],["mama","mamusia","","мама"],
 ["córka","córeczka","","дочь"],["ręka","rączka","","рука"],["gwiazda","gwiazdka","","звезда"],
 ["torba","torebka","","сумка"],["chwila","chwilka","","момент"],["siostra","siostrzyczka","","сестра"]];
const DIM_N = [["okno","okienko","","окно"],["dziecko","dzieciątko","","ребёнок"],["mleko","mleczko","","молоко"],
 ["słońce","słoneczko","","солнце"],["jajko","jajeczko","","яйцо"],["piwo","piwko","","пиво"]];
const DIM_ADJ = [["mały","malutki","maluteńki / maciupeńki","маленький"],["ładny","ładniutki","","красивый"],
 ["cichy","cichutki","cichuteńki","тихий"],["słodki","słodziutki","","сладкий, милый"],["biedny","biedniutki","","бедный, бедняжка"]];
const DIM_NAME = [["Anna","Ania","Anusia / Anka","Аня, Анечка"],["Piotr","Piotrek","Piotruś","Петя, Петенька"],
 ["Katarzyna","Kasia","Kasieńka","Катя, Катенька"],["Michał","Michałek","Misiek","Миша, Мишенька"],
 ["Elżbieta","Ela","Elunia","Эля, Элечка"],["babcia","babcia → babunia","","бабушка → бабуля"]];

/* ============ ДАННЫЕ: вопросы и który ============ */
const QWORDS = [
 ["kto","кто","Kto to jest?"],
 ["co","что","Co to jest?"],
 ["jaki / jaka / jakie","какой (качество, любой признак)","Jaki jest dzisiaj dzień? - Słoneczny."],
 ["który / która / które","который (выбор из известного набора)","Który dzień tygodnia lubisz najbardziej?"],
 ["czyj / czyja / czyje","чей","Czyja to torba?"],
 ["ile","сколько","Ile to kosztuje?"],
 ["gdzie","где","Gdzie mieszkasz?"],
 ["dokąd","куда","Dokąd idziesz?"],
 ["skąd","откуда","Skąd jesteś?"],
 ["kiedy","когда","Kiedy wracasz?"],
 ["dlaczego","почему","Dlaczego się spóźniłeś?"],
 ["jak","как","Jak się masz?"],
 ["po co","зачем","Po co to robisz?"]
];
const QPREP = [
 ["o czym","о чём","O czym myślisz?"],
 ["o kim","о ком","O kim mówisz?"],
 ["z kim","с кем","Z kim idziesz do kina?"],
 ["do kogo","к кому","Do kogo dzwonisz?"],
 ["dla kogo","для кого","Dla kogo to jest?"],
 ["na co","на что","Na co czekasz?"],
 ["na kogo","на кого","Na kogo czekasz?"],
 ["u kogo","у кого","U kogo mieszkasz?"],
 ["za co","за что","Za co mi dziękujesz?"],
 ["w czym","в чём","W czym problem?"],
 ["z czego","из чего","Z czego to jest zrobione?"]
];
const KTORY = [
 ["Mianownik","który","która","które","którzy","które"],
 ["Dopełniacz","którego","której","którego","których","których"],
 ["Celownik","któremu","której","któremu","którym","którym"],
 ["Biernik","który / którego","którą","które","których","które"],
 ["Narzędnik","którym","którą","którym","którymi","którymi"],
 ["Miejscownik","którym","której","którym","których","których"]
];
const KTORY_SENT = [
 ["sklep, w którym pracuję","магазин, в котором я работаю","Miejscownik м. р. - согласован со sklep, падеж от pracować w czym?"],
 ["kobieta, którą znam","женщина, которую я знаю","Biernik ж. р. - согласован с kobieta, падеж от znać co? kogo?"],
 ["ludzie, którzy przyszli","люди, которые пришли","Mianownik мн. мужско-личное - który здесь подлежащее придаточного"],
 ["pani, której szukam","женщина, которую я ищу","Dopełniacz ж. р. - согласован с pani, но падеж от szukać kogo? czego?"],
 ["dom, który kupiłem","дом, который я купил","Biernik м. р., неодуш. - forma który, не którego"],
 ["mężczyzna, którego znam","мужчина, которого я знаю","Biernik м. р., одуш. - forma którego, не który"]
];

/* ============ ДАННЫЕ: отрицание ============ */
const NIKT_DEKL = [
 ["Mianownik","nikt","nic"],
 ["Dopełniacz","nikogo","niczego"],
 ["Celownik","nikomu","niczemu"],
 ["Biernik","nikogo","nic"],
 ["Narzędnik","nikim","niczym"],
 ["Miejscownik","nikim","niczym"]
];
const NEG_MULTI = [
 ["Nikt nic nie wie.","Никто ничего не знает.","2 отрицательных слова + nie"],
 ["Nigdy nikomu nic nie mówię.","Я никогда никому ничего не говорю.","3 отрицательных слова + nie"],
 ["Nigdzie nikogo nie widziałem.","Я нигде никого не видел.","2 отрицательных слова + nie"],
 ["Nikt nigdy tu nie przychodzi.","Никто никогда сюда не приходит.","2 отрицательных слова + nie"]
];
const NIEMA_JEST = [
 ["Nie ma czasu.","Dopełniacz","безличное: времени нет вообще, ни у кого конкретно"],
 ["On nie ma czasu.","Dopełniacz","личное отрицание обладания: у него нет времени"],
 ["To nie jest prawda.","Mianownik","отрицание тождества: это не есть правда"],
 ["On nie jest lekarzem.","Narzędnik","отрицание роли/профессии - как и в утверждении, jest + Narzędnik"],
 ["Jej nie ma w domu.","Dopełniacz","её нет дома - буквально «отсутствует»"],
 ["Ona nie jest w domu.","Miejscownik","она не находится дома - утверждение о месте, просто с nie"]
];

/* ============ ДАННЫЕ: порядок слов ============ */
const SIE_POS = [
 ["Jak się nazywasz?","się - вторым словом, перед глаголом","не в начале и не в конце"],
 ["Nazywam się Jan.","się - сразу после глагола, других мест нет","глагол первый - się льнёт к нему"],
 ["Nie martw się.","się - в конце короткой фразы","после отрицания + глагол"],
 ["Czy podoba ci się ten film?","сначала ci, потом się - порядок клитик фиксирован","ci się, не się ci"],
 ["Widziałem go wczoraj.","go (местоимение) - не в начале предложения","*Go widziałem wczoraj - режет слух"]
];
const CLITICS = [
 ["się","возвратная частица","Uczę się polskiego."],
 ["mi","мне","Powiedz mi prawdę."],
 ["ci","тебе","Podoba ci się?"],
 ["go","его (Biernik)","Znam go dobrze."],
 ["mu","ему","Pomogę mu jutro."],
 ["jej","ей","Dam jej kwiaty."]
];
const QVERB_ORDER = [
 ["Ile kosztuje bilet?","верно: вопросительное слово + глагол сразу","Ile bilet kosztuje? звучит неестественно"],
 ["Gdzie mieszka twoja siostra?","вопросительное слово + глагол + подлежащее",""],
 ["Kiedy wraca ojciec?","то же самое",""]
];

/* ============ ДАННЫЕ: безличные конструкции ============ */
const IMPERS_MODAL = [
 ["trzeba","надо, нужно","Trzeba iść do lekarza."],
 ["można","можно","Można tu parkować?"],
 ["nie wolno","нельзя, запрещено","Nie wolno tu palić."],
 ["warto","стоит (имеет смысл)","Warto to przeczytać."],
 ["należy","следует (более официально)","Należy wypełnić formularz."]
];
const MOWI_SIE = [
 ["Jak się mówi po polsku «hello»?","Как сказать по-польски «hello»?"],
 ["Mówi się, że będzie drożej.","Говорят, что будет дороже."],
 ["Jak to się nazywa?","Как это называется?"],
 ["Tu się nie pali.","Здесь не курят."],
 ["Jak dojeżdża się na lotnisko?","Как добраться в аэропорт?"]
];
const PASSIVE_NO = [
 ["zbudować → zbudowany","zbudowano","Dom zbudowano w 1900 roku."],
 ["otworzyć → otwarty","otwarto","Sklep otwarto o dziesiątej."],
 ["zamknąć → zamknięty","zamknięto","Muzeum zamknięto z powodu remontu."],
 ["napisać → napisany","napisano","Ogłoszenie napisano po polsku."],
 ["zrobić → zrobiony","zrobiono","Wszystko zrobiono na czas."]
];

/* ============ ДАННЫЕ: беглое e в предлогах ============ */
const PREP_E = [
 ["w","we","we Wrocławiu, we wtorek, we mnie"],
 ["z","ze","ze mną, ze szkoły, ze sobą"],
 ["od","ode","ode mnie"],
 ["przed","przede","przede wszystkim"],
 ["pod","pode","pode mną"]
];

/* ============ ДАННЫЕ: предлоги ============ */
const PREPS = [
 ["w","Miejscownik","где","w sklepie, w domu, w pracy"],
 ["w","Biernik","в какой день","w środę, w poniedziałek"],
 ["na","Miejscownik","где (на поверхности, на мероприятии)","na stole, na poczcie, na uniwersytecie"],
 ["na","Biernik","куда","idę na pocztę, na obiad"],
 ["do","Dopełniacz","куда, к кому","do sklepu, do lekarza, do domu"],
 ["z","Dopełniacz","откуда, из","z Warszawy, z domu"],
 ["z","Narzędnik","с кем, с чем","kawa z mlekiem, z bratem"],
 ["od","Dopełniacz","от кого, с какого времени","od lekarza, od poniedziałku"],
 ["u","Dopełniacz","у кого","u lekarza, u mamy"],
 ["dla","Dopełniacz","для","dla dziecka"],
 ["bez","Dopełniacz","без","bez cukru"],
 ["obok / koło","Dopełniacz","рядом с","obok sklepu"],
 ["przy","Miejscownik","при, возле","przy oknie, przy kasie"],
 ["o","Miejscownik","о чём; во сколько","o pogodzie, o piątej"],
 ["o","Biernik","просить/спрашивать о","proszę o pomoc, pytam o cenę"],
 ["po","Miejscownik","после","po pracy, po obiedzie"],
 ["po","Biernik","за чем-то (сходить)","idę po chleb"],
 ["przez","Biernik","через, в течение","przez miasto, przez godzinę"],
 ["przed / nad / pod / za / między","Narzędnik","где","przed domem, nad stołem"],
 ["przed / nad / pod / za / między","Biernik","куда","idę pod stół"],
 ["dzięki","Celownik","благодаря","dzięki tobie"]
];
const TABS = [["s-alpha","Алфавит"],["s-cases","Существительные"],["s-adj","Прилагательные"],["s-adv","Наречия"],["s-pron","Местоимения"],["s-q","Вопросы"],["s-num","Числительные"],["s-verbs","Глаголы"],["s-neg","Отрицание"],["s-order","Порядок слов"],["s-impers","Безличные"],["s-conj","Союзы"],["s-part","Частицы"],["s-dim","Уменьшительные"],["s-preps","Предлоги"],["s-bridge","Мосты"]];

const VTABS = [["conj","Спряжения"],["czasy","Времена"],["tryby","Наклонения"],["formy","Причастия и пассив"],["rekcja","Управление"],["lista","Словарь глаголов"]];

/* ============ МНОЖЕСТВЕННОЕ ЧИСЛО ============ */
/* показывается внутри падежа, когда включено «множественное» */
const MOS = [
 ["t → ci","student → studenci"],["d → dzi","sąsiad → sąsiedzi"],["ch → si","Czech → Czesi"],
 ["st → ści","artysta → artyści"],["k → cy","Polak → Polacy"],
 ["g → dzy","kolega → koledzy"],["r → rzy","aktor → aktorzy"],["ec → cy","chłopiec → chłopcy"],
 ["ca → cy","kierowca → kierowcy"],["anin → anie","Amerykanin → Amerykanie"],["-owie","pan → panowie, syn → synowie"]
];
const IRR = [
 ["człowiek","ludzie","ludzi"],["rok","lata","lat"],["brat","bracia","braci"],["ksiądz","księża","księży"],
 ["dziecko","dzieci","dzieci"],["oko","oczy","oczu"],["ucho","uszy","uszu"],["ręka","ręce","rąk"],
 ["przyjaciel","przyjaciele","przyjaciół"],["tydzień","tygodnie","tygodni"],["pieniądz","pieniądze","pieniędzy"]
];
/* дополнения к падежу, когда выбрано множественное число */
const PLX = {
 mian:`
   <div class="tip"><b>Тест на род.</b> Подставь указательное: <span class="pl">ci</span> - мужско-личный, <span class="pl">te</span> - всё остальное. <span class="pl">Ci studenci</span>, но <span class="pl">te psy</span>, <span class="pl">te dzieci</span>, <span class="pl">te kobiety</span>. Достаточно одного мужчины в компании, чтобы вся группа стала мужско-личной.</div>
   <h3>Мужско-личный: чередования</h3>
   <p class="lead">Самое сложное место всей системы. Окончание -i / -y / -e / -owie плюс почти обязательное чередование.</p>
   <div class="scroll"><table><tr><th>чередование</th><th>пример</th></tr>
     ${MOS.filter(m => m[1] !== "-").map(m => `<tr><td class="c">${m[0]}</td><td class="w">${m[1]}</td></tr>`).join("")}</table></div>
   <p class="lead" style="margin-top:10px"><span class="pl">-owie</span> берут родство, титулы и часть национальностей: <span class="pl">panowie, synowie, ojcowie, mężowie, królowie, profesorowie</span>.</p>
   <h3>Всё остальное</h3>
   <div class="scroll"><table>
     <tr><th>основа на</th><th>окончание</th><th>примеры</th></tr>
     <tr><td>твёрдую</td><td class="c">-y</td><td class="w">koty, psy, kawy, płyty</td></tr>
     <tr><td>k, g</td><td class="c">-i</td><td class="w">ogórki, ptaki, książki, nogi</td></tr>
     <tr><td>мягкую, c, l, j, ш-звуки</td><td class="c">-e</td><td class="w">pokoje, ulice, restauracje, owoce</td></tr>
     <tr><td>средний род</td><td class="c">-a</td><td class="w">okna, piwa, mieszkania, kina</td></tr>
   </table></div>
   <h3>Нерегулярные</h3>
   <div class="scroll"><table><tr><th>ед. ч.</th><th>мн. ч.</th><th>родительный мн.</th></tr>
     ${IRR.map(r => `<tr><td class="w">${r[0]}</td><td class="g">${r[1]}</td><td class="g">${r[2]}</td></tr>`).join("")}</table></div>
   <h3>Особые случаи множественного</h3>
   <ol class="pit">
     <li><b>Пары и парные части тела ведут себя отдельно.</b> <span class="pl">oko → oczy</span> (глаза), но <span class="pl">oka</span> - ячейки сети или круги на воде. <span class="pl">Ucho → uszy</span> (уши), но <span class="pl">ucha</span> - ручки у кастрюли.</li>
     <li><b>Есть слова только во множественном:</b> <span class="pl">drzwi, spodnie, okulary, nożyczki, urodziny, pieniądze, wakacje</span>. Глагол при них - множественный: <span class="pl">drzwi są otwarte</span>.</li>
     <li><b>Прошедшее время тоже делится на ONI / ONE:</b> <span class="pl">byli</span> (мужчины) ↔ <span class="pl">były</span> (всё остальное). Ошибка здесь слышна сразу.</li>
     <li><b>Следи за rz, sz, cz.</b> Они считаются «ш-звуками» и берут -e, хотя произносятся твёрдо: <span class="pl">talerz → talerze</span> (не talerzy), <span class="pl">klucz → klucze</span>. Рука тянется поставить -y «по-твёрдому» - это ловушка.</li>
   </ol>`,
 dop:`
   <h3>Родительный множественного: разбор</h3>
   <div class="scroll"><table>
     <tr><th>род</th><th>окончание</th><th>примеры</th></tr>
     <tr><td>мужской, твёрдая</td><td class="c">-ów</td><td class="w">biletów, domów, sklepów</td></tr>
     <tr><td>мужской, ż rz sz cz c dz</td><td class="c">-y</td><td class="w">lekarzy, talerzy, pieniędzy</td></tr>
     <tr><td>мужской, мягкая</td><td class="c">-i</td><td class="w">nauczycieli, koni, gości, dni</td></tr>
     <tr><td>женский и средний</td><td class="c">-∅</td><td class="w">kobiet, książek, okien, piw</td></tr>
     <tr><td>женский на -ja, -ia, -ść</td><td class="c">-i / -ji</td><td class="w">restauracji, lekcji, miłości</td></tr>
     <tr><td>средний на -um</td><td class="c">-ów</td><td class="w">muzeów, centrów</td></tr>
   </table></div>
   <div class="tip"><b>Беглая гласная.</b> Там, где окончания нет, в основу часто влезает <span class="pl">e</span>: <span class="pl">książka → książek</span>, <span class="pl">okno → okien</span>, <span class="pl">matka → matek</span>, <span class="pl">ciastko → ciastek</span>. Без неё слово заканчивалось бы двумя согласными подряд.</div>`,
 bier:`<div class="tip"><b>Во множественном отдельной формы нет.</b> Мужско-личные берут Dopełniacz: <span class="pl">widzę studentów, znam tych panów</span>. Все остальные - Mianownik: <span class="pl">widzę koty, książki, okna</span>. Тот же принцип, что в единственном числе, только граница проходит не по одушевлённости, а по мужско-личности.</div>`,
 cel:`<div class="tip"><b>-om для всех родов без исключений:</b> <span class="pl">studentom, kobietom, dzieciom, kotom</span>. Один из четырёх падежей, где множественное вообще не требует думать.</div>`,
 narz:`<div class="tip"><b>-ami для всех родов:</b> <span class="pl">studentami, kobietami, oknami</span>. Короткое <span class="pl">-mi</span> берёт закрытая горстка слов: <span class="pl">ludźmi, dziećmi, pieniędzmi, braćmi, gośćmi, końmi, przyjaciółmi</span>.</div>`,
 miej:`<div class="tip"><b>-ach для всех родов без исключений:</b> <span class="pl">o studentach, w książkach, w oknach, o dzieciach</span>. Самое простое место во всей падежной системе.</div>`,
 "woł":`<div class="tip"><b>Во множественном Wołacz = Mianownik.</b> Отдельной формы нет: <span class="pl">Panowie! · Drodzy państwo! · Kochani!</span></div>`
};

/* ============ ПРИЛАГАТЕЛЬНЫЕ ============ */
const ADJ = [
 ["Mianownik","dobry","dobra","dobre","dobrzy","dobre"],
 ["Dopełniacz","dobrego","dobrej","dobrego","dobrych","dobrych"],
 ["Celownik","dobremu","dobrej","dobremu","dobrym","dobrym"],
 ["Biernik","dobry / dobrego","dobrą","dobre","dobrych","dobre"],
 ["Narzędnik","dobrym","dobrą","dobrym","dobrymi","dobrymi"],
 ["Miejscownik","dobrym","dobrej","dobrym","dobrych","dobrych"]
];

/* ============ НАРЕЧИЯ ============ */
const ADV_O = ["szybki→szybko","wolny→wolno","ciepły→ciepło","zimny→zimno","łatwy→łatwo","trudny→trudno","głośny→głośno","cichy→cicho","prosty→prosto","tani→tanio","brzydki→brzydko"];
const ADV_E = ["ładny→ładnie","dokładny→dokładnie","szczęśliwy→szczęśliwie","ciekawy→ciekawie","miły→mile","piękny→pięknie","straszny→strasznie","wygodny→wygodnie","spokojny→spokojnie","grzeczny→grzecznie"];
const ADV_IRR = [
 ["dobry / dobrze","lepiej","najlepiej"],
 ["zły / źle","gorzej","najgorzej"],
 ["duży (много) / dużo","więcej","najwięcej"],
 ["mały (мало) / mało","mniej","najmniej"]
];
const ADV_REG = [
 ["szybko","szybciej","najszybciej","k → c, как в прилагательном"],
 ["ładnie","ładniej","najładniej",""],
 ["ciepło","cieplej","najcieplej","o → e"],
 ["tanio","taniej","najtaniej",""],
 ["często","częściej","najczęściej","st → ści"],
 ["drogo","drożej","najdrożej","g → ż"]
];
const ADV_LIST = [
 ["место","gdzie?","tu, tutaj, tam, wszędzie, gdzieś, nigdzie, blisko, daleko, wysoko, nisko"],
 ["время","kiedy?","teraz, wtedy, zawsze, nigdy, czasem, często, rzadko, wcześnie, późno, jutro, wczoraj, potem"],
 ["образ действия","jak?","dobrze, źle, szybko, wolno, głośno, cicho, ładnie, mocno, słabo, razem"],
 ["степень, количество","jak bardzo? ile razy?","bardzo, trochę, dużo, mało, zupełnie, całkiem, prawie, wyjątkowo"]
];

/* ============ МЕСТОИМЕНИЯ ============ */
const PRON = [
 ["ja","mnie","mi / mnie","mnie","mną","mnie"],
 ["ty","ciebie / cię","ci / tobie","ciebie / cię","tobą","tobie"],
 ["on","jego / go / niego","mu / jemu / niemu","jego / go / niego","nim","nim"],
 ["ono","jego / go / niego","mu / jemu / niemu","je / nie","nim","nim"],
 ["ona","jej / niej","jej / niej","ją / nią","nią","niej"],
 ["my","nas","nam","nas","nami","nas"],
 ["wy","was","wam","was","wami","was"],
 ["oni","ich / nich","im / nim","ich / nich","nimi","nich"],
 ["one","ich / nich","im / nim","je / nie","nimi","nich"]
];

/* --- мосты --- */
const PHON = [
 ["-оро-, -оло-, -ере-","-ro-, -ło-, -rze-","корова → krowa, золото → złoto, берег → brzeg, голова → głowa"],
 ["у, я (из носовых)","ą, ę","рука → ręka, зуб → ząb, пять → pięć, мука → mąka"],
 ["ё, е","io / ió, ie","мёд → miód, лёд → lód, несёт → niesie"],
 ["-ть","-ć","быть → być, читать → czytać"],
 ["х","ch","хлеб → chleb, ухо → ucho"],
 ["ц, ч","c, cz","цена → cena, час → czas"]
];
const FALSE = [["zapomnieć","забыть","запомнить"],["sklep","магазин","склеп"],["dywan","ковёр","диван"],["ogród","сад","огород"],["uroda","красота","урод"],["owoce","фрукты","овощи"],["zakaz","запрет","заказ"],["dworzec","вокзал","дворец"],["stół","стол","стул"],["krzesło","стул","кресло"],["grzeczny","вежливый","грешный"],["czaszka","череп","чашка"],["gruby","толстый","грубый"],["wygodny","удобный","выгодный"],["pukać","стучать","-"],
 ["ordynarny","хамский, грубый","ординарный, обычный"],["pensja","зарплата","пенсия"],["rano","утро, утром","рано (это wcześnie)"],["awans","повышение по службе","аванс (это zaliczka)"],["nagły","внезапный","наглый"],["żaba","лягушка","жаба (это ropucha)"],["bierny","пассивный","берущий, активный - хотя корень тот же, что у brać"],["doba","сутки, 24 часа","-"]];
