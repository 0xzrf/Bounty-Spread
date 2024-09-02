"use client";
import React ,{useState, useEffect} from "react"
import { useParams } from "next/navigation";
import axios from "axios"
export const runtime = "edge";


export default function Layout({ children }: {children : any}) {

  const { selectedButton } = useParams();

  return (
    <div className="ml-64 bg-zinc-800">
    <div className="border-4 border-dashed  border-emerald-400 rounded-lg text-white p-10">
      {children}
    </div>
  </div>
  );
}
