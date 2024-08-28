import React from 'react';
import { CheckCircle, X, Zap, Rocket, Share2, BarChart2, Clock } from 'lucide-react';

const ProMembershipPage = () => {
  const features = [
    { icon: Zap, title: "Blinks for Everything", description: "Create Blinks for your Grants and Projects" },
    { icon: Share2, title: "Share on Distributed Networks", description: "Share it on a distributed network like X" },
    { icon: Rocket, title: "Better than Ads", description: "Can reach larger audiences" },
    { icon: BarChart2, title: "In-app Participation", description: "Participate without leaving X" },
    { icon: Clock, title: "Faster Blink Creation", description: "Create a blink in up to 5 minutes (vs 2 hours for free users)" }
  ];

  const tiers = [
    {
      title: "FREE TIER",
      description: "Bounty Host",
      features: [
        "Create up to 5 blinks",
        "Blink verification will take up to 2 hours"
      ],
      cta: "Start Free"
    },
    {
      title: "PRO PLAN",
      description: "Bounty Host",
      features: [
        "Create unlimited blinks",
        "Blink verification will take up to 5 minutes",
        "Dedicated dashboard",
        "Easy bounty distribution",
        "Priority support"
      ],
      cta: "Upgrade to Pro"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Become a Pro Member</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why Create Blinks?</h2>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <feature.icon className="text-emerald-400 mr-2 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Additional Pro Benefits</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="text-emerald-400 mr-2" size={20} />
                <span>Dedicated dashboard to track submissions and participants</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-emerald-400 mr-2" size={20} />
                <span>Direct data integration options</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-emerald-400 mr-2" size={20} />
                <span>Easy bounty distribution through blinks</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-emerald-400 mr-2" size={20} />
                <span>In-app bounty claiming within X</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {tiers.map((tier, index) => (
            <div key={index} className={`border-4 ${index === 1 ? 'border-emerald-400' : 'border-zinc-700'} rounded-lg p-6`}>
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
              <button className={`w-full py-2 px-4 rounded font-bold ${
                index === 1 ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-zinc-700 hover:bg-zinc-600'
              } transition duration-300`}>
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