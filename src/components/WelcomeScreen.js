/**
 * Welcome Screen Component
 * Initial screen when no weather data is loaded
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import GradientBackground from './GradientBackground';
import { WEATHER_BACKGROUNDS } from '../config/constants';

const WelcomeScreen = ({ onGetLocation, onSearchLocation }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <GradientBackground
        colors={WEATHER_BACKGROUNDS.Default}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.content}>
        <Text style={styles.emoji}>🌤️</Text>
        <Text style={[styles.title, { color: '#FFFFFF' }]}>
          Welcome to Weather App
        </Text>
        <Text style={[styles.subtitle, { color: 'rgba(255, 255, 255, 0.9)' }]}>
          Get started by checking the weather in your location or search for any city worldwide
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: 'rgba(255, 255, 255, 0.95)' }]}
            onPress={onGetLocation}
          >
            <Text style={styles.buttonEmoji}>📍</Text>
            <Text style={[styles.primaryButtonText, { color: theme.primary }]}>
              Use My Location
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.secondaryButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderColor: '#FFFFFF' }]}
            onPress={onSearchLocation}
          >
            <Text style={styles.buttonEmoji}>🔍</Text>
            <Text style={styles.secondaryButtonText}>
              Search City
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.featuresBox, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]}>
          <Text style={styles.featureItem}>⏰ Hourly forecasts</Text>
          <Text style={styles.featureItem}>📅 5-day predictions</Text>
          <Text style={styles.featureItem}>🌍 Global weather data</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
    marginBottom: 30,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 28,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 28,
    gap: 10,
    borderWidth: 2,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonEmoji: {
    fontSize: 24,
  },
  featuresBox: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 20,
  },
  featureItem: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default WelcomeScreen;

