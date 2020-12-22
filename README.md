# Advent of Code 2020
## Roberto's TypeScript attempt

## Structure

# Command line interface
The app can be run as a command called 'aoc'. This takes a number of options.
You do need provide at least one of them to make it run any puzzle code; by defauly it will just tell you about the program.

## Default behaviour
Running the command on its own will display version information and information about which puzzles have been implemented.

Example
`aoc`

```
Advent of Code 2020.
Puzzles implemented: 01, 02, 03, 04, 05, 06, 07
To calculate answers to a puzzle, run with the command-line option --day <day>. For example:
'aoc --day 01'
to calculate the answer to the puzzle for Day 1 (both stars)
Type 'aoc --help' for more help.
```

## Calculating puzzle outputs
TODO

# Notes and progress
## TODO
Scratch "to do" list (there are also TODO comments in the code, hopefully not many!):

- [x] implement performance metrics
- [x] change linter to warn, not error, about unused code (actually, just disabled it)
- [x] refactor each day to implement an interface that index can use
- [x] try implementing a pre-star or file loading method
- [x] neater solution for the timing code
- [x] re-org files into src/dd/index.ts + src/dd/input.txt
- [x] fix up test code for day 07 and extend it
- [x] implement command line runner, perhaps using Commander
- [x] look at TODO in day 04 (mapping fields to functions)
- [x] make library function for finding pair of numbers that match a target (see days 01 and 09)
- [x] re-organise code to directly under source, and data files in a new folder
- [ ] where a puzzle has types, move them to their own files
- [ ] add help and finish usage information in this file
- [ ] create regression tests that check each star function returns correct puzzle answer

# Notes for each day
## Day 1
- Part 1 answer = 889779
- Part 2 answer = 76110336
- Initial implementation takes 264ms. Parsing in load function reduces time taken to 28ms

## Day 2
- Time taken about 20ms
- Part 1 answer: Number of valid passwords: 636
- Part 2 answer: Number of valid passwords: 588

Would be good to have unit tests for the isPasswordValid() functions as well

## Day 3
- Time taken about 14ms
- Part 1 answer = 178
- Part 2 answer = 3492520200
- SCC: LOC = 167, complexity = 27

## Day 4
- Part 1 answer = 182
- Part 2 answer = 109
- SCC: LOC = 260, complexity = 47

The original part 2 answer was 110; PID check wasn't caring about being too long.

## Day 5
- Part 1 answer = 951
- Part 2 answer is 653
- Time taken = 6ms
- SCC: lines of code = 297, complexity = 46

## Day 6
- Part 1 answer = 6633
- Part 2 answer = 3202
- Time taken = 12ms
- SCC: lines of code = 350, complexity = 49

Part 1 was easy. Part 2 was nearly as easy but the change from part 1 confused me!

## Day 7
- Part 1 answer = 246
- Part 2 answer = 2976
- Take taken = 1081ms
- SCC: lines of code = 427, complexity = 56

## Day 8
- Part 1 answer = 1420
- Part 2 answer = 1245
- Time taken = 313ms
- SCC: LOC = 544, complexity = 77

Part 1 was fun. Part 2 told me about the copying of arrays and regrets on trying building immutable code.

## Day 9
- Part 1 answer = 90433990
- Part 2 answer = 11691646
- Time taken = 359ms
- SCC: LOC = 595, complexity = 83

## Day 10
- Part 1 answer = 2475
- Part 2: crivens!

SCC: LOC = 630, complexity = 85
Number of lets: 13

## Day 11
- Part 1 answer = 2368
- Part 2 answer = 2124
- Time taken = 341ms
- SCC: LOC = 796, complexity = 129
- Number lets: 16

Took a while but I've done GoL many times so knew it was just a question of cranking out the code...

## Day 12
- Part 1 answer = 2057
- Part 2 answer = 71504
- SCC: LOC 968, complexity = 167 (after 13/part 1)
- Number of lets: 15

## Day 13
- Part 1 answer = 3789
- Part 2 ?
- SCC: LOC = 911, complexity = 153

## Day 14
- Part 1 answer = 13727901897109
- Part 2 ?
- SCC: LOC = 1034, complexity = 178
- Number of lets: 16

## Day 15
- Part 1 answer = 517
- Part 2 answer = 1047739
- SCC: LOC = 1097, complexity = 184 (was 1107, complexity = 190)
- Number of lets: 16

Notes:
Performance is critical for part 2, unless there's some amazing algorithmic change.
Originally used an array. Performance for first 10,000 entries:
112ms. If maintained, 30m would be 3000 x 0.1s = 300s. Fine! But wasn't. And think of the memory.

Rebuilt version using Map:
10,000: 3ms. Yes!

## Day 16
- Part 1 answer = 27898
- Part 2 answer = 2766491048287
- SCC: LOC = 1243, complexity = 193
- Number of lets: 16

Didn't enjoy part 2 of this! Lots of rewriting of part 1, plus several days elapsed
in between which didn't help. And several times there was one more thing to do... :-(

## Day 17: Conway's Cubes
Skipping for now

## Day 18: Operation Order
- Part 1 answer = 69490582260
- Part 2 answer = ?
- SCC: LOC = 1297, complexity = 205
- Number of lets: 18

## Day 19: Monster Messages
- Part 1 answer = ?

Given up for now.

## Day 22: Crab Combat
- Part 1 answer = 32083
- Part 2 answer = ?
- SCC: LOC = 1499, complexity = 226
- Number lets: 19
- 