import { CARD_TYPE } from './game.js';

// Screen rendering functions
export function renderHomeScreen() {
  return `
    <div class="screen screen--home" id="screen-home">
      <header class="nav">
        <div class="nav__logo">TACTICAL INTELLIGENCE</div>
        <nav class="nav__links">
          <a href="#" class="nav__link" data-nav="lobby">Lobby</a>
          <a href="#" class="nav__link" data-nav="intel">Intel</a>
          <a href="#" class="nav__link" data-nav="rules">Rules</a>
        </nav>
        <div class="nav__actions">
          <button class="nav__icon-btn" id="btn-help" aria-label="Help">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>
          <button class="nav__icon-btn" id="btn-settings" aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </button>
          <button class="btn btn--primary btn--sm" id="btn-new-game-nav">NEW GAME</button>
        </div>
      </header>

      <main class="home">
        <div class="home__stamp">REDACTED</div>
        <div class="home__hero">
          <h1 class="home__title">CODENAMES <span class="home__title--accent">ONLINE</span></h1>
          <p class="home__subtitle">SYMMETRIC INTELLIGENCE PROTOCOL // V4.0.2</p>
        </div>

        <div class="home__actions">
          <div class="home__card home__card--create">
            <div class="home__card-icon home__card-icon--blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            </div>
            <h2 class="home__card-title">INITIATE OPERATION</h2>
            <p class="home__card-desc">Start a new high-security session. You will be assigned as the primary operative lead.</p>
            <button class="btn btn--primary btn--full" id="btn-create-game">CREATE NEW GAME</button>
          </div>

          <div class="home__card home__card--join">
            <div class="home__card-icon home__card-icon--red">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
            </div>
            <h2 class="home__card-title">JOIN INTELLIGENCE</h2>
            <p class="home__card-desc">Enter the secure mission code provided by your operative lead to infiltrate the board.</p>
            <input type="text" class="input" id="input-game-code" placeholder="ENTER 6-DIGIT CODE" maxlength="6" autocomplete="off">
            <button class="btn btn--dark btn--full" id="btn-join-game">INFILTRATE SESSION</button>
          </div>
        </div>

        <div class="home__stats">
          <div class="home__stat">
            <span class="home__stat-label">ACTIVE AGENTS</span>
            <span class="home__stat-value">14,209</span>
          </div>
          <div class="home__stat">
            <span class="home__stat-label">MISSIONS RESOLVED</span>
            <span class="home__stat-value">2.4M</span>
          </div>
          <div class="home__stat">
            <span class="home__stat-label">SERVER STATUS</span>
            <span class="home__stat-value home__stat-value--online">● ONLINE</span>
          </div>
          <div class="home__stat">
            <span class="home__stat-label">SECURITY LEVEL</span>
            <span class="home__stat-value">ALPHA-7</span>
          </div>
        </div>
      </main>

      <footer class="footer">
        <div class="footer__left">
          <div class="footer__stamp">CLASSIFIED DOCUMENT</div>
          <span class="footer__copy">© 2026 TACTICAL INTELLIGENCE BEYOND REDACTION</span>
        </div>
        <div class="footer__links">
          <a href="#" class="footer__link">Terms of Engagement</a>
          <a href="#" class="footer__link">Privacy Protocol</a>
          <a href="#" class="footer__link">Source Code</a>
        </div>
      </footer>
    </div>
  `;
}

