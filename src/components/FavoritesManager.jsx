import { useState, useEffect } from "react";

const FAVORITES_KEY = "skycast-favorites";

export function FavoritesManager({ onCitySelect, loading = false }) {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites]);

  const addToFavorites = (cityName, country) => {
    const newFavorite = {
      id: Date.now(),
      name: cityName,
      country: country,
      displayName: country ? `${cityName}, ${country}` : cityName,
    };

    setFavorites((prev) => {
      // Check if city already exists
      const exists = prev.some(
        (fav) =>
          fav.name.toLowerCase() === cityName.toLowerCase() &&
          fav.country === country
      );

      if (exists) {
        return prev;
      }

      // Keep only last 8 favorites
      const updated = [newFavorite, ...prev].slice(0, 8);
      return updated;
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (cityName, country) => {
    return favorites.some(
      (fav) =>
        fav.name.toLowerCase() === cityName.toLowerCase() &&
        fav.country === country
    );
  };

  return {
    favorites,
    showFavorites,
    setShowFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    FavoritesButton: () => (
      <button
        onClick={() => setShowFavorites(!showFavorites)}
        disabled={loading}
        className="relative inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500/30 to-red-500/30 backdrop-blur-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white shadow-2xl border border-white/30 transition-all duration-300 hover:from-pink-500/40 hover:to-red-500/40 hover:border-white/40 hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 group overflow-hidden min-w-[100px] sm:min-w-[120px]"
        title="View favorite cities"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        <span className="relative flex items-center gap-2">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-sm sm:text-base">Favorites</span>
          {favorites.length > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </span>
      </button>
    ),
    FavoritesList: () =>
      showFavorites && (
        <div className="mt-3 sm:mt-4 mb-5 space-y-3 mx-3 sm:mx-0">
          <div className="relative group animate-fadeIn">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl sm:rounded-3xl blur-xl"></div>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/30 bg-white/20 backdrop-blur-lg shadow-2xl">
              <div className="px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    ❤️ Favorite Cities
                  </h3>
                  <button
                    onClick={() => setShowFavorites(false)}
                    className="text-white/60 hover:text-white transition-colors p-1"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {favorites.length === 0 ? (
                  <p className="text-white/70 text-center py-6 sm:py-8 text-sm sm:text-base leading-relaxed px-4">
                    No favorite cities yet. Search for a city and add it to
                    favorites!
                  </p>
                ) : (
                  <div className="grid gap-2">
                    {favorites.map((favorite) => (
                      <div
                        key={favorite.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group/item"
                      >
                        <button
                          onClick={() => {
                            onCitySelect(favorite.name);
                            setShowFavorites(false);
                          }}
                          disabled={loading}
                          className="flex-1 text-left text-white hover:text-white/90 transition-colors disabled:opacity-60 py-1 text-sm sm:text-base truncate"
                        >
                          {favorite.displayName}
                        </button>
                        <button
                          onClick={() => removeFromFavorites(favorite.id)}
                          className="text-red-400 hover:text-red-300 transition-colors opacity-70 group-hover/item:opacity-100 p-1 ml-2 flex-shrink-0"
                          title="Remove from favorites"
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
    AddToFavoritesButton: ({ cityName, country }) => {
      const isFav = isFavorite(cityName, country);

      return (
        <button
          onClick={() => {
            if (isFav) {
              const favorite = favorites.find(
                (fav) =>
                  fav.name.toLowerCase() === cityName.toLowerCase() &&
                  fav.country === country
              );
              if (favorite) {
                removeFromFavorites(favorite.id);
              }
            } else {
              addToFavorites(cityName, country);
            }
          }}
          className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl backdrop-blur-sm border transition-all duration-300 ${
            isFav
              ? "bg-red-500/20 border-red-400/40 text-red-200 hover:bg-red-500/30"
              : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
          }`}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            fill={isFav ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <span className="text-xs sm:text-sm">
            {isFav ? "Favorited" : "Add to Favorites"}
          </span>
        </button>
      );
    },
  };
}
