import React from "react";
import { graphql } from "react-apollo";

import currentUserQuery from "../queries/CurrentUser";
import { Link } from "react-router";
import Logout from "../mutations/Logout";

class Header extends React.Component<Props, {}> {
  onLogoutClick() {
    this.props.mutate?.({
      refetchQueries: [{ query: currentUserQuery }],
    });
  }

  renderButtons() {
    const { loading, user } = this?.props?.data!;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    // console.log("this.props.data?.user:", this.props.data?.user);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(Logout)(graphql(currentUserQuery)(Header as React.ComponentClass<any, any>));
