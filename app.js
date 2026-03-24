// ============================================
// EL CATALÀ MANRESÀ — Interactive Application
// ============================================

let map, markersLayer;
let currentQuestion = 'all';
let currentGeoFilter = 'all';
let currentMinResponses = 5;

// ---- THEME ----
const themeToggle = document.querySelector('.theme-toggle');
let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
});

// ---- NAV ----
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ---- COLOR HELPER ----
function getColorForPct(pct) {
  // Blue (low) → Yellow (mid) → Orange/Red (high)
  if (pct <= 50) {
    const t = pct / 50;
    const r = Math.round(123 + t * (232 - 123));
    const g = Math.round(163 + t * (197 - 163));
    const b = Math.round(190 + t * (71 - 190));
    return `rgb(${r},${g},${b})`;
  } else {
    const t = (pct - 50) / 50;
    const r = Math.round(232 + t * (196 - 232));
    const g = Math.round(197 + t * (93 - 197));
    const b = Math.round(71 + t * (53 - 71));
    return `rgb(${r},${g},${b})`;
  }
}

function getRadius(count) {
  if (count >= 100) return 22;
  if (count >= 50) return 18;
  if (count >= 20) return 14;
  if (count >= 10) return 11;
  if (count >= 5) return 9;
  return 7;
}

