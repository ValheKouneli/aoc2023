import { readFromFile } from "./util";

const input = readFromFile("inputs/input01.txt");

console.log(
  (input.map((a) => ints(a)).filter((a) => a !== null) as RegExpMatchArray[])
    .map((a: RegExpMatchArray) => comb(firstInt(a), lastInt(a)))
    .reduce((acc, cur) => acc + cur)
);

function ints(a: string): string[] {
  const matches: string[] = [];
  const regex = /(\d|one|two|three|four|five|six|seven|eight|nine)/g;
  let searchedString = a;
  while (searchedString.length) {
    const match = searchedString.match(regex)?.[0];
    if (match) {
      //@ts-ignore
      matches.push(match as string);
    }
    searchedString = searchedString.substring(1, a.length);
  }
  return matches;
}

function firstInt(a: string[]) {
  return a[0];
}

function lastInt(a: string[]) {
  return a[a.length - 1];
}

function comb(a: string, b: string) {
  const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  let aValue: any;
  let bValue: any;
  if (Object.keys(numbers).includes(a)) {
    //@ts-ignore
    aValue = numbers[a];
  } else {
    aValue = parseInt(a);
  }
  if (Object.keys(numbers).includes(b)) {
    //@ts-ignore
    bValue = numbers[b];
  } else {
    bValue = parseInt(b);
  }
  return parseInt(aValue.toString() + bValue.toString());
}
