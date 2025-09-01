"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useCheckSessionQuery } from "@/lib/redux/api/apiSlice";
import { setUser } from "@/lib/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/lib/redux/features/auth/authApiSlice";



export default function App() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data, error } = useCheckSessionQuery({})
  const [logout] = useLogoutMutation()

  const handleSessionError = async () => {
    try {
      await logout().unwrap()
    } catch(err) {
      console.error("failed to logout user: ", err)
    } finally {
      router.push('/login')
    }
  }


  useEffect(() => {
    if(data) {
      dispatch(setUser(data.user))
      router.push('/home')
    } else if(error) {
      handleSessionError()
    }
  }, [data, error, dispatch])

  return (
    <div className="flex justify-center flex-col gap-5 font-bold w-full h-full">
      <h1 className="text-4xl text-green-400 place-self-center mt-[25%]">harmoni</h1>
      <Button className="place-self-center"><Link href="/login">login</Link></Button>
    </div>
  );
}
