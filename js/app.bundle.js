// =============================================
// CODENAMES ULTRA — Single Bundle (no modules)
// =============================================

// --- WORDS ---
const WORDS = [
  "APPLE","BANK","BARK","BAT","BATTERY","BEAR","BED","BELT","BERLIN",
  "BERRY","BOARD","BOLT","BOMB","BOW","BOX","BRIDGE","BRUSH","BUCK",
  "BUFFALO","BUG","CAB","CANADA","CAPITAL","CASTLE","CAT","CELL","CENTER",
  "CHAIR","CHANGE","CHARGE","CHECK","CHEST","CHINA","CHOCOLATE","CHURCH",
  "CIRCLE","CLIFF","CLOAK","CLUB","CODE","COLD","COMIC","COMPOUND",
  "CONCERT","COPPER","COTTON","COURT","COVER","CRANE","CRASH","CRICKET",
  "CROSS","CROWN","CYCLE","DANCE","DATE","DAY","DEATH","DECK","DEGREE",
  "DIAMOND","DICE","DINOSAUR","DISEASE","DOCK","DOCTOR","DOG","DRAFT",
  "DRAGON","DRESS","DRILL","DROP","DUCK","DWARF","EAGLE","ENGINE",
  "ENGLAND","EUROPE","EYE","FACE","FAIR","FALL","FAN","FENCE","FIELD",
  "FIGHTER","FIGURE","FILE","FILM","FIRE","FISH","FLY","FOOT","FORCE",
  "FOREST","FORK","FRANCE","GAS","GENIUS","GERMANY","GHOST","GIANT",
  "GLASS","GLOVE","GOLD","GRACE","GRASS","GREECE","GREEN","GROUND",
  "HAM","HAND","HAWK","HEAD","HEART","HELICOPTER","HERO","HOLE","HOOD",
  "HOOK","HORN","HORSE","HOSPITAL","HOTEL","ICE","INDIA","IRON","IVORY",
  "JACK","JAM","JET","JUPITER","KANGAROO","KETCHUP","KEY","KID","KING",
  "KIWI","KNIFE","KNIGHT","LAB","LAP","LASER","LAWYER","LEAD","LEMON",
  "LEPRECHAUN","LIFE","LIGHT","LIMOUSINE","LINE","LINK","LION","LOCH",
  "LOCK","LOG","LONDON","LUCK","MAIL","MAMMOTH","MAPLE","MARBLE","MARCH",
  "MASS","MATCH","MERCURY","MEXICO","MICROSCOPE","MILLIONAIRE","MINE",
  "MINT","MISSILE","MODEL","MOLE","MOON","MOSCOW","MOUNT","MOUSE",
  "MOUTH","MUG","NAIL","NEEDLE","NET","NEW YORK","NIGHT","NINJA","NOTE",
  "NOVEL","NURSE","NUT","OCTOPUS","OIL","OLIVE","OLYMPUS","OPERA",
  "ORANGE","ORGAN","PALM","PAN","PANTS","PAPER","PARK","PASS","PASTE",
  "PENGUIN","PHOENIX","PIANO","PIE","PILOT","PIN","PIPE","PIRATE",
  "PISTOL","PIT","PITCH","PLANE","PLASTIC","PLATE","PLAY","PLOT","POINT",
  "POISON","POLE","POLICE","POOL","PORT","POST","POUND","PRESS",
  "PRINCESS","PUMPKIN","PUPIL","PYRAMID","QUEEN","RABBIT","RACKET",
  "RAY","REVOLUTION","RING","ROBIN","ROBOT","ROCK","ROME","ROOT","ROSE",
  "ROUND","ROW","RULER","RUSSIA","SAIL","SATURN","SCALE","SCHOOL",
  "SCIENTIST","SCORPION","SCREEN","SCUBA","SEAL","SERVER","SHADOW",
  "SHAKESPEARE","SHARK","SHIP","SHOE","SHOP","SHOT","SINK","SKYSCRAPER",
  "SLIP","SLUG","SMUGGLER","SNOW","SNOWMAN","SOCK","SOLDIER","SOUL",
  "SOUND","SPACE","SPELL","SPIDER","SPIKE","SPOT","SPRING","SPY",
  "SQUARE","STADIUM","STAFF","STAR","STATE","STICK","STOCK","STORM",
  "STREAM","STRIKE","STRING","SUB","SUIT","SUPERHERO","SWING","SWITCH",
  "TABLE","TABLET","TAG","TAIL","TAP","TEACHER","TEMPLE","THEATER",
  "THIEF","THUMB","TICK","TIE","TIME","TOKYO","TOOTH","TORCH","TOWER",
  "TRACK","TRAIN","TRIANGLE","TRIP","TRUNK","TUBE","TURKEY","UNDERTAKER",
  "UNICORN","VACUUM","VAN","VET","WAKE","WALL","WAR","WASH","WASHINGTON",
  "WATCH","WATER","WAVE","WEB","WELL","WHALE","WHIP","WIND","WITCH",
  "WORM","YARD"
];

