import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div id="about">
            <h1>About</h1>
            <Link to="/">
                <Button variant="contained">Home</Button>
            </Link>
        </div>
    );
}
