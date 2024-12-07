enum Operation {
  Multiply = "*",
  Add = "+",
  Concat = "|",
}

const part1 = (lines: string[]) => {
  const results = lines.map((line) => {
    const [resultRaw, numbersRaw] = line.split(":");
    const result = Number.parseInt(resultRaw);
    const numbers = numbersRaw.trim().split(" ").map((x) => x.trim()).map(
      Number,
    );
    const operationCount = numbers.length - 1;

    const masks = [] as string[];

    for (let i = 0; true; i++) {
      const mask = i.toString(2).padStart(operationCount, "0");
      masks.push(mask);
      if (mask === "1".repeat(operationCount)) break;
    }

    const operations = masks.map((mask) =>
      mask.split("").map((x) => x === "1" ? Operation.Add : Operation.Multiply)
    );

    // console.log(result, numbers, masks, operations);
    const variants = operations.map((o) => {
      const result = numbers.reduce((a, c, i) => {
        if (i === 0) return c;
        if (o[i - 1] === Operation.Add) {
          return a + c;
        }
        return a * c;
      }, 0);

      return result;
    });
    const resultVariants = variants.filter((x) => x === result).length;

    // console.log(numbers, variants, resultVariants);

    if (resultVariants === 0) return 0;
    return result;
  });

  return results.reduce((a, c) => a + c, 0);
};

const part2 = (lines: string[]) => {
  const results = lines.map((line, i) => {
    console.log(`Strstring line ${i} of ${lines.length}`);

    const [resultRaw, numbersRaw] = line.split(":");
    const result = Number.parseInt(resultRaw);
    const numbers = numbersRaw.trim().split(" ").map((x) => x.trim()).map(
      Number,
    );
    const operationCount = numbers.length - 1;

    const masks = [] as string[];

    for (let i = 0; true; i++) {
      const mask = i.toString(3).padStart(operationCount, "0");
      masks.push(mask);
      if (mask === "2".repeat(operationCount)) break;
    }
    // console.log(masks);

    const operations = masks.map((mask) =>
      mask.split("").map((x) => {
        switch (x) {
          case "0":
            return Operation.Multiply;
          case "1":
            return Operation.Add;
          case "2":
            return Operation.Concat;
        }
      })
    );

    // console.log(result, numbers, masks, operations);
    const variants = operations.map((o) => {
      const result = numbers.reduce((a, c, i) => {
        if (i === 0) return c;
        if (o[i - 1] === Operation.Add) {
          return a + c;
        }
        if (o[i - 1] === Operation.Concat) {
          return Number.parseInt(a.toString() + c.toString());
        }

        return a * c;
      }, 0);

      return result;
    });
    const resultVariants = variants.filter((x) => x === result).length;

    // console.log(numbers, variants, resultVariants);

    if (resultVariants === 0) return 0;
    return result;
  });

  return results.reduce((a, c) => a + c, 0);
};

const real = true;
const file = await Deno.readTextFile(`7.${real ? "real." : ""}txt`);
const lines = file.trim().split("\n");

console.log(part1(lines));
console.log(part2(lines));
