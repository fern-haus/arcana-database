import { allCardNames } from "../scripts/cardImages";

function joiner(arr) {
    arr.sort((a, b) => {
        const getIndex = (x) =>
                allCardNames.indexOf(x.replace(" reversed", "")),
            indexA = getIndex(a),
            indexB = getIndex(b);
        return indexA === -1 ? a.localeCompare(b) : indexA - indexB;
    });
    const noOxford = () => {
        const copy = [...arr],
            last = copy.pop();
        return copy.join(", ") + " and " + last;
    };
    const result = {
        0: "",
        1: arr[0],
        2: arr.join(" and "),
        3: noOxford(),
    };
    return arr.length < 3 ? result[arr.length] : result[3];
}

function combineWords(obj) {
    Object.entries(obj).forEach(([word, cards]) => {
        const shared = Object.entries(obj)
            .filter(([k, v]) => v === cards)
            .map(([k, v]) => k);
        if (shared.length > 1) {
            obj[joiner(shared)] = cards;
            shared.forEach((sh) => delete obj[sh]);
        }
    });
}

const getKeywords = (card) =>
    card[`keywords_${card.is_reversed ? "rev" : "up"}`];

console.log("small change");

function getMatching(spread) {
    const allWordsInSpread = [
        ...new Set(spread.map((card) => getKeywords(card)).flat()),
    ].sort();
    const result = {};
    allWordsInSpread.forEach((word) => {
        const shared = spread
            .filter((card) => getKeywords(card).includes(word))
            .map((card) => card.name + (card.is_reversed ? " reversed" : ""));
        if (shared.length > 1) {
            result[word] = joiner(shared);
        }
    });
    combineWords(result);
    return result;
}

export default getMatching;
export { joiner, combineWords, getKeywords };
