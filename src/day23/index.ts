import { readFromFile } from "../util";
import { mapForest } from "./mapForest";
const input: string[] = readFromFile("inputs/input23.txt");

const forestMap = mapForest(input, { row: 0, col: 1 }, { row: 140, col: 139 });

console.log(forestMap);
