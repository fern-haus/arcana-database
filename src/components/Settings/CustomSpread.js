import { Box, FormControl, FormControlLabel, Switch } from "@mui/material";
import CardSelect from "./CardSelect";

export default function CustomSpread({
    spreadSize,
    pickedCards,
    setPickedCards,
    relevantCards,
    isCustom,
    setIsCustom,
}) {
    return (
        <Box
            id="custom-spread"
            flex={1}
            className={isCustom ? "active" : "inactive"}
        >
            <h2>Customize</h2>
            <FormControl>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isCustom}
                            onChange={(e) => setIsCustom(e.target.checked)}
                        />
                    }
                    style={{ display: "flex", justifyContent: "center" }}
                    label="Custom Spread"
                />
                {new Array(spreadSize).fill(0).map((_, i) => (
                    <CardSelect
                        {...{
                            key: `card select ${pickedCards[i]} ${i + 1}`,
                            number: i + 1,
                            pickedCards,
                            setPickedCards,
                            relevantCards,
                            isCustom,
                        }}
                    />
                ))}
            </FormControl>
        </Box>
    );
}
