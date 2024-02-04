import gql from "graphql-tag";

const logout = gql`
  mutation {
    logout {
      id
      email
    }
  }
`;

export default logout;
