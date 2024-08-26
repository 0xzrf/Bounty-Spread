import React from "react";
import { useRouter } from "next/navigation";
export const runtime = "edge";

const BountySpreadLogo = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-center hover:cursor-pointer"
      onClick={() => {
        router.push("/");
      }}
    >
      <div className="font-sans">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-white">Bounty</span>
          <span className="text-emerald-400">Spread</span>
        </h1>
      </div>
    </div>
  );
};

export default BountySpreadLogo;
