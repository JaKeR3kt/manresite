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

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  populateQuestionSelect();
  initMap();
  renderStatistics();
  renderExclusivityChart();
  renderCityRanking();
});

// Make showCityPanel global for popup clicks
window.showCityPanel = showCityPanel;
window.closeCityPanel = closeCityPanel;
