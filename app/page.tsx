"use client";

import Navbar from "./components/Navbar";
import Work from "./components/Work";
import Products from "./components/Products";
import Stripes from "./components/Stripes";
import Marquee from "@/components/animata/container/marquee";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import '@dialectlabs/blinks/index.css';
import { useEffect, useState, useRef } from 'react';
import LocomotiveScroll from "locomotive-scroll";
import { Action, Blink, useAction } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana"

export const runtime = "edge";

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [action, setAction] = useState <Action | null> (null);
  const [action2, setAction2] = useState<Action>();
  const [action3, setAction3] = useState<Action>();
  const [action4, setAction4] = useState<Action>();
  const [action6, setAction6] = useState<Action>();
  const [action7, setAction7] = useState<Action>();
  const [action5, setAction5] = useState<Action>();
  const marqueeRef = useRef(null); // Ref for Marquees component
  const scrollToMarquees = () => {
    if (marqueeRef.current) {
      marqueeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const actionApiUrl  = 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Fsponsor%2Faction%3Fid%3Dweb2&cluster=devnet'; // H
  const actionApiUrl2 = 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Factions%3Fid%3Dde8602d3-e754-4235-a0b3-de28849f96b5&cluster=devnet';
  const actionApiUrl3 = 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Fsponsor%2Faction%3Fid%3Dml&cluster=devnet';
  const actionApiUrl4= 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Factions%3Fid%3D7cbf2d80-64db-49a8-be50-a9633d3a4c64&cluster=devnet';
  const actionApiUrl5 = 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Fsponsor%2Faction%3Fid%3Dweb3&cluster=devnet';
  const actionApiUrl6 = 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Factions%3Fid%3Dd6adb6fe-b42d-4a21-8ec3-d1f34308446d&cluster=devnet';
  const actionApiUrl7 = 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Factions%3Fid%3D6a6548a0-fb3a-4217-9608-71fbe9250056&cluster=devnet';
  
  // useAction initiates registry, adapter and fetches the action.
  console.log("I ran till this>")
  const { adapter } = useActionSolanaWalletAdapter('https://api.devnet.solana.com');
  const { action: something } = useAction({ url: actionApiUrl, adapter });
  const { action: something2 } = useAction({ url:  actionApiUrl2, adapter });
  const { action: something3 } = useAction({ url: actionApiUrl3, adapter });
  const { action: something4 } = useAction({ url:  actionApiUrl4, adapter });
  const { action: something5 } = useAction({ url:  actionApiUrl5, adapter });
  const { action: something6 } = useAction({ url:  actionApiUrl6, adapter });
  const { action: something7 } = useAction({ url:  actionApiUrl7, adapter });
  useEffect(() => {
    let scroll: LocomotiveScroll | undefined;
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default();
    });

    setIsReady(true);

    return () => {
      if (scroll) scroll.destroy();
    };
  });
  useEffect(() => {
    console.log(something)
    setAction(something)
    setAction2(something2 as Action);
    setAction3(something3 as Action);
    setAction4(something4 as Action);
    setAction5(something5 as Action);
    setAction6(something6 as Action);
    setAction7(something7 as Action);

  }, [something, something7, something2, something3, something4, something5, something6])
  
  if (!isReady) {
    return null;
  }

  return (
    <div
      style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
      className="bg-zinc-900"
    >
      <Navbar scrollToMarquees= {scrollToMarquees} />
      <Work />
      <Stripes />
      <div ref={marqueeRef} className="flex h-[100vh] mt-[-100px] w-full min-w-72 items-center overflow-x-hidden overflow-y-clip justify-center rounded  ">
       { (action && action2 && action3 && action4 && action5 && action6 &&  action7) && 
        <Marquee action={[action as Action, action2 as Action,action3 as Action,action4 as Action,action5 as Action,action6 as Action,action7 as Action]} />}
      </div>
      <Products />
      <Cards />
      <Footer />
    </div>
  );
}

