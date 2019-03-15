import axios from 'axios';
import { getUserAccount, getProfit } from '../account/actions';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const ADD_USER = 'ADD_USER';

export const LOGOUT_STATE = 'LOGOUT_STATE';

const token = localStorage.getItem("token");
const headers = {
    "Authorization": `Bearer ${token}`
}


function loginSuccess(user) {
    return {
        user,
        type: LOGIN_SUCCESS
    }
}

function loginFailure(message) {
    return {
        type: LOGIN_FAILURE,
        message: message
    }
}

export function getUser() {
    return (dispatch) => {
        return axios.get(process.env.REACT_APP_API_SERVER + 'users/user', headers)
            .then((resp) => {
                if (resp.data) {
                    dispatch(addUser(resp.data))
                }
            })
    }
}

export function loginUser(username, password) {
    return (dispatch) => {
        return axios.post(process.env.REACT_APP_API_SERVER + 'auth/login', {
            username: username,
            password: password
        }).then(response => {
            if (response.data == null) {
                dispatch(loginFailure('Unknown Error'));
            } else if (!response.data.token) {
                // If there was a problem, we want to
                // dispatch the error condition
                dispatch(loginFailure(response.data.message || ''));
            } else {
                // If login was successful, set the token in local storage
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("username", response.data.user.username);
                localStorage.setItem("user_id", response.data.user.id);

                // Dispatch the success action
                dispatch(loginSuccess(response.data.user));
                dispatch(getUserAccount(localStorage.getItem('user_id')));
                dispatch(getProfit(localStorage.getItem('user_id')));
            }
        }).catch(err => console.log("Error: ", err))
    }
}

export function logout() {
    return (dispatch) => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("user_id")
        dispatch(logoutState());
        
    }

}

export function logoutState() {
    return {
        type: LOGOUT_STATE
    }
}

export function register(name, username, password) {
    return (dispatch) => {
        return axios.post(process.env.REACT_APP_API_SERVER + 'auth/register', {
            name: name,
            username: username,
            password: password
        }).then(response => {
            if (response.data == null) {
                dispatch(loginFailure('Unknown Error'));
            } else if (!response.data.token) {
                // If there was a problem, we want to
                // dispatch the error condition
                dispatch(loginFailure(response.data.message || ''));
            } else {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.data.token)
                    // Dispatch the success action
                dispatch(loginSuccess(response.data.user.id));
            }
        }).catch(err => console.log("Error: ", err))
    }
}

export function addUser(user) {
    return {
        user,
        type: ADD_USER
    }
}