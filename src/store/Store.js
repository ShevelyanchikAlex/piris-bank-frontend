import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./RootReducer";
import thunk from "redux-thunk"

const middlewares = [thunk]

export const store = createStore(rootReducer, applyMiddleware(...middlewares));