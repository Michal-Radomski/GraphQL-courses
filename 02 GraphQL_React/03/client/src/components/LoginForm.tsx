import React from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

import AuthForm from "./AuthForm";
import currentUserQuery from "../queries/CurrentUser";
import login from "../mutations/Login";

class LoginForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { errors: [] as string[] };
  }

  //* V1 -> Deprecated!
  // componentWillUpdate(nextProps: Props) {
  //   if (!this.props.data?.user && nextProps.data?.user) {
  //     hashHistory.push("/dashboard");
  //   }
  // }

  //* V2
  componentDidUpdate() {
    const { user } = this.props.data!;
    if (user) {
      // console.log("user:", user);
      hashHistory.push("/dashboard");
    }
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
        <h3>Log In</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
      </div>
    );
  }
}

export default graphql(currentUserQuery)(graphql(login)(LoginForm as React.ComponentClass<any, any>));
