// given a list of strings, return a list of string lists
// where the outer list represents a group, each of which has several strings
export default function groupLines (lines: string[]): string[][] {
  let curBlock: string[] = [];
  const groups: string[][] = [];

  lines.forEach(line => {
    if (line.trim().length > 0) {
      curBlock.push(line);
    } else {
      groups.push(curBlock);
      curBlock = [];
    }
  });
  groups.push(curBlock);
  return groups;
}
