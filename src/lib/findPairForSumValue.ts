export function findPairForSumValue (testValue: number, numbers: number[]): number[] {
  const resultPair: number[] = [];
  numbers.forEach((lhsValue, i) => {
    numbers.slice(i).forEach(rhsValue => {
      if ((lhsValue + rhsValue === testValue) && resultPair.length === 0) {
        resultPair.push(lhsValue, rhsValue);
      }
    });
  });
  return resultPair;
}
