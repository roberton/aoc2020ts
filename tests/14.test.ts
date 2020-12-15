import { parseInstructionString, Instruction, sumMemoryLocations, calcWriteValue, runProgram } from '../src/day/14';

describe('parseInstructionString', () => {
  it('should parse a mask instruction', () => {
    const instructionString = 'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
    const expectedResult: Instruction = { type: 'bitmask', bitmask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X' };

    expect(parseInstructionString(instructionString)).toEqual(expectedResult);
  });

  it('should parse a write instruction to location 8', () => {
    const instructionString = 'mem[8] = 11';
    const expectedResult: Instruction = { type: 'write', location: 8, value: 11 };

    expect(parseInstructionString(instructionString)).toEqual(expectedResult);
  });

  it('should parse a write instruction to location 7', () => {
    const instructionString = 'mem[7] = 101';
    const expectedResult: Instruction = { type: 'write', location: 7, value: 101 };

    expect(parseInstructionString(instructionString)).toEqual(expectedResult);
  });
});

describe('sumMemoryLocations', () => {
  it('should return 165 for example data', () => {
    const memory = new Map();
    memory.set(7, 101);
    memory.set(8, 64);

    expect(sumMemoryLocations(memory)).toBe(165);
  });

  it('should sum a map with values of 20, 30 and 50', () => {
    const memory = new Map();
    memory.set(123, 20);
    memory.set(42, 30);
    memory.set(10000, 50);

    expect(sumMemoryLocations(memory)).toBe(100);
  });
});

describe('calcWriteValue', () => {
  const exampleMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';

  it('should convert 11 to 73 for example mask', () => {
    expect(calcWriteValue(11, exampleMask)).toBe(73);
  });

  it('should convert 101 to 101 for example mask', () => {
    expect(calcWriteValue(101, exampleMask)).toBe(101);
  });

  it('should convert 0 to 64 for example mask', () => {
    expect(calcWriteValue(0, exampleMask)).toBe(64);
  });
});

describe('runProgram', () => {
  it('should return two memory locations with non-zero values totalling 165', () => {
    const program = [
      parseInstructionString('mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X'),
      parseInstructionString('mem[8] = 11'),
      parseInstructionString('mem[7] = 101'),
      parseInstructionString('mem[8] = 0')
    ];

    const memory = runProgram(program);
    expect(memory.size).toBe(2);
    expect(memory.get(7)).toBe(101);
    expect(memory.get(8)).toBe(64);
  });

  it('should return two memory locations with non-zero values totalling 165', () => {
    const program = [
      parseInstructionString('mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX00'),
      parseInstructionString('mem[10] = 7'),
      parseInstructionString('mem[20] = 12'),
      parseInstructionString('mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX11XX'),
      parseInstructionString('mem[30] = 7'),
      parseInstructionString('mem[40] = 12'),
      parseInstructionString('mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1100'),
      parseInstructionString('mem[50] = 15'),
      parseInstructionString('mem[60] = 31')
    ];

    const memory = runProgram(program);
    expect(memory.size).toBe(6);
    expect(memory.get(10)).toBe(4);
    expect(memory.get(20)).toBe(12);
    expect(memory.get(30)).toBe(15);
    expect(memory.get(40)).toBe(12);
    expect(memory.get(50)).toBe(12);
    expect(memory.get(60)).toBe(28);
  });

  it('should return handle a large value', () => {
    const program = [
      parseInstructionString('mask = 10XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'),
      parseInstructionString('mem[1] = 1'),
      parseInstructionString('mem[2] = 34359738368'), // top bit set
      parseInstructionString('mem[3] = 34359738369') // top bit set + 1
    ];
    const memory = runProgram(program);
    expect(memory.get(1)).toBe(34359738369);
    expect(memory.get(2)).toBe(34359738368);
    expect(memory.get(3)).toBe(34359738369);
  });
});
