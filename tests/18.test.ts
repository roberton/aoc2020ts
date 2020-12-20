import { evaluateExpression } from '../src/day/18';

describe('evaluateExpression', () => {
  it('should return 71 for "1 + 2 * 3 + 4 * 5 + 6"', () => {
    expect(evaluateExpression('1 + 2 * 3 + 4 * 5 + 6')).toBe(71);
  });

  it('should return 100 for "1 + 2 + 3 + 4 * 10"', () => {
    expect(evaluateExpression('1 + 2 + 3 + 4 * 10')).toBe(100);
  });

  it('should return 26 for "2 * 3 + (4 * 5)"', () => {
    expect(evaluateExpression('2 * 3 + (4 * 5)')).toBe(26);
  });

  it('should return 51 for main example "1 + (2 * 3) + (4 * (5 + 6))"', () => {
    expect(evaluateExpression('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51);
  });

  it('should return 13632 for "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"', () => {
    expect(evaluateExpression('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toBe(13632);
  });
});
