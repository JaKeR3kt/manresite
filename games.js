// ============================================
// GAMES MODULE — Catalunya Central
// ============================================

// ---- COMARCA DATA with SVG paths (simplified polygons) ----
const COMARQUES = {
  'Bages': {
    path: 'M 220,180 L 280,160 L 340,170 L 360,200 L 350,260 L 320,290 L 270,300 L 230,280 L 200,240 L 210,200 Z',
    capital: 'Manresa',
    poblacio: 175095,
    hint: 'La seva capital és la ciutat més poblada de la Catalunya Central.',
    hint2: 'El riu Cardener hi travessa la capital.',
    color: '#c45d35',
    municipis: ['Aguilar de Segarra','Artés','Avinyó','Balsareny','Callús','Cardona','Castellbell i el Vilar','Castellfollit del Boix','Castellgalí','Castellnou de Bages','Fonollosa','Gaià','Manresa','Marganell','Monistrol de Montserrat','Mura','Navarcles','Navàs','El Pont de Vilomara i Rocafort','Rajadell','Sallent','Sant Feliu Sasserra','Sant Fruitós de Bages','Sant Joan de Vilatorrada','Sant Mateu de Bages','Sant Salvador de Guardiola','Sant Vicenç de Castellet','Santpedor','Súria','Talamanca']
  },
  'Berguedà': {
    path: 'M 200,40 L 260,30 L 320,50 L 340,90 L 330,140 L 290,160 L 240,165 L 200,140 L 180,100 L 190,60 Z',
    capital: 'Berga',
    poblacio: 39013,
    hint: 'Comarca pirinenca coneguda pel riu Llobregat i els seus orígens.',
    hint2: 'La Patum és la seva festa més famosa.',
    color: '#d4853a',
    municipis: ['Avià','Bagà','Berga','Borredà','Capolat','Casserres','Castell de l\'Areny','Castellar de n\'Hug','Castellar del Riu','Cercs','Espunyola','Fígols','Gironella','Gisclareny','Gósol','Guardiola de Berguedà','Montclar','Montmajor','Olvan','La Pobla de Lillet','Puig-reig','La Quar','Sagàs','Saldes','Sant Jaume de Frontanyà','Sant Julià de Cerdanyola','Santa Maria de Merlès','Vallcebre','Vilada','Viver i Serrateix']
  },
  'Solsonès': {
    path: 'M 100,80 L 160,60 L 200,80 L 210,130 L 200,170 L 160,190 L 120,180 L 90,140 L 90,100 Z',
    capital: 'Solsona',
    poblacio: 13360,
    hint: 'Comarca amb la capital més petita de la Catalunya Central.',
    hint2: 'Famosa pel carnaval i els gegants bojos.',
    color: '#8b6f47',
    municipis: ['Castellar de la Ribera','Clariana de Cardener','La Coma i la Pedra','Guixers','Lladurs','Llobera','La Molsosa','Navès','Odèn','Olius','Pinell de Solsonès','Pinós','Riner','Sant Llorenç de Morunys','Solsona','Torà','Biosca']
  },
  'Moianès': {
    path: 'M 300,170 L 350,160 L 380,180 L 390,210 L 370,240 L 340,250 L 310,240 L 295,210 L 295,185 Z',
    capital: 'Moià',
    poblacio: 13279,
    hint: 'La comarca més jove de Catalunya, creada el 2015.',
    hint2: 'El seu nom prové de la seva capital.',
    color: '#6b8e5e',
    municipis: ['Calders','Castellcir','Castellterçol','Collsuspina','L\'Estany','Granera','Moià','Monistrol de Calders','Sant Quirze Safaja','Santa Maria d\'Oló']
  },
  'Osona': {
    path: 'M 350,80 L 420,60 L 470,90 L 480,140 L 460,190 L 420,210 L 380,200 L 350,170 L 340,130 L 340,100 Z',
    capital: 'Vic',
    poblacio: 156572,
    hint: 'Comarca amb una plana interior famosa per les seves boires.',
    hint2: 'La seva capital té una plaça Major emblemàtica.',
    color: '#5a7d9a',
    municipis: ['Aiguafreda','Balenyà','Brull','Calldetenes','Centelles','Espinelves','Folgueroles','Gurb','Les Masies de Roda','Les Masies de Voltregà','Manlleu','Malla','Montesquiu','Muntanyola','Oristà','Orís','El Brull','Prats de Lluçanès','Roda de Ter','Rupit i Pruit','Sant Boi de Lluçanès','Sant Bartomeu del Grau','Sant Hipòlit de Voltregà','Sant Julià de Vilatorta','Sant Martí d\'Albars','Sant Pere de Torelló','Sant Quirze de Besora','Sant Sadurní d\'Osormort','Sant Vicenç de Torelló','Santa Cecília de Voltregà','Santa Eugènia de Berga','Santa Eulàlia de Riuprimer','Seva','Sobremunt','Sora','Taradell','Tavèrnoles','Tona','Torelló','Vic','Vidrà','Viladrau','Vilanova de Sau']
  },
  'Anoia': {
    path: 'M 150,250 L 210,230 L 250,250 L 260,290 L 240,330 L 200,350 L 160,340 L 130,310 L 130,270 Z',
    capital: 'Igualada',
    poblacio: 120000,
    hint: 'Comarca que connecta la depressió central amb el litoral.',
    hint2: 'La seva capital és famosa per la indústria de la pell i el cuir.',
    color: '#9b7a5e',
    municipis: ['Argençola','Bellprat','El Bruc','Cabrera d\'Anoia','Calaf','Calonge de Segarra','Capellades','Carme','Castellfollit de Riubregós','Castellolí','Copons','Els Hostalets de Pierola','Igualada','Jorba','La Llacuna','Masquefa','Montmaneu','Òdena','Orpí','Piera','La Pobla de Claramunt','Pujalt','Rubió','Sant Martí de Tous','Sant Martí Sesgueioles','Santa Margarida de Montbui','La Torre de Claramunt','Vallbona d\'Anoia','Veciana','Vilanova del Camí']
  },
  'Lluçanès': {
    path: 'M 300,60 L 350,50 L 380,70 L 385,110 L 365,140 L 330,150 L 300,135 L 290,100 L 290,75 Z',
    capital: 'Prats de Lluçanès',
    poblacio: 8000,
    hint: 'La comarca més recent de Catalunya, creada el 2023.',
    hint2: 'Formada per municipis que abans pertanyien a Osona i Bages.',
    color: '#7a6b8e',
    municipis: ['Alpens','Lluçà','Olost','Oristà','Perafita','Prats de Lluçanès','Sant Agustí de Lluçanès','Sant Bartomeu del Grau','Sant Boi de Lluçanès','Sobremunt']
  }
};

