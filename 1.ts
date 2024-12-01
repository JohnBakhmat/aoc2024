const real = true;
const file = await Deno.readTextFile(`1.${real ? "real." : ""}txt`);
const lines = file.trim().split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines: string[]) {
  const batch = lines.map((line) => {
    return line.split("   ") as [string, string];
  }).reduce((acc, cur) => {
    acc[0].push(cur[0]);
    acc[1].push(cur[1]);
    return acc;
  }, [[], []] as [Array<string>, Array<string>]);

  const [left, right] = batch;
  left.sort();
  right.sort();

  const result = left.map((x, i) => Math.abs(+right[i] - +x));
  return result.reduce((a, c) => a + c, 0);
}
function part2(lines: string[]) {
  const batch = lines.map((line) => {
    return line.split("   ") as [string, string];
  }).reduce((acc, cur) => {
    acc[0].push(cur[0]);
    acc[1].push(cur[1]);
    return acc;
  }, [[], []] as [Array<string>, Array<string>]);

  const [left, right] = batch;
  left.sort();
  right.sort();

  const freq = right.reduce((acc, cur) => {
    const val = acc.get(cur);
    acc.set(cur, (val ?? 0) + 1);
    return acc;
  }, new Map<string, number>());

  const result = left.map((x) => +x * (freq.get(x) ?? 0));

  return result.reduce((a, c) => a + c, 0);
}
