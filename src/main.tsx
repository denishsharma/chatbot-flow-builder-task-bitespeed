import "virtual:uno.css";

import { Analytics } from "@vercel/analytics/react";
import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
import React from "react";
import ReactDOM from "react-dom/client";

import "~/assets/styles/global.scss";

import HomeView from "~/views/home.tsx";

OverlayScrollbars.plugin(ClickScrollPlugin);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HomeView />
        <Analytics />
    </React.StrictMode>,
);
