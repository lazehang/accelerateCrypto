import { Dispatch } from 'redux';
import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGIN_FAILURE = 'LOGIN_FAILURE';


function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

function loginFailure(message) {
    return {
        type: LOGIN_FAILURE,
        message: message
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
                localStorage.setItem('token', response.data.token)
                    // Dispatch the success action
                dispatch(loginSuccess());
            }
        }).catch(err => console.log("Error: ", err))
    }
}

function loginFailure(message) {
    return {
        type: LOGIN_FAILURE,
        message: message
    }
}

export function register(name, username, password) {
    console.log(password);

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
                dispatch(loginSuccess());
            }
        }).catch(err => console.log("Error: ", err))
    }
}