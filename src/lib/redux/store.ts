import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from "./features/auth/authSlice"
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from "./ssrSafe-storage"



const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
}

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {

    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
                },
            }).concat(apiSlice.middleware),
        devTools: true,
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']