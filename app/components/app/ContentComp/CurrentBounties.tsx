import React, { useState, useEffect } from 'react';
import axios from "axios";

type Bounty = {
  id: number;
  name: string;
  isActive: boolean;
  isVerified: boolean;
  submissions: {}[];
  createdAt: string;
};

interface BountiesTableProps {
  bounties: Bounty[];
}

export default function CurrentBounties() {
  const [bounties, setBounties] = useState<Bounty[]>([]);

  const fetchBounties = async () => {
    const response = await axios.get("http://localhost:3000/api/app/userBounties");
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
      <BountiesTable bounties={bounties} />
    </div>
  );
}

const BountiesTable: React.FC<BountiesTableProps> = ({ bounties }) => {
  // Filter unverified and verified bounties
  const unverifiedBounties = bounties.filter(bounty => !bounty.isVerified);
  const verifiedBounties = bounties.filter(bounty => bounty.isVerified);

  // Helper function to format date
  const formatDate = (date: string): string => new Date(date).toLocaleDateString();

  return (
    <div className="flex flex-col gap-10 min-h-screen w-full">
      {/* Unverified Bounties */}
      <div className="w-full bg-zinc-900 p-4 min-h-[50vh] rounded-lg shadow-md">
        <h2 className="text-emerald-500 font-semibold mb-4">Unverified Bounties</h2>
        <table className="min-w-full bg-zinc-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Bounty Name</th>
              <th className="py-2 px-4 text-left">Active</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {unverifiedBounties.map(bounty => (
              <tr key={bounty.id}>
                <td className="py-2 px-4 border-t border-zinc-700">{bounty.name}</td>
                <td className="py-2 px-4 border-t border-zinc-700">{bounty.isActive ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-t border-zinc-700">{formatDate(bounty.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verified Bounties */}
      <div className="w-full bg-zinc-900 p-4 rounded-lg shadow-md">
        <h2 className="text-emerald-500 font-semibold mb-4">Verified Bounties</h2>
        <table className="min-w-full bg-zinc-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Bounty Name</th>
              <th className="py-2 px-4 text-left">Active</th>
              <th className="py-2 px-4 text-left">Created At</th>
              <th className="py-2 px-4 text-left">Submissions</th>
              <th className="py-2 px-4 text-left">Link</th>
            </tr>
          </thead>
          <tbody>
            {verifiedBounties.map(bounty => (
              <tr key={bounty.id}>
                <td className="py-2 px-4 border-t border-zinc-700">{bounty.name}</td>
                <td className="py-2 px-4 border-t border-zinc-700">{bounty.isActive ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-t border-zinc-700">{formatDate(bounty.createdAt)}</td>
                <td className="py-2 px-4 border-t border-zinc-700">{bounty.submissions?.length}</td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  <a href="#" className="text-emerald-400 hover:underline">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
