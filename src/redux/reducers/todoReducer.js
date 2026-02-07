import { createSlice } from "@reduxjs/toolkit";

const todoReducer = createSlice({
    name: "ToDo Item",
    initialState: [],
    reducers: {
        addTodoItem(state, action){
            state.push(action.payload)
        },
    }
})

export const {addTodoItem} = todoReducer.actions
export default todoReducer.reducer