import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input11.txt");

console.log("original");
printUniverse(input);
function expandUniverseHorizontally(universe: string[]) {
  const expandedGalaxy: string[] = new Array(universe.length).fill("");
  for (let col = 0; col < universe[0].length; col++) {
    if (universe.every((row) => row[col] == ".")) {
      console.log("Column", col, "of input has no #");
      for (let row = 0; row < universe.length; row++) {
        expandedGalaxy[row] += ".";
      }
    }
    for (let row = 0; row < universe.length; row++) {
      expandedGalaxy[row] += universe[row][col];
    }
  }
  return expandedGalaxy;
}

function getExpandedCols(universe: string[]) {
  const expandedCols: number[] = [];
  for (let col = 0; col < universe[0].length; col++) {
    if (universe.every((row) => row[col] == ".")) {
      expandedCols.push(col);
    }
  }
  return expandedCols;
}

function getExpandedRows(universe: string[]) {
  const expandedRows: number[] = [];
  universe.forEach((row, index) => {
    if (!row.match(/#/)) {
      expandedRows.push(index);
    }
  });
  return expandedRows;
}

function expandUniverseVertically(universe: string[]) {
  return universe.reduce((acc, row, index) => {
    if (!row.match(/#/)) {
      console.log("Row", index, "of input has no #");
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
    (acc, cur, index) => acc.concat(findGalaxiesOfRow2(cur, index)),
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

function findGalaxiesOfRow2(row: string, rowIndex: number) {
  let spreadRow = [...row];
  const galaxies: number[][] = [];
  for (let i = 0; i < spreadRow.length; i++) {
    const char = spreadRow[i];
    if (char == "#") {
      galaxies.push([rowIndex, i]);
    }
  }
  return galaxies;
}

const galaxies = findGalaxies(universeExpandedBothWays);
// console.log("galaxies");
//galaxies.forEach((galaxy) => console.log(galaxy));

function sumOfShortestDistances(
  galaxies: number[][],
  calcDistance: (a: number[], b: number[]) => number
) {
  let sum = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxyA = galaxies[i];
      const galaxyB = galaxies[j];
      const distance = calcDistance(galaxyA, galaxyB);
      //console.log("distance between", galaxyA, galaxyB, "is", distance);
      sum += distance;
      //console.log("sum", sum);
    }
  }
  return sum;
}

function part1Distance(a: number[], b: number[]) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function getDistance(
  galaxyA: number[],
  galaxyB: number[],
  expandedRows: number[],
  expandedCols: number[]
) {
  const maxRow = Math.max(galaxyA[0], galaxyB[0]);
  const minRow = Math.min(galaxyA[0], galaxyB[0]);
  const maxCol = Math.max(galaxyA[1], galaxyB[1]);
  const minCol = Math.min(galaxyA[1], galaxyB[1]);
  const rowsBetweenGalaxies = expandedCols.filter(
    (col) => col > minCol && col < maxCol
  ).length;
  const colsBetweenGalaxies = expandedRows.filter(
    (row) => row > minRow && row < maxRow
  ).length;
  return (
    maxRow -
    minRow +
    maxCol -
    minCol +
    999999 * rowsBetweenGalaxies +
    999999 * colsBetweenGalaxies
  );
}

const part1 = sumOfShortestDistances(galaxies, part1Distance);
console.log("part1", part1);
const galaxiesPart2 = findGalaxies(input);

const part2 = sumOfShortestDistances(
  galaxiesPart2,
  (a: number[], b: number[]) =>
    getDistance(a, b, getExpandedRows(input), getExpandedCols(input))
);
console.log("part2", part2);
