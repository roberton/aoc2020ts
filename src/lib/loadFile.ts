import { readFileSync } from 'fs';

export function loadFile (fileName: string): string[] {
  const input: string = readFileSync(fileName, 'utf8');
  const lines = input.split('\n');
  return lines;
}
