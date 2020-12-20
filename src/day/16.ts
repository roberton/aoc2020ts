import { sum } from '../lib/sum';
import sumBooleanArray from '../lib/sumBooleanArray';
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

// TODO: move some of this into functions
function star2 (lines: string[]): string {
  const [ruleLines, ticketLines, nearbyTicketLines] = parseSections(lines);
  const rules = parseRulesFromRulesSection(ruleLines);
  const nearbyTickets = parseNearbyTickets(nearbyTicketLines);
  const validTickets = findValidTickets(nearbyTickets, rules);

  const fieldMappings = findValidFieldMappings(validTickets, rules);
  const fieldOrder = resolveFieldLogic(fieldMappings);

  const myTicketValues = parseNearbyTickets(ticketLines)[0];
  const departureRuleIndexes = [0, 1, 2, 3, 4, 5];
  const departureFieldIndexes = fieldOrder
    .filter(entry => departureRuleIndexes.includes(entry.ruleIndex))
    .map(entry => entry.fieldIndex);

  const myTicketDepartureValues = myTicketValues.fields
    .filter((_, fieldIndex) => departureFieldIndexes.includes(fieldIndex));

  const departureProduct = myTicketDepartureValues.reduce((acc, value) => acc * value);
  return `${departureProduct}`;
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

interface FieldToRuleMapping {
  fieldIndex: number
  isRuleValid: boolean[] // Nth position indicates if rule N is valid for this field
}

export interface FieldOrder {
  fieldIndex: number
  ruleIndex: number
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
  return rules.some(rule => isFieldValidForRule(field, rule));
}

function isFieldValidForRule (field: number, rule: Rule): boolean {
  return ((field >= rule.ranges[0].min) && (field <= rule.ranges[0].max)) ||
  ((field >= rule.ranges[1].min) && (field <= rule.ranges[1].max));
}

function findValidTickets (tickets: Ticket[], rules: Rule[]): Ticket[] {
  return tickets.filter(ticket => isTicketValid(ticket, rules));
}

function isTicketValid (ticket: Ticket, rules: Rule[]): boolean {
  return ticket.fields.every(field => isFieldValid(field, rules));
}

export function findValidFieldMappings (tickets: Ticket[], rules: Rule[]): FieldToRuleMapping[] {
  // initially, all fields are valid for all rules
  const validMappings: FieldToRuleMapping[] = tickets[0].fields
    .map((fieldValue, fieldIndex) => {
      return {
        fieldIndex,
        isRuleValid: Array.from({ length: rules.length }, _ => true)
      };
    });

  tickets.forEach((ticket, ticketIndex) => {
    validMappings.forEach(mapping => {
      mapping.isRuleValid.forEach((ruleValid, ruleIndex) => {
        if (ruleValid) {
          // but is it still valid?!
          if (!isFieldValidForRule(ticket.fields[mapping.fieldIndex], rules[ruleIndex])) {
            validMappings[mapping.fieldIndex].isRuleValid[ruleIndex] = false;
          }
        }
      });
    });
  });

  return validMappings;
}

/*
Takes a mapping of valid fields to rules
- each row represents a field and contains a list of booleans
- each boolean in that list indicates if that rule is valid for that field
Returns a list of FieldOrder values
- Unordered list, each entry states that a field maps to which rule
 */
export function resolveFieldLogic (validFieldToRuleArray: FieldToRuleMapping[]): FieldOrder[] {
  const fieldOrders: FieldOrder[] = [];

  while (fieldOrders.length < validFieldToRuleArray.length) {
    const [fieldIndex, ruleIndex] = findConstrainedField(validFieldToRuleArray);
    fieldOrders.push({ fieldIndex, ruleIndex });

    // no other field can be used for rule at ruleIndex
    validFieldToRuleArray.forEach(ruleMapping => {
      ruleMapping.isRuleValid[ruleIndex] = false;
    });
  }

  return fieldOrders;
}

function findConstrainedField (validFieldToRuleArray: FieldToRuleMapping[]): number[] {
  const fieldIndex = validFieldToRuleArray.findIndex(field => sumBooleanArray(field.isRuleValid) === 1);
  if (fieldIndex === -1) throw new Error('findConstrainedField() called with no constrained fields');
  const ruleIndex = validFieldToRuleArray[fieldIndex].isRuleValid.indexOf(true);

  return [fieldIndex, ruleIndex];
}
