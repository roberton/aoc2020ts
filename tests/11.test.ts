import { buildWaitingArea, movePeople, countOccupiedSeats } from '../src/11';

const testData = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL'
];

describe('buildWaitingArea', () => {
  it('should have 71 seats', () => {
    const result = buildWaitingArea(testData);
    expect(result.seatList.length).toBe(71);
  });

  it('should have 1st, 10th and last seats (0,0), (2, 1) and (9, 9)', () => {
    const result = buildWaitingArea(testData);
    expect(result.seatList[0]).toEqual({ x: 0, y: 0 });
    expect(result.seatList[9]).toEqual({ x: 2, y: 1 });
    expect(result.seatList[result.seatList.length - 1]).toEqual({ x: 9, y: 9 });
  });

  it('should have 1st last locations set to "empty"', () => {
    const result = buildWaitingArea(testData);
    expect(result.locations[0][0]).toBe('empty');
    expect(result.locations[9][9]).toBe('empty');
  });
});

describe('movePeople', () => {
  it('will fill every seat after one round for test data', () => {
    const waitingArea = buildWaitingArea(testData);
    waitingArea.locations = movePeople(waitingArea);

    waitingArea.seatList.forEach(seat => {
      expect(waitingArea.locations[seat.y][seat.x]).toBe('occupied');
    });
    expect(countOccupiedSeats(waitingArea)).toBe(71);
  });

  it('will show 20 occupied seats after 2 rounds for test data', () => {
    const waitingArea = buildWaitingArea(testData);
    waitingArea.locations = movePeople(waitingArea);
    waitingArea.locations = movePeople(waitingArea);

    expect(countOccupiedSeats(waitingArea)).toBe(20);
  });

  it('will show 37 occupied seats after 5 rounds for test data', () => {
    const waitingArea = buildWaitingArea(testData);
    waitingArea.locations = movePeople(waitingArea);
    waitingArea.locations = movePeople(waitingArea);
    waitingArea.locations = movePeople(waitingArea);
    waitingArea.locations = movePeople(waitingArea);
    waitingArea.locations = movePeople(waitingArea);

    expect(countOccupiedSeats(waitingArea)).toBe(37);
  });
});
