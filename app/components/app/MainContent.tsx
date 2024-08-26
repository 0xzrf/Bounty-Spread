import React from 'react';
import Welcome from './ContentComp/Welcome';
 // Empty array for default state

export default function MainContent({selectedButton} : {selectedButton:any} ) {

  const renderContent = () => {
    switch (selectedButton) {
      case 'currentBounties':
        return <p className="text-gray-400">Loading...</p>;
      case 'newBounty':
        return <p className="text-red-400">Something went wrong. Please try again.</p>;
      case 'proMember':
        return <p className="text-green-400">Data loaded successfully!</p>;
      default:
        return <Welcome/>;
    }
  };

  return (
    <div className="ml-64 p-6 min-h-screen bg-zinc-800">
      <div className="border-4 border-dashed border-emerald-400 min-h-screen rounded-lg p-8 text-white">
        {renderContent()}   
        
      </div>
    </div>
  );
}
