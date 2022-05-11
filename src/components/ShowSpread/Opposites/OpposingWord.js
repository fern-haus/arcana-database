export default function OpposingWord({ word, wordCardNames, oppositeWords }) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>{word}</th>
                    <td>{wordCardNames}</td>
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
                            <td>{oppositeWords[word]}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}
