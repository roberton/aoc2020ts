export const Day13 = {
  id: '13',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const timestamp = parseInt(lines[0], 10);
  const busIds = parseBusIds(lines[1]);
  const busWaits = calcBusWaits(busIds, timestamp);
  const busWithShortestWait = findBusWithShortedWait(busWaits);

  return `${busWithShortestWait.id * busWithShortestWait.wait}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

interface BusWait {
  id: number
  wait: number
};

export function parseBusIds (busIdList: string): number[] {
  return busIdList
    .split(',')
    .filter(idString => idString !== 'x')
    .map(idString => parseInt(idString, 10));
}

export function calcBusWaits (busIds: number[], timestamp: number): BusWait[] {
  return busIds
    .map(id => ({ id, wait: id - (timestamp % id) }));
}

function findBusWithShortedWait (busWaits: BusWait[]): BusWait {
  const initialBusWait = {
    id: -1,
    wait: Number.MAX_SAFE_INTEGER
  };
  return busWaits
    .reduce(
      (minBusWait, busWait) => (busWait.wait < minBusWait.wait) ? busWait : minBusWait,
      initialBusWait
    );
}
