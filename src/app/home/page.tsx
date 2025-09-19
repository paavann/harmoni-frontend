import React from "react"
import ActivityBar from "@/components/activity"
import JournalList from "@/components/journalList"



export default function Home() {

    return (
        <div className="w-full flex flex-row justify-between h-[92%]">
            <div className="w-[35%]">
                <ActivityBar />
            </div>
            <div className="h-full w-[55%] contents">
                <JournalList />
            </div>
        </div>
    )
}