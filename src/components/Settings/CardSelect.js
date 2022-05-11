import {
    InputLabel,
    FormControl,
    FormControlLabel,
    NativeSelect,
    Switch,
} from "@mui/material";
import { flipUpright } from "../../scripts/cardImages";

export default function CardSelect({
    number,
    pickedCards,
    setPickedCards,
    relevantCards,
    isCustom,
}) {
    function hasDuplicates(card) {
        if (!card) {
            return false;
        }
        const upright = flipUpright(card);
        let count = 0;
        pickedCards
            .map((cardName) => flipUpright(cardName))
            .forEach((cardName) => cardName === upright && count++);
        return count > 1;
    }

    const card = pickedCards[number - 1],
        isReversed = card?.includes(" reversed"),
        isError = hasDuplicates(card);

    function handlerHelper(cardName, rev) {
        setPickedCards((pickedCards) => {
            const result = [...pickedCards];
            result[number - 1] = !cardName
                ? ""
                : `${flipUpright(cardName)}${rev ? " reversed" : ""}`;
            return result;
        });
    }

    function cardSelectHandler(e) {
        handlerHelper(e.target.value, isReversed);
    }

    function reverseCardHandler(e) {
        handlerHelper(card, e.target.checked);
    }

    return (
        <FormControl
            fullWidth
            error={isError}
            style={{ display: "flex", flexDirection: "row" }}
        >
            <InputLabel variant="standard" htmlFor={`card-select-${number}`}>
                Card #{number}
                {isError && " (duplicate card!)"}
            </InputLabel>
            <NativeSelect
                fullWidth
                style={{ minWidth: 175 }}
                defaultValue={flipUpright(card) || ""}
                inputProps={{
                    name: `card-select-${number}`,
                    id: `card-select-${number}`,
                    onChange: cardSelectHandler,
                }}
                disabled={!isCustom}
            >
                {relevantCards.map((cardName) => (
                    <option
                        key={`select ${cardName} ${number}`}
                        value={cardName}
                    >
                        {cardName}
                    </option>
                ))}
            </NativeSelect>
            <FormControlLabel
                control={
                    <Switch
                        defaultChecked={isReversed}
                        onChange={reverseCardHandler}
                        disabled={!card || isError || !isCustom}
                    />
                }
                style={{ margin: 0 }}
                label="reversed"
            />
        </FormControl>
    );
}
