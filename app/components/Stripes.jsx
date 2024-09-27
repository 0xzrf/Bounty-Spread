"use client";

import GithubCardSkew from "@/components/animata/card/github-card-skew";
import { LinkPreview } from "@/components/ui/link-preview";
import { Github } from 'lucide-react';
import { Button } from "@/components/ui/moving-border";
import React from "react";

export const runtime = "edge";

function Subheading() {
  const setScroll = () => {
    document.getElementById("trialBounty").scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="w-full bg-zinc-900 mt-[-90vh] flex flex-col justify-center items-center py-10">
      <div className="text-center max-w-screen-lg mx-auto px-4">
        <h2 className="text-white font-mono text-[1.2rem] leading-relaxed tracking-normal">
          With Blinks, you get results instantly. Our platform ensures you get
          actionable blinks in just minutes.
        </h2>
      </div>
      <div className="mt-10">
        <Button
          onClick={setScroll}
        borderRadius="1.75rem"
        className="bg-zinc-800 font-bold text-white dark:border-slate-800 text-xl rounded-fulls"
      >
       Try Now
      </Button>
      </div>

      <div className="w-5xl mt-[5vh] flex flex-col sm:flex-row justify-center gap-3 text-white mx-auto mb-1 items-center">
        <div className="mb-8 sm:mb-0 sm:w-1/3 mx-4">
          <GithubCardSkew
            heading={<h1 className="w-fit">Drastic Time Reduction</h1>}
            headSize="4xl"
            title={"96x times faster"}
            subtitle="Creating & registering blinks with dialect takes 48 hrs, with us it takes few minutes."
          />
        </div>
        <div className="mb-8 sm:mb-0 sm:w-1/3 mx-4">
          <GithubCardSkew
            heading={<h1 className="w-fit">Dispense Integrated</h1>}
            headSize="4xl"
            title={"Escrow secured txns"}
            subtitle={(
              <div>
                Distribute rewards with <a href="https://github.com/Praharx/dispenser_program" className="text-white">our secure escrow program <Github strokeWidth={0.75} className="border rounded-full p-0.5 mx-auto" /></a>
              </div>
            )}
          />
        </div>
        <div className="sm:w-1/3 mx-4">
          <GithubCardSkew
            heading={<h1 className="w-fit">Tremendous Reach</h1>}
            headSize={'4xl'}
            title="Better reach,  better results"
            subtitle="Blinks can give you access to larger audiences."
          />
        </div>
      </div>
    </div>
  );
}

export default Subheading;
