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
import StorePicker from './components/StorePicker';
import Login from './components/Login';
import Coin from './components/Coin';
import { RouteProps } from "react-router";
import SignUp from './components/Signup';
// import base from './base';

const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const Component = component;
  if (Component != null) {
    return (
      <Route render={(props) => (
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
 
  // componentDidMount() {
  //   const { params } = this.props.match;

  //   // First reinstate localStorage
  //   // const localStorageRef = localStorage.getItem(params.storeId);
  //   // if (localStorageRef) {
  //   //   this.setState({ order: JSON.parse(localStorageRef) })
  //   // }

  //   // this.ref = base.syncState(`${params.storeId}/coins`, {
  //   //   context: this,
  //   //   state: 'coins'
  //   // });
  // }

  // componentDidUpdate() {
  //   localStorage.setItem(
  //     this.props.match.params.storeId,
  //     JSON.stringify(this.state.order)
  //   );
  // }

  // componentWillUnmount() {
  //   base.removeBinding(this.ref);
  // }

  // addCoin = (coin) => {
  //   // 1. Take a copy of existing state
  //   const coins = { ...this.state.coins }
  //   // 2. Add new coin to coins variable
  //   coins[`coin${Date.now()}`] = coin
  //   // 3. Set new coin object to state
  //   this.setState({ coins });
  // };

  // updateCoin = (key, updatedCoin) => {
  //   // 1. Take copy of current state
  //   const coins = { ...this.state.coins }
  //   // 2. Update that state
  //   coins[key] = updatedCoin;
  //   // 3. Set that to state
  //   this.setState({ coins });
  // }

  // deleteCoin = (key) => {
  //   // 1. Take copy of current state
  //   const coins = { ...this.state.coins }
  //   // 2. Update that state
  //   coins[key] = null;
  //   // 3. Set that to state
  //   this.setState({ coins })
  // }

  // loadSampleCoins = () => {
  //   this.setState({ coins: sampleCoins })
  // }

  // addToOrder = (key) => {
  //   // 1. Take a copy of existing state
  //   const order = { ...this.state.order }
  //   // 2. Either add to the order or update the order
  //   order[key] = order[key] + 1 || 1;
  //   // 3. Set new order state
  //   this.setState({ order })
  // }

  // removeFromOrder = (key) => {
  //   // 1. Take a copy of existing state
  //   const order = { ...this.state.order }
  //   // 2. Remove coin from order
  //   delete order[key]
  //   // 3. Set new order state
  //   this.setState({ order })
  // }

  render() {
    return (
      <Provider store={store}>
      <Router>
        <div>
            <Switch>
              <Route exact={true} path="/" component={StorePicker} />
              <PrivateRoute  path="/store" component={CoinList} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={SignUp} />
              <Route path="/buy/:id" component={Coin} />
            </Switch>
        </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;