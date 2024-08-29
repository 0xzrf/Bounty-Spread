"use client";
import React ,{useState, useEffect} from "react"
import { useParams } from "next/navigation";
import Sidebar from "../../components/app/Sidebar";
import axios from "axios"
export const runtime = "edge";


export default function Layout({ children }: {children : any}) {

  const { selectedButton } = useParams();

  return (
    <div> 
        <div>
          <Sidebar  selectedButton={selectedButton} />
          {children}
        </div>
      
    </div>
  );
}
