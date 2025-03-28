import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { catalystURL } from "../../constants";

//! users
export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${catalystURL}/admin/users`);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch users data");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const dashboardSlice = createSlice({
    name: "user",
    initialState: {
        userState: {
            isLoading: false,
            usersData: [],
            isError: null,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
         //Todo : appoinments
        builder 
            .addCase(fetchUserData.pending, (state) => {
                state.userState.isLoading = true;
                state.userState.isError = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userState.isLoading = false;
                state.userState.usersData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.userState.isLoading = false;
                state.userState.isError = action.payload || "Unknown error from user api";
            }) 
           
    },
});

export default dashboardSlice.reducer;
