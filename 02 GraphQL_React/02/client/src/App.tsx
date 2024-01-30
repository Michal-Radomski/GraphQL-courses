import React from "react";

const App = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <React.Fragment>
      <div className="container">{children}</div>
    </React.Fragment>
  );
};

export default App;
