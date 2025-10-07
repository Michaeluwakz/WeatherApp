/**
 * Weather API Service
 * Handles all API calls to OpenWeather API
 */

import axios from 'axios';
import { ENV } from '../config/env';
import { API_ENDPOINTS } from '../config/constants';

class WeatherService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: ENV.BASE_URL,
      timeout: 10000,
    });

    // Add request interceptor
    this.apiClient.interceptors.request.use(
      (config) => {
        config.params = {
          ...config.params,
          appid: ENV.OPENWEATHER_API_KEY,
        };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // Server responded with error status
          const { status, data } = error.response;
          
          if (status === 401) {
            throw new Error('Invalid API key. Please check your configuration.');
          } else if (status === 404) {
            throw new Error('Location not found. Please check the city name.');
          } else if (status === 429) {
            throw new Error('API rate limit exceeded. Please try again later.');
          } else {
            throw new Error(data.message || 'An error occurred fetching weather data.');
          }
        } else if (error.request) {
          // Request made but no response
          throw new Error('Network error. Please check your internet connection.');
        } else {
          // Error setting up request
          throw new Error('An unexpected error occurred.');
        }
      }
    );
  }

  /**
   * Get current weather by coordinates
   */
  async getCurrentWeatherByCoords(latitude, longitude, units = 'metric') {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.CURRENT_WEATHER, {
        params: {
          lat: latitude,
          lon: longitude,
          units,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current weather by city name
   */
  async getCurrentWeatherByCity(city, units = 'metric') {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.CURRENT_WEATHER, {
        params: {
          q: city,
          units,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get 5-day forecast by coordinates
   */
  async getForecastByCoords(latitude, longitude, units = 'metric') {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.FORECAST, {
        params: {
          lat: latitude,
          lon: longitude,
          units,
        },
      });
      return this.processForecastData(response.data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get 5-day forecast by city name
   */
  async getForecastByCity(city, units = 'metric') {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.FORECAST, {
        params: {
          q: city,
          units,
        },
      });
      return this.processForecastData(response.data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Process forecast data to separate hourly and daily forecasts
   */
  processForecastData(data) {
    const hourly = data.list.slice(0, 8); // Next 24 hours (3-hour intervals)
    
    // Group by day for 5-day forecast
    const dailyMap = new Map();
    
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          dt: item.dt,
          date: date,
          temps: [],
          conditions: [],
          icons: [],
          humidity: [],
          wind: [],
        });
      }
      
      const day = dailyMap.get(date);
      day.temps.push(item.main.temp);
      day.conditions.push(item.weather[0].main);
      day.icons.push(item.weather[0].icon);
      day.humidity.push(item.main.humidity);
      day.wind.push(item.wind.speed);
    });

    // Convert map to array and calculate daily statistics
    const daily = Array.from(dailyMap.values()).map((day) => ({
      dt: day.dt,
      date: day.date,
      temp: {
        min: Math.min(...day.temps),
        max: Math.max(...day.temps),
        avg: day.temps.reduce((a, b) => a + b, 0) / day.temps.length,
      },
      weather: {
        main: this.getMostFrequent(day.conditions),
        icon: this.getMostFrequent(day.icons),
      },
      humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
      wind: {
        speed: day.wind.reduce((a, b) => a + b, 0) / day.wind.length,
      },
    })).slice(0, 5);

    return {
      hourly,
      daily,
      city: data.city,
    };
  }

  /**
   * Get most frequent item in array
   */
  getMostFrequent(arr) {
    const frequency = {};
    let maxFreq = 0;
    let result = arr[0];

    arr.forEach((item) => {
      frequency[item] = (frequency[item] || 0) + 1;
      if (frequency[item] > maxFreq) {
        maxFreq = frequency[item];
        result = item;
      }
    });

    return result;
  }

  /**
   * Search cities by name (for autocomplete)
   */
  async searchCities(query) {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.CURRENT_WEATHER, {
        params: {
          q: query,
        },
      });
      return {
        name: response.data.name,
        country: response.data.sys.country,
        coord: response.data.coord,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new WeatherService();

