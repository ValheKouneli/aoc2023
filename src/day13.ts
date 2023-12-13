import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input13.txt", true);

const images = input.reduce(
  (acc, cur) => {
    if (cur == "") {
      acc.push([]);
    } else {
      acc[acc.length - 1].push(cur);
    }
    return acc;
  },
  [[]] as string[][]
);

function findHorizontalMirrorPoint(image: string[]): number | null {
  console.log("findHorizontalMirrorPoint");
  for (let i = 0 + 1; i < image.length; i++) {
    console.log("i", i);
    const thisRowsAboveIsCorrect = checkIfRowsAboveIsCorrect(image, i);
    if (thisRowsAboveIsCorrect) return i;
  }
  return null;
}

function findVerticalMirrorPoint(image: string[]): number | null {
  console.log("findVerticalMirrorPoint");
  const turnedImage = turnImage90DegClockwise(image);
  printImage(turnedImage);
  return findHorizontalMirrorPoint(turnedImage);
}

function checkIfRowsAboveIsCorrect(image: string[], rowsAbove: number) {
  const heightToCheck = Math.min(rowsAbove, image.length - rowsAbove);
  for (let i = 0; i < heightToCheck; i++) {
    // if (rowsAbove == 7) {
    //   console.log("checking");
    //   console.log(image[rowsAbove - 1 - i]);
    //   console.log(image[rowsAbove + i]);
    // }
    const isOk = image[rowsAbove - 1 - i] == image[rowsAbove + i];
    if (!isOk) {
      // if (rowsAbove == 7) {
      //   console.log("noMatch");
      // }
      return false;
    }
  }
  // if (rowsAbove == 7) {
  //   console.log("yes match");
  // }
  return true;
}

function turnImage90DegClockwise(image: string[]) {
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

function printImage(image: string[]) {
  console.log();
  image.forEach((row) => console.log(row));
}

console.log("images", images);
const part1 = images.reduce((sum, image) => {
  //printImage(image);
  const horizontalMirrorPoint = findHorizontalMirrorPoint(image);
  if (horizontalMirrorPoint) {
    //console.log("horizontalMirrorPoint", horizontalMirrorPoint);
    return sum + 100 * horizontalMirrorPoint;
  } else {
    const verticalMirrorPoint = findVerticalMirrorPoint(image);
    //console.log("verticalMirrorPoint", verticalMirrorPoint);
    if (!verticalMirrorPoint) {
      printImage(image);
      throw new Error("No mirror point found!");
    }
    return sum + verticalMirrorPoint;
  }
}, 0);

console.log("part1", part1);
