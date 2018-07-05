import * as React from 'react'; 
import {connect} from 'react-redux';
import {getUserAccount, getProfit} from '../redux/account/actions';
import {Link} from 'react-router-dom';

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%'
}

class PureFooter extends React.Component {

    componentDidMount = () => {
        if (this.props.isAuthenticated) {
            this.props.loadBalance(localStorage.getItem('user_id'));
            this.props.loadProfit(localStorage.getItem('user_id'));
        }                        
    }   
    
    render() {
        return (
            <footer style={footerStyle} className="footer">
            
            <div className="footer-crypto py-3 col-sm-4 col-md-5 col-lg-5 col-xs-12 mx-auto bg-dark">
                <div className="col-xs-12">
                    <i className="fa fa-user"></i> <a href="/profile">{localStorage.getItem('username') ? localStorage.getItem('username') : 'Guest'}</a>
                </div>
                
                <span className="footer-account">
                { this.props.isAuthenticated ? 
                    (
                        <span className="mx-auto">Balance: HKD{this.props.account} |
                        Profit: <Link to="/transaction" className={ this.props.status > 0 ? "text-success" : this.props.status < 0 ? "text-danger" : "text-default" }>{this.props.status} %</Link></span>
                    )
                : ''
                } 
                </span>
            </div>
                
                
          </footer>
        )
    }
}

const Footer = connect((state) => ({
    account: state.account.account,
    isAuthenticated: state.auth.isAuthenticated,
    status: state.account.status
}), (dispatch) => ({
  loadBalance: (user_id) => {dispatch(getUserAccount(user_id))},
  loadProfit: (user_id) => {dispatch(getProfit(user_id))}
}))(PureFooter);

export default Footer;