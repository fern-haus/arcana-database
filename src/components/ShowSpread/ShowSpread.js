import "../../css/show-spread.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import SingleCard from "./SingleCard";
import Histogram from "./Histogram";
import Matching from "./Matching/Matching";
import Opposites from "./Opposites/Opposites";
import CardBreakdown from "./CardBreakdown";

export default function ShowSpread({ pickedCards, single, setSingle }) {
    window.scrollTo(0, 0);

    return (
        <>
            <Link to="/arcana/settings">
                <Button variant="contained">New Spread</Button>
            </Link>
            <Link to="/arcana">
                <Button variant="contained">Home</Button>
            </Link>
            <div id="show-spread">
                {single || pickedCards.length === 1 ? (
                    <CardBreakdown cardName={single || pickedCards[0]} />
                ) : (
                    <>
                        <h1>Spread</h1>
                        {pickedCards.map((cardName) => (
                            <SingleCard
                                {...{
                                    key: `card image for ${cardName}`,
                                    cardName,
                                    onClick:
                                        pickedCards.length > 1
                                            ? () => setSingle(cardName)
                                            : null,
                                }}
                            />
                        ))}
                        <p>Click on a card for more information.</p>
                        <Histogram {...{ pickedCards }} />
                        <div id="matching-and-opposites">
                            <Matching {...{ pickedCards }} />
                            <Opposites {...{ pickedCards }} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
