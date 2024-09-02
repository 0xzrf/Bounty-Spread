'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Check, X } from "lucide-react";

export const runtime = "edge";

type Submission = {
  id: number;
  bountyId: string;
  candidPubKey: string;
  question: string[];
  answers: string[];
};

type Bounty = {
  id: string;
  name: string;
  isActive: boolean;
  isVerified: boolean;
  submissions: Submission[];
  createdAt: string;
};

const BountySubmissionsTable = () => {
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [winners, setWinners] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  let { submissionId: bountyId } = useParams();
  const parsedBountyId = bountyId;

  useEffect(() => {
    const fetchBountyData = async () => {
      try {
        const response = await axios.get(
          `${window.location.origin}/api/app/userBounties`
        );
        const selectedBounty = response.data.bounties.find(
          (b: Bounty) => b.id === parsedBountyId
        );
        if (selectedBounty) {
          setBounty(selectedBounty);
          setFilteredSubmissions(selectedBounty.sumbissions);
        } else {
          console.error("Bounty not found");
        }
      } catch (error) {
        console.error("Error fetching bounty data:", error);
      }
    };

    fetchBountyData();
  }, [parsedBountyId]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    if (bounty) {
      const filtered = bounty.submissions.filter((submission) =>
        submission.candidPubKey.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    }
  };

  const handleSelectWinner = (submission: Submission) => {
    if (winners.length < 5) {
      setWinners([...winners, submission]);
    } else {
      alert("You can only select up to 5 winners.");
    }
  };

  const handleRemoveWinner = (submission: Submission) => {
    setWinners(winners.filter((winner) => winner.id !== submission.id));
  };

  const handleFinishBounty = async () => {
    try {
      const response = await axios.post(
        `${window.location.origin}/api/app/finishBounty`,
        {
          id: bountyId,
          winners: winners.map((winner) => winner.candidPubKey),
        }
      );

      if (!response.data.success) {
        alert(response.data.msg);
        return;
      }
      alert(response.data.msg);
      router.push("/dashboard/dispenseBounties");
    } catch (err) {
      alert("Internal server error");
      return;
    }
  };

  if (!bounty) {
    return <div className="text-white min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-10 min-h-screen bg-zinc-900 p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-emerald-500">
          {bounty.name} - Submissions
        </h1>
        <button
          onClick={handleFinishBounty}
          className={`text-black bg-emerald-400 p-4 rounded-xl transition-all duration-300 ${
            winners.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-500"
          }`}
          disabled={winners.length === 0}
        >
          Finish Bounty
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by public key"
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 mb-4 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      {winners.length > 0 && (
        <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
          <h2 className="text-emerald-500 font-bold mb-4">Selected Winners</h2>
          <ul>
            {winners.map((winner) => (
              <li
                key={winner.id}
                className="flex justify-between items-center p-2 hover:bg-zinc-700 rounded-lg"
              >
                {winner.candidPubKey.slice(0, 4) +
                  "..." +
                  winner.candidPubKey.slice(-4)}
                <button
                  onClick={() => handleRemoveWinner(winner)}
                  className="text-red-500 ml-4 hover:text-red-600 transition-colors duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-full bg-zinc-900 p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full bg-zinc-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-zinc-700">
            <tr>
              <th className="py-3 px-4 text-left">Candidate Public Key</th>
              <th className="py-3 px-4 text-left">Question</th>
              <th className="py-3 px-4 text-left">Answer</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions?.map((submission) => (
              <tr
                key={submission.id}
                className="hover:bg-zinc-700 transition-colors duration-300 group"
              >
                <td className="py-3 px-4 border-t border-zinc-700 align-top">
                  {submission.candidPubKey.slice(0, 4) +
                    "..." +
                    submission.candidPubKey.slice(-4)}
                </td>
                <td className="py-3 px-4 border-t border-zinc-700">
                  {submission.question.map((q, index) => (
                    <div key={index} className="mb-2">
                      {q}
                    </div>
                  ))}
                </td>
                <td className="py-3 px-4 border-t border-zinc-700">
                  {submission.answers.map((a, index) => (
                    <div key={index} className="mb-2">
                      {a}
                    </div>
                  ))}
                </td>
                <td className="py-3 px-4 border-t border-zinc-700">
                  <button
                    className={`opacity-0 group-hover:opacity-100 ${
                      winners.find((winner) => winner.id === submission.id)
                        ? "text-red-500 hover:text-red-600"
                        : "text-emerald-500 hover:text-emerald-600"
                    } transition-all duration-300 flex items-center`}
                    onClick={() =>
                      winners.find((winner) => winner.id === submission.id)
                        ? handleRemoveWinner(submission)
                        : handleSelectWinner(submission)
                    }
                  >
                    {winners.find((winner) => winner.id === submission.id) ? (
                      <>
                        <X size={16} className="mr-1" />
                        Remove
                      </>
                    ) : (
                      <>
                        <Check size={16} className="mr-1" />
                        Select
                      </>
                    )}
                  </button>
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