export function renderLobbyScreen(state) {
  const missionCode = state.missionCode || 'AX-9921-ALPHA';
  
  const renderPlayerSlot = (player, role, team) => {
    if (player) {
      return `<div class="lobby__player">
        <span class="lobby__player-icon">👤</span>
        <span class="lobby__player-name">${player.name}</span>
        <span class="lobby__player-badge lobby__player-badge--${role}">${role.toUpperCase()}</span>
      </div>`;
    }
    return `<div class="lobby__player lobby__player--empty" data-team="${team}" data-role="${role}">
      <span class="lobby__player-placeholder">+ JOIN AS ${role.toUpperCase()}</span>
    </div>`;
  };

  return `
    <div class="screen screen--lobby" id="screen-lobby">
      <header class="nav">
        <div class="nav__logo">TACTICAL INTELLIGENCE</div>
        <nav class="nav__links">
          <a href="#" class="nav__link nav__link--active" data-nav="lobby">Lobby</a>
          <a href="#" class="nav__link" data-nav="intel">Intel</a>
          <a href="#" class="nav__link" data-nav="rules">Rules</a>
        </nav>
        <div class="nav__actions">
          <div class="nav__mission-code">
            <span class="nav__mission-label">MISSION ACCESS CODE</span>
            <span class="nav__mission-value">${missionCode}</span>
          </div>
          <button class="nav__icon-btn" id="btn-settings-lobby" aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </button>
          <button class="nav__icon-btn" id="btn-help-lobby" aria-label="Help">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>
          <button class="btn btn--primary btn--sm" id="btn-new-game-lobby">NEW GAME</button>
        </div>
      </header>

      <main class="lobby">
        <div class="lobby__sidebar">
          <div class="lobby__user">
            <div class="lobby__user-avatar">👤</div>
            <div class="lobby__user-info">
              <span class="lobby__user-name">OPERATIVE_07</span>
              <span class="lobby__user-id">ID: #AX-9921</span>
            </div>
          </div>
          <nav class="lobby__nav">
            <a href="#" class="lobby__nav-item lobby__nav-item--active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              PERSONNEL
            </a>
            <a href="#" class="lobby__nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              OPERATIONS LOG
            </a>
            <a href="#" class="lobby__nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              BRIEFING
            </a>
            <a href="#" class="lobby__nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 9 8 12 2 12"/></svg>
              INTERCEPTS
            </a>
          </nav>
          <button class="btn btn--ghost btn--danger btn--full" id="btn-abort-lobby">ABORT MISSION</button>
        </div>

        <div class="lobby__main">
          <div class="lobby__header">
            <h1 class="lobby__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
              MISSION PREPARATION LOBBY
            </h1>
            <p class="lobby__desc">Awaiting operative synchronization. Teams must be balanced before initiating the decryption sequence.</p>
          </div>

          <div class="lobby__teams">
            <div class="lobby__team lobby__team--blue">
              <div class="lobby__team-header lobby__team-header--blue">
                <h2 class="lobby__team-title">INTELLIGENCE BLUE</h2>
                <span class="lobby__team-count">${state.players?.blue?.length || 0} OPERATIVES</span>
              </div>
              <div class="lobby__roles">
                <button class="lobby__role-btn ${state.blueSpymaster ? 'lobby__role-btn--filled' : ''}" data-team="blue" data-role="spymaster">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>SPYMASTER</span>
                </button>
                <button class="lobby__role-btn ${state.blueOperative ? 'lobby__role-btn--filled' : ''}" data-team="blue" data-role="operative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  <span>OPERATIVE</span>
                </button>
              </div>
              <div class="lobby__player-list" id="blue-player-list">
                ${(state.players?.blue || []).map(p => renderPlayerSlot(p, p.role, 'blue')).join('')}
              </div>
            </div>

            <div class="lobby__team lobby__team--red">
              <div class="lobby__team-header lobby__team-header--red">
                <h2 class="lobby__team-title">INFILTRATION RED</h2>
                <span class="lobby__team-count">${state.players?.red?.length || 0} OPERATIVES</span>
              </div>
              <div class="lobby__roles">
                <button class="lobby__role-btn lobby__role-btn--red ${state.redSpymaster ? 'lobby__role-btn--filled' : ''}" data-team="red" data-role="spymaster">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>SPYMASTER</span>
                </button>
                <button class="lobby__role-btn ${state.redOperative ? 'lobby__role-btn--filled' : ''}" data-team="red" data-role="operative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  <span>OPERATIVE</span>
                </button>
              </div>
              <div class="lobby__player-list" id="red-player-list">
                ${(state.players?.red || []).map(p => renderPlayerSlot(p, p.role, 'red')).join('')}
              </div>
            </div>
          </div>

          <div class="lobby__bottom">
            <div class="lobby__warning ${state.teamsBalanced === false ? 'lobby__warning--show' : 'lobby__warning--hidden'}" id="lobby-warning">
              <span class="lobby__warning-label">SYSTEM / MISSION STATUS / ALERT</span>
              <span class="lobby__warning-text">⚠ UNBALANCED TEAMS DETECTED</span>
            </div>
            <button class="btn btn--primary btn--lg btn--center" id="btn-start-mission">INITIATE MISSION START</button>
            <div class="lobby__modes">
              <span class="lobby__modes-label">WORD PACK</span>
              <div class="lobby__mode-options">
                <button class="lobby__mode-btn lobby__mode-btn--active" data-pack="standard">Standard Operations</button>
                <button class="lobby__mode-btn" data-pack="terminal">EN-US Terminal</button>
                <button class="lobby__mode-btn" data-pack="espionage">Espionage Classics</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="footer">
        <span class="footer__copy">© 2026 TACTICAL INTELLIGENCE BEYOND REDACTION</span>
        <div class="footer__links">
          <a href="#" class="footer__link">Terms of Engagement</a>
          <a href="#" class="footer__link">Privacy Protocol</a>
          <a href="#" class="footer__link">Source Code</a>
        </div>
      </footer>
    </div>
  `;
}

