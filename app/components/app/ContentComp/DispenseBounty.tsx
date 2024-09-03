import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

type BountyType = "Grant" | "Project" | "Bounty";
export const runtime = "edge";

type Bounty = {
  id: number;
  name: string;
  isActive: boolean;
  isVerified: boolean;
  sumbissions: {}[];
  winners: string[];
  prizes: number[];
  createdAt: string;
  type: BountyType;
};

interface BountiesTableProps {
  bounties: Bounty[];
  isPaid: boolean;
}

export default function DispenseBounty({ isPaid }: { isPaid: boolean }) {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [isBountiesAvailable, setIsBountiesAvailable] = useState(false);

  useEffect(() => {
    const fetchBountyData = async () => {
      try {
        const response = await axios.get(
          `${window.location.origin}/api/app/userBounties`
        );

        if (!response.data.success) {
          return;
        }

        // Filter bounties that are not active and are verified
        const filteredBounties = response.data.bounties.filter(
          (bounty: Bounty) => !bounty.isActive && bounty.isVerified
        );

        setBounties(filteredBounties);
        setIsBountiesAvailable(filteredBounties.length > 0);
        
      } catch (error) {
        console.error("Error fetching bounty data:", error);
      }
    };

    fetchBountyData();
  }, []);

  return (
    <div>
      <BountiesTable isPaid={isPaid} bounties={bounties} />
    </div>
  );
}

const BountiesTable: React.FC<BountiesTableProps> = ({ bounties, isPaid }) => {
  const [selectedType, setSelectedType] = useState<BountyType | null>(null);

  // Count entries by type
  const countByType = (type: BountyType) => {
    return bounties.filter(
      (bounty) => bounty.type === type
    ).length;
  };

  // Helper function to format date
  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString();

  // Function to filter and display bounties based on the selected type
  const getFilteredBounties = (bountiesArray: Bounty[]) => {
    return selectedType
      ? bountiesArray.filter((bounty) => bounty.type === selectedType)
      : bountiesArray;
  };

  // Function to render winners and prizes with enhanced styling
  const renderWinnersAndPrizes = (winners: string[], prizes: number[]) => {
    if (winners.length === 0) {
      return <span className="text-gray-400">No winners yet</span>;
    }

    return winners.map((winner, index) => (
      <div
        key={index}
        className="flex items-center justify-between py-1 px-2 bg-emerald-700 rounded-md mb-1"
      >
        <span className="text-emerald-200 font-semibold">{winner}</span>
        {prizes[index] !== undefined && (
          <span className="text-zinc-300 font-medium">{prizes[index]} SOL</span>
        )}
      </div>
    ));
  };

  // Function to render table rows or a message if no bounties exist
  const renderTableContent = (bountiesArray: Bounty[]) => {
    const filteredBounties = getFilteredBounties(bountiesArray);

    if (filteredBounties.length === 0) {
      return (
        <tr>
          <td colSpan={7} className="py-4 px-4 text-center text-emerald-500">
            No Active bounties yet!{" "}
            <a
              href="/dashboard/newBounty"
              className="underline hover:text-emerald-400 cursor-pointer"
            >
              Create One now
            </a>
          </td>
        </tr>
      );
    }

    return filteredBounties.map((bounty) => (
      <tr className="" key={bounty.id}>
        <td className="py-2 px-4 border-t border-zinc-700">{bounty.name}</td>
        <td className="py-2 px-4 border-t border-zinc-700">{bounty.type}</td>
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
          {renderWinnersAndPrizes(bounty.winners, bounty.prizes)}
        </td>
        <td className="py-2 px-4 border-t border-zinc-700">
          <a
            href={`https://dial.to/?action=solana-action%3A${encodeURIComponent(
              window.location.origin
            )}%2Fapi%2Fapp%2Factions%3Fid%3D${bounty.id}&cluster=devnet`}
            className="text-emerald-500 hover:text-emerald-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        </td>
      </tr>
    ));
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
              d="M13 16h-1v-4h-1m1-4h.01M12 12h.01M12 8h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9.03 4.03 9 9z"
            ></path>
          </svg>
          <span className="font-bold">
            To verify your Bounties faster, become a{" "}
            <Link href={"/dashboard/proMember"} className="underline">
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
              onClick={() =>
                setSelectedType(selectedType === type ? null : type)
              }
              className={`px-4 py-2 rounded ${
                selectedType === type
                  ? "bg-emerald-500 text-white"
                  : "bg-zinc-600 text-emerald-400"
              }`}
            >
              {type} ({countByType(type)})
            </button>
          ))}
        </div>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Active</th>
              <th className="py-2 px-4 text-left">Created</th>
              <th className="py-2 px-4 text-left">Submissions</th>
              <th className="py-2 px-4 text-left">Winners and Prizes</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableContent(bounties)}</tbody>
        </table>
      </div>
    </div>
  );
};
