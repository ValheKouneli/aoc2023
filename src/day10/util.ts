import { Direction, Directions, Position } from "./types";

const oppositeDirection: Record<Direction, Direction> = {
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT,
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
};

const pipes: Record<string, Direction[]> = {
  "|": [Direction.DOWN, Direction.UP],
  J: [Direction.LEFT, Direction.UP],
  F: [Direction.RIGHT, Direction.DOWN],
  L: [Direction.RIGHT, Direction.UP],
  "-": [Direction.LEFT, Direction.RIGHT],
  "7": [Direction.LEFT, Direction.DOWN],
};

export const coordinateChange: Record<Direction, Position> = {
  [Direction.LEFT]: { row: 0, col: -1 },
  [Direction.RIGHT]: { row: 0, col: 1 },
  [Direction.UP]: { row: -1, col: 0 },
  [Direction.DOWN]: { row: 1, col: 0 },
};

export function getOppositeDirection(dir: Direction): Direction {
  return oppositeDirection[dir];
}

export function getPipes(s: string): Direction[] | undefined {
  return pipes[s];
}

export function getCoordinateChange(dir: Direction) {
  return coordinateChange[dir];
}

export function getPipesFromPosition(pos: Position, input: string[]) {
  return getPipes(input[pos.row][pos.col]);
}

export function getUpOrDownFromDirections<D extends Directions>(dirs: D) {
  const upAndDown = [dirs.nextMovement, dirs.prevMovement].filter((d) =>
    [Direction.UP, Direction.DOWN].includes(d)
  );
  if (upAndDown.length == 2 && upAndDown[0] != upAndDown[1]) {
    throw new Error("O-ou");
  }
  return upAndDown.pop();
}
