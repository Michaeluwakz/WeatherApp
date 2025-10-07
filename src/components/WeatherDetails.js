/**
 * Weather Details Component
 * Displays detailed weather information (humidity, wind, pressure)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { formatWindSpeed, getWindDirection, formatHumidity, formatPressure } from '../utils/helpers';
// Removed excessive responsive imports to restore original layout

const WeatherDetails = ({ weather, unit }) => {
  const { theme } = useTheme();

  if (!weather) return null;

  const detailItems = [
    {
      emoji: '💧',
      label: 'Humidity',
      value: formatHumidity(weather.main.humidity),
    },
    {
      emoji: '💨',
      label: 'Wind Speed',
      value: formatWindSpeed(weather.wind.speed, unit),
    },
    {
      emoji: '🧭',
      label: 'Wind Direction',
      value: getWindDirection(weather.wind.deg),
    },
    {
      emoji: '🎚️',
      label: 'Pressure',
      value: formatPressure(weather.main.pressure),
    },
    {
      emoji: '👁️',
      label: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
    },
    {
      emoji: '☁️',
      label: 'Cloudiness',
      value: `${weather.clouds.all}%`,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.text }]}>Weather Details</Text>
      <View style={styles.details}>
        {detailItems.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.detailItem, 
              { 
                backgroundColor: theme.surfaceVariant,
                borderColor: theme.border,
              }
            ]}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              {item.label}
            </Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  emoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default WeatherDetails;

