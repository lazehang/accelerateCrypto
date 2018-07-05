import { ADD_COINS, CLEAR_COINS, SOCKET_UPDATE_COINS } from "./actions";


const initialState = {
    coins: [],
    isFetching: true
};
export function reducer(oldState = initialState, action) {
    switch (action.type) {
        case ADD_COINS:
            {
                const coins = action.coins
                return Object.assign({}, oldState, {
                    coins,
                    isFetching: false
                });
            }

        case CLEAR_COINS:
            {
                return Object.assign({}, oldState, {
                    isFetching: true,
                    coins: []
                });

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