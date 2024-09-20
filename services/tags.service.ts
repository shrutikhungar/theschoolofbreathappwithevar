import axios from 'axios';
import { API_SYSTEME_KEY, SYSTEME_API_URL } from '@env';  // Fetch API keys and URL from .env

export const fetchUserTags = async (userEmail: string) => {
  try {
    // Make the API request using the secrets from the .env file
    const response = await axios.get(`${SYSTEME_API_URL}/contacts?email=${userEmail}`, {
      headers: {
        'x-api-key': API_SYSTEME_KEY,  // Use the fetched API key from .env
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
