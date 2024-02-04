import React from "react";
import { graphql } from "react-apollo";

import AuthForm from "./AuthForm";
import currentUserQuery from "../queries/CurrentUser";
import login from "../mutations/Login";

class LoginForm extends React.Component<Props, State> {
  onSubmit({ email, password }: { email: string; password: string }) {
    this.props.mutate!({
      variables: { email, password },
      refetchQueries: [{ query: currentUserQuery }],
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(login)(LoginForm as React.ComponentClass<any, any>);
