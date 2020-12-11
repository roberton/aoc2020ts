import clonedeep from 'lodash.clonedeep';

export const Day11 = {
  id: '11',
  star1,
  star2
};

export function star1 (lines: string[]): string {
  const waitingArea = buildWaitingArea(lines);

  let settled = false;
  let numberOfOccupiedSeats = 0;
  let iterations = 0;
  while (!settled) {
    iterations++;
    waitingArea.locations = movePeople(waitingArea);
    const newCount = countOccupiedSeats(waitingArea);
    if (newCount === numberOfOccupiedSeats) {
      settled = true;
    } else {
      numberOfOccupiedSeats = newCount;
    }
  }

  return `${numberOfOccupiedSeats}`;
}

export function star2 (lines: string[]): string {
  return 'TODO';
}

/*
Describe the layout of the waiting area and the state.
Main structure is `grid`.
`seatList` is just an optimisation to make it easier to find all the seats
*/
interface WaitingArea {
  seatList: Seat[]
  locations: Location[][]
};

interface Seat {
  x: number
  y: number
  // future optimisation: store list of neighbouring seat locations
}

type Location = 'floor' | 'empty' | 'occupied';

export function buildWaitingArea (seatLayout: string[]): WaitingArea {
  const seatList: Seat[] = [];
  const locations: Location[][] = [[]];

  seatLayout.forEach((seatRow, rowIndex) => {
    const gridRow: Location[] = [];

    seatRow.split('').forEach((seat, columnIndex) => {
      if (seat === 'L') {
        seatList.push({ x: columnIndex, y: rowIndex });
        gridRow.push('empty');
      }
      if (seat === '.') {
        gridRow.push('floor');
      }
    });

    if (rowIndex === 0) { // TODO: this is horrendous
      locations[0] = gridRow;
    } else {
      locations.push(gridRow);
    }
  });

  return {
    seatList,
    locations
  };
}

export function movePeople (waitingArea: WaitingArea): Location[][] {
  const location = waitingArea.locations;
  const newLocations = clonedeep(waitingArea.locations);

  waitingArea.seatList.forEach(seat => {
    const numberOfOccupiedSeats = countAdjacentOccupiedSeats(seat.x, seat.y, waitingArea.locations);
    if (!isSeatOccupied(seat.x, seat.y, location) && numberOfOccupiedSeats === 0) {
      // fill seat
      setSeatOccupied(seat.x, seat.y, newLocations, true);
    } else if (isSeatOccupied(seat.x, seat.y, location) && numberOfOccupiedSeats >= 4) {
      // empty seat
      setSeatOccupied(seat.x, seat.y, newLocations, false);
    }
  });
  return newLocations;
}

function countAdjacentOccupiedSeats (x: number, y: number, locations: Location[][]): number {
  let count = 0;
  if (isSeatOccupied(x - 1, y - 1, locations)) count++;
  if (isSeatOccupied(x, y - 1, locations)) count++;
  if (isSeatOccupied(x + 1, y - 1, locations)) count++;

  if (isSeatOccupied(x - 1, y, locations)) count++;
  if (isSeatOccupied(x + 1, y, locations)) count++;

  if (isSeatOccupied(x - 1, y + 1, locations)) count++;
  if (isSeatOccupied(x, y + 1, locations)) count++;
  if (isSeatOccupied(x + 1, y + 1, locations)) count++;

  return count;
}

function isSeatOccupied (x: number, y: number, locations: Location[][]): boolean {
  // return false for out of bounds locations
  if (x < 0 || x >= locations[0].length) return false;
  if (y < 0 || y >= locations.length) return false;

  if (locations[y][x] === 'occupied') return true;
  if (locations[y][x] === 'empty') return false;
  // throw new Error(`isSeatOccupied called on floor location (${x}, ${y})`);
  return false;
}

function setSeatOccupied (x: number, y: number, locations: Location[][], isOccupied: boolean): void {
  locations[y][x] = isOccupied ? 'occupied' : 'empty';
}

export function countOccupiedSeats (waitingArea: WaitingArea): number {
  let count = 0;
  waitingArea.seatList.forEach(seat => {
    if (isSeatOccupied(seat.x, seat.y, waitingArea.locations)) count++;
  });
  return count;
}
