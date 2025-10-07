/**
 * Weather Details Component
 * Displays detailed weather information (humidity, wind, pressure)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { formatWindSpeed, getWindDirection, formatHumidity, formatPressure } from '../utils/helpers';
import { fontSizes, spacing, borderRadius, moderateScale, responsiveDimensions } from '../utils/responsive';

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
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>📊</Text>
        <Text style={[styles.title, { color: theme.text }]}>Weather Details</Text>
      </View>
      <View style={styles.grid}>
        {detailItems.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.detailItem, 
              { 
                backgroundColor: theme.surfaceVariant,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  detailItem: {
    flex: 1,
    minWidth: responsiveDimensions.isSmallDevice ? '100%' : responsiveDimensions.isLargeDevice ? '30%' : '45%',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: moderateScale(110),
  },
  emoji: {
    fontSize: moderateScale(36),
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: fontSizes.small,
    marginTop: spacing.sm,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
});

export default WeatherDetails;

