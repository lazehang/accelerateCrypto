import React from 'react';
import { Provider, connect } from 'react-redux';
import{
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import { store as store } from './redux/store';
import PropTypes from 'prop-types';
import CoinList from './components/CoinList';
import Home from './components/Home';
import Login from './components/Login';
import Coin from './components/Coin';
import { RouteProps } from "react-router";
import SignUp from './components/Signup';
import BuyCoin from './components/transactions/BuyCoin';
import SellCoin from './components/transactions/SellCoin';

import Footer from './components/Footer';
import Navigation from './components/Nav';
import Profile from './components/user/Profile';
import NotFound from './components/NotFound';
import Transaction from './components/user/Transaction'
import './css/custom.css';

const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const Component = component;
  if (Component != null) {
    return (
      
      <Route {...rest} render={(props) => (
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect to={ {
              pathname: '/login',
              state: { from: props.location }
            } } />
          )
      )} />
    )
  } else {
    return null;
  }
};

const PrivateRoute = connect((state) => ({
  isAuthenticated: state.auth.isAuthenticated
}))(PurePrivateRoute);

class App extends React.Component {
  constructor(props) {
    super(props)
  }
 
  isAuthenticated = () => {
    return localStorage.getItem('token');
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navigation />

            <Switch>
              <Route exact={true} path="/" component={Home} />
              <PrivateRoute exact={true} path="/coins" component={CoinList}/>
              <Route path="/login" component={Login} />
              <Route path="/register" component={SignUp} />
              <PrivateRoute path="/coins/:id" component={Coin} />
              <PrivateRoute exact={true} path="/profile" component={Profile} />
              
              <PrivateRoute path="/buy" component={BuyCoin} />
              <PrivateRoute path="/sell/:id" component={SellCoin} />
              <PrivateRoute path="/transaction" component={Transaction} />
              
              <Route component={NotFound} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>    
    );
  }
}

export default App;