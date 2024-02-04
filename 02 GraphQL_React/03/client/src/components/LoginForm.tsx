import React from "react";

import AuthForm from "./AuthForm";
import { graphql } from "react-apollo";
import login from "../mutations/Login";

class LoginForm extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm />
      </div>
    );
  }
}

export default graphql(login)(LoginForm);
