import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { DocumentNode, Kind, OperationTypeNode } from "graphql";
import { createClient as createWsClient } from "graphql-ws";

import { getAccessToken } from "../auth";

const authLink: ApolloLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  // console.log("accessToken:", accessToken);
  if (accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

const httpLink: ApolloLink = concat(
  authLink,
  createHttpLink({
    uri: "http://localhost:4000/graphql",
  })
);

const wsLink: GraphQLWsLink = new GraphQLWsLink(
  createWsClient({
    url: "ws://localhost:4000/graphql",
    connectionParams: () => ({ accessToken: getAccessToken() }),
  })
);

export const apolloClient = new ApolloClient({
  link: split(isSubscription, wsLink, httpLink),
  cache: new InMemoryCache(),
});

function isSubscription(operation: { query: DocumentNode }): boolean {
  const definition = getMainDefinition(operation.query);
  // console.log("definition.kind:", definition.kind);
  return definition.kind === Kind.OPERATION_DEFINITION && definition.operation === OperationTypeNode.SUBSCRIPTION;
}
