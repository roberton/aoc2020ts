import { parseRuleString } from '../src/day/19';

describe('parseRuleString', () => {
  it('should correct parse "1: "a"', () => {
    const expectedResult = {
      id: 1,
      ruleType: 'leaf',
      body: { character: 'a' }
    };
    expect(parseRuleString('1: "a"')).toEqual(expectedResult);
  });

  it('should correct parse "0: 1 2', () => {
    const expectedResult = {
      id: 0,
      ruleType: 'branch',
      body: { ruleListA: [1, 2], ruleListB: [] }
    };
    expect(parseRuleString('0: 1 2')).toEqual(expectedResult);
  });

  it('should correct parse "2: 1 3 | 3 1', () => {
    const expectedResult = {
      id: 2,
      ruleType: 'branch',
      body: { ruleListA: [1, 3], ruleListB: [3, 1] }
    };
    expect(parseRuleString('2: 1 3 | 3 1')).toEqual(expectedResult);
  });
});
