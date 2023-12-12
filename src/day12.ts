import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input12.txt");

function calcErrorGroups(s: string[]) {
  return s
    .reduce(
      (acc, cur) => {
        if (cur != "#") {
          acc.push(0);
        } else {
          acc[acc.length - 1]++;
        }
        return acc;
      },
      [0] as number[]
    )
    .filter((a) => a !== 0);
}

function getPositionsOfQuestionMarkInCharArray(s: string[]) {
  const positions: number[] = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "?") {
      positions.push(i);
    }
  }
  return positions;
}

function getBinaryNumbersOfLengthN(n: number): string[] {
  if (n < 1) {
    throw new Error("n < 1");
  } else if (n == 1) {
    return [".", "#"];
  } else {
    const ret: string[] = [];
    getBinaryNumbersOfLengthN(n - 1).forEach((s) => {
      ret.push("." + s);
      ret.push("#" + s);
    });
    return ret;
  }
}

type RowWithErrorInfo = {
  row: string[];
  errorInfo: number[];
};

type RowWithErrorInfoAndPossibilites = RowWithErrorInfo & {
  possibilities: string[][];
};

const rowsWithErrorInfo = input
  .map((row) => row.split(" "))
  .map((pair) => ({
    row: [...pair[0]],
    errorInfo: pair[1].split(",").map((n) => parseInt(n)),
  }));

function arraysAreSame(a: number[], b: number[]) {
  return a.length == b.length && a.every((i, index) => b[index] == i);
}

const part1 = rowsWithErrorInfo.reduce((sum, rowWithErrorInfo) => {
  const positionsOfQuestionMark = getPositionsOfQuestionMarkInCharArray(
    rowWithErrorInfo.row
  );
  const possibilities: number = getBinaryNumbersOfLengthN(
    positionsOfQuestionMark.length
  )
    .map((replacementsForQuestionMark) => {
      const newString = [...rowWithErrorInfo.row];
      [...replacementsForQuestionMark].forEach((char, index) => {
        newString[positionsOfQuestionMark[index]] = char;
      });
      return newString;
    })
    .filter((possibility) =>
      arraysAreSame(calcErrorGroups(possibility), rowWithErrorInfo.errorInfo)
    ).length;
  return sum + possibilities;
}, 0);

console.log("part1", part1);
