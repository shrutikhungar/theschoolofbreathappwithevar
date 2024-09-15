import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_base } from '../utils/api.config';


export type MusicTrack = {
  _id: string;
  name: string;
  description: string;
  audioFilename: string;
  imageFilename: string;
  isPremium: boolean;
  favorites: string[];
};

export const fetchMusicTracks = async (): Promise<MusicTrack[] > => {
  try {
    // Try to get cached data first
    const cachedData = await AsyncStorage.getItem('musicTracks');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // If no cached data, fetch from API
    const response = await api_base.get<MusicTrack[]>('/musics');
    const musicTracks = response.data;

    // Cache the new data
    await AsyncStorage.setItem('musicTracks', JSON.stringify(musicTracks));

    return musicTracks;
  } catch (error) {
    console.error('Error fetching music tracks:', error);
    throw error;
  }
};

// You can add more music-related service functions here