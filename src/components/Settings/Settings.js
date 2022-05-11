import "../../css/settings.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { flipUpright } from "../../scripts/cardImages";
import SpreadType from "./SpreadType";
import CustomSpread from "./CustomSpread";

const getRandom = (maxNonInclusive) => ~~(Math.random() * maxNonInclusive);

export default function Settings({
    spreadSize,
    setSpreadSize,
    pickedCards,
    setPickedCards,
    drawMajors,
    setDrawMajors,
    drawMinors,
    setDrawMinors,
    drawCourts,
    setDrawCourts,
    relevantCards,
}) {
    const [isCustom, setIsCustom] = useState(true);

    function getRandomSpread() {
        const result = new Set();
        while (result.size < spreadSize) {
            result.add(getRandomCard());
        }
        return randomReverse([...result]);
    }

    function getRandomCard() {
        // remove top empty string in dropdowns
        return relevantCards.slice(1)[getRandom(relevantCards.length - 1)];
    }

    function randomReverse(spread) {
        return spread.map(
            (cardName) => cardName + (getRandom(2) ? " reversed" : "")
        );
    }

    function drawCardsHandler() {
        let result = [];
        if (isCustom) {
            result = [...new Set(pickedCards)]
                .slice(0, spreadSize)
                .filter((cardName) => cardName);
            result = [
                // set to prevent duplicates
                ...new Set(
                    result.map((cardName) => {
                        const upright = flipUpright(cardName);
                        // find first instance of card, whether upright or not
                        return result.filter((card) =>
                            card.includes(upright)
                        )[0];
                    })
                ),
            ];
        }
        result = isCustom && result.length ? result : getRandomSpread();
        setPickedCards(result);
        setSpreadSize(result.length < 3 ? 3 : result.length);
    }

    return (
        <>
            <Link to="/">
                <Button variant="contained">Home</Button>
            </Link>
            <h1 id="settings-heading">Spread Settings</h1>
            <Box id="settings" display={{ xs: "block", sm: "flex" }}>
                <SpreadType
                    {...{
                        spreadSize,
                        setSpreadSize,
                        drawMajors,
                        setDrawMajors,
                        drawMinors,
                        setDrawMinors,
                        drawCourts,
                        setDrawCourts,
                    }}
                />
                <CustomSpread
                    {...{
                        spreadSize,
                        pickedCards,
                        setPickedCards,
                        relevantCards,
                        isCustom,
                        setIsCustom,
                    }}
                />
            </Box>
            <Link to="/spread">
                <Button
                    variant="contained"
                    onClick={drawCardsHandler}
                    disabled={!relevantCards.filter((x) => x).length}
                >
                    Draw Cards
                </Button>
            </Link>
        </>
    );
}

export { getRandom };
