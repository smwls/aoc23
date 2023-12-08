const run = (input) => {
    const handOrder = ['5k', '4k', 'fh', '3k', '2p', '1p', 'hc'];
    const cardOrder = ['J', '2','3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
    const handHasDistinct = (hand, n) => (new Set(hand.split(""))).size === n;
    const handHasSomeCardWith = (hand, n) => hand.split("").some(x => hand.split("").filter(y => y === x).length === n);
    const handTypes = {
        '5k': (hand) => handHasSomeCardWith(hand, 5),
        '4k': (hand) => handHasSomeCardWith(hand, 4),
        'fh': (hand) => handHasSomeCardWith(hand, 3) && handHasSomeCardWith(hand, 2),
        '3k': (hand) => handHasDistinct(hand, 3) && handHasSomeCardWith(hand, 3),
        '2p': (hand) => handHasDistinct(hand, 3) && !handTypes['3k'](hand),
        '1p': (hand) => handHasDistinct(hand, 4),
        'hc': (hand) => handHasDistinct(hand, 5)
    }
    const getHandType = (hand) => {
        if (hand.split("").some(x => x === "J")) {
            let handTypes = [];
            for (let card of (new Set(hand.split("").filter(x => x !== "J")))) {
                const replaced = hand.replace(/J/g, card);
                handTypes.push(getHandType(replaced));
            }
            if (handTypes.length === 0) {
                return '5k'
            }
            handTypes.sort((x, y) => handOrder.indexOf(x) - handOrder.indexOf(y));
            return handTypes[0];
        }
        for (let handType of handOrder) {
            if (handTypes[handType](hand)) {
                return handType;
            }
        }
        throw new Error(hand);
    }

    const isLessThan = (hand1, hand2) => {
        const handRank =
          handOrder.indexOf(getHandType(hand2)) -
            handOrder.indexOf(getHandType(hand1));
        if (handRank !== 0) {
            return handRank
        }
        for (let i = 0; i < 5; i++) {
            let cardRank = cardOrder.indexOf(hand1[i]) - cardOrder.indexOf(hand2[i]);
            if (cardRank !== 0) {
                return cardRank;
            }
        }
    }
    const data = input.split('\n').map(line => {
        let [cards, bid] = line.split(/\s+/);
        return [cards, Number(bid)]
    })
    data.sort((x, y) => isLessThan(x[0], y[0]))
    return data.map(([_, r], i) => r * (i + 1)).reduce((x, y) => {
        return x + y
    }, 0);
}