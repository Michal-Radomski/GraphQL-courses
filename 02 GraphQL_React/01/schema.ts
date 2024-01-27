import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
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
const CompanyType: GraphQLObjectType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, _args) {
        // console.log("parentValue:", parentValue);
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then((res) => res.data)
          .catch((err) => console.log({ err }));
      },
    },
  }),
});

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, _args) {
        // console.log("parentValue:", parentValue);
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((res) => res.data)
          .catch((err) => console.log({ err }));
      },
    },
  }),
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
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((response) => {
            // console.log("response?.data:", response?.data);
            return response?.data;
          })
          .catch((err) => console.log({ err }));
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue: string, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((response) => response?.data)
          .catch((err) => console.log({ err }));
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(_parentValue, { firstName, age, companyId }) {
        return axios.post("http://localhost:3000/users", { firstName, age, companyId }).then((res) => res.data);
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_parentValue, { id }) {
        return axios.delete(`http://localhost:3000/users/${id}`).then((res) => res.data);
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve(_parentValue, args) {
        return axios.patch(`http://localhost:3000/users/${args.id}`, args).then((res) => res.data);
      },
    },
  },
});

const schema = new GraphQLSchema({
  mutation: mutation,
  query: RootQuery,
});

export default schema;