// --- GAME LOGIC ---
const CARD_TYPE = { BLUE: 'blue', RED: 'red', BYSTANDER: 'bystander', ASSASSIN: 'assassin' };

function generateBoard() {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 25);
  const firstTeam = Math.random() < 0.5 ? CARD_TYPE.BLUE : CARD_TYPE.RED;
  const secondTeam = firstTeam === CARD_TYPE.BLUE ? CARD_TYPE.RED : CARD_TYPE.BLUE;
  const types = [
    ...Array(9).fill(firstTeam),
    ...Array(8).fill(secondTeam),
    ...Array(7).fill(CARD_TYPE.BYSTANDER),
    CARD_TYPE.ASSASSIN
  ].sort(() => Math.random() - 0.5);
  const cards = selected.map((word, i) => ({ word, type: types[i], revealed: false, id: i }));
  return { cards, firstTeam };
}

function createGameState(players) {
  const { cards, firstTeam } = generateBoard();
  const blueCount = cards.filter(c => c.type === CARD_TYPE.BLUE).length;
  const redCount = cards.filter(c => c.type === CARD_TYPE.RED).length;
  return {
    cards, currentTeam: firstTeam,
    blueRemaining: blueCount, redRemaining: redCount,
    blueTotal: blueCount, redTotal: redCount,
    clues: [], currentClue: null, guessesLeft: 0,
    gameOver: false, winner: null, spymasterView: false,
    players: players || { blue: [], red: [] },
    startTime: Date.now(), turnTimer: null
  };
}

function revealCard(state, cardIndex) {
  if (state.gameOver) return { state, result: 'game_over' };
  const card = state.cards[cardIndex];
  if (card.revealed) return { state, result: 'already_revealed' };
  card.revealed = true;
  if (card.type === CARD_TYPE.BLUE) state.blueRemaining--;
  if (card.type === CARD_TYPE.RED) state.redRemaining--;
  if (card.type === CARD_TYPE.ASSASSIN) {
    state.gameOver = true;
    state.winner = state.currentTeam === CARD_TYPE.BLUE ? CARD_TYPE.RED : CARD_TYPE.BLUE;
    return { state, result: 'assassin' };
  }
  if (state.blueRemaining === 0) { state.gameOver = true; state.winner = CARD_TYPE.BLUE; return { state, result: 'win' }; }
  if (state.redRemaining === 0) { state.gameOver = true; state.winner = CARD_TYPE.RED; return { state, result: 'win' }; }
  if (card.type !== state.currentTeam) { state.guessesLeft = 0; return { state, result: 'wrong' }; }
  state.guessesLeft--;
  if (state.guessesLeft <= 0) return { state, result: 'correct_last' };
  return { state, result: 'correct' };
}

function submitClue(state, word, number) {
  const clue = { word: word.toUpperCase(), number: parseInt(number), team: state.currentTeam, guessedWords: [] };
  state.currentClue = clue;
  state.clues.push(clue);
  state.guessesLeft = parseInt(number) + 1;
  return state;
}

function endTurn(state) {
  state.currentTeam = state.currentTeam === CARD_TYPE.BLUE ? CARD_TYPE.RED : CARD_TYPE.BLUE;
  state.currentClue = null;
  state.guessesLeft = 0;
  return state;
}

function getGameDuration(startTime) {
  const elapsed = Date.now() - startTime;
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  return minutes + 'm ' + String(seconds).padStart(2, '0') + 's';
}

function getGameStats(state) {
  const blueRevealed = state.blueTotal - state.blueRemaining;
  const redRevealed = state.redTotal - state.redRemaining;
  return {
    duration: getGameDuration(state.startTime),
    blueFound: blueRevealed, blueTotal: state.blueTotal,
    redFound: redRevealed, redTotal: state.redTotal,
    totalClues: state.clues.length, winner: state.winner,
    winnerFound: state.winner === CARD_TYPE.BLUE ? blueRevealed + '/' + state.blueTotal : redRevealed + '/' + state.redTotal
  };
}

// --- UI RENDERING ---

