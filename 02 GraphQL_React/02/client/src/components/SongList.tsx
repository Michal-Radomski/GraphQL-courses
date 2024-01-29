import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class SongList extends React.Component<{}, {}> {
  render() {
    return <div>SongList</div>;
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