// ---- INIT MAP ----
function initMap() {
  map = L.map('map', {
    center: [41.78, 1.85],
    zoom: 10,
    scrollWheelZoom: true,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/" target="_blank">CARTO</a>',
    maxZoom: 18,
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);
  updateMap();
}

function getCityPct(city, questionId) {
  if (questionId === 'all') {
    return city.avg_manresa_pct;
  }
  const q = city.questions[questionId];
  if (!q || q.total === 0) return null;
  return q.pct_manresa;
}

function updateMap() {
  markersLayer.clearLayers();

  const filteredData = DATA.mapData.filter(city => {
    if (currentGeoFilter === 'catcentral' && !city.cat_central) return false;
    if (currentGeoFilter === 'outside' && city.cat_central) return false;
    if (city.count < currentMinResponses) return false;
    if (!city.lat || !city.lng) return false;
    // Filter out international locations for map clarity
    if (city.lat < 39 || city.lat > 43 || city.lng < -1 || city.lng > 4) return false;
    return true;
  });

  filteredData.forEach(city => {
    const pct = getCityPct(city, currentQuestion);
    if (pct === null) return;

    const radius = getRadius(city.count);
    const color = getColorForPct(pct);

    const marker = L.circleMarker([city.lat, city.lng], {
      radius: radius,
      fillColor: color,
      fillOpacity: 0.8,
      color: '#fff',
      weight: 2,
      opacity: 0.9,
    });

    // Popup content
    const popupHtml = buildPopupHtml(city, currentQuestion);
    marker.bindPopup(popupHtml, { maxWidth: 320, className: 'custom-popup' });

    marker.on('click', () => {
      showCityPanel(city);
    });

    marker.addTo(markersLayer);
  });
}

function buildPopupHtml(city, questionId) {
  let statsHtml = '';
  
  if (questionId === 'all') {
    // Show top 5 questions
    const sortedQs = Object.entries(city.questions)
      .filter(([_, q]) => q.total > 0)
      .sort((a, b) => b[1].pct_manresa - a[1].pct_manresa)
      .slice(0, 6);
    
    sortedQs.forEach(([qid, q]) => {
      const qMeta = DATA.questions[qid];
      if (!qMeta) return;
      const pct = q.pct_manresa;
      const color = getColorForPct(pct);
      statsHtml += `
        <div class="popup-stat-row">
          <span class="popup-stat-label">${qMeta.manresa}</span>
          <div class="popup-stat-bar">
            <div class="popup-stat-fill" style="width:${pct}%;background:${color}"></div>
          </div>
          <span class="popup-stat-value">${pct}%</span>
        </div>`;
    });
  } else {
    const q = city.questions[questionId];
    const qMeta = DATA.questions[questionId];
    if (q && qMeta) {
      const pct = q.pct_manresa;
      const pctStd = 100 - pct;
      statsHtml = `
        <div class="popup-stat-row">
          <span class="popup-stat-label">${qMeta.manresa}</span>
          <div class="popup-stat-bar">
            <div class="popup-stat-fill" style="width:${pct}%;background:var(--c-manresa)"></div>
          </div>
          <span class="popup-stat-value">${pct}%</span>
        </div>
        <div class="popup-stat-row">
          <span class="popup-stat-label">${qMeta.standard}</span>
          <div class="popup-stat-bar">
            <div class="popup-stat-fill" style="width:${pctStd}%;background:var(--c-standard)"></div>
          </div>
          <span class="popup-stat-value">${pctStd.toFixed(1)}%</span>
        </div>`;
    }
  }

  const avgPct = city.avg_manresa_pct;
  const catCentralLabel = city.cat_central ? 'Catalunya Central' : 'Fora Cat. Central';

  return `
    <div class="popup-header">
      <h4>${city.city}</h4>
      <div class="popup-meta">${city.count} respostes · ${catCentralLabel} · Índex: ${avgPct}%</div>
    </div>
    <div class="popup-body">${statsHtml}</div>
    <div class="popup-footer" onclick="showCityPanel(DATA.mapData.find(c=>c.city==='${city.city.replace(/'/g, "\\'")}'))">
      Veure desglossament complet →
    </div>`;
}

// ---- CITY PANEL ----
function showCityPanel(city) {
  const panel = document.getElementById('city-panel');
  const content = document.getElementById('city-panel-content');
  panel.classList.remove('hidden');
  
  let questionsHtml = '';
  Object.entries(DATA.questions).forEach(([qid, qMeta]) => {
    const q = city.questions[qid];
    if (!q || q.total === 0) return;
    
    const pctM = q.pct_manresa;
    const pctS = (100 - pctM).toFixed(1);
    
    questionsHtml += `
      <div class="panel-question">
        <div class="panel-q-label">${qMeta.desc}</div>
        <div class="panel-q-bar-container">
          <div class="panel-q-bar">
            <div class="bar-manresa" style="width:${pctM}%">${pctM >= 15 ? pctM + '%' : ''}</div>
            <div class="bar-standard" style="width:${pctS}%">${parseFloat(pctS) >= 15 ? pctS + '%' : ''}</div>
          </div>
        </div>
        <div class="panel-q-labels">
          <span>${qMeta.manresa} (${q.manresa})</span>
          <span>${qMeta.standard} (${q.standard})</span>
        </div>
      </div>`;
  });

  const catLabel = city.cat_central ? 'Catalunya Central' : 'Fora de Catalunya Central';
  
  content.innerHTML = `
    <div class="panel-header">
      <h3>${city.city}</h3>
      <div class="panel-meta">${city.count} respostes · ${catLabel} · Índex manresà: ${city.avg_manresa_pct}%</div>
    </div>
    <div class="panel-grid">${questionsHtml}</div>`;
  
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeCityPanel() {
  document.getElementById('city-panel').classList.add('hidden');
}

// ---- POPULATE QUESTION SELECT ----
function populateQuestionSelect() {
  const select = document.getElementById('question-select');
  Object.entries(DATA.questions).forEach(([qid, qMeta]) => {
    const opt = document.createElement('option');
    opt.value = qid;
    opt.textContent = qMeta.label;
    select.appendChild(opt);
  });
}

// ---- STATISTICS ----
function renderStatistics() {
  const grid = document.getElementById('stats-grid');
  grid.innerHTML = '';

  Object.entries(DATA.questions).forEach(([qid, qMeta]) => {
    // Calculate stats for Manresa vs rest vs cat central
    const allCities = DATA.mapData;
    let manresaData = allCities.find(c => c.city === 'Manresa');
    
    const mQ = manresaData ? manresaData.questions[qid] : null;
    const mPct = mQ && mQ.total > 0 ? mQ.pct_manresa : 0;
    
    // Cat central aggregate
    let ccManresa = 0, ccTotal = 0;
    let outManresa = 0, outTotal = 0;
    allCities.forEach(c => {
      const q = c.questions[qid];
      if (!q) return;
      if (c.cat_central) {
        ccManresa += q.manresa;
        ccTotal += q.total;
      } else {
        outManresa += q.manresa;
        outTotal += q.total;
      }
    });
    
    const ccPct = ccTotal > 0 ? (ccManresa / ccTotal * 100).toFixed(1) : 0;
    const outPct = outTotal > 0 ? (outManresa / outTotal * 100).toFixed(1) : 0;
    
    const diff = (mPct - parseFloat(ccPct)).toFixed(1);
    const diffSign = diff > 0 ? '+' : '';
    const diffClass = diff >= 0 ? 'positive' : 'negative';

    grid.innerHTML += `
      <div class="stat-item">
        <div class="stat-item-header">
          <div class="stat-item-title">${qMeta.label}</div>
          <div class="stat-item-badge ${diffClass}">${diffSign}${diff}pp</div>
        </div>
        <div class="stat-bars">
          <div class="stat-bar-row">
            <span class="stat-bar-label">Manresa</span>
            <div class="stat-bar-track">
              <div class="stat-bar-fill manresa-fill" style="width:${mPct}%"></div>
            </div>
            <span class="stat-bar-pct">${mPct}%</span>
          </div>
          <div class="stat-bar-row">
            <span class="stat-bar-label">Cat. Central</span>
            <div class="stat-bar-track">
              <div class="stat-bar-fill manresa-fill" style="width:${ccPct}%;opacity:0.7"></div>
            </div>
            <span class="stat-bar-pct">${ccPct}%</span>
          </div>
          <div class="stat-bar-row">
            <span class="stat-bar-label">Fora Cat. C.</span>
            <div class="stat-bar-track">
              <div class="stat-bar-fill standard-fill" style="width:${outPct}%"></div>
            </div>
            <span class="stat-bar-pct">${outPct}%</span>
          </div>
        </div>
      </div>`;
  });
}

// ---- EXCLUSIVITY CHART ----
function renderExclusivityChart() {
  const container = document.getElementById('exclusivity-chart');
  
  const sorted = [...DATA.exclusivity].sort((a, b) => b.diff - a.diff);
  
  const canvas = document.createElement('canvas');
  canvas.id = 'excl-canvas';
  canvas.style.height = '600px';
  container.appendChild(canvas);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#a89e92' : '#6b6056';
  const gridColor = isDark ? '#2e2a26' : '#e2dcd3';
  
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: sorted.map(e => e.word),
      datasets: [
        {
          label: '% Manresa',
          data: sorted.map(e => e.manresa_pct),
          backgroundColor: '#c45d35',
          borderRadius: 4,
          barPercentage: 0.7,
        },
        {
          label: '% Resta',
          data: sorted.map(e => e.outside_pct),
          backgroundColor: '#7ba3be',
          borderRadius: 4,
          barPercentage: 0.7,
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: textColor, font: { family: 'Inter', size: 12 } }
        },
        tooltip: {
          callbacks: {
            afterBody: function(tooltipItems) {
              const idx = tooltipItems[0].dataIndex;
              const item = sorted[idx];
              return `Diferència: ${item.diff > 0 ? '+' : ''}${item.diff}pp`;
            }
          }
        }
      },
      scales: {
        x: {
          max: 100,
          ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
          grid: { color: gridColor },
          title: { display: true, text: '% ús', color: textColor }
        },
        y: {
          ticks: { color: textColor, font: { family: 'Space Grotesk', size: 12, weight: 500 } },
          grid: { display: false }
        }
      }
    }
  });
}

