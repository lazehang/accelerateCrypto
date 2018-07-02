import * as React from 'react';
import { connect } from 'react-redux';
import { getUserCoins, getUserTransactions } from '../../redux/account/actions';
import { remoteFetchCoins } from '../../redux/coin/actions';
import { Link } from 'react-router-dom';
import UserCoinList from './UserCoinList';
import UserDetail from './UserDetail';
import {getUser} from '../../redux/user/actions';
import ReactLoading from 'react-loading';
import {Table} from 'reactstrap';
import Moment from 'moment';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class PureTransaction extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            activeTab: '1'
        }
    }

    componentWillMount = () => {
        this.props.loadCoins();
        this.props.loadUser();             
        this.props.loadAccountHistory();
    }

    round(num) {
        return Math.round(num * 100) / 100;
    }

    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
        }
    }

    render() {
        const transactions = this.props.transactions;
        const coins = this.props.coins;
        const buy = [];
        const sell = [];

        
        Object.keys(coins).map((k,v) => {
            transactions.map((t) => {
                if (t.coin_id == k) {
                        t.name = coins[k].name;
                        t.current_rate = coins[k].quotes.HKD.price;
                        t.change_percent = this.round((t.rate - t.current_rate)/t.rate * 100);
                    if (t.type == "buy") {
                        buy.push(t);
                        
                    } else {
                               
                        sell.push(t);
                    }
                }
                
            })
        })
        
        return (
            <section id="profile">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 mx-auto text-center">
                        { this.props.isFetching ? <ReactLoading className="mx-auto" type="bars" color="teal" /> : (
                            <div> 
                                <UserDetail />  

                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                        >
                                        Bought
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                        >
                                        Sold
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                    <div className="table-responsive">
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Coin Name</th>
                                            <th>Amount</th>
                                            <th>Rate</th>
                                            <th>Coin Quantity</th>
                                            <th>Percent Change</th>
                                            <th>Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            buy.map((t) => (
                                                <tr key={t.id}>
                                                    <th scope="row">{t.id}</th>
                                                    <td>{t.name}</td>
                                                    <td>{t.amount}</td>
                                                    <td>{t.rate}</td>
                                                    <td>{t.amount/t.rate}</td>
                                                    <td className={t.change_percent > 0 ? "text-success" : t.change_percent < 0 ? "text-danger" : "text-default"}>{t.change_percent} %</td>
                                                    <td>{Moment(t.created_at).format('DD MMM YYYY')}</td>
                                                
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                    </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                    <div className="table-responsive">
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Coin Name</th>
                                            <th>Amount</th>
                                            <th>Rate</th>
                                            <th>Coin Quantity</th>
                                            <th>Percent Change</th>
                                            <th>Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            sell.map((t) => (
                                                <tr key={t.id}>
                                                    <th scope="row">{t.id}</th>
                                                    <td>{t.name}</td>
                                                    <td>{t.amount}</td>
                                                    <td>{t.rate}</td>
                                                    <td>{t.amount/t.rate}</td>
                                                    <td className={t.change_percent > 0 ? "text-success" : t.change_percent < 0 ? "text-danger" : "text-default"}>{t.change_percent} %</td>
                                                    <td>{Moment(t.created_at).format('DD MMM YYYY')}</td>
                                                
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                    </div>
                                    </TabPane>
                                </TabContent>
                            </div> 
                        )}
                    </div>
                    </div>
                </div>
            </section>
            )
        
    }
}

const Transaction = connect((state) => ({
    coins: state.coin.coins,
    isFetching: state.account.isFetching,
    transactions: state.account.transactions
}), (dispatch) => ({
    loadAccountHistory: () => { dispatch(getUserTransactions())},
    loadUser: () => {dispatch(getUser())},
    loadCoins: () => { dispatch(remoteFetchCoins()) }
}))(PureTransaction);

export default Transaction;