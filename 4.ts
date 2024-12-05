const real = true;
const file = await Deno.readTextFile(`4.${real ? "real." : ""}txt`);
const lines = file.trim().split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines: string[]) {
  const grid = lines.map((x) => x.split(""));
  const xs = grid.flatMap((row, i) =>
    row.map((cell, j) => cell === "X" ? [i, j] as [number, number] : undefined)
      .filter(Boolean) as [number, number][]
  );

  const offsets = {
    left: [[0, 0], [0, -1], [0, -2], [0, -3]],
    right: [[0, 0], [0, 1], [0, 2], [0, 3]],
    top: [[0, 0], [-1, 0], [-2, 0], [-3, 0]],
    bottom: [[0, 0], [1, 0], [2, 0], [3, 0]],
    topLeft: [[0, 0], [-1, -1], [-2, -2], [-3, -3]],
    topRight: [[0, 0], [1, -1], [2, -2], [3, -3]],
    bottomLeft: [[0, 0], [-1, 1], [-2, 2], [-3, 3]],
    bottomRight: [[0, 0], [1, 1], [2, 2], [3, 3]],
  } as Record<string, [number, number][]>;

  // console.table(grid);
  const foo = xs.map((point) => {
    const checker = check(grid, point);
    const checks = [
      checker(offsets.left),
      checker(offsets.right),
      checker(offsets.top),
      checker(offsets.bottom),
      checker(offsets.topLeft),
      checker(offsets.bottomLeft),
      checker(offsets.topRight),
      checker(offsets.bottomRight),
    ];
    return checks.filter((x) => x === "XMAS").length;
  });

  return foo.reduce((a, c) => a + c);
}

function check(grid: string[][], x: [number, number]) {
  return function (
    offset: [number, number][],
  ) {
    const word = select(applyOffset(offset, x), grid);
    return word;
  };
}

function select(coords: [number, number][], grid: string[][]) {
  try {
    return coords.map(([y, x]) => grid[y][x]).join("");
  } catch (e) {
    return false;
  }
}

function applyOffset(offset: [number, number][], x: [number, number]) {
  return offset.map((o) => [x[0] + o[0], x[1] + o[1]] as [number, number]);
}

function part2(lines: string[]) {
  const grid = lines.map((x) => x.split(""));

  const matrix = [
    [-1, -1],
    [-1, 1],
    [0, 0],
    [1, -1],
    [1, 1],
  ] as [number, number][];

  const as = grid.flatMap((row, i) =>
    row.map((cell, j) => cell === "A" ? [i, j] as [number, number] : undefined)
      .filter(Boolean) as [number, number][]
  );

  const foo = as.map((a) => {
    const checker = check(grid, a);
    const word = checker(matrix);
    return ["MSAMS", "MMASS", "SSAMM", "SMASM"].some((x) => x === word);
  });
  return foo.filter(Boolean).length;
}
