"use client";

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useLogoutMutation } from "@/lib/redux/features/auth/authApiSlice"
import { useGetJournalsQuery } from "@/lib/redux/features/journal/journalApiSlice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectCurrentJournal, setSelectedJournal } from "@/lib/redux/features/journal/journalSlice"
import Calendar from "@/components/Calendar";



export default function Home() {
    const router = useRouter()
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const { data: journals } = useGetJournalsQuery()
    const selectedJournal = useAppSelector(selectCurrentJournal)

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const result = await logout().unwrap()
            router.push('/login')
        } catch(err) {
            console.log("error signing out: ", err)
        }
    }


    useEffect(() => {
        if(journals && journals.length>0 && !selectedJournal) {
            dispatch(setSelectedJournal(journals[0]))
        }
    }, [journals, selectedJournal, dispatch])

    return (
        <div className=" flex flex-row justify-between w-full h-full p-[1%]">
            <div className="w-[30%]">
                <Calendar />
            </div>
            <div className="flex flex-col h-full w-[70%] contents p-5">
                {journals?.map((journal, idx) => (
                    <Link
                        href={`/journal/${journal.id}`}
                        key={idx}
                        onClick={() => dispatch(setSelectedJournal(journal))}
                        className="contents"
                    >
                        <Card
                            className="
                                flex flex-row w-[70%] h-[23%]
                                rounded-2xl shadow-md place-self-end bg-gray-800
                                overflow-hidden transform transition-all duration-200 ease-in-out
                                hover:scale-[1.02] hover:shadow-xl active:scale-95 hover:cursor-pointer
                                mt-[2%]
                            "
                        >
                            <div className="w-[30%] h-full relative">
                                <Image
                                    src="/Journal.png"
                                    alt="journal icon"
                                    width={200}
                                    height={200}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <CardContent className="flex flex-col justify-between w-[70%] p-4 relative self-center">
                                <div>
                                    <h3 className="text-2xl font-semibold text-white">{journal.name}</h3>
                                    <p className="text-l text-muted-foreground">
                                        {journal.description}
                                    </p>
                                </div>

                                <div className="mt-4 text-sm space-y-1 text-white">
                                    <p><span className="font-medium">Entries:</span> 42</p>
                                    <p><span className="font-medium">Last entry:</span> 23 aug 2025</p>
                                    <p><span className="font-medium">Last visited:</span> 24 aug 2025</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}