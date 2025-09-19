function formatTemp(value, unit = "metric") {
  if (value == null || Number.isNaN(value)) return "—";
  const symbol = unit === "metric" ? "°C" : "°F";
  return `${Math.round(value)}${symbol}`;
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

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function ForecastCard({ forecast, units = "metric" }) {
  if (!forecast?.list) {
    return null;
  }

  const dailyForecasts = [];
  const processedDates = new Set();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();

    if (!processedDates.has(dateKey)) {
      processedDates.add(dateKey);
      dailyForecasts.push(item);
    }
  });

  // Take only next 5 days
  const next5Days = dailyForecasts.slice(0, 5);

  return (
    <div className="mt-4 sm:mt-6 relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl sm:rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>

      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/30 bg-white/20 backdrop-blur-lg shadow-2xl">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
            📅 5-Day Forecast
          </h3>

          <div className="grid gap-3 sm:gap-4">
            {next5Days.map((day, index) => {
              const date = new Date(day.dt * 1000);
              const condition = day.weather?.[0];
              const icon = condition?.icon
                ? `https://openweathermap.org/img/wn/${condition.icon}.png`
                : null;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-4 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 gap-3 sm:gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
                    <div className="w-full sm:w-20 text-left">
                      <p className="text-white font-semibold text-sm sm:text-base">
                        {formatDate(date)}
                      </p>
                      <p className="text-white/70 text-xs sm:text-sm">
                        {date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 flex-1">
                      {icon ? (
                        <img
                          src={icon}
                          alt={condition?.description || "Weather"}
                          className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                        />
                      ) : (
                        <span className="text-xl sm:text-2xl flex-shrink-0">
                          {getWeatherEmoji(condition?.main)}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm sm:text-base truncate">
                          {condition?.main || "Clear"}
                        </p>
                        <p className="text-white/70 text-xs sm:text-sm capitalize truncate">
                          {condition?.description || "clear sky"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="text-left sm:text-right">
                      <p className="text-white font-semibold text-base sm:text-lg">
                        {formatTemp(day.main?.temp, units)}
                      </p>
                      <p className="text-white/70 text-xs sm:text-sm">
                        {day.main?.humidity}% humidity
                      </p>
                    </div>

                    {day.wind?.speed && (
                      <div className="text-right">
                        <p className="text-white/80 text-xs sm:text-sm">
                          💨 {Math.round(day.wind.speed)} m/s
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
