import { parsePolicyAndPassword } from '../src/02';

describe('parsePolicyAndPassword', () => {
  it('should parse "1-3 a: abcd" correctly', () => {
    const result = parsePolicyAndPassword('1-3 a: abcde');
    expect(result.password).toBe('abcde');
    expect(result.policy).toEqual({ min: 1, max: 3, letter: 'a' });
  });

  it('should parse "1-3 b: cdefg" correctly', () => {
    const result = parsePolicyAndPassword('1-3 b: cdefg');
    expect(result.password).toBe('cdefg');
    expect(result.policy).toEqual({ min: 1, max: 3, letter: 'b' });
  });

  it('should parse "2-9 c: ccccccccc" correctly', () => {
    const result = parsePolicyAndPassword('2-9 c: ccccccccc');
    expect(result.password).toBe('ccccccccc');
    expect(result.policy).toEqual({ min: 2, max: 9, letter: 'c' });
  });
});
