import React from 'react';
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
        <Order coins={this.state.coins} order={this.state.order} />
        <Inventory addCoin={this.addCoin} loadSampleCoins={this.loadSampleCoins} addToOrder={this.addToOrder} />
      </div>
    );
  }
}

export default App;