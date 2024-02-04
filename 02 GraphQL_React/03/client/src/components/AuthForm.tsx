import React from "react";

class AuthForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { email: "", password: "" };
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // this.props.onSubmit(this.state);
    const { email, password } = this.state as { email: string; password: string };
    this.props.onSubmit({ email, password });
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              type="text"
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="errors">
            {this.props.errors?.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
