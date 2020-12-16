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
    expect(result[0]).toEqual({ start: 1, end: 3 });
    expect(result[1]).toEqual({ start: 5, end: 7 });
    expect(result[2]).toEqual({ start: 6, end: 11 });
    expect(result[3]).toEqual({ start: 33, end: 44 });
    expect(result[4]).toEqual({ start: 13, end: 40 });
    expect(result[5]).toEqual({ start: 45, end: 50 });
  });
});

describe('parseNearbyTickets', () => {
  it('should return correct 12 ticket numbers', () => {
    const ticketLines = [
      '7,3,47',
      '40,4,50',
      '55,2,20',
      '38,6,12'
    ];
    const result = parseNearbyTickets(ticketLines);

    expect(result.length).toBe(12);
    expect(result[0]).toBe(7);
    expect(result[11]).toBe(12);
  });
});
