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

type Filter = {
  targetbeg: number;
  sourcebeg: number;
  length: number;
};

const seeds = groups[0][0]
  .split(": ")[1]
  .split(" ")
  .map((a) => parseInt(a));
const filters: Filter[][] = groups
  .slice(1, groups.length)
  .map((a) => a.slice(1, a.length))
  .map((a: string[]) => {
    return a.map((a) => {
      const [targetbeg, sourcebeg, length] = a
        .split(" ")
        .map((a) => parseInt(a));
      return {
        targetbeg,
        sourcebeg,
        length,
      } as Filter;
    });
  })
  .map((a: Filter[]) => a.sort((a, b) => a.sourcebeg - b.sourcebeg));
const seedsActual = seeds.filter((seed, index) => index % 2 == 0);
const seedsRange = seeds.filter((seed, index) => index % 2 == 1);
const startingRanges = seedsActual.map((beginning, index) => ({
  beg: beginning,
  end: beginning + seedsRange[index] - 1,
}));

type Range = {
  beg: number;
  end: number;
};
function getFinalRanges(startingRanges: Range[]) {
  return filters.reduce((ranges: Range[], filter: Filter[], index: number) => {
    const rangesAfterFilter = ranges.reduce(
      (allRanges: Range[], rangeHere: Range) => {
        const rangesForThisRange = fromRangeGetRanges(rangeHere, filter);
        allRanges = allRanges.concat(rangesForThisRange);
        return allRanges;
      },
      []
    );
    return rangesAfterFilter;
  }, startingRanges);
}

const part2 = getFinalRanges(startingRanges).sort((a, b) => a.beg - b.beg)[0]
  .beg;
console.log("part2", part2);

function fromRangeGetRanges(range: Range, filter: Filter[]): Range[] {
  const ranges: Range[] = [];
  const leftOfRange = filter.reduce((leftOfRange, currentFilter) => {
    if (leftOfRange.beg < leftOfRange.end) {
      const currentFilterLast =
        currentFilter.sourcebeg + currentFilter.length - 1;
      if (currentFilterLast >= range.beg) {
        const handledRange = {
          beg: leftOfRange.beg,
          end: Math.min(
            leftOfRange.end,
            currentFilter.sourcebeg + currentFilter.length - 1
          ),
        };
        const rangeTroughFilter = {
          beg:
            currentFilter.targetbeg +
            (handledRange.beg - currentFilter.sourcebeg),
          end:
            currentFilter.targetbeg +
            (handledRange.end - currentFilter.sourcebeg),
        };
        ranges.push(rangeTroughFilter);
        leftOfRange = {
          beg: handledRange.end + 1,
          end: leftOfRange.end,
        };
      }
    }
    return leftOfRange;
  }, range);
  if (leftOfRange.beg < leftOfRange.end) {
    ranges.push(leftOfRange);
  }
  return ranges;
}
