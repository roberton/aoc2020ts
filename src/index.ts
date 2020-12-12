#!/usr/bin/env node
import { program } from 'commander';

import { Day, StarFunc } from './DayInterface';
import { Day1 } from './01';
import { Day2 } from './02';
import { Day3 } from './03';
import { Day4 } from './04';
import { Day5 } from './05';
import { Day6 } from './06';
import { Day7 } from './07';
import { Day8 } from './08';
import { Day9 } from './09';
import { Day10 } from './10';
import { Day11 } from './11';
import { Day12 } from './12';
import { loadFile } from './lib/loadFile';

const days = [Day1, Day2, Day3, Day4, Day5, Day6, Day7, Day8, Day9, Day10, Day11, Day12];

program.version('0.12.0')
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
  const fileName = `src/${id}/input.txt`;

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
