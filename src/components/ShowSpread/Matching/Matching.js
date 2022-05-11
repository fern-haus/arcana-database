import { getCardObjectsFromNames } from "../../../scripts/cards";
import getMatching from "../../../scripts/matching";
import SharedWord from "./SharedWord";

export default function Matching({ pickedCards }) {
    const cardObjects = getCardObjectsFromNames(pickedCards),
        matches = getMatching(cardObjects),
        words = Object.keys(matches);

    return (
        <div id="matching">
            <h2>Matching</h2>
            {words.length ? (
                words
                    .sort()
                    .map((word) => (
                        <SharedWord
                            {...{
                                key: `${pickedCards} ${word}`,
                                word,
                                cardNames: matches[word],
                            }}
                        />
                    ))
            ) : (
                <p>No matching cards.</p>
            )}
        </div>
    );
}