// ---- CITY RANKING ----
function renderCityRanking() {
  const container = document.getElementById('city-ranking');
  container.innerHTML = '';
  
  const cities = DATA.mapData
    .filter(c => c.count >= 5)
    .sort((a, b) => b.avg_manresa_pct - a.avg_manresa_pct);
  
  cities.forEach((city, idx) => {
    const pct = city.avg_manresa_pct;
    container.innerHTML += `
      <div class="ranking-item" onclick="showCityPanel(DATA.mapData.find(c=>c.city==='${city.city.replace(/'/g, "\\'")}'))">
        <span class="ranking-pos">${idx + 1}.</span>
        <span class="ranking-city">${city.city}</span>
        <span class="ranking-n">n=${city.count}</span>
        <div class="ranking-bar">
          <div class="ranking-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="ranking-pct">${pct}%</span>
      </div>`;
  });
}

// ---- EVENT LISTENERS ----
document.getElementById('question-select').addEventListener('change', (e) => {
  currentQuestion = e.target.value;
  updateMap();
});

document.getElementById('geo-filter').addEventListener('change', (e) => {
  currentGeoFilter = e.target.value;
  updateMap();
});

document.getElementById('min-responses').addEventListener('change', (e) => {
  currentMinResponses = parseInt(e.target.value);
  updateMap();
});

// ============================================
// QUIZ SYSTEM
// ============================================

const quizQuestions = [
  { qid: 'q1', desc: 'Un post horitzontal col·locat entre dos suports, per posar-hi objectes (com una estanteria)', optA: 'postada', optB: 'prestatge' },
  { qid: 'q2', desc: 'Herba de flors vermelles que creix als camps (amapola)', optA: 'Pipiripip', optB: 'Rosella' },
  { qid: 'q3', desc: 'Vas de terrissa per criar-hi una planta (maceta)', optA: 'torreta', optB: 'test' },
  { qid: 'q4', desc: 'Joc on un jugador compta i els altres s\'amaguen (escondite)', optA: 'cuc amagar', optB: 'fet i amagar' },
  { qid: 'q5', desc: 'Dirigir el cos cap avall (agacharse)', optA: 'acota', optB: 'ajup' },
  { qid: 'q6', desc: 'Habitacle d\'una comunitat d\'abelles (colmena)', optA: 'rusc', optB: 'arna' },
  { qid: 'q7', desc: 'Sabatilla de sola de goma per fer esport (zapatillas)', optA: 'vambes', optB: 'bàsquets' },
  { qid: 'q8', desc: 'Fruites petites i vermelles de l\'arboç (madroño)', optA: 'cireres de pastor', optB: "cireres d'arboç" },
  { qid: 'q9', desc: 'Insecte saltador verd/marró dels camps (saltamontes)', optA: 'llagosta', optB: 'llangost' },
  { qid: 'q10', desc: 'Arbust resinós mediterrani (lentisco)', optA: 'mata', optB: 'llentiscle' },
  { qid: 'q11', desc: 'Ocell petit (pajarito)', optA: 'ocellet', optB: 'moixó' },
  { qid: 'q12', desc: 'Arribar a tocar amb violència — "La guàrdia civil m\'ha ___"', optA: 'picat', optB: 'pegat' },
  { qid: 'q13', desc: 'En quantitat suficient — "Ell té ___ gana"', optA: 'prouta', optB: 'prou' },
  { qid: 'q14', desc: 'Ferir amb una punxa — "M\'he ___ amb una agulla"', optA: 'punxat', optB: 'punxit' },
  { qid: 'q15', desc: 'Receptacle d\'espart amb anses per transportar coses (espuerta)', optA: 'cabàs', optB: 'senalla' },
  { qid: 'q16', desc: 'Joc de saltar a peu coix per caselles numerades (rayuela)', optA: 'xarranca', optB: 'setmana' },
  { qid: 'q17', desc: 'Mata molt aromàtica de les labiades (tomillo)', optA: 'farigola', optB: 'timó' },
  { qid: 'q18', desc: 'Pluja intensa de curta durada (chaparrón)', optA: 'patac', optB: 'pluja forta' },
  { qid: 'q19', desc: 'Entrellaçament de fils — "No sé fer-me el ___ de la corbata"', optA: 'nus', optB: 'nuc' },
  { qid: 'q20', desc: 'Aixecar alguna cosa del terra — "___ el diari, si us plau!"', optA: 'plega', optB: 'recull' },
];

