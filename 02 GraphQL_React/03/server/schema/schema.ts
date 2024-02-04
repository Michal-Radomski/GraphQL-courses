import { GraphQLObjectType, GraphQLSchema, GraphQLID } from "graphql";

import mutations from "./mutations";

const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    dummyField: { type: GraphQLID },
  }),
});

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations,
});

export default schema;
