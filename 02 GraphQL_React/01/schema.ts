import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import _ from "lodash";

const users = [
  { id: "23", firstName: "Bill", age: 20 },
  { id: "47", firstName: "Samantha", age: 21 },
];

//* Example
// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "RootQueryType",
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return "world";
//         },
//       },
//     },
//   }),
// });

//* GraphQL schema
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue: string, args) {
        return _.find(users, { id: args.id });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
