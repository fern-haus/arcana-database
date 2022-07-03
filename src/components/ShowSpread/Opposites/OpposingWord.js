import { convertCardNames } from "../Matching/SharedWord";

export default function OpposingWord({
    word,
    wordCardNames,
    oppositeWords,
    setSingle,
}) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>{word}</th>
                    <td>
                        {convertCardNames({
                            word,
                            cardNames: wordCardNames,
                            setSingle,
                        })}
                    </td>
                </tr>
                <tr>
                    <th className="unlike" colSpan={2}>
                        unlike
                    </th>
                </tr>
                {Object.keys(oppositeWords)
                    .sort()
                    .map((word) => (
                        <tr key={`${oppositeWords} ${word}`}>
                            <th>{word}</th>
                            <td>
                                {convertCardNames({
                                    word,
                                    cardNames: oppositeWords[word],
                                    setSingle,
                                })}
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}
