import { Dispatch } from 'redux';
import axios from 'axios';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const SOCKET_UPDATE_BALANCE = 'SOCKET_UPDATE_BALANCE';
export const ADD_USER_COINS = 'ADD_USER_COINS';
export const ADD_COIN_PRICE = 'ADD_COIN_PRICE';

const token = localStorage.getItem("token");
const headers = {
    "Authorization": `Bearer ${token}`
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