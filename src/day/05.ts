import { sum } from '../lib/sum';

export const Day5 = {
  id: '05',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const seatIds: number[] = lines.map(line => calculateSeatId(line));
  const highestSeatId = Math.max(...seatIds);

  return highestSeatId.toString();
}

function star2 (lines: string[]): string {
  const seatIds: number[] = lines.map(line => calculateSeatId(line));
  const sortedSeatIds = seatIds.sort((lhs, rhs) => lhs - rhs);
  const missingSeatId = findMissingNumber(sortedSeatIds);

  return missingSeatId.toString();
}

export function calculateSeatId (seatString: string): number {
  const rowString = seatString.slice(0, 7);
  const columnString = seatString.slice(7);

  const binaryRow = rowString.replace(/F/gi, '0').replace(/B/gi, '1');
  const row = parseInt(binaryRow, 2);

  const binaryColumn = columnString.replace(/L/gi, '0').replace(/R/gi, '1');
  const column = parseInt(binaryColumn, 2);

  return row * 8 + column;
}

export function findMissingNumber (sortedNumbers: number[]): number {
  const expectedSum = (sortedNumbers[0] + sortedNumbers[sortedNumbers.length - 1]) * (sortedNumbers.length + 1) / 2;
  const actualSum = sum(sortedNumbers);
  return expectedSum - actualSum;
}
