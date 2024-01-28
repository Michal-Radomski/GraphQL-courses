import _ from "lodash";
import { GraphQLSchema } from "graphql";

import mutations from "./mutations";
import RootQuery from "./root_query_type";

const schema = new GraphQLSchema({
  mutation: mutations,
  query: RootQuery,
});

export default schema;
