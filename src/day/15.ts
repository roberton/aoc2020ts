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

interface TurnHistory {
  map: Map<number, number>
  lastValue: number
  turnCount: number
};

function star2 (lines: string[]): string {
  const startingNumbers = parseStartingNumbers(lines[0]);
  const turnHistory: TurnHistory = initialiseTurnHistory(startingNumbers);
  while (turnHistory.turnCount < 30000000) {
    if (turnHistory.turnCount % 3000000 === 0) console.log(`${turnHistory.turnCount / 3000000}%`);
    addToTurnHistory(turnHistory, nextTurn2(turnHistory));
  }

  return `${turnHistory.lastValue}`;
}

export function parseStartingNumbers (numbers: string): number[] {
  return numbers.split(',')
    .map(numberString => parseInt(numberString, 10));
}

export function nextTurn (turnHistory: number[]): number {
  const indexOfLastElement = turnHistory.length - 1;
  const mostRecentSpokenNumber = turnHistory[indexOfLastElement];
  const turnsSinceLastSpoken = turnHistory.slice(0, indexOfLastElement).lastIndexOf(mostRecentSpokenNumber);
  if (turnsSinceLastSpoken === -1) {
    return 0;
  } else {
    return turnHistory.length - turnsSinceLastSpoken - 1;
  }
}

export function nextTurn2 (turnHistory: TurnHistory): number {
  if (!turnHistory.map.has(turnHistory.lastValue)) {
    // console.log(`nextTurn2(): no entry for ${turnHistory.lastValue}, return zero`);
    return 0;
  } else {
    const turnLastSpoken = turnHistory.map.get(turnHistory.lastValue) ?? 0;
    const turnsSinceLastSpoken = turnHistory.turnCount - turnLastSpoken;
    // console.log(`nextTurn2(): entry found for ${turnHistory.lastValue}, returning ${turnsSinceLastSpoken} (${turnHistory.turnCount} - ${turnLastSpoken})`);
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
  // store last entry in the map
  if (turnHistory.lastValue !== -1) {
    turnHistory.map.set(turnHistory.lastValue, turnHistory.turnCount);
  }
  turnHistory.turnCount++;
  turnHistory.lastValue = value;
}
