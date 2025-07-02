import { useEffect } from 'react'
import { SignupForm } from '@/components/Signup-form'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken, setCredentials } from '@/features/auth/authSlice'
import { useSignupMutation } from '@/features/auth/authApiSlice'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)

    const [signup] = useSignupMutation()

    const handleSignUp = async (e: React.FormEvent, name: string, email: string, password: string) => {
        e.preventDefault()

        try {
            const userData = await signup({ name, email, password }).unwrap()
            dispatch(setCredentials({ user: { email }, accessToken: userData.acess }))
            navigate('/')
        } catch (err) {
            const error = err as FetchBaseQueryError | SerializedError

            if ('status' in error) {
                if (!error.status) {
                    throw new Error('No Server Response')
                } else if (error.status === 400) {
                    throw new Error('Missing fields')
                } else {
                    throw new Error('Signup failed')
                }
            }
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
            return
        } else {
            console.log("token doesn't exist.")
        }
    })

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <SignupForm onSignUp={handleSignUp} />
            </div>
        </div>
    )
}

export default Signup