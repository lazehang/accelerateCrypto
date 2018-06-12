import React from 'react';
import { formatPrice } from '../helpers';

class Coin extends React.Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  }

  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-coin">
        <img src={image} alt={name} />
        <h3 className="coin-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? 'Add to Cart' : 'Sold Out!'}
        </button>
      </li>
    )
  }
}

export default Coin;