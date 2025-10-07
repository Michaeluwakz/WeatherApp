/**
 * Storage Service
 * Handles local data persistence using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/constants';

class StorageService {
  /**
   * Save favorite locations
   */
  async saveFavorites(favorites) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error('Error saving favorites:', error);
      return false;
    }
  }

  /**
   * Get favorite locations
   */
  async getFavorites() {
    try {
      const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  /**
   * Add location to favorites
   */
  async addFavorite(location) {
    try {
      const favorites = await this.getFavorites();
      
      // Check if location already exists
      const exists = favorites.some(
        (fav) => fav.name === location.name && fav.country === location.country
      );
      
      if (!exists) {
        favorites.push(location);
        await this.saveFavorites(favorites);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  }

  /**
   * Remove location from favorites
   */
  async removeFavorite(locationName) {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter((fav) => fav.name !== locationName);
      await this.saveFavorites(updatedFavorites);
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  }

  /**
   * Save temperature unit preference
   */
  async saveTemperatureUnit(unit) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TEMPERATURE_UNIT, unit);
      return true;
    } catch (error) {
      console.error('Error saving temperature unit:', error);
      return false;
    }
  }

  /**
   * Get temperature unit preference
   */
  async getTemperatureUnit() {
    try {
      const unit = await AsyncStorage.getItem(STORAGE_KEYS.TEMPERATURE_UNIT);
      return unit || 'metric';
    } catch (error) {
      console.error('Error getting temperature unit:', error);
      return 'metric';
    }
  }

  /**
   * Save theme mode preference
   */
  async saveThemeMode(mode) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
      return true;
    } catch (error) {
      console.error('Error saving theme mode:', error);
      return false;
    }
  }

  /**
   * Get theme mode preference
   */
  async getThemeMode() {
    try {
      const mode = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
      return mode || 'light';
    } catch (error) {
      console.error('Error getting theme mode:', error);
      return 'light';
    }
  }

  /**
   * Save last known location
   */
  async saveLastLocation(location) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(location));
      return true;
    } catch (error) {
      console.error('Error saving last location:', error);
      return false;
    }
  }

  /**
   * Get last known location
   */
  async getLastLocation() {
    try {
      const location = await AsyncStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
      return location ? JSON.parse(location) : null;
    } catch (error) {
      console.error('Error getting last location:', error);
      return null;
    }
  }

  /**
   * Clear all data
   */
  async clearAll() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
}

export default new StorageService();

