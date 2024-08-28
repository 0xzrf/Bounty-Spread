import React from 'react';

const SelfContainedCreditDisplay = ({ userCredit = 0 }) => {
  const remainingCredit = Math.max(0, Math.min(5, userCredit));
  const percentage = 5 > 0 ? (remainingCredit / 5) * 100 : 0;

  return (
    <div className="flex items-center space-x-2 text-xs text-emerald-400 border border-yellow-100 w-fit p-3 rounded">
      <div className="w-16 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-emerald-400 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm"> {remainingCredit}/ 5 credits left</span>
    </div>
  );
};

export default SelfContainedCreditDisplay;