import { GraphQLObjectType, GraphQLString } from "graphql";
import { Request } from "express";

import UserType from "./user_type";
import { signup } from "../services/auth";

const mutations: GraphQLObjectType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_parentValue, { email, password }, req: Request) {
        return signup({ email, password, req });
      },
    },
  },
});

export default mutations;
