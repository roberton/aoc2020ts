import { playRound, playGame, calcScore } from '../src/day/22';

describe('playRound', () => {
  it('should return correct decks for round of example', () => {
    const p1Deck = [9, 2, 6, 3, 1];
    const p2Deck = [5, 8, 4, 7, 10];
    const [p1Result, p2Result] = playRound(p1Deck, p2Deck);

    expect(p1Result).toEqual([2, 6, 3, 1, 9, 5]);
    expect(p2Result).toEqual([8, 4, 7, 10]);
  });
});

describe('playGame', () => {
  it('should show finished game for player 2', () => {
    const p1Deck = [9, 2, 6, 3, 1];
    const p2Deck = [5, 8, 4, 7, 10];
    const [p1Result, p2Result] = playGame(p1Deck, p2Deck);

    expect(p1Result.length).toBe(0);
    expect(p2Result.length).toBe(10);
  });
});

describe('calcScore', () => {
  it('returns 306 for [3, 2, 10, 6, 8, 5, 9, 4, 7, 1]', () => {
    expect(calcScore([3, 2, 10, 6, 8, 5, 9, 4, 7, 1])).toBe(306);
  });
});
