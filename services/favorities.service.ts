import axios from 'axios';
import { API_URL } from '@env';  // Import API_URL from environment variables

export const toggleFavorite = async (musicId: string, token: string): Promise<void> => {
  try {
    // Ensure the API_URL is available
    if (!API_URL) {
      throw new Error('API_URL not found');
    }

    // Perform the API request using the API_URL from environment variables
    await axios.put(
      `${API_URL}/user/add-favorite/music/${musicId}`,  // Use the API_URL fetched from environment variables
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
