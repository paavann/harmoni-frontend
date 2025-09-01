"use client";

import createWebStorage from "redux-persist/lib/storage/createWebStorage"

interface NoopStorageReturnType {
    getItem: (key: string) => Promise<null>
    setItem: (key: string, value: any) => Promise<any>
    removeItem: (key: string) => Promise<void>
}


const createNoopStorage = (): NoopStorageReturnType => {

    return {
        getItem(_key: string) {
            return Promise.resolve(null)
        },
        setItem(_key: string) {
            return Promise.resolve()
        },
        removeItem(_key: string) {
            return Promise.resolve()
        }
    }
}

export const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage()
export default storage