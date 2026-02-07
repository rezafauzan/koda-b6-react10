import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "../../src/redux/reducers/todoReducer"

const reducers = combineReducers({
    todoReducer
})

export default reducers