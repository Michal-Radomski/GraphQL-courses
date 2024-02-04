import React from "react";
import { graphql } from "react-apollo";

import AuthForm from "./AuthForm";
import signup from "../mutations/Signup";

class SignForm extends React.Component<Props, State> {
  onSubmit({ email, password }: { email: string; password: string }) {
    this.props.mutate!({
      variables: { email, password },
    });
  }

  render() {
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm errors={[] as string[]} onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(signup)(SignForm as React.ComponentClass<any, any>);
