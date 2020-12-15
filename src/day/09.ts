import { findPairForSumValue } from '../lib/findPairForSumValue';
import { sum } from '../lib/sum';

export const Day9 = {
  id: '09',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const numbers = lines.map(line => parseInt(line, 10));
  const errorValue = findErrorValue(numbers, 25);

  return `${errorValue}`;
}

function star2 (lines: string[]): string {
  const numbers = lines.map(line => parseInt(line, 10));
  const errorValue = findErrorValue(numbers, 25);

  const numberRange = findNumberRangeThatMatchSum(numbers, errorValue);
  const minNumberFromRange = Math.min(...numberRange);
  const maxNumberFromRange = Math.max(...numberRange);

  return `${minNumberFromRange + maxNumberFromRange}`;
}

export function findErrorValue (numbers: number[], windowSize: number): number {
  for (let testIndex = windowSize; testIndex < numbers.length; testIndex++) {
    const windowStart = testIndex - windowSize;
    const testValue = numbers[testIndex];
    const sumPair = findPairForSumValue(testValue, numbers.slice(windowStart, testIndex));
    if (sumPair.length !== 2) {
      return numbers[testIndex];
    }
  }
  throw new Error('findErrorValue() failed to find an error value');
}

export function findNumberRangeThatMatchSum (numbers: number[], targetSum: number): number[] {
  for (let start = 0; start < numbers.length - 1; start++) {
    for (let end = start + 1; end < numbers.length; end++) {
      const range = numbers.slice(start, end + 1);
      if (sum(range) === targetSum) return range;
    }
  }
  throw new Error('findNumberRangeThatMatchSum() failed to find matching range');
}
