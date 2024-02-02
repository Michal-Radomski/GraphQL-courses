import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

class LyricCreate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // console.log("this.props:", this.props);
    this.state = { content: "" };
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // console.log("this.state:", this.state);
    event.preventDefault();

    this.props.mutate!({
      variables: {
        content: this.state.content,
        songId: this.props.songId as string,
      },
    })
      // .then((data) => console.log(data))
      .then(() => this.setState({ content: "" }))
      .catch((err) => console.log({ err }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
      </form>
    );
  }
}

export default graphql(mutation)(LyricCreate as React.ComponentClass<any, any>);
