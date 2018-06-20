import React, { Component } from "react";
import { register } from '../redux/auth/actions';
import { connect } from 'react-redux';


class PureSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "",
      username: "",
      password: ""
    };
  }

 onChangeField = (field, e) => {
    const state = {};
    state[field] = e.currentTarget.value;

    this.setState(state);
  };

  signup = () => {
    this.props.signUp(this.state.name, this.state.username, this.state.password);
    this.props.history.push('/') ;
  };

  render() {
    return (
      <div className="signup">
      Full Name:{" "}
        <input
          onChange={this.onChangeField.bind(this, "name")}
          type="text"
          value={this.state.name}
        />
        <br />
        Username:{" "}
        <input
          onChange={this.onChangeField.bind(this, "username")}
          type="text"
          value={this.state.username}
        />
        <br />
        Password:{" "}
        <input
          onChange={this.onChangeField.bind(this, "password")}
          type="password"
          value={this.state.password}
        />
        <br />
        <button onClick={this.signup}>Log in</button>
      </div>
    );
  }
}

const SignUp = connect(null, (dispatch) => ({
  signUp: (name, username, password) => dispatch(register(name, username, password))
}))(PureSignUp)

export default SignUp;

