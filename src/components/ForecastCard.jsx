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
    <div className="mt-6 relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>

      <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/20 backdrop-blur-lg shadow-2xl">
        <div className="px-8 py-6">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            📅 5-Day Forecast
          </h3>

          <div className="grid gap-4">
            {next5Days.map((day, index) => {
              const date = new Date(day.dt * 1000);
              const condition = day.weather?.[0];
              const icon = condition?.icon
                ? `https://openweathermap.org/img/wn/${condition.icon}.png`
                : null;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 px-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 text-left">
                      <p className="text-white font-semibold">
                        {formatDate(date)}
                      </p>
                      <p className="text-white/70 text-sm">
                        {date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {icon ? (
                        <img
                          src={icon}
                          alt={condition?.description || "Weather"}
                          className="w-10 h-10"
                        />
                      ) : (
                        <span className="text-2xl">
                          {getWeatherEmoji(condition?.main)}
                        </span>
                      )}
                      <div>
                        <p className="text-white font-medium">
                          {condition?.main || "Clear"}
                        </p>
                        <p className="text-white/70 text-sm capitalize">
                          {condition?.description || "clear sky"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-semibold text-lg">
                        {formatTemp(day.main?.temp, units)}
                      </p>
                      <p className="text-white/70 text-sm">
                        {day.main?.humidity}% humidity
                      </p>
                    </div>

                    {day.wind?.speed && (
                      <div className="text-right">
                        <p className="text-white/80 text-sm">
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
