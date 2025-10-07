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
import { fontSizes, spacing, borderRadius, moderateScale, responsiveDimensions } from '../utils/responsive';

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

      <View style={[styles.descriptionCard, { backgroundColor: theme.overlay }]}>
        <Text style={[styles.description, { color: '#FFFFFF' }]}>
          {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
        </Text>
      </View>

      <View style={[styles.feelsLikeContainer, { backgroundColor: theme.surfaceVariant }]}>
        <Text style={styles.feelsLikeEmoji}>🌡️</Text>
        <Text style={[styles.feelsLike, { color: theme.textSecondary }]}>
          Feels like {formatTemperature(weather.main.feels_like, unit)}
        </Text>
      </View>

      <View style={[styles.tempRange, { backgroundColor: theme.card }]}>
        <View style={styles.tempItem}>
          <Text style={styles.tempEmoji}>🔥</Text>
          <View>
            <Text style={[styles.tempLabel, { color: theme.textTertiary }]}>High</Text>
            <Text style={[styles.tempText, { color: theme.text }]}>
              {formatTemperature(weather.main.temp_max, unit)}
            </Text>
          </View>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <View style={styles.tempItem}>
          <Text style={styles.tempEmoji}>❄️</Text>
          <View>
            <Text style={[styles.tempLabel, { color: theme.textTertiary }]}>Low</Text>
            <Text style={[styles.tempText, { color: theme.text }]}>
              {formatTemperature(weather.main.temp_min, unit)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    maxWidth: responsiveDimensions.isLargeDevice ? 600 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  locationEmoji: {
    fontSize: moderateScale(20),
    marginRight: spacing.sm,
  },
  location: {
    fontSize: responsiveDimensions.isSmallDevice ? fontSizes.large : fontSizes.xlarge,
    fontWeight: 'bold',
  },
  dateContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
  },
  date: {
    fontSize: fontSizes.regular,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  mainWeather: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  weatherEmoji: {
    fontSize: responsiveDimensions.isSmallDevice ? moderateScale(80) : moderateScale(120),
    marginBottom: spacing.md,
  },
  temperature: {
    fontSize: responsiveDimensions.isSmallDevice ? moderateScale(56) : moderateScale(76),
    fontWeight: 'bold',
    marginTop: spacing.md,
  },
  descriptionCard: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: fontSizes.medium,
    fontWeight: '500',
  },
  feelsLikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xxl,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  feelsLikeEmoji: {
    fontSize: moderateScale(20),
  },
  feelsLike: {
    fontSize: fontSizes.regular,
    fontWeight: '500',
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: responsiveDimensions.isSmallDevice ? spacing.lg : spacing.xxl,
    borderRadius: borderRadius.xl,
    gap: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tempItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  tempEmoji: {
    fontSize: moderateScale(28),
  },
  tempLabel: {
    fontSize: fontSizes.small,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tempText: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: moderateScale(40),
  },
});

export default CurrentWeather;

