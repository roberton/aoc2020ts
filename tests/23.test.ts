import { Game, startGame, playRound, playGame, makeGameString } from '../src/day/23';

describe('startGame', () => {
  it('initialises game structure for simple test case', () => {
    const result = startGame('123456789');
    expect(result.cupsList.getSize()).toBe(9);
    expect(result.currentCupNode.value).toBe(1);
    expect(result.rounds).toBe(0);
  });
});

describe('playRound', () => {
  const initialGame = startGame('389125467');

  it('should return 54673289 (from 328915467) for 1 round of example', () => {
    const result = playRound(initialGame);

    expect(result.currentCupNode.value).toEqual(2);
    expect(result.rounds).toBe(1);
    expect(makeGameString(result.cupsList)).toBe('54673289');
  });
});

describe('playGame and makeGameString', () => {
  let initialGame: Game;

  beforeEach(() => {
    initialGame = startGame('389125467');
  });

  it('should return return 32546789 (from 325467891) after 2 rounds for example game', () => {
    expect(makeGameString(playGame(initialGame, 2).cupsList)).toBe('32546789');
  });

  it('should return return 34672589 (from 725891346) after 3 rounds for example game', () => {
    expect(makeGameString(playGame(initialGame, 3).cupsList)).toBe('34672589');
  });

  it('should return return 36792584 (from 925841367) after 5 rounds for example game', () => {
    expect(makeGameString(playGame(initialGame, 5).cupsList)).toBe('36792584');
  });

  it('should return return 92658374 after 10 rounds for example game', () => {
    expect(makeGameString(playGame(initialGame, 10).cupsList)).toBe('92658374');
  });

  it('should return return 67384529 after 100 rounds for example game', () => {
    expect(makeGameString(playGame(initialGame, 100).cupsList)).toBe('67384529');
  });
});
