import { convertLinesToGroups, countAnswersInGroup } from '../src/06';

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
    expect(countAnswersInGroup(group)).toBe(6);
  });
});
