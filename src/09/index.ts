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
    if (!isValueSumOfAnyPair(testValue, numbers.slice(windowStart, testIndex))) {
      return numbers[testIndex];
    }
  }
  return -1; // error case, shouldn't happen
}

export function isValueSumOfAnyPair (testValue: number, numbers: number[]): boolean {
  let isSum = false;
  numbers.forEach((lhsValue, i) => {
    numbers.slice(i).forEach(rhsValue => {
      if (lhsValue + rhsValue === testValue) {
        isSum = true;
      }
    });
  });
  return isSum;
}

function sum (numbers: number[]): number {
  return numbers.reduce((acc, value) => acc + value);
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
