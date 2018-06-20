import { LoginActions, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actions";

const initialState = {
    isAuthenticated: (localStorage.getItem('token') != null)
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true
            });
        case LOGIN_FAILURE:
            return state;
        default:
            return state;
    }
}