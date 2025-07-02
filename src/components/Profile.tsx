import { useEffect, useState } from 'react'

type ProfileProps = {
    username: string
}



const getGreeting = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
        return "Good Morning"
    } else if (hour >= 12 && hour < 17) {
        return "Good Afternoon"
    } else {
        return "Good Evening"
    }
}

function Profile({ username }: ProfileProps) {
    const [greeting, setGreeting] = useState(getGreeting())

    useEffect(() => {
        const interval = setInterval(() => {
            setGreeting(getGreeting())
        }, 60 * 60 * 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='items-center gap-3 bg-gray-700 rounded-full px-4 py-2 shadow-md hover:shadow-xl cursor-pointer'>
            <span className='font-bold text-white'>
                {greeting}, {username}
            </span>
        </div>
    )
}

export default Profile