import { useMemo, useState } from "react";
import Header from "./components/Header";
import PlantMarket from "./components/PlantMarket";
import Wishlist from "./components/Wishlist";
import Messages from "./components/Messages";

function App() {
  const [activeTab, setActiveTab] = useState("market");

  // Demo data for the prototype UI
  const users = [
    { id: "u1", name: "Maya", location: "Downtown" },
    { id: "u2", name: "Jon", location: "Riverside" },
    { id: "u3", name: "Asha", location: "Hillside" },
  ];

  const plants = useMemo(
    () => [
      {
        id: "p1",
        name: "Monstera Deliciosa Cutting",
        category: "Houseplant",
        description: "Healthy node with aerial root, rooted in water and ready to pot.",
        location: "Downtown",
        owner: "u1",
      },
      {
        id: "p2",
        name: "Spider Plant Babies",
        category: "Houseplant",
        description: "Three small plantlets, pest-free and thriving.",
        location: "Riverside",
        owner: "u2",
      },
      {
        id: "p3",
        name: "Rosemary Cutting",
        category: "Herb",
        description: "Fragrant cutting from an established outdoor plant.",
        location: "Hillside",
        owner: "u3",
      },
      {
        id: "p4",
        name: "Pothos Marble Queen",
        category: "Houseplant",
        description: "6-inch cutting with beautiful variegation.",
        location: "Downtown",
        owner: "u2",
      },
      {
        id: "p5",
        name: "Aloe Pup",
        category: "Succulent",
        description: "Hardy offshoot, perfect for beginners.",
        location: "Riverside",
        owner: "u1",
      },
    ],
    []
  );

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: null, location: null });
  const [wishlist, setWishlist] = useState([]);

  const [conversations, setConversations] = useState({
    u1: [{ from: "them", text: "Hi! Interested in swapping for your pothos?" }],
  });
  const [activeUserId, setActiveUserId] = useState(null);

  function handleAddWishlist(plant) {
    setWishlist((prev) => (prev.find((p) => p.id === plant.id) ? prev : [...prev, plant]));
  }

  function handleRemoveWishlist(id) {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  }

  function handleMessageOwner(ownerId) {
    setActiveTab("messages");
    setActiveUserId(ownerId);
  }

  function handleSendMessage(userId, text) {
    setConversations((prev) => {
      const existing = prev[userId] || [];
      return { ...prev, [userId]: [...existing, { from: "me", text }] };
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-green-100 text-gray-900">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "market" && (
        <PlantMarket
          plants={plants}
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          onAddWishlist={handleAddWishlist}
        />
      )}

      {activeTab === "wishlist" && (
        <Wishlist items={wishlist} onRemove={handleRemoveWishlist} onMessage={handleMessageOwner} />)
      }

      {activeTab === "messages" && (
        <Messages
          users={users}
          conversations={conversations}
          activeUserId={activeUserId}
          setActiveUserId={setActiveUserId}
          onSend={handleSendMessage}
        />
      )}

      {activeTab === "profile" && (
        <section className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white/90 rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
            <p className="text-gray-600">This is a simple, local profile view for the demo. In a full build, this would show your listings, reputation, and swap history.</p>
          </div>
        </section>
      )}

      <footer className="py-10 text-center text-sm text-gray-600">
        Built for community plant lovers • Swap responsibly
      </footer>
    </div>
  );
}

export default App;
