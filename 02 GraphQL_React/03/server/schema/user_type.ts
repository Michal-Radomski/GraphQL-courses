import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    //* Password is not exposed!
    id: { type: GraphQLID },
    email: { type: GraphQLString },
  },
});

export default UserType;
