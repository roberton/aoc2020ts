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
    groupedAnswer => convertGroupedAnswersToBitmap(groupedAnswer)
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

function convertAnswersToBitmap (answerLine: string): number {
  const questions = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const answersBitmap = questions.reduce(
    (acc, question, index) => answerLine.includes(question) ? acc + 2 ** (25 - index) : acc,
    0
  );
  return answersBitmap;
}

export function convertGroupedAnswersToBitmap (answerGroup: string[]): number {
  return answerGroup
    .reduce((bitmapResult, answerLine) => {
      return bitmapResult & convertAnswersToBitmap(answerLine);
    },
    0b11111111111111111111111111
    );
}

function countOnesInBinaryNumber (binaryNumber: number): number {
  return binaryNumber.toString(2).split('1').length - 1;
}
