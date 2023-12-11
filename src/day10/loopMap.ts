import { LoopMap, Position, PositionWithDirectionsAndSymbol } from "./types";

export function getFromLoopMap(
  position: Position,
  loopMap: LoopMap
): PositionWithDirectionsAndSymbol | undefined {
  const rowMap = loopMap.get(position.row);
  if (!rowMap) {
    return undefined;
  }
  return rowMap.get(position.col);
}

export function setToLoopMap(
  loopMap: LoopMap,
  position: PositionWithDirectionsAndSymbol
) {
  let rowMap = loopMap.get(position.row);
  if (!rowMap) {
    rowMap = new Map<number, PositionWithDirectionsAndSymbol>();
  }
  rowMap.set(position.col, position);
  loopMap.set(position.row, rowMap);
}

export function createNewLoopMap() {
  return new Map<number, Map<number, PositionWithDirectionsAndSymbol>>();
}
