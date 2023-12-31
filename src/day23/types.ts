export type Place = {
  row: number;
  col: number;
};

export type Link = {
  node: Place;
  length: number;
};

export type PositionWithHistory = {
  position: Place;
  directionJustTravelled: Direction;
  steps: number;
};

export type Forest = string[];

export type ForestMap = Map<string, Link[]>;

export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export type Path = Link[];
