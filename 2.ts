import { sumOf } from "@std/collections";

const real = true;
const file = await Deno.readTextFile(`2.${real ? "real." : ""}txt`);
const lines = file.trim().split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines: string[]) {
  lines.map((x) => x.split(""));

  return sumOf(lines, (x) => +x);
}

function part2(lines: string[]) {
  lines.map((x) => x.split(""));

  return sumOf(lines, (x) => +x);
}
