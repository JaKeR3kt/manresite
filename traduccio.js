// ============================================
// TRADUCCIÓ GAME — Parlar de la Catalunya Central
// ============================================

const TRADUCCIO_WORDS = [
  // From the survey + documented sources
  { manresa: 'postada', barcelona: 'prestatge', castella: 'estantería', desc: 'Moble horitzontal per posar-hi objectes', img: null, comarca: 'Bages', font: "El parlar de Manresa, NacióDigital" },
  { manresa: 'pipiripip', barcelona: 'rosella', castella: 'amapola', desc: 'Flor vermella dels camps de cereals', img: null, comarca: 'Bages', font: "ALDC, El parlar de Manresa" },
  { manresa: 'torreta', barcelona: 'test', castella: 'maceta', desc: 'Recipient de terrissa per a plantes', img: null, comarca: 'Bages', font: "El parlar de Manresa, NacióDigital" },
  { manresa: 'cuc amagar', barcelona: 'fet i amagar', castella: 'escondite', desc: 'Joc infantil d\'amagar-se', img: null, comarca: 'Bages', font: "Estudi El Català Manresà" },
  { manresa: 'acota\'t', barcelona: 'ajup-te', castella: 'agáchate', desc: 'Dirigir el cos cap avall', img: null, comarca: 'Bages', font: "Estudi El Català Manresà" },
  { manresa: 'arna', barcelona: 'rusc', castella: 'colmena', desc: 'Habitacle d\'abelles', img: null, comarca: 'Bages/Berguedà', font: "ALDC" },
  { manresa: 'vambes', barcelona: 'esportives', castella: 'zapatillas deportivas', desc: 'Sabatilles per fer esport', img: null, comarca: 'General Cat. Central', font: "Estudi El Català Manresà" },
  { manresa: 'cireres de pastor', barcelona: 'cireres d\'arboç', castella: 'madroños', desc: 'Fruits petits i vermells de l\'arboç', img: null, comarca: 'Bages', font: "Estudi El Català Manresà" },
  { manresa: 'llagosta', barcelona: 'llagost', castella: 'saltamontes', desc: 'Insecte verd que salta pels camps', img: null, comarca: 'Bages', font: "Estudi El Català Manresà" },
  { manresa: 'mata', barcelona: 'llentiscle', castella: 'lentisco', desc: 'Arbust mediterrani resinós', img: null, comarca: 'Bages', font: "ALDC" },
  { manresa: 'ocellet', barcelona: 'moixó', castella: 'pajarito', desc: 'Ocell de mida petita', img: null, comarca: 'General Cat. Central', font: "Estudi El Català Manresà" },
  { manresa: 'picar', barcelona: 'pegar', castella: 'pegar', desc: 'Tocar amb violència, colpejar', img: null, comarca: 'Bages', font: "Estudi El Català Manresà" },
  { manresa: 'prouta', barcelona: 'prou', castella: 'bastante / suficiente', desc: 'Quantitat suficient', img: null, comarca: 'Bages', font: "El parlar de Manresa" },
  { manresa: 'punxir', barcelona: 'punxar', castella: 'pinchar', desc: 'Ferir amb una agulla o punxa', img: null, comarca: 'Bages', font: "El parlar de Manresa, NacióDigital" },
  { manresa: 'cabàs', barcelona: 'senalla', castella: 'espuerta / capazo', desc: 'Recipient d\'espart amb anses', img: null, comarca: 'Bages', font: "Estudi El Català Manresà" },
  { manresa: 'xarranca', barcelona: 'sambori', castella: 'rayuela', desc: 'Joc de saltar caselles a peu coix', img: null, comarca: 'General Cat. Central', font: "Estudi El Català Manresà" },
  { manresa: 'farigola', barcelona: 'timó', castella: 'tomillo', desc: 'Herba aromàtica mediterrània', img: null, comarca: 'Bages/Solsonès', font: "ALDC" },
  { manresa: 'patac', barcelona: 'xàfec', castella: 'chaparrón', desc: 'Pluja forta i curta', img: null, comarca: 'Bages', font: "Estudi El Català Manresà" },
  { manresa: 'nuc', barcelona: 'nus', castella: 'nudo', desc: 'Entrellaçament de fils o cordes', img: null, comarca: 'Bages/Berguedà', font: "ALDC, Estudi El Català Manresà" },
  { manresa: 'plegar', barcelona: 'recollir', castella: 'recoger (del suelo)', desc: 'Aixecar alguna cosa del terra', img: null, comarca: 'Bages', font: "Estudi El Català Manresà" },
  // Extra documented words from "El parlar de Manresa" book
  { manresa: 'passeres', barcelona: 'estovalles', castella: 'manteles', desc: 'Roba que es posa a la taula per menjar', img: null, comarca: 'Bages', font: "El parlar de Manresa" },
  { manresa: 'tenca (la porta)', barcelona: 'tanca (la porta)', castella: 'cierra (la puerta)', desc: 'Tancar la porta', img: null, comarca: 'Bages', font: "El parlar de Manresa, NacióDigital" },
  { manresa: 'aljub', barcelona: 'cisterna', castella: 'aljibe / cisterna', desc: 'Dipòsit subterrani d\'aigua', img: null, comarca: 'Bages', font: "El parlar de Manresa" },
  { manresa: 'golfa', barcelona: 'golfes', castella: 'desván / buhardilla', desc: 'Part superior de la casa, sota la teulada', img: null, comarca: 'Bages/Berguedà', font: "El parlar de Manresa" },
  { manresa: 'barquinera', barcelona: 'xemeneia', castella: 'chimenea', desc: 'Conducte per on surt el fum de la llar', img: null, comarca: 'Bages', font: "El parlar de Manresa" },
  { manresa: 'escurar', barcelona: 'rentar els plats', castella: 'fregar los platos', desc: 'Netejar els plats i estris de cuina', img: null, comarca: 'Bages/Osona', font: "El parlar de Manresa" },
  { manresa: 'xeringa', barcelona: 'broma', castella: 'broma', desc: 'Acció o dit per fer riure', img: null, comarca: 'Bages', font: "El parlar de Manresa" },
  { manresa: 'ésser fava', barcelona: 'ser ximple', castella: 'ser tonto', desc: 'Persona poc espavilada', img: null, comarca: 'Bages', font: "El parlar de Manresa" },
  { manresa: 'llenca', barcelona: 'llesca', castella: 'rebanada', desc: 'Tall prim de pa', img: null, comarca: 'Bages', font: "El parlar de Manresa" },
  { manresa: 'mec', barcelona: 'ximple / curt', castella: 'tonto / corto', desc: 'Persona que no és gaire espavilada', img: null, comarca: 'Bages', font: "El parlar de Manresa" },
];

