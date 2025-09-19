import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar.jsx";
import { WeatherCard } from "./components/WeatherCard.jsx";
import { ForecastCard } from "./components/ForecastCard.jsx";
import { LocationButton } from "./components/LocationButton.jsx";
import { FavoritesManager } from "./components/FavoritesManager.jsx";
import { UnitToggle } from "./components/UnitToggle.jsx";
import { AlertsBanner } from "./components/AlertsBanner.jsx";
import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
} from "./lib/openWeather.js";
import logoUrl from "./assets/logo.png";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [units, setUnits] = useState("metric");

  const apiKey = (import.meta.env.VITE_OPENWEATHER_API_KEY || "").trim();
  const defaultCity = import.meta.env.VITE_DEFAULT_CITY || "Colombo, Sri Lanka";

  // Initialize favorites manager
  const favoritesManager = FavoritesManager({
    onCitySelect: handleSearch,
    loading,
  });

  const getWeatherBackground = () => {
    if (!weather?.weather?.[0]) return "from-blue-400 via-blue-500 to-blue-600";

    const condition = weather.weather[0].main.toLowerCase();
    const time = new Date().getHours();
    const isNight = time < 6 || time > 18;

    if (condition.includes("clear")) {
      return isNight
        ? "from-indigo-900 via-purple-900 to-blue-900"
        : "from-blue-400 via-blue-500 to-cyan-500";
    } else if (condition.includes("cloud")) {
      return isNight
        ? "from-gray-700 via-gray-800 to-gray-900"
        : "from-gray-400 via-gray-500 to-blue-500";
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      return isNight
        ? "from-slate-800 via-slate-900 to-blue-900"
        : "from-slate-500 via-blue-600 to-blue-700";
    } else if (condition.includes("snow")) {
      return isNight
        ? "from-blue-900 via-indigo-900 to-slate-900"
        : "from-blue-200 via-blue-300 to-blue-400";
    } else if (condition.includes("thunder")) {
      return "from-gray-800 via-purple-900 to-gray-900";
    }

    return isNight
      ? "from-indigo-900 via-purple-900 to-blue-900"
      : "from-blue-400 via-blue-500 to-cyan-500";
  };

  useEffect(() => {
    if (!apiKey) return;

    // Initial load with default city
    const loadDefaultWeather = async () => {
      if (!defaultCity) return;

      try {
        setLoading(true);
        setError("");
        setWeather(null);
        setForecast(null);

        // Fetch both current weather and forecast in parallel
        const [weatherData, forecastData] = await Promise.all([
          fetchWeatherByCity(defaultCity, apiKey, units),
          fetchForecastByCity(defaultCity, apiKey, units),
        ]);

        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setWeather(null);
        setForecast(null);
        setError(err.message || "Failed to fetch weather");
      } finally {
        setLoading(false);
      }
    };

    loadDefaultWeather();
  }, [apiKey, defaultCity, units]);

  async function handleSearch(city) {
    const term = city?.trim() || query.trim();
    if (!term) return;
    if (!apiKey) {
      setError(
        "Missing API key. Set VITE_OPENWEATHER_API_KEY in .env and restart the dev server."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast(null);

      // Fetch both current weather and forecast in parallel
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(term, apiKey, units),
        fetchForecastByCity(term, apiKey, units),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  }

  async function handleLocationFound(lat, lon) {
    if (!apiKey) {
      setError(
        "Missing API key. Set VITE_OPENWEATHER_API_KEY in .env and restart the dev server."
      );
      return;
    }
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast(null);

      // Fetch weather by coordinates
      const weatherData = await fetchWeatherByCoords(lat, lon, apiKey, units);

      let forecastData = null;
      if (weatherData?.name) {
        try {
          forecastData = await fetchForecastByCity(
            weatherData.name,
            apiKey,
            units
          );
        } catch (forecastErr) {
          console.warn(
            "Could not fetch forecast for location:",
            forecastErr.message
          );
        }
      }

      setWeather(weatherData);
      setForecast(forecastData);

      // Update the search query with the found city name
      if (weatherData?.name) {
        setQuery(weatherData.name);
      }
    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError(err.message || "Failed to fetch weather for your location");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnitChange(newUnits) {
    setUnits(newUnits);

    // If we have current weather data, refetch with new units
    if (weather?.name) {
      try {
        setLoading(true);
        const [weatherData, forecastData] = await Promise.all([
          fetchWeatherByCity(weather.name, apiKey, newUnits),
          fetchForecastByCity(weather.name, apiKey, newUnits),
        ]);

        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(err.message || "Failed to refresh weather data");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getWeatherBackground()} relative overflow-hidden transition-all duration-1000`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        <header className="mb-8 sm:mb-12 text-center">
          <div className="mx-auto mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={logoUrl}
                alt="SkyCast logo"
                className="h-12 w-12 sm:h-15 sm:w-15 rounded-xl sm:rounded-2xl shadow-2xl ring-2 sm:ring-4 ring-white/30 backdrop-blur-sm"
              />
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-white/20 to-transparent"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              SkyCast
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 font-medium drop-shadow-md px-4">
            Beautiful weather, beautifully presented ✨
          </p>
        </header>

        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-md sm:max-w-none">
            <LocationButton
              onLocationFound={handleLocationFound}
              loading={loading}
            />
            <UnitToggle
              unit={units}
              onUnitChange={handleUnitChange}
              loading={loading}
            />
            <favoritesManager.FavoritesButton />
          </div>
          <div className="w-full max-w-2xl">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={() => handleSearch()}
              loading={loading}
              placeholder="Search any city worldwide..."
            />
          </div>
        </div>

        <favoritesManager.FavoritesList />

        {error && (
          <div className="mt-4 sm:mt-6 mx-3 sm:mx-0 rounded-xl sm:rounded-2xl border border-red-300/30 bg-red-500/10 backdrop-blur-sm p-4 sm:p-6 text-white shadow-xl">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-400 flex-shrink-0 mt-0.5 sm:mt-0"></div>
              <p className="font-medium text-sm sm:text-base leading-relaxed">
                {error}
              </p>
            </div>
          </div>
        )}

        {weather && (
          <div className="mt-6 sm:mt-8 mx-3 sm:mx-0 transform transition-all duration-500 animate-fadeIn">
            <AlertsBanner weather={weather} />
            <WeatherCard
              weather={weather}
              AddToFavoritesButton={favoritesManager.AddToFavoritesButton}
              units={units}
            />
            {forecast && <ForecastCard forecast={forecast} units={units} />}
          </div>
        )}

        {!weather && !error && !loading && (
          <div className="mt-8 sm:mt-12 text-center px-4">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-lg sm:text-xl text-white/80 font-medium mb-2">
              Discover weather anywhere 🌍
            </p>
            <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto">
              Search for any city to see beautiful, real-time weather data
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
