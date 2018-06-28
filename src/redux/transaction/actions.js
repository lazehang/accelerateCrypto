import { Dispatch } from 'redux';
import axios from 'axios';

const token = localStorage.getItem("token");
const headers = {
    "Authorization": `Bearer ${token}`
}

export const ADD_TO_TRANSACT = 'ADD_TO_TRANSACT';

export function buy(amount, coin_id, coinQuantity) {
    return (dispatch) => {
        return axios.post(process.env.REACT_APP_API_SERVER + 'transact/buy', {
            amount: amount,
            coin_id: coin_id,
            coinQuantity: coinQuantity
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            console.log(response);
        }).catch(err => console.log("Error: ", err))
    }
}

export function sell(amount, coin_id, coinQuantity) {
    return (dispatch) => {
        return axios.post(process.env.REACT_APP_API_SERVER + 'transact/sell', {
            amount: amount,
            coin_id: coin_id,
            coinQuantity: coinQuantity
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            console.log(response);
        }).catch(err => console.log("Error: ", err))
    }
}

export function getReady(amount, coin_id) {
    return (dispatch) => {

        axios.post(process.env.REACT_APP_API_SERVER + 'transact/ready', { amount, coin_id }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(resp => {
                dispatch(addToTransact(amount, coin_id, resp.data.coinQuantity, resp.data.price))
            }).catch((err) => console.log(err));
    }
}

export function addToTransact(amount, coin_id, coinQuantity, price) {
    return {
        amount,
        coin_id,
        coinQuantity,
        price,
        type: ADD_TO_TRANSACT
    }
}