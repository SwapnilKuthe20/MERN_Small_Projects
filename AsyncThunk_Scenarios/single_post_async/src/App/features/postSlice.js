import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postFetch = createAsyncThunk(
    'posts/fetchPost',

    async (arg, thunkApi) => {
        try {
            // console.log(arg, "...arg");

            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${arg}`)

            return res.data

        } catch (error) {
            console.log(error, "...error");
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

console.log({ ...postFetch.pending }, "...postFetch.pending");
console.log({ ...postFetch.pending.match }, "...postFetch.pending match");


const postSlice = createSlice({
    name: "post",
    initialState: {
        post: {},
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postFetch.pending, (state) => {
                state.status = "pending"
                state.error = null
            })
            .addCase(postFetch.fulfilled, (state, action) => {
                state.status = "fullfilled..."
                state.post = action.payload
                state.error = null
            })
            .addCase(postFetch.rejected, (state, action) => {
                state.status = "rejected..."
                state.error = action.payload

                // console.log(state, "...state");
                // console.log(action, "...action");
            })
    }
})

export const postReducer = postSlice.reducer