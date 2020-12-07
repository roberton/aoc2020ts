import { buildRuleFromRuleText, canContain, Bag, Rule, countBagsNeeded } from '../src/07';

const ruleTexts1 = [
  'light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.'
];

const ruleTexts2 = [
  'shiny gold bags contain 2 dark red bags.',
  'dark red bags contain 2 dark orange bags.',
  'dark orange bags contain 2 dark yellow bags.',
  'dark yellow bags contain 2 dark green bags.',
  'dark green bags contain 2 dark blue bags.',
  'dark blue bags contain 2 dark violet bags.',
  'dark violet bags contain no other bags.'
];

describe('buildRuleFromRuleText', () => {
  it('should build rule with two requirements for first example', () => {
    const ruleText = 'light red bags contain 1 bright white bag, 2 muted yellow bags';
    const rule = buildRuleFromRuleText(ruleText);

    expect(rule.bag.colour).toBe('light red');
    expect(rule.requirements.length).toBe(2);
    expect(rule.requirements[0].quantity).toBe(1);
    expect(rule.requirements[0].bag.colour).toBe('bright white');
    expect(rule.requirements[1].quantity).toBe(2);
    expect(rule.requirements[1].bag.colour).toBe('muted yellow');
  });
});

describe('canContain', () => {
  const shinyGoldBag: Bag = { colour: 'shiny gold' };
  let rules: Rule[] = [];

  beforeAll(() => {
    rules = ruleTexts1.map(ruleLine => buildRuleFromRuleText(ruleLine));
  });

  it('returns true for light red bag (indirect match)', () => {
    expect(canContain(rules[0], shinyGoldBag, rules)).toBe(true);
  });

  it('returns true for dark orange bag (indirect match)', () => {
    expect(canContain(rules[1], shinyGoldBag, rules)).toBe(true);
  });

  it('returns true for bright white bag (direct match)', () => {
    expect(canContain(rules[2], shinyGoldBag, rules)).toBe(true);
  });

  it('returns true for muted yellow bag (direct match)', () => {
    expect(canContain(rules[3], shinyGoldBag, rules)).toBe(true);
  });

  it('returns false for shiny gold bag', () => {
    expect(canContain(rules[4], shinyGoldBag, rules)).toBe(false);
  });

  it('returns false for dark olive bag', () => {
    expect(canContain(rules[5], shinyGoldBag, rules)).toBe(false);
  });

  it('returns false for vibrant plum bag', () => {
    expect(canContain(rules[6], shinyGoldBag, rules)).toBe(false);
  });

  it('returns false for faded blue bag', () => {
    expect(canContain(rules[7], shinyGoldBag, rules)).toBe(false);
  });

  it('returns false for dotted black bag', () => {
    expect(canContain(rules[8], shinyGoldBag, rules)).toBe(false);
  });
});

describe('countBagsNeeded', () => {
  const shinyGoldBag: Bag = { colour: 'shiny gold' };

  describe('for example rule set 1', () => {
    const rules = ruleTexts1.map(ruleLine => buildRuleFromRuleText(ruleLine));

    it('returns 32 bags for example data (plus the bag itself)', () => {
      expect(countBagsNeeded(shinyGoldBag, rules)).toBe(32 + 1);
    });
  });

  describe('for example rule set 2', () => {
    const rules = ruleTexts2.map(ruleLine => buildRuleFromRuleText(ruleLine));

    it('returns 126 bags for example data (plus the bag itself)', () => {
      expect(countBagsNeeded(shinyGoldBag, rules)).toBe(126 + 1);
    });
  });
});
