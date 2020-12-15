import sumBooleanArray from '../lib/sumBooleanArray';

export const Day3 = {
  id: '03',
  star1,
  star2
};

function star1 (treeMap: string[]): string {
  const treeCount = countTrees(treeMap, 3, 1);
  return `${treeCount}`;
}

function star2 (treeMap: string[]): string {
  const slopes = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 2 }];
  const treeCounts: number[] = slopes.map(slope =>
    countTrees(treeMap, slope.x, slope.y)
  );

  const treeProduct = treeCounts.reduce((acc, count) => acc * count);
  return `${treeProduct}`;
}

export function isTreeAt (row: string, x: number): boolean {
  const mapWidth = row.length;
  const xPosInMap = x % mapWidth;
  return row[xPosInMap] === '#';
}

export function countTrees (treeMap: string[], slopeX: number, slopeY: number): number {
  const trees = treeMap
    .filter((_, rowIndex) => rowIndex % slopeY === 0)
    .map((row, rowIndex) => isTreeAt(row, rowIndex * slopeX));
  return sumBooleanArray(trees);
}
