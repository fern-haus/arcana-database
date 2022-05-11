import {
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    NativeSelect,
    Switch,
} from "@mui/material";

export default function SpreadType({
    spreadSize,
    setSpreadSize,
    drawMajors,
    setDrawMajors,
    drawMinors,
    setDrawMinors,
    drawCourts,
    setDrawCourts,
}) {
    return (
        <Box id="spread-type" flex={1}>
            <h2>Setup</h2>
            <FormControl>
                <InputLabel variant="standard" htmlFor="spread-size-select">
                    Spread Size
                </InputLabel>
                <NativeSelect
                    defaultValue={spreadSize}
                    inputProps={{
                        name: "spread-size",
                        id: "spread-size-select",
                        onChange: (e) => setSpreadSize(+e.target.value),
                    }}
                >
                    {new Array(9).fill(0).map((_, i) => {
                        const size = i + 2;
                        return (
                            <option key={`spread-size-${size}`} value={size}>
                                {size}
                            </option>
                        );
                    })}
                </NativeSelect>
                <FormControlLabel
                    control={
                        <Switch
                            checked={drawMajors}
                            onChange={(e) => setDrawMajors(e.target.checked)}
                        />
                    }
                    label="Major Arcana"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={drawMinors}
                            onChange={(e) => setDrawMinors(e.target.checked)}
                        />
                    }
                    label="Minor Arcana"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={drawCourts}
                            onChange={(e) => setDrawCourts(e.target.checked)}
                        />
                    }
                    label="Court Cards"
                />
            </FormControl>
        </Box>
    );
}
