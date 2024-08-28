import React from "react";
import {
  CheckCircle,
  X,
  Zap,
  Rocket,
  Share2,
  BarChart2,
  Clock,
} from "lucide-react";

const ProMembershipPage = () => {
  const tiers = [
    {
      title: "FREE TIER",
      description: "Bounty Host",
      features: [
        "Create up to 5 blinks",
        "Blink verification will take up to 2 hours",
      ],
      cta: "Start Free",
    },
    {
      title: "PRO PLAN",
      description: "Bounty Host",
      features: [
        "Create unlimited blinks",
        "Blink verification will take up to 5 minutes",
        "Dedicated dashboard",
        "Easy bounty distribution",
        "Priority support",
      ],
      cta: "Upgrade to Pro",
    },
  ];

  return (
    <div className=" bg-zinc-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`border-4 ${
                index === 1 ? "border-emerald-400" : "border-zinc-700"
              } rounded-lg p-6`}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
              <p className="text-zinc-400 mb-4">{tier.description}</p>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <CheckCircle className="text-emerald-400 mr-2" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 px-4 rounded font-bold ${
                  index === 1
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-zinc-700 hover:bg-zinc-600"
                } transition duration-300`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProMembershipPage;
