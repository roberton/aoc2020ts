// import { Day } from '../DayInterface';
import sumBooleanArray from '../lib/sumBooleanArray';
import groupLines from '../lib/groupLines';

export const Day4 = {
  id: '04',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const passportGroupedLines = groupLines(lines);
  const passportBlocks = passportGroupedLines.map(group => group.join(' '));
  const validPassports = passportBlocks.map(passport => isValidPassport(passport));
  const validPassportCount = sumBooleanArray(validPassports);

  return (`${validPassportCount}`);
}

function star2 (lines: string[]): string {
  const passportGroupedLines = groupLines(lines);
  const passportBlocks = passportGroupedLines.map(group => group.join(' '));
  const validPassports = passportBlocks.map(passport => isValidPassport2(passport));
  const validPassportCount = sumBooleanArray(validPassports);

  return (`${validPassportCount}`);
}

export function isValidPassport (passport: string): boolean {
  const fields = ['ecl:', 'pid:', 'eyr:', 'hcl:', 'byr:', 'iyr:', 'hgt:'];
  const fieldsPresent = fields.map(field => passport.includes(field));
  const fieldCount = sumBooleanArray(fieldsPresent);

  return fieldCount === 7;
}

// TODO: can this be rewritten using a map of fields to functions?
export function isValidPassport2 (passport: string): boolean {
  const fields = ['ecl:', 'pid:', 'eyr:', 'hcl:', 'byr:', 'iyr:', 'hgt:'];
  const fieldsValid: boolean[] = fields.map(field => {
    if (passport.includes(field)) {
      const fieldValue = passport.split(field)[1].split(' ')[0];
      if (field === 'byr:') return isValidByr(fieldValue);
      if (field === 'iyr:') return isValidIyr(fieldValue);
      if (field === 'eyr:') return isValidEyr(fieldValue);
      if (field === 'hgt:') return isValidHgt(fieldValue);
      if (field === 'hcl:') return isValidHcl(fieldValue);
      if (field === 'ecl:') return isValidEcl(fieldValue);
      if (field === 'pid:') return isValidPid(fieldValue);
    }
    return false;
  });
  const fieldCount = sumBooleanArray(fieldsValid);

  return fieldCount === 7;
}

function isBetween (value: number, lower: number, upper: number): boolean {
  return value >= lower && value <= upper;
}

export function isValidByr (byr: string): boolean {
  const byrVal = parseInt(byr, 10);
  return isBetween(byrVal, 1920, 2002);
}

export function isValidIyr (iyr: string): boolean {
  const iyrVal = parseInt(iyr, 10);
  return isBetween(iyrVal, 2010, 2020);
}

export function isValidEyr (eyr: string): boolean {
  const eyrVal = parseInt(eyr, 10);
  return isBetween(eyrVal, 2020, 2030);
}

export function isValidHgt (hgt: string): boolean {
  const isValidHgtImperial = (hgt: number): boolean => isBetween(hgt, 59, 76);
  const isValidHgtMetric = (hgt: number): boolean => isBetween(hgt, 150, 193);

  const units = hgt.slice(-2);
  const hgtValue = parseInt(hgt, 10);
  if (units === 'in') return isValidHgtImperial(hgtValue);
  if (units === 'cm') return isValidHgtMetric(hgtValue);
  return false;
}

export function isValidHcl (hcl: string): boolean {
  const regex = /^#[a-f0-9]{6}$/;
  return regex.test(hcl);
}

export function isValidEcl (ecl: string): boolean {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl);
}

export function isValidPid (pid: string): boolean {
  const regex = /^[0-9]{9}$/;
  return regex.test(pid);
}
