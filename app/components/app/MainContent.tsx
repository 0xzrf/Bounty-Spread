import React, { useState, useEffect } from "react";
import Welcome from "./ContentComp/Welcome";
import ProMember from "./ContentComp/ProMember";
import NewBounty from "./ContentComp/NewBounty";
import CurrentBounties from "./ContentComp/CurrentBounties";
import Admin from "./ContentComp/Admin";
import axios from "axios";
import Cookies from "js-cookie";

export default function MainContent({
  selectedButton,
}: {
  selectedButton: any;
}) {
  const [userData, setUserData] = useState<{
    email: string;
    userId: number;
    isPaid: boolean;
    freeRemaining: number
  } | null>(null);
  const cookie = Cookies.get("token");

  useEffect(() => {
    (async () => {
      if (!cookie) {
        alert("Some")
      } else {
        const response = await axios.get("http://localhost:3001/api/app/user", {
          withCredentials: true,
        });
  
        if (!response.data.success) {
        }
  
        setUserData({ email: response.data.email, userId: response.data.userId, isPaid: response.data.isPaid, freeRemaining: response.data.freeRemaining });

      }
    })();
  }, []);

  const renderContent = () => {
    switch (selectedButton) {
      case "currentBounties":
        return <CurrentBounties isPaid={userData?.isPaid as boolean} />;
      case "newBounty":
        return <NewBounty isPaid={userData?.isPaid as boolean} freeRemaining={userData?.freeRemaining as number} />;
      case "proMember":
        return <ProMember  />;
      case "admin":
        return <Admin userEmail={userData?.email} />;
      default:
        return <Welcome />;
    }
  };
  if (!userData) {
    return null;
  }
  return (
    <div className="ml-64 p-4 bg-zinc-800">
      <div className="border-4 border-dashed border-emerald-400 rounded-lg text-white p-10">
        {renderContent()}
      </div>
    </div>
  );
}
