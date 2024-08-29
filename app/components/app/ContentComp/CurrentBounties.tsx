import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

type BountyType = "Grant" | "Project" | "Bounty";
export const runtime = "edge";

type Bounty = {
  id: number;
  name: string;
  isActive: boolean;
  isVerified: boolean;
  sumbissions: {}[];
  createdAt: string;
  type: BountyType;
};

interface BountiesTableProps {
  bounties: Bounty[];
  isPaid: boolean;
}

const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;

export default function CurrentBounties({ isPaid }: { isPaid: boolean }) {
  const [bounties, setBounties] = useState<Bounty[]>([]);

  const fetchBounties = async () => {
    const response = await axios.get(
      `${window.location.origin}/api/app/userBounties`
    );
    return response.data.bounties;
  };

  useEffect(() => {
    (async () => {
      const response = await fetchBounties();
      setBounties(response);
    })();
  }, []);

  return (
    <div>
      <BountiesTable isPaid={isPaid} bounties={bounties} />
    </div>
  );
}

const BountiesTable: React.FC<BountiesTableProps> = ({ bounties, isPaid }) => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<BountyType | null>(null);

  // Filter unverified and verified bounties
  const unverifiedBounties = bounties.filter((bounty) => !bounty.isVerified);
  const verifiedBounties = bounties.filter((bounty) => bounty.isVerified);

  // Count bounties by type
  const countByType = (bountiesArray: Bounty[]) => {
    return bountiesArray.reduce((acc, bounty) => {
      acc[bounty.type] = (acc[bounty.type] || 0) + 1;
      return acc;
    }, {} as Record<BountyType, number>);
  };

  const unverifiedCounts = countByType(unverifiedBounties);
  const verifiedCounts = countByType(verifiedBounties);

  // Helper function to format date
  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString();

  // Filter bounties by selected type
  const getFilteredBounties = (bountiesArray: Bounty[]) => {
    return selectedType ? bountiesArray.filter(bounty => bounty.type === selectedType) : bountiesArray;
  };

  return (
    <div className="flex flex-col gap-10 min-h-screen w-full">
      {!isPaid && (
        <div className="flex items-center justify-center bg-zinc-700 text-emerald-400 p-4 rounded-md border border-yellow-400">
          <svg
            className="w-6 h-6 mr-2 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 12h.01M12 8h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            ></path>
          </svg>
          <span className="font-bold">
            To verify your Bounties faster, become a{" "}
            <Link
              href={"/dashboard/proMember"}
              className="underline"
            >
              Pro Member
            </Link>{" "}
            today!
          </span>
        </div>
      )}

      {/* Unverified Bounties */}
      <div className="w-full bg-zinc-900 p-4 min-h-[50vh] rounded-lg shadow-md">
        <h2 className="text-emerald-500 font-semibold mb-4">
          Unverified Bounties
        </h2>
        <div className="flex justify-between mb-4">
          {(["Grant", "Project", "Bounty"] as BountyType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={`px-4 py-2 rounded ${
                selectedType === type ? "bg-emerald-500 text-white" : "bg-zinc-700 text-white"
              }`}
            >
              {type} ({unverifiedCounts[type] || 0})
            </button>
          ))}
        </div>
        <table className="min-w-full bg-zinc-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Bounty Name</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Active</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredBounties(unverifiedBounties).map((bounty) => (
              <tr key={bounty.id}>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {bounty.name}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {bounty.type}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {bounty.isActive ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {formatDate(bounty.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verified Bounties */}
      <div className="w-full bg-zinc-900 p-4 min-h-[50vh] rounded-lg shadow-md">
        <h2 className="text-emerald-500 font-semibold mb-4">
          Verified Bounties
        </h2>
        <div className="flex justify-between mb-4">
          {(["Grant", "Project", "Bounty"] as BountyType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={`px-4 py-2 rounded ${
                selectedType === type ? "bg-emerald-500 text-white" : "bg-zinc-700 text-white"
              }`}
            >
              {type} ({verifiedCounts[type] || 0})
            </button>
          ))}
        </div>
        <table className="min-w-full bg-zinc-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Bounty Name</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Active</th>
              <th className="py-2 px-4 text-left">Created At</th>
              <th className="py-2 px-4 text-left">Submissions</th>
              <th className="py-2 px-4 text-left">Link</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredBounties(verifiedBounties).map((bounty) => (
              <tr
                onClick={() => {
                  router.push(`/dashboard/currentBounties/${bounty.id}`);
                }}
                className="hover:bg-gray-500 hover:cursor-pointer"
                key={bounty.id}
              >
                <td className="py-2 px-4 border-t border-zinc-700">
                  {bounty.name}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {bounty.type}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {bounty.isActive ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {formatDate(bounty.createdAt)}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {bounty.sumbissions?.length}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  <a
                    href={`https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3001%2Fapi%2Fapp%2Factions%3Fid%3D${bounty.id}&cluster=devnet`}
                    className="text-emerald-400 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};