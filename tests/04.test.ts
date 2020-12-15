import {
  isValidPassport, isValidPassport2,
  isValidByr, isValidHgt, isValidHcl, isValidEcl, isValidPid
} from '../src/day/04';

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

describe('isValidPassport2', () => {
  it('should return true for first valid example', () => {
    const passport = 'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f';
    expect(isValidPassport2(passport)).toBe(true);
  });

  it('should return true for second valid example', () => {
    const passport = 'eyr:2029 ecl:blu cid:129 byr:1989 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm';
    expect(isValidPassport2(passport)).toBe(true);
  });

  it('should return true for third valid example', () => {
    const passport = 'hcl:#888785 hgt:164cm byr:2001 iyr:2015 cid:88 pid:545766238 ecl:hzl eyr:2022';
    expect(isValidPassport2(passport)).toBe(true);
  });

  it('should return true for fourth valid example', () => {
    const passport = 'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719';
    expect(isValidPassport2(passport)).toBe(true);
  });

  it('should return false for first invalid example', () => {
    const passport = 'eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926';
    expect(isValidPassport2(passport)).toBe(false);
  });

  it('should return false for second invalid example', () => {
    const passport = 'iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:19466';
    expect(isValidPassport2(passport)).toBe(false);
  });

  it('should return false for third invalid example', () => {
    const passport = 'hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277';
    expect(isValidPassport2(passport)).toBe(false);
  });

  it('should return false for fourth invalid example', () => {
    const passport = 'hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007';
    expect(isValidPassport2(passport)).toBe(false);
  });
});

describe('field validation functions, valid cases', () => {
  it('isValidByr return true for 2002', () => {
    expect(isValidByr('2002')).toBe(true);
  });

  it('isValidHgt return true for 60in', () => {
    expect(isValidHgt('60in')).toBe(true);
  });

  it('isValidHgt return true for 190cm', () => {
    expect(isValidHgt('190cm')).toBe(true);
  });

  it('isValidHcl return true for #123abc', () => {
    expect(isValidHcl('#123abc')).toBe(true);
  });

  it('isValidEcl return true for brn', () => {
    expect(isValidEcl('brn')).toBe(true);
  });

  it('isValidPid return true for 000000001', () => {
    expect(isValidPid('000000001')).toBe(true);
  });
});

describe('field validation functions, invalid cases', () => {
  it('isValidByr return false for 2003', () => {
    expect(isValidByr('2003')).toBe(false);
  });

  it('isValidHgt return false for 190in', () => {
    expect(isValidHgt('190in')).toBe(false);
  });

  it('isValidHgt return false for 190', () => {
    expect(isValidHgt('190')).toBe(false);
  });

  it('isValidHcl return false for #123abz', () => {
    expect(isValidHcl('#123abz')).toBe(false);
  });

  it('isValidHcl return false for 123abc', () => {
    expect(isValidHcl('123abc')).toBe(false);
  });

  it('isValidEcl return false for wat', () => {
    expect(isValidEcl('wat')).toBe(false);
  });

  it('isValidPid return false for 0123456789', () => {
    expect(isValidPid('0123456789')).toBe(false);
  });
});
