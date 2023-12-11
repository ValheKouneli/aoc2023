import { getCoordinateChange, getOppositeDirection, getPipes } from "./util";
import { Direction, Position, PositionWithDirectionsAndSymbol } from "./types";

export function getNewPosition<Y extends Position>(pos: Y, dir: Direction) {
  const change = getCoordinateChange(dir);
  const copy = Object.assign({}, pos);
  return {
    ...copy,
    row: pos.row + change.row,
    col: pos.col + change.col,
  };
}

export function getNextMovement(
  currentPosition: Position,
  prevMovement: Direction,
  input: string[]
) {
  const symbol = input[currentPosition.row][currentPosition.col];
  const next = getPipes(symbol)?.find(
    (dir) => dir != getOppositeDirection(prevMovement)
  );
  if (!next) {
    console.log("currentPosition", currentPosition);
    console.log("prevMovement", prevMovement);
    throw new Error("Next movement not found!");
  }
  return next;
}

export function getNextPositionWithDirectionAndSymbol(
  currentPosition: PositionWithDirectionsAndSymbol,
  input: string[],
  fallBackNextMovement: Direction
): PositionWithDirectionsAndSymbol {
  const { nextMovement } = currentPosition;
  const nextPosition: PositionWithDirectionsAndSymbol = getNewPosition(
    currentPosition,
    nextMovement
  );
  nextPosition.symbol = input[nextPosition.row][nextPosition.col];
  nextPosition.prevMovement = nextMovement;
  if (nextPosition.symbol == "S") {
    nextPosition.nextMovement = fallBackNextMovement;
  } else {
    nextPosition.nextMovement = getNextMovement(
      nextPosition,
      nextMovement,
      input
    );
  }
  nextPosition.counter++;
  return nextPosition;
}
