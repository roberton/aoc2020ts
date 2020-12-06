import { convertLinesToGroups, countAnswers, convertGroupedAnswersToBinaryLine } from '../src/06';

const blockGroupTestData = [
  'abc',
  '',
  'a',
  'b',
  'c',
  '',
  'ab',
  'ac',
  '',
  'a',
  'a',
  'a',
  'a',
  '',
  'b'
];

describe('convertLinesToGroups', () => {
  it('should return 5 blocks for the test data', () => {
    expect(convertLinesToGroups(blockGroupTestData).length).toBe(5);
  });
});

describe('countAnswersInGroup', () => {
  it('should return 6 for first example', () => {
    const group = 'abcxabcyabcz';
    expect(countAnswers(group)).toBe(6);
  });
});

describe('convertGroupedAnswersToBinaryLine', () => {
  it('should return 0b111... trues for ["abc"]', () => {
    const answerGroup = ['abc'];
    expect(convertGroupedAnswersToBinaryLine(answerGroup)).toBe(0b11100000000000000000000000);
  });

  it('should return 0 trues for ["a", "b", "c"]', () => {
    const answerGroup = ['a', 'b', 'c'];
    expect(convertGroupedAnswersToBinaryLine(answerGroup)).toBe(0);
  });

  it('should return 0b100... trues for ["ab", "ac"]', () => {
    const answerGroup = ['ab', 'ac'];
    expect(convertGroupedAnswersToBinaryLine(answerGroup)).toBe(0b10000000000000000000000000);
  });

  it('should return 0b100... trues for ["a", "a", "a", "a"]', () => {
    const answerGroup = ['a', 'a', 'a', 'a'];
    expect(convertGroupedAnswersToBinaryLine(answerGroup)).toBe(0b10000000000000000000000000);
  });

  it('should return 0b010... trues for ["b"]', () => {
    const answerGroup = ['b'];
    expect(convertGroupedAnswersToBinaryLine(answerGroup)).toBe(0b01000000000000000000000000);
  });
});
