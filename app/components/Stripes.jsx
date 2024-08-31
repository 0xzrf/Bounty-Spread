"use client";

import GithubCardSkew from "@/components/animata/card/github-card-skew";
import React from "react";

export const runtime = "edge";

function Subheading() {
  return (
    <div className="w-full bg-zinc-900 mt-[-83vh] flex flex-col justify-center items-center py-10">
      <div className="text-center max-w-screen-lg mx-auto px-4">
        <h2 className="text-white font-mono text-[1.2rem] leading-relaxed tracking-normal">
          With Blinks, you get results instantly. Our platform ensures you get
          actionable blinks in just minutes.
        </h2>
      </div>

      <div className="w-[90%] mt-[5vh]  flex justify-around text-white">
        <div>
          <GithubCardSkew
            heading="96x"
            title={"TIME REDUCTION TO CREATE BLINKS"}
            subtitle="don't spend days, when you can get it done in minutes"
          />
        </div>
        <div>
          <GithubCardSkew
            heading={(<h1 classsName="text-sm w-fit">
              Dispense Integrated
            </h1>)}
            headSize = "4xl"
            title={"End to end solution"}
            subtitle="Create & dispense bountythrough BountySpread"
          />
        </div>
        <div>
          <GithubCardSkew heading="Go" title="HASSLE FREE" subtitle="get submissions via blinks directly at your portal." />
        </div>
      </div>
    </div>
  );
}

export default Subheading;
