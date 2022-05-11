import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Settings from "./components/Settings/Settings";
import ShowSpread from "./components/ShowSpread/ShowSpread";
import { allCardNames, flipUpright } from "./scripts/cardImages";

function App({ showSpread }) {
    const [spreadSize, setSpreadSize] = useState(3),
        [pickedCards, setPickedCards] = useState([]),
        [drawMajors, setDrawMajors] = useState(true),
        [drawMinors, setDrawMinors] = useState(true),
        [drawCourts, setDrawCourts] = useState(true),
        [relevantCards, setRelevantCards] = useState(["", ...allCardNames]);

    const filterer = useCallback(() => {
        const filterCourts = ({ includeCourts }) =>
                allCardNames.slice(22).filter((cardName) => {
                    const rank = cardName.split(" ")[0],
                        result = ["Page", "Knight", "Queen", "King"].includes(
                            rank
                        );
                    return includeCourts ? result : !result;
                }),
            filterOutMajors = drawMajors ? [] : allCardNames.slice(0, 22),
            filterOutMinors =
                drawMinors && drawCourts
                    ? []
                    : drawMinors // but not courts
                    ? filterCourts({ includeCourts: true })
                    : drawCourts // but not minors
                    ? filterCourts({ includeCourts: false })
                    : // draw neither
                      allCardNames.slice(22),
            filterOut = [...filterOutMajors, ...filterOutMinors];
        return allCardNames.filter((cardName) => !filterOut.includes(cardName));
    }, [drawCourts, drawMajors, drawMinors]);

    // filter the card dropdowns accordingly when toggling
    // minor arcana and court switches
    useEffect(() => {
        const filtered = filterer();
        setRelevantCards(["", ...filtered]);
        setPickedCards((pickedCards) =>
            pickedCards.map((cardName) =>
                filtered.includes(flipUpright(cardName)) ? cardName : ""
            )
        );
    }, [filterer]);

    console.log(pickedCards);

    return (
        <div className="App">
            {showSpread ? (
                <ShowSpread {...{ pickedCards }} />
            ) : (
                <Settings
                    {...{
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
                    }}
                />
            )}
        </div>
    );
}

export default App;
