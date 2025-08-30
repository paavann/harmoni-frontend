import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"



const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8001',
    credentials: 'include',
})

export const apiSlice = createApi({
    baseQuery,
    endpoints: (builder) => ({
        checkSession: builder.query({
            query: () => 'users/auth/session/'
        }),
    }),
})

export const { useCheckSessionQuery } = apiSlice