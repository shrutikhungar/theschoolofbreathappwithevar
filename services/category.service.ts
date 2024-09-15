
import axios from 'axios';

import { API_URL } from '../utils/api.config';
import { CategoryType } from '../components/modals/CategoryModal';
import { MusicTrack } from './sounds.service';
export interface MusicResponsePremium {
    musicList:MusicTrack[],
    isPremium: boolean
  }
class CategoryService {
  public async getCategories(): Promise<CategoryType[]> {
    const res = await axios.get<CategoryType[]>(`${API_URL}/categories/`);
    return res.data;
  }

  public async getMusicByCategory(categoryId: string, token: string): Promise<MusicResponsePremium> {
    console.log(token);
    
    const res = await axios.get<MusicResponsePremium>(`${API_URL}/app/musics/category?category=${categoryId ?? ''}`, {
      headers: {
        ssid: token,
      },
    });
    return res.data;
  }
  public async getFavorites({category,token}:{category:string,token:string}):Promise<MusicResponsePremium> {
        
        
    const res =  await axios.get<MusicResponsePremium>(`${API_URL}/app/musics/favorites?category=${category}`,{
        headers:{
            ssid:token
        }
    })
    return res.data
}
public async getPreviewMusicByCategory(categoryId: string) {
  const response = await axios.get(`${API_URL}/app/musics/preview?category=${categoryId}`);
  return response.data;
}

}

export default new CategoryService();
