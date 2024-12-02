import {} from "@std/collections";
import { unzip } from "@std/collections";

const real = true;
const file = await Deno.readTextFile(`1.${real ? "real." : ""}txt`);
const lines = file.trim().split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines: string[]) {
  const data = lines.map((l) => l.split("   ") as [string, string]);
  const [left, right] = unzip(data);
  left.sort();
  right.sort();
  const result = left.map((x, i) => Math.abs(+right[i] - +x));
  return result.reduce((a, c) => a + c, 0);
}

function part2(lines: string[]) {
  const data = lines.map((l) => l.split("   ") as [string, string]);
  const [left, right] = unzip(data);
  const freq = right.reduce(
    (a, c) => a.set(c, (a.get(c) ?? 0) + 1),
    new Map<string, number>(),
  );
  const result = left.map((x) => +x * (freq.get(x) ?? 0));
  return result.reduce((a, c) => a + c, 0);
}
