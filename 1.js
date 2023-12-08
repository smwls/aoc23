// this is just part 2 - i overwrote part 1 (see README) and cbf reconstructing it here
const nums = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const run = input => input
  .split("\n")
  .filter((y) => y.length > 0)
  .map((x) =>
    x
      .split("")
      .reduce((acc, val, i) => {
        if (Object.keys(nums).includes(val)) {
          return [...acc, val];
        }
        const n = nums.find((num) => x.slice(i).startsWith(num));
        return n ? [...acc, `${nums.indexOf(n)}`] : acc;
      }, [])
      .join("")
  )
  .map((x) => x.replace(/[^1234567890]/g, ""))
  .map((y) => Number(y[0] + y[y.length - 1]))
  .reduce((x, y) => x + y, 0);