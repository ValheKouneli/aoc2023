import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input10.txt");

enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
}

const oppositeDirection: Record<Direction, Direction> = {
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT,
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
};

const pipes: Record<string, Direction[]> = {
  "|": [Direction.DOWN, Direction.UP],
  J: [Direction.LEFT, Direction.UP],
  F: [Direction.RIGHT, Direction.DOWN],
  L: [Direction.RIGHT, Direction.UP],
  "-": [Direction.LEFT, Direction.RIGHT],
  "7": [Direction.LEFT, Direction.DOWN],
};

const getCoordinateChange: Record<Direction, Position> = {
  [Direction.LEFT]: { row: 0, col: -1 },
  [Direction.RIGHT]: { row: 0, col: 1 },
  [Direction.UP]: { row: -1, col: 0 },
  [Direction.DOWN]: { row: 1, col: 0 },
};

type Position = {
  row: number;
  col: number;
};
type PositionWithDirection = Position & {
  prevMovement: Direction;
  counter: number;
};

function getNextPosition(
  currentPosition: PositionWithDirection
): PositionWithDirection {
  const { row, col, prevMovement, counter } = currentPosition;
  const directionsFromHere = pipes[input[row][col]];
  const movement: Direction = directionsFromHere.find(
    (i) => i !== oppositeDirection[prevMovement]
  ) as Direction;
  const coordinateChange = getCoordinateChange[movement];
  return {
    row: row + coordinateChange.row,
    col: col + coordinateChange.col,
    prevMovement: movement,
    counter: counter + 1,
  };
}

function findStartingPoint(): Position {
  let ret: Position = {
    row: -1,
    col: -1,
  };
  input.some((row, index) => {
    if (!row.match(/S/)) {
      return false;
    } else {
      ret = {
        row: index,
        col: row.indexOf("S"),
      };
      return true;
    }
  });
  if (ret.row == -1) {
    throw new Error("APUA");
  }
  return ret;
}

function getSurroundingPositionWithDirectionThatPointToThisPosition(
  position: Position
) {
  const surroundingPositions = Object.keys(getCoordinateChange).map(
    (direction) => {
      // What is on "direction" side of "position"
      const coordinateChange = getCoordinateChange[direction as Direction];
      return {
        row: position.row + coordinateChange.row,
        col: position.col + coordinateChange.col,
        prevMovement: direction as Direction,
        counter: 1,
      } as PositionWithDirection;
    }
  );
  const validSurroundingPositions = surroundingPositions.filter(
    (pos: PositionWithDirection) =>
      pos.row >= 0 &&
      pos.row < input.length &&
      pos.col >= 0 &&
      pos.col < input[pos.row].length
  );
  const positionsThatLeadToGivenPosition = validSurroundingPositions.filter(
    (pos: PositionWithDirection) => {
      const char = input[pos.row][pos.col];
      const directionsFromHere = pipes[char];
      if (!directionsFromHere) {
        return false;
      }
      return directionsFromHere.includes(oppositeDirection[pos.prevMovement]);
    }
  );
  return positionsThatLeadToGivenPosition;
}

const startingPoint = findStartingPoint();

console.log("startingPos", startingPoint);
const firstNeighbors =
  getSurroundingPositionWithDirectionThatPointToThisPosition(startingPoint);
console.log("firstNeighbors", firstNeighbors);

function part1(firstNeighbors: PositionWithDirection[]) {
  const visitedPlaces = new Map<string, PositionWithDirection>();
  firstNeighbors.forEach((place) => {
    visitedPlaces.set(`row${place.row}col${place.col}`, place);
  });
  const allNodes = [...firstNeighbors];
  let pointer = 0;
  let loopFound = false;
  while (!loopFound) {
    const currentNode = allNodes[pointer];
    const nextNode = getNextPosition(currentNode);
    loopFound = !!visitedPlaces.get(`row${nextNode.row}col${nextNode.col}`);
    visitedPlaces.set(`row${nextNode.row}col${nextNode.col}`, nextNode);
    allNodes.push(nextNode);
    pointer++;
  }
  return allNodes.pop()?.counter;
}

console.log("part1", part1(firstNeighbors));
