import { parseInstruction, Instruction, star2 } from '../src/day/08';

describe('parseInstructions', () => {
  it('should parse "nop +0" corectly', () => {
    const instruction = parseInstruction('nop +0');
    expect(instruction.opCode).toBe('nop');
    expect(instruction.argument).toBe(0);
  });

  it('should parse "acc +1" corectly', () => {
    const instruction = parseInstruction('acc +1');
    expect(instruction.opCode).toBe('acc');
    expect(instruction.argument).toBe(1);
  });

  it('should parse "jmp -3" corectly', () => {
    const instruction = parseInstruction('jmp -3');
    expect(instruction.opCode).toBe('jmp');
    expect(instruction.argument).toBe(-3);
  });
});

describe('star2', () => {
  const testLines = [
    'nop +0',
    'acc +1',
    'jmp +4',
    'acc +3',
    'jmp -3',
    'acc -99',
    'acc +1',
    'jmp -4',
    'acc +6'
  ];
  it('should find that patching example program at location 7 results in acc of 8', () => {
    expect(star2(testLines)).toBe('8');
  });
});
