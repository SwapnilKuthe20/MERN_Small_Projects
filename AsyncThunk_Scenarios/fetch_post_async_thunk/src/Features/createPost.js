import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const createPost = createAsyncThunk(
    "post/createPost",
    async (payload, { rejectWithValue }) => {
        try {

            console.log(payload, "...payload");

            const res = await axios.post('https://jsonplaceholder.typicode.com/posts', payload)
            return res.data

        } catch (error) {
            console.log(error, "....Error in catch createPost");
            return rejectWithValue("Error occure while creating Post")
        }
    }
)

const createPostSlice = createSlice({
    name: "createPost",
    initialState: { status: "idle", post: {}, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                // console.log("State...", state);
                state.status = "Loading"
                state.error = null
            })
            .addCase(createPost.fulfilled, (state, action) => {
                // console.log(action, "...action fullfilled");
                state.status = "fulfilled"
                state.post = action.payload
                state.error = null
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.payload || action.error.message || "Something Went Wrong...!"
            })
    }
})

export const createPostReducer = createPostSlice.reducer