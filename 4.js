// this is just part 2 – i overwrote part 1 (see README), and cbf reconstructing it here
const run2 = (input) => {
  const data = input
    .split("\n")
    .map((x) => x.replace(/Card \d*: /, ""))
    .map((x) => {
      let s = x.split(" | ");
      return {
        win: s[0].trim().split(/\s+/).map(Number),
        have: s[1].trim().split(/\s+/).map(Number),
      };
    });
  
  data
    .map((card) =>
      card.have.reduce(
        (acc, val) => (card.win.includes(val) ? Math.max(acc * 2, 1) : acc),
        0
      )
    )
    .reduce((x, y) => x + y, 0);
  return data
    .reduce(
      (acc, val, i) => {
        const matchCount = val.have.filter((x) => val.win.includes(x)).length;
        for (let j = 1; j < matchCount + 1; j++) {
          acc[j + i] += acc[i];
        }
        return acc;
      },
      data.map((_) => 1)
    )
    .reduce((x, y) => x + y, 0)
};