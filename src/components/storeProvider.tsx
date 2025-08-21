"use client";

import { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore } from "@/lib/redux/store"
import type { AppStore } from "@/lib/redux/store"



export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null)

    if(!storeRef.current) {
        storeRef.current = makeStore()
    }

    return (
        <Provider store={storeRef.current}>{children}</Provider>
    )
}