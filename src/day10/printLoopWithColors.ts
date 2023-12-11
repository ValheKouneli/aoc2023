import { getFromLoopMap } from "./loopMap";
import { Direction, LoopMap } from "./types";
import { getUpOrDownFromDirections } from "./util";

export function printLoopWithColors(input: string[], loopMap: LoopMap) {
  input
    .map((rowString, row) => {
      const rowSpread = [...rowString];
      let firstDirection: Direction | null = null;
      return rowSpread
        .map((char, col) => {
          const nodeInLoop = getFromLoopMap({ row, col }, loopMap);
          if (!nodeInLoop) {
            return " ";
          } else {
            const upOrDownDir = getUpOrDownFromDirections(nodeInLoop);
            if (firstDirection == null) {
              firstDirection = upOrDownDir || null;
            }
            const color =
              upOrDownDir == firstDirection
                ? "\x1b[36m%s\x1b[0m"
                : "\x1b[33m%s\x1b[0m";
            return color.replace("%s", char);
          }
        })
        .reduce((acc, cur) => acc + cur, "");
    })
    .forEach((row) => console.log(row));
}