function renderHomeScreen() {
  return '<div class="screen screen--home" id="screen-home">' +
    '<header class="nav">' +
      '<div class="nav__logo">TACTICAL INTELLIGENCE</div>' +
      '<nav class="nav__links">' +
        '<a href="#" class="nav__link" data-nav="lobby">Lobby</a>' +
        '<a href="#" class="nav__link" data-nav="intel">Intel</a>' +
        '<a href="#" class="nav__link" data-nav="rules">Rules</a>' +
      '</nav>' +
      '<div class="nav__actions">' +
        '<button class="nav__icon-btn" id="btn-help" aria-label="Help"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></button>' +
        '<button class="nav__icon-btn" id="btn-settings" aria-label="Settings"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button>' +
        '<button class="btn btn--primary btn--sm" id="btn-new-game-nav">NEW GAME</button>' +
      '</div>' +
    '</header>' +
    '<main class="home">' +
      '<div class="home__stamp">REDACTED</div>' +
      '<div class="home__hero">' +
        '<h1 class="home__title">CODENAMES <span class="home__title--accent">ONLINE</span></h1>' +
        '<p class="home__subtitle">SYMMETRIC INTELLIGENCE PROTOCOL // V4.0.2</p>' +
      '</div>' +
      '<div class="home__actions">' +
        '<div class="home__card home__card--create">' +
          '<div class="home__card-icon home__card-icon--blue"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg></div>' +
          '<h2 class="home__card-title">INITIATE OPERATION</h2>' +
          '<p class="home__card-desc">Start a new high-security session. You will be assigned as the primary operative lead.</p>' +
          '<button class="btn btn--primary btn--full" id="btn-create-game">CREATE NEW GAME</button>' +
        '</div>' +
        '<div class="home__card home__card--join">' +
          '<div class="home__card-icon home__card-icon--red"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg></div>' +
          '<h2 class="home__card-title">JOIN INTELLIGENCE</h2>' +
          '<p class="home__card-desc">Enter the secure mission code provided by your operative lead to infiltrate the board.</p>' +
          '<input type="text" class="input" id="input-game-code" placeholder="ENTER 6-DIGIT CODE" maxlength="6" autocomplete="off">' +
          '<button class="btn btn--dark btn--full" id="btn-join-game">INFILTRATE SESSION</button>' +
        '</div>' +
      '</div>' +
      '<div class="home__stats">' +
        '<div class="home__stat"><span class="home__stat-label">ACTIVE AGENTS</span><span class="home__stat-value">14,209</span></div>' +
        '<div class="home__stat"><span class="home__stat-label">MISSIONS RESOLVED</span><span class="home__stat-value">2.4M</span></div>' +
        '<div class="home__stat"><span class="home__stat-label">SERVER STATUS</span><span class="home__stat-value home__stat-value--online">● ONLINE</span></div>' +
        '<div class="home__stat"><span class="home__stat-label">SECURITY LEVEL</span><span class="home__stat-value">ALPHA-7</span></div>' +
      '</div>' +
    '</main>' +
    '<footer class="footer">' +
      '<div class="footer__left"><div class="footer__stamp">CLASSIFIED DOCUMENT</div><span class="footer__copy">© 2026 TACTICAL INTELLIGENCE BEYOND REDACTION</span></div>' +
      '<div class="footer__links"><a href="#" class="footer__link">Terms of Engagement</a><a href="#" class="footer__link">Privacy Protocol</a><a href="#" class="footer__link">Source Code</a></div>' +
    '</footer>' +
  '</div>';
}

