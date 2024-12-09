const part1 = async (text: string) => {
  const line = text.trim().split("\n").join("");

  let counter = 0;
  const data = line.split("").map((c, i) => {
    if (i % 2 !== 0) {
      return new Array(Number.parseInt(c)).fill(".").join("|");
    }
    return new Array(Number.parseInt(c)).fill(counter++).join("|");
  }).join(",").split(",").flatMap((x) => x.split("|")).filter(Boolean);

  let left = 0;
  let right = data.length - 1;

  console.log(data);
  // await Deno.writeTextFile("9.debug.before.txt", data.join(","));

  while (left < right) {
    // console.log(left, right);
    if (data[left] === "." && data[right] !== ".") {
      // console.log("Swap");
      data[left] = data[right];
      data[right] = ".";
    }
    if (data[left] !== ".") {
      // console.log("Left++");
      left++;
    }
    if (data[right] === ".") {
      // console.log("Right--");
      right--;
    }
  }

  // console.table(data.filter((c) => c !== "."));
  const numbers = data.filter((c) => c !== ".").map((c) => Number.parseInt(c))
    .reduce((acc, cur, i) => {
      return acc + cur * i;
    });

  console.log(data.join(""));
  return numbers;
};

const part2 = async (text: string) => {
  const line = text.trim().split("\n").join("");

  let counter = 0;
  const data = line.split("").map((c, i) => {
    if (i % 2 !== 0) {
      return new Array(Number.parseInt(c)).fill(".").join("|");
    }
    return new Array(Number.parseInt(c)).fill(counter++).join("|");
  }).join(",").split(",").flatMap((x) => x.split("|")).filter(Boolean);

  let right = data.length - 1;

  // console.log(data.join(""));
  // await Deno.writeTextFile("9.debug.before.txt", data.join(","));

  let i = data.length - 1;
  while (i >= 0) {
    if (data[i] === ".") {
      i--;
      continue;
    }

    const id = data[i];
    const block = [];

    for (let j = i; j >= 0; j--) {
      if (data[j] !== id) break;
      block.push(j);
    }

    for (let j = 0; j <= i; j++) {
      if (data[j] !== ".") continue;

      let emptySpaceSize = 0;
      for (let k = j; k < i; k++) {
        if (data[k] === ".") emptySpaceSize++;
        else break;
      }
      // console.log("J", j, "size", emptySpaceSize, "blocksize", block.length);

      if (emptySpaceSize >= block.length) {
        // console.log("Nice empty space");
        // console.dir({
        //   block,
        //   i,
        //   j,
        // });

        block.forEach((info, index) => {
          data[j + index] = data[info];
          data[info] = ".";
        });
        break;
      } else {
        j += emptySpaceSize;
      }
    }
    // console.log(data.join(""));
    i -= block.length;
  }

  // console.log(data.join(""));
  // console.table(data.filter((c) => c !== "."));
  const numbers = data.map((c) => c === "." ? 0 : Number.parseInt(c))
    .reduce((acc, cur, i) => {
      return acc + cur * i;
    });

  return numbers;
};

const main = async () => {
  const real = true;
  const day = 9;
  const filepath = `${day}.${real ? "real." : ""}txt`;
  const file = await Deno.readTextFile(filepath);

  // console.log(await part1(file));
  console.log(await part2(file));
};

main();
