import CircularList, { Node } from '../lib/CircularList';

export const Day23 = {
  id: '23',
  star1,
  star2
};

let destCupA = 0;
let destCupB = 0;

function star1 (lines: string[]): string {
  const game = startGame(lines[0]);
  // const game = startGame('389125467');
  const finalGame = playGame(game, 100);
  const gameString = makeGameString(finalGame.cupsList);

  return `${gameString}`;
}

function star2 (lines: string[]): string {
  const game = extendGame(startGame(lines[0]));
  const finalGame = playGame(game, 10_000);
  const cupsWithStars = findCupsWithStars(finalGame);

  console.log(`${JSON.stringify(cupsWithStars)}`);
  console.log(`dest cup: quick find = ${destCupA}, slow find = ${destCupB}`);

  const starProduct = cupsWithStars[0] * cupsWithStars[1];
  return `${starProduct}`;
}

export interface Game {
  cupsList: CircularList
  currentCupNode: Node
  rounds: number
  maxCupValue: number
}

export function startGame (line: string): Game {
  const cups = line.split('').map(character => parseInt(character, 10));
  const cupsList = new CircularList();
  cups.forEach(cupValue => cupsList.push(cupValue));

  return {
    cupsList,
    currentCupNode: cupsList.getHead(),
    rounds: 0,
    maxCupValue: Math.max(...cups)
  };
}

export function playRound (game: Game): Game {
  // console.log(`playRound(round = ${game.rounds}) A: cups = ${makeGameString(game.cupsList)}`);

  const threeCups = removeThreeCups(game);
  const destinationCupNode = calcDestinationCup(game, threeCups);
  placeThreeCups(game, threeCups, destinationCupNode);

  // console.log(`playRound(round = ${game.rounds}) C: cupsList = ${makeGameString(cupsList)}`);
  const currentCupNode = selectCurrentCup(game.currentCupNode);

  return {
    cupsList: game.cupsList,
    currentCupNode,
    rounds: game.rounds + 1,
    maxCupValue: game.maxCupValue
  };
}

interface WeirdInterface {
  threeCups: number[]
  cupsList: CircularList
}

// Remove the three cups clockwise of the current cup
function removeThreeCups (game: Game): number[] {
  const currentCupNode = game.currentCupNode;

  const threeCups = [];
  threeCups.push(game.cupsList.remove(currentCupNode.next));
  threeCups.push(game.cupsList.remove(currentCupNode.next));
  threeCups.push(game.cupsList.remove(currentCupNode.next));

  // console.log(`removeThreeCups(): returning three cups = ${JSON.stringify(threeCups)}`);
  return threeCups;
}

// The cup value one less than the current cup
// Must be a cup in the current list, can't be in excludeList
// Wrap around (back to high) if needed
function calcDestinationCup (game: Game, excludeList: number[]): Node {
  let destinationCupValue = game.currentCupNode.value - 1;
  while (excludeList.includes(destinationCupValue) || destinationCupValue < 1) {
    destinationCupValue--;
    if (destinationCupValue < 1) destinationCupValue = game.maxCupValue;
  }

  let destinationCupNode;
  if (game.currentCupNode.previous.value === destinationCupValue) {
    destinationCupNode = game.currentCupNode.previous;
    destCupA++;
  } else {
    destinationCupNode = game.cupsList.find(destinationCupValue, game.currentCupNode, true);
    destCupB++;
  }

  if (destinationCupNode === undefined) {
    throw new Error(`calcDestinationCup(${game.currentCupNode.value}, ${JSON.stringify(excludeList)}) failed to find cup ${destinationCupValue}`);
  }
  return destinationCupNode;
}

// Place the three cups immediately clockwise of the destinationCup
function placeThreeCups (game: Game, threeCups: number[], destinationCupNode: Node): CircularList {
  const cups = game.cupsList;
  let insertNode = destinationCupNode;
  while (threeCups.length > 0) {
    insertNode = cups.insert(threeCups.shift() ?? 0, insertNode);
  }
  return cups;
}

function selectCurrentCup (currentCup: Node): Node {
  return currentCup.next;
}

export function playGame (game: Game, maxRounds: number): Game {
  let curGame = game;
  while (curGame.rounds < maxRounds) {
    curGame = playRound(curGame);
    if ((curGame.rounds % 1000) === 0) {
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
function extendGame (game: Game): Game {
  const cupsList = game.cupsList;
  for (let i = game.maxCupValue + 1; i <= 1_000_000; i++) {
    cupsList.push(i);
  }

  return {
    cupsList,
    // currentCup: game.currentCup,
    currentCupNode: game.currentCupNode,
    rounds: game.rounds,
    maxCupValue: 1_000_000
  };
}

function findCupsWithStars (game: Game): number[] {
  const numberOneCupNode = game.cupsList.find(1);
  if (numberOneCupNode === undefined) throw new Error('could not find cup 1 in findCupsWithStars()');

  const starCups = [];
  starCups.push(numberOneCupNode.next.value);
  starCups.push(numberOneCupNode.next.next.value);
  return starCups;
}
