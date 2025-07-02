import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authReducer from '../features/auth/authSlice'
import { loadState, saveState } from './localStorage'
import { throttle } from 'lodash'


const persistedState = loadState()

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    preloadedState: persistedState,
})

store.subscribe(throttle(() => {
    saveState({
        auth: store.getState().auth
    })
}, 1000))

export type RootState = ReturnType<typeof store.getState>