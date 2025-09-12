import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params
    const journalName = decodeURIComponent(slug)

    return {
        title: journalName,
        description: `entries from ${journalName}`
    }
}

import Journal from "@/components/JournalPage"

export default function JournalPage({ params }: { params: { slug: string } }) {

    return (
        <div>
            <Journal />
        </div>
    )
}