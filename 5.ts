const real = false;
const file = await Deno.readTextFile(`5.${real ? "real." : ""}txt`);
const lines = file.trim().split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines: string[]) {
}

function part2(lines: string[]) {
}
