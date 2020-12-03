import { isTreeAt } from '../src/day/03';

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

  it('should find 7 tree in full test example', () => {
    let x = 0;
    let y = 0;
    let treeCount = 0;
    for (let i = 0; i < testMap.length - 1; i++) {
      x += 3;
      y += 1;
      if (isTreeAt(testMap, x, y)) treeCount++;
    }
    expect(treeCount).toBe(7);
  });
});
