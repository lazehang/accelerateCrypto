import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { connect } from 'react-redux';
import { remoteFetchCoins } from '../redux/coin/actions';
import {getReady} from '../redux/transaction/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

class PureCoin extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
          amount: "",
          modal: false,
          time: 0
      }

    this.toggle = this.toggle.bind(this);
  }
  timerID;

  componentDidMount(){
          
  }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;

        this.setState(state);
    };
    
    redirectToBuy = () => {
    this.props.history.push('/buy')
    }

    ImageExist = (url) => {
        var img = new Image();
        img.src = url;
        return img.height != 0;
    }

    getReady = () => {
            if (this.state.amount < this.props.amount) {
                this.props.getReady(this.state.amount, this.props.coin.id);
                setTimeout(() => {
                    if (this.props.doneUpdating) {
                    this.redirectToBuy();
                    }
                }, 1000)
            } else {
                alert("Insufficient Funds")
            }
        
    }

    
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const coin = this.props.coin;
    return (
        <section id="coin">
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Chart</ModalHeader>
          <ModalBody>
          <TradingViewWidget
                symbol={`${coin.symbol}USD`}
                theme={Themes.LIGHT}
                locale="en"
                autosize
            />
          </ModalBody>
          
        </Modal>
        <div className="container">
            <div className="row">
            <div className="col-lg-12 mx-auto text-center">
                <img className="img img-responsive" src={`../images/${coin.symbol}.png`} />
                <hr />
                <Button color="primary" onClick={this.toggle}><i className="fas fa-chart-line"></i> Chart</Button>
                <form>
                    <div className="form-group">
                    <label>Coin Name</label>
                        <input className="form-control" type="text" defaultValue={coin.name} disabled />
                    </div>
                    <div className="form-group">
                        <label>Rate (HKD) </label>
                        <input className="form-control" type="text" defaultValue={coin.quotes.HKD.price} />
                        <small>Note: This may change if you take more time to get ready for the transaction.</small>
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="number" className="form-control" value={this.state.amount} onChange={this.onChangeField.bind(this, "amount")}/>
                    </div>
                    
                    <input className="btn btn-primary" onClick={this.getReady} value="Confirm Buy" />
                </form>
            </div>
            </div>
        </div>
        </section>
        )
   
    
  }
}

const Coin = connect((rootState, ownProps) => ({
    coin: rootState.coin.coins[parseInt(ownProps.match.params.id)],
    doneUpdating: rootState.transact.doneUpdating,
    coins: rootState.coin.coins,
    amount: rootState.account.account
  }), (dispatch) => ({
    loadCoins: () => { dispatch(remoteFetchCoins()) },
    getReady: (amount, coin_id) => { dispatch(getReady(amount, coin_id))}
}))(PureCoin);

export default Coin;