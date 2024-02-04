import React from "react";

import Header from "./components/Header";

const App = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <Header />
        {children}
      </div>
    </React.Fragment>
  );
};

export default App;
