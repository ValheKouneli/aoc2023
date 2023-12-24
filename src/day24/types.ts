export type PositionXY = {
  x: number;
  y: number;
};

export type PositionXYZ = PositionXY & { z: number };

export type DeltaXYZ = {
  dx: number;
  dy: number;
  dz: number;
};

export type LineData = PositionXYZ & DeltaXYZ;

export type LineXY = {
  a: number;
  b: number;
};
