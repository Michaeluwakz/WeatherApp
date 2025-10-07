/**
 * Home Screen
 * Main weather dashboard
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, StatusBar } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import { WEATHER_BACKGROUNDS } from '../config/constants';
import CurrentWeather from '../components/CurrentWeather';
import WeatherDetails from '../components/WeatherDetails';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import { RainEffect, SunEffect, CloudEffect, SnowEffect } from '../components/WeatherEffects';
import { spacing, borderRadius, moderateScale, responsiveDimensions } from '../utils/responsive';

const HomeScreen = ({ navigation }) => {
  const { 
    currentWeather, 
    forecast, 
    loading, 
    error, 
    temperatureUnit,
    fetchWeatherByCurrentLocation,
    refreshWeather,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  } = useWeather();
  const { theme, isDark } = useTheme();

  useEffect(() => {
    if (!currentWeather) {
      fetchWeatherByCurrentLocation().catch(() => {
        // Error already handled in context
      });
    }
  }, []);

  const handleRefresh = async () => {
    try {
      await refreshWeather();
    } catch (error) {
      // Error already handled in context
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite()) {
      removeFromFavorites(currentWeather.name);
    } else {
      addToFavorites();
    }
  };

  if (loading && !currentWeather) {
    return <LoadingScreen />;
  }

  if (error && !currentWeather) {
    return (
      <ErrorScreen 
        message={error} 
        onRetry={fetchWeatherByCurrentLocation} 
        onSearchLocation={() => navigation.navigate('Search')}
      />
    );
  }

  const weatherCondition = currentWeather?.weather[0]?.main || 'Default';
  const gradientColors = WEATHER_BACKGROUNDS[weatherCondition] || WEATHER_BACKGROUNDS.Default;

  // Render weather effects based on condition
  const renderWeatherEffect = () => {
    switch (weatherCondition) {
      case 'Rain':
      case 'Drizzle':
        return <RainEffect />;
      case 'Clear':
        return <SunEffect />;
      case 'Clouds':
        return <CloudEffect />;
      case 'Snow':
        return <SnowEffect />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent
      />
      
      <GradientBackground
        colors={gradientColors}
        style={StyleSheet.absoluteFill}
      />

      {renderWeatherEffect()}

      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.iconButton, { backgroundColor: theme.overlay }]}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.buttonEmoji}>🔍</Text>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: theme.overlay }]}
            onPress={handleFavoriteToggle}
          >
            <Text style={styles.buttonEmoji}>
              {isFavorite() ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: theme.overlay }]}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.buttonEmoji}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor="#FFFFFF"
            colors={[theme.primary]}
          />
        }
      >
        <CurrentWeather weather={currentWeather} unit={temperatureUnit} />
        
        <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
          <HourlyForecast hourlyData={forecast?.hourly} unit={temperatureUnit} />
          <DailyForecast dailyData={forecast?.daily} unit={temperatureUnit} />
          <WeatherDetails weather={currentWeather} unit={temperatureUnit} />
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={handleRefresh}
      >
        <Text style={styles.fabEmoji}>🔄</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.locationFab, { backgroundColor: theme.secondary }]}
        onPress={fetchWeatherByCurrentLocation}
      >
        <Text style={styles.fabEmoji}>📍</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: responsiveDimensions.isLargeDevice ? 1200 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: responsiveDimensions.isLargeDevice ? spacing.xxl : 50,
    paddingBottom: spacing.md,
    zIndex: 10,
  },
  headerRight: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonEmoji: {
    fontSize: moderateScale(22),
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    paddingBottom: moderateScale(100),
  },
  contentContainer: {
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    paddingTop: spacing.lg,
    marginTop: spacing.lg,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: moderateScale(90),
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 10,
  },
  locationFab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 10,
  },
  fabEmoji: {
    fontSize: moderateScale(26),
  },
});

export default HomeScreen;

