function getAlertType(condition, temp, windSpeed, humidity) {
  const alerts = [];

  // Temperature-based alerts
  if (temp >= 35) {
    alerts.push({
      type: "warning",
      icon: "🔥",
      title: "Extreme Heat Warning",
      message:
        "Very high temperatures detected. Stay hydrated and avoid prolonged sun exposure.",
    });
  } else if (temp <= -10) {
    alerts.push({
      type: "warning",
      icon: "🥶",
      title: "Extreme Cold Warning",
      message:
        "Very low temperatures detected. Dress warmly and limit outdoor exposure.",
    });
  }

  // Wind-based alerts
  if (windSpeed >= 15) {
    alerts.push({
      type: "caution",
      icon: "💨",
      title: "High Wind Advisory",
      message:
        "Strong winds detected. Secure loose objects and use caution when driving.",
    });
  }

  // Weather condition alerts
  const weatherLower = condition?.toLowerCase() || "";
  if (weatherLower.includes("thunder")) {
    alerts.push({
      type: "danger",
      icon: "⛈️",
      title: "Thunderstorm Warning",
      message:
        "Thunderstorms in the area. Seek shelter indoors and avoid outdoor activities.",
    });
  } else if (weatherLower.includes("snow")) {
    alerts.push({
      type: "caution",
      icon: "❄️",
      title: "Snow Advisory",
      message:
        "Snow conditions detected. Drive carefully and allow extra travel time.",
    });
  } else if (
    weatherLower.includes("rain") ||
    weatherLower.includes("drizzle")
  ) {
    alerts.push({
      type: "info",
      icon: "☔",
      title: "Rain Advisory",
      message:
        "Rainy conditions expected. Carry an umbrella and drive carefully.",
    });
  }

  // Humidity alerts
  if (humidity >= 85) {
    alerts.push({
      type: "info",
      icon: "💧",
      title: "High Humidity",
      message: "Very humid conditions. Stay cool and hydrated.",
    });
  }

  return alerts;
}

function AlertIcon({ type }) {
  const colors = {
    danger: "text-red-400",
    warning: "text-orange-400",
    caution: "text-yellow-400",
    info: "text-blue-400",
  };

  return (
    <div
      className={`w-2 h-2 rounded-full ${
        colors[type] || colors.info
      } animate-pulse`}
    ></div>
  );
}

export function AlertsBanner({ weather }) {
  if (!weather) return null;

  const { main, weather: conditions = [], wind } = weather;
  const condition = conditions[0]?.main;
  const alerts = getAlertType(
    condition,
    main?.temp,
    wind?.speed,
    main?.humidity
  );

  if (alerts.length === 0) return null;

  return (
    <div className="mt-4 sm:mt-6 mb-4 sm:mb-5 space-y-2 sm:space-y-3">
      {alerts.map((alert, index) => (
        <div key={index} className="relative group animate-fadeIn">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl sm:rounded-2xl blur-sm"></div>
          <div
            className={`relative overflow-hidden rounded-xl sm:rounded-2xl border backdrop-blur-lg shadow-xl ${
              alert.type === "danger"
                ? "border-red-400/40 bg-red-500/20"
                : alert.type === "warning"
                ? "border-orange-400/40 bg-orange-500/20"
                : alert.type === "caution"
                ? "border-yellow-400/40 bg-yellow-500/20"
                : "border-blue-400/40 bg-blue-500/20"
            }`}
          >
            <div className="px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="text-xl sm:text-2xl flex-shrink-0">
                  {alert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertIcon type={alert.type} />
                    <h4 className="font-semibold text-white text-sm sm:text-base lg:text-lg">
                      {alert.title}
                    </h4>
                  </div>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                    {alert.message}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 rounded-lg text-xs font-medium flex-shrink-0 ${
                    alert.type === "danger"
                      ? "bg-red-500/30 text-red-200"
                      : alert.type === "warning"
                      ? "bg-orange-500/30 text-orange-200"
                      : alert.type === "caution"
                      ? "bg-yellow-500/30 text-yellow-200"
                      : "bg-blue-500/30 text-blue-200"
                  }`}
                >
                  {alert.type.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
