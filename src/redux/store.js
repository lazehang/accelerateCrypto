import { applyMiddleware, combineReducers, createStore } from "redux";
import { logger } from "redux-logger";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import thunk from "redux-thunk";
import { reducer as coinReducer } from "./coin/reducer";
import { authReducer } from "./auth/reducer";
import { transactReducer } from './transaction/reducer';
import { reducer as accountReducer } from './account/reducer';
import { reducer as userReducer } from './user/reducer';


let socket = io(process.env.REACT_APP_SERVER);

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

export const store = createStore(combineReducers({
    coin: coinReducer,
    auth: authReducer,
    transact: transactReducer,
    account: accountReducer,
    user: userReducer
}), applyMiddleware(thunk, socketIoMiddleware, logger));