/**
 * Linear Gradient - Web Component
 * CSS-based gradient for web
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

const LinearGradient = ({ colors, start, end, style, children, ...props }) => {
  // Convert React Native gradient props to CSS
  const startX = start?.x || 0;
  const startY = start?.y || 0;
  const endX = end?.x || 0;
  const endY = end?.y || 1;

  // Calculate angle from start and end points
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI) + 90;

  const gradientStyle = {
    backgroundImage: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
  };

  return (
    <View style={[style, gradientStyle]} {...props}>
      {children}
    </View>
  );
};

export default LinearGradient;

