"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"



export default function App() {

  return (
    <div className="flex justify-center flex-col gap-5 font-bold w-full h-full">
      <h1 className="text-4xl text-green-400 place-self-center mt-[25%]">harmoni</h1>
      <Button className="place-self-center"><Link href="/login">login</Link></Button>
    </div>
  );
}
