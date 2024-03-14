import { combineReducers, createStore } from "redux";
import { counterReducer } from "./counterReducer";
const rootReducer = combineReducers({
    counter: counterReducer,
})
export const store = createStore(rootReducer)