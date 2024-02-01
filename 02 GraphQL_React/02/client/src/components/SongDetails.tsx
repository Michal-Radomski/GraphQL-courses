import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import fetchOneSong from "../../queries/fetchOneSong";

// console.log("fetchOneSong:", fetchOneSong, typeof fetchOneSong);

class SongDetails extends React.Component<Props, {}> {
  render() {
    // console.log("this.props:", this.props);
    const { song } = this?.props?.data;

    if (!song) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
      </div>
    );
  }
}

export default graphql(fetchOneSong, {
  options: (props: Props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetails as React.ComponentClass<any, any>);
