import { Card, CardContent } from "@mui/material";
import cardImages, { flipUpright } from "../../scripts/cardImages";

export default function SingleCard({ cardName, onClick }) {
    return (
        <Card
            className={`single-card ${onClick ? "clickable" : ""}`}
            sx={{ width: "fit-content", display: "inline-block" }}
            onClick={onClick}
        >
            {/* <CardHeader title={cardName} /> */}
            <CardContent>
                <img
                    src={cardImages[flipUpright(cardName)]}
                    alt={cardName}
                    className={
                        "card-image " +
                        (cardName.includes(" reversed")
                            ? "reversed"
                            : "upright")
                    }
                />
            </CardContent>
        </Card>
    );
}
