import { playRound, playGame, calcScore, GameState } from '../src/day/22';

const gameInitialState: GameState = {
  p1Deck: [9, 2, 6, 3, 1],
  p2Deck: [5, 8, 4, 7, 10],
  rounds: 0,
  result: 'inProgress'
};

describe('playRound', () => {
  it('should return correct decks for round of example', () => {
    const result = playRound(gameInitialState);

    expect(result.p1Deck).toEqual([2, 6, 3, 1, 9, 5]);
    expect(result.p2Deck).toEqual([8, 4, 7, 10]);
    expect(result.rounds).toBe(1);
  });
});

describe('playGame', () => {
  it('should show finished game for player 2', () => {
    const result = playGame(gameInitialState);

    expect(result.result).toBe('p2Won');
  });
});

describe('calcScore', () => {
  it('returns 306 for [3, 2, 10, 6, 8, 5, 9, 4, 7, 1]', () => {
    expect(calcScore([3, 2, 10, 6, 8, 5, 9, 4, 7, 1])).toBe(306);
  });
});
