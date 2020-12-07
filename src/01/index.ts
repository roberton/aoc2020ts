export const Day1 = {
  id: '01',
  star1,
  star2
};

// TODO: can this be rewritten to use Array.some()?
export function star1 (lines: string[]): string {
  const expenseEntries = parseFile(lines);
  let answer = 'ERROR';

  expenseEntries.forEach((lhsValue, i) => {
    expenseEntries.slice(i).forEach(rhsValue => {
      if (lhsValue + rhsValue === 2020) {
        answer = `${lhsValue * rhsValue}`;
      }
    });
  });
  return answer;
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
