import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Base_Url = import.meta.env.VITE_BASE_URL
// console.log(Base_Url, "...baseUrl");

export const fetchAllItems = createAsyncThunk(
    "items/fetch",

    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${Base_Url}/api/items`)
            // console.log(res, "...response");
            return res.data.items

        } catch (error) {
            console.log(error, "....Error in catch while fetching all items");
            return rejectWithValue('Error ?? while fetching all items')
        }
    }
)

export const postItems = createAsyncThunk(
    "items/post",
    async (payload, { rejectWithValue }) => {
        try {
            console.log(payload, "...payload");

            const res = await axios.post(`${Base_Url}/api/items/createItem`, payload)
            console.log(res.data.item, "...resp post");

            return res.data.item

        } catch (error) {
            console.log("Error in catch block postApi...", error);
            rejectWithValue("Error while creating item api")
        }
    }
)

export const updateItem = createAsyncThunk(
    "item/update",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            // console.log(id, "...id");

            const res = await axios.put(`${Base_Url}/api/items/${id}`, payload)
            // console.log(res.data.item._id, "...resp update item");

            return res.data.item

        } catch (error) {
            console.log("Error in catch block Update api...", error);
            rejectWithValue("Error while updating postItem api")
        }
    }
)

const itemSlice = createSlice({
    name: "items",
    initialState: { status: "idle", items: [], error: null },
    extraReducers: (builder) => {
        builder

            // fetch All Items : 
            .addCase(fetchAllItems.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(fetchAllItems.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.items = action.payload
                state.error = null
            })
            .addCase(fetchAllItems.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.payload || "Something Went wrong !!"
            })

            // creating items : post api :
            .addCase(postItems.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(postItems.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.items.push(action.payload)
                state.error = null
            })
            .addCase(postItems.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.payload || "Something Went wrong !!"
            })


            // updating items : put api :
            .addCase(updateItem.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.items = state.items.map(item => item._id === action.payload._id ? action.payload : item)
                state.error = null
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.payload || "Something Went wrong !!"
            })
    }
})

export const itemReducer = itemSlice.reducer