import axios from "axios";
import {API_SYSTEME_KEY } from '@env';
export const fetchUserTags = async (userEmail: string) => {
    const response = await axios.get(`https://api.systeme.io/api/contacts?email=${userEmail}`, {
      headers: {
        'x-api-key': 'ku0xuba35oiflvuueo4e99nxmifn72oo0x18xngcmlqthk8dmuj6spipz2hf7on8' // Replace with the actual API key
      },
    });
    return response.data.items[0].tags.map((tag: { name: string }) => tag.name);
  };