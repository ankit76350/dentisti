import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";
import userReducer from "./user/userSlice";

export const rdxStore = configureStore({
    reducer: {
        dashboard: dashboardReducer,  
        user: userReducer,  
    },
});
