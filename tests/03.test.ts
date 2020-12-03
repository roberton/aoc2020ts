import { isTreeAt, countTrees } from '../src/day/03';

const testMap = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#'
];

describe('isTreeAt', () => {
  it('should return false for first test example', () => {
    expect(isTreeAt(testMap, 3, 1)).toBe(false);
  });
});

describe('countTrees', () => {
  it('should find 7 tree in full test example', () => {
    expect(countTrees(testMap, 3, 1)).toBe(7);
  });
});
