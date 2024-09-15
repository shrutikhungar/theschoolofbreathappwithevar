import axios from 'axios';
import { API_URL } from '../utils/api.config';

export const toggleFavorite = async (musicId: string, token: string): Promise<void> => {
  try {
    await axios.put(
      `${API_URL}/user/add-favorite/music/${musicId}`,
      {},
      {
        headers: {
          ssid: token,
        },
      }
    );
  } catch (error) {
    throw new Error(`Error toggling favorite`);
  }
};