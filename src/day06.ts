import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input06.txt");

const times = input[0]
  .split(":")[1]
  .split(" ")
  .filter((a) => !!a)
  .map((a) => parseInt(a));
const distances = input[1]
  .split(":")[1]
  .split(" ")
  .filter((a) => !!a)
  .map((a) => parseInt(a));
const timeReal = parseInt(
  input[0]
    .split(":")[1]
    .split(" ")
    .filter((a) => !!a)
    .reduce((acc, number) => acc + number)
);
const distanceReal = parseInt(
  input[1]
    .split(":")[1]
    .split(" ")
    .filter((a) => !!a)
    .reduce((acc, number) => acc + number)
);

const part1 = times
  .map((time, index) => {
    const distance = distances[index];
    return howManyWaysToWin(time, distance);
  })
  .reduce((sum, waysToWin) => sum * waysToWin, 1);
console.log("part1", part1);
const part2 = howManyWaysToWin(timeReal, distanceReal);
console.log("part2", part2);

function howManyWaysToWin(time: number, winningDistance: number) {
  const insideSquareRoot = time * time - 4 * winningDistance;
  if (insideSquareRoot < 0) {
    throw new Error("ZERO");
  }
  const lowerBoundToWin = (time - Math.sqrt(insideSquareRoot)) / 2;
  const upperBoundToWin = (time + Math.sqrt(insideSquareRoot)) / 2;
  const boundsToWin = [
    Math.floor(lowerBoundToWin + 1),
    Math.ceil(upperBoundToWin - 1),
  ];
  const waysToWin = boundsToWin[1] - boundsToWin[0] + 1;
  return waysToWin;
}
