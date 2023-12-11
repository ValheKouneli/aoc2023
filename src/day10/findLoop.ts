import { getNextPositionWithDirectionAndSymbol } from "./functions";
import { createNewLoopMap, setToLoopMap } from "./loopMap";
import { LoopMap, PositionWithDirectionsAndSymbol } from "./types";

export function findLoop(
  neighbor: PositionWithDirectionsAndSymbol,
  input: string[]
): {
  lengthOfLoop: number;
  loopMap: LoopMap;
} {
  const loopMap = createNewLoopMap();
  setToLoopMap(loopMap, neighbor);
  const allNodes = [neighbor];
  let pointer = 0;
  let loopFound = false;
  while (!loopFound) {
    const currentNode = allNodes[pointer];
    //console.log("currentNode", currentNode);
    const nextNode = getNextPositionWithDirectionAndSymbol(
      currentNode,
      input,
      neighbor.prevMovement
    );
    const char = input[nextNode.row][nextNode.col];
    loopFound = char == "S";
    setToLoopMap(loopMap, nextNode);
    allNodes.push(nextNode);
    pointer++;
  }
  return { lengthOfLoop: allNodes.length, loopMap };
}
