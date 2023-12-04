import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input04.txt");

type Card = {
  cardNumber: number;
  winningNumbers: number[];
  myNumbers: number[];
};

const cards = input.map((row) => {
  const [first, second] = row.split(":");
  if (!first || !second) {
    throw new Error("Mur");
  }
  const [winning, mine] = second.split("|");
  const winningNumbers = winning
    .split(" ")
    .filter((a) => !!a)
    .map((n) => parseInt(n));
  const myNumbers = mine
    .split(" ")
    .filter((a) => !!a)
    .map((n) => parseInt(n));
  const cardNumber = first.match(/\d+/)?.pop();
  if (!cardNumber) {
    throw new Error("HUI");
  }
  return {
    cardNumber: parseInt(cardNumber),
    winningNumbers,
    myNumbers,
  };
});

function pointsOfCard(card: Card) {
  const points = card.myNumbers.reduce((points, myNumber) => {
    if (card.winningNumbers.includes(myNumber)) {
      if (!points) {
        return 1;
      } else {
        return points * 2;
      }
    } else {
      return points;
    }
  }, 0);
  return points;
}

function howManyMatching(card: Card) {
  const points = card.myNumbers.reduce((points, myNumber) => {
    if (card.winningNumbers.includes(myNumber)) {
      return points + 1;
    } else {
      return points;
    }
  }, 0);
  return points;
}

function collectInstancesForCard(
  card: Card,
  index: number,
  allCards: Card[],
  instances: number[]
) {
  const points = howManyMatching(card);

  const instancesWon: number[] = [];
  for (
    let i = index + 1;
    i < Math.min(index + 1 + points, allCards.length);
    i++
  ) {
    instancesWon.push(i);
  }
  instancesWon.forEach((index: number) => {
    instances[index] = instances[index] + 1;
    collectInstancesForCard(allCards[index], index, allCards, instances);
  });
}

const part1 = cards.reduce((sum, card) => {
  sum = sum + pointsOfCard(card);
  return sum;
}, 0);

const instances = new Array(cards.length).fill(1);
cards.forEach((card, index) => {
  collectInstancesForCard(card, index, cards, instances);
});

console.log("part1", part1);

const part2 = instances.reduce((sum, nbr) => sum + nbr, 0);
console.log("part2", part2);