// ---- DIFFICULTY LEVELS ----
const DIFFICULTIES = {
  'molt-facil': { name: 'Molt Fàcil', emoji: '😊', maxErrors: 99, showHint1: true, showHint2: true, showCapital: true, desc: 'Pistes completes + capital visible' },
  'facil': { name: 'Fàcil', emoji: '🙂', maxErrors: 10, showHint1: true, showHint2: false, showCapital: false, desc: 'Una pista per comarca' },
  'normal': { name: 'Normal', emoji: '😐', maxErrors: 5, showHint1: false, showHint2: false, showCapital: false, desc: 'Sense pistes, 5 errors permesos' },
  'dificil': { name: 'Difícil', emoji: '😤', maxErrors: 3, showHint1: false, showHint2: false, showCapital: false, desc: 'Sense pistes, només 3 errors' },
  'moreneta': { name: 'Moreneta Mode', emoji: '🙏', maxErrors: 1, showHint1: false, showHint2: false, showCapital: false, desc: 'Un sol error i perds. Per als valents!' }
};

// ---- FUN FACTS ----
const FUN_FACTS = [
  { fact: "El Bages és conegut com «el cor de Catalunya» per la seva situació geogràfica central.", source: "Viu el Bages" },
  { fact: "La Séquia de Manresa, construïda al segle XIV, té 26 km i porta aigua del Llobregat a la ciutat. Va ser una obra d'enginyeria medieval impressionant.", source: "Patrimoni de Manresa" },
  { fact: "Montserrat rep més de 2,5 milions de visitants cada any, sent el santuari més visitat de Catalunya.", source: "Turisme de Catalunya" },
  { fact: "La muntanya de sal de Cardona és un fenomen geològic únic al món. S'hi pot visitar una mina de sal que va estar activa durant més de 1.000 anys.", source: "Turisme Cardona" },
  { fact: "La Patum de Berga, declarada Patrimoni Immaterial de la Humanitat per la UNESCO el 2005, és una de les festes més antigues de Catalunya.", source: "UNESCO" },
  { fact: "Vic és famosa per les seves boires persistents a l'hivern, un fenomen causat per la inversió tèrmica a la plana d'Osona.", source: "Servei Meteorològic de Catalunya" },
  { fact: "El Carnaval de Solsona és famós pels «gegants bojos» i per penjar un ruc del campanar — una tradició que simbolitza la bogeria del carnaval.", source: "Cultura Popular Solsonès" },
  { fact: "El Moianès és la comarca més jove de Catalunya, creada el 15 d'abril de 2015, amb Moià com a capital.", source: "Generalitat de Catalunya" },
  { fact: "Manresa va ser la ciutat on Sant Ignasi de Loiola va tenir les seves visions místiques el 1522, que van portar a la fundació dels Jesuïtes.", source: "Cova de Sant Ignasi" },
  { fact: "La Seu de Manresa (Basílica de Santa Maria de la Seu) és un dels edificis gòtics més grans de Catalunya, amb una nau de 18 metres d'amplada.", source: "Manresa Turisme" },
  { fact: "El Geoparc de la Catalunya Central, declarat per la UNESCO el 2012, és l'únic geoparc de Catalunya i un dels pocs d'Espanya.", source: "UNESCO Geoparcs" },
  { fact: "Igualada és la capital europea de la pell i el cuir, amb una tradició que es remunta al segle XVIII.", source: "Museu de la Pell d'Igualada" },
  { fact: "El Pont Vell de Manresa, d'origen medieval (segle XII), és un dels ponts romànics més ben conservats de Catalunya.", source: "Patrimoni de Manresa" },
  { fact: "A la Catalunya Central hi viuen més de 500.000 persones repartides en més de 150 municipis.", source: "Idescat" },
  { fact: "El riu Llobregat neix a Castellar de n'Hug (Berguedà) i travessa tota la Catalunya Central fins arribar al mar a prop de Barcelona.", source: "ACA" },
  { fact: "La paraula «pipiripip» per referir-se a la rosella (amapola) és gairebé exclusiva del Bages i rodalies — no es troba documentada en cap altre lloc del domini lingüístic català.", source: "ALDC" },
  { fact: "Manresa té el rècord de temperatura més baixa registrada en una capital comarcal de la depressió central: -18,2°C.", source: "Servei Meteorològic de Catalunya" },
  { fact: "El Lluçanès és la comarca més recent de Catalunya, creada el 2023, formada per municipis que abans pertanyien a Osona.", source: "Generalitat de Catalunya" },
  { fact: "Les Comarques Centrals tenen un 89,3% de població que sap parlar català, la taxa més alta de tot Catalunya.", source: "EULP 2023, Idescat" },
  { fact: "La comarca del Berguedà va ser un dels principals centres industrials tèxtils de Catalunya al segle XIX, amb les colònies industrials al llarg del Llobregat.", source: "Museu de les Colònies" },
  { fact: "El santuari de la Mare de Déu de Montserrat alberga la imatge de la Moreneta, una talla romànica del segle XII, patrona de Catalunya.", source: "Abadia de Montserrat" },
  { fact: "A Manresa s'hi diu «torreta» al que a la resta de Catalunya en diuen «test» (maceta). El 93,1% dels manresans utilitza aquesta paraula.", source: "Estudi El Català Manresà" },
  { fact: "El mot «prouta» (en comptes de «prou» + «ta») és un dels trets més característics del parlar bagenc.", source: "Estudi El Català Manresà" },
  { fact: "Calaf és coneguda com «la cruïlla de Catalunya» pel seu encreuament històric de camins entre Barcelona, Lleida i el Pirineu.", source: "Turisme Anoia" },
  { fact: "El pantà de la Llosa del Cavall, al Solsonès, és un dels embassaments més grans de la Catalunya Central amb 80 hm³ de capacitat.", source: "ACA" },
  { fact: "Vic celebra el Mercat Medieval cada desembre, un dels mercats temàtics més grans de Catalunya amb més de 500 parades.", source: "Ajuntament de Vic" },
  { fact: "La torre de l'amo de la colònia Vidal, a Puig-reig, va ser dissenyada per un deixeble de Gaudí.", source: "Patrimoni del Berguedà" },
  { fact: "Santpedor, amb un 75,4% d'ús de la variant manresana, té fins i tot un índex més alt que la pròpia Manresa (73,6%).", source: "Estudi El Català Manresà" },
  { fact: "Les mines de Súria i Sallent produeixen potassa i sal des de principis del segle XX, formant un dels complexos miners més importants del sud d'Europa.", source: "ICL Ibérica" },
  { fact: "El Parc Natural de Sant Llorenç del Munt i l'Obac, entre el Bages i el Vallès, té el cim de La Mola a 1.104 metres amb un monestir al capdamunt.", source: "Diputació de Barcelona" }
];

