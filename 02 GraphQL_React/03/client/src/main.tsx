import React from "react";
import ReactDOM from "react-dom/client";

import "./App.scss";
import App from "./App";

if (module.hot) {
  module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  //* React.StrictMode blocks apolloClient! */}
  <React.Fragment>
    <App />
  </React.Fragment>
);
