import { GraphQLObjectType, GraphQLString } from "graphql";

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    //* Password is not exposed1
    email: { type: GraphQLString },
  },
});

export default UserType;
