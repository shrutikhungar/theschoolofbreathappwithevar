import axios from 'axios';
import { API_SYSTEME_KEY } from '@env';

export const fetchUserTags = async (userEmail: string) => {
  try {
    // Debugging: Log the API key to ensure it’s loaded correctly
    console.log('API Key Loaded:', API_SYSTEME_KEY);  

    const response = await axios.get(`https://api.systeme.io/api/contacts?email=${userEmail}`, {
      headers: {
        'x-api-key': API_SYSTEME_KEY,  // Use the correct API key from the environment variables
      },
    });

    // Check if the response contains items and tags
    if (response.data && response.data.items && response.data.items.length > 0) {
      const tags = response.data.items[0].tags || []; // Ensure tags is an array or an empty array
      return tags.map((tag: { name: string }) => tag.name);
    }

    return [];  // Return empty array if no tags found
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Invalid API Key or Permissions:', error.response.data);  // Log more details
    } else {
      console.error('Error fetching user tags:', error.message);
    }
    return [];
  }
};
