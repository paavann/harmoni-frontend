import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_SERVER_URL,
    credentials: 'include',
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Journal"],
    endpoints: (builder) => ({}),
})