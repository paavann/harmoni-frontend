"use client";

import React from "react"
import { useGetUserActivityQuery } from "@/lib/redux/api/apiSlice"
import { Spinner } from "./ui/shadcn-io/spinner"




export type Activity = {
  id: string | number
  action: string
  action_display: string
  created_at: string
  date: Date
}

const groupByMonth = (activities: Activity[]) => {
  return activities.reduce((groups: Record<string, Record<string, Activity[]>>, activity) => {
    const date = new Date(activity.created_at)

    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })
    const dayKey = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric"
    })

    if(!groups[monthYear]) groups[monthYear] = {}
    if(!groups[monthYear][dayKey]) groups[monthYear][dayKey] = []
    groups[monthYear][dayKey].push(activity)

    return groups
  }, {})
}


export default function HistoryBar() {
  const {data: activities, isLoading, isError} = useGetUserActivityQuery()
  
  if(isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full overflow-y-auto bg-gray-50 text-gray-800">
        <Spinner variant="ellipsis" className="h-20 w-20 text-green-400" />
      </div>
    )    
  }
  if(isError) {
    return (
      <div className="w-full h-full overflow-y-auto bg-gray-50 text-gray-800">
        <h1 className="text-xl justify-self-center place-self-center">error loading your activity...</h1>
      </div>
    )    
  }

  const parsedActivities: Activity[] = activities?.map(act => ({
    ...act,
    date: new Date(act.created_at)
  })) || []
  if(!parsedActivities || parsedActivities.length===0) {
    return (
      <div className="w-full h-full overflow-y-auto bg-gray-50 text-gray-800">
        <h1 className="text-xl justify-self-center place-self-center">no activity yet...</h1>
      </div>
    )
  }

  const grouped = groupByMonth(parsedActivities)


  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 text-gray-800">
      {Object.entries(grouped).map(([monthYear, days]) => (
        <div key={monthYear}>
          <div className="p-1.5 bg-green-200">
            <h2 className="text-xs font-semibold text-green-800 uppercase tracking-wide">
              {monthYear}
            </h2>
          </div>
          {Object.entries(days).map(([dayKey, items]) => {
            const [weekday, day] = dayKey.split(" ")

            return (
              <div
                key={dayKey}
                className="flex border-b border-gray-200"
              >
                <div className="w-16 flex-shrink-0 text-center py-4 self=center">
                  <div>
                    <div className="text-xs text-gray-500 uppercase">{weekday}</div>
                    <div className="text-lg font-bold text-gray-800">{day}</div>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  {items.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-3 hover:bg-gray-100 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{activity.action.replace("_", " ")}</span>
                        <span>
                          {activity.date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 mt-1 leading-snug">
                        {activity.action_display}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}