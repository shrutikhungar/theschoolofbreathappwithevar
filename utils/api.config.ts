import { API_URL, WEB_APP_URL } from '@env';  // Import both API_URL and WEB_APP_URL from the .env file

// Export the API URL
export const api_base_url = API_URL || '';

// Export the Web App URL
export const web_app_url = WEB_APP_URL || '';
