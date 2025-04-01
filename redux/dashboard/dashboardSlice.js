import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { catalystURL } from "../../constants";

//! Appointments (Admin/Doctors/Receptionist)
export const fetchAppointmentsData = createAsyncThunk(
    "dashboard/fetchAppointmentsData",
    async (url, { rejectWithValue }) => {
        try {
            const response = await fetch(url);

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
           
    },
});

export default dashboardSlice.reducer;
