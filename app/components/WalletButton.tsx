"use client";
 
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
export const runtime = "edge";

export default function WalletButton() {
  return (
    <main className="flex items-center justify-center">
      <div className="border hover:border-slate-900 rounded">
        <WalletMultiButton style={{}} />
      </div>
    </main>
  );
}