import type { Metadata } from "next"
import Journal from "@/components/JournalPage"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params
    const journalName = decodeURIComponent(slug)

    return {
        title: journalName,
        description: `entries from ${journalName}`
    }
}



export default function Entry({ params }: { params: { slug: string } }) {

    return (
        <div className="h-full w-full">
            <Journal />
        </div>
    )
}