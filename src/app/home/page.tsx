"use client";

import { Button } from "@/components/ui/button"
import React from "react"
import { useRouter } from "next/navigation"
import { useLogoutMutation } from "@/lib/redux/features/auth/authApiSlice"



export default function Home() {
    const router = useRouter()
    const [logout] = useLogoutMutation()

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const result = await logout().unwrap()
            router.push('/login')
        } catch(err) {
            console.log("error signing out: ", err)
        }
    }


    return (
        <div className="self-place-center w-full h-full">
            <span className="text-green-400">Home page</span>
            <Button onClick={handleLogout}>signout</Button>
        </div>
    )
}