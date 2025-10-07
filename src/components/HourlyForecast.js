/**
 * Hourly Forecast Component
 * Displays 24-hour weather forecast
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { formatTemperature, formatDate } from '../utils/helpers';
import { getWeatherEmoji } from '../utils/weatherIcons';

const { width: screenWidth } = Dimensions.get('window');
// Removed excessive responsive imports to restore original layout

const HourlyForecast = ({ hourlyData, unit }) => {
  const { theme } = useTheme();

  if (!hourlyData || hourlyData.length === 0) return null;

  // Calculate item width to spread across screen with proper spacing
  const containerPadding = 32; // 16px padding on each side
  const itemMargin = 8; // 4px margin on each side of item
  const hourItemWidth = (screenWidth - containerPadding - itemMargin * 2) / 6; // Show 6 items at once

  const handleHourPress = (hour) => {
    // You can add functionality here like showing detailed hour info
    console.log('Hour pressed:', formatDate(hour.dt, 'time'), hour);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>⏰</Text>
        <Text style={[styles.title, { color: theme.text }]}>Hourly Forecast</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={hourItemWidth + 8} // item width + margin
        snapToAlignment="start"
      >
        {hourlyData.map((hour, index) => {
          const weatherEmoji = getWeatherEmoji(hour.weather[0].icon);
          const currentTime = new Date();
          const hourTime = new Date(hour.dt * 1000);
          const isCurrentHour = currentTime.getHours() === hourTime.getHours() && 
                               Math.abs(currentTime.getTime() - hourTime.getTime()) < 3600000; // Within 1 hour
          
          return (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.hourItem, 
                { 
                  backgroundColor: isCurrentHour ? theme.primary : theme.surfaceVariant,
                  borderWidth: isCurrentHour ? 2 : 0,
                  borderColor: isCurrentHour ? theme.accent : 'transparent',
                  width: hourItemWidth,
                }
              ]}
              onPress={() => handleHourPress(hour)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.time, 
                { 
                  color: isCurrentHour ? '#FFFFFF' : theme.textSecondary,
                  fontWeight: isCurrentHour ? 'bold' : '600'
                }
              ]}>
                {formatDate(hour.dt, 'time')}
              </Text>
              <Text style={styles.weatherEmoji}>{weatherEmoji}</Text>
              <Text style={[
                styles.temp, 
                { 
                  color: isCurrentHour ? '#FFFFFF' : theme.text,
                  fontWeight: isCurrentHour ? 'bold' : 'bold'
                }
              ]}>
                {formatTemperature(hour.main.temp, unit)}
              </Text>
              <View style={styles.precipitationContainer}>
                <Text style={styles.precipitationEmoji}>💧</Text>
                <Text style={[
                  styles.precipitation, 
                  { 
                    color: isCurrentHour ? 'rgba(255,255,255,0.8)' : theme.textTertiary 
                  }
                ]}>
                  {hour.pop ? `${Math.round(hour.pop * 100)}%` : '0%'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  headerEmoji: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  hourItem: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 80, // Fixed height to prevent vertical scrolling
  },
  time: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  weatherEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  temp: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  precipitationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  precipitationEmoji: {
    fontSize: 10,
  },
  precipitation: {
    fontSize: 9,
  },
});

export default HourlyForecast;

