import { parseStartingNumbers, nextTurn, initialiseTurnHistory, nextTurn2, addToTurnHistory } from '../src/day/15';

describe('parseStartingNumbers', () => {
  it('should correctly parse example starting numbers "0,3,6"', () => {
    expect(parseStartingNumbers('0,3,6')).toEqual([0, 3, 6]);
  });
});

describe('nextTurn', () => {
  it('should return 0 after the starting numbers', () => {
    const turns = [0, 3, 6];
    expect(nextTurn(turns)).toBe(0);
  });

  it('should return 3 for the 5th turn', () => {
    const turns = [0, 3, 6, 0];
    expect(nextTurn(turns)).toBe(3);
  });

  it('should return 3 for the 6th turn', () => {
    const turns = [0, 3, 6, 0, 3];
    expect(nextTurn(turns)).toBe(3);
  });

  it('should return 436 for the 2020th turn', () => {
    const turns = [0, 3, 6];
    while (turns.length <= 2020) {
      turns.push(nextTurn(turns));
    }
    expect(turns[2019]).toBe(436);
  });
});

describe('initialiseTurnHistory', () => {
  it('should correctly handle starting numbers [0, 3, 6]', () => {
    const result = initialiseTurnHistory([0, 3, 6]);

    expect(result.lastValue).toEqual(6);
    expect(result.turnCount).toEqual(3);
  });
});

describe('nextTurn2', () => {
  it('should return 0 after the starting numbers', () => {
    const turnHistory = initialiseTurnHistory([0, 3, 6]);
    expect(nextTurn2(turnHistory)).toBe(0);
  });

  it('should return 3 for the 5th turn', () => {
    const turnHistory = initialiseTurnHistory([0, 3, 6, 0]);
    expect(nextTurn2(turnHistory)).toBe(3);
  });

  it('should return 3 for the 6th turn', () => {
    const turnHistory = initialiseTurnHistory([0, 3, 6, 0, 3]);
    expect(nextTurn2(turnHistory)).toBe(3);
  });

  it('should return 436 for the 2020th turn', () => {
    const turnHistory = initialiseTurnHistory([0, 3, 6]);
    while (turnHistory.turnCount < 2020) {
      addToTurnHistory(turnHistory, nextTurn2(turnHistory));
    }

    expect(turnHistory.turnCount).toBe(2020);
    expect(turnHistory.lastValue).toBe(436);
  });
});
