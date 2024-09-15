// BaseHome.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../App';

type BaseHomeNavigationProp = StackNavigationProp<RootStackParamList, 'BaseHome'>;

export default function BaseHome() {
  const navigation = useNavigation<BaseHomeNavigationProp>();

  const buttons = [
    { text: 'SLEEP MUSIC 1', navigateTo: 'MusicTracksBase' },
    { text: 'BREATHWORK', navigateTo: 'StndBreathScreen' },
    { text: 'COURSES ACCESS', navigateTo: 'CourseListHome' },
    { text: 'AI ASSISTANT', navigateTo: () => {} },
    { text: 'OUR MEMBERSHIP', navigateTo: () => {} },
    { text: 'OUR COURSES', navigateTo: () => {} }
  ];

  return (
    <ImageBackground
      source={require('../assets/BaseHomeBackgroundbg.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/BaseHomeBackground.gif')} style={styles.bannerImage} />
          <Image source={require('../assets/profileImage.png')} style={styles.profileImage} />
        </View>
        <Text style={styles.title}>THE SCHOOL OF BREATH</Text>
        <Text style={styles.subtitle}>BY ABHI DUGGAL</Text>

        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (typeof button.navigateTo === 'string') {
                navigation.navigate(button.navigateTo);
              } else {
                button.navigateTo();
              }
            }}
          >
            <LinearGradient
              colors={['#695c83','#695c83','#695c83']}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>{button.text}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        <Text style={styles.contactTitle}>CONTACT ME</Text>
        <View style={styles.contactContainer}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps')}>
            <Image source={require('../assets/location.png')} style={styles.contactIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:example@example.com')}>
            <Image source={require('../assets/email.png')} style={styles.contactIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com')}>
            <Image source={require('../assets/website.png')} style={styles.contactIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.website}>www.meditatewithabhi.com</Text>
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
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  bannerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 80,
    position: 'absolute',
    top: 250,
    borderWidth: 5,
    borderColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Julius Sans One',
    marginTop: 70,
    color: '#000',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Julius Sans One',
    marginBottom: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    width: 300, // Adjusted width for longer buttons
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#edd8b0',
    marginVertical: 10,
  },
  buttonText: {
    color: '#edd8b0',
    fontSize: 16,
  },
  contactTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  website: {
    marginTop: 10,
    color: '#000',
  },
});

export default BaseHome;
