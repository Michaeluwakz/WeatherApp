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
import { fontSizes, spacing, borderRadius, moderateScale, responsiveDimensions } from '../utils/responsive';

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
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    maxWidth: responsiveDimensions.isLargeDevice ? 800 : '100%',
    alignSelf: 'center',
    width: responsiveDimensions.isLargeDevice ? '90%' : '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  headerEmoji: {
    fontSize: moderateScale(24),
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  dayName: {
    fontSize: fontSizes.regular,
    fontWeight: '600',
    width: moderateScale(90),
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
  },
  weatherEmoji: {
    fontSize: moderateScale(28),
  },
  condition: {
    fontSize: fontSizes.small,
    fontWeight: '500',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  tempHigh: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    width: moderateScale(50),
    textAlign: 'right',
  },
  tempBar: {
    width: moderateScale(50),
    height: moderateScale(5),
    borderRadius: borderRadius.sm,
  },
  tempBarFill: {
    height: '100%',
    width: '70%',
    borderRadius: borderRadius.sm,
  },
  tempLow: {
    fontSize: fontSizes.regular,
    width: moderateScale(50),
  },
});

export default DailyForecast;

