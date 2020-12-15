import { findErrorValue, findNumberRangeThatMatchSum } from '../src/day/09';

describe('findErrorValue', () => {
  it('should return 127 for example data', () => {
    const testData = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219];
    expect(findErrorValue(testData, 5)).toBe(127);
  });
});

describe('findNumberRangeThatMatchSum', () => {
  it('should return [15, 25, 47, 40] for test data and target value of 127', () => {
    const testData = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219];
    const result = findNumberRangeThatMatchSum(testData, 127);
    expect(result).toEqual([15, 25, 47, 40]);
  });
});
