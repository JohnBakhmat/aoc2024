import { LruCache, memoize } from "@std/cache";

const cache = new LruCache<unknown, bigint>(1000);
const blink = memoize((x: number, d = 25): number => {
  if (d === 0) return 1;
  if (x === 0) return blink(1, d - 1);

  const l = Math.floor(Math.log10(x)) + 1;
  const l10 = 10 ** (l / 2);

  if (l % 2 === 0) {
    return blink(Math.floor(x / l10), d - 1) + blink(x % l10, d - 1);
  }
  return blink(x * 2024, d - 1);
}, { cache });

const part1 = async (text: string) => {
  const numbers = text.trim().split(" ").map((x) => Number.parseInt(x));
  return numbers.map((x) => blink(x)).reduce((acc, cur) => acc + cur);
};

const part2 = async (text: string) => {
  const numbers = text.trim().split(" ").map((x) => Number.parseInt(x));
  return numbers.map((x) => blink(x, 75)).reduce((acc, cur) => acc + cur);
};

const main = async () => {
  const real = true;
  const day = 11;
  const filepath = `${day}.${real ? "real." : ""}txt`;
  const file = await Deno.readTextFile(filepath);

  console.log(await part1(file));
  console.log(await part2(file));
};

main();
