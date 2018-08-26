import * as React from 'react';
import { sell } from '../../redux/transaction/actions';
import { connect } from 'react-redux';
import { getUserCoins } from '../../redux/account/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import ReactLoading from 'react-loading';
import Img from 'react-image'


class PureSellCoin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            quantity: 0,
            isFetching: true,
            amount: 0,
            rate:0,
            modal: false,
           selling: 0,
           quantityExceeded: false,
           success: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        
        this.setState({
        modal: !this.state.modal
        });
    }

    componentWillMount = () => {
        if(this.props.isFetching || this.props.isFetching === null){
            this.props.loadCoins();
        }
    }

    componentDidMount = () => {
      if(this.props.isFetching || this.props.isFetching === null){
            setTimeout(() => {
                this.setState({
                    isFetching: this.props.isFetching
                })
            }, 2000);

            if (this.state.isFetching) {
                setTimeout(() => {
                    this.setState({
                        isFetching: this.props.isFetching
                    })
                }, 4000);
            }
        } else {
            this.setState({
                isFetching: this.props.isFetching
            })
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        
        this.setState(state);
    };

    handleRangeChange = (e) => {
        let price = 0;
        if (!this.state.isFetching) {
            const coin = this.props.coin;
            price = coin.quotes.HKD.price;
        }
        
        const amount = e.target.value*price;
        this.setState({
            selling: e.target.value,
            amount: amount,
            rate: price
        })
    }

    onChangeAmount = (e) => {
        let price = 0;
        if (!this.state.isFetching) {
            const coin = this.props.coin;
            price = coin.quotes.HKD.price;
        }
        
        const quantity = e.target.value/price;

        if (quantity < this.props.coin.quantity) {
            this.setState({
            amount: e.target.value,
            selling: quantity,
            rate: price,
            quantityExceeded: false
            });
        } else {
            this.setState({
                quantityExceeded: true
            })
        }
    }

    onDismiss() {
        this.setState({
            quantityExceeded: false
        })
    }

    confirmSell = () => {
        this.props.sell(this.state.amount, this.props.match.params.id, this.state.selling);
        this.setState({
            success: true
        })

        this.toggle();

        setTimeout(() => {
            this.props.history.push(`/profile`);           
        }, 3000)
        
    }

    render() {
        
        if (this.state.isFetching) {
            return (
                <section>
                    <div className="container">
                        <div className="row">
                            <div className='mx-auto'>
                                <ReactLoading type="bars" color="teal" />
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else {
        let coin = this.props.coin;
            
            return (
                <section>
                <Modal size="sm" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Transaction Details</ModalHeader>
                    <ModalBody>
                       Total: {this.state.amount}
                       <br />
                       Rate: {this.state.rate}
                       <br />
                       Selling Quantity: {this.state.selling}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.confirmSell}>Confirm Sell</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
        <div className="container">
            <div className="row">
            <div className="col-lg-12 mx-auto text-center">
                <Img className="img img-responsive" src={`../images/${coin.symbol}.png`} alt="logo"/>
                <hr />
                Total Coins: {coin.quantity}
                <form>
                    <Alert toggle={this.onDismiss} isOpen={this.state.success} fade="false" color="success">Transaction Successful</Alert>
                    
                    <div className="form-group">
                    <label>Coin Name</label>
                        <input className="form-control" type="text" value={coin.name} disabled />
                    </div>
                    <div className="form-group">
                        <label>Rate (HKD) </label>
                        <input className="form-control" type="text" value={coin.quotes.HKD.price} disabled/>
                        <small>Note: This may change if you take more time to get ready for the transaction.</small>
                    </div>
                    <div className="form-group">
                        <label>Amount (HKD) </label>
                        <input className="form-control" onChange={this.onChangeAmount} type="number" step="any" value={this.state.amount} />
                        <small>Note: This may change if you take more time to get ready for the transaction.</small>
                        <Alert toggle={this.onDismiss} isOpen={this.state.quantityExceeded} fade="false" color="danger">sorry amount exceeded</Alert>
                    </div>
        
                    <div className="form-group">
                        <label>Selling Quantity</label>
                        <br />
                        <label >{this.state.selling} </label>
                        <br />
                        <input type="range" onChange={this.handleRangeChange} id="cowbell" min="0" max={coin.quantity} value={this.state.selling} step="0.01" />
                        <br /><small>number of coins you want to sell</small>
                        </div>
                    <Button color="primary" onClick={this.toggle}>Sell</Button>
                </form>
            </div>
            </div>
        </div>
        </section> 
            )    
        }
        
    }
}

const SellCoin = connect((state, ownProps) => ({
    coin: state.account.coins.find(coin => coin.id === parseInt(ownProps.match.params.id, 10)),
    isFetching: state.account.isFetching
}), (dispatch) => ({
    loadCoins: () => { dispatch(getUserCoins()) },
    sell: (amount, id, rate) => { dispatch(sell(amount, id, rate)) }
}))(PureSellCoin);

export default SellCoin;