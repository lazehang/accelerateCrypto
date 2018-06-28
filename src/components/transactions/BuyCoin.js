import * as React from 'react';
import { buy } from '../../redux/transaction/actions';
import { connect } from 'react-redux';
import { remoteFetchCoins } from '../../redux/coin/actions';


class PureBuyCoin extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.loadCoins()
    }

    buy = () => {
        this.props.buy(this.props.coin.amount, this.props.coin.coin_id, this.props.coin.coinQuantity)
        this.props.history.push(`/coins`);        
    }

    cancel = () => {
        this.props.history.push(`/coins/${this.props.coin.coin_id}`);
    }

    render() {
        let coin = this.props.coin;
        console.log(coin.amount);
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 mx-auto text-center">
                            <p>Total number of <strong>BTC</strong> you want to buy </p> 
                            <br />
                            <p>For <strong>{coin.amount}</strong></p>
                            <br />
                            <p>Total coins: <strong>{coin.coinQuantity}</strong></p>
                            <hr />
                            
                            <button className="btn btn-success" onClick={this.buy} >Confirm Buy</button> |
                            <button className="btn btn-danger" onClick={this.cancel} >Cancel</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const BuyCoin = connect((state) => ({
    coin: state.transact.coin,
    coins: state.coin.coins
}), (dispatch) => ({
    loadCoins: () => { dispatch(remoteFetchCoins())},
    buy: (amount, coinId, coinQuantity) => {dispatch(buy(amount, coinId, coinQuantity))}
}))(PureBuyCoin);

export default BuyCoin;