"use client";

import Navbar from "./components/Navbar";
import Work from "./components/Work";
import Products from "./components/Products";
import Stripes from "./components/Stripes";
import Marquee from "@/components/animata/container/marquee";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import '@dialectlabs/blinks/index.css';
import { useEffect, useState, useMemo } from 'react';
import LocomotiveScroll from "locomotive-scroll";
import { Action, Blink, useActionsRegistryInterval } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana"

export const runtime = "edge";

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const { isRegistryLoaded } = useActionsRegistryInterval();
  const { adapter } = useActionSolanaWalletAdapter('https://api.devnet.solana.com');

  const apiUrls = useMemo(() => ([
    'https://dial.to/?action=solana-action:https://bonkbets.dial.to/lamar'
    // Add more URLs here if needed
  ]), []);
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    let scroll: LocomotiveScroll | undefined;
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default();
    });

    setIsReady(true);

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchActions = async () => {
      const promises = apiUrls.map(url => Action.fetch(url).catch(() => null));
      const fetchedActions = await Promise.all(promises);
            
      setActions(fetchedActions.filter((action): action is Action => action !== null));
    }
        
    fetchActions();
  }, [apiUrls]);
    
  useEffect(() => {
    actions.forEach((action) => {
      if ('setAdapter' in action) {
        (action as any).setAdapter(adapter);
      }
    });
  }, [actions, adapter]);

  if (!isReady || !isRegistryLoaded) {
    return null;
  }

  return (
    <div
      style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
      className="bg-zinc-900"
    >
      <Navbar />
      <Work />
      <Stripes />
      <div className="flex h-[30rem] w-full min-w-72 items-center justify-center rounded">
        <Marquee reverse>
          {actions.map(action => (
            <div key={action.url} className="h-[8rem] w-80">
              <Blink action={action} stylePreset="x-dark" websiteText={new URL(action.url).hostname} />
            </div>
          ))}
        </Marquee>
      </div>
      <Products />
      <Cards />
      <Footer />
    </div>
  );
}