import React from "react";
import { createRoot } from "react-dom/client";
import "bulma/css/bulma.css";

import "./style.scss";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
