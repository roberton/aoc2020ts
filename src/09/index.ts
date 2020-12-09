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
  return 'TODO';
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
