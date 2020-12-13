import { followInstructions, followWaypointInstructions, rotateWaypoint, Instruction } from '../src/12';

const testData: Instruction[] = [
  { action: 'F', value: 10 },
  { action: 'N', value: 3 },
  { action: 'F', value: 7 },
  { action: 'R', value: 90 },
  { action: 'F', value: 11 }
];

describe('followInstructions', () => {
  it('should return a position of (17, 8) for test data', () => {
    expect(followInstructions(testData)).toEqual({ x: 17, y: -8, course: 90 });
  });
});

describe('rotateWaypoint', () => {
  it('should move waypoint from (10, 4) to (4, -10) for R90', () => {
    const initialWaypoint = { x: 10, y: 4 };
    expect(rotateWaypoint(initialWaypoint, 90)).toEqual({ x: 4, y: -10 });
  });

  it('should move waypoint from (10, 4) to (4, -10) for L270', () => {
    const initialWaypoint = { x: 10, y: 4 };
    expect(rotateWaypoint(initialWaypoint, -270)).toEqual({ x: 4, y: -10 });
  });

  it('should move waypoint from (10, 4) to (-10, -4) for L180', () => {
    const initialWaypoint = { x: 10, y: 4 };
    expect(rotateWaypoint(initialWaypoint, -180)).toEqual({ x: -10, y: -4 });
  });
});

describe('followWaypointInstructions', () => {
  it('should return a position of (214, -72) for test data', () => {
    expect(followWaypointInstructions(testData)).toEqual({ x: 214, y: -72, course: 0 });
  });
});
