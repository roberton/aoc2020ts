import { loadFile } from '../lib/loadFile';

const fileName = 'src/day/03.txt';

export function star1 (): void {
  console.log('Day 3, Star 1');
  const map = loadFile(fileName);

  const treeCount = countTrees(map, 3, 1);

  console.log(`Number of trees encountered = ${treeCount}`);
}

export function star2 (): void {
  console.log('Day 3, Star 2');
}

export function isTreeAt (map: string[], x: number, y: number): boolean {
  const mapWidth = map[0].length;
  const xPosInMap = x % mapWidth;
  return map[y][xPosInMap] === '#';
}

export function countTrees (map: string[], slopeX: number, slopeY: number): number {
  let x = 0;
  let y = 0;
  let treeCount = 0;
  for (let i = 0; i < map.length - 1; i++) {
    x += slopeX;
    y += slopeY;
    if (isTreeAt(map, x, y)) treeCount++;
  }

  return treeCount;
}
