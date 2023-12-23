import { Direction, Forest, Place, PositionWithHistory } from "./types";

export function readGroundType(forest: Forest, place: Place): string | null {
  try {
    return forest[place.row][place.col];
  } catch (e) {
    return null;
  }
}

export function getPositionInDirection(
  currentPosition: PositionWithHistory,
  direction: Direction
): PositionWithHistory {
  const position = getPlaceInDirection(currentPosition.position, direction);
  return {
    position,
    directionJustTravelled: direction,
    steps: currentPosition.steps + 1,
  };
}

export function getPlaceInDirection(place: Place, direction: Direction): Place {
  switch (direction) {
    case Direction.UP:
      return {
        row: place.row - 1,
        col: place.col,
      };
    case Direction.DOWN:
      return {
        row: place.row + 1,
        col: place.col,
      };
    case Direction.LEFT:
      return {
        row: place.row,
        col: place.col - 1,
      };
    case Direction.RIGHT:
      return {
        row: place.row,
        col: place.col + 1,
      };
  }
}

export function isSamePlace(placeA: Place, placeB: Place): boolean {
  return placeA.row == placeB.row && placeA.col == placeB.col;
}

function getOppositeDirection(direction: Direction): Direction {
  switch (direction) {
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.LEFT;
  }
}

export function getDirectionsAwayFromWhereICame(
  directionIJustTravelled: Direction
): Direction[] {
  const oppositeDirection = getOppositeDirection(directionIJustTravelled);
  return Object.values(Direction).filter(
    (dir: Direction) => dir != oppositeDirection
  );
}

export function placeIsCrossingOrStartOrEnd(
  forest: Forest,
  place: Place,
  start: Place,
  end: Place
): boolean {
  if (isSamePlace(place, start) || isSamePlace(place, end)) {
    return true;
  }
  const charsAroundPlace = Object.values(Direction).map((dir: Direction) =>
    readGroundType(forest, getPlaceInDirection(place, dir))
  );
  const numberOfArrowsAroundPlace = charsAroundPlace.filter(
    (char) => char && [">", "v"].includes(char)
  ).length;
  const placeIsCrossing = numberOfArrowsAroundPlace > 1;
  return placeIsCrossing;
}
