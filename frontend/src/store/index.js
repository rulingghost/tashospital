import { configureStore } from "@reduxjs/toolkit";
import patient from "./patient";
import modal from "./modal";
import CalendarSlice from "./calendarSlice";
import { chatApi } from "./chatAPI";
import patientAPI from "./patient2";
import authSlice from "./authSlice";
import { apiSlice } from "./unipileClient";


const store = configureStore({
    reducer: {
        patient,
        modal,
        auth: authSlice,
        calendar: CalendarSlice,
        [patientAPI.reducerPath]: patientAPI.reducer, 
        [chatApi.reducerPath]: chatApi.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
                .concat(patientAPI.middleware)
                .concat(chatApi.middleware)
                .concat(apiSlice.middleware),
})

export default store