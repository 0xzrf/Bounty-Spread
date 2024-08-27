import React from 'react';

type Bounty = {
  hostId: string;
  endpoint: string;
  url: string;
};

type UnverifiedBountiesProps = {
  bounties: Bounty[];
};

const UnverifiedBounties: React.FC<UnverifiedBountiesProps> = ({ bounties }) => {
  return (
    <section className="">
      <h2 className="text-xl font-semibold mb-4">Unverified Bounties</h2>
      {bounties.length === 0 ? (
        <p>No bounties to verify</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-500 p-2">Host Id</th>
              <th className="border-b border-gray-500 p-2">Endpoint</th>
              <th className="border-b border-gray-500 p-2">URL</th>
              <th className="border-b border-gray-500 p-2">Verify</th>
            </tr>
          </thead>
          <tbody>
            {bounties.map((bounty, index) => (
              <tr key={index}>
                <td className="border-b border-gray-700 p-2">{bounty.hostId}</td>
                <td className="border-b border-gray-700 p-2">{bounty.endpoint}</td>
                <td className="border-b border-gray-700 p-2">{bounty.url}</td>
                <td className="border-b border-gray-700 p-2">
                  <button className="bg-emerald-400 text-white py-1 px-3 rounded">
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UnverifiedBounties;
