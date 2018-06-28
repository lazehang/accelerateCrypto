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
        <section id="signup">  
        <div className="container">
          <div className="row">
            <div className="col-8 mx-auto">
              <h2 className="text-center">Accelerate Crypto</h2>
              <hr />
              <form>
                <div className="form-group">
                  <label name="exampleInputEmail1">Full Name</label>
                  <input className="form-control" onChange={this.onChangeField.bind(this, "name")} type="text" value={this.state.name} placeholder="Full Name"/>
                </div>
                <div className="form-group">
                  <label name="exampleInputEmail1">Username</label>
                  <input className="form-control" onChange={this.onChangeField.bind(this, "username")} type="text" value={this.state.username} placeholder="Username"/>
                </div>
                <div className="form-group">
                  <label name="exampleInputPassword1">Password</label>
                  <input type="password" id="inputPassword" className="form-control" value={this.state.password} onChange={this.onChangeField.bind(this, 'password')} placeholder="Password" required />          
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" name="exampleCheck1">Check me out</label>
                </div>
                <br/>
                <button className="btn btn-primary" onClick={this.signup} >Register</button>              
              </form>
              
            </div>
          </div>
        </div>
      </section> 
    );
  }
}

const SignUp = connect(null, (dispatch) => ({
  signUp: (name, username, password) => dispatch(register(name, username, password))
}))(PureSignUp)

export default SignUp;

