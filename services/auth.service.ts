import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const urlApi = 'https://api-music-two.vercel.app'; // Replace with your actual API URL

const persistData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const handleLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    const saveUserData = { email, password };
    const saveUserInDb = await axios.post(`${urlApi}/auth/login`, saveUserData);

    if (saveUserInDb.data.success) {
      try {
        const getUserFromSystemIo = await axios.get(`${urlApi}/contact?email=${email}`);

        if (getUserFromSystemIo.data.success && getUserFromSystemIo.data.data.items.length > 0) {
          const userToValidate = getUserFromSystemIo.data.data.items[0] ?? [];
          await persistData('userFromSystemeIo', JSON.stringify(userToValidate));
        } else {
          console.warn('User data not found in SystemIo');
        }
      } catch (systemIoError) {
        console.error('Error fetching user data from SystemIo', systemIoError);
        // We'll continue with the login process even if this fails
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