import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/test.txt");

console.log("original");
printUniverse(input);
function expandUniverseHorizontally(universe: string[]) {
  const expandedGalaxy: string[] = new Array(universe.length).fill("");
  for (let i = 0; i < universe[0].length; i++) {
    if (universe.every((row) => row[i] == ".")) {
      for (let j = 0; j < universe.length; j++) {
        expandedGalaxy[j] += ".";
      }
    }
    for (let j = 0; j < universe.length; j++) {
      expandedGalaxy[j] += universe[j][i];
    }
  }
  return expandedGalaxy;
}
function expandUniverseVertically(universe: string[]) {
  return universe.reduce((acc, row) => {
    if (!row.match(/#/)) {
      acc.push(row);
    }
    acc.push(row);
    return acc;
  }, [] as string[]);
}
const universeExpandedHorizontally = expandUniverseHorizontally(input);
console.log("universeExpandedHorizontally");
printUniverse(universeExpandedHorizontally);

const universeExpandedBothWays = expandUniverseVertically(
  universeExpandedHorizontally
);
console.log("universeExpandedBothWays");
printUniverse(universeExpandedBothWays);

function printUniverse(universe: string[]) {
  universe.forEach((row) => console.log(row));
}

function findGalaxies(universe: string[]) {
  return universe.reduce(
    (acc, cur, index) => acc.concat(findGalaxiesOfRow(cur, index)),
    [] as number[][]
  );
}

function findGalaxiesOfRow(row: string, rowIndex: number) {
  let remainingString = row;
  const galaxies: number[][] = [];
  let offset = 0;
  while (remainingString.match(/#/)) {
    const col = remainingString.indexOf("#");
    galaxies.push([rowIndex, offset + col]);
    remainingString = remainingString.slice(col + 1, remainingString.length);
    offset += col;
  }
  return galaxies;
}

const galaxies = findGalaxies(universeExpandedBothWays);
console.log("galaxies", galaxies);

function sumOfShortestDistances(galaxies: number[][]) {
  let sum = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxyA = galaxies[i];
      const galaxyB = galaxies[j];
      const distance =
        Math.abs(galaxyA[0] - galaxyB[0]) + Math.abs(galaxyA[1] - galaxyB[1]);
      //console.log("distance between", galaxyA, galaxyB, "is", distance);
      sum += distance;
    }
  }
  return sum;
}

const part1 = sumOfShortestDistances(galaxies);
console.log("part1", part1);

// 10043590 too low
