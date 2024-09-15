// HomeScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAudio,Track } from '../context/AudioContext';  // Adjust the import path as necessary
import { RootStackParamList } from '../types/audio.model';  // Adjust the import path as necessary

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const musicTracks: Track[] = [
  { id: '1', title: 'Relaxing Waves', url: 'https://storage.googleapis.com/sleepmusic/MWAA0016_1_z6qzdz.mp3' },
  { id: '2', title: 'Forest Sounds', url: 'https://storage.googleapis.com/sleepmusic/MWAA0066_mhcerv.mp3' },
  { id: '3', title: 'Soft Rain', url: 'https://storage.googleapis.com/sleepmusic/MWAA0081_rt5pjf.mp3' },
  // Add more tracks as needed
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { setCurrentTrack, setTracks } = useAudio();

  useEffect(() => {
    setTracks(musicTracks);
  }, []);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    navigation.navigate('Player');
  };

  const renderTrack = ({ item }: { item: Track }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => handleTrackSelect(item)}
    >
      <Text style={styles.trackTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Tracks</Text>
      <FlatList
        data={musicTracks}
        renderItem={renderTrack}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  trackItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  trackTitle: {
    fontSize: 16,
  },
});