/**
 * Settings Screen
 * App preferences and settings
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import storageService from '../services/storageService';

const SettingsScreen = ({ navigation }) => {
  const { temperatureUnit, toggleTemperatureUnit, lastUpdate } = useWeather();
  const { 
    theme, 
    themeMode, 
    useSystemTheme,
    isDark,
    toggleTheme,
    setSystemTheme,
    setLightTheme,
    setDarkTheme,
  } = useTheme();

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all favorites and settings. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            await storageService.clearAll();
            Alert.alert('Success', 'All data cleared successfully');
          },
        },
      ]
    );
  };

  const SettingItem = ({ emoji, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity 
      style={[styles.settingItem, { backgroundColor: theme.card }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingEmoji}>{emoji}</Text>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { backgroundColor: theme.surfaceVariant }]}
        >
          <Icon name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerEmoji}>⚙️</Text>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Temperature Unit Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>🌡️ UNITS</Text>
          
          <SettingItem
            emoji="🌡️"
            title="Temperature Unit"
            subtitle={temperatureUnit === 'metric' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
            onPress={toggleTemperatureUnit}
            rightComponent={
              <Icon name="chevron-right" size={24} color={theme.textSecondary} />
            }
          />
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>🎨 APPEARANCE</Text>
          
          <SettingItem
            emoji="🎨"
            title="Theme"
            subtitle={useSystemTheme ? 'System' : isDark ? 'Dark' : 'Light'}
          />

          <View style={styles.themeOptions}>
            <TouchableOpacity 
              style={[
                styles.themeOption,
                { 
                  backgroundColor: theme.card,
                  borderColor: !useSystemTheme && !isDark ? theme.primary : theme.border,
                  borderWidth: !useSystemTheme && !isDark ? 2 : 1,
                }
              ]}
              onPress={setLightTheme}
            >
              <Text style={styles.themeEmoji}>☀️</Text>
              <Text style={[styles.themeOptionText, { color: theme.text }]}>Light</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.themeOption,
                { 
                  backgroundColor: theme.card,
                  borderColor: !useSystemTheme && isDark ? theme.primary : theme.border,
                  borderWidth: !useSystemTheme && isDark ? 2 : 1,
                }
              ]}
              onPress={setDarkTheme}
            >
              <Text style={styles.themeEmoji}>🌙</Text>
              <Text style={[styles.themeOptionText, { color: theme.text }]}>Dark</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.themeOption,
                { 
                  backgroundColor: theme.card,
                  borderColor: useSystemTheme ? theme.primary : theme.border,
                  borderWidth: useSystemTheme ? 2 : 1,
                }
              ]}
              onPress={setSystemTheme}
            >
              <Text style={styles.themeEmoji}>📱</Text>
              <Text style={[styles.themeOptionText, { color: theme.text }]}>System</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Data Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>💾 DATA</Text>
          
          <SettingItem
            emoji="🗑️"
            title="Clear All Data"
            subtitle="Remove all favorites and settings"
            onPress={handleClearData}
            rightComponent={
              <Icon name="chevron-right" size={24} color={theme.error} />
            }
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ℹ️ ABOUT</Text>
          
          <SettingItem
            emoji="📱"
            title="App Version"
            subtitle="1.0.0"
          />

          <SettingItem
            emoji="🌤️"
            title="Weather Provider"
            subtitle="OpenWeather API"
          />

          {lastUpdate && (
            <SettingItem
              emoji="🕐"
              title="Last Updated"
              subtitle={lastUpdate.toLocaleString()}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerEmoji: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 15,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  settingEmoji: {
    fontSize: 26,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 15,
    marginTop: 12,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  themeEmoji: {
    fontSize: 32,
  },
  themeOptionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SettingsScreen;

