import axios from 'axios';
import { getSecretValue } from '../utils/secretManager';  // Import getSecretValue function

export const fetchUserTags = async (userEmail: string) => {
  try {
    // Fetch API key and URL from Google Secret Manager
    const API_SYSTEME_KEY = await getSecretValue('API_SYSTEME_KEY');
    const SYSTEME_API_URL = await getSecretValue('SYSTEME_API_URL');

    // Ensure that the secrets were fetched successfully
    if (!API_SYSTEME_KEY || !SYSTEME_API_URL) {
      throw new Error('Unable to retrieve API keys from Google Secret Manager');
    }

    // Make the API request using the fetched secrets
    const response = await axios.get(`${SYSTEME_API_URL}/contacts?email=${userEmail}`, {
      headers: {
        'x-api-key': API_SYSTEME_KEY,  // Use the fetched API key
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

