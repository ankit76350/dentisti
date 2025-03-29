import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";
import userReducer from "./user/userSlice";
import patientsReducer from "./patients/patientsSlice";
import billsReducer from "./bills/billsSlice";

export const rdxStore = configureStore({
    reducer: {
        dashboard: dashboardReducer,  
        user: userReducer,  
        patients: patientsReducer,  
        bills: billsReducer,  
    },
});