// ---- GAME STATE ----
let gameMode = 'comarques'; // 'comarques' or 'municipis'
let gameDifficulty = 'normal';
let gameComarcaFilter = null; // for municipis mode
let gameQuestions = [];
let gameCurrentIdx = 0;
let gameErrors = 0;
let gameCorrect = 0;
let gameFinished = false;

// ---- INIT GAMES ----
function initGames() {
  renderDifficultySelector();
  renderFunFact();
}

function renderDifficultySelector() {
  const container = document.getElementById('game-setup');
  if (!container) return;

  let html = `
    <div class="game-mode-selector">
      <h4>Mode de joc</h4>
      <div class="game-mode-btns">
        <button class="game-mode-btn active" data-mode="comarques" onclick="setGameMode('comarques')">
          <span class="mode-emoji">🗺️</span>
          <span class="mode-name">Comarques</span>
          <span class="mode-desc">Endevina les 7 comarques</span>
        </button>
        <button class="game-mode-btn" data-mode="municipis" onclick="setGameMode('municipis')">
          <span class="mode-emoji">🏘️</span>
          <span class="mode-name">Municipis</span>
          <span class="mode-desc">Endevina poblacions per comarca</span>
        </button>
      </div>
    </div>

    <div id="comarca-filter-section" class="hidden">
      <h4>Escull la comarca</h4>
      <div class="comarca-filter-btns">
        ${Object.keys(COMARQUES).map(c => `<button class="comarca-filter-btn" onclick="setComarcaFilter('${c}')">${c}</button>`).join('')}
      </div>
    </div>

    <div class="difficulty-selector">
      <h4>Dificultat</h4>
      <div class="difficulty-btns">
        ${Object.entries(DIFFICULTIES).map(([key, d]) => `
          <button class="diff-btn ${key === 'normal' ? 'active' : ''}" data-diff="${key}" onclick="setDifficulty('${key}')">
            <span class="diff-emoji">${d.emoji}</span>
            <span class="diff-name">${d.name}</span>
            <span class="diff-desc">${d.desc}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <button class="cta-btn" id="start-game-btn" onclick="startGame()">Començar!</button>
  `;
  container.innerHTML = html;
}

function setGameMode(mode) {
  gameMode = mode;
  document.querySelectorAll('.game-mode-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  const filterSection = document.getElementById('comarca-filter-section');
  if (mode === 'municipis') {
    filterSection.classList.remove('hidden');
  } else {
    filterSection.classList.add('hidden');
    gameComarcaFilter = null;
  }
}

function setComarcaFilter(comarca) {
  gameComarcaFilter = comarca;
  document.querySelectorAll('.comarca-filter-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === comarca);
  });
}

function setDifficulty(diff) {
  gameDifficulty = diff;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-diff="${diff}"]`).classList.add('active');
}

