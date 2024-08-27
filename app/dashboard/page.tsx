'use client'

import React from "react";
import Sidebar from "../components/app/Sidebar";
import MainContent from "../components/app/MainContent";
function Dashboard() {
  
  return (
    <div>
      <Sidebar  selectedButton={undefined} />
      <MainContent  selectedButton={null} />
    </div>
  );
}

export default Dashboard;
