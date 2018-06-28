import * as React from 'react'; 
import {connect} from 'react-redux';
import {getUserAccount} from '../redux/account/actions'

const footerStyle = {
  position: 'fixed',
  bottom: 0
}

class PureFooter extends React.Component {

    componentDidMount() {
        this.props.loadBalance();
    }
    
    render() {
        return (
            <footer style={footerStyle} className="footer">
            <p>
                <i className="icon-user"></i> <a href="#">{localStorage.getItem('username') ? localStorage.getItem('username') : 'Guest'}</a>
                { this.props.isAuthenticated ? 
                    `Balance: ${this.props.account}`
            : ''} 
            </p>
                
          </footer>
        )
    }
}

const Footer = connect((state) => ({
    account: state.account.account,
    isAuthenticated: state.auth.isAuthenticated
}), (dispatch) => ({
  loadBalance: () => dispatch(getUserAccount())
}))(PureFooter);

export default Footer