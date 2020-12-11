import { findNumberOf1And3JoltDiffs, segmentAdaptors, calcSegmentVariations } from '../src/10';

describe('findNumberOf1And3JoltDiffs', () => {
  it('should return 7 and 5 for first data', () => {
    const adaptors = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
    expect(findNumberOf1And3JoltDiffs(adaptors)).toEqual([7, 5]);
  });
});

describe('segmentAdaptors', () => {
  it('should return 5 segments', () => {
    const adaptors = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
    const result = segmentAdaptors(adaptors);
    expect(result.length).toEqual(5);
  });
});

describe.skip('calcSegmentVariations', () => {
  it('should return 4 for [4, 5, 6, 7]', () => {
    const segment = [4, 5, 6, 7];
    expect(calcSegmentVariations(segment)).toEqual(4);
  });
});
