import React from "react";

import "./styles/App.scss";
import SongList from "./components/SongList";

if (module.hot) {
  module.hot.accept();
}
// console.log("module:", module);

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <SongList />
    </React.Fragment>
  );
};

export default App;
