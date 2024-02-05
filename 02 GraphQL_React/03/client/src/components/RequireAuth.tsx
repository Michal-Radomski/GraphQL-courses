import React from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

import currentUserQuery from "../queries/CurrentUser";

const RequireAuth = (WrappedComponent: React.FC<Props>) => {
  class RequireAuth extends React.Component<Props, State> {
    //* V1 -> Deprecated!
    // componentWillUpdate(nextProps: Props) {
    //   if (!nextProps.data?.loading && !nextProps.data?.user) {
    //     hashHistory.push("/login");
    //   }
    // }

    //* V2
    componentDidUpdate() {
      const { user } = this.props.data!;
      if (!user) {
        // console.log("user:", user);
        hashHistory.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth as React.ComponentClass<any, any>);
};

export default RequireAuth;
