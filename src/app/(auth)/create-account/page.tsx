"use client";

import React, { useEffect } from "react"
import { SignupForm } from "@/components/signup-form"
import { useRouter, useSearchParams } from "next/navigation"
import { useSignupMutation } from "@/lib/redux/features/auth/authApiSlice"
import { useAppSelector } from "@/lib/redux/hooks"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SerializedError } from "@reduxjs/toolkit"




export default function CreateAccount() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useAppSelector(state => state.auth.user)
  const [signup] = useSignupMutation()

  const handleSignup = async (e: React.FormEvent, name: string, email: string, password: string) => {
    e.preventDefault()
    try {
      await signup({ name, email, password }).unwrap()
      router.push('/home')
    } catch(err) {
      const error = err as FetchBaseQueryError | SerializedError
      if('status' in error) {
        if(!error.status) {
          throw new Error("No Server Response")
        } else if(error.status===400) {
          throw new Error("Missing Email or password")
        } else {
          throw new Error("Signup failed")
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
        <SignupForm onSignup={handleSignup}/>
      </div>
    </div>
  )
}