"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/app/Sidebar";
import MainContent from "../../components/app/MainContent";
import { useParams } from "next/navigation";
function Dashboard() {
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    isLoading(true);
  }, []);

  const { selectedButton } = useParams();

  if (!loading) {
    return null;
  }
  return (
    <div>
      <Sidebar selectedButton={selectedButton} />
      <MainContent selectedButton={selectedButton} />
    </div>
  );
}

export default Dashboard;
