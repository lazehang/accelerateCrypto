import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setPrice } from '../../redux/account/actions'
import ChangeBadge from '../ChangeBadge';

class PureUserCoinList extends React.Component {
  constructor(props) {
    super(props)
  }

  setPrice(id) {
    this.props.setPrice(id);
  }

  render() {
    let coins = this.props.coins;

    return (
      <table className="table bg-light mt-3">
        <thead>
          <tr>
            <th>Coin ID</th>
            <th>Coin Name</th>
            <th>Logo</th>
            <th>Quantity</th>
            <th>Current Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {coins ?
            coins.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.id}</td>
                <td>{coin.name}</td>
                <td><img className="img card-img-over" src={`./images/${coin.symbol}.png`} /></td>
                <td>{coin.quantity}</td>
                <td>{'HKD ' + coin.quotes.HKD.price} <ChangeBadge change={coin.quotes.HKD.percent_change_24h} /></td>
                <td><Link to={`/sell/${coin.id}`}>Sell</Link></td>
              </tr>
            )) :
            (
              <tr>
                <td>You have no coins at the moment <Link to="/coins">Buy Coins</Link></td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
}

const UserCoinList = connect((state) => ({
  coins: state.account.coins
}), (dispatch) => ({
  setPrice: (id) => { dispatch(setPrice(id)) }
}))(PureUserCoinList)

export default UserCoinList;