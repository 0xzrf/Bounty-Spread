import React from 'react';
import Welcome from './ContentComp/Welcome';
import ProMember from './ContentComp/ProMember';
import NewBounty from './ContentComp/NewBounty';
import CurrentBounties from './ContentComp/CurrentBounties';
 // Empty array for default state

export default function MainContent({selectedButton} : {selectedButton:any} ) {

  const renderContent = () => {
    switch (selectedButton) {
      case 'currentBounties':
        return <CurrentBounties/>
      case 'newBounty':
        return <NewBounty/>
      case 'proMember':
        return <ProMember/>
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
