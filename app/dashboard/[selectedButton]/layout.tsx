"use client";
import { useParams } from "next/navigation";
import Sidebar from "../../components/app/Sidebar";

export default function Layout({ children }: { children: any }) {
  const { selectedButton } = useParams();
  return (
    <div>
      <Sidebar selectedButton={selectedButton} />
      {children}
    </div>
  );
}
