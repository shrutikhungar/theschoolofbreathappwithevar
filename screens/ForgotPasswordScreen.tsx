import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Dimensions,  
  Platform,  // <-- Add this import for detecting the platform (iOS/Android)
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { RootStackParamList } from '../App'; // Adjust this import path as needed
import { API_URL } from '../utils/api.config'; // Adjust this import path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';

type PasswordRecoveryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

export default function PasswordRecoveryScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const navigation = useNavigation<PasswordRecoveryScreenNavigationProp>();

  const { width } = Dimensions.get('window');  // Get screen width to determine if it's a phone or tablet
  const isTablet = width >= 768;  // If width is 768px or greater, consider it a tablet (like iPad)

  const backgroundSource = isTablet
    ? require('../assets/FORGOTPASSWORDIpad.jpg')   // iPad background image
    : require('../assets/FORGOTPASSWORDPhone.jpg'); // Phone background image

  const handleSubmit = async () => {
    setIsLoading(true);  // Start loading here, before the async request
    setValidateEmail(false);
    setAlertMessage('');

    if (!email) {
      setIsLoading(false);
      setAlertType('error');
      setAlertMessage('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/generateResetToken`, { email });
      if (response.data) {
        setValidateEmail(true);
        setAlertType('success');
        setAlertMessage('Check your email for further instructions.');
      }
    } catch (error) {
      let errorMessage = 'Something went wrong, please try again.';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      setAlertType('error');
      setAlertMessage(errorMessage);
    } finally {
      setIsLoading(false);  // End loading regardless of success or failure
    }
  };

  useEffect(() => {
    // You can remove or use AsyncStorage for a specific purpose rather than clearing it on mount
    // AsyncStorage.clear(); 
  }, []);

  return (
    <ImageBackground
      source={backgroundSource}  // Dynamically set background image based on screen size
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>Enter Your Email</Text>
        {
          alertMessage && 
          <Text style={{
            marginTop: 5,
            fontWeight: 'bold',
            color: alertType === 'success' ? 'green' : 'red', // Display alert based on the type
          }}>
            {alertMessage}
          </Text>
        }
       
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonWrapper}>
          <LinearGradient colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']} style={styles.gradientButton}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Send Reset Link</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonWrapper}>
          <LinearGradient colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']} style={styles.gradientButton}>
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,  // Adjusted for better readability
    fontFamily: 'Julius Sans One',
    marginTop: Platform.OS === 'ios' ? 320 : 410, // Adjusted to fit better on mobile
    color: '#72616d',
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  subtitle: {
    fontSize: 18,
    color: '#72616d',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 45,  // Increased height for better touch targets
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 19,
    marginVertical: 18,
    borderColor: '#000',
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 10, 
  },
  buttonWrapper: {
    width: '100%',
    height: Platform.OS === 'ios' ? 55 : 45, // Adjusted to fit better on mobile
    borderRadius: 25,
    marginVertical: Platform.OS === 'ios' ? 10 : 5, // Adjusted to fit better on mobile
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradientButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#ffff',
    fontSize: 13,
    letterSpacing: 6
  },
});
