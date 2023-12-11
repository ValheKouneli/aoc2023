import { getNewPosition, getNextMovement } from "./functions";
import {
  Direction,
  Position,
  PositionWithDirection,
  PositionWithDirectionsAndSymbol,
} from "./types";
import {
  getCoordinateChange,
  getOppositeDirection,
  getPipesFromPosition,
} from "./util";

export function getANeighbour(
  position: Position,
  input: string[]
): PositionWithDirectionsAndSymbol {
  const surroundingPositions = Object.keys(Direction).map((direction) => {
    // Move to "direction" from position
    const potentialNeighbor = getNewPosition(position, direction as Direction);
    return {
      ...potentialNeighbor,
      prevMovement: direction as Direction,
      counter: 1,
    } as PositionWithDirection;
  });
  const validSurroundingPositions = surroundingPositions.filter(
    (pos: PositionWithDirection) =>
      pos.row >= 0 &&
      pos.row < input.length &&
      pos.col >= 0 &&
      pos.col < input[pos.row].length
  );
  const neighbor = validSurroundingPositions.find(
    (pos: PositionWithDirection) => {
      const directionsHere = getPipesFromPosition(pos, input);
      if (!directionsHere) {
        return false;
      }
      return directionsHere.includes(getOppositeDirection(pos.prevMovement));
    }
  );
  if (!neighbor) {
    throw new Error("Neighbor not found");
  }
  const neighborWithDirectionsAndSymbol: PositionWithDirectionsAndSymbol = {
    ...neighbor,
    nextMovement: getNextMovement(neighbor, neighbor.prevMovement, input),
    symbol: input[neighbor.row][neighbor.col],
  };
  return neighborWithDirectionsAndSymbol;
}
