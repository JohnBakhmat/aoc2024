enum Tile {
  Empty = ".",
  Wall = "#",
  Hero = "^",
  Visited = "X",
}

const directions = ["up", "right", "bottom", "left"] as const;
type Direction = typeof directions[number];

const part1 = (lines: string[]) => {
  let heroPos = [0, 0];
  let facing = "up" as Direction;

  const grid = lines.map((line, i) =>
    line.split("").map((char, j) => {
      if (char === "^") {
        heroPos = [i, j];
      }

      return (char as Tile);
    })
  );

  const [width, height] = [grid.length, grid[0].length];
  let [x, y] = [heroPos[0], heroPos[1]];

  const directionMap = {
    "up": [-1, 0],
    "right": [0, 1],
    "bottom": [1, 0],
    "left": [0, -1],
  } as Record<Direction, number[]>;

  while (true) {
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      grid[x][y] = Tile.Visited;
      break;
    }

    const [dx, dy] = directionMap[facing];
    const [nx, ny] = [x + dx, y + dy];

    if (grid[nx][ny] === Tile.Wall) {
      facing = directions.at(directions.indexOf(facing) + 1) ?? "up";
      continue;
    }

    grid[x][y] = Tile.Visited;
    x = nx;
    y = ny;
    grid[x][y] = Tile.Hero;
  }

  const visited = grid.map((row) =>
    row.filter((tile) => tile === Tile.Visited).length
  )
    .reduce((a, b) => a + b, 0);
  return visited;
};

const part2 = (lines: string[]) => {
  let heroPos = [0, 0];
  let facing = "up" as Direction;

  const grid = lines.map((line, i) =>
    line.split("").map((char, j) => {
      if (char === "^") {
        heroPos = [i, j];
      }

      return (char as Tile);
    })
  );

  const [width, height] = [grid.length, grid[0].length];
  let [x, y] = [heroPos[0], heroPos[1]];

  const directionMap = {
    "up": [-1, 0],
    "right": [0, 1],
    "bottom": [1, 0],
    "left": [0, -1],
  } as Record<Direction, number[]>;

  while (true) {
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      grid[x][y] = Tile.Visited;
      break;
    }

    const [dx, dy] = directionMap[facing];
    const [nx, ny] = [x + dx, y + dy];

    if (grid[nx][ny] === Tile.Wall) {
      facing = directions.at(directions.indexOf(facing) + 1) ?? "up";
      continue;
    }

    grid[x][y] = Tile.Visited;
    x = nx;
    y = ny;
    grid[x][y] = Tile.Hero;
  }

  const visited = grid.map((row) =>
    row.filter((tile) => tile === Tile.Visited).length
  )
    .reduce((a, b) => a + b, 0);

  console.table(grid);
  console.log(heroPos);
  return visited;
};

const real = false;
const file = await Deno.readTextFile(`6.${real ? "real." : ""}txt`);
const lines = file.trim().split("\n");
console.log(part1(lines));
console.log(part2(lines));
