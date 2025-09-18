## SkyCast

Beautiful weather, beautifully presented. A sleek React + Vite app that fetches real-time weather data from OpenWeather and renders a modern, animated UI with Tailwind CSS.

## Features

- City search with enter-to-search and loading state
- Dynamic, time- and condition-based gradient backgrounds
- Clean weather card with temperature, feels-like, highs/lows
- Details grid: humidity, wind, pressure, visibility
- Friendly error messages for common API failures
- Built with React 19, Vite, and Tailwind CSS 4

## Tech stack

- `React 19`, `Vite 7`
- `Tailwind CSS 4` via `@tailwindcss/vite`
- `ESLint 9` with React Hooks and Fast Refresh rules

## Quick start

Prerequisites:

- Node.js 18+ and npm

Install and run the dev server:

```sh
npm install

# Create an .env file with your API key (required) and optional default city
printf "VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE\nVITE_DEFAULT_CITY=London\n" > .env

# Start the app
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`). If you add or change environment variables, restart the dev server.

## Environment variables

Create a `.env` (or `.env.local`) in the project root:

- `VITE_OPENWEATHER_API_KEY` (required): Your OpenWeather API key
- `VITE_DEFAULT_CITY` (optional): City name to auto-load on startup (default: `London`)

Vite exposes env vars prefixed with `VITE_` at build time. After editing `.env`, restart the dev server.

## Available scripts

```sh
npm run dev      # Start Vite dev server
npm run build    # Production build to ./dist
npm run preview  # Preview the production build locally
npm run lint     # Lint the project
```

## How it works

- UI entry: `src/main.jsx` renders `App`
- Core UI: `src/App.jsx`
- Components: `src/components/SearchBar.jsx`, `src/components/WeatherCard.jsx`
- API client: `src/lib/openWeather.js` (calls OpenWeather Current Weather endpoint)

By default, requests are made in metric units. Error cases such as invalid API key (401) and unknown city (404) surface readable messages in the UI.

## Project structure

```
src/
	App.jsx
	main.jsx
	index.css          # Tailwind v4 entry
	components/
		SearchBar.jsx
		WeatherCard.jsx
	lib/
		openWeather.js   # fetchWeatherByCity(city, apiKey, units='metric')
public/
index.html
vite.config.js
eslint.config.js
```

## OpenWeather setup

1. Create a free account at https://openweathermap.org/
2. Generate an API key (Home → My API keys)
3. Put it in `.env` as `VITE_OPENWEATHER_API_KEY`

Notes:

- Free keys can take several minutes to activate after creation
- OpenWeather applies rate limits; consult their pricing/limits page

## Troubleshooting

- “Missing API key” in the app: Add `VITE_OPENWEATHER_API_KEY` to `.env` and restart `npm run dev`.
- 401 Invalid API key: Verify the key and that it’s fully activated.
- 404 City not found: Check spelling or try including country (e.g., `Paris,FR`).
- Env changes not reflected: Stop and restart the dev server so Vite reloads env vars.

## Build and deploy

Production build:

```sh
npm run build
npm run preview
```

Deploy to any static host (Netlify, Vercel, GitHub Pages, etc.):

- Build command: `npm run build`
- Output directory: `dist`
- Remember to configure `VITE_OPENWEATHER_API_KEY` as an environment variable in your hosting provider.

## Acknowledgements

- Weather data by OpenWeather (https://openweathermap.org/)
- Built with React, Vite, and Tailwind CSS

