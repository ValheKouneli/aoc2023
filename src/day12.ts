import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/test.txt");

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

const rowsWithErrorInfo = input
  .map((row) => row.split(" "))
  .map((pair) => ({
    row: [...pair[0]],
    errorInfo: pair[1].split(",").map((n) => parseInt(n)),
  }));

function arraysAreSame(a: number[], b: number[]) {
  return a.length == b.length && a.every((i, index) => b[index] == i);
}

function getAsString(charArray: string[]) {
  return charArray.reduce((acc, cur) => acc + cur, "");
}

function getNextBinary(binary: string | number): string | null {
  if (typeof binary === "number") return ".".repeat(binary);
  if (binary.match(/^#+$/)) return null;
  let firstDotIndex = -1;
  for (let i = binary.length - 1; i >= 0 && firstDotIndex < 0; i--) {
    if (binary[i] == ".") {
      firstDotIndex = i;
    }
  }
  return (
    binary.substring(0, firstDotIndex) +
    "#" +
    ".".repeat(binary.length - 1 - firstDotIndex)
  );
}

function getPossibilities(
  rowWithErrorInfo: RowWithErrorInfo,
  binaryMemoized?: Map<number, string[]>
): number {
  const positionsOfQuestionMark = getPositionsOfQuestionMarkInCharArray(
    rowWithErrorInfo.row
  );
  const n = positionsOfQuestionMark.length;
  let binary: string[] | undefined = binaryMemoized?.get(n);
  if (!binary) {
    binary = getBinaryNumbersOfLengthN(n);
    binaryMemoized?.set(n, binary);
  }
  return binary
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
}

function getPossibilitiesPart2(rowWithErrorInfo: RowWithErrorInfo): number {
  const positionsOfQuestionMark = getPositionsOfQuestionMarkInCharArray(
    rowWithErrorInfo.row
  );
  const n = positionsOfQuestionMark.length;
  let possibilities = 0;
  let binary: string | null = getNextBinary(n);
  while (binary) {
    const newString = [...rowWithErrorInfo.row];
    [...binary].forEach((char, index) => {
      newString[positionsOfQuestionMark[index]] = char;
    });
    if (arraysAreSame(calcErrorGroups(newString), rowWithErrorInfo.errorInfo)) {
      console.log(newString);
      possibilities++;
    }
    binary = getNextBinary(binary);
  }
  return possibilities;
}

function getCombinationSum(input: RowWithErrorInfo[]) {
  const binaryMemoized = new Map<number, string[]>();
  return input.reduce((sum, rowWithErrorInfo) => {
    return sum + getPossibilities(rowWithErrorInfo, binaryMemoized);
  }, 0);
}
// const part1 = getCombinationSum(rowsWithErrorInfo);

function expandRowWithErrorInfo(item: RowWithErrorInfo) {
  return {
    row: item.row
      .concat(item.row)
      .concat(item.row)
      .concat(item.row)
      .concat(item.row),
    errorInfo: item.errorInfo
      .concat(item.errorInfo)
      .concat(item.errorInfo)
      .concat(item.errorInfo)
      .concat(item.errorInfo),
  };
}

const part1 = rowsWithErrorInfo.reduce(
  (acc, cur) => acc + getPossibilitiesPart2(cur),
  0
);

console.log("part1", part1);

// const part2 = rowsWithErrorInfoPart2.reduce((acc, cur) => {
//   console.log("käsitellään");
//   console.log(getAsString(cur.row));
//   const possibilities = getPossibilitiesPart2(cur);
//   console.log("possibilities", possibilities);
//   return acc + possibilities;
// }, 0);

const string =
  "????.#...#...????.#...#...????.#...#...????.#...#...????.#...#...";
console.log(
  "part2",
  getPossibilitiesPart2({
    row: [...string],
    errorInfo: [4, 1, 1, 4, 1, 1, 4, 1, 1, 4, 1, 1, 4, 1, 1],
  })
);

//7716 too low
