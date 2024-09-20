import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ImageBackground, Image, ActivityIndicator, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { RootStackParamList } from '../App';
import { courses, pastelColors } from '../data/courses';
import { useCourseAccess } from '../hooks/useCourseAccess';
import { fetchUserTags } from '../services/tags.service';
import { coursesStyle as styles } from '../styles/courses.styles';
import { useAuth } from '../context/AuthContext';
import { Course } from '../models/courses';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CourseListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CourseListHome'>;
type CourseListScreenRouteProp = RouteProp<RootStackParamList, 'CourseListHome'>;

type Props = {
  navigation: CourseListScreenNavigationProp;
  route: CourseListScreenRouteProp;
};

const handleUpgradeNow = (navigation: any, isAuthenticated: boolean) => {
  if (!isAuthenticated) {
    navigation.navigate('Login'); // Navigate to Login screen if not authenticated
  } else {
    Linking.openURL('https://www.meditatewithabhi.com/holistic-membership'); // Upgrade URL for Premium
  }
};

const CourseListHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getToken = useCallback(async () => {
    return await AsyncStorage.getItem('userToken');
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await getToken();
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);  // Set to false when token not found
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, [getToken]);

  const { data: userTags = [], isLoading, error } = useQuery<string[], Error>({
    queryKey: ['userTags', user?.email, isAuthenticated],
    queryFn: async () => {
      const token = await getToken();
      if (token && isAuthenticated) {
        return fetchUserTags(user?.email ?? '');  // Fetch only if token exists and user is authenticated
      }
      return [];
    },
    enabled: isAuthenticated,  // Only run if user is authenticated
  });

  const accessibleCourses = useCourseAccess(userTags || [], courses);

  const renderCourse = ({ item, index }: { item: Course; index: number }) => {
    const hasAccess = accessibleCourses.includes(item.id);

    return (
      <View style={[styles.card, { backgroundColor: pastelColors[index % pastelColors.length] }]}>
        <Image source={item.image} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.type} • {item.days}</Text>
          <Text style={styles.cardTime}>{item.time}</Text>
          {item.description ? <Text style={styles.cardDescription}>{item.description}</Text> : null}
          {isAuthenticated && hasAccess ? (
            <TouchableOpacity
              onPress={() => { navigation.navigate('CourseDetail', { courseId: item.id }); }}
              style={styles.accessButton}
            >
              <Text style={styles.accessButtonText}>Access Now</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.lockedContainer}>
              <Ionicons name="lock-closed" size={18} color="#888" />
              <LinearGradient colors={['transparent', '#a59db4']} style={styles.upgradeButtonContainer}>
                {/* Enable button for unauthenticated users, disable for authenticated users without premium access */}
                <TouchableOpacity
                  style={[
                    styles.upgradeButton,
                    !isAuthenticated ? { backgroundColor: '#679fd3' } : { backgroundColor: '#cccccc' }
                  ]}
                  onPress={() => handleUpgradeNow(navigation, isAuthenticated)}
                  disabled={isAuthenticated} // Disable if authenticated but no access
                >
                  <Text style={[
                    styles.upgradeButtonText,
                    !isAuthenticated ? { color: '#ffffff' } : { color: '#888888' }
                  ]}>
                    {isAuthenticated ? 'Premium Members Only' : 'Login to Access'}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <ImageBackground source={require('../assets/MeditationCourseDetails.jpg')} style={styles.header}>
      <View style={styles.courseInfoOverlay}>
        <Text style={styles.courseTitle}>Courses Designed To Help You Grow</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>4.7 (323 ratings)</Text>
        </View>
      </View>
    </ImageBackground>
  );

  const renderFooter = () => (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate('VideoAskScreen')}
    >
      <Ionicons name="megaphone" size={28} color="white" />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching data: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        style={{ flex: 1 }}  // Make sure FlatList occupies full height
      />
      {renderFooter()}
    </View>
  );
};

export default CourseListHomeScreen;
