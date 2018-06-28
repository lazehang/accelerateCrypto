import { ADD_COINS, CLEAR_COINS, ADD_TO_TRANSACT, SOCKET_UPDATE_COINS } from "./actions";


const initialState = {
    coins: []
};
export function reducer(oldState = initialState, action) {
    switch (action.type) {
        case ADD_COINS:
            {
                const coins = action.coins
                return {...oldState, coins };
            }

        case CLEAR_COINS:
            {
                return {...oldState, coins: [] };
            }
        case SOCKET_UPDATE_COINS:
            {
                const coins = action.coins;
                return {...oldState, coins };
            }
        default:
            // ALWAYS have a default case in a reducer
            { return oldState; }
    }
}