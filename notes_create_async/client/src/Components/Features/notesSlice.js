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
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(API_URL)
            return res.data

        } catch (error) {
            console.log("Error occure in creating Notes...", error);
            return rejectWithValue("Error while creating  Notes")
        }
    }
)

// Update note :

export const updateNotes = createAsyncThunk(
    'notes/updateNotes',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(API_URL)
            return res.data

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
            const res = await axios.get(API_URL)
            return res.data

        } catch (error) {
            console.log("Error occure in  deleting Notes...", error);
            return rejectWithValue("Error while deleting Notes")
        }
    }
)

const notesSlice = createSlice({
    name: "notes",
    initialState: { status: "idle", notes: {}, error: null },
    extraReducers: (builder) => {
        builder
            // Fetch Notes
            .addCase(fetchNotes.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.notes = action.payload
                state.error = null
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload || action.error.message || "Something Went wrong"
            })


            // Create Note
            .addCase(createNotes.fulfilled, (state, action) => {
                state.notes.push(action.payload);
            })

            // Update Note
            .addCase(updateNotes.fulfilled, (state, action) => {
                const index = state.notes.findIndex(note => note._id === action.payload._id);
                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
            })

            // Delete Note
            .addCase(deleteNotes.fulfilled, (state, action) => {
                state.notes = state.notes.filter(note => note._id !== action.payload);
            });
    }
})



export const notesReducer = notesSlice.reducer