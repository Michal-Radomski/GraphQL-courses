import gql from "graphql-tag";

const currentUserQuery = gql`
  {
    user {
      id
      email
    }
  }
`;

export default currentUserQuery;
