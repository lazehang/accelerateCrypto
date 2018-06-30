import * as React from 'react';
import { connect } from 'react-redux';
import { getUserCoins, getUserTransactions } from '../../redux/account/actions';
import { Link } from 'react-router-dom';
import UserCoinList from './UserCoinList';
import UserDetail from './UserDetail';
import {getUser} from '../../redux/user/actions';
import ReactLoading from 'react-loading';
import {Table} from 'reactstrap';
import Moment from 'moment';

class PureTransaction extends React.Component {

    componentWillMount = () => {
        this.props.loadUser();             
        this.props.loadAccountHistory();
    }

    render() {
        const transactions = this.props.transactions;
        const buy = [];
        const sell = [];

        transactions.map((t) => {
            if (t.type == "buy") {
                buy.push(t);
            } else {
                sell.push(t);
            }
        })
        return (
            <section id="profile">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 mx-auto text-center">
                        { this.props.isFetching ? <ReactLoading className="mx-auto" type="bars" color="teal" /> : (
                            <div> 
                                <UserDetail />  

                                      <Table>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Type</th>
                                            <th>Coin ID</th>
                                            <th>Amount</th>
                                            <th>Rate</th>
                                            <th>Coin Quantity</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            buy.map((t) => (
                                                <tr key={t.id}>
                                                    <th scope="row">{t.id}</th>
                                                    <td>{t.type}</td>
                                                    <td>{t.coin_id}</td>
                                                    <td>{t.amount}</td>
                                                    <td>{t.rate}</td>
                                                    <td>{t.amount/t.rate}</td>
                                                    <td>{Moment(t.created_at).format('DD MMM YYYY')}</td>
                                                
                                                </tr>
                                            ))
                                        }
                                                
                                        
                                        
                                        </tbody>
                                    </Table>
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
    coins: state.account.coins,
    isFetching: state.account.isFetching,
    transactions: state.account.transactions
}), (dispatch) => ({
    loadAccountHistory: () => { dispatch(getUserTransactions())},
    loadUser: () => {dispatch(getUser())}
}))(PureTransaction);

export default Transaction;