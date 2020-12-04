import { convertLinesToPassportStrings, isValidPassport } from '../src/day/04';

const testInput = [
  'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
  'byr:1937 iyr:2017 cid:147 hgt:183cm',
  '',
  'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
  'hcl:#cfa07d byr:1929',
  '',
  'hcl:#ae17e1 iyr:2013',
  'eyr:2024',
  'ecl:brn pid:760753108 byr:1931',
  'hgt:179cm',
  '',
  'hcl:#cfa07d eyr:2025 pid:166559648',
  'iyr:2011 ecl:brn hgt:59in'
];

describe('convertLinesToPassportBlocks', () => {
  it('should return four blocks for the test example', () => {
    expect(convertLinesToPassportStrings(testInput).length).toBe(4);
  });
});

describe('isValidPassport', () => {
  it('should return true for first example', () => {
    const passport = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm';
    expect(isValidPassport(passport)).toBe(true);
  });

  it('should return false for second example', () => {
    const passport = 'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929';
    expect(isValidPassport(passport)).toBe(false);
  });

  it('should return true for third example', () => {
    const passport = 'hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm';
    expect(isValidPassport(passport)).toBe(true);
  });

  it('should return true for false example', () => {
    const passport = 'hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in';
    expect(isValidPassport(passport)).toBe(false);
  });
});
