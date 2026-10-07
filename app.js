/* Leerhoek — Grade 7 study platform (Afrikaans / English)
   Single-page app. Content is loaded from content/index.json → content/gr7/*.json (or window.CONTENT_BUNDLE for the offline copy).
   Progress is stored in the artifact's shared db when the viewer is signed in with write access, otherwise in localStorage. */
(() => {
'use strict';

/* ------------------------------------------------------------------ i18n */
const UI = {
  af: {
    nextExam: 'Volgende eksamen', weekXpShort: 'XP hierdie week', chestSub: 'Doen 3 toetse vandag om die skatkis oop te sluit.',
    navExams: 'Eksamen', navPlay: 'Speel', navDict: 'Woorde', termNow: 'Kwartaal', finalTerm: 'laaste kwartaal – eindeksamens kom!', now: 'nou', exam1: 'eksamen', focusShort: 'fokusvak',
    planT: 'Vandag se studieplan', planSub: 'Gekies uit jou afbakening, jou eksamendatums en die vakke wat die meeste aandag nodig het.', planDone: 'Alles klaar vir vandag – sterk gedoen!',
    exT: 'Eindeksamen', exSub: 'Jou afbakening per vak: wat in die eksamen kom, hoe gereed jy is, en oefentoetse net op daardie werk.', exDateTBC: 'Datum nog onbekend', exDone: 'Klaar', exToday: 'Vandag!', exIn: 'oor',
    provisional: 'Voorlopig', confirmed: 'Bevestig', provisionalHint: 'Voorlopige afbakening: Kwartaal 3 + 4 (tale: die hele jaar), soos in Unika se vorige Novembervraestelle. Pa werk dit by sodra die skool die regte afbakening stuur.',
    scopeTopics: 'onderwerpe', ready: 'gereed', scopeTest: 'Afbakening-toets', showTopics: 'Wys onderwerpe', inScope: 'In afbakening',
    mistakesT: 'Foute-boek', mistakesSub: 'Elke vraag wat jy verkeerd kry, word hier gebêre. Herdoen hulle tot jy hulle reg kry – dan verdwyn hulle uit die boek.', open_: 'oop', fixedN: 'reggemaak', redoAll: 'Herdoen 10 foute', redo: 'Herdoen', redoT: 'Herdoen foute', recentMistakes: 'Onlangse foute', noMistakes: 'Geen foute nie – mooi so!', noMistakesShort: 'Niks oop nie 🎉', tapToRedo: 'Tik om reg te maak',
    playT: 'Speel & leer', playSub: 'Breinspeletjies met jou eie skoolwerk. Elke speletjie verdien XP en tel vir die tweeling-uitdaging!', brainGames: 'Breinspeletjies', pickSubj: 'Kies ’n vak vir die woordspeletjies:', allSubj: 'Alle vakke',
    g: { memory: ['Geheue-pare', 'Draai kaarte om en vind die Afrikaanse en Engelse woordpare.'], hangman: ['Raai die woord', 'Lees die betekenis en raai die woord, letter vir letter.'], sprint: ['Wiskunde-sprint', 'Hoeveel somme kan jy in 60 sekondes uit jou kop doen?'], blitz: ['Waar/Onwaar-blits', '60 sekondes: waar of onwaar? Hoe vinniger, hoe beter!'] },
    best: 'Beste', moves: 'skuiwe', playAgain: 'Speel weer', back: 'Terug', newRecord: 'Nuwe rekord!', timeUp: 'Tyd is op!', start: 'Begin', lives: 'Lewens', hintLetter: 'Wenk (kos 1 lewe)', wordWas: 'Die woord was', nextWord: 'Volgende woord', wordsOf: 'woorde reg', correctN: 'reg',
    sprintHow: 'Tik die antwoord met die knoppies en druk OK. Gebruik − vir negatiewe getalle.', blitzHow: 'Lees die stelling en tik vinnig Waar of Onwaar. Verkeerde antwoorde gaan in jou foute-boek.', wentToMistakes: 'Hierdie vrae is in jou foute-boek gebêre.',
    weekT: 'Tweeling-uitdaging', weekLead: 'lei hierdie week!', weekTie: 'Gelykop!', weekReset: 'Begin elke Maandag oor.', chalT: 'Weeklikse uitdaging', chalSub: 'Dieselfde 10 vrae vir Diaan en Stefan. Net jou eerste poging tel – wie wen hierdie week?', chalPlay: 'Speel', chalReplay: 'Oefen weer', chalDone: 'Gespeel', chalNot: 'Nog nie gespeel nie', chalCounted: 'Jou telling tel vir hierdie week!', chalPractice: 'Oefenrondte – net jou eerste poging tel.',
    chestT: 'Daaglikse skatkis', chestReady: 'Gereed – maak oop!', chestDone: 'Môre is daar ’n nuwe een.', testsToday: 'toetse vandag', chestWin: 'Jy het gevind:',
    wotd: 'Woord van die dag', factT: 'Weet jy?', factBtn: 'Cool! 😎', toTopic: 'Na onderwerp', dwHint: 'Tik op ’n onderstreepte woord om sy betekenis te sien.',
    dictT: 'Woordeboek', dictSub: 'Al die moeilike woorde uit jou vakke – in Afrikaans en Engels, met betekenisse. Jy kan ook in enige opsomming op ’n onderstreepte woord tik.', dictTabTerms: 'Vakwoorde', dictTabQ: 'Vraagwoorde', dictQSub: 'Hierdie woorde in ’n vraag sê vir jou wát die onderwyser wil hê. Baie punte gaan verlore omdat iemand net “noem” waar die vraag “verduidelik” vra.', dictSearch: 'Soek ’n woord (Afrikaans of Engels)…', dictWords: 'woorde', dictNone: 'Niks gevind nie – probeer ’n ander spelling of die Engelse woord.', showMore: 'Wys meer',
    scopeT: 'Afbakening & eksamenrooster', scopeHelp: 'Kies per vak die eksamendatum en die onderwerpe wat in die eksamen kom (die notaveld is vir bv. bladsye of hoofstukke). Tot jy ’n vak verander, gebruik Leerhoek ’n voorlopige afbakening: Kwartaal 3 + 4 (tale: die hele jaar), soos in Unika se vorige Novembervraestelle.', curTermL: 'Huidige kwartaal', auto: 'Outomaties', pickTopics: 'Kies onderwerpe', q4: 'Kw 4', q34: 'Kw 3 + 4', qAll: 'Hele jaar', qNone: 'Geen', noteP: 'Nota, bv. Hfst 5–8, bl. 40–62', saveScope: 'Stoor afbakening', mistakesShort: 'foute oop', gamesShort: 'speletjies',
    instTitle: 'Kry Leerhoek as ’n app', instSub: 'Sit die ikoon op jou tuisskerm – dan maak jy dit soos enige ander app oop.', instBtn: '📲 Installeer Leerhoek', instHow: 'Wys my hoe', instLater: 'Later', instDone: 'Leerhoek is geïnstalleer! Maak dit voortaan met die ikoon oop.', instIosTitle: 'Sit Leerhoek op jou tuisskerm', instIosSafari: ['Tik op <b>⋯</b> onder regs (of direk op <b>Deel</b> {S}).', 'Tik op <b>Deel</b> {S}.', 'Rol af (of tik <b>View More</b>) en kies <b>Add to Home Screen</b>.', 'Maak seker <b>Open as Web App</b> is aan, en tik <b>Add</b>.'], instIosChrome: ['Tik op <b>Deel</b> {S} regs in die adresbalk (of <b>⋯</b> → <b>Share</b>).', 'Rol af en kies <b>Add to Home Screen</b>.', 'Tik <b>Add</b>.'], instAndroid: ['Tik op <b>⋮</b> bo-regs (Samsung Internet: <b>☰</b> onder).', 'Kies <b>Installeer app</b> of <b>Add to Home screen</b>.', 'Tik <b>Installeer</b> / <b>Add</b>.'], instGot: 'Reg so!', instFoot: 'Daarna verskyn die Leerhoek-ikoon op jou tuisskerm.',
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
    ev: { quiz: 'Toets', read: 'Opsomming gelees', flash: 'Sleutelterme', examples: 'Voorbeelde', exam: 'Eksamen-oefening', paper: 'Oefenvraestel', login: 'Aangemeld', scope: 'Afbakening-toets', redo: 'Foute herdoen', challenge: 'Weeklikse uitdaging', game: 'Breinspeletjie', chest: 'Skatkis' },
    resourcesIntro: 'Gratis handboeke, werkboeke en ou vraestelle. Unika se eie eksamenomvang en klasnotas kom in die “Gedeel – Unika dokumente” vouer op Pa se rekenaar.',
    allBadges: 'Kentekens', loading: 'Laai die vakke…', switchUser: 'Ruil gebruiker', continueAs: 'Gaan voort', of: 'van', min: 'min', mixed: 'Gemengde vrae', chooseGrade: 'Graad',
    hint: 'Wenk', showMemo: 'Wys memo & merk myself', memo: 'Memo', selfMark: 'Hoeveel punte verdien jou antwoord?', papers: 'Oefenvraestelle', paper: 'Oefenvraestel', examFormatT: 'Hoe lyk Unika se vraestel', startPaper: 'Begin vraestel', timeLeft: 'Tyd oor', marks: 'punte', section: 'Afdeling', paperDone: 'Vraestel voltooi!', perSection: 'Punte per afdeling', paperSub: 'Dieselfde formaat, tyd en punte as die skool se vraestel – nuwe vrae. Skryf lang antwoorde op papier of tik hulle, wys dan die memo en merk jouself eerlik.', bestMark: 'Beste', skipQ: 'Slaan oor', focus: 'Fokusvakke', focusSub: 'Volgens jou skoolrapport – hier tel elke punt die meeste.', target: 'teiken', school: 'Skool', schoolMarks: 'Skoolpunte vs platform', schoolSub: 'Rapportpunte per kwartaal, die slaagteiken en die platform se bemeestering.', termShort: 'Kw', passRules: 'Slaagvereistes: 50 % in Huistaal, 40 % in Engels EAT, 40 % in Wiskunde, 40 % in nog 3 vakke en 30 % in nog 2 vakke.', avgShort: 'Gemiddeld', platform: 'Platform', gap: 'tekort',
    badgeNames: { fixer: ['Foutvreter', 'Maak 25 foute in jou foute-boek reg'], brain: ['Breinkrag', 'Speel 10 breinspeletjies'], scope: ['Eksamengereed', 'Kry 80 % of meer in ’n afbakening-toets'], first: ['Eerste toets', 'Voltooi jou eerste toets'], perfect: ['Volpunte', 'Kry 100 % in ’n toets'], five: ['Vyf toetse', 'Voltooi 5 toetse'], streak3: ['3-dag reeks', 'Leer 3 dae agtereenvolgens'], streak7: ['Week-reeks', '7 dae agtereenvolgens'], reader: ['Leesrot', 'Lees 10 opsommings'], subject: ['Vakbaas', 'Alle onderwerpe van ’n vak bo 70 %'], xp1000: ['Kampioen', 'Verdien 1 000 XP'] },
  },
  en: {
    nextExam: 'Next exam', weekXpShort: 'XP this week', chestSub: 'Do 3 tests today to unlock the treasure chest.',
    navExams: 'Exams', navPlay: 'Play', navDict: 'Words', termNow: 'Term', finalTerm: 'final term – exams are coming!', now: 'now', exam1: 'exam', focusShort: 'focus subject',
    planT: "Today's study plan", planSub: 'Picked from your exam scope, your exam dates and the subjects that need the most attention.', planDone: 'All done for today – great work!',
    exT: 'Final exams', exSub: 'Your exam scope per subject: what is in the exam, how ready you are, and practice tests on just that work.', exDateTBC: 'Date not known yet', exDone: 'Done', exToday: 'Today!', exIn: 'in',
    provisional: 'Provisional', confirmed: 'Confirmed', provisionalHint: "Provisional scope: Term 3 + 4 (languages: the whole year), as in Unika's previous November papers. Dad will update it as soon as the school sends the real scope.",
    scopeTopics: 'topics', ready: 'ready', scopeTest: 'Scope test', showTopics: 'Show topics', inScope: 'In scope',
    mistakesT: 'Mistakes book', mistakesSub: 'Every question you get wrong is saved here. Redo them until you get them right – then they disappear from the book.', open_: 'open', fixedN: 'fixed', redoAll: 'Redo 10 mistakes', redo: 'Redo', redoT: 'Redo mistakes', recentMistakes: 'Recent mistakes', noMistakes: 'No mistakes – well done!', noMistakesShort: 'Nothing open 🎉', tapToRedo: 'Tap to fix them',
    playT: 'Play & learn', playSub: 'Brain games with your own schoolwork. Every game earns XP and counts for the twin challenge!', brainGames: 'Brain games', pickSubj: 'Choose a subject for the word games:', allSubj: 'All subjects',
    g: { memory: ['Memory pairs', 'Flip cards and find the Afrikaans and English word pairs.'], hangman: ['Guess the word', 'Read the meaning and guess the word, letter by letter.'], sprint: ['Maths sprint', 'How many sums can you do in your head in 60 seconds?'], blitz: ['True/False blitz', '60 seconds: true or false? The faster, the better!'] },
    best: 'Best', moves: 'moves', playAgain: 'Play again', back: 'Back', newRecord: 'New record!', timeUp: "Time's up!", start: 'Start', lives: 'Lives', hintLetter: 'Hint (costs 1 life)', wordWas: 'The word was', nextWord: 'Next word', wordsOf: 'words right', correctN: 'right',
    sprintHow: 'Tap the answer on the keypad and press OK. Use − for negative numbers.', blitzHow: 'Read the statement and quickly tap True or False. Wrong answers go into your mistakes book.', wentToMistakes: 'These questions were saved in your mistakes book.',
    weekT: 'Twin challenge', weekLead: 'leads this week!', weekTie: 'Tied!', weekReset: 'Starts again every Monday.', chalT: 'Weekly challenge', chalSub: 'The same 10 questions for Diaan and Stefan. Only your first attempt counts – who wins this week?', chalPlay: 'Play', chalReplay: 'Practise again', chalDone: 'Played', chalNot: 'Not played yet', chalCounted: 'Your score counts for this week!', chalPractice: 'Practice round – only your first attempt counts.',
    chestT: 'Daily treasure chest', chestReady: 'Ready – open it!', chestDone: "There's a new one tomorrow.", testsToday: 'tests today', chestWin: 'You found:',
    wotd: 'Word of the day', factT: 'Did you know?', factBtn: 'Cool! 😎', toTopic: 'Go to topic', dwHint: 'Tap an underlined word to see its meaning.',
    dictT: 'Dictionary', dictSub: 'All the difficult words from your subjects – in Afrikaans and English, with meanings. You can also tap an underlined word in any summary.', dictTabTerms: 'Subject words', dictTabQ: 'Question words', dictQSub: 'These words in a question tell you what the teacher wants. Lots of marks are lost because someone only “names” where the question asks to “explain”.', dictSearch: 'Search a word (Afrikaans or English)…', dictWords: 'words', dictNone: 'Nothing found – try another spelling or the Afrikaans word.', showMore: 'Show more',
    scopeT: 'Exam scope & timetable', scopeHelp: "Choose the exam date and the topics in the exam for each subject (the note field is for e.g. pages or chapters). Until you change a subject, Leerhoek uses a provisional scope: Term 3 + 4 (languages: the whole year), as in Unika's previous November papers.", curTermL: 'Current term', auto: 'Automatic', pickTopics: 'Choose topics', q4: 'T4', q34: 'T3 + 4', qAll: 'Whole year', qNone: 'None', noteP: 'Note, e.g. Ch 5–8, p. 40–62', saveScope: 'Save scope', mistakesShort: 'mistakes open', gamesShort: 'games',
    instTitle: 'Get Leerhoek as an app', instSub: 'Put the icon on your home screen – then open it like any other app.', instBtn: '📲 Install Leerhoek', instHow: 'Show me how', instLater: 'Later', instDone: 'Leerhoek is installed! Open it with the icon from now on.', instIosTitle: 'Put Leerhoek on your home screen', instIosSafari: ['Tap <b>⋯</b> at the bottom right (or <b>Share</b> {S} directly).', 'Tap <b>Share</b> {S}.', 'Scroll down (or tap <b>View More</b>) and choose <b>Add to Home Screen</b>.', 'Make sure <b>Open as Web App</b> is on, then tap <b>Add</b>.'], instIosChrome: ['Tap <b>Share</b> {S} on the right of the address bar (or <b>⋯</b> → <b>Share</b>).', 'Scroll down and choose <b>Add to Home Screen</b>.', 'Tap <b>Add</b>.'], instAndroid: ['Tap <b>⋮</b> at the top right (Samsung Internet: <b>☰</b> at the bottom).', 'Choose <b>Install app</b> or <b>Add to Home screen</b>.', 'Tap <b>Install</b> / <b>Add</b>.'], instGot: 'Got it!', instFoot: 'The Leerhoek icon then appears on your home screen.',
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
    ev: { quiz: 'Test', read: 'Summary read', flash: 'Key terms', examples: 'Examples', exam: 'Exam practice', paper: 'Practice paper', login: 'Signed in', scope: 'Scope test', redo: 'Mistakes redone', challenge: 'Weekly challenge', game: 'Brain game', chest: 'Treasure chest' },
    resourcesIntro: "Free textbooks, workbooks and past papers. Unika's own exam scope and class notes go in the “Gedeel – Unika dokumente” folder on Dad's computer.",
    allBadges: 'Badges', loading: 'Loading subjects…', switchUser: 'Switch user', continueAs: 'Continue', of: 'of', min: 'min', mixed: 'Mixed questions', chooseGrade: 'Grade',
    hint: 'Hint', showMemo: 'Show memo & mark myself', memo: 'Memo', selfMark: 'How many marks does your answer earn?', papers: 'Practice papers', paper: 'Practice paper', examFormatT: "What Unika's paper looks like", startPaper: 'Start paper', timeLeft: 'Time left', marks: 'marks', section: 'Section', paperDone: 'Paper complete!', perSection: 'Marks per section', paperSub: 'Same format, time and marks as the school paper – new questions. Write long answers on paper or type them, then show the memo and mark yourself honestly.', bestMark: 'Best', skipQ: 'Skip', focus: 'Focus subjects', focusSub: 'Based on your school report – every mark counts most here.', target: 'target', school: 'School', schoolMarks: 'School marks vs platform', schoolSub: 'Report marks per term, the pass target and the platform mastery.', termShort: 'T', passRules: 'Pass requirements: 50 % in Home Language, 40 % in English FAL, 40 % in Mathematics, 40 % in 3 more subjects and 30 % in 2 more.', avgShort: 'Average', platform: 'Platform', gap: 'short',
    badgeNames: { fixer: ['Mistake muncher', 'Fix 25 mistakes in your mistakes book'], brain: ['Brain power', 'Play 10 brain games'], scope: ['Exam ready', 'Score 80 % or more in a scope test'], first: ['First test', 'Complete your first test'], perfect: ['Full marks', 'Score 100 % in a test'], five: ['Five tests', 'Complete 5 tests'], streak3: ['3-day streak', 'Learn 3 days in a row'], streak7: ['Week streak', '7 days in a row'], reader: ['Bookworm', 'Read 10 summaries'], subject: ['Subject boss', 'Every topic of a subject above 70 %'], xp1000: ['Champion', 'Earn 1 000 XP'] },
  }
};
const KIDS = [
  { id: 'diaan', name: 'Diaan', avatar: '🦁' },
  { id: 'stefan', name: 'Stefan', avatar: '🐆' },
];
/* School report data lives in kids/<id>.school = { terms: { "1": {afrikaans: 63, ...}, "2": {...} }, avg: {"1": 57, "2": 51} }
   Pass requirements (Laerskool Unika report): 50 % Huistaal, 40 % EAT, 40 % Wiskunde, 40 % in 3 more, 30 % in 2 more. */
const PASS_TARGET = { afrikaans: 50, english: 40, wiskunde: 40, default: 40 };
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
  const flushPara = (buf) => buf.length ? `<p>${inline(buf.join(' '))}</p>` : '';
  let para = [];
  while (i < lines.length) {
    const ln = lines[i];
    if (/^\s*$/.test(ln)) { out += flushPara(para); para = []; i++; continue; }
    let m;
    if ((m = ln.match(/^(#{1,4})\s+(.*)/))) { out += flushPara(para); para = []; const h = Math.min(3, m[1].length + 0); out += `<h${h === 1 ? 2 : h}>${inline(m[2])}</h${h === 1 ? 2 : h}>`; i++; continue; }
    if (/^\s*>/.test(ln)) { out += flushPara(para); para = []; const q = []; while (i < lines.length && /^\s*>/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, '')); i++; } out += `<blockquote><p>${inline(q.join(' '))}</p></blockquote>`; continue; }
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
  async loadSettings() { return Object.assign({ pinHash: null, examDate: null, examTitle: '' }, (await this.get('settings/main')) || {}); }
  saveSettings(st) { return this.put('settings/main', JSON.parse(JSON.stringify(st))); }
  _poll(fn) { const h = setInterval(() => { if (!document.hidden) fn().catch(() => {}); }, 20000); return () => clearInterval(h); }
  subscribeKid(id, cb) { return this._poll(async () => { const v = await this.get('kids/' + id); if (v) cb(Object.assign(blankKid(KIDS.find(x => x.id === id)), v)); }); }
  subscribeLogs(id, cb) { return this._poll(async () => cb(await this.loadLogs(id, 14))); }
  exportCode() { return null; }
}
function readFamilyKey() {
  // the key travels as #k=KEY~route in the shared link, then lives in ?k=KEY so a home-screen icon (iPhone: separate storage) keeps it
  const m = (location.hash || '').match(/^#k=([A-Za-z0-9]+)(?:~([a-z]+))?/);
  let q = null; try { q = new URLSearchParams(location.search).get('k'); } catch (e) {}
  const key = (m && m[1]) || (q && /^[A-Za-z0-9]+$/.test(q) ? q : null);
  if (key) { try { localStorage.setItem('lh.fk', key); } catch (e) {} }
  if (m) { try { history.replaceState(null, '', location.pathname + '?k=' + m[1] + '#' + (m[2] || 'profiel')); } catch (e) { location.hash = m[2] || 'profiel'; } }
  if (key) return key;
  try { return localStorage.getItem('lh.fk'); } catch (e) { return null; }
}
function notify(kid, ev) {
  // phone push via ntfy.sh (own-website mode only); simple request (no preflight)
  const topic = S.settings && S.settings.ntfyTopic; if (S.storeKind !== 'supa' || !topic || !ev) return;
  const A = UI.af; let title, message, tags;
  if (['quiz', 'exam', 'paper', 'scope', 'redo', 'challenge'].includes(ev.type)) {
    title = `${kid.name}: ${A.ev[ev.type]} ${ev.score}%`; message = `${ev.label || ''}\n${ev.correct}/${ev.total} · +${ev.xp} XP · ${Math.max(1, Math.round((ev.secs || 0) / 60))} min`;
    tags = [ev.score >= 80 ? 'tada' : ev.score >= 50 ? 'books' : 'warning'];
  } else if (ev.type === 'login') {
    const key = 'lh.ntfy.' + kid.id + '.' + today(); try { if (localStorage.getItem(key)) return; localStorage.setItem(key, '1'); } catch (e) {}
    title = `${kid.name} het begin leer`; message = `Leerhoek · ${new Date().toTimeString().slice(0, 5)}`; tags = ['wave'];
  } else return;
  try { fetch('https://ntfy.sh/', { method: 'POST', body: JSON.stringify({ topic, title, message, tags }) }).catch(() => {}); } catch (e) {}
}
async function initStore() {
  S.store = new LocalStore(); S.storeKind = 'local';
  const cfg = window.LH_CONFIG;
  if (cfg && cfg.supabaseUrl) {
    const fk = readFamilyKey();
    if (!fk) { S.keyProblem = 'missing'; return; }
    const st = new SupaStore(cfg.supabaseUrl, cfg.supabaseKey, fk);
    try { if (await st.ping()) { S.store = st; S.storeKind = 'supa'; S.keyProblem = null; return; } S.keyProblem = 'bad'; }
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
async function sha(s) { try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('lh:' + s)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''); } catch (e) { return 'plain:' + s; } }

/* ------------------------------------------------------------------ content */
async function loadContent() {
  const content = { grades: [], subjects: {} };
  if (window.CONTENT_BUNDLE) {
    content.grades = window.CONTENT_BUNDLE.index.grades; Object.assign(content.subjects, window.CONTENT_BUNDLE.subjects); return content;
  }
  const idx = await (await fetch('content/index.json', { cache: 'no-cache' })).json();
  content.grades = idx.grades;
  const files = [];
  idx.grades.forEach(g => g.subjects.forEach(s => files.push(s)));
  const results = await Promise.allSettled(files.map(f => fetch(f.file, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })));
  results.forEach((r, i) => { if (r.status === 'fulfilled') content.subjects[files[i].id] = r.value; });
  return content;
}
const subjectsOfGrade = (grade) => { const g = S.content.grades.find(x => x.grade === grade) || S.content.grades[0]; return g.subjects.map(s => S.content.subjects[s.id]).filter(Boolean); };
const allTopics = (subj) => subj.terms.flatMap(tm => tm.topics.map(tp => ({ tp, term: tm.term })));
function findTopic(topicId) { for (const id in S.content.subjects) { const subj = S.content.subjects[id]; for (const tm of subj.terms) for (const tp of tm.topics) if (tp.id === topicId) return { subj, tp, term: tm.term }; } return null; }

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
function schoolTerms(kid) { const t = kid.school && kid.school.terms; return t ? Object.keys(t).sort() : []; }
function schoolMark(kid, sid, term) { const ts = schoolTerms(kid); if (!ts.length) return null; const k = term || ts[ts.length - 1]; const v = kid.school.terms[k][sid]; return (typeof v === 'number') ? v : null; }
function passTarget(sid) { return PASS_TARGET[sid] || PASS_TARGET.default; }
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
  if (ev && ['quiz', 'exam', 'paper', 'scope', 'redo', 'challenge'].includes(ev.type)) { if (!kid.day || kid.day.d !== d) kid.day = { d, tests: 0 }; kid.day.tests++; }
  if (!has('subject') && ev && ev.subject) { const subj = S.content.subjects[ev.subject]; if (subj && allTopics(subj).every(x => (tprog(kid, x.tp.id).best || 0) >= 70)) kid.badges.push('subject'); }
  if (ev) {
    ev.t = Date.now(); ev.xp = xp;
    const s = ev.subject ? S.content.subjects[ev.subject] : null, f = ev.topic ? findTopic(ev.topic) : null;
    const pe = ev.paper ? findPaper(ev.paper) : null;
    if (!ev.label) ev.label = [s ? (s.short.af || s.short.en) : null, f ? (f.tp.title.af || f.tp.title.en) : null, pe ? (pe.ex.title.af || pe.ex.title.en) : null].filter(Boolean).join(' · ');
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
  if (h === 'diaan' || h === 'stefan') return { s: 'home', kid: h };
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
  let m;
  if ((m = h.match(/^afbakening-(.+)$/))) return { s: 'scope', id: m[1] };
  if ((m = h.match(/^herdoen(?:-(.+))?$/))) return { s: 'redo', id: m[1] || 'all' };
  if ((m = h.match(/^spel-(.+)$/))) return { s: 'game', id: m[1] };
  if ((m = h.match(/^vak-(.+)$/))) return { s: 'subject', id: m[1] };
  if ((m = h.match(/^onderwerp-(.+)$/))) return { s: 'topic', id: m[1] };
  if ((m = h.match(/^toets-(.+)$/))) return { s: 'quiz', id: m[1] };
  if ((m = h.match(/^eksamen-(.+)$/))) return { s: 'exam', id: m[1] };
  if ((m = h.match(/^vraestel-(.+)$/))) return { s: 'paper', id: m[1] };
  return { s: 'home' };
}
function nav() {
  const r = parseRoute();
  const items = [['home', '🏠', t('home')], ['subjects', '📚', t('subjects')], ['exams', '🎯', t('navExams')], ['games', '🎮', t('navPlay')], ['dict', '📖', t('navDict')], ['parent', '👪', t('parent')]];
  const hashes = { home: 'home', subjects: 'vakke', exams: 'eksamens', games: 'speel', dict: 'woordeboek', parent: 'ouer', badges: 'kentekens', resources: 'hulpbronne' };
  const groups = { subjects: ['subject', 'topic', 'quiz', 'exam', 'paper', 'resources'], exams: ['scope', 'mistakes', 'redo'], games: ['game', 'week', 'badges'] };
  const on = (k) => (r.s === k || (groups[k] || []).includes(r.s)) ? 'on' : '';
  $('#bottomnav').innerHTML = items.map(([k, ic, lb]) => `<button class="${on(k)}" data-go="${hashes[k]}"><span class="ic">${ic}</span>${esc(lb)}</button>`).join('');
  $('#desknav').innerHTML = items.map(([k, ic, lb]) => `<button class="${on(k)}" data-go="${hashes[k]}">${esc(lb)}</button>`).join('');
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
}
function renderWho() {
  const w = $('#whoBtn');
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
  if (r.kid && r.kid !== S.kidId && S.store && !(window.LH_CONFIG && S.keyProblem)) await selectKid(r.kid);
  nav();
  if (!S.content) { main.innerHTML = `<div class="splash"><div>${mascot()}<h2 style="margin-top:12px">${esc(t('loading'))}</h2></div></div>`; return; }
  if (r.s === 'parent') return renderParent(main);
  if (r.s === 'resources') return renderResources(main);
  if (window.LH_CONFIG && (S.keyProblem === 'missing' || S.keyProblem === 'bad')) return renderGate(main);
  if (!S.kid || r.s === 'gate') return renderGate(main);
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
    case 'exams': return renderExams(main);
    case 'mistakes': return renderMistakes(main);
    case 'games': return renderGames(main);
    case 'game': return renderGame(main, r.id);
    case 'dict': return renderDict(main);
    case 'paper': return renderPaper(main, r.id);
    case 'badges': return renderBadges(main);
    default: return renderHome(main);
  }
}
async function selectKid(id) {
  const k = KIDS.find(x => x.id === id); if (!k) return;
  S.kidId = id; S.kid = await S.store.loadKid(id);
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
  const box = $('#profiles');
  Promise.all(KIDS.map(k => S.store.loadKid(k.id))).then(kids => {
    box.innerHTML = kids.map(k => `<button class="profile" data-kid="${k.id}"><span class="big">${k.avatar}</span><span class="nm">${esc(k.name)}</span><span class="lv">${esc(t('level'))} ${levelOf(k.xp)} · ${k.xp} XP</span></button>`).join('')
      + `<button class="profile" data-parent="1"><span class="big">👪</span><span class="nm">${esc(t('parent'))}</span><span class="lv">${esc(t('parentSub'))}</span></button>`;
    box.querySelectorAll('[data-kid]').forEach(b => b.onclick = async () => { await selectKid(b.dataset.kid); const lev = { type: 'login', t: Date.now() }; S.store.appendLog(b.dataset.kid, lev).catch(() => {}); notify(S.kid, lev); go('home'); });
    $('[data-parent]', box).onclick = () => go('ouer');
  });
}
function renderHome(main) {
  const kid = S.kid, subjects = subjectsOfGrade(7);
  const lv = levelOf(kid.xp), next = xpForLevel(lv + 1), cur = xpForLevel(lv), pct = clamp(Math.round(100 * (kid.xp - cur) / (next - cur)), 0, 100);
  const acc = kid.totals.answered ? Math.round(100 * kid.totals.correct / kid.totals.answered) : 0;
  const focus = focusSubjects(kid, subjects);
  const plan = dailyPlan(kid), doneN = plan.filter(m => isDoneToday(kid, m.tp.id)).length;
  const nx = examList().find(x => x.days !== null && x.days >= 0);
  const exam = nx ? nx.days : (S.settings.examDate ? daysBetween(today(), S.settings.examDate) : null);
  const examLabel = nx ? `${nx.s.icon} ${tx(nx.s.name)} · ${fmtDate(nx.sc.date)}` : (S.settings.examTitle || '');
  const term = curTerm(), chest = chestState(kid), mc = mistakeCount(kid), wd = wordOfDay();
  main.innerHTML = `${instSlot()}
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
  <div class="tiles">
    <button class="card tile ${chest.ready ? 'ready' : ''}" id="chestT"><span class="ti">${chest.opened ? '💰' : '🎁'}</span><b>${esc(t('chestT'))}</b><span class="small muted">${chest.opened ? esc(t('chestDone')) : chest.ready ? esc(t('chestReady')) : `<span class="num">${Math.min(3, chest.tests)}/3</span> ${esc(t('testsToday'))}`}</span>${!chest.opened && !chest.ready ? `<div class="bar-h" style="margin-top:auto"><i style="width:${Math.round(100 * Math.min(3, chest.tests) / 3)}%;background:var(--hi)"></i></div>` : ''}</button>
    <button class="card tile" data-go="speel"><span class="ti">🏆</span><b>${esc(t('weekT'))}</b><span class="small" id="twinMini">…</span><span class="small muted">${esc(t('weekXpShort'))}</span></button>
    <button class="card tile" id="wotdT" style="--subject:${wd ? wd.s.color : 'var(--brand)'}"><span class="ti">📖</span><b>${esc(t('wotd'))}</b>${wd ? `<span class="wotd">${esc(dWord(wd))}</span><span class="small muted">${esc(dOther(wd))}</span>` : ''}</button>
    <button class="card tile" data-go="foute"><span class="ti">❌</span><b>${esc(t('mistakesT'))}</b><span class="big2 num">${mc}</span><span class="small muted">${esc(mc ? t('tapToRedo') : t('noMistakesShort'))}</span></button>
  </div>
  ${focus.length ? `<div class="card" style="margin-top:18px"><div class="row" style="justify-content:space-between"><h2>🎓 ${esc(t('focus'))}</h2><span class="small muted">${esc(t('focusSub'))}</span></div>
    <div class="row" style="margin-top:10px">${focus.map(f => `<button class="chip ${f.margin < 0 ? 'bad' : f.margin < 10 ? 'hi' : 'good'}" data-subj="${f.s.id}" style="font-size:0.85rem;padding:6px 12px">${f.s.icon} ${esc(tx(f.s.short))} <span class="num">${f.mark}%</span> → ${esc(t('target'))} <span class="num">${f.target}%</span></button>`).join('')}</div></div>` : ''}
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
  maybeFact();
}
function subjectCard(s, kid, i) {
  const pct = subjectPct(kid, s), n = allTopics(s).length, done = allTopics(s).filter(x => topicStatus(kid, x.tp.id) !== 'new').length;
  return `<button class="subj" data-subj="${s.id}" style="--subject:${s.color};animation-delay:${i * 50}ms"><div class="row" style="justify-content:space-between"><span class="ic">${s.icon}</span>${ring(pct)}</div><div class="nm">${esc(tx(s.name))}</div><div class="foot"><span class="num">${done}/${n} ${esc(t('topics'))}</span></div></button>`;
}
function wireSubjectCards(root) { root.querySelectorAll('[data-subj]').forEach(b => b.onclick = () => go('vak-' + b.dataset.subj)); }
function renderSubjects(main) {
  const subjects = subjectsOfGrade(7);
  main.innerHTML = `<div class="row" style="justify-content:space-between"><h1>${esc(t('subjects'))}</h1><button class="btn sm" data-go="hulpbronne">🔗 ${esc(t('resources'))}</button></div><p class="muted" style="margin:4px 0 16px">${esc(t('chooseGrade'))} 7 · CAPS · ${esc(t('termNow'))} ${curTerm()}</p><div class="subjects">${subjects.map((s, i) => subjectCard(s, S.kid, i)).join('')}</div>`;
  wireSubjectCards(main); $('[data-go]', main).onclick = () => go('hulpbronne');
}
function renderSubject(main, id) {
  const s = S.content.subjects[id]; if (!s) return go('vakke');
  setSubjectColor(s.color);
  const kid = S.kid, pct = subjectPct(kid, s);
  const ct = curTerm(), scope = new Set(scopeOf(s).topics);
  let term = S._term && S._term[id] || (s.terms.find(tm => tm.term === ct && tm.topics.length) || s.terms.find(tm => tm.topics.length) || s.terms[0]).term;
  const draw = () => {
    const tm = s.terms.find(x => x.term === term) || s.terms[0];
    main.innerHTML = `<button class="back" data-go="vakke">← ${esc(t('subjects'))}</button>
    <div class="subhead"><span class="ic">${s.icon}</span><div class="t"><h1>${esc(tx(s.name))}</h1><p class="small muted">${esc(tx(s.intro))}</p>${schoolMark(kid, s.id) !== null ? `<div class="row" style="margin-top:8px;gap:6px"><span class="chip ${schoolMark(kid, s.id) < passTarget(s.id) ? 'bad' : 'good'}">${esc(t('school'))} ${esc(t('termShort'))}${schoolTerms(kid).slice(-1)[0]}: <span class="num">${schoolMark(kid, s.id)}%</span></span><span class="chip">${esc(t('target'))} <span class="num">${passTarget(s.id)}%</span></span></div>` : ''}</div>${ring(pct)}</div>
    <div class="row" style="margin-top:12px;justify-content:space-between"><details class="tips" style="flex:1;min-width:240px"><summary>💡 ${esc(t('examTips'))}</summary><ul>${(s.examTips || []).map(x => `<li>${esc(tx(x))}</li>`).join('')}</ul></details>
    <div class="row" style="gap:8px"><button class="btn subject" data-go="afbakening-${s.id}">🎯 ${esc(t('scopeTest'))}</button><button class="btn" data-go="eksamen-${s.id}">🎓 ${esc(t('examPractice'))}</button></div></div>
    ${s.examFormat ? `<details class="tips" style="margin-top:10px"><summary>📄 ${esc(t('examFormatT'))}</summary><div class="prose small" style="margin-top:6px">${md(tx(s.examFormat))}</div></details>` : ''}
    ${(s.practiceExams || []).length ? `<div class="card" style="margin-top:10px"><h3>📝 ${esc(t('papers'))}</h3><p class="small muted" style="margin:4px 0 10px">${esc(t('paperSub'))}</p><div class="stack" style="gap:8px">${s.practiceExams.map(ex => { const pp = (kid.papers || {})[ex.id]; return `<div class="row" style="justify-content:space-between"><div><b>${esc(tx(ex.title))}</b><div class="small muted num">${ex.total} ${esc(t('marks'))} · ${ex.minutes} ${esc(t('min'))}${pp ? ` · ${esc(t('bestMark'))} ${pp.best}% (${pp.attempts}×)` : ''}</div></div><button class="btn sm subject" data-go="vraestel-${ex.id}">${esc(t('startPaper'))} →</button></div>`; }).join('')}</div></div>` : ''}
    <div class="tabs">${s.terms.map(x => `<button class="${x.term === term ? 'on' : ''}" data-term="${x.term}">${esc(t('term'))} ${x.term}${x.term === ct ? ' · ' + esc(t('now')) : ''} <span class="num">(${x.topics.length})</span></button>`).join('')}</div>
    <h3 style="margin:6px 0 10px">${esc(tx(tm.title))}</h3>
    <div class="topics">${tm.topics.length ? tm.topics.map((tp, i) => { const st = topicStatus(kid, tp.id), p = tprog(kid, tp.id); return `<div class="topic" style="animation-delay:${i * 40}ms"><div class="ix">${i + 1}</div><div><div class="tt">${esc(tx(tp.title))}</div><div class="bl">${esc(tx(tp.blurb))}</div><div class="row" style="gap:6px;margin-top:6px">${statusChip(st)}${p.attempts ? `<span class="chip num">${p.best}% · ${p.attempts}×</span>` : ''}${scope.has(tp.id) ? `<span class="chip hi">🎯 ${esc(t('inScope'))}</span>` : ''}</div></div><div class="acts"><button class="btn sm" data-go="onderwerp-${tp.id}">📖 ${esc(t('learn'))}</button><button class="btn sm subject" data-go="toets-${tp.id}">✏️ ${esc(t('test'))}</button></div></div>`; }).join('') : `<div class="card muted">…</div>`}</div>`;
    main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
    main.querySelectorAll('[data-term]').forEach(b => b.onclick = () => { term = +b.dataset.term; S._term = S._term || {}; S._term[id] = term; draw(); });
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
    <div class="row" style="gap:8px"><span class="chip subject">${subj.icon} ${esc(tx(subj.short))} · ${esc(t('term'))} ${term}</span>${statusChip(topicStatus(kid, tid))}</div>
    <h1 style="margin-top:8px">${esc(tx(tp.title))}</h1><p class="muted">${esc(tx(tp.blurb))}</p>
    <div class="ttabs">${tabs.map(([k, ic, lb, done]) => `<button class="${tab === k ? 'on' : ''}" data-tab="${k}"><span>${ic}</span><span class="lb">${esc(lb)}</span>${done ? '<span class="done">✓</span>' : ''}</button>`).join('')}</div>
    <div id="tabbody"></div>`;
    main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
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
  const subjects = subjectsOfGrade(7);
  main.innerHTML = `<h1>🔗 ${esc(t('resources'))}</h1><p class="muted" style="margin:6px 0 16px;max-width:70ch">${esc(t('resourcesIntro'))}</p>
  <div class="grid two">${subjects.map(s => `<div class="card" style="--subject:${s.color};border-left:6px solid var(--subject)"><h3>${s.icon} ${esc(tx(s.name))}</h3><ul style="margin:8px 0 0;padding-left:18px">${(s.resources || []).map(r => `<li style="margin:6px 0"><a href="${esc(r.url)}" target="_blank" rel="noopener"><b>${esc(tx(r.title))}</b></a><div class="small muted">${esc(tx(r.note))}</div></li>`).join('')}</ul></div>`).join('')}</div>`;
}

/* ------------------------------------------------------------------ quiz engine */
function buildQuestions(id, mode) {
  if (mode === 'exam') {
    const s = S.content.subjects[id]; if (!s) return null;
    const pool = allTopics(s).flatMap(x => x.tp.quiz.map(q => ({ q, topic: x.tp, term: x.term })));
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
function mountQuestion(q, body, act, finishCb) {
  let fin = false; const marks = q.marks || 1;
  const finish = (ok, detail, earned) => { if (fin) return; fin = true; finishCb(ok, detail, earned === undefined ? (ok ? marks : 0) : earned); };
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
    body.querySelectorAll('.opt').forEach(b => b.onclick = () => { const i = +b.dataset.i; body.querySelectorAll('.opt').forEach(x => x.disabled = true); b.classList.add(i === q.answer ? 'right' : 'wrong'); body.querySelector(`[data-i="${q.answer}"]`).classList.add('right'); finish(i === q.answer, i === q.answer ? '' : inline(tx(q.options[q.answer]))); });
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
const QEV = { topic: 'quiz', exam: 'exam', scope: 'scope', redo: 'redo', week: 'challenge' };
function renderQuiz(main, id, mode) {
  if (mode === true) mode = 'exam'; if (!mode) mode = 'topic';
  const built = buildQuestions(id, mode);
  if (!built) return go(mode === 'redo' ? 'foute' : mode === 'scope' ? 'eksamens' : mode === 'week' ? 'speel' : 'vakke');
  const bs = built.subj || { id: null, color: '#2f6df6', name: { af: 'Leerhoek', en: 'Leerhoek' }, short: { af: '', en: '' } };
  setSubjectColor(bs.color);
  const kid = S.kid, qs = built.qs, multi = mode !== 'topic';
  const backHash = { topic: 'onderwerp-' + id, exam: 'vak-' + bs.id, scope: 'eksamens', redo: 'foute', week: 'speel' }[mode];
  const backName = { topic: t('summary'), exam: tx(bs.name), scope: t('exT'), redo: t('mistakesT'), week: t('playT') }[mode];
  const Q = { i: 0, answered: 0, correct: 0, fixed: 0, results: [], start: Date.now() };
  S.quiz = Q;
  const drawQ = () => {
    if (Q.i >= qs.length) return drawResult();
    const it = qs[Q.i], { q } = it;
    if (it.subj) setSubjectColor(it.subj.color);
    const typeLabel = { mc: L === 'af' ? 'Meervoudige keuse' : 'Multiple choice', tf: L === 'af' ? 'Waar of onwaar' : 'True or false', fill: L === 'af' ? 'Vul in' : 'Fill in', match: L === 'af' ? 'Pas bymekaar' : 'Match' }[q.type];
    const where = multi ? ` · ${it.subj && (mode === 'redo' || mode === 'week') ? esc(it.subj.icon + ' ' + tx(it.subj.short)) + ' · ' : ''}${esc(tx(it.topic.title))}` : '';
    main.innerHTML = `<div class="quiz"><button class="back" data-go="${backHash}">← ${esc(built.title)}</button>
      <div class="qhead"><span class="chip subject num">${Q.i + 1} / ${qs.length}</span><div class="bar-h subject"><i style="width:${Math.round(100 * Q.i / qs.length)}%"></i></div><span class="chip num">${Q.correct} ✓</span></div>
      <div class="qcard"><div class="chip qtype">${esc(typeLabel)}${where}</div><div class="q">${inline(tx(q.q))}</div><div id="qbody"></div><div id="fb"></div><div class="qfoot"><span></span><span id="qact"></span></div></div></div>`;
    $('[data-go]', main).onclick = () => go(backHash);
    const body = $('#qbody'), act = $('#qact');
    let done = false;
    const finish = (ok, detail) => {
      if (done) return; done = true; Q.answered++; if (ok) Q.correct++;
      Q.fixed += noteMistake(kid, it.topic, q, ok);
      Q.results.push({ q, ok, detail });
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
      <div class="row" style="justify-content:center;margin-top:18px"><button class="btn subject" id="again">🔁 ${esc(t('tryAgain'))}</button><button class="btn" data-go="${backHash}">${esc(t('backTo'))} ${esc(backName)}</button></div>
      <h3 style="margin-top:22px;text-align:left">${esc(t('review'))}</h3><div class="review">${Q.results.map(r => `<div class="r ${r.ok ? '' : 'bad'}"><div>${r.ok ? '✅' : '❌'}</div><div><div>${inline(tx(r.q.q))}</div>${r.ok ? '' : `<div class="ex"><b>${esc(t('rightAnswer'))}:</b> ${r.detail}</div>`}<div class="ex">${inline(tx(r.q.explain))}</div></div></div>`).join('')}</div></div></div>`;
    $('#again').onclick = () => renderQuiz(main, id, mode);
    $('[data-go]', main).onclick = () => go(backHash);
    if (score >= 80) confetti(score === 100 ? 200 : 120);
    await award(kid, xp, { type: QEV[mode], subject: bs.id, topic: built.topicId, score, correct: Q.correct, total: qs.length, secs });
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
    $('#startP').onclick = () => { P.start = Date.now(); P.timer = setInterval(tick, 1000); S.paperTimer = P.timer; P.i = 0; drawQ(); };
  };
  const drawQ = () => {
    if (P.i >= flat.length) return drawResult();
    const { q, si, qi, sec } = flat[P.i]; const marks = q.marks || 1;
    const doneMarks = flat.slice(0, P.i).reduce((a, x) => a + (x.q.marks || 1), 0);
    main.innerHTML = `<div class="quiz"><div class="qhead"><span class="chip subject num">${P.i + 1} / ${flat.length}</span><div class="bar-h subject"><i style="width:${Math.round(100 * doneMarks / ex.total)}%"></i></div><span class="chip num" id="timeLeft">–</span><span class="chip num">${P.earned} ✓</span></div>
      ${qi === 0 && sec.intro ? `<div class="card" style="margin-bottom:12px"><div class="label" style="margin-bottom:6px">${esc(tx(sec.title))}</div><div class="prose small">${md(tx(sec.intro))}</div></div>` : ''}
      <div class="qcard"><div class="row" style="justify-content:space-between;margin-bottom:8px"><span class="chip qtype">${esc(tx(sec.title))}</span><span class="chip hi num">${marks} ${esc(marks === 1 && L === 'af' ? 'punt' : t('marks'))}</span></div><div class="q">${sec.intro && qi > 0 ? `<button class="btn sm ghost" id="showIntro" style="float:right">📄</button>` : ''}${inline(tx(q.q))}</div><div id="qbody"></div><div id="fb"></div><div class="qfoot"><span id="qskip"></span><span id="qact"></span></div></div></div>`;
    tick();
    const si2 = $('#showIntro'); if (si2) si2.onclick = () => { si2.remove(); $('.qcard').insertAdjacentHTML('afterbegin', `<div class="card" style="margin-bottom:12px;background:var(--surface-2);box-shadow:none"><div class="prose small">${md(tx(sec.intro))}</div></div>`); };
    const body = $('#qbody'), act = $('#qact');
    const next = () => { P.i++; drawQ(); };
    $('#qskip').innerHTML = `<button class="btn sm ghost" id="skipB">${esc(t('skipQ'))} →</button>`;
    $('#skipB').onclick = () => { P.results.push({ q, sec, ok: false, earned: 0, skipped: true }); next(); };
    mountQuestion(q, body, act, (ok, detail, earned) => {
      $('#skipB').disabled = true;
      P.earned += earned; P.bySec[si] += earned; P.results.push({ q, sec, ok, earned, detail });
      if (q.type !== 'open') $('#fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}"><div class="h">${ok ? '🎉 ' + esc(t('correct')) : '🤔 ' + esc(t('wrong'))} <span class="num">+${earned}/${marks}</span></div>${detail ? `<div class="small"><b>${esc(t('rightAnswer'))}:</b> ${detail}</div>` : ''}${q.explain ? `<div class="small" style="margin-top:4px">${inline(tx(q.explain))}</div>` : ''}</div>`;
      else $('#fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}"><div class="h">${ok ? '🎉' : '✏️'} <span class="num">+${earned}/${marks}</span></div></div>`;
      act.innerHTML = `<button class="btn subject" id="nextQ">${P.i + 1 < flat.length ? esc(t('next')) + ' →' : esc(t('finish')) + ' 🏁'}</button>`;
      $('#nextQ').onclick = next; $('#nextQ').focus();
    });
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
      <div class="row" style="justify-content:center;margin-top:18px"><button class="btn subject" id="again">🔁 ${esc(t('tryAgain'))}</button><button class="btn" data-go="${backHash}">${esc(t('backTo'))} ${esc(tx(subj.name))}</button></div>
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
  const f = ev.topic ? findTopic(ev.topic) : null; const s = ev.subject ? S.content.subjects[ev.subject] : null;
  const what = (t('ev')[ev.type] || ev.type) + ((ev.type === 'paper' || ev.type === 'game') && ev.label ? ' · ' + esc(ev.label) : (s ? ' · ' + tx(s.short) : '') + (f ? ' · ' + tx(f.tp.title) : ''));
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
    $('#pinf').onsubmit = async (e) => { e.preventDefault(); const v = inp.value.trim(); if (!/^\d{4,6}$/.test(v)) { $('#pinerr').textContent = t('setPin'); return; } const h = await sha(v); if (first) { S.settings.pinHash = h; await S.store.saveSettings(S.settings); S.parentUnlocked = true; render(); } else if (h === S.settings.pinHash) { S.parentUnlocked = true; render(); } else { $('#pinerr').textContent = t('pinWrong'); inp.value = ''; inp.classList.add('wrong'); setTimeout(() => inp.classList.remove('wrong'), 500); } };
    return;
  }
  const subjects = subjectsOfGrade(7);
  const kids = await Promise.all(KIDS.map(k => S.store.loadKid(k.id)));
  const logs = await Promise.all(KIDS.map(k => S.store.loadLogs(k.id, 14).catch(() => [])));
  const weekAgo = Date.now() - 7 * 86400000;
  main.innerHTML = `${instSlot()}<div class="row" style="justify-content:space-between"><h1>👪 ${esc(t('dashboard'))}</h1><span class="chip ${S.storeKind !== 'local' ? 'good' : ''}">${S.storeKind !== 'local' ? '☁️ ' + esc(t('storageDb')) : '💾 ' + esc(t('storageLocal'))}</span></div>
  <div class="grid two" style="margin-top:14px" id="kidcards"></div>
  <div class="grid two" style="margin-top:14px">
    <div class="card"><h3>⚙️ ${esc(t('settings'))}</h3><form id="setf" class="stack" style="margin-top:10px"><div class="form-row"><label for="exd">${esc(t('examDate'))}</label><input type="date" id="exd" value="${esc(S.settings.examDate || '')}"></div><div class="form-row"><label for="ext">${esc(t('examTitle'))}</label><input id="ext" value="${esc(S.settings.examTitle || '')}" placeholder="Graad 7 Novembereksamen"></div><div class="form-row"><label for="npin">${esc(t('changePin'))}</label><input id="npin" inputmode="numeric" maxlength="6" placeholder="••••"></div><button class="btn primary" type="submit">${esc(t('save'))}</button></form></div>
    <div class="card"><h3>📥 ${esc(t('importCode'))}</h3><p class="small muted" style="margin:6px 0 10px">${esc(t('importHint'))}</p><textarea id="impcode"></textarea><button class="btn" id="impbtn" style="margin-top:8px">${esc(t('importBtn'))}</button></div>
  </div>${scopeEditor(subjects)}`;
  wireInstall(); wireScopeEditor(main);
  const cards = $('#kidcards');
  const drawKid = (kid, log) => {
    const events = log.flatMap(d => (d.events || []).map(e => ({ ...e, date: d.date }))).sort((a, b) => b.t - a.t);
    const week = events.filter(e => e.t >= weekAgo), quizzesWeek = week.filter(e => ['quiz', 'exam', 'scope', 'redo', 'challenge'].includes(e.type));
    const avgWeek = quizzesWeek.length ? Math.round(quizzesWeek.reduce((a, e) => a + e.score, 0) / quizzesWeek.length) : 0;
    const weak = subjects.flatMap(s => allTopics(s).filter(x => topicStatus(kid, x.tp.id) === 'practice').map(x => ({ s, ...x })));
    const last = events[0] ? `${fmtDay(events[0].date)} ${fmtTime(events[0].t)}` : t('never');
    return `<div class="card kidcard" id="kc-${kid.id}"><div class="kh"><span class="av">${kid.avatar}</span><div><h2>${esc(kid.name)}</h2><div class="small muted">${esc(t('level'))} ${levelOf(kid.xp)} · ${esc(levelName(levelOf(kid.xp)))} · ${esc(t('lastActive'))}: ${esc(last)}</div></div></div>
      <div class="kv"><div><div class="v num">${kid.xp}</div><div class="k">XP</div></div><div><div class="v num">🔥 ${kid.streak.count}</div><div class="k">${esc(t('streak'))}</div></div><div><div class="v num">${quizzesWeek.length}</div><div class="k">${esc(t('quizzes'))} ${esc(t('thisWeek'))}</div></div><div><div class="v num">${avgWeek}%</div><div class="k">${esc(t('avg'))} ${esc(t('thisWeek'))}</div></div><div><div class="v num">${Math.round((kid.totals.secs || 0) / 60)} ${esc(t('min'))}</div><div class="k">${esc(t('timeOn'))}</div></div><div><div class="v num">🏆 ${weekXp(kid)}</div><div class="k">XP ${esc(t('thisWeek'))}</div></div><div><div class="v num">❌ ${mistakeCount(kid)}</div><div class="k">${esc(t('mistakesShort'))}</div></div><div><div class="v num">🎮 ${(kid.totals.games || 0)}</div><div class="k">${esc(t('gamesShort'))}</div></div></div>
      ${schoolTerms(kid).length ? (() => { const ts = schoolTerms(kid); const rows = subjects.map(s => ({ id: s.id, label: s.icon + ' ' + tx(s.short), target: passTarget(s.id), plat: subjectPct(kid, s) })).concat(Object.keys(SCHOOL_EXTRA).filter(k => ts.some(tm => typeof kid.school.terms[tm][k] === 'number')).map(k => ({ id: k, label: tx(SCHOOL_EXTRA[k]), target: k === 'kk' ? 30 : null, plat: null })));
        return `<h3 style="margin-top:16px">🏫 ${esc(t('schoolMarks'))}</h3><p class="small muted" style="margin:2px 0 8px">${esc(t('schoolSub'))}</p><div class="tbl"><table class="marks"><tr><th></th>${ts.map(tm => `<th class="num">${esc(t('termShort'))}${tm}</th>`).join('')}<th class="num">${esc(t('target'))}</th><th class="num">${esc(t('platform'))}</th></tr>${rows.map(r => { const last = schoolMark(kid, r.id); const bad = r.target !== null && last !== null && last < r.target; return `<tr class="${bad ? 'bad' : ''}"><td>${esc(r.label)}</td>${ts.map(tm => `<td class="num">${typeof kid.school.terms[tm][r.id] === 'number' ? kid.school.terms[tm][r.id] + '%' : '–'}</td>`).join('')}<td class="num">${r.target !== null ? r.target + '%' : '–'}</td><td class="num">${r.plat !== null ? r.plat + '%' : '–'}</td></tr>`; }).join('')}${kid.school.avg ? `<tr><td><b>${esc(t('avgShort'))}</b></td>${ts.map(tm => `<td class="num"><b>${kid.school.avg[tm] !== undefined ? kid.school.avg[tm] + '%' : '–'}</b></td>`).join('')}<td></td><td></td></tr>` : ''}</table></div><p class="small muted" style="margin-top:6px">${esc(t('passRules'))}</p>`; })() : ''}
      <h3 style="margin-top:16px">${esc(t('mastery'))}</h3><div class="bars">${subjects.map(s => `<div class="b" style="--subject:${s.color}"><span>${s.icon} ${esc(tx(s.short))}</span><div class="bar-h subject"><i style="width:${subjectPct(kid, s)}%"></i></div><span class="num" style="text-align:right">${subjectPct(kid, s)}%</span></div>`).join('')}</div>
      <h3 style="margin-top:16px">⚠️ ${esc(t('weak'))}</h3>${weak.length ? `<ul class="weak small" style="margin:6px 0 0;padding-left:18px">${weak.slice(0, 8).map(w => `<li>${esc(tx(w.s.short))}: ${esc(tx(w.tp.title))} — <b class="num">${tprog(kid, w.tp.id).best}%</b></li>`).join('')}</ul>` : `<p class="small muted">${esc(t('noWeak'))}</p>`}
      <h3 style="margin-top:16px">🕒 ${esc(t('activity'))}</h3><div class="feed">${events.length ? events.slice(0, 40).map(e => `<div class="e"><span class="t">${esc(fmtDay(e.date))}<br>${fmtTime(e.t)}</span><span>${evText(e)}</span></div>`).join('') : `<p class="small muted">${esc(t('noActivity'))}</p>`}</div>
      <div class="row" style="margin-top:12px"><button class="btn sm" data-report="${kid.id}">📋 ${esc(t('copyReport'))}</button></div></div>`;
  };
  cards.innerHTML = kids.map((k, i) => drawKid(k, logs[i])).join('');
  const wire = () => cards.querySelectorAll('[data-report]').forEach(b => b.onclick = async () => { const kid = kids.find(k => k.id === b.dataset.report); if (await copyText(reportText(kid, subjects))) toast(t('copied')); });
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
function defaultScopeTopics(s) { const terms = LANG_SUBJ.includes(s.id) ? [1, 2, 3, 4] : [3, 4]; return allTopics(s).filter(x => terms.includes(x.term)).map(x => x.tp.id); }
function scopeOf(s) {
  const e = ((S.settings || {}).exams || {})[s.id] || {};
  const valid = new Set(allTopics(s).map(x => x.tp.id));
  const ids = (Array.isArray(e.topics) ? e.topics : defaultScopeTopics(s)).filter(id => valid.has(id));
  return { topics: ids, date: e.date || '', note: e.note || '', provisional: !Array.isArray(e.topics) };
}
function scopePct(kid, s, sc) { sc = sc || scopeOf(s); if (!sc.topics.length) return 0; return Math.round(sc.topics.reduce((a, id) => a + topicPct(kid, id), 0) / sc.topics.length); }
function scopeReady(kid, sc) { return sc.topics.filter(id => (tprog(kid, id).best || 0) >= 70).length; }
function examList() {
  return subjectsOfGrade(7).map(s => { const sc = scopeOf(s); return { s, sc, days: sc.date ? daysBetween(today(), sc.date) : null }; })
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
  const x = examList().find(e => e.s.id === sid);
  if (x && x.days !== null && x.days >= 0 && x.days <= 21) return `${t('exam1')} ${t('exIn')} ${x.days} ${t('days')}`;
  if (focusSubjects(kid, subjectsOfGrade(7)).some(f => f.s.id === sid)) return t('focusShort');
  return '';
}
function studyPlan(kid) {
  const subjects = subjectsOfGrade(7), td = today(), cur = curTerm();
  const ex = examList().filter(x => x.days === null || x.days >= 0);
  const near = ex.filter(x => x.days !== null && x.days <= 21).map(x => x.s.id);
  const focus = focusSubjects(kid, subjects).map(f => f.s.id);
  const rnd = seeded(td + kid.id);
  const order = [...near, ...focus, ...sshuffle(ex.map(x => x.s.id), rnd)].filter((v, i, a) => a.indexOf(v) === i);
  const rank = { practice: 0, read: 1, new: 2, good: 3, master: 9 };
  const plan = [], used = new Set();
  for (const sid of order) {
    if (plan.length >= 3) break;
    const s = S.content.subjects[sid];
    const c = scopeOf(s).topics.map(id => { const f = findTopic(id); return { s, tp: f.tp, term: f.term, pct: topicPct(kid, id), st: topicStatus(kid, id), r: rnd() }; })
      .filter(x => !used.has(x.tp.id) && x.st !== 'master')
      .sort((a, b) => (rank[a.st] - rank[b.st]) || ((b.term === cur) - (a.term === cur)) || (a.pct - b.pct) || (a.r - b.r))[0];
    if (c) { used.add(c.tp.id); plan.push(c); }
  }
  return plan;
}
function dailyPlan(kid) {
  const d = today(), sig = curTerm() + ':' + JSON.stringify((S.settings || {}).exams || {}).length;
  let items = null;
  if (kid.plan && kid.plan.d === d && kid.plan.sig === sig) items = kid.plan.ids.map(id => findTopic(id)).filter(Boolean).map(f => ({ s: f.subj, tp: f.tp, term: f.term }));
  if (!items || !items.length) { items = studyPlan(kid); kid.plan = { d, sig, ids: items.map(x => x.tp.id) }; S.store.saveKid(kid).catch(() => {}); }
  return items.map(x => ({ ...x, why: planWhy(kid, x.s.id) }));
}

/* ---------- exams screen ---------- */
function renderExams(main) {
  const kid = S.kid, list = examList();
  main.innerHTML = `<h1>🎯 ${esc(t('exT'))}</h1><p class="muted" style="margin:4px 0 6px;max-width:70ch">${esc(t('exSub'))}</p>
  <div class="row" style="gap:6px;margin-bottom:14px"><span class="chip hi">📅 ${esc(t('termNow'))} ${curTerm()}${curTerm() === 4 ? ' · ' + esc(t('finalTerm')) : ''}</span><button class="btn sm" data-go="foute">❌ ${esc(t('mistakesT'))} <span class="chip bad num">${mistakeCount(kid)}</span></button></div>
  ${list.some(x => x.sc.provisional) ? `<div class="banner" style="margin-bottom:14px">⏳ ${esc(t('provisionalHint'))}</div>` : ''}
  <div class="stack">${list.map(x => {
    const s = x.s, sc = x.sc, pct = scopePct(kid, s, sc), rd = scopeReady(kid, sc), paper = (s.practiceExams || [])[0];
    return `<div class="card excard" style="--subject:${s.color}"><div class="row" style="justify-content:space-between;align-items:flex-start;flex-wrap:nowrap"><div style="min-width:0"><h2>${s.icon} ${esc(tx(s.name))}</h2><div class="row" style="gap:6px;margin-top:6px">${examWhen(x)}${sc.provisional ? `<span class="chip">⏳ ${esc(t('provisional'))}</span>` : `<span class="chip good">✓ ${esc(t('confirmed'))}</span>`}</div></div>${ring(pct)}</div>
    ${sc.note ? `<p class="small" style="margin-top:8px">📌 ${esc(sc.note)}</p>` : ''}
    <div class="small muted" style="margin:10px 0 6px"><span class="num">${rd}/${sc.topics.length}</span> ${esc(t('scopeTopics'))} ${esc(t('ready'))} (≥70 %)</div>
    <div class="bar-h subject"><i style="width:${sc.topics.length ? Math.round(100 * rd / sc.topics.length) : 0}%"></i></div>
    <div class="row" style="margin-top:12px"><button class="btn subject" data-go="afbakening-${s.id}" ${sc.topics.length ? '' : 'disabled'}>🎯 ${esc(t('scopeTest'))}</button>${paper ? `<button class="btn" data-go="vraestel-${paper.id}">📝 ${esc(t('paper'))}</button>` : ''}</div>
    <details class="tips" style="margin-top:10px"><summary>📋 ${esc(t('showTopics'))} (${sc.topics.length})</summary><div class="stack" style="gap:6px;margin-top:8px">${sc.topics.map(id => { const f = findTopic(id); return `<div class="row scopetopic" style="justify-content:space-between"><span style="min-width:0"><span class="chip">${esc(t('termShort'))}${f.term}</span> ${esc(tx(f.tp.title))}</span><span class="row" style="gap:6px">${statusChip(topicStatus(kid, id))}<button class="btn sm" data-go="onderwerp-${id}" aria-label="${esc(t('learn'))}">📖</button><button class="btn sm subject" data-go="toets-${id}" aria-label="${esc(t('test'))}">✏️</button></span></div>`; }).join('')}</div></details></div>`;
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
  const kid = S.kid, items = mistakeItems(kid), subjects = subjectsOfGrade(7);
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
  subjectsOfGrade(7).forEach(s => scopeOf(s).topics.forEach(tid => { const f = findTopic(tid); f.tp.quiz.forEach(q => { if (q.type !== 'match') pool.push({ q, topic: f.tp, term: f.term, subj: s }); }); }));
  return sshuffle(pool, seeded('week' + weekId())).slice(0, 10);
}
function weekXp(k) { return k && k.week && k.week.w === weekId() ? k.week.xp : 0; }
async function twinData() {
  const other = KIDS.find(k => k.id !== S.kid.id);
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
  subjectsOfGrade(7).forEach(s => allTopics(s).forEach(({ tp, term }) => (tp.keyTerms || []).forEach(k => {
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
  const sets = {}; subjectsOfGrade(7).forEach(s => { sets[s.id] = new Set(scopeOf(s).topics); });
  const pool = dict().filter(e => sets[e.s.id] && sets[e.s.id].has(e.tp.id) && dOther(e));
  const P = pool.length ? pool : dict();
  return P[Math.floor(seeded('wotd' + today())() * P.length)];
}
function subjChips(cur, attr) {
  return `<div class="row chipsel" style="gap:6px">${[['all', '🌈', t('allSubj')]].concat(subjectsOfGrade(7).map(s => [s.id, s.icon, tx(s.short)])).map(([id, ic, nm]) => `<button class="chip ${cur === id ? 'on' : ''}" data-${attr}="${id}">${ic} ${esc(nm)}</button>`).join('')}</div>`;
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
const GAMES = [['geheue', 'memory', '🧩'], ['raai', 'hangman', '🔤'], ['sprint', 'sprint', '⚡'], ['blits', 'blitz', '✅']];
const GAME_ICON = { memory: '🧩', hangman: '🔤', sprint: '⚡', blitz: '✅' };
function gameSubj() { if (!S.gameSubj) { try { S.gameSubj = localStorage.getItem('lh.gsubj') || 'all'; } catch (e) { S.gameSubj = 'all'; } } return S.gameSubj; }
function setGameSubj(v) { S.gameSubj = v; try { localStorage.setItem('lh.gsubj', v); } catch (e) {} }
function bestText(key, best) { if (best === null || best === undefined) return '–'; if (key === 'memory') return `${best} ${t('moves')}`; if (key === 'hangman') return `${Math.floor(best / 100)}/5`; return String(best); }
function renderGames(main) {
  const kid = S.kid, cur = gameSubj(), w = weekId(), g = kid.games || {};
  const ch = kid.challenge && kid.challenge.w === w ? kid.challenge : null;
  main.innerHTML = `<h1>🎮 ${esc(t('playT'))}</h1><p class="muted" style="margin:4px 0 14px;max-width:70ch">${esc(t('playSub'))}</p>
  <div class="grid two">
    <div class="card"><h3>🏆 ${esc(t('weekT'))}</h3><div id="twinBox" class="small muted" style="margin-top:8px">…</div></div>
    <div class="card"><h3>⚔️ ${esc(t('chalT'))}</h3><p class="small muted" style="margin:4px 0 10px">${esc(t('chalSub'))}</p><div class="row" style="justify-content:space-between"><span class="chip ${ch ? 'good' : ''}">${ch ? `✓ ${esc(t('chalDone'))}: <span class="num">${ch.score}/${ch.total}</span>` : esc(t('chalNot'))}</span><button class="btn subject" data-go="uitdaging">${esc(ch ? t('chalReplay') : t('chalPlay'))} →</button></div></div>
  </div>
  <h2 style="margin:22px 0 8px">🧠 ${esc(t('brainGames'))}</h2><p class="small muted" style="margin-bottom:8px">${esc(t('pickSubj'))}</p>${subjChips(cur, 'gs')}
  <div class="games" style="margin-top:12px">${GAMES.map(([slug, key, ic], i) => { const [nm, ds] = t('g.' + key); const st = g[key] || {}; return `<button class="game" data-go="spel-${slug}" style="animation-delay:${i * 60}ms"><span class="gi">${ic}</span><b>${esc(nm)}</b><span class="small muted">${esc(ds)}</span>${st.plays ? `<span class="chip hi num">${esc(t('best'))}: ${esc(bestText(key, st.best))}</span>` : ''}</button>`; }).join('')}</div>
  <div class="row" style="margin-top:18px"><button class="btn" data-go="kentekens">🏅 ${esc(t('badges'))}</button><button class="btn" data-go="foute">❌ ${esc(t('mistakesT'))}</button></div>`;
  main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  main.querySelectorAll('[data-gs]').forEach(b => b.onclick = () => { setGameSubj(b.dataset.gs); renderGames(main); });
  fillTwin($('#twinBox'));
}
function gamePool(sid) { return dict().filter(e => !sid || sid === 'all' || e.s.id === sid); }
function gameHead(main, key, right) {
  const [nm, ds] = t('g.' + key);
  return `<button class="back" data-go="speel">← ${esc(t('playT'))}</button><div class="row" style="justify-content:space-between"><h1>${GAME_ICON[key]} ${esc(nm)}</h1>${right || ''}</div><p class="small muted" style="margin:4px 0 12px">${esc(ds)}</p>`;
}
function wireBack(main) { main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go)); }
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
function clearGame() { if (S._gameTimer) { clearInterval(S._gameTimer); S._gameTimer = null; } if (S._keyH) { document.removeEventListener('keydown', S._keyH); S._keyH = null; } }
function setKeys(fn) { if (S._keyH) document.removeEventListener('keydown', S._keyH); S._keyH = fn; document.addEventListener('keydown', fn); }

/* memory pairs: Afrikaans word ↔ English word */
function renderMemory(main) {
  const okPair = (e) => e.af && e.en && fold(e.af) !== fold(e.en) && e.af.length <= 26 && e.en.length <= 26;
  let pool = gamePool(gameSubj()).filter(okPair); if (pool.length < 6) pool = dict().filter(okPair);
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
  const okWord = (w) => w && w.length >= 3 && w.length <= 18 && [...fold(w)].every(c => /[a-z' -]/.test(c)) && (fold(w).match(/[a-z]/g) || []).length >= 3;
  let pool = gamePool(gameSubj()).filter(e => okWord(dWord(e)) && dDef(e)); if (pool.length < 5) pool = dict().filter(e => okWord(dWord(e)) && dDef(e));
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
      if (!hit) W.lives--;
      paint(); if (solved()) end(true); else if (W.lives <= 0) end(false);
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
    case 5: { const a = r(1, 12); return { q: `${a}²`, a: a * a }; }
    case 6: { const p = [10, 20, 25, 50, 75][r(0, 4)], base = r(1, 20) * 20; return { q: `${p}% ${L === 'af' ? 'van' : 'of'} ${base}`, a: base * p / 100 }; }
    default: { const a = r(1, 10), b = r(2, 6), c = r(2, 6); return { q: `${a} + ${b} × ${c}`, a: a + b * c }; }
  }
}
function renderSprint(main) {
  const DUR = 60;
  main.innerHTML = gameHead(main, 'sprint') + `<div class="card pad-lg center"><div style="font-size:56px">⚡</div><h2 style="margin:6px 0">${DUR} s</h2><p class="muted small" style="margin-bottom:14px">${esc(t('sprintHow'))}</p><button class="btn subject" id="go">▶ ${esc(t('start'))}</button></div>`;
  wireBack(main);
  $('#go').onclick = () => {
    const G = { score: 0, n: 0, streak: 0, end: Date.now() + DUR * 1000, cur: null, inp: '', wrong: [], busy: false };
    main.innerHTML = gameHead(main, 'sprint', `<span class="row" style="gap:6px"><span class="chip num" id="sT">${DUR}</span><span class="chip hi num" id="sS">0 ✓</span></span>`) + `<div class="card pad-lg"><div class="center small" id="sStreak" style="min-height:20px"></div><div class="sq num" id="sQ"></div><div class="sinp num" id="sI"></div>
      <div class="keypad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', 'del'].map(k => `<button data-k="${k}">${k === 'del' ? '⌫' : k === '-' ? '−' : k}</button>`).join('')}</div><button class="btn subject block" id="sOk">OK ✓</button></div>`;
    wireBack(main);
    const paint = () => { $('#sQ').textContent = G.cur.q + ' = ?'; $('#sI').textContent = G.inp ? G.inp.replace('-', '−') : ' '; $('#sS').textContent = `${G.score} ✓`; $('#sStreak').textContent = G.streak >= 3 ? `🔥 ×${G.streak}` : ''; };
    const next = () => { G.cur = mathQ(); G.inp = ''; paint(); };
    const press = (k) => { if (G.busy) return; if (k === 'del') G.inp = G.inp.slice(0, -1); else if (k === '-') G.inp = G.inp.startsWith('-') ? G.inp.slice(1) : '-' + G.inp; else if (G.inp.replace('-', '').length < 5) G.inp += k; paint(); };
    const ok = () => {
      if (G.busy || !G.inp || G.inp === '-') return;
      const v = parseInt(G.inp, 10), box = $('#sI'); G.n++;
      if (v === G.cur.a) { G.score++; G.streak++; box.className = 'sinp num good'; G.busy = true; setTimeout(() => { box.className = 'sinp num'; G.busy = false; next(); }, 180); }
      else { G.streak = 0; G.wrong.push({ q: G.cur.q, a: G.cur.a, v }); box.className = 'sinp num bad'; box.textContent = `${G.cur.a}`; G.busy = true; setTimeout(() => { box.className = 'sinp num'; G.busy = false; next(); }, 700); }
    };
    main.querySelectorAll('.keypad [data-k]').forEach(b => b.onclick = () => press(b.dataset.k));
    $('#sOk').onclick = ok;
    setKeys((ev) => { if (/^[0-9]$/.test(ev.key)) press(ev.key); else if (ev.key === '-') press('-'); else if (ev.key === 'Backspace') { ev.preventDefault(); press('del'); } else if (ev.key === 'Enter') ok(); });
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
  const pool = []; subjectsOfGrade(7).filter(s => sid === 'all' || s.id === sid).forEach(s => allTopics(s).forEach(({ tp, term }) => tp.quiz.forEach(q => { if (q.type === 'tf') pool.push({ q, topic: tp, term, subj: s }); })));
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
      card.classList.remove('flashok', 'flashno'); void card.offsetWidth; card.classList.add(ok ? 'flashok' : 'flashno');
      G.i++; G.busy = true; setTimeout(() => { G.busy = false; if (G.i >= qs.length) finish(); else paint(); }, ok ? 150 : 450);
    };
    main.querySelectorAll('.blitzbtns [data-v]').forEach(b => b.onclick = () => answer(b.dataset.v === '1'));
    setKeys((ev) => { if (ev.key === 'ArrowLeft' || ev.key.toLowerCase() === 'w' || ev.key.toLowerCase() === 't') answer(true); else if (ev.key === 'ArrowRight' || ev.key.toLowerCase() === 'o' || ev.key.toLowerCase() === 'f') answer(false); });
    S._gameTimer = setInterval(() => { const left = Math.max(0, Math.ceil((G.end - Date.now()) / 1000)); const el = $('#bT'); if (el) { el.textContent = left; el.classList.toggle('bad', left <= 10); } if (left <= 0) finish(); }, 250);
    paint();
  };
}
function renderGame(main, slug) {
  if (slug === 'geheue') return renderMemory(main);
  if (slug === 'raai') return renderHangman(main);
  if (slug === 'sprint') return renderSprint(main);
  if (slug === 'blits') return renderBlitz(main);
  return go('speel');
}

/* ---------- parent: afbakening & exam timetable editor ---------- */
function scopeEditor(subjects) {
  return `<div class="card" style="margin-top:14px" id="scopeCard"><h3>🎯 ${esc(t('scopeT'))}</h3><p class="small muted" style="margin:6px 0 12px;max-width:75ch">${esc(t('scopeHelp'))}</p>
  <div class="form-row" style="max-width:280px;margin-bottom:12px"><label for="curT">${esc(t('curTermL'))}</label><select id="curT"><option value="">${esc(t('auto'))} (${esc(t('term'))} ${autoTerm()})</option>${[1, 2, 3, 4].map(n => `<option value="${n}" ${+S.settings.currentTerm === n ? 'selected' : ''}>${esc(t('term'))} ${n}</option>`).join('')}</select></div>
  <div class="stack" style="gap:10px">${subjects.map(s => { const sc = scopeOf(s), set = new Set(sc.topics); return `<div class="scoperow" data-sid="${s.id}"><div class="row" style="justify-content:space-between;gap:8px"><b>${s.icon} ${esc(tx(s.short))}</b><input type="date" data-date value="${esc(sc.date)}" aria-label="${esc(t('exam1'))} ${esc(tx(s.short))}"></div>
    <details><summary><span class="chip ${sc.provisional ? '' : 'good'}" data-cnt>${sc.topics.length} ${esc(t('topics'))}${sc.provisional ? ' · ' + esc(t('provisional')) : ''}</span> ${esc(t('pickTopics'))}</summary>
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
  });
  $('#saveScope', root).onclick = async () => {
    const ex = Object.assign({}, S.settings.exams || {});
    root.querySelectorAll('.scoperow').forEach(row => {
      const sid = row.dataset.sid, cur = Object.assign({}, ex[sid] || {});
      cur.date = row.querySelector('[data-date]').value || ''; cur.note = row.querySelector('[data-note]').value.trim();
      if (row.dataset.touched) cur.topics = [...row.querySelectorAll('[data-tid]:checked')].map(c => c.dataset.tid);
      ex[sid] = cur;
    });
    S.settings.exams = ex; const ct = $('#curT', root).value; S.settings.currentTerm = ct ? +ct : null;
    await S.store.saveSettings(S.settings); toast(t('saved')); render();
  };
}

/* ------------------------------------------------------------------ install as an app (own website only) */
const INST = { bip: null };
const SHARE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Share"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
function isStandalone() { try { return matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches || navigator.standalone === true; } catch (e) { return false; } }
function devKind() {
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return /CriOS|FxiOS|EdgiOS/.test(ua) ? 'ios-other' : 'ios-safari';
  return /Android/.test(ua) ? 'android' : 'desktop';
}
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
  return `<div class="card instcard" id="instCard"><div class="ic">📲</div><div class="tx"><b>${esc(t('instTitle'))}</b><div class="small muted">${esc(t('instSub'))}</div></div><div class="row"><button class="btn primary sm" id="instGo">${esc(INST.bip ? t('instBtn') : t('instHow'))}</button><button class="btn ghost sm" id="instLater">${esc(t('instLater'))}</button></div></div>`;
}
function wireInstall() {
  const b = $('#instGo'); if (b) b.onclick = doInstall;
  const l = $('#instLater'); if (l) l.onclick = () => { try { localStorage.setItem('lh.instSnooze', String(Date.now() + 3 * 86400000)); } catch (e) {} const s = $('#instSlot'); if (s) s.innerHTML = ''; };
}
function refreshInstall() { const s = $('#instSlot'); if (s) { s.innerHTML = installCard(); wireInstall(); } }
const instSlot = () => `<div id="instSlot">${installCard()}</div>`;
async function doInstall() {
  if (INST.bip) {
    const e = INST.bip; INST.bip = null;
    try { await e.prompt(); const r = await e.userChoice; if (r && r.outcome === 'accepted') toast(t('instDone')); } catch (er) { showInstallGuide(); }
    refreshInstall(); return;
  }
  showInstallGuide();
}
function showInstallGuide() {
  const k = devKind();
  const steps = k === 'ios-safari' ? t('instIosSafari') : k === 'ios-other' ? t('instIosChrome') : t('instAndroid');
  const ov = document.createElement('div'); ov.className = 'overlay'; ov.id = 'instGuide';
  ov.innerHTML = `<div class="card pad-lg instguide" role="dialog" aria-modal="true"><h2>📲 ${esc(t('instIosTitle'))}</h2><ol>${steps.map(s => `<li>${s.replace('{S}', SHARE_SVG)}</li>`).join('')}</ol><p class="small muted">${esc(t('instFoot'))}</p><button class="btn primary block" id="instOk">${esc(t('instGot'))}</button></div>`;
  document.body.appendChild(ov);
  ov.onclick = (e) => { if (e.target === ov) ov.remove(); };
  $('#instOk', ov).onclick = () => ov.remove();
}

/* ------------------------------------------------------------------ auto-update (own website only) */
function checkForUpdate() {
  const cur = window.LH_VERSION; if (!cur) return;
  fetch('version.json?t=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(j => {
    if (!j || !j.v || j.v === cur) return;
    let done = null; try { done = sessionStorage.getItem('lh.upd'); } catch (e) {}
    if (done === j.v) return; // already tried once for this version
    const reload = () => { try { sessionStorage.setItem('lh.upd', j.v); } catch (e) {} const p = new URLSearchParams(location.search); p.set('u', j.v); location.replace(location.pathname + '?' + p.toString() + location.hash); };
    if (['quiz', 'exam', 'paper', 'scope', 'redo', 'week', 'game'].includes(S.route.s)) {
      if (document.getElementById('updBar')) return;
      const bar = document.createElement('button'); bar.id = 'updBar'; bar.className = 'toast show'; bar.style.pointerEvents = 'auto'; bar.style.cursor = 'pointer';
      bar.textContent = L === 'af' ? '✨ Nuwe weergawe – tik om op te dateer' : '✨ New version – tap to update'; bar.onclick = reload; document.body.appendChild(bar);
    } else reload();
  }).catch(() => {});
}
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
  document.addEventListener('visibilitychange', () => { if (document.hidden) { flushTime(); if (S.kid) S.store.saveKid(S.kid).catch(() => {}); } else { S.tStart = Date.now(); if (S.store) S.store.loadSettings().then(st => { if (st) S.settings = st; }).catch(() => {}); } });
  render(); // splash
  const [content] = await Promise.all([loadContent(), initStore()]);
  S.content = content;
  try { S.settings = await S.store.loadSettings(); } catch (e) {}
  let remembered = null; try { remembered = localStorage.getItem('lh.kid'); } catch (e) {}
  const r = parseRoute();
  if (r.kid) await selectKid(r.kid); else if (remembered && KIDS.some(k => k.id === remembered)) await selectKid(remembered);
  render();
  if (window.LH_VERSION && 'serviceWorker' in navigator && window.isSecureContext) navigator.serviceWorker.register('sw.js').catch(() => {});
  if (window.LH_VERSION) { setTimeout(checkForUpdate, 4000); setInterval(checkForUpdate, 15 * 60000); document.addEventListener('visibilitychange', () => { if (!document.hidden) checkForUpdate(); }); }
}
boot();
})();
