import React from "react";
import { graphql } from "react-apollo";

import AuthForm from "./AuthForm";
import currentUserQuery from "../queries/CurrentUser";
import login from "../mutations/Login";

class LoginForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { errors: [] as string[] };
  }

  onSubmit({ email, password }: { email: string; password: string }) {
    this.props.mutate!({
      variables: { email, password },
      refetchQueries: [{ query: currentUserQuery }],
    }).catch((res) => {
      // console.log("res:", res);
      const errors = res.graphQLErrors.map((error: CustomError) => error.message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
      </div>
    );
  }
}

export default graphql(login)(LoginForm as React.ComponentClass<any, any>);
