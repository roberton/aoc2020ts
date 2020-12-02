import { star1, star2 } from './day/02';

const star1Start = process.hrtime();
star1();
const star1Time = process.hrtime(star1Start);

const star2Start = process.hrtime();
star2();
const star2Time = process.hrtime(star2Start);

const star1TimeMs = Math.round(star1Time[0] * 1000 + star1Time[1] / 1000000);
const star2TimeMs = Math.round(star2Time[0] * 1000 + star2Time[1] / 1000000);

console.log(`Time taken for star 1: ${star1TimeMs}ms`);
console.log(`Time taken for star 2: ${star2TimeMs}ms`);
console.log(`Total time taken: ${star1TimeMs + star2TimeMs}ms`);