function renderLobbyScreen(state) {
  var missionCode = state.missionCode || 'AX-9921-ALPHA';
  var bluePlayersList = (state.players && state.players.blue || []).map(function(p) {
    return '<div class="lobby__player"><span class="lobby__player-icon">👤</span><span class="lobby__player-name">' + p.name + '</span><span class="lobby__player-badge">' + p.role.toUpperCase() + '</span></div>';
  }).join('');
  var redPlayersList = (state.players && state.players.red || []).map(function(p) {
    return '<div class="lobby__player"><span class="lobby__player-icon">👤</span><span class="lobby__player-name">' + p.name + '</span><span class="lobby__player-badge">' + p.role.toUpperCase() + '</span></div>';
  }).join('');

  return '<div class="screen screen--lobby" id="screen-lobby">' +
    '<header class="nav">' +
      '<div class="nav__logo">TACTICAL INTELLIGENCE</div>' +
      '<nav class="nav__links">' +
        '<a href="#" class="nav__link nav__link--active" data-nav="lobby">Lobby</a>' +
        '<a href="#" class="nav__link" data-nav="intel">Intel</a>' +
        '<a href="#" class="nav__link" data-nav="rules">Rules</a>' +
      '</nav>' +
      '<div class="nav__actions">' +
        '<div class="nav__mission-code"><span class="nav__mission-label">MISSION ACCESS CODE</span><span class="nav__mission-value">' + missionCode + '</span></div>' +
        '<button class="nav__icon-btn" aria-label="Settings"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button>' +
        '<button class="nav__icon-btn" aria-label="Help"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></button>' +
        '<button class="btn btn--primary btn--sm" id="btn-new-game-lobby">NEW GAME</button>' +
      '</div>' +
    '</header>' +
    '<main class="lobby">' +
      '<div class="lobby__sidebar">' +
        '<div class="lobby__user"><div class="lobby__user-avatar">👤</div><div class="lobby__user-info"><span class="lobby__user-name">OPERATIVE_07</span><span class="lobby__user-id">ID: #AX-9921</span></div></div>' +
        '<nav class="lobby__nav">' +
          '<a href="#" class="lobby__nav-item lobby__nav-item--active"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> PERSONNEL</a>' +
          '<a href="#" class="lobby__nav-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> OPERATIONS LOG</a>' +
          '<a href="#" class="lobby__nav-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> BRIEFING</a>' +
          '<a href="#" class="lobby__nav-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 9 8 12 2 12"/></svg> INTERCEPTS</a>' +
        '</nav>' +
        '<button class="btn btn--ghost btn--danger btn--full" id="btn-abort-lobby">ABORT MISSION</button>' +
      '</div>' +
      '<div class="lobby__main">' +
        '<div class="lobby__header"><h1 class="lobby__title"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> MISSION PREPARATION LOBBY</h1><p class="lobby__desc">Awaiting operative synchronization. Teams must be balanced before initiating the decryption sequence.</p></div>' +
        '<div class="lobby__teams">' +
          '<div class="lobby__team lobby__team--blue">' +
            '<div class="lobby__team-header lobby__team-header--blue"><h2 class="lobby__team-title">INTELLIGENCE BLUE</h2><span class="lobby__team-count">' + (state.players && state.players.blue ? state.players.blue.length : 0) + ' OPERATIVES</span></div>' +
            '<div class="lobby__roles">' +
              '<button class="lobby__role-btn ' + (state.blueSpymaster ? 'lobby__role-btn--filled' : '') + '" data-team="blue" data-role="spymaster"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg><span>SPYMASTER</span></button>' +
              '<button class="lobby__role-btn ' + (state.blueOperative ? 'lobby__role-btn--filled' : '') + '" data-team="blue" data-role="operative"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><span>OPERATIVE</span></button>' +
            '</div>' +
            '<div class="lobby__player-list">' + bluePlayersList + '</div>' +
          '</div>' +
          '<div class="lobby__team lobby__team--red">' +
            '<div class="lobby__team-header lobby__team-header--red"><h2 class="lobby__team-title">INFILTRATION RED</h2><span class="lobby__team-count">' + (state.players && state.players.red ? state.players.red.length : 0) + ' OPERATIVES</span></div>' +
            '<div class="lobby__roles">' +
              '<button class="lobby__role-btn lobby__role-btn--red ' + (state.redSpymaster ? 'lobby__role-btn--filled' : '') + '" data-team="red" data-role="spymaster"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg><span>SPYMASTER</span></button>' +
              '<button class="lobby__role-btn ' + (state.redOperative ? 'lobby__role-btn--filled' : '') + '" data-team="red" data-role="operative"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><span>OPERATIVE</span></button>' +
            '</div>' +
            '<div class="lobby__player-list">' + redPlayersList + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="lobby__bottom">' +
          '<button class="btn btn--primary btn--lg btn--center" id="btn-start-mission">INITIATE MISSION START</button>' +
          '<div class="lobby__modes"><span class="lobby__modes-label">WORD PACK</span><div class="lobby__mode-options"><button class="lobby__mode-btn lobby__mode-btn--active" data-pack="standard">Standard Operations</button><button class="lobby__mode-btn" data-pack="terminal">EN-US Terminal</button><button class="lobby__mode-btn" data-pack="espionage">Espionage Classics</button></div></div>' +
        '</div>' +
      '</div>' +
    '</main>' +
    '<footer class="footer"><span class="footer__copy">© 2026 TACTICAL INTELLIGENCE BEYOND REDACTION</span><div class="footer__links"><a href="#" class="footer__link">Terms of Engagement</a><a href="#" class="footer__link">Privacy Protocol</a><a href="#" class="footer__link">Source Code</a></div></footer>' +
  '</div>';
}

