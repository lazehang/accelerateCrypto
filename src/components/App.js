import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleCoins from '../sample-coins';
import Coin from './Coin';
import base from '../base';

class App extends React.Component {
  state = {
    coins: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;

    // First reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.storeId}/coins`, {
      context: this,
      state: 'coins'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addCoin = (coin) => {
    // 1. Take a copy of existing state
    const coins = { ...this.state.coins }
    // 2. Add new coin to coins variable
    coins[`coin${Date.now()}`] = coin
    // 3. Set new coin object to state
    this.setState({ coins });
  };

  updateCoin = (key, updatedCoin) => {
    // 1. Take copy of current state
    const coins = { ...this.state.coins }
    // 2. Update that state
    coins[key] = updatedCoin;
    // 3. Set that to state
    this.setState({ coins });
  }

  deleteCoin = (key) => {
    // 1. Take copy of current state
    const coins = { ...this.state.coins }
    // 2. Update that state
    coins[key] = null;
    // 3. Set that to state
    this.setState({ coins })
  }

  loadSampleCoins = () => {
    this.setState({ coins: sampleCoins })
  }

  addToOrder = (key) => {
    // 1. Take a copy of existing state
    const order = { ...this.state.order }
    // 2. Either add to the order or update the order
    order[key] = order[key] + 1 || 1;
    // 3. Set new order state
    this.setState({ order })
  }

  removeFromOrder = (key) => {
    // 1. Take a copy of existing state
    const order = { ...this.state.order }
    // 2. Remove coin from order
    delete order[key]
    // 3. Set new order state
    this.setState({ order })
  }

  render() {
    return (
      <div className="coin-of-the-day">
        <div className="menu">
          <Header tagline='Crypto Market' />
          <ul className="coins">
            {Object.keys(this.state.coins).map(key => (
              <Coin
                key={key}
                index={key}
                details={this.state.coins[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          coins={this.state.coins}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addCoin={this.addCoin}
          updateCoin={this.updateCoin}
          deleteCoin={this.deleteCoin}
          loadSampleCoins={this.loadSampleCoins}
          addToOrder={this.addToOrder}
          coins={this.state.coins}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;