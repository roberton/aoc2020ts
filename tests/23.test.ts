import { playRound, playGame, normaliseGame, makeGameString } from '../src/day/23';

describe('playRound', () => {
  const initialGame = {
    cups: [3, 8, 9, 1, 2, 5, 4, 6, 7],
    currentCup: 3,
    rounds: 0
  };

  it('should return correct decks for round of example', () => {
    const result = playRound(initialGame);

    expect(result.currentCup).toEqual(2);
    expect(result.cups).toEqual([3, 2, 8, 9, 1, 5, 4, 6, 7]);
    expect(result.rounds).toBe(1);
  });
});

describe('playGame and makeGameString', () => {
  const initialGame = {
    cups: [3, 8, 9, 1, 2, 5, 4, 6, 7],
    currentCup: 3,
    rounds: 0
  };

  it('should return return 92658374 after 10 rounds for example game', () => {
    expect(makeGameString(playGame(initialGame, 10))).toBe('92658374');
  });

  it('should return return 67384529 after 100 rounds for example game', () => {
    expect(makeGameString(playGame(initialGame, 100))).toBe('67384529');
  });
});

describe('normaliseGame', () => {
  it('should normalise "3 (2) 8  9  1  5  4  6  7"', () => {
    const unnormalisedGame = {
      cups: [3, 2, 8, 9, 1, 5, 4, 6, 7],
      currentCup: 2,
      rounds: 0
    };
    const result = normaliseGame(unnormalisedGame);

    expect(result.currentCup).toBe(2);
    expect(result.cups).toEqual([2, 8, 9, 1, 5, 4, 6, 7, 3]);
  });
});
