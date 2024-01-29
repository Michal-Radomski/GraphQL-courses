import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import App from "./App";
// import gql from "graphql-tag";

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:5000/graphql" }),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
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
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
