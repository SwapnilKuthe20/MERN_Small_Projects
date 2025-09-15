import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (arg, thunkApi) => {
        try {
            const resp = await axios.get('https://jsonplaceholder.typicode.com/users')
            console.log(resp, "...res");

            console.log(arg, "...arg");
            console.log(thunkApi.dispatch, "...thunkapi");

            return resp.data

        } catch (error) {
            console.log(error, "...error");
            return thunkApi.rejectWithValue(error.message || "api fetch error")
        }
    }
)

// console.log("type pend...", fetchUsers.pending.type);
// console.log("type fullfill...", fetchUsers.fulfilled.type);
// console.log("type rejected...", fetchUsers.rejected.type);


const userSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                // console.log({ ...state }, "...state pending");
                // console.log(current(state), "...current state pend");

                state.status = "pending..."
                state.error = null

            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                // console.log({ ...state }, "...state full");
                // console.log(current(state), "...current state fullfill");
                // console.log(action, "...action full");

                state.status = "succeed..."
                state.data = action.payload
                state.error = null
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                // console.log(state, "...state rejected");
                // console.log(action.error.message, "...action rejected");
                state.error = action.payload || action.error.message
                state.status = "rejected..."
            })
    }
})


export const userReducer = userSlice.reducer
