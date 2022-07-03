import React from "react";

export default function SharedWord({ word, cardNames, setSingle }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>{word}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{convertCardNames({ word, cardNames, setSingle })}</td>
                </tr>
            </tbody>
        </table>
    );
}

function makeButton({ word, cardNames, cardName, setSingle }) {
    return (
        <button
            key={`${word} ${cardNames} ${cardName}`}
            onClick={() => setSingle(cardName)}
        >
            {cardName}
        </button>
    );
}

function convertCardNames({ word, cardNames, setSingle }) {
    const [beforeAnd, afterAnd] = cardNames.split(" and "),
        beforeCards = beforeAnd.split(", "),
        afterCard = afterAnd,
        onlyOne = beforeCards.length === 1 && !afterCard;

    return onlyOne ? (
        makeButton({ word, cardNames, cardName: cardNames, setSingle })
    ) : (
        <>
            {beforeCards.length > 1
                ? beforeCards.map((cardName) => (
                      <React.Fragment key={`${word} ${cardName}`}>
                          {makeButton({ word, cardNames, cardName, setSingle })}
                          ,{" "}
                      </React.Fragment>
                  ))
                : makeButton({
                      word,
                      cardNames,
                      cardName: beforeCards[0],
                      setSingle,
                  })}{" "}
            and{" "}
            {makeButton({ word, cardNames, cardName: afterCard, setSingle })}
        </>
    );
}

export { convertCardNames };
