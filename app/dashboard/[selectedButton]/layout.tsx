"use client";
import React ,{useState, useEffect} from "react"
import { useParams } from "next/navigation";
import Sidebar from "../../components/app/Sidebar";
import axios from "axios"

export default function Layout({ children }: {children : any}) {
  const [userData, setUserData] = useState<{email: string, userId: number} | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:3000/api/app/user', {
        withCredentials: true
      })

      if (!response.data.success) {
        
      }
      console.log("response data", response.data.email)
      
      setUserData({email: response.data.email, userId: response.data.userId})
      console.log(":::::",userData);
    })()

  },[])

  const { selectedButton } = useParams();

  return (
    <div>
      {
        userData && 
        <div>
          <Sidebar userData={userData} selectedButton={selectedButton} />
          {children}
        </div>
      }
    </div>
  );
}
