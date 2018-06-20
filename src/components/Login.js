import React, { Component } from "react";
import { loginUser } from '../redux/auth/actions';
import { connect } from 'react-redux';


class PureLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

 onChangeField = (field, e) => {
    const state = {};
    state[field] = e.currentTarget.value;

    this.setState(state);
  };

  login = () => {
    this.props.login(this.state.username, this.state.password);
    this.props.history.push(this.props.history.location.state.from.pathname);
  };

  render() {
    return (
      <div className="Login">
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
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const Login = connect(null, (dispatch) => ({
  login: (username, password) => dispatch(loginUser(username, password))
}))(PureLogin)

export default Login;

