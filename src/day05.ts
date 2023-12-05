import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input05.txt", true);

const groups = input.reduce(
  (groups, row) => {
    if (!row) {
      groups.push([]);
    } else {
      groups[groups.length - 1].push(row);
    }
    return groups;
  },
  [[]] as string[][]
);

const seeds = groups[0][0]
  .split(": ")[1]
  .split(" ")
  .map((a) => parseInt(a));
const filters = groups
  .slice(1, groups.length)
  .map((a) => a.slice(1, a.length))
  .map((a) => {
    return a.map((a) => {
      return a.split(" ").map((a) => parseInt(a));
    });
  });

const seedsActual = seeds.filter((seed, index) => index % 2 == 0);
const seedsRange = seeds.filter((seed, index) => index % 2 == 1);

const filtersReversed = [...filters].reverse();
const filtersReveredAllButLast = filtersReversed.slice(
  1,
  filtersReversed.length
);

function getSourceNumber(i: number, print?: boolean) {
  return filtersReveredAllButLast.reduce(
    (curNumber: number, curFilter: number[][]) => {
      const previous = findNumberSource(curNumber, curFilter, print);
      return previous;
    },
    i
  );
}

function sourceNumberIsInSource(i: number) {
  const found = seedsActual.some(
    (startPos, index) => i >= startPos && i < startPos + seedsRange[index]
  );
  return found;
}

function findNumberSource(i: number, filter: number[][], print?: boolean) {
  let numberSource = i;
  filter.some((row: number[]) => {
    if (i >= row[0] && i < row[0] + row[2]) {
      numberSource = row[1] + (i - row[0]);
      return true;
    }
  });
  if (print) {
    console.log("  findNumberSource");
    console.log("  i", i);
    console.log("  filter", filter);
    console.log("  numberSource", numberSource);
  }
  return numberSource;
}

let smallestIndex = -1;

const sortedLast = [...filtersReversed[0]].sort((a, b) => a[0] - b[0]);
console.log("sortedLast", sortedLast);

const lowestPossibleInTargets = sortedLast[0][0];
if (lowestPossibleInTargets) {
  for (let i = 0; i < lowestPossibleInTargets; i++) {
    console.log("\nMOIKKELIS", i);
    const found = sourceNumberIsInSource(getSourceNumber(i));
    if (found) {
      smallestIndex = i;
      break;
    }
  }
}
if (smallestIndex == -1) {
  sortedLast.some((range) => {
    for (let i = range[0]; i < range[0] + range[2]; i++) {
      console.log("\nMOIKKELIS", i);
      const sourceNumber = getSourceNumber(i);
      const found = sourceNumberIsInSource(sourceNumber);
      if (found) {
        smallestIndex = i;
        return true;
      }
    }
  });
}

console.log("smallestIndex", smallestIndex);
