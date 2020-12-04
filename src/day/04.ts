// import { Day } from '../DayInterface';
import sumBooleanArray from '../lib/sumBooleanArray';

export const Day4 = {
  id: '04',
  star1,
  star2
};

function star1 (lines: string[]): void {
  const passportBlocks = convertLinesToPassportStrings(lines);
  const validPassports = passportBlocks.map(passport => isValidPassport(passport));
  const validPassportCount = sumBooleanArray(validPassports);

  console.log(`Number of valid passports = ${validPassportCount}`);
}

function star2 (lines: string[]): void {
}

export function convertLinesToPassportStrings (lines: string[]): string[] {
  let curBlock: string[] = [];
  const passportBlocks: string[] = [];

  lines.forEach(line => {
    if (line.trim().length > 0) {
      curBlock.push(line);
    } else {
      passportBlocks.push(curBlock.join(' '));
      curBlock = [];
    }
  });
  passportBlocks.push(curBlock.join(' '));
  return passportBlocks;
}

export function isValidPassport (passport: string): boolean {
  // const fields = ['ecl:', 'pid:', 'eyr:', 'hcl:', 'byr:', 'iyr:', 'cid:', 'hgt:'];
  const fields = ['ecl:', 'pid:', 'eyr:', 'hcl:', 'byr:', 'iyr:', 'hgt:'];
  const fieldsPresent = fields.map(field => passport.includes(field));
  const fieldCount = sumBooleanArray(fieldsPresent);

  return fieldCount === 7;
}
