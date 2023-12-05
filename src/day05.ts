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
//console.log("groups", groups);

const seeds = groups[0][0]
  .split(": ")[1]
  .split(" ")
  .map((a) => parseInt(a));
console.log("seeds", seeds);
const filterName = groups.slice(1, groups.length).map((a) => a[0]);
const filters = groups
  .slice(1, groups.length)
  .map((a) => a.slice(1, a.length))
  .map((a) => {
    return a.map((a) => {
      return a.split(" ").map((a) => parseInt(a));
    });
  });

const seedsActual = seeds.filter((seed, index) => index % 2 == 0);
const seedsRange = seeds.filter((seed, index) => index % 2 == 1);
const memoizedFilters = new Map<number, Map<number, number>>();
const part2 = seedsActual.reduce((minValue, number, index) => {
  // console.log("number", number);
  // console.log("plop", seedsRange[index]);
  for (let i = 0; i < seedsRange[index]; i++) {
    const seedNumber = number + i;
    console.log("seedNumber", seedNumber);

    const filtered = filterNumber(seedNumber, memoizedFilters);
    if (filtered < minValue) {
      minValue = filtered;
    }
  }
  return minValue;
}, Number.POSITIVE_INFINITY);

// const finalSet2 = filters.reduce(
//   (currentNumbers: number[], nextInfo: string[]) => {
//     const mapped = currentNumbers.map(createMap(nextInfo));
//     console.log("FILTER");
//     console.log("currentNumbers", currentNumbers);
//     console.log("mapped", mapped);
//     return mapped;
//   },
//   seeds2
// );
//console.log("part1", part1);
console.log("part2", part2);
//const part2 = Math.min(...finalSet2);
//console.log("part2", part2);

function filterNumber(
  a: number,
  memoizedFilters: Map<number, Map<number, number>>
) {
  let print = false;
  if (a == 82) {
    print = true;
  }
  return filters.reduce((aCurrentValue, filterSet, index) => {
    let memoizedFilter = memoizedFilters.get(index);
    if (!memoizedFilter) {
      memoizedFilter = new Map<number, number>();
    }
    const memoizedValue = memoizedFilter.get(aCurrentValue);
    if (memoizedValue) {
      return memoizedValue;
    }
    let mappedTo = aCurrentValue;
    filterSet.some((row: number[]) => {
      const [destStart, sourceStart, length] = row;
      if (
        aCurrentValue >= sourceStart &&
        aCurrentValue < sourceStart + length
      ) {
        mappedTo = destStart + (aCurrentValue - sourceStart);
        return true;
      }
    });
    memoizedFilter.set(aCurrentValue, mappedTo);
    memoizedFilters.set(index, memoizedFilter);
    return mappedTo;
  }, a);
}
