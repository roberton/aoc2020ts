export const Day1 = {
  id: '01',
  star1,
  star2
};

export function star1 (lines: string[]): string {
  const expenseEntries = parseFile(lines);

  for (let i = 0; i < expenseEntries.length; i++) {
    for (let j = i; j < expenseEntries.length; j++) {
      const lhsValue = expenseEntries[i];
      const rhsValue = expenseEntries[j];

      if (lhsValue + rhsValue === 2020) {
        return `${lhsValue * rhsValue}`;
      }
    }
  }
  return 'ERROR';
}

export function star2 (lines: string[]): string {
  const expenseEntries = parseFile(lines);

  for (let i = 0; i < expenseEntries.length; i++) {
    for (let j = i; j < expenseEntries.length; j++) {
      for (let k = j; k < expenseEntries.length; k++) {
        const val1 = expenseEntries[i];
        const val2 = expenseEntries[j];
        const val3 = expenseEntries[k];

        if (val1 + val2 + val3 === 2020) {
          return `${val1 * val2 * val3}`;
        }
      }
    }
  }
  return 'ERROR';
}

function parseFile (lines: string[]): number[] {
  return lines.map(entry => parseInt(entry, 10));
}
