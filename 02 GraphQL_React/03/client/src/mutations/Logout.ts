import gql from "graphql-tag";

const Logout = gql`
  mutation {
    logout {
      id
      email
    }
  }
`;

export default Logout;
