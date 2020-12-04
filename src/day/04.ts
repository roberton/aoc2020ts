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
  const passportBlocks = convertLinesToPassportStrings(lines);
  const validPassports = passportBlocks.map(passport => isValidPassport2(passport));
  const validPassportCount = sumBooleanArray(validPassports);

  console.log(`Number of valid passports = ${validPassportCount}`);
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

export function isValidByr (byr: string): boolean {
  const byrVal = parseInt(byr, 10);
  return byrVal >= 1920 && byrVal <= 2002;
}

export function isValidIyr (iyr: string): boolean {
  const iyrVal = parseInt(iyr, 10);
  return iyrVal >= 2010 && iyrVal <= 2020;
}

export function isValidEyr (eyr: string): boolean {
  const eyrVal = parseInt(eyr, 10);
  return eyrVal >= 2020 && eyrVal <= 2030;
}

export function isValidHgt (hgt: string): boolean {
  const units = hgt.slice(-2);
  if (units === 'in') {
    const hgtValue = parseInt(hgt, 10);
    return hgtValue >= 59 && hgtValue <= 76;
  } else if (units === 'cm') {
    const hgtValue = parseInt(hgt, 10);
    return hgtValue >= 150 && hgtValue <= 193;
  }
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
