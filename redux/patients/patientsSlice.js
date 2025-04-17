import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { catalystURL } from "../../constants";

//! Patients Info
export const fetchPatientsData = createAsyncThunk(
    "patients/fetchPatientsData",
    async (url = null, { rejectWithValue }) => {
        const URI = url ? url : `${catalystURL}/admin/patients` 
        try {
            const response = await fetch(URI);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch patients data");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//! Patients Info
export const fetchPatientTreatmentInfo = createAsyncThunk(
    "patients/fetchPatientTreatmentInfo",
    async (ROWID, { rejectWithValue }) => {
        const URI = `${catalystURL}doctor/patient/${ROWID}/history` 
        try {
            const response = await fetch(URI);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch patients data");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export const patientsSlice = createSlice({
    name: "patients",
    initialState: {
        patientsState: {
            isLoading: false,
            patientsData: [],
            isError: null,
        },
        patientsTreatmentHistory: {
            isLoading: false,
            patientsTreatmentData: [],
            isError: null,
        },
       
    },
    reducers: {},
    extraReducers: (builder) => {
         //Todo : patients
        builder 
            .addCase(fetchPatientsData.pending, (state) => {
                state.patientsState.isLoading = true;
                state.patientsState.isError = null;
            })
            .addCase(fetchPatientsData.fulfilled, (state, action) => {
                state.patientsState.isLoading = false;
                state.patientsState.patientsData = action.payload;
            })
            .addCase(fetchPatientsData.rejected, (state, action) => {
                state.patientsState.isLoading = false;
                state.patientsState.isError = action.payload || "Unknown error from patients api";
            }) 


              // Patient Treatment History
            .addCase(fetchPatientTreatmentInfo.pending, (state) => {
                state.patientsTreatmentHistory.isLoading = true;
                state.patientsTreatmentHistory.isError = null;
            })
            .addCase(fetchPatientTreatmentInfo.fulfilled, (state, action) => {
                state.patientsTreatmentHistory.isLoading = false;
                state.patientsTreatmentHistory.patientsTreatmentData = action.payload;
            })
            .addCase(fetchPatientTreatmentInfo.rejected, (state, action) => {
                state.patientsTreatmentHistory.isLoading = false;
                state.patientsTreatmentHistory.isError = action.payload || "Unknown error fetching treatment data";
            });
           
    },
});

export default patientsSlice.reducer;
