import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import fetchSongs from "../../queries/fetchSong";

class SongList extends React.Component<Props, {}> {
  renderSongs() {
    return this?.props?.data?.songs?.map((song: Song, index: number) => {
      return (
        <li key={index + song.id} className="collection-item">
          {song.title}
        </li>
      );
    });
  }

  render() {
    // console.log("this.props?.data?.songs:", this.props?.data?.songs);
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/song/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(fetchSongs)(SongList as React.ComponentClass<any, any>);
