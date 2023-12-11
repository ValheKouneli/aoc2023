import { Position } from "./types";

export function findStartingPoint(input: string[]): Position {
  let ret: Position = {
    row: -1,
    col: -1,
  };
  input.some((row, index) => {
    if (!row.match(/S/)) {
      return false;
    } else {
      ret = {
        row: index,
        col: row.indexOf("S"),
      };
      return true;
    }
  });
  if (ret.row == -1) {
    throw new Error("APUA");
  }
  return ret;
}
