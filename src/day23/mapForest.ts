import { getFromForestMap, setToForestMap } from "./forestMap";
import {
  Direction,
  Forest,
  ForestMap,
  Link,
  Place,
  PositionWithHistory,
} from "./types";
import {
  getDirectionsAwayFromWhereICame,
  readGroundType,
  placeIsCrossingOrStartOrEnd,
  getPositionInDirection,
} from "./util";

function travelUntilFindNextCrossing(
  forest: Forest,
  positionWithHistory: PositionWithHistory,
  start: Place,
  end: Place
): PositionWithHistory {
  let currentPositionWithHistory = positionWithHistory;
  while (
    !(
      placeIsCrossingOrStartOrEnd(
        forest,
        currentPositionWithHistory.position,
        start,
        end
      ) && currentPositionWithHistory.steps > 0
    )
  ) {
    currentPositionWithHistory = findNextMovement(
      forest,
      currentPositionWithHistory
    );
  }
  return currentPositionWithHistory;
}

function findNextMovement(
  forest: Forest,
  positionWithHistory: PositionWithHistory
): PositionWithHistory {
  const nextPosition = getDirectionsAwayFromWhereICame(
    positionWithHistory.directionJustTravelled
  )
    .map((direction) => getPositionInDirection(positionWithHistory, direction))
    .find((positionWithHistory: PositionWithHistory) => {
      const groundType = readGroundType(forest, positionWithHistory.position);
      return groundType && [">", "v", "."].includes(groundType);
    });
  if (!nextPosition) {
    console.log(positionWithHistory);
    throw new Error("Next place not found");
  }
  return nextPosition;
}

export function mapForest(forest: Forest, start: Place, end: Place): ForestMap {
  const forestMap = new Map<string, Link[]>();
  const nodesToHandle: PositionWithHistory[] = [
    { position: start, directionJustTravelled: Direction.DOWN, steps: 0 },
  ];

  while (nodesToHandle.length) {
    const nodeToHandle = nodesToHandle.pop();
    if (!nodeToHandle) {
      throw new Error("Something bad just happened");
    }
    branchFromNode(forest, nodeToHandle).forEach((newNode) => {
      const nextNode: PositionWithHistory = travelUntilFindNextCrossing(
        forest,
        newNode,
        start,
        end
      );
      setToForestMap(forestMap, nodeToHandle.position, {
        node: nextNode.position,
        length: nextNode.steps,
      });
      if (!getFromForestMap(forestMap, nextNode.position)) {
        nodesToHandle.push({ ...nextNode, steps: 0 });
      }
    });
  }
  return forestMap;
}

function branchFromNode(
  forest: Forest,
  node: PositionWithHistory
): PositionWithHistory[] {
  return getDirectionsAwayFromWhereICame(node.directionJustTravelled)
    .map((direction: Direction) => getPositionInDirection(node, direction))
    .filter((position: PositionWithHistory) => {
      const groundType = readGroundType(forest, position.position);
      return groundType && [">", "v", "."].includes(groundType);
    });
}
