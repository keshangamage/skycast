/**
 * @param {string} city - City name (e.g., "Colombo", "London,UK")
 * @param {string} apiKey - OpenWeather API key
 * @param {('standard'|'metric'|'imperial')} units - Temperature units
 */
export async function fetchWeatherByCity(city, apiKey, units = "metric") {
  const params = new URLSearchParams({ q: city, appid: apiKey, units });
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`
  );

  const tryParseJson = async () => {
    try {
      return await res.clone().json();
    } catch {
      return null;
    }
  };

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("City not found. Please check the name and try again.");
    }
    if (res.status === 401) {
      throw new Error(
        "Invalid API key. See OpenWeather FAQ or check VITE_OPENWEATHER_API_KEY."
      );
    }
    const json = await tryParseJson();
    const apiMsg = json?.message || json?.error?.message;
    const text = !json ? await res.text().catch(() => "") : "";
    throw new Error(
      apiMsg || text || `Request failed with status ${res.status}`
    );
  }

  const data = await res.json();
  return data;
}

/**
 * @param {string} city - City name (e.g., "Colombo", "London,UK")
 * @param {string} apiKey - OpenWeather API key
 * @param {('standard'|'metric'|'imperial')} units - Temperature units
 */
export async function fetchForecastByCity(city, apiKey, units = "metric") {
  const params = new URLSearchParams({ q: city, appid: apiKey, units });
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?${params.toString()}`
  );

  const tryParseJson = async () => {
    try {
      return await res.clone().json();
    } catch {
      return null;
    }
  };

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("City not found. Please check the name and try again.");
    }
    if (res.status === 401) {
      throw new Error(
        "Invalid API key. See OpenWeather FAQ or check VITE_OPENWEATHER_API_KEY."
      );
    }
    const json = await tryParseJson();
    const apiMsg = json?.message || json?.error?.message;
    const text = !json ? await res.text().catch(() => "") : "";
    throw new Error(
      apiMsg || text || `Request failed with status ${res.status}`
    );
  }

  const data = await res.json();
  return data;
}

/**
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} apiKey - OpenWeather API key
 * @param {('standard'|'metric'|'imperial')} units - Temperature units
 */
export async function fetchWeatherByCoords(lat, lon, apiKey, units = "metric") {
  const params = new URLSearchParams({ lat, lon, appid: apiKey, units });
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`
  );

  const tryParseJson = async () => {
    try {
      return await res.clone().json();
    } catch {
      return null;
    }
  };

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error(
        "Invalid API key. See OpenWeather FAQ or check VITE_OPENWEATHER_API_KEY."
      );
    }
    const json = await tryParseJson();
    const apiMsg = json?.message || json?.error?.message;
    const text = !json ? await res.text().catch(() => "") : "";
    throw new Error(
      apiMsg || text || `Request failed with status ${res.status}`
    );
  }

  const data = await res.json();
  return data;
}