function renderGameScreen(state) {
  var isBlue = state.currentTeam === CARD_TYPE.BLUE;
  var teamName = isBlue ? "BLUE TEAM'S TURN" : "RED TEAM'S TURN";
  var teamClass = isBlue ? 'blue' : 'red';

  var cardsHtml = state.cards.map(function(card, index) {
    var cardClass = 'card';
    var typeLabel = '';
    if (card.revealed) {
      cardClass += ' card--' + card.type;
      typeLabel = card.type === CARD_TYPE.BYSTANDER ? 'BYSTANDER' :
                  card.type === CARD_TYPE.ASSASSIN ? 'REDACTED' :
                  card.type === CARD_TYPE.BLUE ? 'BLUE OPS' : 'RED OPS';
    } else if (state.spymasterView) {
      cardClass += ' card--spy-' + card.type;
    }
    var dotIndicator = (!card.revealed && state.spymasterView && card.type === CARD_TYPE.ASSASSIN)
      ? '<span class="card__assassin-dot"></span>' : '';
    return '<button class="board__cell ' + cardClass + '" data-index="' + index + '"' + (card.revealed ? ' disabled' : '') + '>' +
      (card.revealed ? '<span class="card__type-label">' + typeLabel + '</span>' : '') +
      '<span class="card__word">' + card.word + '</span>' +
      dotIndicator +
    '</button>';
  }).join('');

  var clueSection;
  if (state.currentClue) {
    clueSection = '<div class="transmission__clue">' +
      '<span class="transmission__clue-word">' + state.currentClue.word + '</span>' +
      '<span class="transmission__clue-detail">QUANTITY: <strong>' + String(state.currentClue.number).padStart(2, '0') + '</strong></span>' +
    '</div><p class="transmission__status">⏱ Awaiting decryption...</p>';
  } else {
    clueSection = '<div class="transmission__input-area">' +
      '<p class="transmission__prompt">Enter your clue for the operatives:</p>' +
      '<input type="text" class="input" id="input-clue-word" placeholder="CLUE WORD" autocomplete="off">' +
      '<input type="number" class="input" id="input-clue-number" placeholder="NUMBER" min="0" max="9" autocomplete="off">' +
      '<button class="btn btn--primary btn--full" id="btn-submit-clue">TRANSMIT CLUE</button>' +
    '</div>';
  }

  var cluesLogHtml = state.clues.map(function(clue) {
    var wordsChips = (clue.guessedWords || []).map(function(w) {
      return '<span class="comms-log__chip comms-log__chip--' + w.type + '">' + w.word + '</span>';
    }).join('');
    return '<div class="comms-log__entry comms-log__entry--' + clue.team + '">' +
      '<span class="comms-log__entry-team">' + (clue.team === CARD_TYPE.BLUE ? 'BLUE COMMS' : 'RED COMMS') + '</span>' +
      '<span class="comms-log__entry-clue">Clue: ' + clue.word + ' (' + clue.number + ')</span>' +
      '<div class="comms-log__entry-words">' + wordsChips + '</div>' +
    '</div>';
  }).join('');
  if (state.clues.length === 0) cluesLogHtml = '<p class="comms-log__empty">No transmissions yet.</p>';

  return '<div class="screen screen--game" id="screen-game">' +
    '<header class="nav">' +
      '<div class="nav__logo">TACTICAL INTELLIGENCE</div>' +
      '<nav class="nav__links"><a href="#" class="nav__link" data-nav="lobby">LOBBY</a><a href="#" class="nav__link nav__link--active" data-nav="intel">INTEL</a><a href="#" class="nav__link" data-nav="rules">RULES</a></nav>' +
      '<div class="nav__actions">' +
        '<button class="nav__icon-btn" aria-label="Help"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></button>' +
        '<button class="nav__icon-btn" aria-label="Settings"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button>' +
        '<button class="btn btn--primary btn--sm" id="btn-new-game-game">NEW GAME</button>' +
      '</div>' +
    '</header>' +
    '<main class="game">' +
      '<aside class="game__sidebar">' +
        '<div class="game__user"><div class="game__user-avatar game__user-avatar--' + teamClass + '"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><div class="game__user-info"><span class="game__user-name">OPERATIVE_07</span><span class="game__user-id">ID: #AX-9921</span></div></div>' +
        '<nav class="game__sidebar-nav">' +
          '<a href="#" class="game__sidebar-link game__sidebar-link--active"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg> OPERATIONS LOG</a>' +
          '<a href="#" class="game__sidebar-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> PERSONNEL</a>' +
          '<a href="#" class="game__sidebar-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> BRIEFING</a>' +
          '<a href="#" class="game__sidebar-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 9 8 12 2 12"/></svg> INTERCEPTS</a>' +
        '</nav>' +
        '<button class="btn btn--ghost btn--danger btn--full" id="btn-abort-game">ABORT MISSION</button>' +
      '</aside>' +
      '<div class="game__center">' +
        '<div class="game__turn-bar game__turn-bar--' + teamClass + '">' +
          '<div class="game__turn-info"><span class="game__turn-label">PRIORITY STATUS</span><span class="game__turn-team">' + teamName + '</span></div>' +
          '<div class="game__scores">' +
            '<div class="game__score game__score--red"><span class="game__score-label">Red Ops</span><span class="game__score-value">' + String(state.redTotal - state.redRemaining).padStart(2, '0') + '</span></div>' +
            '<div class="game__score game__score--blue"><span class="game__score-label">Blue Ops</span><span class="game__score-value">' + String(state.blueTotal - state.blueRemaining).padStart(2, '0') + '</span></div>' +
          '</div>' +
          '<button class="btn btn--ghost btn--sm" id="btn-toggle-spymaster"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg> ' + (state.spymasterView ? 'OPERATIVE VIEW' : 'TRANSMITTING CLUE') + '</button>' +
        '</div>' +
        '<div class="board" id="game-board">' + cardsHtml + '</div>' +
        '<div class="game__actions">' +
          '<button class="btn btn--ghost btn--sm" id="btn-pass-turn"' + (!state.currentClue ? ' disabled' : '') + '>PASS TURN</button>' +
          '<button class="btn btn--primary btn--sm" id="btn-confirm-intel"' + (!state.currentClue ? ' disabled' : '') + '>CONFIRM INTEL</button>' +
        '</div>' +
      '</div>' +
      '<aside class="game__panel">' +
        '<div class="transmission"><span class="transmission__label">RECEIVED TRANSMISSION</span>' + clueSection + '</div>' +
        '<div class="comms-log"><span class="comms-log__title">COMMUNICATIONS LOG</span><div class="comms-log__list">' + cluesLogHtml + '</div></div>' +
        '<div class="game__meta">' +
          '<div class="game__meta-item"><span class="game__meta-label">GAME ID</span><span class="game__meta-value">#' + (state.gameId || 'UNKNOWN') + '</span></div>' +
          '<div class="game__meta-item"><span class="game__meta-label">PLAYED BY</span><span class="game__meta-value game__meta-value--' + teamClass + '">' + (isBlue ? 'BLUE OPERATIONS' : 'RED OPERATIONS') + '</span></div>' +
          '<div class="game__meta-item"><span class="game__meta-label">STATUS</span><span class="game__meta-value">ACTIVE_ENGAGEMENT</span></div>' +
        '</div>' +
      '</aside>' +
    '</main>' +
    '<footer class="footer"><span class="footer__copy">© 2026 TACTICAL INTELLIGENCE BEYOND REDACTION</span><div class="footer__links"><a href="#" class="footer__link">Terms of Engagement</a><a href="#" class="footer__link">Privacy Protocol</a><a href="#" class="footer__link">Source Code</a></div></footer>' +
  '</div>';
}

