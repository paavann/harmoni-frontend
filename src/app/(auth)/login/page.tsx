"use client";

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import { useLoginMutation } from "@/lib/redux/features/auth/authApiSlice"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setUser } from "@/lib/redux/features/auth/authSlice"
import { useAppSelector } from "@/lib/redux/hooks"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SerializedError } from "@reduxjs/toolkit"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const handleLogin = async (e: React.FormEvent, email: string, password: string) => {
    e.preventDefault()

    try {
      const { data } = await login({ email, password }).unwrap()
      dispatch(setUser(data.user))
      router.push('/home')
    } catch(err) {
      const error = err as FetchBaseQueryError | SerializedError
      
      if('status' in error) {
        if(!error.status) {
          throw new Error("No Server Response")
        } else if(error.status===400) {
          throw new Error("Missing Email or Password")
        } else {
          throw new Error("Login failed")
        }
      }
    }
  }


  useEffect(() => {
    if(user) {
      const from = searchParams.get('from') || '/home'
      router.push(from)
    } else {
      console.log("user not logged in.")
    }
  }, [user, router])

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm onLogin={handleLogin}/>
      </div>
    </div>
  )
}
