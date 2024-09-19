import Link from "next/link";
import WalletButton from "../WalletButton";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import {toast, Toaster} from "sonner"
import axios from "axios";
import Cookies from "js-cookie";
export const runtime = "edge";

export default function NotSignedIn() {
  const router = useRouter();
  const { publicKey, signMessage } = useWallet();
  const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;
  const { connect } = useWallet();
  async function signAndSend() {
    try {
      const message = new TextEncoder().encode(
        `You're a verified exceliWorker`
      );
      const signature = await signMessage?.(message);
      const response = await axios.post(
        `${window.location.origin}/api/signin`,
        {
          signature,
          pubKey: publicKey?.toString(),
        }
      );

      if (!response.data.success) {
        toast("Invalid user, please sign in ");
        router.push("/signin");
      }
      router.push("/dashboard");
    } catch (err) {
      toast("Unable to verify User");
      return;
    }
  }
  return (
    <div className="flex items-center w-[100vw] justify-center min-h-screen bg-zinc-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          You're not signed in
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          To access this page, you need to log in to your account.
        </p>
        <div
          onClick={() => {
            if (publicKey) {
              signAndSend();
            }
            connect();
          }}
        >
          <WalletButton />
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
