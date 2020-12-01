import { readFileSync } from 'fs';

const fileName = 'src/day/01.txt';

export function star1 (): void {
  console.log('Results for the puzzle for Day 1, Star 1');

  const input: string = readFileSync(fileName, 'utf8');
  const expenseEntries = input.split('\n');

  console.log(`processing ${expenseEntries.length} expense entries`);

  for (let i = 0; i < expenseEntries.length; i++) {
    for (let j = i; j < expenseEntries.length; j++) {
      const lhsValue = parseInt(expenseEntries[i], 10);
      const rhsValue = parseInt(expenseEntries[j], 10);

      if (lhsValue + rhsValue === 2020) {
        console.log(`Answer = ${lhsValue * rhsValue}`);
      }
    }
  }
}

export function star2 (): void {
  console.log('Results for the puzzle for Day 1, Star 2');

  const input: string = readFileSync(fileName, 'utf8');
  const expenseEntries = input.split('\n');

  for (let i = 0; i < expenseEntries.length; i++) {
    for (let j = i; j < expenseEntries.length; j++) {
      for (let k = j; k < expenseEntries.length; k++) {
        const val1 = parseInt(expenseEntries[i], 10);
        const val2 = parseInt(expenseEntries[j], 10);
        const val3 = parseInt(expenseEntries[k], 10);

        if (val1 + val2 + val3 === 2020) {
          console.log(`Answer = ${val1 * val2 * val3}`);
        }
      }
    }
  }
}
