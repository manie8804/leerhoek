/* Leerhoek — Grade 7 study platform (Afrikaans / English)
   Single-page app. Content is loaded from content/index.json → content/gr7/*.json (or window.CONTENT_BUNDLE for the offline copy).
   Progress is stored in the artifact's shared db when the viewer is signed in with write access, otherwise in localStorage. */
(() => {
'use strict';

/* ------------------------------------------------------------------ i18n */
const UI = {
  af: {
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
    ev: { quiz: 'Toets', read: 'Opsomming gelees', flash: 'Sleutelterme', examples: 'Voorbeelde', exam: 'Eksamen-oefening', paper: 'Oefenvraestel', login: 'Aangemeld' },
    resourcesIntro: 'Gratis handboeke, werkboeke en ou vraestelle. Unika se eie eksamenomvang en klasnotas kom in die “Gedeel – Unika dokumente” vouer op Pa se rekenaar.',
    allBadges: 'Kentekens', loading: 'Laai die vakke…', switchUser: 'Ruil gebruiker', continueAs: 'Gaan voort', of: 'van', min: 'min', mixed: 'Gemengde vrae', chooseGrade: 'Graad',
    hint: 'Wenk', showMemo: 'Wys memo & merk myself', memo: 'Memo', selfMark: 'Hoeveel punte verdien jou antwoord?', papers: 'Oefenvraestelle', paper: 'Oefenvraestel', examFormatT: 'Hoe lyk Unika se vraestel', startPaper: 'Begin vraestel', timeLeft: 'Tyd oor', marks: 'punte', section: 'Afdeling', paperDone: 'Vraestel voltooi!', perSection: 'Punte per afdeling', paperSub: 'Dieselfde formaat, tyd en punte as die skool se vraestel – nuwe vrae. Skryf lang antwoorde op papier of tik hulle, wys dan die memo en merk jouself eerlik.', bestMark: 'Beste', skipQ: 'Slaan oor', focus: 'Fokusvakke', focusSub: 'Volgens jou skoolrapport – hier tel elke punt die meeste.', target: 'teiken', school: 'Skool', schoolMarks: 'Skoolpunte vs platform', schoolSub: 'Rapportpunte per kwartaal, die slaagteiken en die platform se bemeestering.', termShort: 'Kw', passRules: 'Slaagvereistes: 50 % in Huistaal, 40 % in Engels EAT, 40 % in Wiskunde, 40 % in nog 3 vakke en 30 % in nog 2 vakke.', avgShort: 'Gemiddeld', platform: 'Platform', gap: 'tekort',
    badgeNames: { first: ['Eerste toets', 'Voltooi jou eerste toets'], perfect: ['Volpunte', 'Kry 100 % in ’n toets'], five: ['Vyf toetse', 'Voltooi 5 toetse'], streak3: ['3-dag reeks', 'Leer 3 dae agtereenvolgens'], streak7: ['Week-reeks', '7 dae agtereenvolgens'], reader: ['Leesrot', 'Lees 10 opsommings'], subject: ['Vakbaas', 'Alle onderwerpe van ’n vak bo 70 %'], xp1000: ['Kampioen', 'Verdien 1 000 XP'] },
  },
  en: {
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
    ev: { quiz: 'Test', read: 'Summary read', flash: 'Key terms', examples: 'Examples', exam: 'Exam practice', paper: 'Practice paper', login: 'Signed in' },
    resourcesIntro: "Free textbooks, workbooks and past papers. Unika's own exam scope and class notes go in the “Gedeel – Unika dokumente” folder on Dad's computer.",
    allBadges: 'Badges', loading: 'Loading subjects…', switchUser: 'Switch user', continueAs: 'Continue', of: 'of', min: 'min', mixed: 'Mixed questions', chooseGrade: 'Grade',
    hint: 'Hint', showMemo: 'Show memo & mark myself', memo: 'Memo', selfMark: 'How many marks does your answer earn?', papers: 'Practice papers', paper: 'Practice paper', examFormatT: "What Unika's paper looks like", startPaper: 'Start paper', timeLeft: 'Time left', marks: 'marks', section: 'Section', paperDone: 'Paper complete!', perSection: 'Marks per section', paperSub: 'Same format, time and marks as the school paper – new questions. Write long answers on paper or type them, then show the memo and mark yourself honestly.', bestMark: 'Best', skipQ: 'Skip', focus: 'Focus subjects', focusSub: 'Based on your school report – every mark counts most here.', target: 'target', school: 'School', schoolMarks: 'School marks vs platform', schoolSub: 'Report marks per term, the pass target and the platform mastery.', termShort: 'T', passRules: 'Pass requirements: 50 % in Home Language, 40 % in English FAL, 40 % in Mathematics, 40 % in 3 more subjects and 30 % in 2 more.', avgShort: 'Average', platform: 'Platform', gap: 'short',
    badgeNames: { first: ['First test', 'Complete your first test'], perfect: ['Full marks', 'Score 100 % in a test'], five: ['Five tests', 'Complete 5 tests'], streak3: ['3-day streak', 'Learn 3 days in a row'], streak7: ['Week streak', '7 days in a row'], reader: ['Bookworm', 'Read 10 summaries'], subject: ['Subject boss', 'Every topic of a subject above 70 %'], xp1000: ['Champion', 'Earn 1 000 XP'] },
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
const BADGES = ['first', 'perfect', 'five', 'streak3', 'streak7', 'reader', 'subject', 'xp1000'];
const BADGE_ICONS = { first: '🎯', perfect: '💯', five: '🖐️', streak3: '🔥', streak7: '🌋', reader: '📚', subject: '👑', xp1000: '🏆' };
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
  if (['quiz', 'exam', 'paper'].includes(ev.type)) {
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
  if (!has('subject') && ev && ev.subject) { const subj = S.content.subjects[ev.subject]; if (subj && allTopics(subj).every(x => (tprog(kid, x.tp.id).best || 0) >= 70)) kid.badges.push('subject'); }
  if (ev) {
    ev.t = Date.now(); ev.xp = xp;
    const s = ev.subject ? S.content.subjects[ev.subject] : null, f = ev.topic ? findTopic(ev.topic) : null;
    const pe = ev.paper ? findPaper(ev.paper) : null;
    ev.label = [s ? (s.short.af || s.short.en) : null, f ? (f.tp.title.af || f.tp.title.en) : null, pe ? (pe.ex.title.af || pe.ex.title.en) : null].filter(Boolean).join(' · ');
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
  let m;
  if ((m = h.match(/^vak-(.+)$/))) return { s: 'subject', id: m[1] };
  if ((m = h.match(/^onderwerp-(.+)$/))) return { s: 'topic', id: m[1] };
  if ((m = h.match(/^toets-(.+)$/))) return { s: 'quiz', id: m[1] };
  if ((m = h.match(/^eksamen-(.+)$/))) return { s: 'exam', id: m[1] };
  if ((m = h.match(/^vraestel-(.+)$/))) return { s: 'paper', id: m[1] };
  return { s: 'home' };
}
function nav() {
  const r = parseRoute();
  const items = [['home', '🏠', t('home')], ['subjects', '📚', t('subjects')], ['badges', '🏅', t('badges')], ['resources', '🔗', t('resources')], ['parent', '👪', t('parent')]];
  const hashes = { home: 'home', subjects: 'vakke', badges: 'kentekens', resources: 'hulpbronne', parent: 'ouer' };
  const on = (k) => (r.s === k || (k === 'subjects' && ['subject', 'topic', 'quiz', 'exam', 'paper'].includes(r.s))) ? 'on' : '';
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
    case 'quiz': return renderQuiz(main, r.id, false);
    case 'exam': return renderQuiz(main, r.id, true);
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
  ${blocked ? '' : '<div class="profiles" id="profiles"></div>'}${linkPanel()}</div>`;
  wireLinkPanel();
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
  // mission: 3 topics — weakest attempted first, then unread from terms 4,3
  const focus = focusSubjects(kid, subjects);
  const frank = (sid) => { const i = focus.findIndex(f => f.s.id === sid); return i < 0 ? 9 : i; };
  const scored = subjects.flatMap(s => allTopics(s).map(x => ({ s, ...x, pct: topicPct(kid, x.tp.id), st: topicStatus(kid, x.tp.id) })));
  const weak = scored.filter(x => x.st === 'practice').sort((a, b) => (frank(a.s.id) - frank(b.s.id)) || (a.pct - b.pct));
  const fresh = scored.filter(x => x.st === 'new' || x.st === 'read').sort((a, b) => (frank(a.s.id) - frank(b.s.id)) || (b.term - a.term) || (Math.random() - 0.5));
  // one from each of the top focus subjects, then weak topics, then fresh work
  const mission = []; const seen = new Set();
  const take = (x) => { if (x && !seen.has(x.tp.id) && mission.length < 3) { seen.add(x.tp.id); mission.push(x); } };
  focus.slice(0, 3).forEach(f => take(weak.find(x => x.s.id === f.s.id) || fresh.find(x => x.s.id === f.s.id)));
  weak.forEach(take); fresh.forEach(take);
  const exam = S.settings.examDate ? daysBetween(today(), S.settings.examDate) : null;
  main.innerHTML = `
  <div class="hero">
    <div class="greet"><h1>${esc(t('hello'))}, <span style="--subject:var(--brand)">${esc(kid.name)}</span>! 👋</h1>
      <p class="muted" style="margin-top:6px">${esc(t('tagline'))}</p>
      ${S.storeKind === 'local' ? `<div class="banner" style="margin-top:12px"><span>💾 ${esc(window.LH_CONFIG ? t('notLinked') : t('localOnly'))}</span>${window.LH_CONFIG ? '' : `<button class="btn sm" id="copyCode">${esc(t('copyCode'))}</button>`}</div>` : ''}
      ${exam !== null && exam >= 0 ? `<div class="card countdown" style="margin-top:14px"><div class="n num">${exam}</div><div><b>${esc(t('examIn'))} ${exam} ${esc(t('examDays'))}</b><div class="small muted">${esc(S.settings.examTitle || '')}</div></div></div>` : ''}
    </div>
    <div class="xpcard">
      <div class="label" style="color:rgba(255,255,255,.7)">${esc(t('level'))} ${lv}</div>
      <div class="lvl">${esc(levelName(lv))}</div>
      <div class="bar-h"><i style="width:${pct}%"></i></div>
      <div class="meta num"><span>${kid.xp} XP</span><span>${next} XP → ${esc(t('level'))} ${lv + 1}</span></div>
      <div class="stats"><div class="stat"><div class="v num"><span class="flame">🔥</span> ${kid.streak.count}</div><div class="k">${esc(t('streak'))}</div></div><div class="stat"><div class="v num">${kid.totals.quizzes}</div><div class="k">${esc(t('quizzes'))}</div></div><div class="stat"><div class="v num">${acc}%</div><div class="k">${esc(t('avg'))}</div></div></div>
    </div>
  </div>
  ${focus.length ? `<div class="card" style="margin-top:18px"><div class="row" style="justify-content:space-between"><h2>🎓 ${esc(t('focus'))}</h2><span class="small muted">${esc(t('focusSub'))}</span></div>
    <div class="row" style="margin-top:10px">${focus.map(f => `<button class="chip ${f.margin < 0 ? 'bad' : f.margin < 10 ? 'hi' : 'good'}" data-subj="${f.s.id}" style="font-size:0.85rem;padding:6px 12px">${f.s.icon} ${esc(tx(f.s.short))} <span class="num">${f.mark}%</span> → ${esc(t('target'))} <span class="num">${f.target}%</span></button>`).join('')}</div></div>` : ''}
  <div class="card mission" style="margin-top:18px"><h2>🎯 ${esc(t('mission'))}</h2><p class="small muted">${esc(t('missionSub'))}</p>
    <ul>${mission.map(m => `<li><button data-go="${m.st === 'practice' ? 'toets-' : 'onderwerp-'}${m.tp.id}" style="--subject:${m.s.color}"><span class="dot"></span><span><b>${esc(tx(m.tp.title))}</b><br><span class="small muted">${esc(tx(m.s.name))} · ${esc(t('term'))} ${m.term} · ${m.st === 'practice' ? esc(t('test')) : esc(t('learn'))}</span></span></button></li>`).join('')}</ul>
  </div>
  <div class="section-h"><h2>${esc(t('subjects'))}</h2><button class="btn sm ghost" id="share">${esc(t('shareProgress'))}</button></div>
  <div class="subjects">${subjects.map((s, i) => subjectCard(s, kid, i)).join('')}</div>`;
  wireSubjectCards(main);
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  const cc = $('#copyCode'); if (cc) cc.onclick = async () => { const code = S.store.exportCode(); if (code && await copyText(code)) toast(t('copied')); };
  $('#share').onclick = async () => { if (await copyText(reportText(kid, subjects))) toast(t('shareDone')); };
}
function subjectCard(s, kid, i) {
  const pct = subjectPct(kid, s), n = allTopics(s).length, done = allTopics(s).filter(x => topicStatus(kid, x.tp.id) !== 'new').length;
  return `<button class="subj" data-subj="${s.id}" style="--subject:${s.color};animation-delay:${i * 50}ms"><div class="row" style="justify-content:space-between"><span class="ic">${s.icon}</span>${ring(pct)}</div><div class="nm">${esc(tx(s.name))}</div><div class="foot"><span class="num">${done}/${n} ${esc(t('topics'))}</span></div></button>`;
}
function wireSubjectCards(root) { root.querySelectorAll('[data-subj]').forEach(b => b.onclick = () => go('vak-' + b.dataset.subj)); }
function renderSubjects(main) {
  const subjects = subjectsOfGrade(7);
  main.innerHTML = `<h1>${esc(t('subjects'))}</h1><p class="muted" style="margin:4px 0 16px">${esc(t('chooseGrade'))} 7 · CAPS</p><div class="subjects">${subjects.map((s, i) => subjectCard(s, S.kid, i)).join('')}</div>`;
  wireSubjectCards(main);
}
function renderSubject(main, id) {
  const s = S.content.subjects[id]; if (!s) return go('vakke');
  setSubjectColor(s.color);
  const kid = S.kid, pct = subjectPct(kid, s);
  let term = S._term && S._term[id] || (s.terms.find(tm => tm.topics.length) || s.terms[0]).term;
  const draw = () => {
    const tm = s.terms.find(x => x.term === term) || s.terms[0];
    main.innerHTML = `<button class="back" data-go="vakke">← ${esc(t('subjects'))}</button>
    <div class="subhead"><span class="ic">${s.icon}</span><div class="t"><h1>${esc(tx(s.name))}</h1><p class="small muted">${esc(tx(s.intro))}</p>${schoolMark(kid, s.id) !== null ? `<div class="row" style="margin-top:8px;gap:6px"><span class="chip ${schoolMark(kid, s.id) < passTarget(s.id) ? 'bad' : 'good'}">${esc(t('school'))} ${esc(t('termShort'))}${schoolTerms(kid).slice(-1)[0]}: <span class="num">${schoolMark(kid, s.id)}%</span></span><span class="chip">${esc(t('target'))} <span class="num">${passTarget(s.id)}%</span></span></div>` : ''}</div>${ring(pct)}</div>
    <div class="row" style="margin-top:12px;justify-content:space-between"><details class="tips" style="flex:1;min-width:240px"><summary>💡 ${esc(t('examTips'))}</summary><ul>${(s.examTips || []).map(x => `<li>${esc(tx(x))}</li>`).join('')}</ul></details>
    <button class="btn subject" data-go="eksamen-${s.id}">🎓 ${esc(t('examPractice'))}</button></div>
    ${s.examFormat ? `<details class="tips" style="margin-top:10px"><summary>📄 ${esc(t('examFormatT'))}</summary><div class="prose small" style="margin-top:6px">${md(tx(s.examFormat))}</div></details>` : ''}
    ${(s.practiceExams || []).length ? `<div class="card" style="margin-top:10px"><h3>📝 ${esc(t('papers'))}</h3><p class="small muted" style="margin:4px 0 10px">${esc(t('paperSub'))}</p><div class="stack" style="gap:8px">${s.practiceExams.map(ex => { const pp = (kid.papers || {})[ex.id]; return `<div class="row" style="justify-content:space-between"><div><b>${esc(tx(ex.title))}</b><div class="small muted num">${ex.total} ${esc(t('marks'))} · ${ex.minutes} ${esc(t('min'))}${pp ? ` · ${esc(t('bestMark'))} ${pp.best}% (${pp.attempts}×)` : ''}</div></div><button class="btn sm subject" data-go="vraestel-${ex.id}">${esc(t('startPaper'))} →</button></div>`; }).join('')}</div></div>` : ''}
    <div class="tabs">${s.terms.map(x => `<button class="${x.term === term ? 'on' : ''}" data-term="${x.term}">${esc(t('term'))} ${x.term} <span class="num">(${x.topics.length})</span></button>`).join('')}</div>
    <h3 style="margin:6px 0 10px">${esc(tx(tm.title))}</h3>
    <div class="topics">${tm.topics.length ? tm.topics.map((tp, i) => { const st = topicStatus(kid, tp.id), p = tprog(kid, tp.id); return `<div class="topic" style="animation-delay:${i * 40}ms"><div class="ix">${i + 1}</div><div><div class="tt">${esc(tx(tp.title))}</div><div class="bl">${esc(tx(tp.blurb))}</div><div class="row" style="gap:6px;margin-top:6px">${statusChip(st)}${p.attempts ? `<span class="chip num">${p.best}% · ${p.attempts}×</span>` : ''}</div></div><div class="acts"><button class="btn sm" data-go="onderwerp-${tp.id}">📖 ${esc(t('learn'))}</button><button class="btn sm subject" data-go="toets-${tp.id}">✏️ ${esc(t('test'))}</button></div></div>`; }).join('') : `<div class="card muted">…</div>`}</div>`;
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
      body.innerHTML = `<div class="card pad-lg"><div class="prose">${md(tx(tp.summary))}</div><div class="sep" style="margin:18px 0"></div><button class="btn ${p.read ? '' : 'hi'}" id="markRead" ${p.read ? 'disabled' : ''}>${esc(p.read ? t('readDone') : t('markRead'))}</button></div>`;
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
function buildQuestions(tid, isExam) {
  if (isExam) {
    const s = S.content.subjects[tid]; if (!s) return null;
    const pool = allTopics(s).flatMap(x => x.tp.quiz.map(q => ({ q, topic: x.tp, term: x.term })));
    return { subj: s, title: tx(s.name) + ' · ' + t('examPractice'), qs: shuffle(pool).slice(0, 20), topicId: null };
  }
  const f = findTopic(tid); if (!f) return null;
  return { subj: f.subj, tp: f.tp, title: tx(f.tp.title), qs: shuffle(f.tp.quiz.map(q => ({ q, topic: f.tp, term: f.term }))), topicId: tid };
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
function renderQuiz(main, id, isExam) {
  const built = buildQuestions(id, isExam); if (!built) return go('vakke');
  setSubjectColor(built.subj.color);
  const kid = S.kid, qs = built.qs, backHash = isExam ? 'vak-' + built.subj.id : 'onderwerp-' + id;
  const Q = { i: 0, answered: 0, correct: 0, results: [], start: Date.now() };
  S.quiz = Q;
  const drawQ = () => {
    if (Q.i >= qs.length) return drawResult();
    const { q } = qs[Q.i];
    const typeLabel = { mc: L === 'af' ? 'Meervoudige keuse' : 'Multiple choice', tf: L === 'af' ? 'Waar of onwaar' : 'True or false', fill: L === 'af' ? 'Vul in' : 'Fill in', match: L === 'af' ? 'Pas bymekaar' : 'Match' }[q.type];
    main.innerHTML = `<div class="quiz"><button class="back" data-go="${backHash}">← ${esc(built.title)}</button>
      <div class="qhead"><span class="chip subject num">${Q.i + 1} / ${qs.length}</span><div class="bar-h subject"><i style="width:${Math.round(100 * Q.i / qs.length)}%"></i></div><span class="chip num">${Q.correct} ✓</span></div>
      <div class="qcard"><div class="chip qtype">${esc(typeLabel)}${isExam ? ` · ${esc(tx(qs[Q.i].topic.title))}` : ''}</div><div class="q">${inline(tx(q.q))}</div><div id="qbody"></div><div id="fb"></div><div class="qfoot"><span></span><span id="qact"></span></div></div></div>`;
    $('[data-go]', main).onclick = () => go(backHash);
    const body = $('#qbody'), act = $('#qact');
    let done = false;
    const finish = (ok, detail) => {
      if (done) return; done = true; Q.answered++; if (ok) Q.correct++;
      Q.results.push({ q, ok, detail });
      $('#fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}"><div class="h">${ok ? '🎉 ' + esc(t('correct')) : '🤔 ' + esc(t('wrong'))}</div>${detail ? `<div class="small"><b>${esc(t('rightAnswer'))}:</b> ${detail}</div>` : ''}<div class="small" style="margin-top:4px">${inline(tx(q.explain))}</div></div>`;
      act.innerHTML = `<button class="btn subject" id="nextQ">${Q.i + 1 < qs.length ? esc(t('next')) + ' →' : esc(t('finish')) + ' 🏁'}</button>`;
      $('#nextQ').onclick = () => { Q.i++; drawQ(); }; $('#nextQ').focus();
    };
    mountQuestion(q, body, act, finish);
  };
  const drawResult = async () => {
    const score = Math.round(100 * Q.correct / qs.length), secs = Math.round((Date.now() - Q.start) / 1000);
    let xp = Q.correct * 2;
    const p = built.topicId ? (kid.topics[built.topicId] = kid.topics[built.topicId] || {}) : null;
    const firstBonus = p ? !(p.bonus80 && score >= 80) : true;
    if (score === 100) xp += (p && p.bonus100) ? 20 : 40; else if (score >= 80) xp += (p && p.bonus80) ? 10 : 20;
    if (p) { p.attempts = (p.attempts || 0) + 1; p.best = Math.max(p.best || 0, score); p.last = score; p.lastAt = Date.now(); if (score >= 80) p.bonus80 = true; if (score === 100) p.bonus100 = true; }
    kid.totals.quizzes++; kid.totals.correct += Q.correct; kid.totals.answered += qs.length; kid.totals.secs = (kid.totals.secs || 0) + secs;
    const msg = score === 100 ? t('msg100') : score >= 80 ? t('msg80') : score >= 60 ? t('msg60') : t('msg0');
    main.innerHTML = `<div class="quiz"><div class="card pad-lg result"><div class="label">${esc(built.title)}</div><div class="score num">${score}%</div><div class="msg">${esc(msg)}</div>
      <div class="row" style="justify-content:center"><span class="chip hi num">+${xp} XP ${esc(t('earned'))}</span><span class="chip num">${Q.correct}/${qs.length}</span><span class="chip num">${Math.max(1, Math.round(secs / 60))} ${esc(t('min'))}</span></div>
      <div class="row" style="justify-content:center;margin-top:18px"><button class="btn subject" id="again">🔁 ${esc(t('tryAgain'))}</button><button class="btn" data-go="${backHash}">${esc(t('backTo'))} ${esc(isExam ? tx(built.subj.name) : t('summary'))}</button></div>
      <h3 style="margin-top:22px;text-align:left">${esc(t('review'))}</h3><div class="review">${Q.results.map((r, i) => `<div class="r ${r.ok ? '' : 'bad'}"><div>${r.ok ? '✅' : '❌'}</div><div><div>${inline(tx(r.q.q))}</div>${r.ok ? '' : `<div class="ex"><b>${esc(t('rightAnswer'))}:</b> ${r.detail}</div>`}<div class="ex">${inline(tx(r.q.explain))}</div></div></div>`).join('')}</div></div></div>`;
    $('#again').onclick = () => renderQuiz(main, id, isExam);
    $('[data-go]', main).onclick = () => go(backHash);
    if (score >= 80) confetti(score === 100 ? 200 : 120);
    await award(kid, xp, { type: isExam ? 'exam' : 'quiz', subject: built.subj.id, topic: built.topicId, score, correct: Q.correct, total: qs.length, secs });
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
  const what = (t('ev')[ev.type] || ev.type) + (ev.type === 'paper' && ev.label ? ' · ' + esc(ev.label) : (s ? ' · ' + tx(s.short) : '') + (f ? ' · ' + tx(f.tp.title) : ''));
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
    main.innerHTML = `<div class="pinpad card pad-lg"><div style="font-size:44px">🔐</div><h2 style="margin:8px 0">${esc(t('parentPin'))}</h2><p class="muted small" style="margin-bottom:14px">${esc(first ? t('setPin') : t('enterPin'))}</p><form id="pinf"><input id="pin" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off"><div id="pinerr" class="small" style="color:var(--bad);min-height:20px;margin:6px 0"></div><button class="btn primary block" type="submit">${esc(first ? t('savePin') : t('unlock'))}</button></form><button class="back" style="margin-top:14px" data-go="profiel">← ${esc(t('switchUser'))}</button></div>`;
    $('[data-go]', main).onclick = () => go('profiel');
    const inp = $('#pin'); inp.focus();
    $('#pinf').onsubmit = async (e) => { e.preventDefault(); const v = inp.value.trim(); if (!/^\d{4,6}$/.test(v)) { $('#pinerr').textContent = t('setPin'); return; } const h = await sha(v); if (first) { S.settings.pinHash = h; await S.store.saveSettings(S.settings); S.parentUnlocked = true; render(); } else if (h === S.settings.pinHash) { S.parentUnlocked = true; render(); } else { $('#pinerr').textContent = t('pinWrong'); inp.value = ''; inp.classList.add('wrong'); setTimeout(() => inp.classList.remove('wrong'), 500); } };
    return;
  }
  const subjects = subjectsOfGrade(7);
  const kids = await Promise.all(KIDS.map(k => S.store.loadKid(k.id)));
  const logs = await Promise.all(KIDS.map(k => S.store.loadLogs(k.id, 14).catch(() => [])));
  const weekAgo = Date.now() - 7 * 86400000;
  main.innerHTML = `<div class="row" style="justify-content:space-between"><h1>👪 ${esc(t('dashboard'))}</h1><span class="chip ${S.storeKind !== 'local' ? 'good' : ''}">${S.storeKind !== 'local' ? '☁️ ' + esc(t('storageDb')) : '💾 ' + esc(t('storageLocal'))}</span></div>
  <div class="grid two" style="margin-top:14px" id="kidcards"></div>
  <div class="grid two" style="margin-top:14px">
    <div class="card"><h3>⚙️ ${esc(t('settings'))}</h3><form id="setf" class="stack" style="margin-top:10px"><div class="form-row"><label for="exd">${esc(t('examDate'))}</label><input type="date" id="exd" value="${esc(S.settings.examDate || '')}"></div><div class="form-row"><label for="ext">${esc(t('examTitle'))}</label><input id="ext" value="${esc(S.settings.examTitle || '')}" placeholder="Graad 7 Novembereksamen"></div><div class="form-row"><label for="npin">${esc(t('changePin'))}</label><input id="npin" inputmode="numeric" maxlength="6" placeholder="••••"></div><button class="btn primary" type="submit">${esc(t('save'))}</button></form></div>
    <div class="card"><h3>📥 ${esc(t('importCode'))}</h3><p class="small muted" style="margin:6px 0 10px">${esc(t('importHint'))}</p><textarea id="impcode"></textarea><button class="btn" id="impbtn" style="margin-top:8px">${esc(t('importBtn'))}</button></div>
  </div>`;
  const cards = $('#kidcards');
  const drawKid = (kid, log) => {
    const events = log.flatMap(d => (d.events || []).map(e => ({ ...e, date: d.date }))).sort((a, b) => b.t - a.t);
    const week = events.filter(e => e.t >= weekAgo), quizzesWeek = week.filter(e => e.type === 'quiz' || e.type === 'exam');
    const avgWeek = quizzesWeek.length ? Math.round(quizzesWeek.reduce((a, e) => a + e.score, 0) / quizzesWeek.length) : 0;
    const weak = subjects.flatMap(s => allTopics(s).filter(x => topicStatus(kid, x.tp.id) === 'practice').map(x => ({ s, ...x })));
    const last = events[0] ? `${fmtDay(events[0].date)} ${fmtTime(events[0].t)}` : t('never');
    return `<div class="card kidcard" id="kc-${kid.id}"><div class="kh"><span class="av">${kid.avatar}</span><div><h2>${esc(kid.name)}</h2><div class="small muted">${esc(t('level'))} ${levelOf(kid.xp)} · ${esc(levelName(levelOf(kid.xp)))} · ${esc(t('lastActive'))}: ${esc(last)}</div></div></div>
      <div class="kv"><div><div class="v num">${kid.xp}</div><div class="k">XP</div></div><div><div class="v num">🔥 ${kid.streak.count}</div><div class="k">${esc(t('streak'))}</div></div><div><div class="v num">${quizzesWeek.length}</div><div class="k">${esc(t('quizzes'))} ${esc(t('thisWeek'))}</div></div><div><div class="v num">${avgWeek}%</div><div class="k">${esc(t('avg'))} ${esc(t('thisWeek'))}</div></div><div><div class="v num">${Math.round((kid.totals.secs || 0) / 60)} ${esc(t('min'))}</div><div class="k">${esc(t('timeOn'))}</div></div></div>
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

/* ------------------------------------------------------------------ auto-update (own website only) */
function checkForUpdate() {
  const cur = window.LH_VERSION; if (!cur) return;
  fetch('version.json?t=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(j => {
    if (!j || !j.v || j.v === cur) return;
    let done = null; try { done = sessionStorage.getItem('lh.upd'); } catch (e) {}
    if (done === j.v) return; // already tried once for this version
    const reload = () => { try { sessionStorage.setItem('lh.upd', j.v); } catch (e) {} const p = new URLSearchParams(location.search); p.set('u', j.v); location.replace(location.pathname + '?' + p.toString() + location.hash); };
    if (['quiz', 'exam', 'paper'].includes(S.route.s)) {
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
  document.addEventListener('visibilitychange', () => { if (document.hidden) { flushTime(); if (S.kid) S.store.saveKid(S.kid).catch(() => {}); } else S.tStart = Date.now(); });
  render(); // splash
  const [content] = await Promise.all([loadContent(), initStore()]);
  S.content = content;
  try { S.settings = await S.store.loadSettings(); } catch (e) {}
  let remembered = null; try { remembered = localStorage.getItem('lh.kid'); } catch (e) {}
  const r = parseRoute();
  if (r.kid) await selectKid(r.kid); else if (remembered && KIDS.some(k => k.id === remembered)) await selectKid(remembered);
  render();
  if (window.LH_VERSION) { setTimeout(checkForUpdate, 4000); setInterval(checkForUpdate, 15 * 60000); document.addEventListener('visibilitychange', () => { if (!document.hidden) checkForUpdate(); }); }
}
boot();
})();
