import axios from 'axios';
import { API_URL } from '@env';  // Import the API_URL from environment variables
import { CategoryType } from '../components/modals/CategoryModal';
import { MusicTrack } from './sounds.service';

export interface MusicResponsePremium {
  musicList: MusicTrack[];
  isPremium: boolean;
}

class CategoryService {
  public async getCategories(): Promise<CategoryType[]> {
    // Ensure the API_URL is available
    if (!API_URL) {
      throw new Error('API_URL not found');
    }

    const res = await axios.get<CategoryType[]>(`${API_URL}/categories/`);  // Use the API_URL from environment variables
    return res.data;
  }

  public async getMusicByCategory(categoryId: string, token: string): Promise<MusicResponsePremium> {
    // Ensure the API_URL is available
    if (!API_URL) {
      throw new Error('API_URL not found');
    }

    const res = await axios.get<MusicResponsePremium>(`${API_URL}/app/musics/category?category=${categoryId ?? ''}`, {
      headers: {
        ssid: token,
      },
    });
    return res.data;
  }

  public async getFavorites({ category, token }: { category: string; token: string }): Promise<MusicResponsePremium> {
    // Ensure the API_URL is available
    if (!API_URL) {
      throw new Error('API_URL not found');
    }

    const res = await axios.get<MusicResponsePremium>(`${API_URL}/app/musics/favorites?category=${category}`, {
      headers: {
        ssid: token,
      },
    });
    return res.data;
  }

  public async getPreviewMusicByCategory(categoryId: string) {
    // Ensure the API_URL is available
    if (!API_URL) {
      throw new Error('API_URL not found');
    }

    const response = await axios.get(`${API_URL}/app/musics/preview?category=${categoryId}`);
    return response.data;
  }
}

export default new CategoryService();
