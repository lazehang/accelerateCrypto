import { Dispatch } from 'redux';
import axios from 'axios';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const SOCKET_UPDATE_BALANCE = 'SOCKET_UPDATE_BALANCE';
export const ADD_USER_COINS = 'ADD_USER_COINS';
export const ADD_COIN_PRICE = 'ADD_COIN_PRICE';
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const CLEAR_TRANSACTIONS = 'CLEAR_TRANSACTIONS';
export const ADD_STATUS = 'ADD_STATUS';
export const CLEAR_STATUS = 'CLEAR_STATUS';


const token = localStorage.getItem("token");
const headers = {
    "Authorization": `Bearer ${token}`
}

export function getUserTransactions() {
    return (dispatch) => {
        return axios.get(process.env.REACT_APP_API_SERVER + 'users/log', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((resp) => {
            if (resp.data) {
                dispatch(clearTransactions());
                dispatch(addTransactions(resp.data))
            }
        })
    }
}

export function getUserAccount() {
    return (dispatch) => {
        return axios.get(process.env.REACT_APP_API_SERVER + 'users/account', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((resp) => {
                if (resp.data) {
                    dispatch(addAccount(resp.data.amount))
                } else {
                    dispatch(addAccount(0))
                }
            }).catch((err) => console.log(err.message))
    }
}

export function getProfit() {
    return (dispatch) => {
        return axios.get(process.env.REACT_APP_API_SERVER + 'users/status', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((resp) => {
                dispatch(clearStatus());
                dispatch(addStatus(resp.data.status));
            })
    }
}

export function getUserCoins() {
    return (dispatch) => {
        return axios.get(process.env.REACT_APP_API_SERVER + 'users/coins', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((resp) => {
                if (resp.data) {
                    dispatch(addCoins(resp.data))
                } else {
                    dispatch(addCoins(null))
                }
            }).catch((err) => console.log(err.message))
    }
}

export function addAccount(amount) {
    return {
        type: ADD_ACCOUNT,
        amount
    }
}

export function addStatus(status) {
    return {
        type: ADD_STATUS,
        status
    }
}

export function addCoins(coins) {
    return {
        type: ADD_USER_COINS,
        coins
    }
}

export function setPrice(coin_id) {
    return (dispatch) => {
        return axios.get(process.env.REACT_APP_API_SERVER + 'users/coins', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((resp) => {
                console.log(resp.data);
                const coin = resp.data.find(coin => coin.id === coin_id)
                if (coin) {
                    dispatch(addPrice(coin.quotes.HKD.price))
                }
            }).catch((err) => console.log(err.message))
    }
}

export function addPrice(price) {
    return {
        type: ADD_COIN_PRICE,
        price
    }
}

export function addTransactions(transactions) {
    return {
        type: ADD_TRANSACTIONS,
        transactions
    }
}

export function clearTransactions() {
    return {
        type: CLEAR_TRANSACTIONS
    }
}

export function clearStatus() {
    return {
        type: CLEAR_STATUS
    }
}