import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { catalystURL } from "../../constants";

//! Fetch hospital details (Admin)
export const fetchHospitalDetails = createAsyncThunk(
    "hospitals/fetchHospitalDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${catalystURL}/admin/hospitalDetails`);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch hospital details");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//! Fetch hospital data
export const fetchHospitalData = createAsyncThunk(
    "hospitals/fetchHospitalData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${catalystURL}/admin/hospitals`);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch hospital data");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//! Fetch hospital revenue
export const fetchHospitalRevenue = createAsyncThunk(
    "hospitals/fetchHospitalRevenue",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${catalystURL}/admin/revenue`);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch hospital revenue");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const hospitalsSlice = createSlice({
    name: "hospitals",
    initialState: {
        hospitalsState: {
            isLoading: false,
            hospitalsData: [],
            isError: null,
        },
        hospitalDetailsState: {
            isLoading: false,
            hospitalDetailsData: [],
            isError: null,
        },
        hospitalsRevenueState: {
            isLoading: false,
            revenueData: [], // Renamed for clarity
            isError: null,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //! Hospital Details
            .addCase(fetchHospitalDetails.pending, (state) => {
                state.hospitalDetailsState.isLoading = true;
                state.hospitalDetailsState.isError = null;
            })
            .addCase(fetchHospitalDetails.fulfilled, (state, action) => {
                state.hospitalDetailsState.isLoading = false;
                state.hospitalDetailsState.hospitalDetailsData = action.payload;
            })
            .addCase(fetchHospitalDetails.rejected, (state, action) => {
                state.hospitalDetailsState.isLoading = false;
                state.hospitalDetailsState.isError = action.payload || "Failed to fetch hospital details";
            })

            //! Hospital Data
            .addCase(fetchHospitalData.pending, (state) => {
                state.hospitalsState.isLoading = true;
                state.hospitalsState.isError = null;
            })
            .addCase(fetchHospitalData.fulfilled, (state, action) => {
                state.hospitalsState.isLoading = false;
                state.hospitalsState.hospitalsData = action.payload;
            })
            .addCase(fetchHospitalData.rejected, (state, action) => {
                state.hospitalsState.isLoading = false;
                state.hospitalsState.isError = action.payload || "Failed to fetch hospital data";
            })

            //! Hospital Revenue
            .addCase(fetchHospitalRevenue.pending, (state) => {
                state.hospitalsRevenueState.isLoading = true;
                state.hospitalsRevenueState.isError = null;
            })
            .addCase(fetchHospitalRevenue.fulfilled, (state, action) => {
                state.hospitalsRevenueState.isLoading = false;
                state.hospitalsRevenueState.revenueData = action.payload;
            })
            .addCase(fetchHospitalRevenue.rejected, (state, action) => {
                state.hospitalsRevenueState.isLoading = false;
                state.hospitalsRevenueState.isError = action.payload || "Failed to fetch hospital revenue";
            });
    },
});

export default hospitalsSlice.reducer;
