import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Welcome from "./components/Welcome";
import About from "./components/About";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // Strict Mode may cause double component render:
    // <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/arcana" element={<Welcome />} />
            <Route
                path="/arcana/settings"
                element={<App showSpread={false} />}
            />
            <Route path="/arcana/spread" element={<App showSpread={true} />} />
            <Route path="/arcana/about" element={<About />} />
        </Routes>
    </BrowserRouter>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
