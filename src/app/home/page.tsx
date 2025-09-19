import React from "react"
import HistoryBar from "@/components/history"
import JournalList from "@/components/journalList"



export default function Home() {

    return (
        <div className="w-full flex flex-row justify-between h-[92%]">
            <div className="w-[35%]">
                <HistoryBar />
            </div>
            <div className="h-full w-[55%] contents">
                <JournalList />
            </div>
        </div>
    )
}