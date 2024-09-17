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
          Winner Selection <span className="block">Made Simple</span>
        </div>
      ),
      description: (
        <div className="w-full bg-zinc-900 font-sans">
          <div className="text-center text-white">
            <h3 className="text-xl text-left md:text-xl font-semibold mb-4">
              Streamlined Winner Management:
            </h3>
            <ul className="text-xl text-left font-light leading-relaxed space-y-4">
              <li>
                <h1 className="font-bold inline">Easy Selection</h1>: Choose winners directly from your bounty dashboard
              </li>
              <li>
                <h1 className="font-bold inline">Automated Transfers</h1>: Instantly send funds to winners' wallets on behalf of POW
              </li>
              <li>
                <h1 className="font-bold inline">Transparent Process</h1>: Maintain fairness and clarity in prize distribution
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
          Secure Escrow <span className="block">Integration</span>
        </div>
      ),
      description: (
        <div className="w-full bg-zinc-900 font-sans">
          <div className="text-center text-white">
            <h3 className="text-sm text-left md:text-xl font-semibold mb-4">
              Why Our Escrow System Matters:
            </h3>
            <ul className="text-xl text-left font-light leading-relaxed space-y-4">
              <li>🔒 Funds securely collected and stored upon bounty closure</li>
              <li>💸 Automated prize distribution to winners</li>
              <li>🤝 Builds trust between hosts and participants</li>
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
          Seamless <span className="block">Data Integration</span>
        </div>
      ),
      description: (
        <div className="text-xl">
          Submissions and participant details are automatically integrated into your custom endpoint. 
          Access real-time data without manual transfers, streamlining your workflow and decision-making process.
        </div>
      ),
      buttonText: "Integrate Now ->",
      buttonLink: "/dashboard/integration",
    },
    {
      title: (
        <div>
          Time-Efficient <span className="block">Blink Creation</span>
        </div>
      ),
      description: (
        <div className="text-xl">
          Say goodbye to repetitive tasks. Create Blinks directly from our platform, 
          eliminating the need to access Dialect for each creation. Save time and focus on what matters most.
        </div>
      ),
      buttonText: "Create Blink ->",
      buttonLink: "/dashboard/createBlink",
    },
    {
      title: (
        <div>
          Advanced <span className="block">Analytics Dashboard</span>
        </div>
      ),
      description: (
        <div className="text-xl">
          Gain deeper insights with our comprehensive analytics. Track engagement, submission quality, 
          and participant demographics. Make data-driven decisions to optimize your bounties and increase ROI.
        </div>
      ),
      buttonText: "View Analytics ->",
      buttonLink: "/dashboard/analytics",
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
        const isEven = i % 2 === 0;
        return (
          <motion.div
            key={i} 
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Product val={elem} count={i} mover={movePos} setPos={setPos} />
          </motion.div>
        );
      })}
    </div>
  );
}

export default Products;
