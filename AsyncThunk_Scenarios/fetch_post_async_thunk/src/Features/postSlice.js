import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
    'posts/fetPosts',

    async (arg, thunkApi) => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts')

            // console.log(arg, "...arg");
            // console.log(thunkApi.dispatch, "...thunkapi");

            // console.log(res, "...res");

            // if (!res.ok) {
            //     throw new Error(`HTTP error! status: ${res.status}`)  // yahan se reject hoga
            // }

            return res.data         // sirf data return krna chiye

        } catch (error) {
            // console.log(error, "...error");
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

// console.log({ ...fetchPosts.pending }, "...fetchPosts.pending");
// console.log({ ...fetchPosts.pending.match }, "...fetchPosts.pending match");

// console.log("action type pend...", fetchPosts.pending.type);
// console.log("action type fullfill...", fetchPosts.fulfilled.type);
// console.log("action type rejected...", fetchPosts.rejected.type);

// const action1 = fetchPosts.pending()
// console.log(action1, "...action 1");

// const action2 = fetchPosts.fulfilled()
// console.log(action2, "...action 2");

// const action3 = fetchPosts.rejected()
// console.log(action3, "...action 3");


const postsSlice = createSlice({
    name: "posts",
    initialState: {
        status: "idle",     // "loading / fullfiled / rejected"
        posts: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                // console.log({ ...state }, "...pending state");

                state.status = "loading"
                state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                // console.log({ ...state }, "...fulfilled state");
                // console.log(action, "...fulfilled action");

                state.status = "fullfilled"
                state.posts = action.payload
                state.error = null
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                // console.log({ ...state }, "...rejected state");
                // console.log(action, "...rejected action");

                state.status = "rejected"
                state.error = action.payload || action.error.message || "Something went wrong !!"
            })
    }
})

export const postsReducer = postsSlice.reducer


