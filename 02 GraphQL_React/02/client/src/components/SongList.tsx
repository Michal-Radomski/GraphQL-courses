import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const query = gql`
  {
    songs {
      title
    }
  }
`;

class SongList extends React.Component<{}, {}> {
  render() {
    console.log("this.props:", this.props);
    return <div>SongList</div>;
  }
}

export default graphql(query)(SongList);
