import { sum } from '../lib/sum';
import groupLines from '../lib/groupLines';

export const Day16 = {
  id: '16',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const [ruleLines, ticketLines, nearbyTicketLines] = parseSections(lines);
  const ranges = parseRangesFromRulesSection(ruleLines);
  const nearbyTickets = parseNearbyTickets(nearbyTicketLines);
  const invalidFields = findInvalidFields(nearbyTickets, ranges);

  const errorRate = sum(invalidFields);
  return `${errorRate}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
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

export function parseRangesFromRulesSection (rules: string[]): Range[] {
  return rules
    .map(ruleString => parseRuleString(ruleString))
    .flat();
}

function parseRuleString (ruleString: string): Range[] {
  const [_, rangeString] = ruleString.split(': ');
  const ranges = rangeString.split(' or ');

  return ranges
    .map(rangeString => {
      const [startString, endString] = rangeString.split('-');
      return {
        min: parseInt(startString, 10),
        max: parseInt(endString, 10)
      };
    });
}

export function parseNearbyTickets (nearbyTicketLines: string[]): Ticket[] {
  return nearbyTicketLines
    .map(ticketLine => {
      return {
        fields: ticketLine.split(',').map(valueString => parseInt(valueString, 10))
      };
    });
}

function findInvalidFields (tickets: Ticket[], ranges: Range[]): number[] {
  return tickets
    .map(ticket => ticket.fields)
    .flat()
    .filter(field => !isFieldValid(field, ranges));
}

function isFieldValid (field: number, ranges: Range[]): boolean {
  return ranges.some(range => (field >= range.min) && (field <= range.max));
}
