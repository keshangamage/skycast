# ☀️ SkyCast

  <h3>Beautiful weather, beautifully presented ✨</h3>
  
  <p>A modern, responsive weather application built with React and powered by the OpenWeather API</p>

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.13-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## 🌟 Features

### 🔍 **Smart Search & Location**

- **Global City Search**: Find weather for any city worldwide
- **GPS Location**: Get weather for your current location with one click
- **Search History**: Quick access to recently searched cities

### 📊 **Comprehensive Weather Data**

- **Current Conditions**: Temperature, humidity, wind speed, pressure, visibility
- **5-Day Forecast**: Extended weather predictions with detailed breakdowns
- **Sunrise/Sunset Times**: Solar data for your location
- **Feels-Like Temperature**: Real-feel temperature calculations
- **Wind Direction**: Cardinal direction indicators (N, NE, E, etc.)

### 🎨 **Beautiful Design**

- **Dynamic Backgrounds**: Changes based on weather conditions and time of day
- **Glass Morphism UI**: Modern frosted glass aesthetic with backdrop blur
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Smooth Animations**: Subtle transitions and hover effects
- **Weather Icons**: High-quality icons from OpenWeather

### ⭐ **Smart Features**

- **Favorites System**: Save up to 8 favorite cities for quick access
- **Unit Toggle**: Switch between Celsius and Fahrenheit instantly
- **Weather Alerts**: Smart notifications for extreme weather conditions
- **Local Storage**: Remembers your preferences and favorites

### 🚨 **Weather Alerts System**

Intelligent alerts for various weather conditions:

- **🔥 Extreme Heat Warning**: Temperatures ≥35°C
- **🥶 Extreme Cold Warning**: Temperatures ≤-10°C
- **💨 High Wind Advisory**: Wind speeds ≥15 m/s
- **⛈️ Thunderstorm Warning**: Active thunderstorms
- **❄️ Snow Advisory**: Snow conditions
- **☔ Rain Advisory**: Rainy weather
- **💧 High Humidity**: Humidity ≥85%

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **OpenWeather API Key** ([Get one free here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/keshangamage/skycast.git
   cd skycast
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenWeather API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   VITE_DEFAULT_CITY=Colombo
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

---

## 🛠️ Available Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |

---

## 🏗️ Tech Stack

### **Frontend Framework**

- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.6** - Next-generation frontend tooling

### **Styling & UI**

- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **CSS3** - Custom animations and glass morphism effects
- **Responsive Design** - Mobile-first approach

### **API & Data**

- **OpenWeather API** - Comprehensive weather data
- **Geolocation API** - Browser location services
- **Local Storage** - Client-side data persistence

### **Development Tools**

- **ESLint** - Code linting and quality assurance
- **Vite Plugin React** - Fast refresh and React support

---

## 📁 Project Structure

```
SkyCast/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and logos
│   │   ├── logo.png
│   │   └── skycast logo.png
│   ├── components/        # React components
│   │   ├── AlertsBanner.jsx      # Weather alert system
│   │   ├── FavoritesManager.jsx  # Favorites functionality
│   │   ├── ForecastCard.jsx      # 5-day weather forecast
│   │   ├── LocationButton.jsx    # GPS location finder
│   │   ├── SearchBar.jsx         # City search interface
│   │   ├── UnitToggle.jsx        # Temperature unit switcher
│   │   └── WeatherCard.jsx       # Main weather display
│   ├── lib/
│   │   └── openWeather.js        # OpenWeather API integration
│   ├── App.jsx            # Main application component
│   ├── App.css            # Custom styles and animations
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

---

## 🎯 Key Components

### **App.jsx**

- Main application orchestrator
- State management for weather data
- Dynamic background generation
- API integration coordination

### **WeatherCard.jsx**

- Primary weather information display
- Temperature, conditions, and detailed metrics
- Responsive layout with glass morphism design

### **ForecastCard.jsx**

- 5-day weather forecast visualization
- Daily weather summaries with icons
- Temperature ranges and conditions

### **FavoritesManager.jsx**

- Complete favorites system implementation
- Local storage integration
- Add/remove favorite cities
- Quick access dropdown

### **AlertsBanner.jsx**

- Intelligent weather alert system
- Condition-based notifications
- Color-coded alert types
- Actionable weather warnings

---

## 🌍 Environment Variables

| Variable                   | Description                     | Required | Default  |
| -------------------------- | ------------------------------- | -------- | -------- |
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeather API key        | ✅ Yes   | -        |
| `VITE_DEFAULT_CITY`        | Default city to load on startup | ❌ No    | `London` |

---

## 📱 Responsive Design

SkyCast is built with a mobile-first approach and provides an optimal experience across all devices:

- **Mobile** (320px+): Compact layout with touch-friendly interactions
- **Tablet** (768px+): Enhanced layout with better spacing
- **Desktop** (1024px+): Full-featured layout with side-by-side components
- **Large Screens** (1440px+): Optimized for high-resolution displays

---

## 🎨 Design Features

### **Dynamic Backgrounds**

The application background adapts based on:

- Current weather conditions (clear, cloudy, rainy, etc.)
- Time of day (day/night themes)
- Smooth transitions between states

### **Glass Morphism**

- Frosted glass effect with backdrop blur
- Semi-transparent elements
- Subtle borders and shadows
- Modern, elegant aesthetic

### **Micro-Interactions**

- Hover effects on buttons and cards
- Loading animations
- Smooth transitions
- Visual feedback for user actions

---

## 🔧 Configuration

### **ESLint Configuration**

The project uses a modern ESLint setup with:

- React-specific rules
- React Hooks linting
- React Refresh support
- Custom variable naming patterns

### **Vite Configuration**

Optimized Vite setup featuring:

- React plugin for fast refresh
- Tailwind CSS integration
- Production build optimization

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**

- Follow the existing code style
- Add comments for complex logic
- Test thoroughly across devices
- Update documentation as needed

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Keshan Gamage**

- GitHub: [@keshangamage](https://github.com/keshangamage)
- Project: [SkyCast](https://github.com/keshangamage/skycast)

---

## 🙏 Acknowledgments

- **OpenWeather** for providing comprehensive weather data
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the lightning-fast build tool

---

<div align="center">
  <p>Made with ❤️ for beautiful weather experiences</p>
  <p>⭐ Star this project if you find it useful!</p>
</div>
