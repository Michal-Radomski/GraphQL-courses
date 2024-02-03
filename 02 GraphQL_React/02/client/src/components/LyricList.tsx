import gql from "graphql-tag";
import React from "react";
import { graphql } from "react-apollo";

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

class LyricList extends React.Component<Props, {}> {
  onLike(id: string) {
    // console.log({ id });
    this.props.mutate!({ variables: { id } });
  }

  renderLyrics() {
    return this.props.lyrics?.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content} ({id})
          <i className="material-icons" onClick={() => this.onLike(id)}>
            thumb_up
          </i>
          {likes}
        </li>
      );
    });
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

export default graphql(mutation)(LyricList as React.ComponentClass<any, any>);
