import axios from 'axios';
import { getSecretValue } from '../utils/secretManager';  // Import the function to get secrets from Google Secret Manager

export const toggleFavorite = async (musicId: string, token: string): Promise<void> => {
  try {
    // Fetch API_URL from Google Secret Manager
    const API_URL = await getSecretValue('API_URL');
    if (!API_URL) {
      throw new Error('API_URL not found');
    }

    // Perform the API request using the fetched API_URL
    await axios.put(
      `${API_URL}/user/add-favorite/music/${musicId}`,  // Use the API_URL fetched from Secret Manager
      {},
      {
        headers: {
          ssid: token,
        },
      }
    );
  } catch (error) {
    console.error('Error toggling favorite:', error.message);
    throw new Error(`Error toggling favorite`);
  }
};
