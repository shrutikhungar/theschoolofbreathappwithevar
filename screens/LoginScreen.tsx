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
  Linking,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useAuth } from '../context/AuthContext';
import { CustomAlert } from '../components/login/CustomFeedback';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading } = useAuth();

  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768;

  const backgroundSource = isTablet
    ? require('../assets/AbhiLoginFullIpad.jpg')
    : require('../assets/AbhiLoginFullPhone.png');

  // Dynamically calculate marginTop for the "WELCOME" text based on screen height
  const dynamicMarginTop = Platform.OS === 'ios'
    ? height * 0.45
    : height * 0.46;

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const onLogin = async () => {
    if (!email || !password) {
      showAlert('Login Failed', 'Invalid email or password. Please try again.');
      return;
    }
    try {
      await login(email, password);
      navigation.navigate('BaseHome');
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'INVALID_CREDENTIALS':
            showAlert('Login Failed', 'Invalid email or password. Please try again.');
            break;
          case 'NETWORK_ERROR':
            showAlert('Connection Error', 'Unable to connect to the server. Please check your internet connection and try again.');
            break;
          case 'SERVER_ERROR':
            showAlert('Server Error', 'An unexpected error occurred. Please try again later.');
            break;
          default:
            showAlert('Login Error', 'An error occurred during login. Please try again.');
        }
      } else {
        showAlert('Login Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <ImageBackground source={backgroundSource} style={styles.background} resizeMode="cover">
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            {/* Dynamically adjust the marginTop */}
            <Text style={[styles.welcomeText, { marginTop: dynamicMarginTop }, isTablet && styles.welcomeTextTablet]}>
              WELCOME
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#A9A9A9"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color="#A9A9A9"
                />
              </TouchableOpacity>
            </View>

            <Text
              style={[styles.forgotPassword, isTablet && styles.forgotPasswordTablet]}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              Forgot Password?
            </Text>

            <TouchableOpacity onPress={onLogin} disabled={isLoading} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']}
                style={styles.submitButton}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterEmailScreen')}
              disabled={isLoading}
              style={styles.buttonWrapper}
            >
              <LinearGradient
                colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']}
                style={styles.registerButton}
              >
                <Text style={styles.buttonText}>New users?</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Contact Us Section */}
          <Text style={[styles.contactTitle, isTablet ? { marginTop: 40 } : { marginTop: 10 }]}> {/* Adjust marginTop for tablets */}
            CONTACT US
          </Text>
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
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '105%',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  content: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#72616d',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeTextTablet: {
    fontSize: 20,
    marginBottom: 8,
  },
  input: {
    width: '95%',
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  passwordContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  passwordInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    borderColor: '#000',
    borderWidth: 1,
    paddingRight: 40, // Prevent overlap with eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  forgotPassword: {
    fontSize: 15,
    color: '#72616d',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 10,
    textAlign: 'center',
  },
  forgotPasswordTablet: {
    fontSize: 13,
    marginBottom: 8,
  },
  buttonWrapper: {
    width: '95%',
    height: 45,
    marginVertical: 8,
  },
  submitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
  },
  registerButton: {
    flex: 1,
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
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
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
});
