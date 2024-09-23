import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState('Yearly');

  const handleSubscribe = (option: string) => {
    setSelectedOption(option);
    console.log(`Selected option: ${option}`);
    // Handle purchase or navigation based on the selected option
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  return (
    <ImageBackground
      source={isTablet ? require('../assets/profileImageBackIpad.jpg') : require('../assets/profileImageBack.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Upgrade Your Plan</Text>

        {/* Subheading */}
        <Text style={styles.subtitle}>Choose your subscription plan:</Text>

        {/* Benefits */}
        <View style={styles.benefits}>
          <Text style={styles.benefitText}>⚡ Access all courses with membership</Text>
          <Text style={styles.benefitText}>⚡ Access all sleep features with membership </Text>
          <Text style={styles.benefitText}>⚡ Access exclusive 1-1 community support</Text>
        </View>

        {/* Pricing options */}
        <View style={styles.pricing}>
          <Pressable
            style={[styles.priceOption, selectedOption === 'Course Only' && styles.selectedOption]}
            onPress={() => handleSubscribe('Course Only')}
          >
            <Text style={styles.priceText}>Course Only</Text>
            <Text style={styles.priceTextSmall}>$19.99 one-time payment</Text>
          </Pressable>

          <Pressable
            style={[styles.priceOption, selectedOption === 'Monthly' && styles.selectedOption]}
            onPress={() => handleSubscribe('Monthly')}
          >
            <Text style={styles.priceText}>Monthly</Text>
            <Text style={styles.priceTextSmall}>$12.99/month</Text>
          </Pressable>

          <Pressable
            style={[styles.priceOption, selectedOption === 'Yearly' && styles.selectedOption]}
            onPress={() => handleSubscribe('Yearly')}
          >
            <Text style={styles.priceText}>Yearly</Text>
            <Text style={styles.priceTextSmall}>$89.99/year</Text>
          </Pressable>
        </View>

        {/* Buy Now button */}
        <Pressable style={styles.startButton} onPress={() => handleSubscribe(selectedOption)}>
          <Text style={styles.buttonText}>Buy Now ✨</Text>
        </Pressable>

        {/* Terms and Privacy Policy */}
        <Text style={styles.terms}>
          All plans include access to premium features. Terms and conditions apply.
        </Text>
        <Pressable onPress={handlePrivacyPolicy}>
          <Text style={styles.restoreText}>Privacy Policy</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 90
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  pricing: {
    marginBottom: 20,
  },
  priceOption: {
    padding: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    borderColor: '#72616d',
    backgroundColor: '#eae8f2'
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceTextSmall: {
    fontSize: 14,
    color: '#555',
  },
  startButton: {
    backgroundColor: '#72616d',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
  restoreText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#4f46e5',
    textDecorationLine: 'underline',
  },
  benefitText: {
    fontSize: 16,
    marginVertical: 5,
  }
});

export default SubscriptionScreen;
