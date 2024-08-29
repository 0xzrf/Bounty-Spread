"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

type Submission = {
  id: number;
  bountyId: number;
  candidPubKey: string;
  question: string[];
  answers: string[];
};

type Bounty = {
  id: number;
  name: string;
  isActive: boolean;
  isVerified: boolean;
  sumbissions: Submission[];
  createdAt: string;
};

const BountySubmissionsTable = () => {
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const router = useRouter();

  let { submissionId: bountyId } = useParams();
  const parsedBountyId = parseInt(bountyId as string);

  useEffect(() => {
    const fetchBountyData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/app/userBounties"
        );
        const selectedBounty = response.data.bounties.find(
          (b: Bounty) => b.id === parsedBountyId
        );
        if (selectedBounty) {
          setBounty(selectedBounty);
        } else {
          console.error("Bounty not found");
        }
      } catch (error) {
        console.error("Error fetching bounty data:", error);
      }
    };

    fetchBountyData();
  }, [parsedBountyId]);

  if (!bounty) {
    return <div className="text-white">Loading...</div>;
  }

  // Group submissions by candidPubKey
  const groupedSubmissions = bounty.sumbissions.reduce((acc, submission) => {
    if (!acc[submission.candidPubKey]) {
      acc[submission.candidPubKey] = submission;
    }
    return acc;
  }, {} as Record<string, Submission>);

  return (
    <div className="flex flex-col gap-10 ml-64 min-h-screen bg-zinc-900 p-8">
      <h1 className="text-3xl font-bold text-emerald-500 mb-6">
        {bounty.name} - Submissions
      </h1>
      <div className="w-full bg-zinc-900 p-4 rounded-lg shadow-md">
        <table className="min-w-full bg-zinc-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Candidate Public Key</th>
              <th className="py-2 px-4 text-left">Question</th>
              <th className="py-2 px-4 text-left">Answer</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedSubmissions).map((submission) => (
              <tr key={submission.id} className="hover:bg-zinc-700">
                <td className="py-2 px-4 border-t border-zinc-700 align-top">
                  {submission.candidPubKey}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {submission.question.map((q, index) => (
                    <div key={index} className="mb-2">
                      {q}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-t border-zinc-700">
                  {submission.answers.map((a, index) => (
                    <div key={index} className="mb-2">
                      {a}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => router.push("/dashboard/currentBounties")}
        className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Back to Current Bounties
      </button>
    </div>
  );
};

export default BountySubmissionsTable;
