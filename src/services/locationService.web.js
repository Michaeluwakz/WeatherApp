/**
 * Location Service - Web Version
 * Handles browser geolocation API
 */

class LocationService {
  /**
   * Request location permission (web browsers handle this automatically)
   */
  async requestLocationPermission() {
    // Web browsers request permission when getCurrentPosition is called
    return true;
  }

  /**
   * Check if geolocation is supported
   */
  async checkLocationPermission() {
    return 'geolocation' in navigator;
  }

  /**
   * Get current device location using browser geolocation API
   */
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          let errorMessage = 'Failed to get current location.';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  }

  /**
   * Watch location changes
   */
  watchLocation(callback, errorCallback) {
    if (!('geolocation' in navigator)) {
      errorCallback(new Error('Geolocation is not supported'));
      return null;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        errorCallback(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
      }
    );

    return watchId;
  }

  /**
   * Stop watching location
   */
  clearWatch(watchId) {
    if (watchId && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(watchId);
    }
  }
}

export default new LocationService();


