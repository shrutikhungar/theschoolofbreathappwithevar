declare module '@env' {
    export const API_URL: string;
    export const API_SYSTEME_KEY: string;
    export const SYSTEME_API_URL: string;
  
    // Payment-related environment variables
    export const MERCHANT_IDENTIFIER: string;
    export const SUPPORTED_NETWORKS: string;
    export const COUNTRY_CODE: string;
    export const CURRENCY_CODE: string;
    export const SUBSCRIPTION_LABEL: string;
    export const SUBSCRIPTION_AMOUNT: string; // If this is a string, else use 'number'
  
    // Web App URL for PDF Viewer
    export const WEB_APP_URL: string; // Add WEB_APP_URL here
  }
  