export function renderGameScreen(state) {
  const isBlue = state.currentTeam === CARD_TYPE.BLUE;
  const teamName = isBlue ? "BLUE TEAM'S TURN" : "RED TEAM'S TURN";
  const teamClass = isBlue ? 'blue' : 'red';

  const renderCard = (card, index) => {
    let cardClass = 'card';
    let typeLabel = '';
    if (card.revealed) {
      cardClass += ` card--${card.type}`;
      typeLabel = card.type === CARD_TYPE.BYSTANDER ? 'BYSTANDER' : 
                  card.type === CARD_TYPE.ASSASSIN ? 'REDACTED' : 
                  card.type === CARD_TYPE.BLUE ? 'BLUE OPS' : 'RED OPS';
    } else if (state.spymasterView) {
      cardClass += ` card--spy-${card.type}`;
    }
    
    const dotIndicator = (!card.revealed && state.spymasterView && card.type === CARD_TYPE.ASSASSIN) 
      ? '<span class="card__assassin-dot"></span>' : '';
    
    return `<button class="board__cell ${cardClass}" data-index="${index}" ${card.revealed ? 'disabled' : ''}>
      ${card.revealed ? `<span class="card__type-label">${typeLabel}</span>` : ''}
      <span class="card__word">${card.word}</span>
      ${dotIndicator}
    </button>`;
  };

  const clueSection = state.currentClue 
    ? `<div class="transmission__clue">
        <span class="transmission__clue-word">${state.currentClue.word}</span>
        <span class="transmission__clue-detail">QUANTITY: <strong>${String(state.currentClue.number).padStart(2, '0')}</strong></span>
      </div>
      <p class="transmission__status">⏱ Awaiting decryption... <span id="turn-timer">0s</span></p>`
    : `<div class="transmission__input-area">
        <p class="transmission__prompt">Enter your clue for the operatives:</p>
        <input type="text" class="input" id="input-clue-word" placeholder="CLUE WORD" autocomplete="off">
        <input type="number" class="input" id="input-clue-number" placeholder="NUMBER" min="0" max="9" autocomplete="off">
        <button class="btn btn--primary btn--full" id="btn-submit-clue">TRANSMIT CLUE</button>
      </div>`;

  return `
    <div class="screen screen--game" id="screen-game">
      <header class="nav">
        <div class="nav__logo">TACTICAL INTELLIGENCE</div>
        <nav class="nav__links">
          <a href="#" class="nav__link" data-nav="lobby">LOBBY</a>
          <a href="#" class="nav__link nav__link--active" data-nav="intel">INTEL</a>
          <a href="#" class="nav__link" data-nav="rules">RULES</a>
        </nav>
        <div class="nav__actions">
          <button class="nav__icon-btn" id="btn-help-game" aria-label="Help">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>
          <button class="nav__icon-btn" id="btn-settings-game" aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </button>
          <button class="btn btn--primary btn--sm" id="btn-new-game-game">NEW GAME</button>
        </div>
      </header>

      <main class="game">
        <aside class="game__sidebar">
          <div class="game__user">
            <div class="game__user-avatar game__user-avatar--${teamClass}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div class="game__user-info">
              <span class="game__user-name">OPERATIVE_07</span>
              <span class="game__user-id">ID: #AX-9921</span>
            </div>
          </div>
          <nav class="game__sidebar-nav">
            <a href="#" class="game__sidebar-link game__sidebar-link--active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
              OPERATIONS LOG
            </a>
            <a href="#" class="game__sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              PERSONNEL
            </a>
            <a href="#" class="game__sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              BRIEFING
            </a>
            <a href="#" class="game__sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 9 8 12 2 12"/></svg>
              INTERCEPTS
            </a>
          </nav>
          <button class="btn btn--ghost btn--danger btn--full" id="btn-abort-game">ABORT MISSION</button>
        </aside>

        <div class="game__center">
          <div class="game__turn-bar game__turn-bar--${teamClass}">
            <div class="game__turn-info">
              <span class="game__turn-label">PRIORITY STATUS</span>
              <span class="game__turn-team">${teamName}</span>
            </div>
            <div class="game__scores">
              <div class="game__score game__score--red">
                <span class="game__score-label">Red Ops</span>
                <span class="game__score-value">${String(state.redTotal - state.redRemaining).padStart(2, '0')}</span>
              </div>
              <div class="game__score game__score--blue">
                <span class="game__score-label">Blue Ops</span>
                <span class="game__score-value">${String(state.blueTotal - state.blueRemaining).padStart(2, '0')}</span>
              </div>
            </div>
            <button class="btn btn--ghost btn--sm" id="btn-toggle-spymaster">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
              ${state.spymasterView ? 'OPERATIVE VIEW' : 'TRANSMITTING CLUE'}
            </button>
          </div>

          <div class="board" id="game-board">
            ${state.cards.map((card, i) => renderCard(card, i)).join('')}
          </div>

          <div class="game__actions">
            <button class="btn btn--ghost btn--sm" id="btn-pass-turn" ${!state.currentClue ? 'disabled' : ''}>PASS TURN</button>
            <button class="btn btn--primary btn--sm" id="btn-confirm-intel" ${!state.currentClue ? 'disabled' : ''}>CONFIRM INTEL</button>
          </div>
        </div>

        <aside class="game__panel">
          <div class="transmission">
            <span class="transmission__label">RECEIVED TRANSMISSION</span>
            ${clueSection}
          </div>

          <div class="comms-log">
            <span class="comms-log__title">COMMUNICATIONS LOG</span>
            <div class="comms-log__list" id="comms-log-list">
              ${state.clues.map(clue => `
                <div class="comms-log__entry comms-log__entry--${clue.team}">
                  <span class="comms-log__entry-team">${clue.team === CARD_TYPE.BLUE ? 'BLUE COMMS' : 'RED COMMS'}</span>
                  <span class="comms-log__entry-clue">Clue: ${clue.word} (${clue.number})</span>
                  <div class="comms-log__entry-words">
                    ${(clue.guessedWords || []).map(w => `<span class="comms-log__chip comms-log__chip--${w.type}">${w.word}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
              ${state.clues.length === 0 ? '<p class="comms-log__empty">No transmissions yet.</p>' : ''}
            </div>
          </div>

          <div class="game__meta">
            <div class="game__meta-item">
              <span class="game__meta-label">GAME ID</span>
              <span class="game__meta-value">#${state.gameId || 'UNKNOWN'}</span>
            </div>
            <div class="game__meta-item">
              <span class="game__meta-label">PLAYED BY</span>
              <span class="game__meta-value game__meta-value--${teamClass}">${isBlue ? 'BLUE OPERATIONS' : 'RED OPERATIONS'}</span>
            </div>
            <div class="game__meta-item">
              <span class="game__meta-label">STATUS</span>
              <span class="game__meta-value">ACTIVE_ENGAGEMENT</span>
            </div>
          </div>
        </aside>
      </main>

      <footer class="footer">
        <span class="footer__copy">© 2026 TACTICAL INTELLIGENCE BEYOND REDACTION</span>
        <div class="footer__links">
          <a href="#" class="footer__link">Terms of Engagement</a>
          <a href="#" class="footer__link">Privacy Protocol</a>
          <a href="#" class="footer__link">Source Code</a>
        </div>
      </footer>
    </div>
  `;
}

export function renderGameOverScreen(state, stats) {
  const isBlue = state.winner === CARD_TYPE.BLUE;
  const winnerClass = isBlue ? 'blue' : 'red';
  const winnerName = isBlue ? 'BLUE TEAM' : 'RED TEAM';

  // Render blurred board in background
  const renderBgCard = (card) => {
    let bgClass = 'bg-card';
    if (card.revealed) bgClass += ` bg-card--${card.type}`;
    else bgClass += ` bg-card--unrevealed`;
    return `<div class="${bgClass}"></div>`;
  };

  return `
    <div class="screen screen--gameover" id="screen-gameover">
      <header class="nav">
        <div class="nav__logo">TACTICAL INTELLIGENCE</div>
        <nav class="nav__links">
          <a href="#" class="nav__link" data-nav="lobby">LOBBY</a>
          <a href="#" class="nav__link" data-nav="intel">INTEL</a>
          <a href="#" class="nav__link" data-nav="rules">RULES</a>
        </nav>
        <div class="nav__actions">
          <button class="nav__icon-btn" id="btn-settings-over" aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </button>
          <button class="nav__icon-btn" id="btn-help-over" aria-label="Help">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>
        </div>
      </header>

      <main class="gameover">
        <div class="gameover__bg-board">
          ${state.cards.map(c => renderBgCard(c)).join('')}
        </div>

        <div class="gameover__overlay"></div>

        <div class="gameover__content">
          <div class="gameover__result gameover__result--${winnerClass}">
            <div class="gameover__result-accent"></div>
            <div class="gameover__result-body">
              <span class="gameover__mission-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                MISSION ACCOMPLISHED
              </span>
              <h1 class="gameover__winner">${winnerName}<br><span class="gameover__winner-accent">WINS!</span></h1>
              <div class="gameover__buttons">
                <button class="btn btn--primary" id="btn-play-again">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                  PLAY AGAIN
                </button>
                <button class="btn btn--ghost" id="btn-back-to-lobby">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  BACK TO LOBBY
                </button>
              </div>
            </div>
          </div>

          <div class="gameover__stats">
            <div class="gameover__stat-card">
              <span class="gameover__stat-label">DURATION</span>
              <span class="gameover__stat-value">${stats.duration}</span>
            </div>
            <div class="gameover__stat-card">
              <span class="gameover__stat-label">ASSET RECOVERY</span>
              <div class="gameover__stat-recovery">
                <span class="gameover__stat-value">${stats.winnerFound}</span>
                <span class="gameover__stat-sub">CARDS FOUND</span>
              </div>
              <div class="gameover__progress">
                ${Array.from({ length: 9 }, (_, i) => 
                  `<div class="gameover__progress-dot ${i < parseInt(stats.winnerFound) ? 'gameover__progress-dot--filled' : ''}"></div>`
                ).join('')}
              </div>
            </div>
            <div class="gameover__agent-card gameover__agent-card--${winnerClass}">
              <span class="gameover__agent-label">TOP FIELD AGENT</span>
              <div class="gameover__agent-info">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span class="gameover__agent-name">OPERATIVE_07</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="footer">
        <span class="footer__copy">© 2026 TACTICAL INTELLIGENCE BEYOND REDACTION</span>
        <div class="footer__links">
          <a href="#" class="footer__link">Terms of Engagement</a>
          <a href="#" class="footer__link">Privacy Protocol</a>
          <a href="#" class="footer__link">Source Code</a>
        </div>
      </footer>
    </div>
  `;
}
