import { applyMiddleware, combineReducers, createStore } from "redux";
import { logger } from "redux-logger";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import thunk from "redux-thunk";
import { reducer as coinReducer } from "./coin/reducer";
import { authReducer as authReducer } from "./auth/reducer";

let socket = io('http://localhost:8000');

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

export const store = createStore(combineReducers({
    coin: coinReducer,
    auth: authReducer
}), applyMiddleware(thunk, socketIoMiddleware, logger));