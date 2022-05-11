import "../css/welcome.css";
import cardImages, { allCardNames } from "../scripts/cardImages";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { getRandom } from "./Settings/Settings";

export default function Welcome({ setIsWelcome }) {
    const randomCardName = allCardNames[getRandom(allCardNames.length)];

    function rotateCard() {
        setTimeout(
            () =>
                (document.getElementById("card-container").className =
                    "flipped"),
            1500
        );
    }

    function imageLoadHandler() {
        document.getElementById("welcome").className = "loaded";
        rotateCard();
    }

    return (
        <div id="welcome" className="loading">
            <div id="card-container" className={"card-face"}>
                <img
                    src={cardImages[randomCardName]}
                    id="card-image"
                    alt={`${randomCardName} tarot card`}
                    onLoad={() => imageLoadHandler()}
                />
                <div id="backside">
                    <h1>Kard Kompare</h1>
                    <Link to="/settings">
                        <Button variant="contained" fullWidth>
                            Draw Cards
                        </Button>
                    </Link>
                    {/* ROUTE: */}
                    <Link to="/about">
                        <Button variant="contained" fullWidth>
                            About
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
