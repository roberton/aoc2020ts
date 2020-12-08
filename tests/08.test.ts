import { parseInstruction, Instruction } from '../src/08';

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
