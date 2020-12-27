import clonedeep from 'lodash.clonedeep';

export const Day23 = {
  id: '23',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const game = startGame(lines[0]);
  // const game = startGame('389125467');
  const finalGame = playGame(game, 100);
  const gameString = makeGameString(finalGame);

  return `${gameString}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

interface Game {
  cups: number[]
  currentCup: number // value of currentCup
  rounds: number
}

function startGame (line: string): Game {
  const cups = line.split('').map(character => parseInt(character, 10));
  return {
    cups,
    currentCup: cups[0],
    rounds: 0
  };
}

// This mutates the original
export function playRound (game: Game): Game {
  const [threeCups, remainingCups] = removeThreeCups(game);
  const destinationCup = calcDestinationCup(remainingCups, game.currentCup);
  const cups = placeThreeCups(threeCups, remainingCups, destinationCup);
  const currentCup = selectCurrentCup(game);

  return {
    cups,
    currentCup,
    rounds: game.rounds + 1
  };
}

// Remove the three cups clockwise of the current cup
// If current cup is the first, then that means ones at indexes 1 to 3.
function removeThreeCups (game: Game): number[][] {
  const threeCups = game.cups.splice(1, 3);
  return [threeCups, game.cups];
}

// The cup value one less than the current cup
// Must be a cup in the current list, so if missing keep looking lower
// Wrap around (back to high) if needed
function calcDestinationCup (cups: number[], currentCup: number): number {
  let destinationCup = currentCup - 1;
  while (!cups.includes(destinationCup)) {
    destinationCup--;
    if (destinationCup < 1) destinationCup = 9;
  }
  return destinationCup;
}

// Place the three cups immediately clockwise of the destinationCup
function placeThreeCups (threeCups: number[], remainingCups: number[], destinationCup: number): number[] {
  const destinationCupIndex = remainingCups.indexOf(destinationCup);
  const cups = [
    ...remainingCups.slice(0, destinationCupIndex + 1),
    ...threeCups,
    ...remainingCups.slice(destinationCupIndex + 1)
  ];
  return cups;
}

function selectCurrentCup (game: Game): number {
  const currentCupIndex = game.cups.indexOf(game.currentCup);
  const currentCup = game.cups[currentCupIndex + 1];
  return currentCup;
}

function playGame (game: Game, maxRounds: number): Game {
  let curGame = clonedeep(game);
  while (curGame.rounds < maxRounds) {
    curGame = clonedeep(curGame);
    curGame = playRound(curGame);
    curGame = normaliseGame(curGame);
  }
  return curGame;
}

export function normaliseGame (game: Game): Game {
  const currentCupIndex = game.cups.indexOf(game.currentCup);
  const cups = [...game.cups.slice(currentCupIndex), ...game.cups.slice(0, currentCupIndex)];
  return {
    cups,
    currentCup: game.currentCup,
    rounds: game.rounds
  };
}

function makeGameString (game: Game): string {
  const numberOneCupIndex = game.cups.indexOf(1);
  const cups = [
    ...game.cups.slice(numberOneCupIndex + 1),
    ...game.cups.slice(0, numberOneCupIndex)
  ];
  return cups.join('');
}
