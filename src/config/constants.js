/**
 * Application Constants
 */

export const TEMPERATURE_UNITS = {
  CELSIUS: 'metric',
  FAHRENHEIT: 'imperial',
};

export const WEATHER_CONDITIONS = {
  CLEAR: 'Clear',
  CLOUDS: 'Clouds',
  RAIN: 'Rain',
  DRIZZLE: 'Drizzle',
  THUNDERSTORM: 'Thunderstorm',
  SNOW: 'Snow',
  MIST: 'Mist',
  FOG: 'Fog',
  HAZE: 'Haze',
};

export const WEATHER_BACKGROUNDS = {
  Clear: ['#4DA0B0', '#D39D38'],
  Clouds: ['#757F9A', '#D7DDE8'],
  Rain: ['#5A6C7D', '#6B7C93'],
  Drizzle: ['#89B5C7', '#B8D4E3'],
  Thunderstorm: ['#2C3E50', '#4C5F77'],
  Snow: ['#E6DADA', '#F4F4F4'],
  Mist: ['#B0BEC5', '#CFD8DC'],
  Fog: ['#A8B8C2', '#C1CDD6'],
  Haze: ['#C9C9A3', '#E3E3C7'],
  Default: ['#47BFDF', '#4A91FF'],
};

export const STORAGE_KEYS = {
  FAVORITES: '@weather_favorites',
  TEMPERATURE_UNIT: '@temperature_unit',
  THEME_MODE: '@theme_mode',
  LAST_LOCATION: '@last_location',
};

export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
  ONE_CALL: '/onecall',
};

export const REFRESH_INTERVAL = 600000; // 10 minutes in milliseconds

export const DEFAULT_LOCATION = {
  latitude: 51.5074,
  longitude: -0.1278,
  name: 'London',
};

