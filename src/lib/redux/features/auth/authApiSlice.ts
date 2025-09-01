import { apiSlice } from "../../api/apiSlice"
import { setUser } from "./authSlice"
import { logoutUser } from "./authSlice"

interface LoginReq {
    email: string
    password: string
}



export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials: LoginReq) => ({
                url: 'users/auth/login/',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data.user))
                } catch(err) {
                    console.error("error setting user data: ", err)
                }
            },
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: 'users/register/',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data.user))
                } catch(err) {
                    console.error("error setting user data: ", err)
                }
            },            
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'users/auth/logout/',
                method: 'POST',
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logoutUser())
                } catch(err) {
                    console.error("error logging out user: ", err)
                }
            }
        })
    })
})

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApiSlice