import {} from "@std/collections";

const real = true;
const file = await Deno.readTextFile(`3.${real ? "real." : ""}txt`);
const lines = file.trim();

console.log(part1(lines));
console.log(part2(lines));

function part1(text: string) {
  return text.match(/mul\(\d+,\d+\)/g)?.map(
    (m) => m.slice(4, -1).split(",").map(Number).reduce((a, c) => a * c, 1),
  ).reduce((a, c) => a + c, 0);
}

function part2(text: string) {
  const regex = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g;
  const matches = text.match(regex);

  const res = matches?.reduce((a, c) => {
    if (c.startsWith("mul(") && a.enabled) {
      a.value += c.slice(4, -1).split(",").map(Number).reduce(
        (a, c) => a * c,
        1,
      );
    } else if (c.startsWith("don't(")) {
      a.enabled = false;
    } else if (c.startsWith("do(")) {
      a.enabled = true;
    }
    return a;
  }, {
    value: 0,
    enabled: true,
  });

  return res?.value;
}
