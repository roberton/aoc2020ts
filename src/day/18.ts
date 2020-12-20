import { sum } from '../lib/sum';

export const Day18 = {
  id: '18',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const expressionValues = lines.map(expression => evaluateExpression(expression));
  const expressionSum = sum(expressionValues);

  return `${expressionSum}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

type Operation = 'none' | 'add' | 'multiply';

export function evaluateExpression (expression: string): number {
  const tokens = expression.replace(/\(/g, '( ').replace(/\)/g, ' )').split(' ');
  return evaluateTokens(tokens);
}

function evaluateTokens (tokens: string[]): number {
  // console.log(`evaluateTokens(${JSON.stringify(tokens)})`);
  let curOperation: Operation = 'none';
  let curValue = 0;

  while (tokens.length > 0) {
    const curToken = tokens.shift() ?? ''; // the coalensce is to keep the linter happy
    switch (curToken) {
      case '+': curOperation = 'add'; break;
      case '*': curOperation = 'multiply'; break;
      case '(': {
        const operand = evaluateTokens(tokens);
        curValue = applyOperation(curValue, curOperation, operand);
        break;
      }
      case ')': {
        return curValue;
      }
      default: {
        const operand = parseInt(curToken, 10);
        curValue = applyOperation(curValue, curOperation, operand);
        break;
      }
    }
  }
  // console.log(`evaluateTokens() returning ${curValue}`);
  return curValue;
}

function applyOperation (lhs: number, operation: Operation, rhs: number): number {
  switch (operation) {
    case 'add':
      return lhs + rhs;
    case 'multiply':
      return lhs * rhs;
    default:
      return rhs;
  }
}
