import { getCardObjectFromName } from "../../scripts/cards";
import SingleCard from "./SingleCard";

export default function CardBreakdown({ cardName }) {
    const cardObject = { ...getCardObjectFromName(cardName) },
        { is_reversed, type, value_int, simple_meaning } = cardObject,
        suffix = is_reversed ? "rev" : "up",
        waite_meaning = cardObject[`meaning_${suffix}`],
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
            <div className="card-meanings">
                <p>
                    <em>Waite's Pictorial Key to the Tarot (1910):</em>
                    <br />
                    {waite_meaning}
                </p>
                <p>
                    <em>Simple Definition:</em>
                    <br />
                    {is_reversed && <>opposite of: </>}
                    {simple_meaning}
                </p>
            </div>
            <ul className="card-keywords">
                {keywords.map((keyword) => (
                    <li key={`${cardName}: ${keyword}`}>{keyword}</li>
                ))}
            </ul>
            {/* <pre>{JSON.stringify(cardObject, null, 4)}</pre> */}
        </>
    );
}
