import { distinctBy, sortBy } from "@std/collections";

class Antena {
  constructor(
    public coords: [number, number],
    public freq: string,
  ) {}
}

class Antinode {
  constructor(
    public coords: [number, number],
    public freq: string,
  ) {}
}

const part1 = async (text: string) => {
  const grid = text.trim().split("\n").map((line) => line.split(""));
  const [width, height] = [grid[0].length, grid.length];
  const antenas = grid.flatMap((row, i) =>
    row.map((cell, j) =>
      /[A-Za-z0-9]/.test(cell) ? new Antena([j, i], cell) : null
    ).filter((
      pos,
    ) => !!pos)
  );

  const antinodes = antenas.flatMap((antenaA) => {
    const freq = antenaA.freq;

    const others = antenas.filter((a) =>
      a.freq === antenaA.freq && a.coords[0] !== antenaA.coords[0] &&
      a.coords[1] !== antenaA.coords[1]
    );

    return others.flatMap((antenaB) => {
      const [x, y] = antenaA.coords;
      const [x2, y2] = antenaB.coords;

      const [dx, dy] = [x2 - x, y2 - y];

      const [px, py] = [x2 + dx, y2 + dy];
      const [nx, ny] = [x - dx, y - dy];

      return [
        new Antinode([px, py], freq),
        new Antinode([nx, ny], freq),
      ];
    });
  }).filter((node) => {
    const [x, y] = node.coords;
    return x >= 0 && x < width && y >= 0 && y < height;
  });

  const distinct = sortBy(
    distinctBy(
      antinodes,
      (node) => node.coords.join(","),
    ),
    (node) => node.coords.join(","),
  );

  // console.log(distinct, distinct.length);
  return distinct.length;
};

const part2 = async (text: string) => {
  const grid = text.trim().split("\n").map((line) => line.split(""));
  const [width, height] = [grid[0].length, grid.length];
  const antenas = grid.flatMap((row, i) =>
    row.map((cell, j) =>
      /[A-Za-z0-9]/.test(cell) ? new Antena([j, i], cell) : null
    ).filter((
      pos,
    ) => !!pos)
  );

  const antinodes = antenas.flatMap((antenaA) => {
    const freq = antenaA.freq;

    const others = antenas.filter((a) =>
      a.freq === antenaA.freq && a.coords[0] !== antenaA.coords[0] &&
      a.coords[1] !== antenaA.coords[1]
    );

    return others.flatMap((antenaB) => {
      const [x, y] = antenaA.coords;
      const [x2, y2] = antenaB.coords;

      const [dx, dy] = [x2 - x, y2 - y];

      const antinodes = [];

      for (let i = 1; true; i++) {
        const [px, py] = [x2 + dx * i, y2 + dy * i];
        if (px < 0 || px >= width || py < 0 || py >= height) break;
        antinodes.push(new Antinode([px, py], freq));
      }

      for (let i = 1; true; i++) {
        const [nx, ny] = [x2 - dx * i, y2 - dy * i];
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) break;
        antinodes.push(new Antinode([nx, ny], freq));
      }

      return antinodes;
    });
  }).filter((node) => {
    const [x, y] = node.coords;
    return x >= 0 && x < width && y >= 0 && y < height;
  });

  const distinct = sortBy(
    distinctBy(
      antinodes,
      (node) => node.coords.join(","),
    ),
    (node) => node.coords.join(","),
  );

  // console.log(distinct, distinct.length);
  return distinct.length;
};

const main = async () => {
  const real = true;
  const day = 8;
  const filepath = `${day}.${real ? "real." : ""}txt`;
  const file = await Deno.readTextFile(filepath);

  console.log(await part1(file));
  console.log(await part2(file));
};

main();
