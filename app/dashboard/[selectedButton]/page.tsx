"use client";

import React, { useEffect, useState } from "react";
import MainContent from "../../components/app/MainContent";
export const runtime = "edge";

import { useParams } from "next/navigation";
function Dashboard() {
  const { selectedButton } = useParams();

  return (
    <div className="">
      <div>
        <MainContent selectedButton={selectedButton} />
      </div>
    </div>
  );
}

export default Dashboard;
