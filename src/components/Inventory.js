import React from 'react';
import AddCoinForm from './AddCoinForm';

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddCoinForm addCoin={this.props.addCoin} />
      </div>
    )
  }
}

export default Inventory;