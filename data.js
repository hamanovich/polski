const ABASE = [
 ["a","как русское а"],["b","как русское б"],["c","ц, не к: cena - «цена»"],["d","как русское д"],
 ["e","как русское э"],["f","как русское ф"],["g","г, никогда не [дж]: gol, noga; перед i смягчается: drogi"],
 ["h","как русское х, см. пару ch/h ниже"],["i","как русское и; смягчает предыдущую согласную"],
 ["j","й: jajko - «яйко»"],["k","как русское к"],["l","переднеязычное (альвеолярное) л: кончик языка у бугорков над верхними зубами; не русское мягкое «ль» и не ł"],
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
 ["перед ł, l","теряется, чистое o / e","minął [миноў], zaczęli [zaczeli]"],
 ["на конце слова","ą - носовое; ę - часто теряет носовость","idą [идон]; proszę ≈ [proше]"]
];

const DZW_PARY = [
 ["b","p","chleb → [chlep]"],
 ["d","t","sad → [sat]"],
 ["g","k","Bóg → [buk]"],
 ["w","f","staw → [staf]"],
 ["z","s","teraz → [teras]"],
 ["ź","ś","weź → [weś]"],
 ["ż · rz","sz","nóż → [nusz]"],
 ["dz","c","pieniądz → [pieniąc]"],
 ["dź","ć","łódź → [łuć]"],
 ["dż","cz","brydż → [brycz]"]
];
const DZW_RULES = [
 ["конец слова","звонкий оглушается","chleb [chlep] · Bóg [buk] · nóż [nusz] · staw [staf] · mąż [mąsz] · teraz [teras]"],
 ["перед глухим","вся группа становится глухой","ławka [łafka] · babka [bapka] · łódka [łutka] · wszystko [fszystko] · wtorek [ftorek]"],
 ["перед звонким","вся группа становится звонкой","także [tagże] · prośba [proźba] · liczba [lidżba] · jakże [jagże]"],
 ["предлог + слово","считаются одним словом","w parku [f parku] · z tobą [s tobą] · nad stołem [nat stołem] · pod domem [pod domem]"]
];
const WIELKA_D = [
 ["народы и жители - стран, регионов, городов, деревень","Polak · Rosjanin · Białorusin · Europejczyk · Ślązak · Warszawianin · Krakowianin · Zakopianin"],
 ["объекты городского пространства","Plac Zbawiciela · Aleja Róż · Park Kościuszki · Most Poniatowskiego · Brama Floriańska · Cmentarz Rakowicki"],
 ["имена, фамилии, клички","Adam Kowalski · Anna · Burek"],
 ["географические названия","Warszawa · Wisła · Tatry · Stare Miasto · Morze Bałtyckie"],
 ["учреждения и праздники","Uniwersytet Warszawski · Sejm · Boże Narodzenie · Wielkanoc · Nowy Rok"],
 ["Pan · Pani · Państwo · Ty в переписке","Szanowny Panie · Dziękuję Pani za wiadomość · Czy mogę Cię prosić"]
];
const WIELKA_M = [
 ["прилагательные от народов и мест","polski · warszawski · język polski · kuchnia włoska"],
 ["языки и «по-…»","po polsku · po rosyjsku · po angielsku"],
 ["дни недели","poniedziałek · we wtorek · w środę"],
 ["месяцы","styczeń · w maju · piątego maja"],
 ["должности и звания","prezydent · minister · doktor · profesor · dyrektor"],
 ["ulica - единственное исключение среди городских объектов","ulica Długa · ulica Józefa Piłsudskiego"],
 ["административные единицы","województwo mazowieckie · powiat wołomiński · gmina Michałowice"]
];

