import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  state = {
    coins: {},
    order: {}
  };

  addCoin = (coin) => {
    // 1. Take a copy of existing state
    const coins = { ...this.state.coins };
    // 2. Add new coin to coins variable
    coins[`coin${Date.now()}`] = coin
    // 3. Set new coin object to state
    this.setState({ coins });
  };

  render() {
    return (
      <div className="coin-of-the-day">
        <div className="menu">
          <Header tagline='Crypto Market' />
        </div>
        <Order />
        <Inventory addCoin={this.addCoin} />
      </div>
    );
  }
}

export default App;