import { readFromFile } from "./util";
const CUBESMAX = {
  red: 12,
  green: 13,
  blue: 14,
};
const input = readFromFile("inputs/input02.txt");

const dataOfGames: Record<string, Cubes[]> = input.reduce((acc, row) => {
  const [gameName, gameData] = row.split(":");
  const numberInGameName: string | undefined = gameName.match(/\d+/)?.pop();
  if (!numberInGameName) {
    throw Error("No number found! " + gameName);
  }
  const gameNumber: number = parseInt(numberInGameName);
  acc[gameNumber] = parseCubes(gameData);
  return acc;
}, {} as Record<string, Cubes[]>);

const part2Calculation = Object.values(dataOfGames).reduce((sum, gameData) => {
  const {
    red: minRed,
    blue: minBlue,
    green: minGreen,
  }: CubesMin = minCubes(gameData);
  return sum + minRed * minBlue * minGreen;
}, 0);

const part1Calculation = Object.keys(dataOfGames)
  .filter((key) => {
    return dataOfGames[key].every((game) => gameIsPossible(game));
  })
  .reduce((sum, gameNumber) => sum + parseInt(gameNumber));

console.log("part1Calculation", part1Calculation);
console.log("part2Calculation", part2Calculation);

function minCubes(games: Cubes[]) {
  return games.reduce(
    (acc: CubesMin, game: Cubes) => {
      if (game.green && game.green > acc.green) {
        acc.green = game.green;
      }
      if (game.blue && game.blue > acc.blue) {
        acc.blue = game.blue;
      }
      if (game.red && game.red > acc.red) {
        acc.red = game.red;
      }
      return acc;
    },
    {
      blue: 0,
      red: 0,
      green: 0,
    } as CubesMin
  );
}

type CubesMin = {
  blue: number;
  red: number;
  green: number;
};

type Cubes = {
  blue?: number;
  red?: number;
  green?: number;
};

function parseCubes(a: string) {
  return a.split(";").map(parseSet);
}

function gameIsPossible(a: Cubes) {
  if (a.blue && a.blue > CUBESMAX.blue) {
    return false;
  }
  if (a.red && a.red > CUBESMAX.red) {
    return false;
  }
  if (a.green && a.green > CUBESMAX.green) {
    return false;
  }
  return true;
}

function parseSet(a: string) {
  return a.split(",").reduce((acc, cur) => {
    const int = parseInt(cur);
    if (cur.includes("green")) {
      acc["green"] = int;
    } else if (cur.includes("blue")) {
      acc["blue"] = int;
    } else {
      acc["red"] = int;
    }
    return acc;
  }, {} as Cubes);
}
