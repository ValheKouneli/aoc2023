import { readFromFile } from "./util";
const image: string[] = readFromFile("inputs/input14.txt");

function turnImage90DegAntiClockwise(image: string[]) {
  const newImage: string[] = [];

  for (let origCol = 0; origCol < image[0].length; origCol++) {
    const colToHandle = image[0].length - 1 - origCol;
    for (const element of image) {
      if (origCol == 0) {
        newImage.push("");
      }
      newImage[origCol] += element[colToHandle];
    }
  }
  return newImage;
}

const imageTurned = turnImage90DegAntiClockwise(image);

function printImage(image: string[]) {
  console.log();
  image.forEach((row) => console.log(row));
}

printImage(image);
printImage(imageTurned);

function getLoadOfRow(row: string) {
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

const part1 = imageTurned.reduce((sum, row) => sum + getLoadOfRow(row), 0);
console.log("part1", part1);
