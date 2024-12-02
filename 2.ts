import { sumOf } from "@std/collections";

const real = true;
const file = await Deno.readTextFile(`2.${real ? "real." : ""}txt`);
const lines = file.trim().split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines: string[]) {
  const grid = lines.map((x) => x.split(" ").map(Number));

  const res = grid.filter((row) => {
    const isIncreasing = row.every((x, i, a) => i === 0 ? true : x > a[i - 1]);
    const isDecreasing = row.every((x, i, a) => i === 0 ? true : x < a[i - 1]);
    const diff = row.map((x, i, a) => Math.abs(x - a[i + 1])).filter((x) =>
      !isNaN(x)
    );

    const maxDiff = Math.max(...diff);
    const minDiff = Math.min(...diff);

    // console.log(isIncreasing, isDecreasing, diff, maxDiff, minDiff);

    return (isIncreasing !== isDecreasing) && maxDiff <= 3 && minDiff >= 1;
  });

  return res.length;
}

function part2(lines: string[]) {
  const grid = lines.map((x) => x.split(" ").map(Number));

  const res = grid.filter((row) => {
    const posibilities = row.map((_, cell) => {
      const rowWithout = row.filter((_, i) => i !== cell);

      const isIncreasing = rowWithout.every((x, i, a) =>
        i === 0 ? true : x > a[i - 1]
      );
      const isDecreasing = rowWithout.every((x, i, a) =>
        i === 0 ? true : x < a[i - 1]
      );
      const diff = rowWithout.map((x, i, a) => Math.abs(x - a[i + 1])).filter((
        x,
      ) => !isNaN(x));

      const maxDiff = Math.max(...diff);
      const minDiff = Math.min(...diff);

      // console.log(isIncreasing, isDecreasing, diff, maxDiff, minDiff);

      return (isIncreasing !== isDecreasing) && maxDiff <= 3 && minDiff >= 1;
    });

    return posibilities.some((x) => x);
  });

  return res.length;
}
