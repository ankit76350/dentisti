import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { catalystURL } from "../../constants";

//! Appointments
export const fetchAppointmentsData = createAsyncThunk(
    "dashboard/fetchAppointmentsData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${catalystURL}/admin/appointments`);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch appointments data");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//! Docters
export const fetchDoctersData = createAsyncThunk(
    "dashboard/fetchDoctersData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${catalystURL}/admin/doctors`);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch doctors data");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//! Hospital
export const fetchHospitalData = createAsyncThunk(
    "dashboard/fetchHospitalData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${catalystURL}/admin/hospitals`);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch hospitals revenue");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//! Hospital
export const fetchHospitalRevenue = createAsyncThunk(
    "dashboard/fetchHospitalRevenue",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${catalystURL}/admin/revenue`);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch hospitals data");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        appointmentState: {
            isLoading: false,
            appointmentsData: [],
            isError: null,
        },
        doctorsState: {
            isLoading: false,
            doctorsData: [],
            isError: null,
        },
        hospitalsState: {
            isLoading: false,
            hospitalsData: [],
            isError: null,
        },
        hospitalsRevenueState: {
            isLoading: false,
            hospitalsRevenue: [],
            isError: null,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
         //Todo : appoinments
        builder 
            .addCase(fetchAppointmentsData.pending, (state) => {
                state.appointmentState.isLoading = true;
                state.appointmentState.isError = null;
            })
            .addCase(fetchAppointmentsData.fulfilled, (state, action) => {
                state.appointmentState.isLoading = false;
                state.appointmentState.appointmentsData = action.payload;
            })
            .addCase(fetchAppointmentsData.rejected, (state, action) => {
                state.appointmentState.isLoading = false;
                state.appointmentState.isError = action.payload || "Unknown error from appoinments api";
            }) 
            //Todo : doctors
            .addCase(fetchDoctersData.pending, (state) => {
                state.doctorsState.isLoading = true;
                state.doctorsState.isError = null;
            })
            .addCase(fetchDoctersData.fulfilled, (state, action) => {
                state.doctorsState.isLoading = false;
                state.doctorsState.doctorsData = action.payload;
            })
            .addCase(fetchDoctersData.rejected, (state, action) => {
                state.doctorsState.isLoading = false;
                state.doctorsState.isError = action.payload || "Unknown error from doctors api";
            })
            //Todo : hospitals
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
                state.hospitalsState.isError = action.payload || "Unknown error from hospitals api";
            })
            //Todo : hospitals Revenue
            .addCase(fetchHospitalRevenue.pending, (state) => {
                state.hospitalsRevenueState.isLoading = true;
                state.hospitalsRevenueState.isError = null;
            })
            .addCase(fetchHospitalRevenue.fulfilled, (state, action) => {
                state.hospitalsRevenueState.isLoading = false;
                state.hospitalsRevenueState.hospitalsRevenue = action.payload;
            })
            .addCase(fetchHospitalRevenue.rejected, (state, action) => {
                state.hospitalsRevenueState.isLoading = false;
                state.hospitalsRevenueState.isError = action.payload || "Unknown error from revenue api";
            });
    },
});

export default dashboardSlice.reducer;
