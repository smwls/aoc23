const run = (data) => {
  const ls = data.split("\n").map((x) => x.split(/:\s*/)[1].split(/\s+/).map(Number));
  const timeInt = (t, r) => {
    const d = Math.sqrt(t ** 2 - 4 * (r + 1));
    return Math.floor((t + d) / 2) - Math.ceil((t - d) / 2) + 1;
  };
  return ls[0].reduce((x, y, i) => x * timeInt(y, ls[1][i]), 1);
};