const STRESS_EXC = [
 ["форма на -śmy / -ście в прошедшем","3-й слог от конца","byliśmy, spacerowaliście"],
 ["условное наклонение на -by-","3-й слог от конца","zrobiłbym, pojechałaby"],
 ["условное мы/вы: -libyśmy / -łybyście","4-й слог от конца","zrobilibyśmy, poszłybyście"],
 ["заимствования на -yka / -ika","3-й слог от конца","fizyka, matematyka, gramatyka"],
 ["некоторые числительные","3-й слог от конца","czterysta, siedemset"],
 ["некоторые заимствования","вариативное ударение","у <span class='pl'>prezydent</span> нормативны 2-й и 3-й слоги от конца; учи произношение словарно"],
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

const CASES = [
{
  id:"mian", name:"Mianownik", ru:"Именительный", q:"kto? co?",
  use:["Подлежащее: <span class='pl'>Sklep jest zamknięty.</span>","После <span class='pl'>to jest / to są</span> - само <span class='pl'>to</span> не меняется никогда.","Словарная форма: так слово стоит в словаре и на ценнике."],
  preps:"- (единственный падеж без предлогов)",
  sg:[
    {l:"мужской", f:[{a:"",b:"sklep|"},{a:"",b:"kot|"},{a:"",b:"pan|"},{a:"",b:"nauczyciel|"},{a:"",b:"dzień|"}], n:"нулевое окончание"},
    {l:"женский", f:[{a:"",b:"kaw|a"},{a:"",b:"książk|a"},{a:"",b:"restauracj|a"},{a:"",b:"noc|"},{a:"",b:"pan|i"}], n:"-a; реже согласная или -i"},
    {l:"средний", f:[{a:"",b:"piw|o"},{a:"",b:"mieszkani|e"},{a:"",b:"imi|ę"},{a:"",b:"muzeum|"}], n:"-o / -e / -ę / -um"},
    {l:"муж. на -a", f:[{a:"",b:"koleg|a"},{a:"",b:"mężczyzn|a"},{a:"",b:"kierowc|a"}], n:"в ед. ч. склоняются по-женски, во мн. ч. - по мужско-личному; согласование всегда мужское: ten kolega, ci koledzy"}
  ],
  pl:[
    {l:"мужско-личный", f:[{a:"student",b:"studen|c|i"},{a:"sąsiad",b:"sąsie|dzi|"},{a:"Polak",b:"Pola|c|y"},{a:"lekarz",b:"lekarz|e"},{a:"pan",b:"pan|owie"}], n:"только про мужчин: -i / -y / -e / -owie, почти всегда с чередованием"},
    {l:"не-мужско-личный", f:[{a:"bilet",b:"bilet|y"},{a:"kot",b:"kot|y"},{a:"ogórek",b:"ogórk|i"},{a:"kawa",b:"kaw|y"},{a:"książka",b:"książk|i"},{a:"ulica",b:"ulic|e"}], n:"-y после твёрдых · -i после k, g · -e после мягких и c, l, j"},
    {l:"средний", f:[{a:"piwo",b:"piw|a"},{a:"okno",b:"okn|a"},{a:"mieszkanie",b:"mieszkani|a"}], n:"-a"}
  ],
  agree:[["ten dobry sklep","ten dobry sklep"],["ta dobra kawa","ta dobra kawa"],["to dobre piwo","to dobre piwo"],["мн. мужчины","ci dobrzy studenci"],["мн. остальное","te dobre książki"]],
  exc:[["człowiek","ludzie","во мн. ч. другое слово"],["rok","lata","то же"],["brat","bracia",""],["ksiądz","księża",""],["dziecko","dzieci",""],["oko / ucho","oczy / uszy","в анатомии; в приборах - oka, ucha"],["ręka","ręce",""],["przyjaciel","przyjaciele",""]],
  pit:["<b>Как построить именительный.</b> В единственном числе бери словарную форму и согласуй с <span class='pl'>ten / ta / to</span>. Во множественном сначала определи группу: мужчины и смешанные группы людей требуют мужско-личного согласования (<span class='pl'>ci studenci, państwo Kowalscy</span>); женщины, а также существительные <span class='pl'>dzieci</span>, названия животных и предметов - немужско-личного (<span class='pl'>te kobiety, dzieci, psy, książki</span>). Конкретное окончание мужско-личной формы не всегда выводится автоматически: частые слова лучше учить парой <span class='pl'>student - studenci</span>.",
  "<b>Мужско-личный род (męskoosobowy).</b> В русском во множественном рода нет вообще, поэтому опоры нет никакой. Тест простой: подставь <span class='pl'>ci</span> или <span class='pl'>te</span>. <span class='pl'>Ci studenci</span>, но <span class='pl'>te psy</span> - животные идут в «остальное», даже если это самцы.",
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
  pit:["<b>Как выбрать форму.</b> В единственном числе проверь род: мужское неодушевлённое и среднее совпадают с именительным (<span class='pl'>widzę dom, auto</span>), мужское одушевлённое - с родительным (<span class='pl'>widzę psa</span>), женское на <span class='pl'>-a</span> получает <span class='pl'>-ę</span> (<span class='pl'>widzę kawę</span>). Во множественном только группа мужчин совпадает с родительным (<span class='pl'>widzę studentów</span>); всё остальное, включая животных, - с именительным (<span class='pl'>widzę psy, książki</span>).",
  "<b>Числительные рядом.</b> <span class='pl'>dwa soki</span>, не <span class='pl'>dwa soka</span>. Ловушка срабатывает именно на словах, похожих на русские.",
  "<b>Отрицание сносит винительный в родительный.</b> <span class='pl'>Mam bilet → nie mam biletu.</span> Автоматически и почти без исключений - самая частая точка отказа у русскоязычных на B1. Винительный удерживается только там, где <span class='pl'>nie</span> отрицает не глагол, а отдельное слово: <span class='pl'>Widziałem nie Annę, a Marię</span>.",
  "<b>Одушевлённость работает только в мужском единственном.</b> Во множественном граница проходит иначе: <span class='pl'>widzę psy</span> (животные - как неодушевлённые), но <span class='pl'>widzę panów</span>.",
  "<b>na / w + винительный = движение</b>, + предложный = положение. <span class='pl'>Idę na pocztę</span> ↔ <span class='pl'>jestem na poczcie</span>. Одна пара предлогов, два падежа, разный смысл.",
  "<b>Глаголы, которые в русском требуют другого падежа:</b> <span class='pl'>czekam na autobus</span> (жду автобус), <span class='pl'>proszę o rachunek</span> (прошу счёт), <span class='pl'>pytam o cenę</span> (спрашиваю о цене).",
  "<b>Часть неодушевлённых ведёт себя как одушевлённые.</b> Разговорная норма ставит <span class='pl'>-a</span> у названий еды, игр, техники, валют и марок: <span class='pl'>zjem pomidora, mam laptopa, gram w tenisa, wysłałem maila, daj loda, kup papierosa</span>. Форма без <span class='pl'>-a</span> (<span class='pl'>mam laptop</span>) тоже встречается и в письменной речи считается более осторожной, но в живой речи вы услышите именно <span class='pl'>-a</span>. Закрытого списка нет: такие слова набираются вместе с лексикой."],
  sent:[["Poproszę kawę i dwie bułki.","Мне, пожалуйста, кофе и две булки."],["Czekam na autobus już dziesięć minut.","Жду автобус уже десять минут."],["Idę na pocztę, a potem do apteki.","Иду на почту, а потом в аптеку."],["Mam czas w środę wieczorem.","У меня есть время в среду вечером."],["Widzę tego pana codziennie.","Вижу этого пана каждый день."]],
  trap:"Само окончание <span class='pl'>-ę</span> у тебя стоит с первого блока. Ошибки идут не отсюда, а из соседних клеток: числительные, отрицание, глагольное управление."
},
{
  id:"dop", name:"Dopełniacz", ru:"Родительный", q:"kogo? czego?",
  use:["При отрицании прямого объекта винительный обычно заменяется родительным: <span class='pl'>mam czas → nie mam czasu</span>. Для базового польского применяй это правило автоматически.","Отсутствие: <span class='pl'>nie ma mleka</span>.","После числительных на 5-9 и 0, а также после 11-14: <span class='pl'>pięć biletów, dwanaście biletów</span>. Также после слов <span class='pl'>dużo, mało, kilka, trochę, ile</span>: <span class='pl'>dużo czasu, kilka osób</span>.","Принадлежность: <span class='pl'>dom mojego brata</span>.","Дата: <span class='pl'>trzeciego maja</span>.","Глаголы: <span class='pl'>szukać, słuchać, uczyć się, potrzebować, bać się, używać, życzyć</span>.","Часть вместо целого: <span class='pl'>kup chleba, nalej wody, daj herbaty, pożycz mi pieniędzy</span> - против <span class='pl'>kup chleb</span> (конкретную буханку). Русская модель «купи хлеба / купи хлеб» переносится один в один."],
  preps:"do, od, z (откуда), bez, dla, u, obok, koło, naprzeciwko, oprócz, według, podczas, wśród, zamiast",
  sg:[
    {l:"муж. одушевл.", f:[{a:"pan",b:"pan|a"},{a:"brat",b:"brat|a"},{a:"pies",b:"ps|a"}], n:"-a, без вариантов"},
    {l:"муж. неодуш. → -a: частые группы", f:[{a:"chleb",b:"chleb|a"},{a:"ser",b:"ser|a"},{a:"Kraków",b:"Krak|ow|a"},{a:"styczeń",b:"styczni|a"}], n:"части тела, инструменты и посуда, месяцы, польские города - но это тенденции, не полный алгоритм"},
    {l:"муж. неодуш. → -u: частые группы", f:[{a:"czas",b:"czas|u"},{a:"cukier",b:"cukr|u"},{a:"tłum",b:"tłum|u"},{a:"autobus",b:"autobus|u"},{a:"Londyn",b:"Londyn|u"}], n:"абстрактное, вещества, собирательное, многие заимствования и иностранные города"},
    {l:"частые формы, которые учим целиком", f:[{a:"sklep",b:"sklep|u"},{a:"dom",b:"dom|u"},{a:"bank",b:"bank|u"},{a:"sok",b:"sok|u"},{a:"telefon",b:"telefon|u"}], n:"у неодушевлённых нет надёжного правила: запоминай do sklepu, do domu, bez telefonu"},
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
  pit:["<b>Как выбрать форму.</b> Сначала род: женский обычно получает <span class='pl'>-y/-i</span>, средний - <span class='pl'>-a</span>, мужское одушевлённое - всегда <span class='pl'>-a</span>. Настоящая развилка остаётся только у мужских неодушевлённых: там возможны <span class='pl'>-a</span> и <span class='pl'>-u</span>, а абсолютно надёжного правила нет. Используй смысловые тенденции, но проверяй форму по словарю и учи в готовой паре: <span class='pl'>do sklepu, bez chleba</span>.",
  "<b>-a или -u у неодушевлённых.</b> <span class='pl'>-a</span> часто встречается у названий частей тела, инструментов, посуды, месяцев и польских городов: <span class='pl'>nosa, noża, talerza, marca, Krakowa</span>. <span class='pl'>-u</span> часто получают абстрактные, вещественные, собирательные слова, многие заимствования и иностранные города: <span class='pl'>czasu, cukru, tłumu, autobusu, Londynu</span>. Это ориентиры, а не жёсткое правило.",
  "<b>Отрицание - всегда, даже там, где русский держит винительный.</b> «Не вижу Анну» → <span class='pl'>nie widzę Anny</span>. «Не люблю кофе» → <span class='pl'>nie lubię kawy</span>.",
  "<b>Беглая гласная во множественном.</b> <span class='pl'>książka → książek</span>, <span class='pl'>okno → okien</span>, <span class='pl'>matka → matek</span>. Окончания нет, зато в основу влезает <span class='pl'>e</span>.",
  "<b>После количественных слов.</b> <span class='pl'>pięć biletów, dużo ludzi, mało czasu, kilka minut</span> - здесь русская модель работает, интуиция не мешает. Какие именно числительные требуют родительного, а какие нет (<span class='pl'>dwadzieścia dwa domy</span>, но <span class='pl'>dwadzieścia pięć domów</span>), - во вкладке «Числительные».",
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
    {l:"мужской: частые формы на -u", f:[{a:"pan",b:"pan|u"},{a:"brat",b:"brat|u"},{a:"ojciec",b:"ojc|u"},{a:"chłopiec",b:"chłopc|u"},{a:"pies",b:"ps|u"},{a:"kot",b:"kot|u"},{a:"świat",b:"świat|u"},{a:"Bóg",b:"Bog|u"}], n:"частая группа; учи готовые формы, это не исчерпывающий список"},
    {l:"женский: твёрдая основа → -e", f:[{a:"kobieta",b:"kobie|ci|e"},{a:"siostra",b:"sios|trz|e"},{a:"mama",b:"ma|mi|e"},{a:"koleżanka",b:"koleżan|c|e"}], n:"с чередованием согласной; форма совпадает с предложным"},
    {l:"женский: мягкая основа → -i / -y", f:[{a:"pani",b:"pan|i"},{a:"ulica",b:"ulic|y"},{a:"praca",b:"prac|y"},{a:"ziemia",b:"ziem|i"}], n:"после мягких и исторически мягких; форма совпадает с предложным"},
    {l:"средний", f:[{a:"dziecko",b:"dzieck|u"},{a:"okno",b:"okn|u"}], n:"-u"}
  ],
  pl:[{l:"все роды", f:[{a:"studenci",b:"student|om"},{a:"kobiety",b:"kobiet|om"},{a:"dzieci",b:"dzieci|om"}], n:"-om, без вариантов"}],
  agree:[["ten dobry student","temu dobremu studentowi"],["ta dobra kobieta","tej dobrej kobiecie"],["to dobre dziecko","temu dobremu dziecku"],["мн. любое","tym dobrym ludziom"]],
  exc:[["ja","mi / mnie","короткая mi - обычная, mnie - под ударением"],["ty","ci / tobie",""],["on","mu / jemu / niemu","niemu - только после предлога"]],
  pit:["<b>Как выбрать окончание.</b> Мужское обычно получает <span class='pl'>-owi</span>; небольшой список частых слов - <span class='pl'>-u</span> (<span class='pl'>panu, bratu, ojcu, psu</span>). Средний род получает <span class='pl'>-u</span>. У женского твёрдая основа обычно даёт <span class='pl'>-e</span> с чередованием (<span class='pl'>kobiecie, koleżance</span>), мягкая - <span class='pl'>-i/-y</span> (<span class='pl'>pani, ulicy</span>). Во множественном всегда <span class='pl'>-om</span>.",
  "<b><span class='pl'>Dziękuję ci</span> - дательный.</b> Русское «благодарю тебя» - винительный. Системный сдвиг, ловится только заучиванием: <span class='pl'>dziękuję panu, dziękuję pani</span>.",
  "<b><span class='pl'>Podoba mi się ta kawa</span>.</b> То, что нравится, здесь подлежащее в именительном. <span class='pl'>Lubić</span> - устойчивая симпатия или «любить что-то»: <span class='pl'>Lubię kawę</span>. <span class='pl'>Podobać się</span> - производить хорошее впечатление, казаться удачным: <span class='pl'>Podoba mi się ta sukienka, ten pomysł, Warszawa</span>.",
  "<b>Короткие формы <span class='pl'>mi, ci, mu</span> не ставятся в начало фразы и не идут после предлога.</b> В начале - <span class='pl'>Mnie się to nie podoba</span>. После предлога - <span class='pl'>dzięki tobie</span>, не <span class='pl'>dzięki ci</span>.",
  "<b>Безличные с <span class='pl'>mi</span> - целый пласт бытовой речи.</b> <span class='pl'>Jest mi zimno / gorąco / smutno / miło / głupio</span>. Русский строит это через «мне» тоже, так что конструкция знакомая - но список выражений надо набрать."],
  sent:[["Dziękuję panu bardzo.","Большое вам спасибо."],["Jest mi zimno, zamknę okno.","Мне холодно, закрою окно."],["Podoba mi się ta restauracja.","Мне нравится этот ресторан."],["Brakuje mi czasu na wszystko.","Мне не хватает времени на всё."],["Pomagam sąsiadce z zakupami.","Помогаю соседке с покупками."]],
  trap:"Самый лёгкий падеж для тебя: функция и конструкции почти полностью совпадают с русским «мне». Главное - не забыть, что после <span class='pl'>dziękować</span> идёт он, а не винительный."
},
{
  id:"narz", name:"Narzędnik", ru:"Творительный", q:"kim? czym?",
  use:["Профессия и роль после <span class='pl'>być, zostać, zostawać</span>: <span class='pl'>jestem programistą</span>.","Орудие: <span class='pl'>piszę długopisem</span>.","Транспорт: <span class='pl'>jadę autobusem</span> - без предлога.","Совместность: <span class='pl'>kawa z mlekiem, idę z bratem</span>.","Глаголы: <span class='pl'>interesować się, zajmować się, opiekować się</span> + творительный."],
  preps:"z (с кем/чем), nad, pod, przed, za, między, poza - все в значении «где»",
  sg:[
    {l:"муж. и средний", f:[{a:"autobus",b:"autobus|em"},{a:"brat",b:"brat|em"},{a:"piwo",b:"piw|em"},{a:"pociąg",b:"pocią|gi|em"},{a:"mleko",b:"mle|ki|em"}], n:"-em; после k, g вставляется i: -kiem, -giem"},
    {l:"женский", f:[{a:"kawa",b:"kaw|ą"},{a:"woda",b:"wod|ą"},{a:"pani",b:"pani|ą"},{a:"noc",b:"noc|ą"}], n:"-ą, одна форма на всё"}
  ],
  pl:[
    {l:"все роды: регулярно", f:[{a:"bilety",b:"bilet|ami"},{a:"kawy",b:"kaw|ami"},{a:"studenci",b:"student|ami"}], n:"-ami"},
    {l:"исключения -mi", f:[{a:"ludzie",b:"ludź|mi"},{a:"dzieci",b:"dzieć|mi"},{a:"pieniądze",b:"pieniędz|mi"},{a:"goście",b:"gość|mi"},{a:"bracia",b:"brać|mi"},{a:"konie",b:"koń|mi"},{a:"przyjaciele",b:"przyjaciół|mi"}], n:"короткий список, стоит выучить целиком"}
  ],
  agree:[["ten dobry lekarz","tym dobrym lekarzem"],["ta dobra kawa","tą dobrą kawą"],["to dobre piwo","tym dobrym piwem"],["мн. любое","tymi dobrymi ludźmi"]],
  exc:[["ja / ty","mną / tobą",""],["on / ona","nim / nią","после предлога: z nim, z nią"],["my / wy","nami / wami",""]],
  pit:["<b>Как выбрать окончание.</b> В единственном мужской и средний род получают <span class='pl'>-em</span>, после <span class='pl'>k/g</span> пишется <span class='pl'>-kiem/-giem</span>; женский род получает <span class='pl'>-ą</span>. Во множественном основной вариант - <span class='pl'>-ami</span>, а формы на <span class='pl'>-mi</span> составляют небольшой список: <span class='pl'>dziećmi, ludźmi, gośćmi</span>.",
  "<b><span class='pl'>Jestem programistą</span> - главная калька всей программы.</b> В русском «я программист» именительный, и рука ставит именительный автоматически. После <span class='pl'>być</span> существительное уходит в творительный.",
  "<b>Но прилагательное после <span class='pl'>być</span> остаётся в именительном.</b> <span class='pl'>Jestem zmęczony</span> ✅, <span class='pl'>jestem lekarzem</span> ✅, вместе - <span class='pl'>jestem dobrym lekarzem</span>. Проверка: есть существительное - творительный, нет - именительный.",
  "<b>Предлог <span class='pl'>z</span> управляет двумя падежами, и смысл разный.</b> <span class='pl'>z Warszawy</span> (родительный) = из Варшавы; <span class='pl'>z bratem</span> (творительный) = с братом.",
  "<b>Транспорт идёт без предлога.</b> <span class='pl'>Jadę autobusem, tramwajem, samochodem, pociągiem</span>. Русское «на автобусе» тянет вставить <span class='pl'>na</span> - это ошибка.",
  "<b><span class='pl'>przed / nad / pod / za / między</span> + творительный = где, + винительный = куда.</b> <span class='pl'>Stoję przed domem</span> ↔ <span class='pl'>idę przed dom</span>.",
  "<b>Связка <span class='pl'>to</span> отменяет творительный.</b> <span class='pl'>Anna jest lekarką</span>, но <span class='pl'>Anna to lekarka</span> - после <span class='pl'>to</span> обе части стоят в именительном: <span class='pl'>Warszawa to stolica Polski</span>. Вариант с <span class='pl'>to</span> звучит определительно, «это и есть»; вариант с <span class='pl'>być</span> нейтрален. Смешивать модели нельзя: <span class='pl'>Anna to lekarką</span> - ошибка."],
  sent:[["Jestem programistą, pracuję zdalnie.","Я программист, работаю удалённо."],["Jadę tramwajem do pracy.","Еду на трамвае на работу."],["Poproszę kawę z mlekiem.","Мне, пожалуйста, кофе с молоком."],["Spotykamy się przed sklepem o piątej.","Встречаемся перед магазином в пять."],["Moja siostra jest lekarką.","Моя сестра - врач."]],
  trap:"Здесь ошибка не в окончании, а в самом решении поставить падеж. Окончания <span class='pl'>-em / -ą</span> простые, чередований почти нет. Вся сложность - вспомнить, что после <span class='pl'>być</span> нужен именно этот падеж."
},
{
  id:"miej", name:"Miejscownik", ru:"Предложный", q:"o kim? o czym? gdzie?",
  use:["Место: <span class='pl'>w sklepie, na poczcie, przy oknie</span>.","Тема: <span class='pl'>rozmawiamy o pracy</span>.","Время по часам: <span class='pl'>o piątej, o wpół do ósmej</span>.","После чего-то: <span class='pl'>po pracy, po obiedzie</span>."],
  preps:"только w, na, o, po, przy - без предлога не встречается никогда",
  sg:[
    {l:"муж./ср.: твёрдая основа → -e", f:[{a:"sklep",b:"skle|pi|e"},{a:"stół",b:"sto|l|e"},{a:"obiad",b:"obie|dzi|e"},{a:"miasto",b:"mie|ści|e"},{a:"Kraków",b:"Krako|wi|e"},{a:"teatr",b:"tea|trz|e"}], n:"кроме основ на k, g, ch; перед -e согласная обязательно чередуется"},
    {l:"муж./ср.: k, g, ch → -u", f:[{a:"parking",b:"parking|u"},{a:"brzeg",b:"brzeg|u"},{a:"dach",b:"dach|u"},{a:"biurko",b:"biurk|u"},{a:"mleko",b:"mlek|u"}], n:"без чередования конечной согласной"},
    {l:"муж./ср.: мягкая основа → -u", f:[{a:"pokój",b:"pokoj|u"},{a:"hotel",b:"hotel|u"},{a:"lekarz",b:"lekarz|u"},{a:"miesiąc",b:"miesiąc|u"}], n:"также после исторически мягких: rz, sz, ż, cz, c, dz, l, j"},
    {l:"жен. → -e", f:[{a:"kawa",b:"ka|wi|e"},{a:"woda",b:"wo|dzi|e"},{a:"szkoła",b:"szko|l|e"},{a:"książka",b:"książ|c|e"},{a:"apteka",b:"apte|c|e"},{a:"droga",b:"dro|dz|e"}], n:"с чередованием - тем же, что в белорусском"},
    {l:"жен. → -y / -i", f:[{a:"ulica",b:"ulic|y"},{a:"praca",b:"prac|y"},{a:"noc",b:"noc|y"},{a:"kuchnia",b:"kuchn|i"},{a:"sól",b:"sol|i"}], n:"после мягких и шипящих"}
  ],
  pl:[{l:"почти все роды", f:[{a:"sklepy",b:"sklep|ach"},{a:"ulice",b:"ulic|ach"},{a:"miasta",b:"miast|ach"},{a:"dzieci",b:"dzieci|ach"}], n:"обычно -ach; важные традиционные исключения: w Niemczech, we Włoszech, na Węgrzech"}],
  agree:[["ten duży sklep","w tym dużym sklepie"],["ta nowa praca","w tej nowej pracy"],["to małe miasto","w tym małym mieście"],["мн. любое","w tych dużych sklepach"]],
  exc:[["dom","w domu","не domie"],["syn","o synu",""],["pan","o panu",""],["państwo","o państwu",""],["muzeum","w muzeum","в ед. ч. не склоняется"],["ręka","w ręce / w ręku","обе формы живые"],["stół / ogród","na stole / w ogrodzie","ó → o"]],
  alt:[["t","ci","brat → o bracie"],["d","dzi","woda → w wodzie"],["st","ści","miasto → w mieście"],["sł","śl","krzesło → na krześle"],["ł","l","szkoła → w szkole"],["r","rz","teatr → w teatrze"],["k","c","apteka → w aptece"],["g","dz","droga → na drodze"],["ch","sz","mucha → o musze"],["n","ni","okno → w oknie"],["b p w m f","bi pi wi mi fi","sklep → w sklepie"],["s z","si zi","nos → o nosie"]],
  pit:["<b>Как выбрать между -e и -u.</b> Для мужского и среднего рода сначала найди конец основы. <span class='pl'>k, g, ch</span> или мягкая / исторически мягкая согласная обычно дают <span class='pl'>-u</span>: <span class='pl'>na parkingu, o lekarzu</span>. Многие другие твёрдые согласные дают <span class='pl'>-e</span> с чередованием: <span class='pl'>w sklepie, o obiedzie</span>. Формы <span class='pl'>w domu, o panu, o synu</span> запоминаются отдельно. У женского рода своя развилка: твёрдая основа обычно даёт <span class='pl'>-e</span>, мягкая - <span class='pl'>-i/-y</span>.",
  "<b>Чередование бери из белорусского, не из русского.</b> <span class='pl'>у вадзе → w wodzie</span>, <span class='pl'>у хаце → w chacie</span>, <span class='pl'>у школе → w szkole</span>. Русский даст «в воде» и выведет на <span class='pl'>w wode</span>.",
  "<b>Одушевлённость на предложный не влияет.</b> <span class='pl'>o psie, o bracie, o stole</span> - одна модель. Это единственный падеж, где всё решают род и мягкость основы, а живое или неживое не спрашивают вовсе.",
  "<b>Чередование ó → o.</b> У многих слов <span class='pl'>ó</span> меняется на <span class='pl'>o</span> в косвенных формах: <span class='pl'>stół → na stole</span>, <span class='pl'>samochód → w samochodzie</span>, <span class='pl'>ogród → w ogrodzie</span>, <span class='pl'>pokój → w pokoju</span>. Конкретную основу лучше запоминать сразу вместе с формой.",
  "<b>Предлог не всегда совпадает с русским.</b> <span class='pl'>w pracy</span> (не «на»), <span class='pl'>na poczcie, na dworcu, na lotnisku, na stacji, na przystanku, na uniwersytecie, na ulicy, na wsi, na basenie</span>. Учить парой предлог+слово.",
  "<b>Без предлога падежа нет.</b> Если предлог не нужен - значит, и падеж другой. Это единственный такой падеж, используй как проверку."],
  sent:[["Mieszkam w Warszawie, na Mokotowie.","Живу в Варшаве, на Мокотове."],["Klucze są na stoliku przy drzwiach.","Ключи на столике у двери."],["Rozmawialiśmy o pracy i o pieniądzach.","Мы говорили о работе и о деньгах."],["Po obiedzie idę do sklepu.","После обеда иду в магазин."],["Spotkajmy się o piątej na dworcu.","Давай встретимся в пять на вокзале."]],
  trap:"Функционально совпадает с русским предложным один в один. Вся работа - в выборе окончания и в чередовании, и именно здесь белорусский даёт тебе фору, которой нет у русскоязычных."
},
{
  id:"woł", name:"Wołacz", ru:"Звательный", q:"o!",
  use:["Обращение к незнакомому с титулом или именем: <span class='pl'>panie doktorze! pani Anno!</span>","С титулом: <span class='pl'>panie doktorze, panie kierowniku</span>.","В письме: <span class='pl'>Szanowny Panie, Droga Aniu</span>."],
  preps:"-",
  sg:[
    {l:"мужской: твёрдая основа → -e", f:[{a:"pan",b:"pa|ni|e"},{a:"Piotr",b:"Piot|rz|e"},{a:"Adam",b:"Ada|mi|e"},{a:"doktor",b:"dokto|rz|e"}], n:"кроме основ на k, g, ch; перед -e согласная обычно чередуется: n→ni, r→rz, m→mi"},
    {l:"мужской: k, g, ch → -u", f:[{a:"Marek",b:"Mark|u"},{a:"człowiek",b:"człowiek|u"},{a:"wróg",b:"wrog|u"},{a:"duch",b:"duch|u"}], n:"смотрим на конец основы: Marek → Marka, значит основа Mark-"},
    {l:"мужской: мягкая основа → -u", f:[{a:"lekarz",b:"lekarz|u"},{a:"Tomasz",b:"Tomasz|u"},{a:"nauczyciel",b:"nauczyciel|u"},{a:"gość",b:"gości|u"}], n:"также после исторически мягких: rz, sz, ż, cz, c, dz, l, j"},
    {l:"женский", f:[{a:"mama",b:"mam|o"},{a:"Anna",b:"Ann|o"},{a:"siostra",b:"siostr|o"}], n:"-o"},
    {l:"уменьшительные", f:[{a:"Kasia",b:"Kasi|u"},{a:"Ania",b:"Ani|u"},{a:"babcia",b:"babci|u"}], n:"-u"},
    {l:"средний / pani", f:[{a:"dziecko",b:"dziecko|"},{a:"pani",b:"pani|"}], n:"= именительный"}
  ],
  pl:[{l:"все роды", f:[{a:"panowie",b:"panowie|"},{a:"dzieci",b:"dzieci|"},{a:"studenci",b:"studenci|"}], n:"= именительный, всегда"}],
  agree:[["drogi Marek","drogi Marku"],["droga Anna","droga Anno"],["szanowni panowie","szanowni panowie"]],
  exc:[["syn","synu","твёрдая основа, но традиционное -u"],["Bóg","Boże","не Bogu"],["ojciec","ojcze",""],["chłopiec","chłopcze",""],["ksiądz","księże",""]],
  pit:["<b>Как выбрать между -e и -u.</b> Смотри не просто на последнюю букву, а на конец основы: <span class='pl'>Marek → Marka</span>, поэтому основа <span class='pl'>Mark-</span>. Если она заканчивается на <span class='pl'>k, g, ch</span> или мягкую / исторически мягкую согласную - ставь <span class='pl'>-u</span>: <span class='pl'>Marku, lekarzu, nauczycielu</span>. После остальных твёрдых согласных обычно ставь <span class='pl'>-e</span> и учитывай чередование: <span class='pl'>panie, Piotrze, Adamie</span>. Формы <span class='pl'>synu, Boże, ojcze</span> запоминаются отдельно.",
  "<b>Ежедневная формула - и это не вокатив.</b> <span class='pl'>Przepraszam, proszę pani / proszę pana</span> - самое частое обращение к незнакомому, но <span class='pl'>pana, pani</span> здесь стоят не в звательном падеже: это застывший оборот. Настоящий вокатив начинается там, где есть титул или имя: <span class='pl'>Panie doktorze! Pani Anno! Proszę pana, gdzie…</span>",
  "<b>Титул тоже идёт в вокатив.</b> <span class='pl'>Panie doktorze</span>, <span class='pl'>panie kierowniku</span>, <span class='pl'>pani doktor</span> (женский титул часто не склоняется).",
  "<b>В разговорной речи Wołacz конкурирует с Mianownik.</b> С личными именами возможны <span class='pl'>Kasiu!</span> и разговорное <span class='pl'>Kasia!</span>. Но в родственных обращениях, титулах и более официальной речи звательный очень продуктивен: <span class='pl'>Mamo!, Panie doktorze!, Drogi Marku!</span>.",
  "<b>В письмах с большой буквы:</b> <span class='pl'>Szanowna Pani, Drogi Marku, Dzień dobry, Panie Adamie</span>. Обращение выделяется запятой."],
  sent:[["Przepraszam, proszę pani!","Извините, пожалуйста!"],["Panie doktorze, boli mnie gardło.","Доктор, у меня болит горло."],["Mamo, gdzie są klucze?","Мама, где ключи?"],["Kasiu, zadzwoń do mnie.","Кася, позвони мне."]],
  trap:"В личных именах разговорная речь допускает именительный, но в титулах, родственных обращениях и формальной речи звательный остаётся живой нормой."
}
];

const CASE_PRACTICE = [
{
  id:"mian", title:"Именительный на месте",
  lead:"Собери подлежащее и именную часть сказуемого. Следи за родом и мужско-личным множественным числом.",
  tasks:[
    {id:"mian-1", prompt:"To są ___ dzieci.", options:["mój","moja","moje"], answers:["moje"], explanation:"Dzieci - немужско-личное множественное число, поэтому moje."},
    {id:"mian-2", prompt:"___ dobrzy studenci czekają przed salą. (ten)", answers:["ci"], explanation:"Мужско-личная форма указательного ten во множественном числе - ci."},
    {id:"mian-3", prompt:"Państwo Kowalscy ___ już gotowi.", options:["był","była","byli","były"], answers:["byli"], explanation:"Państwo о смешанной группе согласуется как мужско-личное множественное число: byli."},
    {id:"mian-4", prompt:"To jest dobry ___ (nauczyciel).", answers:["nauczyciel"], explanation:"После to jest название человека остаётся в именительном: nauczyciel."},
    {id:"mian-5", prompt:"To są dobrzy ___ (lekarz).", answers:["lekarze"], explanation:"Мужско-личное множественное от lekarz имеет словарную форму lekarze."},
    {id:"mian-6", prompt:"___ nowe książki leżą na stole. (ten)", answers:["te"], explanation:"Книги образуют немужско-личное множественное число, поэтому используется te."},
    {id:"mian-7", prompt:"Moi ___ mieszkają w Gdańsku. (brat)", answers:["bracia"], explanation:"Brat → bracia - особая форма именительного множественного, которую нужно запомнить."},
    {id:"mian-8", prompt:"To są moi mili ___ (kolega).", answers:["koledzy"], explanation:"Мужское слово на -a склоняется как женское, но во множественном о мужчинах даёт мужско-личную форму: kolega → koledzy."},
    {id:"mian-9", prompt:"Moje ___ są jeszcze małe. (dziecko)", answers:["dzieci"], explanation:"Dziecko → dzieci - форма именительного множественного."},
    {id:"mian-10", prompt:"___ wysoka kobieta jest moją sąsiadką. (ten)", answers:["Ta"], explanation:"Женский род единственного числа: ta wysoka kobieta."},
    {id:"mian-11", prompt:"Na stole leży czerwone ___ (jabłko).", answers:["jabłko"], explanation:"Подлежащее среднего рода стоит в именительном: jabłko."},
    {id:"mian-12", prompt:"Moi rodzice bardzo mnie ___.", options:["kocha","kochają","kochasz"], answers:["kochają"], explanation:"Rodzice - множественное число, поэтому kochają."},
    {id:"mian-13", prompt:"To ___ moja nowa praca.", options:["jest","są","byli"], answers:["jest"], explanation:"Praca - единственное число: to jest praca."},
    {id:"mian-14", prompt:"___ książki są bardzo ciekawe. (ten)", answers:["Te"], explanation:"Немужско-личное множественное: te książki."},
    {id:"mian-15", prompt:"___ mężczyźni pracują w biurze. (młody)", answers:["Młodzi"], explanation:"Мужско-личный именительный множественного: młodzi mężczyźni."},
    {id:"mian-16", prompt:"Warszawa ___ stolicą Polski.", options:["jest","są","byli"], answers:["jest"], explanation:"Warszawa - существительное единственного числа."},
    {id:"mian-17", prompt:"To są dwa nowe ___. (okno)", answers:["okna"], explanation:"После dwa у среднего рода стоит именительный множественного: okna."},
    {id:"mian-18", prompt:"___ chłopiec czeka na autobus. (mały)", answers:["Mały"], explanation:"Подлежащее мужского рода: mały chłopiec."},
    {id:"mian-19", prompt:"Koty ___ pod kanapą.", options:["śpi","śpią","śpisz"], answers:["śpią"], explanation:"Koty - множественное число, поэтому śpią."},
    {id:"mian-text", prompt:"Представление на семейной встрече", passage:[
      "To jest mój ",{key:"a",answers:["brat"],hint:"brat",label:"форма слова brat"},". ",
      {key:"b",options:["Ta","Ten","To"],answers:["Ta"],label:"указательное местоимение"}," miła kobieta to jego żona. Ich dzieci ",
      {key:"c",options:["jest","są"],answers:["są"],label:"форма być"}," bardzo spokojne."
    ], explanation:"Brat и ta kobieta стоят в именительном; при dzieci нужна форма są."}
  ]
},
{
  id:"bier", title:"Вижу цель действия",
  lead:"Выбери форму прямого дополнения. Главная развилка - одушевлённость в единственном и мужско-личность во множественном.",
  tasks:[
    {id:"bier-1", prompt:"Widzę nowego ___ (student).", answers:["studenta"], explanation:"Мужское одушевлённое: винительный единственного совпадает с родительным - studenta."},
    {id:"bier-2", prompt:"Kupuję świeżą ___.", options:["kawa","kawę","kawy"], answers:["kawę"], explanation:"Женский винительный единственного обычно получает -ę: kawę."},
    {id:"bier-3", prompt:"Mam dwa ___.", options:["bilety","biletów","biletami"], answers:["bilety"], explanation:"Неодушевлённое мужское множественное: винительный совпадает с именительным - bilety."},
    {id:"bier-4", prompt:"Znam tych ___.", options:["lekarze","lekarzy","lekarzom"], answers:["lekarzy"], explanation:"Мужско-личный винительный множественного совпадает с родительным - lekarzy."},
    {id:"bier-5", prompt:"Widzę duży ___ (dom).", answers:["dom"], explanation:"Мужское неодушевлённое в винительном совпадает с именительным: widzę dom."},
    {id:"bier-6", prompt:"Widzę dwa małe ___ (pies).", answers:["psy"], explanation:"Во множественном животные относятся к немужско-личной группе, поэтому винительный совпадает с именительным: psy."},
    {id:"bier-7", prompt:"Znam nowych ___ (student).", answers:["studentów"], explanation:"Группа мужчин - мужско-личное множественное; винительный совпадает с родительным: studentów."},
    {id:"bier-8", prompt:"Nie kupuję świeżego ___ (chleb).", answers:["chleba"], explanation:"После отрицания прямое дополнение переходит из винительного в родительный: kupuję chleb → nie kupuję chleba."},
    {id:"bier-9", prompt:"Czytasz tę ciekawą ___? (książka)", answers:["książkę"], explanation:"Женский винительный единственного: książkę."},
    {id:"bier-10", prompt:"Kupujemy nowe ___ (auto).", answers:["auto"], explanation:"Средний род в винительном совпадает с именительным: auto."},
    {id:"bier-11", prompt:"Znam twoją ___ (siostra).", answers:["siostrę"], explanation:"Женский винительный: siostrę."},
    {id:"bier-12", prompt:"Widzę wysokie ___ (drzewo).", answers:["drzewo"], explanation:"Средний род единственного: widzę drzewo."},
    {id:"bier-13", prompt:"Oglądamy dobre ___ (film).", answers:["filmy"], explanation:"Неодушевлённое множественное в винительном совпадает с именительным: filmy."},
    {id:"bier-14", prompt:"Spotykam moją ___ (mama).", answers:["mamę"], explanation:"Mama в винительном: mamę."},
    {id:"bier-15", prompt:"Widzę tego małego ___ (chłopiec).", answers:["chłopca"], explanation:"Мужское одушевлённое: chłopca."},
    {id:"bier-16", prompt:"Znasz wszystkie ___? (pytanie)", answers:["pytania"], explanation:"Немужско-личное множественное: wszystkie pytania."},
    {id:"bier-17", prompt:"Zapraszam naszych ___ (sąsiad).", answers:["sąsiadów"], explanation:"Группа мужчин - винительный множественного совпадает с родительным: sąsiadów."},
    {id:"bier-18", prompt:"Piję zimną ___.", options:["woda","wodę","wody"], answers:["wodę"], explanation:"Женский винительный: wodę."},
    {id:"bier-19", prompt:"Nie widzę tego ___ (pies).", answers:["psa"], explanation:"После nie винительный заменяется родительным: psa."},
    {id:"bier-text", prompt:"Покупки на ужин", passage:[
      "W sklepie kupuję świeżą ",{key:"a",answers:["rybę"],hint:"ryba",label:"форма слова ryba"},", dwa ",
      {key:"b",options:["pomidory","pomidorów","pomidorami"],answers:["pomidory"],label:"форма слова pomidor"}," i dobry ",
      {key:"c",options:["chleb","chleba","chlebem"],answers:["chleb"],label:"форма слова chleb"},"."
    ], explanation:"Ryba даёт -ę; неодушевлённые pomidory и chleb в винительном совпадают с именительным."}
  ]
},
{
  id:"dop", title:"Нет, из, до и около",
  lead:"Потренируй отрицание, количество и самые частые предлоги родительного падежа.",
  tasks:[
    {id:"dop-1", prompt:"Nie mam dziś ___.", options:["czas","czasu","czasem"], answers:["czasu"], explanation:"После отрицания nie mam прямое дополнение переходит в родительный: czasu."},
    {id:"dop-2", prompt:"Wracam z ___ (praca).", answers:["pracy"], explanation:"Z в значении «из» требует родительного; praca → pracy."},
    {id:"dop-3", prompt:"Szukamy ___ do mieszkania.", options:["klucze","kluczy","kluczami"], answers:["kluczy"], explanation:"Szukać управляет родительным падежом: szukać kluczy."},
    {id:"dop-4", prompt:"W sali nie ma pięciu ___.", options:["studentów","studentom","studentami"], answers:["studentów"], explanation:"После pięciu и в конструкции nie ma нужен родительный множественного: studentów."},
    {id:"dop-5", prompt:"Nie ma dziś naszego ___ (nauczyciel).", answers:["nauczyciela"], explanation:"Мужское одушевлённое в родительном всегда получает -a: nauczyciela."},
    {id:"dop-6", prompt:"Potrzebuję kilograma ___ (cukier).", answers:["cukru"], explanation:"Названия веществ часто получают -u: cukier → cukru."},
    {id:"dop-7", prompt:"Wracamy z ___ (Kraków).", answers:["Krakowa"], explanation:"Названия польских городов обычно получают -a: Kraków → Krakowa."},
    {id:"dop-8", prompt:"Wracamy z ___ (Londyn).", answers:["Londynu"], explanation:"Названия иностранных городов обычно получают -u: Londyn → Londynu."},
    {id:"dop-9", prompt:"Idziemy do ___ (lekarz).", answers:["lekarza"], explanation:"Do требует родительного: do lekarza."},
    {id:"dop-10", prompt:"To jest samochód mojego ___ (ojciec).", answers:["ojca"], explanation:"Ojciec в родительном: ojca."},
    {id:"dop-11", prompt:"Nie piję ___ (mleko).", answers:["mleka"], explanation:"После отрицания: nie piję mleka."},
    {id:"dop-12", prompt:"Potrzebuję nowego ___ (telefon).", answers:["telefonu"], explanation:"Potrzebować требует родительного; telefon → telefonu."},
    {id:"dop-13", prompt:"Obok ___ stoi bank. (apteka)", answers:["apteki"], explanation:"Obok требует родительного: obok apteki."},
    {id:"dop-14", prompt:"Nie znam tych ___ (kobieta).", answers:["kobiet"], explanation:"Родительный множественного: kobiet."},
    {id:"dop-15", prompt:"Słucham polskiej ___.", options:["muzyka","muzyki","muzykę"], answers:["muzyki"], explanation:"Słuchać требует родительного: muzyki."},
    {id:"dop-16", prompt:"Bez ___ nie wychodzę z domu. (telefon)", answers:["telefonu"], explanation:"Bez + родительный: bez telefonu."},
    {id:"dop-17", prompt:"Ile masz ___? (brat)", answers:["braci"], explanation:"Ile требует родительного множественного: braci."},
    {id:"dop-18", prompt:"Kawa jest dla mojej ___. (mama)", answers:["mamy"], explanation:"Dla требует родительного: dla mamy."},
    {id:"dop-19", prompt:"Używam tego ___ (komputer).", answers:["komputera"], explanation:"Używać требует родительного: komputera."},
    {id:"dop-text", prompt:"Утро без привычных вещей", passage:[
      "Nie ma ",{key:"a",answers:["kawy"],hint:"kawa",label:"форма слова kawa"}," ani świeżego ",
      {key:"b",options:["chleb","chleba","chlebem"],answers:["chleba"],label:"форма слова chleb"},". Idę więc do ",
      {key:"c",options:["sklep","sklepu","sklepie"],answers:["sklepu"],label:"форма слова sklep"},"."
    ], explanation:"Nie ma требует родительного; do sklepu - направление к месту."}
  ]
},
{
  id:"cel", title:"Кому и чему",
  lead:"Адресат, помощь, благодарность и бытовые конструкции с mi, ci, mu.",
  tasks:[
    {id:"cel-1", prompt:"Pomagam starszej ___ (sąsiadka).", answers:["sąsiadce"], explanation:"Pomagać требует дательного; sąsiadka → sąsiadce с чередованием k → c."},
    {id:"cel-2", prompt:"Dziękuję ___ za pomoc.", options:["pan","pana","panu","panem"], answers:["panu"], explanation:"Dziękować требует дательного: dziękuję panu."},
    {id:"cel-3", prompt:"Kupiliśmy ___ prezenty.", options:["dzieci","dzieciom","dziećmi"], answers:["dzieciom"], explanation:"Дательный множественного для всех родов имеет окончание -om: dzieciom."},
    {id:"cel-4", prompt:"___ się ten film nie podoba.", options:["Mnie","Mi","Mną"], answers:["Mnie"], explanation:"Тот, кому нравится, стоит в дательном, но в начале фразы работает только полная форма: Mnie się ten film nie podoba. Краткое mi в первую позицию не ставится."},
    {id:"cel-5", prompt:"Daję książkę nowemu ___ (student).", answers:["studentowi"], explanation:"Основное мужское окончание дательного: -owi, studentowi."},
    {id:"cel-6", prompt:"Pomagam młodszemu ___ (brat).", answers:["bratu"], explanation:"Brat входит в небольшой список мужских слов с окончанием -u: bratu."},
    {id:"cel-7", prompt:"Przyglądam się małemu ___ (dziecko).", answers:["dziecku"], explanation:"Средний род в дательном единственного получает -u: dziecku."},
    {id:"cel-8", prompt:"Dzięki dobrej ___ mamy więcej czasu. (praca)", answers:["pracy"], explanation:"Dzięki требует дательного; мягкая или исторически мягкая женская основа получает -y/-i: pracy."},
    {id:"cel-9", prompt:"Dzwonię do mamy i ___ wszystko opowiadam.", options:["jej","ją","nią"], answers:["jej"], explanation:"Адресат действия стоит в дательном: opowiadam jej."},
    {id:"cel-10", prompt:"Życzę ci miłego ___. (dzień)", answers:["dnia"], explanation:"Życzyć komu? ci; чего? miłego dnia - родительный объекта пожелания."},
    {id:"cel-11", prompt:"Dajemy prezent naszej ___ (mama).", answers:["mamie"], explanation:"Женский дательный: mamie."},
    {id:"cel-12", prompt:"Czy możesz powiedzieć ___ prawdę? (ja)", answers:["mi"], explanation:"Powiedzieć komu? mi - дательный."},
    {id:"cel-13", prompt:"Lekarz pomaga choremu ___ (dziecko).", answers:["dziecku"], explanation:"Dziecko в дательном: dziecku."},
    {id:"cel-14", prompt:"Wierzę mojemu ___ (przyjaciel).", answers:["przyjacielowi"], explanation:"Wierzyć требует дательного: przyjacielowi."},
    {id:"cel-15", prompt:"___ człowiekowi trudno pomóc.", options:["Ten","Tego","Temu"], answers:["Temu"], explanation:"Pomóc komu? temu człowiekowi."},
    {id:"cel-16", prompt:"Przyglądamy się małym ___ (kot).", answers:["kotom"], explanation:"Дательный множественного обычно оканчивается на -om: kotom."},
    {id:"cel-17", prompt:"Nie ufam temu ___ (sprzedawca).", answers:["sprzedawcy"], explanation:"Ufać требует дательного; sprzedawca → sprzedawcy."},
    {id:"cel-18", prompt:"Rodzice kupili dzieciom nowe ___.", options:["rowery","rowerów","rowerami"], answers:["rowery"], explanation:"Dzieciom - дательный адресата; rowery - винительный прямого объекта."},
    {id:"cel-19", prompt:"Dzięki ___ za wiadomość.", options:["ty","tobie","ciebie"], answers:["tobie"], explanation:"Dzięki требует дательного: dzięki tobie."},
    {id:"cel-text", prompt:"Просьба о помощи", passage:[
      "Jest ",{key:"a",options:["ja","mi","mną"],answers:["mi"],label:"форма местоимения ja"}," zimno. Mówię o tym ",
      {key:"b",answers:["koledze"],hint:"kolega",label:"форма слова kolega"},", a on daje ",
      {key:"c",options:["mi","mnie","mną"],answers:["mi"],label:"форма местоимения ja"}," ciepłą kurtkę."
    ], explanation:"В нейтральной позиции после глагола используется краткая форма дательного: daje mi. Полное mnie требует смыслового ударения и отдельного контекста."}
  ]
},
{
  id:"narz", title:"С кем, чем и в какой роли",
  lead:"Профессия, средство передвижения, орудие и совместность с предлогом z.",
  tasks:[
    {id:"narz-1", prompt:"Moja siostra jest ___.", options:["lekarka","lekarki","lekarką"], answers:["lekarką"], explanation:"Название профессии после być ставится в творительном: jest lekarką."},
    {id:"narz-2", prompt:"Poproszę kawę z ___.", options:["mleko","mleka","mlekiem"], answers:["mlekiem"], explanation:"Z в значении совместности требует творительного: z mlekiem."},
    {id:"narz-3", prompt:"Codziennie jadę do pracy ___.", options:["tramwaj","tramwajem","w tramwaju"], answers:["tramwajem"], explanation:"Транспорт выражается творительным без предлога: jadę tramwajem."},
    {id:"narz-4", prompt:"Piotr jest dobrym ___ (lekarz).", answers:["lekarzem"], explanation:"Существительное вместе с прилагательным уходит в творительный: dobrym lekarzem."},
    {id:"narz-5", prompt:"Jedziemy do Warszawy ___ (pociąg).", answers:["pociągiem"], explanation:"Мужское слово на g получает окончание -giem: pociągiem."},
    {id:"narz-6", prompt:"Rozmawiam z nowymi ___ (student).", answers:["studentami"], explanation:"Основное окончание творительного множественного: -ami, studentami."},
    {id:"narz-7", prompt:"Idę do parku z ___ (dzieci).", answers:["dziećmi"], explanation:"Dzieci → dziećmi - одна из частых исключительных форм множественного на -mi."},
    {id:"narz-8", prompt:"Anna jest bardzo ___.", options:["zmęczona","zmęczoną","zmęczonej"], answers:["zmęczona"], explanation:"После być прилагательное без существительного остаётся в именительном: Anna jest zmęczona."},
    {id:"narz-9", prompt:"Kroję chleb ostrym ___ (nóż).", answers:["nożem"], explanation:"Орудие действия стоит в творительном: nożem."},
    {id:"narz-10", prompt:"Mieszkam z moim ___ (brat).", answers:["bratem"], explanation:"Z в значении «с» требует творительного: z bratem."},
    {id:"narz-11", prompt:"Rozmawiam z ciekawą ___ (kobieta).", answers:["kobietą"], explanation:"Женский творительный: kobietą."},
    {id:"narz-12", prompt:"Dziecko bawi się nową ___.", options:["zabawka","zabawki","zabawką"], answers:["zabawką"], explanation:"Bawić się требует творительного: zabawką."},
    {id:"narz-13", prompt:"Jesteśmy dobrymi ___ (przyjaciel).", answers:["przyjaciółmi"], explanation:"Przyjaciel → przyjaciółmi - творительный множественного."},
    {id:"narz-14", prompt:"Piszę wiadomość ___ (długopis).", answers:["długopisem"], explanation:"Средство действия: długopisem."},
    {id:"narz-15", prompt:"Herbata z ___ jest za słodka. (cytryna)", answers:["cytryną"], explanation:"Z + творительный: z cytryną."},
    {id:"narz-16", prompt:"On jest moim starszym ___ (brat).", answers:["bratem"], explanation:"Именная часть с существительным после być стоит в творительном: bratem."},
    {id:"narz-17", prompt:"Jedziemy z naszymi ___ (dziecko).", answers:["dziećmi"], explanation:"Dzieci в творительном множественного: dziećmi."},
    {id:"narz-18", prompt:"Interesuję się polską ___.", options:["kultura","kultury","kulturą"], answers:["kulturą"], explanation:"Interesować się требует творительного: kulturą."},
    {id:"narz-19", prompt:"Idę na spacer z ___. (pies)", answers:["psem"], explanation:"Z psem - творительный от pies."},
    {id:"narz-text", prompt:"Первый день на новой работе", passage:[
      "Jestem ",{key:"a",answers:["programistą"],hint:"programista",label:"форма слова programista"},". Pracuję z doświadczoną ",
      {key:"b",options:["koleżanka","koleżanki","koleżanką"],answers:["koleżanką"],label:"форма слова koleżanka"}," i piszę notatki ",
      {key:"c",options:["ołówek","ołówka","ołówkiem"],answers:["ołówkiem"],label:"форма слова ołówek"},"."
    ], explanation:"Роль, совместность и орудие действия здесь требуют творительного."}
  ]
},
{
  id:"miej", title:"Где, о чём и после чего",
  lead:"Предложный всегда идёт с предлогом. Отработай место, тему разговора и время.",
  tasks:[
    {id:"miej-1", prompt:"Mieszkamy w ___ (Warszawa).", answers:["Warszawie"], explanation:"W + место требует предложного; Warszawa → Warszawie."},
    {id:"miej-2", prompt:"Rozmawiamy o nowej ___.", options:["praca","pracy","pracę"], answers:["pracy"], explanation:"O в значении темы требует предложного: o pracy."},
    {id:"miej-3", prompt:"Spotkajmy się na ___.", options:["dworzec","dworca","dworcu"], answers:["dworcu"], explanation:"Устойчиво: na dworcu. Основа на c получает -u."},
    {id:"miej-4", prompt:"Po ___ idę na spacer.", options:["obiad","obiadu","obiedzie"], answers:["obiedzie"], explanation:"Po в значении «после» требует предложного: po obiedzie."},
    {id:"miej-5", prompt:"Spotykamy się w małym ___ (sklep).", answers:["sklepie"], explanation:"Твёрдая основа получает -e с чередованием p → pi: sklep → sklepie."},
    {id:"miej-6", prompt:"Rozmawiamy o dobrym ___ (lekarz).", answers:["lekarzu"], explanation:"Исторически мягкая основа на rz получает -u: lekarzu."},
    {id:"miej-7", prompt:"Samochód stoi na dużym ___ (parking).", answers:["parkingu"], explanation:"Мужская основа на g получает -u без чередования: parkingu."},
    {id:"miej-8", prompt:"Czytam o nowej ___ (książka).", answers:["książce"], explanation:"У женского слова твёрдая основа на k получает -e с чередованием k → c: książce."},
    {id:"miej-9", prompt:"Mieszkam przy ruchliwej ___ (ulica).", answers:["ulicy"], explanation:"Przy + предложный: przy ulicy."},
    {id:"miej-10", prompt:"Myślimy o przyszłym ___. (urlop)", answers:["urlopie"], explanation:"O + предложный; przyszły urlop → o przyszłym urlopie."},
    {id:"miej-11", prompt:"W ___ pracuje moja siostra. (szpital)", answers:["szpitalu"], explanation:"Мужское существительное szpital в предложном: w szpitalu."},
    {id:"miej-12", prompt:"Mówię o moich ___ (rodzic).", answers:["rodzicach"], explanation:"Предложный множественного: o rodzicach."},
    {id:"miej-13", prompt:"Po długim ___ wracam do domu. (spacer)", answers:["spacerze"], explanation:"Po «после» требует предложного: po spacerze."},
    {id:"miej-14", prompt:"Dzieci bawią się w dużym ___. (ogród)", answers:["ogrodzie"], explanation:"W + место требует предложного; ogród → ogrodzie."},
    {id:"miej-15", prompt:"Rozmawiamy o tym ___ (problem).", answers:["problemie"], explanation:"O + предложный: o problemie."},
    {id:"miej-16", prompt:"Na ___ leży komputer. (biurko)", answers:["biurku"], explanation:"Na + положение требует предложного: na biurku."},
    {id:"miej-17", prompt:"W zimnej ___ pływać nie chcę. (woda)", answers:["wodzie"], explanation:"W + предложный: w wodzie."},
    {id:"miej-18", prompt:"Czy rozmawiasz o swoich ___? (plan)", answers:["planach"], explanation:"Предложный множественного: o planach."},
    {id:"miej-19", prompt:"Po ___ idziemy na kawę. (praca)", answers:["pracy"], explanation:"Po + предложный: po pracy."},
    {id:"miej-text", prompt:"Встреча в городе", passage:[
      "O piątej jestem już w ",{key:"a",answers:["centrum"],hint:"centrum",label:"форма слова centrum"},". Czekam na ciebie przy ",
      {key:"b",options:["okno","okna","oknie"],answers:["oknie"],label:"форма слова okno"}," w małej ",
      {key:"c",options:["kawiarnia","kawiarni","kawiarnię"],answers:["kawiarni"],label:"форма слова kawiarnia"},"."
    ], explanation:"Centrum не изменяется; przy oknie и w kawiarni требуют предложного."}
  ]
},
{
  id:"woł", title:"Позвать и обратиться",
  lead:"Имена, родственные обращения и титулы - именно там звательный остаётся живым.",
  tasks:[
    {id:"wol-1", prompt:"Panie ___, boli mnie gardło. (doktor)", answers:["doktorze"], explanation:"Мужской титул после panie ставится в звательном: panie doktorze."},
    {id:"wol-2", prompt:"Droga ___, dziękuję za list. (Anna)", answers:["Anno"], explanation:"Женские имена на -a обычно получают -o: Anna → Anno."},
    {id:"wol-3", prompt:"Drogi ___, wszystkiego najlepszego! (Marek)", answers:["Marku"], explanation:"После k используется окончание -u: Marek → Marku."},
    {id:"wol-4", prompt:"___, gdzie są moje klucze? (mama)", answers:["Mamo"], explanation:"Mama → Mamo в прямом обращении."},
    {id:"wol-5", prompt:"Drogi ___, dziękuję za pomoc. (Tomasz)", answers:["Tomaszu"], explanation:"Основа заканчивается на исторически мягкую sz, поэтому используется -u: Tomasz → Tomaszu."},
    {id:"wol-6", prompt:"Panie ___, mam pytanie. (nauczyciel)", options:["nauczyciele","nauczycielu","nauczycielem"], answers:["nauczycielu"], explanation:"Основа на мягкую l получает -u: nauczyciel → nauczycielu."},
    {id:"wol-7", prompt:"___, proszę otworzyć podręcznik. (student)", options:["Student","Studencie","Studentu"], answers:["Studencie"], explanation:"Твёрдая основа на t получает -e, при этом t чередуется с ci: student → studencie."},
    {id:"wol-8", prompt:"Mój ___, jestem z ciebie dumny. (syn)", answers:["synu"], explanation:"Syn → synu - традиционное исключение: несмотря на твёрдую основу, используется -u."},
    {id:"wol-9", prompt:"___, możesz mi pomóc? (Piotr)", answers:["Piotrze"], explanation:"Piotr → Piotrze в звательном."},
    {id:"wol-10", prompt:"Dzień dobry, pani ___. (Kowalska)", answers:["Kowalska"], explanation:"Женская фамилия в таком обращении обычно сохраняет форму именительного."},
    {id:"wol-11", prompt:"Drogi ___, gratuluję! (przyjaciel)", answers:["przyjacielu"], explanation:"Мягкая основа получает -u: przyjacielu."},
    {id:"wol-12", prompt:"___, proszę chwilę poczekać. (pan)", answers:["Panie"], explanation:"Pan → panie в прямом обращении."},
    {id:"wol-13", prompt:"Kochana ___, co u ciebie? (babcia)", answers:["Babciu"], explanation:"Babcia → Babciu в звательном."},
    {id:"wol-14", prompt:"Panie ___, jak dojść do dworca? (kierownik)", answers:["kierowniku"], explanation:"Титул kierownik в звательном: kierowniku."},
    {id:"wol-15", prompt:"___, nie zapomnij o spotkaniu! (Kasia)", answers:["Kasiu"], explanation:"Kasia → Kasiu в звательном."},
    {id:"wol-16", prompt:"Drogi ___, dziękuję za pomoc. (Jan)", answers:["Janie"], explanation:"Jan → Janie в звательном."},
    {id:"wol-17", prompt:"___, chodź na obiad! (dziecko)", answers:["Dziecko"], explanation:"У слова dziecko звательный совпадает с именительным."},
    {id:"wol-18", prompt:"Pani ___, zapraszam do gabinetu. (Maria)", answers:["Mario"], explanation:"Maria → Mario в звательном."},
    {id:"wol-19", prompt:"Szanowny panie ___, dziękuję za odpowiedź. (Adam)", answers:["Adamie"], explanation:"Adam → Adamie в звательном."},
    {id:"wol-text", prompt:"Короткий разговор в приёмной", passage:[
      {key:"a",options:["Pan","Panie","Pana"],answers:["Panie"],label:"форма слова pan"}," doktorze, czy mogę wejść? - Chwileczkę, ",
      {key:"b",answers:["panie"],hint:"pan",label:"форма слова pan"}," Adamie. - Dobrze, ",
      {key:"c",options:["doktor","doktora","doktorze"],answers:["doktorze"],label:"форма слова doktor"},"."
    ], explanation:"В прямом обращении употребляем panie и звательную форму титула doktorze."}
  ]
}
];

const CASE_TEST = {
  title:"Итоговый тест: семь падежей",
  lead:"Двадцать пять ситуаций без подсказки, какой падеж нужен. Ответы откроются только после общей проверки.",
  tasks:[
    {id:"test-1", prompt:"To są ___ nowi sąsiedzi.", options:["te","ci","tych"], answers:["ci"], explanation:"Мужско-личный именительный: ci nowi sąsiedzi."},
    {id:"test-2", prompt:"Widzę twojego ___ (brat).", answers:["brata"], explanation:"Одушевлённый мужской винительный: brata."},
    {id:"test-3", prompt:"Nie znam tej ___ (kobieta).", answers:["kobiety"], explanation:"После отрицания biernik меняется на dopełniacz: kobiety."},
    {id:"test-4", prompt:"Daję książkę młodszemu ___.", options:["brat","brata","bratu","bratem"], answers:["bratu"], explanation:"Адресат действия стоит в дательном: bratu."},
    {id:"test-5", prompt:"Jedziemy nad morze ___.", options:["pociąg","pociągu","pociągiem"], answers:["pociągiem"], explanation:"Средство передвижения - творительный без предлога."},
    {id:"test-6", prompt:"Klucze leżą na ___.", options:["stół","stołu","stole","stołem"], answers:["stole"], explanation:"Где? na + предложный: na stole."},
    {id:"test-7", prompt:"Pani ___, proszę podpisać dokument. (Anna)", answers:["Anno"], explanation:"Прямое обращение по имени: Pani Anno."},
    {id:"test-8", prompt:"Kupuję trzy świeże ___.", options:["bułki","bułek","bułkami"], answers:["bułki"], explanation:"После 2–4 здесь винительный множественного, совпадающий с именительным: bułki."},
    {id:"test-9", prompt:"Potrzebujemy więcej ___.", options:["krzesła","krzeseł","krzesłom"], answers:["krzeseł"], explanation:"Więcej требует родительного множественного: krzeseł."},
    {id:"test-10", prompt:"Czy możesz pomóc mojej ___? (siostra)", answers:["siostrze"], explanation:"Pomagać + дательный; siostra → siostrze."},
    {id:"test-11", prompt:"Interesuję się polską ___.", options:["historia","historii","historią"], answers:["historią"], explanation:"Interesować się управляет творительным: historią."},
    {id:"test-12", prompt:"Myślę o naszych ___.", options:["wakacje","wakacji","wakacjach","wakacjami"], answers:["wakacjach"], explanation:"O + тема требует предложного множественного: wakacjach."},
    {id:"test-13", prompt:"___, chodź tutaj! (Piotr)", answers:["Piotrze"], explanation:"Piotr → Piotrze в звательном."},
    {id:"test-14", prompt:"Moje dzieci ___ już w domu.", options:["jest","są","byli"], answers:["są"], explanation:"Dzieci - именительный множественного, с ним są."},
    {id:"test-15", prompt:"Wracam z ___ późno wieczorem. (praca)", answers:["pracy"], explanation:"Z в значении «из» требует родительного: z pracy."},
    {id:"test-16", prompt:"Daję kwiaty mojej ___. (mama)", answers:["mamie"], explanation:"Адресат действия стоит в дательном: mamie."},
    {id:"test-17", prompt:"Idę do kina z moim ___ (brat).", answers:["bratem"], explanation:"Z в значении «с» требует творительного: z bratem."},
    {id:"test-18", prompt:"Rozmawiamy o nowym ___. (projekt)", answers:["projekcie"], explanation:"O требует предложного: o projekcie."},
    {id:"test-19", prompt:"Droga ___, wszystkiego najlepszego! (Kasia)", answers:["Kasiu"], explanation:"Kasia → Kasiu в звательном."},
    {id:"test-20", prompt:"Nie widzę żadnego ___ (samochód).", answers:["samochodu"], explanation:"После отрицания прямое дополнение стоит в родительном: samochodu."},
    {id:"test-21", prompt:"Kupuję dwie duże ___. (kawa)", answers:["kawy"], explanation:"После dwie используется форма, совпадающая с именительным множественного: kawy."},
    {id:"test-22", prompt:"Pomagamy naszym ___. (sąsiad)", answers:["sąsiadom"], explanation:"Pomagać требует дательного множественного: sąsiadom."},
    {id:"test-23", prompt:"Piję herbatę z ___. (cytryna)", answers:["cytryną"], explanation:"Z + творительный: z cytryną."},
    {id:"test-24", prompt:"Na ___ stoi lampa. (biurko)", answers:["biurku"], explanation:"Na в значении места требует предложного: na biurku."},
    {id:"test-25", prompt:"___, proszę zamknąć drzwi. (pan)", answers:["Panie"], explanation:"Прямое обращение к мужчине: panie."}
  ]
};

const VERB_PRACTICE = [
{
  id:"conj", title:"Спряжение в живых фразах",
  lead:"Поставь глагол в нужное лицо. Исходная форма всегда дана - проверяем форму, а не словарный запас.",
  tasks:[
    {id:"vconj-1", prompt:"Codziennie ___ po polsku. (pisać, ja)", answers:["piszę"], explanation:"Pisać: ja piszę, ty piszesz - I спряжение и чередование s → sz."},
    {id:"vconj-2", prompt:"Co teraz ___? (robić, ty)", options:["robisz","robisz się","robiszcie"], answers:["robisz"], explanation:"Robić относится ко II спряжению: ty robisz."},
    {id:"vconj-3", prompt:"Moi rodzice dużo ___. (pracować, oni)", answers:["pracują"], explanation:"-ować превращается в -uj-: oni pracują."},
    {id:"vconj-4", prompt:"My ___ już w domu. (być)", options:["jesteśmy","jesteście","są"], answers:["jesteśmy"], explanation:"Нерегулярная форма być для my - jesteśmy."},
    {id:"vconj-text", prompt:"Обычное утро", passage:[
      "Rano ",{key:"a",answers:["wstaję"],hint:"wstawać · ja",label:"форма wstawać для ja"},", potem ",
      {key:"b",options:["piję","pijesz","pije"],answers:["piję"],label:"форма pić для ja"}," kawę i ",
      {key:"c",answers:["jadę"],hint:"jechać · ja",label:"форма jechać для ja"}," do pracy."
    ], explanation:"Один субъект ja задаёт формы wstaję, piję и jadę."}
  ]
},
{
  id:"czasy", title:"Вчера, сегодня, завтра",
  lead:"Выбери время и вид по контексту. В прошедшем дополнительно следи за родом и числом.",
  tasks:[
    {id:"vtime-1", prompt:"Wczoraj Anna ___ bilet. (kupić)", answers:["kupiła"], explanation:"Wczoraj задаёт прошедшее; Anna - женский род: kupiła."},
    {id:"vtime-2", prompt:"Wczoraj przez trzy godziny ___ do Krakowa. (jechać, my · мужчины/смешанная группа)", answers:["jechaliśmy"], explanation:"Длительность przez trzy godziny мотивирует несовершенный вид; мужско-личное my получает -liśmy: jechaliśmy."},
    {id:"vtime-3", prompt:"Jutro ___ ten raport. (napisać, ja)", options:["piszę","napiszę","będę napisać"], answers:["napiszę"], explanation:"Совершенный napisać образует простое будущее: napiszę."},
    {id:"vtime-4", prompt:"Wieczorem ___ książkę. (czytać, my)", options:["będziemy czytać","będziemy przeczytać","przeczytaliśmy"], answers:["będziemy czytać"], explanation:"Несовершенный czytać образует составное будущее: będziemy czytać."},
    {id:"vtime-text", prompt:"Три дня одного путешествия", passage:[
      "Wczoraj ",{key:"a",answers:["przyjechałem"],hint:"przyjechać · ja, мужчина",label:"прошедшая форма przyjechać"}," do Gdańska. Dziś ",
      {key:"b",options:["zwiedzam","zwiedziłem","będę zwiedził"],answers:["zwiedzam"],label:"форма zwiedzać для dziś"}," miasto, a jutro ",
      {key:"c",answers:["wrócę"],hint:"wrócić · ja",label:"будущая форма wrócić"}," do domu."
    ], explanation:"Wczoraj → przyjechałem, dziś → zwiedzam, jutro + совершенный wrócić → wrócę."}
  ]
},
{
  id:"tryby", title:"Просьба, совет и условие",
  lead:"Отработай повелительное и условное наклонение, а также формы powinien.",
  tasks:[
    {id:"vmode-1", prompt:"___ okno, proszę. (otworzyć, ty)", answers:["otwórz"], explanation:"Повелительная форма otworzyć - otwórz, с o → ó."},
    {id:"vmode-2", prompt:"Nie ___ tego teraz! (robić, ty)", options:["rób","zrób","robisz"], answers:["rób"], explanation:"Обычный запрет предпочитает несовершенный вид: nie rób."},
    {id:"vmode-3", prompt:"___ poprosić o kawę. (chcieć, ja · мужчина)", answers:["chciałbym"], explanation:"Мужчина говорит chciałbym; женщина - chciałabym."},
    {id:"vmode-4", prompt:"Anna ___ wcześniej wyjść. (powinien)", options:["powinien","powinna","powinnam"], answers:["powinna"], explanation:"Для ona нужна форма powinna."},
    {id:"vmode-text", prompt:"Условный план", passage:[
      "Gdybym ",{key:"a",answers:["miał"],hint:"mieć · ja, мужчина",label:"условная форма mieć"}," więcej czasu, ",
      {key:"b",options:["pojechałbym","pojadę","jechałem"],answers:["pojechałbym"],label:"условная форма pojechać"}," w góry i ",
      {key:"c",answers:["zostałbym"],hint:"zostać · ja, мужчина",label:"условная форма zostać"}," tam na tydzień."
    ], explanation:"После gdybym первая часть имеет форму miał, а результаты - pojechałbym и zostałbym."}
  ]
},
{
  id:"formy", title:"Формы письменного польского",
  lead:"Причастия, деепричастия, пассив и отглагольные существительные в типичных объявлениях и текстах.",
  tasks:[
    {id:"vform-1", prompt:"Kobieta ___ gazetę siedzi przy oknie. (czytać)", answers:["czytająca"], explanation:"Действительное причастие согласуется с kobieta: czytająca."},
    {id:"vform-2", prompt:"Drzwi są ___. (zamknąć)", options:["zamknięte","zamykające","zamknąwszy"], answers:["zamknięte"], explanation:"Drzwi - немужско-личное множественное число, поэтому: drzwi są zamknięte."},
    {id:"vform-3", prompt:"___ do pracy, słucham podcastu. (iść)", answers:["Idąc","idąc"], explanation:"Одновременное действие несовершенного вида: idąc."},
    {id:"vform-4", prompt:"Most został ___ w 2020 roku. (zbudować)", answers:["zbudowany"], explanation:"Пассив: został + страдательное причастие zbudowany."},
    {id:"vform-text", prompt:"Объявление в доме", passage:[
      "Winda jest chwilowo ",{key:"a",options:["wyłączona","wyłączając","wyłączenie"],answers:["wyłączona"],label:"форма wyłączyć"},". Osoby ",
      {key:"b",answers:["mieszkające"],hint:"mieszkać",label:"причастие от mieszkać"}," na wyższych piętrach prosimy o ",
      {key:"c",options:["korzystanie","korzystający","skorzystawszy"],answers:["korzystanie"],label:"отглагольное существительное od korzystać"}," ze schodów."
    ], explanation:"Wyłączona - состояние лифта; mieszkające - действительное причастие; o korzystanie - отглагольное существительное."}
  ]
},
{
  id:"rekcja", title:"Глагол выбирает падеж",
  lead:"Проверяем управление - одну из самых частых зон ошибок у русскоязычных.",
  tasks:[
    {id:"vrek-1", prompt:"Szukam swoich ___. (klucze)", answers:["kluczy"], explanation:"Szukać требует родительного: szukam kluczy."},
    {id:"vrek-2", prompt:"Pomagam starszej ___. (sąsiadka)", answers:["sąsiadce"], explanation:"Pomagać требует дательного: sąsiadce."},
    {id:"vrek-3", prompt:"Interesuję się polską ___. (historia)", options:["historię","historii","historią"], answers:["historią"], explanation:"Interesować się + творительный: historią."},
    {id:"vrek-4", prompt:"Bardzo tęsknię za moją ___. (rodzina)", answers:["rodziną"], explanation:"Tęsknić za + творительный: za rodziną."},
    {id:"vrek-text", prompt:"Новый сотрудник", passage:[
      "Marek uczy się ",{key:"a",answers:["polskiego"],hint:"polski",label:"форма polski после uczyć się"},", pomaga ",
      {key:"b",options:["kolega","koledze","kolegą"],answers:["koledze"],label:"форма kolega после pomaga"}," i często pyta kierownika o ",
      {key:"c",answers:["radę"],hint:"rada",label:"форма rada после pytać o"},"."
    ], explanation:"Uczyć się + родительный, pomagać + дательный, pytać o + винительный."}
  ]
},
{
  id:"lista", title:"Словарь в действии",
  lead:"Узнай инфинитив по форме и выбери нужный частый глагол по конструкции.",
  tasks:[
    {id:"vlist-1", prompt:"Форма idę принадлежит глаголу ___.", options:["iść","jechać","chodzić"], answers:["iść"], explanation:"Idę - форма ja от iść."},
    {id:"vlist-2", prompt:"Форма biorę принадлежит глаголу ___.", answers:["brać"], explanation:"Brać имеет две основы: bior- и bierz-."},
    {id:"vlist-3", prompt:"___ ten adres, ale nie wiem, gdzie to jest.", options:["Znam","Wiem","Umiem"], answers:["Znam"], explanation:"Конкретно названный объект адрес требует znać: znam adres."},
    {id:"vlist-4", prompt:"Nie ___, kiedy przyjedzie pociąg.", options:["znam","wiem","umiem"], answers:["wiem"], explanation:"Перед придаточным kiedy нужен wiedzieć: nie wiem, kiedy…"},
    {id:"vlist-text", prompt:"Перед выходом", passage:[
      "Najpierw ",{key:"a",answers:["jem"],hint:"jeść · ja",label:"форма jeść для ja"}," śniadanie, potem ",
      {key:"b",options:["biorę","bierzę","bram"],answers:["biorę"],label:"форма brać для ja"}," klucze i ",
      {key:"c",answers:["wychodzę"],hint:"wychodzić · ja",label:"форма wychodzić для ja"}," z domu."
    ], explanation:"Частые нерегулярные формы: jem, biorę; wychodzić → wychodzę."}
  ]
}
];

const VERB_EXTRA = {
  conj:[
    ["Ty często ___ książki. (czytać)","czytasz","Czytać для ty: czytasz."],
    ["Ona ___ kawę rano. (pić)","pije","Pić для ona: pije."],
    ["My ___ w centrum. (mieszkać)","mieszkamy","Mieszkać для my: mieszkamy."],
    ["Wy ___ dziś długo. (pracować)","pracujecie","Глаголы на -ować: pracujecie."],
    ["Oni ___ na autobus. (czekać)","czekają","Czekać для oni: czekają."],
    ["Ja ___ obiad. (robić)","robię","Robić для ja: robię."],
    ["Ty ___ po polsku? (rozumieć)","rozumiesz","Rozumieć для ty: rozumiesz."],
    ["On ___ w sklepie. (kupować)","kupuje","Kupować для on: kupuje."],
    ["My ___ do kina. (iść)","idziemy","Iść для my: idziemy."],
    ["Wy ___ po kawę? (iść)","idziecie","Iść для wy: idziecie."],
    ["Oni ___ to miasto bardzo dobrze. (znać)","znają","Znać для oni: znają. Znać требует объекта: znać kogo? co?"],
    ["Ja ___ rano o siódmej. (wstawać)","wstaję","Wstawać для ja: wstaję."],
    ["Ty ___ klucze? (mieć)","masz","Mieć для ty: masz."],
    ["Ona ___ do pracy autobusem. (jeździć)","jeździ","Jeździć для ona: jeździ."],
    ["My ___ kolację razem. (jeść)","jemy","Jeść для my: jemy."]
  ],
  czasy:[
    ["Wczoraj ja ___ w domu. (zostać, мужчина)","zostałem","Прошедшее, мужчина: zostałem."],
    ["Wczoraj Ewa ___ film. (oglądać)","oglądała","Прошедшее, женщина: oglądała."],
    ["Wczoraj dzieci ___ w parku. (bawić się)","bawiły się","Dzieci - немужско-личное множественное: bawiły się."],
    ["Jutro ___ zakupy. (zrobić, ja)","zrobię","Совершенный вид: простое будущее zrobię."],
    ["Jutro o tej porze ___ w pociągu. (jechać, ja)","będę jechać","Несовершенный вид: będę jechać."],
    ["Teraz ___ obiad. (gotować, my)","gotujemy","Teraz задаёт настоящее: gotujemy."],
    ["W zeszłym roku oni ___ w Krakowie. (mieszkać)","mieszkali","Мужско-личное множественное: mieszkali."],
    ["Za godzinę pociąg ___. (odjechać)","odjedzie","Совершенный odjechać: простое будущее odjedzie."],
    ["Kiedy byłem dzieckiem, często ___ na rowerze. (jeździć, мужчина)","jeździłem","Повторяющееся действие в прошлом: jeździłem."],
    ["Wieczorem ___ ten film. (oglądać, ona)","będzie oglądać","Несовершенный вид в будущем: będzie oglądać."],
    ["Wczoraj my ___ późno. (wrócić, женщины)","wróciłyśmy","Женская группа: wróciłyśmy."],
    ["Dziś rano ___ już śniadanie. (zjeść, ja, мужчина)","zjadłem","Совершенный результат в прошлом: zjadłem."],
    ["Jutro oni ___ nowy projekt. (zacząć)","zaczną","Zacząć: простое будущее zaczną."],
    ["Teraz nie ___ czasu. (mieć, ja)","mam","Настоящее время: nie mam czasu."],
    ["Przez cały dzień ___ raport. (pisać, ona)","pisała","Длительность в прошлом: несовершенный pisała."]
  ],
  tryby:[
    ["___ tutaj! (przyjść, ty)","przyjdź","Повелительное от przyjść: przyjdź."],
    ["Nie ___ tak głośno! (mówić, ty)","mów","Запрет: не совершенный, а mów."],
    ["___ mi adres. (podać, pan)","Proszę podać","Вежливая просьба: Proszę podać mi adres."],
    ["Gdybym miała czas, ___ więcej. (czytać, женщина)","czytałabym","Условная форма женского рода: czytałabym."],
    ["Czy ___ mi pan pomóc? (móc)","mógłby","Вежливая просьба: mógłby mi pan."],
    ["My ___ wcześniej wyjść. (powinien, мужчины/смешанная группа)","powinniśmy","Powinien в форме my: powinniśmy."],
    ["Niech pani ___ spokojnie. (usiąść)","usiądzie","Вежливая форма повелительного: niech pani usiądzie."],
    ["___ ostrożnie! (jechać, ty)","Jedź","Повелительное от jechać: jedź."],
    ["___ tego bez pytania. (brać, ty)","Nie bierz","Запрет: nie bierz."],
    ["Ja na twoim miejscu ___ z lekarzem. (porozmawiać, мужчина)","porozmawiałbym","Условная форма: porozmawiałbym."],
    ["Dzieci ___ już spać. (powinien)","powinny","Dzieci - немужско-личная группа: powinny."],
    ["___ dokument. (podpisać, pan)","Proszę podpisać","Формула вежливой просьбы: proszę + инфинитив."],
    ["Gdybyśmy byli bogaci, ___ dom. (kupić)","kupilibyśmy","Условное my: kupilibyśmy."],
    ["___ na mnie chwilę! (poczekać, ty)","Poczekaj","Повелительное от poczekać: poczekaj."],
    ["Niech oni ___ jutro. (zadzwonić)","zadzwonią","Пусть они: niech + форма oni."]
  ],
  formy:[
    ["List został ___. (wysłać)","wysłany","Пассив: został wysłany."],
    ["Książka jest ___. (napisać)","napisana","Страдательное причастие согласуется с książka."],
    ["___ kolację, poszliśmy na spacer. (zjeść)","Zjadłszy","Деепричастие предшествующего действия: zjadłszy."],
    ["Chłopiec ___ w ogrodzie to mój brat. (biegać)","biegający","Действительное причастие: biegający."],
    ["Prosimy o nie___ w tym miejscu. (palić)","palenie","После o - отглагольное существительное: o niepalenie."],
    ["Dokumenty są już ___. (podpisać)","podpisane","Dokumenty - немужско-личное множественное: podpisane."],
    ["___ muzyki, sprzątam mieszkanie. (słuchać)","Słuchając","Одновременное действие: słuchając."],
    ["Dom został ___ przez firmę. (sprzedać)","sprzedany","Пассив: został sprzedany."],
    ["Osoba ___ przy wejściu pomoże państwu. (stać)","stojąca","Действительное причастие от stać: stojąca."],
    ["Zakaz ___ na trawnik. (wchodzić)","wchodzenia","Zakaz + родительный отглагольного существительного: wchodzenia."],
    ["Okna są regularnie ___. (myć)","myte","Страдательное причастие от myć: myte."],
    ["___ klucze, wyszedł z domu. (znaleźć)","Znalazłszy","Сначала нашёл, потом вышел: znalazłszy."],
    ["Film ___ przez znanego reżysera zdobył nagrodę. (nakręcić)","nakręcony","Страдательное причастие: nakręcony."],
    ["Dzieci ___ na placu są bardzo głośne. (bawić się)","bawiące się","Действительное причастие: bawiące się."],
    ["Dziękujemy za ___ formularza. (wypełnić)","wypełnienie","Za + винительный отглагольного существительного: wypełnienie."]
  ],
  rekcja:[
    ["Boję się dużych ___. (pies)","psów","Bać się + родительный: psów."],
    ["Dziękuję ___ za pomoc. (ty)","ci","Dziękować komu? ci."],
    ["Czekamy na ___ (autobus)","autobus","Czekać na + винительный: autobus."],
    ["Myślę o mojej ___. (przyszłość)","przyszłości","Myśleć o + предложный: przyszłości."],
    ["Ufam temu ___. (lekarz)","lekarzowi","Ufać + дательный: lekarzowi."],
    ["Proszę o szklankę ___. (woda)","wody","Prosić o + винительный; после szklankę - родительный воды."],
    ["Zależy mi na twojej ___. (opinia)","opinii","Zależeć na + предложный: opinii."],
    ["Używam tego ___ codziennie. (program)","programu","Używać + родительный: programu."],
    ["Rozmawiam z nowym ___. (sąsiad)","sąsiadem","Rozmawiać z + творительный: sąsiadem."],
    ["Pytam nauczyciela o ___. (zadanie)","zadanie","Pytać o + винительный: zadanie."],
    ["Wierzę w twoje ___. (słowo)","słowo","Wierzyć w + винительный: słowo."],
    ["Należy do mojej ___. (rodzina)","rodziny","Należeć do + родительный: rodziny."],
    ["Marzę o podróży do ___. (Hiszpania)","Hiszpanii","Marzyć o + предложный: Hiszpanii."],
    ["Słuchamy nowej ___. (piosenka)","piosenki","Słuchać + родительный: piosenki."],
    ["Zwracam się do ___ z pytaniem. (pan)","pana","Zwracać się do + родительный: pana."]
  ],
  lista:[
    ["Форма mogę принадлежит глаголу ___.","móc","Mogę - форма ja от móc."],
    ["Форма chcę принадлежит глаголу ___.","chcieć","Chcę - форма ja от chcieć."],
    ["___ pływać, ale nie mam dziś czasu.","Umiem","Уметь что-то делать: umiem + инфинитив."],
    ["Nie ___ tej kobiety, ale wiem, kim jest.","znam","Конкретного человека: znam."],
    ["___ parasol, bo pada deszcz.","Biorę","Brać в форме ja: biorę."],
    ["Codziennie ___ do pracy tramwajem.","jeżdżę","Регулярное движение транспортом: jeżdżę."],
    ["Teraz ___ do domu pieszo.","idę","Движение сейчас пешком: idę."],
    ["Pociąg ___ o ósmej.","odjeżdża","Отправляется по расписанию: odjeżdża."],
    ["___, że masz rację.","Wiem","Факт или придаточное: wiem, że…"],
    ["Czy ___ mi pan powiedzieć, gdzie jest bank?","może","Вежливая просьба: czy może mi pan powiedzieć…"],
    ["Dzieci ___ się w ogrodzie.","bawią","Bawić się для one: bawią się."],
    ["Rano zawsze ___ prysznic.","biorę","Устойчиво: biorę prysznic."],
    ["On ___ po angielsku i po polsku.","mówi","Mówić для on: mówi."],
    ["Po pracy ___ do domu.","wracam","Wracać для ja: wracam."],
    ["W restauracji ___ zupę i kawę.","zamawiam","Заказывать: zamawiam."]
  ]
};

for(const practice of VERB_PRACTICE){
  VERB_EXTRA[practice.id].forEach(([prompt, answer, explanation], index) => practice.tasks.push({
    id:`v${practice.id}-extra-${index + 1}`, prompt, answers:[answer], explanation
  }));
}

const VERB_TEST = {
  title:"Итоговый тест: польские глаголы",
  lead:"Двадцать пять заданий на формы, время, вид, наклонение и управление. Результат появится после общей проверки.",
  tasks:[
    {id:"vtest-1", prompt:"Co teraz ___? (pisać, ty)", answers:["piszesz"], explanation:"Pisać: ty piszesz."},
    {id:"vtest-2", prompt:"Oni codziennie ___ o szóstej. (wstawać)", answers:["wstają"], explanation:"Wstawać для oni: wstają."},
    {id:"vtest-3", prompt:"Wczoraj Maria ___ obiad. (ugotować)", answers:["ugotowała"], explanation:"Maria - женский род прошедшего времени: ugotowała."},
    {id:"vtest-4", prompt:"Jutro ___ do ciebie. (zadzwonić, ja)", options:["dzwonię","zadzwonię","będę zadzwonić"], answers:["zadzwonię"], explanation:"Совершенный zadzwonić даёт простое будущее zadzwonię."},
    {id:"vtest-5", prompt:"W weekend ___ mieszkanie. (sprzątać, my)", options:["będziemy sprzątać","będziemy posprzątać","posprzątaliśmy"], answers:["będziemy sprzątać"], explanation:"Несовершенный sprzątać образует составное будущее."},
    {id:"vtest-6", prompt:"___ chwilę! (czekać, ty)", answers:["Czekaj","czekaj"], explanation:"Повелительная форма czekać - czekaj."},
    {id:"vtest-7", prompt:"Czy ___ mi pan pomóc? (móc, условное)", answers:["mógłby"], explanation:"Вежливое обращение к мужчине: czy mógłby mi pan pomóc?"},
    {id:"vtest-8", prompt:"Anna ___ więcej odpoczywać. (powinien)", answers:["powinna"], explanation:"Форма для ona - powinna."},
    {id:"vtest-9", prompt:"Mężczyzna ___ przy drzwiach jest moim sąsiadem. (stać)", answers:["stojący"], explanation:"Действительное причастие от stać: stojący."},
    {id:"vtest-10", prompt:"Dokument został ___. (podpisać)", options:["podpisany","podpisując","podpisanie"], answers:["podpisany"], explanation:"Пассив требует страдательного причастия podpisany."},
    {id:"vtest-11", prompt:"Dziękuję pani za ___. (pomoc)", answers:["pomoc"], explanation:"Dziękować komuś za + винительный; pomoc имеет ту же форму."},
    {id:"vtest-12", prompt:"Boję się dużych ___. (pies)", answers:["psów"], explanation:"Bać się требует родительного: psów."},
    {id:"vtest-13", prompt:"Zwykle ___ do pracy autobusem. (jeździć, ja)", options:["jadę","jeżdżę","idę"], answers:["jeżdżę"], explanation:"Регулярное движение транспортом: jeżdżę."},
    {id:"vtest-14", prompt:"Nie ___ jego numeru telefonu.", options:["znam","wiem","umiem"], answers:["znam"], explanation:"Назван конкретный объект: znać numer."},
    {id:"vtest-15", prompt:"Nie ___, czy on przyjdzie.", options:["znam","wiem","umiem"], answers:["wiem"], explanation:"Придаточное с czy требует wiedzieć."},
    {id:"vtest-16", prompt:"Wczoraj długo ___ na ciebie. (czekać, ja, мужчина)", answers:["czekałem"], explanation:"Длительное действие в прошлом: czekałem."},
    {id:"vtest-17", prompt:"Jutro oni ___ nową stronę. (uruchomić)", answers:["uruchomią"], explanation:"Совершенный uruchomić образует простое будущее: uruchomią."},
    {id:"vtest-18", prompt:"Nie ___ tak szybko! (mówić, ty)", answers:["mów"], explanation:"В запрете обычно используется несовершенный вид: nie mów."},
    {id:"vtest-19", prompt:"Gdybym miał więcej czasu, ___ polskiego. (uczyć się)", answers:["uczyłbym się"], explanation:"Условная форма мужчины: uczyłbym się."},
    {id:"vtest-20", prompt:"Czy ___ mi pani pomóc? (móc, условное)", answers:["mogłaby"], explanation:"Нейтральная вежливая просьба: czy mogłaby mi pani pomóc?"},
    {id:"vtest-21", prompt:"List został ___ rano. (wysłać)", answers:["wysłany"], explanation:"Пассив: został wysłany."},
    {id:"vtest-22", prompt:"___ muzyki, pracuję lepiej. (słuchać)", answers:["Słuchając","słuchając"], explanation:"Одновременное действие: słuchając muzyki."},
    {id:"vtest-23", prompt:"Ufam mojemu ___. (przyjaciel)", answers:["przyjacielowi"], explanation:"Ufać требует дательного: przyjacielowi."},
    {id:"vtest-24", prompt:"Myślimy o nowym ___. (projekt)", answers:["projekcie"], explanation:"Myśleć o требует предложного: o projekcie."},
    {id:"vtest-25", prompt:"Codziennie ___ kawę przed pracą. (pić, ja)", answers:["piję"], explanation:"Pić для ja: piję."}
  ]
};

const ROD_ZNAK = [
 ["мужской","согласная на конце","student · dom · pies · telefon · stół · nauczyciel","плюс закрытая группа на -a: mężczyzna, kolega, kierowca, turysta, poeta, artysta"],
 ["женский","-a","kobieta · kawa · praca · książka · ulica","плюс на согласную: noc, rzecz, mysz, sól, twarz, krew, marchew - и всё на -ość: miłość, radość, wolność"],
 ["средний","-o · -e · -ę · -um","okno · mieszkanie · imię · muzeum · dziecko","на -um в единственном числе не склоняется: w muzeum, do muzeum"]
];
const ROD_M = [
 ["m1 · męskoosobowy","мужчины","= Dopełniacz","= Dopełniacz мн.","-i / -y / -e / -owie + чередование","ci","byli"],
 ["m2 · męskożywotny","животные и часть неживого","= Dopełniacz","= Mianownik мн.","-y / -i / -e","te","były"],
 ["m3 · męskorzeczowy","вещи, всё неживое","= Mianownik","= Mianownik мн.","-y / -i / -e","te","były"]
];
const ROD_TEST = [
 ["Widzę studenta.","Widzę psa.","Widzę telefon.","Biernik ед.: Dopełniacz берут m1 и m2, m3 остаётся Mianownik"],
 ["Widzę studentów.","Widzę psy.","Widzę telefony.","Biernik мн.: Dopełniacz берёт только m1 - животные уходят к вещам"],
 ["ci studenci","te psy","te telefony","указательное: ci - признак m1, всё остальное te"],
 ["studenci byli","psy były","telefony były","прошедшее: -li только у m1"]
];
const ROD_DIFF = [
 ["problem","м.","проблема - ж."],
 ["program","м.","программа - ж."],
 ["system","м.","система - ж."],
 ["temat","м.","тема - ж."],
 ["ból","м.","боль - ж."],
 ["cel","м.","цель - ж."],
 ["stopień","м.","степень - ж."],
 ["podpis · napis","м.","подпись, надпись - ж."],
 ["medal","м.","медаль - ж."],
 ["metoda","ж.","метод - м."],
 ["kontrola","ж.","контроль - м."],
 ["pomarańcza","ж.","апельсин - м."],
 ["muzeum","ср.","музей - м."]
];

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
  find:"Односложные на -ić/-yć/-uć (pić, żyć, czuć) · всё на -ąć / -nąć · всё на -c (móc, piec, biec) · согласный + ć (nieść, wieźć, iść) · большинство на -ować и часть на -ywać / -iwać · часть глаголов на -ać (pisać, brać, jechać, płakać).",
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

const MOTYL = [
 ["nieść","niosę · niosą","niesiesz · niesie · niesiemy · niesiecie"],
 ["móc","mogę · mogą","możesz · może · możemy · możecie"],
 ["brać","biorę · biorą","bierzesz · bierze · bierzemy · bierzecie"],
 ["jechać","jadę · jadą","jedziesz · jedzie · jedziemy · jedziecie"],
 ["prosić","proszę · proszą","prosisz · prosi · prosimy · prosicie"],
 ["chodzić","chodzę · chodzą","chodzisz · chodzi · chodzimy · chodzicie"]
];

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

const ASPEKT_JAK = [
 ["приставка","несовершенный → совершенный","robić → zrobić · pisać → napisać · czytać → przeczytać · jeść → zjeść · pić → wypić · dzwonić → zadzwonić"],
 ["суффикс -ywa- · -iwa- · -owa- · -a-","совершенный → вторичный несовершенный","dać → dawać · kupić → kupować · otworzyć → otwierać · zamknąć → zamykać · pokazać → pokazywać · zapisać → zapisywać"],
 ["чередование в корне","пара без приставки","zacząć → zaczynać · wrócić → wracać · spotkać → spotykać · rzucić → rzucać"],
 ["разные слова","супплетивы, учить парой","brać → wziąć · mówić → powiedzieć · widzieć → zobaczyć · oglądać → obejrzeć · kłaść → położyć"]
];

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
 ["wziąć","wziąłem / wzięłam","wziął · wzięła","wzięli · wzięły","муж. ед.: wziąłem, wziąłeś, wziął; жен., ср. и мн. имеют основу wzię-"],
 ["zacząć","zacząłem / zaczęłam","zaczął · zaczęła","zaczęli · zaczęły","муж. ед.: zacząłem, zacząłeś, zaczął; жен., ср. и мн. имеют основу zaczę-"],
 ["znaleźć","znalazłem / znalazłam","znalazł · znalazła","znaleźli · znalazły",""],
 ["nieść","niosłem / niosłam","niósł · niosła","nieśli · niosły","niósł - с ó"],
 ["usiąść","usiadłem / usiadłam","usiadł · usiadła","usiedli · usiadły",""],
 ["być","byłem / byłam","był · była","byli · były","опора для всего остального"]
];

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

const POWINIEN = [
 ["ja","powinienem","powinnam"],
 ["ty","powinieneś","powinnaś"],
 ["on / ona / ono","powinien","powinna · powinno"],
 ["my","powinniśmy","powinnyśmy"],
 ["wy","powinniście","powinnyście"],
 ["oni / one","powinni","powinny"]
];
const POWINIEN_PAST = [
 ["powinienem był zadzwonić","надо было позвонить - а я не позвонил"],
 ["powinnam była wiedzieć","мне следовало знать"],
 ["powinien był przyjść","ему следовало прийти"],
 ["powinni byli zapytać","им следовало спросить"]
];
const MODAL_MUST = [
 ["muszę iść","должен, обязан","внешняя необходимость, выбора нет"],
 ["powinienem iść","следует, надо бы","совет и моральный долг - выбор остаётся"],
 ["to musi być prawda","должно быть, наверняка","вывод, а не обязанность: Musi być zmęczony."],
 ["pociąg powinien przyjechać o ósmej","должен, по идее","ожидание, а не долг: Powinno być gotowe."],
 ["trzeba iść","надо","безлично, лица нет вообще"],
 ["mam iść","мне велено идти","чужое распоряжение: Mam to zrobić do piątku."],
 ["nie muszę iść","не обязан","необходимости нет - но можно"],
 ["nie mogę iść","не могу","нет возможности"],
 ["nie wolno iść","нельзя","прямой запрет"]
];

const REKCJA = [
 ["dziękować","komu? za co?","Celownik + za","благодарить кого","Dziękuję ci za pomoc.",1],
 ["pomagać","komu?","Celownik","помогать кому","Pomagam mamie."],
 ["dzwonić","do kogo?","do + Dopełniacz","звонить кому","Dzwonię do brata.",1],
 ["szukać","czego?","Dopełniacz","искать что","Szukam pracy.",1],
 ["słuchać","czego?","Dopełniacz","слушать что","Słucham muzyki.",1],
 ["uczyć się","czego?","Dopełniacz","учить что","Uczę się polskiego.",1],
 ["używać","czego?","Dopełniacz","пользоваться чем","Używam telefonu.",1],
 ["potrzebować","czego?","Dopełniacz","нуждаться в чём","Potrzebuję pomocy.",1],
 ["zapomnieć","czego? o czym?","Dopełniacz / o + Miejscownik","забыть что","Zapomniałem kluczy. · Zapomniałem o spotkaniu.",1],
 ["bać się","czego?","Dopełniacz","бояться чего","Boję się psów."],
 ["cieszyć się","z czego?","z + Dopełniacz","радоваться чему","Cieszę się z prezentu.",1],
 ["korzystać","z czego?","z + Dopełniacz","пользоваться чем","Korzystam z internetu.",1],
 ["śmiać się · żartować","z kogo? z czego?","z + Dopełniacz","смеяться над кем","Śmieję się z tego.",1],
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
 ["wierzyć","w kogo? w co? komu?","w + Biernik / Celownik","верить во что","Wierzę w ciebie. · Wierzę ci."],
 ["gratulować","komu? czego?","Celownik + Dopełniacz","поздравлять с чем","Gratuluję ci sukcesu.",1],
 ["życzyć","komu? czego?","Celownik + Dopełniacz","желать чего","Życzę ci zdrowia."],
 ["grać","w co? na czym?","w + Biernik · na + Miejscownik","играть во что · на чём","Gram w piłkę. Gram na gitarze.",1],
 ["iść","po co?","po + Biernik","идти за чем","Idę po chleb.",1]
];

const REKCJA_ADJ = [
 ["dumny","z + Dopełniacz","гордиться кем","Jestem dumny z syna."],
 ["zadowolony","z + Dopełniacz","доволен чем","Jestem zadowolony z pracy."],
 ["zmęczony","Narzędnik","устал от чего","Jestem zmęczony pracą."],
 ["pewny / pewien","Dopełniacz","уверен в чём","Jestem pewien swojej racji. · pewny siebie"],
 ["podobny","do + Dopełniacz","похож на кого","Jest podobny do ojca."],
 ["gotowy","na + Biernik · do + Dopełniacz","готов к чему","Gotowy na egzamin. · Gotowy do wyjścia."],
 ["zainteresowany","Narzędnik","заинтересован в чём","Jestem zainteresowany ofertą."],
 ["dobry · słaby","w + Miejscownik","силён, слаб в чём","Jestem dobry w matematyce."],
 ["bogaty","w + Biernik","богат чем","Sok bogaty w witaminy."],
 ["odpowiedzialny","za + Biernik","отвечает за что","Jestem odpowiedzialny za projekt."],
 ["wdzięczny","Celownik + za","благодарен кому за что","Jestem ci wdzięczny za pomoc."],
 ["zdolny","do + Dopełniacz","способен на что","Zdolny do wszystkiego."],
 ["chory","na + Biernik","болен чем","Jestem chory na grypę."],
 ["zły","na + Biernik","зол на кого","Jestem zły na siebie."],
 ["pełny / pełen","Dopełniacz","полон чего","Pokój pełen ludzi."],
 ["wolny","od + Dopełniacz","свободен от чего","Wolny od podatku."]
];
const REKCJA_N = [
 ["problem","z + Narzędnik","Mam problem z komputerem."],
 ["ochota","na + Biernik","Mam ochotę na kawę."],
 ["czas","na + Biernik","Nie mam czasu na to."],
 ["powód","do + Dopełniacz","Nie ma powodu do zmartwień."],
 ["prawo","do + Dopełniacz","Masz prawo do urlopu."],
 ["wpływ","na + Biernik","To ma wpływ na zdrowie."],
 ["zgoda","na + Biernik","Zgoda na przetwarzanie danych."],
 ["pomysł","na + Biernik","Mam pomysł na wakacje."],
 ["dostęp","do + Dopełniacz","dostęp do internetu"],
 ["strach","przed + Narzędnik","strach przed lataniem"],
 ["tęsknota","za + Narzędnik","tęsknota za domem"],
 ["brak","Dopełniacz","brak czasu · z braku miejsca"],
 ["okazja","do + Dopełniacz","okazja do świętowania"]
];

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
 ["odejść","отойти, уйти","Odszedł od okna."],
 ["obejść","обойти","Obeszliśmy całe miasto."]
];

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
 ["-ąć / -nąć → -ęty","zamknąć → zamknięty · wziąć → wzięty · zająć → zajęty · zacząć → zaczęty"],
 ["односложный корень на гласный → -ty","umyć → umyty · pić → pity · zabić → zabity · nakryć → nakryty"],
 ["нерегулярное","otworzyć → otwarty"]
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
 ["zostać","остаться; стать","I","zostanę","zostaniesz","zostaną","został","została","сов."],
 ["należeć","принадлежать; należy - следует","II","należę","należysz","należą","należał","należała","-"],
 ["czuć się","чувствовать себя","I","czuję się","czujesz się","czują się","czuł się","czuła się","poczuć się"],
 ["wydawać się","казаться","I","wydaję się","wydajesz się","wydają się","wydawał się","wydawała się","wydać się"],
 ["wyglądać","выглядеть","III","wyglądam","wyglądasz","wyglądają","wyglądał","wyglądała","-"],
 ["udać się","получиться; отправиться","III","udam się","udasz się","udadzą się","udał się","udała się","сов."],
 ["okazać się","оказаться, выясниться","I","okażę się","okażesz się","okażą się","okazał się","okazała się","сов."],
 ["uważać","считать, полагать; быть осторожным","III","uważam","uważasz","uważają","uważał","uważała","-"],
 ["prowadzić","вести; водить","II","prowadzę","prowadzisz","prowadzą","prowadził","prowadziła","poprowadzić"],
 ["potrafić","уметь, быть в состоянии","II","potrafię","potrafisz","potrafią","potrafił","potrafiła","-"],
 ["próbować","пробовать, пытаться","I","próbuję","próbujesz","próbują","próbował","próbowała","spróbować"],
 ["pojawiać się","появляться","III","pojawiam się","pojawiasz się","pojawiają się","pojawiał się","pojawiała się","pojawić się"],
 ["dostawać","получать","I","dostaję","dostajesz","dostają","dostawał","dostawała","dostać"],
 ["oznaczać","значить, обозначать","III","oznaczam","oznaczasz","oznaczają","oznaczał","oznaczała","-"],
 ["działać","действовать; работать","III","działam","działasz","działają","działał","działała","zadziałać"],
 ["opowiadać","рассказывать","III","opowiadam","opowiadasz","opowiadają","opowiadał","opowiadała","opowiedzieć"],
 ["trwać","длиться, продолжаться","III","trwam","trwasz","trwają","trwał","trwała","-"],
 ["istnieć","существовать","I","istnieję","istniejesz","istnieją","istniał","istniała","-"],
 ["liczyć","считать; рассчитывать на","II","liczę","liczysz","liczą","liczył","liczyła","policzyć"],
 ["wierzyć","верить","II","wierzę","wierzysz","wierzą","wierzył","wierzyła","uwierzyć"],
 ["potrzebować","нуждаться; быть нужным","I","potrzebuję","potrzebujesz","potrzebują","potrzebował","potrzebowała","-"],
 ["powiedzieć","сказать","IV","powiem","powiesz","powiedzą","powiedział","powiedziała","сов."]
];

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

