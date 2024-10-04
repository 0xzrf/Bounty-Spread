import React, { useState, useEffect } from "react";
import Welcome from "./ContentComp/Welcome";
import ProMember from "./ContentComp/ProMember";
import NewBounty from "./ContentComp/NewBounty";
import CurrentBounties from "./ContentComp/CurrentBounties";
import Admin from "./ContentComp/Admin";
import axios from "axios";
import {toast, Toaster} from "sonner"
import Cookies from "js-cookie";
import DispenseBounty from "./ContentComp/DispenseBounty";
import Integrate from "../Integrate";
export const runtime = "edge";

type Bounty = {
  name: string;
  imageUrl: string;
  id: number;
}

export default function MainContent({
  selectedButton,
}: {
  selectedButton: any;
}) {
  const [userData, setUserData] = useState<{
    email: string;
    userId: number;
    isPaid: boolean;
    freeRemaining: number;
  } | null>(null);
  const cookie = Cookies.get("token");
  const [bounties, setBounties] = useState()

  useEffect(() => {
    (async () => {
      if (!cookie) {
        toast("Sign in first please");
      } else {
        const response = await axios.get(
          `${window.location.origin}/api/app/user`,
          {
            withCredentials: true,
          }
        );

        if (!response.data.success) {
        }

        setUserData({
          email: response.data.email,
          userId: response.data.userId,
          isPaid: response.data.isPaid,
          freeRemaining: response.data.freeRemaining,
        });
      }
    })();
  }, []);

  const renderContent = () => {
    switch (selectedButton) {
      case "currentBounties":
        return <CurrentBounties isPaid={userData?.isPaid as boolean} />;
      case "newBounty":
        return (
          <NewBounty
            isPaid={userData?.isPaid as boolean}
            freeRemaining={userData?.freeRemaining as number}
          />
        );
      case "proMember":
        return <ProMember />;
      case "admin":
        return <Admin userEmail={userData?.email} />;
      case "dispenseBounty":
        return <DispenseBounty isPaid={userData?.isPaid as boolean} />
      case "integrate":
        return <Integrate />
      default:
        return <Welcome />;
    }
  };
  return (
    <div className="ml-64 p-4 bg-zinc-800">
      <div className="border-4 border-dashed  border-emerald-400 rounded-lg text-white">
        {userData ? renderContent() : <div className="min-h-screen"></div>}
      </div>
      <Toaster/>
    </div>
  );
}
