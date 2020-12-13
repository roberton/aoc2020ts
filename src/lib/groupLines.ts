// given a list of strings, return a list of string lists
// where the outer list represents a group, each of which has several strings
export default function groupLines (lines: string[]): string[][] {
  const groups: string[][] = [[]];

  lines.forEach(line => {
    if (line.trim().length > 0) {
      groups[groups.length - 1].push(line);
    } else {
      groups.push([]);
    }
  });
  return groups;
}
