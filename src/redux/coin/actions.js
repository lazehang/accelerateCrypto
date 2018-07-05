import axios from "axios";

export const ADD_COINS = 'ADD_COINS';
export const SOCKET_UPDATE_COINS = 'SOCKET_UPDATE_COINS';
export const CLEAR_COINS = 'CLEAR_COINS';


export function remoteFetchCoins() {
    return (dispatch) => {
        axios.get(process.env.REACT_APP_API_SERVER + 'coins').then((resp) => {
            dispatch(clearCoins());
            dispatch(addCoins(resp.data))
        });
    };
}

export function addCoins(coins) {
    return {
        coins,
        type: ADD_COINS
    }
}

export function clearCoins() {
    return {
        type: CLEAR_COINS,
    }
}