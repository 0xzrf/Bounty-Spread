import React from 'react';

const BountySpreadLogo = () => {
  return (
    <div className="flex items-center">
      <div className="bg-slate-500 text-black rounded-full w-10 h-10 flex justify-center items-center">
        <span className="text-lg font-bold">B</span>
      </div>
      <div className="ml-2 text-white font-semibold font-sans">
        <span className="text-sm">Bounty</span>
        <br />
        <span className="text-sm">Spread</span>
      </div>
    </div>
  );
};

export default BountySpreadLogo;
