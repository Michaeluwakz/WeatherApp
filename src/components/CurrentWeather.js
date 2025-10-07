/**
 * Current Weather Component
 * Displays current weather conditions
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { formatTemperature, formatDate } from '../utils/helpers';
import { getWeatherEmoji } from '../utils/weatherIcons';
// Removed excessive responsive imports to restore original layout

const CurrentWeather = ({ weather, unit }) => {
  const { theme } = useTheme();

  if (!weather) return null;

  const weatherEmoji = getWeatherEmoji(weather.weather[0].icon);

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationEmoji}>📍</Text>
        <Text style={[styles.location, { color: theme.text }]}>
          {weather.name}, {weather.sys.country}
        </Text>
      </View>

      <View style={[styles.dateContainer, { backgroundColor: theme.overlay }]}>
        <Text style={[styles.date, { color: '#FFFFFF' }]}>
          {formatDate(weather.dt, 'long')}
        </Text>
      </View>

      <View style={styles.mainWeather}>
        <Text style={styles.weatherEmoji}>{weatherEmoji}</Text>
        <Text style={[styles.temperature, { color: theme.text }]}>
          {formatTemperature(weather.main.temp, unit)}
        </Text>
      </View>

      <Text style={[styles.description, { color: theme.text }]}>
        {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
      </Text>

      <Text style={[styles.feelsLike, { color: theme.textSecondary }]}>
        Feels like {formatTemperature(weather.main.feels_like, unit)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 24,
  },
  date: {
    fontSize: 15,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  mainWeather: {
    alignItems: 'center',
    marginVertical: 20,
  },
  weatherEmoji: {
    fontSize: 120,
    marginBottom: 16,
  },
  temperature: {
    fontSize: 76,
    fontWeight: 'bold',
    marginTop: 16,
  },
  description: {
    fontSize: 17,
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'center',
  },
  feelsLike: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CurrentWeather;

