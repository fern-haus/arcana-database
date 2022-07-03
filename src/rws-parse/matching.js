const badKeys = [
    '"',
    "accounts vary",
    "alternately contemplating a globe",
    "analogues of these",
    "as",
    "being too simple",
    "beside a man",
    "by another account",
    "design gives one suggestion",
    "etc",
    "for",
    "his build shews",
    "however",
    "or otherwise",
    "so forth",
    "that is",
    "these are exceedingly contradictory",
    "ure",
    "who has",
    "with the variants",
];

/****************************/
// MATCHING
/****************************/

function getAllMatches(data) {
    // break down meanings
    const cards = data.cards.map((card) => convertCard(card)),
        result = {};
    cards.forEach((card) => {
        const { meaning_up, meaning_rev } = card;
        [meaning_up, meaning_rev].forEach((meaning, i) =>
            getAllMatchesHelper({ meaning, result, card, isReversed: i })
        );
    });
    // remove bad keys and redundant plurals
    Object.entries(result).forEach(([key, value]) => {
        if (!isValidKey(key)) {
            delete result[key];
        } else if (result[key + "s"]) {
            result[key + "s"].push(...value);
            delete result[key];
        } else if (result[key + "ness"]) {
            result[key].push(...result[key + "ness"]);
            delete result[key + "ness"];
        }
    });
    // transfer values
    result["man of divinity"] = [...result["or divinity"]];
    delete result["or divinity"];
    // add old words
    dataOld.forEach((card) =>
        getAllMatchesHelper({
            meaning: card.words,
            result,
            card,
            isReversed: false, // don't append an extra "reversed"
        })
    );
    // make unique by spreading Set
    Object.entries(result).forEach(([k, v]) => (result[k] = [...new Set(v)]));
    return result;
}

function convertCard(card) {
    return {
        ...card,
        meaning_up: parseMeaning(card.meaning_up),
        meaning_rev: parseMeaning(card.meaning_rev),
    };
}

function parseMeaning(meaning) {
    return meaning
        .toLowerCase()
        .replaceAll("good,", "")
        .replaceAll("especially", "")
        .replaceAll(" thereof", "")
        .replaceAll(" hereof", "")
        .replaceAll("arrows of ", "")
        .replaceAll("of this kind", "")
        .replaceAll("any kind of", "")
        .replaceAll("or a certain", "")
        .replaceAll("suggestion of", "")
        .replaceAll("images of", "")
        .replaceAll("in these paths", "")
        .replaceAll("card always signifies", "")
        .replaceAll("he symbolizes", "")
        .replaceAll("those are his", "")
        .replaceAll("is intimated", "")
        .replaceAll("is also intimated", "")
        .replaceAll("which accompanies it", "")
        .replaceAll("it signifies", "")
        .replaceAll("it is ", "")
        .replaceAll("card of", "")
        .replaceAll(", if", "* if")
        .replaceAll(", but", "* but")
        .replaceAll(" yet ", " ")
        .replaceAll("another reading says", ",")
        .replaceAll("--", ", ")
        .replaceAll(" and", ",")
        .replaceAll("sometimes", "")
        .replaceAll(" even", ",")
        .replaceAll("also", "")
        .replaceAll(".", ";")
        .split(";")
        .map((group) =>
            group
                .split(",")
                .map((item) => {
                    const trimmed = item.trim(),
                        starts = [
                            "a ",
                            "an ",
                            "as ",
                            "bearing his ",
                            "its ",
                            "of ",
                            "the ",
                            "usually ",
                            "-",
                        ].find((s) => startsWith(trimmed, s)),
                        result = starts ? trimmed.replace(starts, "") : trimmed;
                    return result
                        .replaceAll("* if", ", if")
                        .replaceAll("* but", ", but")
                        .trim();
                })
                .filter((item) => item && item.split(" ").length < 5)
        )
        .filter((group) => group.length);
}

function getAllMatchesHelper({ meaning, result, card, isReversed }) {
    meaning
        .flat()
        .forEach(
            (item) =>
                (result[item] = [
                    ...(result[item] || []),
                    getImageName(card.name) + (isReversed ? " reversed" : ""),
                ])
        );
}

const nums = [
    "",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
];

function getImageName(cardName) {
    const rank = cardName.split(" ")[0],
        index = nums.indexOf(rank) + 1;
    if (index) {
        return index + cardName.slice(cardName.indexOf(" "));
    } else if (cardName === "Fortitude") {
        return "Strength";
    } else if (cardName === "The Last Judgment") {
        return "Judgement";
    } else {
        return cardName.replace("The ", "");
    }
}

function startsWith(str, start) {
    return !str.indexOf(start);
}

function isValidKey(key) {
    const badKey =
        [
            "according to ",
            "all ",
            "another ",
            "but ",
            "for ",
            "if ",
            "in ",
            "on ",
        ].find((starts) => startsWith(key, starts)) || badKeys.includes(key);
    return !!!badKey;
}

/****************************/
// NEW DATA
/****************************/

const allMatch = getAllMatches(data);

function getKeywords(allMatches, cardName) {
    return Object.entries(allMatches)
        .filter(([item, cards]) => cards.includes(cardName))
        .map(([key]) => key)
        .sort();
}

function changeData(data) {
    // is this a deep copy? I don't think so.
    const copy = { ...data },
        { cards } = copy;
    cards.forEach((card) => {
        card.name = getImageName(card.name);
        card.keywords_up = getKeywords(allMatch, card.name);
        card.keywords_rev = getKeywords(allMatch, card.name + " reversed");
        delete card.value;
        delete card.name_short;
    });
    // sort modified array:
    return cards.sort(cardsSorter);
}

function cardsSorter(a, b) {
    const types = ["major", "minor"],
        suits = ["Wands", "Cups", "Swords", "Pentacles"],
        typeA = a.type,
        typeB = b.type,
        suitA = a.name.split(" ").pop(),
        suitB = b.name.split(" ").pop(),
        valueA = a.value_int,
        valueB = b.value_int;
    if (typeA === typeB) {
        return typeA === "major" || suitA === suitB
            ? valueA - valueB
            : suits.indexOf(suitA) - suits.indexOf(suitB);
    } else {
        return types.indexOf(typeA) - types.indexOf(typeB);
    }
}

console.log(changeData(data));
