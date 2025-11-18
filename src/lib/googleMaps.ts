/**
 * Dynamically loads the Google Maps JavaScript API
 * @returns Promise that resolves when the API is loaded
 */
export const loadGoogleMapsApi = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for it to load
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    // Get API key from environment variable
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

    if (!apiKey) {
      reject(new Error('Google Maps API key not found in environment variables'));
      return;
    }

    // Create and append script tag
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps API'));

    document.head.appendChild(script);
  });
};

/**
 * Type declarations for Google Maps
 */
declare global {
  interface Window {
    google: typeof google;
  }
}
