import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar.jsx";
import { WeatherCard } from "./components/WeatherCard.jsx";
import { fetchWeatherByCity } from "./lib/openWeather.js";
import logoUrl from "./assets/logo.png";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = (import.meta.env.VITE_OPENWEATHER_API_KEY || "").trim();
  const defaultCity = import.meta.env.VITE_DEFAULT_CITY || "London";

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

  // Fetch default city on mount to demonstrate the UI
  useEffect(() => {
    if (!apiKey) return;
    handleSearch(defaultCity);
  }, [apiKey]);

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
      const data = await fetchWeatherByCity(term, apiKey, "metric");
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
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

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <header className="mb-12 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center gap-4">
            <div className="relative">
              <img
                src={logoUrl}
                alt="SkyCast logo"
                className="h-15 w-15 rounded-2xl shadow-2xl ring-4 ring-white/30 backdrop-blur-sm"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent"></div>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-lg sm:text-6xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              SkyCast
            </h1>
          </div>
          <p className="text-xl text-white/90 font-medium drop-shadow-md">
            Beautiful weather, beautifully presented ✨
          </p>
        </header>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => handleSearch()}
          loading={loading}
          placeholder="Search any city worldwide..."
        />

        {error && (
          <div className="mt-6 rounded-2xl border border-red-300/30 bg-red-500/10 backdrop-blur-sm p-6 text-white shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-red-400 flex-shrink-0"></div>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {weather && (
          <div className="mt-8 transform transition-all duration-500 animate-fadeIn">
            <WeatherCard weather={weather} />
          </div>
        )}

        {!weather && !error && !loading && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <svg
                className="w-8 h-8 text-white"
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
            <p className="text-xl text-white/80 font-medium mb-2">
              Discover weather anywhere 🌍
            </p>
            <p className="text-white/60">
              Search for any city to see beautiful, real-time weather data
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
