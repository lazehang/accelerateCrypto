import { ADD_USER_INFO } from "./actions";

export function reducer(oldState = {}, action) {
    switch (action.type) {
        case ADD_USER_INFO:
            {
                const user = action.user;
                return {...oldState, user }

            }
        default:
            // ALWAYS have a default case in a reducer
            return oldState;
    }
}