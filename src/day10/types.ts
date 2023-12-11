export type Position = {
  row: number;
  col: number;
};
export type PositionWithDirection = Position & {
  prevMovement: Direction;
  counter: number;
};

export type PositionWithDirectionsAndSymbol = PositionWithDirection & {
  nextMovement: Direction;
  symbol: string;
};

export enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
}

export type Directions = Pick<
  PositionWithDirectionsAndSymbol,
  "nextMovement" | "prevMovement"
>;

export type RowMap = Map<number, PositionWithDirectionsAndSymbol>;
export type LoopMap = Map<number, RowMap>;
