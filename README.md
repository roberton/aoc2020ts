# Advent of Code 2020
## Roberto's TypeScript attempt

## Structure

# TODO
[x] implement performance metrics
[x] change linter to warn, not error, about unused code (actually, just disabled it)
[x] refactor each day to implement an interface that index can use
[ ] implement sub commands, perhaps using Commander
[x] try implementing a pre-star or file loading method
[ ] use async file reading
[ ] neater solution for the timing code

# Notes for each day
## Day 1
Initial implementation takes 264ms
Parsing in load function reduces time taken to 28ms

## Day 2
Time taken about 20ms

Would be good to have unit tests for the isPasswordValid() functions as well

## Day 3
Time taken about 14ms
Part 1 answer = 178
scc: 167LOC , 27 complexity
