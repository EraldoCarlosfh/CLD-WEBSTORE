"use client";

import Header from "@/components/ui/header";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const {data} = useSession();
  return (
   <div className="capitalize">
   
   </div>
  );
}
