import * as React from 'react';
import {Badge} from 'reactstrap';

export default class ChangeBadge extends React.Component {
    render() {
        return (
            <Badge color={this.props.change > 0 ? 'success':'danger'}>
            <i className={`fas fa-caret-${this.props.change > 0 ? 'up':'down'}`}></i> {this.props.change}%
            </Badge>
        )
    }
}