// ---- START GAME ----
function startGame() {
  gameCurrentIdx = 0;
  gameErrors = 0;
  gameCorrect = 0;
  gameFinished = false;

  if (gameMode === 'comarques') {
    gameQuestions = Object.keys(COMARQUES).sort(() => Math.random() - 0.5);
  } else {
    if (!gameComarcaFilter) {
      alert('Escull una comarca primer!');
      return;
    }
    const municipis = COMARQUES[gameComarcaFilter].municipis;
    gameQuestions = [...municipis].sort(() => Math.random() - 0.5);
  }

  document.getElementById('game-setup').classList.add('hidden');
  document.getElementById('game-play').classList.remove('hidden');
  document.getElementById('game-result').classList.add('hidden');
  showGameQuestion();
}

function showGameQuestion() {
  const diff = DIFFICULTIES[gameDifficulty];

  if (gameCurrentIdx >= gameQuestions.length || gameErrors >= diff.maxErrors) {
    showGameResult();
    return;
  }

  const target = gameQuestions[gameCurrentIdx];
  const play = document.getElementById('game-play');

  // Generate map SVG
  let mapHtml = '';
  if (gameMode === 'comarques') {
    mapHtml = generateComarquesMap(target, diff);
  } else {
    mapHtml = generateMunicipisQuestion(target, diff);
  }

  const progress = `${gameCurrentIdx + 1} / ${gameQuestions.length}`;
  const maxErr = diff.maxErrors === 99 ? '∞' : diff.maxErrors;
  const heartsLeft = diff.maxErrors === 99 ? '∞' : (diff.maxErrors - gameErrors);

  play.innerHTML = `
    <div class="game-hud">
      <div class="hud-item">
        <span class="hud-label">Progrés</span>
        <span class="hud-value">${progress}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">Encerts</span>
        <span class="hud-value hud-correct">${gameCorrect}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">Errors</span>
        <span class="hud-value hud-errors">${gameErrors} / ${maxErr}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">Dificultat</span>
        <span class="hud-value">${diff.emoji} ${diff.name}</span>
      </div>
    </div>
    ${mapHtml}
  `;
}

