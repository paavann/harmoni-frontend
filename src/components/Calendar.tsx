"use client";

import * as React from "react"
import { Calendar } from "./ui/calendar"
import { cn } from "@/lib/utils";




export default function homeCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div className="w-[300px] rounded-2xl border bg-white p-4 shadow-md">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={new Date()}
              className="rounded-lg"
              classNames={{
                months: "flex flex-col space-y-4",
                month: "space-y-4",
                caption: "flex justify-between items-center text-gray-800 font-medium",
                caption_label: "text-base font-semibold",
                nav: "flex items-center space-x-2",
                nav_button:
                  "h-8 w-8 rounded-full hover:bg-green-100 text-green-600 flex items-center justify-center transition",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                  "text-gray-500 w-9 font-medium text-sm flex items-center justify-center",
                row: "flex w-full mt-1",
                cell: cn(
                  "relative h-9 w-9 text-center text-sm rounded-lg cursor-pointer",
                  "hover:bg-green-100 focus:bg-green-200 focus:outline-none"
                ),
                day_selected:
                  "bg-green-600 text-white hover:bg-green-700 focus:bg-green-700",
                day_today: "border border-green-600 font-bold",
                day_outside: "text-gray-300",
        }}
            />
        </div>
    )
}