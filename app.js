/* Leerhoek — study platform for a family circle, Grades 1–12 as content grows (Afrikaans / English)
   Single-page app. Content is loaded from content/index.json → content/gr7/*.json (or window.CONTENT_BUNDLE for the offline copy).
   Progress is stored in the artifact's shared db when the viewer is signed in with write access, otherwise in localStorage. */
(() => {
'use strict';

/* ------------------------------------------------------------------ i18n */
const UI = {
  af: {
    nextExam: 'Volgende eksamen', weekXpShort: 'XP hierdie week', chestSub: 'Doen 3 toetse vandag om die skatkis oop te sluit.',
    coachHelloText: 'Hallo {name}! 👋 Ek is jou **Leerhoek-afrigter**. Tik jou vraag oor jou skoolwerk – of tik die vraag uit jou boek of vraestel oor. Ek help jou om dit **self** uit te werk, met verduidelikings en wenke, nie klaar antwoorde nie. 💪', coachCtaText: 'Sukkel jy met iets? Tik jou vraag – die afrigter help jou om dit self te verstaan.', coachPhotosL: 'Laat foto’s toe (die seuns kan ’n foto van hul werk stuur)',
    coachT: 'Leerhoek-afrigter', coachCta: 'Neem ’n foto van ’n vraag of jou werk – die afrigter help jou om dit self te verstaan.', coachAsk: 'Verstaan jy iets nie? Vra die afrigter', coachDisclose: 'Jy gesels met ’n KI (Claude), nie met ’n mens nie. Die afrigter help jou om SELF te dink en te leer – dit doen nie jou werk vir jou nie. Pa en Ma kan die gesprekke sien.', coachSubj: 'Watter vak?', coachNew: 'Nuwe gesprek', coachPh: 'Tik jou vraag, of wat jy al gedoen het…', coachPhoto: 'Foto', coachSend: 'Stuur', coachLeft: 'vrae oor vandag', coachHello: 'Hallo {name}! 👋 Ek is jou **Leerhoek-afrigter**. Stuur vir my ’n **foto** van ’n vraag, ’n bladsy uit jou boek of jou eie werk, of tik jou vraag. Ek gaan jou help om dit self uit te werk – met verduidelikings en wenke, nie klaar antwoorde nie. 💪', coachImgErr: 'Kon nie die foto oopmaak nie – probeer weer.', coachLimit: 'Jy het vandag se {n} vrae gebruik. Môre is daar weer! Probeer intussen ’n toets of speletjie.', coachOff: 'Die afrigter is nog nie aangeskakel nie – Pa moet nog die sleutel byvoeg.', coachErr: 'Kon nie die afrigter bereik nie. Kyk of die internet werk en probeer weer.', coachOnlyWeb: 'Die afrigter werk net op die gesin se Leerhoek-webwerf (met jou skakel).', coachParentT: 'Afrigter-gesprekke', coachParentSub: 'Alles wat die seuns die KI-afrigter vra, en wat dit antwoord (laaste 7 dae). Die afrigter verduidelik en gee wenke, maar skryf nie hul werk vir hulle nie.', coachLimitL: 'Vrae per kind per dag:', coachNone: 'Nog geen gesprekke nie.',
    ntfyT: 'Kennisgewings op jou foon', ntfySub: 'Leerhoek stuur kennisgewings deur die gratis ntfy-app. Elke ouer moet dit een keer op sy of haar eie foon opstel:', ntfy1: 'Laai die gratis <b>ntfy</b>-app af (knoppies hieronder).', ntfy2: 'Maak dit oop, tik <b>+</b> en tik hierdie onderwerp in (of kopieer dit): laat “Use another server” <b>af</b> en tik <b>Subscribe</b>.', ntfy3: 'Laat kennisgewings toe as die foon vra. Tik dan hier op <b>Stuur toets</b> – jy moet binne sekondes ’n kennisgewing kry.', ntfyCopy: 'Kopieer', ntfyOpen: 'Open in ntfy (Android)', ntfyTest: 'Stuur toets', ntfyTestMsg: 'As jy dit sien, werk die Leerhoek-kennisgewings! 🎉', ntfySent: 'Toets gestuur – kyk op jou foon.', ntfyWhen: 'Jy kry ’n kennisgewing elke keer as ’n seun Leerhoek oopmaak en weer toemaak of wegsit (met ’n opsomming: minute, toetse en XP), na elke toets en vraestel, en die eerste keer per dag dat hy die afrigter vra.',
    pushT: 'Kennisgewings', pushSub: 'Leerhoek stuur self kennisgewings na jou foon – geen ekstra app nodig nie. Doen dit een keer op elke ouer se foon (Pa en Ma): maak Leerhoek oop met sy ikoon, gaan na Ouer en tik die knoppie hieronder.', pushOn: 'Skakel kennisgewings aan op hierdie foon', pushIsOn: 'Hierdie toestel kry Leerhoek-kennisgewings.', pushOff: 'Skakel af op hierdie toestel', pushTest: 'Stuur toets', pushSent: 'Toets gestuur na {n} toestel(le) – kyk op jou foon.', pushDevs: 'Toestelle wat kennisgewings kry', pushNone: 'Nog geen toestelle nie.', pushName: 'Naam vir hierdie toestel', pushWelcome: 'Dis reg! Leerhoek-kennisgewings is aan op {d}. 🎉', pushIosHome: 'Op ’n iPhone werk kennisgewings net binne die Leerhoek-app: maak Leerhoek oop met sy ikoon op jou tuisskerm (nie in Safari of Chrome nie), gaan na Ouer en tik dan hier.', pushIosOld: 'Jou iPhone moet iOS 16.4 of nuwer hê vir kennisgewings: Instellings → Algemeen → Sagteware-opdatering.', pushNoSupport: 'Hierdie blaaier kan nie kennisgewings kry nie. Gebruik Chrome (Android of rekenaar) of die Leerhoek-app op ’n iPhone.', pushDenied: 'Kennisgewings vir Leerhoek is in die foon se instellings afgeskakel. iPhone: Instellings → Kennisgewings → Leerhoek → Laat kennisgewings toe. Android: hou die Leerhoek-ikoon in → ⓘ App-inligting → Kennisgewings → aan. Kom dan terug en tik weer.', pushFail: 'Kon nie aanskakel nie', pushNotReady: 'Die kennisgewing-diens (lh-notify) is nog nie op Supabase opgestel nie.', pushParentNote: 'Hierdie toestel stuur self nie “oopgemaak/toegemaak”-kennisgewings nie (dis ’n ouer-toestel).', pushNtfyMore: 'Ander opsie: die ntfy-app', pushNtfyAlso: 'Stuur ook na die ntfy-app',
    passL: 'Slaag', goalL: 'Doel', myMarks: 'My punte', myMarksSub: 'Jou jongste skoolpunt per vak, die slaagpunt en jou doel.', legBad: 'onder slaag', legHi: 'geslaag, nog nie doel nie', legGood: 'doel bereik', showAllSubj: 'Wys al die vakke', goalsT: 'Doelpunte (gewenste punt)', goalsHelp: 'Kies die punt waarna elke seun per vak moet mik – byvoorbeeld 60 %. Laat ’n vak leeg om die standaard te gebruik. Die seuns sien hul punt, die slaagpunt en die doel op hul tuisblad en by elke vak.', goalDefault: 'Standaard doel %', saveGoals: 'Stoor doelpunte',
    marksT: 'Skoolpunte invoer (van die rapport)', marksHelp: 'Tik die punte van die rapport in – Kwartaal 3 nou, Kwartaal 4 aan die einde van die jaar. Die fokusvakke en die dagplan pas outomaties aan. Laat leeg wat nie op die rapport is nie.', marksSave: 'Stoor punte',
    navExams: 'Eksamen', navPlay: 'Speel', navDict: 'Woorde', termNow: 'Kwartaal', finalTerm: 'laaste kwartaal – eindeksamens kom!', now: 'nou', exam1: 'eksamen', focusShort: 'fokusvak',
    planT: 'Vandag se studieplan', planSub: 'Gekies uit jou afbakening, jou eksamendatums en die vakke wat die meeste aandag nodig het.', planDone: 'Alles klaar vir vandag – sterk gedoen!',
    exT: 'Eindeksamen', exSub: 'Jou afbakening per vak: wat in die eksamen kom, hoe gereed jy is, en oefentoetse net op daardie werk.', exDateTBC: 'Datum nog onbekend', exDone: 'Klaar', exToday: 'Vandag!', exIn: 'oor',
    provisional: 'Voorlopig', confirmed: 'Bevestig', provisionalHint: 'Voorlopige afbakening: Kwartaal 3 + 4 (tale: die hele jaar), soos in Unika se vorige Novembervraestelle. Pa werk dit by sodra die skool die regte afbakening stuur.',
    scopeOnlyL: 'Net afbakening', wholeYearL: 'Hele jaar', scopeOnlyHint: 'Vrae en woorde kom net uit die werk wat in die eksamen kom.', wholeYearHint: 'Vrae en woorde kom uit die hele jaar se werk.', scopeTab: 'Afbakening',
    scopeTopics: 'onderwerpe', ready: 'gereed', scopeTest: 'Afbakening-toets', showTopics: 'Wys onderwerpe', inScope: 'In afbakening',
    mistakesT: 'Foute-boek', mistakesSub: 'Elke vraag wat jy verkeerd kry, word hier gebêre. Herdoen hulle tot jy hulle reg kry – dan verdwyn hulle uit die boek.', open_: 'oop', fixedN: 'reggemaak', redoAll: 'Herdoen 10 foute', redo: 'Herdoen', redoT: 'Herdoen foute', recentMistakes: 'Onlangse foute', noMistakes: 'Geen foute nie – mooi so!', noMistakesShort: 'Niks oop nie 🎉', tapToRedo: 'Tik om reg te maak',
    playT: 'Speel & leer', playSub: 'Breinspeletjies met jou eie skoolwerk. Elke speletjie verdien XP en tel vir die tweeling-uitdaging!', brainGames: 'Breinspeletjies', pickSubj: 'Kies ’n vak vir die woordspeletjies:', allSubj: 'Alle vakke',
    gamesFor: 'Speletjies vir', alwaysMaths: 'Altyd Wiskunde', nWords: 'woorde', nStatements: 'stellings', nQuestions: 'vrae', changeSubj: 'Ander vak', quickHow: 'Lees die vraag en tik die regte antwoord – so vinnig as wat jy kan. Verkeerde antwoorde gaan in jou foute-boek.',
    g: { quick: ['Vinnige vrae', '90 sekondes: beantwoord soveel vrae uit die vak as wat jy kan!'], memory: ['Geheue-pare', 'Draai kaarte om en vind die Afrikaanse en Engelse woordpare.'], hangman: ['Raai die woord', 'Lees die betekenis en raai die woord, letter vir letter.'], sprint: ['Wiskunde-sprint', 'Hoeveel somme kan jy in 60 sekondes uit jou kop doen?'], blitz: ['Waar/Onwaar-blits', '60 sekondes: waar of onwaar? Hoe vinniger, hoe beter!'] },
    best: 'Beste', moves: 'skuiwe', playAgain: 'Speel weer', back: 'Terug', newRecord: 'Nuwe rekord!', timeUp: 'Tyd is op!', start: 'Begin', lives: 'Lewens', hintLetter: 'Wenk (kos 1 lewe)', wordWas: 'Die woord was', nextWord: 'Volgende woord', wordsOf: 'woorde reg', correctN: 'reg',
    sprintHow: 'Reken dit in jou kop uit en tik die regte antwoord – so vinnig as wat jy kan! Pasop vir die strikvrae.', blitzHow: 'Lees die stelling en tik vinnig Waar of Onwaar. Verkeerde antwoorde gaan in jou foute-boek.', wentToMistakes: 'Hierdie vrae is in jou foute-boek gebêre.',
    weekT: 'Tweeling-uitdaging', weekLead: 'lei hierdie week!', weekTie: 'Gelykop!', weekReset: 'Begin elke Maandag oor.', chalT: 'Weeklikse uitdaging', chalSub: 'Dieselfde 10 vrae vir Diaan en Stefan. Net jou eerste poging tel – wie wen hierdie week?', chalPlay: 'Speel', chalReplay: 'Oefen weer', chalDone: 'Gespeel', chalNot: 'Nog nie gespeel nie', chalCounted: 'Jou telling tel vir hierdie week!', chalPractice: 'Oefenrondte – net jou eerste poging tel.',
    chestT: 'Daaglikse skatkis', chestReady: 'Gereed – maak oop!', chestDone: 'Môre is daar ’n nuwe een.', testsToday: 'toetse vandag', chestWin: 'Jy het gevind:',
    wotd: 'Woord van die dag', factT: 'Weet jy?', factBtn: 'Cool! 😎', toTopic: 'Na onderwerp', dwHint: 'Tik op ’n onderstreepte woord om sy betekenis te sien.',
    dictT: 'Woordeboek', dictSub: 'Al die moeilike woorde uit jou vakke – in Afrikaans en Engels, met betekenisse. Jy kan ook in enige opsomming op ’n onderstreepte woord tik.', dictTabTerms: 'Vakwoorde', dictTabQ: 'Vraagwoorde', dictQSub: 'Hierdie woorde in ’n vraag sê vir jou wát die onderwyser wil hê. Baie punte gaan verlore omdat iemand net “noem” waar die vraag “verduidelik” vra.', dictSearch: 'Soek ’n woord (Afrikaans of Engels)…', dictWords: 'woorde', dictNone: 'Niks gevind nie – probeer ’n ander spelling of die Engelse woord.', showMore: 'Wys meer',
    scopeT: 'Afbakening & eksamenrooster', scopeHelp: 'Kies per vak die eksamendatum en die onderwerpe wat in die eksamen kom (die notaveld is vir bv. bladsye of hoofstukke). Tot jy ’n vak verander, gebruik Leerhoek ’n voorlopige afbakening: Kwartaal 3 + 4 (tale: die hele jaar), soos in Unika se vorige Novembervraestelle.', curTermL: 'Huidige kwartaal', auto: 'Outomaties', pickTopics: 'Kies onderwerpe', q4: 'Kw 4', q34: 'Kw 3 + 4', qAll: 'Hele jaar', qNone: 'Geen', noteP: 'Nota, bv. Hfst 5–8, bl. 40–62', saveScope: 'Stoor afbakening', mistakesShort: 'foute oop', gamesShort: 'speletjies',
    instTitle: 'Kry Leerhoek as ’n app', instSub: 'Sit die ikoon op jou tuisskerm – dan maak jy dit soos enige ander app oop.', instBtn: '📲 Installeer Leerhoek', instHow: 'Wys my hoe', instLater: 'Later', instDone: 'Leerhoek is geïnstalleer! Maak dit voortaan met die ikoon oop.', instIosTitle: 'Sit Leerhoek op jou tuisskerm', instIosSafari: ['Tik op <b>⋯</b> onder regs (of direk op <b>Deel</b> {S}).', 'Tik op <b>Deel</b> {S}.', 'Rol af (of tik <b>View More</b>) en kies <b>Add to Home Screen</b>.', 'Maak seker <b>Open as Web App</b> is aan, en tik <b>Add</b>.'], instIosChrome: ['Tik op <b>Deel</b> {S} regs in die adresbalk (of <b>⋯</b> → <b>Share</b>).', 'Rol af en kies <b>Add to Home Screen</b>.', 'Tik <b>Add</b>.'], instAndroid: ['Tik op <b>⋮</b> bo-regs in Chrome.', 'Kies <b>Installeer app</b> of <b>Add to Home screen</b>.', 'Tik <b>Installeer</b> / <b>Add</b>.', 'Wys Google Play Protect ’n waarskuwing? Tik <b>More details</b> → <b>Install anyway</b> – dis veilig, die “app” is net die Leerhoek-webwerf. Of kies <b>Create shortcut</b>.'], instSamsung: ['Op Samsung werk dit die beste in <b>Chrome</b> (Samsung se eie blaaier se app word deur Google Play Protect geblokkeer). Tik hieronder op <b>Kopieer skakel</b>.', 'Maak <b>Chrome</b> oop, plak die skakel in die adresbalk en maak dit oop.', 'Tik <b>⋮</b> bo-regs → <b>Add to Home screen</b> → <b>Install</b>.', 'Wys Play Protect steeds ’n waarskuwing? Tik <b>More details</b> → <b>Install anyway</b> (dis veilig), of kies <b>Create shortcut</b>.'], instCopy: 'Kopieer skakel', instGot: 'Reg so!', instFoot: 'Daarna verskyn die Leerhoek-ikoon op jou tuisskerm.',
    hello: 'Hallo', chooseProfile: 'Wie is jy vandag?', tagline: 'Diaan & Stefan se studieplatform', parent: 'Ouer', parentSub: 'Mel & Pa',
    level: 'Vlak', xp: 'XP', streak: 'Reeks', days: 'dae', quizzes: 'Toetse', avg: 'Gemiddeld', home: 'Tuis', subjects: 'Vakke', badges: 'Kentekens', resources: 'Hulpbronne',
    mission: 'Vandag se missie', missionSub: 'Drie dinge om vandag te doen – elkeen gee XP.', learn: 'Leer', test: 'Toets', examPractice: 'Eksamen-oefening', examPracticeSub: '20 gemengde vrae uit die hele vak',
    term: 'Kwartaal', topics: 'onderwerpe', summary: 'Opsomming', keyTerms: 'Sleutelterme', examples: 'Voorbeelde', quiz: 'Toets',
    markRead: 'Ek het dit gelees ✓', readDone: 'Gelees ✓', flipHint: 'klik om om te draai', flashDone: 'Al die kaarte gedoen ✓', nextStep: 'Wys volgende stap', showAnswer: 'Wys antwoord', examplesDone: 'Voorbeelde deurgewerk ✓',
    startQuiz: 'Begin toets', question: 'Vraag', check: 'Kontroleer', next: 'Volgende', finish: 'Klaar', correct: 'Reg so!', wrong: 'Nie heeltemal nie', yourAnswer: 'Jou antwoord', rightAnswer: 'Regte antwoord', typeAnswer: 'Tik jou antwoord…',
    true_: 'Waar', false_: 'Onwaar', matchHint: 'Klik links, dan regs om pare te maak.', pairsLeft: 'pare oor',
    resultTitle: 'Toets voltooi!', tryAgain: 'Probeer weer', backTo: 'Terug na', earned: 'verdien', review: 'Hersien jou antwoorde',
    msg100: 'Perfek! Jy is ’n baas! 🏆', msg80: 'Uitstekend! Byna perfek. 🌟', msg60: 'Goeie werk – gaan kyk weer na die vrae wat jy gemis het. 👍', msg0: 'Goeie begin. Lees die opsomming weer en probeer dan weer. 💪',
    status: { new: 'Nuut', read: 'Geleer', practice: 'Oefen', good: 'Goed', master: 'Baas' },
    levelNames: ['Nuweling', 'Leerder', 'Ondersoeker', 'Kenner', 'Vakbaas', 'Meester', 'Legende'],
    levelUp: 'Vlak op!', nowLevel: 'Jy is nou', newBadge: 'Nuwe kenteken!', close: 'Lekker!',
    examIn: 'Eksamen oor', examDays: 'dae', setExam: 'Stel die eksamendatum in die ouerpaneel', examTips: 'Eksamenwenke',
    notLinked: 'Hierdie toestel is nie aan die gesin se Leerhoek gekoppel nie – vordering word net hier gestoor. Maak die skakel oop wat Pa gestuur het.', linkTitle: 'Koppel hierdie toestel', linkSub: 'Maak die skakel oop wat Pa vir jou gestuur het, of plak dit hier:', linkBtn: 'Koppel', linkBad: 'Die skakel of kode werk nie – vra Pa vir die nuwe skakel.', linkOffline: 'Kan nie die bediener bereik nie – kyk of die internet werk en probeer weer.', localOnly: 'Vordering word net op hierdie toestel gestoor. Meld by Claude aan (Pa of Ma se rekening) sodat dit oral sinkroniseer, of kopieer jou vorderingskode.', copyCode: 'Kopieer vorderingskode', copied: 'Gekopieer!', shareProgress: 'Deel my vordering', shareDone: 'Vorderingsverslag gekopieer – plak dit in ’n boodskap vir Pa.',
    parentPin: 'Ouerpaneel', enterPin: 'Tik die ouer-PIN in', setPin: 'Kies ’n 4-syfer PIN vir die ouerpaneel', pinWrong: 'Verkeerde PIN', unlock: 'Ontsluit', savePin: 'Stoor PIN',
    dashboard: 'Ouerpaneel', lastActive: 'Laas aktief', never: 'nog nooit', thisWeek: 'hierdie week', timeOn: 'Tyd op platform', mastery: 'Bemeestering per vak', weak: 'Onderwerpe wat aandag nodig het', noWeak: 'Niks dringend nie – alles bo 70 %.', activity: 'Aktiwiteit', noActivity: 'Nog geen aktiwiteit nie.',
    copyReport: 'Kopieer verslag', settings: 'Instellings', examDate: 'Eksamendatum (eerste vraestel)', examTitle: 'Byskrif', save: 'Stoor', saved: 'Gestoor', changePin: 'Verander PIN', importCode: 'Voer vorderingskode in', importHint: 'Plak die kode wat ’n seun van ’n ander toestel gekopieer het.', importBtn: 'Voer in', imported: 'Vordering ingevoer',
    storage: 'Stoorplek', storageDb: 'Gedeelde stoor (sinkroniseer op alle toestelle)', storageLocal: 'Slegs hierdie toestel', today: 'Vandag', yesterday: 'Gister',
    pickAnswer: 'Kies jou antwoord', pickTitle: 'Kies die regte antwoord', writeSelf: 'Ek skryf self', memoFull: 'Memo – so lyk ’n volpunt-antwoord', llHint: 'Haal twee verkeerde antwoorde weg', inARow: 'in ’n ry!', giftT: 'Verrassing!', giftSub: '{n} reg in ’n ry – tik die geskenk!', giftXp: 'bonus-XP!', giftLife: '+1 💡 50/50-hulplyn vir hierdie toets!', playOn: 'Speel verder ▶', missionT: 'Vandag se missie', missionDone: 'Missie voltooi!', gMorning: 'Goeiemôre', gAfternoon: 'Goeiemiddag', gEvening: 'Goeienaand', streakKeep: 'Jy is op ’n {n}-dae-streep! 🔥 Doen vandag iets om dit aan die gang te hou.', streakToday: '🔥 {n} dae op ’n ry – lekker!', streakDay1: '🔥 Jou streep het vandag begin – kom môre weer!', streakNew: 'Begin vandag ’n nuwe streep! 🔥', letsGo: 'Kom ons begin! 🚀', sound: 'Klank aan/af',
    ev: { quiz: 'Toets', read: 'Opsomming gelees', flash: 'Sleutelterme', examples: 'Voorbeelde', exam: 'Eksamen-oefening', paper: 'Oefenvraestel', login: 'Leerhoek oopgemaak', logout: 'Leerhoek toegemaak', scope: 'Afbakening-toets', redo: 'Foute herdoen', challenge: 'Weeklikse uitdaging', game: 'Breinspeletjie', chest: 'Skatkis', coach: 'Afrigter gevra', mission: 'Daaglikse missie voltooi' },
    resourcesIntro: 'Gratis handboeke, werkboeke en ou vraestelle. Unika se eie eksamenomvang en klasnotas kom in die “Gedeel – Unika dokumente” vouer op Pa se rekenaar.',
    allBadges: 'Kentekens', loading: 'Laai die vakke…', switchUser: 'Ruil gebruiker', continueAs: 'Gaan voort', of: 'van', min: 'min', mixed: 'Gemengde vrae', chooseGrade: 'Graad',
    hint: 'Wenk', showMemo: 'Wys memo & merk myself', memo: 'Memo', selfMark: 'Hoeveel punte verdien jou antwoord?', papers: 'Oefenvraestelle', paper: 'Oefenvraestel', examFormatT: 'Hoe lyk Unika se vraestel', startPaper: 'Begin vraestel', timeLeft: 'Tyd oor', marks: 'punte', section: 'Afdeling', paperDone: 'Vraestel voltooi!', perSection: 'Punte per afdeling', paperSub: 'Dieselfde formaat, tyd en punte as die skool se vraestel – nuwe vrae. Skryf lang antwoorde op papier of tik hulle, wys dan die memo en merk jouself eerlik.', bestMark: 'Beste', skipQ: 'Slaan oor', focus: 'Fokusvakke', focusSub: 'Volgens jou skoolrapport – hier tel elke punt die meeste.', target: 'teiken', school: 'Skool', schoolMarks: 'Skoolpunte vs platform', schoolSub: 'Rapportpunte per kwartaal, die slaagteiken en die platform se bemeestering.', termShort: 'Kw', passRules: 'Slaagvereistes: 50 % in Huistaal, 40 % in Engels EAT, 40 % in Wiskunde, 40 % in nog 3 vakke en 30 % in nog 2 vakke.', avgShort: 'Gemiddeld', platform: 'Platform', gap: 'tekort',
    badgeNames: { fixer: ['Foutvreter', 'Maak 25 foute in jou foute-boek reg'], brain: ['Breinkrag', 'Speel 10 breinspeletjies'], scope: ['Eksamengereed', 'Kry 80 % of meer in ’n afbakening-toets'], first: ['Eerste toets', 'Voltooi jou eerste toets'], perfect: ['Volpunte', 'Kry 100 % in ’n toets'], five: ['Vyf toetse', 'Voltooi 5 toetse'], streak3: ['3-dag reeks', 'Leer 3 dae agtereenvolgens'], streak7: ['Week-reeks', '7 dae agtereenvolgens'], reader: ['Leesrot', 'Lees 10 opsommings'], subject: ['Vakbaas', 'Alle onderwerpe van ’n vak bo 70 %'], xp1000: ['Kampioen', 'Verdien 1 000 XP'] },
  },
  en: {
    nextExam: 'Next exam', weekXpShort: 'XP this week', chestSub: 'Do 3 tests today to unlock the treasure chest.',
    coachHelloText: "Hi {name}! 👋 I'm your **Leerhoek coach**. Type your question about your schoolwork – or type out the question from your book or paper. I'll help you work it out **yourself**, with explanations and hints, not ready-made answers. 💪", coachCtaText: 'Stuck on something? Type your question – the coach helps you understand it yourself.', coachPhotosL: 'Allow photos (the boys can send a photo of their work)',
    coachT: 'Leerhoek coach', coachCta: 'Take a photo of a question or your work – the coach helps you understand it yourself.', coachAsk: "Don't understand something? Ask the coach", coachDisclose: 'You are chatting with an AI (Claude), not a person. The coach helps you think and learn YOURSELF – it does not do your work for you. Mom and Dad can see the chats.', coachSubj: 'Which subject?', coachNew: 'New chat', coachPh: 'Type your question, or what you have done so far…', coachPhoto: 'Photo', coachSend: 'Send', coachLeft: 'questions left today', coachHello: "Hi {name}! 👋 I'm your **Leerhoek coach**. Send me a **photo** of a question, a page from your book or your own work, or type your question. I'll help you work it out yourself – with explanations and hints, not ready-made answers. 💪", coachImgErr: "Couldn't open the photo – try again.", coachLimit: "You've used today's {n} questions. More tomorrow! Try a test or a game in the meantime.", coachOff: "The coach isn't switched on yet – Dad still needs to add the key.", coachErr: "Couldn't reach the coach. Check the internet and try again.", coachOnlyWeb: "The coach only works on the family's Leerhoek website (with your link).", coachParentT: 'Coach conversations', coachParentSub: 'Everything the boys ask the AI coach, and what it answers (last 7 days). The coach explains and gives hints, but does not write their work for them.', coachLimitL: 'Questions per child per day:', coachNone: 'No conversations yet.',
    ntfyT: 'Notifications on your phone', ntfySub: 'Leerhoek sends notifications through the free ntfy app. Each parent sets it up once on their own phone:', ntfy1: 'Install the free <b>ntfy</b> app (buttons below).', ntfy2: 'Open it, tap <b>+</b> and type this topic (or copy it): leave “Use another server” <b>off</b> and tap <b>Subscribe</b>.', ntfy3: 'Allow notifications when the phone asks. Then tap <b>Send test</b> here – you should get a notification within seconds.', ntfyCopy: 'Copy', ntfyOpen: 'Open in ntfy (Android)', ntfyTest: 'Send test', ntfyTestMsg: 'If you see this, Leerhoek notifications work! 🎉', ntfySent: 'Test sent – check your phone.', ntfyWhen: 'You get a notification every time a boy opens Leerhoek and every time he closes it or switches away (with a summary: minutes, tests and XP), after every test and paper, and the first time each day he asks the coach.',
    pushT: 'Notifications', pushSub: 'Leerhoek sends notifications to your phone itself – no extra app needed. Do this once on each parent’s phone (Dad and Mom): open Leerhoek from its icon, go to Parent and tap the button below.', pushOn: 'Turn on notifications on this phone', pushIsOn: 'This device gets Leerhoek notifications.', pushOff: 'Turn off on this device', pushTest: 'Send test', pushSent: 'Test sent to {n} device(s) – check your phone.', pushDevs: 'Devices that get notifications', pushNone: 'No devices yet.', pushName: 'Name for this device', pushWelcome: 'All set! Leerhoek notifications are on for {d}. 🎉', pushIosHome: 'On an iPhone, notifications only work inside the Leerhoek app: open Leerhoek from its icon on your home screen (not in Safari or Chrome), go to Parent and tap here.', pushIosOld: 'Your iPhone needs iOS 16.4 or newer for notifications: Settings → General → Software Update.', pushNoSupport: 'This browser can’t receive notifications. Use Chrome (Android or computer) or the Leerhoek app on an iPhone.', pushDenied: 'Notifications for Leerhoek are switched off in the phone’s settings. iPhone: Settings → Notifications → Leerhoek → Allow Notifications. Android: long-press the Leerhoek icon → ⓘ App info → Notifications → on. Then come back and tap again.', pushFail: 'Could not turn on', pushNotReady: 'The notification service (lh-notify) is not set up on Supabase yet.', pushParentNote: 'This device does not send “opened/closed” notifications itself (it is a parent device).', pushNtfyMore: 'Other option: the ntfy app', pushNtfyAlso: 'Also send to the ntfy app',
    passL: 'Pass', goalL: 'Goal', myMarks: 'My marks', myMarksSub: 'Your latest school mark per subject, the pass mark and your goal.', legBad: 'below pass', legHi: 'passed, not yet goal', legGood: 'goal reached', showAllSubj: 'Show all subjects', goalsT: 'Goal marks (desired mark)', goalsHelp: 'Choose the mark each boy should aim for per subject – for example 60%. Leave a subject blank to use the default. The boys see their mark, the pass mark and the goal on their home screen and on every subject.', goalDefault: 'Default goal %', saveGoals: 'Save goals',
    marksT: 'Enter school marks (from the report)', marksHelp: 'Type in the marks from the report – Term 3 now, Term 4 at the end of the year. The focus subjects and the daily plan adjust automatically. Leave blank what is not on the report.', marksSave: 'Save marks',
    navExams: 'Exams', navPlay: 'Play', navDict: 'Words', termNow: 'Term', finalTerm: 'final term – exams are coming!', now: 'now', exam1: 'exam', focusShort: 'focus subject',
    planT: "Today's study plan", planSub: 'Picked from your exam scope, your exam dates and the subjects that need the most attention.', planDone: 'All done for today – great work!',
    exT: 'Final exams', exSub: 'Your exam scope per subject: what is in the exam, how ready you are, and practice tests on just that work.', exDateTBC: 'Date not known yet', exDone: 'Done', exToday: 'Today!', exIn: 'in',
    provisional: 'Provisional', confirmed: 'Confirmed', provisionalHint: "Provisional scope: Term 3 + 4 (languages: the whole year), as in Unika's previous November papers. Dad will update it as soon as the school sends the real scope.",
    scopeOnlyL: 'Exam scope only', wholeYearL: 'Whole year', scopeOnlyHint: 'Questions and words come only from the work that is in the exam.', wholeYearHint: 'Questions and words come from the whole year’s work.', scopeTab: 'Scope',
    scopeTopics: 'topics', ready: 'ready', scopeTest: 'Scope test', showTopics: 'Show topics', inScope: 'In scope',
    mistakesT: 'Mistakes book', mistakesSub: 'Every question you get wrong is saved here. Redo them until you get them right – then they disappear from the book.', open_: 'open', fixedN: 'fixed', redoAll: 'Redo 10 mistakes', redo: 'Redo', redoT: 'Redo mistakes', recentMistakes: 'Recent mistakes', noMistakes: 'No mistakes – well done!', noMistakesShort: 'Nothing open 🎉', tapToRedo: 'Tap to fix them',
    playT: 'Play & learn', playSub: 'Brain games with your own schoolwork. Every game earns XP and counts for the twin challenge!', brainGames: 'Brain games', pickSubj: 'Choose a subject for the word games:', allSubj: 'All subjects',
    gamesFor: 'Games for', alwaysMaths: 'Always maths', nWords: 'words', nStatements: 'statements', nQuestions: 'questions', changeSubj: 'Change subject', quickHow: 'Read the question and tap the right answer – as fast as you can. Wrong answers go into your mistakes book.',
    g: { quick: ['Quick-fire', '90 seconds: answer as many questions from the subject as you can!'], memory: ['Memory pairs', 'Flip cards and find the Afrikaans and English word pairs.'], hangman: ['Guess the word', 'Read the meaning and guess the word, letter by letter.'], sprint: ['Maths sprint', 'How many sums can you do in your head in 60 seconds?'], blitz: ['True/False blitz', '60 seconds: true or false? The faster, the better!'] },
    best: 'Best', moves: 'moves', playAgain: 'Play again', back: 'Back', newRecord: 'New record!', timeUp: "Time's up!", start: 'Start', lives: 'Lives', hintLetter: 'Hint (costs 1 life)', wordWas: 'The word was', nextWord: 'Next word', wordsOf: 'words right', correctN: 'right',
    sprintHow: 'Work it out in your head and tap the right answer – as fast as you can! Watch out for the trick answers.', blitzHow: 'Read the statement and quickly tap True or False. Wrong answers go into your mistakes book.', wentToMistakes: 'These questions were saved in your mistakes book.',
    weekT: 'Twin challenge', weekLead: 'leads this week!', weekTie: 'Tied!', weekReset: 'Starts again every Monday.', chalT: 'Weekly challenge', chalSub: 'The same 10 questions for Diaan and Stefan. Only your first attempt counts – who wins this week?', chalPlay: 'Play', chalReplay: 'Practise again', chalDone: 'Played', chalNot: 'Not played yet', chalCounted: 'Your score counts for this week!', chalPractice: 'Practice round – only your first attempt counts.',
    chestT: 'Daily treasure chest', chestReady: 'Ready – open it!', chestDone: "There's a new one tomorrow.", testsToday: 'tests today', chestWin: 'You found:',
    wotd: 'Word of the day', factT: 'Did you know?', factBtn: 'Cool! 😎', toTopic: 'Go to topic', dwHint: 'Tap an underlined word to see its meaning.',
    dictT: 'Dictionary', dictSub: 'All the difficult words from your subjects – in Afrikaans and English, with meanings. You can also tap an underlined word in any summary.', dictTabTerms: 'Subject words', dictTabQ: 'Question words', dictQSub: 'These words in a question tell you what the teacher wants. Lots of marks are lost because someone only “names” where the question asks to “explain”.', dictSearch: 'Search a word (Afrikaans or English)…', dictWords: 'words', dictNone: 'Nothing found – try another spelling or the Afrikaans word.', showMore: 'Show more',
    scopeT: 'Exam scope & timetable', scopeHelp: "Choose the exam date and the topics in the exam for each subject (the note field is for e.g. pages or chapters). Until you change a subject, Leerhoek uses a provisional scope: Term 3 + 4 (languages: the whole year), as in Unika's previous November papers.", curTermL: 'Current term', auto: 'Automatic', pickTopics: 'Choose topics', q4: 'T4', q34: 'T3 + 4', qAll: 'Whole year', qNone: 'None', noteP: 'Note, e.g. Ch 5–8, p. 40–62', saveScope: 'Save scope', mistakesShort: 'mistakes open', gamesShort: 'games',
    instTitle: 'Get Leerhoek as an app', instSub: 'Put the icon on your home screen – then open it like any other app.', instBtn: '📲 Install Leerhoek', instHow: 'Show me how', instLater: 'Later', instDone: 'Leerhoek is installed! Open it with the icon from now on.', instIosTitle: 'Put Leerhoek on your home screen', instIosSafari: ['Tap <b>⋯</b> at the bottom right (or <b>Share</b> {S} directly).', 'Tap <b>Share</b> {S}.', 'Scroll down (or tap <b>View More</b>) and choose <b>Add to Home Screen</b>.', 'Make sure <b>Open as Web App</b> is on, then tap <b>Add</b>.'], instIosChrome: ['Tap <b>Share</b> {S} on the right of the address bar (or <b>⋯</b> → <b>Share</b>).', 'Scroll down and choose <b>Add to Home Screen</b>.', 'Tap <b>Add</b>.'], instAndroid: ['Tap <b>⋮</b> at the top right in Chrome.', 'Choose <b>Install app</b> or <b>Add to Home screen</b>.', 'Tap <b>Install</b> / <b>Add</b>.', 'Does Google Play Protect show a warning? Tap <b>More details</b> → <b>Install anyway</b> – it is safe, the “app” is just the Leerhoek website. Or choose <b>Create shortcut</b>.'], instSamsung: ['On Samsung it works best in <b>Chrome</b> (Google Play Protect blocks the app made by Samsung’s own browser). Tap <b>Copy link</b> below.', 'Open <b>Chrome</b>, paste the link in the address bar and open it.', 'Tap <b>⋮</b> at the top right → <b>Add to Home screen</b> → <b>Install</b>.', 'Still a Play Protect warning? Tap <b>More details</b> → <b>Install anyway</b> (it is safe), or choose <b>Create shortcut</b>.'], instCopy: 'Copy link', instGot: 'Got it!', instFoot: 'The Leerhoek icon then appears on your home screen.',
    hello: 'Hi', chooseProfile: 'Who are you today?', tagline: "Diaan & Stefan's study platform", parent: 'Parent', parentSub: 'Mel & Dad',
    level: 'Level', xp: 'XP', streak: 'Streak', days: 'days', quizzes: 'Tests', avg: 'Average', home: 'Home', subjects: 'Subjects', badges: 'Badges', resources: 'Resources',
    mission: "Today's mission", missionSub: 'Three things to do today – each earns XP.', learn: 'Learn', test: 'Test', examPractice: 'Exam practice', examPracticeSub: '20 mixed questions from the whole subject',
    term: 'Term', topics: 'topics', summary: 'Summary', keyTerms: 'Key terms', examples: 'Examples', quiz: 'Test',
    markRead: "I've read this ✓", readDone: 'Read ✓', flipHint: 'click to flip', flashDone: 'All cards done ✓', nextStep: 'Show next step', showAnswer: 'Show answer', examplesDone: 'Examples worked through ✓',
    startQuiz: 'Start test', question: 'Question', check: 'Check', next: 'Next', finish: 'Finish', correct: 'Correct!', wrong: 'Not quite', yourAnswer: 'Your answer', rightAnswer: 'Correct answer', typeAnswer: 'Type your answer…',
    true_: 'True', false_: 'False', matchHint: 'Click left, then right, to make pairs.', pairsLeft: 'pairs left',
    resultTitle: 'Test complete!', tryAgain: 'Try again', backTo: 'Back to', earned: 'earned', review: 'Review your answers',
    msg100: "Perfect! You're a boss! 🏆", msg80: 'Excellent! Nearly perfect. 🌟', msg60: 'Good work – look again at the ones you missed. 👍', msg0: 'Good start. Read the summary again and have another go. 💪',
    status: { new: 'New', read: 'Learned', practice: 'Practising', good: 'Good', master: 'Mastered' },
    levelNames: ['Rookie', 'Learner', 'Explorer', 'Expert', 'Subject boss', 'Master', 'Legend'],
    levelUp: 'Level up!', nowLevel: 'You are now', newBadge: 'New badge!', close: 'Nice!',
    examIn: 'Exam in', examDays: 'days', setExam: 'Set the exam date in the parent panel', examTips: 'Exam tips',
    notLinked: "This device isn't linked to the family's Leerhoek – progress is only saved here. Open the link Dad sent.", linkTitle: 'Link this device', linkSub: 'Open the link Dad sent you, or paste it here:', linkBtn: 'Link', linkBad: "That link or code doesn't work – ask Dad for the new link.", linkOffline: "Can't reach the server – check the internet and try again.", localOnly: "Progress is only saved on this device. Sign in to Claude (Dad's or Mom's account) so it syncs everywhere, or copy your progress code.", copyCode: 'Copy progress code', copied: 'Copied!', shareProgress: 'Share my progress', shareDone: 'Progress report copied – paste it in a message to Dad.',
    parentPin: 'Parent panel', enterPin: 'Enter the parent PIN', setPin: 'Choose a 4-digit PIN for the parent panel', pinWrong: 'Wrong PIN', unlock: 'Unlock', savePin: 'Save PIN',
    dashboard: 'Parent panel', lastActive: 'Last active', never: 'never', thisWeek: 'this week', timeOn: 'Time on platform', mastery: 'Mastery per subject', weak: 'Topics that need attention', noWeak: 'Nothing urgent – everything above 70 %.', activity: 'Activity', noActivity: 'No activity yet.',
    copyReport: 'Copy report', settings: 'Settings', examDate: 'Exam date (first paper)', examTitle: 'Caption', save: 'Save', saved: 'Saved', changePin: 'Change PIN', importCode: 'Import progress code', importHint: 'Paste the code a boy copied from another device.', importBtn: 'Import', imported: 'Progress imported',
    storage: 'Storage', storageDb: 'Shared store (syncs on all devices)', storageLocal: 'This device only', today: 'Today', yesterday: 'Yesterday',
    pickAnswer: 'Choose your answer', pickTitle: 'Choose the right answer', writeSelf: 'I’ll write it myself', memoFull: 'Memo – this is a full-marks answer', llHint: 'Removes two wrong answers', inARow: 'in a row!', giftT: 'Surprise!', giftSub: '{n} right in a row – tap the gift!', giftXp: 'bonus XP!', giftLife: '+1 💡 50/50 lifeline for this test!', playOn: 'Keep going ▶', missionT: 'Today’s mission', missionDone: 'Mission complete!', gMorning: 'Good morning', gAfternoon: 'Good afternoon', gEvening: 'Good evening', streakKeep: 'You’re on a {n}-day streak! 🔥 Do something today to keep it going.', streakToday: '🔥 {n} days in a row – great!', streakDay1: '🔥 Your streak started today – come back tomorrow!', streakNew: 'Start a new streak today! 🔥', letsGo: 'Let’s go! 🚀', sound: 'Sound on/off',
    ev: { quiz: 'Test', read: 'Summary read', flash: 'Key terms', examples: 'Examples', exam: 'Exam practice', paper: 'Practice paper', login: 'Opened Leerhoek', logout: 'Closed Leerhoek', scope: 'Scope test', redo: 'Mistakes redone', challenge: 'Weekly challenge', game: 'Brain game', chest: 'Treasure chest', coach: 'Asked the coach', mission: 'Daily mission complete' },
    resourcesIntro: "Free textbooks, workbooks and past papers. Unika's own exam scope and class notes go in the “Gedeel – Unika dokumente” folder on Dad's computer.",
    allBadges: 'Badges', loading: 'Loading subjects…', switchUser: 'Switch user', continueAs: 'Continue', of: 'of', min: 'min', mixed: 'Mixed questions', chooseGrade: 'Grade',
    hint: 'Hint', showMemo: 'Show memo & mark myself', memo: 'Memo', selfMark: 'How many marks does your answer earn?', papers: 'Practice papers', paper: 'Practice paper', examFormatT: "What Unika's paper looks like", startPaper: 'Start paper', timeLeft: 'Time left', marks: 'marks', section: 'Section', paperDone: 'Paper complete!', perSection: 'Marks per section', paperSub: 'Same format, time and marks as the school paper – new questions. Write long answers on paper or type them, then show the memo and mark yourself honestly.', bestMark: 'Best', skipQ: 'Skip', focus: 'Focus subjects', focusSub: 'Based on your school report – every mark counts most here.', target: 'target', school: 'School', schoolMarks: 'School marks vs platform', schoolSub: 'Report marks per term, the pass target and the platform mastery.', termShort: 'T', passRules: 'Pass requirements: 50 % in Home Language, 40 % in English FAL, 40 % in Mathematics, 40 % in 3 more subjects and 30 % in 2 more.', avgShort: 'Average', platform: 'Platform', gap: 'short',
    badgeNames: { fixer: ['Mistake muncher', 'Fix 25 mistakes in your mistakes book'], brain: ['Brain power', 'Play 10 brain games'], scope: ['Exam ready', 'Score 80 % or more in a scope test'], first: ['First test', 'Complete your first test'], perfect: ['Full marks', 'Score 100 % in a test'], five: ['Five tests', 'Complete 5 tests'], streak3: ['3-day streak', 'Learn 3 days in a row'], streak7: ['Week streak', '7 days in a row'], reader: ['Bookworm', 'Read 10 summaries'], subject: ['Subject boss', 'Every topic of a subject above 70 %'], xp1000: ['Champion', 'Earn 1 000 XP'] },
  }
};
/* v10: the household's members come from kv household/profile (+ lh_me / lh_circle). These defaults are Diaan & Stefan's
   household (h1) – used when the profile can't be read, so the twins' app never breaks. */
const LEGACY_KIDS = [
  { id: 'diaan', name: 'Diaan', avatar: '🦁', role: 'learner', grade: 7, school: 'Laerskool Unika' },
  { id: 'stefan', name: 'Stefan', avatar: '🐆', role: 'learner', grade: 7, school: 'Laerskool Unika' },
];
const LEGACY_PARENTS = [{ id: 'pa', name: 'Pa', avatar: '👨' }, { id: 'ma', name: 'Ma', avatar: '👩' }];
const KIDS = LEGACY_KIDS.map(k => Object.assign({}, k));
const PARENTS = LEGACY_PARENTS.map(p => Object.assign({}, p));
const CIRCLE = [];   // members of the OTHER households in the family circle: {id, name, avatar, kid, role, grade, hid, house}
let HOUSE = { id: null, name: '', circle: null, owner: false, legacy: true };
/* School report data lives in kids/<id>.school = { terms: { "1": {afrikaans: 63, ...}, "2": {...} }, avg: {"1": 57, "2": 51} }
   Pass requirements (Laerskool Unika report): 50 % Huistaal, 40 % EAT, 40 % Wiskunde, 40 % in 3 more, 30 % in 2 more. */
const PASS_TARGET = { afrikaans: 50, english: 40, wiskunde: 40, 'kreatiewe-kunste': 30, default: 40 };
const SCHOOL_EXTRA = { kk: { af: 'Kreatiewe Kunste', en: 'Creative Arts' }, geo: { af: 'Geografie', en: 'Geography' }, gesk: { af: 'Geskiedenis', en: 'History' } };
const BADGES = ['first', 'perfect', 'five', 'streak3', 'streak7', 'reader', 'subject', 'xp1000', 'scope', 'fixer', 'brain'];
const BADGE_ICONS = { first: '🎯', perfect: '💯', five: '🖐️', streak3: '🔥', streak7: '🌋', reader: '📚', subject: '👑', xp1000: '🏆', scope: '🎯', fixer: '🛠️', brain: '🧠' };
const PAIR_COLORS = ['#2f6df6', '#d97706', '#9333ea', '#16a34a', '#db2777', '#0d9488'];

/* ------------------------------------------------------------------ state */
let L = 'af';
try { L = localStorage.getItem('lh.lang') || 'af'; } catch (e) {}
const S = {
  content: null,         // { grades:[], subjects: {id: subjectJson} }
  kid: null,             // active kid record
  kidId: null,
  settings: { pinHash: null, examDate: null, examTitle: '' },
  store: null,           // storage adapter
  storeKind: 'local',
  parentUnlocked: false,
  route: { s: 'gate' },
  tStart: 0,             // time tracking
  quiz: null,
};
const $ = (sel, el = document) => el.querySelector(sel);
const t = (k) => { const v = k.split('.').reduce((o, p) => (o ? o[p] : undefined), UI[L]); return v === undefined ? k : v; };
const tx = (obj) => (obj && typeof obj === 'object') ? (obj[L] || obj.af || obj.en || '') : (obj || '');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const levelOf = (xp) => Math.min(30, Math.floor(Math.sqrt(xp / 60)) + 1);
const xpForLevel = (lv) => 60 * (lv - 1) * (lv - 1);
const levelName = (lv) => { const n = t('levelNames'); return n[Math.min(n.length - 1, Math.floor((lv - 1) / 2))]; };

/* ------------------------------------------------------------------ inline markup & markdown */
function inline(s) {
  s = esc(s);
  s = s.replace(/\[\[([^\]\/]+)\/([^\]]+)\]\]/g, '<span class="frac"><span>$1</span><span>$2</span></span>');
  s = s.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>').replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<i>$2</i>');
  return s;
}
function md(src) {
  const lines = String(src || '').replace(/\r/g, '').split('\n');
  let out = '', i = 0;
  const flushPara = (buf) => buf.length ? `<p>${buf.map(inline).join('<br>')}</p>` : '';
  let para = [];
  while (i < lines.length) {
    const ln = lines[i];
    if (/^\s*$/.test(ln)) { out += flushPara(para); para = []; i++; continue; }
    let m;
    if ((m = ln.match(/^(#{1,4})\s+(.*)/))) { out += flushPara(para); para = []; const h = Math.min(3, m[1].length + 0); out += `<h${h === 1 ? 2 : h}>${inline(m[2])}</h${h === 1 ? 2 : h}>`; i++; continue; }
    if (/^\s*>/.test(ln)) { out += flushPara(para); para = []; const q = []; while (i < lines.length && /^\s*>/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, '')); i++; } out += `<blockquote><p>${q.map(x => x.trim() ? inline(x) : '</p><p>').join('<br>').replace(/<br><\/p><p><br>/g, '</p><p>')}</p></blockquote>`; continue; }
    if (/^\s*[-*]\s+/.test(ln)) { out += flushPara(para); para = []; out += '<ul>'; while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { out += `<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ''))}</li>`; i++; } out += '</ul>'; continue; }
    if (/^\s*\d+[.)]\s+/.test(ln)) { out += flushPara(para); para = []; out += '<ol>'; while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) { out += `<li>${inline(lines[i].replace(/^\s*\d+[.)]\s+/, ''))}</li>`; i++; } out += '</ol>'; continue; }
    if (/^\s*\|/.test(ln)) {
      out += flushPara(para); para = []; const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = (r) => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
      let html = '<div class="tbl"><table>';
      rows.forEach((r, ri) => {
        if (/^\s*\|?\s*:?-{2,}/.test(r)) return;
        const tag = ri === 0 ? 'th' : 'td';
        html += '<tr>' + cells(r).map(c => `<${tag}>${inline(c)}</${tag}>`).join('') + '</tr>';
      });
      out += html + '</table></div>'; continue;
    }
    para.push(ln.trim()); i++;
  }
  out += flushPara(para);
  return out;
}
const norm = (s) => String(s ?? '').toLowerCase().trim().replace(/\s+/g, '').replace(/,/g, '.').replace(/[−–]/g, '-').replace(/²/g, '2').replace(/³/g, '3').replace(/[’'"`]/g, "'").replace(/[.!?]+$/, '');
function fillCorrect(q, val) {
  const accepted = (q.answers && (q.answers[L] || q.answers.af)) || [];
  const all = accepted.concat((q.answers && q.answers.af) || [], (q.answers && q.answers.en) || []);
  const v = norm(val);
  if (!v) return false;
  if (all.some(a => norm(a) === v)) return true;
  const vn = parseFloat(v.replace(/[^\d.\-]/g, ''));
  if (!isNaN(vn) && /^-?[\d.]+/.test(v)) {
    return all.some(a => { const an = parseFloat(norm(a).replace(/[^\d.\-]/g, '')); return !isNaN(an) && /^-?[\d.]+/.test(norm(a)) && Math.abs(an - vn) < 1e-9 && norm(a).replace(/[\d.\-]/g, '') === v.replace(/[\d.\-]/g, ''); });
  }
  return false;
}

/* ------------------------------------------------------------------ storage */
const blankKid = (k) => ({ id: k.id, name: k.name, avatar: k.avatar, xp: 0, streak: { count: 0, last: null }, badges: [], topics: {}, totals: { quizzes: 0, correct: 0, answered: 0, secs: 0, reads: 0 }, updated: 0 });

class LocalStore {
  constructor() { this.kind = 'local'; }
  _g(k, d) { try { const v = localStorage.getItem('lh.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  _s(k, v) { try { localStorage.setItem('lh.' + k, JSON.stringify(v)); } catch (e) {} }
  async loadKid(id) { const k = KIDS.find(x => x.id === id); return Object.assign(blankKid(k), this._g('kid.' + id, {})); }
  async saveKid(kid) { kid.updated = Date.now(); this._s('kid.' + kid.id, kid); }
  async appendLog(kidId, ev) { const d = today(); const key = 'log.' + kidId + '.' + d; const doc = this._g(key, { date: d, events: [] }); doc.events.push(ev); if (doc.events.length > 300) doc.events.splice(0, doc.events.length - 300); this._s(key, doc); const idx = this._g('logidx.' + kidId, []); if (!idx.includes(d)) { idx.push(d); this._s('logidx.' + kidId, idx.slice(-60)); } }
  async loadLogs(kidId, days = 14) { const idx = this._g('logidx.' + kidId, []).slice(-days); return idx.map(d => this._g('log.' + kidId + '.' + d, null)).filter(Boolean); }
  async loadSettings() { return Object.assign({ pinHash: null, examDate: null, examTitle: '' }, this._g('settings', {})); }
  async saveSettings(s) { this._s('settings', s); }
  subscribeKid(id, cb) { return () => {}; }
  subscribeLogs(id, cb) { return () => {}; }
  exportCode() { const o = {}; KIDS.forEach(k => { o[k.id] = this._g('kid.' + k.id, null); }); return btoa(unescape(encodeURIComponent(JSON.stringify({ v: 1, kids: o, at: Date.now() })))); }
}
class DbStore {
  constructor(db) { this.db = db; this.kind = 'db'; this.q = Promise.resolve(); }
  _chain(fn) { this.q = this.q.then(fn, fn); return this.q; }
  async loadKid(id) { const k = KIDS.find(x => x.id === id); const snap = await this.db.doc('kids/' + id).get(); return Object.assign(blankKid(k), snap.exists ? snap.data() : {}); }
  async saveKid(kid) { kid.updated = Date.now(); const body = JSON.parse(JSON.stringify(kid)); return this._chain(() => this.db.doc('kids/' + kid.id).set(body)); }
  async appendLog(kidId, ev) {
    return this._chain(async () => {
      const d = today(); const ref = this.db.doc('kids/' + kidId + '/logs/' + d);
      const snap = await ref.get(); const doc = snap.exists ? JSON.parse(JSON.stringify(snap.data())) : { date: d, kid: kidId, events: [] };
      doc.events.push(ev); if (doc.events.length > 300) doc.events.splice(0, doc.events.length - 300);
      doc.count = doc.events.length; doc.updated = Date.now();
      await ref.set(doc);
    });
  }
  async loadLogs(kidId, days = 14) { const qs = await this.db.collection('kids/' + kidId + '/logs').orderBy('date', 'desc').limit(days).get(); return qs.docs.map(d => d.data()).reverse(); }
  async loadSettings() { const snap = await this.db.doc('settings/main').get(); return Object.assign({ pinHash: null, examDate: null, examTitle: '' }, snap.exists ? snap.data() : {}); }
  async saveSettings(s) { return this._chain(() => this.db.doc('settings/main').set(JSON.parse(JSON.stringify(s)))); }
  subscribeKid(id, cb) { return this.db.doc('kids/' + id).onSnapshot(snap => { if (snap.exists) cb(Object.assign(blankKid(KIDS.find(x => x.id === id)), snap.data())); }, () => {}); }
  subscribeLogs(id, cb) { return this.db.collection('kids/' + id + '/logs').orderBy('date', 'desc').limit(14).onSnapshot(qs => cb(qs.docs.map(d => d.data()).reverse()), () => {}); }
  exportCode() { return null; }
}
/* Own-website mode: window.LH_CONFIG = {supabaseUrl, supabaseKey}; data via SECURITY DEFINER RPCs guarded by a family key */
class SupaStore {
  constructor(url, key, fk) { this.url = url.replace(/\/$/, ''); this.key = key; this.fk = fk; this.kind = 'supa'; this.q = Promise.resolve(); }
  async rpc(fn, args) {
    const h = { apikey: this.key, 'Content-Type': 'application/json' }; if (/^eyJ/.test(this.key)) h.Authorization = 'Bearer ' + this.key;
    const r = await fetch(this.url + '/rest/v1/rpc/' + fn, { method: 'POST', headers: h, body: JSON.stringify(Object.assign({ fk: this.fk }, args || {})) });
    if (!r.ok) throw new Error('rpc ' + fn + ' ' + r.status);
    const txt = await r.text(); return txt ? JSON.parse(txt) : null;
  }
  _chain(fn) { this.q = this.q.then(fn, fn); return this.q; }
  async ping() { return (await this.rpc('lh_ping')) === true; }
  async get(k) { return await this.rpc('lh_get', { k }); }
  put(k, v) { return this._chain(() => this.rpc('lh_put', { k, v })); }
  async loadKid(id) { const k = KIDS.find(x => x.id === id); return Object.assign(blankKid(k), (await this.get('kids/' + id)) || {}); }
  async saveKid(kid) { kid.updated = Date.now(); return this.put('kids/' + kid.id, JSON.parse(JSON.stringify(kid))); }
  appendLog(kidId, ev) { return this._chain(() => this.rpc('lh_log', { k: 'kids/' + kidId + '/logs/' + today(), ev })); }
  async loadLogs(kidId, days = 14) { const rows = await this.rpc('lh_list', { prefix: 'kids/' + kidId + '/logs/', lim: days }); return (rows || []).map(r => r.value).reverse(); }
  async loadPrefix(prefix, lim = 7) { return (await this.rpc('lh_list', { prefix, lim })) || []; }
  async loadSettings() { return Object.assign({ pinHash: null, examDate: null, examTitle: '' }, (await this.get('settings/main')) || {}); }
  saveSettings(st) { return this.put('settings/main', JSON.parse(JSON.stringify(st))); }
  _poll(fn) { const h = setInterval(() => { if (!document.hidden) fn().catch(() => {}); }, 20000); return () => clearInterval(h); }
  subscribeKid(id, cb) { return this._poll(async () => { const v = await this.get('kids/' + id); if (v) cb(Object.assign(blankKid(KIDS.find(x => x.id === id)), v)); }); }
  subscribeLogs(id, cb) { return this._poll(async () => cb(await this.loadLogs(id, 14))); }
  exportCode() { return null; }
}
function readFamilyKey() {
  // the key travels as #k=KEY~route in the shared link, then lives in ?k=KEY so a home-screen icon (iPhone: separate storage) keeps it
  const m = (location.hash || '').match(/^#k=([A-Za-z0-9]+)(?:~([a-z0-9]+))?/);
  let q = null; try { q = new URLSearchParams(location.search).get('k'); } catch (e) {}
  const key = (m && m[1]) || (q && /^[A-Za-z0-9]+$/.test(q) ? q : null);
  if (key) { try { localStorage.setItem('lh.fk', key); } catch (e) {} }
  if (m && m[2] && (m[2] === 'ouer' || /^[a-z0-9]+$/.test(m[2]))) { try { localStorage.setItem('lh.lock', m[2]); if (m[2] !== 'ouer') localStorage.setItem('lh.kid', m[2]); else localStorage.removeItem('lh.kid'); } catch (e) {} }
  if (m) { try { history.replaceState(null, '', location.pathname + '?k=' + m[1] + '#' + (m[2] || 'profiel')); } catch (e) { location.hash = m[2] || 'profiel'; } }
  if (key) return key;
  try { return localStorage.getItem('lh.fk'); } catch (e) { return null; }
}
function notify(kid, ev) {
  // own-website mode only: built-in Web Push (Supabase function lh-notify) and/or the ntfy app; simple requests (no preflight)
  const st = S.settings || {}; if (S.storeKind !== 'supa' || !ev || !kid) return;
  if ((ev.type === 'login' || ev.type === 'logout') && (KIDS.find(k => k.id === kid.id) || {}).role === 'player') return;
  const EN = pushLang() === 'en', A = EN ? UI.en : UI.af, hm = new Date().toTimeString().slice(0, 5); let title, message, tags, tag = '', log = null;
  if (['quiz', 'exam', 'paper', 'scope', 'redo', 'challenge'].includes(ev.type)) {
    title = `${kid.name}: ${A.ev[ev.type]} ${ev.score}%`; message = `${ev.label || ''}\n${ev.correct}/${ev.total} · +${ev.xp} XP · ${Math.max(1, Math.round((ev.secs || 0) / 60))} min`;
    tags = [ev.score >= 80 ? 'tada' : ev.score >= 50 ? 'books' : 'warning'];
  } else if (ev.type === 'coach') {
    const key = 'lh.ntfy.coach.' + kid.id + '.' + today(); try { if (localStorage.getItem(key)) return; localStorage.setItem(key, '1'); } catch (e) {}
    title = EN ? `${kid.name} asked the coach` : `${kid.name} vra die afrigter`; message = (ev.label || '') + (EN ? '\nSee the parent panel → Coach chats' : '\nKyk in die ouerpaneel → Afrigter-gesprekke'); tags = ['robot'];
  } else if (ev.type === 'login') {
    title = EN ? `🟢 ${kid.name} opened Leerhoek` : `🟢 ${kid.name} het Leerhoek oopgemaak`; message = EN ? `Started learning · ${hm}` : `Begin leer · ${hm}`; tags = ['green_circle'];
  } else if (ev.type === 'logout') {
    title = EN ? `⚪ ${kid.name} closed Leerhoek` : `⚪ ${kid.name} het Leerhoek toegemaak`; message = `${ev.mins < 1 ? '<1' : ev.mins} min · ${ev.tests} ${EN ? (ev.tests === 1 ? 'test' : 'tests') : (ev.tests === 1 ? 'toets' : 'toetse')} · +${ev.xp} XP · ${hm}`; tags = ['white_circle'];
    log = { type: 'logout', mins: ev.mins, tests: ev.tests, xp: ev.xp };
  } else return;
  const beacon = ev.type === 'logout';
  if (st.push) pushSend({ title, body: message, tag, url: './#ouer', kid: kid.id, log }, beacon);
  else if (log) S.store.appendLog(kid.id, Object.assign({ t: Date.now() }, log)).catch(() => {});
  if (useNtfy()) pushNtfy({ topic: st.ntfyTopic, title: title.replace(/^[🟢⚪] /u, ''), message, tags }, beacon);
}
function useNtfy() { const st = S.settings || {}; return !!st.ntfyTopic && (st.ntfyOn === true || (st.ntfyOn === undefined && !st.push)); }
function pushNtfy(obj, beacon) {
  const body = JSON.stringify(obj);
  try { if (beacon && navigator.sendBeacon && navigator.sendBeacon('https://ntfy.sh/', body)) return; } catch (e) {}
  try { fetch('https://ntfy.sh/', { method: 'POST', body, keepalive: true }).catch(() => {}); } catch (e) {}
}
/* built-in notifications: the Supabase Edge Function "lh-notify" keeps the parents' devices and sends Web Push to them */
function pushUrl() { const c = window.LH_CONFIG; return c && c.supabaseUrl ? c.supabaseUrl.replace(/\/$/, '') + '/functions/v1/lh-notify' : null; }
function pushBody(action, extra) { return JSON.stringify(Object.assign({ action, fk: S.store.fk, apikey: S.store.key }, extra || {})); }
function pushSend(msg, beacon) {
  const url = pushUrl(); if (!url || !S.store || !S.store.fk) return;
  const body = pushBody('send', msg);
  try { if (beacon && navigator.sendBeacon && navigator.sendBeacon(url, body)) return; } catch (e) {}
  try { fetch(url, { method: 'POST', body, keepalive: true }).catch(() => {}); } catch (e) {}
}
async function pushCall(action, extra) {
  const r = await fetch(pushUrl(), { method: 'POST', body: pushBody(action, extra) });
  let j = null; try { j = await r.json(); } catch (e) {}
  if (!r.ok) { const err = new Error((j && j.error) || ('HTTP ' + r.status)); err.status = r.status; err.data = j; throw err; }
  return j || {};
}
/* study sessions: a push each time a boy opens Leerhoek, and one with a summary each time he closes it or switches away */
const isParentDevice = () => { try { return localStorage.getItem('lh.parentDevice') === '1'; } catch (e) { return false; } };
function ensureSession() {
  if (!S.kid || S.storeKind !== 'supa' || ['parent', 'gate'].includes(S.route.s) || document.hidden || isParentDevice() || adminViewing()) return;
  if (S.sess && S.sess.kid === S.kid.id) return;
  if (S.sess) endSession(); // switched to the other boy on the same device
  S.sess = { kid: S.kid.id, name: S.kid.name, start: Date.now(), tests: 0, xp: 0 };
  const ev = { type: 'login', t: Date.now() }; S.store.appendLog(S.kid.id, ev).catch(() => {}); notify(S.kid, ev);
}
function endSession() {
  const se = S.sess; S.sess = null; if (!se) return;
  const mins = Math.floor((Date.now() - se.start) / 60000);
  notify({ id: se.kid, name: se.name }, { type: 'logout', mins, tests: se.tests, xp: se.xp });
}
async function initStore() {
  S.store = new LocalStore(); S.storeKind = 'local';
  const cfg = window.LH_CONFIG;
  if (cfg && cfg.supabaseUrl) {
    const fk = readFamilyKey();
    if (!fk) { S.keyProblem = 'missing'; return; }
    const st = new SupaStore(cfg.supabaseUrl, cfg.supabaseKey, fk);
    try { if (await st.ping()) { S.store = st; S.storeKind = 'supa'; S.keyProblem = null; await loadHousehold(); return; } S.keyProblem = 'bad'; }
    catch (e) { S.keyProblem = 'offline'; }
    return;
  }
  try {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    const db = await window.claude.use('db');
    if (!db) return;
    const user = await window.claude.use('user');
    const canWrite = user ? await user.can('data.write') : null;
    if (canWrite === false) return; // viewer-only: keep local so the boys can still work
    // probe once: read settings (cheap) — if the bridge is dead this throws and we stay local
    await db.doc('settings/main').get();
    S.store = new DbStore(db); S.storeKind = 'db';
  } catch (e) { S.store = new LocalStore(); S.storeKind = 'local'; }
}

/* ------------------------------------------------------------------ v10: household + family circle */
async function loadHousehold() {
  let me = null, prof = null, circle = [];
  try { me = await S.store.rpc('lh_me'); } catch (e) {}
  try { prof = await S.store.get('household/profile'); } catch (e) {}
  if (me) { try { circle = (await S.store.rpc('lh_circle')) || []; } catch (e) {} }
  S.houseMe = me; S.houseProf = prof; S.houseCircle = circle; S._circleAt = Date.now(); S._circleSig = JSON.stringify(circle || []);
  applyHousehold(me, prof, circle);
}
function applyHousehold(me, prof, circle) {
  const kids = prof && Array.isArray(prof.kids) && prof.kids.length ? prof.kids : LEGACY_KIDS;
  const pars = prof && Array.isArray(prof.parents) && prof.parents.length ? prof.parents : LEGACY_PARENTS;
  KIDS.splice(0, KIDS.length, ...kids.map(k => Object.assign({ role: 'learner', grade: 7, avatar: '🙂', school: '' }, k)));
  PARENTS.splice(0, PARENTS.length, ...pars.map(p => Object.assign({ avatar: '🙂' }, p)));
  HOUSE = { id: (me && me.id) || null, name: (me && me.name) || (prof && prof.name) || '', circle: (me && me.circle) || null, owner: !!(me && me.owner), legacy: !prof || !!prof.legacy };
  applyLangs(prof);
  CIRCLE.splice(0, CIRCLE.length);
  (circle || []).forEach(hh => {
    if (!hh || hh.me || !hh.profile) return; const p = hh.profile;
    (p.kids || []).forEach(k => CIRCLE.push({ id: k.id, name: k.name, avatar: k.avatar || '🙂', kid: true, role: k.role || 'learner', grade: k.grade, hid: hh.hid, house: hh.name }));
    (p.parents || []).forEach(x => CIRCLE.push({ id: x.id, name: x.circleName || x.name, avatar: x.avatar || '🙂', kid: false, hid: hh.hid, house: hh.name }));
  });
  rebuildFamily();
  personalizeUi();
}
/* v10.3: the household's languages (profile.lang = start language, profile.langs = what the AF/EN switch offers) */
function houseLangs(prof) { const ls = prof && Array.isArray(prof.langs) ? prof.langs.filter(x => x === 'af' || x === 'en') : []; return ls.length ? ls : ['af', 'en']; }
function setLangQuiet(l) { L = l; try { localStorage.setItem('lh.lang', l); } catch (e) {} document.documentElement.lang = l; const box = document.getElementById('lang'); if (box) box.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.l === l)); }
function applyLangs(prof) {
  const langs = houseLangs(prof); S.langs = langs;
  let saved = null; try { saved = localStorage.getItem('lh.lang'); } catch (e) {}
  const want = saved && langs.includes(saved) ? saved : (prof && langs.includes(prof.lang) ? prof.lang : (langs.includes(L) ? L : langs[0]));
  if (want !== L) { L = want; document.documentElement.lang = L; }
  const box = document.getElementById('lang');
  if (box) { box.style.display = langs.length < 2 ? 'none' : ''; box.querySelectorAll('button').forEach(b => { b.style.display = langs.includes(b.dataset.l) ? '' : 'none'; b.classList.toggle('on', b.dataset.l === L); }); }
}
const pushLang = () => (S.houseProf && S.houseProf.lang === 'en') ? 'en' : 'af';
const langCodeOf = (prof) => { const ls = houseLangs(prof); return ls.length === 1 && ls[0] === 'en' ? 'en' : (prof && prof.lang === 'en') ? 'en2' : 'af'; };
const langOf = (v) => v === 'en' ? { lang: 'en', langs: ['en'] } : v === 'en2' ? { lang: 'en', langs: ['af', 'en'] } : { lang: 'af', langs: ['af', 'en'] };
function setupLangOpts(cur) { return [['af', t('suLangAf')], ['en2', t('suLangEn2')], ['en', t('suLangEn')]].map(([v, l]) => `<option value="${v}" ${v === cur ? 'selected' : ''}>${esc(l)}</option>`).join(''); }
/* the subjects a parent can tick for a grade: real content, or the placeholders for a grade without content */
function gradeSubjList(g) {
  const C = S.content; if (!C) return [];
  const e = C.grades.find(x => +x.grade === +g);
  if (!e) return phaseStubIds(g).map(id => ({ id, name: stubSubj(id, null, g).name }));
  return e.subjects.map(s => ({ id: s.id, name: s.name || ((C.byGrade[+g] || {})[s.id] || {}).name || s.id }));
}
function subjTicks(list, skip, attr, idx) {
  if (!list.length) return '';
  const n = list.filter(x => !skip.includes(x.id)).length;
  return `<details class="subjticks" style="margin-top:8px;width:100%"><summary class="small">📚 ${esc(tf('suSubj', { n, m: list.length }))}</summary><div class="row" style="gap:6px 14px;flex-wrap:wrap;margin-top:6px">${list.map(x => `<label class="small" style="display:inline-flex;gap:4px;align-items:center"><input type="checkbox" ${attr}="${idx}" value="${esc(x.id)}" ${skip.includes(x.id) ? '' : 'checked'}> ${esc(tx(x.name))}</label>`).join('')}</div><div class="small muted" style="margin-top:4px">${esc(t('suSubjHelp'))}</div></details>`;
}
/* other households: their own names instead of Diaan/Stefan/Unika in the texts (h1 keeps the original texts) */
function personalizeUi() {
  if (HOUSE.legacy) return;
  const learners = KIDS.filter(k => k.role !== 'player'), kn = (learners.length ? learners : KIDS).map(k => k.name), pn = PARENTS.map(p => p.name);
  const andJ = (a, w) => a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' ' + w + ' ' + a[a.length - 1];
  UI.af.tagline = (kn.length ? andJ(kn, '&') : 'Leerhoek') + ' se studieplatform';
  UI.en.tagline = kn.length ? andJ(kn, '&') + "'s study platform" : 'Leerhoek study platform';
  UI.af.parentSub = andJ(pn, '&'); UI.en.parentSub = andJ(pn, '&');
  const all = KIDS.map(k => k.name).concat(pn);
  UI.af.chatSub = `Net vir ${andJ(all, 'en')} – niemand anders kan dit sien nie.`;
  UI.en.chatSub = `Only for ${andJ(all, 'and')} – nobody else can see it.`;
  UI.af.chalSub = 'Dieselfde 10 vrae vir almal in jou graad. Net jou eerste poging tel – wie wen hierdie week?';
  UI.en.chalSub = 'The same 10 questions for everyone in your grade. Only your first attempt counts – who wins this week?';
  UI.af.devSub = 'Elke toestel hoort aan een persoon. ’n Kind sien net sy of haar eie profiel. Die ouers (met die PIN) kan alles sien. Elke persoon se eie skakel koppel ’n toestel outomaties.';
  UI.en.devSub = "Every device belongs to one person. A child only sees their own profile. The parents (with the PIN) can see everything. Each person's own link links a device automatically.";
  if (learners.length !== 2) { UI.af.teBoth = 'Almal'; UI.en.teBoth = 'Everyone'; }
  if (!learners.some(k => /unika/i.test(k.school || ''))) {
    UI.af.examFormatT = 'Hoe lyk die vraestel'; UI.en.examFormatT = 'What the paper looks like';
    UI.af.resourcesIntro = 'Gratis handboeke, werkboeke en ou vraestelle.'; UI.en.resourcesIntro = 'Free textbooks, workbooks and past papers.';
    UI.af.provisionalHint = 'Voorlopige afbakening volgens CAPS. Die ouers werk dit by sodra die skool die regte afbakening stuur.';
    UI.en.provisionalHint = 'Provisional scope following CAPS. The parents will update it as soon as the school sends the real scope.';
    UI.af.scopeHelp = String(UI.af.scopeHelp).replace(/:[^:]*Unika[^.]*\./, ' volgens CAPS.');
    UI.en.scopeHelp = String(UI.en.scopeHelp).replace(/:[^:]*Unika[^.]*\./, ' following CAPS.');
  }
  UI.af.fam = Object.assign({}, UI.af.fam); UI.en.fam = Object.assign({}, UI.en.fam);
  PARENTS.forEach(p => { UI.af.fam[p.id] = p.name; UI.en.fam[p.id] = p.name; });
}
const kidGrade = (id) => +((KIDS.find(k => k.id === id) || {}).grade) || 7;
function curGrade() { const k = S.kid && KIDS.find(x => x.id === S.kid.id); return +(k && k.grade) || +S.grade || +((KIDS[0] || {}).grade) || 7; }
const houseGrades = () => [...new Set(KIDS.map(k => +k.grade || 7))];
const editGrades = () => [...new Set(KIDS.filter(k => k.role !== 'player').map(k => +k.grade || 7))];
function houseSubjects() { const seen = new Set(), out = []; houseGrades().forEach(g => subjectsOfGrade(g).forEach(s => { if (!seen.has(s.id)) { seen.add(s.id); out.push(s); } })); return out; }
/* exam scope per grade (h1 keeps v9's settings.exams for Grade 7) */
function examsFor(g) { const st = S.settings || {}; g = +g || 7; if (HOUSE.legacy && g === 7 && !(st.examsG && st.examsG[7])) return st.exams || {}; return (st.examsG || {})[g] || {}; }
function setExamsFor(g, ex) { g = +g || 7; if (HOUSE.legacy && g === 7) { S.settings.exams = ex; return; } S.settings.examsG = Object.assign({}, S.settings.examsG || {}); S.settings.examsG[g] = ex; }
const scopeGrade = () => { const gs = editGrades(); return S.scopeGrade && gs.includes(S.scopeGrade) ? S.scopeGrade : (gs[0] || 7); };
function gradeTabs() { const gs = editGrades(); return gs.length > 1 ? `<div class="row chipsel" style="gap:6px;margin:6px 0 4px">${gs.map(g => `<button type="button" class="chip ${g === scopeGrade() ? 'on' : ''}" data-sg="${g}">${esc(t('chooseGrade'))} ${g}</button>`).join('')}</div>` : ''; }
async function sha(s) { try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('lh:' + s)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''); } catch (e) { return 'plain:' + s; } }

/* ------------------------------------------------------------------ content */
/* v10: content per grade. content.js = the index of all grades + the first grade's subjects; other grades load on demand
   from their own bundle (content-gr8.js …) into window.LH_GRADE_BUNDLES[g]. S.content.subjects = the ACTIVE grade's subjects. */
async function loadContent() {
  const content = { grades: [], subjects: {}, byGrade: {} };
  if (window.CONTENT_BUNDLE) {
    content.grades = window.CONTENT_BUNDLE.index.grades;
    const g0 = +((content.grades.find(g => !g.bundle) || content.grades[0] || {}).grade) || 7;
    content.byGrade[g0] = Object.assign({}, window.CONTENT_BUNDLE.subjects); content.subjects = content.byGrade[g0];
    return content;
  }
  const idx = await (await fetch('content/index.json', { cache: 'no-cache' })).json();
  content.grades = idx.grades;
  const files = [];
  idx.grades.forEach(g => g.subjects.forEach(s => files.push(Object.assign({ grade: +g.grade }, s))));
  const results = await Promise.allSettled(files.map(f => fetch(f.file, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })));
  results.forEach((r, i) => { if (r.status === 'fulfilled') { const g = files[i].grade; (content.byGrade[g] = content.byGrade[g] || {})[files[i].id] = r.value; } });
  content.subjects = content.byGrade[+((content.grades[0] || {}).grade) || 7] || {};
  return content;
}
const _gradeLoads = {};
function ensureGrade(g) {
  g = +g || 7; const C = S.content; if (!C || C.byGrade[g]) return Promise.resolve();
  const ent = C.grades.find(x => +x.grade === g); if (!ent || !ent.bundle) { C.byGrade[g] = C.byGrade[g] || {}; return Promise.resolve(); }
  if (_gradeLoads[g]) return _gradeLoads[g];
  return (_gradeLoads[g] = new Promise((res) => {
    const sc = document.createElement('script'); sc.src = ent.bundle + (window.LH_VERSION ? '?v=' + window.LH_VERSION : '');
    sc.onload = () => { const b = (window.LH_GRADE_BUNDLES || {})[g]; C.byGrade[g] = (b && b.subjects) || {}; res(); };
    sc.onerror = () => { delete _gradeLoads[g]; res(); };
    document.head.appendChild(sc);
  }));
}
const _strip7 = {};
function gradeSubjects(g, school) {
  const map = (S.content && S.content.byGrade[+g]) || {};
  if (+g !== 7 || /unika/i.test(school || '')) return map;
  // the Grade 7 paper format + practice papers are Laerskool Unika's – other schools don't get them
  if (_strip7.src !== map) { _strip7.src = map; _strip7.out = {}; Object.keys(map).forEach(id => { const s = Object.assign({}, map[id]); delete s.examFormat; delete s.practiceExams; _strip7.out[id] = s; }); }
  return _strip7.out;
}
function setActiveGrade(g, school) { S.grade = +g || 7; S.gradeSchool = school || ''; if (S.content) S.content.subjects = gradeSubjects(S.grade, school); }
const subjectsOfGrade = (grade, kidId) => { grade = +grade || 7; const g = S.content.grades.find(x => +x.grade === grade); if (!g) return []; const map = grade === +S.grade ? S.content.subjects : gradeSubjects(grade, (KIDS.find(k => +k.grade === grade) || {}).school); const all = g.subjects.map(s => map[s.id]).filter(Boolean); const sk = skipSet(grade, kidId); const out = sk.size ? all.filter(s => !sk.has(s.id)) : all; return out.length ? out : all; };
/* v10.3: which subjects a learner doesn't take (profile kid.skip); in a parent view only what EVERY learner in the grade skips */
function skipSet(grade, kidId) {
  const me = kidId ? KIDS.find(k => k.id === kidId) : (S.kid && !(S.route && S.route.s === 'parent') ? KIDS.find(k => k.id === S.kid.id) : null);
  if (me && (+me.grade || 7) === +grade) return new Set(Array.isArray(me.skip) ? me.skip : []);
  const ls = KIDS.filter(k => k.role !== 'player' && (+k.grade || 7) === +grade).map(k => Array.isArray(k.skip) ? k.skip : []);
  return ls.length ? new Set(ls.reduce((a, b) => a.filter(x => b.includes(x)))) : new Set();
}
/* placeholder subjects (photos + notes questions only) for grades whose content isn't built yet; ids are the ones the real content will use */
const STUB_NAMES = { english: ['English', 'English'], afrikaans: ['Afrikaans', 'Afrikaans'], wiskunde: ['Wiskunde', 'Mathematics'], nwt: ['Natuurwetenskappe en Tegnologie', 'Natural Sciences and Technology'],
  'sosiale-wetenskappe': ['Sosiale Wetenskappe', 'Social Sciences'], lewensvaardighede: ['Lewensvaardighede', 'Life Skills'], natuurwetenskappe: ['Natuurwetenskappe', 'Natural Sciences'],
  ebw: ['EBW', 'EMS'], tegnologie: ['Tegnologie', 'Technology'], lewensorientering: ['Lewensoriëntering', 'Life Orientation'], 'kreatiewe-kunste': ['Kreatiewe Kunste', 'Creative Arts'] };
const STUB_ICON = { english: '🇬🇧', afrikaans: '🇿🇦', wiskunde: '📐', nwt: '🔬', 'sosiale-wetenskappe': '🌍', lewensvaardighede: '🌱', natuurwetenskappe: '🔬', ebw: '💼', tegnologie: '⚙️', lewensorientering: '🧭', 'kreatiewe-kunste': '🎨' };
function phaseStubIds(g) { g = +g; if (g <= 3) return ['english', 'afrikaans', 'wiskunde', 'lewensvaardighede']; if (g <= 6) return ['english', 'afrikaans', 'wiskunde', 'nwt', 'sosiale-wetenskappe', 'lewensvaardighede']; if (g <= 9) return ['wiskunde', 'natuurwetenskappe', 'sosiale-wetenskappe', 'ebw', 'tegnologie', 'lewensorientering', 'kreatiewe-kunste', 'afrikaans', 'english']; return ['english', 'afrikaans', 'wiskunde', 'lewensorientering']; }
const STUBS = {};
function stubSubj(id, name, grade) {
  const k = grade + ':' + id; if (STUBS[k]) return STUBS[k];
  const nm = STUB_NAMES[id] ? { af: STUB_NAMES[id][0], en: STUB_NAMES[id][1] } : { af: name || id, en: name || id };
  return (STUBS[k] = { id, grade: +grade, name: nm, short: nm, icon: STUB_ICON[id] || '📒', color: '#7c5cff', terms: [], stub: true, intro: { af: '', en: '' } });
}
const gradeHasContent = (g) => !!(S.content && S.content.grades.some(x => +x.grade === +g));
/* the placeholder + own extra subjects for a learner (or, in a parent view, for every learner in the grade) */
function stubSubjects(grade, kidId) {
  grade = +grade || 7;
  const me = kidId ? KIDS.find(k => k.id === kidId) : (S.kid && !(S.route && S.route.s === 'parent') ? KIDS.find(k => k.id === S.kid.id) : null);
  const ks = me ? [me] : KIDS.filter(k => k.role !== 'player' && (+k.grade || 7) === grade);
  const out = [], seen = new Set();
  if (!gradeHasContent(grade)) { const sk = skipSet(grade, kidId); phaseStubIds(grade).filter(id => !sk.has(id)).forEach(id => { seen.add(id); out.push(stubSubj(id, null, grade)); }); }
  ks.forEach(k => (Array.isArray(k.extra) ? k.extra : []).forEach(x => { if (x && x.id && !seen.has(x.id)) { seen.add(x.id); out.push(stubSubj(x.id, x.name, grade)); } }));
  return out;
}
function stubById(id) { for (const k in STUBS) if (STUBS[k].id === id && +STUBS[k].grade === curGrade()) return STUBS[k]; return stubSubjects(curGrade()).find(x => x.id === id) || null; }
const extraOf = (txt) => { const seen = new Set(); return String(txt || '').split(/[,;\n]/).map(x => x.trim()).filter(Boolean).slice(0, 8).map(n => ({ id: 'x-' + (String(n).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'vak'), name: n.slice(0, 40) })).filter(x => !seen.has(x.id) && seen.add(x.id)); };
const extraTxt = (k) => (Array.isArray(k.extra) ? k.extra : []).map(x => x.name).join(', ');
const subjById = (id) => (S.content.subjects || {})[id] || Object.values(S.content.byGrade || {}).map(m => m[id]).find(Boolean) || stubById(id) || null;
const allTopics = (subj) => subj.terms.flatMap(tm => tm.topics.map(tp => ({ tp, term: tm.term })));
function findTopic(topicId) { const maps = [S.content.subjects].concat(Object.values(S.content.byGrade || {})); for (const m of maps) for (const id in m) { const subj = m[id]; for (const tm of subj.terms) for (const tp of tm.topics) if (tp.id === topicId) return { subj, tp, term: tm.term }; } return null; }

/* ------------------------------------------------------------------ progress helpers */
const tprog = (kid, tid) => kid.topics[tid] || {};
function topicStatus(kid, tid) {
  const p = tprog(kid, tid);
  if (p.attempts) { if (p.best >= 90) return 'master'; if (p.best >= 70) return 'good'; return 'practice'; }
  if (p.read || p.flash || p.ex) return 'read';
  return 'new';
}
function topicPct(kid, tid) { const p = tprog(kid, tid); if (p.attempts) return p.best; let v = 0; if (p.read) v += 12; if (p.flash) v += 8; if (p.ex) v += 10; return v; }
function subjectPct(kid, subj) { const ts = allTopics(subj); if (!ts.length) return 0; return Math.round(ts.reduce((a, x) => a + topicPct(kid, x.tp.id), 0) / ts.length); }
function setSubjectColor(c) { document.documentElement.style.setProperty('--subject', c || '#2f6df6'); }
/* school report helpers */
function schoolTerms(kid) { const t = kid.school && kid.school.terms; return t ? Object.keys(t).filter(k => Object.values(t[k] || {}).some(v => typeof v === 'number')).sort() : []; }
const schoolKey = (sid) => sid === 'kreatiewe-kunste' ? 'kk' : sid;
function schoolMark(kid, sid, term) { const ts = schoolTerms(kid); if (!ts.length) return null; sid = schoolKey(sid); if (term) { const v = (kid.school.terms[term] || {})[sid]; return typeof v === 'number' ? v : null; } for (let i = ts.length - 1; i >= 0; i--) { const v = kid.school.terms[ts[i]][sid]; if (typeof v === 'number') return v; } return null; }
function schoolMarkTerm(kid, sid) { const ts = schoolTerms(kid); sid = schoolKey(sid); for (let i = ts.length - 1; i >= 0; i--) if (typeof kid.school.terms[ts[i]][sid] === 'number') return ts[i]; return null; }
function passTarget(sid) { return PASS_TARGET[sid] || PASS_TARGET.default; }
const DEFAULT_GOAL = 60;
function goalOf(kid, sid) { const g = (kid && kid.goals) || {}, v = g[schoolKey(sid)]; return typeof v === 'number' ? v : (typeof g.default === 'number' ? g.default : DEFAULT_GOAL); }
const markCls = (v, pass, goal) => v === null || v === undefined ? '' : (pass !== null && v < pass) ? 'bad' : v < goal ? 'hi' : 'good';
const markBar = (v, pass, goal) => `<div class="mbar"><i class="${markCls(v, pass, goal)}" style="width:${v === null ? 0 : clamp(v, 0, 100)}%"></i>${pass !== null ? `<b class="pm" style="left:${pass}%" title="${esc(t('passL'))}"></b>` : ''}<b class="gm" style="left:${goal}%" title="${esc(t('goalL'))}"></b></div>`;
function focusSubjects(kid, subjects) {
  const ts = schoolTerms(kid); if (!ts.length) return [];
  return subjects.map(s => ({ s, mark: schoolMark(kid, s.id), target: passTarget(s.id) })).filter(x => x.mark !== null)
    .map(x => ({ ...x, margin: x.mark - x.target })).sort((a, b) => a.margin - b.margin).slice(0, 4);
}

async function award(kid, xp, ev) {
  const before = levelOf(kid.xp), beforeBadges = kid.badges.slice();
  kid.xp += xp;
  // streak
  const d = today();
  if (kid.streak.last !== d) {
    if (kid.streak.last && daysBetween(kid.streak.last, d) === 1) kid.streak.count += 1; else kid.streak.count = 1;
    kid.streak.last = d;
  }
  // badges
  const has = (b) => kid.badges.includes(b);
  if (!has('first') && kid.totals.quizzes >= 1) kid.badges.push('first');
  if (!has('five') && kid.totals.quizzes >= 5) kid.badges.push('five');
  if (!has('perfect') && ev && ev.type === 'quiz' && ev.score === 100) kid.badges.push('perfect');
  if (!has('streak3') && kid.streak.count >= 3) kid.badges.push('streak3');
  if (!has('streak7') && kid.streak.count >= 7) kid.badges.push('streak7');
  if (!has('reader') && kid.totals.reads >= 10) kid.badges.push('reader');
  if (!has('xp1000') && kid.xp >= 1000) kid.badges.push('xp1000');
  if (!has('scope') && ev && ev.type === 'scope' && ev.score >= 80) kid.badges.push('scope');
  if (!has('fixer') && (kid.totals.fixed || 0) >= 25) kid.badges.push('fixer');
  if (!has('brain') && (kid.totals.games || 0) >= 10) kid.badges.push('brain');
  // weekly XP (twin challenge) and today's test count (treasure chest)
  const wk = weekId(); if (!kid.week || kid.week.w !== wk) kid.week = { w: wk, xp: 0 }; kid.week.xp += xp;
  if (ev && ['quiz', 'exam', 'paper', 'scope', 'redo', 'challenge'].includes(ev.type)) { if (!kid.day || kid.day.d !== d) kid.day = { d, tests: 0 }; kid.day.tests++; if (S.sess && S.sess.kid === kid.id) S.sess.tests++; }
  if (S.sess && S.sess.kid === kid.id) S.sess.xp += xp;
  if (ev) { const m = missionOf(kid); if (!m.done) { if (m.k === 'tests' && ['quiz', 'exam', 'paper', 'scope', 'redo', 'challenge'].includes(ev.type)) m.p++; if (m.k === 'games' && ev.type === 'game') m.p++; if (m.p >= m.n) missionComplete(kid); } }
  if (!has('subject') && ev && ev.subject) { const subj = subjById(ev.subject); if (subj && !subj.stub && allTopics(subj).every(x => (tprog(kid, x.tp.id).best || 0) >= 70)) kid.badges.push('subject'); }
  if (ev) {
    ev.t = Date.now(); ev.xp = xp;
    const s = ev.subject ? subjById(ev.subject) : null, f = ev.topic ? findTopic(ev.topic) : null;
    const pe = ev.paper ? findPaper(ev.paper) : null;
    const pl = pushLang(), po = pl === 'en' ? 'af' : 'en';
    if (!ev.label) ev.label = [s ? (s.short[pl] || s.short[po]) : null, f ? (f.tp.title[pl] || f.tp.title[po]) : null, pe ? (pe.ex.title[pl] || pe.ex.title[po]) : null].filter(Boolean).join(' · ');
  }
  await S.store.saveKid(kid);
  if (ev) { S.store.appendLog(kid.id, ev).catch(() => {}); notify(kid, ev); }
  renderWho();
  const after = levelOf(kid.xp);
  const newBadges = kid.badges.filter(b => !beforeBadges.includes(b));
  if (after > before) showModal('⬆️', t('levelUp'), `${t('nowLevel')} ${t('level')} ${after} – ${levelName(after)}`);
  else if (newBadges.length) showModal(BADGE_ICONS[newBadges[0]], t('newBadge'), t('badgeNames')[newBadges[0]][0]);
  else if (xp > 0) toast(`+${xp} XP`);
}

/* ------------------------------------------------------------------ ui helpers */
let toastTimer;
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2200); }
function showModal(icon, title, body) {
  const ov = document.createElement('div'); ov.className = 'overlay';
  ov.innerHTML = `<div class="modal"><div class="big">${icon}</div><h2>${esc(title)}</h2><p style="margin:8px 0 18px">${esc(body)}</p><button class="btn hi" id="mClose">${esc(t('close'))}</button></div>`;
  document.body.appendChild(ov); confetti(90);
  $('#mClose', ov).onclick = () => ov.remove();
  ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
}
function confetti(n = 120) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = $('#confetti'); c.hidden = false; const ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const cols = ['#ffc233', '#2f6df6', '#16a34a', '#db2777', '#9333ea', '#ea580c'];
  const ps = Array.from({ length: n }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * 200, r: 4 + Math.random() * 6, c: cols[Math.floor(Math.random() * cols.length)], vy: 2 + Math.random() * 3, vx: -1.5 + Math.random() * 3, a: Math.random() * 6.3, va: -0.2 + Math.random() * 0.4 }));
  let frame = 0;
  const tick = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); ctx.restore(); });
    if (++frame < 170) requestAnimationFrame(tick); else { ctx.clearRect(0, 0, c.width, c.height); c.hidden = true; }
  };
  requestAnimationFrame(tick);
}
async function copyText(s) { try { await navigator.clipboard.writeText(s); return true; } catch (e) { try { const ta = document.createElement('textarea'); ta.value = s; document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok; } catch (e2) { return false; } } }
const ring = (pct) => { const r = 23, c = 2 * Math.PI * r; return `<div class="ring"><svg viewBox="0 0 54 54"><circle class="track" cx="27" cy="27" r="${r}"/><circle class="bar" cx="27" cy="27" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"/></svg><div class="val num">${pct}%</div></div>`; };
const statusChip = (st) => `<span class="chip ${st === 'master' ? 'hi' : st === 'good' ? 'good' : st === 'practice' ? 'bad' : st === 'read' ? 'subject' : ''}">${esc(t('status.' + st))}</span>`;
const mascot = () => `<svg class="mascot" viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="112" rx="34" ry="6" fill="rgba(0,0,0,0.12)"/><ellipse cx="60" cy="78" rx="26" ry="32" fill="#d9a066"/><ellipse cx="60" cy="84" rx="16" ry="22" fill="#f3d3a3"/><circle cx="60" cy="42" r="24" fill="#d9a066"/><circle cx="40" cy="26" r="7" fill="#b9814a"/><circle cx="80" cy="26" r="7" fill="#b9814a"/><ellipse cx="50" cy="42" rx="8" ry="9" fill="#6b3f1d"/><ellipse cx="70" cy="42" rx="8" ry="9" fill="#6b3f1d"/><g class="eye"><circle cx="50" cy="42" r="4.5" fill="#fff"/><circle cx="70" cy="42" r="4.5" fill="#fff"/><circle cx="51.5" cy="42.5" r="2.4" fill="#1b2340"/><circle cx="71.5" cy="42.5" r="2.4" fill="#1b2340"/></g><ellipse cx="60" cy="54" rx="4" ry="3" fill="#3b2314"/><path d="M54 59q6 5 12 0" stroke="#3b2314" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="78" y="62" width="26" height="20" rx="4" fill="#ffc233" transform="rotate(-12 91 72)"/><path d="M83 69h14M83 75h10" stroke="#1f2a5c" stroke-width="2.4" stroke-linecap="round" transform="rotate(-12 91 72)"/></svg>`;

/* ------------------------------------------------------------------ routing */
function go(hash) { location.hash = hash; }
function parseRoute() {
  const h = (location.hash || '').replace(/^#/, '');
  if (!h || h === 'home' || h === 'tuis') return { s: 'home' };
  { const sm = h.match(/^s=([A-Za-z0-9]+)((?:~[a-z]+)*)$/); if (sm) { const fl = sm[2].split('~').filter(Boolean); return { s: 'setup', code: sm[1], lang: fl.includes('en') ? 'en' : fl.includes('af') ? 'af' : null, sep: fl.includes('sep') }; } }
  if (KIDS.some(k => k.id === h)) return { s: 'home', kid: h };
  if (h === 'ouer' || h === 'parent') return { s: 'parent' };
  if (h === 'vakke') return { s: 'subjects' };
  if (h === 'kentekens') return { s: 'badges' };
  if (h === 'hulpbronne') return { s: 'resources' };
  if (h === 'profiel') return { s: 'gate' };
  if (h === 'eksamens') return { s: 'exams' };
  if (h === 'foute') return { s: 'mistakes' };
  if (h === 'speel') return { s: 'games' };
  if (h === 'uitdaging') return { s: 'week' };
  if (h === 'woordeboek') return { s: 'dict' };
  if (h === 'afrigter') return { s: 'coach' };
  if (h === 'skaak' || h === 'vraagspel') return { s: 'chess' };
  if (h === 'rooster') return { s: 'rooster' };
  if (h === 'klets') return { s: 'chat' };
  let m;
  if ((m = h.match(/^skaak-([A-Za-z0-9]+)$/))) return { s: 'chessGame', id: m[1] };
  if ((m = h.match(/^afbakening-(.+)$/))) return { s: 'scope', id: m[1] };
  if ((m = h.match(/^herdoen(?:-(.+))?$/))) return { s: 'redo', id: m[1] || 'all' };
  if ((m = h.match(/^spel-(.+)$/))) return { s: 'game', id: m[1] };
  if ((m = h.match(/^vak-(.+)$/))) return { s: 'subject', id: m[1] };
  if ((m = h.match(/^onderwerp-(.+)$/))) return { s: 'topic', id: m[1] };
  if ((m = h.match(/^toets-(.+)$/))) return { s: 'quiz', id: m[1] };
  if ((m = h.match(/^notas-([a-z0-9]+)$/))) return { s: 'notes', id: m[1] };
  if ((m = h.match(/^eksamen-(.+)$/))) return { s: 'exam', id: m[1] };
  if ((m = h.match(/^vraestel-(.+)$/))) return { s: 'paper', id: m[1] };
  return { s: 'home' };
}
function nav() {
  const r = parseRoute();
  if (r.s === 'setup') { $('#bottomnav').innerHTML = ''; $('#desknav').innerHTML = ''; return; }
  const parentDev = deviceLock() === 'ouer';
  const items = parentDev && !S.kid ? [['parent', '👪', t('parent')], ['chess', '♟️', t('navChess')], ['chat', '💬', t('navChat')]] : [['home', '🏠', t('home')], ['subjects', '📚', t('subjects')], ['exams', '🎯', t('navExams')], ['games', '🎮', t('navPlay')], ['dict', '📖', t('navDict')], ['parent', '👪', t('parent')]];
  const hashes = { home: 'home', subjects: 'vakke', exams: 'eksamens', games: 'speel', dict: 'woordeboek', parent: 'ouer', badges: 'kentekens', resources: 'hulpbronne', chess: 'skaak', chat: 'klets' };
  const groups = { subjects: ['subject', 'topic', 'quiz', 'exam', 'paper', 'resources'], exams: ['scope', 'mistakes', 'redo', 'rooster'], games: ['game', 'week', 'badges', 'chess', 'chessGame'], chess: ['chessGame'] };
  const on = (k) => (r.s === k || (groups[k] || []).includes(r.s)) ? 'on' : '';
  $('#bottomnav').innerHTML = items.map(([k, ic, lb]) => `<button class="${on(k)}" data-go="${hashes[k]}"><span class="ic">${ic}</span>${esc(lb)}</button>`).join('');
  $('#desknav').innerHTML = items.map(([k, ic, lb]) => `<button class="${on(k)}" data-go="${hashes[k]}">${esc(lb)}</button>`).join('');
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  updateSocialUi();
}
function renderWho() {
  const w = $('#whoBtn');
  const asP = me(); if (asP && !asP.kid) { w.hidden = false; $('#whoAv').textContent = asP.avatar; $('#whoNm').textContent = asP.name; return; }
  if (!S.kid) { w.hidden = true; return; }
  w.hidden = false; $('#whoAv').textContent = S.kid.avatar; $('#whoNm').innerHTML = `${esc(S.kid.name)}<span class="num"> · ${S.kid.xp} XP</span>`;
}
function flushTime() {
  if (!S.kid || !S.tStart) return;
  const secs = Math.round((Date.now() - S.tStart) / 1000); S.tStart = Date.now();
  if (secs > 0 && secs < 3600) { S.kid.totals.secs = (S.kid.totals.secs || 0) + secs; S._dirtyTime = (S._dirtyTime || 0) + secs; }
  if (S._dirtyTime > 120) { S._dirtyTime = 0; S.store.saveKid(S.kid).catch(() => {}); }
}
async function render() {
  flushTime(); S.tStart = Date.now();
  const r = parseRoute(); S.route = r;
  const main = $('#main'); main.scrollTop = 0; window.scrollTo(0, 0);
  document.querySelectorAll('.overlay').forEach(o => o.remove());
  if (S.paperTimer) { clearInterval(S.paperTimer); S.paperTimer = null; }
  clearGame();
  if (S.asParent && !SOCIAL.includes(r.s) && r.s !== 'parent') setAsParent(false);
  if (r.kid && r.kid !== S.kidId && S.store && !(window.LH_CONFIG && S.keyProblem)) await selectKid(r.kid);
  if (lockedKid() && (!S.kid || !kidAllowed(S.kid.id)) && S.store && !(window.LH_CONFIG && S.keyProblem)) await selectKid(lockedKid());
  nav(); renderWho();
  if (!S.content) { main.innerHTML = `<div class="splash"><div>${mascot()}<h2 style="margin-top:12px">${esc(t('loading'))}</h2></div></div>`; return; }
  if (r.s === 'setup') return renderSetup(main, r.code, r);
  if (r.s === 'parent') return renderParent(main);
  if (r.s === 'resources') return renderResources(main);
  if (window.LH_CONFIG && (S.keyProblem === 'missing' || S.keyProblem === 'bad')) return renderGate(main);
  if (SOCIAL.includes(r.s)) return renderSocial(main, r);
  if (!S.kid || r.s === 'gate') return renderGate(main);
  ensureSession();
  setSubjectColor(null);
  switch (r.s) {
    case 'home': return renderHome(main);
    case 'subjects': return renderSubjects(main);
    case 'subject': return renderSubject(main, r.id);
    case 'topic': return renderTopic(main, r.id);
    case 'quiz': return renderQuiz(main, r.id, 'topic');
    case 'exam': return renderQuiz(main, r.id, 'exam');
    case 'scope': return renderQuiz(main, r.id, 'scope');
    case 'redo': return renderQuiz(main, r.id, 'redo');
    case 'week': return renderQuiz(main, 'week', 'week');
    case 'notes': return renderNotesQuiz(main, r.id);
    case 'exams': return renderExams(main);
    case 'rooster': return renderRooster(main);
    case 'mistakes': return renderMistakes(main);
    case 'games': return renderGames(main);
    case 'game': return renderGame(main, r.id);
    case 'dict': return renderDict(main);
    case 'coach': return renderCoach(main);
    case 'paper': return renderPaper(main, r.id);
    case 'badges': return renderBadges(main);
    default: return renderHome(main);
  }
}
async function selectKid(id) {
  const k = KIDS.find(x => x.id === id); if (!k || !kidAllowed(id)) return;
  S.kidId = id; await ensureGrade(k.grade); setActiveGrade(k.grade, k.school); S.kid = await S.store.loadKid(id);
  try { localStorage.setItem('lh.kid', id); } catch (e) {}
  if (S._unsubKid) S._unsubKid();
  S._unsubKid = S.store.subscribeKid(id, (fresh) => { if (fresh.updated > (S.kid.updated || 0) + 1000) { S.kid = fresh; renderWho(); if (['home', 'subjects', 'subject'].includes(S.route.s)) render(); } });
  renderWho();
}

/* ------------------------------------------------------------------ screens */
function linkPanel() {
  if (!window.LH_CONFIG || S.storeKind === 'supa') return '';
  const msg = S.keyProblem === 'bad' ? t('linkBad') : S.keyProblem === 'offline' ? t('linkOffline') : t('linkSub');
  return `<div class="card" style="margin-top:20px;text-align:left"><h3>🔗 ${esc(t('linkTitle'))}</h3><p class="small ${S.keyProblem === 'bad' ? '' : 'muted'}" style="margin:6px 0 10px;${S.keyProblem === 'bad' ? 'color:var(--bad)' : ''}">${esc(msg)}</p><form class="fillrow" id="linkf"><input id="linkin" autocomplete="off" placeholder="https://…#k=…"><button class="btn primary" type="submit">${esc(t('linkBtn'))}</button></form></div>`;
}
function wireLinkPanel() {
  const f = $('#linkf'); if (!f) return;
  f.onsubmit = (e) => { e.preventDefault(); const v = $('#linkin').value.trim(); const m = v.match(/k=([A-Za-z0-9]+)/) || v.match(/^([A-Za-z0-9]{16,})$/); if (!m) { toast(t('linkBad')); return; } try { localStorage.setItem('lh.fk', m[1]); } catch (er) {} location.href = location.pathname + '?k=' + m[1] + '#profiel'; };
}
function renderGate(main) {
  const blocked = window.LH_CONFIG && (S.keyProblem === 'missing' || S.keyProblem === 'bad');
  main.innerHTML = `<div class="gate">${mascot()}<h1>${esc(blocked ? t('linkTitle') : t('chooseProfile'))}</h1><p class="sub">${esc(t('tagline'))}</p>
  ${blocked ? '' : '<div class="profiles" id="profiles"></div>'}${linkPanel()}<div style="margin-top:20px;text-align:left">${instSlot()}</div></div>`;
  wireLinkPanel(); wireInstall();
  if (blocked) return;
  const box = $('#profiles'), lk = deviceLock();
  // one device = one person: a boy's device only shows his own profile, a parent device none
  Promise.all(KIDS.filter(k => lk === 'ouer' || kidAllowed(k.id)).map(k => S.store.loadKid(k.id))).then(kids => {
    box.innerHTML = kids.map(k => `<button class="profile" data-kid="${k.id}"><span class="big">${k.avatar}</span><span class="nm">${esc(k.name)}</span><span class="lv">${esc(t('level'))} ${levelOf(k.xp)} · ${k.xp} XP</span></button>`).join('')
      + `<button class="profile" data-parent="1"><span class="big">👪</span><span class="nm">${esc(t('parent'))}</span><span class="lv">${esc(t('parentSub'))}</span></button>`
      + (lk ? `<p class="small muted locknote" style="grid-column:1/-1">${esc(lk === 'ouer' ? t('lockParent') : tf('lockNote', { n: famName(lk) }))}</p>` : '');
    box.querySelectorAll('[data-kid]').forEach(b => b.onclick = async () => { const id = b.dataset.kid; if (!kidAllowed(id)) { S.afterUnlock = id; go('ouer'); return; } if (!deviceLock()) setLock(id); await selectKid(id); go('home'); });
    $('[data-parent]', box).onclick = () => go('ouer');
  });
}
function renderHome(main) {
  const kid = S.kid, subjects = subjectsOfGrade(curGrade());
  const lv = levelOf(kid.xp), next = xpForLevel(lv + 1), cur = xpForLevel(lv), pct = clamp(Math.round(100 * (kid.xp - cur) / (next - cur)), 0, 100);
  const acc = kid.totals.answered ? Math.round(100 * kid.totals.correct / kid.totals.answered) : 0;
  const focus = focusSubjects(kid, subjects);
  const plan = dailyPlan(kid), doneN = plan.filter(m => isDoneToday(kid, m.tp.id)).length;
  const nx = examList().find(x => x.days !== null && x.days >= 0);
  const exam = nx ? nx.days : (S.settings.examDate ? daysBetween(today(), S.settings.examDate) : null);
  const examLabel = nx ? `${nx.s.icon} ${tx(nx.s.name)} · ${fmtDate(nx.sc.date)}` : (S.settings.examTitle || '');
  const term = curTerm(), chest = chestState(kid), mc = mistakeCount(kid), wd = wordOfDay();
  main.innerHTML = `${adminBanner()}${instSlot()}
  <div class="hero">
    <div class="greet"><h1>${esc(t('hello'))}, <span style="--subject:var(--brand)">${esc(kid.name)}</span>! 👋</h1>
      <p class="muted" style="margin-top:6px">${esc(t('tagline'))}</p>
      <div class="row" style="margin-top:10px;gap:6px"><span class="chip hi">📅 ${esc(t('termNow'))} ${term}${term === 4 ? ' · ' + esc(t('finalTerm')) : ''}</span></div>
      ${S.storeKind === 'local' ? `<div class="banner" style="margin-top:12px"><span>💾 ${esc(window.LH_CONFIG ? t('notLinked') : t('localOnly'))}</span>${window.LH_CONFIG ? '' : `<button class="btn sm" id="copyCode">${esc(t('copyCode'))}</button>`}</div>` : ''}
      ${exam !== null && exam >= 0 ? `<div class="card countdown" id="cdown" style="margin-top:14px;cursor:pointer"><div class="n num">${exam}</div><div><b>${esc(nx ? t('nextExam') : t('examIn'))}${nx ? '' : ` ${exam} ${esc(t('examDays'))}`}</b>${nx ? ` <span class="small">${esc(t('exIn'))} ${exam} ${esc(t('days'))}</span>` : ''}<div class="small muted">${esc(examLabel)}</div></div></div>` : ''}
    </div>
    <div class="xpcard" id="xpc" style="cursor:pointer">
      <div class="label" style="color:rgba(255,255,255,.7)">${esc(t('level'))} ${lv}</div>
      <div class="lvl">${esc(levelName(lv))}</div>
      <div class="bar-h"><i style="width:${pct}%"></i></div>
      <div class="meta num"><span>${kid.xp} XP</span><span>${next} XP → ${esc(t('level'))} ${lv + 1}</span></div>
      <div class="stats"><div class="stat"><div class="v num"><span class="flame">🔥</span> ${kid.streak.count}</div><div class="k">${esc(t('streak'))}</div></div><div class="stat"><div class="v num">${kid.totals.quizzes}</div><div class="k">${esc(t('quizzes'))}</div></div><div class="stat"><div class="v num">🏅 ${kid.badges.length}</div><div class="k">${esc(t('badges'))}</div></div></div>
    </div>
  </div>
  ${missionCard(kid)}${chessHomeBanner()}${roosterHomeCard(kid)}<div id="kpHome" style="margin-top:14px"></div>
  <div class="tiles">
    <button class="card tile ${chest.ready ? 'ready' : ''}" id="chestT"><span class="ti">${chest.opened ? '💰' : '🎁'}</span><b>${esc(t('chestT'))}</b><span class="small muted">${chest.opened ? esc(t('chestDone')) : chest.ready ? esc(t('chestReady')) : `<span class="num">${Math.min(3, chest.tests)}/3</span> ${esc(t('testsToday'))}`}</span>${!chest.opened && !chest.ready ? `<div class="bar-h" style="margin-top:auto"><i style="width:${Math.round(100 * Math.min(3, chest.tests) / 3)}%;background:var(--hi)"></i></div>` : ''}</button>
    <button class="card tile" data-go="speel"><span class="ti">🏆</span><b>${esc(t('weekT'))}</b><span class="small" id="twinMini">…</span><span class="small muted">${esc(t('weekXpShort'))}</span></button>
    <button class="card tile" id="wotdT" style="--subject:${wd ? wd.s.color : 'var(--brand)'}"><span class="ti">📖</span><b>${esc(t('wotd'))}</b>${wd ? `<span class="wotd">${esc(dWord(wd))}</span><span class="small muted">${esc(dOther(wd))}</span>` : ''}</button>
    <button class="card tile" data-go="foute"><span class="ti">❌</span><b>${esc(t('mistakesT'))}</b><span class="big2 num">${mc}</span><span class="small muted">${esc(mc ? t('tapToRedo') : t('noMistakesShort'))}</span></button>
  </div>${coachCta()}
  ${focus.length ? (() => { const rows = subjects.map(s => ({ s, mark: schoolMark(kid, s.id), tm: schoolMarkTerm(kid, s.id), pass: passTarget(s.id), goal: goalOf(kid, s.id) })).filter(x => x.mark !== null).sort((a, b) => ((a.mark - a.pass) - (b.mark - b.pass)) || ((a.mark - a.goal) - (b.mark - b.goal)));
      const row = (x) => `<button class="mrow" data-subj="${x.s.id}"><span class="mn">${x.s.icon} ${esc(tx(x.s.short))}</span>${markBar(x.mark, x.pass, x.goal)}<span class="mv num ${markCls(x.mark, x.pass, x.goal)}">${x.mark}%</span><span class="ms small muted">${esc(t('passL'))} <span class="num">${x.pass}%</span> · 🎯 ${esc(t('goalL'))} <span class="num">${x.goal}%</span> · ${esc(t('termShort'))}${x.tm}</span></button>`;
      return `<div class="card" style="margin-top:18px"><div class="row" style="justify-content:space-between"><h2>🎓 ${esc(t('myMarks'))}</h2><span class="small muted">${esc(t('myMarksSub'))}</span></div>
      <div class="mlegend small muted"><span><i class="bad"></i>${esc(t('legBad'))}</span><span><i class="hi"></i>${esc(t('legHi'))}</span><span><i class="good"></i>${esc(t('legGood'))}</span><span><b class="pm"></b>${esc(t('passL'))}</span><span><b class="gm"></b>${esc(t('goalL'))}</span></div>
      <div class="mrows">${rows.slice(0, 4).map(row).join('')}</div>${rows.length > 4 ? `<details class="mmore"><summary class="small">${esc(t('showAllSubj'))} (${rows.length})</summary><div class="mrows">${rows.slice(4).map(row).join('')}</div></details>` : ''}</div>`; })() : ''}
  <div class="card mission" style="margin-top:18px"><div class="row" style="justify-content:space-between"><h2>🎯 ${esc(t('planT'))}</h2><span class="chip num">${doneN}/${plan.length}</span></div><p class="small muted">${esc(t('planSub'))}</p>
    <ul>${plan.map(m => { const done = isDoneToday(kid, m.tp.id), st = topicStatus(kid, m.tp.id); return `<li><button class="${done ? 'done' : ''}" data-go="${st === 'new' ? 'onderwerp-' : 'toets-'}${m.tp.id}" style="--subject:${m.s.color}"><span class="dot">${done ? '✓' : ''}</span><span><b>${esc(tx(m.tp.title))}</b><br><span class="small muted">${m.s.icon} ${esc(tx(m.s.short))} · ${esc(t('termShort'))}${m.term} · ${st === 'new' ? esc(t('learn')) : esc(t('test'))}${m.why ? ' · ' + esc(m.why) : ''}</span></span></button></li>`; }).join('')}</ul>
    ${plan.length && doneN === plan.length ? `<div class="banner" style="margin-top:10px">🎉 ${esc(t('planDone'))}</div>` : ''}
    <div class="row" style="margin-top:12px"><button class="btn sm" data-go="eksamens">🎯 ${esc(t('exT'))} →</button></div>
  </div>
  <div class="section-h"><h2>${esc(t('subjects'))}</h2><button class="btn sm ghost" id="share">${esc(t('shareProgress'))}</button></div>
  <div class="subjects">${subjects.map((s, i) => subjectCard(s, kid, i)).join('')}</div>`;
  wireSubjectCards(main);
  main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  wireInstall();
  const cd = $('#cdown'); if (cd) cd.onclick = () => go('eksamens');
  $('#xpc').onclick = () => go('kentekens');
  $('#chestT').onclick = () => { if (chestState(kid).ready) openChest(); else toast(t('chestSub')); };
  $('#wotdT').onclick = () => wordPopup(wd);
  const cc = $('#copyCode'); if (cc) cc.onclick = async () => { const code = S.store.exportCode(); if (code && await copyText(code)) toast(t('copied')); };
  $('#share').onclick = async () => { if (await copyText(reportText(kid, subjects))) toast(t('shareDone')); };
  fillTwin($('#twinMini'), true);
  kidPushCard($('#kpHome'));
  const misEl = $('#misC'); if (misEl) misEl.onclick = () => go(kid.mission && kid.mission.k === 'games' ? 'speel' : 'eksamens');
  maybeWelcome();
}
function subjectCard(s, kid, i) {
  const pct = subjectPct(kid, s), n = allTopics(s).length, done = allTopics(s).filter(x => topicStatus(kid, x.tp.id) !== 'new').length;
  return `<button class="subj" data-subj="${s.id}" style="--subject:${s.color};animation-delay:${i * 50}ms"><div class="row" style="justify-content:space-between"><span class="ic">${s.icon}</span>${ring(pct)}</div><div class="nm">${esc(tx(s.name))}</div><div class="foot"><span class="num">${done}/${n} ${esc(t('topics'))}</span></div></button>`;
}
function wireSubjectCards(root) { root.querySelectorAll('[data-subj]').forEach(b => b.onclick = () => go('vak-' + b.dataset.subj)); }
function renderSubjects(main) {
  const subjects = subjectsOfGrade(curGrade());
  main.innerHTML = `<div class="row" style="justify-content:space-between"><h1>${esc(t('subjects'))}</h1><button class="btn sm" data-go="hulpbronne">🔗 ${esc(t('resources'))}</button></div><p class="muted" style="margin:4px 0 16px">${esc(t('chooseGrade'))} ${curGrade()} · CAPS · ${esc(t('termNow'))} ${curTerm()}</p><div class="subjects">${subjects.map((s, i) => subjectCard(s, S.kid, i)).join('')}</div>${stubList(curGrade())}`;
  wireSubjectCards(main); $('[data-go]', main).onclick = () => go('hulpbronne');
  main.querySelectorAll('[data-stub]').forEach(b => b.onclick = () => go('vak-' + b.dataset.stub));
}
function stubList(g) {
  const st = stubSubjects(g); if (!st.length) return '';
  const real = subjectsOfGrade(g).length;
  return `<h3 style="margin:${real ? '22px' : '6px'} 0 6px">📒 ${esc(t(real ? 'stubMore' : 'stubT'))}</h3><p class="small muted" style="margin:0 0 10px">${esc(t(gradeHasContent(g) ? 'stubSubX' : 'stubSub'))}</p>
    <div class="stack" style="gap:8px">${st.map(s => `<button type="button" class="card row" data-stub="${esc(s.id)}" style="gap:12px;align-items:center;text-align:left;cursor:pointer;width:100%"><span style="font-size:26px">${s.icon}</span><span style="flex:1"><b>${esc(tx(s.name))}</b><br><span class="small muted">${esc(t('stubCard'))}</span></span><span>›</span></button>`).join('')}</div>`;
}
function renderStubSubject(main, s) {
  setSubjectColor(s.color);
  main.innerHTML = `<button class="back" data-go="vakke">← ${esc(t('subjects'))}</button>
    <div class="subhead"><span class="ic">${s.icon}</span><div class="t"><h1>${esc(tx(s.name))}</h1><p class="small muted">${esc(t(gradeHasContent(curGrade()) ? 'stubIntroX' : 'stubIntro'))}</p></div></div>
    ${photoCard(s) || `<div class="card" style="margin-top:10px"><p class="small muted">${esc(t('phOffline'))}</p></div>`}`;
  main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  wireSubjectPhotos(main, s);
}
function renderSubject(main, id) {
  const s = S.content.subjects[id] || stubById(id); if (!s) return go('vakke');
  if (s.stub) return renderStubSubject(main, s);
  setSubjectColor(s.color);
  const kid = S.kid, pct = subjectPct(kid, s);
  const ct = curTerm(), scope = new Set(scopeOf(s).topics);
  const sco = scopeOf(s), hasScope = !sco.provisional && sco.topics.length > 0;
  let term = S._term && S._term[id] || (hasScope ? 'scope' : (s.terms.find(tm => tm.term === ct && tm.topics.length) || s.terms.find(tm => tm.topics.length) || s.terms[0]).term);
  if (term === 'scope' && !hasScope) term = s.terms[0].term;
  const draw = () => {
    const tm = term === 'scope' ? { term: 'scope', title: { af: '🎯 Wat in die eksamen kom' + (sco.date ? ' · ' + fmtDate(sco.date) : ''), en: '🎯 What is in the exam' + (sco.date ? ' · ' + fmtDate(sco.date) : '') }, topics: sco.topics.map(x => findTopic(x)).filter(Boolean).map(f => f.tp) } : (s.terms.find(x => x.term === term) || s.terms[0]);
    const termOf = (tid) => { const f = findTopic(tid); return f ? f.term : ''; };
    main.innerHTML = `<button class="back" data-go="vakke">← ${esc(t('subjects'))}</button>
    <div class="subhead"><span class="ic">${s.icon}</span><div class="t"><h1>${esc(tx(s.name))}</h1><p class="small muted">${esc(tx(s.intro))}</p>${schoolMark(kid, s.id) !== null ? `<div class="row" style="margin-top:8px;gap:6px"><span class="chip">🏫 ${esc(t('school'))}</span>${[1, 2, 3, 4].map(tm => { const v = schoolMark(kid, s.id, String(tm)); return `<span class="chip ${markCls(v, passTarget(s.id), goalOf(kid, s.id))}">${esc(t('termShort'))}${tm}: <span class="num">${v === null ? '–' : v + '%'}</span></span>`; }).join('')}<span class="chip">${esc(t('passL'))} <span class="num">${passTarget(s.id)}%</span></span><span class="chip">🎯 ${esc(t('goalL'))} <span class="num">${goalOf(kid, s.id)}%</span></span></div>` : ''}</div>${ring(pct)}</div>
    <div class="row" style="margin-top:12px;justify-content:space-between"><details class="tips" style="flex:1;min-width:240px"><summary>💡 ${esc(t('examTips'))}</summary><ul>${(s.examTips || []).map(x => `<li>${esc(tx(x))}</li>`).join('')}</ul></details>
    <div class="row" style="gap:8px"><button class="btn subject" data-go="afbakening-${s.id}">🎯 ${esc(t('scopeTest'))}</button><button class="btn" data-go="eksamen-${s.id}">🎓 ${esc(t('examPractice'))}</button><button class="btn" id="playSubj">🎮 ${esc(t('navPlay'))}</button></div></div>
    ${s.examFormat ? `<details class="tips" style="margin-top:10px"><summary>📄 ${esc(t('examFormatT'))}</summary><div class="prose small" style="margin-top:6px">${md(tx(s.examFormat))}</div></details>` : ''}
    ${(s.practiceExams || []).length ? `<div class="card" style="margin-top:10px"><h3>📝 ${esc(t('papers'))}</h3><p class="small muted" style="margin:4px 0 10px">${esc(t('paperSub'))}</p><div class="stack" style="gap:8px">${s.practiceExams.map(ex => { const pp = (kid.papers || {})[ex.id]; return `<div class="row" style="justify-content:space-between"><div><b>${esc(tx(ex.title))}</b><div class="small muted num">${ex.total} ${esc(t('marks'))} · ${ex.minutes} ${esc(t('min'))}${pp ? ` · ${esc(t('bestMark'))} ${pp.best}% (${pp.attempts}×)` : ''}</div></div><button class="btn sm subject" data-go="vraestel-${ex.id}">${esc(t('startPaper'))} →</button></div>`; }).join('')}</div></div>` : ''}
    ${photoCard(s)}
    <div class="tabs">${hasScope ? `<button class="${term === 'scope' ? 'on' : ''}" data-term="scope">🎯 ${esc(t('scopeTab'))} <span class="num">(${sco.topics.length})</span></button>` : ''}${s.terms.map(x => `<button class="${x.term === term ? 'on' : ''}" data-term="${x.term}">${esc(t('term'))} ${x.term}${x.term === ct ? ' · ' + esc(t('now')) : ''} <span class="num">(${x.topics.length})</span></button>`).join('')}</div>
    <h3 style="margin:6px 0 10px">${esc(tx(tm.title))}</h3>
    <div class="topics">${tm.topics.length ? tm.topics.map((tp, i) => { const st = topicStatus(kid, tp.id), p = tprog(kid, tp.id); return `<div class="topic" style="animation-delay:${i * 40}ms"><div class="ix">${i + 1}</div><div><div class="tt">${esc(tx(tp.title))}</div><div class="bl">${esc(tx(tp.blurb))}</div><div class="row" style="gap:6px;margin-top:6px">${statusChip(st)}${p.attempts ? `<span class="chip num">${p.best}% · ${p.attempts}×</span>` : ''}${term === 'scope' ? `<span class="chip">${esc(t('termShort'))}${termOf(tp.id)}</span>` : (scope.has(tp.id) ? `<span class="chip hi">🎯 ${esc(t('inScope'))}</span>` : '')}${scope.has(tp.id) ? pagesChip(s, tp.id) : ''}</div></div><div class="acts"><button class="btn sm" data-go="onderwerp-${tp.id}">📖 ${esc(t('learn'))}</button><button class="btn sm subject" data-go="toets-${tp.id}">✏️ ${esc(t('test'))}</button></div></div>`; }).join('') : `<div class="card muted">…</div>`}</div>`;
    main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
    const ps = $('#playSubj'); if (ps) ps.onclick = () => { setGameSubj(id); go('speel'); };
    main.querySelectorAll('[data-term]').forEach(b => b.onclick = () => { term = b.dataset.term === 'scope' ? 'scope' : +b.dataset.term; S._term = S._term || {}; S._term[id] = term; draw(); });
    wireSubjectPhotos(main, s);
  };
  draw();
}
function renderTopic(main, tid) {
  const f = findTopic(tid); if (!f) return go('vakke');
  const { subj, tp, term } = f; setSubjectColor(subj.color);
  const kid = S.kid; const p = kid.topics[tid] = kid.topics[tid] || {};
  let tab = S._ttab && S._ttab[tid] || 'summary';
  const draw = () => {
    const tabs = [['summary', '📖', t('summary'), p.read], ['terms', '🃏', t('keyTerms'), p.flash], ['examples', '🧮', t('examples'), p.ex], ['quiz', '✏️', t('quiz'), p.attempts]];
    main.innerHTML = `<button class="back" data-go="vak-${subj.id}">← ${esc(tx(subj.name))}</button>
    <div class="row" style="gap:8px"><span class="chip subject">${subj.icon} ${esc(tx(subj.short))} · ${esc(t('term'))} ${term}</span>${statusChip(topicStatus(kid, tid))}${scopeOf(subj).topics.includes(tid) && !scopeOf(subj).provisional ? `<span class="chip hi">🎯 ${esc(t('inScope'))}</span>${pagesChip(subj, tid)}` : ''}</div>
    <h1 style="margin-top:8px">${esc(tx(tp.title))}</h1><p class="muted">${esc(tx(tp.blurb))}</p>${S.storeKind === 'supa' ? `<button class="linkbtn small" id="askCoach" style="margin-top:6px">🤖 ${esc(t('coachAsk'))}</button>` : ''}
    <div class="ttabs">${tabs.map(([k, ic, lb, done]) => `<button class="${tab === k ? 'on' : ''}" data-tab="${k}"><span>${ic}</span><span class="lb">${esc(lb)}</span>${done ? '<span class="done">✓</span>' : ''}</button>`).join('')}</div>
    <div id="tabbody"></div>`;
    main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
    const ac = $('#askCoach'); if (ac) ac.onclick = () => { S.coachSubj = subj.id; go('afrigter'); };
    main.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; S._ttab = S._ttab || {}; S._ttab[tid] = tab; draw(); });
    if (innerWidth < 480) main.querySelectorAll('.ttabs .lb').forEach(e => e.hidden = true);
    const body = $('#tabbody');
    if (tab === 'summary') {
      body.innerHTML = `<div class="card pad-lg"><p class="small muted" style="margin-bottom:10px">📖 ${esc(t('dwHint'))}</p><div class="prose" id="sumProse">${md(tx(tp.summary))}</div><div class="sep" style="margin:18px 0"></div><button class="btn ${p.read ? '' : 'hi'}" id="markRead" ${p.read ? 'disabled' : ''}>${esc(p.read ? t('readDone') : t('markRead'))}</button></div>`;
      linkTerms($('#sumProse'), dict().filter(e => e.s.id === subj.id));
      const b = $('#markRead'); if (b) b.onclick = async () => { p.read = true; kid.totals.reads = (kid.totals.reads || 0) + 1; await award(kid, 10, { type: 'read', subject: subj.id, topic: tid }); draw(); };
    } else if (tab === 'terms') {
      let flipped = new Set();
      body.innerHTML = `<p class="small muted" style="margin-bottom:10px">${esc(t('flipHint'))}</p><div class="keyterms">${(tp.keyTerms || []).map((k, i) => `<div class="flash" data-i="${i}"><div class="in"><div class="f">${esc(tx(k.term))}<span class="hint">${esc(t('flipHint'))}</span></div><div class="b">${esc(tx(k.def))}</div></div></div>`).join('')}</div><div style="margin-top:14px">${p.flash ? `<span class="chip good">${esc(t('flashDone'))}</span>` : ''}</div>`;
      body.querySelectorAll('.flash').forEach(el => el.onclick = async () => { el.classList.toggle('flip'); flipped.add(el.dataset.i); if (!p.flash && flipped.size >= (tp.keyTerms || []).length) { p.flash = true; await award(kid, 10, { type: 'flash', subject: subj.id, topic: tid }); draw(); } });
    } else if (tab === 'examples') {
      const shown = {};
      body.innerHTML = `<div class="stack">${(tp.examples || []).map((ex, i) => `<div class="example" data-ex="${i}"><h3>${i + 1}. ${esc(tx(ex.title))}</h3><div class="prob">${inline(tx(ex.problem))}</div><div class="steps" id="steps${i}"></div><div style="margin-top:12px"><button class="btn sm subject" data-next="${i}">${esc(t('nextStep'))}</button></div></div>`).join('')}</div><div style="margin-top:14px">${p.ex ? `<span class="chip good">${esc(t('examplesDone'))}</span>` : ''}</div>`;
      body.querySelectorAll('[data-next]').forEach(b => b.onclick = async () => {
        const i = +b.dataset.next, ex = tp.examples[i]; shown[i] = (shown[i] || 0) + 1; const box = $('#steps' + i);
        if (shown[i] <= ex.steps.length) { box.insertAdjacentHTML('beforeend', `<div class="step"><div class="n">${shown[i]}</div><div>${inline(tx(ex.steps[shown[i] - 1]))}</div></div>`); if (shown[i] === ex.steps.length) b.textContent = t('showAnswer'); }
        else { box.insertAdjacentHTML('beforeend', `<div class="step ans"><div class="n">✓</div><div>${inline(tx(ex.answer))}</div></div>`); b.disabled = true; }
        if (!p.ex && tp.examples.every((e, j) => (shown[j] || 0) > e.steps.length)) { p.ex = true; await award(kid, 10, { type: 'examples', subject: subj.id, topic: tid }); draw(); }
      });
    } else {
      body.innerHTML = `<div class="card center pad-lg"><div style="font-size:48px">✏️</div><h2>${esc(tx(tp.title))}</h2><p class="muted" style="margin:6px 0 16px"><span class="num">${(tp.quiz || []).length}</span> ${esc(t('question')).toLowerCase()}${L === 'af' ? 'e' : 's'}${p.attempts ? ` · ${esc(t('status.good'))}: <span class="num">${p.best}%</span>` : ''}</p><button class="btn subject" data-go="toets-${tid}">${esc(t('startQuiz'))} →</button></div>`;
      $('[data-go]', body).onclick = () => go('toets-' + tid);
    }
  };
  draw();
}
function renderBadges(main) {
  const kid = S.kid;
  main.innerHTML = `<h1>🏅 ${esc(t('allBadges'))}</h1><p class="muted" style="margin:4px 0 16px">${kid.badges.length} / ${BADGES.length}</p><div class="badges">${BADGES.map(b => `<div class="badge ${kid.badges.includes(b) ? 'earned' : ''}"><div class="ic">${BADGE_ICONS[b]}</div><div class="nm">${esc(t('badgeNames')[b][0])}</div><div class="ds">${esc(t('badgeNames')[b][1])}</div></div>`).join('')}</div>`;
}
function renderResources(main) {
  const subjects = subjectsOfGrade(curGrade());
  main.innerHTML = `<h1>🔗 ${esc(t('resources'))}</h1><p class="muted" style="margin:6px 0 16px;max-width:70ch">${esc(t('resourcesIntro'))}</p>
  <div class="grid two">${subjects.map(s => `<div class="card" style="--subject:${s.color};border-left:6px solid var(--subject)"><h3>${s.icon} ${esc(tx(s.name))}</h3><ul style="margin:8px 0 0;padding-left:18px">${(s.resources || []).map(r => `<li style="margin:6px 0"><a href="${esc(r.url)}" target="_blank" rel="noopener"><b>${esc(tx(r.title))}</b></a><div class="small muted">${esc(tx(r.note))}</div></li>`).join('')}</ul></div>`).join('')}</div>`;
}

/* ------------------------------------------------------------------ quiz engine */
function buildQuestions(id, mode) {
  if (mode === 'notes') {
    const set = NOTES.byId[id]; if (!set || !Array.isArray(set.qs) || !set.qs.length) return null;
    const nm = set.title || t('nqT'), topic = { id: 'notes-' + id, title: nm };
    return { subj: subjById(set.subj), title: '📒 ' + nm, label: '📒 ' + nm, qs: shuffle(set.qs.map(q => ({ q, topic, term: null }))), topicId: null };
  }
  if (mode === 'exam') {
    const s = S.content.subjects[id]; if (!s) return null;
    const pool = allTopics(s).filter(x => inPool(s, x.tp)).flatMap(x => x.tp.quiz.map(q => ({ q, topic: x.tp, term: x.term })));
    return { subj: s, title: tx(s.name) + ' · ' + t('examPractice'), qs: shuffle(pool).slice(0, 20), topicId: null };
  }
  if (mode === 'scope') {
    const s = S.content.subjects[id]; if (!s) return null;
    const pool = scopeOf(s).topics.flatMap(tid => { const f = findTopic(tid); return f.tp.quiz.map(q => ({ q, topic: f.tp, term: f.term })); });
    if (!pool.length) return null;
    return { subj: s, title: tx(s.short) + ' · ' + t('scopeTest'), qs: shuffle(pool).slice(0, 20), topicId: null };
  }
  if (mode === 'redo') {
    const items = mistakeItems(S.kid, id); if (!items.length) return null;
    const s = id !== 'all' ? S.content.subjects[id] : null;
    return { subj: s, title: t('redoT') + (s ? ' · ' + tx(s.short) : ''), qs: shuffle(items).slice(0, 10).map(x => ({ q: x.q, topic: x.topic, term: x.term, subj: x.subj })), topicId: null };
  }
  if (mode === 'week') { const qs = weekQuestions(); return qs.length ? { subj: null, title: t('chalT'), qs, topicId: null } : null; }
  const f = findTopic(id); if (!f) return null;
  return { subj: f.subj, tp: f.tp, title: tx(f.tp.title), qs: shuffle(f.tp.quiz.map(q => ({ q, topic: f.tp, term: f.term }))), topicId: id };
}

/* mounts one question of any type into body/act; calls finish(ok, detail, marksEarned) exactly once */
function mountQuestion(q, body, act, finishCb, opt) {
  opt = opt || {};
  let fin = false, switched = false; const marks = q.marks || 1;
  const finish = (ok, detail, earned) => { if (fin) return; fin = true; closeSheet(); finishCb(ok, detail, earned === undefined ? (ok ? marks : 0) : earned); };
  const opts = (q.type === 'open' || q.type === 'fill') && !opt.write ? choiceOpts(q) : null;
  if (opts) { // written / fill-in questions: choose from 4 answers in a popup ("Ek skryf self" keeps the writing practice)
    const st = { gone: [], used: false };
    body.innerHTML = `<div class="pickwrap"><button class="btn subject block pickbtn" id="pickB">🎯 ${esc(t('pickAnswer'))}</button><div class="row pickalt">${q.hint ? `<button class="btn sm ghost" id="hintB">💡 ${esc(t('hint'))}</button>` : ''}<button class="btn sm ghost" id="writeB">✍️ ${esc(t('writeSelf'))}</button></div>${q.hint ? '<div id="hintT" class="small muted center" style="margin-top:6px"></div>' : ''}</div>`;
    act.innerHTML = '';
    const hb = $('#hintB', body); if (hb) hb.onclick = () => { $('#hintT', body).textContent = tx(q.hint); hb.disabled = true; };
    $('#writeB', body).onclick = () => { switched = true; closeSheet(); mountQuestion(q, body, act, finishCb, Object.assign({}, opt, { write: true })); };
    const open = () => { if (fin || switched) return; choiceSheet(q, opts, st, (i) => {
      const o = opts[i], right = opts.find(x => x.ok);
      body.innerHTML = `<div class="opts">${opts.map((x, j) => `<div class="opt ${x.ok ? 'right' : j === i ? 'wrong' : 'dim'}"><span class="k">${'ABCD'[j]}</span><span>${inline(x.txt)}</span></div>`).join('')}</div>` + (q.type === 'open' ? `<div class="memo"><div class="label" style="margin-bottom:4px">📋 ${esc(t('memoFull'))}</div><div class="prose">${md(tx(q.memo))}</div></div>` : '');
      finish(o.ok, o.ok ? '' : inline(right.txt), o.ok ? marks : 0);
    }); };
    $('#pickB', body).onclick = open;
    if (opt.autoOpen !== false) setTimeout(() => { if (!fin && !switched && body.isConnected && !document.querySelector('.overlay')) open(); }, 450);
    return;
  }
  if (q.type === 'open') {
    body.innerHTML = `<textarea id="openin" rows="${Math.min(8, Math.max(2, q.lines || 3))}" placeholder="${esc(t('typeAnswer'))}"></textarea>${q.hint ? `<div style="margin-top:6px"><button class="btn sm ghost" id="hintB">💡 ${esc(t('hint'))}</button><span id="hintT" class="small muted" style="margin-left:8px"></span></div>` : ''}`;
    act.innerHTML = `<button class="btn subject" id="showMemo">${esc(t('showMemo'))}</button>`;
    const hb = $('#hintB'); if (hb) hb.onclick = () => { $('#hintT').textContent = tx(q.hint); hb.disabled = true; };
    $('#showMemo').onclick = () => {
      $('#openin').disabled = true; $('#showMemo').disabled = true;
      body.insertAdjacentHTML('beforeend', `<div class="memo"><div class="label" style="margin-bottom:4px">📋 ${esc(t('memo'))}</div><div class="prose">${md(tx(q.memo))}</div></div>
        <div class="selfmark"><span class="small"><b>${esc(t('selfMark'))}</b></span><div class="row" style="gap:6px">${Array.from({ length: marks + 1 }, (_, i) => `<button class="btn sm ${i === marks ? 'hi' : i === 0 ? 'ghost' : ''}" data-m="${i}">${i}</button>`).join('')}<span class="small muted">/ ${marks}</span></div></div>`);
      body.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { const m = +b.dataset.m; body.querySelectorAll('[data-m]').forEach(x => { x.disabled = true; x.classList.toggle('subject', x === b); }); finish(m === marks, m === marks ? '' : `${m} / ${marks}`, m); });
    };
    return;
  }
  if (q.type === 'mc') {
    body.innerHTML = `<div class="opts">${q.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${'ABCD'[i]}</span><span>${inline(tx(o))}</span></button>`).join('')}</div>`;
    body.querySelectorAll('.opt').forEach(b => b.onclick = () => { const i = +b.dataset.i; body.querySelectorAll('.opt, .ll').forEach(x => x.disabled = true); b.classList.add(i === q.answer ? 'right' : 'wrong'); body.querySelector(`[data-i="${q.answer}"]`).classList.add('right'); finish(i === q.answer, i === q.answer ? '' : inline(tx(q.options[q.answer]))); });
    if (S.life !== undefined && q.options.length >= 4) { body.insertAdjacentHTML('beforeend', `<div class="llrow">${lifeBtn('ll50')}</div>`); const st = { gone: [], used: false }, btns = [...body.querySelectorAll('.opt')]; $('#ll50', body).onclick = (e) => { if (useFifty(btns, q.options.map((_, i) => i === q.answer), st)) e.currentTarget.disabled = true; }; }
  } else if (q.type === 'tf') {
    body.innerHTML = `<div class="opts" style="grid-template-columns:1fr 1fr"><button class="opt" data-v="true"><span class="k">✓</span><span>${esc(t('true_'))}</span></button><button class="opt" data-v="false"><span class="k">✗</span><span>${esc(t('false_'))}</span></button></div>`;
    body.querySelectorAll('.opt').forEach(b => b.onclick = () => { const v = b.dataset.v === 'true'; body.querySelectorAll('.opt').forEach(x => x.disabled = true); b.classList.add(v === q.answer ? 'right' : 'wrong'); body.querySelector(`[data-v="${q.answer}"]`).classList.add('right'); finish(v === q.answer, v === q.answer ? '' : esc(q.answer ? t('true_') : t('false_'))); });
  } else if (q.type === 'fill') {
    body.innerHTML = `<form class="fillrow" id="fillf"><input id="fillin" autocomplete="off" autocapitalize="off" placeholder="${esc(t('typeAnswer'))}"><button class="btn subject" type="submit">${esc(t('check'))}</button></form>`;
    const inp = $('#fillin'); inp.focus();
    $('#fillf').onsubmit = (e) => { e.preventDefault(); if (!inp.value.trim()) return; const ok = fillCorrect(q, inp.value); inp.classList.add(ok ? 'right' : 'wrong'); inp.disabled = true; e.target.querySelector('button').disabled = true; finish(ok, ok ? '' : esc((q.answers[L] || q.answers.af)[0])); };
  } else if (q.type === 'match') {
    const left = q.pairs.map((p, i) => ({ i, txt: tx(p.l) })), right = shuffle(q.pairs.map((p, i) => ({ i, txt: tx(p.r) })));
    const pairs = {}; let selL = null;
    body.innerHTML = `<p class="small muted" style="margin-bottom:8px">${esc(t('matchHint'))}</p><div class="match"><div class="col">${left.map(l => `<button class="mitem" data-l="${l.i}">${esc(l.txt)}</button>`).join('')}</div><div class="col">${right.map(r => `<button class="mitem" data-r="${r.i}">${esc(r.txt)}</button>`).join('')}</div></div>`;
    act.innerHTML = `<button class="btn subject" id="checkM" disabled>${esc(t('check'))}</button>`;
    const paint = () => {
      body.querySelectorAll('.mitem').forEach(el => { el.classList.remove('sel', 'paired'); el.style.removeProperty('--pc'); const tg = el.querySelector('.tag'); if (tg) tg.remove(); });
      Object.keys(pairs).forEach((l, n) => { const r = pairs[l]; const c = PAIR_COLORS[n % PAIR_COLORS.length]; [body.querySelector(`[data-l="${l}"]`), body.querySelector(`[data-r="${r}"]`)].forEach(el => { el.classList.add('paired'); el.style.setProperty('--pc', c); el.insertAdjacentHTML('beforeend', `<span class="tag">${n + 1}</span>`); }); });
      if (selL !== null) body.querySelector(`[data-l="${selL}"]`).classList.add('sel');
      $('#checkM').disabled = Object.keys(pairs).length < q.pairs.length;
    };
    body.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { if (fin) return; selL = +b.dataset.l; delete pairs[selL]; paint(); });
    body.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { if (fin || selL === null) return; const r = +b.dataset.r; Object.keys(pairs).forEach(l => { if (pairs[l] === r) delete pairs[l]; }); pairs[selL] = r; selL = null; paint(); });
    $('#checkM').onclick = () => { let all = true; body.querySelectorAll('.mitem').forEach(el => el.disabled = true); Object.keys(pairs).forEach(l => { const ok = pairs[l] === +l; if (!ok) all = false; body.querySelector(`[data-l="${l}"]`).classList.add(ok ? 'right' : 'wrong'); body.querySelector(`[data-r="${pairs[l]}"]`).classList.add(ok ? 'right' : 'wrong'); }); finish(all, all ? '' : q.pairs.map(p => `${esc(tx(p.l))} → ${esc(tx(p.r))}`).join('<br>')); };
  }
}
const QEV = { topic: 'quiz', exam: 'exam', scope: 'scope', redo: 'redo', week: 'challenge', notes: 'quiz' };
function renderQuiz(main, id, mode) {
  if (mode === true) mode = 'exam'; if (!mode) mode = 'topic';
  const built = buildQuestions(id, mode);
  if (!built) return go(mode === 'redo' ? 'foute' : mode === 'scope' ? 'eksamens' : mode === 'week' ? 'speel' : 'vakke');
  const bs = built.subj || { id: null, color: '#2f6df6', name: { af: 'Leerhoek', en: 'Leerhoek' }, short: { af: '', en: '' } };
  setSubjectColor(bs.color);
  const kid = S.kid, qs = built.qs, multi = mode !== 'topic' && mode !== 'notes';
  const backHash = { topic: 'onderwerp-' + id, exam: 'vak-' + bs.id, notes: bs.id ? 'vak-' + bs.id : 'vakke', scope: 'eksamens', redo: 'foute', week: 'speel' }[mode];
  const backName = { topic: t('summary'), exam: tx(bs.name), notes: tx(bs.name), scope: t('exT'), redo: t('mistakesT'), week: t('playT') }[mode];
  const Q = { i: 0, answered: 0, correct: 0, fixed: 0, results: [], start: Date.now() };
  S.quiz = Q; S.combo = 0; S.life = 3;
  const drawQ = () => {
    if (Q.i >= qs.length) return drawResult();
    const it = qs[Q.i], { q } = it;
    if (it.subj) setSubjectColor(it.subj.color);
    const typeLabel = { mc: L === 'af' ? 'Meervoudige keuse' : 'Multiple choice', tf: L === 'af' ? 'Waar of onwaar' : 'True or false', fill: L === 'af' ? 'Vul in' : 'Fill in', match: L === 'af' ? 'Pas bymekaar' : 'Match' }[q.type];
    const where = multi ? ` · ${it.subj && (mode === 'redo' || mode === 'week') ? esc(it.subj.icon + ' ' + tx(it.subj.short)) + ' · ' : ''}${esc(tx(it.topic.title))}` : '';
    main.innerHTML = `<div class="quiz"><button class="back" data-go="${backHash}">← ${esc(built.title)}</button>
      <div class="qhead"><span class="chip subject num">${Q.i + 1} / ${qs.length}</span><div class="bar-h subject"><i style="width:${Math.round(100 * Q.i / qs.length)}%"></i></div><span class="chip num">${Q.correct} ✓</span>${muteBtn()}</div>
      <div class="qcard"><div class="chip qtype">${esc(typeLabel)}${where}</div><div class="q">${inline(tx(q.q))}</div><div id="qbody"></div><div id="fb"></div><div class="qfoot"><span></span><span id="qact"></span></div></div></div>`;
    $('[data-go]', main).onclick = () => go(backHash); wireMute(main);
    const body = $('#qbody'), act = $('#qact');
    let done = false;
    const finish = (ok, detail) => {
      if (done) return; done = true; Q.answered++; if (ok) Q.correct++;
      Q.fixed += noteMistake(kid, it.topic, q, ok);
      Q.results.push({ q, ok, detail });
      funAnswer(ok);
      $('#fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}"><div class="h">${ok ? '🎉 ' + esc(t('correct')) : '🤔 ' + esc(t('wrong'))}</div>${detail ? `<div class="small"><b>${esc(t('rightAnswer'))}:</b> ${detail}</div>` : ''}<div class="small" style="margin-top:4px">${inline(tx(q.explain))}</div></div>`;
      act.innerHTML = `<button class="btn subject" id="nextQ">${Q.i + 1 < qs.length ? esc(t('next')) + ' →' : esc(t('finish')) + ' 🏁'}</button>`;
      $('#nextQ').onclick = () => { Q.i++; drawQ(); }; $('#nextQ').focus();
    };
    mountQuestion(q, body, act, finish);
  };
  const drawResult = async () => {
    setSubjectColor(bs.color);
    const score = Math.round(100 * Q.correct / qs.length), secs = Math.round((Date.now() - Q.start) / 1000);
    let xp = Q.correct * 2;
    const p = built.topicId ? (kid.topics[built.topicId] = kid.topics[built.topicId] || {}) : null;
    if (score === 100) xp += (p && p.bonus100) ? 20 : 40; else if (score >= 80) xp += (p && p.bonus80) ? 10 : 20;
    if (p) { p.attempts = (p.attempts || 0) + 1; p.best = Math.max(p.best || 0, score); p.last = score; p.lastAt = Date.now(); if (score >= 80) p.bonus80 = true; if (score === 100) p.bonus100 = true; }
    if (mode === 'redo') xp += Q.fixed * 3;
    let counted = false;
    if (mode === 'week') { const w = weekId(); if (!kid.challenge || kid.challenge.w !== w) { kid.challenge = { w, score: Q.correct, total: qs.length, secs }; counted = true; xp += 20; } }
    kid.totals.quizzes++; kid.totals.correct += Q.correct; kid.totals.answered += qs.length; kid.totals.secs = (kid.totals.secs || 0) + secs;
    const msg = score === 100 ? t('msg100') : score >= 80 ? t('msg80') : score >= 60 ? t('msg60') : t('msg0');
    main.innerHTML = `<div class="quiz"><div class="card pad-lg result"><div class="label">${esc(built.title)}</div><div class="score num">${score}%</div><div class="msg">${esc(msg)}</div>
      <div class="row" style="justify-content:center"><span class="chip hi num">+${xp} XP ${esc(t('earned'))}</span><span class="chip num">${Q.correct}/${qs.length}</span><span class="chip num">${Math.max(1, Math.round(secs / 60))} ${esc(t('min'))}</span>${Q.fixed ? `<span class="chip good num">🛠️ ${Q.fixed} ${esc(t('fixedN'))}</span>` : ''}</div>
      ${mode === 'week' ? `<div class="banner" style="margin-top:12px;justify-content:center">${counted ? '⚔️ ' + esc(t('chalCounted')) : esc(t('chalPractice'))}</div>` : ''}
      ${factLine()}<div class="row" style="justify-content:center;margin-top:18px"><button class="btn subject" id="again">🔁 ${esc(t('tryAgain'))}</button><button class="btn" data-go="${backHash}">${esc(t('backTo'))} ${esc(backName)}</button></div>
      <h3 style="margin-top:22px;text-align:left">${esc(t('review'))}</h3><div class="review">${Q.results.map(r => `<div class="r ${r.ok ? '' : 'bad'}"><div>${r.ok ? '✅' : '❌'}</div><div><div>${inline(tx(r.q.q))}</div>${r.ok ? '' : `<div class="ex"><b>${esc(t('rightAnswer'))}:</b> ${r.detail}</div>`}<div class="ex">${inline(tx(r.q.explain))}</div></div></div>`).join('')}</div></div></div>`;
    $('#again').onclick = () => renderQuiz(main, id, mode);
    $('[data-go]', main).onclick = () => go(backHash);
    if (score >= 80) confetti(score === 100 ? 200 : 120);
    await award(kid, xp, { type: QEV[mode], subject: bs.id, topic: built.topicId, label: built.label, score, correct: Q.correct, total: qs.length, secs });
  };
  drawQ();
}

/* ------------------------------------------------------------------ practice papers (Unika-style exams) */
function findPaper(id) { for (const sid in S.content.subjects) { const s = S.content.subjects[sid]; const ex = (s.practiceExams || []).find(e => e.id === id); if (ex) return { subj: s, ex }; } return null; }
function renderPaper(main, id) {
  const f = findPaper(id); if (!f) return go('vakke');
  const { subj, ex } = f; setSubjectColor(subj.color);
  const kid = S.kid, backHash = 'vak-' + subj.id;
  const flat = []; ex.sections.forEach((sec, si) => sec.questions.forEach((q, qi) => flat.push({ q, si, qi, sec })));
  const P = { i: -1, earned: 0, bySec: ex.sections.map(() => 0), results: [], start: null, timer: null };
  const stopTimer = () => { if (P.timer) { clearInterval(P.timer); P.timer = null; } };
  const tick = () => { const el = $('#timeLeft'); if (!el || !P.start) return; const left = ex.minutes * 60 - Math.floor((Date.now() - P.start) / 1000); const m = Math.max(0, Math.floor(left / 60)), s2 = Math.max(0, left % 60); el.textContent = `${m}:${String(s2).padStart(2, '0')}`; el.classList.toggle('bad', left < 300); };
  const drawIntro = () => {
    main.innerHTML = `<div class="quiz"><button class="back" data-go="${backHash}">← ${esc(tx(subj.name))}</button>
      <div class="card pad-lg"><span class="chip subject">${subj.icon} ${esc(tx(subj.short))}</span><h1 style="margin-top:8px">${esc(tx(ex.title))}</h1>
      <div class="row num" style="margin:8px 0 12px"><span class="chip">⏱ ${ex.minutes} ${esc(t('min'))}</span><span class="chip">${ex.total} ${esc(t('marks'))}</span><span class="chip">${flat.length} ${esc(t('question')).toLowerCase()}${L === 'af' ? 'e' : 's'}</span></div>
      <div class="prose small">${md(tx(ex.instructions))}</div>
      <h3 style="margin-top:14px">${esc(t('perSection'))}</h3><ul style="margin:6px 0 16px;padding-left:20px">${ex.sections.map(sec => `<li>${esc(tx(sec.title))} <span class="muted num">(${sec.marks})</span></li>`).join('')}</ul>
      <button class="btn subject" id="startP">▶ ${esc(t('startPaper'))}</button></div></div>`;
    $('[data-go]', main).onclick = () => go(backHash);
    $('#startP').onclick = () => { P.start = Date.now(); P.timer = setInterval(tick, 1000); S.paperTimer = P.timer; P.i = 0; S.combo = 0; S.life = 3; drawQ(); };
  };
  const drawQ = () => {
    if (P.i >= flat.length) return drawResult();
    const { q, si, qi, sec } = flat[P.i]; const marks = q.marks || 1;
    const doneMarks = flat.slice(0, P.i).reduce((a, x) => a + (x.q.marks || 1), 0);
    main.innerHTML = `<div class="quiz"><div class="qhead"><span class="chip subject num">${P.i + 1} / ${flat.length}</span><div class="bar-h subject"><i style="width:${Math.round(100 * doneMarks / ex.total)}%"></i></div><span class="chip num" id="timeLeft">–</span><span class="chip num">${P.earned} ✓</span>${muteBtn()}</div>
      ${qi === 0 && sec.intro ? `<div class="card" style="margin-bottom:12px"><div class="label" style="margin-bottom:6px">${esc(tx(sec.title))}</div><div class="prose small">${md(tx(sec.intro))}</div></div>` : ''}
      <div class="qcard"><div class="row" style="justify-content:space-between;margin-bottom:8px"><span class="chip qtype">${esc(tx(sec.title))}</span><span class="chip hi num">${marks} ${esc(marks === 1 && L === 'af' ? 'punt' : t('marks'))}</span></div><div class="q">${sec.intro && qi > 0 ? `<button class="btn sm ghost" id="showIntro" style="float:right">📄</button>` : ''}${inline(tx(q.q))}</div><div id="qbody"></div><div id="fb"></div><div class="qfoot"><span id="qskip"></span><span id="qact"></span></div></div></div>`;
    tick(); wireMute(main);
    const si2 = $('#showIntro'); if (si2) si2.onclick = () => { si2.remove(); $('.qcard').insertAdjacentHTML('afterbegin', `<div class="card" style="margin-bottom:12px;background:var(--surface-2);box-shadow:none"><div class="prose small">${md(tx(sec.intro))}</div></div>`); };
    const body = $('#qbody'), act = $('#qact');
    const next = () => { P.i++; drawQ(); };
    $('#qskip').innerHTML = `<button class="btn sm ghost" id="skipB">${esc(t('skipQ'))} →</button>`;
    $('#skipB').onclick = () => { P.results.push({ q, sec, ok: false, earned: 0, skipped: true }); next(); };
    mountQuestion(q, body, act, (ok, detail, earned) => {
      $('#skipB').disabled = true;
      P.earned += earned; P.bySec[si] += earned; P.results.push({ q, sec, ok, earned, detail });
      funAnswer(ok);
      if (q.type !== 'open') $('#fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}"><div class="h">${ok ? '🎉 ' + esc(t('correct')) : '🤔 ' + esc(t('wrong'))} <span class="num">+${earned}/${marks}</span></div>${detail ? `<div class="small"><b>${esc(t('rightAnswer'))}:</b> ${detail}</div>` : ''}${q.explain ? `<div class="small" style="margin-top:4px">${inline(tx(q.explain))}</div>` : ''}</div>`;
      else $('#fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}"><div class="h">${ok ? '🎉' : '✏️'} <span class="num">+${earned}/${marks}</span></div></div>`;
      act.innerHTML = `<button class="btn subject" id="nextQ">${P.i + 1 < flat.length ? esc(t('next')) + ' →' : esc(t('finish')) + ' 🏁'}</button>`;
      $('#nextQ').onclick = next; $('#nextQ').focus();
    }, { autoOpen: !(qi === 0 && sec.intro) });
  };
  const drawResult = async () => {
    stopTimer();
    const pct = Math.round(100 * P.earned / ex.total), secs = Math.round((Date.now() - P.start) / 1000);
    kid.papers = kid.papers || {}; const pp = kid.papers[ex.id] = kid.papers[ex.id] || {};
    const first = !pp.attempts; pp.attempts = (pp.attempts || 0) + 1; pp.best = Math.max(pp.best || 0, pct); pp.last = pct; pp.lastAt = Date.now();
    let xp = Math.round(P.earned / 2) + (first ? 30 : 10) + (pct >= 80 ? 30 : pct >= 60 ? 15 : 0);
    kid.totals.secs = (kid.totals.secs || 0) + secs;
    const msg = pct >= 80 ? t('msg80') : pct >= 60 ? t('msg60') : t('msg0');
    main.innerHTML = `<div class="quiz"><div class="card pad-lg result"><div class="label">${esc(tx(ex.title))}</div><div class="score num">${pct}%</div><div class="msg">${esc(t('paperDone'))} ${esc(msg)}</div>
      <div class="row" style="justify-content:center"><span class="chip hi num">+${xp} XP ${esc(t('earned'))}</span><span class="chip num">${P.earned} / ${ex.total}</span><span class="chip num">${Math.max(1, Math.round(secs / 60))} ${esc(t('min'))}</span></div>
      <h3 style="margin-top:20px;text-align:left">${esc(t('perSection'))}</h3><div class="bars" style="text-align:left">${ex.sections.map((sec, i) => `<div class="b"><span>${esc(tx(sec.title)).slice(0, 28)}</span><div class="bar-h subject"><i style="width:${Math.round(100 * P.bySec[i] / sec.marks)}%"></i></div><span class="num" style="text-align:right">${P.bySec[i]}/${sec.marks}</span></div>`).join('')}</div>
      ${factLine()}<div class="row" style="justify-content:center;margin-top:18px"><button class="btn subject" id="again">🔁 ${esc(t('tryAgain'))}</button><button class="btn" data-go="${backHash}">${esc(t('backTo'))} ${esc(tx(subj.name))}</button></div>
      <h3 style="margin-top:22px;text-align:left">${esc(t('review'))}</h3><div class="review">${P.results.map(r => `<div class="r ${r.ok ? '' : 'bad'}"><div class="num">${r.skipped ? '⏭' : r.ok ? '✅' : `${r.earned}/${r.q.marks || 1}`}</div><div><div>${inline(tx(r.q.q))}</div>${r.q.type === 'open' ? `<div class="ex prose">${md(tx(r.q.memo))}</div>` : (!r.ok && r.detail ? `<div class="ex"><b>${esc(t('rightAnswer'))}:</b> ${r.detail}</div>` : '') + (r.q.explain ? `<div class="ex">${inline(tx(r.q.explain))}</div>` : '')}</div></div>`).join('')}</div></div></div>`;
    $('#again').onclick = () => renderPaper(main, id);
    $('[data-go]', main).onclick = () => go(backHash);
    if (pct >= 80) confetti(150);
    await award(kid, xp, { type: 'paper', subject: subj.id, topic: null, paper: ex.id, score: pct, correct: P.earned, total: ex.total, secs });
  };
  drawIntro();
}

/* ------------------------------------------------------------------ parent dashboard */
function fmtTime(ts) { const d = new Date(ts); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
function fmtDay(date) { const td = today(); if (date === td) return t('today'); const y = new Date(); y.setDate(y.getDate() - 1); const ys = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0'); if (date === ys) return t('yesterday'); return date; }
function evText(ev) {
  const f = ev.topic ? findTopic(ev.topic) : null; const s = ev.subject ? subjById(ev.subject) : null;
  const what = (t('ev')[ev.type] || ev.type) + ((ev.type === 'paper' || ev.type === 'game' || ev.type === 'coach' || ev.type === 'mission' || ev.type === 'remind') && ev.label ? ' · ' + esc(ev.label) : (s ? ' · ' + tx(s.short) : '') + (f ? ' · ' + tx(f.tp.title) : ''));
  if (ev.type === 'logout') return what + ` — <b class="num">${ev.mins < 1 ? '&lt;1' : ev.mins} min</b>` + (ev.tests ? ` · ${ev.tests} ${esc(t('quizzes').toLowerCase())}` : '') + (ev.xp ? ` <span class="chip hi num" style="padding:0 6px">+${ev.xp}</span>` : '');
  return what + (ev.score !== undefined ? ` — <b class="num">${ev.score}%</b> (${ev.correct}/${ev.total})` : '') + (ev.xp ? ` <span class="chip hi num" style="padding:0 6px">+${ev.xp}</span>` : '');
}
function reportText(kid, subjects) {
  const lines = [`${kid.name} – ${t('level')} ${levelOf(kid.xp)} (${kid.xp} XP), ${t('streak')} ${kid.streak.count} ${t('days')}, ${kid.totals.quizzes} ${t('quizzes').toLowerCase()}, ${t('avg').toLowerCase()} ${kid.totals.answered ? Math.round(100 * kid.totals.correct / kid.totals.answered) : 0}%`];
  subjects.forEach(s => { lines.push(`• ${tx(s.name)}: ${subjectPct(kid, s)}%`); const weak = allTopics(s).filter(x => topicStatus(kid, x.tp.id) === 'practice').map(x => `${tx(x.tp.title)} (${tprog(kid, x.tp.id).best}%)`); if (weak.length) lines.push(`   ⚠ ${weak.join(', ')}`); });
  return lines.join('\n');
}
async function renderParent(main) {
  if (!S.parentUnlocked) {
    const first = !S.settings.pinHash;
    main.innerHTML = `<div class="pinpad card pad-lg"><div style="font-size:44px">🔐</div><h2 style="margin:8px 0">${esc(t('parentPin'))}</h2><p class="muted small" style="margin-bottom:14px">${esc(first ? t('setPin') : t('enterPin'))}</p><form id="pinf"><input id="pin" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off"><div id="pinerr" class="small" style="color:var(--bad);min-height:20px;margin:6px 0"></div><button class="btn primary block" type="submit">${esc(first ? t('savePin') : t('unlock'))}</button></form><button class="back" style="margin-top:14px" data-go="profiel">← ${esc(t('switchUser'))}</button></div><div style="max-width:420px;margin:18px auto 0">${instSlot()}</div>`;
    $('[data-go]', main).onclick = () => go('profiel'); wireInstall();
    const inp = $('#pin'); inp.focus();
    $('#pinf').onsubmit = async (e) => { e.preventDefault(); const v = inp.value.trim(); if (!/^\d{4,6}$/.test(v)) { $('#pinerr').textContent = t('setPin'); return; } const h = await sha(v); if (first) { S.settings.pinHash = h; await S.store.saveSettings(S.settings); S.parentUnlocked = true; if (!lhAfterUnlock()) render(); } else if (h === S.settings.pinHash) { S.parentUnlocked = true; if (!lhAfterUnlock()) render(); } else { $('#pinerr').textContent = t('pinWrong'); inp.value = ''; inp.classList.add('wrong'); setTimeout(() => inp.classList.remove('wrong'), 500); } };
    return;
  }
  const subjects = houseSubjects();
  const kids = await Promise.all(KIDS.map(k => S.store.loadKid(k.id)));
  const logs = await Promise.all(KIDS.map(k => S.store.loadLogs(k.id, 14).catch(() => [])));
  const weekAgo = Date.now() - 7 * 86400000;
  main.innerHTML = `${instSlot()}<div class="row" style="justify-content:space-between"><h1>👪 ${esc(t('dashboard'))}</h1><span class="chip ${S.storeKind !== 'local' ? 'good' : ''}">${S.storeKind !== 'local' ? '☁️ ' + esc(t('storageDb')) : '💾 ' + esc(t('storageLocal'))}</span></div>
  <div class="grid two" style="margin-top:14px" id="kidcards"></div>
  <div class="grid two" style="margin-top:14px">
    <div class="card"><h3>⚙️ ${esc(t('settings'))}</h3><form id="setf" class="stack" style="margin-top:10px"><div class="form-row"><label for="exd">${esc(t('examDate'))}</label><input type="date" id="exd" value="${esc(S.settings.examDate || '')}"></div><div class="form-row"><label for="ext">${esc(t('examTitle'))}</label><input id="ext" value="${esc(S.settings.examTitle || '')}" placeholder="Graad 7 Novembereksamen"></div><div class="form-row"><label for="npin">${esc(t('changePin'))}</label><input id="npin" inputmode="numeric" maxlength="6" placeholder="••••"></div><button class="btn primary" type="submit">${esc(t('save'))}</button></form></div>
    <div class="card"><h3>📥 ${esc(t('importCode'))}</h3><p class="small muted" style="margin:6px 0 10px">${esc(t('importHint'))}</p><textarea id="impcode"></textarea><button class="btn" id="impbtn" style="margin-top:8px">${esc(t('importBtn'))}</button></div>
  </div>${notifyCard()}${socialParentCard()}${deviceCard()}${houseCard()}${circleCard()}${coachParentCard()}${scopeEditor(subjectsOfGrade(scopeGrade()))}${testsEditor(subjects)}${marksEditor(subjects)}${goalsEditor(subjects)}`;
  wireInstall(); wireScopeEditor(main); wireTestsEditor(main, subjects); wireMarksEditor(main, kids); wireGoalsEditor(main, kids); wireCoachParent(main); wireNotifyCard(main); wireSocialParent(main); wireDeviceCard(main); wireHouseCard(main); wireCircleCard(main);
  const cards = $('#kidcards');
  const drawKid = (kid, log) => {
    const subjects = subjectsOfGrade(kidGrade(kid.id), kid.id);
    const events = log.flatMap(d => (d.events || []).map(e => ({ ...e, date: d.date }))).sort((a, b) => b.t - a.t);
    const week = events.filter(e => e.t >= weekAgo), quizzesWeek = week.filter(e => ['quiz', 'exam', 'scope', 'redo', 'challenge'].includes(e.type));
    const avgWeek = quizzesWeek.length ? Math.round(quizzesWeek.reduce((a, e) => a + e.score, 0) / quizzesWeek.length) : 0;
    const weak = subjects.flatMap(s => allTopics(s).filter(x => topicStatus(kid, x.tp.id) === 'practice').map(x => ({ s, ...x })));
    const last = events[0] ? `${fmtDay(events[0].date)} ${fmtTime(events[0].t)}` : t('never');
    return `<div class="card kidcard" id="kc-${kid.id}"><div class="kh"><span class="av">${kid.avatar}</span><div><h2>${esc(kid.name)}</h2><div class="small muted">${esc(t('level'))} ${levelOf(kid.xp)} · ${esc(levelName(levelOf(kid.xp)))} · ${esc(t('lastActive'))}: ${esc(last)}</div></div></div>
      <div class="kv"><div><div class="v num">${kid.xp}</div><div class="k">XP</div></div><div><div class="v num">🔥 ${kid.streak.count}</div><div class="k">${esc(t('streak'))}</div></div><div><div class="v num">${quizzesWeek.length}</div><div class="k">${esc(t('quizzes'))} ${esc(t('thisWeek'))}</div></div><div><div class="v num">${avgWeek}%</div><div class="k">${esc(t('avg'))} ${esc(t('thisWeek'))}</div></div><div><div class="v num">${Math.round((kid.totals.secs || 0) / 60)} ${esc(t('min'))}</div><div class="k">${esc(t('timeOn'))}</div></div><div><div class="v num">🏆 ${weekXp(kid)}</div><div class="k">XP ${esc(t('thisWeek'))}</div></div><div><div class="v num">❌ ${mistakeCount(kid)}</div><div class="k">${esc(t('mistakesShort'))}</div></div><div><div class="v num">🎮 ${(kid.totals.games || 0)}</div><div class="k">${esc(t('gamesShort'))}</div></div></div>
      ${schoolTerms(kid).length ? (() => { const ts = ['1', '2', '3', '4']; kid.school.terms = kid.school.terms || {}; ts.forEach(tm => { kid.school.terms[tm] = kid.school.terms[tm] || {}; }); const rows = subjects.map(s => ({ id: schoolKey(s.id), label: s.icon + ' ' + tx(s.short), target: passTarget(s.id), plat: subjectPct(kid, s) })).concat(Object.keys(SCHOOL_EXTRA).filter(k => k !== 'kk' && ts.some(tm => typeof kid.school.terms[tm][k] === 'number')).map(k => ({ id: k, label: tx(SCHOOL_EXTRA[k]), target: null, plat: null })));
        return `<h3 style="margin-top:16px">🏫 ${esc(t('schoolMarks'))}</h3><p class="small muted" style="margin:2px 0 8px">${esc(t('schoolSub'))}</p><div class="tbl"><table class="marks"><tr><th></th>${ts.map(tm => `<th class="num">${esc(t('termShort'))}${tm}</th>`).join('')}<th class="num">${esc(t('passL'))}</th><th class="num">🎯 ${esc(t('goalL'))}</th><th class="num">${esc(t('platform'))}</th></tr>${rows.map(r => { const last = schoolMark(kid, r.id), goal = goalOf(kid, r.id); return `<tr class="${markCls(last, r.target, goal)}"><td>${esc(r.label)}</td>${ts.map(tm => `<td class="num">${typeof kid.school.terms[tm][r.id] === 'number' ? kid.school.terms[tm][r.id] + '%' : '–'}</td>`).join('')}<td class="num">${r.target !== null ? r.target + '%' : '–'}</td><td class="num">${goal}%</td><td class="num">${r.plat !== null ? r.plat + '%' : '–'}</td></tr>`; }).join('')}${kid.school.avg ? `<tr><td><b>${esc(t('avgShort'))}</b></td>${ts.map(tm => `<td class="num"><b>${kid.school.avg[tm] !== undefined && kid.school.avg[tm] !== null ? kid.school.avg[tm] + '%' : '–'}</b></td>`).join('')}<td></td><td class="num"><b>${goalOf(kid, 'default')}%</b></td><td></td></tr>` : ''}</table></div><p class="small muted" style="margin-top:6px">${esc(t('passRules'))}</p>`; })() : ''}
      <h3 style="margin-top:16px">${esc(t('mastery'))}</h3><div class="bars">${subjects.map(s => `<div class="b" style="--subject:${s.color}"><span>${s.icon} ${esc(tx(s.short))}</span><div class="bar-h subject"><i style="width:${subjectPct(kid, s)}%"></i></div><span class="num" style="text-align:right">${subjectPct(kid, s)}%</span></div>`).join('')}</div>
      <h3 style="margin-top:16px">⚠️ ${esc(t('weak'))}</h3>${weak.length ? `<ul class="weak small" style="margin:6px 0 0;padding-left:18px">${weak.slice(0, 8).map(w => `<li>${esc(tx(w.s.short))}: ${esc(tx(w.tp.title))} — <b class="num">${tprog(kid, w.tp.id).best}%</b></li>`).join('')}</ul>` : `<p class="small muted">${esc(t('noWeak'))}</p>`}
      <h3 style="margin-top:16px">🕒 ${esc(t('activity'))}</h3><div class="feed">${events.length ? events.slice(0, 40).map(e => `<div class="e"><span class="t">${esc(fmtDay(e.date))}<br>${fmtTime(e.t)}</span><span>${evText(e)}</span></div>`).join('') : `<p class="small muted">${esc(t('noActivity'))}</p>`}</div>
      <div class="row" style="margin-top:12px"><button class="btn sm" data-report="${kid.id}">📋 ${esc(t('copyReport'))}</button></div></div>`;
  };
  cards.innerHTML = kids.map((k, i) => drawKid(k, logs[i])).join('');
  const wire = () => cards.querySelectorAll('[data-report]').forEach(b => b.onclick = async () => { const kid = kids.find(k => k.id === b.dataset.report); if (await copyText(reportText(kid, subjectsOfGrade(kidGrade(kid.id), kid.id)))) toast(t('copied')); });
  wire();
  // live updates
  if (S._unsubParent) S._unsubParent.forEach(u => u());
  S._unsubParent = [];
  KIDS.forEach((k, i) => {
    S._unsubParent.push(S.store.subscribeKid(k.id, (fresh) => { kids[i] = fresh; const el = $('#kc-' + k.id); if (el && S.route.s === 'parent') { el.outerHTML = drawKid(fresh, logs[i]); wire(); } }));
    S._unsubParent.push(S.store.subscribeLogs(k.id, (fresh) => { logs[i] = fresh; const el = $('#kc-' + k.id); if (el && S.route.s === 'parent') { el.outerHTML = drawKid(kids[i], fresh); wire(); } }));
  });
  $('#setf').onsubmit = async (e) => { e.preventDefault(); S.settings.examDate = $('#exd').value || null; S.settings.examTitle = $('#ext').value.trim(); const np = $('#npin').value.trim(); if (/^\d{4,6}$/.test(np)) S.settings.pinHash = await sha(np); await S.store.saveSettings(S.settings); toast(t('saved')); };
  $('#impbtn').onclick = async () => {
    try {
      const raw = JSON.parse(decodeURIComponent(escape(atob($('#impcode').value.trim()))));
      for (const id in raw.kids) { const inc = raw.kids[id]; if (!inc) continue; const cur = await S.store.loadKid(id);
        cur.xp = Math.max(cur.xp, inc.xp || 0); cur.badges = Array.from(new Set([...(cur.badges || []), ...(inc.badges || [])]));
        for (const tid in (inc.topics || {})) { const a = cur.topics[tid] || {}, b = inc.topics[tid]; cur.topics[tid] = { ...a, ...b, best: Math.max(a.best || 0, b.best || 0), attempts: Math.max(a.attempts || 0, b.attempts || 0), read: a.read || b.read, flash: a.flash || b.flash, ex: a.ex || b.ex }; }
        ['quizzes', 'correct', 'answered', 'secs', 'reads'].forEach(k => { cur.totals[k] = Math.max(cur.totals[k] || 0, (inc.totals || {})[k] || 0); });
        if ((inc.streak || {}).count > (cur.streak.count || 0)) cur.streak = inc.streak;
        await S.store.saveKid(cur); }
      toast(t('imported')); render();
    } catch (e) { toast('✗'); }
  };
}

/* ================================================================== v5: term 4, afbakening, study plan, foute-boek, woordeboek, brain games, twin challenge */
const LANG_SUBJ = ['afrikaans', 'english'];
const ymd = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function weekId() { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return ymd(d); }
function seeded(str) { let h = 1779033703 ^ str.length; for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } let a = h >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let x = Math.imul(a ^ (a >>> 15), 1 | a); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; }; }
const sshuffle = (arr, rnd) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fold = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const isDoneToday = (kid, tid) => { const p = tprog(kid, tid); return !!(p.lastAt && ymd(new Date(p.lastAt)) === today()); };
function fmtDate(iso) { try { return new Date(iso + 'T12:00:00').toLocaleDateString(L === 'af' ? 'af-ZA' : 'en-ZA', { weekday: 'short', day: 'numeric', month: 'short' }); } catch (e) { return iso; } }

/* ---------- current term ---------- */
function autoTerm() { const m = new Date().getMonth() + 1; return m <= 3 ? 1 : m <= 6 ? 2 : m <= 9 ? 3 : 4; }
function curTerm() { const v = +((S.settings || {}).currentTerm); return v >= 1 && v <= 4 ? v : autoTerm(); }

/* ---------- afbakening (exam scope) ---------- */
function defaultScopeTopics(s) { const terms = LANG_SUBJ.includes(s.id) || +s.grade >= 10 || (+s.grade >= 8 && ['wiskunde', 'ebw'].includes(s.id)) ? [1, 2, 3, 4] : [3, 4]; return allTopics(s).filter(x => terms.includes(x.term)).map(x => x.tp.id); }
function scopeOf(s) {
  const e = examsFor(s.grade)[s.id] || {};
  const valid = new Set(allTopics(s).map(x => x.tp.id));
  const ids = (Array.isArray(e.topics) ? e.topics : defaultScopeTopics(s)).filter(id => valid.has(id));
  return { topics: ids, date: e.date || '', note: e.note || '', provisional: !Array.isArray(e.topics) };
}
function scopePages(s, id) { const e = examsFor(s.grade)[s.id] || {}; return (e.pages || {})[id] || ''; }
function scopeOnly() { try { return localStorage.getItem('lh.scopeOnly') !== '0'; } catch (e) { return true; } }
function setScopeOnly(v) { try { localStorage.setItem('lh.scopeOnly', v ? '1' : '0'); } catch (e) {} }
function inPool(s, tp) { if (!scopeOnly()) return true; const sc = scopeOf(s); if (sc.provisional || !sc.topics.length) return true; return sc.topics.includes(tp.id); }
function pagesChip(s, id) { const pg = scopePages(s, id); return pg ? `<span class="chip">📖 ${esc(pg)}</span>` : ''; }
function scopeToggle(attr) { const on = scopeOnly(); return `<div class="row chipsel" style="gap:6px;margin-top:8px"><button class="chip ${on ? 'on' : ''}" data-${attr}="1">🎯 ${esc(t('scopeOnlyL'))}</button><button class="chip ${on ? '' : 'on'}" data-${attr}="0">📚 ${esc(t('wholeYearL'))}</button></div><p class="small muted" style="margin-top:4px">${esc(on ? t('scopeOnlyHint') : t('wholeYearHint'))}</p>`; }
function scopePct(kid, s, sc) { sc = sc || scopeOf(s); if (!sc.topics.length) return 0; return Math.round(sc.topics.reduce((a, id) => a + topicPct(kid, id), 0) / sc.topics.length); }
function scopeReady(kid, sc) { return sc.topics.filter(id => (tprog(kid, id).best || 0) >= 70).length; }
function examList() {
  return subjectsOfGrade(curGrade()).map(s => { const sc = scopeOf(s); return { s, sc, days: sc.date ? daysBetween(today(), sc.date) : null }; })
    .sort((a, b) => { const k = (x) => x.days === null ? 999 : x.days < 0 ? 1000 - x.days : x.days; return k(a) - k(b); });
}
function examWhen(x) {
  if (x.days === null) return `<span class="chip">📅 ${esc(t('exDateTBC'))}</span>`;
  if (x.days < 0) return `<span class="chip good">✓ ${esc(t('exDone'))}</span>`;
  if (x.days === 0) return `<span class="chip bad">📝 ${esc(t('exToday'))}</span>`;
  return `<span class="chip ${x.days <= 7 ? 'bad' : x.days <= 14 ? 'hi' : ''}">📅 ${esc(fmtDate(x.sc.date))} · ${esc(t('exIn'))} <span class="num">${x.days}</span> ${esc(t('days'))}</span>`;
}

/* ---------- daily study plan (replaces the old mission) ---------- */
function planWhy(kid, sid) {
  const tt = schedItems(kid.id).find(e => e.kind === 'test' && e.subj === sid && inStudyWindow(e));
  if (tt) return tf('rePlanWhy', { n: tt.days });
  const x = examList().find(e => e.s.id === sid);
  if (x && x.days !== null && x.days >= 0 && x.days <= 21) return `${t('exam1')} ${t('exIn')} ${x.days} ${t('days')}`;
  if (focusSubjects(kid, subjectsOfGrade(curGrade())).some(f => f.s.id === sid)) return t('focusShort');
  return '';
}
function studyPlan(kid) {
  const subjects = subjectsOfGrade(curGrade()), td = today(), cur = curTerm();
  const ex = examList().filter(x => x.days === null || x.days >= 0);
  const tests = schedItems(kid.id).filter(x => x.kind === 'test' && inStudyWindow(x));
  const near = tests.map(x => x.subj).concat(ex.filter(x => x.days !== null && x.days <= 21).map(x => x.s.id));
  const focus = focusSubjects(kid, subjects).map(f => f.s.id);
  const rnd = seeded(td + kid.id);
  const order = [...near, ...focus, ...sshuffle(ex.map(x => x.s.id), rnd)].filter((v, i, a) => a.indexOf(v) === i);
  const rank = { practice: 0, read: 1, new: 2, good: 3, master: 9 };
  const plan = [], used = new Set();
  for (const sid of order) {
    if (plan.length >= 3) break;
    const s = S.content.subjects[sid];
    const tp = tests.find(x => x.subj === sid && x.topics && x.topics.length);
    const c = (tp ? tp.topics : scopeOf(s).topics).filter(id => findTopic(id)).map(id => { const f = findTopic(id); return { s, tp: f.tp, term: f.term, pct: topicPct(kid, id), st: topicStatus(kid, id), r: rnd() }; })
      .filter(x => !used.has(x.tp.id) && x.st !== 'master')
      .sort((a, b) => (rank[a.st] - rank[b.st]) || ((b.term === cur) - (a.term === cur)) || (a.pct - b.pct) || (a.r - b.r))[0];
    if (c) { used.add(c.tp.id); plan.push(c); }
  }
  return plan;
}
function dailyPlan(kid) {
  const d = today(), sig = curTerm() + ':' + JSON.stringify((S.settings || {}).exams || {}).length + ':' + JSON.stringify((S.settings || {}).tests || []).length;
  let items = null;
  if (kid.plan && kid.plan.d === d && kid.plan.sig === sig) items = kid.plan.ids.map(id => findTopic(id)).filter(Boolean).map(f => ({ s: f.subj, tp: f.tp, term: f.term }));
  if (!items || !items.length) { items = studyPlan(kid); kid.plan = { d, sig, ids: items.map(x => x.tp.id) }; S.store.saveKid(kid).catch(() => {}); }
  return items.map(x => ({ ...x, why: planWhy(kid, x.s.id) }));
}

/* ---------- exams screen ---------- */
function renderExams(main) {
  const kid = S.kid, list = examList();
  main.innerHTML = `<h1>🎯 ${esc(t('exT'))}</h1><p class="muted" style="margin:4px 0 6px;max-width:70ch">${esc(t('exSub'))}</p>
  <div class="row" style="gap:6px;margin-bottom:14px"><span class="chip hi">📅 ${esc(t('termNow'))} ${curTerm()}${curTerm() === 4 ? ' · ' + esc(t('finalTerm')) : ''}</span><button class="btn sm" data-go="foute">❌ ${esc(t('mistakesT'))} <span class="chip bad num">${mistakeCount(kid)}</span></button><button class="btn sm hi" data-go="rooster">📅 ${esc(t('roT'))}</button></div>
  ${list.some(x => x.sc.provisional) ? `<div class="banner" style="margin-bottom:14px">⏳ ${esc(t('provisionalHint'))}</div>` : ''}
  <div class="stack">${list.map(x => {
    const s = x.s, sc = x.sc, pct = scopePct(kid, s, sc), rd = scopeReady(kid, sc), papers = s.practiceExams || [];
    return `<div class="card excard" style="--subject:${s.color}"><div class="row" style="justify-content:space-between;align-items:flex-start;flex-wrap:nowrap"><div style="min-width:0"><h2>${s.icon} ${esc(tx(s.name))}</h2><div class="row" style="gap:6px;margin-top:6px">${examWhen(x)}${sc.provisional ? `<span class="chip">⏳ ${esc(t('provisional'))}</span>` : `<span class="chip good">✓ ${esc(t('confirmed'))}</span>`}</div></div>${ring(pct)}</div>
    ${sc.note ? `<p class="small" style="margin-top:8px">📌 ${esc(sc.note)}</p>` : ''}
    <div class="small muted" style="margin:10px 0 6px"><span class="num">${rd}/${sc.topics.length}</span> ${esc(t('scopeTopics'))} ${esc(t('ready'))} (≥70 %)</div>
    <div class="bar-h subject"><i style="width:${sc.topics.length ? Math.round(100 * rd / sc.topics.length) : 0}%"></i></div>
    <div class="row" style="margin-top:12px"><button class="btn subject" data-go="afbakening-${s.id}" ${sc.topics.length ? '' : 'disabled'}>🎯 ${esc(t('scopeTest'))}</button>${papers.map((pa, i) => `<button class="btn" data-go="vraestel-${pa.id}">📝 ${esc(papers.length > 1 ? t('paper') + ' ' + (i + 1) : t('paper'))}</button>`).join('')}</div>
    <details class="tips" style="margin-top:10px"><summary>📋 ${esc(t('showTopics'))} (${sc.topics.length})</summary><div class="stack" style="gap:6px;margin-top:8px">${sc.topics.map(id => { const f = findTopic(id); return `<div class="row scopetopic" style="justify-content:space-between"><span style="min-width:0"><span class="chip">${esc(t('termShort'))}${f.term}</span> ${esc(tx(f.tp.title))}${scopePages(s, id) ? ` <span class="small muted">· 📖 ${esc(scopePages(s, id))}</span>` : ''}</span><span class="row" style="gap:6px">${statusChip(topicStatus(kid, id))}<button class="btn sm" data-go="onderwerp-${id}" aria-label="${esc(t('learn'))}">📖</button><button class="btn sm subject" data-go="toets-${id}" aria-label="${esc(t('test'))}">✏️</button></span></div>`; }).join('')}</div></details></div>`;
  }).join('')}</div>`;
  main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
}

/* ---------- foute-boek (mistakes) ---------- */
function mistakeCount(kid) { return Object.keys(kid.mistakes || {}).length; }
function noteMistake(kid, topic, q, ok) {
  if (!topic || !topic.quiz) return 0;
  const qi = topic.quiz.indexOf(q); if (qi < 0) return 0;
  const m = kid.mistakes = kid.mistakes || {}, k = topic.id + '|' + qi;
  if (!ok) {
    m[k] = { t: Date.now(), n: ((m[k] || {}).n || 0) + 1 };
    const keys = Object.keys(m); if (keys.length > 300) keys.sort((a, b) => m[a].t - m[b].t).slice(0, keys.length - 300).forEach(x => delete m[x]);
    return 0;
  }
  if (m[k]) { delete m[k]; kid.totals.fixed = (kid.totals.fixed || 0) + 1; return 1; }
  return 0;
}
function mistakeItems(kid, sid) {
  return Object.keys(kid.mistakes || {}).map(k => { const [tid, qi] = k.split('|'); const f = findTopic(tid); if (!f || !f.tp.quiz[+qi]) return null; return { k, q: f.tp.quiz[+qi], topic: f.tp, term: f.term, subj: f.subj, t: kid.mistakes[k].t }; })
    .filter(x => x && (!sid || sid === 'all' || x.subj.id === sid)).sort((a, b) => b.t - a.t);
}
function renderMistakes(main) {
  const kid = S.kid, items = mistakeItems(kid), subjects = subjectsOfGrade(curGrade());
  const per = subjects.map(s => ({ s, n: items.filter(x => x.subj.id === s.id).length })).filter(x => x.n);
  main.innerHTML = `<button class="back" data-go="eksamens">← ${esc(t('exT'))}</button><h1>❌ ${esc(t('mistakesT'))}</h1><p class="muted" style="margin:4px 0 14px;max-width:70ch">${esc(t('mistakesSub'))}</p>
  ${items.length ? `<div class="card"><div class="row" style="justify-content:space-between"><div><div class="big2 num">${items.length}</div><div class="small muted">${esc(t('open_'))} · <span class="num">${kid.totals.fixed || 0}</span> ${esc(t('fixedN'))}</div></div><button class="btn hi" data-go="herdoen">🔁 ${esc(t('redoAll'))}</button></div></div>
  <div class="grid two" style="margin-top:14px">${per.map(x => `<div class="card row" style="justify-content:space-between;--subject:${x.s.color};border-left:6px solid var(--subject)"><span><b>${x.s.icon} ${esc(tx(x.s.short))}</b> <span class="chip bad num">${x.n}</span></span><button class="btn sm subject" data-go="herdoen-${x.s.id}">🔁 ${esc(t('redo'))}</button></div>`).join('')}</div>
  <h3 style="margin:18px 0 8px">${esc(t('recentMistakes'))}</h3><div class="review">${items.slice(0, 15).map(x => `<div class="r bad"><div>❌</div><div><div>${inline(tx(x.q.q))}</div><div class="ex">${x.subj.icon} ${esc(tx(x.subj.short))} · ${esc(tx(x.topic.title))}</div></div></div>`).join('')}</div>`
  : `<div class="card center pad-lg"><div style="font-size:48px">🎉</div><h2>${esc(t('noMistakes'))}</h2><p class="muted small" style="margin-top:6px"><span class="num">${kid.totals.fixed || 0}</span> ${esc(t('fixedN'))}</p></div>`}`;
  main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
}

/* ---------- weekly twin challenge ---------- */
function weekQuestions() {
  const pool = [];
  subjectsOfGrade(curGrade()).forEach(s => scopeOf(s).topics.forEach(tid => { const f = findTopic(tid); f.tp.quiz.forEach(q => { if (q.type !== 'match') pool.push({ q, topic: f.tp, term: f.term, subj: s }); }); }));
  return sshuffle(pool, seeded('week' + weekId())).slice(0, 10);
}
function weekXp(k) { return k && k.week && k.week.w === weekId() ? k.week.xp : 0; }
async function twinData() {
  const other = KIDS.find(k => k.id !== S.kid.id && k.role !== 'player' && kidGrade(k.id) === kidGrade(S.kid.id));
  if (!other) return null;
  if (S._twin && S._twin.id === other.id && Date.now() - S._twin.at < 60000) return S._twin.kid;
  try { const o = await S.store.loadKid(other.id); S._twin = { id: other.id, kid: o, at: Date.now() }; return o; } catch (e) { return null; }
}
function twinRows(o) { return [S.kid, o].filter(Boolean).map(k => ({ k, xp: weekXp(k), ch: k.challenge && k.challenge.w === weekId() ? k.challenge : null })).sort((a, b) => b.xp - a.xp); }
async function fillTwin(box, mini) {
  if (!box) return; const o = await twinData(); if (!document.body.contains(box)) return;
  const rows = twinRows(o), max = Math.max(1, ...rows.map(r => r.xp)), lead = rows.length > 1 && rows[0].xp > rows[1].xp;
  if (mini) { box.innerHTML = rows.map((r, i) => `<span class="num">${r.k.avatar} ${r.xp}${i === 0 && lead ? ' 👑' : ''}</span>`).join(' <span class="muted">vs</span> '); return; }
  box.innerHTML = rows.map((r, i) => `<div class="twin"><span class="av">${r.k.avatar}</span><div style="flex:1;min-width:0"><div class="row" style="justify-content:space-between"><b>${esc(r.k.name)}${i === 0 && lead ? ' 👑' : ''}</b><span class="num small">${r.xp} XP${r.ch ? ` · ⚔️ ${r.ch.score}/${r.ch.total}` : ''}</span></div><div class="bar-h"><i style="width:${Math.round(100 * r.xp / max)}%;background:${i === 0 ? 'var(--hi)' : 'var(--brand)'}"></i></div></div></div>`).join('')
    + `<div class="small" style="margin-top:6px"><b>${esc(rows.length > 1 ? (lead ? `${rows[0].k.name} ${t('weekLead')}` : t('weekTie')) : '')}</b> <span class="muted">${esc(t('weekReset'))}</span></div>`;
}

/* ---------- daily treasure chest & fun facts ---------- */
function chestState(kid) { const d = today(); const tests = kid.day && kid.day.d === d ? kid.day.tests : 0; return { tests, opened: kid.chest === d, ready: tests >= 3 && kid.chest !== d }; }
async function openChest() {
  const kid = S.kid; if (!chestState(kid).ready) return;
  kid.chest = today(); const xp = 15 + Math.floor(Math.random() * 26);
  const ov = document.createElement('div'); ov.className = 'overlay';
  ov.innerHTML = `<div class="modal"><div class="chestbig" id="cb">🎁</div><h2>${esc(t('chestT'))}</h2><p id="cp" style="margin:8px 0 18px">…</p><button class="btn hi" id="cc" disabled>${esc(t('close'))}</button></div>`;
  document.body.appendChild(ov);
  setTimeout(() => { $('#cb', ov).textContent = '💰'; $('#cb', ov).classList.add('open'); $('#cp', ov).innerHTML = `${esc(t('chestWin'))} <b class="num">${xp} XP</b>! 🎉`; $('#cc', ov).disabled = false; confetti(160); }, 1300);
  $('#cc', ov).onclick = () => { ov.remove(); if (S.route.s === 'home') render(); };
  await award(kid, xp, { type: 'chest' });
}
const FACTS = [
  { af: 'Op die maan weeg jy net sowat ’n sesde van jou gewig op Aarde – maar jou massa bly presies dieselfde.', en: 'On the Moon you weigh only about a sixth of your weight on Earth – but your mass stays exactly the same.' },
  { af: 'Lig van die son neem sowat 8 minute om die Aarde te bereik.', en: 'Light from the Sun takes about 8 minutes to reach Earth.' },
  { af: 'Die maan beweeg elke jaar sowat 3,8 cm verder weg van die Aarde.', en: 'The Moon moves about 3.8 cm further away from Earth every year.' },
  { af: 'Diamant en die grafiet in jou potlood is albei net koolstof – die atome is net anders gerangskik.', en: 'Diamond and the graphite in your pencil are both just carbon – the atoms are simply arranged differently.' },
  { af: 'Water kom op Aarde natuurlik in al drie toestande voor: ys, vloeibare water en waterdamp.', en: 'On Earth, water occurs naturally in all three states: ice, liquid water and water vapour.' },
  { af: 'Jou hart klop ongeveer 100 000 keer per dag.', en: 'Your heart beats about 100,000 times a day.' },
  { af: 'Jou brein gebruik sowat 20 % van al die energie wat jou liggaam verbruik.', en: 'Your brain uses about 20% of all the energy your body uses.' },
  { af: 'Die Vredefortkoepel naby Parys in die Vrystaat is die grootste bevestigde meteoorimpakstruktuur op Aarde.', en: 'The Vredefort Dome near Parys in the Free State is the largest confirmed meteorite impact structure on Earth.' },
  { af: 'Die Oranjerivier is Suid-Afrika se langste rivier – meer as 2 000 km lank.', en: 'The Orange River is South Africa’s longest river – more than 2,000 km long.' },
  { af: 'Die Kaapse Floraryk is die kleinste van die wêreld se blommeryke, maar het meer as 9 000 plantspesies.', en: 'The Cape Floral Kingdom is the smallest of the world’s floral kingdoms, yet it has more than 9,000 plant species.' },
  { af: 'Mapungubwe in Limpopo was sowat 800 jaar gelede ’n ryk koninkryk – die beroemde goue renoster is daar gevind.', en: 'Mapungubwe in Limpopo was a rich kingdom about 800 years ago – the famous golden rhino was found there.' },
  { af: 'Die eerste munte is meer as 2 500 jaar gelede in Lidië (vandag deel van Turkye) gemaak.', en: 'The first coins were made more than 2,500 years ago in Lydia (today part of Turkey).' },
  { af: 'Die Suid-Afrikaanse Reserwebank is in 1921 gestig en is die enigste instelling wat ons banknote mag uitreik.', en: 'The South African Reserve Bank was founded in 1921 and is the only institution allowed to issue our banknotes.' },
  { af: 'Die Romeine het nie ’n simbool vir nul gehad nie.', en: 'The Romans had no symbol for zero.' },
  { af: 'Tel 1 + 2 + 3 + … + 100 op en jy kry 5 050. Die jong Gauss het dit glo binne sekondes uitgewerk: 50 pare van 101.', en: 'Add 1 + 2 + 3 + … + 100 and you get 5,050. Young Gauss supposedly worked it out in seconds: 50 pairs of 101.' },
  { af: '’n Sirkel se omtrek is altyd ’n bietjie meer as drie keer sy middellyn – dis waar π ≈ 3,14 vandaan kom.', en: 'A circle’s circumference is always a little more than three times its diameter – that is where π ≈ 3.14 comes from.' },
  { af: 'In die 9-tafel tel die syfers van elke antwoord op tot 9: 9 × 7 = 63 en 6 + 3 = 9.', en: 'In the 9 times table the digits of each answer add up to 9: 9 × 7 = 63 and 6 + 3 = 9.' },
  { af: 'Driehoeke is die sterkste vorm in strukture – daarom sien jy hulle in brûe, dakkappe en kraanarms.', en: 'Triangles are the strongest shape in structures – that is why you see them in bridges, roof trusses and crane arms.' },
  { af: '’n Hefboom laat jou ’n swaar las met minder krag lig. Archimedes het glo gesê: “Gee my ’n plek om te staan en ek sal die Aarde beweeg.”', en: 'A lever lets you lift a heavy load with less effort. Archimedes supposedly said: “Give me a place to stand and I will move the Earth.”' },
  { af: 'Afrikaans is in 1925 as amptelike taal van Suid-Afrika erken.', en: 'Afrikaans was recognised as an official language of South Africa in 1925.' },
  { af: '’n Palindroom lees agteruit presies dieselfde, soos “lepel” en “kajak”.', en: 'A palindrome reads exactly the same backwards, like “level” and “kayak”.' },
  { af: 'Kort leersessies van 20–30 minute met ’n blaaskans tussenin werk beter as een lang sit-sessie.', en: 'Short study sessions of 20–30 minutes with a break in between work better than one long session.' },
  { af: 'Slaap help jou brein om te onthou wat jy geleer het – tieners het elke nag 8 tot 10 uur nodig.', en: 'Sleep helps your brain remember what you learned – teenagers need 8 to 10 hours every night.' },
  { af: 'As jy iets aan iemand anders verduidelik, onthou jy dit self baie beter.', en: 'When you explain something to someone else, you remember it much better yourself.' },
  { af: 'Die primêre kleure in verf is rooi, geel en blou – meng enige twee en jy kry ’n sekondêre kleur.', en: 'The primary colours in paint are red, yellow and blue – mix any two and you get a secondary colour.' },
  { af: 'Komplementêre kleure lê oorkant mekaar op die kleurwiel, soos rooi en groen of blou en oranje.', en: 'Complementary colours sit opposite each other on the colour wheel, like red and green or blue and orange.' },
  { af: 'Blits is sowat vyf keer warmer as die oppervlak van die son.', en: 'Lightning is about five times hotter than the surface of the Sun.' },
  { af: 'Plante maak hul eie kos uit sonlig, water en koolstofdioksied – en gee suurstof af wat ons inasem.', en: 'Plants make their own food from sunlight, water and carbon dioxide – and give off the oxygen we breathe.' },
];
function maybeFact() {
  let last = null; try { last = localStorage.getItem('lh.fact'); } catch (e) {}
  if (last === today()) return;
  setTimeout(() => {
    if (S.route.s !== 'home' || document.querySelector('.overlay')) return;
    try { localStorage.setItem('lh.fact', today()); } catch (e) {}
    const f = FACTS[Math.floor(seeded(today() + (S.kid ? S.kid.id : ''))() * FACTS.length)];
    const ov = document.createElement('div'); ov.className = 'overlay';
    ov.innerHTML = `<div class="modal"><div class="big">💡</div><h2>${esc(t('factT'))}</h2><p style="margin:10px 0 18px;font-size:1.05rem">${esc(tx(f))}</p><button class="btn hi" id="fOk">${esc(t('factBtn'))}</button></div>`;
    document.body.appendChild(ov); $('#fOk', ov).onclick = () => ov.remove(); ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
  }, 1500);
}

/* ------------------------------------------------------------------ fun layer: sounds, reactions, combos, lifelines, surprise boxes, daily mission */
const SFX = { ctx: null };
function muted() { try { return localStorage.getItem('lh.mute') === '1'; } catch (e) { return false; } }
function sfx(kind) {
  if (muted()) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    const ctx = SFX.ctx || (SFX.ctx = new AC()); if (ctx.state === 'suspended') ctx.resume();
    const seq = { ok: [[660, 0, .09], [880, .08, .16]], bad: [[247, 0, .14], [196, .12, .22]], combo: [[523, 0, .08], [659, .07, .08], [784, .14, .08], [1047, .21, .2]],
      gift: [[784, 0, .07], [988, .06, .07], [1175, .12, .07], [1568, .18, .28]], win: [[523, 0, .12], [659, .12, .12], [784, .24, .12], [1047, .36, .4]], tap: [[520, 0, .05]] }[kind] || [];
    const t0 = ctx.currentTime + 0.01;
    seq.forEach(([f, at, dur]) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = kind === 'bad' ? 'triangle' : 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t0 + at); g.gain.exponentialRampToValueAtTime(kind === 'bad' ? 0.12 : 0.16, t0 + at + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur); o.connect(g); g.connect(ctx.destination); o.start(t0 + at); o.stop(t0 + at + dur + 0.03); });
  } catch (e) {}
}
function muteBtn() { return `<button class="btn sm ghost mutebtn" id="muteB" title="${esc(t('sound'))}" aria-label="${esc(t('sound'))}">${muted() ? '🔇' : '🔊'}</button>`; }
function wireMute(root) { const b = $('#muteB', root || document); if (b) b.onclick = () => { try { localStorage.setItem('lh.mute', muted() ? '0' : '1'); } catch (e) {} b.textContent = muted() ? '🔇' : '🔊'; sfx('tap'); }; }
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const REACT = {
  ok: { af: ['Reg! 🎉', 'Kaplaks! ⭐', 'Slim kop! 🧠', 'Uitstekend! 🚀', 'Kolskoot! 🎯', 'Jy is op dreef! 💥', 'Lekker! 😎', 'Bobaas! 🏆'], en: ['Correct! 🎉', 'Boom! ⭐', 'Smart cookie! 🧠', 'Excellent! 🚀', 'Bull’s-eye! 🎯', 'On a roll! 💥', 'Nice one! 😎', 'Champion! 🏆'] },
  bad: { af: ['Amper! 💪', 'Die volgende een is joune! 🌱', 'Foute maak slim – lees hoekom 👀', 'Hou aan – jy kry dit! 🧩', 'Nie erg nie – leer daaruit 📚'], en: ['Almost! 💪', 'The next one is yours! 🌱', 'Mistakes make you smart – read why 👀', 'Keep going – you’ve got this! 🧩', 'No worries – learn from it 📚'] },
};
function react(ok, combo) {
  const big = ok && combo >= 3;
  sfx(big && combo % 5 === 0 ? 'combo' : ok ? 'ok' : 'bad');
  document.querySelectorAll('.react').forEach(r => r.remove());
  const el = document.createElement('div'); el.className = 'react ' + (ok ? 'good' : 'bad'); el.setAttribute('aria-live', 'polite');
  el.innerHTML = `<div class="rb">${big ? `<div class="combo">🔥 ${combo} ${esc(t('inARow'))}</div>` : ''}<div class="rt">${esc(pick(REACT[ok ? 'ok' : 'bad'][L] || REACT[ok ? 'ok' : 'bad'].af))}</div></div>`;
  document.body.appendChild(el);
  if (big && combo % 5 === 0) confetti(70);
  setTimeout(() => el.classList.add('out'), 950); setTimeout(() => el.remove(), 1350);
}
/* every answered question (quizzes, papers, games) goes through here */
function funAnswer(ok, opt) {
  opt = opt || {}; const kid = S.kid;
  const streak = opt.streak !== undefined ? opt.streak : (S.combo = ok ? (S.combo || 0) + 1 : 0);
  if (opt.quiet) sfx(ok ? 'ok' : 'bad'); else react(ok, streak);
  if (kid) { const m = missionOf(kid); if (!m.done) { if (m.k === 'correct' && ok) m.p++; if (m.k === 'combo') m.p = Math.max(m.p, streak); if (m.p >= m.n) missionComplete(kid); } }
  if (!opt.quiet && ok && streak > 0 && streak % 5 === 0) setTimeout(surprise, 1150);
}
/* 50/50 lifeline: removes two wrong options in the current question (3 per test) */
function lifeBtn(id) { return S.life !== undefined ? `<button class="btn sm ghost ll" id="${id}" ${S.life > 0 ? '' : 'disabled'}>💡 50/50 <span class="num">×${S.life}</span></button>` : ''; }
function useFifty(btns, okFlags, st) {
  if (!(S.life > 0) || st.used) return false;
  const wrong = okFlags.map((ok, i) => ok ? -1 : i).filter(i => i >= 0 && !st.gone.includes(i));
  if (wrong.length < 2) return false;
  S.life--; st.used = true; shuffle(wrong).slice(0, 2).forEach(i => st.gone.push(i));
  st.gone.forEach(i => { if (btns[i]) { btns[i].classList.add('gone'); btns[i].disabled = true; } });
  document.querySelectorAll('.ll .num').forEach(n => n.textContent = '×' + S.life); sfx('tap');
  return true;
}
/* choices for fill/open questions: [{ txt, ok }] (correct answer + 3 authored distractors, shuffled) */
function choiceOpts(q) {
  const c = q.choices; if (!c || !c.d) return null;
  const d = c.d[L] || c.d.af;
  const right = q.type === 'fill' ? ((q.answers && (q.answers[L] || q.answers.af)) || [])[0] : (c.c && (c.c[L] || c.c.af));
  if (!right || !d) return null;
  return shuffle([{ txt: right, ok: true }].concat(d.map(x => ({ txt: x, ok: false }))));
}
function closeSheet() { const s = $('#cSheet'); if (s) s.remove(); }
function choiceSheet(q, opts, st, onPick) {
  closeSheet();
  const ov = document.createElement('div'); ov.className = 'overlay sheetwrap'; ov.id = 'cSheet';
  ov.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(t('pickTitle'))}"><div class="sh-grab"></div><div class="sh-head"><b>🎯 ${esc(t('pickTitle'))}</b><button class="btn sm ghost" id="shX" aria-label="${esc(t('close'))}">✕</button></div>
    <div class="sh-q">${inline(tx(q.q))}</div>
    <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${'ABCD'[i]}</span><span>${inline(o.txt)}</span></button>`).join('')}</div>
    ${S.life !== undefined ? `<div class="sh-foot">${lifeBtn('shLL')}<span class="small muted">${esc(t('llHint'))}</span></div>` : ''}</div>`;
  document.body.appendChild(ov);
  const btns = [...ov.querySelectorAll('.opt')];
  st.gone.forEach(i => { btns[i].classList.add('gone'); btns[i].disabled = true; });
  const ll = $('#shLL', ov); if (ll) { if (st.used) ll.disabled = true; ll.onclick = () => { if (useFifty(btns, opts.map(o => o.ok), st)) ll.disabled = true; }; }
  $('#shX', ov).onclick = closeSheet; ov.addEventListener('click', e => { if (e.target === ov) closeSheet(); });
  btns.forEach(b => b.onclick = () => {
    const i = +b.dataset.i; btns.forEach(x => x.disabled = true); if (ll) ll.disabled = true;
    b.classList.add(opts[i].ok ? 'right' : 'wrong'); btns[opts.findIndex(x => x.ok)].classList.add('right');
    setTimeout(() => { closeSheet(); onPick(i); }, opts[i].ok ? 500 : 950);
  });
}
/* 🎁 surprise box after every 5 in a row */
async function surprise(tries) {
  const kid = S.kid; if (!kid) return;
  if (document.querySelector('.overlay')) { if ((tries || 0) < 40) setTimeout(() => surprise((tries || 0) + 1), 700); return; } // wait until the answer popup is closed
  sfx('gift');
  const roll = Math.random(), kind = roll < 0.55 ? 'xp' : (roll < 0.8 && S.life !== undefined) ? 'life' : 'fact';
  const xp = 5 + Math.floor(Math.random() * 11);
  const ov = document.createElement('div'); ov.className = 'overlay';
  ov.innerHTML = `<div class="modal"><div class="giftbox" id="gb" role="button" tabindex="0" aria-label="${esc(t('giftT'))}">🎁</div><h2>${esc(t('giftT'))}</h2><p id="gp" style="margin:8px 0 18px">${esc(t('giftSub').replace('{n}', S.combo || 5))}</p><button class="btn hi" id="gOk" hidden>${esc(t('playOn'))}</button></div>`;
  document.body.appendChild(ov);
  const gb = $('#gb', ov), gp = $('#gp', ov), gOk = $('#gOk', ov);
  const openIt = async () => {
    if (gb.classList.contains('open')) return; gb.classList.add('open'); sfx('combo'); confetti(100);
    if (kind === 'xp') { gb.textContent = '💰'; gp.innerHTML = `<b class="num">+${xp}</b> ${esc(t('giftXp'))} 🤑`; }
    else if (kind === 'life') { gb.textContent = '💡'; S.life++; document.querySelectorAll('.ll').forEach(b => { b.disabled = false; const n = b.querySelector('.num'); if (n) n.textContent = '×' + S.life; }); gp.textContent = t('giftLife'); }
    else { gb.textContent = '🧠'; gp.innerHTML = `<b>${esc(t('factT'))}</b> ${esc(tx(pick(FACTS)))}<br><b class="num">+3 XP</b>`; }
    gOk.hidden = false; gOk.focus();
    if (kind !== 'life') await award(kid, kind === 'xp' ? xp : 3, null);
  };
  gb.onclick = openIt; gb.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openIt(); } };
  gOk.onclick = () => ov.remove();
}
/* 🎯 daily mission */
const MISSIONS = [
  { k: 'correct', n: [12, 15, 20], icon: '✅', af: 'Kry {n} antwoorde reg', en: 'Get {n} answers right' },
  { k: 'tests', n: [2, 3], icon: '📝', af: 'Voltooi {n} toetse of vraestelle', en: 'Finish {n} tests or papers' },
  { k: 'games', n: [2, 3], icon: '🎮', af: 'Speel {n} breinspeletjies', en: 'Play {n} brain games' },
  { k: 'combo', n: [5, 7], icon: '🔥', af: 'Kry {n} reg in ’n ry', en: 'Get {n} right in a row' },
];
const MISSION_XP = 30;
function missionOf(kid) {
  const d = today();
  if (!kid.mission || kid.mission.d !== d) { const rnd = seeded('mission' + d + kid.id); const m = MISSIONS[Math.floor(rnd() * MISSIONS.length)]; kid.mission = { d, k: m.k, n: m.n[Math.floor(rnd() * m.n.length)], p: 0, done: false }; }
  return kid.mission;
}
function missionText(m) { const def = MISSIONS.find(x => x.k === m.k) || MISSIONS[0]; return def.icon + ' ' + (L === 'en' ? def.en : def.af).replace('{n}', m.n); }
function missionCard(kid) {
  const m = missionOf(kid), pct = Math.round(100 * Math.min(m.p, m.n) / m.n);
  return `<div class="card missioncard ${m.done ? 'done' : ''}" id="misC"><div class="mi">${m.done ? '🏆' : '🎯'}</div><div class="mt"><b>${esc(t('missionT'))}</b><div class="small">${esc(missionText(m))}</div><div class="bar-h"><i style="width:${pct}%"></i></div></div><div class="mr"><span class="num">${m.done ? '✓' : `${Math.min(m.p, m.n)}/${m.n}`}</span><div class="small muted">🎁 +${MISSION_XP} XP</div></div></div>`;
}
function missionComplete(kid) {
  const m = kid.mission; if (!m || m.done) return; m.done = true;
  setTimeout(async () => {
    sfx('win');
    const ov = document.createElement('div'); ov.className = 'overlay';
    ov.innerHTML = `<div class="modal"><div class="big">🏆</div><h2>${esc(t('missionDone'))}</h2><p style="margin:8px 0 4px">${esc(missionText(m))}</p><p style="margin:0 0 18px"><b class="num">+${MISSION_XP} XP</b> 🎁</p><button class="btn hi" id="mdOk">${esc(t('close'))}</button></div>`;
    document.body.appendChild(ov); confetti(180);
    $('#mdOk', ov).onclick = () => { ov.remove(); if (S.route.s === 'home') render(); };
    await award(kid, MISSION_XP, { type: 'mission', label: missionText(m) });
  }, 1500);
}
/* ☀️ daily welcome (first visit of the day per boy): streak, mission, exam countdown and a fun fact */
function maybeWelcome() {
  const kid = S.kid; if (!kid || adminViewing()) return;
  const key = 'lh.welcome.' + kid.id; let last = null; try { last = localStorage.getItem(key); } catch (e) {}
  if (last === today()) return;
  setTimeout(() => {
    if (S.route.s !== 'home' || document.querySelector('.overlay') || S.kid !== kid) return;
    try { localStorage.setItem(key, today()); localStorage.setItem('lh.fact', today()); } catch (e) {}
    const m = missionOf(kid), h = new Date().getHours(), s = kid.streak || { count: 0 };
    const streakLine = s.last === today() ? (s.count > 1 ? t('streakToday').replace('{n}', s.count) : t('streakDay1')) : (s.last && daysBetween(s.last, today()) === 1 && s.count > 0) ? t('streakKeep').replace('{n}', s.count) : t('streakNew');
    const f = FACTS[Math.floor(seeded(today() + kid.id)() * FACTS.length)];
    const nx = examList().find(x => x.days !== null && x.days >= 0 && x.days <= 21);
    const ov = document.createElement('div'); ov.className = 'overlay';
    ov.innerHTML = `<div class="modal welcome"><div class="big">${h < 12 ? '🌅' : h < 18 ? '☀️' : '🌙'}</div><h2>${esc(h < 12 ? t('gMorning') : h < 18 ? t('gAfternoon') : t('gEvening'))}, ${esc(kid.name)}!</h2>
      <div class="wl"><div class="wrow">${esc(streakLine)}</div>
      <div class="wrow">🎯 <b>${esc(t('missionT'))}:</b> ${esc(missionText(m))} <span class="chip hi num">🎁 +${MISSION_XP} XP</span></div>
      ${nx ? `<div class="wrow">📅 ${esc(nx.s.icon + ' ' + tx(nx.s.short))}: ${esc(t('exIn'))} <b class="num">${nx.days}</b> ${esc(t('days'))}</div>` : ''}
      <div class="wrow">💡 <b>${esc(t('factT'))}</b> ${esc(tx(f))}</div></div>
      <button class="btn hi" id="wGo">${esc(t('letsGo'))}</button></div>`;
    document.body.appendChild(ov); confetti(60);
    $('#wGo', ov).onclick = () => { ov.remove(); sfx('win'); };
    ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
  }, 900);
}
function factLine() { return `<div class="factline small">💡 <b>${esc(t('factT'))}</b> ${esc(tx(pick(FACTS)))}</div>`; }
/* sprint: four answers to choose from (near misses) */
function mathChoices(a, traps) {
  const set = new Set([a]); (traps || []).forEach(x => { if (Number.isFinite(x) && x !== a && set.size < 3) set.add(x); }); // the classic mistake is always one of the options
  const rev = Math.abs(a) >= 10 ? Math.sign(a) * Number(String(Math.abs(a)).split('').reverse().join('')) : null;
  const cand = shuffle([a + 1, a - 1, a + 2, a - 2, a + 10, a - 10, rev, -a]).filter(x => x !== null && Number.isFinite(x) && x !== a && (a < 0 || x >= 0));
  cand.forEach(x => { if (set.size < 4) set.add(x); });
  let k = 3; while (set.size < 4) set.add(a + k++);
  return shuffle([...set]);
}

/* ---------- woordeboek (dictionary) ---------- */
const VRAAGWOORDE = [
  { w: { af: 'Noem', en: 'Name / State' }, d: { af: 'Gee net die feite of name – geen verduideliking nodig nie.', en: 'Just give the facts or names – no explanation needed.' }, tip: { af: '1 punt = 1 feit. Vra die vraag 3 punte, noem 3 dinge.', en: '1 mark = 1 fact. If the question is worth 3 marks, name 3 things.' } },
  { w: { af: 'Lys', en: 'List' }, d: { af: 'Skryf die items kort onder mekaar neer.', en: 'Write the items briefly, one below the other.' } },
  { w: { af: 'Identifiseer', en: 'Identify' }, d: { af: 'Herken iets in ’n bron, prent of teks en noem dit.', en: 'Recognise something in a source, picture or text and name it.' } },
  { w: { af: 'Definieer', en: 'Define' }, d: { af: 'Gee die presiese betekenis van ’n woord of begrip.', en: 'Give the exact meaning of a word or concept.' }, tip: { af: 'Leer jou sleutelterme woord vir woord – dit is maklike punte.', en: 'Learn your key terms word for word – they are easy marks.' } },
  { w: { af: 'Beskryf', en: 'Describe' }, d: { af: 'Sê hoe iets lyk, werk of gebeur – gee die kenmerke in volsinne.', en: 'Say what something looks like, how it works or what happens – give the features in full sentences.' } },
  { w: { af: 'Verduidelik', en: 'Explain' }, d: { af: 'Sê hoekom of hoe iets gebeur.', en: 'Say why or how something happens.' }, tip: { af: 'Gebruik woorde soos “omdat”, “want” en “daarom”.', en: 'Use words like “because”, “so” and “therefore”.' } },
  { w: { af: 'Bespreek', en: 'Discuss' }, d: { af: 'Kyk na verskillende kante van ’n saak en gee voorbeelde.', en: 'Look at different sides of an issue and give examples.' } },
  { w: { af: 'Vergelyk', en: 'Compare' }, d: { af: 'Wys die ooreenkomste én die verskille tussen twee dinge.', en: 'Show the similarities and the differences between two things.' }, tip: { af: 'Maak ’n tabel, of gebruik “albei … maar …”.', en: 'Make a table, or use “both … but …”.' } },
  { w: { af: 'Onderskei', en: 'Distinguish' }, d: { af: 'Wys duidelik hoe twee dinge van mekaar verskil.', en: 'Show clearly how two things differ from each other.' } },
  { w: { af: 'Klassifiseer', en: 'Classify' }, d: { af: 'Sorteer dinge in groepe volgens hul eienskappe.', en: 'Sort things into groups according to their properties.' } },
  { w: { af: 'Gee ’n voorbeeld', en: 'Give an example' }, d: { af: 'Noem ’n spesifieke geval wat by die begrip pas.', en: 'Name a specific case that fits the concept.' } },
  { w: { af: 'Motiveer', en: 'Justify' }, d: { af: 'Gee redes vir jou antwoord of keuse.', en: 'Give reasons for your answer or choice.' }, tip: { af: 'Antwoord + “want” + rede.', en: 'Answer + “because” + reason.' } },
  { w: { af: 'Evalueer', en: 'Evaluate' }, d: { af: 'Weeg die goeie en swak punte op en gee jou eie oordeel.', en: 'Weigh up the strong and weak points and give your own judgement.' } },
  { w: { af: 'Voorspel', en: 'Predict' }, d: { af: 'Sê wat waarskynlik gaan gebeur, gebaseer op wat jy weet.', en: 'Say what will probably happen, based on what you know.' } },
  { w: { af: 'Lei af', en: 'Infer / Deduce' }, d: { af: 'Kom tot ’n gevolgtrekking uit leidrade in die teks of bron.', en: 'Reach a conclusion from clues in the text or source.' } },
  { w: { af: 'Som op', en: 'Summarise' }, d: { af: 'Gee die hoofpunte kort in jou eie woorde.', en: 'Give the main points briefly in your own words.' } },
  { w: { af: 'Analiseer', en: 'Analyse' }, d: { af: 'Breek iets op in dele en kyk hoe die dele saamwerk.', en: 'Break something into parts and look at how the parts work together.' } },
  { w: { af: 'Interpreteer', en: 'Interpret' }, d: { af: 'Verduidelik wat ’n grafiek, prent of gedig eintlik vir jou sê.', en: 'Explain what a graph, picture or poem is really telling you.' } },
  { w: { af: 'Bereken', en: 'Calculate' }, d: { af: 'Werk die antwoord met getalle uit en wys al jou bewerkings.', en: 'Work out the answer with numbers and show all your working.' }, tip: { af: 'Bewerkings kry ook punte, selfs al is die finale antwoord verkeerd.', en: 'Working earns marks too, even if the final answer is wrong.' } },
  { w: { af: 'Skat', en: 'Estimate' }, d: { af: 'Gee ’n redelike benaderde antwoord sonder om presies te bereken.', en: 'Give a reasonable approximate answer without calculating exactly.' } },
  { w: { af: 'Teken', en: 'Draw' }, d: { af: 'Maak ’n duidelike skets of diagram – met byskrifte.', en: 'Make a clear sketch or diagram – with labels.' } },
  { w: { af: 'Benoem', en: 'Label' }, d: { af: 'Skryf die regte name by die dele van ’n diagram.', en: 'Write the correct names next to the parts of a diagram.' } },
  { w: { af: 'Stel voor', en: 'Suggest' }, d: { af: 'Gee jou eie idee of oplossing wat sin maak.', en: 'Give your own sensible idea or solution.' } },
  { w: { af: 'Ontwerp', en: 'Design' }, d: { af: 'Beplan ’n oplossing met sketse, materiale en afmetings.', en: 'Plan a solution with sketches, materials and measurements.' } },
];
let DICT = null;
function dict() {
  if (DICT) return DICT;
  const seen = new Set(); DICT = [];
  subjectsOfGrade(curGrade()).forEach(s => allTopics(s).forEach(({ tp, term }) => (tp.keyTerms || []).forEach(k => {
    const e = { af: (k.term && k.term.af) || '', en: (k.term && k.term.en) || '', daf: (k.def && k.def.af) || '', den: (k.def && k.def.en) || '', s, tp, term };
    const key = s.id + '|' + fold(e.af); if (!e.af || seen.has(key)) return; seen.add(key); DICT.push(e);
  })));
  return DICT;
}
const dWord = (e) => (L === 'af' ? e.af : e.en) || e.af;
const dOther = (e) => (L === 'af' ? e.en : e.af) || '';
const dDef = (e) => (L === 'af' ? e.daf : e.den) || e.daf || e.den;
function wordPopup(e) {
  if (!e) return;
  const ov = document.createElement('div'); ov.className = 'overlay';
  ov.innerHTML = `<div class="modal wordpop" style="--subject:${e.s.color}"><span class="chip subject">${e.s.icon} ${esc(tx(e.s.short))}</span><h2 style="margin:10px 0 2px">${esc(dWord(e))}</h2>${dOther(e) ? `<div class="small muted">${L === 'af' ? 'English' : 'Afrikaans'}: <b>${esc(dOther(e))}</b></div>` : ''}<p style="margin:12px 0 16px;text-align:left">${esc(dDef(e))}</p><div class="row" style="justify-content:center"><button class="btn" id="wTopic">📖 ${esc(t('toTopic'))}</button><button class="btn hi" id="wClose">${esc(t('close'))}</button></div></div>`;
  document.body.appendChild(ov);
  $('#wClose', ov).onclick = () => ov.remove();
  $('#wTopic', ov).onclick = () => { ov.remove(); go('onderwerp-' + e.tp.id); };
  ov.addEventListener('click', ev => { if (ev.target === ov) ov.remove(); });
}
/* underline subject words in a rendered summary; tap → popup */
function linkTerms(root, entries) {
  if (!root || !entries.length) return;
  const map = new Map();
  entries.forEach(e => { const w = dWord(e).trim(); if (w.length >= 3 && !map.has(w.toLowerCase())) map.set(w.toLowerCase(), e); });
  const words = [...map.keys()].sort((a, b) => b.length - a.length).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!words.length) return;
  let re; try { re = new RegExp(`(?<![\\p{L}\\p{N}])(${words.join('|')})(?![\\p{L}\\p{N}])`, 'giu'); } catch (e) { return; }
  const done = new Set(); let count = 0;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.parentElement && n.parentElement.closest('.dw, code, button, th')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    if (count >= 30) break;
    const txt = node.nodeValue; re.lastIndex = 0; let m, last = 0, changed = false; const frag = document.createDocumentFragment();
    while ((m = re.exec(txt))) {
      const key = m[1].toLowerCase(); if (done.has(key) || !map.has(key)) continue;
      done.add(key); count++; changed = true;
      frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
      const b = document.createElement('button'); b.type = 'button'; b.className = 'dw'; b.textContent = m[1]; b.dataset.k = key; frag.appendChild(b);
      last = m.index + m[1].length;
    }
    if (changed) { frag.appendChild(document.createTextNode(txt.slice(last))); node.parentNode.replaceChild(frag, node); }
  }
  root.querySelectorAll('.dw').forEach(b => b.onclick = () => wordPopup(map.get(b.dataset.k)));
}
function wordOfDay() {
  const sets = {}; subjectsOfGrade(curGrade()).forEach(s => { sets[s.id] = new Set(scopeOf(s).topics); });
  const pool = dict().filter(e => sets[e.s.id] && sets[e.s.id].has(e.tp.id) && dOther(e));
  const P = pool.length ? pool : dict();
  return P[Math.floor(seeded('wotd' + today())() * P.length)];
}
function subjChips(cur, attr) {
  return `<div class="row chipsel" style="gap:6px">${[['all', '🌈', t('allSubj')]].concat(subjectsOfGrade(curGrade()).map(s => [s.id, s.icon, tx(s.short)])).map(([id, ic, nm]) => `<button class="chip ${cur === id ? 'on' : ''}" data-${attr}="${id}">${ic} ${esc(nm)}</button>`).join('')}</div>`;
}
function renderDict(main) {
  const tab = S.dictTab || 'terms';
  main.innerHTML = `<h1>📖 ${esc(t('dictT'))}</h1><p class="muted" style="margin:4px 0 6px;max-width:70ch">${esc(t('dictSub'))}</p>
  <div class="tabs"><button class="${tab === 'terms' ? 'on' : ''}" data-dt="terms">🔤 ${esc(t('dictTabTerms'))} <span class="num">(${dict().length})</span></button><button class="${tab === 'q' ? 'on' : ''}" data-dt="q">❓ ${esc(t('dictTabQ'))} <span class="num">(${VRAAGWOORDE.length})</span></button></div><div id="dbody"></div>`;
  main.querySelectorAll('[data-dt]').forEach(b => b.onclick = () => { S.dictTab = b.dataset.dt; renderDict(main); });
  const body = $('#dbody');
  if (tab === 'q') {
    body.innerHTML = `<p class="small muted" style="margin-bottom:12px;max-width:70ch">${esc(t('dictQSub'))}</p><div class="grid two">${VRAAGWOORDE.map(v => `<div class="card qword"><h3>${esc(tx(v.w))} <span class="chip">${esc(L === 'af' ? v.w.en : v.w.af)}</span></h3><p style="margin:6px 0">${esc(tx(v.d))}</p>${v.tip ? `<p class="small muted">💡 ${esc(tx(v.tip))}</p>` : ''}</div>`).join('')}</div>`;
    return;
  }
  const sid = S.dictSubj || 'all';
  body.innerHTML = `<input type="search" id="dq" class="dsearch" placeholder="${esc(t('dictSearch'))}" value="${esc(S.dictQ || '')}" autocomplete="off" autocapitalize="off" spellcheck="false">${subjChips(sid, 'ds')}<div id="dres" style="margin-top:12px"></div>`;
  body.querySelectorAll('[data-ds]').forEach(b => b.onclick = () => { S.dictSubj = b.dataset.ds; renderDict(main); });
  let limit = 40;
  const show = () => {
    const q = fold(S.dictQ || '').trim();
    let list = dict().filter(e => sid === 'all' || e.s.id === sid);
    if (q) list = list.map(e => { const a = fold(dWord(e)), b = fold(dOther(e)), d = fold(e.daf + ' ' + e.den); return { e, r: a.startsWith(q) ? 0 : a.includes(q) ? 1 : b.includes(q) ? 2 : d.includes(q) ? 3 : 9 }; }).filter(x => x.r < 9).sort((x, y) => x.r - y.r || dWord(x.e).localeCompare(dWord(y.e), L)).map(x => x.e);
    else list = list.slice().sort((x, y) => dWord(x).localeCompare(dWord(y), L));
    const n = list.length;
    $('#dres').innerHTML = n ? `<div class="small muted" style="margin-bottom:8px"><span class="num">${n}</span> ${esc(t('dictWords'))}</div><div class="dlist">${list.slice(0, limit).map(e => `<div class="dentry" style="--subject:${e.s.color}"><div class="row" style="justify-content:space-between;gap:6px"><b class="dt">${esc(dWord(e))}</b>${dOther(e) ? `<span class="chip">${L === 'af' ? 'EN' : 'AF'}: ${esc(dOther(e))}</span>` : ''}</div><div class="dd">${esc(dDef(e))}</div><div class="row small" style="gap:6px;margin-top:6px"><span class="chip subject">${e.s.icon} ${esc(tx(e.s.short))}</span><button class="linkbtn" data-tp="${e.tp.id}">${esc(tx(e.tp.title))} →</button></div></div>`).join('')}</div>${n > limit ? `<div class="center" style="margin-top:12px"><button class="btn" id="dmore">${esc(t('showMore'))}</button></div>` : ''}`
      : `<div class="card muted">${esc(t('dictNone'))}</div>`;
    $('#dres').querySelectorAll('[data-tp]').forEach(b => b.onclick = () => go('onderwerp-' + b.dataset.tp));
    const m = $('#dmore'); if (m) m.onclick = () => { limit += 60; show(); };
  };
  let tmr; $('#dq').oninput = (ev) => { S.dictQ = ev.target.value; clearTimeout(tmr); tmr = setTimeout(() => { limit = 40; show(); }, 120); };
  show();
}

/* ---------- brain games ---------- */
const GAMES = [['vinnig', 'quick', '🚀'], ['geheue', 'memory', '🧩'], ['raai', 'hangman', '🔤'], ['blits', 'blitz', '✅'], ['sprint', 'sprint', '⚡']];
const GAME_ICON = { quick: '🚀', memory: '🧩', hangman: '🔤', sprint: '⚡', blitz: '✅' };
const okPair = (e) => e.af && e.en && fold(e.af) !== fold(e.en) && e.af.length <= 26 && e.en.length <= 26;
const okWord = (w) => !!w && w.length >= 3 && w.length <= 18 && [...fold(w)].every(c => /[a-z' -]/.test(c)) && (fold(w).match(/[a-z]/g) || []).length >= 3;
function subjQs(sid, type) { const out = []; subjectsOfGrade(curGrade()).filter(s => !sid || sid === 'all' || s.id === sid).forEach(s => allTopics(s).filter(x => inPool(s, x.tp)).forEach(({ tp, term }) => tp.quiz.forEach(q => { if (q.type === type) out.push({ q, topic: tp, term, subj: s }); }))); return out; }
function subjLabel(sid) { const s = sid && sid !== 'all' ? S.content.subjects[sid] : null; return s ? `${s.icon} ${tx(s.name)}` : `🌈 ${t('allSubj')}`; }
function gameCount(key, sid) {
  if (key === 'memory') return gamePool(sid).filter(okPair).length;
  if (key === 'hangman') return gamePool(sid).filter(e => okWord(dWord(e)) && dDef(e)).length;
  if (key === 'blitz') return subjQs(sid, 'tf').length;
  if (key === 'quick') return quickPool(sid).length;
  return null;
}
function gameSubj() { if (!S.gameSubj) { try { S.gameSubj = localStorage.getItem('lh.gsubj') || 'all'; } catch (e) { S.gameSubj = 'all'; } } return S.gameSubj; }
function setGameSubj(v) { S.gameSubj = v; try { localStorage.setItem('lh.gsubj', v); } catch (e) {} }
function bestText(key, best) { if (best === null || best === undefined) return '–'; if (key === 'memory') return `${best} ${t('moves')}`; if (key === 'hangman') return `${Math.floor(best / 100)}/5`; return String(best); }
function renderGames(main) {
  const kid = S.kid, cur = gameSubj(), w = weekId(), g = kid.games || {};
  setSubjectColor(cur !== 'all' && S.content.subjects[cur] ? S.content.subjects[cur].color : null);
  const ch = kid.challenge && kid.challenge.w === w ? kid.challenge : null;
  main.innerHTML = `<h1>🎮 ${esc(t('playT'))}</h1><p class="muted" style="margin:4px 0 14px;max-width:70ch">${esc(t('playSub'))}</p>
  <div class="grid two">
    <div class="card"><h3>🏆 ${esc(t('weekT'))}</h3><div id="twinBox" class="small muted" style="margin-top:8px">…</div></div>
    <div class="card"><h3>⚔️ ${esc(t('chalT'))}</h3><p class="small muted" style="margin:4px 0 10px">${esc(t('chalSub'))}</p><div class="row" style="justify-content:space-between"><span class="chip ${ch ? 'good' : ''}">${ch ? `✓ ${esc(t('chalDone'))}: <span class="num">${ch.score}/${ch.total}</span>` : esc(t('chalNot'))}</span><button class="btn subject" data-go="uitdaging">${esc(ch ? t('chalReplay') : t('chalPlay'))} →</button></div></div>
  </div>
  ${chessHubCard()}
  <h2 style="margin:22px 0 4px">🧠 ${esc(t('gamesFor'))}: <span style="color:var(--subject)">${esc(subjLabel(cur))}</span></h2><p class="small muted" style="margin-bottom:8px">${esc(t('pickSubj'))}</p>${subjChips(cur, 'gs')}${scopeToggle('gsc')}
  <div class="games" style="margin-top:12px">${GAMES.map(([slug, key, ic], i) => { const [nm, ds] = t('g.' + key); const st = g[key] || {}; const n = gameCount(key, cur); return `<button class="game" data-go="spel-${slug}" style="animation-delay:${i * 60}ms"><span class="gi">${ic}</span><b>${esc(nm)}</b><span class="small muted">${esc(ds)}</span><span class="row" style="gap:4px">${key === 'sprint' ? `<span class="chip">📐 ${esc(t('alwaysMaths'))}</span>` : `<span class="chip subject num">${esc(subjLabel(cur).split(' ')[0])} ${n} ${esc(key === 'blitz' ? t('nStatements') : key === 'quick' ? t('nQuestions') : t('nWords'))}</span>`}${st.plays ? `<span class="chip hi num">${esc(t('best'))}: ${esc(bestText(key, st.best))}</span>` : ''}</span></button>`; }).join('')}</div>
  <div class="row" style="margin-top:18px"><button class="btn" data-go="kentekens">🏅 ${esc(t('badges'))}</button><button class="btn" data-go="foute">❌ ${esc(t('mistakesT'))}</button></div>`;
  main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  main.querySelectorAll('[data-gs]').forEach(b => b.onclick = () => { setGameSubj(b.dataset.gs); renderGames(main); });
  main.querySelectorAll('[data-gsc]').forEach(b => b.onclick = () => { setScopeOnly(b.dataset.gsc === '1'); renderGames(main); });
  fillTwin($('#twinBox'));
}
function gamePool(sid) { return dict().filter(e => (!sid || sid === 'all' || e.s.id === sid) && inPool(e.s, e.tp)); }
function gameHead(main, key, right) {
  const [nm, ds] = t('g.' + key), sid = gameSubj();
  if (key !== 'sprint') setSubjectColor(sid !== 'all' && S.content.subjects[sid] ? S.content.subjects[sid].color : null);
  return `<button class="back" data-go="speel">← ${esc(t('playT'))}</button><div class="row" style="justify-content:space-between"><h1>${GAME_ICON[key]} ${esc(nm)}</h1><span class="row" style="gap:6px">${right || ''}${muteBtn()}</span></div><p class="small muted" style="margin:4px 0 8px">${esc(ds)}</p>${key === 'sprint' ? '' : `<div class="row" style="gap:8px;margin-bottom:12px"><span class="chip subject">${esc(subjLabel(sid))}</span><button class="linkbtn small" data-go="speel">${esc(t('changeSubj'))} →</button></div>`}`;
}
function wireBack(main) { main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go)); wireMute(main); }
async function gameOver(main, key, score, xp, big, line, lowerBetter, extra) {
  const kid = S.kid; kid.games = kid.games || {};
  const st = kid.games[key] = kid.games[key] || { plays: 0, best: null };
  const rec = st.best === null || st.best === undefined || (lowerBetter ? score < st.best : score > st.best);
  st.plays++; if (rec) st.best = score; kid.totals.games = (kid.totals.games || 0) + 1;
  const [nm] = t('g.' + key);
  main.innerHTML = `<div class="quiz"><div class="card pad-lg result"><div class="label">${GAME_ICON[key]} ${esc(nm)}</div><div class="score num">${esc(big)}</div><div class="msg">${rec && st.plays > 1 ? '🏆 ' + esc(t('newRecord')) + ' ' : ''}${esc(line)}</div>
    <div class="row" style="justify-content:center"><span class="chip hi num">+${xp} XP ${esc(t('earned'))}</span><span class="chip num">${esc(t('best'))}: ${esc(bestText(key, st.best))}</span></div>${extra || ''}
    <div class="row" style="justify-content:center;margin-top:18px"><button class="btn subject" id="again">🔁 ${esc(t('playAgain'))}</button><button class="btn" data-go="speel">${esc(t('back'))}</button></div></div></div>`;
  $('#again').onclick = () => render();
  wireBack(main);
  if (rec && st.plays > 1) confetti(160); else if (xp >= 20) confetti(70);
  await award(kid, xp, { type: 'game', game: key, label: `${nm}: ${line}` });
}
function clearGame() { chessCleanup(); if (S._gameTimer) { clearInterval(S._gameTimer); S._gameTimer = null; } if (S._keyH) { document.removeEventListener('keydown', S._keyH); S._keyH = null; } }
function setKeys(fn) { if (S._keyH) document.removeEventListener('keydown', S._keyH); S._keyH = fn; document.addEventListener('keydown', fn); }

/* memory pairs: Afrikaans word ↔ English word */
function renderMemory(main) {
  let pool = gamePool(gameSubj()).filter(okPair); if (pool.length < 6) pool = gamePool('all').filter(okPair); if (pool.length < 6) pool = dict().filter(okPair);
  const pick = [], seenA = new Set(), seenE = new Set();
  for (const e of shuffle(pool)) { if (pick.length >= 6) break; if (seenA.has(fold(e.af)) || seenE.has(fold(e.en))) continue; seenA.add(fold(e.af)); seenE.add(fold(e.en)); pick.push(e); }
  const cards = shuffle(pick.flatMap((e, i) => [{ p: i, txt: e.af, lang: 'AF' }, { p: i, txt: e.en, lang: 'EN' }]));
  const G = { open: [], got: 0, moves: 0, lock: false, start: Date.now() };
  main.innerHTML = gameHead(main, 'memory', `<span class="chip num" id="mvs">0 ${esc(t('moves'))}</span>`) + `<div class="memgrid">${cards.map((c, i) => `<button class="mcard" data-i="${i}" aria-label="?"><span class="in"><span class="f">?</span><span class="b"><small>${c.lang}</small>${esc(c.txt)}</span></span></button>`).join('')}</div>`;
  wireBack(main);
  const done = () => {
    const secs = Math.round((Date.now() - G.start) / 1000), xp = clamp(30 - (G.moves - 6) * 2, 8, 30);
    const extra = `<div class="review" style="margin-top:16px;text-align:left">${pick.map(e => `<div class="r"><div>🧩</div><div><b>${esc(e.af)}</b> = ${esc(e.en)}<div class="ex">${e.s.icon} ${esc(tx(e.s.short))}</div></div></div>`).join('')}</div>`;
    gameOver(main, 'memory', G.moves, xp, `${G.moves}`, `${t('moves')} · ${secs} s`, true, extra);
  };
  main.querySelectorAll('.mcard').forEach(el => el.onclick = () => {
    const i = +el.dataset.i; if (G.lock || el.classList.contains('got') || G.open.includes(i)) return;
    el.classList.add('flip'); G.open.push(i);
    if (G.open.length < 2) return;
    G.moves++; $('#mvs').textContent = `${G.moves} ${t('moves')}`;
    const [a, b] = G.open, ea = main.querySelector(`[data-i="${a}"]`), eb = main.querySelector(`[data-i="${b}"]`);
    if (cards[a].p === cards[b].p) { G.open = []; G.got++; setTimeout(() => { ea.classList.add('got'); eb.classList.add('got'); }, 250); if (G.got === pick.length) setTimeout(done, 800); }
    else { G.lock = true; setTimeout(() => { ea.classList.remove('flip'); eb.classList.remove('flip'); G.open = []; G.lock = false; }, 950); }
  });
}

/* raai die woord: hangman with the definition as the clue */
function renderHangman(main) {
  let pool = gamePool(gameSubj()).filter(e => okWord(dWord(e)) && dDef(e)); if (pool.length < 5) pool = gamePool('all').filter(e => okWord(dWord(e)) && dDef(e)); if (pool.length < 5) pool = dict().filter(e => okWord(dWord(e)) && dDef(e));
  const words = shuffle(pool).slice(0, 5);
  const G = { i: 0, solved: 0, livesLeft: 0, log: [] };
  const KEYS = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const finish = () => {
    clearGame();
    const score = G.solved * 100 + G.livesLeft, xp = G.solved * 6 + (G.solved === words.length ? 10 : 0);
    const extra = `<div class="review" style="margin-top:16px;text-align:left">${G.log.map(x => `<div class="r ${x.won ? '' : 'bad'}"><div>${x.won ? '✅' : '❌'}</div><div><b>${esc(x.word)}</b><div class="ex">${esc(x.def)}</div></div></div>`).join('')}</div>`;
    gameOver(main, 'hangman', score, xp, `${G.solved}/${words.length}`, t('wordsOf'), false, extra);
  };
  const drawWord = () => {
    if (G.i >= words.length) return finish();
    const e = words[G.i], word = dWord(e), letters = [...word];
    const W = { guessed: new Set(), lives: 6, over: false };
    const isL = (c) => /[a-z]/.test(fold(c));
    const solved = () => letters.every(c => !isL(c) || W.guessed.has(fold(c)));
    main.innerHTML = gameHead(main, 'hangman', `<span class="chip num">${G.i + 1} / ${words.length}</span>`) + `<div class="card pad-lg" style="--subject:${e.s.color}"><div class="row" style="justify-content:space-between"><span class="chip subject">${e.s.icon} ${esc(tx(e.s.short))}</span><span id="hlives" class="lives" aria-label="${esc(t('lives'))}"></span></div>
      <p class="hdef">${esc(dDef(e))}</p><div class="hword" id="hword"></div><div id="hmsg" class="center" style="min-height:28px;margin:8px 0"></div>
      <div class="keys" id="keys">${KEYS.map(k => `<button class="key" data-k="${k}">${k.toUpperCase()}</button>`).join('')}</div>
      <div class="row" style="justify-content:center;margin-top:12px" id="hact"><button class="btn sm ghost" id="hint">💡 ${esc(t('hintLetter'))}</button></div></div>`;
    wireBack(main);
    const paint = () => {
      $('#hword').innerHTML = letters.map(c => !isL(c) ? `<span class="hs">${c === ' ' ? '&nbsp;' : esc(c)}</span>` : (() => { const shown = W.guessed.has(fold(c)) || W.over; return `<span class="hl ${shown ? 'on' : ''} ${W.over && !W.guessed.has(fold(c)) ? 'miss' : ''}">${shown ? esc(c.toUpperCase()) : ''}</span>`; })()).join('');
      $('#hlives').textContent = '❤️'.repeat(Math.max(0, W.lives)) + '🤍'.repeat(6 - Math.max(0, W.lives));
    };
    const end = (won) => {
      W.over = true; paint(); main.querySelectorAll('.key').forEach(b => b.disabled = true);
      if (won) { G.solved++; G.livesLeft += W.lives; }
      G.log.push({ word, won, def: dDef(e) });
      $('#hmsg').innerHTML = won ? `<b style="color:var(--good)">🎉 ${esc(t('correct'))}</b>` : `<b style="color:var(--bad)">${esc(t('wordWas'))}: ${esc(word)}</b>`;
      $('#hact').innerHTML = `<button class="btn subject" id="nextW">${G.i + 1 < words.length ? esc(t('nextWord')) + ' →' : esc(t('finish')) + ' 🏁'}</button>`;
      $('#nextW').onclick = () => { G.i++; drawWord(); };
      if (won) confetti(40);
    };
    const guess = (k) => {
      if (W.over || W.guessed.has(k)) return;
      W.guessed.add(k); const b = main.querySelector(`[data-k="${k}"]`); const hit = letters.some(c => isL(c) && fold(c) === k);
      if (b) { b.disabled = true; b.classList.add(hit ? 'hit' : 'miss'); }
      if (!hit) W.lives--; sfx(hit ? 'tap' : 'bad');
      paint(); if (solved()) { sfx('combo'); end(true); } else if (W.lives <= 0) end(false);
    };
    main.querySelectorAll('.key').forEach(b => b.onclick = () => guess(b.dataset.k));
    $('#hint').onclick = () => { if (W.over || W.lives <= 1) return; const hidden = letters.filter(c => isL(c) && !W.guessed.has(fold(c))); if (!hidden.length) return; W.lives--; guess(fold(hidden[Math.floor(Math.random() * hidden.length)])); };
    setKeys((ev) => { if (ev.metaKey || ev.ctrlKey || ev.altKey) return; const k = (ev.key || '').toLowerCase(); if (/^[a-z]$/.test(k)) guess(k); else if (ev.key === 'Enter' && W.over) { const n = $('#nextW'); if (n) n.click(); } });
    paint();
  };
  drawWord();
}

/* wiskunde-sprint: 60 seconds of mental maths */
const fmtN = (n) => n < 0 ? `(−${-n})` : String(n);
function mathQ() {
  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  switch (r(0, 7)) {
    case 0: { const a = r(2, 12), b = r(2, 12); return { q: `${a} × ${b}`, a: a * b }; }
    case 1: { const b = r(2, 12), c = r(2, 12); return { q: `${b * c} ÷ ${b}`, a: c }; }
    case 2: { const a = r(12, 99), b = r(11, 99); return { q: `${a} + ${b}`, a: a + b }; }
    case 3: { const a = r(30, 150), b = r(11, a); return { q: `${a} − ${b}`, a: a - b }; }
    case 4: { const a = r(-12, 12), b = r(-12, 12); return Math.random() < 0.5 ? { q: `${fmtN(a)} + ${fmtN(b)}`, a: a + b } : { q: `${fmtN(a)} − ${fmtN(b)}`, a: a - b }; }
    case 5: { const a = r(2, 12); return { q: `${a}²`, a: a * a, trap: [a * 2] }; }
    case 6: { const p = [10, 20, 25, 50, 75][r(0, 4)], base = r(1, 20) * 20; return { q: `${p}% ${L === 'af' ? 'van' : 'of'} ${base}`, a: base * p / 100 }; }
    default: { const a = r(1, 10), b = r(2, 6), c = r(2, 6); return { q: `${a} + ${b} × ${c}`, a: a + b * c, trap: [(a + b) * c] }; }
  }
}
function renderSprint(main) {
  const DUR = 60;
  main.innerHTML = gameHead(main, 'sprint') + `<div class="card pad-lg center"><div style="font-size:56px">⚡</div><h2 style="margin:6px 0">${DUR} s</h2><p class="muted small" style="margin-bottom:14px">${esc(t('sprintHow'))}</p><button class="btn subject" id="go">▶ ${esc(t('start'))}</button></div>`;
  wireBack(main);
  $('#go').onclick = () => {
    const G = { score: 0, n: 0, streak: 0, end: Date.now() + DUR * 1000, cur: null, inp: '', wrong: [], busy: false };
    main.innerHTML = gameHead(main, 'sprint', `<span class="row" style="gap:6px"><span class="chip num" id="sT">${DUR}</span><span class="chip hi num" id="sS">0 ✓</span></span>`) + `<div class="card pad-lg"><div class="center small" id="sStreak" style="min-height:20px"></div><div class="sq num" id="sQ"></div><div class="schoices num" id="sC"></div></div>`;
    wireBack(main);
    const paint = () => {
      $('#sQ').textContent = G.cur.q + ' = ?'; $('#sS').textContent = `${G.score} ✓`; $('#sStreak').textContent = G.streak >= 3 ? `🔥 ×${G.streak}` : '';
      $('#sC').innerHTML = G.cur.c.map((v, i) => `<button data-i="${i}">${esc(String(v).replace('-', '−'))}</button>`).join('');
      $('#sC').querySelectorAll('button').forEach(b => b.onclick = () => choose(+b.dataset.i));
    };
    const next = () => { G.cur = mathQ(); G.cur.c = mathChoices(G.cur.a, G.cur.trap); paint(); };
    const choose = (i) => {
      if (G.busy || !G.cur) return;
      const v = G.cur.c[i], btns = $('#sC').querySelectorAll('button'), ri = G.cur.c.indexOf(G.cur.a); G.n++; G.busy = true;
      btns.forEach(b => b.disabled = true);
      if (v === G.cur.a) { G.score++; G.streak++; btns[i].classList.add('right'); funAnswer(true, { quiet: true, streak: G.streak }); setTimeout(() => { G.busy = false; next(); }, 220); }
      else { G.streak = 0; G.wrong.push({ q: G.cur.q, a: G.cur.a, v }); btns[i].classList.add('wrong'); if (btns[ri]) btns[ri].classList.add('right'); funAnswer(false, { quiet: true, streak: 0 }); setTimeout(() => { G.busy = false; next(); }, 750); }
    };
    setKeys((ev) => { const m = '1234'.indexOf(ev.key); if (m >= 0) choose(m); });
    const finish = () => {
      clearGame();
      const extra = G.wrong.length ? `<h3 style="margin-top:16px;text-align:left">${esc(t('review'))}</h3><div class="review" style="text-align:left">${G.wrong.slice(0, 8).map(w => `<div class="r bad"><div>❌</div><div class="num">${esc(w.q)} = <b>${w.a}</b> <span class="muted">(${esc(String(w.v).replace('-', '−'))})</span></div></div>`).join('')}</div>` : '';
      gameOver(main, 'sprint', G.score, Math.min(30, G.score), `${G.score}`, `${G.score}/${G.n} ${t('correctN')} · ${t('timeUp')}`, false, extra);
    };
    S._gameTimer = setInterval(() => { const left = Math.max(0, Math.ceil((G.end - Date.now()) / 1000)); const el = $('#sT'); if (el) { el.textContent = left; el.classList.toggle('bad', left <= 10); } if (left <= 0) finish(); }, 250);
    next();
  };
}

/* waar/onwaar-blits: 60 seconds of true/false statements from their own tests */
function renderBlitz(main) {
  const DUR = 60, sid = gameSubj();
  const pool = subjQs(sid, 'tf');
  main.innerHTML = gameHead(main, 'blitz') + `<div class="card pad-lg center"><div style="font-size:56px">✅</div><h2 style="margin:6px 0">${DUR} s</h2><p class="muted small" style="margin-bottom:14px">${esc(t('blitzHow'))}</p><button class="btn subject" id="go" ${pool.length ? '' : 'disabled'}>▶ ${esc(t('start'))}</button></div>`;
  wireBack(main);
  $('#go').onclick = () => {
    const qs = shuffle(pool), kid = S.kid;
    const G = { i: 0, score: 0, streak: 0, end: Date.now() + DUR * 1000, wrong: [], busy: false };
    main.innerHTML = gameHead(main, 'blitz', `<span class="row" style="gap:6px"><span class="chip num" id="bT">${DUR}</span><span class="chip hi num" id="bS">0 ✓</span></span>`) + `<div class="card pad-lg" id="bCard"><div class="row" style="justify-content:space-between"><span class="chip subject" id="bSubj"></span><span class="small" id="bStreak"></span></div><div class="blitzq" id="bQ"></div>
      <div class="blitzbtns"><button class="yes" data-v="1">✓ ${esc(t('true_'))}</button><button class="no" data-v="0">✗ ${esc(t('false_'))}</button></div></div>`;
    wireBack(main);
    const paint = () => { const it = qs[G.i]; document.documentElement.style.setProperty('--subject', it.subj.color); $('#bSubj').textContent = `${it.subj.icon} ${tx(it.subj.short)}`; $('#bQ').innerHTML = inline(tx(it.q.q)); $('#bS').textContent = `${G.score} ✓`; $('#bStreak').textContent = G.streak >= 3 ? `🔥 ×${G.streak}` : ''; };
    const finish = () => {
      clearGame();
      const extra = G.wrong.length ? `<h3 style="margin-top:16px;text-align:left">${esc(t('review'))}</h3><div class="review" style="text-align:left">${G.wrong.slice(0, 10).map(it => `<div class="r bad"><div>❌</div><div><div>${inline(tx(it.q.q))}</div><div class="ex"><b>${esc(it.q.answer ? t('true_') : t('false_'))}</b> – ${inline(tx(it.q.explain))}</div></div></div>`).join('')}</div><p class="small muted" style="margin-top:8px">${esc(t('wentToMistakes'))}</p>` : '';
      gameOver(main, 'blitz', G.score, Math.min(30, G.score), `${G.score}`, `${G.score}/${G.i} ${t('correctN')} · ${t('timeUp')}`, false, extra);
    };
    const answer = (v) => {
      if (G.busy) return; const it = qs[G.i], ok = v === it.q.answer, card = $('#bCard');
      noteMistake(kid, it.topic, it.q, ok);
      if (ok) { G.score++; G.streak++; } else { G.streak = 0; G.wrong.push(it); }
      funAnswer(ok, { quiet: true, streak: G.streak });
      card.classList.remove('flashok', 'flashno'); void card.offsetWidth; card.classList.add(ok ? 'flashok' : 'flashno');
      G.i++; G.busy = true; setTimeout(() => { G.busy = false; if (G.i >= qs.length) finish(); else paint(); }, ok ? 150 : 450);
    };
    main.querySelectorAll('.blitzbtns [data-v]').forEach(b => b.onclick = () => answer(b.dataset.v === '1'));
    setKeys((ev) => { if (ev.key === 'ArrowLeft' || ev.key.toLowerCase() === 'w' || ev.key.toLowerCase() === 't') answer(true); else if (ev.key === 'ArrowRight' || ev.key.toLowerCase() === 'o' || ev.key.toLowerCase() === 'f') answer(false); });
    S._gameTimer = setInterval(() => { const left = Math.max(0, Math.ceil((G.end - Date.now()) / 1000)); const el = $('#bT'); if (el) { el.textContent = left; el.classList.toggle('bad', left <= 10); } if (left <= 0) finish(); }, 250);
    paint();
  };
}
/* vinnige vrae: 90 seconds of multiple-choice questions from the chosen subject */
function quickPool(sid) { return subjQs(sid, 'mc').concat(subjQs(sid, 'fill').filter(it => it.q.choices)); }
function quickOpts(q) { return q.type === 'mc' ? q.options.map((o, i) => ({ txt: tx(o), ok: i === q.answer })) : choiceOpts(q); }
function renderQuick(main) {
  const DUR = 90, sid = gameSubj(), pool = quickPool(sid);
  main.innerHTML = gameHead(main, 'quick') + `<div class="card pad-lg center"><div style="font-size:56px">🚀</div><h2 style="margin:6px 0">${DUR} s</h2><p class="muted small" style="margin-bottom:14px">${esc(t('quickHow'))}</p><button class="btn subject" id="go" ${pool.length ? '' : 'disabled'}>▶ ${esc(t('start'))}</button></div>`;
  wireBack(main);
  $('#go').onclick = () => {
    const qs = shuffle(pool), kid = S.kid;
    const G = { i: 0, score: 0, streak: 0, end: Date.now() + DUR * 1000, wrong: [], busy: false };
    main.innerHTML = gameHead(main, 'quick', `<span class="row" style="gap:6px"><span class="chip num" id="qT">${DUR}</span><span class="chip hi num" id="qS">0 ✓</span></span>`) + `<div class="card pad-lg" id="qCard"><div class="row" style="justify-content:space-between"><span class="small muted" id="qTopic"></span><span class="small" id="qStreak"></span></div><div class="q" id="qQ" style="margin:10px 0"></div><div class="opts" id="qOpts"></div></div>`;
    wireBack(main);
    const finish = () => {
      clearGame();
      const extra = G.wrong.length ? `<h3 style="margin-top:16px;text-align:left">${esc(t('review'))}</h3><div class="review" style="text-align:left">${G.wrong.slice(0, 10).map(it => `<div class="r bad"><div>❌</div><div><div>${inline(tx(it.q.q))}</div><div class="ex"><b>${inline(it.right)}</b> – ${inline(tx(it.q.explain))}</div></div></div>`).join('')}</div><p class="small muted" style="margin-top:8px">${esc(t('wentToMistakes'))}</p>` : '';
      gameOver(main, 'quick', G.score, Math.min(30, G.score * 2), `${G.score}`, `${G.score}/${G.i} ${t('correctN')} · ${t('timeUp')}`, false, extra);
    };
    const paint = () => {
      const it = qs[G.i]; document.documentElement.style.setProperty('--subject', it.subj.color);
      $('#qTopic').textContent = `${it.subj.icon} ${tx(it.subj.short)} · ${tx(it.topic.title)}`;
      $('#qQ').innerHTML = inline(tx(it.q.q)); $('#qS').textContent = `${G.score} ✓`; $('#qStreak').textContent = G.streak >= 3 ? `🔥 ×${G.streak}` : '';
      G.opts = quickOpts(it.q);
      $('#qOpts').innerHTML = G.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${'ABCD'[i]}</span><span>${inline(o.txt)}</span></button>`).join('');
      $('#qOpts').querySelectorAll('.opt').forEach(b => b.onclick = () => answer(+b.dataset.i));
    };
    const answer = (i) => {
      if (G.busy || !G.opts[i]) return; const it = qs[G.i], ok = G.opts[i].ok, ri = G.opts.findIndex(o => o.ok); G.busy = true;
      noteMistake(kid, it.topic, it.q, ok);
      const opts = $('#qOpts').querySelectorAll('.opt'); opts.forEach(x => x.disabled = true);
      if (opts[i]) opts[i].classList.add(ok ? 'right' : 'wrong'); if (opts[ri]) opts[ri].classList.add('right');
      if (ok) { G.score++; G.streak++; } else { G.streak = 0; G.wrong.push(Object.assign({ right: G.opts[ri].txt }, it)); }
      funAnswer(ok, { quiet: true, streak: G.streak });
      G.i++; setTimeout(() => { G.busy = false; if (!$('#qQ')) return; if (G.i >= qs.length) finish(); else paint(); }, ok ? 300 : 1100);
    };
    setKeys((ev) => { const k = (ev.key || '').toLowerCase(); const m = '1234'.indexOf(k) >= 0 ? '1234'.indexOf(k) : 'abcd'.indexOf(k); if (m >= 0 && qs[G.i] && G.opts && m < G.opts.length) answer(m); });
    S._gameTimer = setInterval(() => { const left = Math.max(0, Math.ceil((G.end - Date.now()) / 1000)); const el = $('#qT'); if (el) { el.textContent = left; el.classList.toggle('bad', left <= 10); } if (left <= 0) finish(); }, 250);
    paint();
  };
}
function renderGame(main, slug) {
  if (slug === 'vinnig') return renderQuick(main);
  if (slug === 'geheue') return renderMemory(main);
  if (slug === 'raai') return renderHangman(main);
  if (slug === 'sprint') return renderSprint(main);
  if (slug === 'blits') return renderBlitz(main);
  return go('speel');
}

/* ---------- Leerhoek-afrigter (AI study coach, own website only) ---------- */
function shrinkImage(file, max, q) {
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => { const sc = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(img.width * sc)); c.height = Math.max(1, Math.round(img.height * sc)); const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', q)); };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('image')); };
    img.src = url;
  });
}
const coachPhotos = () => !!(S.settings && S.settings.coachPhotos);
function coachState() { if (!S.coach || S.coach.kid !== S.kidId) S.coach = { kid: S.kidId, msgs: [], pending: null, busy: false, left: null }; return S.coach; }
function renderCoach(main) {
  const C = coachState(), sid = S.coachSubj || 'all';
  setSubjectColor(sid !== 'all' && S.content.subjects[sid] ? S.content.subjects[sid].color : null);
  if (S.storeKind !== 'supa') { main.innerHTML = `<h1>🤖 ${esc(t('coachT'))}</h1><div class="card muted" style="margin-top:12px">${esc(t('coachOnlyWeb'))}</div>`; return; }
  main.innerHTML = `<div class="row" style="justify-content:space-between"><h1>🤖 ${esc(t('coachT'))}</h1><button class="btn sm ghost" id="cNew">🆕 ${esc(t('coachNew'))}</button></div>
  <div class="banner" style="margin:8px 0 10px">🤖 ${esc(t('coachDisclose'))}</div>
  <div class="row" style="gap:8px;flex-wrap:nowrap"><span class="small muted" style="flex:none">${esc(t('coachSubj'))}</span>${subjChips(sid, 'cs').replace('class="row chipsel"', 'class="row chipsel scrollx"')}</div>
  <div class="chat" id="chat"></div>
  <div class="composer">
    <div id="cPrev"></div>
    <div class="crow">${coachPhotos() ? `<label class="cbtn" for="cFile" title="${esc(t('coachPhoto'))}" aria-label="${esc(t('coachPhoto'))}">📷</label><input type="file" id="cFile" accept="image/*" hidden>` : ''}<textarea id="cText" rows="1" placeholder="${esc(t('coachPh'))}"></textarea><button class="cbtn send" id="cSend" title="${esc(t('coachSend'))}" aria-label="${esc(t('coachSend'))}">➤</button></div>
    <div class="small muted num" id="cLeft">${C.left !== null ? `${C.left} ${esc(t('coachLeft'))}` : ''}</div>
  </div>`;
  main.querySelectorAll('[data-cs]').forEach(b => b.onclick = () => { S.coachSubj = b.dataset.cs; renderCoach(main); });
  const chat = $('#chat');
  const drawChat = () => {
    chat.innerHTML = (C.msgs.length ? '' : `<div class="bubble coach">${md(t(coachPhotos() ? 'coachHello' : 'coachHelloText').replace('{name}', S.kid.name))}</div>`)
      + C.msgs.map(m => m.role === 'user' ? `<div class="bubble me">${m.thumb ? `<img src="${m.thumb}" alt="">` : ''}${m.text ? `<div>${esc(m.text)}</div>` : ''}</div>` : `<div class="bubble coach">${md(m.text)}</div>`).join('')
      + (C.busy ? `<div class="bubble coach typing"><span></span><span></span><span></span></div>` : '')
      + (C.err && !C.busy ? `<div class="bubble coach err">${esc(C.err)}</div>` : '');
    if (C.msgs.length || C.busy) requestAnimationFrame(() => window.scrollTo(0, document.documentElement.scrollHeight));
  };
  const drawPrev = () => { $('#cPrev').innerHTML = C.pending ? `<div class="cprev"><img src="${C.pending.thumb}" alt=""><button class="btn sm ghost" id="cDrop">✕</button></div>` : ''; const d = $('#cDrop'); if (d) d.onclick = () => { C.pending = null; drawPrev(); }; };
  drawChat(); drawPrev(); if (C.draft) { $('#cText').value = C.draft; C.draft = null; }
  $('#cNew').onclick = () => { S.coach = null; renderCoach(main); };
  if ($('#cFile')) $('#cFile').onchange = async (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    try { C.pending = { image: await shrinkImage(f, 1600, 0.82), thumb: await shrinkImage(f, 360, 0.6) }; drawPrev(); } catch (er) { toast(t('coachImgErr')); }
    e.target.value = '';
  };
  const send = async () => {
    if (C.busy) return;
    const text = $('#cText').value.trim(); if (!text && !C.pending) return;
    const subj = sid !== 'all' && S.content.subjects[sid] ? S.content.subjects[sid] : null;
    const msg = { role: 'user', text, image: C.pending ? C.pending.image : null, thumb: C.pending ? C.pending.thumb : null };
    if (msg.image) C.msgs.forEach(m => { m.image = null; }); // only the newest photo goes to the coach
    C.msgs.push(msg); C.pending = null; C.err = null; $('#cText').value = ''; C.busy = true; drawPrev(); drawChat();
    let reply = null, err = null;
    try {
      const st = S.store, h = { apikey: st.key, 'Content-Type': 'application/json' }; if (/^eyJ/.test(st.key)) h.Authorization = 'Bearer ' + st.key;
      const r = await fetch(st.url + '/functions/v1/lh-coach', { method: 'POST', headers: h, body: JSON.stringify({ fk: st.fk, kid: S.kid.id, lang: L, subject: subj ? tx(subj.name) : '', thumb: msg.thumb, messages: C.msgs.map(m => ({ role: m.role, text: m.text, image: m.image || undefined })) }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.reply) { reply = j.reply; C.left = j.left; }
      else err = j.error === 'limit' ? t('coachLimit').replace('{n}', j.limit) : j.error === 'not_configured' ? t('coachOff') : t('coachErr');
    } catch (e) { err = t('coachErr'); }
    C.busy = false;
    if (reply) {
      C.msgs.push({ role: 'assistant', text: reply });
      const ev = { type: 'coach', subject: subj ? subj.id : null, label: (text || '📷').slice(0, 80) };
      ev.t = Date.now(); S.store.appendLog(S.kid.id, ev).catch(() => {}); notify(S.kid, ev);
    } else { C.msgs.pop(); C.err = err; if (msg.image) C.pending = { image: msg.image, thumb: msg.thumb }; C.draft = text; }
    if (S.route.s !== 'coach') return;
    if (!document.body.contains(chat)) return renderCoach($('#main'));
    drawChat(); drawPrev(); const ta = $('#cText'); if (ta && C.draft && !ta.value) { ta.value = C.draft; } C.draft = null;
    const l = $('#cLeft'); if (l && C.left !== null) l.textContent = `${C.left} ${t('coachLeft')}`;
  };
  $('#cSend').onclick = send;
  const grow = () => { const ta = $('#cText'); ta.style.height = 'auto'; ta.style.height = Math.min(140, ta.scrollHeight) + 'px'; };
  $('#cText').oninput = grow;
  $('#cText').onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey && innerWidth > 700) { e.preventDefault(); send(); } };
}
function coachCta(extraCls) { return S.storeKind === 'supa' ? `<button class="card coachcta ${extraCls || ''}" data-go="afrigter"><span class="ti">🤖</span><span><b>${esc(t('coachT'))}</b><br><span class="small muted">${esc(t(coachPhotos() ? 'coachCta' : 'coachCtaText'))}</span></span></button>` : ''; }
/* parent: coach conversations + daily limit */
function notifyCard() {
  if (S.storeKind !== 'supa' || !pushUrl()) return '';
  const topic = (S.settings && S.settings.ntfyTopic) || '';
  const ntfy = topic ? `<details class="small" style="margin-top:12px"><summary class="muted">${esc(t('pushNtfyMore'))}</summary><div style="padding-top:8px">
  <p class="small muted" style="margin:0 0 8px;max-width:75ch">${esc(t('ntfySub'))}</p>
  <ol class="small" style="margin:0 0 10px;padding-left:20px;line-height:1.6"><li>${t('ntfy1')}</li><li>${t('ntfy2')}</li><li>${t('ntfy3')}</li></ol>
  <div class="row" style="gap:8px;margin-bottom:10px"><code class="topic">${esc(topic)}</code><button class="btn sm" id="ntfyCopy">📋 ${esc(t('ntfyCopy'))}</button></div>
  <div class="row" style="gap:8px"><a class="btn sm" href="https://apps.apple.com/us/app/ntfy/id1625396347" target="_blank" rel="noopener"> iPhone</a><a class="btn sm" href="https://play.google.com/store/apps/details?id=io.heckel.ntfy" target="_blank" rel="noopener">▶ Android</a><a class="btn sm" href="ntfy://ntfy.sh/${esc(topic)}">${esc(t('ntfyOpen'))}</a><button class="btn sm" id="ntfyTest">🔔 ${esc(t('ntfyTest'))}</button></div>
  <label class="ck" style="padding:10px 0 0"><input type="checkbox" id="ntfyOn" ${useNtfy() ? 'checked' : ''}> <span>${esc(t('pushNtfyAlso'))}</span></label></div></details>` : '';
  return `<div class="card" style="margin-top:14px" id="ntfyCard"><h3>🔔 ${esc(t('pushT'))}</h3><p class="small muted" style="margin:6px 0 12px;max-width:75ch">${esc(t('pushSub'))}</p>
  <div id="pushHere" class="pushhere">…</div>
  <div class="small" style="margin-top:12px"><b>${esc(t('pushDevs'))}:</b> <span id="pushDevs" class="muted">…</span></div>
  <p class="small muted" style="margin-top:10px">${esc(t('ntfyWhen'))}</p>${ntfy}</div>`;
}
const u8key = (s) => { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; const b = atob(s), o = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) o[i] = b.charCodeAt(i); return o; };
const keyB64u = (buf) => { if (!buf) return ''; const b = new Uint8Array(buf); let s = ''; for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
function pushSupport() {
  const k = devKind(); if (k.startsWith('ios') && !isStandalone()) return 'ios-home'; // iPhone: only the home-screen app may get notifications
  if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && window.isSecureContext) return Notification.permission === 'denied' ? 'denied' : 'ok';
  return k.startsWith('ios') ? 'ios-old' : 'none';
}
async function swReg() {
  let reg = await navigator.serviceWorker.getRegistration();
  if (!reg) reg = await navigator.serviceWorker.register('sw.js');
  return await Promise.race([navigator.serviceWorker.ready, new Promise((_, rej) => setTimeout(() => rej(new Error('service worker')), 15000))]);
}
function devLabel() { const k = devKind(); return k.startsWith('ios') ? 'iPhone' : k === 'desktop' ? (L === 'en' ? 'Computer' : 'Rekenaar') : (k === 'samsung' || /Samsung|SM-/.test(navigator.userAgent) ? 'Samsung' : 'Android'); }
async function wireNotifyCard(root) {
  const here = $('#pushHere', root); if (!here) return;
  const devsEl = $('#pushDevs', root);
  const c = $('#ntfyCopy', root);
  if (c) {
    const topic = S.settings.ntfyTopic;
    c.onclick = async () => { if (await copyText(topic)) toast(t('copied')); };
    $('#ntfyTest', root).onclick = () => { pushNtfy({ topic, title: 'Leerhoek ✅', message: t('ntfyTestMsg'), tags: ['bell'] }); toast(t('ntfySent')); };
    $('#ntfyOn', root).onchange = async (e) => { S.settings.ntfyOn = e.target.checked; await S.store.saveSettings(S.settings); toast(t('saved')); };
  }
  let info = null;
  const showDevs = (list) => { devsEl.textContent = list && list.length ? list.join(' · ') : t('pushNone'); };
  const syncFlag = async (list) => { const on = !!(list && list.length); if (!!S.settings.push !== on) { S.settings.push = on; await S.store.saveSettings(S.settings).catch(() => {}); } };
  try { info = await pushCall('list'); S.vapid = info.publicKey; showDevs(info.devices); syncFlag(info.devices); }
  catch (e) { devsEl.textContent = e.status === 404 ? t('pushNotReady') : '–'; }
  const msg = (k) => { here.innerHTML = `<div class="banner" style="margin:0">${esc(t(k))}</div>`; };
  const state = pushSupport();
  if (state === 'ios-home') return msg('pushIosHome');
  if (state === 'ios-old') return msg('pushIosOld');
  if (state === 'none') return msg('pushNoSupport');
  if (state === 'denied') return msg('pushDenied');
  if (!info) { here.innerHTML = ''; return; }
  let sub = null; try { const reg = await navigator.serviceWorker.getRegistration(); sub = reg && await reg.pushManager.getSubscription(); } catch (e) {}
  if (sub && keyB64u(sub.options && sub.options.applicationServerKey) !== info.publicKey) sub = null;
  if (sub && Notification.permission === 'granted') {
    try { localStorage.setItem('lh.parentDevice', '1'); } catch (e) {}
    const tag = parentMe() || 'parent'; if (lsGet('lh.pushWho', '') !== tag) pushCall('subscribe', { sub: sub.toJSON(), key: info.publicKey, who: tag }).then(() => lsSet('lh.pushWho', tag)).catch(() => {});
    here.innerHTML = `<div class="row" style="gap:8px;align-items:center"><span class="chip good">✅ ${esc(t('pushIsOn'))}</span><button class="btn sm primary" id="pushTest">🔔 ${esc(t('pushTest'))}</button><button class="btn sm" id="pushOff">${esc(t('pushOff'))}</button></div><p class="small muted" style="margin:8px 0 0">${esc(t('pushParentNote'))}</p>`;
    $('#pushTest', here).onclick = async (e) => { e.target.disabled = true; try { const r = await pushCall('send', { title: 'Leerhoek ✅', body: t('ntfyTestMsg'), tag: 'test' }); toast(t('pushSent').replace('{n}', r.sent)); } catch (err) { toast(t('pushFail') + ': ' + err.message); } e.target.disabled = false; };
    $('#pushOff', here).onclick = async (e) => {
      e.target.disabled = true;
      try { const r = await pushCall('unsubscribe', { endpoint: sub.endpoint }); await sub.unsubscribe().catch(() => {}); try { localStorage.removeItem('lh.parentDevice'); } catch (x) {} await syncFlag(r.devices); toast(t('saved')); }
      catch (err) { toast(t('pushFail') + ': ' + err.message); }
      wireNotifyCard(root);
    };
    return;
  }
  here.innerHTML = `<div class="row" style="gap:8px;align-items:flex-end"><label class="small" style="display:grid;gap:4px"><span>${esc(t('pushName'))}</span><input id="pushLabel" maxlength="30" style="width:200px" value="${esc(devLabel())}"></label><button class="btn primary" id="pushOn">🔔 ${esc(t('pushOn'))}</button></div>`;
  $('#pushOn', here).onclick = async (e) => {
    const btn = e.currentTarget; btn.disabled = true;
    try {
      const perm = await Notification.requestPermission(); // first, while the tap still counts (iPhone)
      if (perm !== 'granted') { if (perm === 'denied') return msg('pushDenied'); btn.disabled = false; return; }
      const reg = await swReg();
      let s = await reg.pushManager.getSubscription();
      if (s && keyB64u(s.options && s.options.applicationServerKey) !== info.publicKey) { await s.unsubscribe().catch(() => {}); s = null; }
      if (!s) s = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: u8key(info.publicKey) });
      const label = ($('#pushLabel', here).value || devLabel()).trim().slice(0, 30);
      const r = await pushCall('subscribe', { sub: s.toJSON(), label, key: info.publicKey, who: parentMe() || 'parent' });
      try { localStorage.setItem('lh.parentDevice', '1'); } catch (x) {}
      await syncFlag(r.devices); showDevs(r.devices);
      pushCall('send', { title: 'Leerhoek ✅', body: t('pushWelcome').replace('{d}', label), tag: 'test' }).catch(() => {});
      toast(t('saved'));
    } catch (err) { toast(t('pushFail') + ': ' + (err.message || err)); }
    wireNotifyCard(root);
  };
}
function coachParentCard() {
  if (S.storeKind !== 'supa') return '';
  return `<div class="card" style="margin-top:14px" id="coachCard"><h3>🤖 ${esc(t('coachParentT'))}</h3><p class="small muted" style="margin:6px 0 10px;max-width:75ch">${esc(t('coachParentSub'))}</p>
  <div class="row" style="gap:8px;margin-bottom:12px"><label class="small" for="coachLim"><b>${esc(t('coachLimitL'))}</b></label><input id="coachLim" type="number" min="1" max="60" style="width:90px" value="${esc(String(S.settings.coachLimit || 15))}"><label class="ck" style="padding:0"><input type="checkbox" id="coachPh" ${S.settings.coachPhotos ? 'checked' : ''}> <span>📷 ${esc(t('coachPhotosL'))}</span></label><button class="btn sm" id="coachLimSave">${esc(t('save'))}</button></div>
  <div class="grid two" id="coachLogs">${KIDS.map(k => `<div><h4>${k.avatar} ${esc(k.name)}</h4><div class="small muted" data-coach="${k.id}">…</div></div>`).join('')}</div></div>`;
}
async function wireCoachParent(root) {
  const card = $('#coachCard', root); if (!card) return;
  $('#coachLimSave', root).onclick = async () => { const n = clamp(parseInt($('#coachLim', root).value, 10) || 15, 1, 60); S.settings.coachLimit = n; S.settings.coachPhotos = $('#coachPh', root).checked; await S.store.saveSettings(S.settings); toast(t('saved')); };
  for (const k of KIDS) {
    const box = card.querySelector(`[data-coach="${k.id}"]`);
    let days = []; try { days = await S.store.loadPrefix('kids/' + k.id + '/coach/', 7); } catch (e) {}
    const items = days.flatMap(d => (d.value.events || []).map(ev => ({ ...ev, date: d.value.date || d.key.split('/').pop() }))).sort((a, b) => b.t - a.t).slice(0, 15);
    box.className = 'coachlog';
    box.innerHTML = items.length ? items.map(ev => `<details class="clog"><summary><span class="small muted">${esc(fmtDay(ev.date))} ${fmtTime(ev.t)}</span> ${ev.subject ? `<span class="chip">${esc(String(ev.subject).slice(0, 20))}</span>` : ''} ${ev.img ? '📷 ' : ''}${esc((ev.q || '').slice(0, 70) || '…')}</summary>${ev.thumb ? `<img src="${ev.thumb}" alt="" class="cthumb">` : ''}${ev.q ? `<p class="small"><b>${esc(k.name)}:</b> ${esc(ev.q)}</p>` : ''}<div class="prose small" style="margin-top:6px"><b>🤖</b> ${md(ev.a || '')}</div></details>`).join('') : `<p class="small muted">${esc(t('coachNone'))}</p>`;
  }
}

/* ---------- parent: afbakening & exam timetable editor ---------- */
function marksEditor(subjects) {
  const keys = subjects.map(s => ({ k: schoolKey(s.id), label: s.icon + ' ' + tx(s.short) })).concat([{ k: 'geo', label: '🗺️ ' + tx(SCHOOL_EXTRA.geo) }, { k: 'gesk', label: '📜 ' + tx(SCHOOL_EXTRA.gesk) }]);
  return `<div class="card" style="margin-top:14px" id="marksCard"><h3>🏫 ${esc(t('marksT'))}</h3><p class="small muted" style="margin:6px 0 12px;max-width:75ch">${esc(t('marksHelp'))}</p>
  <div class="row" style="gap:10px;margin-bottom:10px"><select id="mkKid" aria-label="Kind">${KIDS.map(k => `<option value="${k.id}">${k.avatar} ${esc(k.name)}</option>`).join('')}</select><select id="mkTerm" aria-label="${esc(t('term'))}">${[1, 2, 3, 4].map(n => `<option value="${n}" ${n === Math.max(1, curTerm() - 1) ? 'selected' : ''}>${esc(t('term'))} ${n}</option>`).join('')}</select></div>
  <div class="marksgrid">${keys.map(x => `<label class="mk"><span>${esc(x.label)}</span><input type="number" inputmode="numeric" min="0" max="100" data-mk="${x.k}" placeholder="–"></label>`).join('')}<label class="mk"><span><b>${esc(t('avgShort'))}</b></span><input type="number" inputmode="numeric" min="0" max="100" data-mk="_avg" placeholder="${esc(t('auto'))}"></label></div>
  <button class="btn primary" id="mkSave" style="margin-top:12px">💾 ${esc(t('marksSave'))}</button></div>`;
}
function goalsEditor(subjects) {
  const keys = subjects.map(s => ({ k: schoolKey(s.id), label: s.icon + ' ' + tx(s.short) }));
  return `<div class="card" style="margin-top:14px" id="goalsCard"><h3>🎯 ${esc(t('goalsT'))}</h3><p class="small muted" style="margin:6px 0 12px;max-width:75ch">${esc(t('goalsHelp'))}</p>
  <div class="row" style="gap:10px;margin-bottom:10px"><select id="glKid" aria-label="Kind">${KIDS.map(k => `<option value="${k.id}">${k.avatar} ${esc(k.name)}</option>`).join('')}</select><label class="mk" style="flex-direction:row;align-items:center;gap:8px"><span><b>${esc(t('goalDefault'))}</b></span><input type="number" min="1" max="100" id="glDef" style="width:90px"></label></div>
  <div class="marksgrid">${keys.map(x => `<label class="mk"><span>${esc(x.label)}</span><input type="number" inputmode="numeric" min="1" max="100" data-gl="${x.k}"></label>`).join('')}</div>
  <button class="btn primary" id="glSave" style="margin-top:12px">💾 ${esc(t('saveGoals'))}</button></div>`;
}
function wireGoalsEditor(root, kids) {
  const fill = () => {
    const kid = kids.find(k => k.id === $('#glKid', root).value), g = kid.goals || {};
    const def = typeof g.default === 'number' ? g.default : DEFAULT_GOAL; $('#glDef', root).value = def;
    root.querySelectorAll('[data-gl]').forEach(i => { const v = g[i.dataset.gl]; i.value = typeof v === 'number' ? v : ''; i.placeholder = String(def); });
  };
  $('#glKid', root).onchange = fill; $('#glDef', root).oninput = () => root.querySelectorAll('[data-gl]').forEach(i => { i.placeholder = $('#glDef', root).value || String(DEFAULT_GOAL); }); fill();
  $('#glSave', root).onclick = async () => {
    const id = $('#glKid', root).value, kid = await S.store.loadKid(id); // fresh copy
    const goals = { default: clamp(parseInt($('#glDef', root).value, 10) || DEFAULT_GOAL, 1, 100) };
    root.querySelectorAll('[data-gl]').forEach(i => { const v = i.value.trim(); if (v !== '' && !isNaN(+v)) goals[i.dataset.gl] = clamp(Math.round(+v), 1, 100); });
    kid.goals = goals; await S.store.saveKid(kid);
    if (S.kid && S.kid.id === id) S.kid.goals = goals;
    toast(t('saved')); render();
  };
}
function wireMarksEditor(root, kids) {
  const fill = () => {
    const kid = kids.find(k => k.id === $('#mkKid', root).value), tm = $('#mkTerm', root).value;
    const terms = (kid.school && kid.school.terms) || {}, cur = terms[tm] || {}, avg = (kid.school && kid.school.avg) || {};
    root.querySelectorAll('[data-mk]').forEach(i => { const v = i.dataset.mk === '_avg' ? avg[tm] : cur[i.dataset.mk]; i.value = typeof v === 'number' ? v : ''; });
  };
  $('#mkKid', root).onchange = fill; $('#mkTerm', root).onchange = fill; fill();
  $('#mkSave', root).onclick = async () => {
    const id = $('#mkKid', root).value, tm = $('#mkTerm', root).value;
    const kid = await S.store.loadKid(id); // fresh copy, so newer progress is never overwritten
    kid.school = kid.school || {}; kid.school.terms = kid.school.terms || {}; kid.school.avg = kid.school.avg || {};
    const vals = {}; let avg = null;
    root.querySelectorAll('[data-mk]').forEach(i => { const v = i.value.trim(); if (v === '' || isNaN(+v)) return; const n = clamp(Math.round(+v), 0, 100); if (i.dataset.mk === '_avg') avg = n; else vals[i.dataset.mk] = n; });
    kid.school.terms[tm] = vals;
    const nums = Object.values(vals); kid.school.avg[tm] = avg !== null ? avg : (nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : null);
    await S.store.saveKid(kid);
    if (S.kid && S.kid.id === id) S.kid.school = kid.school;
    toast(t('saved')); render();
  };
}
function scopeEditor(subjects) {
  return `<div class="card" style="margin-top:14px" id="scopeCard"><h3>🎯 ${esc(t('scopeT'))}</h3>${gradeTabs()}<p class="small muted" style="margin:6px 0 12px;max-width:75ch">${esc(t('scopeHelp'))}</p>
  <div class="form-row" style="max-width:280px;margin-bottom:12px"><label for="curT">${esc(t('curTermL'))}</label><select id="curT"><option value="">${esc(t('auto'))} (${esc(t('term'))} ${autoTerm()})</option>${[1, 2, 3, 4].map(n => `<option value="${n}" ${+S.settings.currentTerm === n ? 'selected' : ''}>${esc(t('term'))} ${n}</option>`).join('')}</select></div>
  <div class="stack" style="gap:10px">${subjects.map(s => { const sc = scopeOf(s), set = new Set(sc.topics); return `<div class="scoperow" data-sid="${s.id}"><div class="row" style="justify-content:space-between;gap:8px"><b>${s.icon} ${esc(tx(s.short))}</b><input type="date" data-date value="${esc(sc.date)}" aria-label="${esc(t('exam1'))} ${esc(tx(s.short))}"></div>
    <details><summary><span class="chip ${sc.provisional ? '' : 'good'}" data-cnt>${sc.topics.length} ${esc(t('topics'))}${sc.provisional ? ' · ' + esc(t('provisional')) : ''}</span> ${esc(t('pickTopics'))} <span class="chip hi" data-phcnt hidden></span></summary>
    ${scopePhotoBox(s)}
    <div class="row" style="gap:6px;margin:8px 0">${[['4', t('q4')], ['34', t('q34')], ['1234', t('qAll')], ['', t('qNone')]].map(([v, lb]) => `<button type="button" class="btn sm" data-q="${v}">${esc(lb)}</button>`).join('')}</div>
    ${s.terms.map(tm => `<div class="label" style="margin-top:8px">${esc(t('term'))} ${tm.term}</div>${tm.topics.map(tp => `<label class="ck"><input type="checkbox" data-tid="${tp.id}" data-term="${tm.term}" ${set.has(tp.id) ? 'checked' : ''}> <span>${esc(tx(tp.title))}</span></label>`).join('')}`).join('')}
    <input data-note placeholder="${esc(t('noteP'))}" value="${esc(sc.note)}" style="margin-top:8px;width:100%"></details></div>`; }).join('')}</div>
  <button class="btn primary" id="saveScope" style="margin-top:12px">💾 ${esc(t('saveScope'))}</button></div>`;
}
function wireScopeEditor(root) {
  root.querySelectorAll('.scoperow').forEach(row => {
    const upd = () => { row.dataset.touched = '1'; row.querySelector('[data-cnt]').textContent = `${row.querySelectorAll('[data-tid]:checked').length} ${t('topics')}`; };
    row.querySelectorAll('[data-tid]').forEach(c => c.onchange = upd);
    row.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { const terms = b.dataset.q.split('').map(Number); row.querySelectorAll('[data-tid]').forEach(c => { c.checked = terms.includes(+c.dataset.term); }); upd(); });
    wireScopePhotos(row, upd);
  });
  root.querySelectorAll('[data-sg]').forEach(b => b.onclick = () => { S.scopeGrade = +b.dataset.sg; render(); });
  $('#saveScope', root).onclick = async () => {
    const ex = Object.assign({}, examsFor(scopeGrade()));
    root.querySelectorAll('.scoperow').forEach(row => {
      const sid = row.dataset.sid, cur = Object.assign({}, ex[sid] || {});
      cur.date = row.querySelector('[data-date]').value || ''; cur.note = row.querySelector('[data-note]').value.trim();
      if (row.dataset.touched) cur.topics = [...row.querySelectorAll('[data-tid]:checked')].map(c => c.dataset.tid);
      ex[sid] = cur;
    });
    setExamsFor(scopeGrade(), ex); const ct = $('#curT', root).value; S.settings.currentTerm = ct ? +ct : null;
    await S.store.saveSettings(S.settings); toast(t('saved')); render();
  };
}

/* ------------------------------------------------------------------ v10b: photos of schoolwork (Edge Function "lh-files") */
Object.assign(UI.af, {
  phT: "Foto's van skoolwerk", phSub: 'Neem ’n foto van die afbakening, ’n toetskennisgewing of klasnotas. Net julle huishouding kan dit sien.',
  phAdd: 'Foto', phUpload: 'Laai op', phCancel: 'Kanselleer', phNoteP: 'Nota (opsioneel), bv. bl. 40–62', phLoading: 'Laai foto’s …',
  phSubAi: 'Neem ’n foto van jou klasnotas, ’n werkkaart of ’n handboekblad – die app maak oefenvrae daaruit. Ook die afbakening of ’n toetskennisgewing. Net julle huishouding kan dit sien.',
  phNone: 'Nog geen foto’s nie.', phShrink: 'Maak foto kleiner …', phSending: 'Laai op …', phDone: 'Foto gestoor', phDel: 'Verwyder', phDelSure: 'Seker?',
  phDeleted: 'Foto verwyder', phOpen: 'Maak oop', phClose: 'Maak toe', phOffline: 'Foto’s werk net as die toestel aanlyn en gekoppel is.',
  phNet: 'Kon nie oplaai nie – probeer weer.', phFull: 'Julle het die maksimum van 300 foto’s bereik. Verwyder ou foto’s eers.',
  phBig: 'Die foto is te groot.', phDecode: 'Hierdie foto kan nie hier oopgemaak word nie (bv. ’n HEIC-foto op ’n rekenaar). Stuur dit as JPG of neem dit met die foon.',
  phNotImg: 'Kies ’n foto (JPG of PNG).', phKinds: { scope: 'Afbakening / eksamenrooster', test: 'Toetskennisgewing', notes: 'Klasnotas / werkkaart', other: 'Ander' },
  phScopeL: 'Foto van die afbakening, ’n toets of ’n werkkaart: 🤖 merk die onderwerpe · 📒 maak oefenvrae vir die kinders', phRead: 'Lees die foto en merk onderwerpe', phReading: 'Lees die foto …',
  phAiCheck: 'Kontroleer die merkies en die datum, en druk dan Stoor afbakening.', phAiNone: 'Geen bekende onderwerpe op die foto gevind nie – merk self.',
  phAiOff: 'Die outomatiese lees van foto’s is nog nie aangeskakel nie.', phAiLimit: 'Die daaglikse limiet vir foto-lees is bereik. Probeer môre weer.', phNoKid: 'Voeg eers ’n leerder in hierdie graad by.',
});
Object.assign(UI.en, {
  phT: 'Photos of schoolwork', phSub: 'Take a photo of the exam scope, a test notice or class notes. Only your household can see it.',
  phAdd: 'Photo', phUpload: 'Upload', phCancel: 'Cancel', phNoteP: 'Note (optional), e.g. p. 40–62', phLoading: 'Loading photos …',
  phSubAi: 'Take a photo of your class notes, a worksheet or a textbook page – the app turns it into practice questions. Or the exam scope or a test notice. Only your household can see it.',
  phNone: 'No photos yet.', phShrink: 'Making the photo smaller …', phSending: 'Uploading …', phDone: 'Photo saved', phDel: 'Delete', phDelSure: 'Sure?',
  phDeleted: 'Photo deleted', phOpen: 'Open', phClose: 'Close', phOffline: 'Photos only work when this device is online and linked.',
  phNet: 'Could not upload – try again.', phFull: 'You have reached the maximum of 300 photos. Delete old photos first.',
  phBig: 'The photo is too large.', phDecode: 'This photo cannot be opened here (e.g. a HEIC photo on a computer). Send it as JPG or take it with the phone.',
  phNotImg: 'Choose a photo (JPG or PNG).', phKinds: { scope: 'Exam scope / timetable', test: 'Test notice', notes: 'Class notes / worksheet', other: 'Other' },
  phScopeL: 'Photo of the exam scope, a test or a worksheet: 🤖 ticks the topics · 📒 makes practice questions for the children', phRead: 'Read the photo and tick topics', phReading: 'Reading the photo …',
  phAiCheck: 'Check the ticks and the date, then press Save scope.', phAiNone: 'No known topics found on the photo – tick them yourself.',
  phAiOff: 'Automatic photo reading is not switched on yet.', phAiLimit: 'The daily limit for photo reading has been reached. Try again tomorrow.', phNoKid: 'Add a learner in this grade first.',
});
const PH_KINDS = ['scope', 'test', 'notes', 'other'];
const PH_ICON = { scope: '🎯', test: '📝', notes: '📒', other: '📷' };
const FILES = { list: null, at: 0, ai: false, busy: null };
function filesUrl() { const c = window.LH_CONFIG; return c && c.supabaseUrl ? c.supabaseUrl.replace(/\/$/, '') + '/functions/v1/lh-files' : null; }
const filesOn = () => S.storeKind === 'supa' && !!filesUrl() && !!S.store && !!S.store.fk;
async function filesApi(action, extra) {
  const r = await fetch(filesUrl(), { method: 'POST', body: JSON.stringify(Object.assign({ action, fk: S.store.fk, apikey: S.store.key }, extra || {})) });
  let j = null; try { j = await r.json(); } catch (e) {}
  if (!r.ok) { const err = new Error((j && j.error) || ('HTTP ' + r.status)); err.status = r.status; err.code = j && j.error; throw err; }
  return j || {};
}
/* the household's photo list (one call serves every screen); refreshed after 2 min so photos from other devices show up (signed links last an hour) */
async function photoList(force) {
  if (!force && FILES.list && Date.now() - FILES.at < 2 * 60000) return FILES.list;
  if (FILES.busy && !force) return FILES.busy;
  FILES.busy = filesApi('list', {}).then(j => { FILES.list = j.files || []; FILES.ai = !!j.ai; FILES.at = Date.now(); FILES.busy = null; return FILES.list; }, e => { FILES.busy = null; throw e; });
  return FILES.busy;
}
/* shrink in the browser: longest side 1600 px, JPEG 0.72 (±200–400 KB), white background for transparent PNGs */
async function shrinkImage(file) {
  if (!file || (file.type && !/^image\//.test(file.type))) throw new Error(t('phNotImg'));
  let img = null;
  try { img = await createImageBitmap(file); } catch (e) {
    img = await new Promise(res => { const u = URL.createObjectURL(file), im = new Image(); im.onload = () => { URL.revokeObjectURL(u); res(im); }; im.onerror = () => { URL.revokeObjectURL(u); res(null); }; im.src = u; });
  }
  if (!img || !img.width) throw new Error(t('phDecode'));
  const k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
  const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
  const blob = await new Promise(res => c.toBlob(res, 'image/jpeg', 0.72));
  if (!blob) throw new Error(t('phDecode'));
  return blob;
}
const phIsParent = () => deviceLock() === 'ouer' || adminViewing() || (S.route && S.route.s === 'parent');
const phWho = () => phIsParent() ? (parentMe() || 'parent') : (S.kid ? S.kid.id : 'parent');
const phCanDel = (f) => phIsParent() || (!!S.kid && f.by === S.kid.id);
async function uploadPhoto(file, meta, say) {
  say(t('phShrink'));
  const blob = await shrinkImage(file);
  if (blob.size > 3 * 1024 * 1024) throw new Error(t('phBig'));
  say(t('phSending'));
  let s;
  try { s = await filesApi('sign', Object.assign({ bytes: blob.size, who: phWho() }, meta)); }
  catch (e) { throw new Error(e.code === 'full' ? t('phFull') : e.code === 'too_big' ? t('phBig') : t('phNet')); }
  const fd = new FormData(); fd.append('cacheControl', '3600'); fd.append('', blob, 'foto.jpg');
  const h = { 'x-upsert': 'false' }; if (S.store.key) { h.apikey = S.store.key; if (/^eyJ/.test(S.store.key)) h.Authorization = 'Bearer ' + S.store.key; }
  const r = await fetch(s.uploadUrl, { method: 'PUT', headers: h, body: fd }).catch(() => null);
  if (!r || !r.ok) { filesApi('del', { id: s.id }).catch(() => {}); throw new Error(t('phNet')); }
  await filesApi('done', { id: s.id });
  await photoList(true).catch(() => {});
  return s.id;
}
function phCss() {
  if ($('#phCss')) return;
  const st = document.createElement('style'); st.id = 'phCss';
  st.textContent = `.phgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:10px;margin-top:6px}
.phit{display:flex;flex-direction:column;gap:4px;min-width:0}
.phthw{position:relative}
.phmeta{display:flex;flex-direction:column;gap:6px;min-width:0;align-items:flex-start}
.phrows{grid-template-columns:1fr}
.phrows .phit{flex-direction:row;gap:12px;align-items:flex-start}
.phrows .phthw{width:84px;flex:none}
.phth{display:block;padding:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--surface-2);aspect-ratio:3/4;cursor:zoom-in;width:100%}
.phth img{width:100%;height:100%;object-fit:cover;display:block}
.phdel{position:absolute;top:4px;right:4px;min-width:26px;height:26px;border-radius:13px;border:0;background:rgba(0,0,0,.62);color:#fff;font-size:13px;padding:0 7px;cursor:pointer}
.phcap{font-size:12px;line-height:1.3;color:var(--muted);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.phform{display:flex;gap:10px;align-items:flex-start;margin:6px 0 10px;flex-wrap:wrap}
.phform img{width:84px;height:112px;object-fit:cover;border-radius:8px;border:1px solid var(--line)}
.phform .stack{flex:1;min-width:180px}
.phpick{cursor:pointer}
.phview{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px}
.phview[hidden]{display:none}
.phview .phbox{max-width:min(960px,100%);max-height:100%;display:flex;flex-direction:column;gap:10px;align-items:center}
.phview img{max-width:100%;max-height:calc(100vh - 130px);object-fit:contain;border-radius:8px;background:#fff}
.phview .phcap{color:#fff;-webkit-line-clamp:4;text-align:center}
.phai{margin-top:8px;padding:8px 10px;border-radius:8px;background:var(--hi);color:var(--hi-ink)}`;
  document.head.appendChild(st);
}
const phDay = (iso) => { try { return new Date(iso).toLocaleDateString(L === 'af' ? 'af-ZA' : 'en-ZA', { day: 'numeric', month: 'short' }); } catch (e) { return ''; } };
function photoView(f) {
  let ov = $('#phView');
  if (!ov) { ov = document.createElement('div'); ov.id = 'phView'; ov.className = 'phview'; ov.setAttribute('role', 'dialog'); document.body.appendChild(ov); }
  ov.innerHTML = `<div class="phbox"><img src="${esc(f.url)}" alt="${esc((t('phKinds') || {})[f.kind] || '')}"><div class="phcap">${PH_ICON[f.kind] || '📷'} ${esc((t('phKinds') || {})[f.kind] || '')} · ${esc(phDay(f.at))}${f.note ? ' · ' + esc(f.note) : ''}</div>
    <div class="row" style="gap:8px"><a class="btn sm" href="${esc(f.url)}" target="_blank" rel="noopener">↗ ${esc(t('phOpen'))}</a><button type="button" class="btn sm primary" data-phclose>✕ ${esc(t('phClose'))}</button></div></div>`;
  ov.hidden = false;
  const close = () => { ov.hidden = true; document.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  ov.onclick = (e) => { if (e.target === ov || e.target.closest('[data-phclose]')) close(); };
}
/* shared box: picker → preview form → upload; thumbnails with view / delete (/ read in the scope editor) */
function photoBoxHtml(kinds) {
  return `<div data-phform hidden></div><div class="phgrid" data-phgrid><span class="small muted" style="grid-column:1/-1">${esc(t('phLoading'))}</span></div><div class="small phai" data-phai hidden></div>`;
}
function wirePhotoBox(box, o) {
  if (!box) return;
  phCss();
  const grid = box.querySelector('[data-phgrid]'), form = box.querySelector('[data-phform]'), inp = box.querySelector('[data-phfile]');
  const kindsHtml = (sel) => o.kinds.map(k => `<option value="${k}" ${k === sel ? 'selected' : ''}>${PH_ICON[k]} ${esc(t('phKinds')[k])}</option>`).join('');
  const draw = (all) => {
    const list = all.filter(o.filter);
    if (o.onCount) o.onCount(list.length);
    if (!list.length) { grid.innerHTML = `<span class="small muted" style="grid-column:1/-1">${esc(t('phNone'))}</span>`; return; }
    grid.classList.toggle('phrows', !!((o.read || o.quiz) && FILES.ai));
    grid.innerHTML = list.map(f => `<div class="phit" data-phid="${esc(f.id)}"><div class="phthw"><button type="button" class="phth" data-phview="${esc(f.id)}" aria-label="${esc(t('phOpen'))}">${f.url ? `<img src="${esc(f.url)}" alt="" loading="lazy">` : ''}</button>
      ${phCanDel(f) ? `<button type="button" class="phdel" data-phdel="${esc(f.id)}" aria-label="${esc(t('phDel'))}">✕</button>` : ''}</div>
      <div class="phmeta"><div class="phcap">${PH_ICON[f.kind] || '📷'} ${esc(phDay(f.at))}${f.note ? ' · ' + esc(f.note) : ''}</div>
      ${o.read && FILES.ai ? `<button type="button" class="btn sm hi" data-phread="${esc(f.id)}">🤖 ${esc(t('phRead'))}</button>` : ''}${o.quiz && FILES.ai ? (o.quiz.sets()[f.id] ? (o.quiz.parent ? `<span class="chip good">📒 ${o.quiz.sets()[f.id].qs.length} ${esc(t('nqQs'))} ✓</span>` : `<button type="button" class="btn sm subject" data-phplay="notas-${esc(f.id)}">▶️ ${esc(t('nqPlay'))}</button>`) : `<button type="button" class="btn sm hi" data-phquiz="${esc(f.id)}">📒 ${esc(t('nqMake'))}</button>`) : ''}</div></div>`).join('');
    grid.querySelectorAll('[data-phview]').forEach(b => b.onclick = () => { const f = list.find(x => x.id === b.dataset.phview); if (f && f.url) photoView(f); });
    grid.querySelectorAll('[data-phdel]').forEach(b => b.onclick = async () => {
      if (!b.dataset.sure) { b.dataset.sure = '1'; b.textContent = t('phDelSure'); setTimeout(() => { if (b.isConnected) { delete b.dataset.sure; b.textContent = '✕'; } }, 4000); return; }
      b.disabled = true;
      try { await filesApi('del', { id: b.dataset.phdel }); await photoList(true); toast(t('phDeleted')); if (o.quiz) { delete NOTES.byId[b.dataset.phdel]; NOTES.list = NOTES.list.filter(x => x.id !== b.dataset.phdel); o.quiz.redraw(); } } catch (e) { toast(t('phNet')); }
      load();
    });
    grid.querySelectorAll('[data-phread]').forEach(b => b.onclick = async () => {
      const msg = box.querySelector('[data-phai]'); msg.hidden = false; msg.textContent = '🤖 ' + t('phReading'); b.disabled = true;
      try { const res = await filesApi('read', Object.assign({ id: b.dataset.phread, today: today() }, o.readArgs())); res.id = b.dataset.phread; if (!res.ai) msg.textContent = t('phAiOff'); else o.read(res, msg); }
      catch (e) { msg.textContent = e.code === 'ai_limit' ? t('phAiLimit') : t('phNet'); }
      b.disabled = false;
    });
    grid.querySelectorAll('[data-phplay]').forEach(b => b.onclick = () => go(b.dataset.phplay));
    grid.querySelectorAll('[data-phquiz]').forEach(b => b.onclick = async () => {
      const msg = box.querySelector('[data-phai]'); msg.hidden = false; msg.textContent = '📒 ' + t('nqMaking'); grid.querySelectorAll('[data-phquiz]').forEach(x => { x.disabled = true; });
      try {
        const res = await filesApi('quiz', Object.assign({ id: b.dataset.phquiz, today: today() }, o.quiz.args()));
        if (!res.ai) msg.textContent = t('phAiOff'); else if (!res.set) msg.textContent = t('nqNone'); else { NOTES.byId[res.set.id] = res.set; NOTES.list = [res.set].concat(NOTES.list.filter(x => x.id !== res.set.id)); if (o.quiz.done(res.set, msg) !== 'keep') msg.hidden = true; load(); return; }
      } catch (e) { msg.textContent = e.code === 'ai_limit' ? t('phAiLimit') : t('phNet'); }
      grid.querySelectorAll('[data-phquiz]').forEach(x => { x.disabled = false; });
    });
  };
  const load = async (force) => {
    if (!navigator.onLine) { grid.innerHTML = `<span class="small muted">${esc(t('phOffline'))}</span>`; return; }
    try { const pre = o.before ? o.before().catch(() => null) : null; const list = await photoList(force); await pre; draw(list); } catch (e) { grid.innerHTML = `<span class="small muted">${esc(t('phOffline'))}</span>`; }
  };
  const showForm = (file) => {
    const u = URL.createObjectURL(file);
    form.hidden = false;
    form.innerHTML = `<div class="phform"><img src="${u}" alt=""><div class="stack" style="gap:6px"><select data-phkind aria-label="${esc(t('phT'))}">${kindsHtml(o.kind)}</select><input data-phnote maxlength="120" placeholder="${esc(t('phNoteP'))}" aria-label="${esc(t('phNoteP'))}">
      <div class="row" style="gap:6px"><button type="button" class="btn sm primary" data-phgo>⬆️ ${esc(t('phUpload'))}</button><button type="button" class="btn sm ghost" data-phcancel>${esc(t('phCancel'))}</button></div><div class="small muted" data-phmsg></div></div></div>`;
    const done = () => { URL.revokeObjectURL(u); form.hidden = true; form.innerHTML = ''; };
    form.querySelector('[data-phcancel]').onclick = done;
    form.querySelector('[data-phgo]').onclick = async (ev) => {
      const btn = ev.currentTarget, msg = form.querySelector('[data-phmsg]'); btn.disabled = true;
      try {
        await uploadPhoto(file, Object.assign(o.meta(), { kind: form.querySelector('[data-phkind]').value, note: form.querySelector('[data-phnote]').value.trim() }), (m) => { msg.textContent = m; });
        done(); toast(t('phDone')); load();
      } catch (e) { msg.textContent = e.message || t('phNet'); btn.disabled = false; }
    };
  };
  if (inp) inp.onchange = () => { const f = inp.files && inp.files[0]; inp.value = ''; if (f) showForm(f); };
  load();
}
/* subject page (learners) */
function photoCard(s) {
  if (!filesOn() || !S.kid) return '';
  const k = KIDS.find(x => x.id === S.kid.id); if (k && k.role === 'player') return '';
  return `<div class="card" id="phCard" style="margin-top:10px"><div class="row" style="justify-content:space-between;gap:8px;align-items:center"><h3 style="margin:0">📷 ${esc(t('phT'))}</h3>
    <label class="btn sm subject phpick">＋ ${esc(t('phAdd'))}<input type="file" accept="image/*" data-phfile hidden></label></div>
    <p class="small muted" style="margin:4px 0 6px">${esc(t(FILES.ai ? 'phSubAi' : 'phSub'))}</p>${photoBoxHtml()}<div data-nqlist></div></div>`;
}
function wireSubjectPhotos(main, s) {
  const box = $('#phCard', main); if (!box || !S.kid) return;
  const kid = S.kid.id, g = curGrade(), nq = box.querySelector('[data-nqlist]');
  const drawSets = () => {
    if (!nq || !nq.isConnected) return;
    const sets = NOTES.at ? NOTES.list.filter(x => x.subj === s.id && (+x.grade || g) === g) : [];
    nq.innerHTML = sets.length ? `<h3 style="margin:16px 0 6px">📒 ${esc(t('nqT'))}</h3><div class="stack" style="gap:8px">${sets.map(x => `<div class="card" style="padding:10px 12px"><div class="row" style="justify-content:space-between;gap:8px;align-items:center"><span class="small"><b>${esc(x.title || t('nqT'))}</b> <span class="muted">· ${x.qs.length} ${esc(t('nqQs'))}${x.at ? ' · ' + esc(phDay(new Date(x.at).toISOString())) : ''}</span></span><button type="button" class="btn sm subject" data-nqgo="notas-${esc(x.id)}">▶️ ${esc(t('nqPlay'))}</button></div>${x.summary ? `<details class="small" style="margin-top:6px"><summary>${esc(t('nqSum'))}</summary><div class="prose" style="margin-top:4px">${md(x.summary)}</div></details>` : ''}</div>`).join('')}</div>` : '';
    nq.querySelectorAll('[data-nqgo]').forEach(b => b.onclick = () => go(b.dataset.nqgo));
  };
  wirePhotoBox(box, { kinds: PH_KINDS, kind: 'notes', filter: f => f.kid === kid && f.subj === s.id, meta: () => ({ kid, subj: s.id, grade: g }),
    before: () => notesLoad().then(drawSets),
    quiz: { sets: () => NOTES.byId, args: () => ({ kid, subj: s.id, grade: g, subject: tx(s.name), lang: L }),
      done: (set) => { go('notas-' + set.id); }, redraw: drawSets } });
}
/* notes → practice questions: the household's sets (kv notesq/<kid>/<subj>/<photo id>); every learner in the same grade sees them */
const NOTES = { at: 0, byId: {}, list: [] };
async function notesLoad(force) {
  if (!force && NOTES.at && Date.now() - NOTES.at < 120000) return NOTES.list;
  if (!S.store || !S.store.loadPrefix) return [];
  const rows = await S.store.loadPrefix('notesq/', 200);
  const list = (rows || []).map(r => r.value).filter(v => v && v.id && Array.isArray(v.qs) && v.qs.length && !v.deleted).sort((a, b) => (b.at || 0) - (a.at || 0));
  NOTES.at = Date.now(); NOTES.list = list; NOTES.byId = {}; list.forEach(v => { NOTES.byId[v.id] = v; });
  return list;
}
async function renderNotesQuiz(main, id) {
  if (NOTES.byId[id]) return renderQuiz(main, id, 'notes');
  main.innerHTML = `<div class="splash"><div>${mascot()}<h2 style="margin-top:12px">${esc(t('loading'))}</h2></div></div>`;
  try { await notesLoad(true); } catch (e) {}
  if (S.route && S.route.s === 'notes' && S.route.id === id) { if (NOTES.byId[id]) renderQuiz(main, id, 'notes'); else go('vakke'); }
}
/* the learners of a grade by name: "Diaan & Stefan" */
function gradeKidNames(g) { const n = KIDS.filter(k => k.role !== 'player' && (+k.grade || 7) === +g).map(k => k.name); return n.length <= 1 ? (n[0] || '') : n.slice(0, -1).join(', ') + (L === 'af' ? ' en ' : ' and ') + n[n.length - 1]; }
/* parent's scope editor: photos of this subject and grade */
function scopePhotoBox(s) {
  if (!filesOn()) return '';
  const g = scopeGrade(), kid = KIDS.find(k => k.role !== 'player' && (+k.grade || 7) === g);
  return `<div class="phscope" data-phscope="${s.id}" style="margin:8px 0 4px"><div class="row" style="justify-content:space-between;gap:8px;align-items:center"><span class="small muted">📷 ${esc(t('phScopeL'))}</span>
    ${kid ? `<label class="btn sm ghost phpick">＋ ${esc(t('phAdd'))}<input type="file" accept="image/*" data-phfile hidden></label>` : `<span class="small muted">${esc(t('phNoKid'))}</span>`}</div>${photoBoxHtml()}</div>`;
}
function wireScopePhotos(row, upd) {
  const box = row.querySelector('[data-phscope]'); if (!box) return;
  const sid = row.dataset.sid, g = scopeGrade(), s = subjectsOfGrade(g).find(x => x.id === sid); if (!s) return;
  const kid = (KIDS.find(k => k.role !== 'player' && (+k.grade || 7) === g) || {}).id;
  const cnt = row.querySelector('[data-phcnt]');
  wirePhotoBox(box, {
    kinds: ['scope', 'test', 'notes', 'other'], kind: 'scope',
    filter: f => f.subj === sid && +f.grade === g,
    before: () => notesLoad(),
    quiz: { parent: true, sets: () => NOTES.byId, args: () => ({ kid, subj: sid, grade: g, subject: tx(s.name), lang: L }),
      done: (set, msg) => { msg.hidden = false; msg.innerHTML = `📒 <b>${esc(tf('nqParentDone', { n: set.qs.length, t: set.title || tx(s.name) }))}</b><br>${esc(tf('nqParentWhere', { k: gradeKidNames(g), s: tx(s.name) }))}`; return 'keep'; }, redraw: () => {} },
    meta: () => ({ kid, subj: sid, grade: g }),
    onCount: (n) => { if (cnt) { cnt.hidden = !n; cnt.textContent = '📷 ' + n; } },
    readArgs: () => ({ subject: tx(s.name), grade: g, lang: L, topics: s.terms.flatMap(tm => tm.topics.map(tp => ({ id: tp.id, title: tx(tp.title) }))) }),
    read: (res, msg) => {
      const set = new Set(res.topics || []);
      if (set.size) row.querySelectorAll('[data-tid]').forEach(c => { c.checked = set.has(c.dataset.tid); });
      if (res.date) row.querySelector('[data-date]').value = res.date;
      if (set.size || res.date) upd();
      const sum = res.summary || (L === 'af' ? res.summary_af : '');
      const names = [...set].map(id => { const c = row.querySelector(`[data-tid="${id}"]`); return c ? c.parentElement.textContent.trim() : null; }).filter(Boolean);
      const kids = gradeKidNames(g);
      msg.innerHTML = `<div style="font-weight:700;margin-bottom:4px">🤖 ${esc(t('aiSaw'))}</div>${sum ? `<div style="margin-bottom:6px">${esc(sum)}</div>` : ''}`
        + (set.size ? `<div><b>✅ ${esc(tf('aiTicked', { n: set.size }))}</b></div><ul style="margin:4px 0 6px 18px;padding:0">${names.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : `<div style="margin-bottom:6px">${esc(t('aiNoTopics'))}</div>`)
        + (res.date ? `<div>📅 <b>${esc(t('aiDate'))}</b> ${esc(fmtDate(res.date))}</div>` : '')
        + (set.size || res.date ? `<div style="margin-top:8px"><b>${esc(t('aiNext'))}</b></div><ul style="margin:4px 0 8px 18px;padding:0"><li>${esc(tf('aiNext1', { k: kids }))}</li><li>${esc(t('aiNext2'))}</li><li>${esc(t('aiNext3'))}</li></ul>` : '')
        + `<div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px">${set.size || res.date ? `<button type="button" class="btn sm primary" data-aisave>💾 ${esc(t('aiSave'))}</button>` : ''}<button type="button" class="btn sm" data-aiquiz>📒 ${esc(t('aiQuiz'))}</button></div><div class="small" style="margin-top:6px;opacity:.85">${esc(t('aiCheck'))}</div>`;
      const sv = msg.querySelector('[data-aisave]'); if (sv) sv.onclick = () => { const b = document.getElementById('saveScope'); if (b) b.click(); };
      const qz = msg.querySelector('[data-aiquiz]'); if (qz) qz.onclick = () => { const b = box.querySelector(`[data-phquiz="${res.id || ''}"]`); if (b) b.click(); else msg.innerHTML = `📒 ${esc(tf('nqParentWhere', { k: kids, s: tx(s.name) }))}`; };
      const det = row.querySelector('details'); if (det) det.open = true;
    },
  });
}

/* ------------------------------------------------------------------ install as an app (own website only) */
const INST = { bip: null };
const SHARE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Share"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
function isStandalone() { try { return matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches || navigator.standalone === true; } catch (e) { return false; } }
function devKind() {
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return /CriOS|FxiOS|EdgiOS/.test(ua) ? 'ios-other' : 'ios-safari';
  if (/SamsungBrowser/.test(ua)) return 'samsung';
  return /Android/.test(ua) ? 'android' : 'desktop';
}
const nativeInstall = () => !!INST.bip && devKind() !== 'samsung';
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); INST.bip = e; refreshInstall(); });
window.addEventListener('appinstalled', () => { INST.bip = null; refreshInstall(); toast(t('instDone')); });
function installWanted() {
  if (!window.LH_VERSION || isStandalone()) return false;
  if (window.LH_CONFIG && S.storeKind !== 'supa') return false; // link the device first
  let snooze = 0; try { snooze = +localStorage.getItem('lh.instSnooze') || 0; } catch (e) {}
  if (Date.now() < snooze) return false;
  return devKind() !== 'desktop' || !!INST.bip;
}
function installCard() {
  if (!installWanted()) return '';
  return `<div class="card instcard" id="instCard"><div class="ic">📲</div><div class="tx"><b>${esc(t('instTitle'))}</b><div class="small muted">${esc(t('instSub'))}</div></div><div class="row"><button class="btn primary sm" id="instGo">${esc(nativeInstall() ? t('instBtn') : t('instHow'))}</button><button class="btn ghost sm" id="instLater">${esc(t('instLater'))}</button></div></div>`;
}
function wireInstall() {
  const b = $('#instGo'); if (b) b.onclick = doInstall;
  const l = $('#instLater'); if (l) l.onclick = () => { try { localStorage.setItem('lh.instSnooze', String(Date.now() + 3 * 86400000)); } catch (e) {} const s = $('#instSlot'); if (s) s.innerHTML = ''; };
}
function refreshInstall() { const s = $('#instSlot'); if (s) { s.innerHTML = installCard(); wireInstall(); } }
const instSlot = () => `<div id="instSlot">${installCard()}</div>`;
async function doInstall() {
  if (nativeInstall()) {
    const e = INST.bip; INST.bip = null;
    try { await e.prompt(); const r = await e.userChoice; if (r && r.outcome === 'accepted') toast(t('instDone')); } catch (er) { showInstallGuide(); }
    refreshInstall(); return;
  }
  showInstallGuide();
}
function showInstallGuide() {
  const k = devKind();
  const steps = k === 'ios-safari' ? t('instIosSafari') : k === 'ios-other' ? t('instIosChrome') : k === 'samsung' ? t('instSamsung') : t('instAndroid');
  const ov = document.createElement('div'); ov.className = 'overlay'; ov.id = 'instGuide';
  ov.innerHTML = `<div class="card pad-lg instguide" role="dialog" aria-modal="true"><h2>📲 ${esc(t('instIosTitle'))}</h2><ol>${steps.map(s => `<li>${s.replace('{S}', SHARE_SVG)}</li>`).join('')}</ol>${k === 'samsung' ? `<button class="btn block" id="instCopy" style="margin-bottom:10px">📋 ${esc(t('instCopy'))}</button>` : ''}<p class="small muted">${esc(t('instFoot'))}</p><button class="btn primary block" id="instOk">${esc(t('instGot'))}</button></div>`;
  document.body.appendChild(ov);
  ov.onclick = (e) => { if (e.target === ov) ov.remove(); };
  $('#instOk', ov).onclick = () => ov.remove();
  const cp = $('#instCopy', ov); if (cp) cp.onclick = async () => { if (await copyText(location.href)) toast(t('copied')); };
}

/* ------------------------------------------------------------------ auto-update (own website only) */
function checkForUpdate() {
  const cur = window.LH_VERSION; if (!cur) return;
  fetch('version.json?t=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(j => {
    if (!j || !j.v || j.v === cur) return;
    let done = null; try { done = sessionStorage.getItem('lh.upd'); } catch (e) {}
    if (done === j.v) return; // already tried once for this version
    const reload = () => { try { sessionStorage.setItem('lh.upd', j.v); } catch (e) {} const p = new URLSearchParams(location.search); p.set('u', j.v); location.replace(location.pathname + '?' + p.toString() + location.hash); };
    if (['quiz', 'exam', 'paper', 'scope', 'redo', 'week', 'notes', 'setup', 'game', 'coach', 'chess', 'chessGame', 'chat'].includes(S.route.s)) {
      if (document.getElementById('updBar')) return;
      const bar = document.createElement('button'); bar.id = 'updBar'; bar.className = 'toast show'; bar.style.pointerEvents = 'auto'; bar.style.cursor = 'pointer';
      bar.textContent = L === 'af' ? '✨ Nuwe weergawe – tik om op te dateer' : '✨ New version – tap to update'; bar.onclick = reload; document.body.appendChild(bar);
    } else reload();
  }).catch(() => {});
}
/* ---------- Vraag-skaak: chess rules + a small engine for "against the app" ----------
   Board: b[64], sq = r*8 + f, r = 0 is rank 8 (black's back rank), f = 0 is the a-file.
   Pieces: 'PNBRQK' white, 'pnbrqk' black, null = empty.
   Special rule for question chess: a player who answers wrong loses his turn (pass). If he was in check,
   his king stays attacked and the other side may capture it, which wins the game. */
const CHESS = (() => {
  const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const colorOf = (pc) => !pc ? null : (pc === pc.toUpperCase() ? 'w' : 'b');
  const other = (c) => c === 'w' ? 'b' : 'w';
  const sqName = (s) => 'abcdefgh'[s & 7] + (8 - (s >> 3));
  const KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
  const KG = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]], ORTH = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const isKing = (pc) => pc === 'K' || pc === 'k';
  function parseFEN(fen) {
    const [bd, t, c, ep, h, n] = fen.split(' ');
    const b = Array(64).fill(null); let s = 0;
    for (const ch of bd) { if (ch === '/') continue; if (/\d/.test(ch)) s += +ch; else b[s++] = ch; }
    return { b, t: t || 'w', c: !c || c === '-' ? '' : c, ep: !ep || ep === '-' ? -1 : ('abcdefgh'.indexOf(ep[0]) + (8 - +ep[1]) * 8), h: +h || 0, n: +n || 1 };
  }
  function toFEN(p) {
    let s = '';
    for (let r = 0; r < 8; r++) { let e = 0; for (let f = 0; f < 8; f++) { const pc = p.b[r * 8 + f]; if (!pc) e++; else { if (e) { s += e; e = 0; } s += pc; } } if (e) s += e; if (r < 7) s += '/'; }
    return `${s} ${p.t} ${p.c || '-'} ${p.ep >= 0 ? sqName(p.ep) : '-'} ${p.h} ${p.n}`;
  }
  const start = () => parseFEN(START);
  /* is square sq attacked by colour `by`? */
  function attacked(b, sq, by) {
    const r = sq >> 3, f = sq & 7;
    const w = by === 'w', P = w ? 'P' : 'p', N = w ? 'N' : 'n', K = w ? 'K' : 'k', B = w ? 'B' : 'b', R = w ? 'R' : 'r', Q = w ? 'Q' : 'q';
    const pr = w ? r + 1 : r - 1; // a white pawn attacks upwards, so it sits one rank below
    if (pr >= 0 && pr < 8) { if (f > 0 && b[pr * 8 + f - 1] === P) return true; if (f < 7 && b[pr * 8 + f + 1] === P) return true; }
    for (const [dr, df] of KN) { const rr = r + dr, ff = f + df; if (rr >= 0 && rr < 8 && ff >= 0 && ff < 8 && b[rr * 8 + ff] === N) return true; }
    for (const [dr, df] of KG) { const rr = r + dr, ff = f + df; if (rr >= 0 && rr < 8 && ff >= 0 && ff < 8 && b[rr * 8 + ff] === K) return true; }
    for (const [dr, df] of DIAG) { let rr = r + dr, ff = f + df; while (rr >= 0 && rr < 8 && ff >= 0 && ff < 8) { const pc = b[rr * 8 + ff]; if (pc) { if (pc === B || pc === Q) return true; break; } rr += dr; ff += df; } }
    for (const [dr, df] of ORTH) { let rr = r + dr, ff = f + df; while (rr >= 0 && rr < 8 && ff >= 0 && ff < 8) { const pc = b[rr * 8 + ff]; if (pc) { if (pc === R || pc === Q) return true; break; } rr += dr; ff += df; } }
    return false;
  }
  const kingSq = (b, c) => b.indexOf(c === 'w' ? 'K' : 'k');
  function inCheck(p, c) { c = c || p.t; const k = kingSq(p.b, c); return k >= 0 && attacked(p.b, k, other(c)); }
  /* pseudo-legal moves: { f, t, p (piece), x (captured piece), pr (promotion 'qrbn'), dbl, ep, cs (castle 'K','Q','k','q') } */
  function pseudo(p, capsOnly) {
    const out = [], b = p.b, c = p.t, opp = other(c);
    for (let s = 0; s < 64; s++) {
      const pc = b[s]; if (!pc || colorOf(pc) !== c) continue;
      const r = s >> 3, f = s & 7, T = pc.toUpperCase();
      const add = (to, extra) => { const m = { f: s, t: to, p: pc, x: b[to] || null }; if (extra) Object.assign(m, extra); out.push(m); };
      if (T === 'P') {
        const dr = c === 'w' ? -1 : 1, home = c === 'w' ? 6 : 1, last = c === 'w' ? 0 : 7, r1 = r + dr;
        if (r1 < 0 || r1 > 7) continue;
        const one = r1 * 8 + f;
        if (!b[one]) {
          if (r1 === last) { for (const pr of 'qrbn') add(one, { pr }); }
          else if (!capsOnly) { add(one); const two = (r + 2 * dr) * 8 + f; if (r === home && !b[two]) add(two, { dbl: 1 }); }
        }
        for (const df of [-1, 1]) {
          const ff = f + df; if (ff < 0 || ff > 7) continue; const to = r1 * 8 + ff;
          if (b[to] && colorOf(b[to]) === opp) { if (r1 === last) { for (const pr of 'qrbn') add(to, { pr }); } else add(to); }
          else if (to === p.ep && !b[to]) add(to, { ep: 1, x: c === 'w' ? 'p' : 'P' });
        }
      } else if (T === 'N' || T === 'K') {
        for (const [dr, df] of (T === 'N' ? KN : KG)) { const rr = r + dr, ff = f + df; if (rr < 0 || rr > 7 || ff < 0 || ff > 7) continue; const to = rr * 8 + ff; if (b[to] ? colorOf(b[to]) === opp : !capsOnly) add(to); }
        if (T === 'K' && !capsOnly) {
          const hs = c === 'w' ? 60 : 4, R = c === 'w' ? 'R' : 'r', ks = c === 'w' ? 'K' : 'k', qs = c === 'w' ? 'Q' : 'q';
          if (s === hs && !attacked(b, hs, opp)) {
            if (p.c.includes(ks) && b[hs + 3] === R && !b[hs + 1] && !b[hs + 2] && !attacked(b, hs + 1, opp) && !attacked(b, hs + 2, opp)) add(hs + 2, { cs: ks });
            if (p.c.includes(qs) && b[hs - 4] === R && !b[hs - 1] && !b[hs - 2] && !b[hs - 3] && !attacked(b, hs - 1, opp) && !attacked(b, hs - 2, opp)) add(hs - 2, { cs: qs });
          }
        }
      } else {
        const dirs = T === 'B' ? DIAG : T === 'R' ? ORTH : DIAG.concat(ORTH);
        for (const [dr, df] of dirs) {
          let rr = r + dr, ff = f + df;
          while (rr >= 0 && rr < 8 && ff >= 0 && ff < 8) { const to = rr * 8 + ff; if (b[to]) { if (colorOf(b[to]) === opp) add(to); break; } if (!capsOnly) add(to); rr += dr; ff += df; }
        }
      }
    }
    return out;
  }
  const ROOK_FROM_TO = { K: [63, 61], Q: [56, 59], k: [7, 5], q: [0, 3] };
  const RIGHTS_SQ = { 63: 'K', 56: 'Q', 7: 'k', 0: 'q' };
  function apply(p, m) {
    const b = p.b.slice(), c = p.t;
    b[m.t] = m.pr ? (c === 'w' ? m.pr.toUpperCase() : m.pr.toLowerCase()) : b[m.f]; b[m.f] = null;
    if (m.ep) b[m.t + (c === 'w' ? 8 : -8)] = null;
    if (m.cs) { const [a, z] = ROOK_FROM_TO[m.cs]; b[z] = b[a]; b[a] = null; }
    let cr = p.c;
    if (m.p === 'K') cr = cr.replace('K', '').replace('Q', '');
    if (m.p === 'k') cr = cr.replace('k', '').replace('q', '');
    if (RIGHTS_SQ[m.f]) cr = cr.replace(RIGHTS_SQ[m.f], '');
    if (RIGHTS_SQ[m.t]) cr = cr.replace(RIGHTS_SQ[m.t], '');
    return { b, t: other(c), c: cr, ep: m.dbl ? (m.f + m.t) / 2 : -1, h: (m.p === 'P' || m.p === 'p' || m.x) ? 0 : p.h + 1, n: p.n + (c === 'b' ? 1 : 0) };
  }
  /* a wrong answer: the turn goes to the other player, nothing moves */
  const pass = (p) => ({ b: p.b.slice(), t: other(p.t), c: p.c, ep: -1, h: p.h + 1, n: p.n + (p.t === 'b' ? 1 : 0) });
  function legal(p, capsOnly) {
    const c = p.t;
    return pseudo(p, capsOnly).filter(m => { if (isKing(m.x)) return true; const q = apply(p, m); const k = kingSq(q.b, c); return k < 0 || !attacked(q.b, k, q.t); });
  }
  function insufficient(b) {
    const rest = b.filter(pc => pc && !isKing(pc));
    if (!rest.length) return true;
    return rest.length === 1 && 'NnBb'.includes(rest[0]);
  }
  /* state of the position for the side to move */
  function status(p) {
    const moves = legal(p);
    const canTakeKing = moves.some(m => isKing(m.x));
    if (canTakeKing) return { over: false, moves, canTakeKing, check: inCheck(p) };
    if (!moves.length) return inCheck(p) ? { over: true, res: 'mate', winner: other(p.t), moves } : { over: true, res: 'stale', moves };
    if (insufficient(p.b)) return { over: true, res: 'insuf', moves };
    if (p.h >= 100) return { over: true, res: 'fifty', moves };
    return { over: false, moves, check: inCheck(p) };
  }
  function perft(p, d) { if (d === 0) return 1; let n = 0; for (const m of legal(p)) n += perft(apply(p, m), d - 1); return n; }

  /* ---------- engine (negamax + alpha-beta + quiescence, material + piece-square tables) ---------- */
  const VAL = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 0 };
  const PST = {
    P: [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    N: [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50],
    B: [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20],
    R: [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0],
    Q: [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20],
    K: [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20],
    KE: [-50, -40, -30, -20, -20, -30, -40, -50, -30, -20, -10, 0, 0, -10, -20, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -30, 0, 0, 0, 0, -30, -30, -50, -30, -30, -30, -30, -30, -30, -50],
  };
  function evaluate(p) {
    const b = p.b; let s = 0, heavy = 0;
    for (let i = 0; i < 64; i++) { const pc = b[i]; if (pc && 'QqRr'.includes(pc)) heavy += pc === 'Q' || pc === 'q' ? 2 : 1; }
    const endgame = heavy <= 2;
    for (let i = 0; i < 64; i++) {
      const pc = b[i]; if (!pc) continue; const T = pc.toUpperCase(), w = pc === T;
      const idx = w ? i : ((7 - (i >> 3)) * 8 + (i & 7));
      const v = VAL[T] + (T === 'K' && endgame ? PST.KE : PST[T])[idx];
      s += w ? v : -v;
    }
    return p.t === 'w' ? s : -s;
  }
  const MATE = 100000;
  const score = (m) => (m.x ? 10 * (isKing(m.x) ? 2000 : VAL[m.x.toUpperCase()]) - VAL[m.p.toUpperCase()] / 10 : 0) + (m.pr === 'q' ? 800 : 0);
  const order = (ms) => ms.sort((a, z) => score(z) - score(a));
  function quiesce(p, alpha, beta, ply, qd, ctx) {
    ctx.nodes++;
    const stand = evaluate(p);
    if (stand >= beta) return stand;
    if (stand > alpha) alpha = stand;
    if (qd <= 0 || ctx.nodes > ctx.max) return stand;
    for (const m of order(legal(p, true))) {
      if (isKing(m.x)) return MATE - ply;
      const sc = -quiesce(apply(p, m), -beta, -alpha, ply + 1, qd - 1, ctx);
      if (sc >= beta) return sc;
      if (sc > alpha) alpha = sc;
    }
    return alpha;
  }
  function negamax(p, depth, alpha, beta, ply, ctx) {
    ctx.nodes++;
    const ms = legal(p);
    for (const m of ms) if (isKing(m.x)) return MATE - ply;
    if (!ms.length) return inCheck(p) ? -(MATE - ply) : 0;
    if (p.h >= 100 || insufficient(p.b)) return 0;
    if (depth <= 0) return quiesce(p, alpha, beta, ply, 4, ctx);
    let best = -Infinity;
    for (const m of order(ms)) {
      const sc = -negamax(apply(p, m), depth - 1, -beta, -alpha, ply + 1, ctx);
      if (sc > best) best = sc;
      if (sc > alpha) alpha = sc;
      if (alpha >= beta) break;
    }
    return best;
  }
  const LEVELS = { easy: { d: 1, noise: 120, rand: 0.25, max: 20000 }, med: { d: 2, noise: 30, rand: 0.04, max: 30000 }, hard: { d: 3, noise: 4, rand: 0, max: 45000 } };
  function bestMove(p, level, rnd) {
    rnd = rnd || Math.random;
    const cfg = LEVELS[level] || LEVELS.med, ms = legal(p);
    if (!ms.length) return null;
    const kx = ms.find(m => isKing(m.x)); if (kx) return kx;
    const ctx = { nodes: 0, max: cfg.max };
    // shuffle first so equal moves are not always picked in the same order
    for (let i = ms.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [ms[i], ms[j]] = [ms[j], ms[i]]; }
    if (rnd() < cfg.rand) { const quiet = ms.filter(m => !m.pr || m.pr === 'q'); return quiet[Math.floor(rnd() * quiet.length)] || ms[0]; }
    order(ms);
    let best = null, bs = -Infinity;
    for (const m of ms) {
      const q = apply(p, m);
      // easy/medium: exact score per root move plus noise; hard: alpha-beta at the root as well
      const alpha = cfg.d >= 3 && best ? bs - cfg.noise : -Infinity;
      let sc = -negamax(q, cfg.d - 1, -Infinity, -alpha, 1, ctx);
      sc += (rnd() * 2 - 1) * cfg.noise;
      if (sc > bs) { bs = sc; best = m; }
    }
    return best;
  }
  return { START, start, parseFEN, toFEN, sqName, colorOf, other, isKing, attacked, inCheck, legal, apply, pass, status, perft, bestMove, evaluate, insufficient };
})();

/* ---------- Vraag-speletjies: rules + small engines for Dambord, Vier-op-'n-ry, Seeslag, Slange & Lere ----------
   Every engine: init(cfg) → state, turn(st) → 'w'|'b', moves(st) → [move], apply(st, move) → { st, info } | null,
   pass(st) → st (a wrong answer), status(st, info) → { over, winner, res }, ai(st, level, rnd) → move. */
const ENGINES = (() => {
  const other = (c) => c === 'w' ? 'b' : 'w';
  const rndInt = (rnd, n) => Math.floor(rnd() * n);
  const shuf = (a, rnd) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rndInt(rnd, i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function seedRnd(str) { let h = 1779033703 ^ String(str).length; for (let i = 0; i < String(str).length; i++) { h = Math.imul(h ^ String(str).charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } let a = h >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let x = Math.imul(a ^ (a >>> 15), 1 | a); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; }; }

  /* ===== Dambord (English draughts, 8×8): forced capture, multi-jumps, men capture forward only, kings one step any way ===== */
  const CK = (() => {
    const isW = (p) => p === 'w' || p === 'W', isKing = (p) => p === 'W' || p === 'B';
    const colorOf = (p) => !p ? null : isW(p) ? 'w' : 'b';
    function init() {
      const b = Array(64).fill(null);
      for (let s = 0; s < 64; s++) { const r = s >> 3, f = s & 7; if ((r + f) % 2 !== 1) continue; if (r <= 2) b[s] = 'b'; else if (r >= 5) b[s] = 'w'; }
      return { b, t: 'w', quiet: 0 };
    }
    const dirsOf = (p) => isKing(p) ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] : isW(p) ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
    const crowns = (p, r) => (p === 'w' && r === 0) || (p === 'b' && r === 7);
    function jumps(b, s, p, path, caps, out) {
      const r = s >> 3, f = s & 7; let found = false;
      for (const [dr, df] of dirsOf(p)) {
        const mr = r + dr, mf = f + df, lr = r + 2 * dr, lf = f + 2 * df;
        if (lr < 0 || lr > 7 || lf < 0 || lf > 7) continue;
        const mid = mr * 8 + mf, land = lr * 8 + lf;
        if (!b[mid] || colorOf(b[mid]) === colorOf(p) || caps.includes(mid) || b[land]) continue;
        found = true;
        const np = path.concat([land]), nc = caps.concat([mid]);
        if (!isKing(p) && crowns(p, lr)) { out.push({ path: np, caps: nc }); continue; } // crowning ends the move
        const b2 = b.slice(); b2[s] = null; b2[land] = p;
        jumps(b2, land, p, np, nc, out);
      }
      if (!found && path.length) out.push({ path, caps });
    }
    function moves(st) {
      const b = st.b, caps = [], quiet = [];
      for (let s = 0; s < 64; s++) {
        const p = b[s]; if (!p || colorOf(p) !== st.t) continue;
        const seqs = []; jumps(b, s, p, [], [], seqs);
        seqs.forEach(q => caps.push({ f: s, to: q.path[q.path.length - 1], p: q.path, caps: q.caps }));
        if (caps.length) continue;
        const r = s >> 3, f = s & 7;
        for (const [dr, df] of dirsOf(p)) { const nr = r + dr, nf = f + df; if (nr < 0 || nr > 7 || nf < 0 || nf > 7) continue; const to = nr * 8 + nf; if (!b[to]) quiet.push({ f: s, to, p: [to], caps: [] }); }
      }
      return caps.length ? caps : quiet;
    }
    function applyMove(st, m) {
      const b = st.b.slice(), p = b[m.f]; b[m.f] = null; m.caps.forEach(c => { b[c] = null; });
      const r = m.to >> 3; let np = p; if (!isKing(p) && crowns(p, r)) np = p.toUpperCase();
      b[m.to] = np;
      return { b, t: other(st.t), quiet: m.caps.length || np !== p ? 0 : st.quiet + 1 };
    }
    function apply(st, e) {
      const ms = moves(st);
      const m = ms.find(x => x.f === e.f && x.to === e.to && (!e.p || JSON.stringify(x.p) === JSON.stringify(e.p))) || null;
      if (!m) return null;
      return { st: applyMove(st, m), info: { m, piece: st.b[m.f], crowned: !isKing(st.b[m.f]) && crowns(st.b[m.f], m.to >> 3) } };
    }
    const pass = (st) => ({ b: st.b.slice(), t: other(st.t), quiet: st.quiet + 1 });
    function status(st) {
      const ms = moves(st);
      if (!ms.length) return { over: true, res: st.b.some(p => colorOf(p) === st.t) ? 'blocked' : 'allgone', winner: other(st.t), moves: ms };
      if (st.quiet >= 80) return { over: true, res: 'quiet', winner: null, moves: ms };
      return { over: false, moves: ms, mustTake: ms.some(m => m.caps.length) };
    }
    function evaluate(st) {
      let s = 0;
      st.b.forEach((p, i) => { if (!p) return; const r = i >> 3, f = i & 7; let v = isKing(p) ? 165 : 100; if (!isKing(p)) v += (isW(p) ? (7 - r) : r) * 4; if (f >= 2 && f <= 5 && r >= 2 && r <= 5) v += 6; if (!isKing(p) && ((isW(p) && r === 7) || (!isW(p) && r === 0))) v += 8; s += isW(p) ? v : -v; });
      return st.t === 'w' ? s : -s;
    }
    function negamax(st, d, a, z, ctx) {
      ctx.n++;
      const ms = moves(st);
      if (!ms.length) return -100000 + ctx.ply;
      if (d <= 0 && !ms[0].caps.length) return evaluate(st);
      if (d <= -4 || ctx.n > ctx.max) return evaluate(st);
      let best = -Infinity;
      ms.sort((x, y) => y.caps.length - x.caps.length);
      for (const m of ms) { ctx.ply++; const v = -negamax(applyMove(st, m), d - 1, -z, -a, ctx); ctx.ply--; if (v > best) best = v; if (v > a) a = v; if (a >= z) break; }
      return best;
    }
    const LV = { easy: { d: 1, noise: 60, rand: 0.3, max: 8000 }, med: { d: 3, noise: 15, rand: 0.05, max: 40000 }, hard: { d: 6, noise: 3, rand: 0, max: 120000 } };
    function ai(st, level, rnd) {
      rnd = rnd || Math.random; const cfg = LV[level] || LV.med; const ms = shuf(moves(st), rnd);
      if (!ms.length) return null;
      if (rnd() < cfg.rand) return ms[0];
      let best = ms[0], bs = -Infinity; const ctx = { n: 0, ply: 1, max: cfg.max };
      for (const m of ms) { const v = -negamax(applyMove(st, m), cfg.d - 1, -Infinity, Infinity, ctx) + (rnd() * 2 - 1) * cfg.noise; if (v > bs) { bs = v; best = m; } }
      return best;
    }
    function perft(st, d) { if (!d) return 1; let n = 0; for (const m of moves(st)) n += perft(applyMove(st, m), d - 1); return n; }
    return { init, moves, apply, applyMove, pass, status, ai, perft, turn: (st) => st.t, isKing, colorOf };
  })();

  /* ===== Vier-op-'n-ry (Connect Four, 7 columns × 6 rows) ===== */
  const C4 = (() => {
    const W = 7, H = 6;
    const init = () => ({ g: Array(W * H).fill(null), t: 'w', n: 0, last: -1 });
    const moves = (st) => { const out = []; for (let c = 0; c < W; c++) if (!st.g[c]) out.push({ c }); return out; };
    function drop(g, c, t) { for (let r = H - 1; r >= 0; r--) { const i = r * W + c; if (!g[i]) { const g2 = g.slice(); g2[i] = t; return { g: g2, i }; } } return null; }
    function apply(st, e) { if (!(e.c >= 0 && e.c < W)) return null; const d = drop(st.g, e.c, st.t); if (!d) return null; return { st: { g: d.g, t: other(st.t), n: st.n + 1, last: d.i }, info: { c: e.c, i: d.i } }; }
    const pass = (st) => ({ g: st.g, t: other(st.t), n: st.n, last: st.last });
    function lineAt(g, i) {
      const p = g[i]; if (!p) return null; const r = Math.floor(i / W), c = i % W;
      for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
        const cells = [i];
        for (const s of [1, -1]) { let rr = r + dr * s, cc = c + dc * s; while (rr >= 0 && rr < H && cc >= 0 && cc < W && g[rr * W + cc] === p) { cells.push(rr * W + cc); rr += dr * s; cc += dc * s; } }
        if (cells.length >= 4) return cells;
      }
      return null;
    }
    function status(st) {
      if (st.last >= 0) { const l = lineAt(st.g, st.last); if (l) return { over: true, res: 'four', winner: st.g[st.last], line: l }; }
      if (st.g.every(x => x)) return { over: true, res: 'full', winner: null };
      return { over: false, moves: moves(st) };
    }
    function scoreWindow(w, me) { const m = w.filter(x => x === me).length, o = w.filter(x => x && x !== me).length; if (m && o) return 0; if (m === 4) return 1000; if (m === 3) return 6; if (m === 2) return 2; if (o === 3) return -8; if (o === 2) return -2; return 0; }
    function evaluate(g, me) {
      let s = 0;
      for (let r = 0; r < H; r++) if (g[r * W + 3] === me) s += 4; else if (g[r * W + 3]) s -= 4;
      for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
        const er = r + 3 * dr, ec = c + 3 * dc; if (er < 0 || er >= H || ec < 0 || ec >= W) continue;
        s += scoreWindow([0, 1, 2, 3].map(k => g[(r + k * dr) * W + c + k * dc]), me);
      }
      return s;
    }
    const ORDER = [3, 2, 4, 1, 5, 0, 6];
    function negamax(g, t, d, a, z, last, ctx) {
      ctx.n++;
      if (last >= 0 && lineAt(g, last)) return -(100000 + d); // the previous mover just won
      if (g.every(x => x)) return 0;
      if (d === 0 || ctx.n > ctx.max) return evaluate(g, t);
      let best = -Infinity;
      for (const c of ORDER) { const dd = drop(g, c, t); if (!dd) continue; const v = -negamax(dd.g, other(t), d - 1, -z, -a, dd.i, ctx); if (v > best) best = v; if (v > a) a = v; if (a >= z) break; }
      return best;
    }
    const LV = { easy: { d: 2, noise: 40, rand: 0.3 }, med: { d: 4, noise: 6, rand: 0.05 }, hard: { d: 7, noise: 1, rand: 0 } };
    function ai(st, level, rnd) {
      rnd = rnd || Math.random; const cfg = LV[level] || LV.med; const ms = moves(st); if (!ms.length) return null;
      if (rnd() < cfg.rand) return ms[rndInt(rnd, ms.length)];
      let best = ms[0], bs = -Infinity; const ctx = { n: 0, max: 400000 };
      for (const c of shuf(ORDER, rnd).sort((x, y) => Math.abs(3 - x) - Math.abs(3 - y))) {
        const dd = drop(st.g, c, st.t); if (!dd) continue;
        const v = -negamax(dd.g, other(st.t), cfg.d - 1, -Infinity, Infinity, dd.i, ctx) + (rnd() * 2 - 1) * cfg.noise;
        if (v > bs) { bs = v; best = { c }; }
      }
      return best;
    }
    return { W, H, init, moves, apply, pass, status, ai, turn: (st) => st.t, lineAt };
  })();

  /* ===== Seeslag (Battleship, 8×8, ships 4-3-3-2-2, one shot per turn) ===== */
  const SH = (() => {
    const N = 8, SIZES = [4, 3, 3, 2, 2];
    function fleet(rnd) {
      for (let tries = 0; tries < 500; tries++) {
        const taken = new Set(), near = new Set(), ships = []; let ok = true;
        for (const n of SIZES) {
          let placed = false;
          for (let k = 0; k < 200 && !placed; k++) {
            const hz = rnd() < 0.5, r = rndInt(rnd, hz ? N : N - n + 1), c = rndInt(rnd, hz ? N - n + 1 : N);
            const cells = Array.from({ length: n }, (_, j) => hz ? r * N + c + j : (r + j) * N + c);
            if (cells.some(x => near.has(x))) continue;
            cells.forEach(x => { taken.add(x); const xr = Math.floor(x / N), xc = x % N; for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { const rr = xr + dr, cc = xc + dc; if (rr >= 0 && rr < N && cc >= 0 && cc < N) near.add(rr * N + cc); } });
            ships.push({ n, cells }); placed = true;
          }
          if (!placed) { ok = false; break; }
        }
        if (ok) return ships;
      }
      return null;
    }
    function init(cfg) { const rnd = seedRnd('ships:' + (cfg.seed || cfg.id || 'x')); return { fleet: { w: fleet(rnd), b: fleet(rnd) }, shots: { w: [], b: [] }, t: 'w' }; }
    const enemy = (c) => other(c);
    const moves = (st) => { const shot = new Set(st.shots[st.t]); const out = []; for (let i = 0; i < N * N; i++) if (!shot.has(i)) out.push({ to: i }); return out; };
    const shipAt = (ships, i) => ships.find(s => s.cells.includes(i)) || null;
    const sunk = (ship, shots) => ship.cells.every(x => shots.includes(x));
    function apply(st, e) {
      const i = e.to; if (!(i >= 0 && i < N * N) || st.shots[st.t].includes(i)) return null;
      const shots = { w: st.shots.w.slice(), b: st.shots.b.slice() }; shots[st.t].push(i);
      const ship = shipAt(st.fleet[enemy(st.t)], i);
      return { st: { fleet: st.fleet, shots, t: other(st.t) }, info: { to: i, hit: !!ship, sunk: ship && sunk(ship, shots[st.t]) ? ship.n : 0 } };
    }
    const pass = (st) => ({ fleet: st.fleet, shots: st.shots, t: other(st.t) });
    const shipsLeft = (st, c) => st.fleet[c].filter(s => !sunk(s, st.shots[other(c)])).length;
    function status(st) {
      for (const c of ['w', 'b']) if (st.fleet[c].every(s => sunk(s, st.shots[other(c)]))) return { over: true, res: 'sunk', winner: other(c) };
      return { over: false, moves: moves(st) };
    }
    function ai(st, level, rnd) {
      rnd = rnd || Math.random; const me = st.t, shots = st.shots[me], foe = st.fleet[other(me)];
      const free = moves(st).map(m => m.to); if (!free.length) return null;
      if (level === 'easy') return { to: free[rndInt(rnd, free.length)] };
      // hits on ships that are not sunk yet → target mode
      const hits = shots.filter(i => { const s = shipAt(foe, i); return s && !sunk(s, shots); });
      const nb = (i) => { const r = Math.floor(i / N), c = i % N; return [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].filter(([a, z]) => a >= 0 && a < N && z >= 0 && z < N).map(([a, z]) => a * N + z); };
      if (hits.length) {
        let cand = [];
        if (hits.length >= 2) { // continue in the line of the hits
          const rs = new Set(hits.map(i => Math.floor(i / N))), cs = new Set(hits.map(i => i % N));
          if (rs.size === 1) { const r = [...rs][0], cols = hits.map(i => i % N); cand = [Math.min(...cols) - 1, Math.max(...cols) + 1].filter(c => c >= 0 && c < N).map(c => r * N + c); }
          else if (cs.size === 1) { const c = [...cs][0], rows = hits.map(i => Math.floor(i / N)); cand = [Math.min(...rows) - 1, Math.max(...rows) + 1].filter(r => r >= 0 && r < N).map(r => r * N + c); }
        }
        cand = cand.filter(i => free.includes(i));
        if (!cand.length) cand = [...new Set(hits.flatMap(nb))].filter(i => free.includes(i));
        if (cand.length) return { to: cand[rndInt(rnd, cand.length)] };
      }
      if (level === 'hard') { // where can the remaining ships still fit? shoot the most likely cell
        const left = foe.filter(s => !sunk(s, shots)).map(s => s.n), heat = Array(N * N).fill(0), miss = new Set(shots);
        const blocked = (i) => miss.has(i);
        for (const n of left) for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) for (const hz of [true, false]) {
          if (hz ? c + n > N : r + n > N) continue; const cells = Array.from({ length: n }, (_, j) => hz ? r * N + c + j : (r + j) * N + c);
          if (cells.some(blocked)) continue; cells.forEach(x => heat[x]++);
        }
        let best = -1, bi = free[0]; free.forEach(i => { const v = heat[i] + rnd() * 0.5; if (v > best) { best = v; bi = i; } });
        return { to: bi };
      }
      const par = free.filter(i => (Math.floor(i / N) + i % N) % 2 === 0); // medium: checkerboard hunt
      const pool = par.length ? par : free; return { to: pool[rndInt(rnd, pool.length)] };
    }
    return { N, SIZES, init, moves, apply, pass, status, ai, turn: (st) => st.t, shipAt, sunk, shipsLeft, fleet };
  })();

  /* ===== Slange & Lere (snakes and ladders, 1–100, bounce back from 100) ===== */
  const SL = (() => {
    const LADDERS = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };
    const SNAKES = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
    const init = () => ({ pos: { w: 0, b: 0 }, t: 'w' });
    const moves = () => [{ roll: 0 }];
    function apply(st, e) {
      const roll = e.roll; if (!(roll >= 1 && roll <= 6 && Math.floor(roll) === roll)) return null;
      const from = st.pos[st.t]; let mid = from + roll; if (mid > 100) mid = 100 - (mid - 100);
      let to = mid, kind = null; if (LADDERS[mid]) { to = LADDERS[mid]; kind = 'ladder'; } else if (SNAKES[mid]) { to = SNAKES[mid]; kind = 'snake'; }
      const pos = Object.assign({}, st.pos); pos[st.t] = to;
      return { st: { pos, t: other(st.t) }, info: { roll, from, mid, to, kind, c: st.t } };
    }
    const pass = (st) => ({ pos: st.pos, t: other(st.t) });
    function status(st) { for (const c of ['w', 'b']) if (st.pos[c] === 100) return { over: true, res: 'finish', winner: c }; return { over: false, moves: moves() }; }
    const ai = (st, level, rnd) => ({ roll: 1 + rndInt(rnd || Math.random, 6) });
    const AIMISS = { easy: 0.45, med: 0.3, hard: 0.15 }; // the app "answers" too: how often it misses
    function cell(n) { const row = Math.floor((n - 1) / 10), k = (n - 1) % 10, col = row % 2 === 0 ? k : 9 - k; return { x: col * 10 + 5, y: (9 - row) * 10 + 5, row, col }; }
    return { LADDERS, SNAKES, init, moves, apply, pass, status, ai, AIMISS, cell, turn: (st) => st.t };
  })();
  return { CK, C4, SH, SL, seedRnd };
})();

/* ================================================================== v7: Vraag-skaak (question chess) + Familie-klets (family chat)
   Chess: tap a piece, tap a square → a question pops up with a countdown. Right = the move is made; wrong or too slow = the turn passes.
   Modes: against the app (3 levels), family online (each on own phone, synced through Supabase kv), or two players on one phone.
   Games are append-only event logs: kv "chess/g/<id>" (online, written with lh_log so two phones never overwrite each other),
   localStorage "lh.chess.loc.<player>" (app / same phone). Chat: kv "chat/fam/d/<yyyy-mm-dd>", also appended with lh_log. */
Object.assign(UI.af, {
  chessT: 'Vraag-skaak', chessSub: 'Skaak met ’n draai: elke skuif kos ’n vraag! Antwoord reg en binne die tyd, anders is jou beurt verby.',
  chessHowT: 'Hoe werk dit?',
  chessHow: ['Tik op ’n stuk wat jy wil skuif, en dan op die blokkie waarheen dit moet gaan.', '’n Vraag spring op – jy moet antwoord voordat die tyd op is.', 'Reg ✅ – jou skuif word gemaak. Verkeerd of te stadig ❌ – jou skuif tel nie en dit is die ander speler se beurt.', 'Pasop: staan jy skaak en jy antwoord verkeerd, mag die ander speler jou koning vang – dan wen hy!', 'Skaakmat wen ook, net soos in gewone skaak. Elke spel verdien XP.'],
  chNew: 'Nuwe spel', chVsWho: 'Teen wie?', chModeApp: ['Die app', 'Speel teen Leerhoek se rekenaar'], chModeFam: ['Familie aanlyn', 'Elkeen op sy eie foon'], chModePhone: ['Dieselfde foon', 'Gee die foon aan na elke skuif'],
  chLevel: 'Vlak', chLvl: { easy: 'Maklik', med: 'Medium', hard: 'Moeilik' }, chColor: 'Jou kleur', chW: 'Wit', chB: 'Swart', chRand: 'Lukraak', chOpp: 'Wie daag jy uit?', chOppPhone: 'Wie speel saam?',
  chFriend: 'Vriend', chFriendName: 'Vriend se naam', chQFrom: 'Vrae uit', chSecs: 'Tyd per vraag', chStart: 'Begin ▶', chInvite: 'Stuur uitnodiging 📨', chInvSent: 'Uitnodiging gestuur! {n} sien dit sodra hy Leerhoek oopmaak.', chInvSentP: 'Uitnodiging gestuur! {n} kry ’n kennisgewing.',
  chChallenges: '{n} daag jou uit vir Vraag-skaak!', chAccept: 'Aanvaar', chDecline: 'Nee dankie', chCancel: 'Kanselleer', chWaitAcc: 'Wag vir {n} om te aanvaar…', chYourTurn: 'Jou beurt!', chTheirTurn: '{n} se beurt',
  chMyGames: 'Jou speletjies', chResume: 'Speel verder ▶', chUnfinished: 'Onvoltooide spel', chOpen: 'Speel ▶', chView: 'Kyk', chRecent: 'Onlangs klaar', chDeclined: '{n} het nee gesê', chCancelled: 'Gekanselleer',
  chTapPiece: 'Tik op ’n stuk wat jy wil skuif', chTapTarget: 'Tik nou waarheen dit moet gaan', chAppThinks: 'Die app dink… 🤖', chWaitMove: 'Wag vir {n} om te skuif…', chCheck: 'Skaak!',
  chTakeKing: '{n} het die vraag gemis terwyl hy skaak staan – vang sy koning en wen! 👑', chInCheck: 'Jy staan skaak! Red jou koning – en antwoord reg, anders kan hy gevang word.',
  chQHead: 'Antwoord om te skuif', chTooSlow: '⏰ Te stadig!', chWrong: '❌ Verkeerd!', chTurnOver: 'Jou skuif tel nie – nou is dit {n} se beurt.', chRightAns: 'Die regte antwoord:', chRight: '✅ Reg! Jou skuif staan.', chGoOn: 'Gaan voort ▶',
  chPass: '📱 Gee die foon vir {n}', chIAm: 'Ek is {n} – gaan! ▶', chResign: 'Gee oor', chResignQ: 'Wil jy regtig oorgee? Die ander speler wen dan.', chYes: 'Ja, ek gee oor', chNo: 'Nee, speel verder', chFlip: 'Draai bord',
  chMoves: 'Skuiwe', chMissed: 'vraag gemis', chQRight: 'Vrae reg', chRes: { mate: 'Skaakmat', kingx: 'Koning gevang', stale: 'Pat – gelykop', insuf: 'Te min stukke – gelykop', fifty: '50 skuiwe sonder dat iets gevang is – gelykop', res: '{n} het oorgegee' },
  chYouWin: 'Jy het gewen! 🏆', chTheyWin: '{n} het gewen', chDraw: 'Gelykop! 🤝', chWins: '{n} wen! 🏆', chRecord: 'Jou rekord', chVsApp: 'Teen die app', chVsFam: 'Teen familie', chWDL: '{w} gewen · {l} verloor · {d} gelykop',
  chCard: ['Vraag-skaak', 'Skaak waar elke skuif ’n vraag kos – teen die app of die familie!'], chPromo: 'Waarin moet jou pion verander?', chNoQs: 'Daar is nie vrae vir hierdie vak nie – kies ’n ander vak.',
  chSendFail: 'Kon nie stuur nie – kyk of die internet werk en probeer weer.', chOnlineOnly: 'Familie-speletjies en die klets werk net op die gesin se Leerhoek-webwerf (met jou skakel).', chWho: 'Wie is jy?', chWhoSub: 'Kies jou naam om te speel of te gesels.',
  chParentT: '♟️ Skaak & 💬 Familie-klets', chParentSub: 'Speel Vraag-skaak teen die seuns (of teen die app), en gesels saam in die familie-klets.', chIAmL: 'Ek is:', chPlay: '♟️ Speel skaak', chChat: '💬 Familie-klets',
  chApp: 'Die app', chLife: 'Haal twee verkeerde antwoorde weg', chYou: 'Jy', chLast: 'Laaste skuif', chExpired: 'Verval', chNewGameBtn: '➕ Nuwe spel', chPickWhite: 'Wit begin',
  chatT: 'Familie-klets', chatSub: 'Net vir Diaan, Stefan, Pa en Ma – niemand anders kan dit sien nie.', chatPh: 'Tik ’n boodskap…', chatSend: 'Stuur', chatEmpty: 'Nog geen boodskappe nie. Sê hallo! 👋', chatOpen: 'Klets',
  chatQuick: ['Hallo! 👋', 'Goeie skuif! 👏', 'Jou beurt! ⏰', 'Haha 😂', 'Kom speel skaak ♟️', 'Ek is besig met leer 📚', 'Lief vir julle ❤️'],
  chatSys: { inv: '♟️ {a} het {b} uitgedaag vir Vraag-skaak', acc: '♟️ {b} het aanvaar – die spel het begin!', win: '🏆 {a} het die skaakspel teen {b} gewen ({r})', draw: '🤝 {a} en {b} het gelykop gespeel ({r})' },
  fam: { pa: 'Pa', ma: 'Ma' }, navChess: 'Skaak', navChat: 'Klets',
  lockNote: '🔒 Hierdie toestel is net vir {n}. Pa en Ma kan met die PIN alles sien.', lockParent: '👪 Ouer-toestel: tik op ’n seun om sy profiel te sien (met die ouer-PIN).', adminView: '👪 Ouer-aansig – jy kyk na {n} se profiel.', adminBack: '← Ouerpaneel', adminOpen: 'Maak ’n profiel oop:', specT: '👀 Ander speletjies in die familie',
  devT: '📱 Hierdie toestel', devSub: 'Elke toestel hoort aan een persoon. ’n Seun sien net sy eie profiel – hy kan nie na sy broer s’n oorskakel nie. Pa en Ma (met die PIN) kan alles sien. Die gesinskakel (~diaan / ~stefan / ~ouer) koppel ’n toestel outomaties.', devNow: 'Nou gekoppel aan:', devNone: 'nog niemand nie – die eerste profiel wat gekies word, sluit dit', devParent: 'Pa/Ma (ouer-toestel)', devUnlock: 'Ontkoppel', devSet: 'Toestel gekoppel ✔',
});
Object.assign(UI.en, {
  chessT: 'Question chess', chessSub: 'Chess with a twist: every move costs a question! Answer correctly and in time, or your turn is over.',
  chessHowT: 'How does it work?',
  chessHow: ['Tap a piece you want to move, then the square it should go to.', 'A question pops up – you must answer before the time runs out.', 'Right ✅ – your move is made. Wrong or too slow ❌ – your move doesn’t count and it’s the other player’s turn.', 'Careful: if you are in check and answer wrong, the other player may capture your king – and wins!', 'Checkmate also wins, just like normal chess. Every game earns XP.'],
  chNew: 'New game', chVsWho: 'Against who?', chModeApp: ['The app', 'Play against Leerhoek’s computer'], chModeFam: ['Family online', 'Each on their own phone'], chModePhone: ['Same phone', 'Pass the phone after every move'],
  chLevel: 'Level', chLvl: { easy: 'Easy', med: 'Medium', hard: 'Hard' }, chColor: 'Your colour', chW: 'White', chB: 'Black', chRand: 'Random', chOpp: 'Who do you challenge?', chOppPhone: 'Who is playing with you?',
  chFriend: 'Friend', chFriendName: 'Friend’s name', chQFrom: 'Questions from', chSecs: 'Time per question', chStart: 'Start ▶', chInvite: 'Send invite 📨', chInvSent: 'Invite sent! {n} will see it when they open Leerhoek.', chInvSentP: 'Invite sent! {n} gets a notification.',
  chChallenges: '{n} challenges you to question chess!', chAccept: 'Accept', chDecline: 'No thanks', chCancel: 'Cancel', chWaitAcc: 'Waiting for {n} to accept…', chYourTurn: 'Your turn!', chTheirTurn: '{n}’s turn',
  chMyGames: 'Your games', chResume: 'Continue ▶', chUnfinished: 'Unfinished game', chOpen: 'Play ▶', chView: 'View', chRecent: 'Recently finished', chDeclined: '{n} said no', chCancelled: 'Cancelled',
  chTapPiece: 'Tap a piece you want to move', chTapTarget: 'Now tap where it should go', chAppThinks: 'The app is thinking… 🤖', chWaitMove: 'Waiting for {n} to move…', chCheck: 'Check!',
  chTakeKing: '{n} missed the question while in check – capture the king to win! 👑', chInCheck: 'You are in check! Save your king – and answer correctly, or it can be captured.',
  chQHead: 'Answer to make your move', chTooSlow: '⏰ Too slow!', chWrong: '❌ Wrong!', chTurnOver: 'Your move doesn’t count – now it’s {n}’s turn.', chRightAns: 'The right answer:', chRight: '✅ Correct! Your move stands.', chGoOn: 'Continue ▶',
  chPass: '📱 Pass the phone to {n}', chIAm: 'I’m {n} – go! ▶', chResign: 'Resign', chResignQ: 'Do you really want to resign? The other player then wins.', chYes: 'Yes, I resign', chNo: 'No, keep playing', chFlip: 'Flip board',
  chMoves: 'Moves', chMissed: 'missed question', chQRight: 'Questions right', chRes: { mate: 'Checkmate', kingx: 'King captured', stale: 'Stalemate – draw', insuf: 'Not enough pieces – draw', fifty: '50 moves without a capture – draw', res: '{n} resigned' },
  chYouWin: 'You won! 🏆', chTheyWin: '{n} won', chDraw: 'Draw! 🤝', chWins: '{n} wins! 🏆', chRecord: 'Your record', chVsApp: 'Against the app', chVsFam: 'Against family', chWDL: '{w} won · {l} lost · {d} drawn',
  chCard: ['Question chess', 'Chess where every move costs a question – against the app or the family!'], chPromo: 'What should your pawn become?', chNoQs: 'There are no questions for this subject – choose another subject.',
  chSendFail: 'Could not send – check the internet and try again.', chOnlineOnly: 'Family games and the chat only work on the family’s Leerhoek website (with your link).', chWho: 'Who are you?', chWhoSub: 'Choose your name to play or chat.',
  chParentT: '♟️ Chess & 💬 Family chat', chParentSub: 'Play question chess against the boys (or the app), and chat together in the family chat.', chIAmL: 'I am:', chPlay: '♟️ Play chess', chChat: '💬 Family chat',
  chApp: 'The app', chLife: 'Removes two wrong answers', chYou: 'You', chLast: 'Last move', chExpired: 'Expired', chNewGameBtn: '➕ New game', chPickWhite: 'White starts',
  chatT: 'Family chat', chatSub: 'Only for Diaan, Stefan, Mom and Dad – nobody else can see it.', chatPh: 'Type a message…', chatSend: 'Send', chatEmpty: 'No messages yet. Say hello! 👋', chatOpen: 'Chat',
  chatQuick: ['Hello! 👋', 'Good move! 👏', 'Your turn! ⏰', 'Haha 😂', 'Come play chess ♟️', 'Busy studying 📚', 'Love you all ❤️'],
  chatSys: { inv: '♟️ {a} challenged {b} to question chess', acc: '♟️ {b} accepted – the game has started!', win: '🏆 {a} won the chess game against {b} ({r})', draw: '🤝 {a} and {b} drew ({r})' },
  fam: { pa: 'Dad', ma: 'Mom' }, navChess: 'Chess', navChat: 'Chat',
  lockNote: '🔒 This device is only for {n}. Mom and Dad can see everything with the PIN.', lockParent: '👪 Parent device: tap a boy to see his profile (with the parent PIN).', adminView: '👪 Parent view – you are looking at {n}’s profile.', adminBack: '← Parent panel', adminOpen: 'Open a profile:', specT: '👀 Other games in the family',
  devT: '📱 This device', devSub: 'Every device belongs to one person. A boy only sees his own profile – he can’t switch to his brother’s. Mom and Dad (with the PIN) can see everything. The family link (~diaan / ~stefan / ~ouer) links a device automatically.', devNow: 'Now linked to:', devNone: 'nobody yet – the first profile chosen locks it', devParent: 'Mom/Dad (parent device)', devUnlock: 'Unlink', devSet: 'Device linked ✔',
});
const tf = (k, o) => String(t(k)).replace(/\{(\w+)\}/g, (m, x) => (o && o[x] !== undefined ? o[x] : m));
const tfa = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, x) => (o && o[x] !== undefined ? o[x] : m));
const FAMILY = KIDS.map(k => ({ id: k.id, avatar: k.avatar, kid: true })).concat(PARENTS.map(p => ({ id: p.id, avatar: p.avatar })));
function rebuildFamily() { FAMILY.splice(0, FAMILY.length, ...KIDS.map(k => ({ id: k.id, avatar: k.avatar, kid: true })), ...PARENTS.map(p => ({ id: p.id, avatar: p.avatar }))); }
/* v10: games and the circle chat include the other households of the family circle */
const SOCIAL_ALL = () => FAMILY.concat(CIRCLE.map(c => ({ id: c.id, avatar: c.avatar, kid: c.kid, hid: c.hid })));
const isFam = (id) => FAMILY.some(f => f.id === id) || CIRCLE.some(c => c.id === id);
const isKidAny = (id) => KIDS.some(k => k.id === id) || CIRCLE.some(c => c.id === id && c.kid);
function famName(id, lang) {
  const k = KIDS.find(x => x.id === id); if (k) return k.name;
  const c = CIRCLE.find(x => x.id === id); if (c) return c.name;
  const p = PARENTS.find(x => x.id === id), f = UI[lang || L].fam;
  if (p && !HOUSE.legacy) return p.name;
  return (f && f[id]) || (p && p.name) || id;
}
const famAv = (id) => (FAMILY.find(f => f.id === id) || CIRCLE.find(c => c.id === id) || {}).avatar || '🙂';
function parentMe() { try { const v = localStorage.getItem('lh.parentMe'); return PARENTS.some(p => p.id === v) ? v : null; } catch (e) { return null; } }
function setParentMe(v) { try { localStorage.setItem('lh.parentMe', v); } catch (e) {} }
function setAsParent(on) { S.asParent = !!on; try { if (on) sessionStorage.setItem('lh.asParent', '1'); else sessionStorage.removeItem('lh.asParent'); } catch (e) {} }
try { if (sessionStorage.getItem('lh.asParent') === '1') S.asParent = true; } catch (e) {}
const SOCIAL = ['chess', 'chessGame', 'chat'];
/* ---------- one device = one person: a boy's device only opens his own profile, a parent device only the parent side ----------
   localStorage lh.lock = 'diaan' | 'stefan' | 'ouer'. Set by the family link (~diaan / ~stefan / ~ouer), by the first profile picked
   on a new device, or by Pa/Ma in the parent panel (PIN). */
function deviceLock() { try { const v = localStorage.getItem('lh.lock'); return v === 'ouer' || KIDS.some(k => k.id === v) ? v : null; } catch (e) { return null; } }
function setLock(v) { try { if (v) localStorage.setItem('lh.lock', v); else localStorage.removeItem('lh.lock'); } catch (e) {} }
const lockedKid = () => { const l = deviceLock(); return l && l !== 'ouer' ? l : null; };
/* boys only ever open their own profile; Pa and Ma (parent PIN entered) can open any profile – admin view */
const kidAllowed = (id) => { const l = deviceLock(); return !l || l === id || !!S.parentUnlocked; };
const adminViewing = () => !!S.kid && (deviceLock() === 'ouer' || (!!lockedKid() && S.kid.id !== lockedKid()));
function adminBanner() { return adminViewing() ? `<div class="banner adminban" style="margin-bottom:14px"><span>${esc(tf('adminView', { n: S.kid.name }))}</span><button class="btn sm" data-go="ouer">${esc(t('adminBack'))}</button></div>` : ''; }
/* on a boy's own phone, admin view ends as soon as the app is closed or put away */
document.addEventListener('visibilitychange', () => {
  if (!document.hidden || !lockedKid()) return;
  S.parentUnlocked = false; if (S.asParent) setAsParent(false);
  if (S.kid && S.kid.id !== lockedKid()) selectKid(lockedKid()).then(() => { if (S.route && S.route.s !== 'gate') render(); });
});
/* existing installs (before the lock existed): work out who the device belongs to */
function migrateLock(bootRoute) {
  if (deviceLock()) return;
  let remembered = null; try { remembered = localStorage.getItem('lh.kid'); } catch (e) {}
  if (isParentDevice()) setLock('ouer');
  else if (bootRoute.kid) setLock(bootRoute.kid);
  else if (bootRoute.s === 'parent') setLock('ouer');
  else if (remembered && KIDS.some(k => k.id === remembered)) setLock(remembered);
}
/* who is playing / chatting on this device right now */
function me() {
  const lk = deviceLock(), p = parentMe(), par = (x) => ({ id: x, kid: false, name: famName(x), avatar: famAv(x) });
  if (lk === 'ouer') return p ? par(p) : null;
  if (p && S.asParent) return par(p); // Pa or Ma on a boy's device, after the PIN
  if (S.kid) return { id: S.kid.id, kid: true, name: S.kid.name, avatar: S.kid.avatar };
  if (!lk && p && isParentDevice()) return par(p);
  return null;
}
function deviceCard() {
  const l = deviceLock(), nm = l === 'ouer' ? t('devParent') : l ? famName(l) : t('devNone');
  return `<div class="card" style="margin-top:14px" id="devCard"><h3>${esc(t('devT'))}</h3><p class="small muted" style="margin:4px 0 10px">${esc(t('devSub'))}</p>
    <p class="small"><b>${esc(t('devNow'))}</b> ${l && l !== 'ouer' ? famAv(l) + ' ' : l ? '👪 ' : ''}${esc(nm)}</p>
    <div class="row" style="gap:6px;margin-top:10px">${KIDS.map(k => `<button class="btn sm ${l === k.id ? 'subject' : ''}" data-lock="${k.id}">${k.avatar} ${esc(k.name)}</button>`).join('')}<button class="btn sm ${l === 'ouer' ? 'subject' : ''}" data-lock="ouer">👪 ${esc(t('devParent'))}</button>${l ? `<button class="btn sm ghost" data-lock="">${esc(t('devUnlock'))}</button>` : ''}</div>
    <p class="small" style="margin-top:14px"><b>👀 ${esc(t('adminOpen'))}</b></p><div class="row" style="gap:6px;margin-top:6px">${KIDS.map(k => `<button class="btn sm" data-view="${k.id}">${k.avatar} ${esc(k.name)}</button>`).join('')}</div></div>`;
}
function wireDeviceCard(root) {
  const card = $('#devCard', root); if (!card) return;
  card.querySelectorAll('[data-lock]').forEach(b => b.onclick = async () => {
    const v = b.dataset.lock || null; setLock(v);
    if (v && v !== 'ouer') { await selectKid(v); } else if (v === 'ouer') { S.kid = null; S.kidId = null; try { localStorage.removeItem('lh.kid'); } catch (e) {} renderWho(); }
    toast(t('devSet')); card.outerHTML = deviceCard(); wireDeviceCard(root); nav(); updateSocialUi();
  });
  card.querySelectorAll('[data-view]').forEach(b => b.onclick = async () => { await selectKid(b.dataset.view); go('home'); });
}
const online = () => S.storeKind === 'supa';
const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
function lsGet(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
function lsSet(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function lhAfterUnlock() {
  const to = S.afterUnlock; S.afterUnlock = null; if (!to) return false;
  if (KIDS.some(k => k.id === to)) { selectKid(to).then(() => go('home')); return true; }
  if (parentMe()) { setAsParent(true); go(to); return true; }
  return false;
}


/* ================================================================== v8: Vraag-speletjies (5 games), notifications for the boys, study schedule */
Object.assign(UI.af, {
  qgT: 'Vraag-speletjies', qgSub: 'Elke skuif kos ’n vraag! Antwoord reg en binne die tyd, anders is jou beurt verby. Kies ’n speletjie – party is slim-speletjies, ander is meer geluk.',
  qgHow: ['Kies ’n speletjie en teen wie jy speel: die app, iemand in die familie (elkeen op sy eie foon) of op dieselfde foon.', 'Wanneer jy ’n skuif maak, spring ’n vraag op – antwoord voordat die tyd op is.', 'Reg ✅ – jou skuif word gemaak. Verkeerd of te stadig ❌ – jou skuif tel nie en dit is die ander speler se beurt.', 'Skaak: staan jy skaak en antwoord jy verkeerd, mag die ander speler jou koning vang!', 'Slange & Lere is net geluk – die app moet daar ook “antwoord”, en op Maklik mis hy die meeste.', 'Elke spel verdien XP, en verkeerde antwoorde gaan in jou foute-boek.'],
  qgWhich: 'Watter speletjie?',
  qgN: { chess: 'Skaak', checkers: 'Dambord', four: 'Vier-op-’n-ry', ships: 'Seeslag', snakes: 'Slange & Lere' },
  qgD: { chess: 'Die koning van slim-speletjies', checkers: 'Spring oor en vang', four: 'Kry vier in ’n ry', ships: 'Soek en sink die vloot', snakes: 'Geluk met die dobbelsteen' },
  qgCard: ['Vraag-speletjies', 'Skaak, Dambord, Vier-op-’n-ry, Seeslag en Slange & Lere – elke skuif kos ’n vraag!'],
  qgChallenges: '{n} daag jou uit vir {g}!', qgWho1: 'Wie begin?', qgMeFirst: '🥇 Ek begin', qgThemFirst: '🥈 Hulle begin', qgRed: 'Rooi', qgYellow: 'Geel',
  qgAppSmart: 'Hoe slim is die app?', qgAppSmartHint: 'Die app moet ook “antwoord”: op Maklik mis hy die meeste vrae.', qgAppMissed: '🤖 Die app het sy vraag gemis!',
  qgTapCol: 'Tik op ’n kolom – tik weer om jou skyf te laat val', qgTapCol2: 'Tik weer op die kolom om te laat val (of kies ’n ander een)',
  qgTapCell: 'Kies ’n blokkie in {n} se see – tik weer om te skiet', qgTapCell2: 'Tik weer op die 🎯 om te skiet (of kies ’n ander blokkie)',
  qgTapDice: 'Tik op die dobbelsteen om te gooi', qgRoll: 'Gooi', qgMustTake: 'Jy móét vang – kies een van die stukke wat gloei.',
  qgEnemySea: '{n} se see', qgMyFleet: 'Jou vloot', qgFleetOf: '{n} se vloot', qgShipsLeft: 'skepe oor', qgSquare: 'blokkie', qgPieces: 'stukke', qgKings: 'konings', qgCol: 'kolom',
  qgShoot: 'Skiet op {c}', qgDrop: 'Laat val in kolom {c}', qgRollQ: 'Gooi die dobbelsteen', qgHit: '💥 Treffer!', qgMiss: '🌊 Mis', qgSunk: '🚢 Gesink!', qgLadder: '🪜 Leer op!', qgSnake: '🐍 Slang af!', qgJump: '✖ {n} gevang', qgCrown: '👑 Koning!',
  qgResRec: '{w} gewen · {l} verloor · {d} gelykop',
  qgPickGame: 'Kies eers ’n speletjie',
  /* notifications for the boys */
  kpT: '🔔 Kennisgewings op my foon', kpSub: 'Kry ’n boodskap as iemand jou uitdaag, as dit jou beurt is, as iemand in die klets skryf – en jou leer-herinneringe.', kpOn: 'Skakel aan', kpIsOn: 'Kennisgewings is aan op hierdie foon', kpOff: 'Skakel af', kpTest: 'Toets', kpTestMsg: 'Dit werk! Jy sal nou kennisgewings van Leerhoek kry. 🎉', kpIos: 'Op ’n iPhone werk kennisgewings net as jy Leerhoek oopmaak vanaf die ikoon op jou tuisskerm (iOS 16.4 of nuwer).', kpDenied: 'Kennisgewings is afgeskakel in jou foon se instellings. Skakel dit aan by Instellings → Leerhoek → Kennisgewings.', kpNo: 'Hierdie blaaier ondersteun nie kennisgewings nie.', kpLater: 'Later',
  /* study schedule */
  roT: 'My rooster', roSub: 'Watter toetse en eksamens kom, en wat jy vandag moet leer.', roToday: 'Vandag leer', roNothing: 'Niks dringends vandag nie – doen jou daaglikse plan of speel ’n vraag-speletjie! 🎮', roNext: 'Wat kom', roNone: 'Nog geen toetse of eksamens op die rooster nie. Pa of Ma sit dit by in die ouerpaneel.', roTest: 'Toets', roExam: 'Eksamen', roStart: 'Begin leer', roStarted: 'Leer nou!', roIn: 'oor {n} dae', roTomorrow: 'môre', roToday2: 'vandag', roOpen: 'Leer ▶', roHome: 'Volgende', roPlan: 'Vandag se plan', roLast: 'Laaste hersiening vanaand!',
  teT: '📝 Toetse, rooster & herinneringe', teSub: 'Sit die seuns se toetse hier by (die eksamenrooster is in die afbakening hierbo). Die seuns sien dit in “My rooster” en kry herinneringe op hul fone.', teFor: 'Vir', teBoth: 'Albei', teSubj: 'Vak', teDate: 'Datum', teWhat: 'Wat (bv. Hfst 3 toets)', teAdd: '➕ Voeg toets by', teNone: 'Nog geen toetse nie.', teDel: 'Verwyder',
  reT: '⏰ Herinneringe', reOn: 'Stuur leer-herinneringe na die seuns se fone', reStudy: 'Leer-herinnering (skooldae)', reWeekend: 'Naweek', reEvening: 'Aand voor ’n toets', reMorning: 'Oggend van die toets', reTestDays: 'Begin leer vir ’n toets … dae voor', reExamDays: 'Begin leer vir ’n eksamen … dae voor', reParents: 'Stuur ’n kopie aan Pa en Ma', reSaved: 'Herinneringe gestoor',
  rePlanWhy: 'toets oor {n} dae',
});
Object.assign(UI.en, {
  qgT: 'Question games', qgSub: 'Every move costs a question! Answer correctly and in time, or your turn is over. Pick a game – some are thinking games, others are more luck.',
  qgHow: ['Choose a game and who you play: the app, someone in the family (each on their own phone) or on the same phone.', 'When you make a move, a question pops up – answer before the time runs out.', 'Right ✅ – your move is made. Wrong or too slow ❌ – your move doesn’t count and it’s the other player’s turn.', 'Chess: if you are in check and answer wrong, the other player may capture your king!', 'Snakes & Ladders is pure luck – the app has to “answer” too, and on Easy it misses the most.', 'Every game earns XP, and wrong answers go into your mistakes book.'],
  qgWhich: 'Which game?',
  qgN: { chess: 'Chess', checkers: 'Checkers', four: 'Four in a row', ships: 'Battleships', snakes: 'Snakes & Ladders' },
  qgD: { chess: 'The king of thinking games', checkers: 'Jump over and capture', four: 'Get four in a row', ships: 'Find and sink the fleet', snakes: 'Luck with the dice' },
  qgCard: ['Question games', 'Chess, Checkers, Four in a row, Battleships and Snakes & Ladders – every move costs a question!'],
  qgChallenges: '{n} challenges you to {g}!', qgWho1: 'Who starts?', qgMeFirst: '🥇 I start', qgThemFirst: '🥈 They start', qgRed: 'Red', qgYellow: 'Yellow',
  qgAppSmart: 'How smart is the app?', qgAppSmartHint: 'The app has to “answer” too: on Easy it misses the most questions.', qgAppMissed: '🤖 The app missed its question!',
  qgTapCol: 'Tap a column – tap again to drop your disc', qgTapCol2: 'Tap the column again to drop (or pick another one)',
  qgTapCell: 'Pick a square in {n}’s sea – tap again to fire', qgTapCell2: 'Tap the 🎯 again to fire (or pick another square)',
  qgTapDice: 'Tap the dice to roll', qgRoll: 'Roll', qgMustTake: 'You must capture – pick one of the glowing pieces.',
  qgEnemySea: '{n}’s sea', qgMyFleet: 'Your fleet', qgFleetOf: '{n}’s fleet', qgShipsLeft: 'ships left', qgSquare: 'square', qgPieces: 'pieces', qgKings: 'kings', qgCol: 'column',
  qgShoot: 'Fire at {c}', qgDrop: 'Drop in column {c}', qgRollQ: 'Roll the dice', qgHit: '💥 Hit!', qgMiss: '🌊 Miss', qgSunk: '🚢 Sunk!', qgLadder: '🪜 Up the ladder!', qgSnake: '🐍 Down the snake!', qgJump: '✖ {n} captured', qgCrown: '👑 King!',
  qgResRec: '{w} won · {l} lost · {d} drawn',
  qgPickGame: 'Choose a game first',
  kpT: '🔔 Notifications on my phone', kpSub: 'Get a message when someone challenges you, when it’s your turn, when someone writes in the chat – and your study reminders.', kpOn: 'Turn on', kpIsOn: 'Notifications are on for this phone', kpOff: 'Turn off', kpTest: 'Test', kpTestMsg: 'It works! You will now get notifications from Leerhoek. 🎉', kpIos: 'On an iPhone notifications only work when you open Leerhoek from the icon on your home screen (iOS 16.4 or newer).', kpDenied: 'Notifications are switched off in your phone’s settings. Turn them on at Settings → Leerhoek → Notifications.', kpNo: 'This browser does not support notifications.', kpLater: 'Later',
  roT: 'My schedule', roSub: 'Which tests and exams are coming, and what to study today.', roToday: 'Study today', roNothing: 'Nothing urgent today – do your daily plan or play a question game! 🎮', roNext: 'Coming up', roNone: 'No tests or exams on the schedule yet. Mom or Dad adds them in the parent panel.', roTest: 'Test', roExam: 'Exam', roStart: 'Start studying', roStarted: 'Study now!', roIn: 'in {n} days', roTomorrow: 'tomorrow', roToday2: 'today', roOpen: 'Study ▶', roHome: 'Next', roPlan: 'Today’s plan', roLast: 'Last revision tonight!',
  teT: '📝 Tests, schedule & reminders', teSub: 'Add the boys’ tests here (the exam timetable is in the scope editor above). The boys see them in “My schedule” and get reminders on their phones.', teFor: 'For', teBoth: 'Both', teSubj: 'Subject', teDate: 'Date', teWhat: 'What (e.g. Ch 3 test)', teAdd: '➕ Add test', teNone: 'No tests yet.', teDel: 'Remove',
  reT: '⏰ Reminders', reOn: 'Send study reminders to the boys’ phones', reStudy: 'Study reminder (school days)', reWeekend: 'Weekend', reEvening: 'Evening before a test', reMorning: 'Morning of the test', reTestDays: 'Start studying for a test … days before', reExamDays: 'Start studying for an exam … days before', reParents: 'Send a copy to Mom and Dad', reSaved: 'Reminders saved',
  rePlanWhy: 'test in {n} days',
});
Object.assign(UI.af.chRes, { allgone: 'Al die stukke gevang', blocked: 'Kan nie meer skuif nie', quiet: '40 skuiwe sonder vang – gelykop', four: 'Vier op ’n ry!', full: 'Die bord is vol – gelykop', sunk: 'Die hele vloot gesink!', finish: 'Eerste op 100!' });
Object.assign(UI.en.chRes, { allgone: 'All pieces captured', blocked: 'Cannot move any more', quiet: '40 moves without a capture – draw', four: 'Four in a row!', full: 'The board is full – draw', sunk: 'The whole fleet sunk!', finish: 'First to 100!' });
UI.af.chatSys = { inv: '🎲 {a} het {b} uitgedaag vir {g}', acc: '🎲 {b} het aanvaar – {g} het begin!', win: '🏆 {a} het {g} teen {b} gewen ({r})', draw: '🤝 {a} en {b} het {g} gelykop gespeel ({r})' };
UI.en.chatSys = { inv: '🎲 {a} challenged {b} to {g}', acc: '🎲 {b} accepted – {g} has started!', win: '🏆 {a} won {g} against {b} ({r})', draw: '🤝 {a} and {b} drew {g} ({r})' };
Object.assign(UI.af, { chParentT: '🎲 Speletjies & 💬 Familie-klets', chParentSub: 'Speel Vraag-speletjies teen die seuns (of teen die app), en gesels saam in die familie-klets.', chPlay: '🎲 Speel', navChess: 'Speel', chatQuick: ['Hallo! 👋', 'Goeie skuif! 👏', 'Jou beurt! ⏰', 'Haha 😂', 'Kom speel ’n speletjie 🎲', 'Ek is besig met leer 📚', 'Lief vir julle ❤️'] });
Object.assign(UI.en, { chParentT: '🎲 Games & 💬 Family chat', chParentSub: 'Play question games against the boys (or the app), and chat together in the family chat.', chPlay: '🎲 Play', navChess: 'Play', chatQuick: ['Hello! 👋', 'Good move! 👏', 'Your turn! ⏰', 'Haha 😂', 'Come play a game 🎲', 'Busy studying 📚', 'Love you all ❤️'] });
UI.af.ev.remind = 'Leer-herinnering gestuur'; UI.en.ev.remind = 'Study reminder sent';

/* ---------- Vraag-speletjies: shared game model ----------
   One family game = an append-only event log (kv "chess/g/<id>" for every game type; the first event { t:'new', game } says which game).
   Local games (app / same phone) live in localStorage "lh.chess.loc.<player>". */
function pname(id, cfg, lang) { if (id === 'app') return (UI[lang || L].chApp); if (id === 'friend') return (cfg && cfg.fn) || UI[lang || L].chFriend; return famName(id, lang); }
const pav = (id) => id === 'app' ? '🤖' : id === 'friend' ? '🙂' : famAv(id);
const gname = (g, lang) => (UI[lang || L].qgN || {})[g || 'chess'] || g;
const GICON = { chess: '♟️', checkers: '⛀', four: '🔴', ships: '🚢', snakes: '🎲' };
const GORDER = ['chess', 'checkers', 'four', 'ships', 'snakes'];
const QG = {}; // game id → module (rules + board UI), filled below

function qgReplay(evs) {
  const nw = (evs || []).find(e => e && e.t === 'new'); if (!nw) return null;
  const G = QG[nw.game || 'chess']; if (!G) return null;
  const R = { cfg: nw, G, game: G.id, st: G.init(nw), ply: 0, status: nw.kind === 'online' ? 'invite' : 'active', hist: [], stats: { w: { ok: 0, n: 0 }, b: { ok: 0, n: 0 } }, last: null, result: null, updated: nw.at || 0, n: 0, lastInfo: null };
  const who = (c) => c === 'w' ? nw.w : nw.b;
  const colorOf = (id) => id === nw.w ? 'w' : id === nw.b ? 'b' : null;
  const invitee = nw.by === nw.w ? nw.b : nw.w;
  for (const e of evs) {
    if (!e || e === nw) continue; R.n++;
    if (e.at) R.updated = Math.max(R.updated, e.at);
    if (R.status === 'invite') {
      if (e.t === 'acc' && e.by === invitee) R.status = 'active';
      else if (e.t === 'dec' && e.by === invitee) R.status = 'declined';
      else if (e.t === 'can' && e.by === nw.by) R.status = 'cancelled';
      continue;
    }
    if (R.status !== 'active') continue;
    if (e.t === 'res') { const c = colorOf(e.by); if (!c) continue; R.status = 'over'; R.result = { res: 'res', winner: CHESS.other(c), by: e.by }; continue; }
    const c = G.turn(R.st);
    if ((e.t !== 'mv' && e.t !== 'miss') || e.n !== R.ply || e.by !== who(c)) continue;
    let info = null;
    if (e.t === 'mv') {
      const r = G.apply(R.st, e); if (!r) continue;
      R.st = r.st; info = Object.assign({ c }, r.info); R.last = G.lastOf ? G.lastOf(info) : null;
      R.hist.push({ c, by: e.by, e, info, at: e.at });
      if (e.q) { R.stats[c].n++; R.stats[c].ok++; }
    } else {
      R.st = G.pass(R.st); R.hist.push({ c, by: e.by, e, miss: true, at: e.at }); R.stats[c].n++;
    }
    R.ply++; R.lastInfo = info;
    const st = G.status(R.st, info);
    if (st.over) { R.status = 'over'; R.result = { res: st.res, winner: st.winner || null, line: st.line }; }
  }
  R.ms = R.status === 'active' ? G.status(R.st, R.lastInfo) : null;
  R.cur = R.status === 'active' ? G.turn(R.st) : null;
  R.toMove = R.cur ? who(R.cur) : null;
  R.colorOf = colorOf; R.who = who; R.invitee = invitee;
  return R;
}
const chessReplay = qgReplay; // older name, still used in a few places
function resultText(R, lang) {
  const U = UI[lang || L], r = R.result; if (!r) return '';
  if (r.res === 'res') return tfa(U.chRes.res, { n: pname(r.by, R.cfg, lang) });
  return U.chRes[r.res] || r.res;
}

/* ---------- chess pieces ---------- */
const PIECE_SHAPES = {
  p: '<path d="M22.5 9.5a4.6 4.6 0 0 0-3.4 7.7 6.3 6.3 0 0 0-2.6 5.1 6.2 6.2 0 0 0 2.4 4.9c-3.6 1.5-6.4 5.2-6.9 9.8h21c-.5-4.6-3.3-8.3-6.9-9.8a6.2 6.2 0 0 0 2.4-4.9 6.3 6.3 0 0 0-2.6-5.1 4.6 4.6 0 0 0-3.4-7.7z"/><rect x="10.5" y="36.5" width="24" height="3.5" rx="1.6"/>',
  r: '<path d="M11 9.5h4.2v3h4.4v-3h5.8v3h4.4v-3H34v6.2l-3.2 2.8v11l2.2 3.6H12l2.2-3.6v-11L11 15.7z"/><rect x="9.5" y="33.5" width="26" height="6.5" rx="1.8"/><path class="d" d="M14.2 18.5h16.6M14.2 29.5h16.6"/>',
  n: '<path d="M14 36.5c.3-4.6 2.6-7.6 5.6-10.3 1.5-1.4 2-3.1 1.6-4.6-1.6 1.6-3.8 2.4-6.1 3.4-1.8.8-3.1 2.4-4.6 2.1-1.8-.4-2.6-2.4-1.9-4.2 1.4-3.6 4.4-6.4 6.9-9.4 1-1.2 1.5-2.6 1.6-4.1l1.3-2.9 2.2 2.5c1.7-.6 3.4-.7 5-.2 6 1.9 9 8.4 9 15.6v12.1z"/><rect x="11" y="36" width="23.5" height="4" rx="1.8"/><circle class="e" cx="18.6" cy="15.6" r="1.5"/><path class="d" d="M24.6 12.2c3.5 1.6 5.7 5.6 6.2 10.6"/>',
  b: '<circle cx="22.5" cy="8.3" r="2.7"/><path d="M22.5 11.3c-5.5 3.8-8.3 8.6-7.5 13.4.4 2.3 1.6 3.9 3 4.8h9c1.4-.9 2.6-2.5 3-4.8.8-4.8-2-9.6-7.5-13.4z"/><path d="M16.5 29h12l1.8 4.5H14.7z"/><rect x="10.5" y="34" width="24" height="5.8" rx="2.4"/><path class="d" d="M25.4 15.6l-4.6 6.2M19.3 25.3h6.4"/>',
  q: '<circle cx="8.6" cy="12.6" r="2.4"/><circle cx="15.7" cy="9.4" r="2.4"/><circle cx="22.5" cy="7.8" r="2.4"/><circle cx="29.3" cy="9.4" r="2.4"/><circle cx="36.4" cy="12.6" r="2.4"/><path d="M12.6 31.2L9 14.2l6.8 10.3.2-13.6 4.6 12.6 1.9-13.7 1.9 13.7 4.6-12.6.2 13.6L36 14.2l-3.6 17z"/><rect x="11.5" y="31" width="22" height="3.6" rx="1.4"/><rect x="9.5" y="35.6" width="26" height="4.4" rx="2"/>',
  k: '<path d="M21 4.5h3v3h3v3h-3v3.4h-3v-3.4h-3v-3h3z"/><path d="M12.6 32.4c-3.1-5.2-4.6-10.3-1.6-13.3 3.1-3.1 7.9-2 11.5 2.6 3.6-4.6 8.4-5.7 11.5-2.6 3 3 1.5 8.1-1.6 13.3z"/><rect x="11.5" y="32" width="22" height="3.4" rx="1.4"/><rect x="9.5" y="36" width="26" height="4" rx="2"/><path class="d" d="M22.5 21.7v10.4"/>',
};
function pieceSvg(pc) { const w = pc === pc.toUpperCase(); return `<svg class="pc ${w ? 'w' : 'b'}" viewBox="0 0 45 45" aria-hidden="true">${PIECE_SHAPES[pc.toLowerCase()]}</svg>`; }
const PIECE_NAMES = { af: { p: 'pion', n: 'perd', b: 'loper', r: 'toring', q: 'koningin', k: 'koning' }, en: { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' } };
const START_COUNT = { p: 8, n: 2, b: 2, r: 2, q: 1 };
function capturedBy(pos, c) {
  const opp = c === 'w' ? 'b' : 'w', have = { p: 0, n: 0, b: 0, r: 0, q: 0 };
  pos.b.forEach(pc => { if (pc && CHESS.colorOf(pc) === opp && have[pc.toLowerCase()] !== undefined) have[pc.toLowerCase()]++; });
  const out = []; ['q', 'r', 'b', 'n', 'p'].forEach(k => { for (let i = have[k]; i < START_COUNT[k]; i++) out.push(opp === 'w' ? k.toUpperCase() : k); });
  return out;
}
const MAT = { p: 1, n: 3, b: 3, r: 5, q: 9 };
const matOf = (arr) => arr.reduce((a, pc) => a + MAT[pc.toLowerCase()], 0);
const discHtml = (c, king) => `<span class="disc ${c}${king ? ' king' : ''}">${king ? '<span class="crown">♛</span>' : ''}</span>`;
const sqA = (s) => CHESS.sqName(s);

/* ---------- board helpers shared by chess and checkers ---------- */
function gridBoard(el, onTap) {
  el.classList.add('cboard');
  el.innerHTML = Array.from({ length: 64 }, (_, i) => `<button class="csq" data-i="${i}"></button>`).join('');
  el.onclick = (e) => { const b = e.target.closest('.csq'); if (b) onTap(+b.dataset.sq); };
  return [...el.children];
}
function slideIn(cells, a, sel) {
  const toI = cells.findIndex(el => +el.dataset.sq === a.t), fromI = cells.findIndex(el => +el.dataset.sq === a.f);
  const node = cells[toI] && cells[toI].querySelector(sel);
  if (!node || fromI < 0) return;
  const dx = (fromI % 8) - (toI % 8), dy = Math.floor(fromI / 8) - Math.floor(toI / 8);
  node.style.transform = `translate(${dx * 100}%, ${dy * 100}%)`; node.style.zIndex = 3;
  requestAnimationFrame(() => requestAnimationFrame(() => { node.style.transition = 'transform .3s cubic-bezier(.2,.8,.2,1)'; node.style.transform = ''; }));
}
const coordHtml = (bc, r, f) => `${(bc === 'w' ? r === 7 : r === 0) ? `<span class="cf">${'abcdefgh'[f]}</span>` : ''}${(bc === 'w' ? f === 0 : f === 7) ? `<span class="cr">${8 - r}</span>` : ''}`;

/* ===== ♟️ Skaak ===== */
QG.chess = {
  id: 'chess', flip: true, colors: { w: '⚪', b: '⚫' }, colorLabel: (c) => c === 'w' ? t('chW') : t('chB'),
  init: () => CHESS.start(), turn: (p) => p.t, pass: CHESS.pass,
  apply(p, e) { const m = CHESS.legal(p).find(x => x.f === e.f && x.t === e.to && (x.pr || '') === (e.pr || '')); return m ? { st: CHESS.apply(p, m), info: { m } } : null; },
  status(p, info) { if (info && info.m && CHESS.isKing(info.m.x)) return { over: true, res: 'kingx', winner: info.c }; return CHESS.status(p); },
  lastOf: (info) => ({ f: info.m.f, t: info.m.t }),
  ai(p, lvl) { const m = CHESS.bestMove(p, lvl); return m ? { f: m.f, to: m.t, pr: m.pr || undefined } : null; },
  label(e, st) { const pc = st.b[e.f] || 'P'; const x = st.b[e.to]; return { icon: pieceSvg(pc), text: `${sqA(e.f)} → ${sqA(e.to)}${x ? ' ✖ ' + PIECE_NAMES[L][x.toLowerCase()] : ''}`, piece: pc }; },
  logText(h) {
    if (h.miss) return h.e.p ? `(${esc(PIECE_NAMES[L][h.e.p.toLowerCase()])} ${sqA(h.e.f)}→${sqA(h.e.to)})` : '';
    const m = h.info.m; return `${esc(PIECE_NAMES[L][m.p.toLowerCase()])} ${sqA(m.f)}→${sqA(m.t)}${m.x ? ' ✖ ' + esc(PIECE_NAMES[L][m.x.toLowerCase()]) : ''}${m.pr ? ' = ' + esc(PIECE_NAMES[L][m.pr]) : ''}${m.cs ? ' (0-0' + (m.cs.toLowerCase() === 'q' ? '-0' : '') + ')' : ''}`;
  },
  barExtra(R, c) { const caps = capturedBy(R.st, c), diff = matOf(caps) - matOf(capturedBy(R.st, CHESS.other(c))); return `<span class="cp-caps">${caps.map(pc => pieceSvg(pc)).join('')}${diff > 0 ? `<span class="small muted">+${diff}</span>` : ''}</span>`; },
  prompt(R, ui) {
    const st = R.ms, opp = pname(R.cfg[CHESS.other(R.cur)], R.cfg);
    if (st.canTakeKing) return `👑 ${esc(tf('chTakeKing', { n: opp }))}`;
    if (st.check) return `⚠️ <b>${esc(t('chCheck'))}</b> ${esc(t('chInCheck'))}`;
    return esc(ui.sel === null ? t('chTapPiece') : t('chTapTarget'));
  },
  waitNote(R) { return R.ms && R.ms.check && !R.ms.canTakeKing ? `⚠️ <b>${esc(t('chCheck'))}</b> · ` : ''; },
  board(api) {
    const ui = { sel: null }; let cells;
    const onTap = (sq) => {
      if (!api.canAct()) { api.blocked(); return; }
      const R = api.R(), st = R.ms, pc = R.st.b[sq];
      if (ui.sel !== null) { const mv = st.moves.filter(m => m.f === ui.sel && m.t === sq); if (mv.length) { const from = ui.sel; ui.sel = null; promo(mv, from); return; } }
      if (pc && CHESS.colorOf(pc) === R.st.t && st.moves.some(m => m.f === sq)) { ui.sel = ui.sel === sq ? null : sq; sfx('tap'); } else ui.sel = null;
      api.repaint();
    };
    const promo = (mvs) => {
      const go2 = (m) => api.attempt({ f: m.f, to: m.t, pr: m.pr || undefined });
      if (mvs.length > 1 && mvs[0].pr) {
        const ov = document.createElement('div'); ov.className = 'overlay'; const c = api.R().st.t;
        ov.innerHTML = `<div class="modal"><h2 style="margin-bottom:12px">${esc(t('chPromo'))}</h2><div class="cpromo">${['q', 'r', 'b', 'n'].map(p => `<button data-pr="${p}" aria-label="${esc(PIECE_NAMES[L][p])}">${pieceSvg(c === 'w' ? p.toUpperCase() : p)}</button>`).join('')}</div></div>`;
        document.body.appendChild(ov);
        ov.querySelectorAll('[data-pr]').forEach(b => b.onclick = () => { ov.remove(); go2(mvs.find(m => m.pr === b.dataset.pr)); });
        return;
      }
      go2(mvs[0]);
    };
    cells = gridBoard(api.el, onTap);
    return {
      ui,
      paint(R, pend, anim) {
        const bc = api.bottomColor(), st = R.ms, pos = R.st;
        api.el.classList.toggle('flipped', bc === 'b');
        const kingInCheck = R.status !== 'active' || !st ? -1 : st.canTakeKing ? pos.b.indexOf(pos.t === 'w' ? 'k' : 'K') : st.check ? pos.b.indexOf(pos.t === 'w' ? 'K' : 'k') : -1;
        const targets = ui.sel !== null && st ? st.moves.filter(m => m.f === ui.sel).map(m => m.t) : [];
        cells.forEach((el, i) => {
          const sq = bc === 'w' ? i : 63 - i, r = sq >> 3, f = sq & 7, pc = pos.b[sq];
          el.dataset.sq = sq;
          el.className = 'csq ' + ((r + f) % 2 ? 'dk' : 'lt') + (R.last && (R.last.f === sq || R.last.t === sq) ? ' last' : '') + (ui.sel === sq ? ' sel' : '') + (targets.includes(sq) ? (pc ? ' tgt cap' : ' tgt') : '') + (sq === kingInCheck ? ' chk' : '') + (pend && (pend.f === sq || pend.to === sq) ? ' pend' : '');
          el.innerHTML = coordHtml(bc, r, f) + (pc ? pieceSvg(pc) : '');
          el.setAttribute('aria-label', CHESS.sqName(sq) + (pc ? ' ' + PIECE_NAMES[L][pc.toLowerCase()] : ''));
        });
        if (anim) slideIn(cells, { f: anim.f, t: anim.to }, '.pc');
      },
    };
  },
};

/* ===== ⛀ Dambord ===== */
QG.checkers = {
  id: 'checkers', flip: true, colors: { w: '⚪', b: '⚫' }, colorLabel: (c) => c === 'w' ? t('chW') : t('chB'),
  init: () => ENGINES.CK.init(), turn: (s) => s.t, pass: (s) => ENGINES.CK.pass(s), apply: (s, e) => ENGINES.CK.apply(s, e), status: (s) => ENGINES.CK.status(s),
  lastOf: (info) => ({ f: info.m.f, t: info.m.to }),
  ai(s, lvl) { const m = ENGINES.CK.ai(s, lvl); return m ? { f: m.f, to: m.to, p: m.p } : null; },
  label(e, st) { const pc = st.b[e.f]; const m = ENGINES.CK.moves(st).find(x => x.f === e.f && x.to === e.to); return { icon: discHtml(ENGINES.CK.colorOf(pc), ENGINES.CK.isKing(pc)), text: `${sqA(e.f)} → ${sqA(e.to)}${m && m.caps.length ? ' · ' + tf('qgJump', { n: m.caps.length }) : ''}` }; },
  logText(h) { if (h.miss) return `(${sqA(h.e.f)}→${sqA(h.e.to)})`; const m = h.info.m; return `${sqA(m.f)}→${sqA(m.to)}${m.caps.length ? ' ' + esc(tf('qgJump', { n: m.caps.length })) : ''}${h.info.crowned ? ' ' + esc(t('qgCrown')) : ''}`; },
  barExtra(R, c) { const b = R.st.b; const n = b.filter(p => p && ENGINES.CK.colorOf(p) === c).length, k = b.filter(p => p && ENGINES.CK.colorOf(p) === c && ENGINES.CK.isKing(p)).length; return `<span class="small muted cp-x">${discHtml(c)} ${n}${k ? ` · 👑 ${k}` : ''}</span>`; },
  prompt(R, ui) { return R.ms.mustTake && ui.sel === null ? `⚠️ ${esc(t('qgMustTake'))}` : esc(ui.sel === null ? t('chTapPiece') : t('chTapTarget')); },
  board(api) {
    const ui = { sel: null }; let cells;
    const onTap = (sq) => {
      if (!api.canAct()) { api.blocked(); return; }
      const R = api.R(), ms = R.ms.moves;
      if (ui.sel !== null) { const mv = ms.filter(m => m.f === ui.sel && m.to === sq).sort((a, z) => z.caps.length - a.caps.length); if (mv.length) { ui.sel = null; api.attempt({ f: mv[0].f, to: mv[0].to, p: mv[0].p }); return; } }
      if (ms.some(m => m.f === sq)) { ui.sel = ui.sel === sq ? null : sq; sfx('tap'); } else ui.sel = null;
      api.repaint();
    };
    cells = gridBoard(api.el, onTap);
    api.el.classList.add('ckboard');
    return {
      ui,
      paint(R, pend, anim) {
        const bc = api.bottomColor(), st = R.st, ms = R.ms ? R.ms.moves : [];
        api.el.classList.toggle('flipped', bc === 'b');
        const sel = ui.sel, targets = sel !== null ? ms.filter(m => m.f === sel).map(m => m.to) : [];
        const caps = sel !== null ? ms.filter(m => m.f === sel).flatMap(m => m.caps) : [];
        const movable = R.status === 'active' && api.canActQuiet() && R.ms.mustTake ? ms.map(m => m.f) : [];
        cells.forEach((el, i) => {
          const sq = bc === 'w' ? i : 63 - i, r = sq >> 3, f = sq & 7, pc = st.b[sq];
          el.dataset.sq = sq;
          el.className = 'csq ' + ((r + f) % 2 ? 'dk' : 'lt') + (R.last && (R.last.f === sq || R.last.t === sq) ? ' last' : '') + (sel === sq ? ' sel' : '') + (targets.includes(sq) ? ' tgt' : '') + (caps.includes(sq) ? ' capx' : '') + (movable.includes(sq) ? ' glow' : '') + (pend && (pend.f === sq || pend.to === sq) ? ' pend' : '');
          el.innerHTML = coordHtml(bc, r, f) + (pc ? discHtml(ENGINES.CK.colorOf(pc), ENGINES.CK.isKing(pc)) : '');
          el.setAttribute('aria-label', CHESS.sqName(sq) + (pc ? ' ' + (ENGINES.CK.colorOf(pc) === 'w' ? t('chW') : t('chB')) : ''));
        });
        if (anim) slideIn(cells, { f: anim.f, t: anim.to }, '.disc');
      },
    };
  },
};

/* ===== 🔴 Vier-op-'n-ry ===== */
QG.four = {
  id: 'four', flip: false, colors: { w: '🔴', b: '🟡' }, colorLabel: (c) => c === 'w' ? t('qgRed') : t('qgYellow'),
  init: () => ENGINES.C4.init(), turn: (s) => s.t, pass: (s) => ENGINES.C4.pass(s), apply: (s, e) => ENGINES.C4.apply(s, e), status: (s) => ENGINES.C4.status(s),
  lastOf: (info) => ({ i: info.i }),
  ai: (s, lvl) => ENGINES.C4.ai(s, lvl),
  label(e, st) { return { icon: `<span class="c4d ${st.t === 'w' ? 'r' : 'y'} mini"></span>`, text: tf('qgDrop', { c: e.c + 1 }) }; },
  logText(h) { return h.miss ? `(${esc(t('qgCol'))} ${h.e.c + 1})` : `${h.c === 'w' ? '🔴' : '🟡'} ${esc(t('qgCol'))} ${h.info.c + 1}`; },
  barExtra(R, c) { return `<span class="c4d ${c === 'w' ? 'r' : 'y'} mini"></span>`; },
  prompt(R, ui) { return esc(ui.col === null ? t('qgTapCol') : t('qgTapCol2')); },
  board(api) {
    const ui = { col: null }; const W = 7, H = 6;
    api.el.className = 'c4board';
    api.el.innerHTML = `<div class="c4ghost">${Array.from({ length: W }, (_, c) => `<span data-gc="${c}"></span>`).join('')}</div><div class="c4grid">${Array.from({ length: W * H }, (_, i) => `<button class="c4c" data-c="${i % W}" data-i="${i}" aria-label="${esc(t('qgCol'))} ${(i % W) + 1}"></button>`).join('')}</div>`;
    const cells = [...api.el.querySelectorAll('.c4c')], ghosts = [...api.el.querySelectorAll('[data-gc]')];
    api.el.onclick = (e) => {
      const b = e.target.closest('[data-c],[data-gc]'); if (!b) return;
      if (!api.canAct()) { api.blocked(); return; }
      const c = +(b.dataset.c !== undefined ? b.dataset.c : b.dataset.gc);
      const R = api.R(); if (!R.ms.moves.some(m => m.c === c)) return;
      if (ui.col === c) { ui.col = null; api.attempt({ c }); return; }
      ui.col = c; sfx('tap'); api.repaint();
    };
    return {
      ui,
      paint(R, pend, anim) {
        const g = R.st.g, line = R.result && R.result.line ? R.result.line : [];
        const turnC = R.cur === 'b' ? 'y' : 'r', pc = pend ? pend.c : ui.col;
        ghosts.forEach((gh, c) => { gh.innerHTML = pc === c && R.status === 'active' ? `<span class="c4d ${turnC}"></span>` : ''; });
        cells.forEach((el, i) => {
          const v = g[i];
          el.className = 'c4c' + ((i % W) === pc && R.status === 'active' ? ' colsel' : '') + (line.includes(i) ? ' win' : '') + (R.last && R.last.i === i ? ' last' : '');
          el.innerHTML = v ? `<span class="c4d ${v === 'w' ? 'r' : 'y'}"></span>` : '';
        });
        if (anim && R.last) { const el = cells[R.last.i]; const d = el && el.querySelector('.c4d'); if (d) { const row = Math.floor(R.last.i / W) + 1; d.style.setProperty('--drop', row); d.classList.add('drop'); } }
      },
    };
  },
};

/* ===== 🚢 Seeslag ===== */
const SHN = 8, shipName = (i) => 'ABCDEFGH'[i % SHN] + (Math.floor(i / SHN) + 1);
QG.ships = {
  id: 'ships', flip: false, colors: { w: '🔵', b: '🟠' }, colorLabel: (c) => c === 'w' ? t('qgMeFirst') : t('qgThemFirst'), startsLabel: true,
  init: (cfg) => ENGINES.SH.init(cfg), turn: (s) => s.t, pass: (s) => ENGINES.SH.pass(s), apply: (s, e) => ENGINES.SH.apply(s, e), status: (s) => ENGINES.SH.status(s),
  lastOf: (info) => ({ i: info.to, c: info.c }),
  ai: (s, lvl) => ENGINES.SH.ai(s, lvl),
  label(e) { return { icon: '<span class="qicon">🎯</span>', text: tf('qgShoot', { c: shipName(e.to) }) }; },
  logText(h) { if (h.miss) return `(🎯 ${shipName(h.e.to)})`; const i = h.info; return `🎯 ${shipName(i.to)} ${i.hit ? (i.sunk ? esc(t('qgSunk')) : esc(t('qgHit'))) : esc(t('qgMiss'))}`; },
  barExtra(R, c) { return `<span class="small muted cp-x">🚢 ${ENGINES.SH.shipsLeft(R.st, c)}/5 ${esc(t('qgShipsLeft'))}</span>`; },
  prompt(R, ui) { const o = R.cfg[CHESS.other(R.cur)]; let n = pname(o, R.cfg); if (o === 'app' && L === 'af') n = n.toLowerCase(); return esc(ui.cell === null ? tf('qgTapCell', { n }) : t('qgTapCell2')); },
  board(api) {
    const ui = { cell: null };
    api.el.className = 'shboard';
    api.el.innerHTML = `<div class="shsea"><div class="shcap" id="shCapA"></div><div class="shgrid big" id="shA">${Array.from({ length: SHN * SHN }, (_, i) => `<button class="shc" data-i="${i}" aria-label="${shipName(i)}"></button>`).join('')}</div></div><div class="shsea small"><div class="shcap" id="shCapB"></div><div class="shgrid" id="shB">${Array.from({ length: SHN * SHN }, (_, i) => `<span class="shc" data-j="${i}"></span>`).join('')}</div></div>`;
    const A = [...api.el.querySelectorAll('#shA .shc')], B = [...api.el.querySelectorAll('#shB .shc')];
    api.el.querySelector('#shA').onclick = (e) => {
      const b = e.target.closest('[data-i]'); if (!b) return;
      if (api.spectator()) return;
      if (!api.canAct()) { api.blocked(); return; }
      const i = +b.dataset.i, R = api.R(); if (R.st.shots[R.cur].includes(i)) return;
      if (ui.cell === i) { ui.cell = null; api.attempt({ to: i }); return; }
      ui.cell = i; sfx('tap'); api.repaint();
    };
    const drawSea = (cells, st, fleetC, showShips, pend, sel, lastI) => {
      const shots = st.shots[CHESS.other(fleetC)], fleet = st.fleet[fleetC];
      cells.forEach((el, i) => {
        const ship = ENGINES.SH.shipAt(fleet, i), shot = shots.includes(i), sunk = ship && ENGINES.SH.sunk(ship, shots);
        el.className = 'shc' + (showShips && ship ? ' ship' : '') + (shot ? (ship ? ' hit' : ' miss') : '') + (sunk ? ' sunk' : '') + (sel === i ? ' aim' : '') + (pend === i ? ' aim' : '') + (lastI === i ? ' last' : '');
        el.innerHTML = shot ? (ship ? '💥' : '•') : (sel === i || pend === i ? '🎯' : '');
      });
    };
    return {
      ui,
      paint(R, pend, anim) {
        const st = R.st, spec = api.spectator();
        let me = api.myColor() || (R.cur || 'w');
        if (spec) me = 'w';
        const foe = CHESS.other(me), lastI = R.last ? R.last.i : null;
        $('#shCapA', api.el).textContent = spec ? tf('qgFleetOf', { n: pname(R.cfg.b, R.cfg) }) : tf('qgEnemySea', { n: pname(R.cfg[foe], R.cfg) });
        $('#shCapB', api.el).textContent = spec ? tf('qgFleetOf', { n: pname(R.cfg.w, R.cfg) }) : (api.kind() === 'phone' ? tf('qgFleetOf', { n: pname(R.cfg[me], R.cfg) }) : t('qgMyFleet'));
        drawSea(A, st, foe, spec || R.status === 'over', pend ? pend.to : null, ui.cell, R.last && R.last.c === me ? lastI : null);
        drawSea(B, st, me, true, null, null, R.last && R.last.c === foe ? lastI : null);
        if (anim && R.lastInfo) { const i = R.lastInfo; const el = (i.c === me ? A : B)[i.to]; if (el) { el.classList.add('boom'); } }
      },
    };
  },
};

/* ===== 🎲 Slange & Lere ===== */
const DICE = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
function snakesSvg() {
  const SL = ENGINES.SL, c = SL.cell; let s = '';
  for (const a in SL.LADDERS) {
    const p = c(+a), q = c(SL.LADDERS[a]); const dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy), nx = -dy / len * 1.6, ny = dx / len * 1.6;
    s += `<g class="lad"><line x1="${p.x + nx}" y1="${p.y + ny}" x2="${q.x + nx}" y2="${q.y + ny}"/><line x1="${p.x - nx}" y1="${p.y - ny}" x2="${q.x - nx}" y2="${q.y - ny}"/>`;
    const steps = Math.max(2, Math.round(len / 4)); for (let k = 1; k < steps; k++) { const tt = k / steps; s += `<line class="rung" x1="${p.x + dx * tt + nx}" y1="${p.y + dy * tt + ny}" x2="${p.x + dx * tt - nx}" y2="${p.y + dy * tt - ny}"/>`; }
    s += '</g>';
  }
  let k = 0;
  for (const h in SL.SNAKES) {
    const p = c(+h), q = c(SL.SNAKES[h]); const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2, dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy) || 1;
    const bend = (k++ % 2 ? 1 : -1) * Math.min(9, len / 3), cx1 = mx + (-dy / len) * bend, cy1 = my + (dx / len) * bend;
    const col = ['#16a34a', '#d97706', '#db2777', '#7c3aed', '#0d9488'][k % 5];
    s += `<g class="snk"><path d="M${p.x} ${p.y} Q ${cx1} ${cy1} ${q.x} ${q.y}" stroke="${col}"/><path class="belly" d="M${p.x} ${p.y} Q ${cx1} ${cy1} ${q.x} ${q.y}"/><circle cx="${p.x}" cy="${p.y}" r="2.6" fill="${col}"/><circle cx="${p.x - 0.9}" cy="${p.y - 0.6}" r="0.6" fill="#fff"/><circle cx="${p.x + 0.9}" cy="${p.y - 0.6}" r="0.6" fill="#fff"/></g>`;
  }
  return `<svg class="slsvg" viewBox="0 0 100 100" aria-hidden="true">${s}</svg>`;
}
QG.snakes = {
  id: 'snakes', flip: false, colors: { w: '🔵', b: '🟠' }, colorLabel: (c) => c === 'w' ? t('qgMeFirst') : t('qgThemFirst'), startsLabel: true, luck: true,
  init: () => ENGINES.SL.init(), turn: (s) => s.t, pass: (s) => ENGINES.SL.pass(s), apply: (s, e) => ENGINES.SL.apply(s, e), status: (s) => ENGINES.SL.status(s),
  lastOf: (info) => ({ c: info.c, roll: info.roll }),
  ai: (s, lvl) => ENGINES.SL.ai(s, lvl), aiMiss: (lvl) => ENGINES.SL.AIMISS[lvl] || 0.3,
  finalize: (m) => Object.assign({}, m, { roll: 1 + Math.floor(Math.random() * 6) }),
  label() { return { icon: '<span class="qicon">🎲</span>', text: t('qgRollQ') }; },
  logText(h) { if (h.miss) return ''; const i = h.info; return `🎲 ${i.roll} → ${i.mid}${i.kind ? ` ${i.kind === 'ladder' ? '🪜' : '🐍'} ${i.to}` : ''}`; },
  barExtra(R, c) { return `<span class="small muted cp-x">📍 ${R.st.pos[c] || 0}</span>`; },
  prompt() { return esc(t('qgTapDice')); },
  board(api) {
    const ui = {};
    const nums = []; for (let r = 9; r >= 0; r--) for (let k = 0; k < 10; k++) { const col = k, n = r % 2 === 0 ? r * 10 + col + 1 : r * 10 + (9 - col) + 1; nums.push(n); }
    api.el.className = 'slwrap';
    api.el.innerHTML = `<div class="slboard">${nums.map(n => `<span class="slc ${(Math.floor((n - 1) / 10) + (n - 1) % 10) % 2 ? 'a' : 'b'}${n === 100 ? ' fin' : ''}"><i>${n}</i></span>`).join('')}${snakesSvg()}<span class="tok w" id="tokW"></span><span class="tok b" id="tokB"></span></div>
      <div class="sldice"><button class="btn hi dicebtn" id="slRoll"><span class="die" id="slDie">🎲</span> <span id="slRollT">${esc(t('qgRoll'))}</span></button><span class="small muted" id="slInfo"></span></div>`;
    $('#slRoll', api.el).onclick = () => { if (!api.canAct()) { api.blocked(); return; } api.attempt({ roll: 0 }); };
    let shown = null;
    // a token on 0 has not started yet and waits off the board
    const place = (tok, n, other) => { tok.hidden = !n; if (!n) return; const p = ENGINES.SL.cell(n); const off = other ? 2.4 : 0; tok.style.left = (p.x + off - 4.5) + '%'; tok.style.top = (p.y + off - 4.5) + '%'; };
    return {
      ui,
      paint(R, pend, anim) {
        const st = R.st, tw = $('#tokW', api.el), tb = $('#tokB', api.el);
        tw.textContent = pav(R.cfg.w); tb.textContent = pav(R.cfg.b);
        const same = st.pos.w === st.pos.b;
        const btn = $('#slRoll', api.el), info = $('#slInfo', api.el), die = $('#slDie', api.el);
        btn.disabled = !(R.status === 'active' && api.canActQuiet());
        btn.classList.toggle('pulse', !btn.disabled);
        const li = R.lastInfo;
        if (anim && li && li.roll) {
          // dice roll, then walk to the square, then up the ladder / down the snake
          const tok = li.c === 'w' ? tw : tb, otherPos = st.pos[CHESS.other(li.c)];
          die.classList.add('spin'); die.textContent = DICE[1 + Math.floor(Math.random() * 6)];
          setTimeout(() => { die.classList.remove('spin'); die.textContent = DICE[li.roll]; place(tok, li.mid, li.mid === otherPos); }, 450);
          if (li.kind) setTimeout(() => { place(tok, li.to, li.to === otherPos); toast(li.kind === 'ladder' ? t('qgLadder') : t('qgSnake')); sfx(li.kind === 'ladder' ? 'combo' : 'bad'); }, 1250);
          info.textContent = `${pname(R.cfg[li.c], R.cfg)}: ${li.roll}`;
          shown = JSON.stringify(st.pos);
          place(li.c === 'w' ? tb : tw, st.pos[CHESS.other(li.c)], same);
          return;
        }
        const sig = JSON.stringify(st.pos);
        if (shown !== sig) { place(tw, st.pos.w, false); place(tb, st.pos.b, same); shown = sig; }
        if (li && li.roll) { die.textContent = DICE[li.roll]; info.textContent = `${pname(R.cfg[li.c], R.cfg)}: ${li.roll}`; }
      },
    };
  },
};

/* ---------- storage of games ---------- */
const locKey = (pid) => 'lh.chess.loc.' + pid;
async function chessList(lim) { if (!online()) return []; const rows = await S.store.loadPrefix('chess/g/', lim || (CIRCLE.length ? 40 : 12)); return (rows || []).map(r => ({ id: r.key.slice(8), events: (r.value && r.value.events) || [] })); }
async function chessFetch(id) { const v = await S.store.get('chess/g/' + id); return (v && v.events) || null; }
async function chessAppend(id, ev) { await S.store.rpc('lh_log', { k: 'chess/g/' + id, ev }); }
function chessSetup() { const d = { game: 'chess', mode: 'app', lvl: 'easy', color: 'w', opp: null, popp: null, friend: '', subj: null, secs: 30 }; const v = Object.assign(d, lsGet('lh.chess.setup', {})); if (!QG[v.game]) v.game = 'chess'; return v; }
function saveSetup(su) { lsSet('lh.chess.setup', su); }
function gameStats(kid, game) { if (!kid) return { app: {}, fam: {} }; if (game === 'chess') return kid.chess || { app: {}, fam: {} }; return ((kid.qgames || {})[game]) || { app: {}, fam: {} }; }
function gameStatsW(kid, game) { // writable bucket
  if (game === 'chess') { kid.chess = kid.chess || { app: {}, fam: {}, seen: [] }; return kid.chess; }
  kid.qgames = kid.qgames || {}; kid.qgames[game] = kid.qgames[game] || { app: {}, fam: {} }; return kid.qgames[game];
}
function wdl(o) { o = o || {}; return tf('chWDL', { w: o.w || 0, l: o.l || 0, d: o.d || 0 }); }
/* targeted pushes (lh-notify v2: "to" = family ids; parents' devices match "pa"/"ma"/"parent") */
function pushTo(ids, msg) { ids = (ids || []).filter(x => isFam(x)); if (!ids.length || !online()) return; pushSend(Object.assign({ url: './#skaak' }, msg, { to: ids })); }

/* ---------- social screens: router ---------- */
function renderSocial(main, r) {
  const who = me();
  if (!who) return renderWhoPick(main, r);
  if (who.kid && S.kid && who.id === S.kid.id) ensureSession();
  if (r.s === 'chat') return renderChat(main);
  if (r.s === 'chessGame') return renderQGame(main, r.id);
  return renderChessLobby(main);
}
function renderWhoPick(main, r) {
  const target = r.s === 'chat' ? 'klets' : 'skaak', lk = deviceLock();
  const list = FAMILY.filter(f => lk === 'ouer' ? !f.kid : lk ? (f.id === lk || !f.kid) : true);
  main.innerHTML = `<div class="gate"><div style="font-size:52px">${r.s === 'chat' ? '💬' : '🎲'}</div><h1>${esc(t('chWho'))}</h1><p class="sub">${esc(t('chWhoSub'))}</p>
    <div class="profiles">${list.map(f => `<button class="profile" data-who="${f.id}"><span class="big">${f.avatar}</span><span class="nm">${esc(famName(f.id))}</span>${f.kid || lk === 'ouer' ? '' : '<span class="lv">🔐 PIN</span>'}</button>`).join('')}</div></div>`;
  main.querySelectorAll('[data-who]').forEach(b => b.onclick = async () => {
    const id = b.dataset.who;
    if (KIDS.some(k => k.id === id)) { if (!kidAllowed(id)) return; if (!deviceLock()) setLock(id); setAsParent(false); await selectKid(id); render(); return; }
    setParentMe(id);
    if (lk === 'ouer') { render(); return; }
    if (S.parentUnlocked) { setAsParent(true); render(); return; }
    S.afterUnlock = target; go('ouer');
  });
}

/* ---------- hub card + home banner ---------- */
function chessHubCard() {
  const [nm, ds] = t('qgCard'), b = S.badges || {};
  const n = (b.myTurn || 0) + (b.invites || 0);
  return `<button class="card chesscard" data-go="skaak"><span class="cc-ic">🎲</span><span class="cc-t"><b>${esc(nm)}</b><span class="small muted">${esc(ds)}</span><span class="cc-games">${GORDER.map(g => `<span title="${esc(gname(g))}">${GICON[g]}</span>`).join('')}</span>${n ? `<span class="chip hi">${b.invites ? '📨 ' + esc(tf('qgChallenges', { n: b.inviteFrom || '', g: gname(b.inviteGame) })) : '⏰ ' + esc(t('chYourTurn'))}</span>` : ''}</span><span class="cc-go">▶</span></button>`;
}
function chessHomeBanner() { return `<div id="socialBan">${socialBanInner()}</div>`; }
function socialBanInner() {
  const b = S.badges || {}; if (!b.invites && !b.myTurn && !b.chat) return '';
  const bits = [];
  if (b.invites) bits.push(`<button class="btn sm hi" data-go="skaak">📨 ${esc(tf('qgChallenges', { n: b.inviteFrom || '', g: gname(b.inviteGame) }))}</button>`);
  else if (b.myTurn) bits.push(`<button class="btn sm hi" data-go="skaak">🎲 ${esc(t('chYourTurn'))}</button>`);
  if (b.chat) bits.push(`<button class="btn sm" data-go="klets">💬 ${esc(t('chatT'))} <span class="bdg-in">${b.chat}</span></button>`);
  return `<div class="banner socialban" style="margin-top:14px">${bits.join('')}</div>`;
}

/* ---------- lobby ---------- */
async function renderChessLobby(main) {
  const who = me(), su = chessSetup();
  const famOpp = SOCIAL_ALL().filter(f => f.id !== who.id);
  if (!su.opp || su.opp === who.id || !isFam(su.opp)) su.opp = famOpp[0].id;
  if (!su.popp || su.popp === who.id) su.popp = famOpp[0].id;
  if (!su.subj) su.subj = who.kid ? gameSubj() : 'all';
  if (!online() && su.mode === 'fam') su.mode = 'app';
  const loc = lsGet(locKey(who.id), null), locR = loc ? qgReplay(loc.events) : null;
  const backTo = who.kid ? 'speel' : 'ouer';
  setSubjectColor(su.subj !== 'all' && S.content.subjects[su.subj] ? S.content.subjects[su.subj].color : null);
  const seg = (name, cur, opts) => `<div class="seg" role="radiogroup">${opts.map(([v, lb]) => `<button class="${cur === v ? 'on' : ''}" data-${name}="${v}" role="radio" aria-checked="${cur === v}">${lb}</button>`).join('')}</div>`;
  const modeBtn = (v, ic, arr, dis) => `<button class="cmode ${su.mode === v ? 'on' : ''}" data-mode="${v}" ${dis ? 'disabled' : ''}><span class="cm-ic">${ic}</span><b>${esc(arr[0])}</b><span class="small muted">${esc(arr[1])}</span></button>`;
  main.innerHTML = `<button class="back" data-go="${backTo}">← ${esc(who.kid ? t('playT') : t('dashboard'))}</button>
  <div class="row" style="justify-content:space-between"><h1>🎲 ${esc(t('qgT'))}</h1>${online() ? `<button class="btn sm" data-go="klets">💬 ${esc(t('chatOpen'))}</button>` : ''}</div>
  <p class="muted" style="margin:4px 0 12px;max-width:70ch">${esc(t('qgSub'))}</p>
  ${who.kid ? '<div id="kpSlot"></div>' : ''}
  <details class="card chow"><summary><b>❓ ${esc(t('chessHowT'))}</b></summary><ol>${t('qgHow').map(x => `<li>${esc(x)}</li>`).join('')}</ol></details>
  <div id="chOnline"></div>
  ${locR && locR.status === 'active' ? `<div class="card cresume"><div><b>⏸️ ${esc(t('chUnfinished'))}: ${GICON[locR.game]} ${esc(gname(locR.game))}</b><div class="small muted">${pav(locR.cfg.w)} ${esc(pname(locR.cfg.w, locR.cfg))} vs ${pav(locR.cfg.b)} ${esc(pname(locR.cfg.b, locR.cfg))} · ${esc(locR.cfg.kind === 'app' ? t('chLvl')[locR.cfg.lvl] : t('chModePhone')[0])}</div></div><button class="btn subject" data-go="skaak-l">${esc(t('chResume'))}</button></div>` : ''}
  <div class="card csetup"><h2>${esc(t('chNew'))}</h2>
    <div class="label" style="margin:12px 0 6px">${esc(t('qgWhich'))}</div>
    <div class="qgpick">${GORDER.map(g => `<button class="qgp ${su.game === g ? 'on' : ''}" data-game="${g}"><span class="qgi">${GICON[g]}</span><b>${esc(gname(g))}</b><span class="small muted">${esc(t('qgD')[g])}</span></button>`).join('')}</div>
    <div class="label" style="margin:14px 0 6px">${esc(t('chVsWho'))}</div>
    <div class="cmodes">${modeBtn('app', '🤖', t('chModeApp'))}${modeBtn('fam', '👪', t('chModeFam'), !online())}${modeBtn('phone', '📱', t('chModePhone'))}</div>
    ${!online() ? `<p class="small muted" style="margin-top:6px">${esc(t('chOnlineOnly'))}</p>` : ''}
    <div id="chOpts"></div>
    <div class="label" style="margin:14px 0 6px">${esc(t('chQFrom'))}</div>${subjChips(su.subj, 'cs')}
    <div class="label" style="margin:14px 0 6px">⏱️ ${esc(t('chSecs'))}</div>${seg('secs', String(su.secs), [['15', '15 s'], ['30', '30 s'], ['45', '45 s']])}
    <div class="row" style="margin-top:18px"><button class="btn subject block" id="chGo"></button></div>
  </div>
  ${who.kid ? '<div class="card" style="margin-top:14px" id="chRec"></div>' : ''}`;
  if (who.kid) kidPushCard($('#kpSlot'));
  const recBox = $('#chRec');
  const drawRec = () => { if (!recBox) return; const st = gameStats(S.kid, su.game); recBox.innerHTML = `<h3>📊 ${esc(t('chRecord'))}: ${GICON[su.game]} ${esc(gname(su.game))}</h3><div class="crec small"><div>🤖 ${esc(t('chVsApp'))}</div>${['easy', 'med', 'hard'].map(l => `<div class="muted">${esc(t('chLvl')[l])}: ${esc(wdl((st.app || {})[l]))}</div>`).join('')}<div style="margin-top:6px">👪 ${esc(t('chVsFam'))}</div><div class="muted">${esc(wdl(st.fam))}</div></div>`; };
  const opts = () => {
    const G = QG[su.game];
    const colorSeg = () => `<div class="label" style="margin:14px 0 6px">${esc(G.startsLabel ? t('qgWho1') : t('chColor'))}</div>${seg('color', su.color, [['w', (G.startsLabel ? '' : G.colors.w + ' ') + G.colorLabel('w')], ['b', (G.startsLabel ? '' : G.colors.b + ' ') + G.colorLabel('b')], ['r', '🎲 ' + t('chRand')]])}`;
    let h = '';
    if (su.mode === 'app') h = `<div class="label" style="margin:14px 0 6px">${esc(G.luck ? t('qgAppSmart') : t('chLevel'))}</div>${seg('lvl', su.lvl, [['easy', '🙂 ' + t('chLvl').easy], ['med', '😎 ' + t('chLvl').med], ['hard', '🔥 ' + t('chLvl').hard]])}${G.luck ? `<p class="small muted" style="margin-top:6px">${esc(t('qgAppSmartHint'))}</p>` : ''}${colorSeg()}`;
    else if (su.mode === 'fam') h = `<div class="label" style="margin:14px 0 6px">${esc(t('chOpp'))}</div><div class="whos">${famOpp.map(f => `<button class="${su.opp === f.id ? 'on' : ''}" data-opp="${f.id}"><span>${f.avatar}</span>${esc(famName(f.id))}</button>`).join('')}</div>${colorSeg()}`;
    else h = `<div class="label" style="margin:14px 0 6px">${esc(t('chOppPhone'))}</div><div class="whos">${famOpp.filter(f => FAMILY.some(x => x.id === f.id)).map(f => `<button class="${su.popp === f.id ? 'on' : ''}" data-popp="${f.id}"><span>${f.avatar}</span>${esc(famName(f.id))}</button>`).join('')}<button class="${su.popp === 'friend' ? 'on' : ''}" data-popp="friend"><span>🙂</span>${esc(t('chFriend'))}</button></div>
      ${su.popp === 'friend' ? `<input id="chFriendIn" maxlength="20" placeholder="${esc(t('chFriendName'))}" value="${esc(su.friend || '')}" style="margin-top:8px;width:100%">` : ''}${colorSeg()}`;
    $('#chOpts').innerHTML = h;
    $('#chGo').textContent = su.mode === 'fam' ? t('chInvite') : `${GICON[su.game]} ${t('chStart')}`;
    $('#chGo').disabled = !quickPool(su.subj).length;
    $('#chOpts').querySelectorAll('[data-lvl]').forEach(b => b.onclick = () => { su.lvl = b.dataset.lvl; saveSetup(su); opts(); });
    $('#chOpts').querySelectorAll('[data-color]').forEach(b => b.onclick = () => { su.color = b.dataset.color; saveSetup(su); opts(); });
    $('#chOpts').querySelectorAll('[data-opp]').forEach(b => b.onclick = () => { su.opp = b.dataset.opp; saveSetup(su); opts(); });
    $('#chOpts').querySelectorAll('[data-popp]').forEach(b => b.onclick = () => { su.popp = b.dataset.popp; saveSetup(su); opts(); });
    const fi = $('#chFriendIn'); if (fi) fi.oninput = () => { su.friend = fi.value.trim().slice(0, 20); saveSetup(su); };
    drawRec();
  };
  opts();
  main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  main.querySelectorAll('[data-game]').forEach(b => b.onclick = () => { su.game = b.dataset.game; saveSetup(su); main.querySelectorAll('[data-game]').forEach(x => x.classList.toggle('on', x === b)); sfx('tap'); opts(); });
  main.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { su.mode = b.dataset.mode; saveSetup(su); main.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('on', x === b)); opts(); });
  main.querySelectorAll('[data-cs]').forEach(b => b.onclick = () => { su.subj = b.dataset.cs; if (who.kid) setGameSubj(su.subj); saveSetup(su); main.querySelectorAll('[data-cs]').forEach(x => x.classList.toggle('on', x === b)); setSubjectColor(su.subj !== 'all' && S.content.subjects[su.subj] ? S.content.subjects[su.subj].color : null); opts(); if (!quickPool(su.subj).length) toast(t('chNoQs')); });
  main.querySelectorAll('[data-secs]').forEach(b => b.onclick = () => { su.secs = +b.dataset.secs; saveSetup(su); main.querySelectorAll('[data-secs]').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); }); });
  $('#chGo').onclick = async () => {
    const color = su.color === 'r' ? (Math.random() < 0.5 ? 'w' : 'b') : su.color;
    const base = { t: 'new', game: su.game, by: who.id, secs: su.secs, subj: su.subj, at: Date.now() };
    if (su.mode === 'fam') {
      const id = rid(), opp = su.opp;
      const ev = Object.assign(base, { id, seed: id, kind: 'online', w: color === 'w' ? who.id : opp, b: color === 'w' ? opp : who.id });
      $('#chGo').disabled = true;
      try { await chessAppend(id, ev); } catch (e) { toast(t('chSendFail')); $('#chGo').disabled = false; return; }
      chatSys({ sys: 'inv', a: who.id, b: opp, g: su.game });
      pushTo([opp], { title: `${GICON[su.game]} ${famName(who.id, 'af')} daag ${isKidAny(opp) ? 'jou' : famName(opp, 'af')} uit vir ${gname(su.game, 'af')}!`, body: 'Tik om te aanvaar en te speel.', url: './#skaak' });
      toast(tf(isKidAny(opp) ? 'chInvSent' : 'chInvSentP', { n: famName(opp) }));
      go('skaak-' + id);
      return;
    }
    const opp = su.mode === 'app' ? 'app' : su.popp;
    const id = 'L' + rid();
    const ev = Object.assign(base, { id, seed: id, kind: su.mode, lvl: su.lvl, w: color === 'w' ? who.id : opp, b: color === 'w' ? opp : who.id });
    if (su.mode === 'phone' && opp === 'friend') ev.fn = su.friend || t('chFriend');
    lsSet(locKey(who.id), { events: [ev] });
    go('skaak-l');
  };
  // family games (online)
  if (!online()) return;
  const box = $('#chOnline');
  const su2 = (cfg) => `${GICON[cfg.game || 'chess']} ${esc(gname(cfg.game))} · ${cfg.secs} s · ${esc(subjLabel(cfg.subj))}`;
  const draw = (list) => {
    const all = list.map(g => ({ g, R: qgReplay(g.events) })).filter(x => x.R);
    const mine = all.filter(x => x.R.cfg.w === who.id || x.R.cfg.b === who.id);
    const fresh = Date.now() - 3 * 86400000, stale = Date.now() - 14 * 86400000;
    const recent = (x) => (x.R.status === 'invite' || x.R.status === 'active') ? x.R.updated > stale : (x.R.status === 'over' && x.R.updated > fresh);
    const rows = mine.filter(recent);
    const others = who.kid ? [] : all.filter(x => !mine.includes(x) && recent(x) && x.R.status !== 'invite');
    if (!rows.length && !others.length) { box.innerHTML = ''; return; }
    const gi = (R) => `<span class="gi-s" title="${esc(gname(R.game))}">${GICON[R.game]}</span>`;
    const spec = ({ g, R }) => { const w = R.result && R.result.winner ? R.cfg[R.result.winner] : null; return `<div class="cgame"><div class="cg-t">${gi(R)} ${pav(R.cfg.w)} ${esc(pname(R.cfg.w, R.cfg))} <span class="muted">vs</span> ${pav(R.cfg.b)} ${esc(pname(R.cfg.b, R.cfg))} <span class="small muted">· ${R.status === 'active' ? esc(tf('chTheirTurn', { n: pname(R.toMove, R.cfg) })) : (w ? '🏆 ' + esc(pname(w, R.cfg)) : '🤝') + ' · ' + esc(resultText(R))}</span></div><button class="btn sm ghost" data-go="skaak-${g.id}">${esc(t('chView'))}</button></div>`; };
    const row = ({ g, R }) => {
      const opp = R.cfg.w === who.id ? R.cfg.b : R.cfg.w, on = pname(opp, R.cfg);
      let txt = '', btns = '', cls = '';
      if (R.status === 'invite') {
        if (R.invitee === who.id) { cls = 'hot'; txt = `📨 <b>${esc(tf('qgChallenges', { n: on, g: gname(R.game) }))}</b> <span class="small muted">· ${su2(R.cfg)}</span>`; btns = `<button class="btn sm hi" data-acc="${g.id}">✅ ${esc(t('chAccept'))}</button><button class="btn sm ghost" data-dec="${g.id}">${esc(t('chDecline'))}</button>`; }
        else { txt = `${gi(R)} ⏳ ${esc(tf('chWaitAcc', { n: on }))}`; btns = `<button class="btn sm ghost" data-can="${g.id}">${esc(t('chCancel'))}</button>`; }
      } else if (R.status === 'active') {
        const mineTurn = R.toMove === who.id; cls = mineTurn ? 'hot' : '';
        txt = `${gi(R)} ${pav(opp)} <b>${esc(on)}</b> · ${mineTurn ? `<b class="hiTxt">${esc(t('chYourTurn'))}</b>` : esc(tf('chTheirTurn', { n: on }))}`;
        btns = `<button class="btn sm ${mineTurn ? 'subject' : ''}" data-go="skaak-${g.id}">${esc(t('chOpen'))}</button>`;
      } else {
        const w = R.result && R.result.winner ? R.cfg[R.result.winner] : null;
        txt = `${gi(R)} ${w === who.id ? '🏆' : w ? '😅' : '🤝'} ${esc(w === who.id ? t('chYouWin') : w ? tf('chTheyWin', { n: pname(w, R.cfg) }) : t('chDraw'))} <span class="small muted">· ${esc(resultText(R))}</span>`;
        btns = `<button class="btn sm ghost" data-go="skaak-${g.id}">${esc(t('chView'))}</button>`;
      }
      return `<div class="cgame ${cls}"><div class="cg-t">${txt}</div><div class="row" style="gap:6px">${btns}</div></div>`;
    };
    box.innerHTML = (rows.length ? `<div class="card" style="margin-bottom:14px"><h3>👪 ${esc(t('chMyGames'))}</h3><div class="cgames">${rows.map(row).join('')}</div></div>` : '')
      + (others.length ? `<div class="card" style="margin-bottom:14px"><h3>${esc(t('specT'))}</h3><div class="cgames">${others.map(spec).join('')}</div></div>` : '');
    box.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
    const act = async (id, ev, after) => { try { await chessAppend(id, Object.assign({ by: who.id, at: Date.now() }, ev)); if (after) after(); else refresh(); } catch (e) { toast(t('chSendFail')); } };
    box.querySelectorAll('[data-acc]').forEach(b => b.onclick = () => { const x = mine.find(y => y.g.id === b.dataset.acc); act(b.dataset.acc, { t: 'acc' }, () => { if (x) { chatSys({ sys: 'acc', a: x.R.cfg.by, b: who.id, g: x.R.game }); pushTo([x.R.cfg.by], { title: `${GICON[x.R.game]} ${famName(who.id, 'af')} het aanvaar!`, body: `${gname(x.R.game, 'af')} het begin.`, url: './#skaak-' + b.dataset.acc }); } go('skaak-' + b.dataset.acc); }); });
    box.querySelectorAll('[data-dec]').forEach(b => b.onclick = () => act(b.dataset.dec, { t: 'dec' }));
    box.querySelectorAll('[data-can]').forEach(b => b.onclick = () => act(b.dataset.can, { t: 'can' }));
  };
  const refresh = () => chessList(15).then(list => { if (S.route.s === 'chess') { draw(list); updateBadges(list); } }).catch(() => {});
  refresh();
  S._chessPoll = setInterval(() => { if (!document.hidden) refresh(); }, 8000);
}

/* ---------- the game screen (every game) ---------- */
function chessCleanup() {
  if (S._chessPoll) { clearInterval(S._chessPoll); S._chessPoll = null; }
  if (S._cqTimer) { clearInterval(S._cqTimer); S._cqTimer = null; }
  if (S._aiTimer) { clearTimeout(S._aiTimer); S._aiTimer = null; }
  if (S.chess) S.chess.dead = true;
}
const renderChessGame = (main, gid) => renderQGame(main, gid);
async function renderQGame(main, gid) {
  const who = me();
  let events;
  if (gid === 'l') { const loc = lsGet(locKey(who.id), null); events = loc && loc.events; }
  else {
    if (!online()) return go('skaak');
    main.innerHTML = `<div class="splash"><div>🎲</div></div>`;
    try { events = await chessFetch(gid); } catch (e) { events = null; }
    if (S.route.s !== 'chessGame' || S.route.id !== gid) return;
  }
  const R0 = qgReplay(events);
  if (!R0) return go('skaak');
  const G = R0.G, cfg = R0.cfg, kind = cfg.kind;
  const C = S.chess = { gid, local: gid === 'l', events: events.slice(), R: R0, busy: false, pending: 0, flip: false, dead: false, qi: 0, combo: 0, life: lsGet('lh.chess.life.' + cfg.id, {}), anim: null, pend: null };
  C.pool = shuffle(quickPool(cfg.subj)); if (C.pool.length < 4) C.pool = shuffle(quickPool('all'));
  const myColor = kind === 'phone' ? null : R0.colorOf(who.id);
  const spectator = kind === 'online' && !myColor;
  const controls = (id) => kind === 'phone' ? id !== 'app' : id === who.id;
  const bottomColor = () => { if (!G.flip) return 'w'; if (kind === 'phone') { const c = C.R.status === 'active' ? C.R.cur : 'w'; return C.flip ? CHESS.other(c) : c; } const c = myColor || 'w'; return C.flip ? CHESS.other(c) : c; };
  const subjOk = C.pool.length > 0;
  main.innerHTML = `<div class="chead"><button class="back" data-go="skaak">← ${GICON[G.id]} ${esc(gname(G.id))}</button><span class="row" style="gap:6px">${kind === 'online' ? `<button class="btn sm" id="chChatB">💬<span class="bdg-in" id="chChatN" hidden></span></button>` : ''}${muteBtn()}</span></div>
  <div class="row small muted cchips"><span class="chip subject">${esc(subjLabel(cfg.subj))}</span><span class="chip">⏱️ ${cfg.secs} s</span>${kind === 'app' ? `<span class="chip">🤖 ${esc(t('chLvl')[cfg.lvl])}</span>` : ''}</div>
  <div class="cwrap qg-${G.id}"><div class="cplay" id="pTop"></div><div id="cBoard"></div><div class="cplay" id="pBot"></div></div>
  <div class="cstatus" id="cStat" aria-live="polite"></div>
  <div class="row" style="justify-content:center;gap:8px;margin-top:10px" id="cActs"></div>
  <details class="card cmoves" style="margin-top:14px"><summary><b>📜 ${esc(t('chMoves'))}</b></summary><div id="cLog" class="small"></div></details>`;
  wireBack(main);
  setSubjectColor(cfg.subj !== 'all' && S.content.subjects[cfg.subj] ? S.content.subjects[cfg.subj].color : null);
  const canAct = () => !C.busy && !C.dead && C.R.status === 'active' && controls(C.R.toMove) && subjOk && !C.pending && !document.querySelector('.overlay');
  const api = {
    el: $('#cBoard'), R: () => C.R, canAct, canActQuiet: () => !C.busy && !C.dead && C.R.status === 'active' && controls(C.R.toMove) && !C.pending,
    blocked: () => { if (C.R.status === 'active' && !subjOk) toast(t('chNoQs')); },
    bottomColor, myColor: () => kind === 'phone' ? (C.R.cur || 'w') : myColor, spectator: () => spectator, kind: () => kind,
    repaint: () => paint(), attempt: (m) => ask(m),
  };
  const B = G.board(api);
  const playerBar = (c) => {
    const R = C.R, id = cfg[c], turn = R.status === 'active' && R.cur === c, s = R.stats[c];
    const mine = kind !== 'phone' && id === who.id;
    return `<span class="cp-av">${pav(id)}</span><span class="cp-nm"><b>${esc(mine ? t('chYou') : pname(id, cfg))}</b> <span class="small muted">${G.colors[c]}</span>${id !== 'app' || G.luck ? `<span class="small muted"> · ✅ ${s.ok}/${s.n}</span>` : ''}${G.barExtra ? G.barExtra(R, c) : ''}</span>${turn ? `<span class="cp-turn">${id === 'app' && C.busy ? '🤔' : '⏳'}</span>` : ''}`;
  };
  const overTitle = (R) => { const w = R.result && R.result.winner ? cfg[R.result.winner] : null; if (!w) return t('chDraw'); if (kind !== 'phone' && w === who.id) return t('chYouWin'); return kind === 'phone' || spectator ? tf('chWins', { n: pname(w, cfg) }) : tf('chTheyWin', { n: pname(w, cfg) }); };
  function paint() {
    if (C.dead) return;
    const R = C.R, anim = C.anim; C.anim = null;
    B.paint(R, C.pend, anim);
    const bc = bottomColor(), top = CHESS.other(bc);
    $('#pTop').innerHTML = playerBar(top); $('#pBot').innerHTML = playerBar(bc);
    $('#pTop').classList.toggle('on', R.status === 'active' && R.cur === top); $('#pBot').classList.toggle('on', R.status === 'active' && R.cur === bc);
    let s = '';
    if (R.status === 'invite') s = R.invitee === who.id ? `📨 ${esc(tf('qgChallenges', { n: pname(cfg.by, cfg), g: gname(G.id) }))}` : `⏳ ${esc(tf('chWaitAcc', { n: pname(R.invitee, cfg) }))}`;
    else if (R.status === 'declined') s = esc(tf('chDeclined', { n: pname(R.invitee, cfg) }));
    else if (R.status === 'cancelled') s = esc(t('chCancelled'));
    else if (R.status === 'over') s = `<b>${esc(overTitle(R))}</b> · ${esc(resultText(R))}`;
    else {
      const mover = R.toMove, mine = controls(mover);
      if (!mine) s = (G.waitNote ? G.waitNote(R) : '') + (mover === 'app' ? esc(t('chAppThinks')) : esc(tf('chWaitMove', { n: pname(mover, cfg) })));
      else s = (kind === 'phone' ? `${pav(mover)} <b>${esc(pname(mover, cfg))}</b>: ` : '') + G.prompt(R, B.ui);
    }
    $('#cStat').innerHTML = s;
    let a = '';
    if (R.status === 'invite' && R.invitee === who.id) a = `<button class="btn hi" id="cAcc">✅ ${esc(t('chAccept'))}</button><button class="btn ghost" id="cDec">${esc(t('chDecline'))}</button>`;
    else if (R.status === 'invite' && cfg.by === who.id) a = `<button class="btn ghost" id="cCan">${esc(t('chCancel'))}</button>`;
    else if (R.status === 'active' && !spectator) a = `${G.flip ? `<button class="btn sm ghost" id="cFlip">🔄 ${esc(t('chFlip'))}</button>` : ''}<button class="btn sm ghost" id="cRes">🏳️ ${esc(t('chResign'))}</button>`;
    else if (R.status !== 'active') a = `${spectator ? '' : `<button class="btn subject" id="cAgain">🔁 ${esc(t('playAgain'))}</button>`}<button class="btn" data-go="skaak">${esc(t('back'))}</button>`;
    $('#cActs').innerHTML = a; wireActs();
    $('#cLog').innerHTML = R.hist.length ? `<ol class="clog">${R.hist.map(h => h.miss ? `<li class="miss">${pav(h.by)} ${esc(pname(h.by, cfg))}: ❌ ${esc(t('chMissed'))} <span class="muted">${G.logText(h)}</span></li>` : `<li>${pav(h.by)} ${G.logText(h)}</li>`).join('')}</ol>` : `<p class="muted">–</p>`;
  }
  const wireActs = () => {
    const q = (id) => $('#' + id);
    if (q('cAcc')) q('cAcc').onclick = () => commit({ t: 'acc', by: who.id }, () => { chatSys({ sys: 'acc', a: cfg.by, b: who.id, g: G.id }); pushTo([cfg.by], { title: `${GICON[G.id]} ${famName(who.id, 'af')} het aanvaar!`, body: `${gname(G.id, 'af')} het begin.`, url: './#skaak-' + cfg.id }); });
    if (q('cDec')) q('cDec').onclick = () => commit({ t: 'dec', by: who.id }, () => go('skaak'));
    if (q('cCan')) q('cCan').onclick = () => commit({ t: 'can', by: who.id }, () => go('skaak'));
    if (q('cFlip')) q('cFlip').onclick = () => { C.flip = !C.flip; paint(); };
    if (q('cRes')) q('cRes').onclick = () => {
      const by = kind === 'phone' ? C.R.toMove : who.id;
      const ov = document.createElement('div'); ov.className = 'overlay';
      ov.innerHTML = `<div class="modal"><div class="big" style="animation:none">🏳️</div><p style="margin:8px 0 16px">${esc(t('chResignQ'))}</p><div class="row" style="justify-content:center"><button class="btn" id="rNo">${esc(t('chNo'))}</button><button class="btn hi" id="rYes">${esc(t('chYes'))}</button></div></div>`;
      document.body.appendChild(ov);
      $('#rNo', ov).onclick = () => ov.remove();
      $('#rYes', ov).onclick = () => { ov.remove(); if (C.R.status === 'active') commit({ t: 'res', by }); };
    };
    if (q('cAgain')) q('cAgain').onclick = () => {
      if (kind === 'online') { go('skaak'); return; }
      const id = 'L' + rid();
      const ev = Object.assign({}, cfg, { id, seed: id, at: Date.now(), w: cfg.b, b: cfg.w });
      lsSet(locKey(who.id), { events: [ev] }); render();
    };
    $('#cActs').querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  };
  function nextQ() { if (C.qi >= C.pool.length) { C.pool = shuffle(C.pool); C.qi = 0; } return C.pool[C.qi++]; }
  function ask(m) {
    if (!canAct()) return;
    const mover = C.R.toMove, it = nextQ(), q = it.q, opts = quickOpts(q), lab = G.label(m, C.R.st);
    C.busy = true; C.pend = m; paint();
    const lifeLeft = () => (C.life[mover] === undefined ? 2 : C.life[mover]);
    const ov = document.createElement('div'); ov.className = 'overlay sheetwrap cqwrap'; ov.id = 'cqSheet';
    ov.innerHTML = `<div class="sheet cq" role="dialog" aria-modal="true" aria-label="${esc(t('chQHead'))}"><div class="sh-grab"></div>
      <div class="cq-head"><span class="cq-mv">${lab.icon}<span><b>${esc(t('chQHead'))}</b><br><span class="small muted">${kind === 'phone' ? esc(pname(mover, cfg)) + ' · ' : ''}${esc(lab.text)}</span></span></span><span class="cq-t num" id="cqT">${cfg.secs}</span></div>
      <div class="cq-bar"><i id="cqBar"></i></div>
      <div class="small muted" style="margin:8px 0 4px">${it.subj.icon} ${esc(tx(it.subj.short))} · ${esc(tx(it.topic.title))}</div>
      <div class="sh-q">${inline(tx(q.q))}</div>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${'ABCD'[i]}</span><span>${inline(o.txt)}</span></button>`).join('')}</div>
      <div class="sh-foot"><button class="btn sm ghost" id="cqLL" ${lifeLeft() > 0 ? '' : 'disabled'}>💡 50/50 <span class="num">×${lifeLeft()}</span></button><span class="small muted">${esc(t('chLife'))}</span></div>
      <div id="cqRes"></div></div>`;
    document.body.appendChild(ov);
    const btns = [...ov.querySelectorAll('.opt')], deadline = Date.now() + cfg.secs * 1000;
    let done = false; const st50 = { used: false };
    $('#cqLL', ov).onclick = (e) => {
      if (lifeLeft() <= 0 || st50.used) return;
      const wrong = opts.map((o, i) => o.ok ? -1 : i).filter(i => i >= 0); if (wrong.length < 2) return;
      st50.used = true; C.life[mover] = lifeLeft() - 1; lsSet('lh.chess.life.' + cfg.id, C.life);
      shuffle(wrong).slice(0, 2).forEach(i => { btns[i].classList.add('gone'); btns[i].disabled = true; });
      e.currentTarget.disabled = true; e.currentTarget.querySelector('.num').textContent = '×' + C.life[mover]; sfx('tap');
    };
    const finish = (i) => {
      if (done) return; done = true;
      if (S._cqTimer) { clearInterval(S._cqTimer); S._cqTimer = null; }
      const ok = i >= 0 && opts[i].ok, ri = opts.findIndex(o => o.ok);
      btns.forEach(b => b.disabled = true); $('#cqLL', ov).disabled = true;
      if (i >= 0) btns[i].classList.add(ok ? 'right' : 'wrong'); if (btns[ri]) btns[ri].classList.add('right');
      const kidRec = S.kid && who.kid && (kind !== 'phone' || mover === who.id) && mover === S.kid.id ? S.kid : null;
      if (kidRec) { noteMistake(kidRec, it.topic, q, ok); C.combo = ok ? C.combo + 1 : 0; funAnswer(ok, { quiet: true, streak: C.combo }); C.answered = (C.answered || 0) + 1; if (C.answered % 5 === 0) S.store.saveKid(kidRec).catch(() => {}); }
      else sfx(ok ? 'ok' : 'bad');
      const mv = G.finalize ? G.finalize(m, C.R.st) : m;
      const ev = ok ? Object.assign({ t: 'mv', n: C.R.ply, by: mover, q: 1 }, mv) : Object.assign({ t: 'miss', n: C.R.ply, by: mover }, m, { p: lab.piece || m.p });
      if (ok) {
        $('#cqRes', ov).innerHTML = `<div class="cq-ok">${esc(t('chRight'))}</div>`;
        setTimeout(() => { ov.remove(); C.pend = null; C.busy = false; C.anim = mv; commit(ev); }, 650);
      } else {
        const nextName = pname(cfg[CHESS.other(C.R.cur)], cfg);
        $('#cqRes', ov).innerHTML = `<div class="cq-bad"><b>${esc(i < 0 ? t('chTooSlow') : t('chWrong'))}</b> ${esc(tf('chTurnOver', { n: nextName }))}<div class="small" style="margin-top:6px">${esc(t('chRightAns'))} <b>${inline(opts[ri].txt)}</b>${q.explain ? ` – ${inline(tx(q.explain))}` : ''}</div></div><button class="btn subject block" id="cqOk" style="margin-top:10px">${esc(t('chGoOn'))}</button>`;
        let closed = false;
        const close = () => { if (closed) return; closed = true; ov.remove(); C.pend = null; C.busy = false; commit(ev); };
        $('#cqOk', ov).onclick = close;
        setTimeout(close, 9000);
        $('#cqOk', ov).scrollIntoView({ block: 'nearest' });
      }
    };
    btns.forEach(b => b.onclick = () => finish(+b.dataset.i));
    const tick = () => {
      const left = Math.max(0, deadline - Date.now()), secs = Math.ceil(left / 1000);
      const bar = $('#cqBar', ov), tt = $('#cqT', ov);
      if (bar) { bar.style.width = (100 * left / (cfg.secs * 1000)) + '%'; bar.classList.toggle('low', secs <= 5); }
      if (tt) { tt.textContent = secs; tt.classList.toggle('low', secs <= 5); }
      if (left <= 0) finish(-1);
    };
    S._cqTimer = setInterval(tick, 100); tick();
  }
  /* append an event: local games straight to localStorage, online games through lh_log (append-only) */
  async function commit(ev, after) {
    if (C.dead && C.local) return;
    ev.at = Date.now();
    const before = C.R;
    C.events.push(ev); C.R = qgReplay(C.events);
    if (C.local) lsSet(locKey(who.id), { events: C.events });
    paint();
    if (!C.local) {
      C.pending++;
      let okSend = false;
      for (let i = 0; i < 3 && !okSend; i++) { try { await chessAppend(gid, ev); okSend = true; } catch (e) { await new Promise(r => setTimeout(r, 1200)); } }
      C.pending--;
      if (!okSend) { C.events.splice(C.events.indexOf(ev), 1); C.R = qgReplay(C.events); paint(); toast(t('chSendFail')); return; }
    }
    if (after) after();
    afterChange(before);
  }
  function afterChange(before) {
    if (C.dead) return;
    const R = C.R;
    if (R.status === 'over' && before.status !== 'over') { gameEnd(true); return; }
    if (R.status !== 'active') return;
    if (kind === 'app' && R.toMove === 'app') {
      C.busy = true; paint();
      S._aiTimer = setTimeout(() => {
        if (C.dead) return;
        C.busy = false;
        if (G.aiMiss && Math.random() < G.aiMiss(cfg.lvl)) { toast(t('qgAppMissed')); sfx('bad'); commit({ t: 'miss', n: C.R.ply, by: 'app' }); return; }
        const m = G.ai(C.R.st, cfg.lvl);
        if (!m) return;
        C.anim = m; sfx('tap');
        commit(Object.assign({ t: 'mv', n: C.R.ply, by: 'app' }, m));
      }, 500 + Math.random() * 500);
      return;
    }
    if (kind === 'phone' && (R.toMove !== before.toMove || before.force)) {
      const nm = pname(R.toMove, cfg);
      const ov = document.createElement('div'); ov.className = 'overlay' + (G.id === 'ships' ? ' solid' : '');
      ov.innerHTML = `<div class="modal"><div class="big">${pav(R.toMove)}</div><h2>${esc(tf('chPass', { n: nm }))}</h2><button class="btn hi block" id="hOk" style="margin-top:16px">${esc(tf('chIAm', { n: nm }))}</button></div>`;
      document.body.appendChild(ov);
      $('#hOk', ov).onclick = () => { ov.remove(); paint(); };
    }
    // online: tell the other player it is their turn (max once per 5 min per game)
    if (kind === 'online' && before.toMove === who.id && R.toMove && R.toMove !== who.id && isFam(R.toMove)) {
      const key = 'lh.chess.ping.' + cfg.id; const lastPing = lsGet(key, 0);
      if (Date.now() - lastPing > 300000) { lsSet(key, Date.now()); pushTo([R.toMove], { title: `${GICON[G.id]} Jou beurt in ${gname(G.id, 'af')}!`, body: `${famName(who.id, 'af')} het geskuif – dis nou jou beurt.`, url: './#skaak-' + cfg.id }); }
    }
  }
  async function gameEnd(byMe) {
    const R = C.R; paint();
    const winC = R.result && R.result.winner, winner = winC ? cfg[winC] : null;
    const myC = kind === 'phone' ? R.colorOf(who.id) : myColor;
    const outcome = !winner ? 'd' : (myC && winC === myC) ? 'w' : 'l';
    const big = kind === 'phone' || spectator ? (winner ? '🏆' : '🤝') : (outcome === 'w' ? '🏆' : outcome === 'd' ? '🤝' : '😅');
    let xp = 0;
    const kidRec = S.kid && who.kid && S.kid.id === who.id && myC ? S.kid : null;
    const s = myC ? R.stats[myC] : { ok: 0, n: 0 };
    if (kidRec) {
      kidRec.chess = kidRec.chess || { app: {}, fam: {}, seen: [] };
      kidRec.chess.seen = kidRec.chess.seen || [];
      if (!kidRec.chess.seen.includes(cfg.id)) {
        kidRec.chess.seen.push(cfg.id); if (kidRec.chess.seen.length > 40) kidRec.chess.seen.splice(0, kidRec.chess.seen.length - 40);
        const gs = gameStatsW(kidRec, G.id); gs.app = gs.app || {};
        const bucket = kind === 'app' ? (gs.app[cfg.lvl] = gs.app[cfg.lvl] || {}) : (gs.fam = gs.fam || {});
        ['w', 'l', 'd'].forEach(k => { bucket[k] = bucket[k] || 0; });
        bucket[outcome]++;
        const APPXP = { chess: [15, 25, 40], checkers: [15, 25, 40], four: [10, 20, 35], ships: [15, 20, 30], snakes: [10, 12, 15] }[G.id] || [15, 25, 40];
        const li = { easy: 0, med: 1, hard: 2 }[cfg.lvl] || 0;
        const baseXp = kind === 'app' ? { w: APPXP[li], d: Math.round(APPXP[li] / 2), l: 5 }[outcome] : { w: 30, d: 15, l: 10 }[outcome];
        xp = baseXp + Math.min(20, s.ok);
        kidRec.totals.games = (kidRec.totals.games || 0) + 1;
        const oppId = cfg[CHESS.other(myC)];
        const vs = kind === 'app' ? `${UI.af.chApp.toLowerCase()} (${UI.af.chLvl[cfg.lvl]})` : pname(oppId, cfg, 'af');
        const resAf = outcome === 'w' ? 'gewen 🏆' : outcome === 'd' ? 'gelykop 🤝' : 'verloor';
        const label = `${gname(G.id, 'af')} teen ${vs}: ${resAf} · vrae reg ${s.ok}/${s.n}`;
        award(kidRec, xp, { type: 'game', game: G.id === 'chess' ? 'chess' : 'qg-' + G.id, label }).catch(() => {});
        if ((S.settings || {}).push) pushSend({ title: `${GICON[G.id]} ${kidRec.name}: ${gname(G.id, 'af')} ${resAf}`, body: `Teen ${vs} · ${resultText(R, 'af')} · vrae reg ${s.ok}/${s.n} · +${xp} XP`, url: './#ouer', kid: kidRec.id });
      }
    }
    if (byMe && kind === 'online') {
      const a = winner || cfg.w, b = winner ? cfg[CHESS.other(winC)] : cfg.b;
      chatSys({ sys: winner ? 'win' : 'draw', a, b, r: R.result.res, rb: R.result.by, g: G.id });
    }
    if (C.dead) return;
    const ov = document.createElement('div'); ov.className = 'overlay';
    ov.innerHTML = `<div class="modal"><div class="big">${big}</div><h2>${esc(overTitle(R))}</h2><p class="muted" style="margin:6px 0 10px">${esc(resultText(R))}</p>
      <div class="row" style="justify-content:center;gap:6px">${['w', 'b'].filter(c => cfg[c] !== 'app').map(c => `<span class="chip num">${pav(cfg[c])} ${esc(t('chQRight'))}: ${R.stats[c].ok}/${R.stats[c].n}</span>`).join('')}${xp ? `<span class="chip hi num">+${xp} XP</span>` : ''}</div>
      <div class="row" style="justify-content:center;margin-top:16px">${spectator ? '' : `<button class="btn subject" id="eAgain">🔁 ${esc(t('playAgain'))}</button>`}<button class="btn" id="eClose">${esc(t('close'))}</button></div></div>`;
    document.body.appendChild(ov);
    if (outcome === 'w' || (kind === 'phone' && winner)) { sfx('win'); confetti(150); }
    $('#eClose', ov).onclick = () => ov.remove();
    const ea = $('#eAgain', ov); if (ea) ea.onclick = () => { ov.remove(); const b = $('#cAgain'); if (b) b.click(); };
  }
  // online: follow the other phone
  if (!C.local) {
    const poll = async () => {
      if (C.dead || C.pending || C.busy) return;
      let evs; try { evs = await chessFetch(gid); } catch (e) { return; }
      if (C.dead || C.pending || C.busy || !evs || evs.length < C.events.length || JSON.stringify(evs) === JSON.stringify(C.events)) return;
      const before = C.R; C.events = evs; C.R = qgReplay(evs);
      if (C.R.ply > before.ply) { const h = C.R.hist[C.R.hist.length - 1]; if (h && !h.miss) { C.anim = h.e; sfx('tap'); } else if (h && h.miss) { toast(`${pname(h.by, cfg)}: ❌ ${t('chMissed')}`); } }
      paint();
      if (C.R.status === 'over' && before.status !== 'over') gameEnd(false);
    };
    let tick = 0;
    S._chessPoll = setInterval(() => { tick++; if (document.hidden) return; const waiting = C.R.status === 'invite' || (C.R.status === 'active' && !controls(C.R.toMove)); if (waiting || tick % 4 === 0) poll(); }, 2000);
    const cb = $('#chChatB'); if (cb) cb.onclick = () => chatSheet();
  }
  paint();
  if (R0.status === 'over') { /* just viewing */ }
  else if (kind === 'app' && R0.status === 'active' && R0.toMove === 'app') afterChange({ status: 'active', toMove: who.id });
  else if (kind === 'phone' && R0.status === 'active' && (R0.ply > 0 || R0.toMove !== who.id)) afterChange({ status: 'active', toMove: R0.toMove, force: true });
  if (R0.status === 'over' && kind === 'online' && S.kid && who.kid && myColor && !((S.kid.chess || {}).seen || []).includes(cfg.id)) gameEnd(false);
}

/* ---------- family chat ---------- */
async function chatLoad(days) { const rows = await S.store.loadPrefix(chatPrefix(), days || 7); return rows.map(r => r.value).reverse().flatMap(d => (d && d.events) || []).sort((a, b) => a.at - b.at); }
function chatPost(ev) { return S.store.rpc('lh_log', { k: chatPrefix() + today(), ev }); }
let CHAT_SCOPE = 'fam';
const chatKring = () => CHAT_SCOPE === 'kring' && CIRCLE.length > 0;
const chatPrefix = () => chatKring() ? 'kring/chat/d/' : 'chat/fam/d/';
const chatMembers = () => chatKring() ? SOCIAL_ALL() : FAMILY;
const chatTabs = () => CIRCLE.length ? `<div class="row chipsel" style="gap:6px;margin-bottom:8px"><button type="button" class="chip ${chatKring() ? '' : 'on'}" data-cs="fam">🏠 ${esc(t('chatFam'))}</button><button type="button" class="chip ${chatKring() ? 'on' : ''}" data-cs="kring">👨‍👩‍👧‍👦 ${esc(t('chatKring'))}</button></div>` : '';
function chatSys(o) { if (!online()) return; const who = me(); chatPost(Object.assign({ id: rid(), by: who ? who.id : 'sys', at: Date.now() }, o)).catch(() => {}); }
const seenKey = () => { const w = me(); return 'lh.chatSeen.' + (w ? w.id : 'x'); };
function chatMsgHtml(m, myId, prev) {
  const day = ymd(new Date(m.at)), pday = prev ? ymd(new Date(prev.at)) : null;
  let h = day !== pday ? `<div class="cday">${esc(fmtDay(day))}</div>` : '';
  if (m.sys) {
    const r = m.r ? (m.r === 'res' ? tfa(t('chRes').res, { n: famName(m.rb) }) : (t('chRes')[m.r] || '')) : '';
    h += `<div class="csys">${esc(tfa(t('chatSys')[m.sys] || '', { a: famName(m.a), b: famName(m.b), r, g: gname(m.g || 'chess') }))} <span class="ct">${fmtTime(m.at)}</span></div>`;
    return h;
  }
  const mine = m.by === myId, cont = prev && !prev.sys && prev.by === m.by && day === pday && m.at - prev.at < 180000;
  h += `<div class="cmsg ${mine ? 'me' : ''} ${cont ? 'cont' : ''}">${mine ? '' : `<span class="cav">${cont ? '' : famAv(m.by)}</span>`}<div class="cbub">${!mine && !cont ? `<div class="cnm">${esc(famName(m.by))}</div>` : ''}<div class="ctx">${esc(m.txt)}</div><div class="ct">${fmtTime(m.at)}</div></div></div>`;
  return h;
}
function chatUI(root, compact) {
  const who = me();
  root.innerHTML = `${chatTabs()}<div class="chat ${compact ? 'compact' : ''}"><div class="cmembers">${chatMembers().map(f => `<span class="${f.id === who.id ? 'me' : ''}" title="${esc(famName(f.id))}">${f.avatar}<small>${esc(famName(f.id))}</small></span>`).join('')}</div>
    <div class="clist" id="cList" aria-live="polite"><p class="muted center small" style="margin-top:20px">…</p></div>
    <div class="cquick">${t('chatQuick').map(q => `<button class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>
    <form class="cform" id="cForm"><input id="cIn" maxlength="300" autocomplete="off" placeholder="${esc(t('chatPh'))}" aria-label="${esc(t('chatPh'))}"><button class="btn primary" type="submit">${esc(t('chatSend'))}</button></form></div>`;
  const list = $('#cList', root);
  let msgs = [], lastSig = '';
  const draw = () => {
    const sig = msgs.length + ':' + (msgs.length ? msgs[msgs.length - 1].id : '');
    if (sig === lastSig) return; lastSig = sig;
    const atBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 80;
    list.innerHTML = msgs.length ? msgs.map((m, i) => chatMsgHtml(m, who.id, msgs[i - 1])).join('') : `<p class="muted center small" style="margin-top:20px">${esc(t('chatEmpty'))}</p>`;
    if (atBottom || !draw.once) list.scrollTop = list.scrollHeight; draw.once = true;
    if (msgs.length) lsSet(seenKey() + (chatKring() ? '.k' : ''), msgs[msgs.length - 1].at);
    S.badges = Object.assign(S.badges || {}, { chat: 0 }); updateSocialUi();
  };
  const load = async () => { try { const m = await chatLoad(7); msgs = m; draw(); } catch (e) {} };
  const send = async (txt) => {
    txt = String(txt || '').trim().slice(0, 300); if (!txt) return;
    const ev = { id: rid(), by: who.id, txt, at: Date.now() };
    msgs.push(Object.assign({ pending: true }, ev)); draw(); sfx('tap');
    try { await chatPost(ev); } catch (e) { msgs = msgs.filter(x => x.id !== ev.id); lastSig = ''; draw(); toast(t('chSendFail')); return; }
    // everyone else in the family gets it on their phone (the boys too, if their notifications are on)
    pushTo(chatMembers().map(f => f.id).filter(id => id !== who.id), { title: `💬 ${who.name} in die ${chatKring() ? 'familiekring' : 'familie'}-klets`, body: txt, url: './#klets' });
  };
  root.querySelectorAll('[data-cs]').forEach(b => b.onclick = () => { CHAT_SCOPE = b.dataset.cs; render(); });
  $('#cForm', root).onsubmit = (e) => { e.preventDefault(); const inp = $('#cIn', root); const v = inp.value; inp.value = ''; send(v); };
  root.querySelectorAll('[data-q]').forEach(b => b.onclick = () => send(b.dataset.q));
  load();
  return { load, stop: null };
}
function renderChat(main) {
  const who = me();
  if (!CIRCLE.length) refreshCircle(true);
  if (!online()) { main.innerHTML = `<button class="back" data-go="${who.kid ? 'home' : 'ouer'}">← ${esc(t('back'))}</button><div class="card pad-lg center"><div style="font-size:48px">💬</div><p class="muted">${esc(t('chOnlineOnly'))}</p></div>`; wireBack(main); return; }
  main.innerHTML = `<button class="back" data-go="${who.kid ? 'home' : 'ouer'}">← ${esc(t('back'))}</button><div class="row" style="justify-content:space-between"><h1>💬 ${esc(t('chatT'))}</h1><button class="btn sm" data-go="skaak">♟️ ${esc(t('chessT'))}</button></div><p class="small muted chatsub" style="margin:4px 0 10px">🔒 ${esc(chatKring() ? t('chatSubK') : t('chatSub'))}</p><div id="chatRoot" style="margin-top:8px"></div>`;
  wireBack(main);
  const c = chatUI($('#chatRoot'));
  // size the message list so the input stays above the bottom bar on every phone
  const fit = () => { const list = $('#cList'); if (!list || S.route.s !== 'chat') { removeEventListener('resize', fit); return; } const nav = $('#bottomnav'), navH = nav && getComputedStyle(nav).display !== 'none' ? nav.offsetHeight : 0; const below = $('.cquick').offsetHeight + $('#cForm').offsetHeight + 28 + navH; list.style.height = Math.max(150, innerHeight - list.getBoundingClientRect().top - below) + 'px'; };
  fit(); addEventListener('resize', fit);
  S._chessPoll = setInterval(() => { if (!document.hidden) c.load(); }, 3000);
}
function chatSheet() {
  if ($('#chatSheet')) return;
  const ov = document.createElement('div'); ov.className = 'overlay sheetwrap'; ov.id = 'chatSheet';
  ov.innerHTML = `<div class="sheet"><div class="sh-grab"></div><div class="sh-head"><b>💬 ${esc(t('chatT'))}</b><button class="btn sm ghost" id="csX" aria-label="${esc(t('close'))}">✕</button></div><div id="csRoot"></div></div>`;
  document.body.appendChild(ov);
  const c = chatUI($('#csRoot', ov), true);
  const h = setInterval(() => { if (!document.body.contains(ov)) { clearInterval(h); return; } if (!document.hidden) c.load(); }, 3000);
  const close = () => { clearInterval(h); ov.remove(); };
  $('#csX', ov).onclick = close; ov.addEventListener('click', e => { if (e.target === ov) close(); });
}

/* ---------- badges + background check (every 30 s while Leerhoek is open and visible) ---------- */
function updateBadges(games, chat) {
  const who = me(); if (!who) return;
  const b = S.badges = S.badges || {};
  if (games) {
    let inv = 0, turn = 0, from = '', newest = 0;
    games.forEach(g => { const R = chessReplay(g.events); if (!R) return; if (R.status === 'invite' && R.invitee === who.id && R.updated > Date.now() - 14 * 86400000) { inv++; from = pname(R.cfg.by, R.cfg); b.inviteGame = R.game; newest = Math.max(newest, R.cfg.at || 0); } if (R.status === 'active' && R.toMove === who.id) turn++; });
    b.invites = inv; b.myTurn = turn; b.inviteFrom = from;
    const seenInv = lsGet('lh.chess.invSeen.' + who.id, 0);
    if (newest > seenInv) { lsSet('lh.chess.invSeen.' + who.id, newest); if (S.route.s !== 'chess') ping(`${GICON[b.inviteGame] || '🎲'} ${tf('qgChallenges', { n: from, g: gname(b.inviteGame) })}`, 'skaak'); }
  }
  if (chat) {
    const seen = lsGet(seenKey(), 0);
    const unread = chat.filter(m => m.at > seen && m.by !== who.id && !m.sys);
    if (S.route.s !== 'chat' && !$('#chatSheet')) {
      const lastPinged = lsGet('lh.chatPinged.' + who.id, 0), newest = unread.length ? unread[unread.length - 1] : null;
      if (newest && newest.at > lastPinged) { lsSet('lh.chatPinged.' + who.id, newest.at); if (seen) ping(`💬 ${famName(newest.by)}: ${newest.txt.slice(0, 60)}`, 'klets'); }
      b.chat = unread.length;
      if (!seen && chat.length) lsSet(seenKey(), chat[chat.length - 1].at); // first time on this device: start counting from now
    } else b.chat = 0;
  }
  updateSocialUi();
}
function updateSocialUi() {
  const b = S.badges || {}, who = me();
  const cb = $('#chatBtn'); if (cb) { cb.hidden = !(online() && who); const n = $('#chatBdg'); if (n) { n.hidden = !b.chat; n.textContent = b.chat > 9 ? '9+' : (b.chat || ''); } }
  document.querySelectorAll('[data-go="speel"] .ic').forEach(ic => { let d = ic.querySelector('.nbdg'); const n = (b.invites || 0) + (b.myTurn || 0); if (n && !d) { d = document.createElement('span'); d.className = 'nbdg'; ic.appendChild(d); } if (d) { if (n) d.textContent = n; else d.remove(); } });
  const gn = $('#chChatN'); if (gn) { gn.hidden = !b.chat; gn.textContent = b.chat || ''; }
  const sb = $('#socialBan'); if (sb) { const h = socialBanInner(); if (sb.innerHTML !== h) { sb.innerHTML = h; sb.querySelectorAll('[data-go]').forEach(x => x.onclick = () => go(x.dataset.go)); } }
  const cc = document.querySelector('.chesscard'); if (cc) { const tmp = document.createElement('div'); tmp.innerHTML = chessHubCard(); const n = tmp.firstElementChild; if (cc.outerHTML !== n.outerHTML) { cc.replaceWith(n); n.onclick = () => go('skaak'); } }
}
function ping(msg, route) {
  const old = $('#lhPing'); if (old) old.remove();
  const el = document.createElement('button'); el.id = 'lhPing'; el.className = 'lhping'; el.textContent = msg;
  el.onclick = () => { el.remove(); go(route); };
  document.body.appendChild(el); sfx('gift');
  setTimeout(() => { if (el.isConnected) el.classList.add('out'); }, 7000); setTimeout(() => el.remove(), 7600);
}
async function refreshCircle(force) {
  if (!online() || !S.houseMe || (!force && Date.now() - (S._circleAt || 0) < 60000)) return;
  S._circleAt = Date.now();
  try {
    const c = (await S.store.rpc('lh_circle')) || [], sig = JSON.stringify(c);
    if (sig !== S._circleSig) { S._circleSig = sig; S.houseCircle = c; applyHousehold(S.houseMe, S.houseProf, c); updateSocialUi(); if (S.route && ['chat', 'chess'].includes(S.route.s)) render(); }
  } catch (e) {}
}
async function socialTick() {
  if (!online() || !me() || document.hidden) return;
  refreshCircle();
  try {
    const [games, chatRows] = await Promise.all([chessList(), S.store.loadPrefix('chat/fam/d/', 2)]);
    const chat = chatRows.map(r => r.value).reverse().flatMap(d => (d && d.events) || []).sort((a, z) => a.at - z.at);
    updateBadges(games, chat);
  } catch (e) {}
}
function socialInit() {
  const cb = $('#chatBtn'); if (cb) cb.onclick = () => go('klets');
  updateSocialUi();
  setTimeout(socialTick, 2500);
  setInterval(socialTick, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) setTimeout(socialTick, 800); });
}
/* parent panel card: choose Pa / Ma, then play chess or chat */
function socialParentCard() {
  const p = parentMe();
  return `<div class="card" style="margin-top:14px" id="socialCard"><h3>${esc(t('chParentT'))}</h3><p class="small muted" style="margin:4px 0 10px">${esc(t('chParentSub'))}</p>
    <div class="row" style="gap:8px"><span class="small"><b>${esc(t('chIAmL'))}</b></span><div class="seg">${PARENTS.map(p => p.id).map(x => `<button class="${p === x ? 'on' : ''}" data-pme="${x}">${famAv(x)} ${esc(famName(x))}</button>`).join('')}</div></div>
    <div class="row" style="margin-top:12px"><button class="btn subject" id="pChess" ${p ? '' : 'disabled'}>${esc(t('chPlay'))}</button><button class="btn" id="pChat" ${p && online() ? '' : 'disabled'}>${esc(t('chChat'))}</button></div></div>`;
}
function wireSocialParent(root) {
  const card = $('#socialCard', root); if (!card) return;
  card.querySelectorAll('[data-pme]').forEach(b => b.onclick = () => { setParentMe(b.dataset.pme); card.outerHTML = socialParentCard(); wireSocialParent(root); });
  const pc = $('#pChess', root), pt = $('#pChat', root);
  if (pc) pc.onclick = () => { setAsParent(true); go('skaak'); };
  if (pt) pt.onclick = () => { setAsParent(true); go('klets'); };
}

/* ---------- notifications for the boys (lh-notify v2: each device says who it belongs to) ---------- */
async function kidPushState() {
  const st = pushSupport(); if (st !== 'ok') return st;
  try { const reg = await navigator.serviceWorker.getRegistration(); const sub = reg && await reg.pushManager.getSubscription(); if (sub && Notification.permission === 'granted' && S.kid && lsGet('lh.kidPush', null) === S.kid.id) return 'on'; } catch (e) {}
  return 'off';
}
/* slot: element to fill; opts.always: also show when it is already on (schedule page) */
function kidPushCard(slot, opts) {
  opts = opts || {};
  if (!slot || !online() || !S.kid || adminViewing() || !pushUrl()) return;
  if (!opts.always && lsGet('lh.kpLater', '') === today()) return;
  kidPushState().then(state => {
    if (!slot.isConnected) return;
    if (state === 'on') {
      if (!opts.always) { slot.innerHTML = ''; return; }
      slot.innerHTML = `<div class="card kpcard on"><div class="row" style="justify-content:space-between;gap:8px"><span class="chip good">✅ ${esc(t('kpIsOn'))}</span><span class="row" style="gap:6px"><button class="btn sm" id="kpTest">🔔 ${esc(t('kpTest'))}</button><button class="btn sm ghost" id="kpOffB">${esc(t('kpOff'))}</button></span></div></div>`;
      $('#kpTest', slot).onclick = () => { pushCall('send', { to: [S.kid.id], title: 'Leerhoek ✅', body: t('kpTestMsg'), url: './#rooster' }).then(r => toast(t('pushSent').replace('{n}', r.sent))).catch(e => toast(t('pushFail') + ': ' + e.message)); };
      $('#kpOffB', slot).onclick = async () => { try { const reg = await navigator.serviceWorker.getRegistration(); const sub = reg && await reg.pushManager.getSubscription(); if (sub) { await pushCall('unsubscribe', { endpoint: sub.endpoint }).catch(() => {}); await sub.unsubscribe().catch(() => {}); } } catch (e) {} lsSet('lh.kidPush', null); kidPushCard(slot, opts); };
      return;
    }
    const note = state === 'ios-home' ? t('kpIos') : state === 'denied' ? t('kpDenied') : state === 'ios-old' ? t('kpIos') : state === 'none' ? t('kpNo') : '';
    slot.innerHTML = `<div class="card kpcard"><div class="kp-ic">🔔</div><div class="kp-t"><b>${esc(t('kpT'))}</b><span class="small muted">${esc(t('kpSub'))}</span>${note ? `<span class="small kp-note">${esc(note)}</span>` : ''}
      <span class="row" style="gap:6px;margin-top:8px">${state === 'off' ? `<button class="btn hi sm" id="kpOnB">🔔 ${esc(t('kpOn'))}</button>` : ''}${opts.always ? '' : `<button class="btn ghost sm" id="kpLater">${esc(t('kpLater'))}</button>`}</span></div></div>`;
    const lt = $('#kpLater', slot); if (lt) lt.onclick = () => { lsSet('lh.kpLater', today()); slot.innerHTML = ''; };
    const on = $('#kpOnB', slot);
    if (on) on.onclick = async () => {
      on.disabled = true;
      try {
        const perm = await Notification.requestPermission(); // straight away, while the tap still counts (iPhone)
        if (perm !== 'granted') { kidPushCard(slot, opts); return; }
        const info = await pushCall('key');
        const reg = await swReg();
        let s = await reg.pushManager.getSubscription();
        if (s && keyB64u(s.options && s.options.applicationServerKey) !== info.publicKey) { await s.unsubscribe().catch(() => {}); s = null; }
        if (!s) s = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: u8key(info.publicKey) });
        await pushCall('subscribe', { sub: s.toJSON(), key: info.publicKey, label: `${S.kid.name} · ${devLabel()}`, who: S.kid.id });
        lsSet('lh.kidPush', S.kid.id);
        if (!(S.settings || {}).push) { S.settings.push = true; S.store.saveSettings(S.settings).catch(() => {}); }
        pushCall('send', { to: [S.kid.id], title: 'Leerhoek ✅', body: t('kpTestMsg'), url: './#rooster' }).catch(() => {});
        toast(t('saved'));
      } catch (err) { toast(t('pushFail') + ': ' + (err.message || err)); }
      kidPushCard(slot, opts);
    };
  });
}

/* ---------- study schedule: tests (settings.tests) + the exam timetable (settings.exams) ---------- */
const REMIND_DEFAULT = { on: true, study: '15:30', weekend: '10:00', evening: '18:30', morning: '06:45', testDays: 3, examDays: 7, parents: false };
const remindCfg = () => Object.assign({}, REMIND_DEFAULT, (S.settings || {}).remind || {});
function schedItems(kidId) {
  const st = S.settings || {}, td = today(), rc = remindCfg(), out = [];
  (st.tests || []).forEach(x => { if (!x || !x.date || !(x.kid === 'both' || x.kid === kidId)) return; const s = subjById(x.subj); out.push({ kind: 'test', s, subj: x.subj, date: x.date, title: x.title || '', topics: x.topics || [], id: x.id }); });
  subjectsOfGrade(kidGrade(kidId), kidId).forEach(s => { const e = examsFor(s.grade)[s.id]; if (e && e.date) out.push({ kind: 'exam', s, subj: s.id, date: e.date, title: e.note || '', topics: e.topics || null }); });
  return out.map(x => Object.assign(x, { days: daysBetween(td, x.date), lead: x.kind === 'test' ? rc.testDays : rc.examDays }))
    .filter(x => x.days >= 0).sort((a, b) => a.days - b.days || (a.kind === 'test' ? -1 : 1));
}
const inStudyWindow = (x) => x.days >= 0 && x.days <= x.lead;
function itemTitle(x) { return `${x.s ? x.s.icon + ' ' + tx(x.s.short) : x.subj} · ${x.kind === 'test' ? t('roTest') : t('roExam')}${x.title ? ' – ' + x.title : ''}`; }
function whenText(x) { return x.days === 0 ? t('roToday2') : x.days === 1 ? t('roTomorrow') : tf('roIn', { n: x.days }); }
function roosterHomeCard(kid) {
  const items = schedItems(kid.id); if (!items.length) return '';
  const x = items[0], hot = inStudyWindow(x);
  return `<button class="card rohome ${hot ? 'hot' : ''}" data-go="rooster" style="--subject:${x.s ? x.s.color : 'var(--brand)'}"><span class="ro-ic">📅</span><span class="ro-t"><span class="label">${esc(t('roHome'))}</span><b>${esc(itemTitle(x))}</b><span class="small muted">${esc(fmtDate(x.date))} · ${esc(whenText(x))}${hot ? ' · ' + esc(x.days === 1 ? t('roLast') : t('roStarted')) : ''}</span></span><span class="cc-go">▶</span></button>`;
}
function renderRooster(main) {
  const kid = S.kid, items = schedItems(kid.id), now = items.filter(inStudyWindow), plan = dailyPlan(kid);
  const go2 = (x) => x.kind === 'exam' ? `afbakening-${x.subj}` : `vak-${x.subj}`;
  main.innerHTML = `<button class="back" data-go="home">← ${esc(t('home'))}</button><h1>📅 ${esc(t('roT'))}</h1><p class="muted" style="margin:4px 0 14px">${esc(t('roSub'))}</p>
  <div id="kpSlot2"></div>
  <div class="card" style="margin-top:14px"><h2>📚 ${esc(t('roToday'))}</h2>${now.length ? `<div class="stack" style="gap:8px;margin-top:10px">${now.map(x => `<div class="roitem hot" style="--subject:${x.s ? x.s.color : 'var(--brand)'}"><div><b>${esc(itemTitle(x))}</b><div class="small muted">${esc(fmtDate(x.date))} · ${esc(whenText(x))}${x.days === 1 ? ' · ' + esc(t('roLast')) : ''}</div></div><button class="btn sm subject" data-go="${go2(x)}">${esc(t('roOpen'))}</button></div>`).join('')}</div>` : `<p class="small muted" style="margin-top:8px">${esc(t('roNothing'))}</p>`}
    ${plan.length ? `<h3 style="margin-top:14px">🎯 ${esc(t('roPlan'))}</h3><ul class="roplan">${plan.map(m => `<li><button data-go="${topicStatus(kid, m.tp.id) === 'new' ? 'onderwerp-' : 'toets-'}${m.tp.id}" style="--subject:${m.s.color}">${isDoneToday(kid, m.tp.id) ? '✅' : '⬜'} ${m.s.icon} ${esc(tx(m.tp.title))}${m.why ? ` <span class="small muted">· ${esc(m.why)}</span>` : ''}</button></li>`).join('')}</ul>` : ''}</div>
  <div class="card" style="margin-top:14px"><h2>🗓️ ${esc(t('roNext'))}</h2>${items.length ? `<div class="rotl">${items.map(x => `<div class="rorow ${inStudyWindow(x) ? 'hot' : ''}" style="--subject:${x.s ? x.s.color : 'var(--brand)'}"><div class="rodate"><b class="num">${esc(fmtDate(x.date))}</b><span class="small muted">${esc(whenText(x))}</span></div><div class="romain"><b>${esc(itemTitle(x))}</b><div class="small muted">${inStudyWindow(x) ? '📚 ' + esc(t('roStarted')) : `📚 ${esc(t('roStart'))}: ${esc(fmtDate(ymd(new Date(new Date(x.date + 'T12:00:00').getTime() - x.lead * 86400000))))}`}</div></div><span class="chip ${x.kind === 'exam' ? 'hi' : ''}">${esc(x.kind === 'exam' ? t('roExam') : t('roTest'))}</span></div>`).join('')}</div>` : `<p class="small muted" style="margin-top:8px">${esc(t('roNone'))}</p>`}</div>`;
  main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  kidPushCard($('#kpSlot2'), { always: true });
}
/* parent panel: tests + reminder settings */
function testsEditor(subjects) {
  const st = S.settings || {}, rc = remindCfg(), td = today();
  const list = (st.tests || []).filter(x => x && x.date >= ymd(new Date(Date.now() - 2 * 86400000))).sort((a, b) => a.date < b.date ? -1 : 1);
  const kidOpt = (v, l) => `<option value="${v}">${esc(l)}</option>`;
  return `<div class="card" style="margin-top:14px" id="teCard"><h3>${esc(t('teT'))}</h3><p class="small muted" style="margin:4px 0 10px;max-width:75ch">${esc(t('teSub'))}</p>
    <form id="teForm" class="teform"><label><span class="small">${esc(t('teFor'))}</span><select id="teKid">${kidOpt('both', t('teBoth'))}${KIDS.map(k => kidOpt(k.id, k.name)).join('')}</select></label>
      <label><span class="small">${esc(t('teSubj'))}</span><select id="teSubj">${subjects.map(s => `<option value="${s.id}">${s.icon} ${esc(tx(s.short))}</option>`).join('')}</select></label>
      <label><span class="small">${esc(t('teDate'))}</span><input type="date" id="teDate" min="${td}" required></label>
      <label class="wide"><span class="small">${esc(t('teWhat'))}</span><input id="teWhat" maxlength="60"></label>
      <button class="btn primary" type="submit">${esc(t('teAdd'))}</button></form>
    <div class="telist">${list.length ? list.map(x => { const s = subjById(x.subj); const d = daysBetween(td, x.date); return `<div class="terow"><span><b>${esc(fmtDate(x.date))}</b> · ${s ? s.icon + ' ' + esc(tx(s.short)) : esc(x.subj)}${x.title ? ' – ' + esc(x.title) : ''} <span class="small muted">· ${x.kid === 'both' ? esc(t('teBoth')) : esc(famName(x.kid))}${d >= 0 ? ' · ' + esc(tf('roIn', { n: d })) : ''}</span></span><button class="btn sm ghost" data-tdel="${esc(x.id)}" aria-label="${esc(t('teDel'))}">✕</button></div>`; }).join('') : `<p class="small muted">${esc(t('teNone'))}</p>`}</div>
    <h3 style="margin-top:16px">${esc(t('reT'))}</h3>
    <form id="reForm" class="reform"><label class="ck"><input type="checkbox" id="reOn" ${rc.on ? 'checked' : ''}> <span>${esc(t('reOn'))}</span></label>
      <div class="regrid"><label><span class="small">${esc(t('reStudy'))}</span><input type="time" id="reStudy" value="${esc(rc.study)}"></label><label><span class="small">${esc(t('reWeekend'))}</span><input type="time" id="reWeekend" value="${esc(rc.weekend)}"></label><label><span class="small">${esc(t('reEvening'))}</span><input type="time" id="reEvening" value="${esc(rc.evening)}"></label><label><span class="small">${esc(t('reMorning'))}</span><input type="time" id="reMorning" value="${esc(rc.morning)}"></label>
      <label><span class="small">${esc(t('reTestDays'))}</span><input type="number" min="1" max="14" id="reTD" value="${rc.testDays}"></label><label><span class="small">${esc(t('reExamDays'))}</span><input type="number" min="1" max="30" id="reED" value="${rc.examDays}"></label></div>
      <label class="ck"><input type="checkbox" id="reParents" ${rc.parents ? 'checked' : ''}> <span>${esc(t('reParents'))}</span></label>
      <button class="btn primary" type="submit">${esc(t('save'))}</button></form></div>`;
}
function wireTestsEditor(root, subjects) {
  const card = $('#teCard', root); if (!card) return;
  const redraw = () => { card.outerHTML = testsEditor(subjects); wireTestsEditor(root, subjects); };
  $('#teForm', card).onsubmit = async (e) => {
    e.preventDefault(); const date = $('#teDate', card).value; if (!date) return;
    S.settings.tests = (S.settings.tests || []).filter(x => x && x.date >= ymd(new Date(Date.now() - 30 * 86400000)));
    S.settings.tests.push({ id: rid(), kid: $('#teKid', card).value, subj: $('#teSubj', card).value, date, title: $('#teWhat', card).value.trim().slice(0, 60) });
    await S.store.saveSettings(S.settings); toast(t('saved')); redraw();
  };
  card.querySelectorAll('[data-tdel]').forEach(b => b.onclick = async () => { S.settings.tests = (S.settings.tests || []).filter(x => x.id !== b.dataset.tdel); await S.store.saveSettings(S.settings); redraw(); });
  $('#reForm', card).onsubmit = async (e) => {
    e.preventDefault();
    const tm = (id, d) => /^\d\d:\d\d$/.test($(id, card).value) ? $(id, card).value : d;
    S.settings.remind = { on: $('#reOn', card).checked, study: tm('#reStudy', '15:30'), weekend: tm('#reWeekend', '10:00'), evening: tm('#reEvening', '18:30'), morning: tm('#reMorning', '06:45'), testDays: clamp(+$('#reTD', card).value || 3, 1, 14), examDays: clamp(+$('#reED', card).value || 7, 1, 30), parents: $('#reParents', card).checked };
    await S.store.saveSettings(S.settings); toast(t('reSaved'));
  };
}


/* ------------------------------------------------------------------ v10: self-setup link #s=CODE + invites */
const AV_KIDS = ['🦁', '🐆', '🐯', '🐻', '🐼', '🦊', '🐺', '🦅', '🐬', '🦄', '🐸', '🐵', '🐨', '🦉', '🐙', '🐝', '🦋', '🐢'];
const AV_PAR = ['👨', '👩', '🧔', '👱‍♀️', '👴', '👵', '🧑', '👱'];
const ROUTE_WORDS = ['ouer', 'parent', 'home', 'tuis', 'vakke', 'kentekens', 'hulpbronne', 'profiel', 'eksamens', 'foute', 'speel', 'uitdaging', 'woordeboek', 'afrigter', 'skaak', 'vraagspel', 'rooster', 'klets'];
function slugId(s) { const x = String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '').slice(0, 12); return x.length >= 2 ? x : (x + 'kind').slice(0, 6); }
function uniqId(base, taken) { let id = base, n = 2; while (taken.has(id)) id = base + (n++); taken.add(id); return id; }
function setupGradeNote() { const gs = (S.content && S.content.grades) || []; return gs.map(g => `${t('chooseGrade')} ${g.grade}${g.subjects.length < 5 ? ' (' + g.subjects.map(s => s.name ? tx(s.name) : s.id).join(', ') + ')' : ''}`).join(' · '); }
function renderSetup(main, code, r) {
  r = r || S.route || {};
  if (S.setupDone) return renderSetupDone(main, S.setupDone);
  if (!S.setupState) {
    const sep = !!r.sep;
    if (r.lang && r.lang !== L) setLangQuiet(r.lang);
    S.setupState = { sep, lang: r.lang === 'en' ? (sep ? 'en' : 'en2') : 'af', house: '', parents: [{ name: L === 'en' ? 'Dad' : 'Pa', circle: '', av: '👨' }, { name: L === 'en' ? 'Mom' : 'Ma', circle: '', av: '👩' }], kids: [{ name: '', av: '🦁', role: 'learner', grade: 8, school: '', skip: [], extra: '' }] };
  }
  const st = S.setupState;
  const gopts = (sel) => Array.from({ length: 12 }, (_, i) => i + 1).map(g => `<option value="${g}" ${+sel === g ? 'selected' : ''}>${g}</option>`).join('');
  const avSel = (list, cur, attr) => `<select ${attr} aria-label="Avatar" style="font-size:20px">${list.map(a => `<option ${a === cur ? 'selected' : ''}>${a}</option>`).join('')}</select>`;
  main.innerHTML = `<div class="card pad-lg" style="max-width:720px;margin:12px auto;text-align:left"><div style="text-align:center">${mascot()}</div><h1 style="margin-top:8px">👋 ${esc(t('setupT'))}</h1><p class="small muted" style="margin:6px 0 14px">${esc(t(st.sep ? 'setupSubSep' : 'setupSub'))}</p>
  <form id="setupF" class="stack" style="gap:14px" autocomplete="off">
    <div class="form-row"><label for="suLang">🌐 ${esc(t('suLang'))}</label><select id="suLang">${setupLangOpts(st.lang)}</select></div>
    <div class="form-row"><label for="suHouse">${esc(t('setupHouse'))}</label><input id="suHouse" maxlength="60" placeholder="${esc(t('setupHouseP'))}" value="${esc(st.house)}"></div>
    <h3>${esc(t('setupParents'))}</h3>
    ${st.parents.map((p, i) => `<div class="card" style="padding:12px"><div class="small muted" style="margin-bottom:6px">${esc(i ? t('setupParent2') : t('setupParent1'))}</div><div class="row" style="gap:8px;flex-wrap:wrap">${avSel(AV_PAR, p.av, `data-pav="${i}"`)}<input data-pnm="${i}" maxlength="24" placeholder="${esc(t('setupParentNmP'))}" value="${esc(p.name)}" aria-label="${esc(t('setupParentNm'))}" style="flex:1;min-width:110px">${st.sep ? '' : `<input data-pci="${i}" maxlength="30" placeholder="${esc(t('setupParentCircP'))}" value="${esc(p.circle)}" aria-label="${esc(t('setupParentCirc'))}" style="flex:1;min-width:140px">`}</div>${st.sep ? '' : `<div class="small muted" style="margin-top:4px">${esc(t('setupParentHelp'))}</div>`}</div>`).join('')}
    <h3>${esc(t('setupKids'))}</h3>
    ${st.kids.map((k, i) => { const list = gradeSubjList(k.grade); return `<div class="card" style="padding:12px"><div class="row" style="gap:8px;flex-wrap:wrap">${avSel(AV_KIDS, k.av, `data-kav="${i}"`)}<input data-knm="${i}" maxlength="24" placeholder="${esc(t('setupKidNm'))}" value="${esc(k.name)}" aria-label="${esc(t('setupKidNm'))}" style="flex:1;min-width:110px"><select data-krole="${i}" aria-label="${esc(t('setupKidRole'))}"><option value="learner" ${k.role !== 'player' ? 'selected' : ''}>${esc(t('setupLearner'))}</option><option value="player" ${k.role === 'player' ? 'selected' : ''}>${esc(t('setupPlayer'))}</option></select></div>
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center"><label class="small">${esc(k.role === 'player' ? t('setupLevel') : t('setupGrade'))} <select data-kgr="${i}">${gopts(k.grade)}</select></label>${k.role === 'player' ? '' : `<input data-ksc="${i}" maxlength="50" placeholder="${esc(t('setupSchool'))}" value="${esc(k.school)}" aria-label="${esc(t('setupSchool'))}" style="flex:1;min-width:160px">`}${st.kids.length > 1 ? `<button type="button" class="btn sm ghost" data-kdel="${i}">✕ ${esc(t('setupDel'))}</button>` : ''}</div>
      ${k.role === 'player' ? '' : `${gradeHasContent(k.grade) ? '' : `<div class="small muted" style="margin-top:8px">ℹ️ ${esc(tf('suNoContent', { g: k.grade }))}</div>`}${subjTicks(list, k.skip || [], 'data-ksk', i)}<div class="form-row" style="margin-top:8px"><label class="small" for="suX${i}">${esc(t('suExtra'))}</label><input id="suX${i}" data-kx="${i}" maxlength="200" placeholder="${esc(t('suExtraP'))}" value="${esc(k.extra || '')}"></div>`}</div>`; }).join('')}
    <div><button type="button" class="btn sm" id="suAdd">${esc(t('setupAddKid'))}</button></div>
    <p class="small muted">${esc(tf('setupGradeNote', { g: setupGradeNote() }))}</p>
    <h3>🔐 ${esc(t('setupPin'))}</h3><p class="small muted" style="margin-top:-8px">${esc(t('setupPinHint'))}</p>
    <div class="row" style="gap:8px;flex-wrap:wrap"><input id="suPin" type="password" inputmode="numeric" maxlength="6" placeholder="••••" aria-label="${esc(t('setupPin'))}"><input id="suPin2" type="password" inputmode="numeric" maxlength="6" placeholder="${esc(t('setupPin2'))}" aria-label="${esc(t('setupPin2'))}"></div>
    <div id="suErr" class="small" style="color:var(--bad);min-height:18px"></div>
    <button class="btn primary block" type="submit" id="suGo">${esc(t('setupGo'))}</button>
  </form></div>`;
  const F = $('#setupF');
  const grab = () => {
    st.house = $('#suHouse').value; st.lang = $('#suLang').value;
    st.parents.forEach((p, i) => { p.name = F.querySelector(`[data-pnm="${i}"]`).value; const ci = F.querySelector(`[data-pci="${i}"]`); p.circle = ci ? ci.value : ''; p.av = F.querySelector(`[data-pav="${i}"]`).value; });
    st.kids.forEach((k, i) => {
      k.name = F.querySelector(`[data-knm="${i}"]`).value; k.av = F.querySelector(`[data-kav="${i}"]`).value; k.role = F.querySelector(`[data-krole="${i}"]`).value; k.grade = +F.querySelector(`[data-kgr="${i}"]`).value;
      const sc = F.querySelector(`[data-ksc="${i}"]`); if (sc) k.school = sc.value;
      const ticks = [...F.querySelectorAll(`[data-ksk="${i}"]`)]; if (ticks.length) k.skip = ticks.filter(c => !c.checked).map(c => c.value);
      const x = F.querySelector(`[data-kx="${i}"]`); if (x) k.extra = x.value;
    });
  };
  const again = () => renderSetup(main, code, r);
  $('#suLang').onchange = () => { grab(); setLangQuiet(langOf(st.lang).lang); again(); };
  F.querySelectorAll('[data-krole]').forEach(x => x.onchange = () => { grab(); again(); });
  F.querySelectorAll('[data-kgr]').forEach(x => x.onchange = () => { grab(); st.kids[+x.dataset.kgr].skip = []; again(); });
  $('#suAdd').onclick = () => { grab(); const last = st.kids[st.kids.length - 1] || {}; st.kids.push({ name: '', av: AV_KIDS[st.kids.length % AV_KIDS.length], role: 'learner', grade: last.grade || 8, school: last.school || '', skip: [], extra: '' }); again(); };
  F.querySelectorAll('[data-kdel]').forEach(b => b.onclick = () => { grab(); st.kids.splice(+b.dataset.kdel, 1); again(); });
  F.onsubmit = async (e) => {
    e.preventDefault(); grab(); const err = (k) => { $('#suErr').textContent = t(k); };
    const parents = st.parents.filter(p => p.name.trim()), kids = st.kids.filter(k => k.name.trim());
    if (!st.house.trim() || !parents.length) return err('setupErrName');
    if (!kids.length) return err('setupErrKid');
    const pin = $('#suPin').value.trim(); if (!/^\d{4,6}$/.test(pin) || pin !== $('#suPin2').value.trim()) return err('setupErrPin');
    const btn = $('#suGo'); btn.disabled = true; btn.textContent = t('setupBusy');
    try { S.setupDone = await doSetup(code, st.house.trim(), parents, kids, pin, st); S.setupState = null; renderSetup(main, code, r); }
    catch (ex) { btn.disabled = false; btn.textContent = t('setupGo'); err(ex && ex.message === 'invite' ? 'setupErrInv' : 'setupErrNet'); }
  };
}
async function doSetup(code, house, parents, kids, pin, opt) {
  opt = opt || {};
  const cfg = window.LH_CONFIG; if (!cfg || !cfg.supabaseUrl) throw new Error('net');
  const h = { apikey: cfg.supabaseKey, 'Content-Type': 'application/json' }; if (/^eyJ/.test(cfg.supabaseKey)) h.Authorization = 'Bearer ' + cfg.supabaseKey;
  const r = await fetch(cfg.supabaseUrl.replace(/\/$/, '') + '/rest/v1/rpc/lh_setup', { method: 'POST', headers: h, body: JSON.stringify({ code, hname: house }) });
  if (!r.ok) { const txt = await r.text().catch(() => ''); throw new Error(/invite invalid/.test(txt) ? 'invite' : 'net'); }
  const key = JSON.parse(await r.text());
  const st = new SupaStore(cfg.supabaseUrl, cfg.supabaseKey, key);
  const taken = new Set(ROUTE_WORDS.concat(['pa', 'ma', 'diaan', 'stefan']));
  try { ((await st.rpc('lh_circle')) || []).forEach(hh => { const p = hh.profile || {}; (p.kids || []).concat(p.parents || []).forEach(m => taken.add(m.id)); }); } catch (e) {}
  const lg = langOf(opt.lang || 'af');
  const prof = Object.assign({ v: 1, name: house }, lg, {
    kids: kids.map(k => { const learner = k.role !== 'player', g = +k.grade || 8, list = gradeSubjList(g).map(x => x.id), skip = learner && Array.isArray(k.skip) ? k.skip.filter(x => list.includes(x)) : [], extra = learner ? extraOf(k.extra) : [];
      return Object.assign({ id: uniqId(slugId(k.name), taken), name: k.name.trim().slice(0, 24), avatar: k.av, role: learner ? 'learner' : 'player', grade: g, school: learner ? String(k.school || '').trim().slice(0, 50) : '' }, skip.length ? { skip } : {}, extra.length ? { extra } : {}); }),
    parents: parents.map(p => ({ id: uniqId('p' + slugId(p.circle || p.name).slice(0, 10), taken), name: p.name.trim().slice(0, 24), circleName: String(p.circle || p.name).trim().slice(0, 30), avatar: p.av })) });
  await st.put('household/profile', prof);
  await st.put('settings/main', { pinHash: await sha(pin), examDate: null, examTitle: '', currentTerm: null });
  try { localStorage.setItem('lh.fk', key); localStorage.setItem('lh.lock', 'ouer'); localStorage.removeItem('lh.kid'); localStorage.setItem('lh.lang', lg.lang); } catch (e) {}
  return { key, prof };
}
function renderSetupDone(main, d) {
  const base = location.origin + location.pathname, link = (route) => `${base}#k=${d.key}~${route}`;
  const row = (av, nm, route, who) => { const u = link(route); return `<div class="card" style="padding:12px"><div class="row" style="justify-content:space-between;gap:8px;flex-wrap:wrap"><b>${av} ${esc(nm)}</b><span class="row" style="gap:6px"><button class="btn sm" data-copy="${esc(u)}">📋 ${esc(t('setupCopy'))}</button><a class="btn sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(tf('setupWaMsg', { n: who, u }))}">💬 WhatsApp</a></span></div><div class="small muted" style="word-break:break-all;margin-top:6px">${esc(u)}</div></div>`; };
  main.innerHTML = `<div class="card pad-lg" style="max-width:720px;margin:12px auto;text-align:left"><h1>🎉 ${esc(t('setupDoneT'))}</h1><p class="small muted" style="margin:6px 0 14px">${esc(t('setupDoneSub'))}</p>
    <div class="stack" style="gap:10px" id="suLinks">${d.prof.kids.map(k => row(k.avatar, k.name, k.id, k.name)).join('')}
    ${row(d.prof.parents.map(p => p.avatar).join(''), t('setupParentsLink'), 'ouer', d.prof.parents.map(p => p.name).join(' & '))}</div>
    <p class="small" style="margin-top:14px"><b>${esc(t('setupKeep'))}</b></p>
    <button class="btn primary block" id="suOpen" style="margin-top:10px">${esc(t('setupOpenMine'))}</button></div>`;
  main.querySelectorAll('[data-copy]').forEach(b => b.onclick = async () => { if (await copyText(b.dataset.copy)) toast(t('copied')); });
  $('#suOpen').onclick = () => { location.href = base + '?k=' + d.key + '#ouer'; };
}
/* owner household: invite a family + usage totals of the circle */
function circleCard() {
  if (!online() || !HOUSE.owner) return '';
  return `<div class="card" style="margin-top:14px" id="circleCard"><h3>${esc(t('invT'))}</h3><p class="small muted" style="margin:4px 0 10px">${esc(t('invSub'))}</p>
    <div class="row" style="gap:8px;flex-wrap:wrap"><input id="invLabel" maxlength="40" placeholder="${esc(t('invLabelP'))}" style="flex:1;min-width:160px"><button class="btn primary" id="invMake">${esc(t('invMake'))}</button></div>
    ${HOUSE.id === 'h1' ? `<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px"><select id="invKind" aria-label="${esc(t('invKindL'))}"><option value="fam">👪 ${esc(t('invKindFam'))}</option><option value="sep">🔒 ${esc(t('invKindSep'))}</option></select><select id="invLang" aria-label="${esc(t('suLang'))}"><option value="af">🌐 Afrikaans</option><option value="en">🌐 English</option></select></div><p class="small muted" id="invHelp" style="margin:6px 0 0">${esc(t('invHelpFam'))}</p>` : ''}
    <div id="invOut" style="margin-top:10px"></div>
    <details style="margin-top:10px"><summary class="small">${esc(t('invList'))}</summary><div id="invList" class="small" style="margin-top:6px">…</div></details>
    ${(S.houseCircle || []).filter(x => !x.me).length ? `<h3 style="margin-top:16px">${esc(t('kringHouses'))}</h3><div class="stack" style="gap:6px;margin-top:6px">${(S.houseCircle || []).filter(x => !x.me).map(x => `<div class="row" style="justify-content:space-between;gap:8px"><span class="small">🏠 ${esc(x.name || '—')} <span class="muted">· ${((x.profile || {}).kids || []).map(k => esc(k.avatar || '') + ' ' + esc(k.name)).join(', ')}</span></span><button type="button" class="btn sm ghost" data-kick="${esc(x.hid)}">${esc(t('kringKick'))}</button></div>`).join('')}</div>` : ''}
    <h3 style="margin-top:16px">${esc(t('kringT'))}</h3><p class="small muted" style="margin:4px 0 8px">${esc(t('kringSub'))}</p><div id="kringUse" class="small">…</div></div>`;
}
function wireCircleCard(root) {
  const card = $('#circleCard', root); if (!card) return;
  const base = location.origin + location.pathname;
  const loadInv = async () => { const box = $('#invList', card); try { const l = (await S.store.rpc('lh_invites')) || []; box.innerHTML = l.length ? l.map(x => `<div>• ${x.sep ? '🔒 ' : ''}${esc(x.label || '—')} – ${x.used ? esc(tf('invUsed', { n: x.by || '?' })) : new Date(x.expires) < new Date() ? esc(t('invExpired')) : esc(tf('invOpen', { d: fmtDate(String(x.expires).slice(0, 10)) }))}</div>`).join('') : '<span class="muted">—</span>'; } catch (e) { box.textContent = '—'; } };
  const kindSel = $('#invKind', card), langSel = $('#invLang', card);
  if (kindSel) kindSel.onchange = () => { $('#invHelp', card).textContent = t(kindSel.value === 'sep' ? 'invHelpSep' : 'invHelpFam'); if (kindSel.value === 'sep' && langSel) langSel.value = 'en'; };
  $('#invMake', card).onclick = async () => {
    const lb = $('#invLabel', card).value.trim(), sep = !!kindSel && kindSel.value === 'sep', lg = langSel ? langSel.value : 'af';
    try {
      const code = await S.store.rpc('lh_invite', sep ? { label: lb, sep: true } : { label: lb }), u = `${base}#s=${code}${lg === 'en' ? '~en' : ''}${sep ? '~sep' : ''}`;
      const wa = String((lg === 'en' ? UI.en : UI.af).invMsg).replace('{u}', u);
      $('#invOut', card).innerHTML = `<div class="card" style="padding:12px">${sep ? `<div class="small" style="margin-bottom:6px"><b>🔒 ${esc(t('invKindSep'))}</b></div>` : ''}<div class="small" style="word-break:break-all" id="invUrl">${esc(u)}</div><div class="row" style="gap:6px;margin-top:8px"><button class="btn sm" id="invCopy">📋 ${esc(t('setupCopy'))}</button><a class="btn sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(wa)}">💬 WhatsApp</a></div></div>`;
      $('#invCopy', card).onclick = async () => { if (await copyText(u)) toast(t('copied')); };
      $('#invLabel', card).value = ''; loadInv();
    } catch (e) { toast(t('setupErrNet')); }
  };
  loadInv();
  card.querySelectorAll('[data-kick]').forEach(b => b.onclick = async () => {
    if (!b.dataset.sure) { b.dataset.sure = '1'; b.textContent = t('kringKickSure'); return; }
    try { await S.store.rpc('lh_kick', { hid: b.dataset.kick }); await loadHousehold(); toast(t('kringKicked')); render(); } catch (e) { toast(t('setupErrNet')); }
  });
  (async () => {
    const box = $('#kringUse', card);
    try {
      const rows = (await S.store.rpc('lh_circle_usage')) || []; const cols = t('kringCols');
      box.innerHTML = rows.length ? `<div class="tbl"><table class="marks"><tr>${cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr>${rows.map(r => { const tt = r.totals || {}; return `<tr><td>${esc(r.avatar || '🙂')} ${esc(r.name || '')} <span class="muted">(${r.sep ? '🔒 ' : ''}${esc(r.house || '')})</span></td><td class="num">${r.role === 'player' ? '🎲' : esc(String(r.grade || ''))}</td><td class="num">${+r.xp || 0}</td><td class="num">${+tt.quizzes || 0}</td><td class="num">${Math.round((+tt.secs || 0) / 60)}</td><td>${r.updated ? esc(fmtDay(new Date(+r.updated).toISOString().slice(0, 10))) : '—'}</td></tr>`; }).join('')}</table></div>` : `<span class="muted">${esc(t('kringNone'))}</span>`;
    } catch (e) { box.textContent = '—'; }
  })();
}
Object.assign(UI.af, {
  setupT: 'Welkom by Leerhoek', setupSub: 'Stel julle gesin op – dit vat 2 minute. Net julle sien julle kinders se vordering. Die speletjies en die familiekring-klets deel julle met die res van die familie.',
  setupHouse: 'Gesinsnaam', setupHouseP: 'bv. Johan en Marietjie', setupParents: '👪 Ouers', setupParent1: 'Ouer 1', setupParent2: 'Ouer 2 (opsioneel – maak leeg as daar net een is)',
  setupParentNm: 'Naam vir jou kinders', setupParentNmP: 'Vir jou kinders, bv. Pa', setupParentCirc: 'Naam vir die res van die familie', setupParentCircP: 'Vir die familie, bv. Oom Johan',
  setupParentHelp: 'Jou kinders sien die eerste naam; die neefs en niggies sien die tweede.',
  setupKids: '🧒 Kinders', setupKidNm: 'Naam', setupKidRole: 'Gebruik', setupLearner: '📚 Leer + speel', setupPlayer: '🎲 Net speletjies + klets', setupGrade: 'Graad', setupLevel: 'Speel op graad-vlak', setupSchool: 'Skool', setupAddKid: '＋ Nog ’n kind', setupDel: 'Verwyder',
  setupGradeNote: 'Inhoud tans beskikbaar: {g}. Ander grade en vakke kom by soos dit gebou word.',
  setupPin: 'Ouer-PIN (4–6 syfers)', setupPin2: 'Herhaal PIN', setupPinHint: 'Net die ouers ken dit – dit sluit die ouerblad (vordering, instellings).',
  setupGo: 'Stoor en kry ons skakels', setupBusy: 'Besig…',
  setupErrName: 'Vul die gesinsnaam en minstens een ouer se naam in.', setupErrKid: 'Voeg minstens een kind by (met ’n naam).', setupErrPin: 'Die PIN moet 4–6 syfers wees en twee keer dieselfde.',
  setupErrInv: 'Hierdie uitnodiging werk nie meer nie (reeds gebruik of verval). Vra vir ’n nuwe skakel.', setupErrNet: 'Kon nie die bediener bereik nie – probeer weer.',
  setupDoneT: 'Klaar! Hier is julle skakels', setupDoneSub: 'Stuur elke persoon sy of haar eie skakel. Maak dit op daardie persoon se foon oop en sit dit op die tuisskerm (Deel → Voeg by tuisskerm). Elke skakel koppel die foon aan net daardie persoon.',
  setupParentsLink: 'Ouers (albei gebruik hierdie skakel)', setupCopy: 'Kopieer', setupKeep: 'Bewaar hierdie skakels – dit is julle gesin se sleutel tot Leerhoek.', setupOpenMine: 'Maak my ouerblad oop',
  setupWaMsg: 'Hier is jou Leerhoek-skakel, {n}: {u}',
  invT: '✉️ Nooi ’n gesin na die familiekring', invSub: 'Maak ’n eenmalige skakel (14 dae geldig). Die gesin stel self hul name, kinders, grade en PIN op. Elke gesin se vordering bly privaat; net speletjies en die familiekring-klets word gedeel.',
  invLabelP: 'Vir wie? bv. Boet Johan', invMake: 'Maak skakel', invMsg: 'Hallo! Hier is julle skakel om Leerhoek vir julle gesin op te stel (werk een keer, 14 dae geldig): {u}',
  invList: 'Uitnodigings', invUsed: 'opgestel deur {n}', invOpen: 'nog oop tot {d}', invExpired: 'verval',
  kringT: '👨‍👩‍👧‍👦 Familiekring – gebruik', kringSub: 'Net totale (XP, toetse, minute, laaste aktiwiteit) – nie hul antwoorde, punte of klets nie.', kringNone: 'Nog geen ander gesinne in die kring nie.',
  kringCols: ['Wie', 'Graad', 'XP', 'Toetse', 'Min', 'Laaste'],
  chatFam: 'Ons gesin', chatKring: 'Familiekring', chatSubK: 'Vir almal in die familiekring – ooms, tannies, neefs en niggies.',
});
Object.assign(UI.en, {
  setupT: 'Welcome to Leerhoek', setupSub: "Set up your family – it takes 2 minutes. Only you see your children's progress. The games and the family-circle chat are shared with the rest of the family.",
  setupHouse: 'Family name', setupHouseP: 'e.g. John and Mary', setupParents: '👪 Parents', setupParent1: 'Parent 1', setupParent2: 'Parent 2 (optional – leave empty if there is only one)',
  setupParentNm: 'Name your children use', setupParentNmP: 'For your children, e.g. Dad', setupParentCirc: 'Name for the rest of the family', setupParentCircP: 'For the family, e.g. Uncle John',
  setupParentHelp: 'Your children see the first name; nephews and nieces see the second.',
  setupKids: '🧒 Children', setupKidNm: 'Name', setupKidRole: 'Use', setupLearner: '📚 Learn + play', setupPlayer: '🎲 Games + chat only', setupGrade: 'Grade', setupLevel: 'Play at grade level', setupSchool: 'School', setupAddKid: '＋ Another child', setupDel: 'Remove',
  setupGradeNote: 'Content available now: {g}. Other grades and subjects are added as they are built.',
  setupPin: 'Parent PIN (4–6 digits)', setupPin2: 'Repeat PIN', setupPinHint: 'Only the parents know it – it locks the parent panel (progress, settings).',
  setupGo: 'Save and get our links', setupBusy: 'Working…',
  setupErrName: "Fill in the family name and at least one parent's name.", setupErrKid: 'Add at least one child (with a name).', setupErrPin: 'The PIN must be 4–6 digits and the same twice.',
  setupErrInv: "This invite doesn't work any more (already used or expired). Ask for a new link.", setupErrNet: "Couldn't reach the server – try again.",
  setupDoneT: 'Done! Here are your links', setupDoneSub: "Send each person their own link. Open it on that person's phone and add it to the home screen (Share → Add to Home Screen). Each link ties the phone to just that person.",
  setupParentsLink: 'Parents (both use this link)', setupCopy: 'Copy', setupKeep: "Keep these links – they are your family's key to Leerhoek.", setupOpenMine: 'Open my parent panel',
  setupWaMsg: 'Here is your Leerhoek link, {n}: {u}',
  invT: '✉️ Invite a family to the circle', invSub: "Make a one-off link (valid for 14 days). The family sets up their own names, children, grades and PIN. Each family's progress stays private; only the games and the family-circle chat are shared.",
  invLabelP: 'For whom? e.g. Brother John', invMake: 'Make link', invMsg: 'Hi! Here is your link to set up Leerhoek for your family (works once, valid for 14 days): {u}',
  invList: 'Invites', invUsed: 'set up by {n}', invOpen: 'open until {d}', invExpired: 'expired',
  kringT: '👨‍👩‍👧‍👦 Family circle – usage', kringSub: 'Totals only (XP, tests, minutes, last activity) – not their answers, marks or chat.', kringNone: 'No other families in the circle yet.',
  kringCols: ['Who', 'Grade', 'XP', 'Tests', 'Min', 'Last'],
  chatFam: 'Our family', chatKring: 'Family circle', chatSubK: 'For everyone in the family circle – uncles, aunts and cousins.',
});


/* ---------- v10: the parents edit their household (people, grades, schools) and see everyone's link ---------- */
function houseCard() {
  if (S.storeKind !== 'supa') return '';
  const st = S.houseEdit || (S.houseEdit = { kids: KIDS.map(k => Object.assign({}, k, { extra: extraTxt(k) })), parents: PARENTS.map(p => Object.assign({}, p)), lang: langCodeOf(S.houseProf) });
  const gopts = (sel) => Array.from({ length: 12 }, (_, i) => i + 1).map(g => `<option value="${g}" ${+sel === g ? 'selected' : ''}>${g}</option>`).join('');
  const avSel = (list, cur, attr) => `<select ${attr} aria-label="Avatar">${(list.includes(cur) ? list : [cur].concat(list)).map(a => `<option ${a === cur ? 'selected' : ''}>${a}</option>`).join('')}</select>`;
  const base = location.origin + location.pathname, fk = S.store.fk;
  const linkRow = (av, nm, route) => { const u = `${base}#k=${fk}~${route}`; return `<div class="row" style="justify-content:space-between;gap:8px;flex-wrap:wrap"><span class="small">${av} <b>${esc(nm)}</b></span><span class="row" style="gap:6px"><button type="button" class="btn sm" data-hcopy="${esc(u)}">📋 ${esc(t('setupCopy'))}</button><a class="btn sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(tf('setupWaMsg', { n: nm, u }))}">💬</a></span></div>`; };
  return `<div class="card" style="margin-top:14px" id="houseCard"><details ${S.houseOpen ? 'open' : ''}><summary><h3 style="display:inline">${esc(t('houseT'))}</h3></summary><p class="small muted" style="margin:6px 0 10px">${esc(t('houseSub'))}</p>
    <div class="label">${esc(t('setupKids'))}</div>
    ${st.kids.map((k, i) => `<div class="row" style="gap:6px;flex-wrap:wrap;margin:6px 0;align-items:center">${avSel(AV_KIDS, k.avatar, `data-hkav="${i}"`)}<input data-hknm="${i}" maxlength="24" value="${esc(k.name)}" aria-label="${esc(t('setupKidNm'))}" style="flex:1;min-width:100px"><select data-hkrole="${i}" aria-label="${esc(t('setupKidRole'))}"><option value="learner" ${k.role !== 'player' ? 'selected' : ''}>${esc(t('setupLearner'))}</option><option value="player" ${k.role === 'player' ? 'selected' : ''}>${esc(t('setupPlayer'))}</option></select><label class="small">${esc(t('setupGrade'))} <select data-hkgr="${i}">${gopts(k.grade)}</select></label><input data-hksc="${i}" maxlength="50" value="${esc(k.school || '')}" placeholder="${esc(t('setupSchool'))}" aria-label="${esc(t('setupSchool'))}" style="flex:1;min-width:120px"><button type="button" class="btn sm ghost" data-hkdel="${i}" aria-label="${esc(t('setupDel'))}">✕</button></div>${k.role === 'player' ? '' : `<div style="margin:-2px 0 10px 4px">${subjTicks(gradeSubjList(k.grade), Array.isArray(k.skip) ? k.skip : [], 'data-hksk', i)}<input data-hkx="${i}" maxlength="200" value="${esc(k.extra || '')}" placeholder="${esc(t('suExtraP'))}" aria-label="${esc(t('suExtra'))}" style="margin-top:6px;width:100%"></div>`}`).join('')}
    <button type="button" class="btn sm" id="hAddKid">${esc(t('houseAddKid'))}</button>
    <div class="label" style="margin-top:12px">${esc(t('setupParents'))}</div>
    ${st.parents.map((p, i) => `<div class="row" style="gap:6px;flex-wrap:wrap;margin:6px 0;align-items:center">${avSel(AV_PAR, p.avatar, `data-hpav="${i}"`)}<input data-hpnm="${i}" maxlength="24" value="${esc(p.name)}" aria-label="${esc(t('setupParentNm'))}" placeholder="${esc(t('setupParentNmP'))}" style="flex:1;min-width:100px"><input data-hpci="${i}" maxlength="30" value="${esc(p.circleName || '')}" aria-label="${esc(t('setupParentCirc'))}" placeholder="${esc(t('setupParentCircP'))}" style="flex:1;min-width:120px"><button type="button" class="btn sm ghost" data-hpdel="${i}" aria-label="${esc(t('setupDel'))}">✕</button></div>`).join('')}
    <button type="button" class="btn sm" id="hAddPar">${esc(t('houseAddPar'))}</button>
    <div class="label" style="margin-top:12px">🌐 ${esc(t('suLang'))}</div><select id="hLang">${setupLangOpts(st.lang || 'af')}</select>
    <div id="hErr" class="small" style="color:var(--bad);min-height:18px;margin-top:8px"></div>
    <button type="button" class="btn primary" id="hSave">💾 ${esc(t('houseSave'))}</button>
    <div class="label" style="margin-top:14px">🔗 ${esc(t('houseLinks'))}</div><p class="small muted" style="margin:2px 0 6px">${esc(t('houseLinksSub'))}</p>
    <div class="stack" style="gap:6px">${KIDS.map(k => linkRow(k.avatar, k.name, k.id)).join('')}${linkRow(PARENTS.map(p => p.avatar).join(''), t('setupParentsLink'), 'ouer')}</div>
  </details></div>`;
}
function wireHouseCard(root) {
  const card = $('#houseCard', root); if (!card) return;
  const st = S.houseEdit;
  card.querySelector('details').ontoggle = (e) => { S.houseOpen = e.target.open; };
  const grab = () => {
    st.kids.forEach((k, i) => { k.avatar = card.querySelector(`[data-hkav="${i}"]`).value; k.name = card.querySelector(`[data-hknm="${i}"]`).value; k.role = card.querySelector(`[data-hkrole="${i}"]`).value; k.grade = +card.querySelector(`[data-hkgr="${i}"]`).value; k.school = card.querySelector(`[data-hksc="${i}"]`).value;
      const ticks = [...card.querySelectorAll(`[data-hksk="${i}"]`)]; if (ticks.length) k.skip = ticks.filter(c => !c.checked).map(c => c.value); const x = card.querySelector(`[data-hkx="${i}"]`); if (x) k.extra = x.value; });
    const hl = card.querySelector('#hLang'); if (hl) st.lang = hl.value;
    st.parents.forEach((p, i) => { p.avatar = card.querySelector(`[data-hpav="${i}"]`).value; p.name = card.querySelector(`[data-hpnm="${i}"]`).value; p.circleName = card.querySelector(`[data-hpci="${i}"]`).value; });
  };
  const redraw = () => { S.houseOpen = true; card.outerHTML = houseCard(); wireHouseCard(root); };
  card.querySelectorAll('[data-hcopy]').forEach(b => b.onclick = async () => { if (await copyText(b.dataset.hcopy)) toast(t('copied')); });
  $('#hAddKid', card).onclick = () => { grab(); const last = st.kids[st.kids.length - 1] || {}; st.kids.push({ id: null, name: '', avatar: AV_KIDS[st.kids.length % AV_KIDS.length], role: 'learner', grade: last.grade || 8, school: last.school || '' }); redraw(); };
  $('#hAddPar', card).onclick = () => { grab(); st.parents.push({ id: null, name: '', circleName: '', avatar: AV_PAR[st.parents.length % AV_PAR.length] }); redraw(); };
  card.querySelectorAll('[data-hkdel]').forEach(b => b.onclick = () => { grab(); st.kids.splice(+b.dataset.hkdel, 1); redraw(); });
  card.querySelectorAll('[data-hkgr], [data-hkrole]').forEach(x => x.onchange = () => { grab(); if (x.dataset.hkgr !== undefined) st.kids[+x.dataset.hkgr].skip = []; redraw(); });
  card.querySelectorAll('[data-hpdel]').forEach(b => b.onclick = () => { grab(); st.parents.splice(+b.dataset.hpdel, 1); redraw(); });
  $('#hSave', card).onclick = async () => {
    grab();
    const kids = st.kids.filter(k => k.name.trim()), parents = st.parents.filter(p => p.name.trim());
    if (!kids.length || !parents.length) { $('#hErr', card).textContent = t('houseNeed'); return; }
    const taken = new Set(ROUTE_WORDS.concat(CIRCLE.map(c => c.id), kids.filter(k => k.id).map(k => k.id), parents.filter(p => p.id).map(p => p.id)));
    if (!HOUSE.legacy) ['pa', 'ma', 'diaan', 'stefan'].forEach(x => taken.add(x));
    const prof = Object.assign({}, S.houseProf || { v: 1, legacy: HOUSE.legacy }, {
      name: (S.houseProf && S.houseProf.name) || HOUSE.name,
      kids: kids.map(k => { const learner = k.role !== 'player', g = +k.grade || 7, list = gradeSubjList(g).map(x => x.id), skip = learner && Array.isArray(k.skip) ? k.skip.filter(x => list.includes(x)) : [], extra = learner ? extraOf(k.extra) : [];
        return Object.assign({ id: k.id || uniqId(slugId(k.name), taken), name: k.name.trim().slice(0, 24), avatar: k.avatar, role: learner ? 'learner' : 'player', grade: g, school: learner ? String(k.school || '').trim().slice(0, 50) : '' }, skip.length ? { skip } : {}, extra.length ? { extra } : {}); }),
      parents: parents.map(p => Object.assign({}, p, { id: p.id || uniqId('p' + slugId(p.circleName || p.name).slice(0, 10), taken), name: p.name.trim().slice(0, 24), circleName: String(p.circleName || '').trim().slice(0, 30) })),
    }, langOf(st.lang || langCodeOf(S.houseProf)));
    try {
      await S.store.put('household/profile', prof);
      S.houseProf = prof; S.houseEdit = null; applyHousehold(S.houseMe, prof, S.houseCircle);
      await Promise.all(houseGrades().map(ensureGrade)); if (!S.kid) setActiveGrade((KIDS[0] || {}).grade || 7, (KIDS[0] || {}).school);
      toast(t('houseSaved')); S.houseOpen = true; render();
    } catch (e) { $('#hErr', card).textContent = t('setupErrNet'); }
  };
}
Object.assign(UI.af, {
  houseT: '👪 Ons gesin – mense en skakels', houseSub: 'Voeg mense by of haal hulle uit, verander grade of skole, en stuur iemand weer sy of haar skakel. Wie jy uithaal, se vordering bly gestoor.',
  houseAddKid: '＋ Kind / speler', houseAddPar: '＋ Ouer', houseSave: 'Stoor gesin', houseNeed: 'Hou minstens een ouer en een kind.', houseSaved: 'Gesin gestoor',
  houseLinks: 'Skakels', houseLinksSub: 'Elke persoon se eie skakel – maak dit op sy of haar foon oop.',
  kringHouses: '🏠 Gesinne in die kring', kringKick: 'Haal uit kring', kringKickSure: 'Seker? Tik weer', kringKicked: 'Gesin uit die kring gehaal',
});
Object.assign(UI.en, {
  houseT: '👪 Our family – people and links', houseSub: "Add or remove people, change grades or schools, and resend someone their link. Removed people's progress stays saved.",
  houseAddKid: '＋ Child / player', houseAddPar: '＋ Parent', houseSave: 'Save family', houseNeed: 'Keep at least one parent and one child.', houseSaved: 'Family saved',
  houseLinks: 'Links', houseLinksSub: "Each person's own link – open it on their phone.",
  kringHouses: '🏠 Families in the circle', kringKick: 'Remove from circle', kringKickSure: 'Sure? Tap again', kringKicked: 'Family removed from the circle',
});

/* ------------------------------------------------------------------ boot */
function applyTheme() {
  let th = null; try { th = localStorage.getItem('lh.theme'); } catch (e) {}
  if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme');
  $('#themeBtn').textContent = (document.documentElement.getAttribute('data-theme') === 'dark' || (!th && matchMedia('(prefers-color-scheme: dark)').matches)) ? '☀️' : '🌙';
}
function setLang(l) { L = l; try { localStorage.setItem('lh.lang', l); } catch (e) {} document.documentElement.lang = l; $('#lang').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.l === l)); render(); }
async function boot() {
  applyTheme();
  $('#lang').querySelectorAll('button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  $('#lang').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.l === L));
  document.documentElement.lang = L;
  $('#themeBtn').onclick = () => { const cur = document.documentElement.getAttribute('data-theme'); const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; try { localStorage.setItem('lh.theme', dark ? 'light' : 'dark'); } catch (e) {} applyTheme(); };
  $('#logoBtn').onclick = () => go(S.kid ? 'home' : 'profiel');
  $('#whoBtn').onclick = () => go('profiel');
  window.addEventListener('hashchange', render);
  window.addEventListener('pagehide', () => endSession());
  if ('serviceWorker' in navigator) navigator.serviceWorker.addEventListener('message', (e) => { if (e.data && e.data.go) go(e.data.go); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { flushTime(); if (S.kid) S.store.saveKid(S.kid).catch(() => {}); endSession(); } else { if (S.content && S.route) ensureSession(); S.tStart = Date.now(); if (S.store) S.store.loadSettings().then(st => { if (st) S.settings = st; }).catch(() => {}); } });
  render(); // splash
  const [content] = await Promise.all([loadContent(), initStore()]);
  S.content = content;
  try { await Promise.all(houseGrades().map(ensureGrade)); } catch (e) {}
  setActiveGrade((KIDS[0] || {}).grade || 7, (KIDS[0] || {}).school);
  try { S.settings = await S.store.loadSettings(); } catch (e) {}
  let remembered = null; try { remembered = localStorage.getItem('lh.kid'); } catch (e) {}
  const r = parseRoute();
  migrateLock(r);
  if (lockedKid()) await selectKid(lockedKid());
  else if (deviceLock() !== 'ouer') { if (r.kid) await selectKid(r.kid); else if (remembered && KIDS.some(k => k.id === remembered)) await selectKid(remembered); }
  render();
  socialInit();
  if (window.LH_VERSION && 'serviceWorker' in navigator && window.isSecureContext) navigator.serviceWorker.register('sw.js').catch(() => {});
  if (window.LH_VERSION) { setTimeout(checkForUpdate, 4000); setInterval(checkForUpdate, 15 * 60000); document.addEventListener('visibilitychange', () => { if (!document.hidden) checkForUpdate(); }); }
}
/* ------------------------------------------------------------------ v10.3 texts */
Object.assign(UI.af, {
  suLang: 'Taal van die app', suLangAf: 'Afrikaans (Engels as keuse)', suLangEn2: 'Engels (Afrikaans as keuse)', suLangEn: 'Net Engels',
  suSubj: 'Vakke: {n} van {m} gekies', suSubjHelp: 'Haal die regmerkie af by vakke wat die kind nie neem nie.',
  suNoContent: 'Graad {g}-inhoud word nog gebou. Tot dan kan die kind foto’s van sy of haar notas laai en oefenvrae daaruit maak.',
  suExtra: 'Ander vakke wat nie hierbo is nie (opsioneel)', suExtraP: 'bv. Duits, Lewenswetenskappe – komma tussen',
  setupSubSep: 'Stel julle gesin op – dit vat 2 minute. Leerhoek is net vir julle gesin: julle kinders se vordering, die klets en die speletjies bly binne julle gesin.',
  invKindL: 'Soort uitnodiging', invKindFam: 'In ons familiekring', invKindSep: 'Aparte gesin (eie spasie)',
  invHelpFam: 'Hul vordering bly privaat; die speletjies en die familiekring-klets word met julle gedeel.',
  invHelpSep: 'Hulle kry hul eie spasie: eie klets, speletjies en ranglys – niks word met julle gedeel nie. Jy sien net hul gebruik-totale.',
  nqT: 'Vrae uit my notas', nqMake: 'Maak vrae', nqPlay: 'Oefen', nqQs: 'vrae', nqSum: 'Kort opsomming',
  nqMaking: 'Lees jou notas en maak vrae … (±20 sekondes)', nqNone: 'Kon nie genoeg op die foto lees om vrae te maak nie. Probeer ’n skerper foto van naby.',
  stubT: 'Jou vakke', stubMore: 'Ander vakke', stubSub: 'Leerhoek se inhoud vir hierdie graad word nog gebou. Laai solank foto’s van jou notas – die app maak oefenvrae daaruit.',
  stubSubX: 'Vakke wat nog nie in Leerhoek is nie: laai foto’s van jou notas en oefen met vrae daaruit.', stubCard: 'Foto’s van notas → oefenvrae',
  stubIntro: 'Leerhoek se opsommings en toetse vir hierdie vak kom nog. Neem solank foto’s van jou notas of ’n werkkaart – die app maak oefenvrae daaruit.',
  stubIntroX: 'Hierdie vak is nog nie in Leerhoek nie. Neem foto’s van jou notas of ’n werkkaart – die app maak oefenvrae daaruit.',
});
Object.assign(UI.en, {
  suLang: 'App language', suLangAf: 'Afrikaans (English as an option)', suLangEn2: 'English (Afrikaans as an option)', suLangEn: 'English only',
  suSubj: 'Subjects: {n} of {m} chosen', suSubjHelp: "Untick the subjects this child doesn't take.",
  suNoContent: 'Grade {g} content is still being built. Until then, the child can photograph their notes and turn them into practice questions.',
  suExtra: "Other subjects that aren't listed (optional)", suExtraP: 'e.g. German, Life Sciences – separate with commas',
  setupSubSep: "Set up your family – it takes 2 minutes. Leerhoek is just for your family: your children's progress, the chat and the games stay within your family.",
  invKindL: 'Kind of invite', invKindFam: 'In our family circle', invKindSep: 'Separate family (own space)',
  invHelpFam: 'Their progress stays private; the games and the family-circle chat are shared with you.',
  invHelpSep: 'They get their own space: own chat, games and leaderboard – nothing is shared with you. You only see their usage totals.',
  nqT: 'Questions from my notes', nqMake: 'Make questions', nqPlay: 'Practise', nqQs: 'questions', nqSum: 'Short summary',
  nqMaking: 'Reading your notes and making questions … (about 20 seconds)', nqNone: "Couldn't read enough on the photo to make questions. Try a sharper photo from closer.",
  stubT: 'Your subjects', stubMore: 'Other subjects', stubSub: "Leerhoek's content for this grade is still being built. Meanwhile, upload photos of your notes – the app turns them into practice questions.",
  stubSubX: "Subjects that aren't in Leerhoek yet: upload photos of your notes and practise with questions made from them.", stubCard: 'Photos of notes → practice questions',
  stubIntro: "Leerhoek's summaries and tests for this subject are still coming. Meanwhile, take photos of your notes or a worksheet – the app turns them into practice questions.",
  stubIntroX: "This subject isn't in Leerhoek yet. Take photos of your notes or a worksheet – the app turns them into practice questions.",
});

Object.assign(UI.af, {
  aiSaw: 'Wat ek op die foto sien', aiTicked: '{n} onderwerpe gemerk:', aiNoTopics: 'Ek kon nie onderwerpe uit die lys herken nie. Merk self die onderwerpe hieronder, of maak oefenvrae van die foto.',
  aiDate: 'Datum:', aiNext: 'As jy stoor:', aiNext1: '{k} sien dié onderwerpe onder 🎯 Wat in die eksamen kom.', aiNext2: 'Die afbakening-toets, die dagplan en die herinneringe oefen net dié onderwerpe.',
  aiNext3: 'Jy kan die merkies hieronder nog verander voor jy stoor.', aiSave: 'Stoor afbakening nou', aiQuiz: 'Maak oefenvrae vir die kinders',
  aiCheck: 'Kontroleer altyd: die KI kan foute maak.',
  nqParentDone: '{n} oefenvrae gemaak: {t}', nqParentWhere: '{k} kry dit onder {s} → 📒 Vrae uit my notas.',
});
Object.assign(UI.en, {
  aiSaw: 'What I see on the photo', aiTicked: '{n} topics ticked:', aiNoTopics: "I couldn't match topics from the list. Tick the topics below yourself, or make practice questions from the photo.",
  aiDate: 'Date:', aiNext: 'When you save:', aiNext1: '{k} will see these topics under 🎯 What is in the exam.', aiNext2: 'The scope test, the daily plan and the reminders practise only these topics.',
  aiNext3: 'You can still change the ticks below before you save.', aiSave: 'Save scope now', aiQuiz: 'Make practice questions for the children',
  aiCheck: 'Always check: the AI can make mistakes.',
  nqParentDone: '{n} practice questions made: {t}', nqParentWhere: '{k} will find them under {s} → 📒 Questions from my notes.',
});
boot();
})();
