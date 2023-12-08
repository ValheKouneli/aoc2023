import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input08.txt");
const instructions: number[] = [...input[0]].map((i) => (i == "L" ? 0 : 1));
const mappings: Map<string, string[]> = input
  .slice(1, input.length)
  .reduce((map: Map<string, string[]>, cur: string) => {
    const [from, to] = cur.split(" = ");
    const left = to.slice(1, 4);
    const right = to.slice(6, 9);
    map.set(from, [left, right]);
    return map;
  }, new Map<string, string[]>());

function getNextNode(currentNode: string, instruction: number): string {
  const mappedTo = mappings.get(currentNode);
  if (!mappedTo) {
    throw new Error("MUR");
  }
  return mappedTo[instruction];
}
let pointer = 0;
let stepsTaken = 0;
let coordinateNow: string = "AAA";
while (coordinateNow !== "ZZZ") {
  const instruction = instructions[pointer];
  coordinateNow = getNextNode(coordinateNow, instruction);

  pointer = pointer + 1 < instructions.length ? pointer + 1 : 0;
  stepsTaken += 1;
  console.log("cordinateNow", coordinateNow);
}
console.log("part1", stepsTaken);
