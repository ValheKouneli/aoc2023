import { readFromFile } from "../util";
import { LineData } from "./types";
import { linesCrossInAreaInFuture } from "./util";
const input: string[] = readFromFile("inputs/test.txt");

const lineData: LineData[] = input.map((row) => {
  const [positions, deltas] = row.split(" @ ");
  const [x, y, z] = positions.split(", ").map((i) => parseInt(i));
  const [dx, dy, dz] = deltas.split(", ").map((i) => parseInt(i));
  return {
    x,
    y,
    z,
    dx,
    dy,
    dz,
  };
});

console.log("lineData", lineData);

function getXYCrossingPointsInArea(
  lineData: LineData[],
  areaMin: number,
  areaMax: number
): number {
  let crossingPointsInArea = 0;
  for (let a = 0; a < lineData.length - 1; a++) {
    for (let b = a + 1; b < lineData.length; b++) {
      const lineDataA = lineData[a];
      const lineDataB = lineData[b];
      if (linesCrossInAreaInFuture(lineDataA, lineDataB, areaMin, areaMax)) {
        crossingPointsInArea++;
      }
    }
  }
  return crossingPointsInArea;
}

const part1 = getXYCrossingPointsInArea(lineData, 7, 27);
console.log("part1", part1);

// 469 too low
// 472 too low
