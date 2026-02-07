import { createSlice } from "@reduxjs/toolkit";

const todoReducer = createSlice({
    name: "ToDo Item",
    initialState: [],
    reducers: {
        addTodoItem(state, action){
            console.log(state)
            console.log(action)
        },
    }
})

export const {addTodoItem} = todoReducer.actions
export default todoReducer.reducer