function generateComarquesMap(targetComarca, diff) {
  const svgW = 520, svgH = 400;

  let paths = '';
  Object.entries(COMARQUES).forEach(([name, data]) => {
    const isTarget = name === targetComarca;
    const isCorrect = gameQuestions.indexOf(name) < gameCurrentIdx && gameQuestions.indexOf(name) >= 0;
    const alreadyDone = gameCurrentIdx > gameQuestions.indexOf(name) && gameQuestions.indexOf(name) !== -1;

    let fill = 'var(--c-bg-alt)';
    let stroke = 'var(--c-border)';
    let opacity = '1';
    let cursor = 'pointer';
    let label = '';

    if (alreadyDone && !isTarget) {
      fill = data.color;
      stroke = data.color;
      opacity = '0.4';
      cursor = 'default';
      label = name;
    }

    paths += `<path d="${data.path}" fill="${fill}" stroke="${stroke}" stroke-width="2" opacity="${opacity}" 
      style="cursor:${cursor};transition:all 0.2s" 
      onclick="guessComarca('${name}')" 
      onmouseenter="this.style.opacity='0.7'" onmouseleave="this.style.opacity='${opacity}'"
      data-comarca="${name}"/>`;

    // Show label for completed ones
    if (alreadyDone && !isTarget) {
      const bounds = getPathCenter(data.path);
      paths += `<text x="${bounds.x}" y="${bounds.y}" text-anchor="middle" fill="var(--c-text)" font-size="11" font-family="Inter" font-weight="500" pointer-events="none">${name}</text>`;
    }
  });

  // Hints
  let hintsHtml = '';
  const targetData = COMARQUES[targetComarca];
  if (diff.showCapital) {
    hintsHtml += `<div class="game-hint">🏛️ Capital: <strong>${targetData.capital}</strong></div>`;
  }
  if (diff.showHint1) {
    hintsHtml += `<div class="game-hint">💡 ${targetData.hint}</div>`;
  }
  if (diff.showHint2) {
    hintsHtml += `<div class="game-hint">💡 ${targetData.hint2}</div>`;
  }

  return `
    <div class="game-question-text">On és <strong>${targetComarca}</strong>?</div>
    ${hintsHtml}
    <div class="game-map-container">
      <svg viewBox="0 0 ${svgW} ${svgH}" class="game-map-svg">${paths}</svg>
    </div>
  `;
}