// ---- GAME STATE ----
var tradMode = 'normal'; // 'normal' = barceloní→manresà, 'inversa' = manresà→barceloní
var tradQuestions = [];
var tradCurrentIdx = 0;
var tradCorrect = 0;
var tradErrors = 0;
var tradTotal = 0;

function initTraduccio() {
  var container = document.getElementById('traduccio-setup');
  if (!container) return;

  container.innerHTML = [
    '<div class="game-mode-selector">',
    '  <h4>Mode</h4>',
    '  <div class="game-mode-btns">',
    '    <button class="game-mode-btn active" data-tmode="normal" onclick="setTradMode(\'normal\')">',
    '      <span class="mode-emoji">🏔️</span>',
    '      <span class="mode-name">Traducció</span>',
    '      <span class="mode-desc">Del barceloní/castellà al manresà</span>',
    '    </button>',
    '    <button class="game-mode-btn" data-tmode="inversa" onclick="setTradMode(\'inversa\')">',
    '      <span class="mode-emoji">🔄</span>',
    '      <span class="mode-name">Traducció Inversa</span>',
    '      <span class="mode-desc">Del manresà al barceloní</span>',
    '    </button>',
    '  </div>',
    '</div>',
    '<button class="cta-btn" onclick="startTraduccio()">Començar!</button>'
  ].join('\n');
}

function setTradMode(mode) {
  tradMode = mode;
  document.querySelectorAll('[data-tmode]').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-tmode') === mode);
  });
}

function startTraduccio() {
  tradCurrentIdx = 0;
  tradCorrect = 0;
  tradErrors = 0;
  tradQuestions = TRADUCCIO_WORDS.slice().sort(function() { return Math.random() - 0.5; });
  tradTotal = tradQuestions.length;

  document.getElementById('traduccio-setup').classList.add('hidden');
  document.getElementById('traduccio-play').classList.remove('hidden');
  document.getElementById('traduccio-result').classList.add('hidden');
  showTradQuestion();
}

