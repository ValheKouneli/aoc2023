import { getFromForestMap } from "./forestMap";
import { ForestMap, Link, Path, Place } from "./types";
import { isSamePlace } from "./util";

export function findAllPaths(
  forestMap: ForestMap,
  start: Place,
  end: Place
): Path[] {
  let unFinishedPaths: Path[] = [[{ node: start, length: 0 }]];
  const finishedPaths: Path[] = [];
  while (unFinishedPaths.length) {
    const newUnFinishedPaths = [] as Path[];
    unFinishedPaths.forEach((unFinishedPath: Path) => {
      const allNextNodes = getFromForestMap(
        forestMap,
        unFinishedPath[unFinishedPath.length - 1].node
      );
      if (!allNextNodes) {
        console.log(unFinishedPath[unFinishedPath.length - 1].node);
        throw new Error("Next nodes not found");
      }
      const possibleNextNodes = allNextNodes.filter(
        (link) => !nodeIsAlreadyInPath(unFinishedPath, link.node)
      );
      possibleNextNodes.forEach((nextNode: Link) => {
        const newPath = unFinishedPath.concat([nextNode]);
        if (isSamePlace(end, nextNode.node)) {
          finishedPaths.push(newPath);
        } else {
          newUnFinishedPaths.push(newPath);
        }
      });
    });
    unFinishedPaths = newUnFinishedPaths;
  }
  return finishedPaths;
}

function nodeIsAlreadyInPath(path: Path, node: Place) {
  return path
    .map((link) => `row${link.node.row}col${link.node.col}`)
    .includes(`row${node.row}col${node.col}`);
}

function calculatePathLength(path: Path) {
  return path.reduce((acc, cur) => acc + cur.length, 0);
}

export function findLongestPath(
  forestMap: ForestMap,
  start: Place,
  end: Place
): number {
  let longestPath = 0;
  let unFinishedPaths: Path[] = [[{ node: start, length: 0 }]];
  while (unFinishedPaths.length) {
    const newUnFinishedPaths = [] as Path[];
    unFinishedPaths.forEach((unFinishedPath: Path) => {
      const allNextNodes = getFromForestMap(
        forestMap,
        unFinishedPath[unFinishedPath.length - 1].node
      );
      if (!allNextNodes) {
        console.log(unFinishedPath[unFinishedPath.length - 1].node);
        throw new Error("Next nodes not found");
      }
      const possibleNextNodes = allNextNodes.filter(
        (link) => !nodeIsAlreadyInPath(unFinishedPath, link.node)
      );
      possibleNextNodes.forEach((nextNode: Link) => {
        const newPath = unFinishedPath.concat([nextNode]);
        if (isSamePlace(end, nextNode.node)) {
          const pathLength = calculatePathLength(newPath);
          if (pathLength > longestPath) {
            longestPath = pathLength;
          }
        } else {
          newUnFinishedPaths.push(newPath);
        }
      });
    });
    unFinishedPaths = newUnFinishedPaths;
  }
  return longestPath;
}
