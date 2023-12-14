import { readFromFile } from "./util";
const platform: string[] = readFromFile("inputs/test.txt");

function turnPlatform90DegAntiClockwise(platform: string[]) {
  const newPlatform: string[] = [];

  for (let origCol = 0; origCol < platform[0].length; origCol++) {
    const colToHandle = platform[0].length - 1 - origCol;
    for (const element of platform) {
      if (origCol == 0) {
        newPlatform.push("");
      }
      newPlatform[origCol] += element[colToHandle];
    }
  }
  return newPlatform;
}

function turnPlatform90DegClockwise(image: string[]) {
  const newImage: string[] = [];

  for (let origRowOrder = 0; origRowOrder < image.length; origRowOrder++) {
    const rowToHandle = image[image.length - 1 - origRowOrder];
    for (let origCol = 0; origCol < image[0].length; origCol++) {
      if (origRowOrder == 0) {
        newImage.push("");
      }
      newImage[origCol] += rowToHandle[origCol];
    }
  }
  return newImage;
}

const platformTurned = turnPlatform90DegAntiClockwise(platform);

function printPlatform(platform: string[]) {
  console.log();
  platform.forEach((row) => console.log(row));
}

function getWestLoadOfRowIfTiltedWest(row: string) {
  let dropPoint = row.length;
  let sum = 0;
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char == "O") {
      sum += dropPoint;
      dropPoint -= 1;
    } else if (char == "#") {
      dropPoint = row.length - i - 1;
    }
  }
  return sum;
}

function tiltPlatforEast(platform: string[]) {
  const tiltedPlatform = platform.map((row) => tiltRowEast(row));
  return tiltedPlatform;
}

function getLoadOnNorthWithoutTilting(platform: string[]) {
  let load = 0;
  for (let i = 0; i < platform.length; i++) {
    const row = platform[i];
    const roundStones = row.match(/O/g)?.length ?? 0;
    load += roundStones * (platform.length - i);
  }
  return load;
}

function tiltRowEast(row: string) {
  const tiltedRow = row
    .split("#")
    .map((section) => {
      const nbrOfRound = section.match(/O/g)?.length || 0;
      const tiltedSection =
        ".".repeat(section.length - nbrOfRound) + "O".repeat(nbrOfRound);
      return tiltedSection;
    })
    .join("#");
  return tiltedRow;
}

const part1 = platformTurned.reduce(
  (sum, row) => sum + getWestLoadOfRowIfTiltedWest(row),
  0
);
console.log("part1", part1);

let platformNow = platform;
for (let i = 0; i < 999 * 4; i++) {
  platformNow = turnPlatform90DegClockwise(platformNow);
  platformNow = tiltPlatforEast(platformNow);

  const modulo = i % 4;
  if (modulo == 0) {
    console.log("\nTilted north", i);
    const platformNorthSideUp = turnPlatform90DegAntiClockwise(platformNow);
    printPlatform(platformNorthSideUp);
    const load = getLoadOnNorthWithoutTilting(platformNorthSideUp);
    console.log("load", load);
  } else if (modulo == 1) {
    console.log("\nTilted west", i);
    const platformNorthSideUp = turnPlatform90DegAntiClockwise(
      turnPlatform90DegAntiClockwise(platformNow)
    );
    printPlatform(platformNorthSideUp);
    const load = getLoadOnNorthWithoutTilting(platformNorthSideUp);
    console.log("load", load);
  } else if (modulo == 2) {
    console.log("\nTilted south", i);
    const platformNorthSideUp = turnPlatform90DegClockwise(platformNow);
    printPlatform(platformNorthSideUp);
    const load = getLoadOnNorthWithoutTilting(platformNorthSideUp);
    console.log("load", load);
  } else if (modulo == 3) {
    console.log("\nTilted east", i);
    const platformNorthSideUp = platformNow;
    printPlatform(platformNorthSideUp);
    const load = getLoadOnNorthWithoutTilting(platformNorthSideUp);
    console.log("load", load);
  }
}
