import * as React from 'react';
import { buy } from '../../redux/transaction/actions';
import { connect } from 'react-redux';
import { remoteFetchCoins } from '../../redux/coin/actions';
import {Progress, Alert} from 'reactstrap';


class PureBuyCoin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            time: 0,
            transactionTimeOver: false,
            success: false
        }
    }
    timerID;

    componentWillMount() {
        this.props.loadCoins()

        if (!this.props.coin) {
            this.props.history.push('/coins');
        }
    }

    componentDidMount =() => {
        if (this.props.coin) {
            this.timerID =  setInterval(() => {
                this.tick()
            }, 1000) 
        }else{
            window.location.href = '/coins';
        }
    }

    
    componentWillUnmount() {
        clearInterval(this.timerID)
    }


    tick() {
        const newTime = this.state.time + 1;
        if (this.state.time < 5) {
            this.setState({
                time: newTime
            })
        } else {
            this.setState({
                transactionTimeOver: true
            })

            setTimeout(() => {
                this.cancel();   
            }, 1000)
        }

    }

    onDismiss() {
        this.setState({
            transactionTimeOver: false,
            success: false
        })
    }

    buy = () => {
        this.props.buy(this.props.coin.amount, this.props.coin.coin_id, this.props.coin.coinQuantity)
        this.setState({
            success: true
        })
        clearInterval(this.timerID);
        
        setTimeout(() => {
            this.props.history.push(`/profile`);        
        },3000)
    }

    cancel = () => {
        this.props.history.push(`/coins/${this.props.coin.coin_id}`);
    }

    render() {
        let coin = this.props.coin;
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 mx-auto text-center">
                        <Alert color="danger" isOpen={this.state.transactionTimeOver} fade="false" onClick={this.onDismiss}>
                            Transaction time over
                        </Alert>
                        <Alert color="success" isOpen={this.state.success} fade="false" onClick={this.onDismiss}>
                            Transaction Successful !!
                            <hr />
                            <p>you were credited by HKD {coin.amount}</p>
                        </Alert>
                        <Progress color="info" value={this.state.time * 20} />
                        <hr />
                           { coin ?
                            (
                                <div>
                                    <p>Total number of <strong>Coins</strong> you want to buy </p> 
                                    <br />
                                    <p>For <strong>{coin.amount}</strong></p>
                                    <br />
                                    <p>Total coins: <strong>{coin.coinQuantity}</strong></p>
                                </div>
                            ) : ''
                           }
                            <hr />
                            
                            <button className="btn btn-primary" onClick={this.buy} >Confirm Buy</button> 
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