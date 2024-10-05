"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import IDL from "../../../components/app/programData/idl.json";
import { DispenserProgram } from "../../../components/app/programData/type";
import { Connection, PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import MercuryoWidget from "@/app/components/app/MercuryoWidget";
import * as anchor from "@coral-xyz/anchor";
import {toast, Toaster} from "sonner"

import {
  Provider,
  AnchorProvider,
  web3,
  utils,
  BN,
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
  const [url, setUrl] = useState("")
  const router = useRouter();
  const wallet = useWallet();
  const connection = new Connection("https://api.devnet.solana.com");
  const [isFinishing, setIsFinishing] = useState(false);

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
  useEffect(() => {
    (async () => {
      setUrl(await MercuryoWidget(wallet.publicKey?.toString() as string)) 
    })()
  },[wallet.publicKey])

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
    setIsFinishing(true);
    toast("Initialting escrow program for safe dispensing🕛")
    if (amounts.some((amount) => amount <= 0)) {
      toast("All amounts must be greater than 0.");
      setIsFinishing(false);
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

      toast("Escrow created")
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
      setTimeout(() => {
        router.push("/dashboard/dispenseBounty");
      }, 4000)
    } catch (err) {
      toast("Internal server error");
      return;
    }
  };

  if (!bounty) {
    return <div className="text-emerald-400 min-h-screen flex items-center justify-center text-2xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 min-h-screen p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-zinc-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-400 mb-4 md:mb-0">
          {bounty.name} - Submissions
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              if (!url) {
                toast("Mercuryo widget not loaded")
                return
              }
              router.push(url)
            }}
            className="text-black hover:bg-emerald-500 bg-emerald-400 px-6 py-3 rounded-xl transition-all duration-300 font-semibold"
          >
            Don't have SOL?
          </button>
          <button
            onClick={handleFinishBounty}
            className={`text-black bg-emerald-400 px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
              winners.length === 0 || amounts.some(amount => amount <= 0) || isFinishing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-emerald-500"
            }`}
            disabled={winners.length === 0 || amounts.some(amount => amount <= 0) || isFinishing}
          >
            {isFinishing ? "Finishing Bounty..." : "Finish Bounty"}
          </button>
        </div>
      </div>

      {winners.length > 0 && (
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl text-emerald-400 font-bold mb-4">Selected Winners</h2>
          <h3 className="text-xl text-emerald-300 mb-4">Total Amount: {getTotalAmount().toFixed(2)} SOL</h3>
          <ul className="space-y-3">
            {winners.map((winner, index) => (
              <li
                key={winner.id}
                className="flex justify-between items-center p-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-all duration-300"
              >
                <span className="text-emerald-200">
                  {winner.candidPubKey.slice(0, 4) +
                    "..." +
                    winner.candidPubKey.slice(-4)}
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={amounts[index]}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                    className="w-24 p-2 mr-3 bg-zinc-600 text-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    min="0.01"
                    step="0.01"
                    required
                  />
                  <button
                    onClick={() => handleRemoveWinner(winner)}
                    className="text-red-400 hover:text-red-500 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="w-full bg-zinc-800 p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full text-emerald-200 rounded-lg overflow-hidden">
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
                <td className="py-4 px-6 border-t border-zinc-700">
                  {submission.candidPubKey.slice(0, 4) +
                    "..." +
                    submission.candidPubKey.slice(-4)}
                </td>
                <td className="py-4 px-6 border-t border-zinc-700">
                  {submission.username}
                </td>
                <td className="py-4 px-6 border-t border-zinc-700">
                  {submission.question.map((q, index) => (
                    <div key={index} className="mb-2">
                      {q}
                    </div>
                  ))}
                </td>
                <td className="py-4 px-6 border-t border-zinc-700">
                  {submission.answers.map((a, index) => (
                    <div key={index} className="mb-2">
                      {a}
                    </div>
                  ))}
                </td>
                <td className="py-4 px-6 border-t border-zinc-700">
                  <button
                    className={`opacity-0 group-hover:opacity-100 ${
                      winners.find((winner) => winner.id === submission.id)
                        ? "text-red-400 hover:text-red-500"
                        : "text-emerald-400 hover:text-emerald-500"
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
        className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition duration-300 self-start"
      >
        Back to Current Bounties
      </button>
    </div>
  );
};

export default BountySubmissionsTable;