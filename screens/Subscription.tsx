import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';

const SubscriptionScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const handleSubscribe = (option) => {
    setSelectedOption(option);
    console.log(`Selected subscription: ${option}`);
    // Handle the subscription logic here based on the selected option
  };

  return (
    <ImageBackground
      source={isTablet ? require('../assets/profileImageBackIpad.jpg') : require('../assets/profileImageBack.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Choose Your Plan</Text>

        {/* Course Only */}
        <TouchableOpacity
          style={[styles.optionTile, selectedOption === 'CourseOnly' && styles.selectedOption]}
          onPress={() => handleSubscribe('CourseOnly')}
        >
          <Text style={styles.optionTitle}>Course Only</Text>
          <Text style={styles.optionDescription}>One-time payment of $29.99 for full access to the course.</Text>
        </TouchableOpacity>

        {/* Monthly Membership */}
        <TouchableOpacity
          style={[styles.optionTile, selectedOption === 'Monthly' && styles.selectedOption]}
          onPress={() => handleSubscribe('Monthly')}
        >
          <Text style={styles.optionTitle}>Monthly Membership</Text>
          <Text style={styles.optionDescription}>$14.99/month. Cancel anytime.</Text>
        </TouchableOpacity>

        {/* Yearly Membership */}
        <TouchableOpacity
          style={[styles.optionTile, selectedOption === 'Yearly' && styles.selectedOption]}
          onPress={() => handleSubscribe('Yearly')}
        >
          <Text style={styles.optionTitle}>Yearly Membership</Text>
          <Text style={styles.optionDescription}>$99.99/year. Save more with an annual plan!</Text>
        </TouchableOpacity>

        {/* Benefits Section */}
        <View style={styles.benefits}>
          <Text style={styles.benefitText}>• Access all courses with membership</Text>
          <Text style={styles.benefitText}>• Access to all sleep features: Solfeggio frequencies designed to heal your body and mind</Text>
          <Text style={styles.benefitText}>• Exclusive 1-1 community support</Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => console.log('Proceed to subscribe')}
        >
          <Text style={styles.confirmButtonText}>Subscribe Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent', // Set to transparent so background image is visible
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 90, // Adjusted for background space
  },
  optionTile: {
    width: '90%',
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedOption: {
    borderColor: '#72616d',
    backgroundColor: '#eae8f2',
    borderWidth: 2,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  benefits: {
    marginTop: 20,
    width: '90%',
  },
  benefitText: {
    fontSize: 16,
    marginVertical: 5,
  },
  confirmButton: {
    marginTop: 30,
    backgroundColor: '#72616d',
    paddingVertical: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;
