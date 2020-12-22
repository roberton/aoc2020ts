import { parseRuleSection, parseRuleString, isMessageValid, isMessageValidSuper } from '../src/day/19';

describe('parseRuleString', () => {
  it('should correct parse "1: "a"', () => {
    const expectedResult = {
      id: 1,
      ruleType: 'leaf',
      leafRule: { character: 'a' }
    };
    expect(parseRuleString('1: "a"')).toEqual(expectedResult);
  });

  it('should correct parse "0: 1 2', () => {
    const expectedResult = {
      id: 0,
      ruleType: 'branch',
      nodeRule: { ruleListA: [1, 2], ruleListB: [] }
    };
    expect(parseRuleString('0: 1 2')).toEqual(expectedResult);
  });

  it('should correct parse "2: 1 3 | 3 1', () => {
    const expectedResult = {
      id: 2,
      ruleType: 'branch',
      nodeRule: { ruleListA: [1, 3], ruleListB: [3, 1] }
    };
    expect(parseRuleString('2: 1 3 | 3 1')).toEqual(expectedResult);
  });
});

// describe('generateValidMessages', () => {
//   it('should return aab, aba for first test data', () => {
//     const ruleStrings = [
//       '0: 1 2',
//       '1: "a"',
//       '2: 1 3 | 3 1',
//       '3: "b"'
//     ];
//     const rules = parseRuleSection(ruleStrings);
//     expect(generateValidMessages(rules)).toEqual(['aab', 'aba']);
//   });
// });

describe('isMessageValid', () => {
  const example1RuleStrings = [
    '0: 1 2',
    '1: "a"',
    '2: 1 3 | 3 1',
    '3: "b"'
  ];
  const example1Rules = parseRuleSection(example1RuleStrings);

  const example2RuleString = [
    '0: 4 1 5',
    '1: 2 3 | 3 2',
    '2: 4 4 | 5 5',
    '3: 4 5 | 5 4',
    '4: "a"',
    '5: "b"'
  ];
  const example2Rules = parseRuleSection(example2RuleString);
  console.log(JSON.stringify(example2Rules));

  it('should validate ab for very simple test case', () => {
    const ruleStrings = [
      '0: 1 2',
      '1: "a"',
      '2: "b"'
    ];
    const rules = parseRuleSection(ruleStrings);
    expect(isMessageValidSuper('ab', rules)).toBe(true);
  });

  it('should validate aab for example 1', () => {
    expect(isMessageValidSuper('aab', example1Rules)).toBe(true);
  });

  it('should validate aba for example 1', () => {
    expect(isMessageValidSuper('aba', example1Rules)).toBe(true);
  });

  it('should invalidate aaa for example 1', () => {
    expect(isMessageValidSuper('aaa', example1Rules)).toBe(false);
  });

  it('should invalidate bbb for example 1', () => {
    expect(isMessageValidSuper('bbb', example1Rules)).toBe(false);
  });

  it.only('should validate ababbb for example 2', () => {
    expect(isMessageValidSuper('ababbb', example2Rules)).toBe(true);
  });

  it('should invalidate bababa for example 2', () => {
    expect(isMessageValidSuper('bababa', example2Rules)).toBe(false);
  });

  it('should validate abbbab for example 2', () => {
    expect(isMessageValidSuper('abbbab', example2Rules)).toBe(true);
  });

  it('should invalidate aaabbb for example 2', () => {
    expect(isMessageValidSuper('aaabbb', example2Rules)).toBe(false);
  });

  it('should invalidate aaaabbb for example 2 (unmatched final b)', () => {
    expect(isMessageValidSuper('aaaabbb', example2Rules)).toBe(false);
  });
});
