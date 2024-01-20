import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = `
schema {
  query: Query
}
type Query {
  hello: String
  name: String
}
`;

const resolvers = {
  Query: {
    hello: () => "World!",
    name: () => "Michal",
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const query = process.argv[2];
// console.log("process:", process);
// console.log({ query });
// console.log("process.argv:", process.argv);
// console.log("process.argv[2]:", process.argv[2]);

graphql({ schema, source: query }).then((result) => {
  console.log(JSON.stringify(result, null, 2));
  // console.log(JSON.stringify(result));
});
