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
function getPart1(startingCoordinate: string) {
  let pointer = 0;
  let stepsTaken = 0;
  let coordinateNow: string = startingCoordinate;
  while (coordinateNow !== "ZZZ") {
    const instruction = instructions[pointer];
    coordinateNow = getNextNode(coordinateNow, instruction);

    pointer = pointer + 1 < instructions.length ? pointer + 1 : 0;
    stepsTaken += 1;
    //console.log("cordinateNow", coordinateNow);
  }
  return stepsTaken;
}

console.log("part1", getPart1("AAA"));

const startingCoordinates = [...mappings.keys()].filter(
  (a: string) => a[2] == "A"
);

function getPart2() {
  let pointer = 0;
  let stepsTaken = 0;
  let coordinatesNow: string[] = startingCoordinates;
  while (!coordinatesNow.every((a) => a[2] == "Z")) {
    const instruction = instructions[pointer];
    coordinatesNow = coordinatesNow.map((coordinate) =>
      getNextNode(coordinate, instruction)
    );
    pointer = pointer + 1 < instructions.length ? pointer + 1 : 0;
    stepsTaken += 1;
    console.log("coordinatesNow", coordinatesNow);
  }
  return stepsTaken;
}
console.log("part2", getPart2());
