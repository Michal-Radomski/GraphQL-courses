import gql from "graphql-tag";

const fetchOneSong = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
    }
  }
`;

export default fetchOneSong;
