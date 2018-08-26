import axios from 'axios';

export const ADD_USER_INFO = 'ADD_USER_INFO';
export const CLEAR_USER = "CLEAR_USER";

export function getUser() {
    const user_id = localStorage.getItem("user_id");

    return (dispatch) => {
        axios.get(process.env.REACT_APP_API_SERVER + 'users/user/' + user_id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((resp) => {
            console.log(resp);
            dispatch(clearUser())
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

export function clearUser() {
    return {
        type: CLEAR_USER
    }
}