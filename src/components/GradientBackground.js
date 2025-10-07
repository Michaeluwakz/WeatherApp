/**
 * Gradient Background Component
 * Platform-aware gradient wrapper
 */

import React from 'react';
import { Platform } from 'react-native';
import LinearGradientNative from 'react-native-linear-gradient';
import LinearGradientWeb from './LinearGradient.web';

// Use native gradient for iOS/Android, web gradient for web
const LinearGradient = Platform.OS === 'web' ? LinearGradientWeb : LinearGradientNative;

const GradientBackground = ({ colors, children, style, ...props }) => {
  return (
    <LinearGradient
      colors={colors}
      style={style}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;