let quizCurrentIdx = 0;
let quizAnswers = [];

// City profiles: for each city with enough data, compute the "expected" answers
// We use the actual survey data to build profiles
function computeCityProfiles() {
  const profiles = {};
  DATA.mapData.forEach(city => {
    if (city.count < 5) return;
    const profile = {};
    let hasData = true;
    quizQuestions.forEach(qq => {
      const q = city.questions[qq.qid];
      if (!q || q.total === 0) { hasData = false; return; }
      profile[qq.qid] = q.pct_manresa / 100; // probability of manresa answer
    });
    if (hasData) {
      profiles[city.city] = { profile, count: city.count, catCentral: city.cat_central };
    }
  });
  return profiles;
}

function predictOrigin(answers) {
  const profiles = computeCityProfiles();
  const scores = {};
  
  Object.entries(profiles).forEach(([city, data]) => {
    let logScore = 0;
    answers.forEach((ans, idx) => {
      const qid = quizQuestions[idx].qid;
      const pManresa = Math.max(0.01, Math.min(0.99, data.profile[qid] || 0.5));
      if (ans === 'manresa') {
        logScore += Math.log(pManresa);
      } else {
        logScore += Math.log(1 - pManresa);
      }
    });
    // Weight by sample size (log)
    scores[city] = logScore + Math.log(data.count) * 0.3;
  });
  
  // Sort by score descending
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 5); // top 5 matches
}

