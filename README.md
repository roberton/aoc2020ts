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
- [ ] where a puzzle has types, move them to their own files
- [ ] add help and finish usage information in this file
- [ ] make library function for finding pair of numbers that match a target (see days 01 and 09)
- [ ] reduce number of uses of 'let' (end of day 4 there are 10, day 6: 14)
- [ ] use async file reading

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
- SCC: LOC = 594, complexity = 83
