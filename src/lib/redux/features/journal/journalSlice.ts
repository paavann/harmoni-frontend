import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

export interface Journal {
    id: number,
    name: string,
    description: string,
    created_at: string,
}

export interface JournalState {
    selectedJournal: Journal | null,
    filters: Object,
}



const initialState: JournalState = {
    selectedJournal: null,
    filters: {},
}

const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        setSelectedJournal: (state, action: PayloadAction<Journal>) => {
            state.selectedJournal = action.payload
        },
    }
})

export const { setSelectedJournal } = journalSlice.actions
export default journalSlice.reducer

export const selectCurrentJournal = (state: RootState) => state.journal.selectedJournal