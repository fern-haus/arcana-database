import "../../css/show-spread.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import SingleCard from "./SingleCard";
import Histogram from "./Histogram";
import Matching from "./Matching/Matching";
import Opposites from "./Opposites/Opposites";

export default function ShowSpread({ pickedCards }) {
    return (
        <>
            <Link to="/settings">
                <Button variant="contained">New Spread</Button>
            </Link>
            <Link to="/">
                <Button variant="contained">Home</Button>
            </Link>
            <div id="show-spread">
                <h1>Spread</h1>
                {pickedCards.map((cardName) => (
                    <SingleCard
                        {...{ key: `card image for ${cardName}`, cardName }}
                    />
                ))}
                <Histogram {...{ pickedCards }} />
                <div id="matching-and-opposites">
                    <Matching {...{ pickedCards }} />
                    <Opposites {...{ pickedCards }} />
                </div>
            </div>
        </>
    );
}
