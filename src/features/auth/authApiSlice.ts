import { apiSlice } from '@/app/api/apiSlice'


interface LoginReq {
    email: string
    password: string
}

interface LoginRes {
    access: string
    refresh: string
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginRes, LoginReq>({
            query: credentials => ({
                url: 'users/token/',
                method: 'POST',
                //passing the credentials as the body of request
                body: { ...credentials }
            })
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: 'users/register/',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
})

export const { useLoginMutation, useSignupMutation } = authApiSlice