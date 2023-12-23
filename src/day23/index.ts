import { readFromFile } from "../util";
import { findLongestPath } from "./paths";
import { branchFromNodePt1, branchFromNodePt2, mapForest } from "./mapForest";
const input: string[] = readFromFile("inputs/input23.txt");

const start = { row: 0, col: 1 };
const end = { row: 140, col: 139 };

const forestMapPart1 = mapForest(input, start, end, branchFromNodePt1);
const part1 = findLongestPath(forestMapPart1, start, end);
console.log("part1", part1);

const forestMap = mapForest(input, start, end, branchFromNodePt2);

[...forestMap.keys()].forEach((key) => {
  console.log("key", key);
  console.log(forestMap.get(key)?.map((link) => link.node));
});

const part2 = findLongestPath(forestMap, start, end);

console.log("part2", part2);
