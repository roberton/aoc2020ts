import { sum } from '../lib/sum';

export const Day16 = {
  id: '16',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const [ruleLines, ticketLines, nearbyTicketLines] = parseSections(lines);
  const ranges = parseRangesFromRulesSection(ruleLines);
  const nearbyTickets = parseNearbyTickets(nearbyTicketLines);

  const invalidTickets = nearbyTickets
    .filter(ticket => !isTicketValid(ticket, ranges));

  console.log(nearbyTickets);
  console.log(invalidTickets);
  const errorRate = sum(invalidTickets);

  return `${errorRate}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

interface Range {
  start: number
  end: number
}

// TODO: can use groupLines()?
function parseSections (lines: string[]): string[][] {
  const initialRanges: number[] = [];
  const rangeBreakIndexes: number[] = lines
    .reduce((acc, line, index) => {
      if (line.length === 0) {
        acc.push(index);
      }
      return acc;
    },
    initialRanges
    );

  const ruleLines = lines.slice(0, rangeBreakIndexes[0]);
  const yourTicketLines = lines.slice(rangeBreakIndexes[0] + 1, rangeBreakIndexes[1]);
  const nearbyTicketLines = lines.slice(rangeBreakIndexes[1] + 2);

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
        start: parseInt(startString, 10),
        end: parseInt(endString, 10)
      };
    });
}

export function parseNearbyTickets (nearbyTicketLines: string[]): number[] {
  return nearbyTicketLines.join(',').split(',')
    .map(ticketString => parseInt(ticketString, 10));
}

function isTicketValid (ticket: number, ranges: Range[]): boolean {
  return ranges.some(range => (ticket >= range.start) && (ticket <= range.end));
}
