# Advent of Code 2020
## Roberto's TypeScript attempt

## Structure

# TODO
[x] implement performance metrics
[x] change linter to warn, not error, about unused code (actually, just disabled it)
[x] refactor each day to implement an interface that index can use
[x] try implementing a pre-star or file loading method
[ ] neater solution for the timing code
[ ] re-org files into puzzle / dd / index.ts + data.txt
[ ] implement sub commands, perhaps using Commander
[ ] use async file reading

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
scc: 167LOC, complexity 27

## Day 4
Part 1 answer = 182
Part 2. I said 110 but that's too high. 109 was correct, PID check wasn't caring about being too long
scc: 260LOC, complexity 47
