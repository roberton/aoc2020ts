import { sum } from '../lib/sum';

export const Day14 = {
  id: '14',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const program = loadProgram(lines);
  const memory = runProgram(program);

  const memorySum = sumMemoryLocations(memory);
  return `${memorySum}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

interface BitmaskInstruction {
  type: 'bitmask'
  bitmask: string
}

interface WriteInstruction {
  type: 'write'
  location: number
  value: number
}

export type Instruction = BitmaskInstruction | WriteInstruction;

type Memory = Map<number, number>;

function loadProgram (lines: string[]): Instruction[] {
  return lines.map(line => parseInstructionString(line));
}

export function runProgram (program: Instruction[]): Memory {
  const updatedMemory: Memory = new Map();
  let bitmask = '';
  program.reduce((memory, instruction) => {
    if (instruction.type === 'bitmask') {
      bitmask = instruction.bitmask;
    } else {
      const writeValue = calcWriteValue(instruction.value, bitmask);
      memory.set(instruction.location, writeValue);
    }
    return memory;
  },
  updatedMemory);

  return updatedMemory;
}

export function calcWriteValue (value: number, bitmask: string): number {
  const zeroBitstring = bitmask.split('').map(value => value === '0' ? '0' : '1').join('');
  const zeroBitmask = parseInt(zeroBitstring, 2);

  const oneBitstring = bitmask.split('').map(value => value === '1' ? '1' : '0').join('');
  const oneBitmask = parseInt(oneBitstring, 2);

  const writeValue = BigInt(value) & BigInt(zeroBitmask) | BigInt(oneBitmask);
  return Number(writeValue);
}

export function parseInstructionString (instructionString: string): Instruction {
  const [operation, value] = instructionString.split(' = ');
  if (operation === 'mask') {
    return {
      type: 'bitmask',
      bitmask: value
    };
  } else {
    return {
      type: 'write',
      location: parseInt(operation.split('[')[1], 10),
      value: parseInt(value, 10)
    };
  }
}

export function sumMemoryLocations (memory: Memory): number {
  return sum(Array.from(memory.values()));
}
