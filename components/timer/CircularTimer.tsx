import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularTimerProps {
  radius: number;
  strokeWidth: number;
  strokeColor: string;
  bgColor: string;
  progress: number; // 0 to 1
  timeText: string;
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  radius,
  strokeWidth,
  strokeColor,
  bgColor,
  progress,
  timeText,
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1000, // Duration of the animation
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Svg height="200" width="200" viewBox="0 0 220 220">
        <Circle
          cx="110"
          cy="110"
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx="110"
          cy="110"
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.timeText}>{timeText}</Text>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CircularTimer;