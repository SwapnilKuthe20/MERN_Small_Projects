import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./Features/itemSlice";


export const store = configureStore({
    reducer: {
        itemReducer
    }
})
