import { calculateSeatId } from '../src/05';

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
