import { LineXY, LineData, PositionXY } from "./types";

export function lineDataToLine(lineData: LineData): LineXY {
  return {
    a: lineData.dy / lineData.dx,
    b: lineData.y - (lineData.dy / lineData.dx) * lineData.x,
  };
}

export function getXYLineCrossingPoint(
  lineA: LineXY,
  lineB: LineXY
): PositionXY | null {
  const underX = lineB.a - lineA.a;
  const underY = lineB.a - lineA.a;
  if (underX == 0 || underY == 0) {
    console.log("Do not cross");
    return null;
  }
  const lineCrossingPoint = {
    x: (lineA.b - lineB.b) / underX,
    y: (lineA.b * lineB.a - lineB.b * lineA.a) / underY,
  };
  console.log("cross", lineCrossingPoint);
  return lineCrossingPoint;
}

export function linesCrossInAreaInFuture(
  lineDataA: LineData,
  lineDataB: LineData,
  minXY: number,
  maxXY: number
): boolean {
  console.log("lineA", lineDataA);
  console.log("lineB", lineDataB);
  let minX = minXY;
  let maxX = maxXY;
  let minY = minXY;
  let maxY = maxXY;
  let lineDataAInput = lineDataA;
  let lineDataBInput = lineDataB;
  // const shiftX = Math.min(lineDataA.position.x, lineDataB.position.x, minX);
  // const shiftY = Math.min(lineDataA.position.y, lineDataB.position.y, minY);
  // lineDataAInput = {
  //   ...lineDataA,
  //   position: {
  //     ...lineDataA.position,
  //     x: lineDataA.position.x - shiftX,
  //     y: lineDataA.position.y - shiftY,
  //   },
  // };
  // lineDataBInput = {
  //   ...lineDataB,
  //   position: {
  //     ...lineDataB.position,
  //     x: lineDataB.position.x - shiftX,
  //     y: lineDataB.position.y - shiftY,
  //   },
  // };
  // minX = minX - shiftX;
  // maxX = maxX - shiftX;
  // minY = minY - shiftY;
  // maxY = maxY - shiftY;
  const lineA = lineDataToLine(lineDataAInput);
  const lineB = lineDataToLine(lineDataBInput);
  const crossingPoint = getXYLineCrossingPoint(lineA, lineB);
  if (!crossingPoint) return false;
  const isInArea = crossingPointIsInArea(crossingPoint, minX, maxX, minY, maxY);
  const isInFuture = crossingPointIsInFuture(
    lineDataA,
    lineDataB,
    crossingPoint
  );
  console.log("isInArea", isInArea, "isInFuture", isInFuture);
  return isInArea && isInFuture;
}

function crossingPointIsInFuture(
  lineDataA: LineData,
  lineDataB: LineData,
  crossingPoint: PositionXY
): boolean {
  if (lineDataA.dx > 0) {
    if (crossingPoint.x < lineDataA.x) {
      return false;
    }
  } else {
    if (crossingPoint.x > lineDataA.x) {
      return false;
    }
  }
  if (lineDataB.dx > 0) {
    if (crossingPoint.x < lineDataB.x) {
      return false;
    }
  } else {
    if (crossingPoint.x > lineDataB.x) {
      return false;
    }
  }
  return true;
}

export function crossingPointIsInArea(
  crossingPoint: PositionXY,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): boolean {
  return (
    minX <= crossingPoint.x &&
    crossingPoint.x <= maxX &&
    minY <= crossingPoint.y &&
    crossingPoint.y <= maxY
  );
}
