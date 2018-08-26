import { ADD_USER_INFO, CLEAR_USER } from "./actions";

export function reducer(oldState = { user: {user_id: ""} }, action) {
    switch (action.type) {
        case ADD_USER_INFO:
            {
                const user = action.user;
                return {...oldState, user }

            }
        case CLEAR_USER:
            {
                const user = {}
                return { ...oldState, user}
            }
        default:
            // ALWAYS have a default case in a reducer
            return oldState;
    }
}