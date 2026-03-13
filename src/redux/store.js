import { configureStore } from "@reduxjs/toolkit";
import reducers from "./index";
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const config= {
    key: "todo_item",
    storage
}

const persistedReducers = persistReducer(config, reducers)

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export const persistedStore = persistStore(store)