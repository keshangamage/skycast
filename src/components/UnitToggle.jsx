export function UnitToggle({ unit, onUnitChange, loading = false }) {
  const isCelsius = unit === "metric";

  return (
    <button
      onClick={() => onUnitChange(isCelsius ? "imperial" : "metric")}
      disabled={loading}
      className="relative inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500/30 to-blue-500/30 backdrop-blur-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white shadow-2xl border border-white/30 transition-all duration-300 hover:from-green-500/40 hover:to-blue-500/40 hover:border-white/40 hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 group overflow-hidden min-w-[80px] sm:min-w-[120px]"
      title={`Switch to ${isCelsius ? "Fahrenheit" : "Celsius"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      <span className="relative flex items-center gap-2">
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
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a5 5 0 0010 0v-6a3 3 0 00-3-3H9a3 3 0 00-3 3v2.5z"
          />
        </svg>
        <span className="font-semibold text-sm sm:text-base">
          {isCelsius ? "°C" : "°F"}
        </span>
        <span className="hidden lg:inline text-sm opacity-80">
          {isCelsius ? "Celsius" : "Fahrenheit"}
        </span>
      </span>
    </button>
  );
}
