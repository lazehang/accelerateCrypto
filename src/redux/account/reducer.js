import { ADD_ACCOUNT, ADD_COIN_PRICE, SOCKET_UPDATE_BALANCE, ADD_USER_COINS } from "./actions";

const initialState = {
    account: [],
    isFetching: true
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ACCOUNT:
            {
                return Object.assign({}, state, {
                    account: action.amount
                });
            }
        case SOCKET_UPDATE_BALANCE:
            {
                return Object.assign({}, state, {
                    account: action.account.amount
                });
            }
        case ADD_USER_COINS:
            {
                const coins = action.coins;
                return Object.assign({}, state, {
                    isFetching: false,
                    coins
                });
            }
        case ADD_COIN_PRICE:
            {
                const price = action.price
                return Object.assign({}, state, {
                    isFetching: true,
                    price
                })
            }
        default:
            return state;
    }
}