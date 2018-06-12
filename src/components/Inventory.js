import React from 'react';
import PropTypes from 'prop-types';
import AddCoinForm from './AddCoinForm';
import EditCoinForm from './EditCoinForm';

class Inventory extends React.Component {
  static propTypes = {
    coins: PropTypes.object,
    addCoin: PropTypes.func,
    updateCoin: PropTypes.func,
    deleteCoin: PropTypes.func,
    loadSampleCoins: PropTypes.func
  }

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