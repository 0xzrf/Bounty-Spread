'use client'

import React, { useState } from "react";
import Sidebar from "../../components/app/Sidebar";
import MainContent from "../../components/app/MainContent";
import { useParams } from "next/navigation";
function Dashboard() {
  const {selectedButton} = useParams();

  return (
    <div>
      <Sidebar selectedButton={selectedButton} />
      <MainContent  selectedButton={selectedButton} />
    </div>
  );
}

export default Dashboard;
