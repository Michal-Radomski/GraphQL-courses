import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
// import gql from "graphql-tag";

import "./styles/App.scss";
import App from "./App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";

if (module.hot) {
  module.hot.accept();
}
// console.log("module:", module);

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  //* React.StrictMode blocks apolloClient! */}
  <React.Fragment>
    <ApolloProvider client={apolloClient}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="song/new" component={SongCreate} />
        </Route>
      </Router>
    </ApolloProvider>
  </React.Fragment>
);

// apolloClient
//   .query({
//     query: gql`
//       {
//         songs {
//           id
//           title
//         }
//       }
//     `,
//   })
//   .then((data) => console.log("data:", data))
//   .catch((error) => console.error({ error }));
