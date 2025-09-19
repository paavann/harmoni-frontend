"use client";

import { useState, useRef } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import Link from "next/link"
import Image from "next/image"
import { IconPlus } from "@tabler/icons-react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setSelectedJournal } from "@/lib/redux/features/journal/journalSlice"
import { useCreateJournalMutation, useGetJournalsQuery } from "@/lib/redux/features/journal/journalApiSlice"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"




export default function JournalList() {
    const [journalName, setJournalName] = useState("")
    const [journalDescription, setJournalDescription] = useState("")
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()
    const {data: journals} = useGetJournalsQuery()
    const [createJournal] = useCreateJournalMutation()

    const handleSubmit = async (closeModal: () => void) => {
        try {
            const formData = new FormData()
            formData.append("name", journalName)
            formData.append("description", journalDescription)
            if(imageFile) formData.append("cover_image", imageFile)

            await createJournal(formData).unwrap()

            setJournalName("")
            setJournalDescription("")
            setImageFile(null)
            if(fileInputRef.current) fileInputRef.current.value=""

            closeModal()
        } catch(err) {
            console.error("error creating journal: ", err)
        }
    }


    return (
        <div className="w-full h-full flex flex-col p-5 items-center gap-1">
            <div className="w-full h-full">
                {journals?.map((journal, idx) => (
                    <Link
                        href={`/journal/${journal.name}`}
                        key={idx}
                        onClick={() => dispatch(setSelectedJournal(journal))}
                        className="contents"
                    >
                        <Card
                            className="
                                flex flex-row w-[70%] h-[27%]
                                rounded-2xl shadow-md place-self-center bg-gray-800
                                overflow-hidden transform transition-all duration-200 ease-in-out
                                hover:scale-[1.02] hover:shadow-xl active:scale-95 hover:cursor-pointer
                                mt-[2%] py-0
                            "
                        >
                            <div className="w-[30%] h-full relative">
                                <Image
                                    src={journal.cover_image ? journal.cover_image : "/uni.jpg"}
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
                                    <p><span className="font-medium">Entries:</span> {journal.total_entries}</p>
                                    <p><span className="font-medium">Last entry:</span> {journal.last_entry_date ? journal.last_entry_date : "-"}</p>
                                    <p><span className="font-medium">Last visited:</span> 24 aug 2025</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div
                        className="w-auto h-auto mt-2 flex items-center justify-center rounded-4xl bg-neutral-900 text-white hover:bg-neutral-800 active:bg-black-800 p-[1%] gap-2 pr-[1.5%] pl-[1.5%] hover:cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <IconPlus size={30} stroke={4} className="text-green-400" />
                        <h1 className="font-bold text-white text-xl">Create Journal</h1>
                    </div>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create a new Journal</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-1">
                            <label htmlFor="title" className="text-sm font-medium text-white">Title</label>
                            <Input
                                id="title"
                                placeholder="Journal Title"
                                value={journalName}
                                onChange={(e) => setJournalName(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-1">
                            <label htmlFor="description" className="text-sm font-medium text-white">Description</label>
                            <Input
                                id="description"
                                placeholder="Journal Description"
                                value={journalDescription}
                                onChange={(e) => setJournalDescription(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-1">
                            <label htmlFor="title" className="text-sm font-medium text-white">Upload Cover Image</label>
                            <Input
                                type="file"
                                id="coverImage"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                                className="border border-neutral-700 rounded-lg p-2 text-sm text-white bg-neutral-900 hover:bg-neutral-800"
                            />
                            {imageFile && <p className="text-green-400 text-sm mt-1">{imageFile.name} selected</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogTrigger asChild>
                            <Button onClick={(e) => handleSubmit(() => setOpen(false))}>
                                Create Journal
                            </Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}