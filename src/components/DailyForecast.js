/**
 * Daily Forecast Component
 * Displays 5-day weather forecast
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { formatTemperature, formatDate } from '../utils/helpers';
import { getWeatherEmoji } from '../utils/weatherIcons';
// Removed excessive responsive imports to restore original layout

const DailyForecast = ({ dailyData, unit }) => {
  const { theme } = useTheme();

  if (!dailyData || dailyData.length === 0) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>📅</Text>
        <Text style={[styles.title, { color: theme.text }]}>5-Day Forecast</Text>
      </View>
      {dailyData.map((day, index) => {
        const weatherEmoji = getWeatherEmoji(day.weather.icon);
        
        return (
          <View 
            key={index} 
            style={[
              styles.dayItem, 
              { 
                backgroundColor: theme.surfaceVariant,
              }
            ]}
          >
            <Text style={[styles.dayName, { color: theme.text }]}>
              {index === 0 ? '🌟 Today' : formatDate(day.dt, 'short')}
            </Text>
            
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherEmoji}>{weatherEmoji}</Text>
              <Text style={[styles.condition, { color: theme.textSecondary }]}>
                {day.weather.main}
              </Text>
            </View>

            <View style={styles.tempContainer}>
              <Text style={[styles.tempHigh, { color: theme.text }]}>
                {formatTemperature(day.temp.max, unit)}
              </Text>
              <View style={[styles.tempBar, { backgroundColor: theme.border }]}>
                <View 
                  style={[
                    styles.tempBarFill, 
                    { 
                      backgroundColor: theme.primary,
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.tempLow, { color: theme.textSecondary }]}>
                {formatTemperature(day.temp.min, unit)}
              </Text>
            </View>
          </View>
        );
      })}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  headerEmoji: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  dayName: {
    fontSize: 15,
    fontWeight: '600',
    width: 90,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  weatherEmoji: {
    fontSize: 28,
  },
  condition: {
    fontSize: 12,
    fontWeight: '500',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tempHigh: {
    fontSize: 17,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'right',
  },
  tempBar: {
    width: 50,
    height: 5,
    borderRadius: 2,
  },
  tempBarFill: {
    height: '100%',
    width: '70%',
    borderRadius: 2,
  },
  tempLow: {
    fontSize: 15,
    width: 50,
  },
});

export default DailyForecast;

