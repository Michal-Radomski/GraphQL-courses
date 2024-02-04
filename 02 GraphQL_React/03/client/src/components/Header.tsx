import React from "react";
import { graphql } from "react-apollo";

import currentUserQuery from "../queries/CurrentUser";

class Header extends React.Component<Props, {}> {
  render() {
    console.log(this.props.data);
    return <div>Header</div>;
  }
}

export default graphql(currentUserQuery)(Header as React.ComponentClass<any, any>);
