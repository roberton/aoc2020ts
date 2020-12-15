import { calculateSeatId, findMissingNumber } from '../src/day/05';

describe('calculateSeatId', () => {
  it('should return 357 for FBFBBFFRLR', () => {
    expect(calculateSeatId('FBFBBFFRLR')).toBe(357);
  });

  it('should return 567 for BFFFBBFRRR', () => {
    expect(calculateSeatId('BFFFBBFRRR')).toBe(567);
  });

  it('should return 119 for FFFBBBFRRR', () => {
    expect(calculateSeatId('FFFBBBFRRR')).toBe(119);
  });

  it('should return 820 for BBFFBBFRLL', () => {
    expect(calculateSeatId('BBFFBBFRLL')).toBe(820);
  });
});

describe('findMissingNumber', () => {
  it('should return 4 for [1, 2, 3, 5, 6]', () => {
    expect(findMissingNumber([1, 2, 3, 5, 6])).toBe(4);
  });

  it('should return 7 for [3, 4, 5, 6, 8, 9]', () => {
    expect(findMissingNumber([3, 4, 5, 6, 8, 9])).toBe(7);
  });
});
