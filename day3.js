function isAdjacent(coord, coords) {
    for (let c of coords) {
        if (Math.abs(c[0] - coord[0]) <= 1 && Math.abs(c[1] - coord[1]) <= 1) {
            return true
        }
    }
    return false;
}
const getNumberCoordSets = data => data.map((line, i) => line.map((ch, j) => {
    if (!isNaN(Number(ch))) {
        return [i, j]
    }
    return null;
}))

const getSymbolPositions = data => data.map((line, i) => line.map((ch, j) => {
    if (isNaN(Number(ch)) && ch !== '.') {
        return {coords: [i, j], val: ch}
    }
    return null;
})).map(x => x.filter(y => y))

const parseInput = input => input.split('\n').map(x => x.split(''));

const getGrouped = (numberCoordSets, data) => numberCoordSets.map((line) => line.reduce((acc, val) => {
    if (val !== null) {
        const valNum = data[val[0]][val[1]]
        return {
            line: acc.line, 
            current: {
                group: [...acc.current.group, val], 
                val: Number(`${acc.current.val}${valNum}`)
            }
        }
    } else {
        return {line: [...acc.line, acc.current], current: {group:[], val:0}}
    }
}, {line: [], current: {group: [], val:0}})).map(x => {
    return {
        line: x.current.group.length > 0 ? [...x.line, x.current] : x.line,
        current: {group: [], val: 0}
    }
}).map(x => x.line);

const run = (input) => {
    const data = parseInput(input);
    const numberCoordSets = getNumberCoordSets(data);
    const symbolPositions = getSymbolPositions(data);
    const grouped = getGrouped(numberCoordSets, data);
    const allGroups = [];
    for (let x of grouped) {
        allGroups.push(...x)
    }
    const allSymbols = [];
    for (let x of symbolPositions) {
        allSymbols.push(...x)
    }
    let sum = 0;
    for (let x of allGroups.filter(x => x.group.length > 0)) {
        if (allSymbols.some(y => isAdjacent(y.coords, x.group))) {
            sum += x.val
        }
    }
    return sum
}

const run2 = (input) => {
    const data = input.split('\n').map(x => x.split(''));
    const numberCoordSets = getNumberCoordSets(data);
    const symbolPositions = getSymbolPositions(data);
    const grouped = getGrouped(numberCoordSets, data);
    let allGroups = [];
    for (let x of grouped) {
        allGroups.push(...x)
    }
    allGroups = allGroups.filter(x => x.group.length > 0);
    const allSymbols = [];
    for (let x of symbolPositions) {
        allSymbols.push(...x)
    }
    let sum = 0;
    for (let x of allSymbols.filter(x => x?.val === '*')) {
        let gears = allGroups.filter(y => isAdjacent(x.coords, y.group));
        if (gears.length === 2) {
            sum += gears[0].val * gears[1].val
        }
    }
    return sum
}