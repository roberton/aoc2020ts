import { Day, StarFunc } from './DayInterface';

import { Day1 } from './01';
import { Day2 } from './02';
import { Day3 } from './03';
import { Day4 } from './04';
// import { Day5 } from './05';
import { Day6 } from './06';
import { loadFile } from './lib/loadFile';

// doDay(Day1);
// doDay(Day2);
// doDay(Day3);
// doDay(Day4);
// doDay(Day5);
doDay(Day6);

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

  // display timings
  console.log('------------');
  console.log(`  Load: ${loadTimeMs}ms`);
  console.log(`Star 1: ${star1TimeMs}ms`);
  console.log(`Star 2: ${star2TimeMs}ms`);
  console.log(` Total: ${loadTimeMs + star1TimeMs + star2TimeMs}ms`);
  console.log('============');
}

function run (starFunction: StarFunc, fileContents: string[]): [string, number] {
  const timerHrStart = process.hrtime();
  const starResult = starFunction(fileContents);
  const starHrTime = process.hrtime(timerHrStart);

  const starTimeMs = Math.round(starHrTime[0] * 1000 + starHrTime[1] / 1000000);
  return [starResult, starTimeMs];
}
