//* Files taken from author's repo

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Home";
import Book from "./Book";
import AddBook from "./AddBook";
import BookReview from "./BookReview";

const App = (props) => (
  <Router>
    <div className="mw8 center avenir">
      <Header {...props} />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/book/:id/review" component={BookReview} />
        <Route exact={true} path="/book/:id" component={Book} />
        <Route exact={true} path="/add" component={AddBook} />
      </Switch>
      <Footer {...props} />
    </div>
  </Router>
);

export default App;
