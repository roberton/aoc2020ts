import sumBooleanArray from '../lib/sumBooleanArray';
import groupLines from '../lib/groupLines';

export const Day6 = {
  id: '06',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const groups = groupLines(lines);
  const groupAnswerFlags = groups.map(group => countAnswers(group.join('')));

  const answersSum = groupAnswerFlags.reduce((acc, answer) => acc + answer);
  return `${answersSum}`;
}

function star2 (lines: string[]): string {
  const groupedAnswers = groupLines(lines);
  const groupedBinaryAnswers = groupedAnswers.map(
    groupedAnswer => convertGroupedAnswersToBinaryLine(groupedAnswer)
  );
  const groupAnswerCounts = groupedBinaryAnswers.map(
    binaryAnswer => countOnesInBinaryNumber(binaryAnswer)
  );

  const answersSum = groupAnswerCounts.reduce((acc, answer) => acc + answer);
  return `${answersSum}`;
}

export function countAnswers (group: string): number {
  const questions = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const answersArray = questions.map(question => group.includes(question));
  return sumBooleanArray(answersArray);
}

function convertAnswersToFlags (answerLine: string): boolean[] {
  const questions = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const answersArray = questions.map(question => answerLine.includes(question));
  return answersArray;
}

export function convertGroupedAnswersToBinaryLine (answerGroup: string[]): number {
  // set binary to be all true initially
  let groupBinaryAnswers = 0b11111111111111111111111111;
  answerGroup.forEach(answerLine => {
    const answerFlags = convertAnswersToFlags(answerLine);
    const answerBinary = convertFlagsToBinary(answerFlags);
    groupBinaryAnswers = groupBinaryAnswers & answerBinary;
  });
  return groupBinaryAnswers;
}

function convertFlagsToBinary (answerFlags: boolean[]): number {
  let binary = 0;
  for (let i = 0; i < 26; i++) {
    if (answerFlags[i]) binary += 2 ** (25 - i);
  }
  return binary;
}

function countOnesInBinaryNumber (binaryNumber: number): number {
  return binaryNumber.toString(2).split('1').length - 1;
}
