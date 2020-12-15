import clonedeep from 'lodash.clonedeep';
import sumBooleanArray from '../lib/sumBooleanArray';

export const Day11 = {
  id: '11',
  star1,
  star2
};

// TODO: pull out common code from star1 and star2
export function star1 (lines: string[]): string {
  const waitingArea = buildWaitingArea(lines);

  let settled = false;
  let numberOfOccupiedSeats = 0;
  while (!settled) {
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
  const waitingArea = buildWaitingArea(lines);

  let settled = false;
  let numberOfOccupiedSeats = 0;
  while (!settled) {
    waitingArea.locations = movePeople2(waitingArea);
    const newCount = countOccupiedSeats(waitingArea);
    if (newCount === numberOfOccupiedSeats) {
      settled = true;
    } else {
      numberOfOccupiedSeats = newCount;
    }
  }

  return `${numberOfOccupiedSeats}`;
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

interface Direction {
  dx: number
  dy: number
}

const directions: Direction[] = [
  { dx: -1, dy: -1 },
  { dx: +0, dy: -1 },
  { dx: +1, dy: -1 },
  { dx: -1, dy: +0 },
  { dx: +1, dy: +0 },
  { dx: -1, dy: +1 },
  { dx: +0, dy: +1 },
  { dx: +1, dy: +1 }
];

export function buildWaitingArea (seatLayout: string[]): WaitingArea {
  const seatList: Seat[] = [];
  const locations: Location[][] = [];

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
    locations.push(gridRow);
  });

  return {
    seatList,
    locations
  };
}

// TODO: could combine movePeople and movePeople2 and instead pass in functions
// for if should fill a seat or empty a seat. Predicate functions?
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

export function movePeople2 (waitingArea: WaitingArea): Location[][] {
  const location = waitingArea.locations;
  const newLocations = clonedeep(waitingArea.locations);

  waitingArea.seatList.forEach(seat => {
    const numberOfOccupiedSeats = countLOSOccupiedSeats(seat.x, seat.y, waitingArea.locations);
    if (!isSeatOccupied(seat.x, seat.y, location) && numberOfOccupiedSeats === 0) {
      // fill seat
      setSeatOccupied(seat.x, seat.y, newLocations, true);
    } else if (isSeatOccupied(seat.x, seat.y, location) && numberOfOccupiedSeats >= 5) {
      // empty seat
      setSeatOccupied(seat.x, seat.y, newLocations, false);
    }
  });
  return newLocations;
}

function countAdjacentOccupiedSeats (x: number, y: number, locations: Location[][]): number {
  return sumBooleanArray(
    directions.map(direction => isSeatOccupied(x + direction.dx, y + direction.dy, locations))
  );
}

function countLOSOccupiedSeats (x: number, y: number, locations: Location[][]): number {
  return sumBooleanArray(
    directions.map(direction => isLosSeatOccupied(x, y, direction.dx, direction.dy, locations))
  );
}

function isLosSeatOccupied (x: number, y: number, dx: number, dy: number, locations: Location[][]): boolean {
  while (true) {
    x += dx;
    y += dy;
    if (isLocationOutOfBounds(x, y, locations)) return false;
    if (locations[y][x] === 'occupied') return true;
    if (locations[y][x] === 'empty') return false;
  }
}

function isSeatOccupied (x: number, y: number, locations: Location[][]): boolean {
  if (isLocationOutOfBounds(x, y, locations)) return false;
  if (locations[y][x] === 'occupied') return true;
  if (locations[y][x] === 'empty') return false;
  return false;
}

function isLocationOutOfBounds (x: number, y: number, locations: Location[][]): boolean {
  if (x < 0 || x >= locations[0].length) return true;
  if (y < 0 || y >= locations.length) return true;
  return false;
}

function setSeatOccupied (x: number, y: number, locations: Location[][], isOccupied: boolean): void {
  locations[y][x] = isOccupied ? 'occupied' : 'empty';
}

export function countOccupiedSeats (waitingArea: WaitingArea): number {
  return sumBooleanArray(
    waitingArea.seatList.map(seat => isSeatOccupied(seat.x, seat.y, waitingArea.locations))
  );
}
