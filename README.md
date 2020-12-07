# Advent of Code 2020
## Roberto's TypeScript attempt

## Structure

# TODO
[x] implement performance metrics
[x] change linter to warn, not error, about unused code (actually, just disabled it)
[x] refactor each day to implement an interface that index can use
[x] try implementing a pre-star or file loading method
[x] neater solution for the timing code
[x] re-org files into src/dd/index.ts + src/dd/input.txt
[ ] implement command line runner, perhaps using Commander
[ ] reduce number of uses of 'let' (end of day 4 there are 10, day 6: 14)
[ ] use async file reading
[x] look at TODO in day 04 (mapping fields to functions)
[ ] fix up test code for day 07 and extend it

# Notes for each day
## Day 1
Part 1 answer = 889779
Part 2 answer = 76110336
Initial implementation takes 264ms
Parsing in load function reduces time taken to 28ms

## Day 2
Time taken about 20ms
Part 1 answer: Number of valid passwords: 636
Part 2 answer: Number of valid passwords: 588

Would be good to have unit tests for the isPasswordValid() functions as well

## Day 3
Time taken about 14ms
Part 1 answer = 178
SCC: lines of code = 167, complexity = 27

## Day 4
Part 1 answer = 182
Part 2 answer = 109 (originally said 110, PID check wasn't caring about being too long)
SCC: lines of code = 260, complexity = 47

## Day 5
Part 1 answer = 951
Part 2 answer is 653
Time taken = 6ms
SCC: lines of code = 297, complexity = 46

## Day 6
Part 1 answer = 6633
Part 2 answer = 3202
Time taken = 12ms
SCC: lines of code = 350, complexity = 49

Part 1 was easy. Part 2 was nearly as easy but the change from part 1 confused me!

## Day 7
Part 1 anwer = 246
Part 2 answer = 2976
Take taken = 1081ms
SCC: lines of code = 427, complexity = 56
