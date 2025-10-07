/**
 * Weather Context
 * Global state management for weather data
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import weatherService from '../services/weatherService';
import locationService from '../services/locationService';
import storageService from '../services/storageService';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [favorites, setFavorites] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
  }, []);

  // Load saved preferences
  const loadPreferences = async () => {
    try {
      const unit = await storageService.getTemperatureUnit();
      const savedFavorites = await storageService.getFavorites();
      const lastLocation = await storageService.getLastLocation();

      setTemperatureUnit(unit);
      setFavorites(savedFavorites);

      // Try to load weather for last location
      if (lastLocation) {
        await fetchWeatherByCoords(lastLocation.latitude, lastLocation.longitude);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (latitude, longitude) => {
    setLoading(true);
    setError(null);

    try {
      const [weather, forecastData] = await Promise.all([
        weatherService.getCurrentWeatherByCoords(latitude, longitude, temperatureUnit),
        weatherService.getForecastByCoords(latitude, longitude, temperatureUnit),
      ]);

      setCurrentWeather(weather);
      setForecast(forecastData);
      setLocation({
        latitude,
        longitude,
        name: weather.name,
        country: weather.sys.country,
      });
      setLastUpdate(new Date());

      // Save location
      await storageService.saveLastLocation({ latitude, longitude });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by city name
  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const [weather, forecastData] = await Promise.all([
        weatherService.getCurrentWeatherByCity(cityName, temperatureUnit),
        weatherService.getForecastByCity(cityName, temperatureUnit),
      ]);

      setCurrentWeather(weather);
      setForecast(forecastData);
      setLocation({
        latitude: weather.coord.lat,
        longitude: weather.coord.lon,
        name: weather.name,
        country: weather.sys.country,
      });
      setLastUpdate(new Date());

      // Save location
      await storageService.saveLastLocation({
        latitude: weather.coord.lat,
        longitude: weather.coord.lon,
      });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get current device location and fetch weather
  const fetchWeatherByCurrentLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const coords = await locationService.getCurrentLocation();
      await fetchWeatherByCoords(coords.latitude, coords.longitude);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh weather data
  const refreshWeather = async () => {
    if (location) {
      await fetchWeatherByCoords(location.latitude, location.longitude);
    } else {
      await fetchWeatherByCurrentLocation();
    }
  };

  // Toggle temperature unit
  const toggleTemperatureUnit = async () => {
    const newUnit = temperatureUnit === 'metric' ? 'imperial' : 'metric';
    setTemperatureUnit(newUnit);
    await storageService.saveTemperatureUnit(newUnit);

    // Refresh weather with new unit
    if (location) {
      await fetchWeatherByCoords(location.latitude, location.longitude);
    }
  };

  // Add to favorites
  const addToFavorites = async () => {
    if (location) {
      const success = await storageService.addFavorite({
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      if (success) {
        const updatedFavorites = await storageService.getFavorites();
        setFavorites(updatedFavorites);
      }
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (locationName) => {
    await storageService.removeFavorite(locationName);
    const updatedFavorites = await storageService.getFavorites();
    setFavorites(updatedFavorites);
  };

  // Check if current location is favorited
  const isFavorite = () => {
    if (!location) return false;
    return favorites.some((fav) => fav.name === location.name);
  };

  const value = {
    currentWeather,
    forecast,
    location,
    loading,
    error,
    temperatureUnit,
    favorites,
    lastUpdate,
    fetchWeatherByCoords,
    fetchWeatherByCity,
    fetchWeatherByCurrentLocation,
    refreshWeather,
    toggleTemperatureUnit,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

