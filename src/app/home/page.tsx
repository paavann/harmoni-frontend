import React from "react"
import Calendar from "@/components/Calendar"
import JournalList from "@/components/journalList"



export default function Home() {

    return (
        <div className="w-full flex flex-row justify-between h-[92%] p-[1%]">
            <div className="w-[25%]">
                <Calendar />
            </div>
            <div className="h-full w-[65%] contents">
                <JournalList />
            </div>
        </div>
    )
}