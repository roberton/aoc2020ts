import { parseRulesFromRulesSection, parseNearbyTickets, findValidFieldMappings, resolveFieldLogic, FieldOrder } from '../src/day/16';

describe('parseRulesFromRulesSection', () => {
  it('should return correct 6 ranges from example data', () => {
    const ruleStrings = [
      'class: 1-3 or 5-7',
      'row: 6-11 or 33-44',
      'seat: 13-40 or 45-50'
    ];
    const result = parseRulesFromRulesSection(ruleStrings);

    expect(result.length).toEqual(3);
    expect(result[0]).toEqual({ description: 'class', ranges: [{ min: 1, max: 3 }, { min: 5, max: 7 }] });
    expect(result[1]).toEqual({ description: 'row', ranges: [{ min: 6, max: 11 }, { min: 33, max: 44 }] });
    expect(result[2]).toEqual({ description: 'seat', ranges: [{ min: 13, max: 40 }, { min: 45, max: 50 }] });
  });
});

describe('parseNearbyTickets', () => {
  it('should return correct 4 tickets, each with 3 fields', () => {
    const ticketLines = [
      '7,3,47',
      '40,4,50',
      '55,2,20',
      '38,6,12'
    ];
    const result = parseNearbyTickets(ticketLines);

    expect(result.length).toBe(4);
    expect(result[0]).toEqual({ fields: [7, 3, 47] });
    expect(result[3]).toEqual({ fields: [38, 6, 12] });
  });
});

describe('findValidFieldMappings', () => {
  it('should work for example data for part 2', () => {
    const tickets = [
      { fields: [3, 9, 18] },
      { fields: [15, 1, 5] },
      { fields: [5, 14, 9] }
    ];
    const rules = [
      { description: 'class', ranges: [{ min: 0, max: 1 }, { min: 4, max: 19 }] },
      { description: 'row', ranges: [{ min: 0, max: 5 }, { min: 8, max: 19 }] },
      { description: 'seat', ranges: [{ min: 0, max: 13 }, { min: 16, max: 19 }] }
    ];

    const result = findValidFieldMappings(tickets, rules);

    expect(result.length).toBe(3); // there are three fields
    expect(result[0].isRuleValid).toEqual([false, true, false]); // first field must be 'row'
    expect(result[1].isRuleValid).toEqual([true, true, false]); // second field must be 'class'
    expect(result[2].isRuleValid).toEqual([true, true, true]); // third field must be 'seat'
  });
});

describe('resolveFieldLogic', () => {
  it('should resolve example values', () => {
    const validFieldToRuleArray = [
      { fieldIndex: 0, isRuleValid: [false, true, false] },
      { fieldIndex: 1, isRuleValid: [true, true, false] },
      { fieldIndex: 2, isRuleValid: [true, true, true] }
    ];
    const expected: FieldOrder[] = [
      { fieldIndex: 0, ruleIndex: 1 },
      { fieldIndex: 1, ruleIndex: 0 },
      { fieldIndex: 2, ruleIndex: 2 }
    ];

    expect(resolveFieldLogic(validFieldToRuleArray)).toEqual(expected);
  });
});
