import { followInstructions, Instruction } from '../src/12';

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
