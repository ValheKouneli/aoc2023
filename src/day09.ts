import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input09.txt");
const sequences: number[][] = input
  .map((row) => row.split(" "))
  .map((a) => a.map((b) => parseInt(b)));
console.log("sequences", sequences);

function createSeries(sequence: number[]) {
  const series: number[][] = [sequence];
  let allZeroes = false;
  let currentSequence = sequence;
  while (!allZeroes) {
    let newSequence: number[] = [];
    let nonZeroFound = false;
    for (let i = 1; i < currentSequence.length; i++) {
      const diff = currentSequence[i] - currentSequence[i - 1];
      newSequence.push(diff);
      nonZeroFound = nonZeroFound || diff !== 0;
    }
    series.push(newSequence);
    currentSequence = newSequence;
    if (!nonZeroFound) {
      allZeroes = true;
    }
  }
  return series;
}

const series = sequences.map((sequence) => createSeries(sequence));
console.log("series", series);

function findNextInSequence(series: number[][]) {
  let n = series[0].length - 1;
  let next = 0;
  for (const row of series) {
    next += row[n];
    n--;
  }
  return next;
}

function findPrevInSequence(series: number[][], rowNumber: number): number {
  if (rowNumber == series.length - 1) {
    return 0;
  } else {
    return series[rowNumber][0] - findPrevInSequence(series, rowNumber + 1);
  }
}

const nextNumbers = series.map((s) => findNextInSequence(s));
console.log("nextNumbers", nextNumbers);
const sum = nextNumbers.reduce((acc, cur) => acc + cur, 0);
console.log("part1", sum);
const prevNumbers = series.map((s) => findPrevInSequence(s, 0));
console.log("prevNumbers", prevNumbers);
const part2 = prevNumbers.reduce((acc, cur) => acc + cur, 0);
console.log("part2", part2);
