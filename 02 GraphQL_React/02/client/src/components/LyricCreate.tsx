import gql from "graphql-tag";
import React from "react";

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

    this.state = { content: "" };
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // console.log("this.state:", this.state);
    event.preventDefault();
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

export default LyricCreate;
