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

type PersonalMap = Map<string, [string, number]>;

function getPersonalMap(startingCoordinate: string): PersonalMap {
  const personalMap = new Map<string, [string, number]>();
  let startPoint = startingCoordinate;
  let pointer = 0;
  let stepsTaken = 0;
  let coordinateNow: string = startingCoordinate;
  while (!personalMap.get(coordinateNow)) {
    // loop has been found
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

type CurrentPositionInPersonalMap = {
  lastZ: string;
  stepsAfterLastZ: number;
};

function applySteps(
  steps: number,
  currentPos: CurrentPositionInPersonalMap,
  personalMap: PersonalMap
): CurrentPositionInPersonalMap {
  //console.log("apply", steps, "to", currentPos);
  const value = personalMap.get(currentPos.lastZ);
  //console.log("value", value);
  const stepsToNext = value![1] - currentPos.stepsAfterLastZ;
  //console.log("stepsToNext", stepsToNext);
  if (stepsToNext <= 0) {
    throw new Error("APUA");
  }
  let ret;
  if (stepsToNext > steps) {
    ret = {
      lastZ: currentPos.lastZ,
      stepsAfterLastZ: currentPos.stepsAfterLastZ + steps,
    };
  } else {
    ret = {
      lastZ: value![0],
      stepsAfterLastZ: (steps - stepsToNext) % value![1],
    };
  }
  //console.log("ret", ret);
  return ret;
}

function howManyStepsToNextZ(
  currentPos: CurrentPositionInPersonalMap,
  personalMap: PersonalMap
): number {
  const value = personalMap.get(currentPos.lastZ);
  const left = value![1] - currentPos.stepsAfterLastZ;
  return left;
}

type Place = {
  personalMap: PersonalMap;
  currentPos: CurrentPositionInPersonalMap;
};

const places: Place[] = startingCoordinates.map((start) => ({
  personalMap: getPersonalMap(start),
  currentPos: {
    lastZ: start,
    stepsAfterLastZ: 0,
  },
}));
console.log(
  "personalMaps",
  places.map((p) => p.personalMap)
);

function getBiggestAmountsOfStepsToNextZ(places: Place[]) {
  const biggest = places
    .map((place) => howManyStepsToNextZ(place.currentPos, place.personalMap))
    .sort((a, b) => a - b)
    .pop() as number;
  //console.log("getBiggestAmountOfSteps", biggest);

  return biggest;
}

function getSmallestAmountsOfStepsToNextZ(places: Place[]) {
  const smallest = places
    .map((place) => howManyStepsToNextZ(place.currentPos, place.personalMap))
    .sort((a, b) => b - a)
    .pop() as number;

  return smallest;
}

function getPart2(places: Place[]) {
  const biggestNumberOfStepsToFirstZ = getBiggestAmountsOfStepsToNextZ(places);
  const initialPositions = places.map((place) => ({
    personalMap: place.personalMap,
    currentPos: applySteps(
      biggestNumberOfStepsToFirstZ,
      place.currentPos,
      place.personalMap
    ),
  }));
  console.log(
    "initial position",
    initialPositions.map((i) => i.currentPos)
  );
  let steps = biggestNumberOfStepsToFirstZ;
  let positions = initialPositions;
  while (
    positions.filter((pos) => pos.currentPos.stepsAfterLastZ == 0).length <= 1
  ) {
    console.log(positions.map((i) => i.currentPos));
    const howManyStepsToTake = getSmallestAmountsOfStepsToNextZ(positions);
    console.log("howManyStepsToTake", howManyStepsToTake);
    positions = positions.map((place) => ({
      personalMap: place.personalMap,
      currentPos: applySteps(
        howManyStepsToTake,
        place.currentPos,
        place.personalMap
      ),
    }));
    steps += howManyStepsToTake;
  }
  console.log(positions.map((i) => i.currentPos));
  return steps;
}
console.log("part2", getPart2(places));
