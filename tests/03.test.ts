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
    expect(isTreeAt(testMap[1], 3)).toBe(false);
  });
});

describe('countTrees', () => {
  it('should find 7 trees in full test example and slope 3, 1', () => {
    expect(countTrees(testMap, 3, 1)).toBe(7);
  });

  it('should find 2 trees in full test example and slope 1, 1', () => {
    expect(countTrees(testMap, 1, 1)).toBe(2);
  });

  it('should find 2 trees in full test example and slope 1, 2', () => {
    expect(countTrees(testMap, 1, 2)).toBe(2);
  });
});
