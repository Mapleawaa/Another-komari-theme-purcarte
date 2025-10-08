/**
 * Utility functions for responsive behavior and device detection
 */

export interface WallpaperConfig {
  backgroundWide: string;
  backgroundVertical: string;
  backgroundTablet: string;
  backgroundMobile: string;
  backgroundImage: string; // existing config for compatibility
  backgroundImageMobile: string; // existing config for compatibility
}

export const DeviceType = {
  Mobile: 'mobile' as const,
  Tablet: 'tablet' as const,
  Desktop: 'desktop' as const,
};

export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

export const ScreenOrientation = {
  Portrait: 'portrait' as const,
  Landscape: 'landscape' as const,
};

export type ScreenOrientation = typeof ScreenOrientation[keyof typeof ScreenOrientation];

/**
 * Detects the current device type based on viewport width
 * @returns DeviceType value
 */
export const getDeviceType = (): DeviceType => {
  const width = window.innerWidth;

  // Define breakpoints
  if (width <= 768) {
    return DeviceType.Mobile;
  } else if (width <= 1024) {
    return DeviceType.Tablet;
  } else {
    return DeviceType.Desktop;
  }
};

/**
 * Detects the current screen orientation
 * @returns ScreenOrientation value
 */
export const getScreenOrientation = (): ScreenOrientation => {
  // Use window.matchMedia for accurate detection
  if (window.matchMedia && window.matchMedia("(orientation: portrait)").matches) {
    return ScreenOrientation.Portrait;
  } else {
    return ScreenOrientation.Landscape;
  }
};

/**
 * Gets the appropriate background image based on device type and orientation
 * @param config Wallpaper configuration object
 * @returns The URL of the appropriate background image
 */
export const getBackgroundImageForDevice = (config: WallpaperConfig): string => {
  const deviceType = getDeviceType();
  const orientation = getScreenOrientation();

  // Check if we're in a mobile context (mobile or tablet in portrait)
  if (deviceType === DeviceType.Mobile) {
    // Use mobile-specific background if available, otherwise use vertical
    return config.backgroundMobile || config.backgroundVertical || config.backgroundImageMobile || config.backgroundImage;
  } else if (deviceType === DeviceType.Tablet) {
    // Use tablet-specific background if available
    if (config.backgroundTablet) {
      return config.backgroundTablet;
    }
    
    // If in portrait, use vertical; if in landscape, use wide
    return orientation === ScreenOrientation.Portrait
      ? config.backgroundVertical || config.backgroundImageMobile || config.backgroundImage
      : config.backgroundWide || config.backgroundImage;
  } else {
    // Desktop - always use wide background
    return config.backgroundWide || config.backgroundImage;
  }
};

/**
 * Creates a media query listener for screen orientation changes
 * @param callback Function to call when orientation changes
 */
export const addOrientationChangeListener = (callback: () => void): (() => void) => {
  const mediaQuery = window.matchMedia("(orientation: portrait)");
  mediaQuery.addEventListener('change', callback);
  
  // Return a function to remove the listener
  return () => {
    mediaQuery.removeEventListener('change', callback);
  };
};

/**
 * Creates a window resize listener for device type changes
 * @param callback Function to call when window is resized
 */
export const addResizeListener = (callback: () => void): (() => void) => {
  window.addEventListener('resize', callback);
  
  // Return a function to remove the listener
  return () => {
    window.removeEventListener('resize', callback);
  };
};