"use client";

import GithubCardSkew from "@/components/animata/card/github-card-skew";
import { Github } from 'lucide-react';
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
            heading={ <h1
              classsName="w-fit"
            >
             Drastic Time Reduction
            </h1>}
             headSize="4xl"
            title={"96x times faster"}
            subtitle="Creating & registering blinks with dialect takes 48 hrs, with us it takes few minutes."
          />
        </div>
        <div>
          <GithubCardSkew
            heading={
              <h1
                classsName="w-fit"
              >
                Dispense Integrated
              </h1>
            }
            headSize="4xl"
            title={"Escrow secured txns"}
            subtitle={(
              <div>
                Distribute rewards with <a href="https://github.com/Praharx/dispenser_program">our secure escrow program <Github strokeWidth={0.75} className="border rounded-full p-0.5 mx-auto" /></a>
              </div>
            )}
          />
        </div>
        <div>
          <GithubCardSkew
            heading={<h1
                classsName="w-fit"
              >
                Tremendous Reach
              </h1>}
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
