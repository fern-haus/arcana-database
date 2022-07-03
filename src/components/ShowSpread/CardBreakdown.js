import { getCardObjectFromName } from "../../scripts/cards";
import SingleCard from "./SingleCard";

export default function CardBreakdown({ cardName }) {
    const cardObject = { ...getCardObjectFromName(cardName) },
        { is_reversed, type, value_int } = cardObject,
        suffix = is_reversed ? "rev" : "up",
        meaning = cardObject[`meaning_${suffix}`],
        keywords = cardObject[`keywords_${suffix}`];

    return (
        <>
            <h1>
                {type === "major" && <>{value_int}. </>}
                {cardName}
            </h1>
            <p>
                <em>{type.charAt(0).toUpperCase() + type.slice(1)} Arcana</em>
            </p>
            <SingleCard {...{ cardName }} />
            <div className="card-meaning">{meaning}</div>
            <ul className="card-keywords">
                {keywords.map((keyword) => (
                    <li key={`${cardName}: ${keyword}`}>{keyword}</li>
                ))}
            </ul>
            {/* <pre>{JSON.stringify(cardObject, null, 4)}</pre> */}
        </>
    );
}
