import { findNumberOf1And3JoltDiffs } from '../src/10';

describe('findNumberOf1And3JoltDiffs', () => {
  it('should return 7 and 5 for first data', () => {
    const adaptors = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
    expect(findNumberOf1And3JoltDiffs(adaptors)).toEqual([7, 5]);
  });
});
