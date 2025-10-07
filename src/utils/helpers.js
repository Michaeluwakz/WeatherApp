/**
 * Helper Functions
 */

/**
 * Format temperature based on unit
 */
export const formatTemperature = (temp, unit = 'metric') => {
  const symbol = unit === 'metric' ? '°C' : '°F';
  return `${Math.round(temp)}${symbol}`;
};

/**
 * Format date for display
 */
export const formatDate = (timestamp, format = 'long') => {
  const date = new Date(timestamp * 1000);
  
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
  if (format === 'time') {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  }
  
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format wind speed
 */
export const formatWindSpeed = (speed, unit = 'metric') => {
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';
  return `${Math.round(speed)} ${speedUnit}`;
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Format humidity
 */
export const formatHumidity = (humidity) => {
  return `${humidity}%`;
};

/**
 * Format pressure
 */
export const formatPressure = (pressure) => {
  return `${pressure} hPa`;
};

/**
 * Get time of day greeting
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

/**
 * Calculate UV Index category
 */
export const getUVIndexCategory = (uvi) => {
  if (uvi <= 2) return { category: 'Low', color: '#8BC34A' };
  if (uvi <= 5) return { category: 'Moderate', color: '#FDD835' };
  if (uvi <= 7) return { category: 'High', color: '#FF9800' };
  if (uvi <= 10) return { category: 'Very High', color: '#F44336' };
  return { category: 'Extreme', color: '#9C27B0' };
};

