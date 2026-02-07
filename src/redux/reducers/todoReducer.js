import { createSlice } from "@reduxjs/toolkit";

const todoReducer = createSlice({
    name: "ToDo Item",
    initialState: [],
    reducers: {
        addTodoItem(state, action){
            state.push(action.payload)
        },
        removeTodoItem(state, action){
            state = state.filter(todoItem=>todoItem.id != action.payload.id)
        }
    }
})

export const {addTodoItem} = todoReducer.actions
export default todoReducer.reducer