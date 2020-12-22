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
  // const validMessags = generateValidMessages(rules);

  return 'TODO';
}

function star2 (lines: string[]): string {
  return 'TODO';
}

type RuleType = 'branch' | 'leaf';
type Message = string;

interface Rule {
  id: number
  ruleType: RuleType
  leafRule?: LeafRule
  nodeRule?: NodeRule
}

interface LeafRule {
  character: string
}

interface NodeRule {
  ruleListA: number[]
  ruleListB: number[]
}

export function parseRuleSection (ruleSection: string[]): Rule[] {
  return ruleSection.map(ruleString => parseRuleString(ruleString));
}

export function parseRuleString (ruleString: string): Rule {
  const [idString, bodyString] = ruleString.split(': ');
  const id = parseInt(idString, 10);
  if (bodyString[0] === '"') {
    return {
      id,
      ruleType: 'leaf',
      leafRule: { character: bodyString[1] }
    };
  } else {
    const [listAString, listBString] = bodyString.split(' | ');
    const ruleListA = listAString.split(' ').map(subString => parseInt(subString, 10));
    const ruleListB = listBString === undefined ? [] : listBString.split(' ').map(subString => parseInt(subString, 10));
    return {
      id,
      ruleType: 'branch',
      nodeRule: { ruleListA, ruleListB }
    };
  };
}

// export function generateValidMessages (rules: Rule[]): Message[] {
//   let messages = [];
//   const rule = rules[0];

//   // assume rule is a branch
//   if (rule.ruleType === 'branch') {

//   }

//   // @ts-ignore - thinks curRule can be undefined, but we've guarded against this
//   if (curRule.ruleType === 'leaf') {
//     return message + curRule.body.character;

//   }
//   }
//   return ['aab'];
// }

export function isMessageValidSuper (message: Message, rules: Rule[]): boolean {
  const [isValid, remainingMessage] = isMessageValid(message, rules[0], rules);
  if (isValid) {
    console.log(`isMessageValidSuper(${message}) returning true...`);
    if (remainingMessage.length === 0) {
      console.log('... yes, actually :-)');
      return true;
    } else {
      console.log(`... BUT NO! There is some unmatched part of the message ${remainingMessage}`);
    }
  }
  return false;
}

export function isMessageValid (message: Message, curRule: Rule, rules: Rule[]): [boolean, string] {
  console.log(`isMessageValid(${message}, ${curRule.id}, ${rules.length})`);

  if (curRule.ruleType === 'leaf' && curRule.leafRule !== undefined) {
    const isValid = message[0] === curRule.leafRule.character;
    console.log('isMessageValid() returning ', isValid);
    return [isValid, message.slice(1)];
  } else if (curRule.ruleType === 'branch' && curRule.nodeRule !== undefined) {
    const ruleListA: number[] = curRule.nodeRule?.ruleListA;
    const [isValid, remainingMessage] = tryRuleListForMessage(message, ruleListA, rules);
    if (isValid) {
      return [true, remainingMessage];
    } else {
      const ruleListB: number[] = curRule.nodeRule?.ruleListB;
      const [isValid, remainingMessage] = tryRuleListForMessage(message, ruleListB, rules);
      return [isValid, remainingMessage];
    }
  }

  throw new Error('isMessageValid() called with invalid rule');
}

function tryRuleListForMessage (message: Message, ruleList: number[], rules: Rule[]): [boolean, string] {
  console.log(`tryRuleListForMessage(${message}, ${JSON.stringify(ruleList)}, ${rules.length})`);
  if (ruleList.length === 0) {
    return [false, message];
  }

  const rule1 = rules[ruleList[0]];
  const rule2 = rules[ruleList[1]];

  const [rule1Valid, rule1RemainingMessage] = isMessageValid(message, rule1, rules);
  if (rule1Valid) {
    const [rule2Valid, rule2RemaingMessage] = isMessageValid(rule1RemainingMessage, rule2, rules);
    console.log(`tryRuleListForMessage(${message}, ${JSON.stringify(ruleList)}) returning ${JSON.stringify(rule2Valid)}`);
    return [rule2Valid, rule2RemaingMessage];
  } else {
    console.log(`tryRuleListForMessage(${message}, ${JSON.stringify(ruleList)}) returning false`);
    return [false, message];
  }
}
