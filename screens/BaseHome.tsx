import React from 'react';
import { ScrollView, Dimensions, Platform } from 'react-native';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../App';

type BaseHomeNavigationProp = StackNavigationProp<RootStackParamList, 'BaseHome'>;

export default function BaseHome() {
  const navigation = useNavigation<BaseHomeNavigationProp>();
  const { height, width } = Dimensions.get('window');

  // Determine if the device is a tablet (iPad)
  const isTablet = width >= 768;

  // Buttons array with updated navigation for "OUR MEMBERSHIP"
  const buttons = [
    { text: 'SLEEP MUSIC', navigateTo: 'MusicTracksBase', icon: require('../assets/music-icon.png') },
    { text: 'LAUNCH COURSES', navigateTo: 'CourseListHome', icon: require('../assets/course-icon.png') },
    { text: 'OUR COURSES', navigateTo: 'OurCoursesScreen', icon: require('../assets/chatbotIcon.png') },
  ];

  // Choose the banner image based on the device type
  const bannerSource = isTablet
    ? require('../assets/BaseHomeBackgroundIpad.gif')  // Banner for iPad
    : require('../assets/BaseHomeBackgroundPhone.gif'); // Banner for phone

  return (
    <ImageBackground
      source={require('../assets/BaseHomeBackgroundbg.png')}  // Background for both iPad and phone
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={[
            styles.bannerContainer, 
            Platform.OS === 'android' ? { marginTop: -10 } : { marginTop: 0 } // Fix for Android gap
          ]}>
            <Image 
              source={bannerSource}  // Load the appropriate banner based on device
              style={[
                styles.bannerImage, 
                { 
                  height: isTablet ? height * 0.35 : height * 0.3, // Adjust height for iPads
                  resizeMode: 'cover', // Ensures the image covers the container while keeping aspect ratio
                }
              ]}
            />
            <View style={[styles.profileImageWrapper, { width: isTablet ? 110 : 100, height: isTablet ? 110 : 100, top: isTablet ? '98%' : '100%' }]}>
              {/* Pushed the profile image further down */}
              <Image source={require('../assets/profileImage.png')} style={styles.profileImage} />
            </View>
          </View>
          <Text style={[styles.title, { fontSize: isTablet ? 18 : 22, marginTop: isTablet ? 90 : 90 }]}>
            THE SCHOOL OF BREATH
          </Text>
          <Text style={[styles.subtitle, { fontSize: isTablet ? 14 : 16 }]}>BY ABHI DUGGAL</Text>

          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (button.navigateTo) {
                  navigation.navigate(button.navigateTo);
                }
              }}
              style={[styles.buttonWrapper, { width: isTablet ? '75%' : '90%' }]}
            >
              <LinearGradient
                colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']}
                style={[styles.button, { padding: isTablet ? 15 : 15, height: isTablet ? 75 : 80 }]}
              >
                <Image source={button.icon} style={[styles.buttonIcon, { width: isTablet ? 55 : 63, height: isTablet ? 55 : 63 }]} />
                <Text style={[styles.buttonText, { fontSize: isTablet ? 14 : 16 }]}>{button.text}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}

          <Text style={[styles.contactTitle, { fontSize: isTablet ? 16 : 18 }]}>CONTACT US</Text>
          <View style={styles.contactContainer}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('BookACallScreen')}>
              <Image source={require('../assets/bookcall.png')} style={styles.contactIcon} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => Linking.openURL('mailto:connect@meditatewithabhi.com')}>
              <Image source={require('../assets/email.png')} style={styles.contactIcon} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('WebsiteScreen')}>
              <Image source={require('../assets/website.png')} style={styles.contactIcon} />
            </TouchableOpacity> */}
          </View>
          {/* <Text style={[styles.website, { marginTop: isTablet ? -15 : -20 }]}>www.meditatewithabhi.com</Text> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 0,
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    resizeMode: 'cover', // Ensures the image covers the container while keeping aspect ratio
  },
  profileImageWrapper: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -55 }],
    shadowOffset: { width: 1, height: 1 },
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  title: {
    fontFamily: 'Julius Sans One',
    color: '#72616d',
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'Julius Sans One',
    color: '#a693ab',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonWrapper: {
    marginVertical: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 15,
    flex: 1,
    letterSpacing: 2,
  },
  buttonIcon: {
    resizeMode: 'contain',
  },
  contactTitle: {
    fontFamily: 'Julius Sans One',
    color: '#72616d',
    fontWeight: 'bold'
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
    color: '#72616d'
  },
});
