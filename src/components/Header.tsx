import { PanelLeftOpen } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LogOut } from '@/features/auth/authSlice'
import Profile from './Profile'



function Header() {
    const currDate = new Date()
    const formattedDate = `${String(currDate.getDate()).padStart(2, '0')} - ${String(currDate.toLocaleString('default', { month: 'short' }))} - ${currDate.getFullYear()}`

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = (): void => {
        dispatch(LogOut())
        localStorage.removeItem("state")
        navigate('/login')
    }

    return (
        <div className="w-full h-full bg-[#905fd4] p-2 flex justify-between items-center">
            <div className='w-[33.4%]'>
                <PanelLeftOpen
                    className="hover:cursor-pointer"
                    color='#ffffff'
                    strokeWidth={2}
                />
            </div>

            <div className="text-white font-semibold w-[33.4%] justify-center flex">
                Title, {formattedDate}
            </div>

            <Button variant="destructive" onClick={handleLogout}>
                LogOut
            </Button>

            <div className='flex w-[33.4%] justify-end' onClick={handleLogout}>
                <Profile username='pavan'/>
            </div>
        </div>
    )     
}

export default Header