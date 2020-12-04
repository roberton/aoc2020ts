import { Day } from './DayInterface';

// import { Day1 } from './day/01';
import { Day2 } from './day/02';
import { Day3 } from './day/03';
import { Day4 } from './day/04';
import { loadFile } from './lib/loadFile';

// doDay(Day1);
doDay(Day2);
doDay(Day3);
doDay(Day4);

function doDay (day: Day): void {
  const id = day.id;
  const fileName = `src/day/${id}.txt`;

  // load data
  const loadStart = process.hrtime();
  const fileContents = loadFile(fileName);
  const loadTime = process.hrtime(loadStart);

  // do star 1
  console.log(`Day ${id}, Star 1`);
  const star1Start = process.hrtime();
  day.star1(fileContents);
  const star1Time = process.hrtime(star1Start);

  // do star 2
  console.log(`Day ${id}, Star 2`);
  const star2Start = process.hrtime();
  day.star2(fileContents);
  const star2Time = process.hrtime(star2Start);

  // display timings
  const loadTimeMs = Math.round(loadTime[0] * 1000 + loadTime[1] / 1000000);
  const star1TimeMs = Math.round(star1Time[0] * 1000 + star1Time[1] / 1000000);
  const star2TimeMs = Math.round(star2Time[0] * 1000 + star2Time[1] / 1000000);

  console.log(`Time taken to load data: ${loadTimeMs}ms`);
  console.log(`Time taken for star 1: ${star1TimeMs}ms`);
  console.log(`Time taken for star 2: ${star2TimeMs}ms`);
  console.log(`Total time taken: ${star1TimeMs + star2TimeMs}ms`);
}
