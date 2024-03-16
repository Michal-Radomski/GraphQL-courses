//* Code-First Approach
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeSchema, queryType } from "nexus";

const Query = queryType({
  definition: (type) => {
    type.string("greeting", {
      resolve: () => "Hello world!",
    });
  },
});

const schema = makeSchema({ types: [Query] });

const server = new ApolloServer({ schema });

(async function startApolloServer() {
  const serverInfo = await startStandaloneServer(server, { listen: { port: 4000 } });
  // console.log("serverInfo:", serverInfo);
  console.log(`Server running at ${serverInfo.url}`);
})();
