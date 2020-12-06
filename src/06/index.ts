import sumBooleanArray from '../lib/sumBooleanArray';

export const Day6 = {
  id: '06',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const groups = convertLinesToGroups(lines);
  const answers = groups.map(group => countAnswersInGroup(group));

  const answersSum = answers.reduce((acc, answer) => acc + answer);
  return `${answersSum}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

// TODO: look to combine this with function for day 04
export function convertLinesToGroups (lines: string[]): string[] {
  let curBlock: string[] = [];
  const groupBlocks: string[] = [];

  lines.forEach(line => {
    if (line.trim().length > 0) {
      curBlock.push(line);
    } else {
      groupBlocks.push(curBlock.join(''));
      curBlock = [];
    }
  });
  groupBlocks.push(curBlock.join(''));
  return groupBlocks;
}

export function countAnswersInGroup (group: string): number {
  const questions = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const answersArray = questions.map(question => group.includes(question));
  return sumBooleanArray(answersArray);
}
