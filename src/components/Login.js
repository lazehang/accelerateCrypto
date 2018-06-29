import React, { Component } from "react";
import { loginUser } from '../redux/auth/actions';
import { connect } from 'react-redux';
import {Alert} from 'reactstrap';
import {Link} from 'react-router-dom';

class PureLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      visible: false,
      error: false
    };
  }

  onComponentDidMount = () => {
    
  }

 onChangeField = (field, e) => {
    const state = {};
    state[field] = e.currentTarget.value;

    this.setState(state);
  };

  onDismiss = () => {
    this.setState({
      error: false
    })
  }

  login = () => {
    this.props.login(this.state.username, this.state.password);
      
    if(!this.props.isAuthenticated) {
      this.setState({
        visible: true,
        error: true
      })
    }
  };

  componentDidUpdate = () => {
    if(this.props.isAuthenticated) {
      this.setState({
        error: false
      })
      this.props.history.push('/coins');
    } 
  }

  render() {
    return (
      <section id="login">  
        <div className="container">
          <div className="row">
            <div className="col-8 mx-auto">
              <h2 className="text-center">Accelerate Crypto</h2>
              <hr />
              <div>
                <Alert color="danger" isOpen={this.state.error} toggle={this.onDismiss} fade="false">
                  Sorry !! Wrong credentials for login
                </Alert>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" id="inputEmail" name="username" className="form-control" value={this.state.username} onChange={this.onChangeField.bind(this, 'username')} placeholder="username" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" id="inputPassword" className="form-control" value={this.state.password} onChange={this.onChangeField.bind(this, 'password')} placeholder="Password" required />          
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" >Check me out</label>
                </div>
                <br/>
                <button className="btn btn-primary" onClick={this.login} >Sign in</button><small id="emailHelp" className="form-text text-muted">or register <Link to="/register">here</Link></small>              
              </div>
              
            </div>
          </div>
        </div>
      </section>     
    );
  }
}

const Login = connect((state) => ({
  isAuthenticated: state.auth.isAuthenticated
}), (dispatch) => ({
  login: (username, password) => dispatch(loginUser(username, password))
}))(PureLogin)

export default Login;

