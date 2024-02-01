import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import gql from "graphql-tag";
import { flowRight as compose } from "lodash";

import fetchSongs from "../../queries/fetchSong";

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

class SongList extends React.Component<Props, {}> {
  onSongDelete(id: string) {
    this.props.mutate({ variables: { id } });
  }

  renderSongs() {
    return this?.props?.data?.songs?.map(({ id, title }: Song, index: number) => {
      return (
        <li key={index + id} className="collection-item">
          {title} ({id}){" "}
          <i className="material-icons" onClick={() => this.onSongDelete(id)} style={{ cursor: "pointer" }}>
            delete
          </i>
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

// export default graphql(mutation)(graphql(fetchSongs)(SongList as React.ComponentClass<any, any>));
//* It's possible to use compose
export default compose(graphql(mutation), graphql(fetchSongs))(SongList as React.ComponentClass<any, any>);
