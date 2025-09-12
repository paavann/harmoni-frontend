"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react"
import { useAppSelector } from "@/lib/redux/hooks"
import { useRouter } from "next/navigation"
import { useLogoutMutation } from "@/lib/redux/features/auth/authApiSlice"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { DropdownMenuTrigger, Item } from "@radix-ui/react-dropdown-menu"




const getGreeting = () => {
    const hour = new Date().getHours()
    if(hour>=5 && hour<12) {
        return "Good Morning"
    } else if(hour>=12 && hour<17) {
        return "Good Afternoon"
    } else {
        return "Good Evening"
    }
}

export default function Header() {
    const [greeting, setGreeting] = useState(getGreeting())
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [triggerWidth, setTriggerWidth] = useState<number>(0)
    const router = useRouter()
    const [logout] = useLogoutMutation()
    const user = useAppSelector(state => state.auth.user)

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await logout().unwrap()
            router.push('/login')
        } catch(err) {
            console.log("error signing out: ", err)
        }
    }

    const menuItems = [
        { label: "Profile", onClick: () => console.log("profile button clicked!") },
        { label: "Settings", onClick: () => console.log("settings button clicked!") },
        { label: "Logout", onClick: handleLogout, style: { color: "red" }, className: "bg-red" },
    ]

    
    useEffect(() => {
        const interval = setInterval(() => {
            setGreeting(getGreeting())
        }, 60*60*1000)
        return () => clearInterval(interval)
    }, [])

    useLayoutEffect(() => {
        if(triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth)
        }
    }, [user?.name, greeting])

    return (
        <div className="h-[8vh] w-full bg-green-500 flex flex-row items-center">
            <div className="h-full relative self-center w-[33%]"></div>
            <div className="h-full w-[33%]">
                <h1 className="text-4xl font-black text-white justify-self-center self-center mt-[2%]">Harmoni.</h1>
            </div>
            <div className="w-[33.4%]">
                <DropdownMenu>
                    <div className="justify-self-end w-fit mr-[3%]">
                        <DropdownMenuTrigger
                            ref={triggerRef}
                            className="p-2 hover:cursor-pointer font-extrabold text-gray-800 text-2xl whitespace-nowrap"
                        >
                            {greeting}, {user?.name}
                        </DropdownMenuTrigger>
                    </div>

                    <DropdownMenuContent
                        className="bg-[#FAFAFF] border border-gray-200 rounded-lg shadow-lg"
                        style={{ minWidth: triggerWidth }}
                    >
                        {menuItems.map((item) => (
                            <DropdownMenuItem
                                key={item.label}
                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${item?.className || ""} font-extrabold`}
                                onClick={item.onClick}
                                style={item?.style}
                            >
                                {item.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}