function renderGameOverScreen(state, stats) {
  var isBlue = state.winner === CARD_TYPE.BLUE;
  var winnerClass = isBlue ? 'blue' : 'red';
  var winnerName = isBlue ? 'BLUE TEAM' : 'RED TEAM';

  var bgCards = state.cards.map(function(card) {
    var bgClass = 'bg-card';
    if (card.revealed) bgClass += ' bg-card--' + card.type;
    else bgClass += ' bg-card--unrevealed';
    return '<div class="' + bgClass + '"></div>';
  }).join('');

  var progressDots = '';
  for (var i = 0; i < 9; i++) {
    progressDots += '<div class="gameover__progress-dot ' + (i < parseInt(stats.winnerFound) ? 'gameover__progress-dot--filled' : '') + '"></div>';
  }

  return '<div class="screen screen--gameover" id="screen-gameover">' +
    '<header class="nav">' +
      '<div class="nav__logo">TACTICAL INTELLIGENCE</div>' +
      '<nav class="nav__links"><a href="#" class="nav__link" data-nav="lobby">LOBBY</a><a href="#" class="nav__link" data-nav="intel">INTEL</a><a href="#" class="nav__link" data-nav="rules">RULES</a></nav>' +
      '<div class="nav__actions">' +
        '<button class="nav__icon-btn" aria-label="Settings"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button>' +
        '<button class="nav__icon-btn" aria-label="Help"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></button>' +
      '</div>' +
    '</header>' +
    '<main class="gameover">' +
      '<div class="gameover__bg-board">' + bgCards + '</div>' +
      '<div class="gameover__overlay"></div>' +
      '<div class="gameover__content">' +
        '<div class="gameover__result gameover__result--' + winnerClass + '">' +
          '<div class="gameover__result-accent"></div>' +
          '<div class="gameover__result-body">' +
            '<span class="gameover__mission-label"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> MISSION ACCOMPLISHED</span>' +
            '<h1 class="gameover__winner">' + winnerName + '<br><span class="gameover__winner-accent">WINS!</span></h1>' +
            '<div class="gameover__buttons">' +
              '<button class="btn btn--primary" id="btn-play-again"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg> PLAY AGAIN</button>' +
              '<button class="btn btn--ghost" id="btn-back-to-lobby"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> BACK TO LOBBY</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="gameover__stats">' +
          '<div class="gameover__stat-card"><span class="gameover__stat-label">DURATION</span><span class="gameover__stat-value">' + stats.duration + '</span></div>' +
          '<div class="gameover__stat-card"><span class="gameover__stat-label">ASSET RECOVERY</span><div class="gameover__stat-recovery"><span class="gameover__stat-value">' + stats.winnerFound + '</span><span class="gameover__stat-sub">CARDS FOUND</span></div><div class="gameover__progress">' + progressDots + '</div></div>' +
          '<div class="gameover__agent-card gameover__agent-card--' + winnerClass + '"><span class="gameover__agent-label">TOP FIELD AGENT</span><div class="gameover__agent-info"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span class="gameover__agent-name">OPERATIVE_07</span></div></div>' +
        '</div>' +
      '</div>' +
    '</main>' +
    '<footer class="footer"><span class="footer__copy">© 2026 TACTICAL INTELLIGENCE BEYOND REDACTION</span><div class="footer__links"><a href="#" class="footer__link">Terms of Engagement</a><a href="#" class="footer__link">Privacy Protocol</a><a href="#" class="footer__link">Source Code</a></div></footer>' +
  '</div>';
}

