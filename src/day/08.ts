import clonedeep from 'lodash.clonedeep';

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
  const [exitStaus, accumulator] = runProgramUntilCompletion(program);

  return `${accumulator}`;
}

export function star2 (lines: string[]): string {
  const program = {
    instructions: lines.map(line => parseInstruction(line)),
    counter: 0,
    accumulator: 0
  };

  // TODO: can this be done as a map, returning [exitStatus, acc] for each version?
  let accResult = 0;

  program.instructions.forEach((instruction, index) => {
    const patch = makePatch(instruction, index);
    const patchedProgram = patchProgram(patch, program);
    const [exitStaus, accumulator] = runProgramUntilCompletion(patchedProgram);
    if (exitStaus === 'terminated') {
      accResult = accumulator;
    }
  });

  return `${accResult}`;
}

type OpCode = 'acc' | 'jmp' | 'nop';

export interface Instruction {
  opCode: OpCode
  argument: number
}

interface Program {
  instructions: Instruction[]
  counter: number
  accumulator: number
}

type ExitStatus = 'terminated' | 'loop';

interface Patch {
  opCode: OpCode
  location: number
}

export function parseInstruction (line: string): Instruction {
  const [opCodeString, argString] = line.split(' ');
  return {
    opCode: opCodeString as OpCode,
    argument: parseInt(argString)
  };
}

function runProgramUntilCompletion (program: Program): [ExitStatus, number] {
  let p = program;
  const counterHistory = new Map(); // TODO: should be Set

  while (p.counter < p.instructions.length) {
    counterHistory.set(p.counter, true);
    p = execute(p);
    if (counterHistory.has(p.counter)) {
      return ['loop', p.accumulator];
    }
  }

  if (p.counter === p.instructions.length) {
    return ['terminated', p.accumulator];
  }
  throw new Error('ERROR: runProgramUntilCompletion() did not complete as expected');
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

function makePatch (instruction: Instruction, location: number): Patch {
  const patchMappings = {
    acc: 'acc', // this stays the same
    nop: 'jmp',
    jmp: 'nop'
  };
  const opCode = patchMappings[instruction.opCode] as OpCode;
  return {
    opCode,
    location
  };
}

function patchProgram (patch: Patch, program: Program): Program {
  const instructions = clonedeep(program.instructions);
  instructions[patch.location].opCode = patch.opCode;
  const patchedProgram = {
    instructions,
    counter: program.counter,
    accumulator: program.accumulator
  };
  return patchedProgram;
}
