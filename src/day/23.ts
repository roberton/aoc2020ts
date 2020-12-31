import clonedeep from 'lodash.clonedeep';
import CircularList from '../lib/CircularList';

export const Day23 = {
  id: '23',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const game = startGame(lines[0]);
  const finalGame = playGame(game, 100);
  const gameString = makeGameString(finalGame.cupsList);

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
  cupsList: CircularList
  currentCup: number // value of currentCup
  rounds: number
  maxCupValue: number
}

export function startGame (line: string): Game {
  const cups = line.split('').map(character => parseInt(character, 10));
  const cupsList = new CircularList();
  cups.forEach(cupValue => cupsList.push(cupValue));

  return {
    cupsList,
    currentCup: cupsList.getHead().value,
    rounds: 0,
    maxCupValue: Math.max(...cups)
  };
}

export function playRound (game: Game): Game {
  // console.log(`playRound(round = ${game.rounds}) A: cups = ${makeGameString(game.cupsList)}`);
  const { threeCups, cupsList } = removeThreeCups(game);
  const destinationCup = calcDestinationCup(cupsList, game.currentCup, game.maxCupValue);
  placeThreeCups(cupsList, threeCups, destinationCup);
  // console.log(`playRound(round = ${game.rounds}) C: cupsList = ${makeGameString(cupsList)}`);
  const currentCup = selectCurrentCup(game.currentCup, cupsList);

  return {
    cupsList,
    currentCup,
    rounds: game.rounds + 1,
    maxCupValue: game.maxCupValue
  };
}

interface WeirdInterface {
  threeCups: number[]
  cupsList: CircularList
}

// Remove the three cups clockwise of the current cup
function removeThreeCups (game: Game): WeirdInterface {
  const currentCupNode = game.cupsList.find(game.currentCup);
  if (currentCupNode === undefined) throw new Error('removeThreeCups() could not find current cup');
  // console.log(`removeThreeCups(): currentCupNode has value ${currentCupNode.value}`);

  const threeCups = [];
  threeCups.push(game.cupsList.remove(currentCupNode.next));
  threeCups.push(game.cupsList.remove(currentCupNode.next));
  threeCups.push(game.cupsList.remove(currentCupNode.next));

  // console.log(`removeThreeCups(): returning three cups = ${JSON.stringify(threeCups)}`);
  return {
    threeCups,
    cupsList: game.cupsList
  };
}

// The cup value one less than the current cup
// Must be a cup in the current list, so if missing keep looking lower
// Wrap around (back to high) if needed
function calcDestinationCup (cups: CircularList, currentCup: number, maxCupValue: number): number {
  let destinationCup = currentCup - 1;
  while (cups.find(destinationCup) === undefined) {
    destinationCup--;
    if (destinationCup < 1) destinationCup = maxCupValue;
  }
  // console.log(`calcDestinationCup(${currentCup}) - returning ${destinationCup}`);
  return destinationCup;
}

// Place the three cups immediately clockwise of the destinationCup
function placeThreeCups (remainingCups: CircularList, threeCups: number[], destinationCupValue: number): CircularList {
  const destinationCupNode = remainingCups.find(destinationCupValue);
  if (destinationCupNode === undefined) {
    throw new Error(`placeThreeCups() - unable to find cup with value ${destinationCupValue}`);
  }

  const cups = remainingCups;
  let insertNode = destinationCupNode;
  while (threeCups.length > 0) {
    insertNode = cups.insert(threeCups.shift() ?? 0, insertNode);
  }
  return cups;
}

function selectCurrentCup (currentCup: number, cupsList: CircularList): number {
  const currentCupNode = cupsList.find(currentCup);
  if (currentCupNode === undefined) throw new Error('selectCurrentCup() could not find current cup');

  const newCurrentCup = currentCupNode.next.value;
  return newCurrentCup;
}

export function playGame (game: Game, maxRounds: number): Game {
  let curGame = clonedeep(game);
  while (curGame.rounds < maxRounds) {
    curGame = playRound(curGame);
    if ((curGame.rounds % 100) === 0) {
      console.log(`round: ${curGame.rounds}`);
    }
  }
  return curGame;
}

export function makeGameString (cupsList: CircularList): string {
  const cupArray = [];
  let node = cupsList.find(1);
  if (node === undefined) throw new Error('could not find cup 1 in makeGameString');

  node = node.next;
  while (node.value !== 1) {
    cupArray.push(node.value);
    node = node.next;
  }

  return cupArray.join('');
}

// For part 2, extend game to have 1,000,000 cups
// function extendGame (game: Game): Game {
//   const cups = [...game.cups];
//   for (let i = game.cups.length + 1; i <= 1_000_000; i++) {
//     cups.push(i);
//   }

//   return {
//     cups,
//     currentCup: game.currentCup,
//     rounds: game.rounds,
//     maxCupValus: 1_000_000
//   };
// }

// function findCupsWithStars (game: Game): number[] {
//   const numberOneCupIndex = game.cups.indexOf(1);
//   return game.cups.slice(numberOneCupIndex + 1, numberOneCupIndex + 3);
// }
