import { flipUpright } from "../../scripts/cardImages";

export default function Histogram({ pickedCards }) {
    const helper = (index) =>
            pickedCards.map(
                (cardName) =>
                    cardName === "Wheel of Fortune"
                        ? undefined
                        : flipUpright(cardName).split(" of ")[index] // ?.replace(" reversed")
            ),
        counter = (needle, haystack) =>
            haystack.reduce((a, v) => a + (v === needle ? 1 : 0), 0);

    function tallyHelper(index) {
        const haystack = helper(index),
            result = {};
        [...new Set(haystack)].forEach(
            (needle) => (result[needle] = counter(needle, haystack))
        );
        return result;
    }

    const talliedRanks = tallyHelper(0),
        talliedSuits = tallyHelper(1),
        majors = talliedSuits["undefined"] || 0,
        minors = pickedCards.length - majors,
        reversed = pickedCards.filter((cardName) =>
            cardName.includes(" reversed")
        ).length,
        upright = pickedCards.length - reversed,
        ranks = [
            "Ace",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Page",
            "Knight",
            "Queen",
            "King",
        ],
        suits = ["Cups", "Pentacles", "Swords", "Wands"];

    function HistoTable({ names, tallied }) {
        return (
            <table>
                <tr>
                    {names.map((name) => (
                        <th>{name}</th>
                    ))}
                </tr>
                <tr>
                    {names.map((name) => (
                        <td>{tallied[name] || 0}</td>
                    ))}
                </tr>
            </table>
        );
    }

    return (
        <div id="histogram">
            <table>
                <tr>
                    <th>Upright</th>
                    <th>Reversed</th>
                    <th>Majors</th>
                    <th>Minors</th>
                </tr>
                <tr>
                    <td>{upright}</td>
                    <td>{reversed}</td>
                    <td>{majors}</td>
                    <td>{minors}</td>
                </tr>
            </table>
            <HistoTable names={ranks} tallied={talliedRanks} />
            <HistoTable names={suits} tallied={talliedSuits} />
        </div>
    );
}
