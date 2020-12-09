import { isValueSumOfAnyPair, findErrorValue } from '../src/09';

describe('isValueSumOfAnyPair', () => {
  it('should return true for 40 and [35, 20, 15, 25, 47] ', () => {
    const preamble = [35, 20, 15, 25, 47];
    expect(isValueSumOfAnyPair(40, preamble)).toBe(true);
  });

  it('should return false for 127 and [95, 102, 117, 150, 182] ', () => {
    const preamble = [95, 102, 117, 150, 182];
    expect(isValueSumOfAnyPair(127, preamble)).toBe(false);
  });
});

describe('findErrorValue', () => {
  it('should return 127 for example data', () => {
    const testData = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219];
    expect(findErrorValue(testData, 5)).toBe(127);
  });
});
