/**
 * Theme Context
 * Manages dark/light mode and theme colors
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import storageService from '../services/storageService';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Light Theme Colors
const lightTheme = {
  mode: 'light',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceVariant: '#F0F0F0',
  primary: '#4A91FF',
  secondary: '#47BFDF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  border: '#E0E0E0',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  card: '#FFFFFF',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.3)',
  iconTint: '#666666',
};

// Dark Theme Colors
const darkTheme = {
  mode: 'dark',
  background: '#121212',
  surface: '#1E1E1E',
  surfaceVariant: '#2C2C2C',
  primary: '#4A91FF',
  secondary: '#47BFDF',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#808080',
  border: '#333333',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  card: '#1E1E1E',
  cardShadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  iconTint: '#B0B0B0',
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('light');
  const [useSystemTheme, setUseSystemTheme] = useState(true);

  // Load theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Apply system theme if enabled
  useEffect(() => {
    if (useSystemTheme && systemColorScheme) {
      setThemeMode(systemColorScheme);
    }
  }, [systemColorScheme, useSystemTheme]);

  const loadThemePreference = async () => {
    try {
      const savedMode = await storageService.getThemeMode();
      if (savedMode === 'system') {
        setUseSystemTheme(true);
        setThemeMode(systemColorScheme || 'light');
      } else {
        setUseSystemTheme(false);
        setThemeMode(savedMode);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    setUseSystemTheme(false);
    await storageService.saveThemeMode(newMode);
  };

  const setSystemTheme = async () => {
    setUseSystemTheme(true);
    setThemeMode(systemColorScheme || 'light');
    await storageService.saveThemeMode('system');
  };

  const setLightTheme = async () => {
    setThemeMode('light');
    setUseSystemTheme(false);
    await storageService.saveThemeMode('light');
  };

  const setDarkTheme = async () => {
    setThemeMode('dark');
    setUseSystemTheme(false);
    await storageService.saveThemeMode('dark');
  };

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const value = {
    theme,
    themeMode,
    useSystemTheme,
    isDark: themeMode === 'dark',
    toggleTheme,
    setSystemTheme,
    setLightTheme,
    setDarkTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

