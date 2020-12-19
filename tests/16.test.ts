import { parseRulesFromRulesSection, parseNearbyTickets } from '../src/day/16';

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

// describe('findFieldMappings', () => {
//   it('should work for example data', () => {
//     const tickets = [
//       { fields: 3, 9, 18 },
//       { fields: 15, 1, 5 },
//       { fields: 5, 14, 9 }
//     ];
//     const ranges = [

//     ];
//   });
// });
