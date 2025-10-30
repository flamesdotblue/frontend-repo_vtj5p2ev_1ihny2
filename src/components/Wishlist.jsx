import { Heart, MessageCircle, X } from "lucide-react";

export default function Wishlist({ items, onRemove, onMessage }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-rose-600" />
        <h2 className="text-lg font-semibold">Your Wishlist</h2>
      </div>

      {items.length === 0 ? (
        <div className="bg-white/80 border border-gray-200 rounded-xl p-10 text-center text-gray-600">
          Save plants you love to plan your next swap.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((p) => (
            <li
              key={p.id}
              className="bg-white/90 rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-3"
            >
              <div>
                <p className="font-medium text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-600">{p.category} • {p.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onMessage(p.owner)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" /> Message owner
                </button>
                <button
                  onClick={() => onRemove(p.id)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50"
                >
                  <X className="h-4 w-4" /> Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