function generateMunicipisQuestion(targetMunicipi, diff) {
  const comarca = gameComarcaFilter;
  const allMunicipis = COMARQUES[comarca].municipis;

  // Generate multiple choice (4 options)
  let options = [targetMunicipi];
  const others = allMunicipis.filter(m => m !== targetMunicipi);
  while (options.length < Math.min(4, allMunicipis.length)) {
    const rand = others[Math.floor(Math.random() * others.length)];
    if (!options.includes(rand)) options.push(rand);
  }
  options.sort(() => Math.random() - 0.5);

  let hintsHtml = '';
  if (diff.showHint1) {
    const idx = allMunicipis.indexOf(targetMunicipi);
    hintsHtml += `<div class="game-hint">💡 La primera lletra és: <strong>${targetMunicipi[0]}</strong></div>`;
  }
  if (diff.showHint2) {
    hintsHtml += `<div class="game-hint">💡 Té ${targetMunicipi.length} lletres</div>`;
  }

  return `
    <div class="game-question-text">Quin d'aquests municipis pertany a <strong>${comarca}</strong>?</div>
    <div class="game-question-sub">Selecciona: <strong>${targetMunicipi}</strong></div>
    ${hintsHtml}
    <div class="game-options-grid">
      ${options.map(o => `
        <button class="game-option-btn" onclick="guessMunicipi('${o.replace(/'/g, "\\'")}', '${targetMunicipi.replace(/'/g, "\\'")}')">${o}</button>
      `).join('')}
    </div>
  `;
}

function getPathCenter(pathStr) {
  const nums = pathStr.match(/[\d.]+/g).map(Number);
  let sumX = 0, sumY = 0, count = 0;
  for (let i = 0; i < nums.length; i += 2) {
    if (i + 1 < nums.length) {
      sumX += nums[i];
      sumY += nums[i + 1];
      count++;
    }
  }
  return { x: sumX / count, y: sumY / count };
}

// ---- GUESS HANDLERS ----
function guessComarca(guess) {
  if (gameFinished) return;
  const target = gameQuestions[gameCurrentIdx];

  if (guess === target) {
    gameCorrect++;
    gameCurrentIdx++;
    // Flash green on the path
    const el = document.querySelector(`[data-comarca="${guess}"]`);
    if (el) {
      el.style.fill = COMARQUES[guess].color;
      el.style.opacity = '0.6';
    }
    setTimeout(() => showGameQuestion(), 400);
  } else {
    gameErrors++;
    // Flash red
    const el = document.querySelector(`[data-comarca="${guess}"]`);
    if (el) {
      el.style.fill = '#e74c3c';
      setTimeout(() => { el.style.fill = 'var(--c-bg-alt)'; }, 500);
    }
    // Check if game over
    if (gameErrors >= DIFFICULTIES[gameDifficulty].maxErrors) {
      setTimeout(() => showGameResult(), 600);
    } else {
      // Update HUD errors
      const errEl = document.querySelector('.hud-errors');
      if (errEl) {
        const maxErr = DIFFICULTIES[gameDifficulty].maxErrors === 99 ? '∞' : DIFFICULTIES[gameDifficulty].maxErrors;
        errEl.textContent = `${gameErrors} / ${maxErr}`;
      }
    }
  }
}

function guessMunicipi(guess, target) {
  if (gameFinished) return;

  if (guess === target) {
    gameCorrect++;
    gameCurrentIdx++;
    setTimeout(() => showGameQuestion(), 300);
  } else {
    gameErrors++;
    if (gameErrors >= DIFFICULTIES[gameDifficulty].maxErrors) {
      setTimeout(() => showGameResult(), 300);
    } else {
      // Mark wrong button
      event.target.style.background = '#e74c3c';
      event.target.style.color = '#fff';
      event.target.style.pointerEvents = 'none';
    }
  }
}

