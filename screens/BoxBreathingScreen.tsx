import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing, ImageBackground, TouchableOpacity, Dimensions, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const BoxBreathingScreen = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const animationSequence = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    const grow = Animated.timing(scaleValue, {
      toValue: 2,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.linear,
    });

    const stay = Animated.timing(scaleValue, {
      toValue: 2,
      duration: 4000,
      useNativeDriver: true,
      easing: Easing.linear,
    });

    const shrink = Animated.timing(scaleValue, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
      easing: Easing.linear,
    });

    animationSequence.current = Animated.sequence([grow, stay, shrink]);

    return () => {
      scaleValue.stopAnimation();
    };
  }, [scaleValue]);

  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      Animated.loop(animationSequence.current!).start();
    }
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    scaleValue.stopAnimation();
  };

  return (
    <ImageBackground
      source={require('../assets/Back10.png')} // replace with your background image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Box Breathing</Text>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <Image
            source={require('../assets/your_image.png')} // replace with your image inside the circle
            style={styles.circleImage}
          />
        </Animated.View>
        <TouchableOpacity style={styles.button} onPress={isAnimating ? stopAnimation : startAnimation}>
          <Ionicons name={isAnimating ? 'pause' : 'play'} size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: 50,
  },
  circle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BoxBreathingScreen;
