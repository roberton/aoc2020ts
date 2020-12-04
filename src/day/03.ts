// import { Day } from '../DayInterface';

export const Day3 = {
  id: '03',
  star1,
  star2
};

function star1 (treeMap: string[]): void {
  const treeCount = countTrees(treeMap, 3, 1);
  console.log(`Number of trees encountered: ${treeCount}`);
}

function star2 (treeMap: string[]): void {
  const slopes = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 2 }];
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
