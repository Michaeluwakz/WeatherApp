/**
 * Responsive Utilities
 * Helper functions for responsive sizing across all devices
 */

import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro)
const baseWidth = 375;
const baseHeight = 812;

/**
 * Scale size based on screen width
 * @param {number} size - Base size
 * @returns {number} Scaled size
 */
export const scaleWidth = (size) => {
  return (SCREEN_WIDTH / baseWidth) * size;
};

/**
 * Scale size based on screen height
 * @param {number} size - Base size
 * @returns {number} Scaled size
 */
export const scaleHeight = (size) => {
  return (SCREEN_HEIGHT / baseHeight) * size;
};

/**
 * Scale size moderately (best for UI elements)
 * @param {number} size - Base size
 * @param {number} factor - Scale factor (default 0.5)
 * @returns {number} Scaled size
 */
export const moderateScale = (size, factor = 0.5) => {
  return size + (scaleWidth(size) - size) * factor;
};

/**
 * Scale font size responsively
 * @param {number} size - Base font size
 * @returns {number} Scaled font size
 */
export const scaleFontSize = (size) => {
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

/**
 * Get responsive dimensions
 */
export const responsiveDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_WIDTH < 375,
  isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768,
  isLargeDevice: SCREEN_WIDTH >= 768,
  isTablet: SCREEN_WIDTH >= 768,
  isWeb: Platform.OS === 'web',
};

/**
 * Get responsive padding
 */
export const getResponsivePadding = () => {
  if (responsiveDimensions.isSmallDevice) {
    return 12;
  } else if (responsiveDimensions.isLargeDevice) {
    return 24;
  }
  return 16;
};

/**
 * Get responsive font sizes
 */
export const fontSizes = {
  small: scaleFontSize(12),
  regular: scaleFontSize(14),
  medium: scaleFontSize(16),
  large: scaleFontSize(18),
  xlarge: scaleFontSize(24),
  xxlarge: scaleFontSize(32),
  huge: scaleFontSize(48),
};

/**
 * Get responsive spacing
 */
export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  xxxl: moderateScale(32),
};

/**
 * Get responsive border radius
 */
export const borderRadius = {
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(20),
  xxl: moderateScale(28),
  round: moderateScale(50),
};

/**
 * Get responsive icon size
 */
export const getIconSize = (baseSize = 24) => {
  return moderateScale(baseSize);
};

/**
 * Get responsive emoji size
 */
export const getEmojiSize = (baseSize = 24) => {
  return moderateScale(baseSize);
};

/**
 * Responsive wrapper for web media queries
 */
export const webMediaQuery = {
  maxWidth: (width) => Platform.OS === 'web' ? `@media (max-width: ${width}px)` : null,
  minWidth: (width) => Platform.OS === 'web' ? `@media (min-width: ${width}px)` : null,
};

export default {
  scaleWidth,
  scaleHeight,
  moderateScale,
  scaleFontSize,
  responsiveDimensions,
  getResponsivePadding,
  fontSizes,
  spacing,
  borderRadius,
  getIconSize,
  getEmojiSize,
  webMediaQuery,
};

