import sumBooleanArray from '../lib/sumBooleanArray';

export const Day2 = {
  id: '02',
  star1,
  star2
};

interface PasswordPolicy {
  letter: string
  min: number
  max: number
};

export interface PolicyAndPassword {
  policy: PasswordPolicy
  password: string
}

function star1 (lines: string[]): string {
  const dbEntries = lines.map(line => parsePolicyAndPassword(line));
  const validPasswords = dbEntries.map(entry => isPasswordValid1(entry));
  const validCount = sumBooleanArray(validPasswords);

  return `${validCount}`;
}

function star2 (lines: string[]): string {
  const dbEntries = lines.map(line => parsePolicyAndPassword(line));
  const validPasswords = dbEntries.map(entry => isPasswordValid2(entry));
  const validCount = sumBooleanArray(validPasswords);

  return `${validCount}`;
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
  let count = 0;
  if (entry.password[entry.policy.min - 1] === entry.policy.letter) count++;
  if (entry.password[entry.policy.max - 1] === entry.policy.letter) count++;
  return count === 1;
}
