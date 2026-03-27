import { createGameState, revealCard, submitClue, endTurn, getGameStats, CARD_TYPE } from './game.js';
import { renderHomeScreen, renderLobbyScreen, renderGameScreen, renderGameOverScreen } from './ui.js';

// App state
let currentScreen = 'home';
let gameState = null;
let lobbyState = {
  missionCode: generateMissionCode(),
  players: { blue: [], red: [] },
  blueSpymaster: false,
  blueOperative: false,
  redSpymaster: false,
  redOperative: false,
  teamsBalanced: true
};

const app = document.getElementById('app');

// Generate a random mission code
function generateMissionCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  let code = '#';
  for (let i = 0; i < 2; i++) code += letters[Math.floor(Math.random() * 26)];
  code += '-';
  for (let i = 0; i < 4; i++) code += nums[Math.floor(Math.random() * 10)];
  code += '-ALPHA';
  return code;
}

// Generate a game ID
function generateGameId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Navigate to screen
function navigateTo(screen) {
  currentScreen = screen;
  render();
}

// Render current screen
function render() {
  switch (currentScreen) {
    case 'home':
      app.innerHTML = renderHomeScreen();
      bindHomeEvents();
      break;
    case 'lobby':
      app.innerHTML = renderLobbyScreen(lobbyState);
      bindLobbyEvents();
      break;
    case 'game':
      app.innerHTML = renderGameScreen(gameState);
      bindGameEvents();
      break;
    case 'gameover':
      const stats = getGameStats(gameState);
      app.innerHTML = renderGameOverScreen(gameState, stats);
      bindGameOverEvents();
      break;
  }
}

// --- Event Bindings ---

function bindHomeEvents() {
  // Create new game
  document.getElementById('btn-create-game')?.addEventListener('click', () => {
    lobbyState = {
      ...lobbyState,
      missionCode: generateMissionCode(),
      players: {
        blue: [{ name: 'COMMANDER_VICTOR', role: 'operative' }],
        red: [{ name: 'RED_PHANTOM', role: 'operative' }]
      },
      blueSpymaster: false,
      blueOperative: true,
      redSpymaster: false,
      redOperative: true,
      teamsBalanced: true
    };
    navigateTo('lobby');
  });

  document.getElementById('btn-new-game-nav')?.addEventListener('click', () => {
    lobbyState.missionCode = generateMissionCode();
    navigateTo('lobby');
  });

  // Join game
  document.getElementById('btn-join-game')?.addEventListener('click', () => {
    const code = document.getElementById('input-game-code')?.value;
    if (code && code.length >= 4) {
      lobbyState.missionCode = code.toUpperCase();
      lobbyState.players = {
        blue: [{ name: 'AGENT_27 (YOU)', role: 'operative' }],
        red: [{ name: 'GHOST_TRAIL', role: 'operative' }]
      };
      navigateTo('lobby');
    }
  });

  // Nav links
  bindNavLinks();
}

function bindLobbyEvents() {
  // Role selection
  document.querySelectorAll('.lobby__role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const team = btn.dataset.team;
      const role = btn.dataset.role;
      
      if (role === 'spymaster') {
        if (team === 'blue') {
          lobbyState.blueSpymaster = !lobbyState.blueSpymaster;
          if (lobbyState.blueSpymaster && !lobbyState.players.blue.find(p => p.role === 'spymaster')) {
            lobbyState.players.blue.unshift({ name: 'NEO_WALKER', role: 'spymaster' });
          }
        } else {
          lobbyState.redSpymaster = !lobbyState.redSpymaster;
          if (lobbyState.redSpymaster && !lobbyState.players.red.find(p => p.role === 'spymaster')) {
            lobbyState.players.red.unshift({ name: 'SHADOW_MARK', role: 'spymaster' });
          }
        }
      }
      render();
    });
  });

  // Start game
  document.getElementById('btn-start-mission')?.addEventListener('click', () => {
    startGame();
  });

  // Abort
  document.getElementById('btn-abort-lobby')?.addEventListener('click', () => {
    navigateTo('home');
  });

  document.getElementById('btn-new-game-lobby')?.addEventListener('click', () => {
    lobbyState.missionCode = generateMissionCode();
    render();
  });

  // Word pack selection
  document.querySelectorAll('.lobby__mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lobby__mode-btn').forEach(b => b.classList.remove('lobby__mode-btn--active'));
      btn.classList.add('lobby__mode-btn--active');
    });
  });

  bindNavLinks();
}

function bindGameEvents() {
  // Card clicks
  document.querySelectorAll('.board__cell').forEach(cell => {
    cell.addEventListener('click', () => {
      if (!gameState.currentClue && !gameState.spymasterView) return;
      if (gameState.spymasterView) return; // Spymaster can't click

      const index = parseInt(cell.dataset.index);
      const { state, result } = revealCard(gameState, index);
      gameState = state;

      // Track guessed word in current clue
      if (gameState.currentClue) {
        const card = gameState.cards[index];
        gameState.currentClue.guessedWords = gameState.currentClue.guessedWords || [];
        gameState.currentClue.guessedWords.push({ word: card.word, type: card.type });
      }

      if (result === 'assassin' || result === 'win') {
        setTimeout(() => navigateTo('gameover'), 800);
      } else if (result === 'wrong' || result === 'correct_last') {
        setTimeout(() => {
          endTurn(gameState);
          render();
        }, 600);
      } else {
        render();
      }
    });
  });

  // Submit clue
  document.getElementById('btn-submit-clue')?.addEventListener('click', () => {
    const word = document.getElementById('input-clue-word')?.value?.trim();
    const number = document.getElementById('input-clue-number')?.value;
    if (word && number !== undefined && number !== '') {
      gameState = submitClue(gameState, word, number);
      gameState.spymasterView = false;
      render();
    }
  });

  // Also submit on Enter key
  document.getElementById('input-clue-number')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('btn-submit-clue')?.click();
    }
  });
  document.getElementById('input-clue-word')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('input-clue-number')?.focus();
    }
  });

  // Toggle spymaster view
  document.getElementById('btn-toggle-spymaster')?.addEventListener('click', () => {
    gameState.spymasterView = !gameState.spymasterView;
    render();
  });

  // Pass turn
  document.getElementById('btn-pass-turn')?.addEventListener('click', () => {
    endTurn(gameState);
    gameState.spymasterView = true; // Next turn starts in spymaster view
    render();
  });

  // Confirm intel (same as pass for now)
  document.getElementById('btn-confirm-intel')?.addEventListener('click', () => {
    endTurn(gameState);
    gameState.spymasterView = true;
    render();
  });

  // Abort
  document.getElementById('btn-abort-game')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to abort the mission?')) {
      navigateTo('home');
    }
  });

  document.getElementById('btn-new-game-game')?.addEventListener('click', () => {
    if (confirm('Start a new game? Current progress will be lost.')) {
      startGame();
    }
  });

  bindNavLinks();
}

function bindGameOverEvents() {
  document.getElementById('btn-play-again')?.addEventListener('click', () => {
    startGame();
  });

  document.getElementById('btn-back-to-lobby')?.addEventListener('click', () => {
    navigateTo('lobby');
  });

  bindNavLinks();
}

function bindNavLinks() {
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.nav;
      if (target === 'lobby') navigateTo('lobby');
      else if (target === 'intel' && gameState) navigateTo('game');
    });
  });
}

// Start a new game
function startGame() {
  gameState = createGameState(lobbyState.players);
  gameState.gameId = generateGameId();
  gameState.spymasterView = true; // Start in spymaster view so they can give clue
  navigateTo('game');
}

// Initialize
render();
