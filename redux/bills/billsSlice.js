import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { catalystURL } from "../../constants";

//! Admin Bills
export const fetchBills = createAsyncThunk(
    "bills/fetchBills",
    async (url, { rejectWithValue }) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch bills data");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);




export const billsSlice = createSlice({
    name: "bills",
    initialState: {
        billsState: {
            isLoading: false,
            billsData: [],
            isError: null,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
         //Todo : Admin Bills
        builder 
            .addCase(fetchBills.pending, (state) => {
                state.billsState.isLoading = true;
                state.billsState.isError = null;
            })
            .addCase(fetchBills.fulfilled, (state, action) => {
                state.billsState.isLoading = false;
                state.billsState.billsData = action.payload;
            })
            .addCase(fetchBills.rejected, (state, action) => {
                state.billsState.isLoading = false;
                state.billsState.isError = action.payload || "Unknown error from bills api";
            }) 
            
    },
});

export default billsSlice.reducer;
