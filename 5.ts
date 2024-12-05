function part1(text: string) {
  const [ruleText, produce] = text.split("\n\n");

  const rules = ruleText.split("\n").map((rule) =>
    rule.split("|") as [string, string]
  );

  const foo = produce.split("\n")
    .map((update) => update.split(","))
    .filter((pages) => {
      const afters = pages.map((page) => {
        return [
          page,
          rules.filter((rule) => rule[0] === page).map((x) => x[1]),
        ] as [string, string[]];
      }).reduce((a, c) => {
        return a.set(c[0], c[1]);
      }, new Map<string, string[]>());

      const befores = pages.map((page) => {
        return [
          page,
          rules.filter((rule) => rule[1] === page).map((x) => x[0]),
        ] as [string, string[]];
      }).reduce((a, c) => {
        return a.set(c[0], c[1]);
      }, new Map<string, string[]>());

      const pagesAreValid = pages.every((page, i, a) => {
        if (i === a.length - 1) return true;

        const next = a[i + 1];
        return (
          (afters.get(page)?.includes(next) ?? false) &&
          (befores.get(next)?.includes(page) ?? false)
        );
      });

      return pagesAreValid;
    }).map((update) => update.at(Math.floor(update.length / 2))).map(Number);

  return foo.reduce((a, c) => a + c, 0);
}

const part2 = (text: string) => {
  const [ruleText, produce] = text.split("\n\n");

  const rules = ruleText.split("\n").map((rule) =>
    rule.split("|") as [string, string]
  );

  const foo = produce.split("\n")
    .map((update) => update.split(","))
    .map((pages, i, a) => {
      const afters = pages.map((page) => {
        return [
          page,
          rules.filter((rule) => rule[0] === page).map((x) => x[1]),
        ] as [string, string[]];
      }).reduce((a, c) => {
        return a.set(c[0], c[1].filter((x) => pages.includes(x)));
      }, new Map<string, string[]>());

      const befores = pages.map((page) => {
        return [
          page,
          rules.filter((rule) => rule[1] === page).map((x) => x[0]),
        ] as [string, string[]];
      }).reduce((a, c) => {
        return a.set(c[0], c[1].filter((x) => pages.includes(x)));
      }, new Map<string, string[]>());

      const pagesAreValid = pages.every((page, i, a) => {
        if (i === a.length - 1) return true;

        const next = a[i + 1];
        return (
          (afters.get(page)?.includes(next) ?? false) &&
          (befores.get(next)?.includes(page) ?? false)
        );
      });

      if (pagesAreValid) return undefined;

      const sortedAfters = [...afters].toSorted((a, b) =>
        b[1].length - a[1].length
      );

      const tree = sortedAfters.map(([page, afters], i, map) => {
        const node = new Node(page);

        function getChildren(afters: string[]) {
          return afters.map((after) => {
            const node = new Node(after);
            const children = getChildren(
              sortedAfters.find(([p]) => p === after)?.[1] ?? [],
            );
            children.forEach((c) => node.attachChild(c));
            return node;
          });
        }

        const children = getChildren(afters);

        children.forEach((c) => node.attachChild(c));

        return node;
      });

      const root = new Node("root");

      tree.forEach((t) => {
        root.attachChild(t);
      });

      const path = longestPath(root).split(" -> ").slice(1);

      console.log(`${i} out of ${a.length}`);
      return path;
    })
    .filter(Boolean)
    .map((x) => x.at(x.length / 2));

  return foo.map(Number).reduce((a, c) => a + c, 0);
};

function longestPath(node: Node): string {
  if (node.children.length === 0) {
    return node.value;
  }

  const childPaths = node.children.map((child) => longestPath(child));

  const longestChildPath = childPaths.reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, "");

  return node.value + " -> " + longestChildPath;
}

class Node {
  public children: Node[] = [];
  public value: string;

  constructor(
    value: string,
    children: Node[] = [],
  ) {
    this.value = value;
    this.children = children;
  }

  public toString(level = 0): string {
    const children = this.children.map((child) => child.toString(level + 1));
    return `${"\t".repeat(level * 2)}${this.value}\n${children.join("\n")}`;
  }

  toArray() {
    return [this.value, this.children.map((c) => c.toArray())];
  }

  public attachChild(node: Node) {
    this.children.push(node);
  }
}

const real = true;
const file = await Deno.readTextFile(`5.${real ? "real." : ""}txt`);
const lines = file.trim();
console.log(part1(lines));
console.log(part2(lines));
