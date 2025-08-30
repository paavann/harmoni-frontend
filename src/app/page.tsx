"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useCheckSessionQuery } from "@/lib/redux/api/apiSlice";
import { logout, setUser } from "@/lib/redux/features/auth/authSlice";



export default function App() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data, error } = useCheckSessionQuery({})


  useEffect(() => {
    if(data) {
      dispatch(setUser(data.user))
      router.push('/home')
    } else if(error) {
      dispatch(logout())
    }
  }, [data, error, dispatch])

  return (
    <div className="flex justify-center flex-col gap-5 font-bold w-full h-full">
      <h1 className="text-4xl text-green-400 place-self-center mt-[25%]">harmoni</h1>
      <Button className="place-self-center"><Link href="/login">login</Link></Button>
    </div>
  );
}