function showTradQuestion() {
  if (tradCurrentIdx >= tradQuestions.length) {
    showTradResult();
    return;
  }

  var w = tradQuestions[tradCurrentIdx];
  var play = document.getElementById('traduccio-play');

  var questionText, correctAnswer, options;

  if (tradMode === 'normal') {
    // Show barceloní/castellà → guess manresà
    questionText = '<div class="trad-clue-label">En barceloní:</div>' +
      '<div class="trad-clue-word">' + w.barcelona + '</div>' +
      '<div class="trad-clue-castella">En castellà: <strong>' + w.castella + '</strong></div>' +
      '<div class="trad-clue-desc">' + w.desc + '</div>';
    correctAnswer = w.manresa;
    // 1 correct + 3 wrong from other manresa terms
    options = buildTradOptions(correctAnswer, 'manresa');
  } else {
    // Show manresà → guess barceloní
    questionText = '<div class="trad-clue-label">En manresà / bagenc:</div>' +
      '<div class="trad-clue-word">' + w.manresa + '</div>' +
      '<div class="trad-clue-desc">' + w.desc + '</div>';
    correctAnswer = w.barcelona;
    options = buildTradOptions(correctAnswer, 'barcelona');
  }

  var pct = Math.round((tradCurrentIdx) / tradTotal * 100);

  play.innerHTML = [
    '<div class="game-hud">',
    '  <div class="hud-item"><span class="hud-label">Progrés</span><span class="hud-value">' + (tradCurrentIdx + 1) + ' / ' + tradTotal + '</span></div>',
    '  <div class="hud-item"><span class="hud-label">Encerts</span><span class="hud-value hud-correct">' + tradCorrect + '</span></div>',
    '  <div class="hud-item"><span class="hud-label">Errors</span><span class="hud-value hud-errors">' + tradErrors + '</span></div>',
    '  <div class="hud-item"><span class="hud-label">Comarca</span><span class="hud-value">' + w.comarca + '</span></div>',
    '</div>',
    '<div class="trad-progress-bar"><div class="trad-progress-fill" style="width:' + pct + '%"></div></div>',
    '<div class="trad-question-card">',
    '  <div class="trad-mode-badge">' + (tradMode === 'normal' ? '🏔️ Barceloní → Manresà' : '🔄 Manresà → Barceloní') + '</div>',
    '  ' + questionText,
    '  <div class="trad-options">',
    options.map(function(o) {
      var escaped = o.replace(/'/g, "\\'");
      var correctEscaped = correctAnswer.replace(/'/g, "\\'");
      return '    <button class="trad-option-btn" onclick="guessTrad(\'' + escaped + '\', \'' + correctEscaped + '\', this)">' + o + '</button>';
    }).join('\n'),
    '  </div>',
    '</div>'
  ].join('\n');
}

function buildTradOptions(correct, field) {
  var options = [correct];
  var pool = TRADUCCIO_WORDS.map(function(w) { return w[field]; }).filter(function(v) { return v !== correct; });
  pool.sort(function() { return Math.random() - 0.5; });
  for (var i = 0; i < pool.length && options.length < 4; i++) {
    if (options.indexOf(pool[i]) === -1) options.push(pool[i]);
  }
  options.sort(function() { return Math.random() - 0.5; });
  return options;
}

function guessTrad(guess, correct, btn) {
  var allBtns = document.querySelectorAll('.trad-option-btn');
  // Disable all buttons
  allBtns.forEach(function(b) { b.style.pointerEvents = 'none'; });

  if (guess === correct) {
    tradCorrect++;
    btn.classList.add('trad-correct');
  } else {
    tradErrors++;
    btn.classList.add('trad-wrong');
    // Highlight the correct one
    allBtns.forEach(function(b) {
      if (b.textContent === correct) b.classList.add('trad-correct');
    });
  }

  // Show source
  var w = tradQuestions[tradCurrentIdx];
  var sourceEl = document.createElement('div');
  sourceEl.className = 'trad-source';
  sourceEl.innerHTML = 'Font: ' + w.font;
  document.querySelector('.trad-question-card').appendChild(sourceEl);

  tradCurrentIdx++;
  setTimeout(showTradQuestion, 1200);
}

function showTradResult() {
  document.getElementById('traduccio-play').classList.add('hidden');
  var result = document.getElementById('traduccio-result');
  result.classList.remove('hidden');

  var pct = Math.round(tradCorrect / tradTotal * 100);
  var emoji, msg;
  if (pct >= 90) { emoji = '🏆'; msg = 'Ets un expert del parlar manresà!'; }
  else if (pct >= 70) { emoji = '🎉'; msg = 'Molt bé! Coneixes bé el vocabulari central.'; }
  else if (pct >= 50) { emoji = '📚'; msg = 'No està malament, però pots millorar!'; }
  else { emoji = '🤔'; msg = 'Necessites practicar més el vocabulari manresà!'; }

  result.innerHTML = [
    '<div class="game-result-card">',
    '  <div class="game-result-emoji">' + emoji + '</div>',
    '  <h3>Resultat</h3>',
    '  <p class="game-result-text">' + msg + '</p>',
    '  <div class="game-result-stats">',
    '    <div class="grs"><span class="grs-val">' + tradCorrect + '</span><span class="grs-label">Encerts</span></div>',
    '    <div class="grs"><span class="grs-val">' + tradErrors + '</span><span class="grs-label">Errors</span></div>',
    '    <div class="grs"><span class="grs-val">' + pct + '%</span><span class="grs-label">Precisió</span></div>',
    '  </div>',
    '  <div class="game-result-actions">',
    '    <button class="cta-btn" onclick="startTraduccio()">Torna a jugar</button>',
    '    <button class="cta-btn cta-secondary" onclick="backToTradSetup()">Canviar mode</button>',
    '  </div>',
    '</div>'
  ].join('\n');
}

function backToTradSetup() {
  document.getElementById('traduccio-play').classList.add('hidden');
  document.getElementById('traduccio-result').classList.add('hidden');
  document.getElementById('traduccio-setup').classList.remove('hidden');
}

// Global exports
window.initTraduccio = initTraduccio;
window.setTradMode = setTradMode;
window.startTraduccio = startTraduccio;
window.guessTrad = guessTrad;
window.backToTradSetup = backToTradSetup;
