import { Request } from "express";
import { GraphQLObjectType, GraphQLSchema } from "graphql";

import mutations from "./mutations";
import UserType from "./user_type";

const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQueryType",
  // fields: () => ({
  //   user: {
  //     type: UserType,
  //     resolve(_parentValue, _args, req: Request) {
  //       return req.user;
  //     },
  //   },
  // }),
  fields: {
    user: {
      type: UserType,
      resolve(_parentValue, _args, req: Request) {
        return req.user;
      },
    },
  },
});

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations,
});

export default schema;
