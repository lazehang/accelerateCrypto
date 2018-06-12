import React from 'react';
import AddCoinForm from './AddCoinForm';
import EditCoinForm from './EditCoinForm';

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.coins).map(key =>
          <EditCoinForm
            key={key}
            index={key}
            coin={this.props.coins[key]}
            updateCoin={this.props.updateCoin}
            deleteCoin={this.props.deleteCoin}
          />
        )}
        <AddCoinForm addCoin={this.props.addCoin} />
        <button onClick={this.props.loadSampleCoins}>Load sample coins</button>
      </div>
    )
  }
}

export default Inventory;