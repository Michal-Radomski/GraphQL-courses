import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
// import _ from "lodash";
import axios from "axios";

// const users = [
//   { id: "23", firstName: "Bill", age: 20 },
//   { id: "47", firstName: "Samantha", age: 21 },
// ];

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
const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, _args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then((res) => res.data);
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      // resolve(_parentValue: string, args) {
      //   return _.find(users, { id: args.id });
      // },
      resolve(_parentValue: string, args) {
        // console.log("args:", args);
        return axios.get(`http://localhost:3000/users/${args.id}`).then((response) => {
          // console.log("response?.data:", response?.data);
          return response?.data;
        });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
