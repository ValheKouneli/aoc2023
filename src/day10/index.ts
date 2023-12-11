import { readFromFile } from "../util";
import { findStartingPoint } from "./findStartingPoint";
import { getANeighbour } from "./getNeighbor";
import { findLoop } from "./findLoop";
import { printLoopWithColors } from "./printLoopWithColors";
import { findNodesInsideLoopInRow } from "./findNodesInsideLoopInRow";

const input: string[] = readFromFile("inputs/input10.txt");

const startingPoint = findStartingPoint(input);
console.log("startingPos", startingPoint);
const neighbor = getANeighbour(startingPoint, input);
console.log("neighbor", neighbor);
const { lengthOfLoop, loopMap } = findLoop(neighbor, input);
console.log("part1", Math.ceil(lengthOfLoop / 2));
printLoopWithColors(input, loopMap);

const numberOfCellsInsideLoop = input.reduce(
  (acc, _cur, index) => acc + findNodesInsideLoopInRow(index, loopMap),
  0
);

console.log("part2", numberOfCellsInsideLoop);
// 470 too low
// 803 too high