const NDEKL = [
 ["Mianownik","dwa · dwie · dwaj","trzy · trzej","cztery · czterej","pięć · pięciu"],
 ["Dopełniacz","dwóch","trzech","czterech","pięciu"],
 ["Celownik","dwóm","trzem","czterem","pięciu"],
 ["Biernik","dwa · dwie · dwóch","trzy · trzech","cztery · czterech","pięć · pięciu"],
 ["Narzędnik","dwoma · dwiema","trzema","czterema","pięcioma"],
 ["Miejscownik","dwóch","trzech","czterech","pięciu"]
];

const NAGR = [
 ["1","Mianownik ед. ч.","jeden dom · jedna książka · jedno okno","jest / był"],
 ["2, 3, 4","Mianownik мн. ч.","dwa domy · trzy książki · cztery okna","są / były"],
 ["5-9, 0, 11-14","Dopełniacz мн. ч.","pięć domów · dziesięć książek · czternaście okien","jest / było"],
 ["22, 23, 24","Mianownik мн. ч.","dwadzieścia dwa domy · trzydzieści trzy książki","są / były"],
 ["21, 31, 41...","Mianownik ед. ч.","dwadzieścia jeden dom · trzydzieści jedna książka","jest / był"],
 ["25, 35, 100...","Dopełniacz мн. ч.","dwadzieścia pięć domów · sto okien","jest / było"]
];

