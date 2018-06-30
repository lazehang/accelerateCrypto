import * as React from 'react';
import { connect } from 'react-redux';
import { getUserCoins } from '../../redux/account/actions';
import { Link } from 'react-router-dom';
import UserCoinList from './UserCoinList';
import UserDetail from './UserDetail';
import {getUser} from '../../redux/user/actions';
import ReactLoading from 'react-loading';

class PureProfile extends React.Component {

    componentWillMount = () => {
        this.props.loadUser();             
        this.props.loadUserData();
    }

    render() {
        
        return (
            <section id="profile">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 mx-auto text-center">
                        
                        { this.props.isFetching ? <ReactLoading className="mx-auto" type="bars" color="teal" /> : (
                            <div> <UserDetail /> <UserCoinList /> </div> 
                        )}
                    </div>
                    </div>
                </div>
            </section>
            )
        
    }
}

const Profile = connect((state) => ({
    coins: state.account.coins,
    isFetching: state.account.isFetching
}), (dispatch) => ({
    loadUserData: () => { dispatch(getUserCoins())},
    loadUser: () => {dispatch(getUser())}
}))(PureProfile);

export default Profile;