import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleCoins from '../sample-coins';
import Coin from './Coin';

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

  loadSampleCoins = () => {
    this.setState({ coins: sampleCoins })
  }

  render() {
    return (
      <div className="coin-of-the-day">
        <div className="menu">
          <Header tagline='Crypto Market' />
          <ul className="coins">
            {Object.keys(this.state.coins).map(key => (
              <Coin key={key} details={this.state.coins[key]} />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory addCoin={this.addCoin} loadSampleCoins={this.loadSampleCoins} />
      </div>
    );
  }
}

export default App;