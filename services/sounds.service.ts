import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getSecretValue } from '../utils/secretManager';  // Import the function to get secrets from Google Secret Manager

export type MusicTrack = {
  _id: string;
  name: string;
  description: string;
  audioFilename: string;
  imageFilename: string;
  isPremium: boolean;
  favorites: string[];
};

export const fetchMusicTracks = async (): Promise<MusicTrack[]> => {
  try {
    // Fetch API_URL from Google Secret Manager
    const API_URL = await getSecretValue('API_URL');
    if (!API_URL) {
      throw new Error('API_URL not found');
    }

    // Try to get cached data first
    const cachedData = await AsyncStorage.getItem('musicTracks');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // If no cached data, fetch from API using the fetched API_URL
    const response = await axios.get<MusicTrack[]>(`${API_URL}/musics`);
    const musicTracks = response.data;

    // Cache the new data
    await AsyncStorage.setItem('musicTracks', JSON.stringify(musicTracks));

    return musicTracks;
  } catch (error) {
    console.error('Error fetching music tracks:', error);
    throw error;
  }
};
