import { joiner, combineWords } from "./matching";

const allOpposites = () => ({
    yang: {
        cards: [],
        opposites: {
            yin: [],
            passivity: [],
        },
    },
    action: {
        cards: [],
        opposites: {
            passivity: [],
            yin: [],
            complacency: [],
        },
    },
    passivity: {
        cards: [],
        opposites: {},
    },
    chaos: {
        cards: [],
        opposites: {
            balance: [],
            serenity: [],
            peace: [],
        },
    },
    beginning: {
        cards: [],
        opposites: {
            ending: [],
        },
    },
    bravery: {
        cards: [],
        opposites: {
            fear: [],
        },
    },
    cold: {
        cards: [],
        opposites: {
            warmth: [],
        },
    },
    "conscious mind": {
        cards: [],
        opposites: {
            "unconscious mind": [],
        },
    },
    control: {
        cards: [],
        opposites: {
            "loss of control": [],
        },
    },
    decision: {
        cards: [],
        opposites: {
            indecision: [],
        },
    },
    peace: {
        cards: [],
        opposites: {
            drama: [],
            struggle: [],
        },
    },
    dream: {
        cards: [],
        opposites: {
            nightmare: [],
        },
    },
    enlightenment: {
        cards: [],
        opposites: {
            ignorance: [],
        },
    },
    expansion: {
        cards: [],
        opposites: {
            restriction: [],
        },
    },
    experience: {
        cards: [],
        opposites: {
            inexperience: [],
        },
    },
    failure: {
        cards: [],
        opposites: {
            success: [],
            accomplishment: [],
        },
    },
    "loss of faith": {
        cards: [],
        opposites: {
            faith: [],
            belief: [],
        },
    },
    gain: {
        cards: [],
        opposites: {
            loss: [],
        },
    },
    generosity: {
        cards: [],
        opposites: {
            selfishness: [],
        },
    },
    hope: {
        cards: [],
        opposites: {
            hopelessness: [],
        },
    },
    irrationality: {
        cards: [],
        opposites: {
            rationality: [],
        },
    },
    irresponsibility: {
        cards: [],
        opposites: {
            responsibility: [],
        },
    },
    dissatisfaction: {
        cards: [],
        opposites: {
            joy: [],
        },
    },
    unfairness: {
        cards: [],
        opposites: {
            justice: [],
            fairness: [],
        },
    },
    laziness: {
        cards: [],
        opposites: {
            work: [],
        },
    },
    femininity: {
        cards: [],
        opposites: {
            masculinity: [],
        },
    },
    maternity: {
        cards: [],
        opposites: {
            paternity: [],
        },
    },
    "nonphysical conquest": {
        cards: [],
        opposites: {
            "physical conquest": [],
        },
    },
    optimism: {
        cards: [],
        opposites: {
            pessimism: [],
        },
    },
    pain: {
        cards: [],
        opposites: {
            pleasure: [],
        },
    },
    sleep: {
        cards: [],
        opposites: {
            sleeplessness: [],
        },
    },
    relationship: {
        cards: [],
        opposites: {
            solitude: [],
        },
    },
    weakness: {
        cards: [],
        opposites: {
            strength: [],
            health: [],
        },
    },
    serenity: {
        cards: [],
        opposites: {
            struggle: [],
        },
    },
    thrift: {
        cards: [],
        opposites: {
            waste: [],
        },
    },
    defeat: {
        cards: [],
        opposites: {
            victory: [],
        },
    },
    happiness: {
        cards: [],
        opposites: {
            sadness: [],
        },
    },
});

function fillAllOpposites(spread) {
    // top-level opposites object
    const opposites = allOpposites();
    spread.forEach((card) =>
        // go through each card and inspect words
        card.words.forEach((word) => {
            if (opposites[word]) {
                // if word exists as a key in the top-level opposites object,
                // add card name to that word's cards array
                opposites[word].cards.push(card.name);
            } else {
                Object.values(opposites)
                    // if word exists as a key under a word's lower-level
                    // opposites object, add that card name to the array value
                    .filter((val) => Object.keys(val.opposites).includes(word))
                    .forEach((val) => val.opposites[word].push(card.name));
            }
        })
    );
    return opposites;
}

function purgeEmpty(opposites) {
    Object.entries(opposites).forEach(([k, v]) => {
        if (
            v.cards.length &&
            Object.values(v.opposites).reduce(
                (a, cardNames) => a + cardNames.length,
                0
            )
        ) {
            v.cards = joiner(v.cards);
            Object.entries(v.opposites).forEach(([word, cardNames]) =>
                cardNames.length
                    ? (v.opposites[word] = joiner(cardNames))
                    : delete v.opposites[word]
            );
        } else {
            delete opposites[k];
        }
    });
}

const stringifyVal = (obj) =>
    Object.entries(obj)
        .map((entry) => entry.join())
        .sort()
        .join();

function combineOpposites(opposites) {
    Object.entries(opposites).forEach(([key, value]) => {
        const val = stringifyVal(value.opposites),
            keys = Object.entries(opposites)
                .filter(([k, v]) => val === stringifyVal(v.opposites))
                .map(([k]) => k),
            joined = joiner(keys);
        opposites[joined] = value;
        keys.filter((k) => k !== joined).forEach((k) => delete opposites[k]);
    });
}

function getOpposites(spread) {
    const opposites = fillAllOpposites(spread);
    purgeEmpty(opposites);
    Object.values(opposites).forEach((info) => {
        const oppos = info.opposites;
        combineWords(oppos);
    });
    combineOpposites(opposites);
    return opposites;
}

export default getOpposites;
