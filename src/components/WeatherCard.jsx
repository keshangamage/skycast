function formatTemp(value, unit = "metric") {
  if (value == null || Number.isNaN(value)) return "—";
  const symbol = unit === "metric" ? "°C" : "°F";
  return `${Math.round(value)}${symbol}`;
}

function formatTime(timestamp) {
  if (!timestamp) return "—";
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getWindDirection(deg) {
  if (deg == null) return "—";
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(deg / 22.5) % 16];
}

function getWeatherEmoji(condition) {
  const weather = condition?.toLowerCase() || "";
  if (weather.includes("clear")) return "☀️";
  if (weather.includes("cloud")) return "☁️";
  if (weather.includes("rain")) return "🌧️";
  if (weather.includes("drizzle")) return "🌦️";
  if (weather.includes("snow")) return "❄️";
  if (weather.includes("thunder")) return "⛈️";
  if (weather.includes("mist") || weather.includes("fog")) return "🌫️";
  return "🌤️";
}

export function WeatherCard({
  weather,
  AddToFavoritesButton,
  units = "metric",
}) {
  const {
    name,
    sys: { country, sunrise, sunset } = {},
    main: { temp, feels_like, humidity, pressure, temp_min, temp_max } = {},
    weather: conditions = [],
    wind: { speed, deg } = {},
    visibility,
    coord: { lat, lon } = {},
  } = weather || {};

  const primary = conditions[0];
  const icon = primary?.icon
    ? `https://openweathermap.org/img/wn/${primary.icon}@2x.png`
    : null;

  const weatherEmoji = getWeatherEmoji(primary?.main);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl sm:rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>

      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/30 bg-white/20 backdrop-blur-lg shadow-2xl">
        {/* Main weather display */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
              <div className="relative self-center sm:self-auto">
                {icon && (
                  <>
                    <img
                      src={icon}
                      alt={primary?.description || "Weather icon"}
                      className="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-lg"
                    />
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-2xl sm:text-3xl">
                      {weatherEmoji}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2 text-center sm:text-left w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                    {name}
                    {country && (
                      <span className="ml-2 text-lg sm:text-xl lg:text-2xl font-normal text-white/80">
                        {country}
                      </span>
                    )}
                  </h2>
                  {AddToFavoritesButton && (
                    <div className="flex-shrink-0">
                      <AddToFavoritesButton cityName={name} country={country} />
                    </div>
                  )}
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 capitalize font-medium drop-shadow-sm">
                  {primary?.description || "Clear sky"}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-white/70">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right w-full lg:w-auto">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-white drop-shadow-lg mb-2">
                {formatTemp(temp, units)}
              </div>
              <div className="text-white/80 text-base sm:text-lg">
                Feels like {formatTemp(feels_like, units)}
              </div>
              {temp_min != null && temp_max != null && (
                <div className="text-white/60 text-sm mt-1">
                  {formatTemp(temp_min, units)} / {formatTemp(temp_max, units)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weather details grid */}
        <div className="border-t border-white/20 bg-white/10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <WeatherStat
              icon={
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
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.4 4.4 0 003 15z"
                  />
                </svg>
              }
              label="Humidity"
              value={humidity != null ? `${humidity}%` : "—"}
            />
            <WeatherStat
              icon={
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
              }
              label="Wind"
              value={
                speed != null
                  ? `${Math.round(speed)} m/s ${getWindDirection(deg)}`
                  : "—"
              }
            />
            <WeatherStat
              icon={
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              label="Pressure"
              value={pressure != null ? `${pressure} hPa` : "—"}
            />
            <WeatherStat
              icon={
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              }
              label="Visibility"
              value={
                visibility != null
                  ? `${(visibility / 1000).toFixed(1)} km`
                  : "—"
              }
            />
          </div>

          {/* Enhanced details section */}
          {(sunrise || sunset || lat != null) && (
            <div className="border-t border-white/20 pt-4 sm:pt-6">
              <h4 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Additional Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {sunrise && (
                  <WeatherStat
                    icon={
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    }
                    label="Sunrise"
                    value={formatTime(sunrise)}
                  />
                )}
                {sunset && (
                  <WeatherStat
                    icon={
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    }
                    label="Sunset"
                    value={formatTime(sunset)}
                  />
                )}
                {lat != null && lon != null && (
                  <WeatherStat
                    icon={
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    }
                    label="Coordinates"
                    value={`${lat.toFixed(2)}, ${lon.toFixed(2)}`}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WeatherStat({ icon, label, value }) {
  return (
    <div className="group flex flex-col items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-2 mb-1 sm:mb-2 text-white/80 group-hover:text-white transition-colors">
        {icon}
        <span className="text-xs sm:text-sm font-medium">{label}</span>
      </div>
      <div className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:scale-110 transition-transform duration-200 text-center">
        {value}
      </div>
    </div>
  );
}
