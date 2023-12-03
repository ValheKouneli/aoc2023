import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input03.txt");
const matrix: string[][] = input.map((a) => [...a]);
type RowCol = {
  row: number;
  col: number;
};
const MAX_ROW = input.length - 1;
const MAX_COL = input[0].length - 1;

type NumberWithOwnPositions = {
  value: number;
  ownPositions: RowCol[];
};

type NumberWithSurroundingPositions = NumberWithOwnPositions & {
  surroundingPositions: RowCol[];
};

type GearWithNumbers = {
  gear: RowCol;
  numbers: NumberWithOwnPositions[];
};

function getNumbersOfRow(
  row: string,
  rowIndex: number
): NumberWithOwnPositions[] {
  const numbersOfRow: NumberWithOwnPositions[] = [];
  const origRow = row;
  let match = row.match(/\d+/)?.pop();
  while (match) {
    const number: number = parseInt(match);
    const relativeIndex = row.indexOf(match);
    const absoluteIndex = origRow.indexOf(row) + relativeIndex;
    const length = match.length;
    const ownPositions: RowCol[] = [];
    for (let i = 0; i < length; i++) {
      ownPositions.push({ row: rowIndex, col: absoluteIndex + i });
    }
    numbersOfRow.push({
      value: number,
      ownPositions,
    });
    row = row.slice(relativeIndex + length, row.length);
    match = row.match(/\d+/)?.pop();
  }
  return numbersOfRow;
}

function getGearsOfRow(row: string, rowIndex: number): RowCol[] {
  const gearsOfRow: RowCol[] = [];
  const origRow = row;
  let match = row.match(/\*/)?.pop();
  let relativePos = 0;
  while (match) {
    const relativeIndex = row.indexOf(match);
    const absoluteIndex = relativePos + relativeIndex;
    gearsOfRow.push({
      row: rowIndex,
      col: absoluteIndex,
    });
    row = row.slice(relativeIndex + 1, row.length);
    relativePos += relativeIndex + 1;
    match = row.match(/\*/)?.pop();
  }
  if (rowIndex === 86) {
    console.log("gearsOfRow", gearsOfRow);
  }
  return gearsOfRow;
}

function getSurroundingPositions(ownPositions: RowCol[]) {
  const unfiltered = ownPositions.reduce(
    (all, pos) => all.concat(surroundingPositions(pos)),
    [] as RowCol[]
  );
  const filtered = unfiltered.filter(
    (pos) =>
      !ownPositions.find(
        (ownPos) => ownPos.row == pos.row && ownPos.col == pos.col
      )
  );
  return filtered;
}

function getNumbers(input: string[]): NumberWithOwnPositions[] {
  return input.reduce(
    (numbers, row, index) => numbers.concat(getNumbersOfRow(row, index)),
    [] as NumberWithOwnPositions[]
  );
}

function getGears(input: string[]): RowCol[] {
  return input.reduce(
    (numbers, row, index) => numbers.concat(getGearsOfRow(row, index)),
    [] as RowCol[]
  );
}

function getNumbersOfGear(
  gear: RowCol,
  numbers: NumberWithOwnPositions[]
): NumberWithOwnPositions[] {
  return numbers.filter((number) =>
    surroundingPositions(gear).some((gearSurPos) =>
      number.ownPositions.some(
        (numberPos) =>
          numberPos.col == gearSurPos.col && numberPos.row == gearSurPos.row
      )
    )
  );
}

function getCharInMatrix(pos: RowCol): string {
  const char = matrix[pos.row][pos.col];
  return char;
}

function charIsSymbol(c: String) {
  const isSymbol = !!c.match(/[^\d\.]/)?.pop();
  return isSymbol;
}

function numberIsSurroundedBySomeMerkki(
  numberInMatrix: NumberWithSurroundingPositions
): boolean {
  return numberInMatrix.surroundingPositions.some((pos) =>
    charIsSymbol(getCharInMatrix(pos))
  );
}

function surroundingPositions(pos: RowCol) {
  const positions = [
    { row: pos.row - 1, col: pos.col - 1 },
    { row: pos.row - 1, col: pos.col },
    { row: pos.row - 1, col: pos.col + 1 },
    { row: pos.row, col: pos.col - 1 },
    { row: pos.row, col: pos.col + 1 },
    { row: pos.row + 1, col: pos.col - 1 },
    { row: pos.row + 1, col: pos.col },
    { row: pos.row + 1, col: pos.col + 1 },
  ];
  const validPositions = positions.filter(
    (pos) =>
      pos.col >= 0 && pos.col <= MAX_COL && pos.row >= 0 && pos.row <= MAX_ROW
  );
  return validPositions;
}

const numbers = getNumbers(input);
const gears = getGears(input);

const numbersWithSurPositions: NumberWithSurroundingPositions[] = numbers.map(
  (nbr) => {
    const numberWithSurPos: NumberWithSurroundingPositions = {
      ...nbr,
      surroundingPositions: getSurroundingPositions(nbr.ownPositions),
    };
    return numberWithSurPos;
  }
);

const numbersSurroundedByMerkki = numbersWithSurPositions.filter(
  numberIsSurroundedBySomeMerkki
);
const part1 = numbersSurroundedByMerkki.reduce(
  (acc, cur) => acc + cur.value,
  0
);

const gearsWithNumbers: GearWithNumbers[] = gears.map((gear) => ({
  gear,
  numbers: getNumbersOfGear(gear, numbers),
}));

const gearsWithTwoNumbers: GearWithNumbers[] = gearsWithNumbers.filter(
  (gearWithNumbers: GearWithNumbers) => {
    return gearWithNumbers.numbers.length === 2;
  }
);

gearsWithNumbers.forEach((gear) => {
  const numbers = gear.numbers.map((number) => number.value);
  if (numbers[0] === 642) {
    console.log("gear", gear, "ratio", numbers);
  }
});

const part2 = gearsWithTwoNumbers.reduce(
  (sum, gear) => sum + gear.numbers[0].value * gear.numbers[1].value,
  0
);

console.log("part1", part1);
console.log("part2", part2);
