import { Activity } from "@/components/history"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_SERVER_URL,
    credentials: 'include',
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Journal", "Activity"],
    endpoints: (builder) => ({
        getUserActivity: builder.query<Activity[], void>({
            query: () => "users/user-activities/",
            providesTags: ['Activity'],
        }),
    }),
})

export const { useGetUserActivityQuery } = apiSlice