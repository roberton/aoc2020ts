import { readFileSync } from 'fs';

interface PasswordPolicy {
  letter: string
  min: number
  max: number
};

export interface PolicyAndPassword {
  policy: PasswordPolicy
  password: string
}

// TODO: replace for loop with reduce
export function star1 (): void {
  console.log('Day 2, Star 1');
  const lines = loadFile();
  const dbEntries = lines.map(line => parsePolicyAndPassword(line));

  let validCount = 0;
  dbEntries.forEach(entry => {
    if (isPasswordValid1(entry)) {
      validCount++;
    }
  });

  console.log(`Number of valid passwords: ${validCount}`);
}

export function star2 (): void {
  console.log('Day 2, Star 2');
  console.log(isPasswordValid2(parsePolicyAndPassword('1-3 a: abcde')));
  console.log(isPasswordValid2(parsePolicyAndPassword('1-3 b: cdefg')));
  console.log(isPasswordValid2(parsePolicyAndPassword('2-9 c: ccccccccc')));

  const lines = loadFile();
  const dbEntries = lines.map(line => parsePolicyAndPassword(line));

  let validCount = 0;
  dbEntries.forEach(entry => {
    if (isPasswordValid2(entry)) {
      validCount++;
    }
  });

  console.log(`Number of valid passwords: ${validCount}`);
}

function loadFile (): string[] {
  const fileName = 'src/day/02.txt';

  const input: string = readFileSync(fileName, 'utf8');
  const lines = input.split('\n');
  return lines;
}

export function parsePolicyAndPassword (line: string): PolicyAndPassword {
  const [policyString, password] = line.split(': ');
  const [minmaxString, letter] = policyString.split(' ');
  const [minString, maxString] = minmaxString.split('-');

  const policy: PasswordPolicy = {
    letter,
    min: parseInt(minString, 10),
    max: parseInt(maxString, 10)
  };

  return {
    policy,
    password
  };
}

// Password validation for sled rental place
function isPasswordValid1 (entry: PolicyAndPassword): boolean {
  const letterCount = entry.password.split(entry.policy.letter).length - 1;
  return (letterCount >= entry.policy.min && letterCount <= entry.policy.max);
}

// Official Toboggan Corporate Policy
function isPasswordValid2 (entry: PolicyAndPassword): boolean {
  // const isCharAtMinPosition = entry.password[entry.policy.min + 1] === entry.policy.letter;
  // const isCharAtMaxPosition = entry.password[entry.policy.max + 1] === entry.policy.letter;
  // return (isCharAtMinPosition && !isCharAtMaxPosition) ||
  //   (!isCharAtMinPosition && isCharAtMaxPosition);
  //   const isCharAtMinPosition = entry.password[entry.policy.min + 1] === entry.policy.letter;
  let count = 0;
  // console.log(`Testing ${JSON.stringify(entry)}`);
  // console.log(`${entry.password[entry.policy.min + 1]} and ${entry.password[entry.policy.max + 1]}`);
  if (entry.password[entry.policy.min - 1] === entry.policy.letter) count++;
  if (entry.password[entry.policy.max - 1] === entry.policy.letter) count++;
  return count === 1;
}
