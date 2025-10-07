/**
 * Search Screen
 * City search and favorites management
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { 
    favorites, 
    fetchWeatherByCity, 
    removeFromFavorites,
  } = useWeather();
  const { theme } = useTheme();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    setIsSearching(true);
    try {
      await fetchWeatherByCity(searchQuery.trim());
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFavoritePress = async (favorite) => {
    try {
      await fetchWeatherByCity(favorite.name);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleRemoveFavorite = (locationName) => {
    Alert.alert(
      'Remove Favorite',
      `Remove ${locationName} from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeFromFavorites(locationName),
        },
      ]
    );
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={[styles.favoriteItem, { backgroundColor: theme.card }]}>
      <TouchableOpacity 
        style={styles.favoriteContent}
        onPress={() => handleFavoritePress(item)}
      >
        <Text style={styles.favoriteEmoji}>📍</Text>
        <View style={styles.favoriteInfo}>
          <Text style={[styles.favoriteName, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.favoriteCountry, { color: theme.textSecondary }]}>
            🌍 {item.country}
          </Text>
        </View>
        <Icon name="chevron-right" size={24} color={theme.textTertiary} />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handleRemoveFavorite(item.name)}
        style={[styles.deleteButton, { backgroundColor: theme.surfaceVariant }]}
      >
        <Text style={styles.deleteEmoji}>🗑️</Text>
      </TouchableOpacity>
    </View>
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
          <Text style={styles.headerEmoji}>🔍</Text>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Search</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
        <Text style={styles.searchEmoji}>🌍</Text>
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Enter city name..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity 
        style={[
          styles.searchButton, 
          { 
            backgroundColor: theme.primary,
            opacity: isSearching ? 0.6 : 1,
          }
        ]}
        onPress={handleSearch}
        disabled={isSearching}
      >
        <Text style={styles.searchButtonEmoji}>{isSearching ? '⏳' : '🔎'}</Text>
        <Text style={styles.searchButtonText}>
          {isSearching ? 'Searching...' : 'Search Weather'}
        </Text>
      </TouchableOpacity>

      <View style={styles.favoritesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>⭐</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Favorite Locations</Text>
        </View>
        {favorites.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: theme.card }]}>
            <Text style={styles.emptyEmoji}>💙</Text>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No favorite locations yet
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
              Add locations to favorites from the home screen ❤️
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            contentContainerStyle={styles.favoritesList}
          />
        )}
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchEmoji: {
    fontSize: 22,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: 15,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonEmoji: {
    fontSize: 20,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  favoritesSection: {
    flex: 1,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 15,
    gap: 10,
  },
  sectionEmoji: {
    fontSize: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  favoritesList: {
    paddingHorizontal: 15,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  favoriteEmoji: {
    fontSize: 26,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 17,
    fontWeight: '600',
  },
  favoriteCountry: {
    fontSize: 14,
    marginTop: 4,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10,
    marginLeft: 8,
  },
  deleteEmoji: {
    fontSize: 18,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    paddingVertical: 60,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default SearchScreen;

