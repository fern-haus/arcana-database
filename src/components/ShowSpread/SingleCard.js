import { Card, CardContent } from "@mui/material";
import cardImages, { flipUpright } from "../../scripts/cardImages";

export default function SingleCard({ cardName, isWelcome }) {
    return (
        <Card sx={{ width: "fit-content", display: "inline-block" }}>
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
