import { ADD_USER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_STATE } from "./actions";

const initialState = {
    isAuthenticated: (localStorage.getItem('token') != null),
    error: "",
    success: ""
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            {
                return Object.assign({}, state, {
                    isAuthenticated: true,
                    user: action.user,
                    success: "Logged in Successfully"
                });
            }
        case LOGIN_FAILURE:
            {
                return Object.assign({}, state, {
                    isAuthenticated: false,
                    error: action.message
                });
            }
        case ADD_USER:
            {
                const user = action.user;
                return {...state, user }
            }
        case LOGOUT_STATE:
            {
                return Object.assign({}, state, {
                    isAuthenticated: false,
                    user: []
                });
            }
        default:
            return state;
    }
}