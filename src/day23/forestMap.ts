import { ForestMap, Link, Place } from "./types";

export function getFromForestMap(
  forestMap: ForestMap,
  node: Place
): Link[] | undefined {
  return forestMap.get(`row${node.row}col${node.col}`);
}

export function setToForestMap(
  forestMap: ForestMap,
  node: Place,
  value: Link
): void {
  const currentValue: Link[] =
    forestMap.get(`row${node.row}col${node.col}`) || [];
  currentValue.push(value);
  forestMap.set(`row${node.row}col${node.col}`, currentValue);
}
