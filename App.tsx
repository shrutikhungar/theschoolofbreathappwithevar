import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer, useNavigationState, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AlzaSyDqXx9WbrhpMdh_zne_VGGskTQBCCFjhuU", // Web API Key
  authDomain: "sleepmusicapp-413415.firebaseapp.com", // Auth domain based on the project ID
  projectId: "sleepmusicapp-413415", // Project ID
  storageBucket: "sleepmusicapp-413415.appspot.com", // Storage bucket name follows the pattern: <project-id>.appspot.com
  messagingSenderId: "116109207837", // You can find this in Firebase console
  appId: "1:116109207837:ios:621652fdb1f6fe209f4" // App ID provided in the screenshot
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Import screens
import BaseHome from './screens/BaseHome';
import PlayerScreen from './screens/PlayerScreen';
import StndBreathScreen from './screens/StndBreathScreen';
import ChangeDurationScreen from './screens/ChangeDurationScreen';
import SplashScreen from './screens/SplashScreen';
import MusicTracksBaseScreen from './screens/MusicTracksBaseScreen';
import BoxBreathingScreen from './screens/BoxBreathingScreen';
import EqualBreathingScreen from './screens/EqualBreathingScreen';
import CourseListHomeScreen from './screens/CourseListHomeScreen';
import CourseDetailScreen from './screens/CourseDetail';
import NineDayBreathworkCourseScreen from './screens/9DayBreathworkCourseScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import RestfulSleepCourse from './screens/RestfulSleepCourseScreen';
import SwaraYogaCourseScreen from './screens/SwaraYogaCourseScreen';
import NineDayBlissCourseScreen from './screens/9DayBlissCourseScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPasswordScreen';
import RegisterEmailScreen from './screens/RegisterEmailScreen';
import PrivacyPolicy from './components/PrivacyPolicy';
import WebsiteScreen from './screens/WebsiteScreen';
import VideoAskScreen from './screens/VideoAskScreen';
import BookACallScreen from './screens/BookACallScreen';
import OurCoursesScreen from './screens/OurCoursesScreen';

// Import providers
import { AudioProvider } from './context/AudioContext';
import { AuthProvider } from './context/AuthContext';
import { AudioEffectsProvider } from './context/AudioEffectsContext';

// Import Custom Drawer Content
import CustomDrawerContent from './components/CustomDrawerContent';

AsyncStorage.clear()
  .then(() => console.log('AsyncStorage cleared'))
  .catch((err) => console.error('Error clearing AsyncStorage', err));
  
const queryClient = new QueryClient();

export type RootStackParamList = {
  Splash: undefined;
  BaseHome: undefined;
  Player: undefined;
  StndBreathScreen: undefined;
  VideoPlayer: { videoUrl: string, fromYoutube: boolean };
  ChangeDuration: undefined;
  MusicTracksBase: undefined;
  BoxBreathingScreen: undefined;
  EqualBreathingScreen: undefined;
  CourseListHome: undefined;
  CourseDetail: { courseId: string };
  NineDayBreathworkCourseScreen: undefined;
  RestfulSleepCourse: undefined;
  SwaraYogaCourseScreen: undefined;
  NineDayBlissCourseScreen: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  RegisterEmailScreen: undefined;
  PrivacyPolicy: undefined;
  WebsiteScreen: undefined;
  VideoAskScreen: undefined;
  BookACallScreen: undefined;
  OurCoursesScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="BaseHome" component={BaseHome} />
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="StndBreathScreen" component={StndBreathScreen} />
      <Stack.Screen name="ChangeDuration" component={ChangeDurationScreen} />
      <Stack.Screen name="MusicTracksBase" component={MusicTracksBaseScreen} />
      <Stack.Screen name="BoxBreathingScreen" component={BoxBreathingScreen} />
      <Stack.Screen name="EqualBreathingScreen" component={EqualBreathingScreen} />
      <Stack.Screen name="CourseListHome" component={CourseListHomeScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="NineDayBreathworkCourseScreen" component={NineDayBreathworkCourseScreen} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <Stack.Screen name="RestfulSleepCourse" component={RestfulSleepCourse} />
      <Stack.Screen name="SwaraYogaCourseScreen" component={SwaraYogaCourseScreen} />
      <Stack.Screen name="NineDayBlissCourseScreen" component={NineDayBlissCourseScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="RegisterEmailScreen" component={RegisterEmailScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="WebsiteScreen" component={WebsiteScreen} />
      <Stack.Screen name="VideoAskScreen" component={VideoAskScreen} />
      <Stack.Screen name="BookACallScreen" component={BookACallScreen} />
      <Stack.Screen name="OurCoursesScreen" component={OurCoursesScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  const state = useNavigationState((state) => state);
  const currentRouteName = state?.routes[state.index]?.name;
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '60%', 
          backgroundColor: '#998896',
        },
        drawerActiveBackgroundColor: '#72616d',
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#FFFFFF',
        drawerLabelStyle: {
          fontSize: 16,
          fontFamily: 'Julius Sans One',
        },
        headerRight: () => {
          if (navigation.canGoBack() && currentRouteName !== 'Splash' && currentRouteName !== 'BaseHome') {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 20 }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Back</Text>
              </TouchableOpacity>
            );
          } else if (currentRouteName === 'BaseHome') {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('BaseHome')} style={{ paddingRight: 20 }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Back</Text>
              </TouchableOpacity>
            );
          } else if (currentRouteName === 'Splash') {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Splash')} style={{ paddingRight: 20 }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Back</Text>
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={AppNavigator}
        options={{
          headerStyle: {
            backgroundColor: '#b2a8b6',
          },
          headerTintColor: '#fff',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Julius Sans One': require('./assets/fonts/JuliusSansOne-Regular.ttf'),
      'Ionicons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),  // Ensure Ionicons font is loaded
      'FontAwesome': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'), // Ensure FontAwesome font is loaded
    });
    setFontsLoaded(true);
  };
  

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AudioProvider>
          <AudioEffectsProvider>
            <NavigationContainer>
              <DrawerNavigator />
            </NavigationContainer>
          </AudioEffectsProvider>
        </AudioProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
