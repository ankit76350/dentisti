import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";

export const rdxStore = configureStore({
    reducer: {
        dashboard: dashboardReducer,  
    },
});
