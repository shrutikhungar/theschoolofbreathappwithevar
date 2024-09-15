import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // Get the width of the device to determine if it's a tablet
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768; // Use this condition to determine if it's an iPad

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('BaseHome'); // Navigate to BaseHome after 6 seconds
    }, 9000); // Delay for 9 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={isTablet 
        ? require('../assets/HolisticAwakeningSplashIpad.gif')  // Use iPad-specific GIF
        : require('../assets/HolisticAwakeningSplash.gif')}     // Use phone-specific GIF
      style={styles.background}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
