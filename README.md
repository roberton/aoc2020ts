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
[ ] implement sub commands, perhaps using Commander
[ ] use async file reading
[ ] reduce number of uses of 'let' (end of day 4 there are 10)
[ ] look at TODO in day 04 (mapping fields to functions)

# Notes for each day
## Day 1
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
Part 2. I said 110 but that's too high. 109 was correct, PID check wasn't caring about being too long
SCC: lines of code = 260, complexity = 47

## Day 5
Part 1 answer = 951
Part 2 answer is 653
Time taken = 6ms
SCC: lines of code = 297, complexity = 46
