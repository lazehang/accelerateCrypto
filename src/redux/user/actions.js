import axios from 'axios';

export const ADD_USER_INFO = 'ADD_USER_INFO';
const user_id = localStorage.getItem("user_id");

export function getUser() {
    return (dispatch) => {
        axios.get(process.env.REACT_APP_API_SERVER + 'users/user/' + user_id, {
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