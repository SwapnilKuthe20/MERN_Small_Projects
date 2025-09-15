import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "../Features/postSlice";
import { singlePostReducer } from "../Features/singlePostSlice";
import { createPostReducer } from "../Features/createPost";



export const store = configureStore({
    reducer: {
        postReducer: postsReducer,
        singlePostReducer: singlePostReducer,
        createPostReducer: createPostReducer
    }
})