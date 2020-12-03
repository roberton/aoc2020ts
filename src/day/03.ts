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
  const map = loadFile(fileName);

  const treeCount: number[] = [];
  treeCount[0] = countTrees(map, 1, 1);
  treeCount[1] = countTrees(map, 3, 1);
  treeCount[2] = countTrees(map, 5, 1);
  treeCount[3] = countTrees(map, 7, 1);
  treeCount[4] = countTrees(map, 1, 2);

  console.log(treeCount);
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
  while ((y + slopeY) < map.length) {
    x += slopeX;
    y += slopeY;
    if (isTreeAt(map, x, y)) treeCount++;
  }

  return treeCount;
}
