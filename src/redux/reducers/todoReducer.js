import { createSlice } from "@reduxjs/toolkit";

const todoReducer = createSlice({
    name: "ToDo Item",
    initialState: { todoItems: [] },
    reducers: {
        addTodoItem(state, action) {
            state.todoItems.push(action.payload)
            console.log(state.todoItems)
        },
        removeTodoItem(state, action) {
            state.todoItems = state.todoItems.filter(todoItem => todoItem.id !== parseInt(action.payload.id))
        }
    }
})

export const { addTodoItem, removeTodoItem } = todoReducer.actions
export default todoReducer.reducer