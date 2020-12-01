import { readFileSync } from 'fs';

export function star1 (): void {
  console.log('Results for the puzzle for Day 1, Star 1');

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
  console.log('Results for the puzzle for Day 1, Star 2');

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

  const input: string = readFileSync(fileName, 'utf8');
  const expenseEntries = input.split('\n');
  console.log(`processing ${expenseEntries.length} expense entries`);
  return expenseEntries.map(
    entry => parseInt(entry, 10)
  );
}
