import { GraphQLObjectType, GraphQLSchema } from "graphql";

const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({}),
});

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQueryType,
});

export default schema;
