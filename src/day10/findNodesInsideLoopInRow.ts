import { LoopMap } from "./types";
import { getUpOrDownFromDirections } from "./util";

export function findNodesInsideLoopInRow(row: number, loopMap: LoopMap) {
  //console.log("row", row);
  const rowMap = loopMap.get(row);
  if (!rowMap) {
    return 0;
  }
  const sortedNodes = [...rowMap.keys()].sort((a, b) => a - b);
  //console.log("sortedNodes", sortedNodes);
  type InfoThing = {
    colNumber: number;
    thingsToTheLeftAreInside: boolean;
  };
  const infoThings: InfoThing[] = [];
  const firstNodeOfRow = rowMap.get(sortedNodes[0]);
  if (!firstNodeOfRow) {
    throw new Error("First node of row should be in rowMap");
  }
  const dirOfFirstNode = getUpOrDownFromDirections(firstNodeOfRow);
  for (const node of sortedNodes) {
    const thisNodeWithDirection = rowMap.get(node);
    if (!thisNodeWithDirection) {
      throw new Error("Should be found");
    }
    const dirOfThisNode = getUpOrDownFromDirections(thisNodeWithDirection);
    infoThings.push({
      colNumber: node,
      thingsToTheLeftAreInside: dirOfThisNode != dirOfFirstNode,
    });
  }
  //console.log("infoThings", infoThings);
  let prevColNumber = 0;
  const pointsInside = infoThings.reduce((acc, cur, index) => {
    let added = 0;
    if (cur.thingsToTheLeftAreInside) {
      added = cur.colNumber - prevColNumber - 1;
    }
    prevColNumber = cur.colNumber;
    return acc + added;
  }, 0);
  //console.log("pointsInside", pointsInside);
  return pointsInside;
}
