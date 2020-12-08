export const Day8 = {
  id: '08',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const program = {
    instructions: lines.map(line => parseInstruction(line)),
    counter: 0,
    accumulator: 0
  };

  let p = program;
  const counterHistory = new Map();
  let halt = false;
  while (!halt) {
    counterHistory.set(p.counter, true);
    p = execute(p);
    if (counterHistory.has(p.counter)) {
      halt = true;
    }
  }

  return `${p.accumulator}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

// TODO: can opCode be further restricted?
export interface Instruction {
  opCode: string
  argument: number
}

interface Program {
  instructions: Instruction[]
  counter: number
  accumulator: number
}

export function parseInstruction (line: string): Instruction {
  const [opCode, argString] = line.split(' ');
  return {
    opCode,
    argument: parseInt(argString)
  };
}

function execute (program: Program): Program {
  const newProgram = program;

  const instruction = program.instructions[program.counter];
  switch (instruction.opCode) {
    case 'nop':
      newProgram.counter += 1;
      break;
    case 'acc':
      newProgram.counter += 1;
      newProgram.accumulator += instruction.argument;
      break;
    case 'jmp':
      newProgram.counter += instruction.argument;
      break;
  }
  return newProgram;
}
