/**
 * Hourly Forecast Component
 * Displays 24-hour weather forecast
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { formatTemperature, formatDate } from '../utils/helpers';
import { getWeatherEmoji } from '../utils/weatherIcons';
import { fontSizes, spacing, borderRadius, moderateScale, responsiveDimensions } from '../utils/responsive';

const HourlyForecast = ({ hourlyData, unit }) => {
  const { theme } = useTheme();

  if (!hourlyData || hourlyData.length === 0) return null;

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
      >
        {hourlyData.map((hour, index) => {
          const weatherEmoji = getWeatherEmoji(hour.weather[0].icon);
          
          return (
            <View 
              key={index} 
              style={[
                styles.hourItem, 
                { 
                  backgroundColor: theme.surfaceVariant,
                }
              ]}
            >
              <Text style={[styles.time, { color: theme.textSecondary }]}>
                {formatDate(hour.dt, 'time')}
              </Text>
              <Text style={styles.weatherEmoji}>{weatherEmoji}</Text>
              <Text style={[styles.temp, { color: theme.text }]}>
                {formatTemperature(hour.main.temp, unit)}
              </Text>
              <View style={styles.precipitationContainer}>
                <Text style={styles.precipitationEmoji}>💧</Text>
                <Text style={[styles.precipitation, { color: theme.textTertiary }]}>
                  {hour.pop ? `${Math.round(hour.pop * 100)}%` : '0%'}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  scrollContent: {
    gap: spacing.md,
    paddingRight: spacing.md,
  },
  hourItem: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    minWidth: moderateScale(90),
    gap: spacing.sm,
  },
  time: {
    fontSize: fontSizes.small,
    fontWeight: '600',
  },
  weatherEmoji: {
    fontSize: moderateScale(38),
  },
  temp: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  precipitationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  precipitationEmoji: {
    fontSize: moderateScale(12),
  },
  precipitation: {
    fontSize: fontSizes.small,
  },
});

export default HourlyForecast;

