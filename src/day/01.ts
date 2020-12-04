import { loadFile } from '../lib/loadFile';

export const Day1 = {
  id: '01',
  star1,
  star2
};

export function star1 (): void {
  const expenseEntries = loadAndParseFile();

  for (let i = 0; i < expenseEntries.length; i++) {
    for (let j = i; j < expenseEntries.length; j++) {
      const lhsValue = expenseEntries[i];
      const rhsValue = expenseEntries[j];

      if (lhsValue + rhsValue === 2020) {
        console.log(`Answer = ${lhsValue * rhsValue}`);
      }
    }
  }
}

export function star2 (): void {
  const expenseEntries = loadAndParseFile();

  for (let i = 0; i < expenseEntries.length; i++) {
    for (let j = i; j < expenseEntries.length; j++) {
      for (let k = j; k < expenseEntries.length; k++) {
        const val1 = expenseEntries[i];
        const val2 = expenseEntries[j];
        const val3 = expenseEntries[k];

        if (val1 + val2 + val3 === 2020) {
          console.log(`Answer = ${val1 * val2 * val3}`);
        }
      }
    }
  }
}

function loadAndParseFile (): number[] {
  const fileName = 'src/day/01.txt';
  const expenseEntries = loadFile(fileName);

  return expenseEntries.map(
    entry => parseInt(entry, 10)
  );
}
