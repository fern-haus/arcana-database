import { getCardObjectsFromNames } from "../../../scripts/cards";
import getOpposites from "../../../scripts/opposites";
import OpposingWord from "./OpposingWord";

export default function Opposites({ pickedCards }) {
    const cardObjects = getCardObjectsFromNames(pickedCards),
        sorter = (a, b) => {
            const [aKey] = a,
                [bKey] = b;
            return aKey.localeCompare(bKey);
        },
        oppositesEntries = Object.entries(getOpposites(cardObjects)).sort(
            sorter
        );

    return (
        <div id="opposites">
            <h2>Opposites</h2>
            {oppositesEntries.length ? (
                oppositesEntries.map(([word, info]) => {
                    const wordCardNames = info.cards,
                        oppositeWords = info.opposites;
                    return (
                        <OpposingWord
                            {...{
                                key: `${pickedCards} ${word}`,
                                word,
                                wordCardNames,
                                oppositeWords,
                            }}
                        />
                    );
                })
            ) : (
                <p>No opposing cards.</p>
            )}
        </div>
    );
}
