import React, {useState, useEffect} from "react";
import Welcome from "./ContentComp/Welcome";
import ProMember from "./ContentComp/ProMember";
import NewBounty from "./ContentComp/NewBounty";
import CurrentBounties from "./ContentComp/CurrentBounties";
import Admin from "./ContentComp/Admin"
import axios from "axios"
// Empty array for default state

export default function MainContent({
  selectedButton,
}: {
  selectedButton: any;
}) {
  const [userData, setUserData] = useState<{email: string, userId: number} | null>(null);
 



  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:3000/api/app/user', {
        withCredentials: true
      })

      if (!response.data.success) {
        
      }

      
      setUserData({email: response.data.email, userId: response.data.userId})
    })()
  },[])

  


  const renderContent = () => {
    switch (selectedButton) {
      case "currentBounties":
        return <CurrentBounties />;
      case "newBounty":
        return <NewBounty />;
      case "proMember":
        return <ProMember />;
      case "admin":
          return <Admin userEmail={userData?.email}/>;
       default:
        return <Welcome />;
    }
  };
  if (!userData) {
    return null
  }
  return (
    
    <div className="ml-64 p-4 bg-zinc-800">
      <div className="border-4 border-dashed border-emerald-400 rounded-lg text-white p-10">
        {renderContent()}
      </div>
    </div>
  );
}
