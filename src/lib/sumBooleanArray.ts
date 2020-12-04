export default function sumBooleanArray (bools: boolean[]): number {
  return bools.reduce(
    (acc, bool) => acc + (bool ? 1 : 0),
    0
  );
}
