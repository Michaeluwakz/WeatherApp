/**
 * Weather Effects Component
 * Animated weather effects (rain, sun rays, clouds)
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Rain Effect
export const RainEffect = () => {
  const raindrops = Array.from({ length: 50 }, (_, i) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const left = Math.random() * width;
    const duration = 1000 + Math.random() * 1000;
    
    useEffect(() => {
      const animate = () => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start(() => animate());
      };
      animate();
    }, []);

    return (
      <Animated.View
        key={i}
        style={[
          styles.raindrop,
          {
            left,
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, height],
                }),
              },
            ],
            opacity: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.5, 0.8, 0],
            }),
          },
        ]}
      />
    );
  });

  return <View style={styles.effectContainer} pointerEvents="none">{raindrops}</View>;
};

// Sun Rays Effect
export const SunEffect = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.effectContainer} pointerEvents="none">
      <Animated.View
        style={[
          styles.sunContainer,
          {
            transform: [{ rotate }, { scale: pulse }],
          },
        ]}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.sunRay,
              {
                transform: [
                  { rotate: `${i * 30}deg` },
                  { translateY: -80 },
                ],
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
};

// Cloud Effect
export const CloudEffect = () => {
  const clouds = Array.from({ length: 5 }, (_, i) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const top = 50 + Math.random() * 150;
    const scale = 0.8 + Math.random() * 0.4;
    const duration = 15000 + Math.random() * 10000;
    
    useEffect(() => {
      const animate = () => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start(() => animate());
      };
      animate();
    }, []);

    return (
      <Animated.View
        key={i}
        style={[
          styles.cloud,
          {
            top,
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, width + 100],
                }),
              },
              { scale },
            ],
            opacity: 0.6,
          },
        ]}
      >
        <View style={styles.cloudPart1} />
        <View style={styles.cloudPart2} />
        <View style={styles.cloudPart3} />
      </Animated.View>
    );
  });

  return <View style={styles.effectContainer} pointerEvents="none">{clouds}</View>;
};

// Snow Effect
export const SnowEffect = () => {
  const snowflakes = Array.from({ length: 50 }, (_, i) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const swayValue = useRef(new Animated.Value(0)).current;
    const left = Math.random() * width;
    const duration = 4000 + Math.random() * 3000;
    const size = 6 + Math.random() * 6;
    
    useEffect(() => {
      const animate = () => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start(() => animate());
      };
      animate();

      // Add swaying motion
      Animated.loop(
        Animated.sequence([
          Animated.timing(swayValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(swayValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    return (
      <Animated.Text
        key={i}
        style={[
          styles.snowflake,
          {
            left,
            fontSize: size,
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-30, height + 30],
                }),
              },
              {
                translateX: swayValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 20],
                }),
              },
            ],
            opacity: animatedValue.interpolate({
              inputRange: [0, 0.1, 0.9, 1],
              outputRange: [0, 1, 1, 0],
            }),
          },
        ]}
      >
        ❄️
      </Animated.Text>
    );
  });

  return <View style={styles.effectContainer} pointerEvents="none">{snowflakes}</View>;
};

const styles = StyleSheet.create({
  effectContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  raindrop: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
    borderRadius: 1,
  },
  sunContainer: {
    position: 'absolute',
    top: 80,
    right: 40,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunRay: {
    position: 'absolute',
    width: 4,
    height: 30,
    backgroundColor: 'rgba(255, 223, 0, 0.4)',
    borderRadius: 2,
  },
  cloud: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloudPart1: {
    width: 50,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
  },
  cloudPart2: {
    width: 40,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    marginLeft: -15,
  },
  cloudPart3: {
    width: 45,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 14,
    marginLeft: -15,
  },
  snowflake: {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.95)',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});

