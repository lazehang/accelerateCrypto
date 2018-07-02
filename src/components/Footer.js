import * as React from 'react'; 
import {connect} from 'react-redux';
import {getUserAccount, getProfit} from '../redux/account/actions'

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  padding: '1rem 0',
  width: '100%'
}

class PureFooter extends React.Component {

    componentWillMount = () => {
        this.props.loadProfit();                
        this.props.loadBalance();
    }

    componentWillUpdate = () => {
        this.props.loadBalance();        
    }
    
    render() {
        return (
            <footer style={footerStyle} className="footer">
            
            <div className="col-sm-4 col-md-5 col-lg-5 col-xs-12 mx-auto bg-dark">
                <span>
                    <i className="fa fa-user"></i> <a href="#">{localStorage.getItem('username') ? localStorage.getItem('username') : 'Guest'}</a>
                </span>
                <span>
                { this.props.isAuthenticated ? 
                    `Balance: ${this.props.account} Profit: ${this.props.status}`
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
  loadBalance: () => {dispatch(getUserAccount())},
  loadProfit: () => {dispatch(getProfit())}
}))(PureFooter);

export default Footer;