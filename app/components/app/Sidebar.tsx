"use client";

import { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import BountySpreadLogo from "../Icon";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Cookies from "js-cookie";

import NotSignedIn from "./NotSignedIn";
export const runtime = "edge";

export default function Sidebar({
  selectedButton,
}: {
  selectedButton: string | string[] | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { setVisible: setModalVisible } = useWalletModal();
  const { publicKey, disconnect } = useWallet();
  const pubkey = publicKey?.toString();
  const router = useRouter();
  const toggleDropdown = () => setIsOpen(!isOpen);
  const cookie = Cookies.get("token");

  if (!pubkey && !cookie) {
    return (
      <div className="absolute">
        <NotSignedIn />
      </div>
    );
  }

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-start px-4 py-6 bg-zinc-800">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-10">
            <BountySpreadLogo />
          </div>

          {/* Menu Items */}
          <ul className="font-medium">
            <li>
              <div
                className={`flex hover:cursor-pointer items-center p-3 rounded-lg text-white transition group ${selectedButton == "currentBounties" && "bg-emerald-400"
                  }`}
                onClick={() => router.push("/dashboard/currentBounties")}
              >
                <svg
                  className="w-6 h-6 text-gray-400 transition duration-150 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                  aria-hidden="true"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-4">Current Active Bounties</span>
              </div>
            </li>
            <li>
              <div
                className={`flex items-center hover:cursor-pointer p-3 rounded-lg text-white transition group ${selectedButton == "newBounty" && "bg-emerald-400"
                  }`}
                onClick={() => router.push("/dashboard/newBounty")}
              >
                <svg
                  className="w-6 h-6 text-gray-400 transition duration-150 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="ml-4">Create a New Blink</span>
              </div>
            </li>
            <li>
              <div
                className={`flex items-center p-3 hover:cursor-pointer rounded-lg text-white transition group ${selectedButton == "dispenseBounty" && "bg-emerald-400"
                  }`}
                onClick={() => router.push("/dashboard/dispenseBounty")}
              >
                <svg
                  className="w-6 h-6 text-gray-400 transition duration-150 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 13h-2v-4H8l4-4 4 4h-3Z" />
                  <path d="M12 4a8 8 0 1 1-8 8 8.011 8.011 0 0 1 8-8m0-2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Z" />
                </svg>
                <span className="ml-4">Dispense Bounties</span>
              </div>
            </li>
            <li>
              <div
                className={`flex items-center p-3 hover:cursor-pointer rounded-lg text-white transition group ${selectedButton == "integrate" && "bg-emerald-400"
                  }`}
                onClick={() => router.push("/dashboard/integrate")}
              >
                <svg
                  className="w-6 h-6 text-gray-400 transition duration-150 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 13h-2v-4H8l4-4 4 4h-3Z" />
                  <path d="M12 4a8 8 0 1 1-8 8 8.011 8.011 0 0 1 8-8m0-2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Z" />
                </svg>
                <span className="ml-4">Integrate BountySpread</span>
              </div>
            </li>
          </ul>
          <div className="relative w-full h-full">
            <div className="flex h-full justify-end w-full items-end">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full px-4 py-2 text-white bg-zinc-800 rounded-lg hover:bg-emerald-400 border border-y-white"
              >
                <span>
                  {pubkey?.slice(0, 6) + "..." + pubkey?.slice(36, -1)}
                </span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform transform ${isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <ul className="absolute z-10 w-full py-2 mt-2 border-2 space-y-1 bg-zinc-800 rounded-lg shadow-lg bottom-14">
                  <li>
                    <span
                      onClick={() => {
                        Cookies.remove("token");
                        disconnect();
                        router.push("/");
                      }}
                      className="block px-4  py-2 rounded-lg text-sm text-gray-400 hover:bg-emerald-400 hover:text-white"
                    >
                      Sign out
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        setModalVisible(true);
                      }}
                      className="block px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-emerald-400 hover:text-white"
                    >
                      Change wallet
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
