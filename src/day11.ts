import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/test.txt");

console.log("original");
printGalaxy(input);
function expandGalaxyHorizontally(galaxy: string[]) {
  const expandedGalaxy: string[] = new Array(galaxy.length).fill("");
  for (let i = 0; i < galaxy[0].length; i++) {
    if (galaxy.every((row) => row[i] == ".")) {
      for (let j = 0; j < galaxy.length; j++) {
        expandedGalaxy[j] += ".";
      }
    }
    for (let j = 0; j < galaxy.length; j++) {
      expandedGalaxy[j] += galaxy[j][i];
    }
  }
  return expandedGalaxy;
}
function expandGalaxyVertically(galaxy: string[]) {
  return galaxy.reduce((acc, row) => {
    if (!row.match(/#/)) {
      acc.push(row);
    }
    acc.push(row);
    return acc;
  }, [] as string[]);
}
const galaxyExpandedHorizontally = expandGalaxyHorizontally(input);
console.log("galaxyExpandedHorizontally");
printGalaxy(galaxyExpandedHorizontally);

const galaxyExpandedBothWays = expandGalaxyVertically(
  galaxyExpandedHorizontally
);
console.log("galaxyExpandedBothWays");
printGalaxy(galaxyExpandedBothWays);

function printGalaxy(galaxy: string[]) {
  galaxy.forEach((row) => console.log(row));
}
