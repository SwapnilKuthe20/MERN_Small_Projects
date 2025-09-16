import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/notes';

// Async Thunks

// Get all notes: 

export const fetchNotes = createAsyncThunk(
    'notes/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(API_URL)
            return res.data

        } catch (error) {
            console.log("Error occure in fetch all Notes...", error);
            return rejectWithValue("Error while fetching all Notes")
        }
    }
)

// Create note :

export const createNotes = createAsyncThunk(
    'notes/createNotes',
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/create-notes`, payload)
            return res.data.notes

        } catch (error) {
            console.log("Error occure in creating Notes...", error);
            return rejectWithValue("Error while creating  Notes")
        }
    }
)

// Update note :

export const updateNotes = createAsyncThunk(
    'notes/updateNotes',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, updatedData)
            console.log(res.data, "...respo update");

            return res.data.notes

        } catch (error) {
            console.log("Error occure in updating Notes...", error);
            return rejectWithValue("Error while updating all Notes")
        }
    }
)

// Delete note :

export const deleteNotes = createAsyncThunk(
    'notes/deleteNotes',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${API_URL}/${id}`)

            // console.log(res.data, "...res.data");

            return res.data.note._id

        } catch (error) {
            console.log("Error occure in  deleting Notes...", error);
            return rejectWithValue("Error while deleting Notes")
        }
    }
)

const notesSlice = createSlice({
    name: "notes",
    initialState: { status: "idle", notes: [], error: null },
    extraReducers: (builder) => {
        builder
            // Fetch Notes
            .addCase(fetchNotes.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {

                // console.log(action.payload, "...action");

                state.status = "succeeded"
                state.notes = action.payload.notes
                state.error = null
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload || action.error.message || "Something Went wrong"
            })


            // Create Note
            .addCase(createNotes.fulfilled, (state, action) => {
                // console.log({ ...state }, "...state create");
                // console.log(action, "...action create");

                state.status = "fulfilled"
                state.notes.push(action.payload);
                state.error = null
            })

            // Update Note
            .addCase(updateNotes.fulfilled, (state, action) => {
                // console.log({...state}, "...state update");
                // console.log(action, "...action update");

                state.notes = state.notes.map(note =>
                    note._id === action.payload._id ? action.payload : note
                );

                // const index = state.notes.findIndex(note => note._id === action.payload._id);
                // if (index !== -1) {
                //     state.status = "fulfilled"
                //     state.notes[index] = action.payload;
                //     state.error = null
                // }
            })

            // Delete Note
            .addCase(deleteNotes.fulfilled, (state, action) => {

                // console.log(action, "...action delete");

                state.status = "fulfilled"
                state.notes = state.notes.filter(note => note._id !== action.payload);
                state.error = null
            });
    }
})

export const notesReducer = notesSlice.reducer