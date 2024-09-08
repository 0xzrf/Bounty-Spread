import React, { useState } from "react";
import Product from "./Product";
import { motion } from "framer-motion";
import SplitText from "@/components/animata/text/split-text";

export const runtime = "edge";

function Products() {
  const vars = [
    {
      title: (
        <div>
          Blinks for <span className="block">Everything</span>
        </div>
      ),
      description: (
        <div className="w-full bg-zinc-900 font-sans">
          <div className="text-center text-white">
            <h3 className="text-xl text-left md:text-xl font-semibold mb-4">
              Crete Blinks for your:
            </h3>
            <ul className="text-xl text-left  font-light leading-relaxed space-y-4">
              <li>
                🤑 <h1 className="font-bold inline">Grants</h1> : Harvest more innovation as it reaches more innovators
              </li>
              <li>
                🌋  <h1 className="font-bold inline">Projects</h1> : Project awareness can drastically improve as it
                reaches as blinks.
              </li>
            </ul>
          </div>
        </div>
      ),
      buttonText: "",
      buttonLink: "",
    },
    {
      title: (
        <div>
          Bounty-to-Blink <span className="block">Conversion</span>
        </div>
      ),
      description: (
        <div className="w-full bg-zinc-900 font-sans">
          <div className="text-center text-white">
            <h3 className="text-sm text-left md:text-xl font-semibold mb-4">
              Why Create Blinks Out of Bounties?
            </h3>
            <ul className="text-xl text-left  font-light leading-relaxed space-y-4">
              <li>📡 Share it on a distributed network like X.</li>
              <li>🚀 Better than ads & can reach larger audiences.</li>
              <li>🔗 In-app participation without leaving X</li>
            </ul>
          </div>
        </div>
      ),
      buttonText: "",
      buttonLink: "",
    },
    {
      title: (
        <div>
          Create <span className="block">Blinks-- Faster!!</span>
        </div>
      ),
      description: (
        <div className="text-xl">
          Registering and verifying a blink takes upto 48 hours, we can help you
          create a blink in up to 2 hours(And 5 if you're pro user ;))
        </div>
      ),
      buttonText: "Make it now ->",
      buttonLink: "/makeBlink",
    },
    {
      title: (
        <div>
          Bounty Dispense <span className="block">made easy</span>
        </div>
      ),
      description: (
        <div className="text-xl">
          Distributing bounties made easier through blinks, letting winners
          claim their bounty within X itself, by interacticting with the blink
        </div>
      ),
      buttonText: "",
      buttonLink: "",
    },
    {
      title: (
        <div>
          Dedicated <span className="block">dashboard</span>
        </div>
      ),
      description: (
        <div className="text-xl">
          A place to track submissions and all participants.Or directly
          intergrate the data wherever you want.
        </div>
      ),
      buttonText: "",
      buttonLink: "",
    },
  ];

  const [pos, setPos] = useState(null);
  const movePos = (val) => {
    setPos(18 * val);
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <SplitText text="FEATURES" />
      </div>
      {vars.map((elem, i) => {
        return <Product val={elem} count={i} mover={movePos} setPos={setPos} />;
      })}
    </div>
  );
}

export default Products;
