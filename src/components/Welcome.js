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
        setTimeout(() => {
            document.getElementById("welcome").className = "loaded";
            rotateCard();
        }, 1000);
    }

    return (
        <div id="welcome-container">
            <div id="welcome" className="loading">
                <div id="card-container" className={"card-face"}>
                    <div id="card-image">
                        <img
                            src={cardImages[randomCardName]}
                            alt={`${randomCardName} tarot card`}
                            onLoad={() => imageLoadHandler()}
                        />
                        <div id="overlay"></div>
                    </div>
                    <div id="backside">
                        <h1>
                            <span>ARCANA</span>
                            <span>DATABASE</span>
                        </h1>
                        <Link to="/arcana/settings">
                            <Button variant="contained" fullWidth>
                                Draw Cards
                            </Button>
                        </Link>
                        {/* ROUTE: */}
                        <Link to="/arcana/about">
                            <Button variant="contained" fullWidth>
                                About
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
