/**
 * Weather Icon Mapping
 * Maps OpenWeather icon codes to React Native Vector Icons and Emojis
 */

export const getWeatherIcon = (iconCode) => {
  const iconMap = {
    '01d': 'weather-sunny',
    '01n': 'weather-night',
    '02d': 'weather-partly-cloudy',
    '02n': 'weather-night-partly-cloudy',
    '03d': 'weather-cloudy',
    '03n': 'weather-cloudy',
    '04d': 'weather-cloudy',
    '04n': 'weather-cloudy',
    '09d': 'weather-rainy',
    '09n': 'weather-rainy',
    '10d': 'weather-pouring',
    '10n': 'weather-pouring',
    '11d': 'weather-lightning',
    '11n': 'weather-lightning',
    '13d': 'weather-snowy',
    '13n': 'weather-snowy',
    '50d': 'weather-fog',
    '50n': 'weather-fog',
  };

  return iconMap[iconCode] || 'weather-cloudy';
};

export const getWeatherEmoji = (iconCode) => {
  const emojiMap = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '🌙',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
  };

  return emojiMap[iconCode] || '☁️';
};

export const getWeatherConditionIcon = (condition) => {
  const conditionMap = {
    Clear: 'weather-sunny',
    Clouds: 'weather-cloudy',
    Rain: 'weather-rainy',
    Drizzle: 'weather-rainy',
    Thunderstorm: 'weather-lightning',
    Snow: 'weather-snowy',
    Mist: 'weather-fog',
    Fog: 'weather-fog',
    Haze: 'weather-hazy',
  };

  return conditionMap[condition] || 'weather-cloudy';
};

export const getWeatherConditionEmoji = (condition) => {
  const emojiMap = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Fog: '🌫️',
    Haze: '🌫️',
  };

  return emojiMap[condition] || '☁️';
};

