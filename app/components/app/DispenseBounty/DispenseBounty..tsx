"use client"

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import { Provider, AnchorProvider, web3, utils, BN, Wallet, setProvider,Program} from '@coral-xyz/anchor';
import { Random } from './types';
import IDL from "./idl.json";
const idlObject = JSON.parse(JSON.stringify(IDL));
const runtime = "edge";

// Define interfaces for props
interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

// Basic Button component
const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
  >
    {children}
  </button>
);

// Basic Input component
const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

// Basic Alert component
const Alert: React.FC<AlertProps> = ({ children, className }) => (
  <div className={`p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 ${className}`}>
    {children}
  </div>
);

const PROGRAM_ID = idlObject.address;

const DispenseBounty: React.FC = () => {
  const wallet = useWallet();
  const [bountyAmount, setBountyAmount] = useState<string>('');
  const [winnerAddress, setWinnerAddress] = useState<string>('');
  const [bountyPDA, setBountyPDA] = useState<PublicKey | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (wallet.publicKey) {
      const provider = new AnchorProvider(new Connection('https://api.devnet.solana.com'), wallet, AnchorProvider.defaultOptions());
      const [pda] = PublicKey.findProgramAddressSync(
        [Buffer.from('bounty'), provider.publicKey.toBuffer()],
        PROGRAM_ID
      );
      setBountyPDA(pda);
    }     
  }, [wallet.publicKey]);

  const getProgram = () => {
    const connection = new Connection('https://api.devnet.solana.com');
    const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
    // Note: You need to replace 'YourIDL' with your actual IDL type
    return provider;
  };

  const createBounty = async (): Promise<void> => {
    try {
      const provider = getProgram();
      const program = new Program<Random>(idlObject, provider)
      
      const tx = await program.methods.createBounty(new BN(bountyAmount))
        .accounts({
          bounty: bountyPDA as PublicKey,
          creator: provider.publicKey as PublicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      setStatus(`Bounty created! Transaction: ${tx}`);
    } catch (error) {
      setStatus(`Error creating bounty: ${(error as Error).message}`);
    }
  };

  const selectWinner = async (): Promise<void> => {
    try {
      const provider = getProgram();
      const program = new Program<Random>(idlObject, provider)
      const tx = await program.methods.selectWinner(new PublicKey(winnerAddress))
        .accounts({
          bounty: bountyPDA as PublicKey,
          creator: wallet.publicKey as PublicKey,
        })
        .rpc();
      setStatus(`Winner selected! Transaction: ${tx}`);
    } catch (error) {
      setStatus(`Error selecting winner: ${(error as Error).message}`);
    }
  };

  const authorizeTransfer = async (): Promise<void> => {
    try {
      const provider = getProgram();
      const program = new Program<Random>(idlObject, provider)
      const tx = await program.methods.authorizationTransfer()
        .accounts({
          bounty: bountyPDA as PublicKey,
          creator: wallet.publicKey as PublicKey,
        })
        .rpc();
      setStatus(`Transfer authorized! Transaction: ${tx}`);
    } catch (error) {
      setStatus(`Error authorizing transfer: ${(error as Error).message}`);
    }
  };

  const claimBounty = async (): Promise<void> => {
    try {
      const provider = getProgram();
      const program = new Program<Random>(idlObject, provider)
      const tx = await program.methods.claimBounty()
        .accountsStrict({
          bounty: bountyPDA as PublicKey,
          creator: wallet.publicKey as PublicKey,
          winner: new PublicKey(winnerAddress),
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      setStatus(`Bounty claimed! Transaction: ${tx}`);
    } catch (error) {
      setStatus(`Error claiming bounty: ${(error as Error).message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Solana Bounty Program</h2>
      
      <Input
        type="number"
        placeholder="Bounty Amount (SOL)"
        value={bountyAmount}
        onChange={(e) => setBountyAmount(e.target.value)}
        className="mb-4"
      />
      
      <Button onClick={createBounty} className="w-full mb-4">
        Create Bounty
      </Button>
      
      <Input
        type="text"
        placeholder="Winner Address"
        value={winnerAddress}
        onChange={(e) => setWinnerAddress(e.target.value)}
        className="mb-4"
      />
      
      <Button onClick={selectWinner} className="w-full mb-4">
        Select Winner
      </Button>
      
      <Button onClick={authorizeTransfer} className="w-full mb-4">
        Authorize Transfer
      </Button>
      
      <Button onClick={claimBounty} className="w-full mb-4">
        Claim Bounty
      </Button>
      
      {status && (
        <Alert className="mt-4">
          {status}
        </Alert>
      )}
    </div>
  );
};

export default DispenseBounty;