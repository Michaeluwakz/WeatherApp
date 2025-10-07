/**
 * Error Screen Component
 * Displays error messages with retry option
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

const ErrorScreen = ({ message, onRetry, onSearchLocation }) => {
  const { theme } = useTheme();
  
  const isLocationError = message && message.includes('Location permission');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Icon 
        name={isLocationError ? "map-marker-off-outline" : "alert-circle-outline"} 
        size={64} 
        color={theme.error} 
      />
      <Text style={[styles.title, { color: theme.text }]}>
        {isLocationError ? 'Location Access Needed' : 'Oops!'}
      </Text>
      <Text style={[styles.message, { color: theme.textSecondary }]}>
        {message || 'Something went wrong'}
      </Text>
      
      <View style={styles.buttonContainer}>
        {onRetry && (
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: theme.primary }]}
            onPress={onRetry}
          >
            <Icon name="refresh" size={20} color="#FFFFFF" />
            <Text style={styles.retryText}>Allow Location</Text>
          </TouchableOpacity>
        )}
        
        {onSearchLocation && (
          <TouchableOpacity 
            style={[styles.searchButton, { backgroundColor: theme.overlay, borderColor: theme.primary }]}
            onPress={onSearchLocation}
          >
            <Icon name="magnify" size={20} color={theme.primary} />
            <Text style={[styles.searchText, { color: theme.primary }]}>Search Location</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {isLocationError && (
        <View style={[styles.instructionsBox, { backgroundColor: theme.overlay }]}>
          <Text style={[styles.instructionsTitle, { color: theme.text }]}>
            How to enable location:
          </Text>
          <Text style={[styles.instructionsText, { color: theme.textSecondary }]}>
            1. Click the lock icon in your browser's address bar{'\n'}
            2. Find "Location" permission{'\n'}
            3. Select "Allow"{'\n'}
            4. Reload the page
          </Text>
        </View>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
    borderWidth: 2,
  },
  searchText: {
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    maxWidth: 350,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ErrorScreen;

