import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from "./features/auth/authSlice"

import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"



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
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
                },
            }).concat(apiSlice.middleware),
        devTools: true,
    })
    const persistor = persistStore(store)

    return { store, persistor }
}

export type AppStore = ReturnType<typeof makeStore>['store']
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type Persistor = ReturnType<typeof makeStore>['persistor']