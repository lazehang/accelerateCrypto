import React from 'react';
import { connect } from 'react-redux';
import { remoteFetchCoins } from '../redux/coin/actions';
import Header from './Header';
import { Link } from 'react-router-dom';

class PureCoinList extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            time: 0
        }
    }
    
    componentDidMount = () => {
        this.props.loadCoins();        
    }

    render() {
        let coins = this.props.coins;
        
        return (
            <div className="coin-of-the-day">
                <div className="menu">
                <Header tagline='Crypto Market' />
                
                <ul className="coins">
                
                    {
                        Object.keys(coins).map((k,v) => (
                           
                                <li key={coins[k].id} className="menu-coin">
                                <img src={`../images/${coins[k].symbol}.png`} />
                                <h3 className="coin-name">
                                {coins[k].name}
                                <span className="price">HKD {coins[k].quotes.HKD.price}</span>
                                </h3>
                                <p>{coins[k].symbol}</p>
                                {coins[k].soldOut && coins[k].soldOut === true  ? <button disabled={true}>
                                Sold Out! </button> : ''
                                }
                                <Link to={`/buy/`+k}>Buy</Link>   
                               
                            </li>
                           
                        ))
                    }
                </ul>
                </div>
            </div>
        )
    }
}

const CoinList = connect((rootState) => ({
  coins: rootState.coin.coins
}), (dispatch) => ({
    loadCoins: () => { dispatch(remoteFetchCoins())}
}))(PureCoinList);

export default CoinList;
