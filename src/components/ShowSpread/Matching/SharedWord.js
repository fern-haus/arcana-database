export default function SharedWord({ word, cardNames }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>{word}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{cardNames}</td>
                </tr>
            </tbody>
        </table>
    );
}
