import React from "react";
import Product from "./Product";
import { motion } from "framer-motion";
import SplitText from "@/components/animata/text/split-text";

export const runtime = "edge";

function Products() {
  const productData = [
    {
      card1: {
        title: "Winner Selection Made Simple",
        description: "Streamlined Winner Management",
        details: "Choose winners directly from your bounty dashboard, Send funds to winners after blinks' wallets on behalf of POW, Maintain fairness and clarity in prize distribution",
      },
      card2: {
        title: "Secure Escrow Integration",
        description: "Why Our Escrow System Matters",
        details: "🔒 Funds securely collected and stored upon bounty closure\n💸 Automated prize distribution to winners\n🤝 Builds trust between hosts and participants",
      },
    },
    {
      card1: {
        title: "Seamless Data Integration",
        description: "Real-time Data Access",
        details: "Submissions and participant details are automatically integrated into your custom endpoint. Access real-time data without manual transfers, streamlining your workflow and decision-making process.",

      },
      card2: {
        title: "Time-Efficient Blink Creation",
        description: "Streamlined Workflow",
        details: "Say goodbye to repetitive tasks. Create Blinks directly from our platform, eliminating the need to access Dialect for each creation. Save time and focus on what matters most.",

      },
    },
    {
      card1: {
        title: "API Integration",
        description: "Directly to your platform",
        details: "Just want to create a blink? No problem. We have you covered. Our API allows you to create a blink in just a single line of code!",
        buttonText: "Integrate Now ->",
        buttonLink: "/dashboard/integration",
      },
      card2: {
        title: "Multi token support with your native currency",
        description: "Pay in your native currency",
        details: "Want to pay in your native currency? No problem. We support multiple tokens, including USDC, USDT, and more! You can just pay with your native currency Powered by Mercuryo to buy your favorite token!",
        buttonText: "Create Blink ->",
        buttonLink: "/dashboard/createBlink",
      },
    },
  ];

  return (
    <div className="space-y-16">
      <div className="flex justify-center">
        <SplitText text="FEATURES" />
      </div>
      {productData.map((product, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Product product={product} />
        </motion.div>
      ))}
    </div>
  );
}

export default Products;
