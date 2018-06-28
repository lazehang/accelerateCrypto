import { ADD_TO_TRANSACT } from "./actions";

const initialState = { doneUpdating: false };

export function transactReducer(oldState = initialState, action) {
    switch (action.type) {
        case ADD_TO_TRANSACT:
            {
                const coin = {
                    price: action.price,
                    amount: action.amount,
                    coin_id: action.coin_id,
                    coinQuantity: action.coinQuantity
                }
                return {...oldState, coin, doneUpdating: true }

            }
        default:
            // ALWAYS have a default case in a reducer
            return oldState;
    }
}