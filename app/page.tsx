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
  const featureRef = useRef(null)
  const scrollToMarquees = () => {
    if (marqueeRef.current) {
      //@ts-ignore
      marqueeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToFeatures = () => {
    if (featureRef.current) {
      //@ts-ignore
      featureRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const actionApiUrl  = 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Fsponsor%2Faction%3Fid%3Dweb2&cluster=devnet'; // H
  const actionApiUrl2 = 'https://dial.to/?action=solana-action:https://api-mainnet.magiceden.dev/actions/buyNow/Ahz7A16sxw7FhjBPkVdTVvRNje5i2NDEsq67y7jcqaoy';
  const actionApiUrl3 = 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Fsponsor%2Faction%3Fid%3Dml&cluster=devnet';
  const actionApiUrl4= 'https://dial.to/?action=solana-action:https://hermans.club/api/actions/presale/phasetwo';
  const actionApiUrl5 = 'https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fapp%2Fsponsor%2Faction%3Fid%3Dweb3&cluster=devnet';
  const actionApiUrl6 = 'https://dial.to/?action=solana-action:https://100xdevsblink.me/api/actions/payments';
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
      <Navbar scrollToMarquees= {scrollToMarquees} scrollToFeatures={scrollToFeatures} />
      <Work />
      <Stripes />
       { (action && action2 && action3 && action4 && action5 && action6 &&  action7) && 
  <div ref={marqueeRef} className="relative flex h-[100vh] w-[100vw] py-10  items-center justify-center overflow-hidden mt-[-40px] mb-[-250px]">
  <Marquee >
    {
      [action, action2, action3, action4, action5, action6, action7].map((item, index) => (
        <div
          className="flex h-[20vh] w-[25vw] flex-1 flex-col justify-between rounded-md"
          key={`item-${index}`}
        >
          <Blink stylePreset="x-dark" action={item} />
        </div>
      ))
    }
  </Marquee>
</div>
        
        }
      {/* //@ts-ignore */}
      
      <div ref={featureRef} >
       <Products />
      </div>
      <Cards />
      <Footer />
    </div>
  );
}
