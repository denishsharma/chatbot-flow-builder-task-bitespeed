import "virtual:uno.css";

import React from "react";
import ReactDOM from "react-dom/client";

import "~/assets/styles/global.scss";
import HomeView from "~/views/home.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HomeView />
    </React.StrictMode>,
);
