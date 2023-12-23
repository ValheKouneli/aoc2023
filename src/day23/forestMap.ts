import { ForestMap, Link, Place } from "./types";
import { isSamePlace } from "./util";

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
  if (!nodeIsAlreadyInList(currentValue, value.node)) {
    currentValue.push(value);
    forestMap.set(`row${node.row}col${node.col}`, currentValue);
  }
}

function nodeIsAlreadyInList(list: Link[], node: Place) {
  return list.some((link) => isSamePlace(link.node, node));
}
