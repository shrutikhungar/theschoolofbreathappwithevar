import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useAuth } from '../context/AuthContext';
import { CustomAlert } from '../components/login/CustomFeedback';
import { Ionicons } from '@expo/vector-icons';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RegisterEmailScreen'>;

export default function RegisterEmailScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { register } = useAuth();

  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768;

  const backgroundSource = isTablet
    ? require('../assets/RegisterEmailScreenIpad.jpg')
    : require('../assets/RegisterEmailScreenPhone.jpg');

  // Dynamically calculate marginTop for the "REGISTER EMAIL" text based on screen height
  const dynamicMarginTop = Platform.OS === 'ios'
    ? height * 0.35 // 35% of the screen height for iOS
    : height * 0.43; // Adjust for Android

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onRegister = async () => {
    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      showAlert('Input Error', 'Please fill out all fields');
      return;
    }

    setIsLoading(true);

    try {
      await register(fullName, email, password);
      showAlert('Success', 'Registration successful!');
      navigation.navigate('BaseHome');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong, please try again.';
      showAlert('Registration Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginPress = () => {
    navigation.navigate('Login'); // Navigates to LoginScreen.tsx
  };

  return (
    <View style={styles.containerBox}>
      <ImageBackground
        source={backgroundSource}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <Text style={[styles.headingText, { marginTop: dynamicMarginTop }]}>REGISTER EMAIL</Text>

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#A9A9A9"
                value={formData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
                editable={!isLoading}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                editable={!isLoading}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry={!isVisible}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  editable={!isLoading}
                />
                <TouchableOpacity onPress={toggleVisibility} style={styles.eyeIcon}>
                  <Ionicons name={isVisible ? 'eye-off' : 'eye'} size={20} color="#A9A9A9" />
                </TouchableOpacity>
              </View>

              <Text style={styles.agreementText}>
                I agree to receive updates on WhatsApp and accept the{' '}
                <Text style={styles.linkText} onPress={() => navigation.navigate('PrivacyPolicy')}>
                  privacy policy
                </Text>.
              </Text>

              <TouchableOpacity onPress={onRegister} disabled={isLoading} style={styles.buttonWrapper}>
                <LinearGradient colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']} style={styles.submitButton}>
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.buttonText}>Register</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={onLoginPress} disabled={isLoading} style={styles.buttonWrapper}>
                <LinearGradient colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']} style={styles.loginButton}>
                  <Text style={styles.buttonText}>Existing User? Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <Text style={[styles.contactTitle, { fontSize: isTablet ? 16 : 18 }]}>CONTACT US</Text>
        <View style={styles.contactContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('BookACallScreen')}>
            <Image source={require('../assets/bookcall.png')} style={styles.contactIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:connect@meditatewithabhi.com')}>
            <Image source={require('../assets/email.png')} style={styles.contactIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('WebsiteScreen')}>
            <Image source={require('../assets/website.png')} style={styles.contactIcon} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.website, { marginTop: isTablet ? -15 : -20 }]}>www.meditatewithabhi.com</Text>
      </ImageBackground>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80, // Ensure enough space for the bottom elements
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 24,
    fontFamily: 'Julius Sans One',
    color: '#72616d',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: Platform.OS === 'ios' ? 10 : 5, // Adjusted to fit better on mobile
    borderColor: '#000',
    borderWidth: 1,
    
  },
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  passwordInput: {
    flex: 1,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: Platform.OS === 'ios' ? 10 : -2, // Adjusted to fit better on mobile
    borderColor: '#000',
    borderWidth: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
  },
  buttonWrapper: {
    width: '100%',
    height: 36,
    marginVertical: Platform.OS === 'ios' ? 20 : 5, // Adjusted to fit better on mobile
    alignItems: 'center',
  },
  submitButton: {
    width: '90%',
    height: Platform.OS === 'ios' ? 50 : 37, // Adjusted to fit better on mobile
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
  },
  loginButton: {
    width: '90%',
    height: Platform.OS === 'ios' ? 50 : 37, // Adjusted to fit better on mobile
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 2,
  },
  contactTitle: {
    fontFamily: 'Julius Sans One',
    color: '#72616d',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop:-50
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  contactIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  website: {
    color: '#72616d',
    textAlign: 'center',
  },
  agreementText: {
    marginTop: 1,
    marginBottom: 9,
    fontSize: 7,
    color: '#72616d',
    textAlign: 'center',
  },
  linkText: {
    color: '#72616d',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
