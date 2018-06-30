import { CLEAR_STATUS, ADD_TRANSACTIONS, ADD_STATUS, CLEAR_TRANSACTIONS, ADD_ACCOUNT, ADD_COIN_PRICE, SOCKET_UPDATE_BALANCE, ADD_USER_COINS } from "./actions";

const initialState = {
    account: [],
    isFetching: true,
    coins: [],
    transactions: [],
    status: ''
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
        case ADD_TRANSACTIONS:
            {
                const transactions = action.transactions
                return Object.assign({}, state, {
                    isFetching: false,
                    transactions
                })
            }
        case CLEAR_TRANSACTIONS:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    transactions: []
                })
            }
        case ADD_STATUS:
            {
                return Object.assign({}, state, {
                    status: action.status
                })
            }
        case CLEAR_STATUS:
            {
                return Object.assign({}, state, {
                    status: ''
                })
            }
        default:
            return state;
    }
}