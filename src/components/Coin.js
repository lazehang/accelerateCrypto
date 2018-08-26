import React from 'react';
import { connect } from 'react-redux';
import { remoteFetchCoins } from '../redux/coin/actions';
import {getReady} from '../redux/transaction/actions';
import { Button, Modal, ModalBody } from 'reactstrap';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import ReactLoading from 'react-loading';
import Img from 'react-image';


class PureCoin extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
          amount: "",
          modal: false,
          time: 0,
          isFetching: true,
          lessThenLimit: false

      }

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount = () => {
    if(this.props.coins.length === 0 || this.props.coins === null){
        this.props.loadCoins();
    }
  }

  componentDidMount = () => {
    if(this.props.coins.length === 0 || this.props.coins === null){
    
        setTimeout(() => {
            this.setState({
                isFetching: false
            })
        }, 2000);
    } else {
        this.setState({
            isFetching: this.props.coins.isFetching
        })
    }
          
  }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;

        this.setState(state);
    };
    
    redirectToBuy = () => {
    this.props.history.push('/buy')
    }

    getReady = () => {
        if (this.state.amount >= 100) {
            if (this.state.amount < this.props.amount) {
                this.props.getReady(this.state.amount, this.props.coin.id, this.props.userid ? this.props.userid : '' );
                setTimeout(() => {
                    if (this.props.doneUpdating) {
                    this.redirectToBuy();
                    }
                }, 1000)
            } else {
                alert("Insufficient Funds")
            }
        }else {
            this.setState({
                lessThenLimit: true
            });
        }
           
        
    }

    
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

    ImageExist = (url) => {
        var img = new Image();
        img.src = url;
        return img.height !== 0;
    }

  render() {
    const coin = this.props.coin || [];

  
    return (
        <section id="coin">
        
        <div className="container">
            <div className="row">
            <div className="col-lg-12 mx-auto text-center">
                { !this.state.isFetching ?
                  (
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" className={this.props.className}>
                            <ModalBody className="chart-modal-body">
                            <TradingViewWidget
                                    symbol={`${coin.symbol}USD`}
                                    theme={Themes.DARK}
                                    locale="en"
                                    autosize
                                />
                            </ModalBody>
                        </Modal>

                        <Img className="img img-responsive" src={`../images/${coin.symbol}.png`} />
                        
                        <br />
                        <Button color="primary" onClick={this.toggle}><i className="fas fa-chart-line"></i> View Chart</Button>
                        <br/>
                        <form className="mt-3">
                            <div className="form-group">
                                <label>Coin Name</label>
                                <input className="form-control" type="text" defaultValue={coin.name} disabled />
                            </div>
                            <div className="form-group">
                                <label>Rate (HKD) </label>
                                <input className="form-control" type="text" defaultValue={coin.quotes.HKD.price} disabled />
                                <small>Note: This may change if you take more time to get ready for the transaction.</small>
                            </div>
                            <div className="form-group">
                                <label>Amount (HKD)</label>
                                <input type="number" className="form-control" value={this.state.amount} onChange={this.onChangeField.bind(this, "amount")}/>
                                { this.state.lessThenLimit ? (
                                    <small className="text-danger">Sorry !! Minimum expense amount is HKD 100.</small>)
                                    : ''
                                }
                            </div>
                            
                            <Button color="primary" onClick={this.getReady}>Confirm Buy</Button>
                        </form>
                    </div>)
                    : <ReactLoading className="mx-auto" type="bars" color="teal" />
                }
            </div>
            </div>
        </div>
        </section>
    )
        
  }
}

const Coin = connect((rootState, ownProps) => ({
    coin: rootState.coin.coins[parseInt(ownProps.match.params.id, 10)],
    doneUpdating: rootState.transact.doneUpdating,
    coins: rootState.coin.coins,
    amount: rootState.account.account,
    userid: rootState.user.user.id
  }), (dispatch) => ({
    loadCoins: () => { dispatch(remoteFetchCoins()) },
    getReady: (amount, coin_id, userid) => { dispatch(getReady(amount, coin_id, userid))}
}))(PureCoin);

export default Coin;