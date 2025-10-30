import { Leaf, User } from "lucide-react";

export default function Header({ activeTab, onTabChange }) {
  const tabs = [
    { key: "market", label: "Swap Market" },
    { key: "wishlist", label: "Wishlist" },
    { key: "messages", label: "Messages" },
    { key: "profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">PlantSwap</h1>
            <p className="text-xs text-gray-500 -mt-1">Trade cuttings • Grow community</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">You</p>
            <p className="text-xs text-gray-500">Local Gardener</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-gray-200 grid place-items-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden px-2 pb-3 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onTabChange(t.key)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === t.key
                ? "bg-green-600 text-white"
                : "text-gray-700 bg-white border border-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  );
}
