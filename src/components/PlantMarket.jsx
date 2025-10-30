import { useMemo } from "react";
import { Heart, MapPin, Search, Filter } from "lucide-react";

function PlantCard({ plant, onAddWishlist }) {
  return (
    <div className="group bg-white/90 backdrop-blur rounded-xl border border-gray-200 hover:shadow-md transition overflow-hidden">
      <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-emerald-100 relative">
        <div className="absolute inset-0 p-3 flex items-end">
          <span className="text-xs font-medium bg-white/80 backdrop-blur px-2 py-1 rounded-md text-gray-700">
            {plant.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900 leading-tight">
              {plant.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {plant.description}
            </p>
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{plant.location}</span>
            </div>
          </div>
          <button
            onClick={() => onAddWishlist(plant)}
            className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
          >
            <Heart className="h-4 w-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlantMarket({
  plants,
  search,
  setSearch,
  filters,
  setFilters,
  onAddWishlist,
}) {
  const filtered = useMemo(() => {
    return plants.filter((p) => {
      const matchesSearch = `${p.name} ${p.category} ${p.location}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        !filters.category || p.category === filters.category;
      const matchesLocation =
        !filters.location || p.location === filters.location;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [plants, search, filters]);

  const categories = Array.from(new Set(plants.map((p) => p.category)));
  const locations = Array.from(new Set(plants.map((p) => p.location)));

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plants, categories, locations..."
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filters.category || ""}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, category: e.target.value || null }))
                }
                className="bg-transparent text-sm focus:outline-none"
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white">
              <MapPin className="h-4 w-4 text-gray-500" />
              <select
                value={filters.location || ""}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, location: e.target.value || null }))
                }
                className="bg-transparent text-sm focus:outline-none"
              >
                <option value="">Anywhere</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((plant) => (
          <PlantCard key={plant.id} plant={plant} onAddWishlist={onAddWishlist} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-600 bg-white/70 border border-gray-200 rounded-xl p-10">
            No plants match your filters yet.
          </div>
        )}
      </div>
    </section>
  );
}
