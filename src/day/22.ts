import groupLines from '../lib/groupLines';

export const Day22 = {
  id: '22',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const initialGameState = buildGame(lines);
  const finalGameState = playGame(initialGameState);

  const winningScore = calcScore(getWinningDeck(finalGameState));
  return `${winningScore}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

type Deck = number[];
type GameResult = 'p1Won' | 'p2Won' | 'inProgress';

export interface GameState {
  p1Deck: Deck
  p2Deck: Deck
  rounds: number
  result: GameResult
}

function buildGame (lines: string[]): GameState {
  const [player1Lines, player2Lines] = groupLines(lines);
  const p1Deck = player1Lines.slice(1).map(line => parseInt(line, 10));
  const p2Deck = player2Lines.slice(1).map(line => parseInt(line, 10));

  return {
    p1Deck,
    p2Deck,
    rounds: 0,
    result: 'inProgress'
  };
}

export function playRound (game: GameState): GameState {
  const p1Deck = game.p1Deck.slice(1);
  const p2Deck = game.p2Deck.slice(1);
  const playedCards = [game.p1Deck[0], game.p2Deck[0]];

  if (playedCards[0] > playedCards[1]) {
    // player 1 wins
    p1Deck.push(playedCards[0]);
    p1Deck.push(playedCards[1]);
  } else {
    // player 2 wins
    p2Deck.push(playedCards[1]);
    p2Deck.push(playedCards[0]);
  }
  return {
    p1Deck,
    p2Deck,
    rounds: game.rounds + 1,
    result: 'inProgress'
  };
}

export function playGame (gameState: GameState): GameState {
  while (gameState.result === 'inProgress' && gameState.rounds < 1000) {
    gameState = playRound(gameState);

    if (gameState.p1Deck.length === 0) gameState.result = 'p2Won';
    if (gameState.p2Deck.length === 0) gameState.result = 'p1Won';
  }

  return gameState;
}

export function calcScore (deck: Deck): number {
  return deck.reduce(
    (acc, value, index) => acc + (deck.length - index) * value,
    0);
}

function getWinningDeck (gameState: GameState): Deck {
  if (gameState.result === 'p1Won') {
    return gameState.p1Deck;
  } else if (gameState.result === 'p2Won') {
    return gameState.p2Deck;
  } else {
    throw new Error('getWinningDeck() called for in progress game');
  }
}
