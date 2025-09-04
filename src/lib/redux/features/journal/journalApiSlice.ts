import { apiSlice } from "../../api/apiSlice"
import type { Journal } from "./journalSlice"



export const journalApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getJournals: builder.query<Journal[], void>({
            query: () => ({ url: 'journals/', }),
            providesTags: ["Journal"],
        }),
    })
})

export const { useGetJournalsQuery } = journalApiSlice