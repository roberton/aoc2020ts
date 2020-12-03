import { readFileSync } from 'fs';

export function loadFile (): string[] {
  const fileName = 'src/day/02.txt';

  const input: string = readFileSync(fileName, 'utf8');
  const lines = input.split('\n');
  return lines;
}
