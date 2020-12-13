export const Day12 = {
  id: '12',
  star1,
  star2
};

export function star1 (lines: string[]): string {
  const instructions = parseInstructions(lines);
  const shipPosition = followInstructions(instructions);
  const distance = calcManhattanDistance(shipPosition);

  return `${distance}`;
}

export function star2 (lines: string[]): string {
  return 'TODO';
}

type Action = 'N' | 'S' | 'E' | 'W' | 'L' | 'R' | 'F';

export interface Instruction {
  action: Action
  value: number
}

interface Position {
  course: number
  x: number
  y: number
}

function parseInstructions (instructionLines: string[]): Instruction[] {
  return instructionLines.map(line => parseInstructionLine(line));
}

function parseInstructionLine (instructionLine: string): Instruction {
  const action = instructionLine[0] as Action;
  const value = parseInt(instructionLine.slice(1), 10);
  return {
    action,
    value
  };
}

// TODO: reduce duplication between compass directions and F
export function followInstructions (instructions: Instruction[]): Position {
  const shipsPosition = { course: 0, x: 0, y: 0 };
  instructions.forEach(instruction => {
    switch (instruction.action) {
      case 'N':
        shipsPosition.y += instruction.value;
        break;
      case 'S':
        shipsPosition.y -= instruction.value;
        break;
      case 'E':
        shipsPosition.x += instruction.value;
        break;
      case 'W':
        shipsPosition.x -= instruction.value;
        break;
      case 'R':
        shipsPosition.course = (shipsPosition.course + instruction.value) % 360;
        break;
      case 'L':
        shipsPosition.course -= instruction.value;
        shipsPosition.course = (shipsPosition.course < 0) ? shipsPosition.course + 360 : shipsPosition.course;
        break;
      case 'F':
        switch (shipsPosition.course) {
          case 0: shipsPosition.x += instruction.value; break;
          case 90: shipsPosition.y -= instruction.value; break;
          case 180: shipsPosition.x -= instruction.value; break;
          case 270: shipsPosition.y += instruction.value; break;
        }
        break;
    }
  });
  return shipsPosition;
}

function calcManhattanDistance (position: Position): number {
  return Math.abs(position.x) + Math.abs(position.y);
}
