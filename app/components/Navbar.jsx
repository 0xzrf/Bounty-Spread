"use client";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import BountySpreadLogo from "./Icon";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const runtime = "edge";

function Navbar() {
  const router = useRouter();
  const { publicKey, signMessage, wallets } = useWallet();
  const [index, setIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;

  const cookie = Cookies.get("token");

  async function signAndSend() {
    try {
      const message = new TextEncoder().encode(
        `You're signing to BountySpread`
      );
      const signature = await signMessage?.(message);
      console.log(signature);

      const response = await axios.post(
        `${window.location.origin}/api/signin`,
        {
          signature,
          pubKey: publicKey?.toString(),
        }
      );

      if (!response.data.success) {
        alert("Invalid user creds");
        router.push("/signup");
        return;
      }
      alert(response.data.msg);
      router.push("/dashboard/newBounty");
    } catch (err) {
      alert("Unable to verify User");
      return;
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 w-full bg-zinc-900 bg-opacity-80 z-50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <div
          className={`h-14 flex justify-between items-center transition-all duration-1000 ease-in-out ${
            !isScrolled
              ? "border-b-[1px] border-b-zinc-600"
              : "border-b-[1px] border-b-transparent"
          }`}
        >
          <div className="flex gap-12 font-extralight text-sm justify-center">
            <BountySpreadLogo />
            {["Home", "", "Explore Bounties"].map((elem, i) => {
              return (
                <React.Fragment key={i}>
                  {elem.length ? (
                    <div
                      onClick={() => setIndex(i)}
                      className="text-white hover:cursor-pointer flex items-center text-"
                    >
                      {i === index && (
                        <div className="w-1 h-1 mr-1 rounded-full bg-green-400 shadow-emerald-400 shadow-sm"></div>
                      )}
                      <h1 className="text-nowrap"> {elem}</h1>
                    </div>
                  ) : (
                    <div className="h-[20px] w-[1px] bg-zinc-500 my-auto"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="w-1/3 flex items-center h-[100%]">
            <WalletDropdown
              publicKey={publicKey ? publicKey.toString() : "Signin"}
              signAndSend={signAndSend}
            />

            <Button
              text="Create a bounty"
              link={cookie ? "/dashboard/newBounty" : "/signup"}
            />
          </div>
        </div>
      </div>
      <div
        className={`w-full h-[3px] transition-all duration-700 ease-in-out ${
          isScrolled ? "bg-emerald-400 opacity-100" : "bg-transparent opacity-0"
        }`}
      />
    </div>
  );
}

export default Navbar;

function WalletDropdown({ publicKey, signAndSend }) {
  const [isOpen, setIsOpen] = useState(false);
  const { setVisible: setModalVisible } = useWalletModal();
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    loadingText: "",
  });

  const handleSignIn = async () => {
    setIsLoading({ isLoading: true, loadingText: "Loading..⏱️" });
    if (publicKey) {
      // Your sign and send logic here
      await signAndSend();
    } else {
      
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left font-mono w-fit">
      <div
        className="bg-white cursor-pointer flex justify-between items-center rounded-full px-4 -ml-4 mr-1 h-[2em] text-nowrap"
        onClick={() => {
          if (publicKey != "Signin") setIsOpen(!isOpen);
        }}
      >
        <h1 className="text-sm">
          {publicKey == "Signin" ? (
            <WalletMultiButton
              style={{
                marginRight: "0.2rem",
                backgroundColor: "white",
                color: "black",
                fontFamily: "monospace",
                height: "2em",
                borderRadius: "9999px",
                fontWeight: "100",
                fontSize: "14.8px",
              }}
            />
          ) : (
            `${
              isLoading.isLoading
                ? isLoading.loadingText
                : "Wallet:" +
                  publicKey?.slice(0, 3) +
                  "..." +
                  publicKey?.slice(38, -1)
            }`
          )}
        </h1>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {publicKey != "Signin" && (
              <button
                onClick={handleSignIn}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                disabled={publicKey == "Signin"}
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => setModalVisible(true)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Change Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
