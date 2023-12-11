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
