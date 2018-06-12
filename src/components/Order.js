import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder = (key) => {
    const coin = this.props.coins[key];
    const count = this.props.order[key];
    const isAvailable = coin && coin.status === 'available';

    // Make sure the coins are loaded from Firebase before we continue
    if (!coin) return null;

    if (!isAvailable) {
      return <li key={key}>
        Sorry {coin ? coin.name : 'coin'} is no longer available
      </li>
    }
    return <li key={key}>
      {count} {coin.name}
      {formatPrice(count * coin.price)}
      <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
    </li>
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const coin = this.props.coins[key];
      const count = this.props.order[key];
      const isAvailable = coin && coin.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * coin.price);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className='order'>
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className="total">
          <strong>Total: {formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order;