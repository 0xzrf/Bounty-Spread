'use client'

import React, { useState } from "react";
import Sidebar from "../components/app/Sidebar";
import MainContent from "../components/app/MainContent";
function Dashboard() {
  
  const [selectedButton,setSelectedButton] = useState<"currentBounties" | "newBounty" | "proMember" |null>(null);
  return (
    <div>
      <Sidebar  selectedButton={undefined} />
      <MainContent  selectedButton={null} />
    </div>
  );
}

export default Dashboard;
