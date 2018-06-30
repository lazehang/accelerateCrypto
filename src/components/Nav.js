import * as React from 'react';
import {logout} from '../redux/auth/actions';
import { connect } from 'react-redux';
import{ Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


class PureNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            dropdownOpen: false,
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    closeNav = () => {
        this.setState({
            dropdownOpen: false,
            isOpen: false
        });
    }
    
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
      isOpen: !this.state.isOpen
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
          <Navbar fixed="top" className="navbar-dark bg-dark" color="inverse" expand="md">
            <NavbarBrand href="/"><i className="fas fa-rocket"></i> AcceleratedCrypto</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/coins" className="nav-link" onClick={this.closeNav}>Platform</Link>
              </NavItem>
              {
                isAuthenticated ? 
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        {isAuthenticated ? localStorage.getItem("username"): 'Login'}
                    </DropdownToggle>
                    <DropdownMenu right className="bg-dark inverse" onClick={this.closeNav}>
                        <Link to="/profile"><DropdownItem >Profile</DropdownItem></Link>
                        <Link to="/transaction"><DropdownItem >Transactions</DropdownItem></Link>                        
                        <Link to="/login" onClick={this.handleClick} className="nav-link js-scroll-trigger" ><DropdownItem>Logout</DropdownItem></Link>                            
                    </DropdownMenu>
                </UncontrolledDropdown> 
                : 
                <NavItem>
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </NavItem>
            }
            </Nav>
          </Collapse>
        </Navbar>
          )
      }
}

const Navigation = connect((state) => ({
  isAuthenticated: state.auth.isAuthenticated
}), (dispatch) => ({
    logout: () => dispatch(logout())
}))(PureNav);

export default Navigation;
