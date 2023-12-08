const dataParser = (raw) =>
  raw
    .split(":\n")[1]
    .split("\n")
    .map((x) => {
      let y = x.split(/\s+/).map(Number);
      return { dest: y[0], source: y[1], range: y[2] };
    });
const run = (input) => {
  const maps = input.split("\n\n");
  const seeds = maps[0].split(": ")[1].split(/\s+/).map(Number);
  const initialSeedDict = {};
  seeds.forEach((s) => (initialSeedDict[s] = s));
  const locations = maps
    .slice(1)
    .map(dataParser)
    .reduce((seedDict, data) => {
      const dests = Object.values(seedDict).map(Number);
      const newSeedDict = { ...seedDict };
      const reverse = {};
      Object.keys(seedDict).forEach((k) => (reverse[seedDict[k]] = k));
      for (let { dest, source, range } of data) {
        for (let d of dests) {
          if (d >= source && d < source + range) {
            newSeedDict[reverse[d]] = dest + (d - source);
          }
        }
      }
      return newSeedDict;
    }, initialSeedDict);
  return Math.min(...Object.values(locations));
};

/*
This is WRONG and BAD
but it still gives the right answer for part 2, for me at least!
it will probably give the wrong answer for other input data, though
*/
const run2 = (input) => {
  const maps = input.split("\n\n");
  const seedRangeData = maps[0].split(": ")[1].split(/\s+/).map(Number);
  const initialSeeds = [];
  for (let i = 0; i < seedRangeData.length - 1; i += 2) {
    initialSeeds.push({
      start: seedRangeData[i],
      end: seedRangeData[i] + seedRangeData[i + 1] - 1,
    });
  }
  const intersection = ([a, b], [c, d]) => {
    if (a > c) {
      return intersection([c, d], [a, b]);
    }
    if (b < c) {
      return null;
    }
    return [c, Math.min(b, d)];
  };
  const overlaps = (layer, reachable) => {
    let { source: ls, dest: ld, range: lr } = layer;
    let { start: rs, end: re } = reachable;
    let isn = intersection([rs, re], [ls, ls + lr - 1]);
    return isn
      ? {
          int: { start: isn[0], end: isn[1] },
          mapped: { start: isn[0] + ld - ls, end: isn[1] + ld - ls - 1 },
        }
      : { int: reachable, mapped: null };
  };
  const allLayers = maps.slice(1).map(dataParser);
  const reachability = allLayers.reduce((reachable, layer) => {
    const newlyReachable = [];
    const isns = [];
    for (let r of reachable) {
      for (let l of layer) {
        let ov = overlaps(l, r);
        if (ov.mapped) {
          newlyReachable.push(ov.mapped);
        }
        isns.push(ov.int);
      }
    }
    return newlyReachable;
  }, initialSeeds);
  return Math.min(...Object.values(reachability.map((r) => r.start)));
};
