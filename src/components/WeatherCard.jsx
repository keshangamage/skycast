function formatTemp(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return `${Math.round(value)}°`;
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

export function WeatherCard({ weather }) {
  const {
    name,
    sys: { country } = {},
    main: { temp, feels_like, humidity, pressure, temp_min, temp_max } = {},
    weather: conditions = [],
    wind: { speed, deg } = {},
    visibility,
  } = weather || {};

  const primary = conditions[0];
  const icon = primary?.icon
    ? `https://openweathermap.org/img/wn/${primary.icon}@2x.png`
    : null;

  const weatherEmoji = getWeatherEmoji(primary?.main);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>

      <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/20 backdrop-blur-lg shadow-2xl">
        {/* Main weather display */}
        <div className="relative px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                {icon && (
                  <>
                    <img
                      src={icon}
                      alt={primary?.description || "Weather icon"}
                      className="h-20 w-20 drop-shadow-lg"
                    />
                    <div className="absolute top-0 right-0 text-2xl animate-bounce">
                      {weatherEmoji}
                    </div>
                  </>
                )}
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1 flex items-center gap-2">
                  {name}
                  {country && (
                    <span className="text-lg font-normal text-white/80">
                      ({country})
                    </span>
                  )}
                </h2>
                <p className="text-white/80 text-lg capitalize font-medium mb-2">
                  {primary?.description || "—"}
                </p>
                <div className="flex items-center gap-2 text-white/60">
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

            <div className="text-right">
              <div className="text-6xl lg:text-7xl font-black text-white drop-shadow-lg mb-2">
                {formatTemp(temp)}
              </div>
              <div className="text-white/80 text-lg">
                Feels like {formatTemp(feels_like)}
              </div>
              {temp_min != null && temp_max != null && (
                <div className="text-white/60 text-sm mt-1">
                  {formatTemp(temp_min)} / {formatTemp(temp_max)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weather details grid */}
        <div className="border-t border-white/20 bg-white/10 px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <WeatherStat
              icon={
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
                  className="w-5 h-5"
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
              label="Wind Speed"
              value={speed != null ? `${Math.round(speed)} m/s` : "—"}
            />
            <WeatherStat
              icon={
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
                  className="w-5 h-5"
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
        </div>
      </div>
    </div>
  );
}

function WeatherStat({ icon, label, value }) {
  return (
    <div className="group flex flex-col items-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-2 mb-2 text-white/80 group-hover:text-white transition-colors">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-xl font-bold text-white group-hover:scale-110 transition-transform duration-200">
        {value}
      </div>
    </div>
  );
}
