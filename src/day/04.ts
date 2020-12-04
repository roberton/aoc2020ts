// import { Day } from '../DayInterface';

export const Day4 = {
  star1,
  star2
};

function star1 (lines: string[]): void {
  const passportBlocks = convertLinesToPassportStrings(lines);

  const validPassportCount = passportBlocks.reduce(
    (acc, passport) => acc + (isValidPassport(passport) ? 1 : 0),
    0
  );
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
  const fieldCount = fields.reduce(
    (acc: number, field) => acc + (passport.includes(field) ? 1 : 0),
    0
  );
  return fieldCount === 7;
}
