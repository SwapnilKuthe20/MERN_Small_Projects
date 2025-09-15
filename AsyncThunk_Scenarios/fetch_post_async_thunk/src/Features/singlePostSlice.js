import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const singlePost = createAsyncThunk(
    "post/fetPost",
    async (arg, { rejectWithValue }) => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${arg}`)
            return res.data

        } catch (error) {
            console.log("Error Occured catch block single post....", error.message);
            return rejectWithValue("Error Occured while fetching single post")
        }
    }
)

const postSlice = createSlice({
    name: "post",
    initialState: { status: "idle", post: {}, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(singlePost.pending, (state) => {
                state.status = "pending"
                state.error = null
            })
            .addCase(singlePost.fulfilled, (state, action) => {
                state.status = "fullfilled"
                state.post = action.payload
                state.error = null
            })
            .addCase(singlePost.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.payload || action.error.message || "Something Went Wrong"
            })
    }
})

export const singlePostReducer = postSlice.reducer