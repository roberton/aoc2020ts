import sumBooleanArray from '../lib/sumBooleanArray';

export const Day7 = {
  id: '07',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const rules = lines.map(line => buildRuleFromRuleText(line));
  const shinyGoldBag: Bag = { colour: 'shiny gold' };
  const rulesThatAllowShinyGoldBags = rules.map(rule => canContain(rule, shinyGoldBag, rules));
  const canContainShinyGoldBagCount = sumBooleanArray(rulesThatAllowShinyGoldBags);

  return `${canContainShinyGoldBagCount}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

export interface Bag {
  colour: string
}

export interface Requirement {
  quantity: number
  bag: Bag
}

export interface Rule {
  bag: Bag
  requirements: Requirement[]
}

export function buildRuleFromRuleText (ruleText: string): Rule {
  const [bagString, requirementsString] = ruleText.split(' contain ');
  const bagColour = bagString.split(' ').slice(0, 2).join(' ');
  const requirementStrings = requirementsString.split(', ');

  const bag: Bag = { colour: bagColour };
  const requirements = requirementStrings.map(reqString => buildRequirementFromString(reqString));

  return {
    bag,
    requirements
  };
}

// reqString example: '1 mirrored tomato bag'
function buildRequirementFromString (reqString: string): Requirement {
  const words = reqString.split(' ');
  const quantity = parseInt(words[0], 10);
  const colour = [words[1], words[2]].join(' ');

  return {
    quantity,
    bag: { colour }
  };
}

// checks if this rule allows [bag] to be contained
// and recursively checks sub rules for the same
export function canContain (rule: Rule, bag: Bag, rules: Rule[]): boolean {
  return rule.requirements.some(requirement => {
    if (requirement.bag.colour === bag.colour) {
      return true;
    }
    const containedBagRules = rules.filter(rule => rule.bag.colour === requirement.bag.colour);
    return containedBagRules.some(containedBagRule => canContain(containedBagRule, bag, rules));
  });
}
