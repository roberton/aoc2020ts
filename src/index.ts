#!/usr/bin/env node
import { program } from 'commander';

import { Day, StarFunc } from './DayInterface';
import {
  Day1, Day2, Day3, Day4, Day5, Day6, Day7, Day8, Day9, Day10,
  Day11, Day12, Day13, Day14, Day15, Day16, Day18, Day19, Day22, Day23
} from './day';

import { loadFile } from './lib/loadFile';

const days = [
  Day1, Day2, Day3, Day4, Day5, Day6, Day7, Day8, Day9, Day10,
  Day11, Day12, Day13, Day14, Day15, Day16, Day18, Day22, Day23
];

program.version('0.19')
  .option('-d  --day <dayId>', 'ID of the day for which to calculate the puzzle')
  .option('-t --time', 'display timing information')
  .parse(process.argv);

const daysToRun = whichDaysToRun(days, program.day);
daysToRun.forEach(day => doDay(day));

function whichDaysToRun (days: Day[], dayId: any): Day[] {
  if (dayId === 'all') return days;
  if (dayId === 'latest') return [days[days.length - 1]];
  return days.filter(day => day.id === dayId);
}

function doDay (day: Day): void {
  const id = day.id;
  const fileName = `data/${id}.txt`;

  // load data
  const loadStart = process.hrtime();
  const fileContents = loadFile(fileName);
  const loadTime = process.hrtime(loadStart);
  const loadTimeMs = Math.round(loadTime[0] * 1000 + loadTime[1] / 1000000);

  console.log();
  console.log(` Day ${id}`);
  console.log('------------');

  const [star1Result, star1TimeMs] = run(day.star1, fileContents);
  console.log(`Star 1: Answer = ${star1Result}`);

  const [star2Result, star2TimeMs] = run(day.star2, fileContents);
  console.log(`Star 2: Answer = ${star2Result}`);

  if (program.time !== undefined) {
    console.log('------------');
    console.log(`  Load: ${loadTimeMs}ms`);
    console.log(`Star 1: ${star1TimeMs}ms`);
    console.log(`Star 2: ${star2TimeMs}ms`);
    console.log(` Total: ${loadTimeMs + star1TimeMs + star2TimeMs}ms`);
    console.log('============');
  }
}

function run (starFunction: StarFunc, fileContents: string[]): [string, number] {
  const timerHrStart = process.hrtime();
  const starResult = starFunction(fileContents);
  const starHrTime = process.hrtime(timerHrStart);

  const starTimeMs = Math.round(starHrTime[0] * 1000 + starHrTime[1] / 1000000);
  return [starResult, starTimeMs];
}
