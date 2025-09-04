"use client";

import { useEffect } from "react"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectCurrentJournal } from "@/lib/redux/features/journal/journalSlice"

export default function Journal() {
    const selectedJournal = useAppSelector(selectCurrentJournal)

    useEffect(() => {
        console.log("selected journal: ", selectedJournal)
    }, [])

    return (
        <div className="w-full h-full">
            <h1>{selectedJournal?.name}</h1>
            <h3>{selectedJournal?.description}</h3>
        </div>
    )
}