// --- APP CONTROLLER ---
var currentScreen = 'home';
var gameState = null;

function generateMissionCode() {
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var nums = '0123456789';
  var code = '#';
  for (var i = 0; i < 2; i++) code += letters[Math.floor(Math.random() * 26)];
  code += '-';
  for (var i = 0; i < 4; i++) code += nums[Math.floor(Math.random() * 10)];
  code += '-ALPHA';
  return code;
}

function generateGameId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

var lobbyState = {
  missionCode: generateMissionCode(),
  players: { blue: [], red: [] },
  blueSpymaster: false, blueOperative: false,
  redSpymaster: false, redOperative: false,
  teamsBalanced: true
};

var app;

function navigateTo(screen) {
  currentScreen = screen;
  render();
}

function render() {
  if (!app) app = document.getElementById('app');
  switch (currentScreen) {
    case 'home': app.innerHTML = renderHomeScreen(); bindHomeEvents(); break;
    case 'lobby': app.innerHTML = renderLobbyScreen(lobbyState); bindLobbyEvents(); break;
    case 'game': app.innerHTML = renderGameScreen(gameState); bindGameEvents(); break;
    case 'gameover':
      var stats = getGameStats(gameState);
      app.innerHTML = renderGameOverScreen(gameState, stats);
      bindGameOverEvents();
      break;
  }
}

function bindHomeEvents() {
  var btnCreate = document.getElementById('btn-create-game');
  if (btnCreate) btnCreate.addEventListener('click', function() {
    lobbyState.missionCode = generateMissionCode();
    lobbyState.players = {
      blue: [{ name: 'COMMANDER_VICTOR', role: 'operative' }],
      red: [{ name: 'RED_PHANTOM', role: 'operative' }]
    };
    lobbyState.blueOperative = true;
    lobbyState.redOperative = true;
    navigateTo('lobby');
  });

  var btnNewNav = document.getElementById('btn-new-game-nav');
  if (btnNewNav) btnNewNav.addEventListener('click', function() {
    lobbyState.missionCode = generateMissionCode();
    navigateTo('lobby');
  });

  var btnJoin = document.getElementById('btn-join-game');
  if (btnJoin) btnJoin.addEventListener('click', function() {
    var code = document.getElementById('input-game-code');
    if (code && code.value.length >= 4) {
      lobbyState.missionCode = code.value.toUpperCase();
      lobbyState.players = {
        blue: [{ name: 'AGENT_27 (YOU)', role: 'operative' }],
        red: [{ name: 'GHOST_TRAIL', role: 'operative' }]
      };
      navigateTo('lobby');
    }
  });

  bindNavLinks();
}

