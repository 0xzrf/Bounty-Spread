"use client";
import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import BountySpreadLogo from "./Icon";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Menu, X } from 'lucide-react';
import {toast, Toaster} from "sonner"
import { useCookies } from "next-client-cookies";

export const runtime = "edge";

function Navbar({scrollToMarquees, scrollToFeatures}) {
  const router = useRouter();
  const { publicKey, signMessage, wallets } = useWallet();
  const [index, setIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const cookies = useCookies();

  const cookie = cookies.get("token");

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
        toast.error("Invalid User credentials")
        router.push("/signup");
        return;
      }
      toast.success(response.data.msg);
      localStorage.setItem("token", response.data.token)
      setTimeout(()=> {
        router.push("/dashboard/newBounty");
      },4000)
    } catch (err) {
      toast.error("Unable to verify User");
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (!cookies.get("token")) localStorage.removeItem("token")

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Features", onClick: scrollToFeatures },
    { name: "Explore Blinks", onClick: scrollToMarquees },
  ];

  return (
    <div className="fixed top-0 w-full bg-zinc-900 bg-opacity-80 z-50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        <div
          className={`h-14 flex justify-between items-center transition-all duration-1000 ease-in-out ${
            !isScrolled
              ? "border-b-[1px] border-b-zinc-600"
              : "border-b-[1px] border-b-transparent"
          }`}
        >
          <div className="flex items-center">
            <BountySpreadLogo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-12 font-extralight text-sm justify-center">
            {navItems.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  item.onClick();
                  setIndex(i);
                }}
                className="text-white hover:cursor-pointer flex items-center"
              >
                {i === index && (
                  <div className="w-1 h-1 mr-1 rounded-full bg-green-400 shadow-emerald-400 shadow-sm"></div>
                )}
                <h1 className="text-nowrap">{item.name}</h1>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Wallet and Create Button */}
          <div className="hidden md:flex items-center h-[100%] space-x-2">
            <WalletDropdown
              publicKey={publicKey ? publicKey.toString() : "Signin"}
              signAndSend={signAndSend}
              style={{textAlign: "center"}}
            />
            <Button
              text="Sign up ->"
              link={cookie ? "/dashboard/newBounty" : "/signup"}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-zinc-800 py-4 flex flex-col items-center">
          {navItems.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                item.onClick();
                setIndex(i);
                setIsMobileMenuOpen(false);
              }}
              className="text-white hover:cursor-pointer py-2 px-4 w-full text-center"
            >
              <h1>{item.name}</h1>
            </div>
          ))}
          <div className="px-4 py-2 w-full flex justify-center">
            <WalletDropdown
              publicKey={publicKey ? publicKey.toString() : "Signin"}
              signAndSend={signAndSend}
            />
          </div>
          <div className="px-4 py-2 w-full">
            <Button
              text="Create a blink ->"
              link={cookie ? "/dashboard/newBounty" : "/signup"}
            />
          </div>
        </div>
      )}

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
  const router = useRouter()
  const cookies = useCookies();
  const [isOpen, setIsOpen] = useState(false);
  const { setVisible: setModalVisible } = useWalletModal();
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    loadingText: "",
  });
  const wallet = useWallet();

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
    <div className="relative inline-block text-left font-mono w-full sm:w-fit">
      <div
        className="bg-white cursor-pointer flex justify-between items-center rounded-full px-3 sm:px-4 -ml-2 sm:-ml-4 mr-1 h-8 sm:h-[2em] text-nowrap"
        onClick={() => {
          if (publicKey != "Signin") setIsOpen(!isOpen);
        }}
      >
        <h1 className="text-xs text-center w-full  sm:text-sm">
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
                textAlign: "center",
              }}
            >
              <h1 className="text-sm sm:ml-0 sm:text-sm">Connect Wallet</h1>
            </WalletMultiButton>
          ) : (
            `${
              isLoading.isLoading
                ? isLoading.loadingText
                :
                 "Wallet:" +
                  publicKey?.slice(0, 3) +
                  "..." +
                  publicKey?.slice(38, -1)
            }`
          )}
        </h1>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 sm:w-64">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {(publicKey != "Signin" && !localStorage.getItem("token") && !cookies.get("token")) && (
              <button
                onClick={handleSignIn}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                disabled={publicKey == "Signin"}
              >
                Sign In
              </button>
            )}
            {
              (publicKey != "Signin" && localStorage.getItem("token") && cookies.get("token") )&& 
              <button
              onClick={() => {cookies.remove("token") ; localStorage.removeItem("token")}}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Sign Out
            </button>
            }
            <button
              onClick={() => setModalVisible(true)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Change Wallet
            </button>
            <button
              onClick={() => wallet.disconnect()}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Disconnect wallet
            </button>
             {
              (localStorage.getItem("token") && cookies.get("token")) && (
                <button
              onClick={() => router.push("/dashboard/currentBounties")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Dashboard
            </button>
              )
            }
          </div>
        </div>
      )}
    </div>
  );
}
