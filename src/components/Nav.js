import * as React from 'react';
import {logout} from '../redux/auth/actions';
import { connect } from 'react-redux';
import{ Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class PureNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            dropdownOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

    handleClick = () => {
        if (this.state.isAuthenticated) {
          this.props.logout();
        }     
      }

      render() {
          const isAuthenticated = (localStorage.getItem('token') != null);
          return (
            <nav ref="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top nav2" id="mainNav">
              <div className="container">
                  <Link className="navbar-brand js-scroll-trigger" to="/">Accelerate Crypto</Link>
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                      <Link to="/coins" className="nav-link js-scroll-trigger" >Platform</Link>
                      </li>
                      <li className="nav-item">
                      {isAuthenticated ? <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {isAuthenticated ? localStorage.getItem("username"): 'Login'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <Link to="/profile"><DropdownItem >Profile</DropdownItem></Link>
                                <Link to="/login" onClick={this.handleClick} className="nav-link js-scroll-trigger" ><DropdownItem>Logout</DropdownItem></Link>                            
                            </DropdownMenu>
                        </Dropdown> : 
                        <Link to="/login" className="nav-link js-scroll-trigger" >LogIn</Link>
                    }
                      </li>
                      
                  </ul>
                  </div>
              </div>
          </nav>
          )
      }
}

const Navigation = connect((state) => ({
  isAuthenticated: state.auth.isAuthenticated
}), (dispatch) => ({
    logout: () => dispatch(logout())
}))(PureNav);

export default Navigation;
