import axios from 'axios';
import { Dispatch } from 'redux';

export const ADD_USER_INFO = 'ADD_USER_INFO';

export function getUser() {
    return (dispatch) => {
        axios.get(process.env.REACT_APP_API_SERVER + 'users/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((resp) => {
            console.log(resp);
            dispatch(addUserInfo(resp.data))
        })
    }
}

export function addUserInfo(user) {
    return {
        type: ADD_USER_INFO,
        user
    }
}