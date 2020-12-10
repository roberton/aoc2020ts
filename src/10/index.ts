export const Day10 = {
  id: '10',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const adaptors = lines.map(line => parseInt(line, 10));
  const [numberOf1JoltDiffs, numberOf3JoltDiffs] = findNumberOf1And3JoltDiffs(adaptors);

  return `${numberOf1JoltDiffs * numberOf3JoltDiffs}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

export function findNumberOf1And3JoltDiffs (adaptors: number[]): number[] {
  const adaptorChain = findAdaptorChain(adaptors);
  const numberOf1JoltDiffs = countDiffBySize(adaptorChain, 1);
  const numberOf3JoltDiffs = countDiffBySize(adaptorChain, 3) + 1; // device can handle +3 jolts
  return [numberOf1JoltDiffs, numberOf3JoltDiffs];
}

// I thought there would be more to this :-)
function findAdaptorChain (adaptors: number[]): number[] {
  return adaptors.sort((a, b) => a - b);
}

function countDiffBySize (numbers: number[], diff: number): number {
  const result = numbers.reduce((state, value) => {
    if (value - state.previousValue === diff) {
      state.count++;
    }
    state.previousValue = value;
    return state;
  },
  { count: 0, previousValue: 0 }
  );
  return result.count;
}
