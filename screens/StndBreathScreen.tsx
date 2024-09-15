// screens/StndBreathScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type StndBreathScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StndBreathScreen'>;

export default function StndBreathScreen() {
  const navigation = useNavigation<StndBreathScreenNavigationProp>();

  const handleTilePress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const handleChangeDurationPress = () => {
    navigation.navigate('ChangeDuration');
  };

  return (
    <ImageBackground source={require('../assets/MusicTracksBaseScreenBacklight.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Breathe</Text>
        <View style={styles.tilesContainer}>
          <TouchableOpacity
            style={[styles.tile, styles.tileOrange]}
            onPress={() => handleTilePress('EqualBreathingScreen')}
          >
            <Text style={styles.tileTitle}>Equal Breathing</Text>
            <Text style={styles.tileDescription}>Equal Breathing helps you to relax & focus</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
              <TouchableOpacity style={styles.durationButton} onPress={handleChangeDurationPress}>
                <Text style={styles.durationButtonText}>Change Duration</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, styles.tileBlue]}
            onPress={() => handleTilePress('BoxBreathingScreen')}
          >
            <Text style={styles.tileTitle}>Box Breathing</Text>
            <Text style={styles.tileDescription}>Box Breathing helps you to relax & focus</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
              <TouchableOpacity style={styles.durationButton} onPress={handleChangeDurationPress}>
                <Text style={styles.durationButtonText}>Change Duration</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tilesContainer}>
          <TouchableOpacity style={[styles.tile, styles.tileGreen]} onPress={() => handleTilePress('HoldBreathingScreen')}>
            <Text style={styles.tileTitle}>Hold Breathing</Text>
            <Text style={styles.tileDescription}>Hold Breathing helps you to relax & focus</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
              <TouchableOpacity style={styles.durationButton} onPress={handleChangeDurationPress}>
                <Text style={styles.durationButtonText}>Change Duration</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tile, styles.tilePurple]} onPress={() => handleTilePress('478BreathingScreen')}>
            <Text style={styles.tileTitle}>4-7-8 Breathing</Text>
            <Text style={styles.tileDescription}>4-7-8 Breathing helps you to relax & focus</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
              <TouchableOpacity style={styles.durationButton} onPress={handleChangeDurationPress}>
                <Text style={styles.durationButtonText}>Change Duration</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Julius Sans One',
    marginVertical: 30,
    color: '#fff',
  },
  tilesContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tile: {
    width: '48%',
    height: 350,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20, // Add margin bottom for spacing between rows
  },
  tileOrange: {
    backgroundColor: 'rgba(255, 140, 0, 0.3)', // Orange transparent color
  },
  tileBlue: {
    backgroundColor: 'rgba(135, 206, 235, 0.5)', // Blue transparent color
  },
  tileGreen: {
    backgroundColor: 'rgba(85, 107, 47, 0.3)', // Green transparent color
  },
  tilePurple: {
    backgroundColor: 'rgba(221, 160, 221, 0.3)', // Purple transparent color
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  tileDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  durationButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  durationButtonText: {
    color: '#000',
    fontSize: 14,
  },
});
