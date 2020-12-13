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
  const instructions = parseInstructions(lines);
  const shipPosition = followWaypointInstructions(instructions);
  const distance = calcManhattanDistance(shipPosition);

  return `${distance}`;
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

interface Waypoint {
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

export function followWaypointInstructions (instructions: Instruction[]): Position {
  const shipsPosition = { course: 0, x: 0, y: 0 };
  let waypoint = { x: 10, y: 1 };

  instructions.forEach(instruction => {
    switch (instruction.action) {
      case 'N':
        waypoint.y += instruction.value;
        break;
      case 'S':
        waypoint.y -= instruction.value;
        break;
      case 'E':
        waypoint.x += instruction.value;
        break;
      case 'W':
        waypoint.x -= instruction.value;
        break;
      case 'R':
        waypoint = rotateWaypoint(waypoint, instruction.value);
        break;
      case 'L':
        waypoint = rotateWaypoint(waypoint, -instruction.value);
        break;
      case 'F':
        shipsPosition.x += waypoint.x * instruction.value;
        shipsPosition.y += waypoint.y * instruction.value;
        break;
    }
  });
  return shipsPosition;
}

function calcManhattanDistance (position: Position): number {
  return Math.abs(position.x) + Math.abs(position.y);
}

export function rotateWaypoint (waypoint: Waypoint, angle: number): Waypoint {
  const normAngle = angle < 0 ? angle + 360 : angle;
  let newWaypoint = waypoint;
  switch (normAngle) {
    case 90:
      newWaypoint = { x: waypoint.y, y: -waypoint.x };
      break;
    case 180:
      newWaypoint = { x: -waypoint.x, y: -waypoint.y };
      break;
    case 270:
      newWaypoint = { x: -waypoint.y, y: waypoint.x };
      break;
    default: {
      throw new Error(`rotateWaypoint(${angle}) - unexpected angle`);
    }
  }
  return newWaypoint;
}
