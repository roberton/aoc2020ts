import { parseRangesFromRulesSection, parseNearbyTickets } from '../src/day/16';

describe('parseRangesFromRulesSection', () => {
  it('should return correct 6 ranges from example data', () => {
    const ruleStrings = [
      'class: 1-3 or 5-7',
      'row: 6-11 or 33-44',
      'seat: 13-40 or 45-50'
    ];
    const result = parseRangesFromRulesSection(ruleStrings);

    expect(result.length).toEqual(6);
    expect(result[0]).toEqual({ min: 1, max: 3 });
    expect(result[1]).toEqual({ min: 5, max: 7 });
    expect(result[2]).toEqual({ min: 6, max: 11 });
    expect(result[3]).toEqual({ min: 33, max: 44 });
    expect(result[4]).toEqual({ min: 13, max: 40 });
    expect(result[5]).toEqual({ min: 45, max: 50 });
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
