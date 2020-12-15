export const Day15 = {
  id: '15',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const startingNumbers = parseStartingNumbers(lines[0]);
  const turns = startingNumbers;
  while (turns.length <= 2020) {
    turns.push(nextTurn(turns));
  }

  return `${turns[2019]}`;
}

function star2 (lines: string[]): string {
  const startingNumbers = parseStartingNumbers(lines[0]);
  const turns = startingNumbers;
  while (turns.length <= 30000000) {
    if (turns.length % 1000 === 0) console.log(turns.length);
    turns.push(nextTurn(turns));
  }

  return `${turns[30000000 - 1]}`;
}

export function parseStartingNumbers (numbers: string): number[] {
  return numbers.split(',')
    .map(numberString => parseInt(numberString, 10));
}

export function nextTurn (turnHistory: number[]): number {
  const indexOfLastElement = turnHistory.length - 1;
  const mostRecentSpokenNumber = turnHistory[indexOfLastElement];
  const numTurnsSinceLastSpoken = turnHistory.slice(0, indexOfLastElement).lastIndexOf(mostRecentSpokenNumber);
  if (numTurnsSinceLastSpoken === -1) {
    return 0;
  } else {
    return turnHistory.length - numTurnsSinceLastSpoken - 1;
  }
}
