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
                            <img width="200" className="img img-fluid" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png" />
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