function initQuiz() {
  quizCurrentIdx = 0;
  quizAnswers = [];
  document.getElementById('quiz-question-area').classList.remove('hidden');
  document.getElementById('quiz-progress').classList.remove('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  showQuizQuestion(0);
}

function showQuizQuestion(idx) {
  if (idx >= quizQuestions.length) {
    showQuizResult();
    return;
  }
  
  const qq = quizQuestions[idx];
  document.getElementById('quiz-q-num').textContent = idx + 1;
  document.getElementById('quiz-q-desc').textContent = qq.desc;
  document.getElementById('quiz-progress-fill').style.width = ((idx + 1) / quizQuestions.length * 100) + '%';
  document.getElementById('quiz-progress-text').textContent = `Pregunta ${idx + 1} de ${quizQuestions.length}`;
  
  const optionsEl = document.getElementById('quiz-options');
  // Randomize option order
  const opts = Math.random() > 0.5 
    ? [{ text: qq.optA, val: 'manresa' }, { text: qq.optB, val: 'standard' }]
    : [{ text: qq.optB, val: 'standard' }, { text: qq.optA, val: 'manresa' }];
  
  optionsEl.innerHTML = opts.map(o => 
    `<button class="quiz-option-btn" onclick="selectQuizAnswer('${o.val}')">${o.text}</button>`
  ).join('');
  
  // Animate card
  const card = document.getElementById('quiz-card');
  card.style.animation = 'none';
  card.offsetHeight; // trigger reflow
  card.style.animation = 'fadeIn 0.3s ease';
}

function selectQuizAnswer(val) {
  quizAnswers.push(val);
  quizCurrentIdx++;
  showQuizQuestion(quizCurrentIdx);
}

function showQuizResult() {
  document.getElementById('quiz-question-area').classList.add('hidden');
  document.getElementById('quiz-progress').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');
  
  const manresaCount = quizAnswers.filter(a => a === 'manresa').length;
  const pct = Math.round(manresaCount / quizAnswers.length * 100);
  
  const topMatches = predictOrigin(quizAnswers);
  const bestMatch = topMatches[0] ? topMatches[0][0] : 'Catalunya Central';
  
  let verdict = '';
  let explanation = '';
  
  if (pct >= 80) {
    verdict = `Molt probablement ets de ${bestMatch} o rodalies!`;
    explanation = `Has triat la variant manresana en ${manresaCount} de 20 preguntes (${pct}%). El teu perfil lingüístic s'assembla molt al d'un parlant de la comarca del Bages. El teu parlar és genuïnament bagenc-central.`;
  } else if (pct >= 60) {
    verdict = `Podries ser de ${bestMatch} o d'alguna localitat de la Catalunya Central.`;
    explanation = `Has triat la variant manresana en ${manresaCount} de 20 preguntes (${pct}%). Tens molts trets del parlar central, però amb algunes variants que s'allunyen del patró més típic de Manresa.`;
  } else if (pct >= 40) {
    verdict = `Probablement ets d'una zona de transició o de fora del Bages.`;
    explanation = `Has triat la variant manresana en ${manresaCount} de 20 preguntes (${pct}%). El teu perfil mostra una barreja de variants centrals i no-centrals, típic de zones de transició com el Vallès, Osona, o el Berguedà.`;
  } else {
    verdict = `No sembla que siguis de la Catalunya Central.`;
    explanation = `Has triat la variant manresana en només ${manresaCount} de 20 preguntes (${pct}%). El teu perfil lingüístic suggereix que ets de fora de la Catalunya central, potser de Barcelona, Girona, o altres comarques.`;
  }
  
  document.getElementById('quiz-result-text').textContent = verdict;
  
  let detailsHtml = `<p>${explanation}</p>`;
  detailsHtml += `<p style="margin-top:8px"><strong>Top 5 localitats que més s'assemblen al teu perfil:</strong></p><ol style="padding-left:20px;margin-top:4px">`;
  topMatches.forEach(([city], i) => {
    detailsHtml += `<li>${city}</li>`;
  });
  detailsHtml += '</ol>';
  
  document.getElementById('quiz-result-details').innerHTML = detailsHtml;
  
  // Show origin ask
  document.getElementById('quiz-origin-ask').classList.remove('hidden');
  document.getElementById('quiz-thanks').classList.add('hidden');
}

function submitQuizOrigin() {
  const origin = document.getElementById('quiz-origin-input').value.trim();
  if (!origin) return;
  
  // Save to in-memory store (and log to console for data collection)
  const quizData = {
    timestamp: new Date().toISOString(),
    answers: quizAnswers.map((ans, i) => ({
      question: quizQuestions[i].qid,
      answer: ans,
      word: ans === 'manresa' ? quizQuestions[i].optA : quizQuestions[i].optB
    })),
    manresaCount: quizAnswers.filter(a => a === 'manresa').length,
    pct: Math.round(quizAnswers.filter(a => a === 'manresa').length / quizAnswers.length * 100),
    reportedOrigin: origin,
    predictedOrigin: predictOrigin(quizAnswers)[0] ? predictOrigin(quizAnswers)[0][0] : 'unknown'
  };
  
  // Store in window variable for potential collection
  if (!window.quizResponses) window.quizResponses = [];
  window.quizResponses.push(quizData);
  
  // Log for data collection
  console.log('QUIZ_RESPONSE:', JSON.stringify(quizData));
  
  // Show thanks
  document.getElementById('quiz-origin-ask').classList.add('hidden');
  document.getElementById('quiz-thanks').classList.remove('hidden');
}

// ============================================
// SHARE FUNCTIONS
// ============================================

function getShareText() {
  const manresaCount = quizAnswers.filter(a => a === 'manresa').length;
  const pct = Math.round(manresaCount / quizAnswers.length * 100);
  const topMatches = predictOrigin(quizAnswers);
  const bestMatch = topMatches[0] ? topMatches[0][0] : 'Catalunya Central';
  return { manresaCount, pct, bestMatch, topMatches };
}

function generateShareCard() {
  const canvas = document.getElementById('share-canvas');
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1920;
  canvas.width = W;
  canvas.height = H;

  const { manresaCount, pct, bestMatch, topMatches } = getShareText();

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#1a1612');
  grad.addColorStop(0.4, '#2d1f18');
  grad.addColorStop(1, '#1a1612');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle accent glow
  const glowGrad = ctx.createRadialGradient(W/2, H*0.35, 50, W/2, H*0.35, 500);
  glowGrad.addColorStop(0, 'rgba(196, 93, 53, 0.15)');
  glowGrad.addColorStop(1, 'rgba(196, 93, 53, 0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, W, H);

  // Draw bridge arches (logo)
  ctx.strokeStyle = 'rgba(196, 93, 53, 0.6)';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  // Arch 1
  ctx.beginPath(); ctx.moveTo(380, 320); ctx.quadraticCurveTo(440, 250, 500, 320); ctx.stroke();
  // Arch 2
  ctx.beginPath(); ctx.moveTo(500, 320); ctx.quadraticCurveTo(540, 230, 580, 320); ctx.stroke();
  // Arch 3
  ctx.beginPath(); ctx.moveTo(580, 320); ctx.quadraticCurveTo(640, 250, 700, 320); ctx.stroke();
  // Deck
  ctx.beginPath(); ctx.moveTo(370, 320); ctx.lineTo(710, 320); ctx.stroke();

  // Heart
  ctx.fillStyle = '#c45d35';
  ctx.beginPath();
  const hx = 540, hy = 270;
  ctx.moveTo(hx, hy);
  ctx.bezierCurveTo(hx, hy-12, hx-18, hy-18, hx-18, hy-6);
  ctx.bezierCurveTo(hx-18, hy+8, hx, hy+18, hx, hy+18);
  ctx.bezierCurveTo(hx, hy+18, hx+18, hy+8, hx+18, hy-6);
  ctx.bezierCurveTo(hx+18, hy-18, hx, hy-12, hx, hy);
  ctx.fill();

  // Title
  ctx.fillStyle = '#c45d35';
  ctx.font = '600 32px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EL CATAL\u00c0 MANRES\u00c0', W/2, 400);

  // Subtitle
  ctx.fillStyle = 'rgba(237, 232, 224, 0.5)';
  ctx.font = '400 26px "Inter", sans-serif';
  ctx.fillText('Quiz: D\'on Parles?', W/2, 450);

  // Big percentage circle
  const cx = W/2, cy = 750, radius = 200;
  // Track
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 16;
  ctx.stroke();
  // Fill arc
  ctx.beginPath();
  ctx.arc(cx, cy, radius, -Math.PI/2, -Math.PI/2 + (pct/100) * Math.PI * 2);
  ctx.strokeStyle = '#c45d35';
  ctx.lineWidth = 16;
  ctx.lineCap = 'round';
  ctx.stroke();
  // Percentage text
  ctx.fillStyle = '#ede8e0';
  ctx.font = '700 96px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(pct + '%', cx, cy + 20);
  ctx.font = '400 28px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(237, 232, 224, 0.6)';
  ctx.fillText('manres\u00e0', cx, cy + 65);

  // Verdict
  ctx.fillStyle = '#ede8e0';
  ctx.font = '600 42px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  // Word-wrap the verdict
  let verdict = document.getElementById('quiz-result-text').textContent;
  const maxLineW = W - 160;
  const verdictLines = wrapText(ctx, verdict, maxLineW);
  let vy = 1050;
  verdictLines.forEach(line => {
    ctx.fillText(line, W/2, vy);
    vy += 52;
  });

  // Top 3 matches
  ctx.fillStyle = 'rgba(237, 232, 224, 0.4)';
  ctx.font = '500 28px "Inter", sans-serif';
  ctx.fillText('El teu perfil s\'assembla a:', W/2, vy + 40);

  ctx.fillStyle = '#c45d35';
  ctx.font = '600 34px "Space Grotesk", sans-serif';
  const top3 = topMatches.slice(0, 3).map(t => t[0]);
  ctx.fillText(top3.join('  \u00b7  '), W/2, vy + 90);

  // Stats bar
  const barY = vy + 160;
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  roundRect(ctx, 80, barY, W-160, 100, 16);
  ctx.fill();
  ctx.fillStyle = 'rgba(237, 232, 224, 0.6)';
  ctx.font = '500 26px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${manresaCount}/20 paraules manresanes`, W/2, barY + 58);

  // URL at bottom
  ctx.fillStyle = 'rgba(237, 232, 224, 0.3)';
  ctx.font = '400 24px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Fes el quiz tu tamb\u00e9! \u2193', W/2, H - 160);
  ctx.fillStyle = '#c45d35';
  ctx.font = '500 26px "Inter", sans-serif';
  ctx.fillText('manre.site', W/2, H - 120);

  // Attribution
  ctx.fillStyle = 'rgba(237, 232, 224, 0.2)';
  ctx.font = '400 20px "Inter", sans-serif';
  ctx.fillText('Adri\u00e0 Sanz Oliva \u00b7 UAB', W/2, H - 60);

  return canvas;
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  words.forEach(word => {
    const test = current ? current + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function getShareMessage() {
  const { pct, bestMatch } = getShareText();
  const siteUrl = window.location.href;
  return `\ud83c\udfe0 El meu catal\u00e0 \u00e9s ${pct}% manres\u00e0! Segons el quiz del Catal\u00e0 Manres\u00e0, parlo com alg\u00fa de ${bestMatch}. Fes el quiz i descobreix d'on parles tu! \ud83c\udfaf ${siteUrl}`;
}

function shareToInstagram() {
  const canvas = generateShareCard();
  const preview = document.getElementById('share-card-preview');
  preview.classList.remove('hidden');

  // Create downloadable blob
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.getElementById('share-download-link');
    link.href = url;
    link.download = 'catala-manresa-quiz.png';
    link.style.display = 'inline-block';
    link.textContent = 'Descarrega la imatge';

    // Try native share (mobile)
    if (navigator.share && navigator.canShare) {
      const file = new File([blob], 'catala-manresa-quiz.png', { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: 'El Catal\u00e0 Manres\u00e0 - Quiz',
          text: getShareMessage()
        }).catch(() => {});
      }
    }

    document.getElementById('share-hint').textContent =
      'Descarrega la imatge i puja-la com a Story a Instagram. Al m\u00f2bil, pot ser que s\'obri directament el compartidor del sistema!';
  }, 'image/png');

  preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function shareToX() {
  const { pct, bestMatch } = getShareText();
  const siteUrl = window.location.href;
  const text = `\ud83c\udfaf El meu catal\u00e0 \u00e9s ${pct}% manres\u00e0! Parlo com alg\u00fa de ${bestMatch}. Fes el quiz i descobreix d'on parles tu!`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(siteUrl)}`;
  window.open(xUrl, '_blank', 'noopener,noreferrer');

  // Also generate the card for reference
  generateShareCard();
  document.getElementById('share-card-preview').classList.remove('hidden');
  document.getElementById('share-hint').textContent = 'Publicaci\u00f3 oberta a X. Tamb\u00e9 pots descarregar la imatge per adjuntar-la!';
  
  const canvas = document.getElementById('share-canvas');
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.getElementById('share-download-link');
    link.href = url;
    link.download = 'catala-manresa-quiz.png';
    link.style.display = 'inline-block';
    link.textContent = 'Descarrega la imatge';
  }, 'image/png');
}

function shareToWhatsApp() {
  const msg = getShareMessage();
  const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  // Also generate the card
  generateShareCard();
  document.getElementById('share-card-preview').classList.remove('hidden');
  document.getElementById('share-hint').textContent = 'Missatge obert a WhatsApp. Tamb\u00e9 pots descarregar la imatge i enviar-la al grup!';

  const canvas = document.getElementById('share-canvas');
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.getElementById('share-download-link');
    link.href = url;
    link.download = 'catala-manresa-quiz.png';
    link.style.display = 'inline-block';
    link.textContent = 'Descarrega la imatge';
  }, 'image/png');
}

function restartQuiz() {
  initQuiz();
  // Also hide share preview on restart
  document.getElementById('share-card-preview').classList.add('hidden');
  document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// INSTALL BANNER + NOTIFICATIONS
// ============================================

var installDeferredPrompt = null;

function initInstallBanner() {
  var banner = document.getElementById('install-banner');
  if (!banner) return;

  // Don't show if already in standalone mode (already installed)
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) return;

  // Don't show if dismissed recently (check cookie-like flag)
  if (window._installDismissed) return;

  // Detect platform
  var ua = navigator.userAgent || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/.test(ua);
  var isChrome = /Chrome/.test(ua) && !/Edge|Edg/.test(ua);

  // Listen for Chrome/Android install prompt
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    installDeferredPrompt = e;
  });

  // Show after 3 seconds
  setTimeout(function() {
    var stepsEl = document.getElementById('install-steps');
    var actionBtn = document.getElementById('install-action-btn');

    if (isIOS) {
      stepsEl.innerHTML = makeSteps([
        'Toca la icona de <strong>compartir</strong> (el quadrat amb la fletxa \u2191) a la barra de Safari',
        'Despl\u00e7a cap avall i toca <strong>\"Afegir a la pantalla d\'inici\"</strong>',
        'Confirma el nom <strong>\"ManreSite\"</strong> i toca <strong>Afegir</strong>'
      ]);
      actionBtn.textContent = 'Entesos!';
      actionBtn.addEventListener('click', function() {
        showNotifOption(banner);
      });
    } else if (installDeferredPrompt) {
      stepsEl.innerHTML = '';
      actionBtn.textContent = "Instal\u00b7lar l'app";
      actionBtn.addEventListener('click', function() {
        installDeferredPrompt.prompt();
        installDeferredPrompt.userChoice.then(function() {
          installDeferredPrompt = null;
          showNotifOption(banner);
        });
      });
    } else if (isAndroid && isChrome) {
      stepsEl.innerHTML = makeSteps([
        'Toca el men\u00fa <strong>\u22ee</strong> (tres punts) a la cantonada superior dreta',
        'Selecciona <strong>\"Afegir a la pantalla d\'inici\"</strong> o <strong>\"Instal\u00b7lar aplicaci\u00f3\"</strong>',
        'Confirma tocant <strong>Instal\u00b7lar</strong>'
      ]);
      actionBtn.textContent = 'Entesos!';
      actionBtn.addEventListener('click', function() {
        showNotifOption(banner);
      });
    } else {
      // Desktop or unknown
      stepsEl.innerHTML = makeSteps([
        'Al navegador, busca la icona d\'instal\u00b7laci\u00f3 a la barra d\'adreces',
        'O ves al men\u00fa del navegador i selecciona <strong>\"Instal\u00b7lar\"</strong>'
      ]);
      actionBtn.textContent = 'Entesos!';
      actionBtn.addEventListener('click', function() {
        showNotifOption(banner);
      });
    }

    banner.classList.remove('hidden');
  }, 3000);

  // Close / Later buttons
  document.getElementById('install-close').addEventListener('click', function() {
    banner.classList.add('hidden');
    window._installDismissed = true;
  });
  document.getElementById('install-later').addEventListener('click', function() {
    banner.classList.add('hidden');
    window._installDismissed = true;
  });
}

function makeSteps(steps) {
  return steps.map(function(text, i) {
    return '<div class="install-step"><span class="install-step-num">' + (i+1) + '</span><span>' + text + '</span></div>';
  }).join('');
}

function showNotifOption(banner) {
  // Replace content with notification option
  var stepsEl = document.getElementById('install-steps');
  var actionsEl = banner.querySelector('.install-actions');
  var textEl = banner.querySelector('.install-text');

  if (!('Notification' in window)) {
    // Notifications not supported
    banner.classList.add('hidden');
    window._installDismissed = true;
    return;
  }

  textEl.innerHTML = '<h3>\ud83d\udd14 Curiositats di\u00e0ries</h3><p>Vols rebre cada dia a les 8 del mat\u00ed una curiositat sobre la Catalunya Central?</p>';
  stepsEl.innerHTML = '';

  actionsEl.innerHTML = '';
  var yesBtn = document.createElement('button');
  yesBtn.className = 'notif-btn';
  yesBtn.textContent = '\ud83d\udd14 Activa notificacions';
  yesBtn.addEventListener('click', function() {
    requestNotifPermission(banner);
  });
  actionsEl.appendChild(yesBtn);

  var noBtn = document.createElement('button');
  noBtn.className = 'install-later';
  noBtn.textContent = 'No, gr\u00e0cies';
  noBtn.addEventListener('click', function() {
    banner.classList.add('hidden');
    window._installDismissed = true;
  });
  actionsEl.appendChild(noBtn);
}

function requestNotifPermission(banner) {
  Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      // Schedule daily notification
      scheduleDailyNotification();

      var textEl = banner.querySelector('.install-text');
      textEl.innerHTML = '<h3>\u2705 Notificacions activades!</h3><p>Rebr\u00e0s una curiositat cada dia a les 8 del mat\u00ed. Pots desactivar-les des de la configuraci\u00f3 del navegador.</p>';
      banner.querySelector('.install-actions').innerHTML = '';

      setTimeout(function() {
        banner.classList.add('hidden');
        window._installDismissed = true;
      }, 3000);

      // Show a test notification
      showDailyNotification();
    } else {
      banner.classList.add('hidden');
      window._installDismissed = true;
    }
  });
}

function getDailyFunFact() {
  // Same logic as in games.js
  var now = new Date();
  var dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  var facts = [
    'El Bages \u00e9s conegut com \u00abel cor de Catalunya\u00bb per la seva situaci\u00f3 geogr\u00e0fica central.',
    'La S\u00e8quia de Manresa, constru\u00efda al segle XIV, t\u00e9 26 km i porta aigua del Llobregat a la ciutat.',
    'Montserrat rep m\u00e9s de 2,5 milions de visitants cada any.',
    'La muntanya de sal de Cardona \u00e9s un fenomen geol\u00f2gic \u00fanic al m\u00f3n.',
    'La Patum de Berga, Patrimoni Immaterial de la Humanitat (UNESCO, 2005).',
    'Vic \u00e9s famosa per les boires persistents a l\'hivern per inversi\u00f3 t\u00e8rmica.',
    'El Moian\u00e8s \u00e9s la comarca m\u00e9s jove de Catalunya, creada el 2015.',
    'Sant Ignasi de Loiola va tenir les seves visions m\u00edstiques a Manresa el 1522.',
    'El Geoparc de la Catalunya Central \u00e9s Geoparc Mundial UNESCO des del 2012.',
    'Igualada \u00e9s la capital europea de la pell i el cuir.',
    'El Pont Vell de Manresa \u00e9s un dels ponts rom\u00e0nics m\u00e9s ben conservats de Catalunya.',
    'Les Comarques Centrals tenen un 89,3% de poblaci\u00f3 que sap parlar catal\u00e0.',
    'La paraula \u00abpipiripip\u00bb per la rosella \u00e9s gaireb\u00e9 exclusiva del Bages.',
    'Santpedor t\u00e9 un \u00edndex manesr\u00e0 (75,4%) m\u00e9s alt que Manresa (73,6%).',
    'El Carnaval de Solsona \u00e9s fam\u00f3s per penjar un ruc del campanar.',
  ];
  return facts[dayOfYear % facts.length];
}

function showDailyNotification() {
  if (Notification.permission === 'granted') {
    var fact = getDailyFunFact();
    new Notification('\ud83d\udca1 ManreSite \u2014 Sabies que...', {
      body: fact,
      icon: './assets/icon-192.png',
      badge: './assets/icon-192.png',
      tag: 'daily-fact'
    });
  }
}

function scheduleDailyNotification() {
  // Calculate ms until next 8:00 AM
  var now = new Date();
  var next8am = new Date(now);
  next8am.setHours(8, 0, 0, 0);
  if (now >= next8am) {
    next8am.setDate(next8am.getDate() + 1);
  }
  var msUntil = next8am - now;

  // Set timeout for first notification
  setTimeout(function() {
    showDailyNotification();
    // Then repeat every 24h
    setInterval(showDailyNotification, 24 * 60 * 60 * 1000);
  }, msUntil);
}

// If notifications already granted, schedule them
if ('Notification' in window && Notification.permission === 'granted') {
  scheduleDailyNotification();
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  populateQuestionSelect();
  initMap();
  initQuiz();
  initGames();
  initInstallBanner();
  renderStatistics();
  renderExclusivityChart();
  renderCityRanking();
});

// Global function access
window.showCityPanel = showCityPanel;
window.closeCityPanel = closeCityPanel;
window.selectQuizAnswer = selectQuizAnswer;
window.submitQuizOrigin = submitQuizOrigin;
window.restartQuiz = restartQuiz;
window.shareToInstagram = shareToInstagram;
window.shareToX = shareToX;
window.shareToWhatsApp = shareToWhatsApp;
