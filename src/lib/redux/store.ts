import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from "./features/auth/authSlice"

import { loadState, saveState } from "./localStorage"



const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
})

export const makeStore = () => {

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(apiSlice.middleware),
        devTools: true,
    })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']