function bindLobbyEvents() {
  var roleButtons = document.querySelectorAll('.lobby__role-btn');
  roleButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var team = btn.getAttribute('data-team');
      var role = btn.getAttribute('data-role');
      if (role === 'spymaster') {
        if (team === 'blue') {
          lobbyState.blueSpymaster = !lobbyState.blueSpymaster;
          if (lobbyState.blueSpymaster && !lobbyState.players.blue.find(function(p) { return p.role === 'spymaster'; })) {
            lobbyState.players.blue.unshift({ name: 'NEO_WALKER', role: 'spymaster' });
          }
        } else {
          lobbyState.redSpymaster = !lobbyState.redSpymaster;
          if (lobbyState.redSpymaster && !lobbyState.players.red.find(function(p) { return p.role === 'spymaster'; })) {
            lobbyState.players.red.unshift({ name: 'SHADOW_MARK', role: 'spymaster' });
          }
        }
      }
      render();
    });
  });

  var btnStart = document.getElementById('btn-start-mission');
  if (btnStart) btnStart.addEventListener('click', function() { startGame(); });

  var btnAbort = document.getElementById('btn-abort-lobby');
  if (btnAbort) btnAbort.addEventListener('click', function() { navigateTo('home'); });

  var btnNew = document.getElementById('btn-new-game-lobby');
  if (btnNew) btnNew.addEventListener('click', function() { lobbyState.missionCode = generateMissionCode(); render(); });

  document.querySelectorAll('.lobby__mode-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.lobby__mode-btn').forEach(function(b) { b.classList.remove('lobby__mode-btn--active'); });
      btn.classList.add('lobby__mode-btn--active');
    });
  });

  bindNavLinks();
}

function bindGameEvents() {
  document.querySelectorAll('.board__cell').forEach(function(cell) {
    cell.addEventListener('click', function() {
      if (!gameState.currentClue && !gameState.spymasterView) return;
      if (gameState.spymasterView) return;
      var index = parseInt(cell.getAttribute('data-index'));
      var result = revealCard(gameState, index);
      gameState = result.state;
      if (gameState.currentClue) {
        var card = gameState.cards[index];
        gameState.currentClue.guessedWords = gameState.currentClue.guessedWords || [];
        gameState.currentClue.guessedWords.push({ word: card.word, type: card.type });
      }
      if (result.result === 'assassin' || result.result === 'win') {
        setTimeout(function() { navigateTo('gameover'); }, 800);
      } else if (result.result === 'wrong' || result.result === 'correct_last') {
        setTimeout(function() { endTurn(gameState); render(); }, 600);
      } else {
        render();
      }
    });
  });

  var btnSubmitClue = document.getElementById('btn-submit-clue');
  if (btnSubmitClue) btnSubmitClue.addEventListener('click', function() {
    var wordEl = document.getElementById('input-clue-word');
    var numEl = document.getElementById('input-clue-number');
    var word = wordEl ? wordEl.value.trim() : '';
    var number = numEl ? numEl.value : '';
    if (word && number !== '') {
      gameState = submitClue(gameState, word, number);
      gameState.spymasterView = false;
      render();
    }
  });

  var clueNumInput = document.getElementById('input-clue-number');
  if (clueNumInput) clueNumInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { var btn = document.getElementById('btn-submit-clue'); if (btn) btn.click(); }
  });
  var clueWordInput = document.getElementById('input-clue-word');
  if (clueWordInput) clueWordInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { var n = document.getElementById('input-clue-number'); if (n) n.focus(); }
  });

  var btnToggle = document.getElementById('btn-toggle-spymaster');
  if (btnToggle) btnToggle.addEventListener('click', function() {
    gameState.spymasterView = !gameState.spymasterView;
    render();
  });

  var btnPass = document.getElementById('btn-pass-turn');
  if (btnPass) btnPass.addEventListener('click', function() {
    endTurn(gameState);
    gameState.spymasterView = true;
    render();
  });

  var btnConfirm = document.getElementById('btn-confirm-intel');
  if (btnConfirm) btnConfirm.addEventListener('click', function() {
    endTurn(gameState);
    gameState.spymasterView = true;
    render();
  });

  var btnAbort = document.getElementById('btn-abort-game');
  if (btnAbort) btnAbort.addEventListener('click', function() {
    if (confirm('Are you sure you want to abort the mission?')) navigateTo('home');
  });

  var btnNew = document.getElementById('btn-new-game-game');
  if (btnNew) btnNew.addEventListener('click', function() {
    if (confirm('Start a new game? Current progress will be lost.')) startGame();
  });

  bindNavLinks();
}

function bindGameOverEvents() {
  var btnPlay = document.getElementById('btn-play-again');
  if (btnPlay) btnPlay.addEventListener('click', function() { startGame(); });

  var btnBack = document.getElementById('btn-back-to-lobby');
  if (btnBack) btnBack.addEventListener('click', function() { navigateTo('lobby'); });

  bindNavLinks();
}

function bindNavLinks() {
  document.querySelectorAll('[data-nav]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var target = link.getAttribute('data-nav');
      if (target === 'lobby') navigateTo('lobby');
      else if (target === 'intel' && gameState) navigateTo('game');
    });
  });
}

function startGame() {
  gameState = createGameState(lobbyState.players);
  gameState.gameId = generateGameId();
  gameState.spymasterView = true;
  navigateTo('game');
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', function() {
  app = document.getElementById('app');
  render();
});
