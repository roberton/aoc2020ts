import clonedeep from 'lodash.clonedeep';

export const Day23 = {
  id: '23',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const game = startGame(lines[0]);
  const finalGame = playGame(game, 100);
  const gameString = makeGameString(finalGame);

  return `${gameString}`;
}

function star2 (lines: string[]): string {
  // const game = extendGame(startGame(lines[0]));
  // const finalGame = playGame(game, 1_000);
  // const cupsWithStars = findCupsWithStars(finalGame);

  // console.log(`${JSON.stringify(cupsWithStars)}`);
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
function removeThreeCups (game: Game): number[][] {
  const currentCupIndex = game.cups.indexOf(game.currentCup);
  const threeCups = game.cups.splice(currentCupIndex + 1, currentCupIndex + 3);
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

export function playGame (game: Game, maxRounds: number): Game {
  let curGame = clonedeep(game);
  while (curGame.rounds < maxRounds) {
    // curGame = clonedeep(curGame);
    curGame = playRound(curGame);
    curGame = normaliseGame(curGame);
    if ((curGame.rounds % 100) === 0) {
      console.log(`round: ${curGame.rounds}`);
    }
  }
  return curGame;
}

export function normaliseGame (game: Game): Game {
  const currentCupIndex = game.cups.indexOf(game.currentCup);
  if (game.cups.length - currentCupIndex < 5) {
    console.log('Normalising!');

    const cups = [...game.cups.slice(currentCupIndex), ...game.cups.slice(0, currentCupIndex)];
    return {
      cups,
      currentCup: game.currentCup,
      rounds: game.rounds
    };
  } else {
    console.log('Optimisation: not normalising');
    return clonedeep(game);
  }
}

export function makeGameString (game: Game): string {
  const numberOneCupIndex = game.cups.indexOf(1);
  const cups = [
    ...game.cups.slice(numberOneCupIndex + 1),
    ...game.cups.slice(0, numberOneCupIndex)
  ];
  return cups.join('');
}

// For part 2, extend game to have 1,000,000 cups
function extendGame (game: Game): Game {
  const cups = [...game.cups];
  for (let i = game.cups.length + 1; i <= 1000000; i++) {
    cups.push(i);
  }

  return {
    cups,
    currentCup: game.currentCup,
    rounds: game.rounds
  };
}

function findCupsWithStars (game: Game): number[] {
  const numberOneCupIndex = game.cups.indexOf(1);
  return game.cups.slice(numberOneCupIndex + 1, numberOneCupIndex + 3);
}
