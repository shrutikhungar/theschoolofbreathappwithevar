//auth.service.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { getSecretValue } from '../utils/secretManager';  // Import getSecretValue function

const persistData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Persisted key: ${key} with value: ${value}`);  // Add a log here
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const handleLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    console.log('Fetching API_URL and API_SYSTEME_KEY from Google Secret Manager...');
    
    // Fetch the secrets for API_URL and API_SYSTEME_KEY from Google Secret Manager
    const API_URL = await getSecretValue('API_URL');  // Retrieve API_URL from Secret Manager
    const API_SYSTEME_KEY = await getSecretValue('API_SYSTEME_KEY');  // Retrieve API_SYSTEME_KEY

    console.log('API_URL:', API_URL);  // Log the API_URL
    console.log('API_SYSTEME_KEY:', API_SYSTEME_KEY);  // Log the API_SYSTEME_KEY

    const saveUserData = { email, password };
    const saveUserInDb = await axios.post(`${API_URL}/auth/login`, saveUserData);

    if (saveUserInDb.data.success) {
      console.log('Login successful, user authenticated');
      try {
        const getUserFromSystemIo = await axios.get(`${API_URL}/contact?email=${email}`, {
          headers: { 'Authorization': `Bearer ${API_SYSTEME_KEY}` }
        });

        if (getUserFromSystemIo.data.success && getUserFromSystemIo.data.data.items.length > 0) {
          const userToValidate = getUserFromSystemIo.data.data.items[0] ?? [];
          await persistData('userFromSystemeIo', JSON.stringify(userToValidate));
        } else {
          console.warn('User data not found in SystemIo');
        }
      } catch (systemIoError) {
        console.error('Error fetching user data from SystemIo', systemIoError);
      }

      await persistData('isAuth', 'true');
      await persistData('authorization', `${saveUserInDb.data.token}`);
      await persistData('user', JSON.stringify(saveUserInDb.data.user));
      return true;
    } else {
      throw new Error('Login failed: Unknown error');
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    console.error('Login error:', error);  // Log the error

    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = 'Invalid email or password';
            break;
          case 401:
            errorMessage = 'Unauthorized: Please check your credentials';
            break;
          case 404:
            errorMessage = 'User not found';
            break;
          case 500:
            errorMessage = 'Server error: Please try again later';
            break;
          default:
            errorMessage = error.response.data?.info || 'An error occurred during login';
        }
      } else if (error.request) {
        errorMessage = 'No response from server: Please check your internet connection';
      } else {
        errorMessage = 'Error setting up the request: ' + error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    Alert.alert('Login Failed', errorMessage);
    return false;
  }
};
