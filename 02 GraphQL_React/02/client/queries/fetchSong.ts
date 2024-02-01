import gql from "graphql-tag";

const fetchSongs = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default fetchSongs;
