import WORDS from './words.js';

// Card types
export const CARD_TYPE = {
  BLUE: 'blue',
  RED: 'red',
  BYSTANDER: 'bystander',
  ASSASSIN: 'assassin'
};

// Generate a shuffled board of 25 words
export function generateBoard() {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 25);

  // Randomly pick which team goes first (gets 9 cards)
  const firstTeam = Math.random() < 0.5 ? CARD_TYPE.BLUE : CARD_TYPE.RED;
  const secondTeam = firstTeam === CARD_TYPE.BLUE ? CARD_TYPE.RED : CARD_TYPE.BLUE;

  // Assign types: 9 for first team, 8 for second, 7 bystanders, 1 assassin
  const types = [
    ...Array(9).fill(firstTeam),
    ...Array(8).fill(secondTeam),
    ...Array(7).fill(CARD_TYPE.BYSTANDER),
    CARD_TYPE.ASSASSIN
  ].sort(() => Math.random() - 0.5);

  const cards = selected.map((word, i) => ({
    word,
    type: types[i],
    revealed: false,
    id: i
  }));

  return { cards, firstTeam };
}

// Create initial game state
export function createGameState(players) {
  const { cards, firstTeam } = generateBoard();
  
  const blueCount = cards.filter(c => c.type === CARD_TYPE.BLUE).length;
  const redCount = cards.filter(c => c.type === CARD_TYPE.RED).length;

  return {
    cards,
    currentTeam: firstTeam,
    blueRemaining: blueCount,
    redRemaining: redCount,
    blueTotal: blueCount,
    redTotal: redCount,
    clues: [],
    currentClue: null,
    guessesLeft: 0,
    gameOver: false,
    winner: null,
    spymasterView: false,
    players: players || { blue: [], red: [] },
    startTime: Date.now(),
    turnTimer: null
  };
}

// Reveal a card and get the result
export function revealCard(state, cardIndex) {
  if (state.gameOver) return { state, result: 'game_over' };
  
  const card = state.cards[cardIndex];
  if (card.revealed) return { state, result: 'already_revealed' };

  card.revealed = true;

  // Update remaining counts
  if (card.type === CARD_TYPE.BLUE) state.blueRemaining--;
  if (card.type === CARD_TYPE.RED) state.redRemaining--;

  // Check assassin
  if (card.type === CARD_TYPE.ASSASSIN) {
    state.gameOver = true;
    state.winner = state.currentTeam === CARD_TYPE.BLUE ? CARD_TYPE.RED : CARD_TYPE.BLUE;
    return { state, result: 'assassin' };
  }

  // Check win by finding all cards
  if (state.blueRemaining === 0) {
    state.gameOver = true;
    state.winner = CARD_TYPE.BLUE;
    return { state, result: 'win' };
  }
  if (state.redRemaining === 0) {
    state.gameOver = true;
    state.winner = CARD_TYPE.RED;
    return { state, result: 'win' };
  }

  // Wrong team card or bystander → end turn
  if (card.type !== state.currentTeam) {
    state.guessesLeft = 0;
    return { state, result: 'wrong' };
  }

  // Correct guess
  state.guessesLeft--;
  if (state.guessesLeft <= 0) {
    return { state, result: 'correct_last' };
  }
  return { state, result: 'correct' };
}

// Submit a clue
export function submitClue(state, word, number) {
  const clue = {
    word: word.toUpperCase(),
    number: parseInt(number),
    team: state.currentTeam,
    guessedWords: []
  };
  state.currentClue = clue;
  state.clues.push(clue);
  state.guessesLeft = parseInt(number) + 1; // Can guess number + 1
  return state;
}

// End the current turn
export function endTurn(state) {
  state.currentTeam = state.currentTeam === CARD_TYPE.BLUE ? CARD_TYPE.RED : CARD_TYPE.BLUE;
  state.currentClue = null;
  state.guessesLeft = 0;
  return state;
}

// Get game duration string
export function getGameDuration(startTime) {
  const elapsed = Date.now() - startTime;
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

// Get game stats for game over screen
export function getGameStats(state) {
  const blueRevealed = state.blueTotal - state.blueRemaining;
  const redRevealed = state.redTotal - state.redRemaining;
  
  return {
    duration: getGameDuration(state.startTime),
    blueFound: blueRevealed,
    blueTotal: state.blueTotal,
    redFound: redRevealed,
    redTotal: state.redTotal,
    totalClues: state.clues.length,
    winner: state.winner,
    winnerFound: state.winner === CARD_TYPE.BLUE 
      ? `${blueRevealed}/${state.blueTotal}` 
      : `${redRevealed}/${state.redTotal}`
  };
}
