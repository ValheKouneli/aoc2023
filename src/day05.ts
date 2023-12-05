import { readFromFile } from "./util";
const input: string[] = readFromFile("inputs/input05.txt", true);

const groups = input.reduce(
  (groups, row) => {
    if (!row) {
      groups.push([]);
    } else {
      groups[groups.length - 1].push(row);
    }
    return groups;
  },
  [[]] as string[][]
);
console.log("groups", groups);

const seeds = groups[0][0]
  .split(": ")[1]
  .split(" ")
  .map((a) => parseInt(a));
console.log("seeds", seeds);
const filters = groups.slice(1, groups.length).map((a) => a.slice(1, a.length));
console.log("filters", filters);
const finalSet = filters.reduce(
  (currentNumbers: number[], nextInfo: string[]) => {
    const mapped = currentNumbers.map(createMap(nextInfo));
    console.log("FILTER");
    console.log("currentNumbers", currentNumbers);
    console.log("mapped", mapped);
    return mapped;
  },
  seeds
);
const part1 = Math.min(...finalSet);
console.log("seeds", seeds);
console.log("part1", part1);

function createMap(info: string[]): (a: number) => number {
  return (a: number) => {
    //console.log("a", a);
    let mappedTo = a;
    info.some((row: string) => {
      const [destStartString, sourceStartString, lengthString] = row.split(" ");
      const destStart = parseInt(destStartString);
      const sourceStart = parseInt(sourceStartString);
      const length = parseInt(lengthString);
      // console.log("a=" + a, "should be greater or equal than", sourceStart);
      // console.log("and a should be smaller than", sourceStart + length);
      if (a >= sourceStart && a < sourceStart + length) {
        mappedTo = destStart + (a - sourceStart);
        //console.log("And it is, so it is mapped to", mappedTo);
        return true;
      } else {
        //console.log("But it i not");
      }
    });
    //console.log("mappedTo", mappedTo);
    return mappedTo;
  };
}
