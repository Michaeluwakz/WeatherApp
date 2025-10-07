/**
 * Loading Screen Component
 * Displays loading state with skeleton
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const LoadingScreen = ({ message = 'Loading weather data...' }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.emojiContainer}>
        <Text style={styles.loadingEmoji}>🌤️</Text>
      </View>
      <ActivityIndicator size="large" color={theme.primary} style={styles.spinner} />
      <Text style={[styles.message, { color: theme.text }]}>
        {message}
      </Text>
      <Text style={[styles.subMessage, { color: theme.textSecondary }]}>
        Fetching the latest weather updates...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emojiContainer: {
    marginBottom: 20,
  },
  loadingEmoji: {
    fontSize: 80,
  },
  spinner: {
    marginVertical: 20,
  },
  message: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  subMessage: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoadingScreen;

