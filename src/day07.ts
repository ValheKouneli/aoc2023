import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input07.txt");
const cards = "23456789TJQKA";
const alternativeCards = "J23456789TQKA";

function valueFromCards(hand: string[], cardOrder: string) {
  return hand.reduce((acc, cur, index) => {
    const pointsOfCard = 10 ** ((4 - index) * 2) * cardOrder.indexOf(cur);
    acc += pointsOfCard;
    return acc;
  }, 0);
}

function cardValue(hand: string[]) {
  //console.log("hand", hand);
  const calc = [...hand]
    .sort((a, b) => cards.indexOf(a) - cards.indexOf(b))
    .reduce(
      (acc, cur) => {
        const prevCard = acc.prevCard;
        acc.prevCard = cur;
        if (cur == prevCard || !prevCard) {
          acc.cardGroups[acc.cardGroups.length - 1] += 1;
        } else {
          acc.cardGroups.push(1);
        }
        return acc;
      },
      { prevCard: "", cardGroups: [0] }
    );
  const valueOfCards = valueFromCards(hand, cards);
  //console.log("valueOfCards", valueOfCards);
  let valueOfComb = 0;
  if (calc.cardGroups.length == 1) {
    //console.log("five same");
    valueOfComb += 10 ** 11 * 6;
  } else if (calc.cardGroups.length == 2) {
    if (calc.cardGroups.includes(1)) {
      //console.log("four same");
      valueOfComb += 10 ** 11 * 5;
    } else {
      //console.log("full house");
      valueOfComb += 10 ** 11 * 4;
    }
  } else if (calc.cardGroups.length == 3) {
    if (calc.cardGroups.includes(3)) {
      //console.log("three same");
      valueOfComb += 10 ** 11 * 3;
    } else {
      //console.log("two pair");
      valueOfComb += 10 ** 11 * 2;
    }
  } else if (calc.cardGroups.length == 4) {
    //console.log("one pair");
    valueOfComb += 10 ** 11 * 1;
  }
  //console.log("valueOfCombination", valueOfComb);
  return valueOfCards + valueOfComb;
}

function cardValuePart2(hand: string[]) {
  //console.log("hand", hand);
  const calc = [...hand]
    .sort((a, b) => alternativeCards.indexOf(a) - alternativeCards.indexOf(b))
    .reduce(
      (acc, cur) => {
        const prevCard = acc.prevCard;
        if (cur == "J") {
          acc.jokers += 1;
          return acc;
        }
        acc.prevCard = cur;
        if (
          acc.cardGroups[acc.cardGroups.length - 1] &&
          (cur == prevCard || !prevCard)
        ) {
          acc.cardGroups[acc.cardGroups.length - 1] += 1;
        } else {
          acc.cardGroups.push(1);
        }
        return acc;
      },
      { prevCard: "", cardGroups: [] as number[], jokers: 0 }
    );
  console.log("calc", calc);
  const valueOfCards = valueFromCards(hand, alternativeCards);
  //console.log("valueOfCards", valueOfCards);
  let valueOfComb = 0;
  if (calc.cardGroups.length <= 1) {
    // 0j, 5
    // 1j, 4
    // 2j, 3
    // 3j, 2
    // 4j, 1
    // 5j, -
    //console.log("five same");
    valueOfComb += 10 ** 11 * 6;
  } else if (calc.cardGroups.length == 2) {
    // 0j, 1,4 or 2,2
    // 1j, 1,3 or 2,2
    // 2j, 1,2
    // 3j, 1,1
    if (calc.cardGroups.includes(1)) {
      //console.log("four same");
      valueOfComb += 10 ** 11 * 5;
    } else {
      //console.log("full house");
      valueOfComb += 10 ** 11 * 4;
    }
  } else if (calc.cardGroups.length == 3) {
    // 0j, 1,1,3 or 1,2,2
    // 1j, 1,1,2
    // 2j, 1,1,1
    if (
      calc.cardGroups.includes(3) ||
      (calc.cardGroups.includes(2) && calc.jokers == 1) ||
      calc.jokers > 1
    ) {
      //console.log("three same");
      valueOfComb += 10 ** 11 * 3;
    } else {
      //console.log("two pair");
      valueOfComb += 10 ** 11 * 2;
    }
  } else if (calc.cardGroups.length == 4) {
    // 0j, 1,1,1,2
    // 1j, 1,1,1,1
    //console.log("one pair");
    valueOfComb += 10 ** 11 * 1;
  }
  //console.log("valueOfCombination", valueOfComb);
  return valueOfCards + valueOfComb;
}

const handsAndBids: [string[], number][] = input.map((row) => {
  const [handString, bidString] = row.split(" ");
  return [[...handString], parseInt(bidString)];
});

const handsAndBidsWithValue = handsAndBids
  .map((item) => [...item, cardValue(item[0])] as [string[], number, number])
  .sort((a, b) => a[2] - b[2]);
//console.log("handsAndBidsWithValue", handsAndBidsWithValue);
const part1 = handsAndBidsWithValue.reduce(
  (sum, cur, index) => sum + (index + 1) * cur[1],
  0
);
console.log("part1", part1);
const part2 = handsAndBids
  .map(
    (item) => [...item, cardValuePart2(item[0])] as [string[], number, number]
  )
  .sort((a, b) => a[2] - b[2])
  .reduce((sum, cur, index) => sum + (index + 1) * cur[1], 0);
console.log("part2", part2);
