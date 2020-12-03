import { loadFile } from '../lib/loadFile';

const fileName = 'src/day/03.txt';

export function star1 (): void {
  console.log('Day 3, Star 1');
  const map = loadFile(fileName);
  const treeCount = countTrees(map, 3, 1);

  console.log(`Number of trees encountered: ${treeCount}`);
}

export function star2 (): void {
  console.log('Day 3, Star 2');
  const treeMap = loadFile(fileName);

  const slopes = [{x: 1, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 7, y: 1}, {x: 1, y: 2}];
  const treeCounts: number[] = slopes.map(slope =>
    countTrees(treeMap, slope.x, slope.y)
  );
  console.log(`Tree counts for each slope: ${JSON.stringify(treeCounts)}`);

  const treeProduct = treeCounts.reduce((acc, count) => acc * count);
  console.log(`Tree product: ${treeProduct}`);
}

export function isTreeAt (map: string[], x: number, y: number): boolean {
  const mapWidth = map[0].length;
  const xPosInMap = x % mapWidth;
  return map[y][xPosInMap] === '#';
}

export function countTrees (map: string[], slopeX: number, slopeY: number): number {
  let x = 0, y = 0;
  let treeCount = 0;
  while ((y + slopeY) < map.length) {
    x += slopeX;
    y += slopeY;
    if (isTreeAt(map, x, y)) treeCount++;
  }
  return treeCount;
}
