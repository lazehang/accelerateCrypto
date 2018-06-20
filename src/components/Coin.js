import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { connect } from 'react-redux';
import { remoteFetchCoins } from '../redux/coin/actions';

class PureCoin extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
          coinid: this.props.coid.id,
          price: this.coin.quotes.HKD.price,
          amount: ""
      }
  }

    componentDidMount = () => {
        this.props.loadCoins();        
    }

  render() {
    const coin = this.props.coin;
    return (
      <div>
        {coin.id}
        <br />
        {coin.name}
        <br />
        {coin.quotes.HKD.price}
        <br />
        Amount :
        <input type="number" value={this.state.amount} onChange={this.onChangeField.bind(this, "amount")}/>
        
        <button onClick={this.getReady}> Get Ready </button>
      </div>
    )
  }
}

const Coin = connect((rootState, ownProps) => ({
    coin: rootState.coin.coins[parseInt(ownProps.match.params.id)]
  }), (dispatch) => ({
    loadCoins: () => { dispatch(remoteFetchCoins())}
}))(PureCoin);
  


export default Coin;