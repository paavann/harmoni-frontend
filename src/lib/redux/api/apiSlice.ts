import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { setCredentials, LogOut } from "../features/auth/authSlice"

import type { RootState } from "../store"
import { User } from "../features/auth/authSlice"



interface RefreshResponse {
    access: string
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => { //headers, api: {}
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => { //BaseQueryFn<args, result, error>
    let result = await baseQuery(args, api, extraOptions)

    //if the access token fails
    if (result?.error?.status === 403) {
        console.log("sending for refresh token...")
        const refreshResult = await baseQuery('/token/refresh', api, extraOptions)

        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.user as User
            const refreshData = refreshResult.data as RefreshResponse
            api.dispatch(setCredentials({ user, accessToken: refreshData.access }))

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(LogOut())
        }
    }

    return result
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
})