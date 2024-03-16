import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
schema {
  query:Query
}
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
// console.log("server:", server);

(async function startApolloServer() {
  const serverInfo = await startStandaloneServer(server, { listen: { port: 4000 } });
  // console.log("serverInfo:", serverInfo);
  console.log(`Server running at ${serverInfo.url}`);
})();
