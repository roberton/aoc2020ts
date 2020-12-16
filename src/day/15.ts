export const Day15 = {
  id: '15',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const startingNumbers = parseStartingNumbers(lines[0]);
  const turnHistory = playGame(startingNumbers, 2020);

  return `${turnHistory.lastValue}`;
}

function star2 (lines: string[]): string {
  const startingNumbers = parseStartingNumbers(lines[0]);
  const turnHistory = playGame(startingNumbers, 30000000);

  return `${turnHistory.lastValue}`;
}

interface TurnHistory {
  map: Map<number, number>
  lastValue: number
  turnCount: number
};

function playGame (startingNumbers: number[], numberOfTurns: number): TurnHistory {
  const turnHistory: TurnHistory = initialiseTurnHistory(startingNumbers);

  while (turnHistory.turnCount < numberOfTurns) {
    // if (turnHistory.turnCount % 1000000 === 0) {
    //   console.log(`${Math.round(100 * turnHistory.turnCount / numberOfTurns)}%`);
    // }
    addToTurnHistory(turnHistory, nextTurn(turnHistory));
  }

  return turnHistory;
}

export function parseStartingNumbers (numbers: string): number[] {
  return numbers.split(',')
    .map(numberString => parseInt(numberString, 10));
}

export function nextTurn (turnHistory: TurnHistory): number {
  if (!turnHistory.map.has(turnHistory.lastValue)) {
    return 0;
  } else {
    const turnLastSpoken = turnHistory.map.get(turnHistory.lastValue) ?? 0;
    const turnsSinceLastSpoken = turnHistory.turnCount - turnLastSpoken;
    return turnsSinceLastSpoken;
  }
}

export function initialiseTurnHistory (turns: number[]): TurnHistory {
  const turnHistory = {
    map: new Map(),
    lastValue: -1,
    turnCount: 0
  };
  turns.forEach(value => {
    addToTurnHistory(turnHistory, value);
  });

  return turnHistory;
}

export function addToTurnHistory (turnHistory: TurnHistory, value: number): void {
  if (turnHistory.lastValue !== -1) {
    turnHistory.map.set(turnHistory.lastValue, turnHistory.turnCount);
  }
  turnHistory.turnCount++;
  turnHistory.lastValue = value;
}
