import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

class SongCreate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log("this.props:", this.props);
    this.props.mutate({
      variables: {
        title: this.state.title,
      },
    });
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

export default graphql(mutation)(SongCreate as React.ComponentClass<any, any>);
