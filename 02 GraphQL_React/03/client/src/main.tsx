import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { Router, Route, hashHistory } from "react-router";

import "./App.scss";
import App from "./App";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";

if (module.hot) {
  module.hot.accept();
}

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: "/graphql", credentials: "same-origin" }),
  cache: new InMemoryCache({
    dataIdFromObject: (o) => o.id,
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  //* React.StrictMode blocks apolloClient! */}
  <React.Fragment>
    <ApolloProvider client={apolloClient}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={Dashboard} />
        </Route>
      </Router>
    </ApolloProvider>
  </React.Fragment>
);
