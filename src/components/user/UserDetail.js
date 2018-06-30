import * as React from 'react';
import { connect } from 'react-redux';
import {Badge} from 'reactstrap';
import {Link} from 'react-router-dom';
import ReactLoading from 'react-loading';

class PureUserDetail extends React.Component {

    render() {
        const user = this.props.user; 
        return (
                <div>
                { this.props.user.length > 0 ? <ReactLoading className="mx-auto" type="bubbles" color="teal" /> :
                (<div className="container mb-3">
                    <div className="row">
                        <div className="col-12">
                            <img width="300" className="img img-fluid" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                            <h3>{user.name}</h3>
                            <Badge color="secondary">{user.username}</Badge>
                        </div>
                    </div>
                </div>)
        }
        </div>
        )
    }
}

const UserDetail = connect((state) => ({
    user: state.user.user
}))(PureUserDetail)

export default UserDetail;