"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import IDL from "../../../components/app/programData/idl.json";
import { DispenserProgram } from "../../../components/app/programData/type";
import { Connection, PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor"
import {toast, Toaster} from "sonner"

import {
  Provider,
  AnchorProvider,
  web3,
  utils,
  BN,
  Wallet,
  setProvider,
  Program,
} from "@coral-xyz/anchor";

export const runtime = "edge";

type Submission = {
  id: number;
  bountyId: string;
  candidPubKey: string;
  question: string[];
  answers: string[];
  username: string;
};

type Bounty = {
  id: string;
  name: string;
  isActive: boolean;
  isVerified: boolean;
  submissions: Submission[];
  createdAt: string;
};

const idlObject = JSON.parse(JSON.stringify(IDL));

const BountySubmissionsTable = () => {
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [winners, setWinners] = useState<Submission[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const wallet = useWallet();
  const connection = new Connection("https://api.devnet.solana.com");

  const getProgram = () => {
    const provider = new AnchorProvider(
      connection,
      //@ts-ignore
      wallet,
      AnchorProvider.defaultOptions()
    );
    setProvider(provider);
    return {
      program: new Program<DispenserProgram>(idlObject, provider),
      provider,
    };
  };

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
          toast("Bounty not found")
          console.error("Bounty not found");
        }
      } catch (error) {
        toast("Internal server error")
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
        submission.candidPubKey
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    }
  };

  const handleSelectWinner = (submission: Submission) => {
    if (winners.length < 5) {
      setWinners([...winners, submission]);
      setAmounts([...amounts, 0]);
      setUsernames([...usernames, submission.username]);
    } else {
      toast("You can only select up to 5 winners.");
    }
  };

  const handleRemoveWinner = (submission: Submission) => {
    const index = winners.findIndex((winner) => winner.id === submission.id);
    if (index !== -1) {
      const newWinners = winners.filter((winner) => winner.id !== submission.id);
      const newAmounts = amounts.filter((_, i) => i !== index);
      const newUsernames = usernames.filter((_, i) => i !== index);
      setWinners(newWinners);
      setAmounts(newAmounts);
      setUsernames(newUsernames);
    }
  };

  const handleAmountChange = (index: number, value: string) => {
    const newAmount = parseFloat(value);
    if (!isNaN(newAmount) && newAmount > 0) {
      const newAmounts = [...amounts];
      newAmounts[index] = newAmount;
      setAmounts(newAmounts);
    }
  };

  const getTotalAmount = () => {
    return amounts.reduce((sum, amount) => sum + amount, 0);
  };

  const handleFinishBounty = async () => {
    if (amounts.some((amount) => amount <= 0)) {
      toast("All amounts must be greater than 0.");
      return;
    }
    const id = Math.floor(Math.random() * 1000)
    const escrowId = new anchor.BN(id)
    try {
      const {program, provider} = getProgram()
      const winnerKeypair = winners.map((item) => new PublicKey(item.candidPubKey))
      const amountArr = amounts.map((item) => new BN(item * web3.LAMPORTS_PER_SOL))
      const [escrowPda] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("escrow"), wallet?.publicKey?.toBuffer() as Buffer, escrowId.toArrayLike(Buffer, "le", 8) ],
        program.programId
      );

      const [vaultPda] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("escrow_vault"),wallet?.publicKey?.toBuffer() as Buffer, escrowId.toArrayLike(Buffer, "le", 8)],
        program.programId
      );

      await program.methods.initializeEscrow(escrowId, winnerKeypair, amountArr)
      .accountsStrict({
        host: wallet.publicKey as PublicKey,
        escrow: escrowPda,
        escrowVault: vaultPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

      console.log("Heck yeah")
      toast("Passed transaction.")
    } catch (err ){
      toast("Couldn't create an escrow")
      console.log(err)
      return
    }

    try {
      const response = await axios.post(
        `${window.location.origin}/api/app/finishBounty`,
        {
          id: bountyId,
          winners: winners.map((item) => item.candidPubKey ),
          prizes: amounts,
          usernames: usernames,
          escrowId: id
        }
      );

      if (!response.data.success) {
        toast(response.data.msg);
        return;
      }
      toast(response.data.msg);
      router.push("/dashboard/dispenseBounty");
    } catch (err) {
      toast("Internal server error");
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
            winners.length === 0 || amounts.some(amount => amount <= 0)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-emerald-500"
          }`}
          disabled={winners.length === 0 || amounts.some(amount => amount <= 0)}
        >
          Finish Bounty
        </button>
      </div>
      {winners.length > 0 && (
        <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
          <h2 className="text-emerald-500 font-bold mb-4">Selected Winners</h2>
          <h3 className="text-emerald-400 mb-2">Total Amount: {getTotalAmount().toFixed(2)}</h3>
          <ul>
            {winners.map((winner, index) => (
              <li
                key={winner.id}
                className="flex justify-between items-center p-2 hover:bg-zinc-700 rounded-lg"
              >
                <span>
                  {winner.candidPubKey.slice(0, 4) +
                    "..." +
                    winner.candidPubKey.slice(-4)}
                </span>
                <input
                  type="number"
                  value={amounts[index]}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  className="w-24 p-1 mr-2 bg-zinc-700 text-white rounded"
                  min="0.01"
                  step="0.01"
                  required
                />
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
              <th className="py-3 px-4 text-left">X handle</th>
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
                <td className="py-10 px-6 border-t border-zinc-700 align-top">
                  {submission.candidPubKey.slice(0, 4) +
                    "..." +
                    submission.candidPubKey.slice(-4)}
                </td>
                <td className="py-3 px-4 border-t border-zinc-700">
                  {submission.username}
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