const instructions = [
  {
    title: "Current Active Bounties",
    description: "View and manage all your active bounties from this section.",
  },
  {
    title: "Create a New Blink",
    description:
      "Start a new blink for your Grant, Project, or Bounty quickly and easily.",
  },
  {
    title: "Become a Pro Member",
    description:
      "Upgrade your account to Pro to unlock exclusive features and benefits.",
  },
  {
    title: "Wallet",
    description: "Manage your wallet, switch accounts, or sign out from here.",
  },
];

const recentBounties = [];
export default function Welcome() {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Your Dashboard!</h1>
      <p className="text-lg text-gray-400 mb-10">
        Navigate through the options on the sidebar to manage your bounties,
        create new blinks, and more.
      </p>

      {/* Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {instructions.map((instruction, index) => (
          <div
            key={index}
            className="bg-zinc-700 p-6 rounded-lg shadow-lg border border-emerald-400 hover:bg-zinc-600 transition-colors duration-300"
          >
            <h2 className="text-2xl font-semibold text-emerald-400 mb-2">
              {instruction.title}
            </h2>
            <p className="text-gray-300">{instruction.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Bounties Section */}
      <div className="bg-zinc-700 p-8 rounded-lg shadow-lg border border-emerald-400 bg-gradient-to-r from-zinc-600 to-zinc-700">
        {recentBounties.length === 0 ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-emerald-400 mb-6">
              No Recent Bounties
            </h2>
            <p className="text-gray-300 mb-6">
              You haven’t created any bounties recently. Start a new one to get
              started!
            </p>
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-emerald-600 transition-colors duration-300">
              Create Blink
            </button>
          </div>
        ) : (
          <div>
            {/* Display recent bounties here */}
            <h2 className="text-3xl font-semibold text-emerald-400 mb-6">
              Recent Bounties
            </h2>
            {/* Render recent bounties */}
          </div>
        )}
      </div>
    </div>
  );
}
