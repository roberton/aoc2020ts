import { sum } from '../lib/sum';
import groupLines from '../lib/groupLines';

export const Day16 = {
  id: '16',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const [ruleLines, ticketLines, nearbyTicketLines] = parseSections(lines);
  const rules = parseRulesFromRulesSection(ruleLines);
  const nearbyTickets = parseNearbyTickets(nearbyTicketLines);
  const invalidFields = findInvalidFields(nearbyTickets, rules);

  const errorRate = sum(invalidFields);
  return `${errorRate}`;
}

function star2 (lines: string[]): string {
  // const [ruleLines, ticketLines, nearbyTicketLines] = parseSections(lines);
  // const rules = parseRulesFromRulesSection(ruleLines);
  // const nearbyTickets = parseNearbyTickets(nearbyTicketLines);
  // const validTickets = findValidTickets(nearbyTickets, rules);

  // console.log(`Number of valid tickets = ${validTickets.length} (of ${nearbyTickets.length})`);

  // const fieldMappings = findFieldMappings(nearbyTickets, ranges);

  return 'TODO';
}

interface Rule {
  description: string
  ranges: Range[]
}

interface Range {
  min: number
  max: number
}

interface Ticket {
  fields: number[]
}

function parseSections (lines: string[]): string[][] {
  const groups = groupLines(lines);
  const ruleLines = groups[0];
  const yourTicketLines = groups[1].slice(1); // first line is a header so skip it
  const nearbyTicketLines = groups[2].slice(1); // first line is a header so skip it

  return [ruleLines, yourTicketLines, nearbyTicketLines];
}

export function parseRulesFromRulesSection (rules: string[]): Rule[] {
  return rules
    .map(ruleString => parseRuleString(ruleString));
}

function parseRuleString (ruleString: string): Rule {
  const [description, rangeString] = ruleString.split(': ');
  const subRangeStrings = rangeString.split(' or ');

  const ranges = subRangeStrings
    .map(subRangeString => {
      const [startString, endString] = subRangeString.split('-');
      return {
        min: parseInt(startString, 10),
        max: parseInt(endString, 10)
      };
    });

  return {
    description,
    ranges
  };
}

export function parseNearbyTickets (nearbyTicketLines: string[]): Ticket[] {
  return nearbyTicketLines
    .map(ticketLine => {
      return {
        fields: ticketLine.split(',').map(valueString => parseInt(valueString, 10))
      };
    });
}

function findInvalidFields (tickets: Ticket[], rules: Rule[]): number[] {
  return tickets
    .map(ticket => ticket.fields)
    .flat()
    .filter(field => !isFieldValid(field, rules));
}

function isFieldValid (field: number, rules: Rule[]): boolean {
  return rules
    .some(rule => ((field >= rule.ranges[0].min) && (field <= rule.ranges[0].max)) ||
    ((field >= rule.ranges[1].min) && (field <= rule.ranges[1].max)));
}

function findValidTickets (tickets: Ticket[], rules: Rule[]): Ticket[] {
  return tickets.filter(ticket => isTicketValid(ticket, rules));
}

function isTicketValid (ticket: Ticket, rules: Rule[]): boolean {
  return ticket.fields.every(field => isFieldValid(field, rules));
}

// export function findFieldMappings (tickets: Ticket[], ranges: Range[]) {
//   // create list of lists: for each field, all ranges
//   const validMappings = tickets[0].fields.map(_ => ranges);

//   tickets.forEach(ticket => {
//     validMappings.forEach((mapping, fieldIndex) => {
//       const ticketFieldValue = ticket.fields[fieldIndex];
//       if (!isFieldValid(ticketFieldValue, mapping)) {
//         validMappings[fieldIndex].splice(fieldIndex, 1);
//       }
//     });
//   });
// }
