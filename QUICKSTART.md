# Weather App - Quick Start Guide

Get your Weather App up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Your API Key
1. Go to https://openweathermap.org/api
2. Sign up for a FREE account
3. Copy your API key from the dashboard

### 3. Add API Key
Open `src/config/env.js` and paste your API key:
```javascript
export const ENV = {
  OPENWEATHER_API_KEY: 'paste_your_key_here',
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
};
```

### 4. iOS Setup (macOS only)
```bash
cd ios && pod install && cd ..
```

### 5. Run the App

**Web (Easiest!):**
```bash
npm run web
```
Opens automatically in your browser at http://localhost:3000

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

## ⚡ That's It!

The app should now be running on your device/simulator.

## 🔥 Key Features

- **Real-time Weather**: Current conditions for your location
- **5-Day Forecast**: Plan ahead with detailed forecasts
- **Search Cities**: Find weather anywhere in the world
- **Favorites**: Save your frequently checked locations
- **Dark Mode**: Easy on the eyes, day or night
- **Units Toggle**: Switch between Celsius and Fahrenheit

## 📱 Testing

1. **Allow location permission** when prompted
2. **Pull down** to refresh weather data
3. **Tap search icon** to find cities
4. **Tap heart icon** to save favorites
5. **Tap settings** to customize preferences

## ⚠️ Common Issues

### API Key Not Working?
- Wait 10-15 minutes (new keys need activation time)
- Check for typos in the key
- Ensure no extra spaces

### Location Not Working?
- Enable location services on your device
- Grant location permission to the app

### Build Errors?
```bash
# Clear cache and rebuild
npm start -- --reset-cache
```

## 📚 Full Documentation

For detailed setup and troubleshooting, see:
- `README.md` - Complete feature documentation
- `SETUP_GUIDE.md` - Detailed setup instructions

## 🆘 Need Help?

1. Run: `npx react-native doctor`
2. Check the SETUP_GUIDE.md for troubleshooting
3. Verify your development environment is properly configured

---

**Enjoy your weather app! 🌤️**

