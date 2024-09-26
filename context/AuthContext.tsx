import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL,SYSTEME_API_URL,API_SYSTEME_KEY } from '@env';  // Import API_URL from environment variable

export type User = {
  id: string;
  fullName: string;
  name: string;
  email: string;
  membershipType?: string;
  token: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserInfo: (userInfo: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

const [customAlertVisible, setCustomAlertVisible] = useState(false);
const [customAlertTitle, setCustomAlertTitle] = useState('');
const [customAlertMessage, setCustomAlertMessage] = useState('');

  
  // Check if user is already logged in (on mount)
  useEffect(() => {
    checkAuthStatus();
  }, []);


const showCustomAlert = (title: string, message: string) => {
  setCustomAlertTitle(title);
  setCustomAlertMessage(message);
  setCustomAlertVisible(true);
};

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      console.log('Checking auth status:', { token, userData }); // Log stored token and user data
  
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };  

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting to log in with:', { email, password });
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      console.log('Login response:', response.data); // Log the response data
  
      const { token, user } = response.data;
  
      // Store token and user data in AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      console.log('Stored token and user data in AsyncStorage:', { token, user });
  
      setIsAuthenticated(true);
      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error response from server during login:', error.response.data);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      console.log('Registering user with:', { fullName, email, password });
  
      // Register in Vercel API
      const response = await axios.post(`${API_URL}/auth/register`, { fullName, email, password });
      console.log('Vercel API Registration response:', response.data);
  
      const { token, user } = response.data;
  
      // Register in Systeme.io
      const systemeResponse = await axios.post(
        `${SYSTEME_API_URL}/contacts`,
        {
          email: email,
          locale: null,
          fields: [
            { slug: 'first_name', value: fullName },
            { slug: 'country', value: 'US' },
          ],
        },
        {
          headers: {
            'X-API-Key': API_SYSTEME_KEY,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Systeme.io Registration response:', systemeResponse.data);
  
      const contactId = systemeResponse.data.id;
  
      // Fetch the list of tags
      const existingTagResponse = await axios.get(`${SYSTEME_API_URL}/tags`, {
        headers: {
          'X-API-Key': API_SYSTEME_KEY,
          Accept: 'application/json',
        },
      });
  
      const tags = existingTagResponse.data.items;
      if (!Array.isArray(tags)) {
        throw new Error('Tags data is not an array.');
      }
  
      const tag = tags.find((t) => t.name === 'new_app_user');
      let tagId;
  
      if (tag) {
        tagId = tag.id;
        console.log('Found existing tag with ID:', tagId);
      } else {
        const tagResponse = await axios.post(
          `${SYSTEME_API_URL}/tags`,
          { name: 'new_app_user' },
          {
            headers: {
              'X-API-Key': API_SYSTEME_KEY,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        tagId = tagResponse.data.id;
        console.log('Tag created with ID:', tagId);
      }
  
      await axios.post(
        `${SYSTEME_API_URL}/contacts/${contactId}/tags`,
        {
          tagId: tagId,
        },
        {
          headers: {
            'X-API-Key': API_SYSTEME_KEY,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Tag assigned to contact.');
  
      // Store token and user data in AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      console.log('Stored token and user data in AsyncStorage after registration:', { token, user });
  
      setIsAuthenticated(true);
      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // Show success alert
      showCustomAlert('Registration Successful', 'You have been successfully registered.');
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorResponse = error.response.data;
        const errorMessage = errorResponse?.info === 'Email is already registered'
          ? 'This email is already registered. Please use a different email.'
          : 'Registration failed. Please try again.';
  
        showCustomAlert('Registration Error', errorMessage);
      } else {
        showCustomAlert('Registration Error', 'An error occurred. Please check your network and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  const logout = async () => {
    setIsLoading(true);
    try {
      console.log('Logging out user');
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setIsAuthenticated(false);
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserInfo = async (userInfo: Partial<User>) => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error('No user logged in');
      }
      const updatedUser = { ...user, ...userInfo };
      console.log('Updating user info:', updatedUser);

      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      await axios.put(`${API_URL}/user`, updatedUser);  // Use API_URL from env
    } catch (error) {
      console.error('Update user info error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    register,
    logout,
    updateUserInfo,
    customAlertVisible,
    customAlertTitle,
    customAlertMessage,
    setCustomAlertVisible // To close the alert
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
