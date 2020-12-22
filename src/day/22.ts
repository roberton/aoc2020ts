import groupLines from '../lib/groupLines';

export const Day22 = {
  id: '22',
  star1,
  star2
};

function star1 (lines: string[]): string {
  const [p1InitialDeck, p2InitialDeck] = buildPlayerDecks(lines);
  const [p1FinalDeck, p2FinalDeck] = playGame(p1InitialDeck, p2InitialDeck);

  console.log(p1FinalDeck);
  console.log(p2FinalDeck);
  const winningScore = (p1FinalDeck.length > 0) ? calcScore(p1FinalDeck) : calcScore(p2FinalDeck);
  return `${winningScore}`;
}

function star2 (lines: string[]): string {
  return 'TODO';
}

type Deck = number[];

function buildPlayerDecks (lines: string[]): Deck[] {
  const [player1Lines, player2Lines] = groupLines(lines);
  const player1Deck = player1Lines.slice(1).map(line => parseInt(line, 10));
  const player2Deck = player2Lines.slice(1).map(line => parseInt(line, 10));

  return [player1Deck, player2Deck];
}

export function playRound (p1Deck: Deck, p2Deck: Deck): Deck[] {
  const newP1Deck = p1Deck.slice(1);
  const newP2Deck = p2Deck.slice(1);
  const playedCards = [p1Deck[0], p2Deck[0]];

  if (playedCards[0] > playedCards[1]) {
    // player 1 wins
    newP1Deck.push(playedCards[0]);
    newP1Deck.push(playedCards[1]);
  } else {
    // player 2 wins
    newP2Deck.push(playedCards[1]);
    newP2Deck.push(playedCards[0]);
  }
  return [newP1Deck, newP2Deck];
}

export function playGame (p1InitialDeck: Deck, p2InitialDeck: Deck): Deck[] {
  let p1Deck = p1InitialDeck.slice();
  let p2Deck = p2InitialDeck.slice();
  let rounds = 0;

  while (p1Deck.length > 0 && p2Deck.length > 0 && rounds < 1000) {
    [p1Deck, p2Deck] = playRound(p1Deck, p2Deck);
    rounds++;
  }
  return [p1Deck, p2Deck];
}

export function calcScore (deck: Deck): number {
  return deck.reduce(
    (acc, value, index) => acc + (deck.length - index) * value,
    0);
}