// ---- GAME RESULT ----
function showGameResult() {
  gameFinished = true;
  document.getElementById('game-play').classList.add('hidden');
  const result = document.getElementById('game-result');
  result.classList.remove('hidden');

  const total = gameQuestions.length;
  const pct = Math.round(gameCorrect / total * 100);
  const diff = DIFFICULTIES[gameDifficulty];
  const lost = gameErrors >= diff.maxErrors && diff.maxErrors < 99;

  let emoji, message;
  if (lost) {
    emoji = '💔';
    message = `Has perdut al ${diff.name}! Has encertat ${gameCorrect} de ${total} abans de superar el límit d'errors.`;
  } else if (pct === 100) {
    emoji = '🏆';
    message = `Perfecte! Has encertat totes ${total} ${gameMode === 'comarques' ? 'comarques' : 'preguntes'} al ${diff.name}!`;
  } else if (pct >= 70) {
    emoji = '🎉';
    message = `Molt bé! ${gameCorrect} de ${total} correctes (${pct}%) al ${diff.name}.`;
  } else {
    emoji = '📚';
    message = `${gameCorrect} de ${total} correctes (${pct}%). Segueix practicant!`;
  }

  result.innerHTML = `
    <div class="game-result-card">
      <div class="game-result-emoji">${emoji}</div>
      <h3>${lost ? 'Game Over!' : 'Resultat'}</h3>
      <p class="game-result-text">${message}</p>
      <div class="game-result-stats">
        <div class="grs"><span class="grs-val">${gameCorrect}</span><span class="grs-label">Encerts</span></div>
        <div class="grs"><span class="grs-val">${gameErrors}</span><span class="grs-label">Errors</span></div>
        <div class="grs"><span class="grs-val">${pct}%</span><span class="grs-label">Precisió</span></div>
      </div>
      <div class="game-result-actions">
        <button class="cta-btn" onclick="restartGame()">Torna a jugar</button>
        <button class="cta-btn cta-secondary" onclick="backToSetup()">Canviar opcions</button>
      </div>
    </div>
  `;
}

function restartGame() {
  startGame();
}

function backToSetup() {
  document.getElementById('game-play').classList.add('hidden');
  document.getElementById('game-result').classList.add('hidden');
  document.getElementById('game-setup').classList.remove('hidden');
}

// ---- FUN FACT ----
function renderFunFact() {
  const container = document.getElementById('fun-fact-container');
  if (!container) return;

  // Use day of year as seed for daily rotation
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const factIdx = dayOfYear % FUN_FACTS.length;
  const fact = FUN_FACTS[factIdx];

  container.innerHTML = `
    <div class="fun-fact-card">
      <div class="fun-fact-header">
        <span class="fun-fact-emoji">💡</span>
        <span class="fun-fact-title">Sabies que...</span>
        <span class="fun-fact-day">Curiositat del dia</span>
      </div>
      <p class="fun-fact-text">${fact.fact}</p>
      <p class="fun-fact-source">Font: ${fact.source}</p>
    </div>
    <button class="fun-fact-more" onclick="showRandomFact()">Mostra'n una altra →</button>
  `;
}

function showRandomFact() {
  const container = document.getElementById('fun-fact-container');
  const randomIdx = Math.floor(Math.random() * FUN_FACTS.length);
  const fact = FUN_FACTS[randomIdx];

  const card = container.querySelector('.fun-fact-card');
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = 'fadeIn 0.3s ease';

  container.querySelector('.fun-fact-text').textContent = fact.fact;
  container.querySelector('.fun-fact-source').textContent = `Font: ${fact.source}`;
}

// Global exports
window.setGameMode = setGameMode;
window.setComarcaFilter = setComarcaFilter;
window.setDifficulty = setDifficulty;
window.startGame = startGame;
window.guessComarca = guessComarca;
window.guessMunicipi = guessMunicipi;
window.restartGame = restartGame;
window.backToSetup = backToSetup;
window.showRandomFact = showRandomFact;
window.initGames = initGames;