const MOSNUM = [
 ["dwaj · trzej · czterej","Mianownik мн. ч.","глагол во мн. ч.","Dwaj studenci czytają. · Trzej panowie śpiewali."],
 ["dwóch · trzech · czterech","Dopełniacz мн. ч.","глагол в ср. роде ед. ч.","Dwóch studentów czyta. · Trzech panów śpiewało."],
 ["pięciu · sześciu · dziesięciu","Dopełniacz мн. ч.","глагол в ср. роде ед. ч.","Pięciu studentów czekało. · Dwudziestu ludzi przyszło."]
];

const ZBIOR = [
 ["dwoje","двое","dwoje dzieci · dwoje ludzi"],
 ["troje","трое","troje rodzeństwa · troje drzwi"],
 ["czworo","четверо","czworo studentów - смешанная группа студентов"],
 ["pięcioro","пятеро","pięcioro kurcząt"],
 ["oboje","оба (он и она)","oboje rodzice (не «rodziców») · obojga rodziców"],
 ["kilkoro","несколько (о людях)","kilkoro znajomych"]
];

const ULAM = [
 ["1/2","pół · połowa","pół godziny · połowa klasy · o pół roku starszy"],
 ["1/4","ćwierć","ćwierć litra · kwadrans - это четверть часа"],
 ["3/4","trzy czwarte","trzy czwarte szklanki"],
 ["1,5","półtora · półtorej","półtora roku (м. и ср.) · półtorej godziny (ж.)"],
 ["2,5","dwa i pół","dwa i pół tygodnia"]
];
const DZIES = [
 ["0,5","zero przecinek pięć"],
 ["3,14","trzy przecinek czternaście"],
 ["2,75","dwa przecinek siedemdziesiąt pięć"],
 ["1,20 zł","jeden złoty dwadzieścia groszy"],
 ["36,6°","trzydzieści sześć przecinek sześć stopnia"]
];
const PROCENT = [
 ["1%","jeden procent"],
 ["2%","dwa procent"],
 ["5%","pięć procent"],
 ["20%","dwadzieścia procent"],
 ["0,5%","pół procent"],
 ["100%","sto procent"]
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

const CONJ_COORD = [
 ["i","и","Kupiłem chleb i mleko.","без запятой, просто соединяет"],
 ["a","а","On czyta, a ja piszę.","лёгкое противопоставление, с запятой"],
 ["ale","но","Chciałem pójść, ale nie mogłem.","сильное противопоставление, с запятой"],
 ["lub / albo","или","Herbata lub kawa. · Albo ty, albo ja.","albo часто взаимоисключающее"],
 ["ani… ani","ни… ни","Nie mam ani czasu, ani pieniędzy.","двойное отрицание при глаголе сохраняется"],
 ["więc / zatem","поэтому, итак","Spóźniłem się, więc pobiegłem.","следствие"],
 ["dlatego","поэтому","Byłem chory, dlatego nie przyszedłem.","следствие, чуть более книжное чем więc"],
 ["natomiast / jednak","однако, зато","Ja lubię herbatę, natomiast on kawę. · Chciałem wyjść. Zostałem jednak w domu.","оба выражают противопоставление, но не всегда взаимозаменяемы: natomiast сопоставляет элементы, jednak мобильнее в предложении"],
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
 ["усилительные","przecież, ależ, -że, to, nawet","Ależ oczywiście!"],
 ["ограничительные","tylko, jedynie","Mam tylko pięć złotych."],
 ["неопределённые","byle, lada, -kolwiek, -ś","Nie rzucaj byle gdzie."]
];
const PARTPIS = [
 ["слитно","-że, -ż с глаголами и вопросительными","idźże! · chodźże! · dlaczegoż · cóż · któż"],
 ["слитно","by, bym, byś с личной формой глагола","zrobiłbym · chciałabyś · poszliby"],
 ["слитно","закреплённые слова - целиком, а не «союз + by»","gdyby · żeby · aby · choćby · chociażby · czyżby · oby"],
 ["слитно","nie с существительными, прилагательными, наречиями, причастиями","nieprawda · niegrzeczny · niedaleko · niepalący"],
 ["слитно · норма-2026","nie с прилагательным и наречием в любой степени","nielepszy · nienajlepszy · niegorzej · nienajlepiej"],
 ["раздельно","no, czy, niech, oby, bodaj как отдельные слова","Podejdź no tutaj! · Czy wiesz? · Niech wejdzie."],
 ["раздельно","nie с глаголами","nie wiem · nie mam · nie chcę"],
 ["раздельно","nie с числительными и местоимениями","nie pięć · nie ja · nie ten"],
 ["раздельно","by после союза, если сочетание не закреплённое слово","czy by · albo by · to by · jak by"],
 ["раздельно","by с безличными формами","można by · trzeba by · warto by"]
];
const NIEOKR = [
 ["-ś","-то, -нибудь","ktoś · coś · gdzieś · kiedyś · jakiś"],
 ["-kolwiek","-нибудь (любой)","ktokolwiek · cokolwiek · gdziekolwiek · jakikolwiek"],
 ["byle","лишь бы, кое-как","byle kto · byle gdzie · byle jak"],
 ["lada","любой, первый попавшийся","lada dzień · lada chwila · lada kto"],
 ["nie-","ни- / не-","nikt · nic · nigdy · nigdzie · żaden"]
];

const PAN_DEKL = [
 ["Mianownik","pan","pani","państwo","panowie","panie"],
 ["Dopełniacz","pana","pani","państwa","panów","pań"],
 ["Celownik","panu","pani","państwu","panom","paniom"],
 ["Biernik","pana","panią","państwa","panów","panie"],
 ["Narzędnik","panem","panią","państwem","panami","paniami"],
 ["Miejscownik","panu","pani","państwu","panach","paniach"]
];
const PAN_USE = [
 ["Czy pan ma chwilę?","к мужчине","глагол в 3-м лице единственного"],
 ["Czy pani wie, gdzie…?","к женщине","то же"],
 ["Czy państwo są gotowi?","к смешанной группе","3-е лицо множественного, мужско-личное"],
 ["Czy panowie czekają?","к нескольким мужчинам","мужско-личное"],
 ["Czy panie sobie życzą?","к нескольким женщинам","не мужско-личное"],
 ["Państwo Kowalscy byli wczoraj.","супруги Ковальские","мужско-личное согласование"],
 ["Proszę pana! · Proszę pani!","оклик незнакомого","устойчивое обращение, не Wołacz"],
 ["Panie Adamie · Pani Anno","имя после pan / pani","знакомы, но на «вы»"]
];
const NAZW_DEKL = [
 ["Mianownik","Adam Kowalski","Anna Kowalska","Kowalscy"],
 ["Dopełniacz","Adama Kowalskiego","Anny Kowalskiej","Kowalskich"],
 ["Celownik","Adamowi Kowalskiemu","Annie Kowalskiej","Kowalskim"],
 ["Biernik","Adama Kowalskiego","Annę Kowalską","Kowalskich"],
 ["Narzędnik","Adamem Kowalskim","Anną Kowalską","Kowalskimi"],
 ["Miejscownik","Adamie Kowalskim","Annie Kowalskiej","Kowalskich"]
];
const NAZW_TYP = [
 ["-ski · -cki · -dzki","Kowalski","склоняется как прилагательное","Kowalska - тоже как прилагательное","Kowalscy"],
 ["согласная","Nowak","как существительное: Nowaka, Nowakowi, Nowakiem","Nowak - не склоняется вообще","Nowakowie"],
 ["-o","Kościuszko","по женскому образцу: Kościuszki, Kościuszce, Kościuszkę","-","Kościuszkowie"],
 ["-a","Zaręba","по женскому образцу: Zaręby, Zarębie, Zarębę","Zaręba - так же, по женскому","Zarębowie"],
 ["иностранная на согласную","Smith","как польская мужская: Smitha, Smithem","Smith - не склоняется","Smithowie"]
];
const KRAJE = [
 ["Polska","w Polsce","do Polski","Polak","Polka","po polsku"],
 ["Białoruś","w / na Białorusi","do / na Białoruś","Białorusin","Białorusinka","po białorusku"],
 ["Ukraina","w Ukrainie / na Ukrainie","do Ukrainy / na Ukrainę","Ukrainiec","Ukrainka","po ukraińsku"],
 ["Litwa","na Litwie","na Litwę","Litwin","Litwinka","po litewsku"],
 ["Łotwa","na Łotwie","na Łotwę","Łotysz","Łotyszka","po łotewsku"],
 ["Węgry","na Węgrzech","na Węgry","Węgier","Węgierka","po węgiersku"],
 ["Słowacja","na Słowacji","na Słowację","Słowak","Słowaczka","po słowacku"],
 ["Rosja","w Rosji","do Rosji","Rosjanin","Rosjanka","po rosyjsku"],
 ["Niemcy","w Niemczech","do Niemiec","Niemiec","Niemka","po niemiecku"],
 ["Czechy","w Czechach","do Czech","Czech","Czeszka","po czesku"],
 ["Włochy","we Włoszech","do Włoch","Włoch","Włoszka","po włosku"],
 ["Francja","we Francji","do Francji","Francuz","Francuzka","po francusku"],
 ["Anglia","w Anglii","do Anglii","Anglik","Angielka","po angielsku"],
 ["Stany Zjednoczone","w Stanach Zjednoczonych / w Stanach","do Stanów Zjednoczonych / do Stanów","Amerykanin","Amerykanka","po angielsku"]
];
const JEZYK = [
 ["Mówię po polsku.","наречие, не склоняется","как говорю"],
 ["Uczę się polskiego.","Dopełniacz - управление uczyć się","что учу"],
 ["Znam polski.","Biernik - управление znać","чем владею"],
 ["Tłumaczę na polski.","na + Biernik","на какой перевожу"],
 ["z rosyjskiego na polski","z + Dopełniacz, na + Biernik","с какого на какой"],
 ["Jestem Polakiem. · Jestem Polką.","Narzędnik после być","кто я по национальности"]
];
const FEMIN = [
 ["-ka","самый продуктивный, основа не меняется","student → studentka · kelner → kelnerka · dyrektor → dyrektorka · tłumacz → tłumaczka"],
 ["-arz → -arka","у слов на -arz, -erz согласная уходит","lekarz → lekarka · pisarz → pisarka · malarz → malarka · dziennikarz → dziennikarka · kucharz → kucharka"],
 ["-ka, k → cz","только у слов на -nik и -k","prawnik → prawniczka · urzędnik → urzędniczka · rolnik → rolniczka"],
 ["-ka, g → ż","у слов на -log и -g","psycholog → psycholożka · filolog → filolożka · pedagog → pedagożka"],
 ["-ca → -czyni","продуктивно у слов на -ca","sprzedawca → sprzedawczyni · wychowawca → wychowawczyni · twórca → twórczyni"],
 ["-ica · -nica","небольшая группа","pracownik → pracownica · robotnik → robotnica"],
 ["особые формы","вне моделей, запоминать","gospodarz → gospodyni · gość → gościni · król → królowa"],
 ["pani + мужская форма","один из вариантов, особенно в официальном обращении","pani doktor · pani prezes · pani minister · pani inżynier; название профессии после pani не склоняется"]
];

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

const KTO_CO = [
 ["Mianownik","kto","co"],
 ["Dopełniacz","kogo","czego"],
 ["Celownik","komu","czemu"],
 ["Biernik","kogo","co"],
 ["Narzędnik","kim","czym"],
 ["Miejscownik","(o) kim","(o) czym"]
];
const KTO_RODZ = [
 ["kto · co","вопрос","Kogo szukasz? · Czym piszesz? · O czym myślisz?"],
 ["ktoś · coś","кто-то, что-то","kogoś · komuś · kimś || czegoś · czemuś · czymś"],
 ["nikt · nic","никто, ничто","nikogo · nikomu · nikim || niczego · niczemu · niczym"],
 ["ktokolwiek · cokolwiek","кто угодно, что угодно","kogokolwiek · komukolwiek || czegokolwiek · czymkolwiek"],
 ["ten, kto… · to, co…","тот, кто… · то, что…","Ten, kto to zrobił. · Nie wierzę w to, co mówisz."]
];

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

const SIE_POS = [
 ["Jak się nazywasz?","się - после вопросительного слова, перед глаголом","не в начале"],
 ["Nazywam się Jan.","się стоит рядом с глаголом; часто - после него","позиция зависит от всей фразы: Jak się nazywasz?"],
 ["Nie martw się.","się - в конце короткой фразы","после отрицания + глагол"],
 ["Czy podoba ci się ten film?","ci się - нейтральный порядок","się ci возможно при выделении ci"],
 ["Widziałem go wczoraj.","нейтральный порядок","Go widziałem wczoraj - выделяет объект"]
];
const CLITICS = [
 ["się","возвратная частица","Uczę się polskiego."],
 ["mi","мне","Powiedz mi prawdę."],
 ["ci","тебе","Podoba ci się?"],
 ["go","его (Biernik)","Znam go dobrze."],
 ["mu","ему","Pomogę mu jutro."],
 ["jej","ей","Dam jej kwiaty."]
];
const TEMA_REMA = [
 ["Gdzie są klucze?","Klucze są na stole.","na stole - где именно"],
 ["Co jest na stole?","Na stole są klucze.","klucze - что именно"],
 ["Kto kupił bilety?","Bilety kupiła Anna.","Anna - кто именно"]
];
const QVERB_ORDER = [
 ["Ile kosztuje bilet?","нейтрально: вопросительное слово + глагол + подлежащее","Ile bilet kosztuje? возможно, но выделяет bilet"],
 ["Gdzie mieszka twoja siostra?","вопросительное слово + глагол + подлежащее",""],
 ["Kiedy wraca ojciec?","то же самое",""]
];

const IMPERS_MODAL = [
 ["trzeba","надо, нужно","Trzeba iść do lekarza."],
 ["można","можно","Można tu parkować?"],
 ["nie wolno","нельзя, запрещено","Nie wolno tu palić."],
 ["warto","стоит (имеет смысл)","Warto to przeczytać."],
 ["należy","следует (более официально)","Należy wypełnić formularz. Прошедшее - należało, без było."]
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

const PREP_E = [
 ["w","we","we Wrocławiu, we wtorek, we mnie"],
 ["z","ze","ze mną, ze szkoły, ze sobą"],
 ["od","ode","ode mnie"],
 ["przed","przede","przede wszystkim"],
 ["pod","pode","pode mną"]
];

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

const PREP_PRACTICE = [
{
  id:"government", title:"Предлог сразу выбирает падеж",
  lead:"Отработай частые связки как единое целое: do sklepu, u lekarza, bez cukru, przy oknie.",
  tasks:[
    {id:"prepgo-1", prompt:"Idę do ___. (sklep)", answers:["sklepu"], explanation:"Do требует родительного: do sklepu."},
    {id:"prepgo-2", prompt:"Wracam z ___. (Warszawa)", answers:["Warszawy"], explanation:"Z в значении «из» требует родительного: z Warszawy."},
    {id:"prepgo-3", prompt:"Jestem teraz u ___. (lekarz)", answers:["lekarza"], explanation:"U + родительный: u lekarza."},
    {id:"prepgo-4", prompt:"To prezent dla ___. (dziecko)", answers:["dziecka"], explanation:"Dla требует родительного: dla dziecka."},
    {id:"prepgo-5", prompt:"Poproszę kawę bez ___. (cukier)", answers:["cukru"], explanation:"Bez требует родительного: bez cukru."},
    {id:"prepgo-6", prompt:"Stolik stoi przy ___. (okno)", answers:["oknie"], explanation:"Przy требует предложного: przy oknie."},
    {id:"prepgo-7", prompt:"Rozmawiamy o ___. (pogoda)", answers:["pogodzie"], explanation:"O в значении темы требует предложного: o pogodzie."},
    {id:"prepgo-text", prompt:"После рабочего дня", passage:[
      "Wracam ",{key:"a",options:["z","ze","od"],answers:["z"],label:"предлог перед pracy"}," pracy do ",
      {key:"b",answers:["domu"],hint:"dom",label:"форма dom после do"},". Po ",
      {key:"c",answers:["obiedzie"],hint:"obiad",label:"форма obiad после po"}," idę na spacer."
    ], explanation:"Z pracy и do domu требуют родительного; po obiedzie - предложного."}
  ]
},
{
  id:"space", title:"Где или куда",
  lead:"Один предлог меняет падеж вместе со смыслом: положение - предложный или творительный, направление - винительный.",
  tasks:[
    {id:"prepsp-1", prompt:"Jestem na ___. (poczta)", answers:["poczcie"], explanation:"Где? Na + предложный: na poczcie."},
    {id:"prepsp-2", prompt:"Idę na ___. (poczta)", answers:["pocztę"], explanation:"Куда? Na + винительный: na pocztę."},
    {id:"prepsp-3", prompt:"Kot śpi pod ___. (stół)", answers:["stołem"], explanation:"Где? Pod + творительный: pod stołem."},
    {id:"prepsp-4", prompt:"Kot schował się pod ___. (stół)", answers:["stół"], explanation:"Куда? Pod + винительный: pod stół."},
    {id:"prepsp-5", prompt:"Czekam przed ___. (dom)", answers:["domem"], explanation:"Положение перед объектом: przed + творительный."},
    {id:"prepsp-6", prompt:"Wyszedłem przed ___. (dom)", answers:["dom"], explanation:"Движение в пространство перед домом: przed + винительный."},
    {id:"prepsp-7", prompt:"Latem jedziemy w ___. (góry)", answers:["góry"], explanation:"Направление: устойчиво w góry, винительный."},
    {id:"prepsp-text", prompt:"Переставляем вещи", passage:[
      "Klucze leżą na ",{key:"a",answers:["stole"],hint:"stół · где",label:"форма stół после na"},". Kładę telefon na ",
      {key:"b",options:["stole","stół","stołem"],answers:["stół"],label:"форма stół при направлении"},", a krzesło stawiam między ",
      {key:"c",answers:["stołem a oknem"],hint:"stół a okno",label:"формы после między"},"."
    ], explanation:"Na stole - где; na stół - куда; między stołem a oknem - положение, творительный."}
  ]
},
{
  id:"meaning", title:"Одинаковый предлог - разные конструкции",
  lead:"Различай z, o и po по смыслу, а также выбирай формы we, ze, ode, przede и pode там, где без e трудно произнести.",
  tasks:[
    {id:"prepme-1", prompt:"Kawa ___ mlekiem.", options:["z","ze","od"], answers:["z"], explanation:"Z + творительный означает совместность: z mlekiem."},
    {id:"prepme-2", prompt:"Wychodzę ___ domu.", options:["z","ze","od"], answers:["z"], explanation:"Z + родительный означает движение изнутри: z domu."},
    {id:"prepme-3", prompt:"Proszę ___ pomoc.", options:["o","po","za"], answers:["o"], explanation:"Prosić o + винительный: proszę o pomoc."},
    {id:"prepme-4", prompt:"Idę ___ chleb.", options:["o","po","do"], answers:["po"], explanation:"Iść po + винительный означает сходить за чем-то: po chleb."},
    {id:"prepme-5", prompt:"Czekaliśmy ___ godzinę.", options:["przez","od","po"], answers:["przez"], explanation:"Длительность: przez + винительный, przez godzinę."},
    {id:"prepme-6", prompt:"Mieszkam ___ Wrocławiu.", options:["w","we","na"], answers:["we"], explanation:"Перед начальным wr- используется форма we: we Wrocławiu."},
    {id:"prepme-7", prompt:"Chodź ___ mną.", options:["z","ze","ode"], answers:["ze"], explanation:"Перед mną употребляется ze: ze mną."},
    {id:"prepme-text", prompt:"Короткое сообщение", passage:[
      {key:"a",options:["W","We","Na"],answers:["We"],label:"предлог перед wtorek"}," wtorek wracam ze szkoły razem ",
      {key:"b",options:["z","ze","od"],answers:["ze"],label:"предлог перед wszystkimi"}," wszystkimi. To ważne ",
      {key:"c",options:["przed","przede","pode"],answers:["przede"],label:"предлог перед wszystkim"}," wszystkim dla mnie."
    ], explanation:"We wtorek, ze wszystkimi, przede wszystkim - три устойчивых случая беглого e."}
  ]
}
];

const PREP_EXTRA = {
  government:[
    ["Mieszkam niedaleko ___. (park)","parku","Niedaleko требует родительного: parku."],
    ["Spotkajmy się obok ___. (kino)","kina","Obok + родительный: obok kina."],
    ["Nie ma tu nikogo oprócz ___. (ja)","mnie","Oprócz + родительный: oprócz mnie."],
    ["Idę do ___ po receptę. (apteka)","apteki","Do + родительный: do apteki."],
    ["Mieszkamy koło ___. (rzeka)","rzeki","Koło + родительный: koło rzeki."],
    ["Książka leży między ___ a lampą. (komputer)","komputerem","Положение: między + творительный."],
    ["Czekam na ciebie przed ___. (spotkanie)","spotkaniem","Przed здесь означает время: «до встречи» и требует творительного."],
    ["Mówimy o tym po ___. (polski)","polsku","Устойчиво: po polsku."],
    ["Pracuję od ___ do piątku. (poniedziałek)","poniedziałku","Od + родительный: od poniedziałku."],
    ["Dzieci są teraz w ___. (szkoła)","szkole","W + предложный: w szkole."],
    ["Zostaw klucze przy ___. (drzwi)","drzwiach","Przy + предложный множественного: przy drzwiach."],
    ["To informacja według ___. (regulamin)","regulaminu","Według + родительный: według regulaminu."]
  ],
  space:[
    ["Książka leży w ___. (torba)","torbie","Где? W + предложный: w torbie."],
    ["Wkładam książkę w ___. (torba)","torbę","Куда? W + винительный: w torbę."],
    ["Samochód stoi za ___. (sklep)","sklepem","Где? Za + творительный."],
    ["Samochód jedzie za ___. (sklep)","sklep","Куда? Za + винительный."],
    ["Lampa wisi nad ___. (stół)","stołem","Где? Nad + творительный."],
    ["Wieszam lampę nad ___. (stół)","stół","Куда? Nad + винительный."],
    ["Siedzimy między ___ a Anną. (Piotr)","Piotrem","Положение между: творительный."],
    ["Siadam między ___ a Annę. (Piotr)","Piotra","Направление: винительный."],
    ["Jestem w ___. (Warszawa)","Warszawie","Где? W Warszawie."],
    ["Jadę do ___ (Warszawa)","Warszawy","Направление к городу: do Warszawy."],
    ["Dzieci biegają po ___. (park)","parku","По пространству: po + предложный."],
    ["Idziemy na ___. (spacer)","spacer","На прогулку: na + винительный."]
  ],
  meaning:[
    ["Wracam ___ lekarza.","od","От человека: od lekarza."],
    ["Chcę herbatę ___ cytryną.","z","С добавкой: z cytryną."],
    ["Zadzwonię do ciebie ___ obiedzie.","po","После обеда: po obiedzie."],
    ["Czekam ___ autobus już dziesięć minut.","na","Ждать кого/что: czekać na."],
    ["Płacę ___ bilet kartą.","za","Платить за: płacić za."],
    ["Przyjadę ___ godzinę.","za","Через час: za godzinę."],
    ["Mieszkam tu ___ 2020 roku.","od","С 2020 года: od."],
    ["To jest kawa ___ wynos.","na","Кофе с собой: na wynos."],
    ["Idę ___ lekarza, bo jestem chory.","do","К врачу: do lekarza."],
    ["Rozmawialiśmy ___ pracy.","o","О работе: o pracy."],
    ["Jestem gotowy ___ wszystko.","na","Готов к чему: gotowy na + винительный."],
    ["Dziecko stoi ___ mamie.","przy","Рядом с мамой: przy + предложный."]
  ]
};

for(const practice of PREP_PRACTICE){
  PREP_EXTRA[practice.id].forEach(([prompt, answer, explanation], index) => practice.tasks.push({
    id:`prep-${practice.id}-extra-${index + 1}`, prompt, answers:[answer], explanation
  }));
}

const PREP_TEST = {
  title:"Итоговый тест: польские предлоги",
  lead:"Двадцать пять заданий на выбор предлога, падеж после него и различие положения и направления.",
  tasks:[
    {id:"preptest-1", prompt:"Jedziemy do ___. (Kraków)", answers:["Krakowa"], explanation:"Do + родительный: do Krakowa."},
    {id:"preptest-2", prompt:"Wracam z ___. (uniwersytet)", answers:["uniwersytetu"], explanation:"Z в значении «из» + родительный: z uniwersytetu."},
    {id:"preptest-3", prompt:"Mieszkam u ___. (siostra)", answers:["siostry"], explanation:"U + родительный: u siostry."},
    {id:"preptest-4", prompt:"Herbata bez ___. (cytryna)", answers:["cytryny"], explanation:"Bez + родительный: bez cytryny."},
    {id:"preptest-5", prompt:"Spotkajmy się przy ___. (wejście)", answers:["wejściu"], explanation:"Przy + предложный: przy wejściu."},
    {id:"preptest-6", prompt:"Rozmawiamy o ___. (film)", answers:["filmie"], explanation:"Тема разговора: o + предложный, o filmie."},
    {id:"preptest-7", prompt:"Pytam ___ cenę.", options:["o","po","za"], answers:["o"], explanation:"Pytać o + винительный: o cenę."},
    {id:"preptest-8", prompt:"Po ___ odpoczywam. (praca)", answers:["pracy"], explanation:"После чего: po + предложный, po pracy."},
    {id:"preptest-9", prompt:"Idę po ___. (kawa)", answers:["kawę"], explanation:"За чем: po + винительный, po kawę."},
    {id:"preptest-10", prompt:"Dron lata nad ___. (miasto)", answers:["miastem"], explanation:"Где движется? Nad + творительный: nad miastem."},
    {id:"preptest-11", prompt:"Dron wleciał nad ___. (miasto)", answers:["miasto"], explanation:"Куда направился? Nad + винительный: nad miasto."},
    {id:"preptest-12", prompt:"Samochód stoi za ___. (dom)", answers:["domem"], explanation:"Где? Za + творительный: za domem."},
    {id:"preptest-13", prompt:"Jedziemy ___ miasto.", options:["przez","po","od"], answers:["przez"], explanation:"Через пространство: przez + винительный."},
    {id:"preptest-14", prompt:"Pracuję ___ poniedziałku.", options:["od","ode","z"], answers:["od"], explanation:"Перед обычным существительным: od poniedziałku."},
    {id:"preptest-15", prompt:"Dostałem wiadomość ___ niego.", options:["od","ode","z"], answers:["od"], explanation:"Нормально od niego; форма ode нужна прежде всего перед mnie."},
    {id:"preptest-16", prompt:"Ten prezent jest ___ mnie.", options:["dla","do","u"], answers:["dla"], explanation:"Для кого: dla + родительный, dla mnie."},
    {id:"preptest-17", prompt:"Dzięki ___ zdążyliśmy. (ty)", answers:["tobie"], explanation:"Dzięki требует дательного: dzięki tobie."},
    {id:"preptest-18", prompt:"Usiądź między ___ a Piotrem. (Anna)", answers:["Anną"], explanation:"Положение между объектами: między + творительный, między Anną a Piotrem."},
    {id:"preptest-19", prompt:"Wkładam telefon do ___. (torba)", answers:["torby"], explanation:"Do + родительный: do torby."},
    {id:"preptest-20", prompt:"Telefon leży w ___. (torba)", answers:["torbie"], explanation:"W + положение требует предложного: w torbie."},
    {id:"preptest-21", prompt:"Idziemy ___ spacer po pracy.", options:["na","w","do"], answers:["na"], explanation:"На прогулку: iść na spacer."},
    {id:"preptest-22", prompt:"Mieszkam tu ___ pięciu lat.", options:["od","za","przez"], answers:["od"], explanation:"С какого времени: od pięciu lat."},
    {id:"preptest-23", prompt:"Przyjdę ___ dziesięć minut.", options:["za","od","po"], answers:["za"], explanation:"Через десять минут: za dziesięć minut."},
    {id:"preptest-24", prompt:"Rozmawiamy ___ nowym projekcie.", options:["o","na","za"], answers:["o"], explanation:"О теме: o + предложный."},
    {id:"preptest-25", prompt:"Dzieci bawią się przed ___. (dom)", answers:["domem"], explanation:"Положение перед домом: przed + творительный."}
  ]
};
const topicTasks=(prefix,rows)=>rows.map(([prompt,answer,explanation],index)=>({id:`${prefix}-${index+1}`,prompt,answers:[answer],explanation}));
const CONJ_PRACTICE={id:"conjunctions",title:"Практика: союзы",lead:"20 заданий на значение союза, запятую и тип связи.",tasks:[...CONJ_COORD,...CONJ_SUB].slice(0,20).map((item,index)=>({id:`conj-${index+1}`,prompt:`Какой союз выражает значение «${item[1]}»?`,answers:item[0].split(" / "),explanation:item[3]||"Подчинительный союз вводит придаточное; перед ним ставится запятая."}))};
const PART_PRACTICE={id:"particles",title:"Практика: частицы",lead:"20 заданий на смысл и употребление частиц.",tasks:PART.slice(0,20).map((item,index)=>({id:`part-${index+1}`,prompt:`Какая частица выражает «${item[1]}»?`,answers:[item[0]],explanation:`${item[3]} Пример: ${item[2]}`}))};
const ALT_PRACTICE={id:"alternations",title:"Практика: чередования",lead:"20 заданий на узнавание чередований в падежах, множественном числе и глаголах.",tasks:topicTasks("alt",[["komputer → w komputer___","ze","Miejscownik на -e: r → rz."],["apteka → w apte___","ce","K → c перед -e."],["ręka → w rę___","ce","K → c перед -e."],["Polak → Pola___","cy","Мужско-личное множественное: k → c + y."],["student → studen___","ci","T → ci в mianownik множественного."],["brat → bra___","cie","T → ci перед мягким окончанием."],["woda → wo___","dzie","D → dzi перед -e."],["droga → dro___","dze","G → dz перед -e."],["mucha → mu___","sze","Ch → sz перед -e."],["szkoła → szko___","le","Ł → l перед -e."],["stół → sto___","le","Ł → l: stole."],["pisać → pi___","szę","S → sz в форме ja."],["móc → mo___esz","ż","G → ż: możesz."],["brać → bie___esz","rz","Основа bierz-."],["jechać → ja___","dę","Jechać: jadę."],["nieść → nio___ę","s","Niosę: основа nios-."],["róg → ro___u","g","В rogu чередования нет."],["król → kró___","la","Król → króla."],["książka → książ___","ce","K → c: książce."],["lekarz → lekarz___","u","Исторически мягкое rz: lekarzu."]] )};
const PEOPLE_PRACTICE={id:"people",title:"Практика: люди и вежливость",lead:"20 заданий на pan/pani, обращения, фамилии, страны и языки.",tasks:topicTasks("people",[["Czy pan ___ czas? (mieć)","ma","Pan требует 3-го лица."],["Czy pani ___ pomóc? (móc)","może","Pani + 3-е лицо."],["Dziękuję ___ za pomoc. (pan)","panu","Дательный: panu."],["Rozmawiam z ___. (pani)","panią","Творительный: z panią."],["Proszę ___, gdzie jest bank? (pan)","pana","Устойчивая формула: proszę pana."],["Panie ___, mam pytanie. (Adam)","Adamie","Обращение: Adamie."],["Pani ___, zapraszam. (Anna)","Anno","Имя в звательном: Anno."],["Nie ma pana ___. (Kowalski)","Kowalskiego","Мужская фамилия склоняется."],["Dla pani ___ (Nowak)","Nowak","Женская фамилия на согласную не склоняется."],["Państwo Kowalscy ___ gotowi.","są","Państwo вежливо: 3-е лицо множественного."],["Jestem z ___. (Polska)","Polski","Z + родительный: z Polski."],["Mieszkam w ___. (Polska)","Polsce","W + предложный: w Polsce."],["Jadę do ___. (Polska)","Polski","Do + родительный: do Polski."],["Mówię po ___. (polski)","polsku","Po polsku - наречие."],["Uczę się ___. (polski)","polskiego","Uczyć się + родительный."],["Znam ___ język. (polski)","polski","Znać + винительный."],["Ona jest ___. (Polak)","Polką","Женская национальность: Polka в творительном."],["On jest ___. (Niemiec)","Niemcem","Niemiec в творительном: Niemcem."],["W ___ mieszkają moi znajomi. (Niemcy)","Niemczech","W Niemczech."],["Na ___ jest ciepło. (Węgry)","Węgrzech","Na Węgrzech - закрытая норма."]] )};
const ALPHA_PRACTICE={id:"alphabet",title:"Практика: алфавит и произношение",lead:"20 заданий на чтение букв, диграфов и носовых гласных.",tasks:[...ADIAC,...DIGR].map((item,index)=>({id:`alpha-${index+1}`,prompt:`Как читается польское «${item[0]}»?`,answers:[item[1]],explanation:item[3]?`${item[2]}. Пример: ${item[3]}`:`Пример: ${item[2]}`})).concat(topicTasks("alpha-nasal",[["Как реализуются ą/ę перед b, p?","om, em","Перед b, p: om, em."],["Как реализуются ą/ę в конце слова?","ą - носовое; ę - часто теряет носовость","Конец слова: особая позиция."],["Как реализуются ą/ę перед d, t?","on, en","Перед d, t: on, en."]]))};
const DIM_PRACTICE={id:"diminutives",title:"Практика: уменьшительные",lead:"20 заданий на формы и уместность уменьшительных.",tasks:[...DIM_M,...DIM_F,...DIM_N,...DIM_ADJ,...DIM_NAME].slice(0,20).map((item,index)=>({id:`dim-${index+1}`,prompt:`Уменьшительная форма слова «${item[0]}»:`,answers:[item[1].split(" / ")[0]],explanation:`Первая обычная уменьшительная форма: ${item[1]}.`}))};
const BRIDGE_PRACTICE={id:"bridges",title:"Практика: мосты и ложные друзья",lead:"20 заданий на значения похожих польских слов.",get tasks(){return FALSE.slice(0,20).map((item,index)=>({id:`bridge-${index+1}`,prompt:`Что по-польски означает «${item[0]}»?`,answers:[item[1]],explanation:`Не «${item[2]}».`}));}};
const NUM_PRACTICE={id:"numerals",title:"Практика: числительные",lead:"20 заданий на количество, даты и время.",tasks:topicTasks("num",[["dwa ___ (dom)","domy","После dwa: mianownik множественного."],["pięć ___ (dom)","domów","После pięć: dopełniacz множественного."],["dwie ___ (książka)","książki","Женский род после dwie."],["trzy ___ (okno)","okna","После trzy: okna."],["dwanaście ___ (student)","studentów","11–14: родительный множественного."],["dwadzieścia dwa ___ (kot)","koty","Последнее число dwa."],["dwadzieścia pięć ___ (kot)","kotów","Последнее число pięć."],["Ile masz ___? (rok)","lat","Возраст: ile masz lat?"],["Jest godzina ___. (2:00)","druga","Час - порядковое женского рода."],["Spotkajmy się o ___. (3:00)","trzeciej","O której? - o trzeciej."],["Dzisiaj jest ___ maja. (5)","piąty","Дата с jest: piąty maja."],["Urodziłem się ___ maja. (5)","piątego","Когда: piątego maja."],["we ___ (wtorek)","wtorek","Устойчиво: we wtorek."],["w ___ (maj)","maju","W maju."],["___ dzieci bawiło się w ogrodzie. (3)","Troje","Собирательное: troje dzieci."],["pięć ___ (złoty)","złotych","После 5: złotych."],["półtorej ___ (godzina)","godziny","Półtorej для женского рода."],["dwa ___ (procent)","procent","При обозначении процентной величины после числительного: dwa procent, pięć procent."],["Wrócę za ___ (tydzień)","tydzień","За неделю в будущем."],["w ciągu ___ (tydzień)","tygodnia","В течение срока: w ciągu tygodnia."]] )};
const QUESTION_PRACTICE={id:"questions",title:"Практика: вопросы",lead:"20 заданий на вопросительные слова и падежные формы.",tasks:topicTasks("question",[["___ mieszkasz? - W Gdańsku.","Gdzie","Где: gdzie?"],["___ idziesz? - Do sklepu.","Dokąd","Куда: dokąd?"],["___ wracasz? - Z pracy.","Skąd","Откуда: skąd?"],["___ to kosztuje?","Ile","Сколько: ile?"],["___ jesteś smutny?","Dlaczego","Почему: dlaczego?"],["___ jest ten film? - Ciekawy.","Jaki","Качество: jaki?"],["___ z tych filmów wybierasz?","Który","Выбор: który?"],["___ szukasz? (książka)","Czego","Szukać чего: czego?"],["___ pomagasz? (sąsiad)","Komu","Pomagać кому: komu?"],["___ piszesz? (długopis)","Czym","Чем: czym?"],["___ rozmawiasz? (Anna)","Z kim","С кем: z kim?"],["___ czekasz? (autobus)","Na co","Ждать что: na co?"],["___ dzwonisz? (lekarz)","Do kogo","Dzwonić требует do + родительный: do lekarza → do kogo?"],["___ jest ta torba?","Czyja","Чья: czyja?"],["___ wracasz? - Wieczorem.","Kiedy","Когда: kiedy?"],["___ mówisz po polsku? - Dobrze.","Jak","Как: jak?"],["___ to robisz? - Żeby pomóc.","Po co","Зачем: po co?"],["___ dojeżdżasz do szkoły? - Autobusem.","Jak","Как добираешься: jak?"],["___ jest problem? - W tym, że komputer się nie włącza.","W czym","В чём: w czym?"],["___ dni zostało do wakacji?","Ile","Сколько дней: ile dni?"]] )};
const NEG_PRACTICE={id:"negation",title:"Практика: отрицание",lead:"20 заданий на nie, отрицательные местоимения и nie ma.",tasks:topicTasks("neg",[["Nie mam ___. (czas)","czasu","После nie: родительный."],["Nikt nic nie ___. (wiedzieć)","wie","Nie остаётся при глаголе."],["Nigdy tam nie ___. (być, ja)","byłem","Nigdy nie byłem."],["Nie ma ___ w domu. (Anna)","Anny","Nie ma + родительный."],["Anna nie ___ lekarzem.","jest","Nie jest lekarzem."],["Nie widzę żadnego ___. (pies)","psa","Żadnego psa."],["Nie mam ani ___, ani pieniędzy. (czas)","czasu","Ani czasu."],["Nigdzie nie ___ kluczy. (widzieć, ja)","widzę","Nigdzie nie widzę."],["Nie chcę ___. (kawa)","kawy","Nie chcę kawy."],["Czy ktoś dzwoni? - Nie, ___.","nikt","Nikt."],["Nie wiem ___ o tym problemie. (nic)","nic","После wiedzieć употребляется nic: Nie wiem nic o tym problemie."],["On nie ___ w pracy.","jest","Nie jest w pracy."],["W lodówce nie ma ___. (mleko)","mleka","Nie ma mleka."],["Żaden z nich nie ___. (przyjść)","przyszedł","Żaden nie przyszedł."],["Nie mogę znaleźć swoich ___. (okulary)","okularów","Родительный множественного."],["Nikomu nic nie ___. (mówić, ja)","mówię","Nikomu nic nie mówię."],["To nie ___ prawda.","jest","Nie jest prawda."],["Nie słyszę ___ (muzyka)","muzyki","Nie słyszę muzyki."],["Nikt nie ___, gdzie on jest. (wiedzieć)","wie","Nikt nie wie."],["Bez ciebie nie ___. (móc, ja)","mogę","Nie mogę."]] )};
const ORDER_PRACTICE={id:"word-order",title:"Практика: порядок слов",lead:"20 заданий на клитики, się и нейтральный порядок.",tasks:topicTasks("order",[["Jak ___ nazywasz?","się","Się не открывает фразу."],["Czy możesz ___ pomóc? (ja)","mi","Краткая клитика mi."],["Nie martw ___.","się","Nie martw się."],["Powiedz ___ prawdę. (ja)","mi","Powiedz mi."],["Czy podoba ___ się ten film? (ty)","ci","Порядок: ci się."],["Widzę ___ codziennie. (on)","go","Краткая форма: go."],["Idę do ___. (on)","niego","После предлога: niego."],["Mnie to nie ___. (interesować)","interesuje","Полная форма для акцента."],["Gdzie ___ twoja siostra? (mieszkać)","mieszka","Вопросительное слово + глагол."],["Ile ___ bilet? (kosztować)","kosztuje","Ile kosztuje bilet?"],["Klucze są ___ stole. (na)","na","Новый факт: na stole."],["Na stole są ___. (klucze)","klucze","Ответ на «что?» - klucze."],["Czy Anna ___ zna? (ty)","cię","Винительный: cię."],["Nie ___ się tego. (bać, ty)","bój","Nie bój się."],["On ___ dał książkę. (ja)","mi","On mi dał."],["Wczoraj ___ go w kinie. (widzieć, ja)","widziałem","Вчера видел: widziałem."],["Czy ___ to zrobić? (móc, ty)","możesz","Czy możesz…"],["Z kim ___ spotykasz?","się","Spotykać się z kimś: здесь нужна частица się."],["Proszę, ___ mi pomóc.","pomóż","Pomóż mi."],["Dzisiaj ___ do pracy. (iść, ja)","idę","Dzisiaj idę."]] )};
const IMPERS_PRACTICE={id:"impersonal",title:"Практика: безличные конструкции",lead:"20 заданий на trzeba, można, nie wolno, -no/-to и mówi się.",tasks:topicTasks("impers",[["Tu nie ___ palić.","wolno","Прямой запрет: nie wolno."],["Nie ___ wejść, bo drzwi są zamknięte.","można","Нет возможности: nie można."],["___ wypełnić formularz.","Trzeba","Необходимость: trzeba."],["___ to przeczytać.","Warto","Рекомендация: warto."],["W regulaminie: ___ zapłacić do piątku.","należy","Официальная инструкция: należy."],["Wczoraj nie ___ tu parkować.","można było","Прошедшее: nie można było."],["Trzeba ___ wcześniej. (wyjść)","było","Trzeba było wyjść."],["Wczoraj ___ formularz.","wypełniono","Безличное действие: wypełniono."],["Drzwi ___ o ósmej.","otwarto","Форма на -to: otwarto."],["Po polsku ___ się «dzień dobry».","mówi","Mówi się."],["Tu się nie ___. (palić)","pali","Tu się nie pali."],["Nie wolno ___ zdjęć. (robić)","robić","После nie wolno - инфинитив."],["Czy ___ tu usiąść?","można","Можно ли: czy można?"],["___ mi wejść?","Wolno","Можно ли мне: wolno mi?"],["Nie ___ nam rozmawiać głośno.","wolno","Nie wolno nam."],["Wczoraj ___ remont.","wykonano","Wykonano remont."],["Jak ___ dojeżdża na lotnisko?","się","Jak się dojeżdża?"],["___ było spróbować tej zupy.","Warto","Warto było."],["W urzędzie ___ złożyć wniosek online.","można","Возможность: można."],["Nie ___ było wejść po zamknięciu.","wolno","Запрет в прошлом: nie wolno było."]] )};
NEG_PRACTICE.tasks[2] = {id:"neg-3",prompt:"Nigdy tam nie ___. (być, ja, мужчина)",answers:["byłem"],explanation:"Nigdy nie byłem."};
ORDER_PRACTICE.tasks[15] = {id:"order-16",prompt:"Wczoraj ___ go w kinie. (widzieć, ja, мужчина)",answers:["widziałem"],explanation:"Вчера видел: widziałem."};
ORDER_PRACTICE.tasks[18] = {id:"order-19",prompt:"Proszę mi ___.",answers:["pomóc"],explanation:"Вежливая конструкция: proszę mi pomóc."};
NUM_PRACTICE.tasks[17].explanation = "В этой конструкции после dwa: dwa procent. Слово procent в других падежах склоняется: o dwóch procentach.";
NUM_PRACTICE.tasks[18].explanation = "Za tydzień = через неделю. Для срока выполнения употребляют другие конструкции, например w tydzień.";
CONJ_PRACTICE.tasks = topicTasks("conj",[
  ["Kupiłem chleb ___ mleko.","i","Соединяем два предмета: i."],["On czyta, ___ ja piszę.","a","Лёгкое противопоставление: a."],["Chciałem pójść, ___ nie mogłem.","ale","Сильное противопоставление: ale."],["Możesz zamówić herbatę ___ kawę.","lub","Обычный выбор в утверждении: lub."],["Nie mam ani czasu, ___ pieniędzy.","ani","Парная конструкция ani… ani."],["Spóźniłem się, ___ pobiegłem.","więc","Следствие: więc."],["Byłem chory, ___ nie przyszedłem.","dlatego","Следствие в отдельной части: dlatego."],["Ja lubię herbatę, ___ on kawę.","natomiast","Сопоставляем два элемента: natomiast."],["Jest weekend, ___ sobota i niedziela.","czyli","Пояснение другими словами: czyli."],["Zaprosiłem rodzinę ___ przyjaciół.","oraz","Официальнее, чем i: oraz."],["Wiem, ___ przyjdzie.","że","После глагола знания: że."],["Chcę, ___ przyszedł wcześniej.","żeby","Желание / цель: żeby."],["Nie przyszedłem, ___ byłem chory.","ponieważ","Причина в нейтрально-письменном стиле: ponieważ."],["Nie idę, ___ pada deszcz.","bo","Разговорное объяснение причины: bo."],["___ będziesz gotowy, zadzwoń.","jeśli","Реальное условие: jeśli."],["___ miał czas, poszedłby.","Gdyby","Нереальное условие: gdyby."],["Zadzwonię, ___ przyjadę.","gdy","Будущее время в придаточном: gdy."],["Poszedłem, ___ padał deszcz.","chociaż","Уступка: chociaż."],["___ wyjdziesz, zamknij okno.","Zanim","Сначала одно действие, потом другое: zanim."],["___ tu mieszkam, jestem szczęśliwy.","Odkąd","Начальная точка длительного состояния: odkąd."]
]);
PART_PRACTICE.tasks = topicTasks("part",[
  ["___ dobrze, mów.","No","Разговорное «ну»: no."],["___ jesteś głodny?","Czy","Вопрос да/нет: czy."],["___ będzie padać.","Chyba","Неуверенное предположение: chyba."],["___ pójdziemy do kina?","Może","Мягкое предложение: może."],["On ___ śpi.","pewnie","Уверенное предположение: pewnie."],["___ pan wejdzie.","Niech","Вежливое побуждение: niech."],["___ się udało!","Oby","Пожелание: oby."],["___ tylko zdążyć na pociąg!","Żeby","Пожелание / восклицание: żeby."],["___ mówiłem, że będzie trudno.","Przecież","Напоминание собеседнику: przecież."],["- To dokładnie o tym mówiłem. - ___.","Właśnie","Подтверждение «вот именно»: właśnie."],["Jest ___ pięć miejsc, więc wszyscy się zmieścimy.","akurat","Ровно столько, сколько нужно: akurat."],["___ nie wiem, gdzie on jest.","Naprawdę","Усиление искренности: naprawdę."],["Mam ___ pięć złotych.","tylko","Ограничение количества: tylko."],["___ nie wiedziałem o tej zmianie.","Nawet","Усиление: nawet."],["To mi się ___ nie podoba.","wcale","«Совсем не» с nie: wcale."],["Jest ___ piąta, mamy czas.","dopiero","«Только» о времени: dopiero."],["- Czy zgadzasz się? - ___, ale mam pytanie.","Owszem","Вежливое согласие: owszem."],["___ nie! To niemożliwe.","Ależ","Эмоциональное усиление: ależ."],["On ___ się uczy, ale nie widzę efektów.","niby","Сомнение в видимости действия: niby."],["___ nie pójdę dziś na spotkanie.","Raczej","Мягкое «скорее нет»: raczej."]
]);
DIM_PRACTICE.tasks = [
  {id:"dim-1",prompt:"Обычная уменьшительная форма от kot:",options:["kotek","kotunia","kociątko"],answers:["kotek"],explanation:"Обычная уменьшительная форма: kotek."},
  {id:"dim-2",prompt:"Нейтральное уменьшительное от pies:",options:["piesek","piesunia","psiak"],answers:["piesek"],explanation:"Нейтральная уменьшительная форма: piesek."},
  {id:"dim-3",prompt:"Нейтральное уменьшительное от dom:",options:["domek","domunia","domczek"],answers:["domek"],explanation:"Нейтральная уменьшительная форма: domek."},
  {id:"dim-4",prompt:"Нейтральное уменьшительное от książka:",options:["książeczka","książunia","książkaś"],answers:["książeczka"],explanation:"Нейтральная уменьшительная форма: książeczka."},
  {id:"dim-5",prompt:"Нейтральное уменьшительное от kawa:",options:["kawka","kawunia","kawieczka"],answers:["kawka"],explanation:"Kawka - нейтральное уменьшение; kawusia - более ласковое."},
  {id:"dim-6",prompt:"Обычная ласковая форма от mama:",options:["mamusia","mamulka","mamka"],answers:["mamusia"],explanation:"Обычная ласковая форма: mamusia."},
  {id:"dim-7",prompt:"Нейтральное уменьшительное от córka:",options:["córeczka","córunia","córeńka"],answers:["córeczka"],explanation:"Нейтральная уменьшительная форма: córeczka."},
  {id:"dim-8",prompt:"Нейтральное уменьшительное от ręka:",options:["rączka","ręczka","rękusia"],answers:["rączka"],explanation:"Чередование: ręka → rączka."},
  {id:"dim-9",prompt:"Нейтральное уменьшительное от okno:",options:["okienko","oknoś","okieneczko"],answers:["okienko"],explanation:"Нейтральная уменьшительная форма: okienko."},
  {id:"dim-10",prompt:"Нейтральное уменьшительное от mleko:",options:["mleczko","mleczunia","mleczek"],answers:["mleczko"],explanation:"Нейтральная уменьшительная форма: mleczko."},
  {id:"dim-11",prompt:"Обычная уменьшительная форма от słońce:",options:["słoneczko","słońcko","słoneko"],answers:["słoneczko"],explanation:"Słoneczko - обычная уменьшительная форма; słonko тоже живое ласковое слово."},
  {id:"dim-12",prompt:"Нейтральное уменьшительное от jajko:",options:["jajeczko","jajunia","jajoś"],answers:["jajeczko"],explanation:"Нейтральная уменьшительная форма: jajeczko."},
  {id:"dim-13",prompt:"Форма от mały с суффиксом -utki:",options:["malutki","maleńki","małuszek"],answers:["malutki"],explanation:"Форма с суффиксом -utki: malutki. Maleńki - тоже нормальное слово, но образовано иначе."},
  {id:"dim-14",prompt:"Нейтральное уменьшительное от ładny:",options:["ładniutki","ładniuszek","ładnicek"],answers:["ładniutki"],explanation:"Нейтральная уменьшительная форма: ładniutki."},
  {id:"dim-15",prompt:"Нейтральное уменьшительное от cichy:",options:["cichutki","cichuszek","cichyś"],answers:["cichutki"],explanation:"Нейтральная уменьшительная форма: cichutki."},
  {id:"dim-16",prompt:"Нейтральное уменьшительное от słodki:",options:["słodziutki","słodkuszek","słodeczek"],answers:["słodziutki"],explanation:"Нейтральная уменьшительная форма: słodziutki."},
  {id:"dim-17",prompt:"Наиболее нейтральная разговорная форма имени Anna:",options:["Ania","Anusia","Anka"],answers:["Ania"],explanation:"Ania - наиболее нейтральная форма; Anusia и Anka тоже употребляются, но несут другой оттенок."},
  {id:"dim-18",prompt:"Обычная краткая форма имени Piotr:",options:["Piotrek","Piotruś","Piotruń"],answers:["Piotrek"],explanation:"Piotrek - обычная форма; Piotruś - более ласковая."},
  {id:"dim-19",prompt:"Обычная краткая форма имени Katarzyna:",options:["Kasia","Kasieńka","Katarzynka"],answers:["Kasia"],explanation:"Kasia - обычная форма; Kasieńka - более ласковая."},
  {id:"dim-20",prompt:"Обычная краткая форма имени Elżbieta:",options:["Ela","Elunia","Elżbietka"],answers:["Ela"],explanation:"Ela - обычная форма; Elunia - более ласковая."}
];

const PREF_ALL = [
 ["przy-","приближение, прибытие","przyjść · przyjechać","przynieść · przywieźć · przypisać"],
 ["od-","удаление, обратное действие","odejść · odjechać","oddać · odpisać (ответить) · odłożyć"],
 ["do-","достижение цели","dojść · dojechać","dodać · dopłacić · dokończyć"],
 ["w-","внутрь","wejść · wjechać","włożyć · wpisać · wrzucić"],
 ["wy-","наружу; до конца","wyjść · wyjechać","wyjąć · wypić · wypisać · wypełnić"],
 ["prze-","сквозь, через; заново","przejść · przejechać","przeczytać · przepisać · przenieść"],
 ["pod-","под; вплотную","podejść · podjechać","podpisać · podnieść · podać"],
 ["ob- · o-","вокруг, кругом","obejść · objechać","opisać · obejrzeć · owinąć"],
 ["roz- … się","в разные стороны","rozejść się · rozjechać się","rozłożyć · rozpakować · rozdać"],
 ["za-","по пути, ненадолго; начало","zajść · zajechać","zapisać · zamknąć · zacząć"],
 ["po-","начало движения; недолго","pójść · pojechać","poczytać · posiedzieć · pobiegać"],
 ["z- · s-","вниз; до конца","zejść · zjechać","zrobić · zjeść · skończyć · spisać"],
 ["na-","на поверхность; накопление","najechać","napisać · nalać · nasypać · najeść się"],
 ["u-","отделение; завершение","ujść","uciec · ugotować · umyć · uszyć"]
];
const PREF_ASPEKT = [
 ["przyjść","przychodzić","przyjechać","przyjeżdżać"],
 ["wyjść","wychodzić","wyjechać","wyjeżdżać"],
 ["wejść","wchodzić","wjechać","wjeżdżać"],
 ["odejść","odchodzić","odjechać","odjeżdżać"],
 ["dojść","dochodzić","dojechać","dojeżdżać"],
 ["przejść","przechodzić","przejechać","przejeżdżać"]
];
const SKROTY = [
 ["np.","na przykład","например"],
 ["itd.","i tak dalej","и так далее"],
 ["itp.","i tym podobne","и тому подобное"],
 ["m.in.","między innymi","в частности, среди прочего"],
 ["tzn.","to znaczy","то есть"],
 ["tzw.","tak zwany","так называемый"],
 ["ok.","około","около, примерно"],
 ["godz.","godzina","час; часы работы"],
 ["ul. · al. · pl. · os.","ulica · aleja · plac · osiedle","улица, проспект, площадь, микрорайон"],
 ["nr","numer","номер"],
 ["zł · gr","złoty · grosz","злотый, грош"],
 ["szt.","sztuka","штука"],
 ["pn.–pt.","poniedziałek – piątek","пн - пт"],
 ["dot.","dotyczy","касательно"],
 ["ws.","w sprawie","по вопросу"],
 ["ww.","wyżej wymieniony","вышеупомянутый"],
 ["br.","bieżącego roku","текущего года"],
 ["wg","według","согласно"],
 ["ds.","do spraw","по делам - в названиях должностей"],
 ["dr · mgr · inż. · prof.","doktor · magister · inżynier · profesor","учёные степени и титулы"]
];
const MOWA_ZAL = [
 ["«Przyjdę jutro».","Powiedział, że przyjdzie następnego dnia.","будущее осталось будущим; сдвинулось только jutro"],
 ["«Jestem chory».","Powiedział, że jest chory.","настоящее осталось настоящим"],
 ["«Byłem w domu».","Powiedział, że był w domu.","прошедшее осталось прошедшим"],
 ["«Czy masz czas?»","Zapytał, czy mam czas.","вопрос да/нет → czy"],
 ["«Gdzie mieszkasz?»","Zapytał, gdzie mieszkam.","вопросительное слово сохраняется, порядок прямой"],
 ["«Zrób to!»","Powiedział, żebym to zrobił. · Kazał mi to zrobić.","приказ → żeby с личным окончанием или kazać + инфинитив"]
];
const CZAS_WYR = [
 ["za + Biernik","через сколько - в будущем","za godzinę · za tydzień · za dwa lata"],
 ["… temu","сколько назад","godzinę temu · tydzień temu · dwa lata temu"],
 ["przez + Biernik","сколько длилось","przez godzinę · przez cały dzień · przez rok"],
 ["w ciągu + Dopełniacz","за какой срок успею","w ciągu godziny · w ciągu tygodnia"],
 ["od … do … + Dopełniacz","с и до","od poniedziałku do piątku · od dziewiątej do piątej"],
 ["od + Dopełniacz","с какого момента","od rana · od wczoraj · od dwóch lat"],
 ["do + Dopełniacz","до какого момента","do piątku · do końca miesiąca"],
 ["na + Biernik","на какой срок","jadę na tydzień · na chwilę · na zawsze"],
 ["po + Miejscownik","после чего","po pracy · po obiedzie · po wakacjach"],
 ["przed + Narzędnik","перед чем","przed obiadem · przed wyjazdem"],
 ["co + Biernik","каждые","co dzień · co tydzień · co miesiąc · co dwie godziny"],
 ["w + Biernik","в какой день","w poniedziałek · we wtorek · w środę"],
 ["w + Miejscownik","в каком месяце, году","w maju · w tym roku · w 2026 roku"],
 ["o + Miejscownik","во сколько","o piątej · o wpół do ósmej"]
];

const ASPEKT_UWAGI = {
 "znać": "новое состояние: poznać; poznawać - вторичный несовершенный",
 "myśleć": "недолго: pomyśleć",
 "mieszkać": "начало состояния: zamieszkać",
 "lubić": "начало состояния: polubić",
 "kochać": "начало состояния: pokochać",
 "patrzeć": "недолго: popatrzeć",
 "słuchać": "недолго: posłuchać",
 "uczyć się": "результат: nauczyć się",
 "pamiętać": "результат: zapamiętać; zapamiętywać - вторичный несовершенный",
 "siedzieć": "смена состояния: usiąść; siadać - вторичный несовершенный",
 "czekać": "недолго: poczekać",
 "szukać": "результат: znaleźć; znajdować - вторичный несовершенный",
 "rozmawiać": "недолго: porozmawiać",
 "nieść": "результат: zanieść"
};

const WYBOR = [
 ["процесс, «был этим занят»","несов.","Wczoraj czytałem tę książkę."],
 ["результат достигнут","сов.","Wczoraj przeczytałem tę książkę."],
 ["регулярно, повторяется","несов.","Codziennie robię zakupy."],
 ["один раз, целиком","сов.","Dziś zrobiłem zakupy."],
 ["фон, на котором что-то случилось","несов.","Kiedy czytałem, zadzwonił telefon."],
 ["само событие на фоне","сов.","Kiedy czytałem, zadzwonił telefon."],
 ["после chcieć, musieć - процесс","несов.","Chcę czytać. · Muszę robić to codziennie."],
 ["после chcieć, musieć - результат","сов.","Chcę przeczytać. · Muszę zrobić to dziś."],
 ["сколько длилось","несов.","Czytałem przez godzinę."],
 ["за какой срок уложился","сов.","Przeczytałem to w godzinę."],
 ["отрицание общего факта","несов.","Nie czytałem tej książki."],
 ["приказ","сов.","Zrób to!"],
 ["запрет","несов.","Nie rób tego!"]
];
const WYBOR_SLOWA = [
 ["несовершенный тянут","zawsze · często · zwykle · codziennie · długo · przez godzinę · ciągle"],
 ["совершенный тянут","nagle · wreszcie · w końcu · od razu · nareszcie · w godzinę"],
 ["тянут в обе стороны","już · nigdy: Już to zrobiłem - сов., Już czytam - несов., Nigdy tego nie zrobiłem - сов."]
];

const LICZ_GRUPA = [
 ["1","jeden duży dom","Mianownik ед.","jest · był","Jeden duży dom stoi pusty."],
 ["2, 3, 4","dwa duże domy","Mianownik мн.","są · były","Dwa duże domy zostały sprzedane."],
 ["5-9, 0, 11-14","pięć dużych domów","Dopełniacz мн.","jest · było","Pięć dużych domów zostało sprzedanych."],
 ["2-4, мужчины","dwaj dobrzy studenci","Mianownik мн.","czytają · czytali","Dwaj dobrzy studenci czytają."],
 ["2-4, мужчины - вариант","dwóch dobrych studentów","Dopełniacz мн.","czyta · czytało","Dwóch dobrych studentów czyta."],
 ["5+, мужчины","pięciu dobrych studentów","Dopełniacz мн.","czeka · czekało","Pięciu dobrych studentów czekało."]
];

const ROD_PRACTICE = {
  id:"gender", title:"Практика: род существительных", lead:"20 заданий на род, согласование и три типа мужских существительных.",
  tasks:[
    {id:"gender-1",prompt:"___ książka leży na stole.",options:["Ten","Ta","To"],answers:["Ta"],explanation:"Książka - женский род: ta książka."},
    {id:"gender-2",prompt:"___ okno jest otwarte.",options:["Ten","Ta","To"],answers:["To"],explanation:"Okno - средний род: to okno."},
    {id:"gender-3",prompt:"___ telefon jest nowy.",options:["Ten","Ta","To"],answers:["Ten"],explanation:"Telefon - мужской род: ten telefon."},
    {id:"gender-4",prompt:"To jest dobry ___ (kolega).",answers:["kolega"],explanation:"Kolega оканчивается на -a, но обозначает мужчину: dobry kolega."},
    {id:"gender-5",prompt:"___ studenci przyszli pierwsi.",options:["Ci","Te","Tych"],answers:["Ci"],explanation:"Группа мужчин - мужско-личное множественное: ci studenci."},
    {id:"gender-6",prompt:"___ kobiety przyszły pierwsze.",options:["Ci","Te","Tych"],answers:["Te"],explanation:"Группа женщин не является мужско-личной: te kobiety."},
    {id:"gender-7",prompt:"___ psy są bardzo spokojne.",options:["Ci","Te","Tych"],answers:["Te"],explanation:"Животные во множественном - не мужско-личные: te psy."},
    {id:"gender-8",prompt:"Anna i Piotr ___ już w domu.",options:["byli","były","było"],answers:["byli"],explanation:"В смешанной группе есть мужчина, поэтому мужско-личная форма: byli."},
    {id:"gender-9",prompt:"Moje dzieci ___ jeszcze małe.",options:["jest","są","byli"],answers:["są"],explanation:"Dzieci - немужско-личное множественное число: są / były / małe."},
    {id:"gender-10",prompt:"Widzę dobrego ___ (pies).",answers:["psa"],explanation:"Pies - m2: в винительном единственного форма как в родительном, psa."},
    {id:"gender-11",prompt:"Widzę nowy ___ (telefon).",answers:["telefon"],explanation:"Telefon - m3: винительный совпадает с именительным, telefon."},
    {id:"gender-12",prompt:"Widzę nowych ___ (student).",answers:["studentów"],explanation:"Student - m1: винительный множественного совпадает с родительным, studentów."},
    {id:"gender-13",prompt:"Widzę dwa małe ___ (pies).",answers:["psy"],explanation:"Во множественном pies относится к не-мужско-личным: psy."},
    {id:"gender-14",prompt:"___ muzeum jest blisko centrum.",options:["Ten","Ta","To"],answers:["To"],explanation:"Muzeum - средний род, несмотря на окончание -um."},
    {id:"gender-15",prompt:"W muzeum oglądam stare ___.",options:["obrazy","obrazów","obrazami"],answers:["obrazy"],explanation:"Obraz - m3, поэтому винительный множественного совпадает с именительным: obrazy."},
    {id:"gender-16",prompt:"___ mężczyzna czeka przed domem.",options:["Ten","Ta","To"],answers:["Ten"],explanation:"Mężczyzna на -a, но это мужской род: ten mężczyzna."},
    {id:"gender-17",prompt:"Moi rodzice ___ bardzo zmęczeni.",options:["byli","były","było"],answers:["byli"],explanation:"Rodzice - мужско-личное множественное: byli."},
    {id:"gender-18",prompt:"___ drzwi są zamknięte.",options:["Ci","Te","Tych"],answers:["Te"],explanation:"Drzwi существуют только во множественном и не являются мужско-личными: te drzwi."},
    {id:"gender-19",prompt:"Ta metoda jest bardzo ___.",options:["dobry","dobra","dobre"],answers:["dobra"],explanation:"Metoda - женский род: dobra metoda."},
    {id:"gender-20",prompt:"___ problem jest trudny.",options:["Ten","Ta","To"],answers:["Ten"],explanation:"Problem - мужской род: ten problem."}
  ]
};

const ADV_PRACTICE = {
  id:"adverbs", title:"Практика: наречия", lead:"20 заданий на форму наречия, время, место, частотность и сравнение.",
  tasks:[
    {id:"adv-1",prompt:"Mówię po polsku ___. (dobry)",answers:["dobrze"],explanation:"Наречие от dobry - dobrze: говорит как?"},
    {id:"adv-2",prompt:"Pociąg jedzie bardzo ___. (szybki)",answers:["szybko"],explanation:"Наречие от szybki - szybko."},
    {id:"adv-3",prompt:"Dzisiaj pracuję w domu, a ___ idę do biura.",options:["wczoraj","jutro","nigdy"],answers:["jutro"],explanation:"Завтра - jutro."},
    {id:"adv-4",prompt:"___ mieszkasz? - W Warszawie.",options:["Kiedy","Gdzie","Jak"],answers:["Gdzie"],explanation:"О месте спрашиваем gdzie?"},
    {id:"adv-5",prompt:"On mówi ___ niż ja. (cicho)",answers:["ciszej"],explanation:"Сравнительная степень от cicho - ciszej."},
    {id:"adv-6",prompt:"Autobus jest już ___.",options:["blisko","bliski","bliską"],answers:["blisko"],explanation:"Blisko - неизменяемое наречие «близко»."},
    {id:"adv-7",prompt:"W weekend wstaję ___. (późny)",answers:["późno"],explanation:"Наречие от późny - późno."},
    {id:"adv-8",prompt:"Czy możesz mówić trochę ___? (wolno)",answers:["wolniej"],explanation:"Сравнительная степень: wolno → wolniej."},
    {id:"adv-9",prompt:"Zwykle piję kawę ___ rano.",options:["bardzo","już","nigdy"],answers:["bardzo"],explanation:"Bardzo усиливает наречие rano: очень рано."},
    {id:"adv-10",prompt:"Nie mieszkam tutaj; mieszkam ___.",options:["tam","teraz","zawsze"],answers:["tam"],explanation:"Tam - там, противопоставляется tutaj - здесь."},
    {id:"adv-11",prompt:"Ona śpiewa ___. (piękny)",answers:["pięknie"],explanation:"Наречие от piękny - pięknie."},
    {id:"adv-12",prompt:"___ chodzę na basen - dwa razy w tygodniu.",options:["Jak często","Dokąd","Dlaczego"],answers:["Jak często"],explanation:"О частоте спрашиваем jak często?"},
    {id:"adv-13",prompt:"Robię to ___ niż wcześniej. (łatwo)",answers:["łatwiej"],explanation:"Сравнительная степень наречия: łatwo → łatwiej."},
    {id:"adv-14",prompt:"Biegaj ___, bo jest ślisko. (ostrożny)",answers:["ostrożnie"],explanation:"Наречие от ostrożny - ostrożnie."},
    {id:"adv-15",prompt:"On rozumie po polsku ___. (źle)",answers:["źle"],explanation:"Źle - нерегулярное наречие от zły."},
    {id:"adv-16",prompt:"Im wcześniej wyjdziemy, tym ___.",options:["dobrze","lepiej","najlepiej"],answers:["lepiej"],explanation:"В конструкции im…, tym… используются сравнительные формы: tym lepiej."},
    {id:"adv-17",prompt:"Dzieci bawią się ___.",options:["na zewnątrz","zewnętrzne","na zewnętrznym"],answers:["na zewnątrz"],explanation:"На улице: na zewnątrz. В разговоре возможно и одно zewnątrz, но здесь тренируем устойчивое сочетание."},
    {id:"adv-18",prompt:"Proszę, usiądź ___.",options:["tutaj","ten","tej"],answers:["tutaj"],explanation:"Tutaj - здесь; это наречие места."},
    {id:"adv-19",prompt:"W tym sklepie jest ___. (tani)",answers:["taniej"],explanation:"Сравнительная степень наречия: tanio → taniej."},
    {id:"adv-20",prompt:"Wracam do domu ___.",options:["codziennie","codzienny","codzienna"],answers:["codziennie"],explanation:"Codziennie - каждый день, наречие частоты."}
  ]
};

const PRON_PRACTICE = {
  id:"pronouns", title:"Практика: местоимения", lead:"20 заданий на личные, возвратные, указательные и притяжательные местоимения.",
  tasks:[
    {id:"pron-1",prompt:"В нейтральной фразе: Znam Adama. Często ___ widzę.",options:["go","nim","jemu"],answers:["go"],explanation:"Нейтральная безударная форма винительного от on - go; полное jego возможно при контрастном ударении."},
    {id:"pron-2",prompt:"Idę do Adama. Idę do ___.",options:["go","niego","jemu"],answers:["niego"],explanation:"После предлога появляется n-: do niego."},
    {id:"pron-3",prompt:"Daję Ani książkę. Daję ___ książkę.",options:["jej","ją","niej"],answers:["jej"],explanation:"Daję komu? jej - дательный."},
    {id:"pron-4",prompt:"Rozmawiam o Ani. Rozmawiam o ___.",options:["jej","nią","niej"],answers:["niej"],explanation:"После o нужна форма с n-: o niej."},
    {id:"pron-5",prompt:"Нейтрально, без противопоставления: Myję ___.",options:["się","sobie","sobą"],answers:["się"],explanation:"Нейтральная краткая форма: myję się. Полное siebie возможно при противопоставлении: Myję siebie, nie dziecko."},
    {id:"pron-6",prompt:"Nie myśl tylko o ___.",options:["się","siebie","sobą"],answers:["sobie"],explanation:"O + предложный: o sobie."},
    {id:"pron-7",prompt:"To jest ___ książka. (ja)",options:["mój","moja","moje"],answers:["moja"],explanation:"Książka - женского рода: moja książka."},
    {id:"pron-8",prompt:"Нейтрально, без противопоставления: Biorę ___ bilet. (обладатель - я)",options:["mój","swój","jego"],answers:["swój"],explanation:"Когда обладатель совпадает с подлежащим, нейтрально используем swój: biorę swój bilet. Mój возможен при контрасте."},
    {id:"pron-9",prompt:"___ ludzie czekają na autobus.",options:["Ci","Te","Tych"],answers:["Ci"],explanation:"Мужско-личный именительный множественного: ci ludzie."},
    {id:"pron-10",prompt:"Widzę ___ kobietę.",options:["ta","tę","tą"],answers:["tę"],explanation:"Литературная норма винительного женского рода: tę kobietę."},
    {id:"pron-11",prompt:"Nie znam ___ adresu.",options:["ten","tego","tym"],answers:["tego"],explanation:"После отрицания прямое дополнение в родительном: tego adresu."},
    {id:"pron-12",prompt:"Dzwonię do ___ codziennie. (ty)",options:["cię","ciebie","tobą"],answers:["ciebie"],explanation:"Do + родительный: do ciebie."},
    {id:"pron-13",prompt:"Czy mogę z ___ porozmawiać? (pan)",options:["pan","pana","panem"],answers:["panem"],explanation:"Z + творительный: z panem."},
    {id:"pron-14",prompt:"Maria zrobiła to ___.",options:["sam","sama","sobie"],answers:["sama"],explanation:"Maria - женский род: sama, без чужой помощи."},
    {id:"pron-15",prompt:"To nie mój długopis, tylko ___. (ty)",options:["twój","twoje","tobie"],answers:["twój"],explanation:"Długopis - мужской род: twój długopis."},
    {id:"pron-16",prompt:"___ przyszli na spotkanie.",options:["Wszyscy","Wszystkie","Wszystko"],answers:["Wszyscy"],explanation:"Группа мужчин или смешанная группа: wszyscy."},
    {id:"pron-17",prompt:"Nie mam ___ do powiedzenia.",options:["nic","nikt","nigdzie"],answers:["nic"],explanation:"Nic - «ничего», прямое дополнение при отрицании."},
    {id:"pron-18",prompt:"Czy widziałeś ___ wczoraj? (my)",options:["nas","nam","nami"],answers:["nas"],explanation:"Widzieć kogo? nas - винительный."},
    {id:"pron-19",prompt:"To jest dom ___ rodziców.",options:["ich","ichni","nimi"],answers:["ich"],explanation:"Ich - неизменяемое притяжательное местоимение: их родителей."},
    {id:"pron-20",prompt:"Ktoś dzwoni. Czy znasz ___?",options:["go","mu","nim"],answers:["go"],explanation:"Znać kogo? go - винительный без предлога."}
  ]
};

const TABS = [["s-index","Оглавление"],["s-alpha","Алфавит"],["s-rodz","Род"],["s-cases","Существительные"],["s-alt","Чередования"],["s-adj","Прилагательные"],["s-adv","Наречия"],["s-pron","Местоимения"],["s-q","Вопросы"],["s-num","Числительные"],["s-verbs","Глаголы"],["s-vocab","Словарь"],["s-talk","Разговорная практика"],["s-neg","Отрицание"],["s-order","Порядок слов"],["s-impers","Безличные"],["s-conj","Союзы"],["s-part","Частицы"],["s-ludzie","Люди"],["s-dim","Уменьшительные"],["s-preps","Предлоги"],["s-bridge","Мосты"]];

const GROUPS = [
  ["Основы", [
    ["s-alpha","32 буквы, диграфы, носовые, ударение и ассимиляция"],
    ["s-rodz","Три мужских рода, исключения и несклоняемые слова на -um"],
    ["s-alt","Сводная карта ó/o, ą/ę и изменений согласных"],
  ]],
  ["Склонение", [
    ["s-cases","Семь падежей: когда нужен, предлоги, окончания и чередования"],
    ["s-adj","Одна парадигма на прилагательные, притяжательные и указательные"],
    ["s-pron","Личные, притяжательные, возвратные, указательные"],
    ["s-num","Какой падеж требует число и что делает с глаголом"],
  ]],
  ["Глагол", [
    ["s-verbs","Спряжения, времена и вид, причастия и управление слов"],
  ]],
  ["Словарь и речь", [
    ["s-vocab","400 полезных слов: глаголы, существительные, прилагательные и наречия"],
    ["s-talk","Готовые фразы, конструкторы, мини-диалоги и фразы спасения"],
  ]],
  ["Предложение", [
    ["s-q","czy для общего вопроса, вопросительное слово для частного"],
    ["s-neg","Отрицания накапливаются, а не гасят друг друга"],
    ["s-order","Свободный порядок слов, но у клитик жёсткие места"],
    ["s-impers","Язык объявлений, вывесок и учреждений"],
  ]],
  ["Служебные слова", [
    ["s-adv","Образуются от прилагательных списком типовых окончаний"],
    ["s-preps","Один предлог - два падежа: разница обычно «где / куда»"],
    ["s-conj","От них зависит запятая - единственное реальное отличие пунктуации"],
    ["s-part","Без них польский звучит как учебник"],
  ]],
  ["Живая речь", [
    ["s-ludzie","Вежливое «вы» - третье лицо; имена, фамилии, национальности"],
    ["s-dim","Уменьшительные шире, чем в русском: вежливость и тепло"],
    ["s-bridge","Фонетические соответствия, белорусский мост, ложные друзья"],
  ]],
];

const VTABS = [["conj","Спряжения"],["czasy","Времена"],["tryby","Наклонения"],["formy","Причастия и пассив"],["rekcja","Управление"]];

const VOCAB_NOUNS = [
 ["czas","время","m · czasu · czasy","Nie mam dziś dużo czasu."],["dzień","день","m · dnia · dni","To był dobry dzień."],
 ["rok","год","m · roku · lata","W tym roku uczę się polskiego."],["chwila","минута, момент","ż · chwili · chwile","Poczekaj chwilę."],
 ["ranek","утро","m · ranka · ranki","To był spokojny ranek."],["wieczór","вечер","m · wieczoru · wieczory","Wieczorem jestem w domu."],
 ["noc","ночь","ż · nocy · noce","W nocy źle spałem."],["tydzień","неделя","m · tygodnia · tygodnie","Do zobaczenia za tydzień."],
 ["weekend","выходные","m · weekendu · weekendy","Co robisz w weekend?"],["godzina","час","ż · godziny · godziny","Mam godzinę czasu."],
 ["dom","дом","m · domu · domy","Wracam do domu."],["mieszkanie","квартира","n · mieszkania · mieszkania","Mieszkam w małym mieszkaniu."],
 ["pokój","комната","m · pokoju · pokoje","Mój pokój jest jasny."],["miasto","город","n · miasta · miasta","To piękne miasto."],
 ["ulica","улица","ż · ulicy · ulice","Mieszkam na tej ulicy."],["miejsce","место","n · miejsca · miejsca","To dobre miejsce na spotkanie."],
 ["sklep","магазин","m · sklepu · sklepy","Sklep jest blisko domu."],["restauracja","ресторан","ż · restauracji · restauracje","Znam dobrą restaurację."],
 ["kawiarnia","кафе","ż · kawiarni · kawiarnie","Spotkajmy się w kawiarni."],["praca","работа","ż · pracy · prace","Dzisiaj mam dużo pracy."],
 ["szkoła","школа","ż · szkoły · szkoły","Szkoła jest niedaleko."],
 ["uczelnia","вуз, высшее учебное заведение","ż · uczelni · uczelnie","Studiuję na uczelni."],["język","язык","m · języka · języki","Polski jest trudnym językiem."],
 ["słowo","слово","n · słowa · słowa","Nie znam tego słowa."],["pytanie","вопрос","n · pytania · pytania","Mam jedno pytanie."],
 ["odpowiedź","ответ","ż · odpowiedzi · odpowiedzi","Nie znam odpowiedzi."],["problem","проблема","m · problemu · problemy","To nie jest duży problem."],
 ["sprawa","дело, вопрос","ż · sprawy · sprawy","Muszę załatwić tę sprawę."],["pomysł","идея","m · pomysłu · pomysły","To świetny pomysł."],
 ["wiadomość","сообщение, известие","ż · wiadomości · wiadomości","Mam dla ciebie wiadomość."],["rozmowa","разговор","ż · rozmowy · rozmowy","To była miła rozmowa."],
 ["telefon","телефон","m · telefonu · telefony","Gdzie jest mój telefon?"],["internet","интернет","m · internetu · -","Nie mam teraz internetu."],
 ["pieniądze","деньги","pl · pieniędzy · -","Nie mam przy sobie pieniędzy."],["cena","цена","ż · ceny · ceny","Jaka jest cena?"],
 ["bilet","билет","m · biletu · bilety","Poproszę jeden bilet."],["samochód","машина","m · samochodu · samochody","Nie mam samochodu."],
 ["autobus","автобус","m · autobusu · autobusy","Czekam na autobus."],["pociąg","поезд","m · pociągu · pociągi","Pociąg już jedzie."],
 ["droga","дорога, путь","ż · drogi · drogi","To długa droga."],["podróż","поездка, путешествие","ż · podróży · podróże","Podróż była spokojna."],
 ["kawa","кофе","ż · kawy · kawy","Poproszę kawę."],["herbata","чай","ż · herbaty · herbaty","Wolisz kawę czy herbatę?"],
 ["woda","вода","ż · wody · wody","Czy mogę prosić o wodę?"],["jedzenie","еда","n · jedzenia · -","Jedzenie jest gotowe."],
 ["śniadanie","завтрак","n · śniadania · śniadania","Jem śniadanie o ósmej."],["obiad","обед","m · obiadu · obiady","Robimy dziś obiad w domu."],
 ["kolacja","ужин","ż · kolacji · kolacje","Kolacja była bardzo dobra."],["chleb","хлеб","m · chleba · chleby","Kup proszę chleb."],
 ["książka","книга","ż · książki · książki","Czytam ciekawą książkę."],
 ["film","фильм","m · filmu · filmy","Oglądaliśmy dobry film."],["muzyka","музыка","ż · muzyki · -","Lubię tę muzykę."],
 ["zdjęcie","фотография","n · zdjęcia · zdjęcia","Pokaż mi to zdjęcie."],["gra","игра","ż · gry · gry","To moja ulubiona gra."],
 ["firma","компания","ż · firmy · firmy","Pracuję w małej firmie."],["pogoda","погода","ż · pogody · -","Dzisiaj jest piękna pogoda."],
 ["słońce","солнце","n · słońca · -","Dzisiaj świeci słońce."],["deszcz","дождь","m · deszczu · -","Pada deszcz."],
 ["zdrowie","здоровье","n · zdrowia · -","Jak twoje zdrowie?"],["lekarz","врач","m · lekarza · lekarze","Muszę iść do lekarza."],
 ["apteka","аптека","ż · apteki · apteki","Apteka jest obok banku."],["rodzina","семья","ż · rodziny · rodziny","Moja rodzina mieszka daleko."],
 ["mama","мама","ż · mamy · mamy","Dzwonię do mamy."],["tata","папа","m · taty · tatowie","Mój tata pracuje w domu."],
 ["dziecko","ребёнок","n · dziecka · dzieci","Dziecko już śpi."],["syn","сын","m · syna · synowie","Mam jednego syna."],
 ["córka","дочь","ż · córki · córki","Jej córka jest mała."],["brat","брат","m · brata · bracia","Mój brat lubi podróże."],
 ["siostra","сестра","ż · siostry · siostry","Moja siostra mieszka w Warszawie."],["przyjaciel","друг","m · przyjaciela · przyjaciele","Spotykam się z przyjacielem."],
 ["kolega","коллега, приятель","m · kolegi · koledzy","To mój kolega z pracy."],["osoba","человек, персона","ż · osoby · osoby","To bardzo miła osoba."],
 ["pan","господин; вы","m · pana · panowie","Czy pan ma chwilę?"],["pani","госпожа; вы","ż · pani · panie","Czy pani ma chwilę?"],
 ["imię","имя","n · imienia · imiona","Jak masz na imię?"],["numer","номер","m · numeru · numery","Jaki jest twój numer telefonu?"],
 ["Polska","Польша","ż · Polski · -","Mieszkam teraz w Polsce."],
 ["ręka","рука","ż · ręki · ręce","Boli mnie ręka."],
 ["drzwi","дверь, двери","pl · drzwi · -","Drzwi są otwarte."],
 ["koniec","конец","m · końca · końce","To jeszcze nie koniec."],["początek","начало","m · początku · początki","To dopiero początek."],
 ["zmiana","изменение","ż · zmiany · zmiany","Potrzebuję małej zmiany."],["plan","план","m · planu · plany","Jaki masz plan na dziś?"],
 ["decyzja","решение","ż · decyzji · decyzje","Muszę podjąć decyzję."],["pomoc","помощь","ż · pomocy · pomoce","Dziękuję za pomoc."],
 ["głowa","голова","ż · głowy · głowy","Boli mnie głowa."],["stres","стресс","m · stresu · -","Przed rozmową czuję stres."],
 ["sen","сон","m · snu · sny","Potrzebuję więcej snu."],
 ["błąd","ошибка","m · błędu · błędy","To tylko mały błąd."],["przykład","пример","m · przykładu · przykłady","Podaj mi przykład."],
 ["prawda","правда","ż · prawdy · -","To prawda."],["opinia","мнение","ż · opinii · opinie","Jaka jest twoja opinia?"],
 ["powód","причина","m · powodu · powody","Nie znam powodu."],["sposób","способ","m · sposobu · sposoby","To dobry sposób na naukę."],
 ["minuta","минута","ż · minuty · minuty","Poczekaj minutę."],["adres","адрес","m · adresu · adresy","Jaki jest twój adres?"],
 ["klucz","ключ","m · klucza · klucze","Gdzie są moje klucze?"],
 ["nauka","учёба, обучение","ż · nauki · nauki","Nauka języka wymaga czasu."],["spotkanie","встреча","n · spotkania · spotkania","Mam jutro spotkanie."],
 ["wakacje","каникулы, отпуск","pl · wakacji · -","Czekam na wakacje."]
];

const VOCAB_ADJECTIVES = [
 ["dobry","хороший","dobra · dobre · lepszy","To dobry pomysł."],["zły","плохой","zła · złe · gorszy","To nie jest zły dzień."],
 ["duży","большой","duża · duże · większy","To duże miasto."],["mały","маленький","mała · małe · mniejszy","Mam mały problem."],
 ["nowy","новый","nowa · nowe · nowszy","To nowa książka."],["stary","старый","stara · stare · starszy","To stary dom."],
 ["ważny","важный","ważna · ważne · ważniejszy","To ważna sprawa."],["potrzebny","нужный","potrzebna · potrzebne · -","Czy to jest potrzebne?"],
 ["możliwy","возможный","możliwa · możliwe · -","Czy to jest możliwe?"],["łatwy","лёгкий","łatwa · łatwe · łatwiejszy","Polski nie jest łatwy."],
 ["trudny","трудный","trudna · trudne · trudniejszy","To trudne pytanie."],["prosty","простой","prosta · proste · prostszy","To prosty przykład."],
 ["ciekawy","интересный","ciekawa · ciekawe · ciekawszy","To bardzo ciekawy film."],["nudny","скучный","nudna · nudne · nudniejszy","Ten film jest nudny."],
 ["ładny","красивый, милый","ładna · ładne · ładniejszy","To ładne zdjęcie."],["piękny","красивый","piękna · piękne · piękniejszy","Dzisiaj jest piękny dzień."],
 ["miły","приятный, добрый","miła · miłe · milszy","To bardzo miła osoba."],["sympatyczny","симпатичный, приятный","sympatyczna · sympatyczne · -","Mam sympatycznych sąsiadów."],
 ["szczęśliwy","счастливый","szczęśliwa · szczęśliwe · -","Jestem dziś szczęśliwy."],["smutny","грустный","smutna · smutne · smutniejszy","Dlaczego jesteś smutny?"],
 ["zmęczony","уставший","zmęczona · zmęczone · -","Jestem trochę zmęczony."],["zajęty","занятый","zajęta · zajęte · -","Jestem teraz zajęty."],
 ["wolny","свободный","wolna · wolne · wolniejszy","Masz dziś wolny wieczór?"],["gotowy","готовый","gotowa · gotowe · -","Jestem gotowy."],
 ["pewny","уверенный","pewna · pewne · pewniejszy","Nie jestem tego pewny."],["spokojny","спокойный","spokojna · spokojne · spokojniejszy","To spokojne miejsce."],
 ["nerwowy","нервный","nerwowa · nerwowe · -","Przed egzaminem jestem nerwowy."],["zdrowy","здоровый","zdrowa · zdrowe · zdrowszy","Chcę być zdrowy."],
 ["chory","больной","chora · chore · bardziej chory","Dzisiaj jestem chory."],["głodny","голодный","głodna · głodne · -","Jestem już głodny."],
 ["spragniony","хотящий пить","spragniona · spragnione · -","Jestem bardzo spragniony."],["ciepły","тёплый","ciepła · ciepłe · cieplejszy","Herbata jest jeszcze ciepła."],
 ["zimny","холодный","zimna · zimne · zimniejszy","Woda jest zimna."],["gorący","горячий","gorąca · gorące · gorętszy","Kawa jest gorąca."],
 ["szybki","быстрый","szybka · szybkie · szybszy","To szybki pociąg."],["cichy","тихий","cicha · ciche · cichszy","To ciche miejsce."],
 ["bliski","близкий","bliska · bliskie · bliższy","To jest bliski przyjaciel."],["daleki","далёкий","daleka · dalekie · dalszy","To daleka droga."],
 ["drogi","дорогой","droga · drogie · droższy","Ten hotel jest za drogi."],["tani","дешёвый","tania · tanie · tańszy","Szukam taniego biletu."],
 ["bogaty","богатый","bogata · bogate · bogatszy","To bogaty program."],["biedny","бедный","biedna · biedne · biedniejszy","To biedny kraj."],
 ["czysty","чистый","czysta · czyste · czystszy","Pokój jest czysty."],["brudny","грязный","brudna · brudne · brudniejszy","Buty są brudne."],
 ["pełny","полный","pełna · pełne · pełniejszy","Autobus jest pełny."],["pusty","пустой","pusta · puste · pustszy","Kubek jest pusty."],
 ["otwarty","открытый","otwarta · otwarte · -","Sklep jest jeszcze otwarty."],["zamknięty","закрытый","zamknięta · zamknięte · -","Bank jest już zamknięty."],
 ["bezpieczny","безопасный","bezpieczna · bezpieczne · -","To bezpieczne miejsce."],["niebezpieczny","опасный","niebezpieczna · niebezpieczne · -","To może być niebezpieczne."],
 ["prawdziwy","настоящий","prawdziwa · prawdziwe · -","To prawdziwa historia."],["fałszywy","ложный","fałszywa · fałszywe · -","To fałszywa informacja."],
 ["różny","разный","różna · różne · -","Mamy różne opinie."],["taki","такой","taka · takie · -","Nie znam takiego miejsca."],
 ["inny","другой","inna · inne · -","Mam inny plan."],["słodki","сладкий","słodka · słodkie · słodszy","Ta herbata jest za słodka."],
 ["kwaśny","кислый","kwaśna · kwaśne · kwaśniejszy","Ta cytryna jest kwaśna."],["suchy","сухой","sucha · suche · suchszy","Ręcznik jest już suchy."],
 ["ostatni","последний","ostatnia · ostatnie · -","To moje ostatnie pytanie."],["następny","следующий","następna · następne · -","Do zobaczenia w następnym tygodniu."],
 ["cały","целый, весь","cała · całe · -","Pracowałem cały dzień."],["własny","собственный","własna · własne · -","Mam własne zdanie."],
 ["ulubiony","любимый","ulubiona · ulubione · -","To moja ulubiona kawa."],["zwykły","обычный","zwykła · zwykłe · -","To zwykły dzień."],
 ["specjalny","особенный, специальный","specjalna · specjalne · -","To specjalna okazja."],["lokalny","местный","lokalna · lokalne · -","Lubię lokalne jedzenie."],
 ["polski","польский","polska · polskie · -","To polskie słowo."],["rosyjski","русский","rosyjska · rosyjskie · -","Znam język rosyjski."],
 ["młody","молодой","młoda · młode · młodszy","Jest jeszcze młody."],
 ["wysoki","высокий","wysoka · wysokie · wyższy","To wysoki budynek."],["niski","низкий","niska · niskie · niższy","Stół jest niski."],
 ["silny","сильный","silna · silne · silniejszy","To silny wiatr."],["słaby","слабый","słaba · słabe · słabszy","Mój polski jest jeszcze słaby."],
 ["jasny","светлый, ясный","jasna · jasne · jaśniejszy","To jasny pokój."],["ciemny","тёмный","ciemna · ciemne · ciemniejszy","Jest już ciemno."],
 ["czerwony","красный","czerwona · czerwone · -","Mam czerwony plecak."],["zielony","зелёный","zielona · zielone · -","Lubię zieloną herbatę."],
 ["biały","белый","biała · białe · -","Ściany są białe."],["czarny","чёрный","czarna · czarne · -","Mam czarną kawę."],
 ["niebieski","синий","niebieska · niebieskie · -","Niebo jest niebieskie."],["konieczny","необходимый","konieczna · konieczne · -","To jest konieczne."],
 ["poważny","серьёзный","poważna · poważne · -","To poważny problem."],["śmieszny","смешной","śmieszna · śmieszne · -","To śmieszna historia."],
 ["dziwny","странный","dziwna · dziwne · -","To trochę dziwne."],["normalny","нормальный","normalna · normalne · -","To całkiem normalne."],
 ["wspaniały","прекрасный","wspaniała · wspaniałe · -","To wspaniała wiadomość."],["świetny","отличный","świetna · świetne · -","To świetny plan."],
 ["idealny","идеальный","idealna · idealne · -","To idealny moment."],["praktyczny","практичный","praktyczna · praktyczne · -","To praktyczne rozwiązanie."],
 ["wygodny","удобный","wygodna · wygodne · -","To wygodne krzesło."],["tradycyjny","традиционный","tradycyjna · tradycyjne · -","To tradycyjne danie."],
 ["popularny","популярный","popularna · popularne · -","To popularne miejsce."],["nowoczesny","современный","nowoczesna · nowoczesne · -","To nowoczesne miasto."],
 ["znany","известный","znana · znane · -","To znany problem."],["nieznany","незнакомый","nieznana · nieznane · -","To dla mnie nieznane słowo."],
 ["dostępny","доступный","dostępna · dostępne · -","Czy ten termin jest dostępny?"],["zadowolony","довольный","zadowolona · zadowolone · -","Jestem zadowolony z wyniku."],
 ["zaskoczony","удивлённый","zaskoczona · zaskoczone · -","Jestem trochę zaskoczony."],
 ["ostrożny","осторожный","ostrożna · ostrożne · -","Bądź ostrożny."],["uprzejmy","вежливый","uprzejma · uprzejme · -","Pan był bardzo uprzejmy."]
];

const VOCAB_ADVERBS = [
 ["bardzo","очень","-","Bardzo lubię Polskę."],["trochę","немного","-","Mówię trochę po polsku."],
 ["dużo","много","więcej · najwięcej","Mam dziś dużo pracy."],["mało","мало","mniej · najmniej","Mam mało czasu."],
 ["dobrze","хорошо","lepiej · najlepiej","Dzisiaj czuję się dobrze."],["źle","плохо","gorzej · najgorzej","Źle się czuję."],
 ["szybko","быстро","szybciej · najszybciej","Mówisz za szybko."],["wolno","медленно","wolniej · najwolniej","Proszę mówić wolniej."],
 ["łatwo","легко","łatwiej · najłatwiej","Nie jest łatwo."],["trudno","трудно","trudniej · najtrudniej","Trudno mi to powiedzieć."],
 ["ładnie","красиво","ładniej · najładniej","Mówisz bardzo ładnie."],["ciekawie","интересно","ciekawiej · najciekawiej","To brzmi ciekawie."],
 ["dokładnie","точно","dokładniej · najdokładniej","Dokładnie tak."],["normalnie","нормально","normalniej","Dzisiaj pracuję normalnie."],
 ["naprawdę","действительно","-","Naprawdę tak myślę."],["chyba","наверное","-","Chyba masz rację."],
 ["może","может быть","-","Może pójdziemy na kawę?"],["oczywiście","конечно","-","Oczywiście, nie ma problemu."],
 ["pewnie","наверное; конечно","-","Pewnie, pomogę ci."],["właśnie","как раз","-","Właśnie o tym myślałem."],
 ["teraz","сейчас","-","Nie mogę teraz rozmawiać."],["dzisiaj","сегодня","-","Dzisiaj jestem w domu."],
 ["jutro","завтра","-","Zadzwonię jutro."],["wczoraj","вчера","-","Wczoraj było zimno."],
 ["rano","утром","-","Rano uczę się polskiego."],["wieczorem","вечером","-","Wieczorem odpoczywam."],
 ["potem","потом","-","Najpierw praca, potem odpoczynek."],["później","позже","-","Porozmawiamy później."],
 ["wcześniej","раньше","-","Przyszedłem trochę wcześniej."],["zawsze","всегда","-","Zawsze piję kawę rano."],
 ["często","часто","częściej · najczęściej","Często tu przychodzę."],["czasem","иногда","-","Czasem robię błędy."],
 ["nigdy","никогда","-","Nigdy nie jest za późno."],["już","уже","-","Już rozumiem."],
 ["jeszcze","ещё","-","Jeszcze nie wiem."],["znowu","снова","-","Znowu pada deszcz."],
 ["zaraz","сейчас, скоро","-","Zaraz wracam."],["od razu","сразу","-","Nie rozumiem od razu."],
 ["tutaj","здесь","-","Mieszkam tutaj."],["tam","там","-","Tam jest przystanek."],
 ["gdzieś","где-то","-","Muszę gdzieś pójść."],["wszędzie","везде","-","Wszędzie są ludzie."],
 ["blisko","близко","bliżej · najbliżej","Mieszkam blisko centrum."],["daleko","далеко","dalej · najdalej","Czy to jest daleko?"],
 ["na pewno","точно, наверняка","-","Na pewno przyjdę."],
 ["razem","вместе","-","Zrobimy to razem."],["bez problemu","без проблем","-","Mogę to zrobić bez problemu."],
 ["szczególnie","особенно","-","Szczególnie lubię lato."],["głównie","главным образом","-","Uczę się głównie wieczorem."],
 ["na przykład","например","-","Na przykład możemy pójść do kina."],["w końcu","наконец","-","W końcu mam wolny dzień."],
 ["niestety","к сожалению","-","Niestety, nie mogę dziś przyjść."],["na szczęście","к счастью","-","Na szczęście wszystko jest w porządku."],
 ["dlatego","поэтому","-","Jestem zmęczony, dlatego zostaję w domu."],["jednak","однако","-","Chcę iść, jednak nie mam czasu."],
 ["także","также","-","Ja także tak myślę."],["tylko","только","-","Mam tylko jedno pytanie."],
 ["prawie","почти","-","Prawie wszystko rozumiem."],["zwłaszcza","особенно","-","Zwłaszcza rano jest spokojnie."],
 ["zupełnie","совершенно","-","Zupełnie tego nie rozumiem."],
 ["całkiem","вполне","-","Całkiem dobrze mówię po polsku."],["raczej","скорее","-","Raczej nie mam czasu."],
 ["przynajmniej","по крайней мере","-","Przynajmniej próbuję mówić."],["nawet","даже","-","Nawet nie wiedziałem."],
 ["wcale","совсем, вовсе","-","Wcale się nie martw."],
 ["szczerze","честно","szczerzej","Szczerze mówiąc, nie wiem."],["moim zdaniem","по-моему","-","Moim zdaniem to dobry pomysł."],
 ["bezpośrednio","напрямую","-","Powiedz mi to bezpośrednio."],
 ["spokojnie","спокойно","spokojniej","Spokojnie, mamy czas."],["ostrożnie","осторожно","ostrożniej","Jedź ostrożnie."],
 ["głośno","громко","głośniej · najgłośniej","Mów trochę głośniej."],["cicho","тихо","ciszej · najciszej","Proszę mówić ciszej."],
 ["wcześnie","рано","wcześniej · najwcześniej","Wstaję wcześnie."],["późno","поздно","później · najpóźniej","Jest już późno."],
 ["niedawno","недавно","-","Niedawno przyjechałem do Polski."],["dawno","давно","dawniej","Dawno się nie widzieliśmy."],
 ["codziennie","каждый день","-","Codziennie uczę się piętnaście minut."],["regularnie","регулярно","-","Ćwiczę regularnie."],
 ["natychmiast","немедленно","-","Nie musisz odpowiadać natychmiast."],["krótko","кратко","krócej · najkrócej","Powiem krótko."],
 ["jasno","ясно","jaśniej · najjaśniej","Powiedz to jaśniej."],["prosto","просто","prościej · najprościej","Mów prosto."],
 ["inaczej","иначе","-","Można powiedzieć to inaczej."],["podobnie","похоже, аналогично","-","Myślę podobnie."],
 ["nigdzie","нигде","-","Dzisiaj nigdzie nie idę."],
 ["w domu","дома","-","Dzisiaj pracuję w domu."],["na zewnątrz","снаружи","-","Na zewnątrz jest zimno."],
 ["po polsku","по-польски","-","Spróbuję powiedzieć to po polsku."],["po prostu","просто","-","Po prostu nie wiem."],
 ["coraz","всё более","-","Mówię coraz lepiej."],["najpierw","сначала","-","Najpierw chcę posłuchać."],
 ["wtedy","тогда","-","Wtedy wszystko zrozumiałem."],
 ["ostatnio","в последнее время","-","Ostatnio dużo pracuję."],["zazwyczaj","обычно","-","Zazwyczaj jem w domu."],
 ["prawdopodobnie","вероятно","-","Prawdopodobnie przyjdę później."],
 ["również","тоже","-","Ja również chcę iść."],["nadal","всё ещё","-","Nadal uczę się polskiego."],
 ["wystarczająco","достаточно","-","Mówię wystarczająco dobrze."],
 ["najbardziej","больше всего","-","Najbardziej lubię rozmowy."],["mniej więcej","примерно","-","Rozumiem mniej więcej."]
];

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
 miej:`<div class="tip"><b>Во множественном обычно -ach:</b> <span class="pl">o studentach, w książkach, w oknach, o dzieciach</span>. Важные традиционные исключения: <span class="pl">w Niemczech, we Włoszech, na Węgrzech</span>.</div>`,
 "woł":`<div class="tip"><b>Во множественном Wołacz = Mianownik.</b> Отдельной формы нет: <span class="pl">Panowie! · Drodzy państwo! · Kochani!</span></div>`
};

const ADJ_PRACTICE = [
{
  id:"agree", title:"Согласование всей группы",
  lead:"Род, число и падеж выбираются по существительному. В мужско-личном множественном следи ещё и за чередованием основы.",
  tasks:[
    {id:"adjagr-1", prompt:"Widzę ___ kobietę. (miły)", answers:["miłą"], explanation:"Женский винительный: miłą kobietę."},
    {id:"adjagr-2", prompt:"Rozmawiam z ___ lekarzem. (dobry)", answers:["dobrym"], explanation:"Z + творительный: z dobrym lekarzem."},
    {id:"adjagr-3", prompt:"Nie ma ___ samochodu. (nowy)", answers:["nowego"], explanation:"Родительный мужского и среднего рода: nowego samochodu."},
    {id:"adjagr-4", prompt:"Pomagam ___ sąsiadce. (starszy)", answers:["starszej"], explanation:"Дательный женского рода имеет окончание -ej: starszej sąsiadce."},
    {id:"adjagr-5", prompt:"To są ___ studenci. (wysoki)", options:["wysokie","wysocy","wysokich"], answers:["wysocy"], explanation:"Мужско-личный именительный: wysocy studenci, k → c."},
    {id:"adjagr-6", prompt:"___ dzieci bawią się w parku. (mały)", options:["Mali","Małe","Małych"], answers:["Małe"], explanation:"Dzieci относятся к немужско-личному множественному: małe dzieci."},
    {id:"adjagr-7", prompt:"Spotykam się z ___ przyjaciółmi. (polski)", answers:["polskimi"], explanation:"Творительный множественного для всех родов: polskimi przyjaciółmi."},
    {id:"adjagr-text", prompt:"Новое жильё", passage:[
      "W ",{key:"a",answers:["nowym"],hint:"nowy · mieszkanie",label:"форма nowy при mieszkanie"}," mieszkaniu są ",
      {key:"b",options:["biały","białe","białych"],answers:["białe"],label:"форма biały при ściany"}," ściany i duży salon z ",
      {key:"c",answers:["małym"],hint:"mały · balkon",label:"форма mały при balkon"}," balkonem."
    ], explanation:"W nowym mieszkaniu, białe ściany, z małym balkonem - три разных согласования."}
  ]
},
{
  id:"compare", title:"Степени сравнения без кальки",
  lead:"Регулярные суффиксы, чередования, исключения и аналитические формы bardziej / najbardziej.",
  tasks:[
    {id:"adjcmp-1", prompt:"nowy → ___ → najnowszy", answers:["nowszy"], explanation:"Одна согласная в конце основы: nowy → nowszy."},
    {id:"adjcmp-2", prompt:"ładny → ___ → najładniejszy", answers:["ładniejszy"], explanation:"Скопление согласных: суффикс -ejszy, ładniejszy."},
    {id:"adjcmp-3", prompt:"wysoki → ___ → najwyższy", answers:["wyższy"], explanation:"В сравнительной степени -ok- выпадает: wyższy."},
    {id:"adjcmp-4", prompt:"dobry → ___ → najlepszy", options:["dobrzejszy","lepszy","bardziej dobry"], answers:["lepszy"], explanation:"Dobry имеет нерегулярную форму lepszy."},
    {id:"adjcmp-5", prompt:"zły → gorszy → ___", answers:["najgorszy"], explanation:"Превосходная степень - naj- + gorszy: najgorszy."},
    {id:"adjcmp-6", prompt:"Этот доклад интереснее: Ten referat jest ___. (interesujący)", options:["interesująciejszy","bardziej interesujący","więcej interesujący"], answers:["bardziej interesujący"], explanation:"Длинное причастное прилагательное сравнивается аналитически: bardziej interesujący."},
    {id:"adjcmp-7", prompt:"Какое прилагательное обычно не образует степеней сравнения?", options:["ciepły","drewniany","trudny"], answers:["drewniany"], explanation:"Материал - относительный признак; drewniany обычно не сравнивается."},
    {id:"adjcmp-text", prompt:"Выбор гостиницы", passage:[
      "Ten hotel jest ",{key:"a",answers:["tańszy"],hint:"tani",label:"сравнительная степень tani"}," od tamtego, ale tamten jest ",
      {key:"b",options:["komfortowszy","bardziej komfortowy","więcej komfortowy"],answers:["bardziej komfortowy"],label:"сравнительная степень komfortowy"},". Najbliżej centrum leży jednak ",
      {key:"c",answers:["najdroższy"],hint:"drogi",label:"превосходная степень drogi"}," hotel."
    ], explanation:"Tańszy и najdroższy синтетические; в современном нейтральном польском обычно выбирают bardziej komfortowy, а не komfortowszy."}
  ]
},
{
  id:"usage", title:"Форма меняет смысл конструкции",
  lead:"После być, в сравнительных оборотах и в порядке слов прилагательное ведёт себя не так, как подсказывает русский.",
  tasks:[
    {id:"adjuse-1", prompt:"Я устал - Jestem ___. (говорит мужчина)", options:["zmęczony","zmęczonym","zmęczonego"], answers:["zmęczony"], explanation:"Прилагательное без существительного после być остаётся в именительном: zmęczony."},
    {id:"adjuse-2", prompt:"Я хороший врач - Jestem ___. (говорит мужчина)", answers:["dobrym lekarzem"], explanation:"С существительным вся группа ставится в творительный: dobrym lekarzem."},
    {id:"adjuse-3", prompt:"Чёрный кофе: ___", answers:["czarna kawa"], explanation:"Качество ставится перед существительным: czarna kawa."},
    {id:"adjuse-4", prompt:"Растворимый кофе: ___", answers:["kawa rozpuszczalna"], explanation:"В названиях типа или разновидности продукта прилагательное обычно идёт после существительного: kawa rozpuszczalna."},
    {id:"adjuse-5", prompt:"Piotr jest wyższy ___ mnie.", options:["niż","ode","jak"], answers:["ode"], explanation:"Нейтральное устойчивое сочетание - ode mnie. С niż нужна другая конструкция: Piotr jest wyższy niż ja."},
    {id:"adjuse-6", prompt:"У нас одинаковые модели телефонов, но не один аппарат: Mamy ___ telefony.", options:["te same","takie same","tych samych"], answers:["takie same"], explanation:"Takie same - одинаковые; te same - те же самые конкретные предметы."},
    {id:"adjuse-7", prompt:"Исправьте ошибку: Ten telefon jest bardziej lepszy. → Ten telefon jest ___.", answers:["lepszy"], explanation:"Смешивать аналитическую и синтетическую степень нельзя: только lepszy."},
    {id:"adjuse-text", prompt:"Разговор в магазине", passage:[
      "Ta kurtka jest za ",{key:"a",answers:["droga"],hint:"drogi · kurtka",label:"форма drogi при kurtka"},". Czy ma pani ",
      {key:"b",options:["taki sam","taką samą","tę samą"],answers:["taką samą"],label:"форма taki sam при kurtka"},", ale w ",
      {key:"c",answers:["większym"],hint:"duży · сравнительная, rozmiar",label:"форма сравнительной степени duży"}," rozmiarze?"
    ], explanation:"Za droga согласуется с kurtka; taką samą - винительный; większym - предложный от większy."}
  ]
}
];

const ADJ_TEST = {
  title:"Итоговый тест: прилагательные",
  lead:"Восемнадцать заданий на согласование, степени сравнения, порядок слов и сравнительные конструкции.",
  tasks:[
    {id:"adjtest-1", prompt:"Kupuję ___ książkę. (ciekawy)", answers:["ciekawą"], explanation:"Женский винительный: ciekawą książkę."},
    {id:"adjtest-2", prompt:"Rozmawiamy o ___ problemie. (ważny)", answers:["ważnym"], explanation:"O + предложный мужского рода: ważnym problemie."},
    {id:"adjtest-3", prompt:"Nie znam ___ człowieka. (ten)", answers:["tego"], explanation:"Родительный мужского рода: tego człowieka."},
    {id:"adjtest-4", prompt:"To są ___ lekarze. (dobry)", options:["dobre","dobrzy","dobrych"], answers:["dobrzy"], explanation:"Мужско-личный именительный: dobrzy lekarze."},
    {id:"adjtest-5", prompt:"___ psy biegają po parku. (duży)", options:["Duzi","Duże","Dużych"], answers:["Duże"], explanation:"Животные во множественном относятся к немужско-личной группе: duże psy."},
    {id:"adjtest-6", prompt:"Idę z ___ koleżankami. (nowy)", answers:["nowymi"], explanation:"Творительный множественного: nowymi koleżankami."},
    {id:"adjtest-7", prompt:"młody → ___ → najmłodszy", answers:["młodszy"], explanation:"Регулярная сравнительная степень: młodszy."},
    {id:"adjtest-8", prompt:"niski → ___ → najniższy", answers:["niższy"], explanation:"-isk- сокращается и меняется: niski → niższy."},
    {id:"adjtest-9", prompt:"mały → mniejszy → ___", answers:["najmniejszy"], explanation:"Превосходная: najmniejszy."},
    {id:"adjtest-10", prompt:"Это объяснение понятнее: To wyjaśnienie jest ___. (zrozumiały)", options:["zrozumialsze","bardziej zrozumiałe","więcej zrozumiałe"], answers:["zrozumialsze","bardziej zrozumiałe"], explanation:"Оба варианта корректны: zrozumialsze - синтетическая сравнительная форма, bardziej zrozumiałe - аналитическая."},
    {id:"adjtest-11", prompt:"Jestem ___. (gotowy, говорит женщина)", answers:["gotowa"], explanation:"После być без существительного остаётся именительный: gotowa."},
    {id:"adjtest-12", prompt:"Anna jest ___. (dobry nauczyciel)", answers:["dobrą nauczycielką"], explanation:"Существительное после być требует творительного всей группы."},
    {id:"adjtest-13", prompt:"Польский язык: ___", answers:["język polski"], explanation:"Названия языков обычно строятся как język + прилагательное: język polski."},
    {id:"adjtest-14", prompt:"Тёплый вечер: ___", answers:["ciepły wieczór"], explanation:"Обычное качество ставится перед существительным."},
    {id:"adjtest-15", prompt:"Maria jest młodsza ___ Anna.", options:["od","niż","jak"], answers:["niż"], explanation:"Niż вводит полную параллельную конструкцию: młodsza niż Anna."},
    {id:"adjtest-16", prompt:"Im wcześniej, tym ___.", options:["dobrze","lepiej","najlepiej"], answers:["lepiej"], explanation:"Im…, tym… требует сравнительной степени в обеих частях."},
    {id:"adjtest-17", prompt:"Robi się coraz ___. (zimno)", answers:["zimniej"], explanation:"Coraz требует сравнительной степени: coraz zimniej."},
    {id:"adjtest-18", prompt:"Исправьте: To jest bardziej tańsze. → To jest ___.", answers:["tańsze"], explanation:"Нельзя соединять bardziej с синтетической формой tańsze."}
  ]
};

const ADJ = [
 ["Mianownik","dobry","dobra","dobre","dobrzy","dobre"],
 ["Dopełniacz","dobrego","dobrej","dobrego","dobrych","dobrych"],
 ["Celownik","dobremu","dobrej","dobremu","dobrym","dobrym"],
 ["Biernik","dobry / dobrego","dobrą","dobre","dobrych","dobre"],
 ["Narzędnik","dobrym","dobrą","dobrym","dobrymi","dobrymi"],
 ["Miejscownik","dobrym","dobrej","dobrym","dobrych","dobrych"]
];

const STOPN = [
 ["-szy","на конце основы одна согласная","nowy → nowszy · stary → starszy · młody → młodszy · gruby → grubszy · twardy → twardszy · głupi → głupszy · ciekawy → ciekawszy"],
 ["-ejszy","на конце основы скопление согласных","ładny → ładniejszy · trudny → trudniejszy · zimny → zimniejszy · łatwy → łatwiejszy · piękny → piękniejszy · mądry → mądrzejszy"],
 ["-k- · -ek- · -ok- выпадает","прилагательные на -ki, -eki, -oki","wysoki → wyższy · niski → niższy · bliski → bliższy · daleki → dalszy · szeroki → szerszy · krótki → krótszy · ciężki → cięższy · głęboki → głębszy"]
];
const STOPN_ALT = [
 ["n → ń","tani → tańszy"],
 ["ł → l","miły → milszy · biały → bielszy · wesoły → weselszy · ciepły → cieplejszy"],
 ["g → ż","drogi → droższy · długi → dłuższy · ubogi → uboższy"],
 ["ą → ę","wąski → węższy"],
 ["r → rz","mądry → mądrzejszy · ostry → ostrzejszy"]
];
const STOPN_IRR = [
 ["dobry","lepszy","najlepszy"],
 ["zły","gorszy","najgorszy"],
 ["duży / wielki","większy","największy"],
 ["mały","mniejszy","najmniejszy"],
 ["lekki","lżejszy","najlżejszy"],
 ["gorący","gorętszy","najgorętszy"]
];
const POROWN = [
 ["niż + падеж по роли","чем - падеж от того, чем было бы слово в полной фразе","Jest wyższy niż ja [jestem]. · Lubię Annę bardziej niż Marię [lubię]."],
 ["od + Dopełniacz","чем - то же значение","Jest wyższy ode mnie."],
 ["tak … jak","такой же … как","Jest tak wysoki jak ja."],
 ["nie tak … jak","не такой … как","Nie jest tak drogi jak tamten."],
 ["taki sam jak","такой же, как","Mam taki sam telefon jak ty."],
 ["ten sam","тот же самый","Mieszkamy w tym samym domu."],
 ["o wiele · dużo · znacznie","намного","o wiele lepszy · dużo taniej"],
 ["trochę · nieco","немного","trochę większy · nieco później"],
 ["coraz + сравнительная","всё … и …","Jest coraz zimniej. · Coraz więcej ludzi."],
 ["im …, tym …","чем …, тем …","Im szybciej, tym lepiej."],
 ["jak naj- + сравнительная","как можно …","jak najszybciej · jak najlepiej"],
 ["za · zbyt","слишком","Za drogo. · Zbyt trudne."],
 ["dość · wystarczająco","достаточно","dość ciepło · wystarczająco duży"],
 ["ze wszystkich · w …","самый из / в","najlepszy ze wszystkich · najstarszy w rodzinie"]
];

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

const SIEBIE = [
 ["Mianownik","-","формы нет: возвратное не бывает подлежащим"],
 ["Dopełniacz","siebie / się","Nie lubię siebie na zdjęciach. · Boję się."],
 ["Celownik","sobie","Kup sobie kawę."],
 ["Biernik","siebie / się","Widzę siebie w lustrze. · Myję się."],
 ["Narzędnik","sobą","Weź parasol ze sobą."],
 ["Miejscownik","(o) sobie","Opowiedz o sobie."]
];
const SIEBIE_PHR = [
 ["u siebie","у себя, дома","Jestem u siebie."],
 ["do siebie","к себе","Wracam do siebie."],
 ["po sobie","за собой","Posprzątaj po sobie."],
 ["przy sobie","при себе","Nie mam przy sobie dokumentów."],
 ["ze sobą","с собой","Weź to ze sobą."],
 ["dla siebie","для себя","Kupiłem to dla siebie."],
 ["między sobą","между собой","Rozmawiają między sobą."],
 ["sam ze sobą","сам с собой","Mówi sam ze sobą."],
 ["być sobą","быть собой","Po prostu bądź sobą."],
 ["nawzajem","взаимно, и вам того же","- Wesołych świąt! - Nawzajem!"]
];
const SOBIE_V = [
 ["radzić sobie","справляться","Jak sobie radzisz? · Dam sobie radę."],
 ["wyobrazić sobie","представить","Wyobraź sobie!"],
 ["przypomnieć sobie","вспомнить","Nie mogę sobie przypomnieć."],
 ["zdawać sobie sprawę","отдавать себе отчёт","Zdaję sobie sprawę, że to trudne."],
 ["życzyć sobie","желать","Czego pan sobie życzy?"],
 ["pozwolić sobie","позволить себе","Nie mogę sobie na to pozwolić."],
 ["robić sobie","делать себе","Robię sobie kawę."],
 ["iść sobie","уйти","Idź sobie!"]
];
const SAM = [
 ["Mianownik","sam","sama","samo","sami","same"],
 ["Dopełniacz","samego","samej","samego","samych","samych"],
 ["Celownik","samemu","samej","samemu","samym","samym"],
 ["Biernik","sam / samego","samą","samo","samych","same"],
 ["Narzędnik","samym","samą","samym","samymi","samymi"],
 ["Miejscownik","samym","samej","samym","samych","samych"]
];

const SIE_FUNC = [
 ["возвратность","myję się · ubieram się · czeszę się","действие на самого себя; можно подставить siebie: myję siebie"],
 ["взаимность","spotykamy się · znamy się · kochają się","друг друга; можно добавить nawzajem: znamy się nawzajem"],
 ["часть глагола","boję się · śmieję się · starać się · podoba mi się","без się глагола просто не существует: формы bać, śmiać, starać нет"],
 ["безличность","mówi się · tu się nie pali · jak to się robi","подлежащего нет вообще - вкладка «Безличные»"]
];
const TAMTEN = [
 ["муж.","ten","tamten","taki"],
 ["жен.","ta","tamta","taka"],
 ["ср.","to","tamto","takie"],
 ["мн. мужчины","ci","tamci","tacy"],
 ["мн. остальное","te","tamte","takie"]
];
const WSZ = [
 ["Mianownik","wszyscy","wszystkie","wszystko"],
 ["Dopełniacz","wszystkich","wszystkich","wszystkiego"],
 ["Celownik","wszystkim","wszystkim","wszystkiemu"],
 ["Biernik","wszystkich","wszystkie","wszystko"],
 ["Narzędnik","wszystkimi","wszystkimi","wszystkim"],
 ["Miejscownik","wszystkich","wszystkich","wszystkim"]
];
const WSZ_PHR = [
 ["Wszystkiego najlepszego!","Всего наилучшего!","Dopełniacz - стандартное поздравление"],
 ["Przede wszystkim","прежде всего","przed + Narzędnik, с беглым e"],
 ["Po wszystkim.","Всё кончено.","Miejscownik"],
 ["Ze wszystkich stron","со всех сторон","Dopełniacz мн. ч."],
 ["Dziękuję wszystkim.","Спасибо всем.","Celownik"],
 ["Wszyscy przyszli.","Все пришли.","мужско-личное - о людях"],
 ["Wszystkie bilety sprzedane.","Все билеты проданы.","не-мужско-личное - о вещах"],
 ["To wszystko.","Это всё.","в магазине - «больше ничего»"]
];
const OKRESL = [
 ["każdy / każda / każde","каждый","склоняется как прилагательное, множественного числа нет - вместо него wszyscy: Każdy z nas. · Każdego dnia."],
 ["inny / inna / inne","другой","Daj mi inny. · innym razem - в другой раз"],
 ["żaden / żadna / żadne","никакой","обычно требует nie при глаголе: Żaden z nich nie przyszedł. Но после bez, pod, przed обходится без него: bez żadnego problemu, pod żadnym pozorem."],
 ["obaj · oba · obie · oboje","оба, обе","obaj / obydwaj panowie (мужчины) · oba domy (вещи) · obie książki (женский) · oboje rodzice (он и она). Косвенные падежи общие: obu / obydwu, obiema."]
];

const PHON = [
 ["-оро-, -оло-, -ере-","-ro-, -ło-, -rze-","корова → krowa, золото → złoto, берег → brzeg, голова → głowa"],
 ["у, я (из носовых)","ą, ę","рука → ręka, зуб → ząb, пять → pięć, мука → mąka"],
 ["ё, е","io / ió, ie","мёд → miód, лёд → lód, несёт → niesie"],
 ["-ть","-ć","быть → być, читать → czytać"],
 ["х","ch","хлеб → chleb, ухо → ucho"],
 ["ц, ч","c, cz","цена → cena, час → czas"]
];
const FALSE = [

 ["sklep","магазин","склеп - grobowiec / krypta","Быт, вещи и еда"],
 ["magazyn","склад; журнал, телепередача","магазин - sklep","Быт, вещи и еда"],
 ["dywan","ковёр","диван - kanapa","Быт, вещи и еда"],
 ["lustro","зеркало","люстра - żyrandol","Быт, вещи и еда"],
 ["puszka","банка, жестянка","пушка - armata / działo","Быт, вещи и еда"],
 ["stół","стол","стул - krzesło","Быт, вещи и еда"],
 ["krzesło","стул","кресло - fotel","Быт, вещи и еда"],
 ["kubek","кружка","кубок - puchar","Быт, вещи и еда"],
 ["szklanka","стакан","склянка, бутылка - butelka","Быт, вещи и еда"],
 ["teczka","папка, портфель","течка - ruja","Быт, вещи и еда"],
 ["portfel","кошелёк","портфель - teczka / aktówka","Быт, вещи и еда"],
 ["garnitur","костюм","гарнитур, набор - zestaw","Быт, вещи и еда"],
 ["podłoga","пол","подлог - fałszerstwo","Быт, вещи и еда"],
 ["płot","забор","плот - tratwa","Быт, вещи и еда"],
 ["pierogi","вареники, пельмени","печёные пироги - placki / ciasta","Быт, вещи и еда"],
 ["dynia","тыква","дыня - melon","Быт, вещи и еда"],
 ["owoce","фрукты","овощи - warzywa","Быт, вещи и еда"],
 ["żaba","лягушка","жаба - ropucha","Быт, вещи и еда"],
 ["recepta","рецепт врача","кулинарный рецепт - przepis","Быт, вещи и еда"],
 ["przepis","правило; рецепт блюда","рецепт врача - recepta","Быт, вещи и еда"],

 ["rano","утром","рано - wcześnie","Время и пространство"],
 ["jutro","завтра","утро - rano / poranek","Время и пространство"],
 ["czas","время","час - godzina","Время и пространство"],
 ["niedziela","воскресенье","неделя - tydzień","Время и пространство"],
 ["czasem","иногда","часами - godzinami","Время и пространство"],
 ["nigdy","никогда","нигде - nigdzie","Время и пространство"],
 ["wcześnie","рано","вечно - wiecznie","Время и пространство"],
 ["północ","север; полночь","только полночь","Время и пространство"],
 ["południe","юг; полдень","только полдень","Время и пространство"],
 ["rok","год","рок, судьба - los","Время и пространство"],
 ["kraj","страна","край - skraj / region","Время и пространство"],
 ["miasto","город","место - miejsce","Время и пространство"],
 ["dworzec","вокзал","дворец - pałac","Время и пространство"],
 ["pokój","комната; мир","только покой - spokój","Время и пространство"],
 ["ogród","сад","огород - ogród warzywny / warzywnik","Время и пространство"],

 ["uroda","красота, внешность","урод - potwór","Люди и качества"],
 ["grzeczny","вежливый, послушный","грешный - grzeszny","Люди и качества"],
 ["gruby","толстый, большой по толщине","грубый - niegrzeczny / szorstki","Люди и качества"],
 ["wygodny","удобный","выгодный - opłacalny","Люди и качества"],
 ["ordynarny","хамский, вульгарный","обычный - zwyczajny","Люди и качества"],
 ["nagły","внезапный","наглый - bezczelny","Люди и качества"],
 ["dziwny","странный","дивный, прекрасный - cudowny","Люди и качества"],
 ["smutny","грустный","смутный, неясный - niejasny","Люди и качества"],
 ["bezpieczny","безопасный","беспечный - beztroski","Люди и качества"],
 ["przykry","неприятный, печальный","прикрытый - przykryty","Люди и качества"],
 ["pilny","старательный; срочный","пыльный - zakurzony","Люди и качества"],
 ["przystojny","красивый, статный","пристойный - przyzwoity","Люди и качества"],
 ["chytry","хитрый; жадный","просто сообразительный - sprytny","Люди и качества"],
 ["przyjaciel","близкий друг","просто приятель, знакомый - kolega / znajomy","Люди и качества"],
 ["sławny","знаменитый","славный, милый - miły","Люди и качества"],
 ["prezydent","президент; мэр крупного города","только глава государства","Люди и качества"],
 ["obywatel","гражданин","обыватель - filister / laik","Люди и качества"],
 ["poseł","депутат; посланник","посол - ambasador","Люди и качества"],
 ["rodzina","семья","родина - ojczyzna","Люди и качества"],
 ["chłop","крестьянин; разг. мужик","холоп, раб - niewolnik","Люди и качества"],

 ["zapominać / zapomnieć","забывать / забыть","запоминать - zapamiętywać","Действия"],
 ["pytać","спрашивать","пытать - torturować","Действия"],
 ["pukać","стучать","пукать - puszczać bąki","Действия"],
 ["uważać","считать, полагать; беречься","уважать - szanować","Действия"],
 ["liczyć","считать; рассчитывать","лечить - leczyć","Действия"],
 ["leczyć","лечить","считать - liczyć","Действия"],
 ["sprzątać","убирать, наводить порядок","спрятать - schować","Действия"],
 ["ubrać (się)","одеть(ся)","убрать, удалить - posprzątać / usunąć","Действия"],
 ["naprawić","починить, исправить","направить, послать - skierować","Действия"],
 ["gadać","разговаривать, болтать","гадать - zgadywać / wróżyć","Действия"],
 ["mylić (się)","путать(ся), ошибаться","мылить - mydlić","Действия"],
 ["kurzyć","пылить","курить - palić","Действия"],
 ["zabić","убить","забить гвоздь / гол - wbić / strzelić","Действия"],
 ["pożyczyć","одолжить или взять взаймы","пожить - pomieszkać","Действия"],
 ["zapraszać","приглашать","спрашивать - pytać","Действия"],
 ["skazać","приговорить, осудить","сказать - powiedzieć","Действия"],
 ["oszukać","обмануть","обыскать - przeszukać","Действия"],
 ["ruszać","двигать(ся), трогаться","рушить, разрушать - burzyć","Действия"],
 ["podróżować","путешествовать","подружиться - zaprzyjaźnić się","Действия"],
 ["zawracać","разворачивать(ся); надоедать","заворачивать, оборачивать - owijać","Действия"],

 ["urząd","учреждение, ведомство","урод - potwór","Учёба, работа и другие ловушки"],
 ["zawód","профессия; разочарование","завод - fabryka","Учёба, работа и другие ловушки"],
 ["pensja","зарплата","пенсия - emerytura","Учёба, работа и другие ловушки"],
 ["awans","повышение по службе","аванс - zaliczka","Учёба, работа и другие ловушки"],
 ["zakaz","запрет","заказ - zamówienie","Учёба, работа и другие ловушки"],
 ["uwaga","внимание; замечание","уважение - szacunek","Учёба, работа и другие ловушки"],
 ["sprawa","дело, вопрос","справа - po prawej stronie / z prawej strony","Учёба, работа и другие ловушки"],
 ["rzecz","вещь; дело","речь - mowa","Учёба, работа и другие ловушки"],
 ["zdanie","предложение; мнение","здание - budynek","Учёба, работа и другие ловушки"],
 ["przykład","пример","приклад ружья - kolba","Учёба, работа и другие ловушки"],
 ["przypadek","случай; падеж","припадок - napad","Учёба, работа и другие ловушки"],
 ["mandat","штраф; мандат","только мандат","Учёба, работа и другие ловушки"],
 ["delegacja","командировка; делегация","только делегация","Учёба, работа и другие ловушки"],
 ["dieta","диета; суточные","только диета","Учёба, работа и другие ловушки"],
 ["nałóg","зависимость, порок","налог - podatek","Учёба, работа и другие ловушки"],
 ["brak","отсутствие, нехватка","брак - małżeństwo; wada","Учёба, работа и другие ловушки"],
 ["list","письмо","лист - liść / kartka","Учёба, работа и другие ловушки"],
 ["rozprawa","судебное заседание; диссертация","расправа - samosąd","Учёба, работа и другие ловушки"],
 ["żałoba","траур","жалоба - skarga","Учёба, работа и другие ловушки"],
 ["czaszka","череп","чашка - filiżanka","Учёба, работа и другие ловушки"],
 ["akademik","студенческое общежитие","академик - członek akademii","Учёба, работа и другие ловушки"],
 ["bielizna","нижнее или постельное бельё","белизна - biel","Учёба, работа и другие ловушки"],
 ["cera","кожа, цвет лица","сера - siarka","Учёба, работа и другие ловушки"],
 ["strych","чердак","стричь - strzyc","Учёба, работа и другие ловушки"],
 ["działka","участок, дача","сделка - transakcja","Учёба, работа и другие ловушки"]
];
