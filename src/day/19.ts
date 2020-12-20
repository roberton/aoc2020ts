import groupLines from '../lib/groupLines';
import { parseRulesFromRulesSection } from './16';

export const Day19 = {
  id: '19',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const [ruleSection, messages] = groupLines(lines);
  const rules = parseRuleSection(ruleSection);

  return 'TODO';
}

function star2 (lines: string[]): string {
  return 'TODO';
}

type RuleType = 'branch' | 'leaf';

interface Rule {
  id: number
  ruleType: RuleType
  body: LeafRule | NodeRule
}

interface LeafRule {
  character: string
}

interface NodeRule {
  ruleListA: number[]
  ruleListB: number[]
}

function parseRuleSection (ruleSection: string[]): Rule[] {
  return ruleSection.map(ruleString => parseRuleString(ruleString));
}

export function parseRuleString (ruleString: string): Rule {
  const [idString, bodyString] = ruleString.split(': ');
  const id = parseInt(idString, 10);
  if (bodyString[0] === '"') {
    return {
      id,
      ruleType: 'leaf',
      body: { character: bodyString[1] }
    };
  } else {
    const [listAString, listBString] = bodyString.split(' | ');
    const ruleListA = listAString.split(' ').map(subString => parseInt(subString, 10));
    const ruleListB = listBString === undefined ? [] : listBString.split(' ').map(subString => parseInt(subString, 10));
    return {
      id,
      ruleType: 'branch',
      body: { ruleListA, ruleListB }
    };
  };
}
