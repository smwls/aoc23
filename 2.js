// just part 2 - overwrote part 1 and cbf reconstructing it (see readme)
const run = input => {
    const x = input
    .split('\n')
    .filter(x => x.length > 0)
    .map(game => 
        game.split(': ')[1].split("; ").map(x => x.split(", ").reduce((acc, val) => {
            const [num, string] = val.split(" ");
            acc[string] += Number(num);
            return acc;
        }, 
        {red: 0, green: 0, blue: 0}
        )
    )
    )
    .map(game => game.reduce((acc, val) => ({
            red: Math.max(val.red, acc.red), 
            green: Math.max(val.green, acc.green), 
            blue: Math.max(val.blue, acc.blue)
        }), {red: 0, green: 0, blue:0})
    );

    x.reduce((sum, game, i) => game.red <= 12 && game.green <= 13 && game.blue <= 14 ? sum + i + 1 : sum, 0)
    
    return x.map(game => game.red * game.green * game.blue)
    .reduce((sum, game) => game + sum, 0)
}
