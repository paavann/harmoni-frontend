import Header from "@/components/header";
import React from "react";

export default function JournalLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <div className="w-full h-full">
            <Header />
            {children}
        </div>
    )
}