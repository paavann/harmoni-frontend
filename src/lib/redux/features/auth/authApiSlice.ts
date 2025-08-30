import { apiSlice } from "../../api/apiSlice"
import { setUser } from "./authSlice"



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
                url: 'users/auth/register/',
                method: 'POST',
                body: credentials,
            })
        })
    })
})

export const { useLoginMutation, useSignupMutation } = authApiSlice