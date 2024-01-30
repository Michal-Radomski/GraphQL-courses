import React from "react";
import gql from "graphql-tag";

const mutation = gql`
  mutation {
    addSong(title: "Hot Summer Night")
  }
`;

class SongCreate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  render() {
    // console.log("this.state:", this.state);
    return (
      <div>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input onChange={(event) => this.setState({ title: event.target.value })} value={this.state.title} />
        </form>
      </div>
    );
  }
}

export default SongCreate;
