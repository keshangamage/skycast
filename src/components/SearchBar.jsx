export function SearchBar({
  value,
  onChange,
  onSearch,
  loading = false,
  placeholder = "Search city",
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") onSearch();
  }

  return (
    <div className="flex items-center gap-3 group">
      <div className="relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-sm"></div>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-white/60"
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
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="relative w-full rounded-2xl border border-white/30 bg-white/20 backdrop-blur-lg pl-12 pr-6 py-4 text-lg text-white placeholder:text-white/60 shadow-2xl outline-none transition-all duration-300 hover:bg-white/25 hover:border-white/40 focus:bg-white/30 focus:border-white/50 focus:ring-4 focus:ring-white/20 focus:scale-[1.02]"
        />
      </div>
      <button
        onClick={onSearch}
        disabled={loading}
        className="relative inline-flex min-w-32 items-center justify-center rounded-2xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg px-6 py-4 text-lg font-semibold text-white shadow-2xl border border-white/30 transition-all duration-300 hover:from-white/30 hover:to-white/20 hover:border-white/40 hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        <span className="relative flex items-center gap-2">
          {loading ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
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
              Search
            </>
          )}
        </span>
      </button>
    </div>
  );
}
