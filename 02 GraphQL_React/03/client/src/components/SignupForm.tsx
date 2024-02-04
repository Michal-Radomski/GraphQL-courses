import React from "react";
import { graphql } from "react-apollo";

import AuthForm from "./AuthForm";
import signup from "../mutations/Signup";
import currentUserQuery from "../queries/CurrentUser";

class SignForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { errors: [] as string[] };
  }

  onSubmit({ email, password }: { email: string; password: string }) {
    this.props.mutate!({
      variables: { email, password },
      refetchQueries: [{ query: currentUserQuery }],
    }).catch((res) => {
      const errors = res.graphQLErrors.map((error: CustomError) => error.message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(signup)(SignForm as React.ComponentClass<any, any>);
