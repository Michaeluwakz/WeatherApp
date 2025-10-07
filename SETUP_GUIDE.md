# Weather App - Setup Guide

This guide will walk you through setting up and running the Weather App on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** or **yarn**
   - npm comes with Node.js
   - Yarn: `npm install -g yarn`

3. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

4. **Watchman** (recommended for macOS)
   ```bash
   brew install watchman
   ```

### For iOS Development

5. **Xcode** (macOS only, latest version)
   - Download from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

6. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

### For Android Development

7. **Android Studio**
   - Download from: https://developer.android.com/studio
   - During installation, ensure these components are selected:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

8. **Environment Variables** (Add to `.bash_profile`, `.zshrc`, or `.bashrc`)
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## Step-by-Step Setup

### 1. Get OpenWeather API Key

1. Go to https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API keys section
4. Generate a new API key
5. **Important:** New API keys can take 10-15 minutes to activate

### 2. Install Dependencies

```bash
cd WeatherApp
npm install
# or
yarn install
```

### 3. Configure API Key

Open `src/config/env.js` and replace the placeholder:

```javascript
export const ENV = {
  OPENWEATHER_API_KEY: 'paste_your_api_key_here',
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
};
```

### 4. iOS Setup (macOS only)

#### Install iOS Dependencies
```bash
cd ios
pod install
cd ..
```

#### Configure Info.plist
The Info.plist file needs location permissions. Create or update `ios/WeatherApp/Info.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- Other existing keys -->
    
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>WeatherApp needs access to your location to show local weather.</string>
    
    <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    <string>WeatherApp needs access to your location to show local weather.</string>
    
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>
</dict>
</plist>
```

### 5. Android Setup

#### Update Android Manifest
The AndroidManifest.xml has already been created with the necessary permissions at:
`android/app/src/main/AndroidManifest.xml`

#### Link Assets (for icons)
```bash
npx react-native-asset
```

### 6. Running the App

#### Start Metro Bundler
In a terminal window:
```bash
npm start
# or
yarn start
```

#### Run on iOS
In a new terminal window:
```bash
npm run ios
# or
yarn ios

# To run on a specific simulator:
npx react-native run-ios --simulator="iPhone 14 Pro"
```

#### Run on Android
Make sure you have an Android emulator running or a device connected, then:
```bash
npm run android
# or
yarn android
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Metro Bundler Issues

**Problem:** Metro bundler won't start or shows caching errors

**Solution:**
```bash
# Clear cache
npm start -- --reset-cache

# Or manually clear
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*
watchman watch-del-all
```

#### 2. iOS Pod Install Fails

**Problem:** CocoaPods installation errors

**Solution:**
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod deintegrate
pod install
cd ..
```

#### 3. Android Build Errors

**Problem:** Gradle build failures

**Solution:**
```bash
cd android
./gradlew clean
cd ..

# If issues persist:
cd android
rm -rf .gradle
rm -rf build
./gradlew clean
cd ..
```

#### 4. API Key Not Working

**Problem:** Getting 401 errors or "Invalid API key"

**Solution:**
- Wait 10-15 minutes after generating the key (activation time)
- Verify the key is correctly pasted in `src/config/env.js`
- Check no extra spaces or quotes around the key
- Test the key directly: https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY

#### 5. Location Permission Denied

**Problem:** App can't access device location

**Solution:**

**iOS:**
- Open Settings > Privacy > Location Services
- Find WeatherApp and enable
- Verify Info.plist has usage descriptions

**Android:**
- Open Settings > Apps > WeatherApp > Permissions
- Enable Location permission
- If using emulator, ensure location is enabled in Android settings

#### 6. Module Not Found Errors

**Problem:** Cannot find module errors

**Solution:**
```bash
rm -rf node_modules
rm package-lock.json  # or yarn.lock
npm install  # or yarn install
```

#### 7. iOS Simulator Not Opening

**Problem:** iOS simulator doesn't launch

**Solution:**
```bash
# Reset simulator
xcrun simctl erase all

# List available simulators
xcrun simctl list devices

# Open Xcode and run from there to see detailed errors
open ios/WeatherApp.xcworkspace
```

#### 8. Android Emulator Not Found

**Problem:** No Android emulator available

**Solution:**
1. Open Android Studio
2. Go to Tools > AVD Manager
3. Create a new virtual device
4. Choose a device definition (e.g., Pixel 5)
5. Select a system image (e.g., API 31)
6. Finish and launch the emulator

## Testing the App

### Manual Testing Checklist

- [ ] App launches successfully
- [ ] Location permission is requested
- [ ] Current weather loads for your location
- [ ] Temperature displays correctly
- [ ] Weather details show (humidity, wind, pressure)
- [ ] Hourly forecast displays
- [ ] 5-day forecast displays
- [ ] Pull to refresh works
- [ ] Search for a city works
- [ ] Add/remove favorites works
- [ ] Toggle temperature unit (°C/°F) works
- [ ] Dark/light mode toggle works
- [ ] App works offline (shows cached data or error)

## Performance Tips

### Development
- Use Hermes engine (enabled by default) for better performance
- Enable Fast Refresh for instant updates during development
- Use Flipper for debugging (automatically included)

### Production Build

**iOS:**
```bash
cd ios
xcodebuild -workspace WeatherApp.xcworkspace -scheme WeatherApp -configuration Release
```

**Android:**
```bash
cd android
./gradlew assembleRelease
# APK will be at: android/app/build/outputs/apk/release/app-release.apk
```

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [OpenWeather API Docs](https://openweathermap.org/api)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

## Getting Help

If you encounter issues not covered here:

1. Check the React Native documentation
2. Search existing issues on GitHub
3. Check Stack Overflow with the `react-native` tag
4. Verify your React Native environment setup:
   ```bash
   npx react-native doctor
   ```

## Next Steps

Once the app is running:

1. Explore the code structure in the README.md
2. Customize the theme colors in `src/context/ThemeContext.js`
3. Add more features from the future enhancements list
4. Test on different devices and screen sizes

---

**Happy coding! 🌤️**


