import { readFromFile } from "./util";
import lcm from "compute-lcm";
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
  }
  return stepsTaken;
}

console.log("part1", getPart1("AAA"));

const startingCoordinates = [...mappings.keys()].filter(
  (a: string) => a[2] == "A"
);

type PersonalMap = Map<string, [string, number]>;

function getPersonalMap(startingCoordinate: string): PersonalMap {
  const personalMap = new Map<string, [string, number]>();
  let startPoint = startingCoordinate;
  let pointer = 0;
  let stepsTaken = 0;
  let coordinateNow: string = startingCoordinate;
  // break out when loop has been found
  while (!personalMap.get(coordinateNow)) {
    const instruction = instructions[pointer];
    coordinateNow = getNextNode(coordinateNow, instruction);
    pointer = pointer + 1 < instructions.length ? pointer + 1 : 0;
    stepsTaken += 1;
    if (coordinateNow[2] == "Z") {
      personalMap.set(startPoint, [coordinateNow, stepsTaken]);
      stepsTaken = 0;
      startPoint = coordinateNow;
    }
  }
  return personalMap;
}

const personalMaps: PersonalMap[] = startingCoordinates.map((start) =>
  getPersonalMap(start)
);
console.log("personalMaps", personalMaps);
// prints out:
// personalMaps [
//   Map(2) { 'DLA' => [ 'XBZ', 20777 ], 'XBZ' => [ 'XBZ', 20777 ] },
//   Map(2) { 'DNA' => [ 'LKZ', 19199 ], 'LKZ' => [ 'LKZ', 19199 ] },
//   Map(2) { 'XLA' => [ 'XQZ', 17621 ], 'XQZ' => [ 'XQZ', 17621 ] },
//   Map(2) { 'AAA' => [ 'ZZZ', 15517 ], 'ZZZ' => [ 'ZZZ', 15517 ] },
//   Map(2) { 'JVA' => [ 'KDZ', 13939 ], 'KDZ' => [ 'KDZ', 13939 ] },
//   Map(2) { 'SHA' => [ 'NTZ', 12361 ], 'NTZ' => [ 'NTZ', 12361 ] }
// ]

if (
  personalMaps.some((map) => [...map.values()][0][1] != [...map.values()][1][1])
) {
  throw new Error("Shit just got complucated");
} else {
  console.log("We are very lucky O_O");
}
const steps: number[] = personalMaps.map(
  (map) => map.get([...map.keys()][1])![1]
);

console.log("steps", steps);

const part2 = lcm(steps);
console.log("part2", part2);
