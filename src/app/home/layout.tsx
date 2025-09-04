import React from "react"
import Header from "@/components/header"


export default function HomeLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <div className="h-[100vh] w-[100vw]">
            <Header />
            {children}
        </div>
    )
}